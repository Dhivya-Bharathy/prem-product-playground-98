
import jsPDF from 'jspdf';
import { AssessmentResults } from "@/types/competency";

export const generateCompetencyPDF = (results: AssessmentResults) => {
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
};
