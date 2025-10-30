import React from 'react';
import { MobileLayout } from '../MobileLayout';
import { BottomNav } from '../BottomNav';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Droplets, Moon, Activity, Apple, Heart, Sun } from 'lucide-react';
import { mockHealthTips } from '../../lib/mockData';

const iconMap: Record<string, any> = {
  droplets: Droplets,
  moon: Moon,
  activity: Activity,
  apple: Apple,
  heart: Heart,
  sun: Sun,
};

export const HealthTipsScreen: React.FC = () => {
  return (
    <MobileLayout title="Daily Health Tips" showBack>
      <div className="pb-20 p-4">
        {/* Today's Tip */}
        <div className="mb-6">
          <h3 className="text-gray-900 dark:text-white mb-3">Today's Featured Tip</h3>
          {mockHealthTips[0] && (
            <Card className="p-6 bg-gradient-to-br from-pink-500 to-pink-600 text-white">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                  {React.createElement(iconMap[mockHealthTips[0].icon] || Heart, {
                    className: 'w-6 h-6',
                  })}
                </div>
                <div>
                  <Badge className="mb-2 bg-white/20 text-white border-0">
                    {mockHealthTips[0].category}
                  </Badge>
                  <h2 className="text-white mb-2">{mockHealthTips[0].title}</h2>
                  <p className="text-pink-100">{mockHealthTips[0].description}</p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* All Tips */}
        <div>
          <h3 className="text-gray-900 dark:text-white mb-3">All Health Tips</h3>
          <div className="grid gap-3">
            {mockHealthTips.map((tip) => {
              const Icon = iconMap[tip.icon] || Heart;
              return (
                <Card key={tip.id} className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-pink-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-gray-900 dark:text-white">{tip.title}</h3>
                        <Badge variant="secondary" className="ml-2">
                          {tip.category}
                        </Badge>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        {tip.description}
                      </p>
                      <p className="text-gray-500 dark:text-gray-500">
                        {new Date(tip.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Additional Tips Categories */}
        <div className="mt-6">
          <h3 className="text-gray-900 dark:text-white mb-3">Categories</h3>
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white cursor-pointer hover:shadow-lg transition-shadow">
              <Droplets className="w-8 h-8 mb-2" />
              <h4 className="text-white">Hydration</h4>
              <p className="text-blue-100">Stay healthy</p>
            </Card>
            
            <Card className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 text-white cursor-pointer hover:shadow-lg transition-shadow">
              <Moon className="w-8 h-8 mb-2" />
              <h4 className="text-white">Sleep</h4>
              <p className="text-purple-100">Rest well</p>
            </Card>
            
            <Card className="p-4 bg-gradient-to-br from-green-500 to-green-600 text-white cursor-pointer hover:shadow-lg transition-shadow">
              <Activity className="w-8 h-8 mb-2" />
              <h4 className="text-white">Exercise</h4>
              <p className="text-green-100">Stay active</p>
            </Card>
            
            <Card className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 text-white cursor-pointer hover:shadow-lg transition-shadow">
              <Apple className="w-8 h-8 mb-2" />
              <h4 className="text-white">Nutrition</h4>
              <p className="text-orange-100">Eat healthy</p>
            </Card>
          </div>
        </div>
      </div>

      <BottomNav />
    </MobileLayout>
  );
};
