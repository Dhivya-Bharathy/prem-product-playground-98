
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2, ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useProdZSlang } from "@/hooks/useProdZSlang";

export const ProductWordOfTheDay = () => {
  const { getRandomTerm } = useProdZSlang();
  const [wordOfTheDay] = useState(() => getRandomTerm());
  const { toast } = useToast();

  const categoryColors = {
    deceptive: 'bg-red-100 text-red-800 border-red-200',
    design: 'bg-blue-100 text-blue-800 border-blue-200',
    behavioral: 'bg-purple-100 text-purple-800 border-purple-200'
  };

  const categoryEmojis = {
    deceptive: '🚨',
    design: '🎨',
    behavioral: '🧠'
  };

  const handleShare = async () => {
    const shareText = `🎯 Product Word of the Day: "${wordOfTheDay.name}" - ${wordOfTheDay.definition.slice(0, 100)}... Level up your product vocabulary!`;
    const shareUrl = `${window.location.origin}/prodz-slang#${wordOfTheDay.id}`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Product Word of the Day: ${wordOfTheDay.name}`,
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

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-indigo-50 via-white to-purple-50" id="word-of-the-day">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Product Word of the Day
            </h2>
          </div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Expand your product vocabulary with fresh terminology from the ProdZ Slang dictionary
          </p>
        </div>

        {/* Word Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 bg-gradient-to-br from-white to-gray-50/50 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden relative group">
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-50"></div>
            
            <CardContent className="p-6 sm:p-8 lg:p-10 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {wordOfTheDay.name}
                        </h3>
                        <TrendingUp className="h-6 w-6 text-yellow-500 animate-pulse" />
                      </div>
                      <p className="text-sm sm:text-base text-gray-500 italic font-mono mb-4">
                        /{wordOfTheDay.pronunciation}/
                      </p>
                    </div>
                    
                    <Badge className={`${categoryColors[wordOfTheDay.category]} font-medium text-xs sm:text-sm whitespace-nowrap`}>
                      {categoryEmojis[wordOfTheDay.category]} {
                        wordOfTheDay.category === 'deceptive' ? 'Dark Pattern' : 
                        wordOfTheDay.category === 'design' ? 'Design Concept' : 'Psychology'
                      }
                    </Badge>
                  </div>

                  {/* Definition */}
                  <div className="space-y-4">
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      {wordOfTheDay.definition}
                    </p>

                    {/* Quick Example */}
                    <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
                      <h4 className="font-semibold text-indigo-900 mb-2 text-sm flex items-center gap-1">
                        💡 Quick Example:
                      </h4>
                      <p className="text-sm text-indigo-800 italic">
                        "{wordOfTheDay.examples[0]}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Sidebar */}
                <div className="lg:col-span-1 space-y-4">
                  <div className="flex flex-col gap-3">
                    <Link to="/prodz-slang" className="w-full">
                      <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-300 group">
                        Explore Dictionary
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                    
                    <Button
                      variant="outline"
                      onClick={handleShare}
                      className="w-full border-indigo-200 text-indigo-600 hover:bg-indigo-50 py-3 rounded-lg transition-all duration-300"
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Share Word
                    </Button>
                  </div>

                  {/* Fun Stats */}
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm">Why This Matters:</h4>
                    <div className="space-y-2 text-xs text-gray-600">
                      {wordOfTheDay.category === 'deceptive' && (
                        <p>🛡️ Protect users from manipulative design patterns</p>
                      )}
                      {wordOfTheDay.category === 'design' && (
                        <p>⚡ Improve user experience and design decisions</p>
                      )}
                      {wordOfTheDay.category === 'behavioral' && (
                        <p>🎯 Understand user psychology and behavior</p>
                      )}
                      <p>🚀 Level up your product vocabulary</p>
                      <p>💬 Impress your team in meetings</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8 sm:mt-12">
          <p className="text-sm text-gray-500 mb-4">
            Discover more words in our complete dictionary
          </p>
          <Link to="/prodz-slang">
            <Button variant="ghost" className="text-indigo-600 hover:text-indigo-700 font-medium">
              View All Words →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
