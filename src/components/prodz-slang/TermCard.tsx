
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2, Copy, Heart, Volume2 } from "lucide-react";
import { ProdZTerm } from "@/data/prodzSlang";
import { useToast } from "@/hooks/use-toast";

interface TermCardProps {
  term: ProdZTerm;
}

export const TermCard = ({ term }: TermCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const { toast } = useToast();

  const categoryColors = {
    deceptive: 'bg-red-100 text-red-800 border-red-200',
    design: 'bg-blue-100 text-blue-800 border-blue-200',
    behavioral: 'bg-purple-100 text-purple-800 border-purple-200'
  };

  const handleShare = async () => {
    const shareText = `🎯 Just learned about "${term.name}" - ${term.definition.slice(0, 100)}... Check it out!`;
    const shareUrl = `${window.location.origin}/prodz-slang#${term.id}`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: `ProdZ Slang: ${term.name}`,
          text: shareText,
          url: shareUrl
        });
      } else {
        await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
        toast({
          title: "Copied to clipboard! 📋",
          description: "Share this term with your team!"
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleCopy = async () => {
    const copyText = `${term.name}: ${term.definition}`;
    try {
      await navigator.clipboard.writeText(copyText);
      toast({
        title: "Definition copied! ✅",
        description: "Ready to drop some knowledge!"
      });
    } catch (error) {
      console.error('Error copying:', error);
    }
  };

  const handlePronunciation = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(term.name);
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    } else {
      toast({
        title: "Pronunciation: " + term.pronunciation,
        description: "Audio not supported on this device"
      });
    }
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites! ⭐",
      description: isFavorited ? "Term unfavorited" : "Building your ProdZ vocabulary!"
    });
  };

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 group border-0 bg-gradient-to-br from-white to-gray-50/50 hover:scale-[1.02]">
      <CardContent className="p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                {term.name}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePronunciation}
                className="h-6 w-6 p-0 opacity-60 hover:opacity-100 transition-opacity"
              >
                <Volume2 className="h-3 w-3" />
              </Button>
            </div>
            <p className="text-sm text-gray-500 italic mb-3 font-mono">
              /{term.pronunciation}/
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFavorite}
            className="h-8 w-8 p-0 hover:bg-red-50 transition-colors"
          >
            <Heart className={`h-4 w-4 transition-colors ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
          </Button>
        </div>

        {/* Category Badge */}
        <div className="mb-4">
          <Badge className={`${categoryColors[term.category]} font-medium`}>
            {term.category === 'deceptive' ? '🚨 Dark Pattern' : 
             term.category === 'design' ? '🎨 Design Concept' : '🧠 Psychology'}
          </Badge>
        </div>

        {/* Definition */}
        <p className="text-gray-700 leading-relaxed mb-4 flex-1">
          {term.definition}
        </p>

        {/* Examples */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Examples:</h4>
          <ul className="space-y-1">
            {term.examples.slice(0, 2).map((example, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start">
                <span className="text-indigo-500 mr-2 flex-shrink-0">•</span>
                <span>{example}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* How to spot / When to use */}
        {(term.howToSpot || term.whenToUse) && (
          <div className="mb-4 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
            <h4 className="font-semibold text-indigo-900 mb-1 text-sm flex items-center gap-1">
              {term.howToSpot ? '🔍 How to spot it:' : '💡 When to use it:'}
            </h4>
            <p className="text-sm text-indigo-800">
              {term.howToSpot || term.whenToUse}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-gray-100">
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="flex-1 text-xs hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
          >
            <Share2 className="h-3 w-3 mr-1" />
            Share
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="flex-1 text-xs hover:bg-green-50 hover:border-green-300 transition-colors"
          >
            <Copy className="h-3 w-3 mr-1" />
            Copy
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
