
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { AssessmentResults } from "@/types/competency";
import { useToast } from "@/hooks/use-toast";
import { generateCompetencyPDF } from "@/utils/pdfGenerator";
import { StrengthsAndDevelopment } from "./StrengthsAndDevelopment";
import { ActionPlan } from "./ActionPlan";
import { CallToAction } from "./CallToAction";

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

  const handleDownloadPDF = () => {
    try {
      generateCompetencyPDF(results);
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
          <Button variant="outline" onClick={handleDownloadPDF} className="rounded-xl">
            <Download className="w-4 h-4 mr-2" />
            Export PDF Report
          </Button>
        </div>
      </div>

      <StrengthsAndDevelopment 
        topStrengths={results.topStrengths}
        developmentAreas={results.developmentAreas}
      />

      <ActionPlan recommendations={results.recommendations} />

      <CallToAction 
        onReset={onReset}
        onDownloadPDF={handleDownloadPDF}
      />
    </div>
  );
};
