import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import { useRulesStore } from "../../store/rulesStore";
import { toast } from "sonner";

export function CreateRule() {
  const navigate = useNavigate();
  const addRule = useRulesStore((s) => s.addRule);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    priority: "",
    condition: "",
    action: "",
    active: true,
    webhookUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addRule({
        ...formData,
        webhookUrl: formData.webhookUrl || undefined,
      });
      toast.success("Rule created successfully");
      navigate("/dashboard/rules");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to create rule");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          onClick={() => navigate("/dashboard/rules")}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Rules
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-semibold text-slate-900">
          Create New Rule
        </h1>
        <p className="text-slate-600 mt-2">
          Configure a new workflow automation rule
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Rule Information</CardTitle>
                <CardDescription>
                  Basic information about the rule
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Rule Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Payment Validation Rule"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    required
                    className="border-slate-300"
                  />
                  <p className="text-sm text-slate-500">
                    Choose a descriptive name for your rule
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">
                    Priority Level *
                  </Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        priority: value,
                      })
                    }
                    required
                  >
                    <SelectTrigger
                      id="priority"
                      className="border-slate-300"
                    >
                      <SelectValue placeholder="Select priority level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">
                        Medium
                      </SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">
                        Critical
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-slate-500">
                    Higher priority rules are evaluated first
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Rule Logic</CardTitle>
                <CardDescription>
                  Define the conditions and actions for this
                  rule
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="condition">
                    Condition Expression *
                  </Label>
                  <Textarea
                    id="condition"
                    placeholder="e.g., amount > 1000 AND currency == 'USD'"
                    value={formData.condition}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        condition: e.target.value,
                      })
                    }
                    required
                    rows={4}
                    className="border-slate-300 font-mono text-sm"
                  />
                  <p className="text-sm text-slate-500">
                    Enter the condition expression using
                    standard operators (AND, OR, ==, !=, {">"},{" "}
                    {"<"}, etc.)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="action">Action *</Label>
                  <Select
                    value={formData.action}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        action: value,
                      })
                    }
                    required
                  >
                    <SelectTrigger
                      id="action"
                      className="border-slate-300"
                    >
                      <SelectValue placeholder="Select action to execute" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="approve">
                        Approve
                      </SelectItem>
                      <SelectItem value="reject">
                        Reject
                      </SelectItem>
                      <SelectItem value="review">
                        Send for Review
                      </SelectItem>
                      <SelectItem value="notify">
                        Send Notification
                      </SelectItem>
                      <SelectItem value="escalate">
                        Escalate
                      </SelectItem>
                      <SelectItem value="log">
                        Log Event
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-slate-500">
                    Action to execute when condition is met
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="webhookUrl">Webhook URL <span className="text-slate-400 font-normal">(optional)</span></Label>
                  <Input
                    id="webhookUrl"
                    type="url"
                    placeholder="https://webhook.site/your-unique-id"
                    value={formData.webhookUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, webhookUrl: e.target.value })
                    }
                    className="border-slate-300 font-mono text-sm"
                  />
                  <p className="text-sm text-slate-500">
                    When the condition is met, the result is POSTed here (Slack, Discord, webhook.site, etc.)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Status</CardTitle>
                <CardDescription>
                  Control the rule activation status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label
                      htmlFor="active"
                      className="text-base"
                    >
                      Active Status
                    </Label>
                    <p className="text-sm text-slate-500">
                      {formData.active
                        ? "Rule is active"
                        : "Rule is inactive"}
                    </p>
                  </div>
                  <Switch
                    id="active"
                    checked={formData.active}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        active: checked,
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-sm">
                  Rule Execution
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700 space-y-2">
                <p>
                  Rules are evaluated in priority order. Once a
                  rule condition is met, its action is executed.
                </p>
                <p className="text-xs text-slate-600">
                  Note: Rules can be tested in the testing
                  environment before activation.
                </p>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-3">
              <Button type="submit" className="w-full gap-2" disabled={loading}>
                <Save className="w-4 h-4" />
                {loading ? "Saving..." : "Create Rule"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full border-slate-300"
                onClick={() => navigate("/dashboard/rules")}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}