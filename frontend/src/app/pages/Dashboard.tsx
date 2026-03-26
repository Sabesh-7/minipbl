import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { FileText, CheckCircle, Activity, TrendingUp } from "lucide-react";
import { api, DashboardStats } from "../../lib/api";

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getDashboardStats()
      .then(setStats)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const statCards = stats
    ? [
        { name: "Total Rules", value: String(stats.totalRules), icon: FileText, sub: `${stats.activeRules} active` },
        { name: "Active Rules", value: String(stats.activeRules), icon: CheckCircle, sub: stats.totalRules > 0 ? `${Math.round((stats.activeRules / stats.totalRules) * 100)}% of total` : "—" },
        { name: "Executions Today", value: String(stats.executionsToday), icon: Activity, sub: `${stats.totalExecutions} all time` },
        { name: "Success Rate", value: `${stats.successRate}%`, icon: TrendingUp, sub: `${stats.totalExecutions} total executions` },
      ]
    : [];

  function timeAgo(iso: string) {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-600 mt-2">Monitor and manage your workflow automation rules</p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          Failed to load stats: {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="border-slate-200">
                <CardContent className="pt-6">
                  <div className="h-8 bg-slate-100 rounded animate-pulse mb-2" />
                  <div className="h-4 bg-slate-100 rounded animate-pulse w-2/3" />
                </CardContent>
              </Card>
            ))
          : statCards.map((stat) => (
              <Card key={stat.name} className="border-slate-200">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">{stat.name}</CardTitle>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-semibold text-slate-900">{stat.value}</div>
                  <p className="text-sm text-slate-600 mt-2">{stat.sub}</p>
                </CardContent>
              </Card>
            ))}
      </div>

      {/* Recent Executions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle>Recent Rule Executions</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-10 bg-slate-100 rounded animate-pulse" />
                ))}
              </div>
            ) : !stats || stats.recentExecutions.length === 0 ? (
              <p className="text-sm text-slate-500 py-4 text-center">No executions yet. Try running a rule!</p>
            ) : (
              <div className="space-y-1">
                {stats.recentExecutions.map((e, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                    <div>
                      <div className="text-sm font-medium text-slate-900">{e.ruleName}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{timeAgo(e.executedAt)}</div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${e.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {e.success ? "Success" : "Failed"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {[
                { component: "Rule Engine", uptime: "99.99%" },
                { component: "Database", uptime: "99.95%" },
                { component: "API Gateway", uptime: "99.98%" },
              ].map((service) => (
                <div key={service.component} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                  <div>
                    <div className="text-sm font-medium text-slate-900">{service.component}</div>
                    <div className="text-xs text-slate-500 mt-0.5">Uptime: {service.uptime}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-xs font-medium text-slate-600">Operational</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
