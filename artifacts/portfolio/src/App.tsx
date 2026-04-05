import { Suspense, lazy } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import SplashCursor from "@/components/SplashCursor";

const NotFound = lazy(() => import("@/pages/not-found"));
const Home = lazy(() => import("@/pages/Home"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const ProjectsPage = lazy(() => import("@/pages/ProjectsPage"));
const ResearchPage = lazy(() => import("@/pages/ResearchPage"));
const CertificatesPage = lazy(() => import("@/pages/CertificatesPage"));

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/projects" component={ProjectsPage} />
      <Route path="/projects/" component={ProjectsPage} />
      <Route path="/research" component={ResearchPage} />
      <Route path="/research/" component={ResearchPage} />
      <Route path="/certificates" component={CertificatesPage} />
      <Route path="/certificates/" component={CertificatesPage} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppShellFallback() {
  return <div className="min-h-screen" />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SplashCursor />
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Suspense fallback={<AppShellFallback />}>
            <Router />
          </Suspense>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
