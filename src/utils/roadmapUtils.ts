
import html2canvas from "html2canvas";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { saveAs } from "file-saver";
import { RoadmapItem } from "@/types/roadmap";
import { QUARTERS } from "@/types/roadmap";

export const getStatusColor = (status: string) => {
  switch (status) {
    case "Planning": return "bg-gray-100 text-gray-800";
    case "In Progress": return "bg-blue-100 text-blue-800";
    case "Testing": return "bg-yellow-100 text-yellow-800";
    case "Completed": return "bg-green-100 text-green-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High": return "bg-red-100 text-red-800";
    case "Medium": return "bg-orange-100 text-orange-800";
    case "Low": return "bg-blue-100 text-blue-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export const downloadAsImage = async (roadmapRef: React.RefObject<HTMLDivElement>, roadmapItems: RoadmapItem[], toast: any) => {
  if (!roadmapRef.current || roadmapItems.length === 0) {
    toast({
      title: "No Content",
      description: "Add items to your roadmap before downloading.",
      variant: "destructive"
    });
    return;
  }

  try {
    const canvas = await html2canvas(roadmapRef.current, {
      backgroundColor: '#ffffff',
      scale: 3, // Increased from 2 to 3 for higher resolution
      logging: false,
      useCORS: true,
      allowTaint: true,
      foreignObjectRendering: true,
      width: roadmapRef.current.scrollWidth,
      height: roadmapRef.current.scrollHeight,
      windowWidth: roadmapRef.current.scrollWidth,
      windowHeight: roadmapRef.current.scrollHeight
    });
    
    canvas.toBlob((blob) => {
      if (blob) {
        saveAs(blob, 'product-roadmap.png');
        toast({
          title: "Download Complete",
          description: "High-quality roadmap image has been saved."
        });
      }
    }, 'image/png', 1.0); // Maximum quality PNG
  } catch (error) {
    console.error('Error generating image:', error);
    toast({
      title: "Download Failed",
      description: "Could not generate image. Please try again.",
      variant: "destructive"
    });
  }
};

export const downloadAsWord = async (roadmapItems: RoadmapItem[], toast: any) => {
  if (roadmapItems.length === 0) {
    toast({
      title: "No Content",
      description: "Add items to your roadmap before downloading.",
      variant: "destructive"
    });
    return;
  }

  try {
    const groupedItems = QUARTERS.reduce((acc, quarter) => {
      acc[quarter] = roadmapItems.filter(item => item.quarter === quarter);
      return acc;
    }, {} as Record<string, RoadmapItem[]>);

    const docChildren = [
      new Paragraph({
        text: "Product Roadmap",
        heading: HeadingLevel.TITLE,
      }),
      new Paragraph({
        text: `Generated on ${new Date().toLocaleDateString()}`,
        spacing: { after: 400 }
      }),
    ];

    QUARTERS.forEach(quarter => {
      const quarterItems = groupedItems[quarter] || [];
      
      docChildren.push(
        new Paragraph({
          text: quarter,
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 }
        })
      );

      if (quarterItems.length > 0) {
        quarterItems.forEach(item => {
          docChildren.push(
            new Paragraph({
              children: [
                new TextRun({ text: item.title, bold: true }),
                new TextRun({ text: ` (${item.priority} Priority, ${item.status})` })
              ],
              spacing: { after: 100 }
            })
          );
          
          if (item.description) {
            docChildren.push(
              new Paragraph({
                text: item.description,
                spacing: { after: 200 }
              })
            );
          }
        });
      } else {
        docChildren.push(
          new Paragraph({
            text: "No items planned for this quarter",
            spacing: { after: 200 }
          })
        );
      }
    });

    const doc = new Document({
      sections: [{
        children: docChildren
      }]
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, 'product-roadmap.docx');
    
    toast({
      title: "Download Complete",
      description: "Roadmap document has been saved."
    });
  } catch (error) {
    console.error('Error generating Word document:', error);
    toast({
      title: "Download Failed",
      description: "Could not generate document. Please try again.",
      variant: "destructive"
    });
  }
};
