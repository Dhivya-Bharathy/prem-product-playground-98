
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { CompetencyShape, COMPETENCIES } from "@/types/competency";

interface ShapeVisualizationProps {
  shape: CompetencyShape;
}

export const ShapeVisualization = ({ shape }: ShapeVisualizationProps) => {
  const radarData = COMPETENCIES.map(comp => ({
    competency: comp.name.split(' ').map(word => word.slice(0, 4)).join(' '),
    fullName: comp.name,
    score: shape.competencyScores[comp.id] || 1,
    area: comp.area
  }));

  const areaColors = {
    'product-execution': '#3B82F6',
    'customer-insight': '#10B981', 
    'product-strategy': '#8B5CF6',
    'influencing-people': '#F59E0B'
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your PM Competency Shape</CardTitle>
        <p className="text-sm text-gray-600">
          This radar chart visualizes your strengths across all 12 competencies
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis 
                dataKey="competency" 
                tick={{ fontSize: 10 }}
                className="text-xs"
              />
              <PolarRadiusAxis 
                angle={0} 
                domain={[0, 3]} 
                tickCount={4}
                tick={{ fontSize: 10 }}
              />
              <Radar
                name="Competency Score"
                dataKey="score"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.2}
                strokeWidth={2}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {shape.productExecution.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Product Execution</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {shape.customerInsight.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Customer Insight</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {shape.productStrategy.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Product Strategy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {shape.influencingPeople.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Influencing People</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
