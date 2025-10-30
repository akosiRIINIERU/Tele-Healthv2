import React, { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

interface MobileLayoutProps {
  children: ReactNode;
  title?: string;
  showBack?: boolean;
  rightAction?: ReactNode;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({
  children,
  title,
  showBack = false,
  rightAction,
}) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 min-h-screen shadow-xl">
        {title && (
          <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between px-4 h-14">
              {showBack ? (
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                </button>
              ) : (
                <div className="w-9" />
              )}
              <h1 className="text-gray-900 dark:text-white">{title}</h1>
              <div className="w-9">{rightAction}</div>
            </div>
          </div>
        )}
        <div className={title ? '' : 'pt-0'}>{children}</div>
      </div>
    </div>
  );
};
