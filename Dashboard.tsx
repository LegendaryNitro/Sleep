import React from 'react';
import { Music, Video, TrendingUp, DollarSign, Clock, CheckCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Total Releases', value: '24', icon: Music, color: 'blue' },
    { label: 'Pending Review', value: '3', icon: Clock, color: 'yellow' },
    { label: 'This Month Earnings', value: '$1,247', icon: DollarSign, color: 'green' },
    { label: 'Active Streams', value: '15.2K', icon: TrendingUp, color: 'purple' },
  ];

  const recentReleases = [
    { id: 1, title: 'Summer Vibes', type: 'Music', status: 'Live', earnings: '$342' },
    { id: 2, title: 'Midnight Dreams', type: 'Video', status: 'Review', earnings: '$0' },
    { id: 3, title: 'Electric Nights', type: 'Music', status: 'Live', earnings: '$189' },
    { id: 4, title: 'City Lights', type: 'Video', status: 'Live', earnings: '$567' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live': return 'text-green-600 bg-green-50';
      case 'Review': return 'text-yellow-600 bg-yellow-50';
      case 'Rejected': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case 'blue': return 'text-blue-600 bg-blue-50';
      case 'yellow': return 'text-yellow-600 bg-yellow-50';
      case 'green': return 'text-green-600 bg-green-50';
      case 'purple': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your content overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getIconColor(stat.color)}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Releases */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Releases</h2>
          <div className="space-y-4">
            {recentReleases.map((release) => (
              <div key={release.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    release.type === 'Music' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                  }`}>
                    {release.type === 'Music' ? <Music className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{release.title}</p>
                    <p className="text-sm text-gray-500">{release.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(release.status)}`}>
                    {release.status}
                  </span>
                  <p className="text-sm font-medium text-gray-900 mt-1">{release.earnings}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left">
              <Music className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900">Upload Music</p>
                <p className="text-sm text-blue-600">Distribute to streaming platforms</p>
              </div>
            </button>
            <button className="w-full flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left">
              <Video className="w-6 h-6 text-purple-600" />
              <div>
                <p className="font-medium text-purple-900">Upload Video</p>
                <p className="text-sm text-purple-600">Distribute to OTT platforms</p>
              </div>
            </button>
            <button className="w-full flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left">
              <DollarSign className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-medium text-green-900">View Earnings</p>
                <p className="text-sm text-green-600">Check your payout status</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Distribution Status */}
      <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Distribution Status</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">18 Platforms</h3>
            <p className="text-sm text-gray-500">Successfully distributed</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">3 Platforms</h3>
            <p className="text-sm text-gray-500">Pending approval</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">15.2K</h3>
            <p className="text-sm text-gray-500">Total streams this month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;