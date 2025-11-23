import React from 'react';
import { ResponsiveLayout } from '../ResponsiveLayout';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';
import { mockOrders } from '../../lib/mockData';

export const Orders: React.FC = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'processing':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      case 'processing':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'shipped':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
      case 'delivered':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  if (mockOrders.length === 0) {
    return (
      <ResponsiveLayout title="My Orders" showBack>
        <div className="flex flex-col items-center justify-center h-96 px-4">
          <Package className="w-20 h-20 text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-gray-900 dark:text-white mb-2">No orders yet</h3>
          <p className="text-gray-500 dark:text-gray-400 text-center">
            Your medicine orders will appear here
          </p>
        </div>
      </ResponsiveLayout>
    );
  }

  return (
    <ResponsiveLayout title="My Orders" showBack>
      <div className="p-4 md:p-6 lg:p-8">
        <div className="space-y-4">
          {mockOrders.map((order) => (
            <Card key={order.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  {getStatusIcon(order.status)}
                  <div>
                    <h3 className="text-gray-900 dark:text-white mb-1">
                      Order #{order.id}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      {new Date(order.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <Badge className={getStatusColor(order.status)}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
                <p className="text-gray-600 dark:text-gray-400 mb-2">Items:</p>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <p className="text-gray-900 dark:text-white">
                        {item.medicine.name} x {item.quantity}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        ${(item.medicine.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
                <div className="flex justify-between mb-2">
                  <p className="text-gray-600 dark:text-gray-400">Payment Method:</p>
                  <p className="text-gray-900 dark:text-white">{order.paymentMethod}</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p className="text-gray-600 dark:text-gray-400">Delivery Address:</p>
                  <p className="text-gray-900 dark:text-white text-right max-w-xs">
                    {order.deliveryAddress}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between items-center">
                <p className="text-gray-600 dark:text-gray-400">Total:</p>
                <p className="text-pink-600 dark:text-pink-400">
                  ${order.total.toFixed(2)}
                </p>
              </div>

              {order.status === 'shipped' && (
                <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-purple-700 dark:text-purple-300">
                    📦 Your order is on the way! Expected delivery: 2-3 business days
                  </p>
                </div>
              )}

              {order.status === 'delivered' && (
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-green-700 dark:text-green-300">
                    ✓ Order delivered successfully
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </ResponsiveLayout>
  );
};
