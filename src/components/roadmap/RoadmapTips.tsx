
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RoadmapTips = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Roadmap Best Practices</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Think Themes, Not Features</h4>
            <p className="text-sm text-gray-600">Focus on outcomes and customer problems rather than specific features.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Keep It Flexible</h4>
            <p className="text-sm text-gray-600">Roadmaps should be living documents that evolve with new information.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Communicate Context</h4>
            <p className="text-sm text-gray-600">Always explain the why behind your roadmap decisions.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoadmapTips;
