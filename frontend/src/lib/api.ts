const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function getToken(): string | null {
  return localStorage.getItem("token");
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string>),
  };

  const response = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: `HTTP ${response.status}` }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  if (response.status === 204) return undefined as T;
  return response.json();
}

export interface Rule {
  id: number;
  name: string;
  priority: string;
  condition: string;
  action: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  webhookUrl?: string;
}

export interface RulePayload {
  name: string;
  priority: string;
  condition: string;
  action: string;
  active: boolean;
  webhookUrl?: string;
}

export interface AuthResponse {
  token: string;
  username: string;
  role: string;
}

export const api = {
  login: (username: string, password: string) =>
    request<AuthResponse>("/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),

  getRules: () => request<Rule[]>("/api/v1/rules"),

  getRuleById: (id: number) => request<Rule>(`/api/v1/rules/${id}`),

  createRule: (data: RulePayload) =>
    request<Rule>("/api/v1/rules", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateRule: (id: number, data: RulePayload) =>
    request<Rule>(`/api/v1/rules/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteRule: (id: number) =>
    request<void>(`/api/v1/rules/${id}`, { method: "DELETE" }),

  toggleRule: (id: number) =>
    request<Rule>(`/api/v1/rules/${id}/toggle`, { method: "PATCH" }),

  executeRule: (id: number, input: Record<string, unknown>) =>
    request<ExecuteRuleResponse>(`/api/v1/rules/${id}/execute`, {
      method: "POST",
      body: JSON.stringify({ input }),
    }),

  getExecutionLogs: (search = "", status = "", page = 0, size = 10) => {
    const params = new URLSearchParams({
      search,
      status,
      page: String(page),
      size: String(size),
    });
    return request<PageResponse<ExecutionLogResponse>>(`/api/v1/logs?${params}`);
  },

  getDashboardStats: () => request<DashboardStats>("/api/v1/dashboard/stats"),
};

export interface ExecuteRuleResponse {
  logId: number;
  ruleId: number;
  ruleName: string;
  conditionMet: boolean;
  action: string | null;
  success: boolean;
  errorMessage: string | null;
  executedAt: string;
}

export interface ExecutionLogResponse {
  id: number;
  ruleId: number | null;
  ruleName: string;
  inputData: string;
  conditionMet: boolean;
  action: string | null;
  success: boolean;
  errorMessage: string | null;
  executedAt: string;
}

export interface RecentExecution {
  ruleName: string;
  success: boolean;
  conditionMet: boolean;
  executedAt: string;
}

export interface DashboardStats {
  totalRules: number;
  activeRules: number;
  executionsToday: number;
  totalExecutions: number;
  successRate: number;
  recentExecutions: RecentExecution[];
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}
