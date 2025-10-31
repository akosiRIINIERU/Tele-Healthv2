import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '../MobileLayout';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { CreditCard, Smartphone, Wallet, Check } from 'lucide-react';
import { toast } from 'sonner';

export const PaymentScreen: React.FC = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [amount] = useState(100);
  const [loading, setLoading] = useState(false);

  const paymentMethods = [
    {
      id: 'paypal',
      name: 'PayPal',
      icon: Wallet,
      description: 'Pay with your PayPal account',
    },
    {
      id: 'paymaya',
      name: 'PayMaya',
      icon: CreditCard,
      description: 'Pay with PayMaya',
    },
    {
      id: 'gcash',
      name: 'GCash',
      icon: Smartphone,
      description: 'Pay with GCash',
    },
  ];

  const handlePayment = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    toast.success('Payment successful!');
    navigate('/patient/appointments');
  };

  return (
    <MobileLayout title="Payment" showBack>
      <div className="pb-24 p-4">
        {/* Amount Summary */}
        <Card className="p-6 mb-6 bg-gradient-to-br from-pink-500 to-pink-600 text-white">
          <p className="text-pink-100 mb-2">Amount to Pay</p>
          <h1 className="text-white mb-4">${amount}</h1>
          <div className="space-y-2 text-pink-100">
            <div className="flex justify-between">
              <span>Consultation Fee</span>
              <span>${amount}</span>
            </div>
            <div className="flex justify-between">
              <span>Service Fee</span>
              <span>$0</span>
            </div>
          </div>
        </Card>

        {/* Payment Methods */}
        <div className="mb-6">
          <h3 className="text-gray-900 dark:text-white mb-3">Select Payment Method</h3>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="space-y-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <Card
                    key={method.id}
                    className={`p-4 cursor-pointer transition-all ${
                      paymentMethod === method.id
                        ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20'
                        : ''
                    }`}
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <Icon className="w-6 h-6 text-pink-500" />
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
                      {paymentMethod === method.id && (
                        <Check className="w-5 h-5 text-pink-500" />
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </RadioGroup>
        </div>

        {/* Payment Details Form */}
        {paymentMethod === 'paypal' && (
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

        {paymentMethod === 'paymaya' && (
          <Card className="p-4 mb-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="paymaya-number">Card Number</Label>
                <Input
                  id="paymaya-number"
                  placeholder="1234 5678 9012 3456"
                  className="mt-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" className="mt-2" />
                </div>
              </div>
            </div>
          </Card>
        )}

        {paymentMethod === 'gcash' && (
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

        {/* Terms */}
        <Card className="p-4 bg-gray-50 dark:bg-gray-800 mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            By proceeding with this payment, you agree to our{' '}
            <span className="text-pink-500 cursor-pointer">Terms of Service</span>{' '}
            and <span className="text-pink-500 cursor-pointer">Privacy Policy</span>.
          </p>
        </Card>

        {/* Pay Button */}
        <Button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-pink-500 hover:bg-pink-600 h-12"
        >
          {loading ? 'Processing...' : `Pay $${amount}`}
        </Button>
      </div>
    </MobileLayout>
  );
};
