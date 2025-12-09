import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, ExternalLink } from "lucide-react";

export const SaaSSection = () => {
  const saasProducts = [
    {
      id: "academic-micro-saas",
      title: "Academic Micro SaaS",
      description: "A comprehensive micro SaaS solution designed for academic institutions and researchers.",
      href: "/saas/academic-micro-saas",
      externalUrl: "https://academic-micro-saas.lovable.app/landing",
      gradient: "from-indigo-500 to-purple-500"
    }
    // More SaaS products can be added here later
  ];

  const SaaSCard = ({ product }) => {
    return (
      <a
        href={product.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block group h-full focus:outline-none focus:ring-2 focus:ring-[#22325F] rounded-2xl"
      >
        <Card className="relative overflow-hidden border-gray-200 bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-lg hover:-translate-y-1 h-full cursor-pointer">
          <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`} />

          <CardHeader className="relative pb-3 sm:pb-4">
            <div className="mb-3 sm:mb-4 flex items-start justify-between gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
              <div className="flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-[#22325F] shadow-md flex-shrink-0">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-teal-400" />
              </div>
              <Badge variant="secondary" className="text-xs font-medium flex-shrink-0 mt-2 sm:mt-0 bg-green-100 text-green-700">
                Active
              </Badge>
            </div>
            <CardTitle className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 group-hover:text-gray-800 leading-tight">
              {product.title}
            </CardTitle>
            <CardDescription className="text-xs xs:text-sm sm:text-base text-gray-600 leading-relaxed">
              {product.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative pt-0 mt-auto">
            <div className="flex items-center justify-between w-full py-2 xs:py-3 px-2 xs:px-4 rounded-lg text-xs xs:text-sm sm:text-base font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
              <span>Explore SaaS</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
      </a>
    );
  };

  return (
    <section className="py-10 xs:py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden" aria-labelledby="saas-heading">
      <div className="container mx-auto px-2 xs:px-3 sm:px-4 relative">
        <div id="saas" className="mb-12 xs:mb-16 sm:mb-20">
          <div className="text-center mb-8 xs:mb-10 sm:mb-12 sm:mb-16">
            <Badge className="bg-indigo-100 text-indigo-700 text-xs xs:text-sm font-medium px-3 xs:px-4 py-1.5 xs:py-2 mb-3 xs:mb-4 sm:mb-6 border-0">
              <Sparkles className="w-4 h-4 mr-2" />
              SaaS Products
            </Badge>
            <h2 id="saas-heading" className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 xs:mb-4 sm:mb-6 leading-tight">
              SaaS Solutions
            </h2>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-1 xs:px-2">
              Explore micro SaaS products built by Prem Pradeep to solve real-world problems with practical solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8 max-w-6xl mx-auto">
            {saasProducts.map((product) => (
              <SaaSCard key={product.id} product={product} />
            ))}
          </div>

          {/* View All Link */}
          <div className="text-center mt-8 xs:mt-10 sm:mt-12">
            <Button variant="ghost" size="lg" asChild>
              <Link to="/saas" className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-md">
                View All SaaS Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

