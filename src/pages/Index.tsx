
import { Header } from "@/components/home/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutPremSection } from "@/components/home/AboutPremSection";
import { ToolsGrid } from "@/components/home/ToolsGrid";
import { AboutSection } from "@/components/home/AboutSection";
import { Footer } from "@/components/home/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutPremSection />
      <ToolsGrid />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
