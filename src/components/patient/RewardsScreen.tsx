import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ResponsiveLayout } from '../ResponsiveLayout';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  ArrowLeft,
  Award,
  Gift,
  Sparkles,
  TrendingUp,
  Calendar,
  MessageCircle,
  Pill,
  Star,
  Clock,
  CheckCircle,
  Trophy,
  Target,
  Zap,
} from 'lucide-react';
import { toast } from 'sonner';

interface Reward {
  id: string;
  name: string;
  description: string;
  points: number;
  image: string;
  category: 'discount' | 'freebie' | 'upgrade' | 'voucher';
  available: number;
  expiresIn?: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  progress: number;
  total: number;
  completed: boolean;
  reward: number;
}

const rewards: Reward[] = [
  {
    id: '1',
    name: '20% Off Consultation',
    description: 'Get 20% discount on your next doctor consultation',
    points: 100,
    image: '🩺',
    category: 'discount',
    available: 50,
    expiresIn: '30 days',
  },
  {
    id: '2',
    name: 'Free Medicine Delivery',
    description: 'Free delivery on medicine orders above ₱500',
    points: 150,
    image: '🚚',
    category: 'freebie',
    available: 30,
    expiresIn: '60 days',
  },
  {
    id: '3',
    name: '₱100 Medicine Voucher',
    description: 'Use this voucher for any medicine purchase',
    points: 200,
    image: '💊',
    category: 'voucher',
    available: 25,
    expiresIn: '90 days',
  },
  {
    id: '4',
    name: 'Priority Booking',
    description: 'Skip the queue and get priority appointment slots for 1 month',
    points: 250,
    image: '⚡',
    category: 'upgrade',
    available: 15,
    expiresIn: '30 days',
  },
  {
    id: '5',
    name: 'Free Health Check',
    description: 'Complimentary basic health screening package',
    points: 300,
    image: '❤️',
    category: 'freebie',
    available: 10,
    expiresIn: '45 days',
  },
  {
    id: '6',
    name: '₱200 Subscription Credit',
    description: 'Apply towards any subscription plan',
    points: 400,
    image: '👑',
    category: 'voucher',
    available: 20,
  },
  {
    id: '7',
    name: '50% Off Lab Tests',
    description: 'Get 50% discount on laboratory test packages',
    points: 350,
    image: '🔬',
    category: 'discount',
    available: 12,
    expiresIn: '60 days',
  },
  {
    id: '8',
    name: 'Premium Chat Support',
    description: '24/7 premium chat support for 3 months',
    points: 500,
    image: '💬',
    category: 'upgrade',
    available: 5,
    expiresIn: '90 days',
  },
];

const achievements: Achievement[] = [
  {
    id: '1',
    name: 'First Appointment',
    description: 'Complete your first doctor appointment',
    icon: Calendar,
    progress: 1,
    total: 1,
    completed: true,
    reward: 50,
  },
  {
    id: '2',
    name: 'Health Conscious',
    description: 'Book 5 appointments',
    icon: TrendingUp,
    progress: 3,
    total: 5,
    completed: false,
    reward: 100,
  },
  {
    id: '3',
    name: 'Chat Master',
    description: 'Send 50 messages to doctors',
    icon: MessageCircle,
    progress: 28,
    total: 50,
    completed: false,
    reward: 75,
  },
  {
    id: '4',
    name: 'Medicine Regular',
    description: 'Purchase medicine 10 times',
    icon: Pill,
    progress: 5,
    total: 10,
    completed: false,
    reward: 150,
  },
  {
    id: '5',
    name: 'Review Giver',
    description: 'Leave 5 doctor reviews',
    icon: Star,
    progress: 2,
    total: 5,
    completed: false,
    reward: 80,
  },
  {
    id: '6',
    name: 'Early Bird',
    description: 'Book 3 appointments before 9 AM',
    icon: Clock,
    progress: 1,
    total: 3,
    completed: false,
    reward: 60,
  },
];

const pointsHistory = [
  { date: 'Today', action: 'Completed Appointment', points: 50, type: 'earned' },
  { date: 'Yesterday', action: 'Redeemed: 20% Off Voucher', points: -100, type: 'redeemed' },
  { date: '3 days ago', action: 'Left Doctor Review', points: 25, type: 'earned' },
  { date: '5 days ago', action: 'First Medicine Purchase', points: 30, type: 'earned' },
  { date: '1 week ago', action: 'Completed Profile', points: 20, type: 'earned' },
  { date: '2 weeks ago', action: 'Account Created', points: 100, type: 'earned' },
];

const getCategoryBadge = (category: string) => {
  const styles = {
    discount: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    freebie: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    upgrade: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
    voucher: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
  };
  return styles[category as keyof typeof styles] || styles.voucher;
};

export const RewardsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('rewards');
  const userPoints = user?.points || 0;

  const nextMilestone = 500;
  const progress = (userPoints / nextMilestone) * 100;

  const redeemReward = (reward: Reward) => {
    if (userPoints < reward.points) {
      toast.error('Not enough points!', {
        description: `You need ${reward.points - userPoints} more points to redeem this reward.`,
      });
      return;
    }

    // TODO: Call API to deduct points and update user data
    toast.success('Reward Redeemed!', {
      description: `${reward.name} has been added to your account. Check your vouchers.`,
    });
  };

  return (
    <ResponsiveLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 px-4 py-6 text-white">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-white mb-1">Rewards & Points</h1>
              <p className="text-pink-100">Earn points, redeem rewards!</p>
            </div>
          </div>

          {/* Points Balance */}
          <Card className="bg-white/10 backdrop-blur-sm border-0 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-pink-100 mb-1">Your Points</p>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-yellow-300" />
                  <span className="text-white">{userPoints} pts</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="bg-white text-pink-500 border-0 hover:bg-pink-50"
                onClick={() => setActiveTab('history')}
              >
                View History
              </Button>
            </div>

            {/* Progress to Next Milestone */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-pink-100">
                <span>Next milestone</span>
                <span>{nextMilestone} pts</span>
              </div>
              <Progress value={progress} className="h-2 bg-white/20" />
              <p className="text-pink-100">
                {nextMilestone - userPoints} more points to unlock bonus rewards!
              </p>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start bg-transparent border-0 h-auto p-0">
              <TabsTrigger
                value="rewards"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pink-500 rounded-none px-6 py-4"
              >
                <Gift className="w-4 h-4 mr-2" />
                Rewards
              </TabsTrigger>
              <TabsTrigger
                value="achievements"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pink-500 rounded-none px-6 py-4"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Achievements
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pink-500 rounded-none px-6 py-4"
              >
                <Clock className="w-4 h-4 mr-2" />
                History
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Content */}
        <div className="px-4 py-6">
          {activeTab === 'rewards' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-900 dark:text-white">Available Rewards</h2>
                <p className="text-gray-500 dark:text-gray-400">{rewards.length} rewards</p>
              </div>

              {rewards.map(reward => (
                <Card key={reward.id} className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex gap-4">
                    <div className="text-5xl">{reward.image}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1">
                          <h3 className="text-gray-900 dark:text-white mb-1">
                            {reward.name}
                          </h3>
                          <Badge variant="secondary" className={getCategoryBadge(reward.category)}>
                            {reward.category}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-pink-500">
                            <Sparkles className="w-4 h-4" />
                            <span className="font-semibold">{reward.points}</span>
                          </div>
                          <p className="text-gray-400 dark:text-gray-500">pts</p>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">
                        {reward.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-gray-500 dark:text-gray-400">
                            {reward.available} available
                          </p>
                          {reward.expiresIn && (
                            <p className="text-gray-400 dark:text-gray-500">
                              Expires in {reward.expiresIn}
                            </p>
                          )}
                        </div>
                        <Button
                          onClick={() => redeemReward(reward)}
                          disabled={userPoints < reward.points}
                          className="bg-pink-500 hover:bg-pink-600"
                        >
                          {userPoints < reward.points ? 'Not Enough Points' : 'Redeem'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-900 dark:text-white">Your Achievements</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  {achievements.filter(a => a.completed).length}/{achievements.length} completed
                </p>
              </div>

              {achievements.map(achievement => {
                const Icon = achievement.icon;
                const progressPercent = (achievement.progress / achievement.total) * 100;

                return (
                  <Card
                    key={achievement.id}
                    className={`p-4 ${
                      achievement.completed
                        ? 'bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-800'
                        : ''
                    }`}
                  >
                    <div className="flex gap-4">
                      <div
                        className={`p-3 rounded-xl shrink-0 ${
                          achievement.completed
                            ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500'
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-gray-900 dark:text-white">
                                {achievement.name}
                              </h3>
                              {achievement.completed && (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              )}
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">
                              {achievement.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 text-pink-500">
                            <Zap className="w-4 h-4" />
                            <span className="font-semibold">+{achievement.reward}</span>
                          </div>
                        </div>
                        {!achievement.completed && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
                              <span>Progress</span>
                              <span>
                                {achievement.progress}/{achievement.total}
                              </span>
                            </div>
                            <Progress value={progressPercent} className="h-2" />
                          </div>
                        )}
                        {achievement.completed && (
                          <Badge variant="secondary" className="bg-green-100 text-green-600 dark:bg-green-900/20">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-3">
              <h2 className="text-gray-900 dark:text-white mb-4">Points History</h2>

              {pointsHistory.map((item, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-gray-900 dark:text-white mb-1">{item.action}</h3>
                      <p className="text-gray-500 dark:text-gray-400">{item.date}</p>
                    </div>
                    <div
                      className={`font-semibold ${
                        item.type === 'earned' ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {item.type === 'earned' ? '+' : ''}
                      {item.points} pts
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* How to Earn Points Section */}
        {activeTab === 'rewards' && (
          <div className="px-4 pb-6">
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <h3 className="text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                How to Earn Points
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Complete appointments (+50 pts)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Leave doctor reviews (+25 pts)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Purchase medicines (+10 pts per ₱100)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Complete your profile (+20 pts)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Refer friends (+100 pts per referral)</span>
                </li>
              </ul>
            </Card>
          </div>
        )}
      </div>
    </ResponsiveLayout>
  );
};
