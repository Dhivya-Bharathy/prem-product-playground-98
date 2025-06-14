
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

const RiceFrameworkExplanation = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          RICE Framework
        </CardTitle>
        <CardDescription>
          Understanding the RICE scoring methodology
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-blue-600">Reach</h4>
          <p className="text-sm text-gray-600">How many people will this feature reach within a time period? Example: 2,000 customers per quarter.</p>
        </div>
        <div>
          <h4 className="font-semibold text-green-600">Impact</h4>
          <p className="text-sm text-gray-600">How much will this feature impact each person when they encounter it?</p>
          <ul className="text-xs text-gray-500 mt-1 ml-4">
            <li>• 3 = Massive impact</li>
            <li>• 2 = High impact</li>
            <li>• 1 = Medium impact</li>
            <li>• 0.5 = Low impact</li>
            <li>• 0.25 = Minimal impact</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-purple-600">Confidence</h4>
          <p className="text-sm text-gray-600">How confident are you about your Reach and Impact estimates?</p>
          <ul className="text-xs text-gray-500 mt-1 ml-4">
            <li>• 100% = High confidence</li>
            <li>• 80% = Medium confidence</li>
            <li>• 50% = Low confidence</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-orange-600">Effort</h4>
          <p className="text-sm text-gray-600">How much work will this require from your team? Estimate in person-months.</p>
        </div>
        <div className="pt-4 border-t">
          <h4 className="font-semibold">Formula</h4>
          <p className="text-sm text-gray-600">RICE Score = (Reach × Impact × Confidence%) ÷ Effort</p>
          <p className="text-xs text-gray-500 mt-1">Higher score = Higher priority</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiceFrameworkExplanation;
