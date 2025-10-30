import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  ArrowLeft,
  Heart,
  Droplets,
  Moon,
  Activity,
  Apple,
  Sun,
  Brain,
  Shield,
  BookOpen
} from 'lucide-react';

interface HealthTipsScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function HealthTipsScreen({ onNavigate }: HealthTipsScreenProps) {
  const dailyTips = [
    {
      id: '1',
      title: 'Stay Hydrated',
      description: 'Drink at least 8 glasses of water daily to maintain optimal body functions',
      icon: Droplets,
      category: 'Nutrition',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: '2',
      title: 'Get Quality Sleep',
      description: 'Aim for 7-9 hours of sleep each night for better physical and mental health',
      icon: Moon,
      category: 'Sleep',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: '3',
      title: 'Exercise Regularly',
      description: 'Engage in at least 30 minutes of moderate exercise 5 times a week',
      icon: Activity,
      category: 'Fitness',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: '4',
      title: 'Eat Nutritious Foods',
      description: 'Include plenty of fruits, vegetables, and whole grains in your diet',
      icon: Apple,
      category: 'Nutrition',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      id: '5',
      title: 'Practice Mindfulness',
      description: 'Take 10 minutes daily for meditation or deep breathing exercises',
      icon: Brain,
      category: 'Mental Health',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      id: '6',
      title: 'Get Sunlight',
      description: 'Spend 15-20 minutes outdoors daily for vitamin D synthesis',
      icon: Sun,
      category: 'Wellness',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    }
  ];

  const weeklyGoals = [
    'Complete 150 minutes of moderate exercise',
    'Eat 5 servings of fruits and vegetables daily',
    'Maintain a consistent sleep schedule',
    'Practice stress management techniques'
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => onNavigate('patient-dashboard')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1>Health Tips & Wellness</h1>
      </div>

      {/* Featured Tip */}
      <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-pink-100 rounded-full">
              <Heart className="h-6 w-6 text-pink-600" />
            </div>
            <div>
              <Badge variant="secondary">Tip of the Day</Badge>
              <h3 className="font-medium mt-1">Listen to Your Body</h3>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Pay attention to what your body is telling you. Rest when you're tired, eat when you're hungry, 
            and don't ignore persistent symptoms. Your body is your best health indicator.
          </p>
        </CardContent>
      </Card>

      {/* Daily Health Tips */}
      <div>
        <h2 className="mb-4">Daily Health Tips</h2>
        <div className="space-y-3">
          {dailyTips.map((tip) => {
            const IconComponent = tip.icon;
            return (
              <Card key={tip.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className={`p-3 rounded-full ${tip.bgColor}`}>
                      <IconComponent className={`h-5 w-5 ${tip.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{tip.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {tip.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Weekly Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Weekly Wellness Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {weeklyGoals.map((goal, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-green-800">{index + 1}</span>
              </div>
              <span className="text-sm text-green-800">{goal}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-3">
        <Button 
          variant="outline" 
          className="justify-start h-auto p-4"
          onClick={() => onNavigate('articles')}
        >
          <BookOpen className="h-5 w-5 mr-3" />
          <div className="text-left">
            <p className="font-medium">Browse Health Articles</p>
            <p className="text-xs text-muted-foreground">Learn more about specific health topics</p>
          </div>
        </Button>
        
        <Button 
          variant="outline" 
          className="justify-start h-auto p-4"
          onClick={() => onNavigate('doctors')}
        >
          <Heart className="h-5 w-5 mr-3" />
          <div className="text-left">
            <p className="font-medium">Consult a Doctor</p>
            <p className="text-xs text-muted-foreground">Get personalized health advice</p>
          </div>
        </Button>
      </div>
    </div>
  );
}