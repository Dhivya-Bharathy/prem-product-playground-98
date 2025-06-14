import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, GitBranch, Calendar, Target, Download, FileImage, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, HeadingLevel } from "docx";
import { saveAs } from "file-saver";

interface RoadmapItem {
  id: string;
  title: string;
  quarter: string;
  status: string;
  priority: string;
  description: string;
}

const ProductRoadmap = () => {
  const { toast } = useToast();
  const roadmapRef = useRef<HTMLDivElement>(null);
  const [roadmapItems, setRoadmapItems] = useState<RoadmapItem[]>([]);
  const [newItem, setNewItem] = useState({
    title: "",
    quarter: "",
    status: "",
    priority: "",
    description: ""
  });

  const quarters = ["Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024", "Q1 2025"];
  const statuses = ["Planning", "In Progress", "Testing", "Completed"];
  const priorities = ["High", "Medium", "Low"];

  const addRoadmapItem = () => {
    if (!newItem.title || !newItem.quarter || !newItem.status || !newItem.priority) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const item: RoadmapItem = {
      id: Date.now().toString(),
      ...newItem
    };

    setRoadmapItems(prev => [...prev, item]);
    setNewItem({ title: "", quarter: "", status: "", priority: "", description: "" });

    toast({
      title: "Item Added",
      description: `${item.title} has been added to the roadmap.`
    });
  };

  const downloadAsImage = async () => {
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
        scale: 2,
        logging: false,
        useCORS: true
      });
      
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, 'product-roadmap.png');
          toast({
            title: "Download Complete",
            description: "Roadmap image has been saved."
          });
        }
      });
    } catch (error) {
      console.error('Error generating image:', error);
      toast({
        title: "Download Failed",
        description: "Could not generate image. Please try again.",
        variant: "destructive"
      });
    }
  };

  const downloadAsWord = async () => {
    if (roadmapItems.length === 0) {
      toast({
        title: "No Content",
        description: "Add items to your roadmap before downloading.",
        variant: "destructive"
      });
      return;
    }

    try {
      const groupedItems = quarters.reduce((acc, quarter) => {
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

      quarters.forEach(quarter => {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Planning": return "bg-gray-100 text-gray-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Testing": return "bg-yellow-100 text-yellow-800";
      case "Completed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-orange-100 text-orange-800";
      case "Low": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const groupedItems = quarters.reduce((acc, quarter) => {
    acc[quarter] = roadmapItems.filter(item => item.quarter === quarter);
    return acc;
  }, {} as Record<string, RoadmapItem[]>);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Product Roadmap Planner</h1>
                <p className="text-gray-600">Plan and visualize your product roadmap with priorities</p>
              </div>
            </div>
            
            {roadmapItems.length > 0 && (
              <div className="flex gap-2">
                <Button onClick={downloadAsImage} variant="outline" size="sm">
                  <FileImage className="w-4 h-4 mr-2" />
                  Download Image
                </Button>
                <Button onClick={downloadAsWord} variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Download Word
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Add Item Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add Roadmap Item
              </CardTitle>
              <CardDescription>
                Add new features or initiatives to your roadmap
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Mobile app redesign"
                  value={newItem.title}
                  onChange={(e) => setNewItem(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="quarter">Quarter *</Label>
                <Select onValueChange={(value) => setNewItem(prev => ({ ...prev, quarter: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select quarter" />
                  </SelectTrigger>
                  <SelectContent>
                    {quarters.map(quarter => (
                      <SelectItem key={quarter} value={quarter}>{quarter}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status">Status *</Label>
                <Select onValueChange={(value) => setNewItem(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="priority">Priority *</Label>
                <Select onValueChange={(value) => setNewItem(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map(priority => (
                      <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Brief description..."
                  value={newItem.description}
                  onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <Button onClick={addRoadmapItem} className="w-full">
                <GitBranch className="w-4 h-4 mr-2" />
                Add to Roadmap
              </Button>
            </CardContent>
          </Card>

          {/* Roadmap Timeline */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Roadmap Timeline
                </CardTitle>
                <CardDescription>
                  Visual representation of your product roadmap
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div ref={roadmapRef}>
                  {roadmapItems.length === 0 ? (
                    <div className="text-center text-gray-500 py-12">
                      <GitBranch className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>Add items to see your roadmap here</p>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {quarters.map(quarter => (
                        <div key={quarter} className="border-l-4 border-blue-200 pl-6">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-4 h-4 bg-blue-500 rounded-full -ml-8"></div>
                            <h3 className="text-lg font-semibold text-gray-900">{quarter}</h3>
                            <Badge variant="outline">
                              {groupedItems[quarter]?.length || 0} items
                            </Badge>
                          </div>
                          
                          {groupedItems[quarter]?.length > 0 ? (
                            <div className="grid md:grid-cols-2 gap-4">
                              {groupedItems[quarter].map(item => (
                                <div key={item.id} className="p-4 bg-white border rounded-lg shadow-sm">
                                  <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                                    <Target className="w-4 h-4 text-gray-400" />
                                  </div>
                                  
                                  {item.description && (
                                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                                  )}
                                  
                                  <div className="flex gap-2">
                                    <Badge className={getStatusColor(item.status)}>
                                      {item.status}
                                    </Badge>
                                    <Badge className={getPriorityColor(item.priority)}>
                                      {item.priority}
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500 text-sm">No items planned for this quarter</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Roadmap Tips */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Roadmap Best Practices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Think Themes, Not Features</h4>
                <p className="text-sm text-gray-600">Focus on outcomes and customer problems rather than specific features.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Keep It Flexible</h4>
                <p className="text-sm text-gray-600">Roadmaps should be living documents that evolve with new information.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Communicate Context</h4>
                <p className="text-sm text-gray-600">Always explain the why behind your roadmap decisions.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductRoadmap;
