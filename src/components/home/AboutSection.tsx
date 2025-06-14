
import { Target, CheckSquare, Lightbulb, Users, TrendingUp, Award } from "lucide-react";

export const AboutSection = () => {
  const features = [
    {
      icon: Target,
      title: "Practical Tools",
      description: "Ready-to-use tools for real product challenges",
      color: "blue"
    },
    {
      icon: CheckSquare,
      title: "Best Practices",
      description: "Based on proven frameworks and methodologies",
      color: "green"
    },
    {
      icon: Lightbulb,
      title: "Continuous Learning",
      description: "Evolving content to match industry trends",
      color: "purple"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built with feedback from product professionals",
      color: "orange"
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Tools designed to advance your PM career",
      color: "indigo"
    },
    {
      icon: Award,
      title: "Industry Standard",
      description: "Used by leading product teams worldwide",
      color: "pink"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string; text: string; border: string } } = {
      blue: { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-200" },
      green: { bg: "bg-green-100", text: "text-green-600", border: "border-green-200" },
      purple: { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-200" },
      orange: { bg: "bg-orange-100", text: "text-orange-600", border: "border-orange-200" },
      indigo: { bg: "bg-indigo-100", text: "text-indigo-600", border: "border-indigo-200" },
      pink: { bg: "bg-pink-100", text: "text-pink-600", border: "border-pink-200" }
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m0 0h100v100h-100z' fill='none'/%3E%3Cpath d='m0 0 50 50-50 50z' fill='none' stroke='%23e5e7eb' stroke-width='0.5'/%3E%3Cpath d='m50 0 50 50-50 50z' fill='none' stroke='%23e5e7eb' stroke-width='0.5'/%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Product Practice
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Excellence</span>
            </h3>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              This platform is designed to help product managers, entrepreneurs, and teams 
              practice and refine their product management skills. Each tool is built based 
              on industry best practices and proven frameworks used by successful product teams.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              const colors = getColorClasses(feature.color);
              
              return (
                <div 
                  key={feature.title}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-100 hover:border-gray-200"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`p-4 ${colors.bg} rounded-2xl w-16 h-16 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-8 h-8 ${colors.text}`} />
                  </div>
                  <h4 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
