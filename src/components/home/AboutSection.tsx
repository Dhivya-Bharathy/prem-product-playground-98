
import { Target, CheckSquare, Lightbulb, Users, TrendingUp, Award } from "lucide-react";

export const AboutSection = () => {
  const features = [
    {
      icon: Target,
      title: "Root Cause Analysis",
      description: "Tools designed to help you identify and solve the right problems, not just symptoms",
      color: "blue",
      expertise: "Product Optimization"
    },
    {
      icon: Users,
      title: "User-Centric Growth",
      description: "Frameworks that prioritize sustainable user acquisition and retention strategies",
      color: "green",
      expertise: "User Acquisition"
    },
    {
      icon: TrendingUp,
      title: "Data-Driven Decisions",
      description: "Metrics and analytics tools to guide strategic growth initiatives",
      color: "purple",
      expertise: "Growth Strategies"
    },
    {
      icon: CheckSquare,
      title: "Ethical Frameworks",
      description: "Methodologies that promote responsible product development and user welfare",
      color: "orange",
      expertise: "Ethical Problem-Solving"
    },
    {
      icon: Lightbulb,
      title: "Innovation Tools",
      description: "Creative frameworks for generating and validating product ideas sustainably",
      color: "indigo",
      expertise: "Product Optimization"
    },
    {
      icon: Award,
      title: "Best Practices",
      description: "Industry-proven approaches refined through real-world product management experience",
      color: "pink",
      expertise: "Professional Excellence"
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
              Philosophy Behind the
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Tools</span>
            </h3>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Each tool and framework on this platform reflects my core belief in <strong>ethical problem-solving</strong> and 
              <strong> sustainable value creation</strong>. These aren't just theoretical concepts — they're practical instruments 
              born from real-world product management challenges and refined through years of helping teams succeed.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-16 text-white text-center">
            <h4 className="text-2xl font-bold mb-4">My Commitment to the Community</h4>
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              "I believe in empowering teams to identify root causes and develop commercially viable solutions that matter. 
              These tools represent my way of giving back — helping you solve the <em>right</em> problems, not just any problems."
            </p>
            <p className="text-lg opacity-80 mt-4">— Prem Pradeep</p>
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
                  <div className="mb-3">
                    <div className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
                      {feature.expertise}
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                      {feature.title}
                    </h4>
                  </div>
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
