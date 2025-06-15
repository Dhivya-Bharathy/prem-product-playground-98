
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { userStoryTabIcons } from "./UserStoryTabsIconMap";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { UserStoryGuide } from "./UserStoryGuide";
import { UserStoryBuilder } from "./UserStoryBuilder";
import { UserStoryTemplates } from "./UserStoryTemplates";
import { UserStoriesList } from "./UserStoriesList";
import { UserStory, UserStoryTemplate } from "@/types/user-story";

interface UserStoryTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  stories: UserStory[];
  handleSaveStory: (story: UserStory) => void;
  templateToUse: UserStoryTemplate | null;
  handleTemplateUsed: () => void;
  handleUseTemplate: (template: UserStoryTemplate) => void;
  handleDeleteStory: (id: string) => void;
  getPriorityColor: (priority: string) => string;
}

export const UserStoryTabs = ({
  activeTab,
  setActiveTab,
  stories,
  handleSaveStory,
  templateToUse,
  handleTemplateUsed,
  handleUseTemplate,
  handleDeleteStory,
  getPriorityColor,
}: UserStoryTabsProps) => (
  <Tabs value={activeTab} onValueChange={setActiveTab}>
    {/* Responsive TabsList with scrollable horizontal icons on mobile */}
    <div className="overflow-x-auto hide-scrollbar mb-4 -mx-2 px-1 sm:px-2">
      <TabsList
        className="flex w-full min-w-[280px] sm:min-w-0 gap-1 sm:gap-0 border rounded-lg bg-slate-100"
        style={{ minWidth: 220 }}
      >
        {Object.entries(userStoryTabIcons).map(([key, { Icon, label }]) => (
          <TabsTrigger
            key={key}
            value={key}
            className="flex-1 min-w-[68px] sm:min-w-[120px] text-xs sm:text-sm flex flex-col items-center justify-center py-2"
          >
            <div className="flex justify-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Icon className="w-5 h-5 sm:mr-2 text-blue-600" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {label}
                </TooltipContent>
              </Tooltip>
            </div>
            <span className="hidden sm:block mt-1">{label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
    <TabsContent value="guide">
      <div className="bg-white/90 rounded-xl shadow-lg border border-white/20 p-3 sm:p-6">
        <UserStoryGuide />
      </div>
    </TabsContent>
    <TabsContent value="builder">
      <div className="bg-white/90 rounded-xl shadow-lg border border-white/20 p-3 sm:p-6">
        <UserStoryBuilder
          onSaveStory={handleSaveStory}
          templateToUse={templateToUse}
          onTemplateUsed={handleTemplateUsed}
        />
      </div>
    </TabsContent>
    <TabsContent value="templates">
      <div className="bg-white/90 rounded-xl shadow-lg border border-white/20 p-3 sm:p-6">
        <UserStoryTemplates onUseTemplate={handleUseTemplate} />
      </div>
    </TabsContent>
    <TabsContent value="stories">
      <div className="bg-white/90 rounded-xl shadow-lg border border-white/20 p-3 sm:p-6">
        <UserStoriesList
          stories={stories}
          handleDeleteStory={handleDeleteStory}
          getPriorityColor={getPriorityColor}
        />
      </div>
    </TabsContent>
  </Tabs>
);
