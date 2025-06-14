
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { CompetencyShape, COMPETENCIES } from "@/types/competency";
import { Badge } from "@/components/ui/badge";

interface ShapeVisualizationProps {
  shape: CompetencyShape;
}

export const ShapeVisualization = ({ shape }: ShapeVisualizationProps) => {
  const radarData = COMPETENCIES.map(comp => ({
    competency: comp.name.length > 20 ? 
      comp.name.split(' ').slice(0, 2).join(' ') + '...' : 
      comp.name,
    fullName: comp.name,
    score: shape.competencyScores[comp.id] || 1,
    area: comp.area
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const scoreLabels = { 1: 'Needs Focus', 2: 'On Track', 3: 'Outperform' };
      const colors = { 1: 'text-red-600', 2: 'text-yellow-600', 3: 'text-green-600' };
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-xl shadow-lg">
          <p className="font-semibold text-gray-900 mb-1">{data.fullName}</p>
          <p className={`text-sm font-medium ${colors[data.score as keyof typeof colors]}`}>
            Score: {data.score} - {scoreLabels[data.score as keyof typeof scoreLabels]}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Your PM Competency Shape</CardTitle>
        <p className="text-gray-600">
          This radar chart visualizes your strengths across all 12 competencies. Each point represents your self-assessed capability.
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[500px] w-full mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} margin={{ top: 40, right: 80, bottom: 40, left: 80 }}>
              <PolarGrid 
                gridType="polygon" 
                stroke="#e2e8f0" 
                strokeWidth={1}
              />
              <PolarAngleAxis 
                dataKey="competency" 
                tick={{ fontSize: 11, fill: '#475569', fontWeight: 500 }}
                className="text-xs"
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 3]} 
                tickCount={4}
                tick={{ fontSize: 10, fill: '#64748b' }}
                tickFormatter={(value) => {
                  const labels = { 0: '', 1: 'Focus', 2: 'Track', 3: 'Excel' };
                  return labels[value as keyof typeof labels] || '';
                }}
              />
              <Radar
                name="Competency Score"
                dataKey="score"
                stroke="#3b82f6"
                fill="url(#radarGradient)"
                fillOpacity={0.3}
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6, stroke: '#ffffff' }}
              />
              <defs>
                <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.2} />
                </linearGradient>
              </defs>
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Area Scores */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {shape.productExecution.toFixed(1)}
            </div>
            <div className="font-semibold text-blue-700 mb-1">Product Execution</div>
            <div className="text-xs text-blue-600">Building & Delivery</div>
            <Badge className="mt-2 bg-blue-100 text-blue-700 border-0">
              {shape.productExecution >= 2.5 ? 'Strong' : shape.productExecution >= 2 ? 'Good' : 'Focus Area'}
            </Badge>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {shape.customerInsight.toFixed(1)}
            </div>
            <div className="font-semibold text-green-700 mb-1">Customer Insight</div>
            <div className="text-xs text-green-600">Understanding Users</div>
            <Badge className="mt-2 bg-green-100 text-green-700 border-0">
              {shape.customerInsight >= 2.5 ? 'Strong' : shape.customerInsight >= 2 ? 'Good' : 'Focus Area'}
            </Badge>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {shape.productStrategy.toFixed(1)}
            </div>
            <div className="font-semibold text-purple-700 mb-1">Product Strategy</div>
            <div className="text-xs text-purple-600">Vision & Impact</div>
            <Badge className="mt-2 bg-purple-100 text-purple-700 border-0">
              {shape.productStrategy >= 2.5 ? 'Strong' : shape.productStrategy >= 2 ? 'Good' : 'Focus Area'}
            </Badge>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl border border-orange-200">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {shape.influencingPeople.toFixed(1)}
            </div>
            <div className="font-semibold text-orange-700 mb-1">Influencing People</div>
            <div className="text-xs text-orange-600">Leadership & Stakeholders</div>
            <Badge className="mt-2 bg-orange-100 text-orange-700 border-0">
              {shape.influencingPeople >= 2.5 ? 'Strong' : shape.influencingPeople >= 2 ? 'Good' : 'Focus Area'}
            </Badge>
          </div>
        </div>

        <div className="text-center bg-gray-50 p-4 rounded-xl">
          <p className="text-sm text-gray-600">
            <strong>Scale:</strong> 1.0 = Needs Focus | 2.0 = On Track | 3.0 = Outperform
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
