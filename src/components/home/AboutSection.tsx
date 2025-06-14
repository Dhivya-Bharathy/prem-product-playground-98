
import { Target, CheckSquare, Lightbulb } from "lucide-react";

export const AboutSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            About Product Practice Excellence
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            This platform is designed to help product managers, entrepreneurs, and teams 
            practice and refine their product management skills. Each tool is built based 
            on industry best practices and proven frameworks used by successful product teams.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="p-4 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Practical Tools</h4>
              <p className="text-gray-600">Ready-to-use tools for real product challenges</p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckSquare className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Best Practices</h4>
              <p className="text-gray-600">Based on proven frameworks and methodologies</p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Lightbulb className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Continuous Learning</h4>
              <p className="text-gray-600">Evolving content to match industry trends</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
