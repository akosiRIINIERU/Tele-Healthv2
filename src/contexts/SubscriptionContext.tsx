import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export type SubscriptionTier = 'none' | 'individual' | 'family' | 'corporate';

export interface SubscriptionPlan {
  id: SubscriptionTier;
  name: string;
  price: number;
  memberLimit: number;
  features: string[];
  badge?: string;
}

export interface Subscription {
  userId: string;
  tier: SubscriptionTier;
  startDate: string;
  endDate: string;
  status: 'active' | 'cancelled' | 'expired';
  members?: string[]; // For family/corporate plans
  corporateInfo?: {
    companyName: string;
    hrEmail: string;
  };
}

interface SubscriptionContextType {
  subscription: Subscription | null;
  plans: SubscriptionPlan[];
  hasActiveSubscription: boolean;
  isLoading: boolean;
  subscribe: (tier: SubscriptionTier, additionalInfo?: any) => Promise<void>;
  cancelSubscription: () => Promise<void>;
  checkFeature: (feature: string) => boolean;
  addMember: (email: string) => Promise<void>;
  removeMember: (email: string) => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'individual',
    name: 'Individual Plan',
    price: 99,
    memberLimit: 1,
    features: [
      'Unlimited 24/7 chat support with doctors',
      'Free bookings (no ₱5–₱10 fee per consult)',
      'Discounted medicine delivery fees',
      'Access to digital prescriptions & medical certificates',
      'Health tips & reminders via SMS/email',
    ],
  },
  {
    id: 'family',
    name: 'Family Plan',
    price: 399,
    memberLimit: 4,
    badge: 'Popular',
    features: [
      'All features in Individual Plan',
      'Shared family account (1 subscription covers all members)',
      'Priority booking for consultations',
      'Discounts on lab tests for family members',
      'Monthly family health reports',
    ],
  },
  {
    id: 'corporate',
    name: 'Corporate Plan',
    price: 2999,
    memberLimit: 20,
    badge: 'Best Value',
    features: [
      'All features in Family Plan',
      'Dashboard for HR/management (monitor employee usage, wellness stats)',
      'Access to wellness webinars (nutrition, mental health, fitness)',
      'Annual health screenings & check-up discounts',
      'Option to include dependents (small add-on fee per dependent)',
    ],
  },
];

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadSubscription();
    } else {
      setSubscription(null);
      setIsLoading(false);
    }
  }, [user]);

  const loadSubscription = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const stored = localStorage.getItem(`subscription_${user.id}`);
      if (stored) {
        const sub = JSON.parse(stored);
        // Check if subscription is still active
        const endDate = new Date(sub.endDate);
        const now = new Date();
        if (endDate > now && sub.status === 'active') {
          setSubscription(sub);
        } else if (sub.status === 'active') {
          // Expired
          sub.status = 'expired';
          localStorage.setItem(`subscription_${user.id}`, JSON.stringify(sub));
          setSubscription(sub);
        } else {
          setSubscription(sub);
        }
      }
    } catch (error) {
      console.error('Error loading subscription:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const subscribe = async (tier: SubscriptionTier, additionalInfo?: any) => {
    if (!user) throw new Error('User not authenticated');

    const plan = SUBSCRIPTION_PLANS.find(p => p.id === tier);
    if (!plan) throw new Error('Invalid plan');

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1); // 1 month subscription

    const newSubscription: Subscription = {
      userId: user.id,
      tier,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      status: 'active',
      members: [user.email],
      ...(tier === 'corporate' && additionalInfo?.companyName ? {
        corporateInfo: {
          companyName: additionalInfo.companyName,
          hrEmail: additionalInfo.hrEmail || user.email,
        }
      } : {}),
    };

    localStorage.setItem(`subscription_${user.id}`, JSON.stringify(newSubscription));
    setSubscription(newSubscription);
  };

  const cancelSubscription = async () => {
    if (!subscription) return;

    const updated = { ...subscription, status: 'cancelled' as const };
    localStorage.setItem(`subscription_${user!.id}`, JSON.stringify(updated));
    setSubscription(updated);
  };

  const checkFeature = (feature: string): boolean => {
    if (!subscription || subscription.status !== 'active') return false;

    const featureMap: Record<string, SubscriptionTier[]> = {
      'free-booking': ['individual', 'family', 'corporate'],
      'unlimited-chat': ['individual', 'family', 'corporate'],
      'medicine-discount': ['individual', 'family', 'corporate'],
      'priority-booking': ['family', 'corporate'],
      'lab-discount': ['family', 'corporate'],
      'wellness-webinars': ['corporate'],
      'hr-dashboard': ['corporate'],
    };

    const allowedTiers = featureMap[feature] || [];
    return allowedTiers.includes(subscription.tier);
  };

  const addMember = async (email: string) => {
    if (!subscription) throw new Error('No active subscription');
    if (subscription.tier === 'individual') throw new Error('Individual plan does not support members');

    const plan = SUBSCRIPTION_PLANS.find(p => p.id === subscription.tier);
    if (!plan) throw new Error('Invalid plan');

    const currentMembers = subscription.members || [];
    if (currentMembers.length >= plan.memberLimit) {
      throw new Error(`Member limit reached (${plan.memberLimit})`);
    }

    if (currentMembers.includes(email)) {
      throw new Error('Member already added');
    }

    const updated = {
      ...subscription,
      members: [...currentMembers, email],
    };

    localStorage.setItem(`subscription_${user!.id}`, JSON.stringify(updated));
    setSubscription(updated);
  };

  const removeMember = async (email: string) => {
    if (!subscription || !subscription.members) throw new Error('No active subscription');

    const updated = {
      ...subscription,
      members: subscription.members.filter(m => m !== email),
    };

    localStorage.setItem(`subscription_${user!.id}`, JSON.stringify(updated));
    setSubscription(updated);
  };

  const hasActiveSubscription = subscription?.status === 'active';

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        plans: SUBSCRIPTION_PLANS,
        hasActiveSubscription,
        isLoading,
        subscribe,
        cancelSubscription,
        checkFeature,
        addMember,
        removeMember,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
