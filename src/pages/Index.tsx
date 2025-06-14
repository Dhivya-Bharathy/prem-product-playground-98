
import { Header } from "@/components/home/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { ToolsGrid } from "@/components/home/ToolsGrid";
import { AboutSection } from "@/components/home/AboutSection";
import { Footer } from "@/components/home/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <ToolsGrid />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
