import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ResponsiveLayout } from '../ResponsiveLayout';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Star, Plus, Minus, ShoppingCart, AlertTriangle, Package, Shield, Truck } from 'lucide-react';
import { mockMedicines } from '../../lib/mockData';
import { useCart } from '../../contexts/CartContext';
import { toast } from 'sonner';

export const MedicineDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const medicine = mockMedicines.find((m) => m.id === id);

  if (!medicine) {
    return (
      <ResponsiveLayout title="Medicine Not Found" showBack>
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500 dark:text-gray-400">Medicine not found</p>
        </div>
      </ResponsiveLayout>
    );
  }

  const handleAddToCart = () => {
    if (medicine.requiresPrescription) {
      toast.error('This medicine requires a prescription. Please upload your prescription at checkout.');
    } else {
      toast.success(`Added ${quantity}x ${medicine.name} to cart!`);
    }
    addToCart(medicine, quantity);
  };

  const handleBuyNow = () => {
    addToCart(medicine, quantity);
    navigate('/patient/cart');
  };

  return (
    <ResponsiveLayout title="Product Details" showBack>
      <div className="pb-32">
        {/* Product Image */}
        <div className="aspect-square max-h-96 bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <ImageWithFallback
            src={medicine.image}
            alt={medicine.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-4 md:p-6 lg:p-8">
          {/* Product Info */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex gap-2 mb-2">
                  <Badge className="bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300">
                    {medicine.category}
                  </Badge>
                  {medicine.requiresPrescription && (
                    <Badge variant="outline" className="border-orange-500 text-orange-600">
                      Prescription Required
                    </Badge>
                  )}
                </div>
                <h1 className="text-gray-900 dark:text-white mb-2">{medicine.name}</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  {medicine.manufacturer} • {medicine.dosage}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="text-gray-900 dark:text-white">{medicine.rating}</span>
              </div>
              <span className="text-gray-500 dark:text-gray-400">
                ({medicine.reviews} reviews)
              </span>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-gray-500 dark:text-gray-400 mb-1">Price</p>
                <p className="text-pink-600 dark:text-pink-400">${medicine.price}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500 dark:text-gray-400 mb-1">Availability</p>
                <p className={medicine.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                  {medicine.stock > 0 ? `${medicine.stock} in stock` : 'Out of stock'}
                </p>
              </div>
            </div>

            {/* Prescription Warning */}
            {medicine.requiresPrescription && (
              <Card className="p-4 mb-6 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-amber-900 dark:text-amber-100 mb-1">Prescription Required</h4>
                    <p className="text-amber-800 dark:text-amber-200">
                      This medication requires a valid prescription from a licensed healthcare provider. 
                      You'll need to upload your prescription during the checkout process.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-gray-900 dark:text-white mb-2">Description</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {medicine.description}
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="p-4 bg-green-50 dark:bg-green-900/20">
                <Shield className="w-6 h-6 text-green-600 dark:text-green-400 mb-2" />
                <h4 className="text-gray-900 dark:text-white mb-1">Verified Product</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Authentic medication
                </p>
              </Card>
              
              <Card className="p-4 bg-blue-50 dark:bg-blue-900/20">
                <Truck className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
                <h4 className="text-gray-900 dark:text-white mb-1">Fast Delivery</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  2-3 business days
                </p>
              </Card>
              
              <Card className="p-4 bg-purple-50 dark:bg-purple-900/20">
                <Package className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2" />
                <h4 className="text-gray-900 dark:text-white mb-1">Secure Packaging</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Discreet & safe
                </p>
              </Card>
            </div>

            {/* How to Use */}
            <Card className="p-4 bg-pink-50 dark:bg-pink-900/20 mb-6">
              <h3 className="text-gray-900 dark:text-white mb-2">How to Use</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>Follow the dosage instructions on the label</li>
                <li>Take with water unless otherwise directed</li>
                <li>Do not exceed recommended dosage</li>
                <li>Consult your doctor if symptoms persist</li>
                <li>Store in a cool, dry place away from direct sunlight</li>
              </ul>
            </Card>

            {/* Disclaimer */}
            <Card className="p-4 bg-purple-50 dark:bg-purple-900/20">
              <h3 className="text-gray-900 dark:text-white mb-2">⚠️ Disclaimer</h3>
              <p className="text-gray-700 dark:text-gray-300">
                This is a demo app. Always consult with a qualified healthcare provider before 
                taking any medication. This product information is for educational purposes only 
                and should not be considered medical advice.
              </p>
            </Card>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 md:p-6 z-20">
          <div className="max-w-7xl mx-auto flex items-center gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-gray-900 dark:text-white w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(medicine.stock, quantity + 1))}
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600"
                disabled={quantity >= medicine.stock}
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <Button
              onClick={handleAddToCart}
              variant="outline"
              className="flex-1"
              disabled={medicine.stock === 0}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>

            <Button
              onClick={handleBuyNow}
              className="flex-1 bg-pink-500 hover:bg-pink-600"
              disabled={medicine.stock === 0}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </ResponsiveLayout>
  );
};
