import React from 'react';
import { Users, FileText, AlertTriangle, CheckCircle, Download, TrendingUp } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const stats = [
    { label: 'Pending Reviews', value: '47', icon: FileText, color: 'yellow', urgent: true },
    { label: 'Artwork Issues', value: '12', icon: AlertTriangle, color: 'red', urgent: true },
    { label: 'Active Users', value: '1,234', icon: Users, color: 'blue' },
    { label: 'This Month Releases', value: '89', icon: CheckCircle, color: 'green' },
  ];

  const recentSubmissions = [
    { id: 1, artist: 'John Smith', title: 'Summer Vibes', type: 'Music', submitted: '2 hours ago', status: 'Pending' },
    { id: 2, artist: 'Sarah Johnson', title: 'Midnight Dreams', type: 'Video', submitted: '4 hours ago', status: 'Artwork Issue' },
    { id: 3, artist: 'Mike Wilson', title: 'Electric Nights', type: 'Music', submitted: '6 hours ago', status: 'Approved' },
    { id: 4, artist: 'Emma Davis', title: 'City Lights', type: 'Video', submitted: '8 hours ago', status: 'Pending' },
  ];

  const artworkIssues = [
    { id: 1, artist: 'Sarah Johnson', title: 'Midnight Dreams', issue: 'Contains 5 colors (limit: 2)', type: 'Video' },
    { id: 2, artist: 'Tom Brown', title: 'Ocean Waves', issue: 'Gradient background detected', type: 'Music' },
    { id: 3, artist: 'Lisa Chen', title: 'Night Sky', issue: 'Photo background not allowed', type: 'Music' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'text-green-600 bg-green-50';
      case 'Pending': return 'text-yellow-600 bg-yellow-50';
      case 'Artwork Issue': return 'text-red-600 bg-red-50';
      case 'Rejected': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case 'blue': return 'text-blue-600 bg-blue-50';
      case 'yellow': return 'text-yellow-600 bg-yellow-50';
      case 'green': return 'text-green-600 bg-green-50';
      case 'red': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage content reviews, artwork validation, and user oversight.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`bg-white rounded-lg border p-6 ${stat.urgent ? 'border-red-200 bg-red-50/30' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  {stat.urgent && <p className="text-xs text-red-600 mt-1">Requires attention</p>}
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getIconColor(stat.color)}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Submissions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Submissions</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {recentSubmissions.map((submission) => (
              <div key={submission.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{submission.title}</p>
                  <p className="text-sm text-gray-500">{submission.artist} • {submission.type}</p>
                  <p className="text-xs text-gray-400">{submission.submitted}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                    {submission.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Artwork Issues */}
        <div className="bg-white rounded-lg border border-red-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Artwork Issues</h2>
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {artworkIssues.length} Issues
            </span>
          </div>
          <div className="space-y-4">
            {artworkIssues.map((issue) => (
              <div key={issue.id} className="p-4 bg-red-50 rounded-lg border border-red-100">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{issue.title}</p>
                    <p className="text-sm text-gray-600">{issue.artist} • {issue.type}</p>
                    <p className="text-sm text-red-600 mt-1">{issue.issue}</p>
                  </div>
                  <button className="text-red-600 hover:text-red-700 text-sm font-medium ml-4">
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Review Queue</h3>
          </div>
          <p className="text-gray-600 mb-4">Process pending submissions and approvals</p>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            Open Review Queue
          </button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Artwork QC</h3>
          </div>
          <p className="text-gray-600 mb-4">Validate artwork compliance and color rules</p>
          <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
            Check Artwork
          </button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Download className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Export Data</h3>
          </div>
          <p className="text-gray-600 mb-4">Generate Excel reports with 4 sheets</p>
          <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
            Export XLSX
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;