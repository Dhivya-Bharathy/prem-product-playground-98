
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

export const downloadAsExcel = async (roadmapItems: RoadmapItem[], toast: any) => {
  if (roadmapItems.length === 0) {
    toast({
      title: "No Content",
      description: "Add items to your roadmap before downloading.",
      variant: "destructive"
    });
    return;
  }

  try {
    // Create CSV content (Excel compatible)
    const headers = ['Quarter', 'Title', 'Status', 'Priority', 'Description'];
    const csvContent = [
      headers.join(','),
      ...roadmapItems.map(item => [
        item.quarter,
        `"${item.title.replace(/"/g, '""')}"`,
        item.status,
        item.priority,
        `"${item.description.replace(/"/g, '""')}"`
      ].join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'product-roadmap.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Download Complete",
      description: "Roadmap Excel file has been saved."
    });
  } catch (error) {
    console.error('Error generating Excel file:', error);
    toast({
      title: "Download Failed",
      description: "Could not generate Excel file. Please try again.",
      variant: "destructive"
    });
  }
};
