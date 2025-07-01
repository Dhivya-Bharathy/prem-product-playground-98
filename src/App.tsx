import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import UserStoryGenerator from "./pages/UserStoryGenerator";
import FeaturePrioritization from "./pages/FeaturePrioritization";
import ProductRoadmap from "./pages/ProductRoadmap";
import MetricsDashboard from "./pages/MetricsDashboard";
import DVFExercise from "./pages/DVFExercise";
import DVFFramework from "./pages/DVFFramework";
import IdeaValidator from "./pages/IdeaValidator";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import JobsToBeDone from "./pages/JobsToBeDone";
import PMCompetency from "./pages/PMCompetency";
import DarkPatternsAssessment from "./pages/DarkPatternsAssessment";
import ProdZSlang from "./pages/ProdZSlang";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/tools/user-story-generator" element={<UserStoryGenerator />} />
              <Route path="/tools/feature-prioritization" element={<FeaturePrioritization />} />
              <Route path="/tools/product-roadmap" element={<ProductRoadmap />} />
              <Route path="/tools/metrics-dashboard" element={<MetricsDashboard />} />
              <Route path="/tools/dvf-exercise" element={<DVFExercise />} />
              <Route path="/tools/dvf-framework" element={<DVFFramework />} />
              <Route path="/tools/jobs-to-be-done" element={<JobsToBeDone />} />
              <Route path="/tools/pm-competency" element={<PMCompetency />} />
              <Route path="/tools/dark-patterns-assessment" element={<DarkPatternsAssessment />} />
              <Route path="/tools/idea-validator" element={<IdeaValidator />} />
              <Route path="/prodz-slang" element={<ProdZSlang />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
