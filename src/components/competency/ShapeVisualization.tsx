
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';
import { CompetencyShape, COMPETENCIES } from "@/types/competency";

interface ShapeVisualizationProps {
  shape: CompetencyShape;
}

export const ShapeVisualization = ({ shape }: ShapeVisualizationProps) => {
  const radarData = COMPETENCIES.map(comp => ({
    competency: comp.name.length > 15 ? 
      comp.name.split(' ').map(word => word.slice(0, 3)).join(' ') : 
      comp.name,
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

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const scoreLabels = { 1: 'Needs Focus', 2: 'On Track', 3: 'Outperform' };
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data.fullName}</p>
          <p className="text-sm text-blue-600">
            Score: {data.score} - {scoreLabels[data.score as keyof typeof scoreLabels]}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your PM Competency Shape</CardTitle>
        <p className="text-sm text-gray-600">
          This radar chart visualizes your strengths across all 12 competencies. Hover over points for details.
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
              <PolarGrid gridType="polygon" />
              <PolarAngleAxis 
                dataKey="competency" 
                tick={{ fontSize: 11, fill: '#374151' }}
                className="text-xs font-medium"
              />
              <PolarRadiusAxis 
                angle={0} 
                domain={[0, 3]} 
                tickCount={4}
                tick={{ fontSize: 10, fill: '#6B7280' }}
                tickFormatter={(value) => {
                  const labels = { 0: '', 1: 'Focus', 2: 'Track', 3: 'Excel' };
                  return labels[value as keyof typeof labels] || '';
                }}
              />
              <Radar
                name="Competency Score"
                dataKey="score"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.25}
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 5 }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {shape.productExecution.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Product Execution</div>
            <div className="text-xs text-gray-500 mt-1">Building & Delivery</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {shape.customerInsight.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Customer Insight</div>
            <div className="text-xs text-gray-500 mt-1">Understanding Users</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {shape.productStrategy.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Product Strategy</div>
            <div className="text-xs text-gray-500 mt-1">Vision & Impact</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {shape.influencingPeople.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Influencing People</div>
            <div className="text-xs text-gray-500 mt-1">Leadership & Stakeholders</div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Scale: 1.0 = Needs Focus | 2.0 = On Track | 3.0 = Outperform
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
