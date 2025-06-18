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
          description: "Share this word with your team!"
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
      description: isFavorited ? "Word unfavorited" : "Building your ProdZ vocabulary!"
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
          {/* Social Share Buttons */}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`prempradeep: I'm sharing this with you!\nCheck out this product term: ${term.name}\n${window.location.origin}/prodz-slang#${term.id}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on WhatsApp"
            className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white p-2 hover:bg-green-50 hover:border-green-300 transition-colors"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" className="text-green-500"><path d="M20.52 3.48A12.07 12.07 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.63A12.07 12.07 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zM12 22c-1.85 0-3.67-.5-5.24-1.44l-.37-.22-3.69.97.99-3.59-.24-.37A9.93 9.93 0 0 1 2 12C2 6.48 6.48 2 12 2c2.54 0 4.93.99 6.74 2.76A9.93 9.93 0 0 1 22 12c0 5.52-4.48 10-10 10zm5.2-7.8c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.36-.01-.56-.01-.19 0-.5.07-.76.34-.26.27-1 1-.99 2.43.01 1.43 1.03 2.81 1.18 3.01.15.2 2.03 3.1 4.93 4.23.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.12.56-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/></svg>
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`prempradeep: I'm sharing this with you!\nCheck out this product term: ${term.name}\n${window.location.origin}/prodz-slang#${term.id}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Twitter"
            className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white p-2 hover:bg-blue-50 hover:border-blue-300 transition-colors"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" className="text-blue-500"><path d="M24 4.56c-.89.39-1.84.65-2.84.77a4.93 4.93 0 0 0 2.16-2.72c-.95.56-2.01.97-3.13 1.19A4.92 4.92 0 0 0 16.67 3c-2.73 0-4.94 2.21-4.94 4.94 0 .39.04.77.12 1.13C7.69 8.87 4.07 6.92 1.64 3.9c-.43.74-.67 1.6-.67 2.52 0 1.74.89 3.28 2.25 4.18-.83-.03-1.61-.25-2.29-.63v.06c0 2.43 1.73 4.46 4.03 4.92-.42.12-.87.18-1.33.18-.32 0-.63-.03-.93-.09.63 1.97 2.45 3.41 4.6 3.45A9.87 9.87 0 0 1 0 21.54a13.94 13.94 0 0 0 7.56 2.22c9.05 0 14-7.5 14-14 0-.21 0-.42-.02-.63A9.93 9.93 0 0 0 24 4.56z"/></svg>
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${window.location.origin}/prodz-slang#${term.id}`)}&summary=${encodeURIComponent(`prempradeep: I'm sharing this with you! Check out this product term: ${term.name}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on LinkedIn"
            className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white p-2 hover:bg-blue-50 hover:border-blue-300 transition-colors"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" className="text-blue-700"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z"/></svg>
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${window.location.origin}/prodz-slang#${term.id}`)}&quote=${encodeURIComponent(`prempradeep: I'm sharing this with you! Check out this product term: ${term.name}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Facebook"
            className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white p-2 hover:bg-blue-50 hover:border-blue-300 transition-colors"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" className="text-blue-600"><path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.326v21.348c0 .733.592 1.326 1.325 1.326h11.495v-9.294h-3.128v-3.622h3.128v-2.672c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12v9.294h6.116c.733 0 1.325-.593 1.325-1.326v-21.349c0-.734-.592-1.326-1.325-1.326z"/></svg>
          </a>
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
