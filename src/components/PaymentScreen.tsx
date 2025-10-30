import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { User } from '../App';
import { 
  ArrowLeft,
  CreditCard,
  DollarSign,
  TrendingUp,
  Calendar,
  Download,
  Plus,
  Wallet,
  Building
} from 'lucide-react';

interface PaymentScreenProps {
  user: User;
  onNavigate: (screen: string, data?: any) => void;
}

export function PaymentScreen({ user, onNavigate }: PaymentScreenProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('');

  const paymentMethods = [
    {
      id: 'paypal',
      name: 'PayPal',
      icon: '🟦',
      connected: true
    },
    {
      id: 'paymaya',
      name: 'PayMaya',
      icon: '🟢',
      connected: false
    },
    {
      id: 'gcash',
      name: 'GCash',
      icon: '🔵',
      connected: true
    }
  ];

  const mockTransactions = [
    {
      id: '1',
      type: user.type === 'patient' ? 'payment' : 'earning',
      amount: user.type === 'patient' ? -50 : 50,
      description: 'Dr. Sarah Johnson - Consultation',
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: '2',
      type: user.type === 'patient' ? 'payment' : 'earning',
      amount: user.type === 'patient' ? -80 : 80,
      description: user.type === 'patient' ? 'Dr. Michael Chen - Cardiology' : 'John Doe - Cardiology Consultation',
      date: '2024-01-10',
      status: 'completed'
    }
  ];

  const stats = {
    totalSpent: user.type === 'patient' ? 450 : undefined,
    totalEarned: user.type === 'doctor' ? 2850 : undefined,
    thisMonth: user.type === 'patient' ? 130 : 850,
    pendingAmount: user.type === 'doctor' ? 150 : undefined
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => onNavigate(user.type === 'patient' ? 'patient-dashboard' : 'doctor-dashboard')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1>{user.type === 'patient' ? 'Payments' : 'Earnings'}</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-semibold">
              ${user.type === 'patient' ? stats.totalSpent : stats.totalEarned}
            </p>
            <p className="text-xs text-muted-foreground">
              {user.type === 'patient' ? 'Total Spent' : 'Total Earned'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-semibold">${stats.thisMonth}</p>
            <p className="text-xs text-muted-foreground">This Month</p>
          </CardContent>
        </Card>
      </div>

      {user.type === 'doctor' && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-green-800">Pending Earnings</h3>
                <p className="text-2xl font-semibold text-green-900">${stats.pendingAmount}</p>
                <p className="text-sm text-green-600">Available for withdrawal</p>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">
                <Download className="h-4 w-4 mr-2" />
                Withdraw
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue={user.type === 'patient' ? 'methods' : 'transactions'}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="methods" className="space-y-4">
          {/* Payment Methods */}
          <div className="flex items-center justify-between">
            <h3>Connected Methods</h3>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Method
            </Button>
          </div>
          
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <Card key={method.id} className={`cursor-pointer transition-colors ${
                selectedMethod === method.id ? 'border-primary' : ''
              }`} onClick={() => setSelectedMethod(method.id)}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{method.icon}</div>
                      <div>
                        <h4 className="font-medium">{method.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {method.connected ? 'Connected' : 'Not connected'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {method.connected && (
                        <Badge variant="default" className="text-xs">
                          Active
                        </Badge>
                      )}
                      {selectedMethod === method.id && (
                        <div className="w-4 h-4 bg-primary rounded-full" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {user.type === 'patient' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Add Credit Card
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Card Number" />
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="MM/YY" />
                  <Input placeholder="CVC" />
                </div>
                <Input placeholder="Cardholder Name" />
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Card
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="transactions" className="space-y-4">
          {/* Transaction History */}
          <div className="flex items-center justify-between">
            <h3>Recent Transactions</h3>
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          
          <div className="space-y-3">
            {mockTransactions.map((transaction) => (
              <Card key={transaction.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        transaction.amount > 0 ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {transaction.amount > 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <CreditCard className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{transaction.description}</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount)}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Subscription Card for Patients */}
      {user.type === 'patient' && (
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-6">
            <div className="text-center">
              <Building className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-medium text-purple-800 mb-2">Premium Membership</h3>
              <p className="text-sm text-purple-600 mb-4">
                Get unlimited consultations and priority booking
              </p>
              <Button variant="outline" className="text-purple-700 border-purple-300">
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}