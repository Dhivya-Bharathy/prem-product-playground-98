import { BookOpen, Users, Target, Lightbulb, CheckSquare, FileText, BookMarked, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const guideTabIcons = [
  { key: "theory", label: "Theory", Icon: Lightbulb },
  { key: "framework", label: "Framework", Icon: Target },
  { key: "examples", label: "Examples", Icon: FileText },
  { key: "best-practices", label: "Best Practices", Icon: Sparkles },
];

export const UserStoryGuide = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            User Story Framework
          </h2>
          <p className="text-gray-600">Master the art of writing effective user stories using industry standards</p>
        </div>
      </div>

      {/* Scrollable icon-only tab bar for mobile, text label tabs for desktop */}
      <Tabs defaultValue="theory" className="w-full">
        {/* Mobile: horizontal scroll icons, desktop: classic bar with text */}
        <div className="md:hidden overflow-x-auto hide-scrollbar mb-4 -mx-2 px-1">
          <TabsList className="flex w-full min-w-[260px] gap-1 border rounded-lg bg-slate-100">
            {guideTabIcons.map(({ key, label, Icon }) => (
              <TabsTrigger
                key={key}
                value={key}
                className="flex-1 min-w-[64px] flex flex-col items-center justify-center py-2 px-0"
                aria-label={label}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    {label}
                  </TooltipContent>
                </Tooltip>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div className="hidden md:block mb-4">
          <TabsList className="grid w-full grid-cols-4">
            {guideTabIcons.map(({ key, label }) => (
              <TabsTrigger key={key} value={key}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* All TAB CONTENT stays the same */}
        {/* Each TabsContent below */}
        <TabsContent value="theory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                What are User Stories?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                User stories are short, simple descriptions of a feature told from the perspective of the person 
                who desires the new capability, usually a user or customer of the system. They follow a simple 
                template to capture the 'who', 'what' and 'why' of a requirement.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Origin & Purpose</h4>
                <p className="text-blue-800">
                  Developed as part of Agile methodologies, user stories shift focus from writing about 
                  requirements to talking about them. They promote collaboration between development teams 
                  and stakeholders by using natural language that everyone can understand.
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">The 3 C's of User Stories</h4>
                <ul className="text-green-800 space-y-1">
                  <li><strong>Card:</strong> Written description of the story</li>
                  <li><strong>Conversation:</strong> Discussion about the story's details</li>
                  <li><strong>Confirmation:</strong> Tests that outline and validate the story's behavior</li>
                </ul>
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
                  Story Template Structure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-mono text-sm">
                      As a <span className="text-blue-600">[type of user]</span>, 
                      I want <span className="text-green-600">[some goal]</span> 
                      so that <span className="text-purple-600">[some reason]</span>
                    </p>
                  </div>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li><span className="text-blue-600">Who:</span> The user or persona</li>
                    <li><span className="text-green-600">What:</span> The functionality or feature</li>
                    <li><span className="text-purple-600">Why:</span> The business value or benefit</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-red-500" />
                  INVEST Criteria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="p-2 border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-semibold text-blue-900">Independent</h4>
                    <p className="text-sm text-blue-800">Stories should be self-contained</p>
                  </div>
                  <div className="p-2 border-l-4 border-green-500 bg-green-50">
                    <h4 className="font-semibold text-green-900">Negotiable</h4>
                    <p className="text-sm text-green-800">Details can be discussed and refined</p>
                  </div>
                  <div className="p-2 border-l-4 border-purple-500 bg-purple-50">
                    <h4 className="font-semibold text-purple-900">Valuable</h4>
                    <p className="text-sm text-purple-800">Must provide value to users</p>
                  </div>
                  <div className="p-2 border-l-4 border-orange-500 bg-orange-50">
                    <h4 className="font-semibold text-orange-900">Estimable</h4>
                    <p className="text-sm text-orange-800">Development effort can be estimated</p>
                  </div>
                  <div className="p-2 border-l-4 border-pink-500 bg-pink-50">
                    <h4 className="font-semibold text-pink-900">Small</h4>
                    <p className="text-sm text-pink-800">Fit within a single sprint</p>
                  </div>
                  <div className="p-2 border-l-4 border-gray-500 bg-gray-50">
                    <h4 className="font-semibold text-gray-900">Testable</h4>
                    <p className="text-sm text-gray-800">Clear acceptance criteria</p>
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
                    <h4 className="font-semibold text-blue-900 mb-2">E-commerce Platform</h4>
                    <p className="text-blue-800 italic mb-2">
                      "As a returning customer, I want to view my order history so that I can track 
                      my purchases and reorder items I've bought before."
                    </p>
                    <p className="text-sm text-blue-700">
                      <strong>Acceptance Criteria:</strong> Can access order history from account menu, 
                      view order details, and click to reorder
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Banking Application</h4>
                    <p className="text-green-800 italic mb-2">
                      "As a mobile banking user, I want to transfer money using biometric authentication 
                      so that I can make secure transactions quickly without typing passwords."
                    </p>
                    <p className="text-sm text-green-700">
                      <strong>Acceptance Criteria:</strong> Supports fingerprint/face ID, shows confirmation screen, 
                      transaction completes within 30 seconds
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">Learning Management System</h4>
                    <p className="text-purple-800 italic mb-2">
                      "As a student, I want to receive notifications about upcoming assignment deadlines 
                      so that I can manage my time effectively and submit work on time."
                    </p>
                    <p className="text-sm text-purple-700">
                      <strong>Acceptance Criteria:</strong> Notifications 7 days, 3 days, and 1 day before deadline, 
                      customizable notification preferences
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
                <CardTitle className="text-green-600">Writing Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✅ Start with user personas, not features</li>
                  <li>✅ Focus on the outcome, not the output</li>
                  <li>✅ Use simple, clear language</li>
                  <li>✅ Include acceptance criteria</li>
                  <li>✅ Keep stories small and focused</li>
                  <li>✅ Make the value explicit</li>
                  <li>✅ Collaborate with stakeholders</li>
                  <li>✅ Write from user's perspective</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Common Pitfalls</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>❌ Writing technical specifications instead of user needs</li>
                  <li>❌ Making stories too large (epics)</li>
                  <li>❌ Focusing on UI details instead of functionality</li>
                  <li>❌ Missing the "why" - the business value</li>
                  <li>❌ Using internal jargon or technical terms</li>
                  <li>❌ Creating dependencies between stories</li>
                  <li>❌ Skipping acceptance criteria</li>
                  <li>❌ Writing from system's perspective</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-blue-600" />
                Industry Standards & Frameworks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Scrum Alliance Guidelines</h4>
                  <p className="text-sm text-blue-800">
                    Stories should be written collaboratively, refined regularly, and include clear 
                    definition of done criteria.
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">SAFe Framework</h4>
                  <p className="text-sm text-green-800">
                    Emphasizes benefit hypothesis and acceptance criteria as key components 
                    of well-formed user stories.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Mike Cohn's Guidelines</h4>
                  <p className="text-sm text-purple-800">
                    Focus on users and their goals, write at the right level of detail, 
                    and include acceptance criteria.
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-2">Atlassian Best Practices</h4>
                  <p className="text-sm text-orange-800">
                    Stories should be simple, provide value, and be written from the 
                    user's perspective with clear acceptance criteria.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
