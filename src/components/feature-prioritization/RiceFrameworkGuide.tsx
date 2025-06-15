
import { BookOpen, Calculator, Users, Target, Lightbulb, TrendingUp, LayoutList, BadgePercent, FileBarChart, ClipboardCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const GUIDE_TABS = [
  {
    value: "overview",
    label: "Overview",
    Icon: Lightbulb,
  },
  {
    value: "components",
    label: "Components",
    Icon: LayoutList,
  },
  {
    value: "calculation",
    label: "Calculation",
    Icon: FileBarChart,
  },
  {
    value: "best-practices",
    label: "Best Practices",
    Icon: ClipboardCheck,
  },
];

export const RiceFrameworkGuide = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            RICE Framework Guide
          </h2>
          <p className="text-gray-600">Systematic approach to feature prioritization</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <div className="overflow-x-auto hide-scrollbar mb-4 -mx-2 sm:mx-0 px-1 sm:px-0">
          <TabsList
            className="flex w-full min-w-[320px] gap-1 sm:gap-0 border rounded-lg bg-slate-100 flex-nowrap"
            style={{ minWidth: 260 }}
          >
            {GUIDE_TABS.map(({ value, label, Icon }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="flex-1 min-w-[64px] sm:min-w-[120px] flex flex-col items-center justify-center py-2 px-1 text-xs sm:text-sm focus-visible:outline-none"
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex justify-center">
                      <Icon className="w-5 h-5 sm:mr-2 text-blue-600" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    {label}
                  </TooltipContent>
                </Tooltip>
                <span className="hidden sm:block mt-1">{label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                What is RICE?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                RICE is a prioritization framework developed by Intercom to help product teams 
                prioritize features, projects, and initiatives. It stands for Reach, Impact, 
                Confidence, and Effort.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Key Benefits</h4>
                <ul className="text-blue-800 space-y-1 text-sm">
                  <li>• Removes emotion and politics from prioritization decisions</li>
                  <li>• Forces teams to think critically about each component</li>
                  <li>• Creates a shared language for discussing priorities</li>
                  <li>• Provides quantifiable scores for comparison</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="components" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  Reach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-3">
                  How many people will this feature reach within a time period?
                </p>
                <div className="space-y-2">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h5 className="font-semibold text-blue-900">Examples:</h5>
                    <ul className="text-sm text-blue-800 mt-1">
                      <li>• 2,000 customers per quarter</li>
                      <li>• 500 signups per month</li>
                      <li>• 10,000 page views per week</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-500" />
                  Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-3">
                  How much will this feature impact each person when they encounter it?
                </p>
                <div className="space-y-2">
                  <Badge className="bg-red-100 text-red-800">3 = Massive impact</Badge>
                  <Badge className="bg-orange-100 text-orange-800">2 = High impact</Badge>
                  <Badge className="bg-yellow-100 text-yellow-800">1 = Medium impact</Badge>
                  <Badge className="bg-blue-100 text-blue-800">0.5 = Low impact</Badge>
                  <Badge className="bg-gray-100 text-gray-800">0.25 = Minimal impact</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                  Confidence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-3">
                  How confident are you about your Reach and Impact estimates?
                </p>
                <div className="space-y-2">
                  <Badge className="bg-green-100 text-green-800">100% = High confidence</Badge>
                  <Badge className="bg-yellow-100 text-yellow-800">80% = Medium confidence</Badge>
                  <Badge className="bg-red-100 text-red-800">50% = Low confidence</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-orange-500" />
                  Effort
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-3">
                  How much work will this require from your team?
                </p>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <h5 className="font-semibold text-orange-900">Estimate in person-months:</h5>
                  <ul className="text-sm text-orange-800 mt-1">
                    <li>• 0.5 = Half a person-month</li>
                    <li>• 2 = Two person-months</li>
                    <li>• 5 = Five person-months</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calculation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>RICE Score Calculation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  RICE Score = (Reach × Impact × Confidence%) ÷ Effort
                </div>
                <p className="text-gray-600">Higher score = Higher priority</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Example Calculation</h4>
                  <div className="space-y-1 text-sm">
                    <div>Reach: 1,000 users</div>
                    <div>Impact: 2 (high)</div>
                    <div>Confidence: 80%</div>
                    <div>Effort: 3 person-months</div>
                  </div>
                  <div className="mt-3 p-2 bg-gray-50 rounded">
                    <strong>Score: (1,000 × 2 × 0.8) ÷ 3 = 533.33</strong>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Score Interpretation</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>High Priority:</span>
                      <Badge className="bg-red-100 text-red-800">&gt; 100</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Medium Priority:</span>
                      <Badge className="bg-yellow-100 text-yellow-800">50-100</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Low Priority:</span>
                      <Badge className="bg-blue-100 text-blue-800">&lt; 50</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="best-practices" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Do's</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✅ Use the same time period for all reach estimates</li>
                  <li>✅ Be conservative with impact scores</li>
                  <li>✅ Lower confidence when you're unsure</li>
                  <li>✅ Include all types of effort (design, dev, testing)</li>
                  <li>✅ Re-evaluate scores regularly</li>
                  <li>✅ Use data to inform your estimates</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Don'ts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>❌ Don't overthink the precision of scores</li>
                  <li>❌ Don't ignore maintenance and support effort</li>
                  <li>❌ Don't use RICE for everything (only competing priorities)</li>
                  <li>❌ Don't let one person determine all scores</li>
                  <li>❌ Don't ignore strategic importance entirely</li>
                  <li>❌ Don't set scores in isolation</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
