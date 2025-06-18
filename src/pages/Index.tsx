
import { Header } from "@/components/home/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { ToolsGrid } from "@/components/home/ToolsGrid";
import { ProductWordOfTheDay } from "@/components/home/ProductWordOfTheDay";
import { AboutPremSection } from "@/components/home/AboutPremSection";
import { Footer } from "@/components/home/Footer";
import { SEOHead } from "@/components/SEOHead";

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Prem Pradeep | Tools for Product Practice Excellence",
    "url": "https://www.prempradeep.com",
    "description": "Explore product excellence tools, assessments, and frameworks by Prem Pradeep. Built to elevate product teams with clarity and impact.",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Person",
      "name": "Prem Pradeep",
      "jobTitle": "Product Practice Excellence Expert"
    },
    "hasPart": [
      {
        "@type": "SoftwareApplication",
        "name": "User Story Generator",
        "description": "Create well-structured user stories with acceptance criteria",
        "applicationCategory": "BusinessApplication"
      },
      {
        "@type": "SoftwareApplication",
        "name": "Feature Prioritization Matrix",
        "description": "Prioritize features using RICE, MoSCoW, and other frameworks",
        "applicationCategory": "BusinessApplication"
      },
      {
        "@type": "SoftwareApplication",
        "name": "Product Roadmap Planner",
        "description": "Plan and visualize your product roadmap with priorities",
        "applicationCategory": "BusinessApplication"
      },
      {
        "@type": "SoftwareApplication",
        "name": "Product Metrics Dashboard",
        "description": "Track and analyze key product metrics and KPIs",
        "applicationCategory": "BusinessApplication"
      },
      {
        "@type": "SoftwareApplication",
        "name": "DVF Exercise",
        "description": "Evaluate ideas using Desirability, Viability, Feasibility framework",
        "applicationCategory": "BusinessApplication"
      },
      {
        "@type": "SoftwareApplication",
        "name": "Jobs to be Done Framework",
        "description": "Understand customer needs using Clayton Christensen's JTBD methodology",
        "applicationCategory": "BusinessApplication"
      }
    ]
  };

  return (
    <>
      <SEOHead
        title="Prem Pradeep | Tools for Product Practice Excellence"
        description="Explore product excellence tools, assessments, and frameworks by Prem Pradeep. Built to elevate product teams with clarity and impact."
        keywords="product management, product strategy, user stories, feature prioritization, product roadmap, DVF framework, product tools, product manager, agile, product development, growth strategies, Prem Pradeep"
        canonical="https://www.prempradeep.com/"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <HeroSection />
          <ProductWordOfTheDay />
          <ToolsGrid />
          <AboutPremSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
