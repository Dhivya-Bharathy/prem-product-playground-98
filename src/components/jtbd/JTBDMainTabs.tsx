
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { BookOpen, Edit, List, Users } from "lucide-react";

// The tab definitions for the JTBD main view (guide, builder, templates, statements)
interface JTBDMainTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  statementCount: number;
}

export const JTBDMainTabs = ({
  activeTab,
  setActiveTab,
  statementCount,
}: JTBDMainTabsProps) => {
  // Config provides labels, icons, and a11y titles.
  const MAIN_TABS = [
    {
      value: "guide",
      label: "Framework Guide",
      icon: <BookOpen className="w-5 h-5 mb-0.5 sm:mr-2 sm:mb-0 text-blue-700" />,
      a11y: "Framework Guide",
    },
    {
      value: "builder",
      label: "Statement Builder",
      icon: <Edit className="w-5 h-5 mb-0.5 sm:mr-2 sm:mb-0 text-green-700" />,
      a11y: "Statement Builder",
    },
    {
      value: "templates",
      label: "Templates",
      icon: <List className="w-5 h-5 mb-0.5 sm:mr-2 sm:mb-0 text-purple-700" />,
      a11y: "Templates",
    },
    {
      value: "statements",
      label: "My Statements",
      icon: <Users className="w-5 h-5 mb-0.5 sm:mr-2 sm:mb-0 text-indigo-700" />,
      a11y: statementCount > 0 ? `My Statements (${statementCount})` : "My Statements",
    },
  ];

  return (
    <TooltipProvider>
      <TabsList
        className={[
          "w-full mb-4 sm:mb-8",
          "flex flex-row gap-2 overflow-x-auto scrollbar-hide min-w-0", // mobile/tablet
          "sm:grid sm:grid-cols-4 sm:gap-0", // desktop grid
          "sm:overflow-x-auto", // overflow for edge cases
        ].join(" ")}
        style={{ WebkitOverflowScrolling: 'touch' }}
        aria-label="Jobs To Be Done navigation"
        role="tablist"
      >
        {MAIN_TABS.map(tab => (
          <Tooltip key={tab.value}>
            <TooltipTrigger asChild>
              <TabsTrigger
                value={tab.value}
                className="flex flex-col items-center sm:flex-row sm:justify-center min-w-[68px] sm:min-w-[110px] px-2 py-1 sm:px-3 sm:py-2 gap-1"
                aria-label={tab.a11y}
                aria-current={activeTab === tab.value ? "page" : undefined}
                data-testid={`jtbd-main-tab-${tab.value}`}
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.icon}
                {/* Visible only on md+ screen */}
                <span className="text-xs sm:text-sm font-medium text-gray-600 sm:inline hidden">
                  {tab.label}
                </span>
              </TabsTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom">{tab.label}</TooltipContent>
          </Tooltip>
        ))}
      </TabsList>
    </TooltipProvider>
  );
};
