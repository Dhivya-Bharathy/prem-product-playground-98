

import { Header } from "@/components/home/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { ToolsGrid } from "@/components/home/ToolsGrid";
import { Footer } from "@/components/home/Footer";
import { SEOHead } from "@/components/SEOHead";

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Product Practice Excellence",
    "url": "https://www.prempradeep.com",
    "description": "Comprehensive product management tools and frameworks for modern product professionals",
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
      "jobTitle": "Product Manager"
    }
  };

  return (
    <>
      <SEOHead
        title="Prem Pradeep - Product Management Tools & Frameworks | Product Strategy Expert"
        description="Master product management with practical tools, frameworks, and assessments. Access user story generators, feature prioritization, roadmap planning, and more - designed by product expert Prem Pradeep."
        keywords="product management, product strategy, user stories, feature prioritization, product roadmap, DVF framework, product tools, product manager, agile, product development, growth strategies"
        canonical="https://www.prempradeep.com/"
        structuredData={structuredData}
      />
      <div className="min-h-screen">
        <Header />
        <HeroSection />
        <ToolsGrid />
        <Footer />
      </div>
    </>
  );
};

export default Index;

