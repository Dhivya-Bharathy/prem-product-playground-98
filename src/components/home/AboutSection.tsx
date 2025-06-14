
import { Target, CheckSquare, Lightbulb, Users, TrendingUp, Award } from "lucide-react";

export const AboutSection = () => {
  const features = [
    {
      icon: Target,
      title: "Root Cause Analysis",
      description: "Identify and solve the right problems, not just symptoms",
      color: "blue"
    },
    {
      icon: Users,
      title: "User-Centric Growth",
      description: "Sustainable user acquisition and retention strategies",
      color: "green"
    },
    {
      icon: TrendingUp,
      title: "Data-Driven Decisions",
      description: "Analytics tools to guide strategic growth initiatives",
      color: "purple"
    },
    {
      icon: CheckSquare,
      title: "Ethical Frameworks",
      description: "Responsible product development methodologies",
      color: "orange"
    },
    {
      icon: Lightbulb,
      title: "Innovation Tools",
      description: "Creative frameworks for sustainable product ideas",
      color: "indigo"
    },
    {
      icon: Award,
      title: "Best Practices",
      description: "Industry-proven approaches from real experience",
      color: "pink"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string; text: string; icon: string } } = {
      blue: { bg: "bg-blue-50", text: "text-blue-600", icon: "bg-blue-100" },
      green: { bg: "bg-green-50", text: "text-green-600", icon: "bg-green-100" },
      purple: { bg: "bg-purple-50", text: "text-purple-600", icon: "bg-purple-100" },
      orange: { bg: "bg-orange-50", text: "text-orange-600", icon: "bg-orange-100" },
      indigo: { bg: "bg-indigo-50", text: "text-indigo-600", icon: "bg-indigo-100" },
      pink: { bg: "bg-pink-50", text: "text-pink-600", icon: "bg-pink-100" }
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Philosophy Behind the
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Tools</span>
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Each tool reflects my core belief in <strong>ethical problem-solving</strong> and 
              <strong> sustainable value creation</strong> — practical instruments born from real-world challenges.
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
                  className={`group ${colors.bg} rounded-3xl p-8 hover:shadow-xl hover:scale-105 transition-all duration-300 border-0`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`p-4 ${colors.icon} rounded-2xl w-16 h-16 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-8 h-8 ${colors.text}`} />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-300 mb-3">
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
