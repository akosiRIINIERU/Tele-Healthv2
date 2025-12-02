import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Crown,
  Calendar,
  Users,
  Mail,
  Trash2,
  Plus,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Award,
} from 'lucide-react';
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
import { useSubscription } from '../../contexts/SubscriptionContext';
import { toast } from 'sonner';

export const SubscriptionManagement: React.FC = () => {
  const navigate = useNavigate();
  const {
    subscription,
    hasActiveSubscription,
    plans,
    cancelSubscription,
    addMember,
    removeMember,
  } = useSubscription();
  
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showAddMemberDialog, setShowAddMemberDialog] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const currentPlan = plans.find(p => p.id === subscription?.tier);

  const handleCancelSubscription = async () => {
    setIsProcessing(true);
    try {
      await cancelSubscription();
      toast.success('Subscription cancelled successfully');
      setShowCancelDialog(false);
    } catch (error) {
      toast.error('Failed to cancel subscription');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddMember = async () => {
    if (!newMemberEmail.trim() || !newMemberEmail.includes('@')) {
      toast.error('Please enter a valid email');
      return;
    }

    setIsProcessing(true);
    try {
      await addMember(newMemberEmail);
      toast.success('Member added successfully');
      setNewMemberEmail('');
      setShowAddMemberDialog(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to add member');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemoveMember = async (email: string) => {
    setIsProcessing(true);
    try {
      await removeMember(email);
      toast.success('Member removed successfully');
    } catch (error) {
      toast.error('Failed to remove member');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!subscription) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
        <div className="bg-gradient-to-r from-pink-500 to-pink-400 text-white p-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl">Subscription</h1>
          </div>
        </div>

        <div className="p-4 flex flex-col items-center justify-center min-h-[60vh]">
          <Crown className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
          <h2 className="text-xl mb-2 text-gray-900 dark:text-white">
            No Active Subscription
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
            Subscribe to unlock premium features and benefits
          </p>
          <Button
            onClick={() => navigate('/patient/subscription-plans')}
            className="bg-pink-500 hover:bg-pink-600"
          >
            View Plans
          </Button>
        </div>
      </div>
    );
  }

  const daysRemaining = Math.ceil(
    (new Date(subscription.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

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
          <div className="flex-1">
            <h1 className="text-xl">My Subscription</h1>
            <p className="text-pink-100 text-sm">{currentPlan?.name}</p>
          </div>
          {hasActiveSubscription && (
            <div className="bg-white/20 px-3 py-1 rounded-full">
              <span className="text-white text-sm">Active</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 space-y-4 max-w-4xl mx-auto">
        {/* Status Card */}
        <Card className={`p-6 ${
          subscription.status === 'active'
            ? 'bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border-pink-200 dark:border-pink-800'
            : 'bg-gray-50 dark:bg-gray-800'
        }`}>
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-pink-500 rounded-xl">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl mb-1 text-gray-900 dark:text-white">
                {currentPlan?.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                ₱{currentPlan?.price}/month
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                <Calendar className="w-4 h-4" />
                <span>Status</span>
              </div>
              <p className="text-gray-900 dark:text-white capitalize">
                {subscription.status}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                <Calendar className="w-4 h-4" />
                <span>Expires</span>
              </div>
              <p className="text-gray-900 dark:text-white">
                {new Date(subscription.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          {subscription.status === 'active' && daysRemaining <= 7 && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mb-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                    Your subscription expires in <strong>{daysRemaining} days</strong>
                  </p>
                  <p className="text-yellow-700 dark:text-yellow-300 text-xs mt-1">
                    It will auto-renew unless cancelled
                  </p>
                </div>
              </div>
            </div>
          )}

          {subscription.status === 'cancelled' && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-red-800 dark:text-red-200 text-sm">
                  Your subscription has been cancelled and will not renew
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* Features Card */}
        <Card className="p-6">
          <h3 className="text-lg mb-4 text-gray-900 dark:text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-pink-500" />
            Your Benefits
          </h3>
          <div className="space-y-3">
            {currentPlan?.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Members Management (Family & Corporate Plans) */}
        {subscription.tier !== 'individual' && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg text-gray-900 dark:text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-pink-500" />
                Members ({subscription.members?.length || 0}/{currentPlan?.memberLimit})
              </h3>
              {(subscription.members?.length || 0) < (currentPlan?.memberLimit || 0) && (
                <Button
                  size="sm"
                  onClick={() => setShowAddMemberDialog(true)}
                  className="bg-pink-500 hover:bg-pink-600"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Member
                </Button>
              )}
            </div>

            <div className="space-y-2">
              {subscription.members?.map((email, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                      <Mail className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white text-sm">{email}</p>
                      {index === 0 && (
                        <p className="text-gray-500 dark:text-gray-400 text-xs">
                          Primary Account
                        </p>
                      )}
                    </div>
                  </div>
                  {index > 0 && (
                    <button
                      onClick={() => handleRemoveMember(email)}
                      className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                      disabled={isProcessing}
                      aria-label={`Remove ${email}`}
                    >
                      <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Corporate Dashboard Link */}
        {subscription.tier === 'corporate' && subscription.corporateInfo && (
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-500 rounded-xl">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg mb-1 text-gray-900 dark:text-white">
                  HR Dashboard
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  Monitor employee wellness and usage statistics
                </p>
                <div className="space-y-1 text-sm mb-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Company:</strong> {subscription.corporateInfo.companyName}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>HR Email:</strong> {subscription.corporateInfo.hrEmail}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-300 dark:border-blue-700"
                  onClick={() => toast.info('HR Dashboard coming soon!')}
                >
                  Access Dashboard
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate('/patient/subscription-plans')}
          >
            Change Plan
          </Button>

          {subscription.status === 'active' && (
            <Button
              variant="outline"
              className="w-full text-red-600 border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/20"
              onClick={() => setShowCancelDialog(true)}
            >
              Cancel Subscription
            </Button>
          )}
        </div>
      </div>

      {/* Cancel Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="sm:max-w-md" aria-describedby="cancel-description">
          <DialogHeader>
            <DialogTitle>Cancel Subscription?</DialogTitle>
            <DialogDescription id="cancel-description">
              Are you sure you want to cancel your subscription? You'll lose access to all premium features at the end of your billing period.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Your subscription will remain active until{' '}
                <strong>{new Date(subscription.endDate).toLocaleDateString()}</strong>
              </p>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowCancelDialog(false)}
              disabled={isProcessing}
            >
              Keep Subscription
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleCancelSubscription}
              disabled={isProcessing}
            >
              {isProcessing ? 'Cancelling...' : 'Cancel Subscription'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Member Dialog */}
      <Dialog open={showAddMemberDialog} onOpenChange={setShowAddMemberDialog}>
        <DialogContent className="sm:max-w-md" aria-describedby="add-member-description">
          <DialogHeader>
            <DialogTitle>Add Member</DialogTitle>
            <DialogDescription id="add-member-description">
              Enter the email address of the person you want to add to your subscription
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="memberEmail">Email Address</Label>
              <Input
                id="memberEmail"
                type="email"
                placeholder="member@example.com"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
              />
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                The member will receive an invitation to join your subscription
              </p>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowAddMemberDialog(false);
                setNewMemberEmail('');
              }}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAddMember}
              disabled={isProcessing}
              className="bg-pink-500 hover:bg-pink-600"
            >
              {isProcessing ? 'Adding...' : 'Add Member'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
