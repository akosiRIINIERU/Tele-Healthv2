import React, { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { SidebarNav } from './SidebarNav';
import { BottomNav } from './BottomNav';

interface ResponsiveLayoutProps {
  children: ReactNode;
  title?: string;
  showBack?: boolean;
  rightAction?: ReactNode;
  showBottomNav?: boolean;
}

export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  children,
  title,
  showBack = false,
  rightAction,
  showBottomNav = true,
}) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="flex">
        {/* Sidebar for desktop/tablet */}
        <SidebarNav />

        {/* Main content area */}
        <div className="flex-1 min-h-screen">
          <div className="max-w-full md:max-w-none mx-auto bg-white dark:bg-gray-800 min-h-screen">
            {title && (
              <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 h-14 md:h-16">
                  {showBack ? (
                    <button
                      onClick={() => navigate(-1)}
                      className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                    >
                      <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700 dark:text-gray-200" />
                    </button>
                  ) : (
                    <div className="w-9 md:hidden" />
                  )}
                  <h1 className="text-gray-900 dark:text-white">{title}</h1>
                  <div className="w-9">{rightAction}</div>
                </div>
              </div>
            )}
            <div className={`${title ? '' : 'pt-0'} ${showBottomNav ? 'pb-20 md:pb-0' : ''}`}>
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom nav only on mobile */}
      {showBottomNav && <BottomNav />}
    </div>
  );
};
