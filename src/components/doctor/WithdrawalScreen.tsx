import React, { useState } from 'react';
import { MobileLayout } from '../MobileLayout';
import { BottomNav } from '../BottomNav';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { DollarSign, CreditCard, Smartphone, Wallet, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

export const WithdrawalScreen: React.FC = () => {
  const [withdrawalMethod, setWithdrawalMethod] = useState('paypal');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const availableBalance = 4250;

  const withdrawalMethods = [
    {
      id: 'paypal',
      name: 'PayPal',
      icon: Wallet,
      description: 'Withdraw to your PayPal account',
    },
    {
      id: 'paymaya',
      name: 'PayMaya',
      icon: CreditCard,
      description: 'Withdraw to PayMaya',
    },
    {
      id: 'gcash',
      name: 'GCash',
      icon: Smartphone,
      description: 'Withdraw to GCash',
    },
  ];

  const handleWithdrawal = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (parseFloat(amount) > availableBalance) {
      toast.error('Insufficient balance');
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    toast.success('Withdrawal request submitted successfully!');
    setAmount('');
    setLoading(false);
  };

  return (
    <MobileLayout title="Withdraw Funds" showBack>
      <div className="pb-24 p-4">
        {/* Balance Card */}
        <Card className="p-6 mb-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5" />
            <p className="text-green-100">Available Balance</p>
          </div>
          <h1 className="text-white mb-4">${availableBalance.toLocaleString()}</h1>
          <div className="space-y-2 text-green-100">
            <div className="flex justify-between">
              <span>This Month</span>
              <span>$1,250</span>
            </div>
            <div className="flex justify-between">
              <span>Total Withdrawn</span>
              <span>$12,500</span>
            </div>
          </div>
        </Card>

        {/* Amount Input */}
        <div className="mb-6">
          <Label htmlFor="amount">Withdrawal Amount</Label>
          <div className="relative mt-2">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 mt-2">
            {[100, 500, 1000].map((preset) => (
              <Button
                key={preset}
                variant="outline"
                size="sm"
                onClick={() => setAmount(preset.toString())}
              >
                ${preset}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAmount(availableBalance.toString())}
            >
              All
            </Button>
          </div>
        </div>

        {/* Withdrawal Methods */}
        <div className="mb-6">
          <h3 className="text-gray-900 dark:text-white mb-3">Withdrawal Method</h3>
          <RadioGroup value={withdrawalMethod} onValueChange={setWithdrawalMethod}>
            <div className="space-y-3">
              {withdrawalMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <Card
                    key={method.id}
                    className={`p-4 cursor-pointer transition-all ${
                      withdrawalMethod === method.id
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : ''
                    }`}
                    onClick={() => setWithdrawalMethod(method.id)}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <Icon className="w-6 h-6 text-green-500" />
                        </div>
                        <div>
                          <Label
                            htmlFor={method.id}
                            className="text-gray-900 dark:text-white cursor-pointer"
                          >
                            {method.name}
                          </Label>
                          <p className="text-gray-500 dark:text-gray-400">
                            {method.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </RadioGroup>
        </div>

        {/* Account Details */}
        {withdrawalMethod === 'paypal' && (
          <Card className="p-4 mb-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="paypal-email">PayPal Email</Label>
                <Input
                  id="paypal-email"
                  type="email"
                  placeholder="your@email.com"
                  className="mt-2"
                />
              </div>
            </div>
          </Card>
        )}

        {withdrawalMethod === 'paymaya' && (
          <Card className="p-4 mb-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="paymaya-number">PayMaya Number</Label>
                <Input
                  id="paymaya-number"
                  placeholder="09XX XXX XXXX"
                  className="mt-2"
                />
              </div>
            </div>
          </Card>
        )}

        {withdrawalMethod === 'gcash' && (
          <Card className="p-4 mb-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="gcash-number">GCash Number</Label>
                <Input
                  id="gcash-number"
                  placeholder="09XX XXX XXXX"
                  className="mt-2"
                />
              </div>
            </div>
          </Card>
        )}

        {/* Processing Time Info */}
        <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 mb-6">
          <p className="text-gray-700 dark:text-gray-300">
            ℹ️ Withdrawal requests are typically processed within 1-3 business days.
            You will receive a confirmation email once your request is processed.
          </p>
        </Card>

        {/* Withdraw Button */}
        <Button
          onClick={handleWithdrawal}
          disabled={loading || !amount}
          className="w-full bg-green-500 hover:bg-green-600 h-12"
        >
          {loading ? 'Processing...' : 'Request Withdrawal'}
        </Button>
      </div>

      <BottomNav />
    </MobileLayout>
  );
};
