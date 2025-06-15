
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
    <section className="relative overflow-hidden bg-white pt-24 pb-20 sm:pt-32 sm:pb-24">
      {/* Background decoration */}
      <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
        <div 
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#8085ff] to-[#d265ff] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" 
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl leading-tight">
          Accelerate Product Practice
          <span className="block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Excellence with Prem Pradeep
          </span>
        </h1>
        
        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
          Tools and frameworks to elevate your product teams and outcomes.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-4">
            <span className="flex items-center gap-2 text-sm text-gray-500"><CheckCircle className="w-4 h-4 text-green-500" /> 6 Featured Tools</span>
            <span className="flex items-center gap-2 text-sm text-gray-500"><CheckCircle className="w-4 h-4 text-green-500" /> 2 Strategic Assessments</span>
            <span className="flex items-center gap-2 text-sm text-gray-500"><CheckCircle className="w-4 h-4 text-green-500" /> Practice Excellence Focus</span>
        </div>
        
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button 
            size="lg" 
            onClick={scrollToTools} 
            className="group rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:from-indigo-600 hover:to-purple-600"
          >
            Explore Tools
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button 
            variant="ghost" 
            size="lg" 
            onClick={scrollToAssessments}
            className="group font-semibold text-gray-700"
          >
            Take an Assessment <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
        
        <div className="mt-20">
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
