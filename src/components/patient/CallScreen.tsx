import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MobileLayout } from '../MobileLayout';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Heart, Mic, MicOff, Video, VideoOff, Phone, Volume2 } from 'lucide-react';
import { mockDoctors } from '../../lib/mockData';

export const CallScreen: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const doctor = id ? mockDoctors.find(d => d.id === id) : null;

  useEffect(() => {
    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    navigate(-1);
  };

  return (
    <MobileLayout>
      <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-br from-pink-500 to-pink-600 p-6">
        {/* Call Info */}
        <div className="flex-1 flex flex-col items-center justify-center text-white">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-6 shadow-2xl">
            <Heart className="w-16 h-16 text-pink-500" />
          </div>
          
          <h2 className="text-white mb-2">{doctor?.name || 'Doctor'}</h2>
          <p className="text-pink-100 mb-6">{doctor?.specialization || 'Specialist'}</p>
          
          <div className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full">
            <p className="text-white">{formatDuration(callDuration)}</p>
          </div>

          <div className="mt-8 space-y-2 text-center">
            <p className="text-pink-100">Call in progress...</p>
            <div className="flex items-center justify-center gap-1">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-75" />
              <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-150" />
            </div>
          </div>
        </div>

        {/* Call Controls */}
        <div className="w-full">
          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                isMuted 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              {isMuted ? (
                <MicOff className="w-6 h-6 text-white" />
              ) : (
                <Mic className="w-6 h-6 text-white" />
              )}
            </button>

            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                !isVideoOn 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              {isVideoOn ? (
                <Video className="w-6 h-6 text-white" />
              ) : (
                <VideoOff className="w-6 h-6 text-white" />
              )}
            </button>

            <button
              className="w-16 h-16 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center"
            >
              <Volume2 className="w-6 h-6 text-white" />
            </button>
          </div>

          <Button
            onClick={handleEndCall}
            className="w-full h-14 bg-red-500 hover:bg-red-600 rounded-full"
          >
            <Phone className="w-6 h-6 mr-2 rotate-[135deg]" />
            End Call
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};
