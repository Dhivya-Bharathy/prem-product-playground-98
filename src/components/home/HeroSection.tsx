import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, CheckCircle } from "lucide-react";

export const HeroSection = () => {
  const scrollToTools = () => {
    const toolsSection = document.getElementById('tools');
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAssessments = () => {
    const assessmentsSection = document.getElementById('assessments');
    if (assessmentsSection) {
      assessmentsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-white pt-20 pb-16 sm:pt-24 sm:pb-20 md:pt-32 md:pb-24">
      {/* Layered abstract background shapes */}
      <div className="absolute -top-32 -left-32 w-[32rem] h-[32rem] bg-[#22325F] opacity-20 rounded-full blur-3xl z-0" />
      <div className="absolute top-1/3 -right-40 w-[28rem] h-[28rem] bg-teal-400 opacity-10 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40rem] h-40 bg-gradient-to-r from-[#22325F]/10 via-white/0 to-teal-400/10 rounded-full blur-2xl z-0" />
      {/* Dotted pattern layer - centered above headline */}
      <svg className="absolute left-1/2 top-12 -translate-x-1/2 w-[32rem] h-48 z-0 opacity-30" width="512" height="192" viewBox="0 0 512 192" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="2" fill="#22325F" />
          </pattern>
        </defs>
        <rect width="512" height="192" fill="url(#dots)" />
      </svg>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#22325F] leading-tight">
          Accelerate Product Practice
          <span className="block text-teal-400 mt-2">
            Excellence with Prem Pradeep
          </span>
        </h1>
        
        <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 max-w-2xl mx-auto px-2">
          Tools and frameworks to elevate your product teams and outcomes.
        </p>

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-x-6 sm:gap-y-4 px-4">
          <span className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" /> 
            6 Featured Tools
          </span>
          <span className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" /> 
            2 Strategic Assessments
          </span>
          <span className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" /> 
            Practice Excellence Focus
          </span>
        </div>
        
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6 px-4">
          <Button 
            size="lg" 
            onClick={scrollToTools} 
            className="group w-full sm:w-auto rounded-full bg-gradient-to-r from-teal-500 to-teal-400 px-6 sm:px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:from-teal-600 hover:to-teal-500"
          >
            Explore Tools
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button 
            variant="ghost" 
            size="lg" 
            onClick={scrollToAssessments}
            className="group w-full sm:w-auto font-semibold text-gray-700"
          >
            Take an Assessment 
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
        
        <div className="mt-16 sm:mt-20">
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTools}
            className="text-gray-400 hover:text-gray-600 animate-bounce"
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
};
