
import { Header } from "@/components/home/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { ToolsGrid } from "@/components/home/ToolsGrid";
import { AboutSection } from "@/components/home/AboutSection";
import { Footer } from "@/components/home/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <HeroSection />
      <ToolsGrid />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
