import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MobileLayout } from '../MobileLayout';
import { BottomNav } from '../BottomNav';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Heart, Send, Paperclip, Smile } from 'lucide-react';
import { mockDoctors, Message } from '../../lib/mockData';

export const ChatScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const [selectedDoctor, setSelectedDoctor] = useState(id || '');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: '1',
      senderName: 'Dr. Sarah Smith',
      text: 'Hello! How can I help you today?',
      timestamp: new Date(Date.now() - 3600000),
      isMe: false,
    },
    {
      id: '2',
      senderId: 'me',
      senderName: 'You',
      text: 'Hi Doctor, I have been experiencing headaches.',
      timestamp: new Date(Date.now() - 3500000),
      isMe: true,
    },
    {
      id: '3',
      senderId: '1',
      senderName: 'Dr. Sarah Smith',
      text: 'I understand. How long have you been experiencing these headaches?',
      timestamp: new Date(Date.now() - 3400000),
      isMe: false,
    },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      senderName: 'You',
      text: message,
      timestamp: new Date(),
      isMe: true,
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Simulate doctor response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        senderId: selectedDoctor,
        senderName: 'Dr. Sarah Smith',
        text: 'Thank you for sharing that information. Let me review your symptoms.',
        timestamp: new Date(),
        isMe: false,
      };
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  if (!selectedDoctor) {
    return (
      <MobileLayout title="Messages">
        <div className="pb-20 p-4">
          <div className="space-y-3">
            {mockDoctors.slice(0, 3).map((doctor) => (
              <Card
                key={doctor.id}
                className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/patient/chat/${doctor.id}`)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center relative">
                    <Heart className="w-7 h-7 text-pink-500" />
                    {doctor.status === 'available' && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 dark:text-white mb-1">{doctor.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {doctor.specialization}
                    </p>
                  </div>
                  <div className="text-gray-400">
                    <p>2h ago</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <BottomNav />
      </MobileLayout>
    );
  }

  const doctor = mockDoctors.find(d => d.id === selectedDoctor);

  return (
    <MobileLayout
      title={doctor?.name || 'Chat'}
      showBack
      rightAction={
        <button onClick={() => navigate(`/patient/call/${selectedDoctor}`)}>
          <Heart className="w-5 h-5 text-pink-500" />
        </button>
      }
    >
      <div className="flex flex-col h-[calc(100vh-3.5rem)]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                  msg.isMe
                    ? 'bg-pink-500 text-white rounded-br-none'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
                }`}
              >
                <p>{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.isMe ? 'text-pink-100' : 'text-gray-500 dark:text-gray-400'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
              <Paperclip className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1"
            />
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
              <Smile className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
            <Button
              onClick={handleSend}
              className="bg-pink-500 hover:bg-pink-600 rounded-full p-2 h-auto"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};
