import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Shield, User, Info } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

export function Settings() {
  const { username, role } = useAuthStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Settings</h1>
        <p className="text-slate-600 mt-2">Account information and system details</p>
      </div>

      {/* Account Info */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Account Information
          </CardTitle>
          <CardDescription>Details about your current session</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <div className="text-slate-500 font-medium">Username</div>
              <div className="text-slate-900 font-semibold">{username ?? "—"}</div>
            </div>
            <div className="space-y-1">
              <div className="text-slate-500 font-medium">Role</div>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary uppercase tracking-wide">
                {role ?? "—"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security
          </CardTitle>
          <CardDescription>Authentication and access settings</CardDescription>
        </CardHeader>
        <CardContent className="text-sm space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div>
              <div className="font-medium text-slate-900">Authentication</div>
              <div className="text-slate-500">JWT-based stateless authentication</div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Active</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div>
              <div className="font-medium text-slate-900">Password Hashing</div>
              <div className="text-slate-500">BCrypt with strength 10</div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Enabled</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <div className="font-medium text-slate-900">Token Expiry</div>
              <div className="text-slate-500">24 hours from login</div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">24h</span>
          </div>
        </CardContent>
      </Card>

      {/* System Info */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            System Information
          </CardTitle>
          <CardDescription>Technical stack details</CardDescription>
        </CardHeader>
        <CardContent className="text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: "Backend", value: "Spring Boot 4 (Java 21)" },
              { label: "Database", value: "PostgreSQL 15+" },
              { label: "Frontend", value: "React 18 + TypeScript" },
              { label: "Build Tool", value: "Vite 6 + pnpm" },
              { label: "Rule Engine", value: "Spring Expression Language (SpEL)" },
              { label: "API Style", value: "REST — /api/v1" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col py-1.5 border-b border-slate-100">
                <span className="text-slate-500">{item.label}</span>
                <span className="text-slate-900 font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
