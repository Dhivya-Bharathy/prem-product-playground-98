import { BookOpen, Users, Target, Lightbulb, Calendar, GitBranch, LayoutList, FileBarChart, ClipboardCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

// Define icon map for tabs
const ROADMAP_GUIDE_TABS = [
  {
    value: "theory",
    label: "Theory",
    Icon: Lightbulb
  },
  {
    value: "framework",
    label: "Framework",
    Icon: LayoutList,
  },
  {
    value: "examples",
    label: "Examples",
    Icon: FileBarChart,
  },
  {
    value: "best-practices",
    label: "Best Practices",
    Icon: ClipboardCheck,
  },
];

export const RoadmapGuide = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[#22325F] rounded-lg">
          <BookOpen className="w-6 h-6 text-teal-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Product Roadmap Framework
          </h2>
          <p className="text-gray-600">Strategic planning and visualization for product development</p>
        </div>
      </div>

      <Tabs defaultValue="theory" className="w-full">
        {/* MOBILE-FRIENDLY TABS */}
        <div className="overflow-x-auto hide-scrollbar mb-4 -mx-2 sm:mx-0 px-1 sm:px-0">
          <TabsList
            className="flex w-full min-w-[320px] gap-1 sm:gap-0 border rounded-lg bg-slate-100 flex-nowrap"
            style={{ minWidth: 260 }}
          >
            {ROADMAP_GUIDE_TABS.map(({ value, label, Icon }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="flex-1 min-w-[62px] sm:min-w-[140px] flex flex-col items-center justify-center py-2 px-1 text-xs sm:text-sm focus-visible:outline-none"
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-center">
                      <Icon className="w-5 h-5 sm:mr-2 text-blue-600" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">{label}</TooltipContent>
                </Tooltip>
                <span className="hidden sm:block mt-1">{label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="theory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                What is a Product Roadmap?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                A product roadmap is a strategic document that outlines the direction, priorities, 
                and progress of a product over time. It communicates the why and what behind what 
                you're building to align teams and stakeholders.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Key Purpose</h4>
                <p className="text-blue-800">
                  Roadmaps bridge strategy and execution by showing how product development aligns 
                  with business goals and customer needs over time.
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
                  <Calendar className="w-5 h-5 text-green-500" />
                  Time-Based Structure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold">Quarterly Planning</h4>
                    <p className="text-sm text-gray-600">Organize initiatives by quarters (Q1, Q2, Q3, Q4)</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900">Now-Next-Later</h4>
                    <p className="text-sm text-blue-700">Alternative timeline approach for flexibility</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-red-500" />
                  Priority Framework
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border-l-4 border-red-500 bg-red-50">
                    <h4 className="font-semibold text-red-900">High Priority</h4>
                    <p className="text-sm text-red-800">Critical features or fixes</p>
                  </div>
                  <div className="p-3 border-l-4 border-orange-500 bg-orange-50">
                    <h4 className="font-semibold text-orange-900">Medium Priority</h4>
                    <p className="text-sm text-orange-800">Important improvements</p>
                  </div>
                  <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-semibold text-blue-900">Low Priority</h4>
                    <p className="text-sm text-blue-800">Nice-to-have features</p>
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
                    <h4 className="font-semibold text-blue-900 mb-2">SaaS Platform (Q1-Q4)</h4>
                    <div className="text-sm text-blue-800 space-y-1">
                      <p><strong>Q1:</strong> User authentication & dashboard redesign</p>
                      <p><strong>Q2:</strong> Advanced analytics & reporting features</p>
                      <p><strong>Q3:</strong> Mobile app development</p>
                      <p><strong>Q4:</strong> API v2 & third-party integrations</p>
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">E-commerce Platform</h4>
                    <div className="text-sm text-green-800 space-y-1">
                      <p><strong>Now:</strong> Payment system improvements</p>
                      <p><strong>Next:</strong> Personalized recommendations</p>
                      <p><strong>Later:</strong> AR product visualization</p>
                    </div>
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
                  <li>✅ Align with business strategy and goals</li>
                  <li>✅ Include clear success metrics</li>
                  <li>✅ Communicate the 'why' behind features</li>
                  <li>✅ Keep it visual and easy to understand</li>
                  <li>✅ Review and update regularly</li>
                  <li>✅ Involve stakeholders in planning</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Don'ts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>❌ Don't over-commit to distant timelines</li>
                  <li>❌ Don't include every feature request</li>
                  <li>❌ Don't ignore technical debt</li>
                  <li>❌ Don't set it and forget it</li>
                  <li>❌ Don't make promises without data</li>
                  <li>❌ Don't ignore customer feedback</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

