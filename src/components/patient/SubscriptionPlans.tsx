import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Crown, Users, Building2, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { useSubscription, SubscriptionTier } from '../../contexts/SubscriptionContext';
import { toast } from 'sonner';

export const SubscriptionPlans: React.FC = () => {
  const navigate = useNavigate();
  const { plans, subscription, subscribe } = useSubscription();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionTier | null>(null);
  const [showCorporateDialog, setShowCorporateDialog] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [hrEmail, setHrEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSelectPlan = (tier: SubscriptionTier) => {
    if (tier === 'corporate') {
      setSelectedPlan(tier);
      setShowCorporateDialog(true);
    } else {
      setSelectedPlan(tier);
      handleSubscribe(tier);
    }
  };

  const handleSubscribe = async (tier: SubscriptionTier, additionalInfo?: any) => {
    setIsProcessing(true);
    try {
      await subscribe(tier, additionalInfo);
      toast.success('Successfully subscribed! 🎉');
      navigate('/patient/subscription');
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsProcessing(false);
      setShowCorporateDialog(false);
    }
  };

  const handleCorporateSubscribe = () => {
    if (!companyName.trim()) {
      toast.error('Please enter company name');
      return;
    }
    if (!hrEmail.trim() || !hrEmail.includes('@')) {
      toast.error('Please enter a valid HR email');
      return;
    }
    handleSubscribe('corporate', { companyName, hrEmail });
  };

  const getPlanIcon = (tier: SubscriptionTier) => {
    switch (tier) {
      case 'individual':
        return <Crown className="w-8 h-8 text-pink-500" />;
      case 'family':
        return <Users className="w-8 h-8 text-pink-500" />;
      case 'corporate':
        return <Building2 className="w-8 h-8 text-pink-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-400 text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl">Premium Subscriptions</h1>
            <p className="text-pink-100 text-sm">Choose the perfect plan for you</p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="p-4 text-center bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="max-w-2xl mx-auto">
          <Zap className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
          <h2 className="text-2xl mb-2 text-gray-900 dark:text-white">
            Unlock Premium Healthcare
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Get unlimited access, priority booking, and exclusive benefits
          </p>
        </div>
      </div>

      {/* Current Subscription Alert */}
      {subscription?.status === 'active' && (
        <div className="p-4">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-green-800 dark:text-green-200">
                  You currently have an active <strong>{subscription.tier}</strong> subscription
                </p>
                <p className="text-green-700 dark:text-green-300 text-sm mt-1">
                  Valid until {new Date(subscription.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Plans */}
      <div className="p-4 space-y-4 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`p-6 relative overflow-hidden transition-all ${
              subscription?.tier === plan.id
                ? 'border-2 border-pink-500 bg-pink-50/50 dark:bg-pink-900/10'
                : 'border dark:border-gray-700 hover:shadow-lg'
            }`}
          >
            {/* Badge */}
            {plan.badge && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
                {plan.badge}
              </div>
            )}

            <div className="flex items-start gap-4 mb-4">
              {getPlanIcon(plan.id)}
              <div className="flex-1">
                <h3 className="text-xl mb-1 text-gray-900 dark:text-white">
                  {plan.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {plan.memberLimit === 1
                    ? 'For individuals'
                    : `Up to ${plan.memberLimit} members`}
                </p>
              </div>
            </div>

            {/* Price */}
            <div className="mb-4 pb-4 border-b dark:border-gray-700">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl text-gray-900 dark:text-white">
                  ₱{plan.price}
                </span>
                <span className="text-gray-600 dark:text-gray-400">/month</span>
              </div>
              {plan.id === 'family' && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  ~₱{Math.round(plan.price / plan.memberLimit)}/person
                </p>
              )}
              {plan.id === 'corporate' && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  ~₱{Math.round(plan.price / plan.memberLimit)}/employee
                </p>
              )}
            </div>

            {/* Features */}
            <div className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            {subscription?.tier === plan.id && subscription.status === 'active' ? (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate('/patient/subscription')}
              >
                Manage Subscription
              </Button>
            ) : (
              <Button
                className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                onClick={() => handleSelectPlan(plan.id)}
                disabled={isProcessing}
              >
                {isProcessing && selectedPlan === plan.id
                  ? 'Processing...'
                  : 'Subscribe Now'}
              </Button>
            )}
          </Card>
        ))}
      </div>

      {/* Corporate Dialog */}
      <Dialog open={showCorporateDialog} onOpenChange={setShowCorporateDialog}>
        <DialogContent className="sm:max-w-md" aria-describedby="corporate-description">
          <DialogHeader>
            <DialogTitle>Corporate Plan Details</DialogTitle>
            <DialogDescription id="corporate-description">
              Please provide your company information to complete the subscription
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                placeholder="Acme Corporation"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hrEmail">HR Email</Label>
              <Input
                id="hrEmail"
                type="email"
                placeholder="hr@company.com"
                value={hrEmail}
                onChange={(e) => setHrEmail(e.target.value)}
              />
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Note:</strong> The HR email will have access to employee usage dashboard and wellness statistics.
              </p>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowCorporateDialog(false)}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleCorporateSubscribe}
              disabled={isProcessing}
              className="bg-pink-500 hover:bg-pink-600"
            >
              {isProcessing ? 'Processing...' : 'Complete Subscription'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Info Footer */}
      <div className="p-4 max-w-4xl mx-auto">
        <Card className="p-4 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/10 dark:to-purple-900/10 border-pink-200 dark:border-pink-800">
          <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
            💡 All subscriptions renew automatically. Cancel anytime without penalty.
          </p>
        </Card>
      </div>
    </div>
  );
};
