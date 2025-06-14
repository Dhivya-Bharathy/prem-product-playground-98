import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Share2, RefreshCw, Lightbulb, Target, Zap, Users } from "lucide-react";
import { AssessmentResults } from "@/types/competency";
import { useToast } from "@/hooks/use-toast";
import jsPDF from 'jspdf';

interface InsightsPanelProps {
  results: AssessmentResults;
  onExport: () => void;
  onReset: () => void;
}

export const InsightsPanel = ({ results, onExport, onReset }: InsightsPanelProps) => {
  const { toast } = useToast();

  const handleShare = async () => {
    const shareText = `🎯 Just completed the PM Competency Assessment! My archetype: ${results.archetype.name}. Discover yours!`;
    const shareUrl = window.location.origin + window.location.pathname;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'PM Competency Assessment Results',
          text: shareText,
          url: shareUrl
        });
        toast({
          title: "Shared successfully! 🎉",
          description: "Thanks for sharing the PM Competency Assessment!"
        });
      } else {
        await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
        toast({
          title: "Copied to clipboard ✅",
          description: "Share text and link have been copied to your clipboard."
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast({
        title: "Share failed",
        description: "Unable to share. You can manually copy the URL to share.",
        variant: "destructive"
      });
    }
  };

  const generatePDFReport = () => {
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      let yPosition = 25;

      // Helper function to add colored backgrounds
      const addColoredSection = (x: number, y: number, width: number, height: number, color: string) => {
        pdf.setFillColor(color);
        pdf.rect(x, y, width, height, 'F');
      };

      // Header with gradient effect
      addColoredSection(0, 0, pageWidth, 40, '#3B82F6');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(28);
      pdf.setFont(undefined, 'bold');
      pdf.text('PM Competency Assessment', margin, 20);
      pdf.setFontSize(14);
      pdf.setFont(undefined, 'normal');
      pdf.text('Personalized Results Report', margin, 30);

      yPosition = 50;
      pdf.setTextColor(0, 0, 0);

      // Archetype Section with colored background
      addColoredSection(margin, yPosition - 5, pageWidth - 2 * margin, 45, '#F8FAFC');
      pdf.setFillColor(59, 130, 246);
      pdf.rect(margin, yPosition - 5, 5, 45, 'F');
      
      pdf.setFontSize(22);
      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(37, 99, 235);
      pdf.text(`🎯 ${results.archetype.name}`, margin + 10, yPosition + 5);
      
      pdf.setFontSize(12);
      pdf.setFont(undefined, 'normal');
      pdf.setTextColor(71, 85, 105);
      const descriptionLines = pdf.splitTextToSize(results.archetype.description, pageWidth - 2 * margin - 15);
      pdf.text(descriptionLines, margin + 10, yPosition + 15);
      
      yPosition += Math.max(45, descriptionLines.length * 5 + 20);

      // Competency Scores Section
      yPosition += 10;
      addColoredSection(margin, yPosition - 5, pageWidth - 2 * margin, 8, '#F1F5F9');
      pdf.setFontSize(16);
      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(30, 41, 59);
      pdf.text('📊 Competency Area Scores', margin + 5, yPosition);
      yPosition += 15;

      // Create score boxes
      const scoreWidth = (pageWidth - 2 * margin - 15) / 4;
      const scores = [
        { name: 'Product\nExecution', score: results.shape.productExecution, color: '#3B82F6' },
        { name: 'Customer\nInsight', score: results.shape.customerInsight, color: '#10B981' },
        { name: 'Product\nStrategy', score: results.shape.productStrategy, color: '#8B5CF6' },
        { name: 'Influencing\nPeople', score: results.shape.influencingPeople, color: '#F59E0B' }
      ];

      scores.forEach((item, index) => {
        const x = margin + index * (scoreWidth + 5);
        addColoredSection(x, yPosition, scoreWidth, 30, '#F8FAFC');
        
        // Score number
        pdf.setFontSize(20);
        pdf.setFont(undefined, 'bold');
        pdf.setTextColor(item.color);
        pdf.text(item.score.toFixed(1), x + scoreWidth/2, yPosition + 12, { align: 'center' });
        
        // Category name
        pdf.setFontSize(9);
        pdf.setFont(undefined, 'normal');
        pdf.setTextColor(71, 85, 105);
        const nameLines = item.name.split('\n');
        nameLines.forEach((line, lineIndex) => {
          pdf.text(line, x + scoreWidth/2, yPosition + 20 + lineIndex * 4, { align: 'center' });
        });
      });

      yPosition += 45;

      // Check if we need a new page
      if (yPosition > pageHeight - 60) {
        pdf.addPage();
        yPosition = 25;
      }

      // Strengths Section
      if (results.topStrengths.length > 0) {
        addColoredSection(margin, yPosition - 5, pageWidth - 2 * margin, 8, '#ECFDF5');
        pdf.setFillColor(34, 197, 94);
        pdf.rect(margin, yPosition - 5, 5, 8, 'F');
        
        pdf.setFontSize(16);
        pdf.setFont(undefined, 'bold');
        pdf.setTextColor(21, 128, 61);
        pdf.text('💪 Your Standout Strengths', margin + 10, yPosition);
        yPosition += 15;

        results.topStrengths.forEach((strength, index) => {
          addColoredSection(margin + 5, yPosition - 2, pageWidth - 2 * margin - 10, 8, '#F0FDF4');
          pdf.setFontSize(11);
          pdf.setFont(undefined, 'normal');
          pdf.setTextColor(22, 101, 52);
          pdf.text(`• ${strength}`, margin + 8, yPosition + 2);
          yPosition += 10;
        });
        yPosition += 10;
      }

      // Development Areas Section
      if (results.developmentAreas.length > 0) {
        if (yPosition > pageHeight - 40) {
          pdf.addPage();
          yPosition = 25;
        }

        addColoredSection(margin, yPosition - 5, pageWidth - 2 * margin, 8, '#FFF7ED');
        pdf.setFillColor(249, 115, 22);
        pdf.rect(margin, yPosition - 5, 5, 8, 'F');
        
        pdf.setFontSize(16);
        pdf.setFont(undefined, 'bold');
        pdf.setTextColor(194, 65, 12);
        pdf.text('🎯 Priority Growth Areas', margin + 10, yPosition);
        yPosition += 15;

        results.developmentAreas.forEach((area, index) => {
          addColoredSection(margin + 5, yPosition - 2, pageWidth - 2 * margin - 10, 8, '#FEF3C7');
          pdf.setFontSize(11);
          pdf.setFont(undefined, 'normal');
          pdf.setTextColor(146, 64, 14);
          pdf.text(`• ${area}`, margin + 8, yPosition + 2);
          yPosition += 10;
        });
        yPosition += 15;
      }

      // Recommendations Section
      if (yPosition > pageHeight - 50) {
        pdf.addPage();
        yPosition = 25;
      }

      addColoredSection(margin, yPosition - 5, pageWidth - 2 * margin, 8, '#EFF6FF');
      pdf.setFillColor(59, 130, 246);
      pdf.rect(margin, yPosition - 5, 5, 8, 'F');
      
      pdf.setFontSize(18);
      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(29, 78, 216);
      pdf.text('💡 Your Personalized Action Plan', margin + 10, yPosition);
      yPosition += 20;

      results.recommendations.slice(0, 3).forEach((rec, index) => {
        if (yPosition > pageHeight - 40) {
          pdf.addPage();
          yPosition = 25;
        }

        // Recommendation box
        addColoredSection(margin, yPosition - 5, pageWidth - 2 * margin, 35, '#F8FAFC');
        
        // Priority badge
        const priorityColors = {
          'high': { bg: '#FEE2E2', text: '#991B1B' },
          'medium': { bg: '#FEF3C7', text: '#92400E' },
          'low': { bg: '#D1FAE5', text: '#065F46' }
        };
        const priorityColor = priorityColors[rec.priority as keyof typeof priorityColors];
        
        pdf.setFillColor(priorityColor.bg);
        pdf.rect(pageWidth - margin - 25, yPosition - 3, 20, 6, 'F');
        pdf.setFontSize(8);
        pdf.setFont(undefined, 'bold');
        pdf.setTextColor(priorityColor.text);
        pdf.text(rec.priority.toUpperCase(), pageWidth - margin - 15, yPosition, { align: 'center' });

        // Title
        pdf.setFontSize(14);
        pdf.setFont(undefined, 'bold');
        pdf.setTextColor(30, 41, 59);
        pdf.text(`${index + 1}. ${rec.title}`, margin + 5, yPosition + 5);

        // Description
        pdf.setFontSize(10);
        pdf.setFont(undefined, 'normal');
        pdf.setTextColor(71, 85, 105);
        const recDescLines = pdf.splitTextToSize(rec.description, pageWidth - 2 * margin - 10);
        pdf.text(recDescLines, margin + 5, yPosition + 12);

        // Action
        pdf.setFontSize(10);
        pdf.setFont(undefined, 'bold');
        pdf.setTextColor(59, 130, 246);
        pdf.text('🚀 Action Step:', margin + 5, yPosition + 20);
        pdf.setFont(undefined, 'normal');
        pdf.setTextColor(71, 85, 105);
        const actionLines = pdf.splitTextToSize(rec.action, pageWidth - 2 * margin - 25);
        pdf.text(actionLines, margin + 25, yPosition + 20);

        yPosition += 40;
      });

      // Footer
      const pageCount = pdf.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        
        // Footer background
        addColoredSection(0, pageHeight - 15, pageWidth, 15, '#F8FAFC');
        
        pdf.setFontSize(8);
        pdf.setFont(undefined, 'normal');
        pdf.setTextColor(100, 116, 139);
        pdf.text(
          `Generated on ${new Date().toLocaleDateString()} | PM Competency Assessment`,
          margin,
          pageHeight - 8
        );
        pdf.text(
          `Page ${i} of ${pageCount}`,
          pageWidth - margin,
          pageHeight - 8,
          { align: 'right' }
        );
      }

      // Save the PDF
      const fileName = `pm-competency-assessment-${results.archetype.name.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);

      toast({
        title: "PDF Report Generated! 📄",
        description: "Your visual competency assessment report has been downloaded."
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "PDF Generation Failed",
        description: "There was an error creating the PDF. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'high': return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' };
      case 'medium': return { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' };
      case 'low': return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' };
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'leverage': return Zap;
      case 'develop': return Target;
      case 'focus': return Lightbulb;
      case 'role': return Users;
      default: return Lightbulb;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Personalized Insights</h2>
          <p className="text-gray-600">Actionable recommendations based on your competency profile</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleShare} className="rounded-xl">
            <Share2 className="w-4 h-4 mr-2" />
            Share Results
          </Button>
          <Button variant="outline" onClick={generatePDFReport} className="rounded-xl">
            <Download className="w-4 h-4 mr-2" />
            Export PDF Report
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Top Strengths */}
        {results.topStrengths.length > 0 && (
          <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
            <CardHeader>
              <CardTitle className="text-green-700 flex items-center gap-3 text-xl">
                <div className="p-2 bg-green-100 rounded-xl">
                  <Zap className="w-6 h-6" />
                </div>
                Your Standout Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                {results.topStrengths.map((strength, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white/60 rounded-xl">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <Badge className="bg-green-100 text-green-800 border-0 font-medium">
                      {strength}
                    </Badge>
                  </div>
                ))}
              </div>
              <p className="text-sm text-green-700 bg-green-100/50 p-4 rounded-xl">
                <strong>💪 Leverage these:</strong> These are your standout competencies where you consistently 
                outperform expectations. Use these as your competitive advantage.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Development Areas */}
        {results.developmentAreas.length > 0 && (
          <Card className="border-0 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-100">
            <CardHeader>
              <CardTitle className="text-orange-700 flex items-center gap-3 text-xl">
                <div className="p-2 bg-orange-100 rounded-xl">
                  <Target className="w-6 h-6" />
                </div>
                Priority Growth Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                {results.developmentAreas.map((area, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white/60 rounded-xl">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <Badge variant="outline" className="text-orange-700 border-orange-300 bg-white/50 font-medium">
                      {area}
                    </Badge>
                  </div>
                ))}
              </div>
              <p className="text-sm text-orange-700 bg-orange-100/50 p-4 rounded-xl">
                <strong>🎯 Focus here:</strong> Investing in these areas will have the biggest impact on 
                your overall PM effectiveness and career growth.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Action Plan */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-blue-700 flex items-center gap-3 text-2xl">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Lightbulb className="w-7 h-7" />
            </div>
            Your Personalized Action Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {results.recommendations.map((recommendation, index) => {
            const IconComponent = getTypeIcon(recommendation.type);
            const priorityConfig = getPriorityConfig(recommendation.priority);
            
            return (
              <div key={recommendation.id} className="border-2 border-gray-100 rounded-2xl p-6 hover:border-blue-200 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-50 rounded-xl">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">{recommendation.title}</h4>
                      <p className="text-gray-600 mt-1">{recommendation.description}</p>
                    </div>
                  </div>
                  <Badge className={`${priorityConfig.bg} ${priorityConfig.text} border-0 font-medium`}>
                    {recommendation.priority.toUpperCase()}
                  </Badge>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="text-sm text-blue-800">
                    <strong className="text-blue-900">🚀 Action Step:</strong> {recommendation.action}
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="py-8">
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold">
              Ready to Accelerate Your PM Career?
            </h3>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Use these insights to guide your professional development, career decisions, and growth conversations with your manager.
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                onClick={onReset} 
                variant="outline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Retake Assessment
              </Button>
              <Button 
                onClick={generatePDFReport}
                className="bg-white text-blue-600 hover:bg-blue-50 rounded-xl font-semibold"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
