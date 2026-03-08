import { getCurrentUser } from '@/lib/auth';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export default async function AdminDashboardPage() {
  const user = await getCurrentUser(true);

  const stats = [
    { label: 'Total Users', value: '1,234', change: '+12%', color: 'bg-blue-500' },
    { label: 'Active Sessions', value: '89', change: '+5%', color: 'bg-green-500' },
    { label: 'Pending Requests', value: '23', change: '-8%', color: 'bg-yellow-500' },
    { label: 'System Alerts', value: '3', change: '+2', color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Admin Dashboard
        </h1>
        <p className="text-gray-400 mt-1">
          Welcome back, {user?.username || 'Admin'}. Here&apos;s your system overview.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-gray-800 border border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center opacity-80`}>
                  <span className="text-white text-sm font-medium">{stat.change}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Recent User Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'John Doe', email: 'john@example.com', time: '2 min ago' },
                { name: 'Jane Smith', email: 'jane@example.com', time: '15 min ago' },
                { name: 'Mike Johnson', email: 'mike@example.com', time: '1 hour ago' },
                { name: 'Sarah Wilson', email: 'sarah@example.com', time: '3 hours ago' },
              ].map((user, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-gray-700 last:border-0"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                      <span className="text-gray-300 font-medium">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-sm text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{user.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { service: 'API Server', status: 'Operational', statusColor: 'bg-green-500' },
                { service: 'Database', status: 'Operational', statusColor: 'bg-green-500' },
                { service: 'Authentication', status: 'Operational', statusColor: 'bg-green-500' },
                { service: 'File Storage', status: 'Degraded', statusColor: 'bg-yellow-500' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-gray-700 last:border-0"
                >
                  <span className="text-gray-300">{item.service}</span>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${item.statusColor}`} />
                    <span className="text-sm text-gray-400">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800 border border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Add User', icon: '👤' },
              { label: 'View Reports', icon: '📊' },
              { label: 'System Logs', icon: '📋' },
              { label: 'Settings', icon: '⚙️' },
            ].map((action) => (
              <button
                key={action.label}
                className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors"
              >
                <span className="text-2xl mb-2">{action.icon}</span>
                <span className="text-sm font-medium text-gray-300">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
