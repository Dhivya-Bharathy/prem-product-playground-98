
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download } from "lucide-react";

interface CallToActionProps {
  onReset: () => void;
  onDownloadPDF: () => void;
}

export const CallToAction = ({ onReset, onDownloadPDF }: CallToActionProps) => {
  return (
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
              onClick={onDownloadPDF}
              className="bg-white text-blue-600 hover:bg-blue-50 rounded-xl font-semibold"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF Report
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
