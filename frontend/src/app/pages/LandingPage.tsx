import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Shield, Zap, Globe, LineChart, Lock, Eye } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Dynamic Rule Execution",
    description: "Evaluate complex business rules in real-time using Spring Expression Language (SpEL). No code changes needed.",
  },
  {
    icon: Globe,
    title: "Webhook Integration",
    description: "Automatically notify external systems (Slack, email, APIs) when rules fire. True event-driven automation.",
  },
  {
    icon: LineChart,
    title: "Execution Analytics",
    description: "Track every rule execution with detailed logs, success rates, and comprehensive audit trails.",
  },
  {
    icon: Lock,
    title: "Secure by Design",
    description: "JWT-based authentication, role-based access control, and encrypted data storage ensure enterprise-grade security.",
  },
  {
    icon: Shield,
    title: "Priority Management",
    description: "Define rule priorities (critical, high, medium, low) to control the order of evaluation and execution.",
  },
  {
    icon: Eye,
    title: "Visual Dashboard",
    description: "Monitor active rules, execution trends, and system health through an intuitive admin interface.",
  },
];

const useCases = [
  {
    title: "E-commerce Automation",
    example: "Auto-restock when inventory < 15 for fast-selling products",
  },
  {
    title: "Payment Processing",
    example: "Flag high-value transactions or fraud patterns for review",
  },
  {
    title: "Compliance Monitoring",
    example: "Ensure regulatory compliance with automated rule checks",
  },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Smart Workflow</h1>
              <p className="text-xs text-slate-600">Rule Engine Platform</p>
            </div>
          </div>
          <Link to="/login">
            <Button>Sign In</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="inline-block mb-4 px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
          🚀 Enterprise Rule Engine
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
          Automate Business Logic
          <br />
          <span className="text-primary">Without Writing Code</span>
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Define rules once. Execute millions of times. Integrate with any system through webhooks.
          Built with Spring Boot, React, and production-ready architecture.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/login">
            <Button size="lg" className="h-12 px-8">
              Get Started
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="h-12 px-8">
            View Demo
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            Powerful Features for Modern Workflows
          </h2>
          <p className="text-slate-600 text-lg">
            Everything you need to build scalable, event-driven rule systems
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <Card key={idx} className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Real-World Use Cases</h2>
          <p className="text-slate-600 text-lg">See how businesses automate workflows</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {useCases.map((useCase, idx) => (
            <Card key={idx} className="border-slate-200 bg-white">
              <CardHeader>
                <CardTitle className="text-lg">{useCase.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 italic">"{useCase.example}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Built With Modern Technologies</h2>
          <div className="flex flex-wrap justify-center gap-8 text-slate-700 font-medium">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">☕</span>
              </div>
              <span>Spring Boot 4</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⚛️</span>
              </div>
              <span>React 18</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-blue-200 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🗄️</span>
              </div>
              <span>PostgreSQL</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🔐</span>
              </div>
              <span>JWT Security</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🪝</span>
              </div>
              <span>Webhooks</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">
          Ready to Automate Your Workflows?
        </h2>
        <p className="text-xl text-slate-600 mb-8">
          Start building intelligent business rules in minutes
        </p>
        <Link to="/login">
          <Button size="lg" className="h-14 px-10 text-lg">
            Sign In to Dashboard
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-slate-600">
          <p className="text-sm">
            Smart Workflow Rule Engine &copy; 2026. Built with Spring Boot, React, and PostgreSQL.
          </p>
          <p className="text-xs mt-2">
            Version 2.1.0 | Mini Project | Enterprise-Grade Architecture
          </p>
        </div>
      </footer>
    </div>
  );
}
