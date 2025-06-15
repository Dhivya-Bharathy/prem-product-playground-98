
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User, Award, Target, Heart, ArrowLeft } from "lucide-react";

const About = () => {
  return (
    <>
      <SEOHead
        title="About Prem Pradeep | Product Practice Excellence Expert"
        description="Learn about Prem Pradeep's journey in product management and his mission to elevate product teams through structured tools and strategic clarity."
        keywords="Prem Pradeep, product management expert, product practice excellence, product strategy, team leadership"
        canonical="https://www.prempradeep.com/about"
      />
      <div className="min-h-screen bg-white">
        <Header />
        <main className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
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
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-8 shadow-lg">
                  <img
                    src="/lovable-uploads/4cc61976-ba63-4fee-8c99-1ad76011fb54.png"
                    alt="Professional headshot of Prem Pradeep, Product Practice Excellence Expert"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  About Prem Pradeep
                </h1>
                <p className="text-xl text-gray-600">
                  Product Practice Excellence Expert & Tool Creator
                </p>
              </header>

              {/* Content */}
              <div className="space-y-12">
                <article className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100">
                  <Badge className="bg-blue-100 text-blue-700 text-sm font-medium px-4 py-2 mb-6 border-0">
                    <Award className="w-4 h-4 mr-2" />
                    Mission
                  </Badge>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Elevating Product Excellence
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Prem Pradeep helps product teams scale their practice through structured tools and strategic clarity. 
                    As a Product Practice Head, coach, and practice enabler, Prem has dedicated his career to building 
                    frameworks that accelerate product excellence and team outcomes.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Through years of building and scaling products, Prem has developed a comprehensive toolkit designed 
                    to help product professionals solve the right problems, not just any problems.
                  </p>
                </article>

                {/* Values */}
                <section aria-labelledby="values-heading">
                  <h2 id="values-heading" className="sr-only">Core Values</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-blue-100 rounded-xl">
                          <Target className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">Strategic Focus</h3>
                      </div>
                      <p className="text-gray-600">
                        Building tools that help teams identify and solve underlying issues, not just symptoms.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-green-100 rounded-xl">
                          <Heart className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">Ethical Approach</h3>
                      </div>
                      <p className="text-gray-600">
                        Every framework promotes sustainable value creation and responsible product development.
                      </p>
                    </div>
                  </div>
                </section>

                {/* CTA */}
                <div className="text-center bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl p-12 text-white">
                  <h3 className="text-2xl font-bold mb-4">Ready to Accelerate Your Practice?</h3>
                  <p className="text-lg opacity-90 mb-8">
                    Explore the comprehensive toolkit designed to elevate your product excellence.
                  </p>
                  <Button size="lg" variant="secondary" asChild>
                    <Link to="/#tools" className="focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-500 rounded-md">
                      Explore Tools & Assessments
                    </Link>
                  </Button>
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

export default About;
