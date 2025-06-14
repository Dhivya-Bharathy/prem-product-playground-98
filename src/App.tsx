
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import UserStoryGenerator from "./pages/UserStoryGenerator";
import FeaturePrioritization from "./pages/FeaturePrioritization";
import ProductRoadmap from "./pages/ProductRoadmap";
import MetricsDashboard from "./pages/MetricsDashboard";
import SprintPlanner from "./pages/SprintPlanner";
import IdeaValidator from "./pages/IdeaValidator";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tools/user-story-generator" element={<UserStoryGenerator />} />
          <Route path="/tools/feature-prioritization" element={<FeaturePrioritization />} />
          <Route path="/tools/product-roadmap" element={<ProductRoadmap />} />
          <Route path="/tools/metrics-dashboard" element={<MetricsDashboard />} />
          <Route path="/tools/sprint-planner" element={<SprintPlanner />} />
          <Route path="/tools/idea-validator" element={<IdeaValidator />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
