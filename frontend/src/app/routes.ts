import { Suspense, createElement, lazy, type ComponentType } from "react";
import { createBrowserRouter } from "react-router";

const LandingPage = lazy(() => import("./pages/LandingPage").then((m) => ({ default: m.LandingPage })));
const Login = lazy(() => import("./pages/Login").then((m) => ({ default: m.Login })));
const DashboardLayout = lazy(() => import("./layouts/DashboardLayout").then((m) => ({ default: m.DashboardLayout })));
const Dashboard = lazy(() => import("./pages/Dashboard").then((m) => ({ default: m.Dashboard })));
const RulesList = lazy(() => import("./pages/RulesList").then((m) => ({ default: m.RulesList })));
const CreateRule = lazy(() => import("./pages/CreateRule").then((m) => ({ default: m.CreateRule })));
const EditRule = lazy(() => import("./pages/EditRule").then((m) => ({ default: m.EditRule })));
const ExecutionLogs = lazy(() => import("./pages/ExecutionLogs").then((m) => ({ default: m.ExecutionLogs })));
const Settings = lazy(() => import("./pages/Settings").then((m) => ({ default: m.Settings })));

function withSuspense(Component: ComponentType) {
  return function RouteComponent() {
    return createElement(
      Suspense,
      {
        fallback: createElement(
          "div",
          { className: "min-h-screen flex items-center justify-center text-slate-500" },
          "Loading..."
        ),
      },
      createElement(Component)
    );
  };
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: withSuspense(LandingPage),
  },
  {
    path: "/login",
    Component: withSuspense(Login),
  },
  {
    path: "/dashboard",
    Component: withSuspense(DashboardLayout),
    children: [
      { index: true, Component: withSuspense(Dashboard) },
      { path: "rules", Component: withSuspense(RulesList) },
      { path: "rules/create", Component: withSuspense(CreateRule) },
      { path: "rules/edit/:id", Component: withSuspense(EditRule) },
      { path: "logs", Component: withSuspense(ExecutionLogs) },
      { path: "settings", Component: withSuspense(Settings) },
    ],
  },
]);
