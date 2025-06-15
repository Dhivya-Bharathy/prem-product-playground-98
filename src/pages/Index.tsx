
import { Header } from "@/components/home/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
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
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Animated Background Layers */}
        <div className="fixed inset-0 z-0">
          {/* Primary gradient mesh */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/30 to-cyan-900/20"></div>
          
          {/* Animated orbs */}
          <div className="absolute top-20 -left-40 w-80 h-80 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 -right-40 w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-40 left-1/3 w-72 h-72 bg-gradient-to-r from-pink-400 to-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-35 animate-pulse" style={{ animationDelay: '4s' }}></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <Header />
          <HeroSection />
          <AboutSection />
          <ToolsGrid />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Index;
