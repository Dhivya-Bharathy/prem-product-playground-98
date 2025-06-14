
import { Badge } from "@/components/ui/badge";
import { Star, Clock } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Master Product Management
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Your go-to destination for understanding and practicing product management. 
          Access powerful tools, frameworks, and assessment resources to elevate your product practice.
        </p>
        <div className="flex justify-center gap-4 mb-12">
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            <Star className="w-4 h-4 mr-2" />
            8 Essential Tools
          </Badge>
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            <Clock className="w-4 h-4 mr-2" />
            Always Updated
          </Badge>
        </div>
      </div>
    </section>
  );
};
