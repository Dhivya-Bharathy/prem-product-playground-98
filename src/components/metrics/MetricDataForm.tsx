
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { MetricData, MetricCategory, PredefinedPeriod } from "@/types/metrics";
import { PREDEFINED_PERIODS, COMPARISON_PERIOD_TYPES } from "@/utils/timePeriodUtils";
import { Plus, Edit2, Trash2, Calendar } from "lucide-react";

interface MetricDataFormProps {
  metrics: MetricData[];
  onMetricsUpdate: (metrics: MetricData[]) => void;
}

const MetricDataForm = ({ metrics, onMetricsUpdate }: MetricDataFormProps) => {
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    value: '',
    previousValue: '',
    category: '' as MetricCategory,
    periodType: 'rolling' as 'fixed' | 'rolling' | 'custom',
    predefinedPeriod: '' as PredefinedPeriod,
    customStartDate: '',
    customEndDate: '',
    comparisonType: 'previous_period' as 'previous_period' | 'same_period_last_year' | 'custom',
    target: '',
    targetDate: ''
  });

  const categories: MetricCategory[] = ['acquisition', 'activation', 'retention', 'revenue', 'referral', 'engagement'];

  const resetForm = () => {
    setFormData({
      name: '',
      value: '',
      previousValue: '',
      category: '' as MetricCategory,
      periodType: 'rolling',
      predefinedPeriod: '' as PredefinedPeriod,
      customStartDate: '',
      customEndDate: '',
      comparisonType: 'previous_period',
      target: '',
      targetDate: ''
    });
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.value || !formData.previousValue || !formData.category) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const value = parseFloat(formData.value);
    const previousValue = parseFloat(formData.previousValue);
    const change = value - previousValue;
    const changePercentage = previousValue !== 0 ? (change / previousValue) * 100 : 0;
    const trend = changePercentage > 2 ? 'up' : changePercentage < -2 ? 'down' : 'stable';

    // Create measurement period
    const measurementPeriod = formData.periodType === 'custom' && formData.customStartDate && formData.customEndDate
      ? {
          type: 'custom' as const,
          customRange: {
            startDate: formData.customStartDate,
            endDate: formData.customEndDate
          },
          label: `${new Date(formData.customStartDate).toLocaleDateString()} - ${new Date(formData.customEndDate).toLocaleDateString()}`
        }
      : {
          type: 'predefined' as const,
          predefinedPeriod: formData.predefinedPeriod,
          label: PREDEFINED_PERIODS.find(p => p.value === formData.predefinedPeriod)?.label || 'Current period'
        };

    // Create comparison period
    const comparisonPeriod = {
      type: formData.comparisonType,
      label: COMPARISON_PERIOD_TYPES.find(c => c.value === formData.comparisonType)?.label || 'Previous period'
    };

    const metricData: MetricData = {
      id: editingId || Date.now().toString(),
      name: formData.name,
      value,
      previousValue,
      change,
      changePercentage,
      trend,
      category: formData.category,
      measurementPeriod,
      comparisonPeriod,
      periodType: formData.periodType,
      target: formData.target ? parseFloat(formData.target) : undefined,
      targetDate: formData.targetDate || undefined
    };

    let updatedMetrics;
    if (editingId) {
      updatedMetrics = metrics.map(m => m.id === editingId ? metricData : m);
      toast({
        title: "Metric Updated",
        description: `${formData.name} has been updated successfully.`
      });
    } else {
      updatedMetrics = [...metrics, metricData];
      toast({
        title: "Metric Added",
        description: `${formData.name} has been added successfully.`
      });
    }

    onMetricsUpdate(updatedMetrics);
    resetForm();
  };

  const handleEdit = (metric: MetricData) => {
    setFormData({
      name: metric.name,
      value: metric.value.toString(),
      previousValue: metric.previousValue.toString(),
      category: metric.category,
      periodType: metric.periodType,
      predefinedPeriod: metric.measurementPeriod.predefinedPeriod || '' as PredefinedPeriod,
      customStartDate: metric.measurementPeriod.customRange?.startDate || '',
      customEndDate: metric.measurementPeriod.customRange?.endDate || '',
      comparisonType: metric.comparisonPeriod.type,
      target: metric.target?.toString() || '',
      targetDate: metric.targetDate || ''
    });
    setEditingId(metric.id);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    const updatedMetrics = metrics.filter(m => m.id !== id);
    onMetricsUpdate(updatedMetrics);
    toast({
      title: "Metric Deleted",
      description: "Metric has been removed successfully."
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Manage Metrics Data</h3>
        <Button onClick={() => setIsFormOpen(!isFormOpen)} variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Add Metric
        </Button>
      </div>

      {isFormOpen && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Metric' : 'Add New Metric'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Metric Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g., Monthly Active Users"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value: MetricCategory) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="value">Current Value *</Label>
                  <Input
                    id="value"
                    type="number"
                    step="0.01"
                    value={formData.value}
                    onChange={(e) => setFormData({...formData, value: e.target.value})}
                    placeholder="1000"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="previousValue">Previous Value *</Label>
                  <Input
                    id="previousValue"
                    type="number"
                    step="0.01"
                    value={formData.previousValue}
                    onChange={(e) => setFormData({...formData, previousValue: e.target.value})}
                    placeholder="900"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="periodType">Period Type</Label>
                  <Select value={formData.periodType} onValueChange={(value: 'fixed' | 'rolling' | 'custom') => setFormData({...formData, periodType: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rolling">Rolling</SelectItem>
                      <SelectItem value="fixed">Fixed</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {formData.periodType === 'custom' ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customStartDate">Start Date</Label>
                    <Input
                      id="customStartDate"
                      type="date"
                      value={formData.customStartDate}
                      onChange={(e) => setFormData({...formData, customStartDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="customEndDate">End Date</Label>
                    <Input
                      id="customEndDate"
                      type="date"
                      value={formData.customEndDate}
                      onChange={(e) => setFormData({...formData, customEndDate: e.target.value})}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <Label htmlFor="predefinedPeriod">Measurement Period</Label>
                  <Select value={formData.predefinedPeriod} onValueChange={(value: PredefinedPeriod) => setFormData({...formData, predefinedPeriod: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      {PREDEFINED_PERIODS.map((period) => (
                        <SelectItem key={period.value} value={period.value}>
                          {period.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label htmlFor="comparisonType">Comparison Period</Label>
                <Select value={formData.comparisonType} onValueChange={(value: 'previous_period' | 'same_period_last_year' | 'custom') => setFormData({...formData, comparisonType: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {COMPARISON_PERIOD_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="target">Target (Optional)</Label>
                  <Input
                    id="target"
                    type="number"
                    step="0.01"
                    value={formData.target}
                    onChange={(e) => setFormData({...formData, target: e.target.value})}
                    placeholder="1200"
                  />
                </div>
                <div>
                  <Label htmlFor="targetDate">Target Date (Optional)</Label>
                  <Input
                    id="targetDate"
                    type="date"
                    value={formData.targetDate}
                    onChange={(e) => setFormData({...formData, targetDate: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit">
                  {editingId ? 'Update Metric' : 'Add Metric'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {metrics.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Current Metrics ({metrics.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {metrics.map((metric) => (
                <div key={metric.id} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{metric.name}</span>
                      <span className="text-sm text-gray-500">({metric.category})</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                      <Calendar className="w-3 h-3" />
                      <span>{metric.measurementPeriod.label}</span>
                      {metric.targetDate && (
                        <span className="ml-2">Target: {new Date(metric.targetDate).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(metric)}>
                      <Edit2 className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(metric.id)}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MetricDataForm;
