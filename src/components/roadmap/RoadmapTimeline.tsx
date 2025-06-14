
import { forwardRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, GitBranch, Target } from "lucide-react";
import { RoadmapItem, QUARTERS } from "@/types/roadmap";
import { getStatusColor, getPriorityColor } from "@/utils/roadmapUtils";

interface RoadmapTimelineProps {
  roadmapItems: RoadmapItem[];
}

const RoadmapTimeline = forwardRef<HTMLDivElement, RoadmapTimelineProps>(
  ({ roadmapItems }, ref) => {
    const groupedItems = QUARTERS.reduce((acc, quarter) => {
      acc[quarter] = roadmapItems.filter(item => item.quarter === quarter);
      return acc;
    }, {} as Record<string, RoadmapItem[]>);

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Roadmap Timeline
          </CardTitle>
          <CardDescription>
            Visual representation of your product roadmap
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div ref={ref}>
            {roadmapItems.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                <GitBranch className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Add items to see your roadmap here</p>
              </div>
            ) : (
              <div className="space-y-8">
                {QUARTERS.map(quarter => (
                  <div key={quarter} className="border-l-4 border-blue-200 pl-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-4 h-4 bg-blue-500 rounded-full -ml-8"></div>
                      <h3 className="text-lg font-semibold text-gray-900">{quarter}</h3>
                      <Badge variant="outline">
                        {groupedItems[quarter]?.length || 0} items
                      </Badge>
                    </div>
                    
                    {groupedItems[quarter]?.length > 0 ? (
                      <div className="grid md:grid-cols-2 gap-4">
                        {groupedItems[quarter].map(item => (
                          <div key={item.id} className="p-4 bg-white border rounded-lg shadow-sm">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium text-gray-900">{item.title}</h4>
                              <Target className="w-4 h-4 text-gray-400" />
                            </div>
                            
                            {item.description && (
                              <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                            )}
                            
                            <div className="flex gap-2">
                              <Badge className={getStatusColor(item.status)}>
                                {item.status}
                              </Badge>
                              <Badge className={getPriorityColor(item.priority)}>
                                {item.priority}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No items planned for this quarter</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);

RoadmapTimeline.displayName = "RoadmapTimeline";

export default RoadmapTimeline;
