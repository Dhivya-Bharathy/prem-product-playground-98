
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Shuffle, Filter, Sparkles } from "lucide-react";
import { TermCard } from "@/components/prodz-slang/TermCard";
import { useProdZSlang } from "@/hooks/useProdZSlang";
import { categories } from "@/data/prodzSlang";
import { SEOHead } from "@/components/SEOHead";

const ProdZSlang = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedDifficulty,
    setSelectedDifficulty,
    filteredTerms,
    getRandomTerm
  } = useProdZSlang();

  const [termOfTheDay] = useState(() => getRandomTerm());

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "ProdZ Slang - Gen Z Product Dictionary",
    "description": "Master the latest Gen Z product management and UX design terminology",
    "url": "https://www.prempradeep.com/prodz-slang",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": filteredTerms.length,
      "itemListElement": filteredTerms.slice(0, 10).map((term, index) => ({
        "@type": "DefinedTerm",
        "position": index + 1,
        "name": term.name,
        "description": term.definition
      }))
    }
  };

  return (
    <>
      <SEOHead
        title="ProdZ Slang - Gen Z Product Dictionary"
        description="Master the latest Gen Z product management and UX design terminology. From dark patterns to bright patterns, level up your product vocabulary."
        keywords="product management slang, UX design terms, dark patterns, product terminology, Gen Z product dictionary, enshittification, confirmshaming"
        canonical="https://www.prempradeep.com/prodz-slang"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">ProdZ Slang</h1>
                  <p className="text-sm text-gray-600">The Ultimate Gen Z Product Dictionary</p>
                </div>
              </div>
              <Badge variant="outline" className="hidden sm:flex">
                {filteredTerms.length} terms
              </Badge>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              No more <span className="text-indigo-600">cap</span> 🧢
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Stay ahead with the freshest product management and UX design terminology. 
              From toxic dark patterns to wholesome bright patterns, we've got the vocab that matters.
            </p>
          </div>

          {/* Term of the Day */}
          <Card className="mb-8 border-0 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Term of the Day</h3>
              </div>
              <h4 className="text-2xl font-bold mb-2">{termOfTheDay.name}</h4>
              <p className="text-indigo-100 mb-4">{termOfTheDay.definition}</p>
              <Badge className="bg-white/20 text-white border-white/30">
                {termOfTheDay.category === 'deceptive' ? 'Dark Pattern' : 
                 termOfTheDay.category === 'design' ? 'Design Concept' : 'Behavioral Principle'}
              </Badge>
            </CardContent>
          </Card>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search terms, definitions, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-base rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="rounded-full"
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>

            {/* Difficulty Filter */}
            <div className="flex justify-center gap-2">
              <Button
                variant={selectedDifficulty === 'all' ? "default" : "outline"}
                onClick={() => setSelectedDifficulty('all')}
                size="sm"
                className="rounded-full"
              >
                All Levels
              </Button>
              {['beginner', 'intermediate', 'advanced'].map(difficulty => (
                <Button
                  key={difficulty}
                  variant={selectedDifficulty === difficulty ? "default" : "outline"}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  size="sm"
                  className="rounded-full capitalize"
                >
                  {difficulty}
                </Button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              {filteredTerms.length} term{filteredTerms.length !== 1 ? 's' : ''} found
            </p>
            <Button
              variant="outline"
              onClick={() => {
                const randomTerm = getRandomTerm();
                const element = document.getElementById(randomTerm.id);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="rounded-full"
            >
              <Shuffle className="h-4 w-4 mr-2" />
              Random Term
            </Button>
          </div>

          {/* Terms Grid */}
          {filteredTerms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredTerms.map(term => (
                <div key={term.id} id={term.id}>
                  <TermCard term={term} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No terms found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
              <Button onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedDifficulty('all');
              }}>
                Clear all filters
              </Button>
            </div>
          )}

          {/* Call to Action */}
          <Card className="border-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Level Up Your Product Vocabulary! 🚀</h3>
              <p className="text-purple-100 text-lg mb-6 max-w-2xl mx-auto">
                Share these terms with your team, drop them in meetings, and watch everyone think you're the coolest PM in the room.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="outline" 
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Back to Top
                </Button>
                <Button 
                  className="bg-white text-purple-600 hover:bg-purple-50"
                  onClick={() => {
                    const shareText = `🎯 Just discovered ProdZ Slang - the ultimate Gen Z product dictionary! ${filteredTerms.length} terms to level up your product vocabulary.`;
                    if (navigator.share) {
                      navigator.share({
                        title: 'ProdZ Slang - Gen Z Product Dictionary',
                        text: shareText,
                        url: window.location.href
                      });
                    }
                  }}
                >
                  Share This Dictionary
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ProdZSlang;
