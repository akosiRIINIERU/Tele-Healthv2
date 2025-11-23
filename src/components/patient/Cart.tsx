import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveLayout } from '../ResponsiveLayout';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Trash2, Plus, Minus, ShoppingCart, AlertTriangle } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { toast } from 'sonner';
import { Badge } from '../ui/badge';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    const hasPrescriptionItems = cart.some(item => item.medicine.requiresPrescription);
    
    if (hasPrescriptionItems) {
      toast.info('Please have your prescription ready for verification');
    }

    navigate('/patient/checkout');
  };

  const handleRemoveItem = (medicineId: string, medicineName: string) => {
    removeFromCart(medicineId);
    toast.success(`${medicineName} removed from cart`);
  };

  if (cart.length === 0) {
    return (
      <ResponsiveLayout title="Shopping Cart" showBack>
        <div className="flex flex-col items-center justify-center h-96 px-4">
          <ShoppingCart className="w-20 h-20 text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-gray-900 dark:text-white mb-2">Your cart is empty</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 text-center">
            Start shopping to add items to your cart
          </p>
          <Button
            onClick={() => navigate('/patient/medicine-shop')}
            className="bg-pink-500 hover:bg-pink-600"
          >
            Browse Medicines
          </Button>
        </div>
      </ResponsiveLayout>
    );
  }

  return (
    <ResponsiveLayout title="Shopping Cart" showBack>
      <div className="p-4 md:p-6 lg:p-8 pb-32">
        {/* Prescription Warning */}
        {cart.some(item => item.medicine.requiresPrescription) && (
          <Card className="p-4 mb-6 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-amber-900 dark:text-amber-100 mb-1">Prescription Required</h4>
                <p className="text-amber-800 dark:text-amber-200">
                  Some items in your cart require a valid prescription. You'll need to upload it during checkout.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Cart Items */}
        <div className="space-y-4 mb-6">
          {cart.map((item) => (
            <Card key={item.medicine.id} className="p-4">
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={item.medicine.image}
                    alt={item.medicine.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-gray-900 dark:text-white mb-1">{item.medicine.name}</h3>
                      <div className="flex gap-2">
                        <Badge className="bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300 text-xs">
                          {item.medicine.category}
                        </Badge>
                        {item.medicine.requiresPrescription && (
                          <Badge variant="outline" className="text-xs border-orange-500 text-orange-600">
                            Prescription Required
                          </Badge>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.medicine.id, item.medicine.name)}
                      className="text-red-500 hover:text-red-600 p-1"
                      aria-label={`Remove ${item.medicine.name}`}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {item.medicine.dosage} • {item.medicine.manufacturer}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.medicine.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-gray-900 dark:text-white w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.medicine.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600"
                        disabled={item.quantity >= item.medicine.stock}
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <p className="text-pink-600 dark:text-pink-400">
                      ${(item.medicine.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Summary Card */}
        <Card className="p-6 sticky bottom-20 md:bottom-6 z-10 bg-white dark:bg-gray-800 shadow-lg">
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Subtotal</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Shipping</span>
              <span>$5.00</span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between">
              <span className="text-gray-900 dark:text-white">Total</span>
              <span className="text-gray-900 dark:text-white">
                ${(getCartTotal() + 5).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => navigate('/patient/medicine-shop')}
              className="flex-1"
            >
              Continue Shopping
            </Button>
            <Button
              onClick={handleCheckout}
              className="flex-1 bg-pink-500 hover:bg-pink-600"
            >
              Proceed to Checkout
            </Button>
          </div>
        </Card>
      </div>
    </ResponsiveLayout>
  );
};
