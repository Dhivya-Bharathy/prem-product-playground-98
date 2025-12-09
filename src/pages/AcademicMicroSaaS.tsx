import { useEffect } from "react";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, ExternalLink, Sparkles } from "lucide-react";

const AcademicMicroSaaS = () => {
  const externalUrl = "https://academic-micro-saas.lovable.app/landing";

  useEffect(() => {
    // Redirect to external URL after a brief moment
    const timer = setTimeout(() => {
      window.location.href = externalUrl;
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SEOHead
        title="Academic Micro SaaS | Prem Pradeep"
        description="A comprehensive micro SaaS solution designed for academic institutions and researchers."
        keywords="academic SaaS, micro SaaS, research tools, Prem Pradeep"
        canonical="https://www.prempradeep.com/saas/academic-micro-saas"
      />
      <div className="min-h-screen bg-white">
        <Header />
        <main className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Navigation */}
              <nav className="mb-8" aria-label="Breadcrumb">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/saas" className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-md">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to SaaS Products
                  </Link>
                </Button>
              </nav>

              {/* Header */}
              <header className="text-center mb-12">
                <Badge className="bg-blue-100 text-blue-700 text-sm font-medium px-4 py-2 mb-6 border-0">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Micro SaaS
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Academic Micro SaaS
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  A comprehensive micro SaaS solution designed for academic institutions and researchers
                </p>
              </header>

              {/* Content Card */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm mb-8">
                <div className="text-center space-y-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <Sparkles className="w-8 h-8 text-blue-600" />
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      You are being redirected to the Academic Micro SaaS platform...
                    </p>
                    <p className="text-sm text-gray-500">
                      If you are not redirected automatically, click the button below.
                    </p>
                  </div>

                  <Button
                    size="lg"
                    asChild
                    className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white px-8"
                  >
                    <a
                      href={externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:ring-offset-2 rounded-md"
                    >
                      Open Academic Micro SaaS
                      <ExternalLink className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Info Section */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Built for Academics
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Designed specifically to meet the unique needs of academic institutions and research teams.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Comprehensive Solution
                  </h3>
                  <p className="text-gray-600 text-sm">
                    A complete micro SaaS platform with all the tools you need in one place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AcademicMicroSaaS;

