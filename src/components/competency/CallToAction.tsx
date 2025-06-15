import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Printer } from "lucide-react";

interface CallToActionProps {
  onReset: () => void;
  onDownloadPDF: () => void;
}

export const CallToAction = ({ onReset, onDownloadPDF }: CallToActionProps) => {
  return (
    <Card className="border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white print:bg-white print:text-black print:p-4 print:shadow-none print:border print:border-gray-300">
      <CardContent className="py-8">
        <div className="text-center space-y-6">
          <h3 className="text-2xl font-bold print:text-black">
            Ready to Accelerate Your PM Career?
          </h3>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto print:text-gray-900">
            Use these insights to guide your professional development, career decisions, and growth conversations with your manager.
          </p>
          <div className="flex justify-center gap-4 print:hidden">
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
              aria-label="Print or Save as PDF"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print or Save
            </Button>
          </div>
          {/* Print-only notice, not shown onscreen */}
          <div className="hidden print:block mt-6 text-base text-gray-900">
            <span><b>Tip:</b> To save your results, choose "Save as PDF" in the print dialog.</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
