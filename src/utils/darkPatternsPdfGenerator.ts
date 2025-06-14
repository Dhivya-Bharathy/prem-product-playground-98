
import jsPDF from 'jspdf';
import { AnalysisResults } from "@/types/darkPatterns";

export const generateDarkPatternsPDF = (results: AnalysisResults) => {
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

  // Header
  addColoredSection(0, 0, pageWidth, 40, '#1E40AF');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont(undefined, 'bold');
  pdf.text('Dark Patterns Assessment Report', margin, 20);
  pdf.setFontSize(12);
  pdf.setFont(undefined, 'normal');
  pdf.text(`Analysis of ${results.url}`, margin, 30);

  yPosition = 50;
  pdf.setTextColor(0, 0, 0);

  // Executive Summary
  addColoredSection(margin, yPosition - 5, pageWidth - 2 * margin, 8, '#F1F5F9');
  pdf.setFontSize(16);
  pdf.setFont(undefined, 'bold');
  pdf.setTextColor(30, 41, 59);
  pdf.text('📊 Executive Summary', margin + 5, yPosition);
  yPosition += 15;

  // Overall Score
  const scoreColor = results.overall_score.total_score >= 70 ? '#10B981' : 
                    results.overall_score.total_score >= 50 ? '#F59E0B' : '#EF4444';
  addColoredSection(margin, yPosition, 60, 25, '#F8FAFC');
  pdf.setFontSize(14);
  pdf.setFont(undefined, 'bold');
  pdf.setTextColor(scoreColor);
  pdf.text(`Overall Score: ${results.overall_score.total_score}/100`, margin + 5, yPosition + 8);
  
  pdf.setFontSize(10);
  pdf.setFont(undefined, 'normal');
  pdf.setTextColor(71, 85, 105);
  pdf.text(`Dark: ${results.overall_score.dark_patterns}`, margin + 5, yPosition + 15);
  pdf.text(`Grey: ${results.overall_score.grey_patterns}`, margin + 20, yPosition + 15);
  pdf.text(`White: ${results.overall_score.white_patterns}`, margin + 35, yPosition + 15);

  yPosition += 35;

  // Summary text
  pdf.setFontSize(10);
  pdf.setFont(undefined, 'normal');
  pdf.setTextColor(71, 85, 105);
  const summaryLines = pdf.splitTextToSize(results.summary, pageWidth - 2 * margin);
  pdf.text(summaryLines, margin, yPosition);
  yPosition += summaryLines.length * 5 + 15;

  // Pattern Details
  const patternTypes = [
    { 
      type: 'dark', 
      title: '🚨 Dark Patterns', 
      color: '#EF4444',
      bgColor: '#FEE2E2'
    },
    { 
      type: 'grey', 
      title: '⚠️ Grey Patterns', 
      color: '#6B7280',
      bgColor: '#F3F4F6'
    },
    { 
      type: 'white', 
      title: '✅ White Patterns', 
      color: '#10B981',
      bgColor: '#D1FAE5'
    }
  ];

  patternTypes.forEach(({ type, title, color, bgColor }) => {
    const patternsOfType = results.patterns_detected.filter(p => p.pattern_type === type);
    if (patternsOfType.length === 0) return;

    // Check if we need a new page
    if (yPosition > pageHeight - 60) {
      pdf.addPage();
      yPosition = 25;
    }

    // Section header
    addColoredSection(margin, yPosition - 5, pageWidth - 2 * margin, 10, bgColor);
    pdf.setFontSize(14);
    pdf.setFont(undefined, 'bold');
    pdf.setTextColor(color);
    pdf.text(`${title} (${patternsOfType.length})`, margin + 5, yPosition + 2);
    yPosition += 15;

    patternsOfType.forEach((pattern) => {
      // Check if we need a new page for this pattern
      if (yPosition > pageHeight - 50) {
        pdf.addPage();
        yPosition = 25;
      }

      // Pattern box
      addColoredSection(margin, yPosition, pageWidth - 2 * margin, 35, '#FAFAFA');
      
      // Pattern name and confidence
      pdf.setFontSize(12);
      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(30, 41, 59);
      pdf.text(pattern.name, margin + 5, yPosition + 8);
      
      pdf.setFontSize(9);
      pdf.setFont(undefined, 'normal');
      pdf.setTextColor(107, 114, 128);
      pdf.text(`${pattern.confidence}% confidence`, pageWidth - margin - 25, yPosition + 8);

      // Category
      pdf.setFontSize(8);
      pdf.setTextColor(59, 130, 246);
      pdf.text(`Category: ${pattern.category}`, margin + 5, yPosition + 14);

      // Description
      pdf.setFontSize(9);
      pdf.setFont(undefined, 'normal');
      pdf.setTextColor(71, 85, 105);
      const descLines = pdf.splitTextToSize(pattern.description, pageWidth - 2 * margin - 10);
      pdf.text(descLines, margin + 5, yPosition + 20);

      // Recommendation
      if (pattern.recommendation) {
        pdf.setFontSize(8);
        pdf.setFont(undefined, 'bold');
        pdf.setTextColor(37, 99, 235);
        pdf.text('💡 Recommendation:', margin + 5, yPosition + 28);
        
        pdf.setFont(undefined, 'normal');
        pdf.setTextColor(71, 85, 105);
        const recLines = pdf.splitTextToSize(pattern.recommendation, pageWidth - 2 * margin - 25);
        pdf.text(recLines, margin + 25, yPosition + 28);
      }

      yPosition += 40;
    });

    yPosition += 10;
  });

  // Footer
  const pageCount = pdf.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    
    addColoredSection(0, pageHeight - 15, pageWidth, 15, '#F8FAFC');
    
    pdf.setFontSize(8);
    pdf.setFont(undefined, 'normal');
    pdf.setTextColor(100, 116, 139);
    pdf.text(
      `Generated on ${new Date().toLocaleDateString()} | Dark Patterns Assessment`,
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
  const domain = new URL(results.url).hostname;
  const fileName = `dark-patterns-assessment-${domain}-${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(fileName);
};
