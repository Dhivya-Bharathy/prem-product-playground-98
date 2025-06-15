
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Dynamic background elements */}
        <div className="fixed inset-0 z-0">
          {/* Geometric grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(120,53,255,0.03)_2px,transparent_2px),linear-gradient(90deg,rgba(120,53,255,0.03)_2px,transparent_2px)] bg-[size:60px_60px]"></div>
          
          {/* Floating gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-400/15 to-blue-500/15 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-gradient-to-r from-pink-400/10 to-rose-500/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
          
          {/* Subtle noise texture */}
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <Header />
          <HeroSection />
          <ToolsGrid />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Index;
