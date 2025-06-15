import { BookOpen, Users, Target, Lightbulb } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import React from "react";

// To keep it very modular, you can provide a className to the parent and change min-w if needed
export function JTBDTabsList({ value }: { value: string }) {
  // Tab config
  const TABS = [
    {
      value: "theory",
      label: "Theory",
      icon: <BookOpen className="w-5 h-5 text-yellow-700" />,
    },
    {
      value: "framework",
      label: "Framework",
      icon: <Target className="w-5 h-5 text-blue-700" />,
    },
    {
      value: "examples",
      label: "Examples",
      icon: <Users className="w-5 h-5 text-purple-700" />,
    },
    {
      value: "best-practices",
      label: "Best Practices",
      icon: <Lightbulb className="w-5 h-5 text-green-700" />,
    },
  ];

  // Scrollable tabs list for mobile, grid on desktop
  return (
    <TooltipProvider>
      <div className="overflow-x-auto hide-scrollbar mb-4 -mx-2 px-1 sm:px-0">
        <TabsList
          className="flex w-full min-w-[320px] sm:min-w-0 gap-1 sm:gap-0 border rounded-lg bg-slate-100"
          style={{ minWidth: 320 }}
        >
          {TABS.map(tab => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex-1 min-w-[80px] sm:min-w-[120px] text-xs sm:text-sm flex flex-col items-center justify-center py-2 px-2"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex flex-row items-center gap-1">
                    {tab.icon}
                    <span className="hidden sm:inline">{tab.label}</span>
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  {tab.label}
                </TooltipContent>
              </Tooltip>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
    </TooltipProvider>
  );
}
