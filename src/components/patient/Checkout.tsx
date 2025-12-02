import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveLayout } from '../ResponsiveLayout';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Upload, CreditCard, CheckCircle, Crown, Sparkles } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useSubscription } from '../../contexts/SubscriptionContext';
import { toast } from 'sonner';
import { Badge } from '../ui/badge';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'paymaya' | 'gcash'>('gcash');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);

  const hasPrescriptionItems = cart.some(item => item.medicine.requiresPrescription);
  const shippingFee = 5;
  const total = getCartTotal() + shippingFee;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPrescriptionFile(e.target.files[0]);
      toast.success('Prescription uploaded successfully');
    }
  };

  const handlePlaceOrder = () => {
    if (!deliveryAddress || !contactNumber) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (hasPrescriptionItems && !prescriptionFile) {
      toast.error('Please upload your prescription for prescription medicines');
      return;
    }

    // Simulate order placement
    toast.success('Order placed successfully!');
    clearCart();
    navigate('/patient/orders');
  };

  return (
    <ResponsiveLayout title="Checkout" showBack>
      <div className="p-4 md:p-6 lg:p-8 pb-32">
        {/* Delivery Information */}
        <Card className="p-6 mb-6">
          <h3 className="text-gray-900 dark:text-white mb-4">Delivery Information</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="address">Delivery Address *</Label>
              <Textarea
                id="address"
                placeholder="Enter your complete delivery address"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="contact">Contact Number *</Label>
              <Input
                id="contact"
                type="tel"
                placeholder="Enter your contact number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </Card>

        {/* Prescription Upload */}
        {hasPrescriptionItems && (
          <Card className="p-6 mb-6 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
            <h3 className="text-amber-900 dark:text-amber-100 mb-2">
              Prescription Required
            </h3>
            <p className="text-amber-800 dark:text-amber-200 mb-4">
              Your order contains prescription medicines. Please upload a valid prescription from a licensed doctor.
            </p>
            
            <label
              htmlFor="prescription"
              className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-amber-300 dark:border-amber-700 rounded-lg cursor-pointer hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors"
            >
              <Upload className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span className="text-amber-900 dark:text-amber-100">
                {prescriptionFile ? prescriptionFile.name : 'Upload Prescription (PDF, JPG, PNG)'}
              </span>
            </label>
            <input
              id="prescription"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              className="hidden"
            />
          </Card>
        )}

        {/* Order Summary */}
        <Card className="p-6 mb-6">
          <h3 className="text-gray-900 dark:text-white mb-4">Order Summary</h3>
          
          <div className="space-y-3 mb-4">
            {cart.map((item) => (
              <div key={item.medicine.id} className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white">{item.medicine.name}</p>
                  <p className="text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                  {item.medicine.requiresPrescription && (
                    <Badge variant="outline" className="mt-1 text-xs border-orange-500 text-orange-600">
                      Prescription Required
                    </Badge>
                  )}
                </div>
                <p className="text-gray-900 dark:text-white">
                  ${(item.medicine.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-2">
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Subtotal</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Shipping Fee</span>
              <span>${shippingFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-900 dark:text-white">Total</span>
              <span className="text-pink-600 dark:text-pink-400">${total.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        {/* Payment Method */}
        <Card className="p-6 mb-6">
          <h3 className="text-gray-900 dark:text-white mb-4">Payment Method</h3>
          
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <input
                type="radio"
                name="payment"
                value="gcash"
                checked={paymentMethod === 'gcash'}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="w-4 h-4 text-pink-500"
              />
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white">GCash</p>
                <p className="text-gray-500 dark:text-gray-400">Pay with GCash</p>
              </div>
              <CreditCard className="w-6 h-6 text-gray-400" />
            </label>

            <label className="flex items-center gap-3 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <input
                type="radio"
                name="payment"
                value="paymaya"
                checked={paymentMethod === 'paymaya'}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="w-4 h-4 text-pink-500"
              />
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white">PayMaya</p>
                <p className="text-gray-500 dark:text-gray-400">Pay with PayMaya</p>
              </div>
              <CreditCard className="w-6 h-6 text-gray-400" />
            </label>

            <label className="flex items-center gap-3 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <input
                type="radio"
                name="payment"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="w-4 h-4 text-pink-500"
              />
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white">PayPal</p>
                <p className="text-gray-500 dark:text-gray-400">Pay with PayPal</p>
              </div>
              <CreditCard className="w-6 h-6 text-gray-400" />
            </label>
          </div>
        </Card>

        {/* Place Order Button */}
        <Button
          onClick={handlePlaceOrder}
          className="w-full bg-pink-500 hover:bg-pink-600 h-12"
        >
          <CheckCircle className="w-5 h-5 mr-2" />
          Place Order (${total.toFixed(2)})
        </Button>
      </div>
    </ResponsiveLayout>
  );
};
