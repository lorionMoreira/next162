import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export const metadata = {
  title: 'Reports | Admin Dashboard',
  description: 'View system reports and analytics',
};

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Reports</h1>
        <p className="text-gray-400 mt-1">System analytics and reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border border-gray-700 rounded-lg bg-gray-900">
              <p className="text-gray-500">Chart placeholder - integrate with charting library</p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-white">1,234</p>
                <p className="text-sm text-gray-400">Total Users</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-400">+156</p>
                <p className="text-sm text-gray-400">This Month</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-400">89%</p>
                <p className="text-sm text-gray-400">Active Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Activity Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border border-gray-700 rounded-lg bg-gray-900">
              <p className="text-gray-500">Chart placeholder - integrate with charting library</p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-white">5,678</p>
                <p className="text-sm text-gray-400">Total Sessions</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-400">12m</p>
                <p className="text-sm text-gray-400">Avg Duration</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-400">3.2</p>
                <p className="text-sm text-gray-400">Pages/Session</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800 border border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'Monthly User Report - February 2024', date: '2024-03-01', type: 'PDF' },
              { name: 'System Performance Analysis Q1', date: '2024-02-28', type: 'PDF' },
              { name: 'User Engagement Metrics', date: '2024-02-15', type: 'Excel' },
              { name: 'Security Audit Report', date: '2024-02-01', type: 'PDF' },
            ].map((report, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-gray-700 last:border-0"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-300">{report.type}</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{report.name}</p>
                    <p className="text-sm text-gray-400">Generated: {report.date}</p>
                  </div>
                </div>
                <button className="px-3 py-1 text-sm text-blue-400 hover:text-blue-300 border border-blue-400 hover:border-blue-300 rounded-lg transition-colors">
                  Download
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
