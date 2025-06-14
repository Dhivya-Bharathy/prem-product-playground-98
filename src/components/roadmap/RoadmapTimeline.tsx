
import { forwardRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, GitBranch, Target, Clock } from "lucide-react";
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
            Visual representation of your product roadmap across quarters
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
              <div className="relative space-y-8">
                {/* Timeline line */}
                <div className="absolute left-6 top-8 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500"></div>
                
                {QUARTERS.map((quarter, index) => (
                  <div key={quarter} className="relative">
                    {/* Quarter marker */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative">
                        <div className="w-12 h-12 bg-white border-4 border-blue-500 rounded-full flex items-center justify-center shadow-lg z-10 relative">
                          <Clock className="w-5 h-5 text-blue-600" />
                        </div>
                        {index < QUARTERS.length - 1 && (
                          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gray-200"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{quarter}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {groupedItems[quarter]?.length || 0} items
                          </Badge>
                          {groupedItems[quarter]?.length > 0 && (
                            <div className="flex gap-1">
                              {groupedItems[quarter].slice(0, 3).map((item, idx) => (
                                <div
                                  key={idx}
                                  className={`w-2 h-2 rounded-full ${
                                    item.priority === 'High' ? 'bg-red-400' :
                                    item.priority === 'Medium' ? 'bg-orange-400' : 'bg-blue-400'
                                  }`}
                                  title={`${item.title} - ${item.priority} Priority`}
                                />
                              ))}
                              {groupedItems[quarter].length > 3 && (
                                <div className="w-2 h-2 rounded-full bg-gray-300" title="More items..."/>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Quarter items */}
                    <div className="ml-16 mb-8">
                      {groupedItems[quarter]?.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                          {groupedItems[quarter].map((item, itemIndex) => (
                            <div 
                              key={item.id} 
                              className="group relative p-4 bg-white border-2 border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-200"
                            >
                              {/* Item connector line */}
                              <div className="absolute -left-12 top-6 w-8 h-0.5 bg-gray-300 group-hover:bg-blue-300 transition-colors"></div>
                              <div className="absolute -left-16 top-5 w-2 h-2 bg-gray-300 rounded-full group-hover:bg-blue-400 transition-colors"></div>
                              
                              <div className="flex items-start justify-between mb-3">
                                <h4 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                                  {item.title}
                                </h4>
                                <Target className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                              </div>
                              
                              {item.description && (
                                <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                                  {item.description}
                                </p>
                              )}
                              
                              <div className="flex flex-wrap gap-2">
                                <Badge 
                                  className={`${getStatusColor(item.status)} text-xs font-medium`}
                                  variant="secondary"
                                >
                                  {item.status}
                                </Badge>
                                <Badge 
                                  className={`${getPriorityColor(item.priority)} text-xs font-medium`}
                                  variant="secondary"
                                >
                                  {item.priority} Priority
                                </Badge>
                              </div>
                              
                              {/* Item number indicator */}
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-medium shadow-sm">
                                {itemIndex + 1}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-6 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg text-center">
                          <p className="text-gray-500 text-sm">No items planned for this quarter</p>
                          <p className="text-gray-400 text-xs mt-1">Add items to see them here</p>
                        </div>
                      )}
                    </div>
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
