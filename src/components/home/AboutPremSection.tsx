
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LazyImage } from "@/components/ui/LazyImage";
import { Link } from "react-router-dom";
import { Linkedin, Award, User } from "lucide-react";

export const AboutPremSection = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden" aria-labelledby="about-prem-heading">
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="text-center mb-12 sm:mb-16">
            <Badge className="bg-blue-100 text-blue-700 text-sm font-medium px-4 py-2 mb-4 sm:mb-6 border-0">
              <User className="w-4 h-4 mr-2" />
              About the Creator
            </Badge>
            <h2 id="about-prem-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Meet Prem Pradeep
            </h2>
          </header>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left Side - Portrait */}
            <div className="text-center lg:text-left">
              <div className="w-48 h-48 sm:w-64 sm:h-64 mx-auto lg:mx-0 rounded-full overflow-hidden mb-6 shadow-lg">
                <LazyImage
                  src="/lovable-uploads/4cc61976-ba63-4fee-8c99-1ad76011fb54.png"
                  alt="Professional headshot of Prem Pradeep, Product Practice Excellence Expert"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={256}
                  height={256}
                />
              </div>
            </div>

            {/* Right Side - Bio and CTA */}
            <div className="space-y-6">
              <article className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 sm:p-8 border border-gray-100">
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6">
                  Prem Pradeep empowers product teams to achieve scalable excellence through strategic frameworks and practical tools. As a Product Practice Expert and coach, he transforms how teams approach product development and strategic thinking.
                </p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 sm:mb-8">
                  With deep expertise in product strategy and team enablement, Prem has created comprehensive toolkits that accelerate product excellence and drive meaningful outcomes for organizations worldwide.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button size="lg" asChild className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <Link to="/about">
                      More About Prem
                      <Award className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                    <a 
                      href="https://www.linkedin.com/in/prempradeep/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="Connect with Prem Pradeep on LinkedIn"
                      className="focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      Connect on LinkedIn
                    </a>
                  </Button>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
