import { Target, CheckSquare, Lightbulb, Users, TrendingUp, Award } from "lucide-react";

export const AboutSection = () => {
  const features = [
    {
      icon: Target,
      title: "Root Cause Analysis",
      description: "Identify and solve the right problems, not just symptoms",
      color: "purple"
    },
    {
      icon: Users,
      title: "User-Centric Growth",
      description: "Sustainable user acquisition and retention strategies",
      color: "cyan"
    },
    {
      icon: TrendingUp,
      title: "Data-Driven Decisions",
      description: "Analytics tools to guide strategic growth initiatives",
      color: "pink"
    },
    {
      icon: CheckSquare,
      title: "Ethical Frameworks",
      description: "Responsible product development methodologies",
      color: "blue"
    },
    {
      icon: Lightbulb,
      title: "Innovation Tools",
      description: "Creative frameworks for sustainable product ideas",
      color: "yellow"
    },
    {
      icon: Award,
      title: "Best Practices",
      description: "Industry-proven approaches from real experience",
      color: "green"
    }
  ];

  const getColorClasses = (color: string) => {
    return { bg: "bg-[#22325F]", text: "text-teal-400", glow: "" };
  };

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-8 py-4 mb-8">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
              <span className="text-white font-black text-lg tracking-wide">PHILOSOPHY</span>
            </div>
            <h3 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
              The Science Behind the
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Magic
              </span>
            </h3>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
              Each tool reflects my core belief in <span className="text-white font-bold">ethical problem-solving</span> and 
              <span className="text-purple-300 font-bold"> sustainable value creation</span> — practical instruments forged from real-world battles.
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
                  className={`group ${colors.bg} backdrop-blur-md rounded-3xl p-8 hover:shadow-2xl ${colors.glow} hover:scale-105 transition-all duration-500 border border-white/10 hover:border-white/20 relative overflow-hidden`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className={`p-5 bg-white/10 backdrop-blur-sm rounded-2xl w-20 h-20 mb-6 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border border-white/20`}>
                      <IconComponent className={`w-10 h-10 ${colors.text}`} />
                    </div>
                    <h4 className="text-2xl font-bold text-white group-hover:text-gray-100 transition-colors duration-300 mb-4">
                      {feature.title}
                    </h4>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
