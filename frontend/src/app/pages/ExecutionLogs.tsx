import { useEffect, useState, useCallback } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Search, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { api, ExecutionLogResponse, PageResponse } from "../../lib/api";

export function ExecutionLogs() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [data, setData] = useState<PageResponse<ExecutionLogResponse> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  // Reset to page 0 when filters change
  useEffect(() => { setPage(0); }, [debouncedSearch, status]);

  const fetchLogs = useCallback(() => {
    setLoading(true);
    setError(null);
    api.getExecutionLogs(debouncedSearch, status === "all" ? "" : status, page, 10)
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [debouncedSearch, status, page]);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);

  function formatDate(iso: string) {
    return new Date(iso).toLocaleString();
  }

  function formatInput(json: string | null) {
    if (!json) return "—";
    try { return JSON.stringify(JSON.parse(json), null, 2); }
    catch { return json; }
  }

  const totalPages = data?.totalPages ?? 0;
  const totalElements = data?.totalElements ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Execution Logs</h1>
        <p className="text-slate-600 mt-2">View detailed logs of all rule executions</p>
      </div>

      <Card className="border-slate-200">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search by rule name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 border-slate-300"
              />
            </div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full sm:w-[160px] border-slate-300">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="p-3 mb-4 bg-red-50 border border-red-200 rounded text-sm text-red-700">
              Failed to load logs: {error}
            </div>
          )}

          <div className="rounded-md border border-slate-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-semibold">Rule Name</TableHead>
                  <TableHead className="font-semibold">Condition Met</TableHead>
                  <TableHead className="font-semibold">Action</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Time</TableHead>
                  <TableHead className="text-right font-semibold">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      {Array.from({ length: 6 }).map((__, j) => (
                        <TableCell key={j}>
                          <div className="h-4 bg-slate-100 rounded animate-pulse" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : !data || data.content.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-slate-500">
                      No execution logs found
                    </TableCell>
                  </TableRow>
                ) : (
                  data.content.map((log) => (
                    <TableRow key={log.id} className="hover:bg-slate-50">
                      <TableCell className="font-medium">{log.ruleName}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${log.conditionMet ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"}`}>
                          {log.conditionMet ? "Yes" : "No"}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600">{log.action ?? "—"}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${log.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {log.success ? "Success" : "Failed"}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-slate-500">{formatDate(log.executedAt)}</TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="gap-1">
                              <Eye className="w-3.5 h-3.5" /> View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-lg">
                            <DialogHeader>
                              <DialogTitle>Log #{log.id} — {log.ruleName}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-3 text-sm mt-2">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="text-slate-500">Condition Met</div>
                                <div className="font-medium">{log.conditionMet ? "Yes" : "No"}</div>
                                <div className="text-slate-500">Action Taken</div>
                                <div className="font-medium">{log.action ?? "—"}</div>
                                <div className="text-slate-500">Status</div>
                                <div className={`font-medium ${log.success ? "text-green-600" : "text-red-600"}`}>{log.success ? "Success" : "Failed"}</div>
                                <div className="text-slate-500">Executed At</div>
                                <div>{formatDate(log.executedAt)}</div>
                              </div>
                              {log.errorMessage && (
                                <div>
                                  <div className="text-slate-500 mb-1">Error</div>
                                  <div className="bg-red-50 border border-red-200 rounded p-2 text-red-700 text-xs">{log.errorMessage}</div>
                                </div>
                              )}
                              <div>
                                <div className="text-slate-500 mb-1">Input Data</div>
                                <pre className="bg-slate-50 border border-slate-200 rounded p-2 text-xs overflow-auto max-h-40">{formatInput(log.inputData)}</pre>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 0 && (
            <div className="flex items-center justify-between mt-4 text-sm text-slate-600">
              <span>{totalElements} total log{totalElements !== 1 ? "s" : ""}</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span>Page {page + 1} of {totalPages}</span>
                <Button variant="outline" size="sm" disabled={page >= totalPages - 1} onClick={() => setPage((p) => p + 1)}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
