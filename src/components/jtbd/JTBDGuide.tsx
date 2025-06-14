
import { BookOpen, Users, Target, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const JTBDGuide = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Jobs to be Done Framework
          </h2>
          <p className="text-gray-600">Understanding customer needs through Clayton Christensen's methodology</p>
        </div>
      </div>

      <Tabs defaultValue="theory" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="theory">Theory</TabsTrigger>
          <TabsTrigger value="framework">Framework</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
        </TabsList>

        <TabsContent value="theory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                The Milkshake Story
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Clayton Christensen's famous milkshake study revealed that customers weren't just buying milkshakes - 
                they were "hiring" them to do specific jobs. Morning commuters hired milkshakes to make their boring 
                commute more interesting and to keep them full until lunch.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Key Insight</h4>
                <p className="text-blue-800">
                  People don't buy products - they hire them to get a job done. Understanding the job helps you 
                  build better products and marketing messages.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="framework" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-500" />
                  Job Statement Structure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-mono text-sm">
                      When I <span className="text-blue-600">[situation]</span>, 
                      I want to <span className="text-green-600">[motivation]</span>, 
                      so I can <span className="text-purple-600">[outcome]</span>
                    </p>
                  </div>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li><span className="text-blue-600">Situation:</span> Context or circumstance</li>
                    <li><span className="text-green-600">Motivation:</span> What they want to achieve</li>
                    <li><span className="text-purple-600">Outcome:</span> Desired end result</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-red-500" />
                  Three Types of Jobs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-semibold text-blue-900">Functional</h4>
                    <p className="text-sm text-blue-800">Practical, task-oriented needs</p>
                  </div>
                  <div className="p-3 border-l-4 border-green-500 bg-green-50">
                    <h4 className="font-semibold text-green-900">Emotional</h4>
                    <p className="text-sm text-green-800">How they want to feel</p>
                  </div>
                  <div className="p-3 border-l-4 border-purple-500 bg-purple-50">
                    <h4 className="font-semibold text-purple-900">Social</h4>
                    <p className="text-sm text-purple-800">How they want to be perceived</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="examples" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Industry Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Netflix (Entertainment)</h4>
                    <p className="text-blue-800 italic">
                      "When I'm bored at home in the evening, I want to be entertained without the hassle of 
                      choosing from too many options, so I can relax and unwind."
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Uber (Transportation)</h4>
                    <p className="text-green-800 italic">
                      "When I need to get somewhere quickly and don't have a car, I want reliable transportation 
                      that I can summon instantly, so I can arrive on time without stress."
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">Slack (Communication)</h4>
                    <p className="text-purple-800 italic">
                      "When I'm working with my team remotely, I want to communicate quickly and keep 
                      conversations organized, so I can stay productive and connected."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="best-practices" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Do's</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✅ Focus on the customer's perspective</li>
                  <li>✅ Be specific about the situation</li>
                  <li>✅ Include emotional and social dimensions</li>
                  <li>✅ Use customer language, not company jargon</li>
                  <li>✅ Validate with real customer interviews</li>
                  <li>✅ Consider the entire job ecosystem</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Don'ts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>❌ Don't describe your product or solution</li>
                  <li>❌ Don't make assumptions without validation</li>
                  <li>❌ Don't focus only on functional needs</li>
                  <li>❌ Don't use internal company terminology</li>
                  <li>❌ Don't make jobs too broad or generic</li>
                  <li>❌ Don't ignore the competition</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
