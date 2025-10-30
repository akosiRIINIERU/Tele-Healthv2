import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Doctor, User } from '../App';
import { 
  ArrowLeft,
  Phone,
  Video,
  Send,
  Paperclip,
  Smile
} from 'lucide-react';

interface ChatScreenProps {
  doctor?: Doctor | null;
  patient?: User | null;
  onNavigate: (screen: string, data?: any) => void;
}

export function ChatScreen({ doctor, patient, onNavigate }: ChatScreenProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: doctor ? 'doctor' : 'patient',
      text: 'Hello! How can I help you today?',
      time: '10:30 AM',
      isMe: false
    },
    {
      id: '2',
      sender: patient ? 'patient' : 'doctor',
      text: 'Hi Doctor, I have been experiencing some headaches lately.',
      time: '10:32 AM',
      isMe: true
    },
    {
      id: '3',
      sender: doctor ? 'doctor' : 'patient',
      text: 'I understand. Can you tell me more about when these headaches occur?',
      time: '10:33 AM',
      isMe: false
    }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: Date.now().toString(),
      sender: patient ? 'patient' : 'doctor',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const otherPerson = doctor || patient;
  const isDoctor = !patient; // If no patient prop, user is doctor

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b bg-white">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => onNavigate(isDoctor ? 'doctor-dashboard' : 'patient-dashboard')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          {otherPerson && (
            <>
              <Avatar>
                <img src={otherPerson.avatar || doctor?.avatar} alt={otherPerson.name} className="w-full h-full object-cover" />
                <AvatarFallback>{otherPerson.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h3 className="font-medium">{otherPerson.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {doctor?.specialty || 'Patient'}
                </p>
              </div>
              
              {doctor?.status && (
                <Badge variant={doctor.status === 'available' ? 'default' : 'secondary'}>
                  {doctor.status}
                </Badge>
              )}
            </>
          )}
        </div>
        
        <div className="flex gap-2 mt-3">
          <Button size="sm" variant="outline" className="flex-1">
            <Phone className="h-4 w-4 mr-2" />
            Voice Call
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <Video className="h-4 w-4 mr-2" />
            Video Call
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              msg.isMe 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-white border'
            }`}>
              <p className="text-sm">{msg.text}</p>
              <p className={`text-xs mt-1 ${msg.isMe ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Paperclip className="h-5 w-5" />
          </Button>
          
          <Input
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1"
          />
          
          <Button variant="ghost" size="icon">
            <Smile className="h-5 w-5" />
          </Button>
          
          <Button size="icon" onClick={handleSend}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}