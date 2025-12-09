import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, ArrowLeft } from "lucide-react";

const SaaS = () => {
  const saasProducts = [
    {
      id: "academic-micro-saas",
      title: "Academic Micro SaaS",
      description: "A comprehensive micro SaaS solution designed for academic institutions and researchers.",
      path: "/saas/academic-micro-saas",
      externalUrl: "https://academic-micro-saas.lovable.app/landing",
      status: "Active"
    }
    // More SaaS products can be added here later
  ];

  return (
    <>
      <SEOHead
        title="SaaS Products by Prem Pradeep | Product Practice Excellence"
        description="Explore SaaS products built by Prem Pradeep, designed to solve real-world problems with practical solutions."
        keywords="SaaS products, micro SaaS, Prem Pradeep, product management, software solutions"
        canonical="https://www.prempradeep.com/saas"
      />
      <div className="min-h-screen bg-white">
        <Header />
        <main className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Navigation */}
              <nav className="mb-8" aria-label="Breadcrumb">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/" className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-md">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Link>
                </Button>
              </nav>

              {/* Header */}
              <header className="text-center mb-16">
                <Badge className="bg-blue-100 text-blue-700 text-sm font-medium px-4 py-2 mb-6 border-0">
                  <Sparkles className="w-4 h-4 mr-2" />
                  SaaS Products
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  SaaS Solutions by Prem Pradeep
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Practical micro SaaS products built to solve real-world problems
                </p>
              </header>

              {/* SaaS Products Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {saasProducts.map((product) => (
                  <article
                    key={product.id}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#1E40AF] transition-colors">
                        {product.title}
                      </h3>
                      <Badge className="bg-green-100 text-green-700 text-xs font-medium border-0">
                        {product.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {product.description}
                    </p>
                    <Button
                      size="sm"
                      asChild
                      className="w-full group/btn bg-[#1E40AF] hover:bg-[#1E3A8A] text-white"
                    >
                      <Link
                        to={product.path}
                        className="focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:ring-offset-2 rounded-md inline-flex items-center justify-center"
                      >
                        Explore Product
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </article>
                ))}
              </div>

              {/* Coming Soon Section */}
              <div className="mt-16 text-center bg-gradient-to-br from-gray-50 to-white rounded-3xl p-12 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  More SaaS Products Coming Soon
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Prem is continuously building new micro SaaS solutions. Check back soon for more products.
                </p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default SaaS;

