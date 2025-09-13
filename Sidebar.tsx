import React from 'react';
import { Music, Video, Upload, FileText, Settings, BarChart3, Users, Download } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  currentView: string;
  onViewChange: (view: string) => void;
  userRole: 'artist' | 'admin' | 'finance';
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, currentView, onViewChange, userRole }) => {
  const artistMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'music-upload', label: 'Upload Music', icon: Music },
    { id: 'video-upload', label: 'Upload Video', icon: Video },
    { id: 'releases', label: 'My Releases', icon: FileText },
    { id: 'profile', label: 'Profile', icon: Settings },
  ];

  const adminMenuItems = [
    { id: 'admin-dashboard', label: 'Admin Dashboard', icon: BarChart3 },
    { id: 'review-queue', label: 'Review Queue', icon: FileText },
    { id: 'artwork-qc', label: 'Artwork QC', icon: Upload },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'export', label: 'Export Data', icon: Download },
  ];

  const financeMenuItems = [
    { id: 'finance-dashboard', label: 'Finance Dashboard', icon: BarChart3 },
    { id: 'payouts', label: 'Payouts', icon: Download },
    { id: 'statements', label: 'Statements', icon: FileText },
  ];

  const getMenuItems = () => {
    switch (userRole) {
      case 'admin': return adminMenuItems;
      case 'finance': return financeMenuItems;
      default: return artistMenuItems;
    }
  };

  return (
    <div className={`fixed left-0 top-0 h-full bg-gray-900 text-white transition-transform duration-300 z-40 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } w-64`}>
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">ARO</span>
          </div>
          <span className="text-xl font-bold">ARO Platform</span>
        </div>

        <nav className="space-y-2">
          {getMenuItems().map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  currentView === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;