
import { useState, useMemo } from 'react';
import { ProdZTerm, prodzSlangTerms } from '@/data/prodzSlang';

export const useProdZSlang = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTerms = useMemo(() => {
    return prodzSlangTerms.filter(term => {
      const matchesSearch = term.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           term.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           term.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const getRandomTerm = (): ProdZTerm => {
    const randomIndex = Math.floor(Math.random() * prodzSlangTerms.length);
    return prodzSlangTerms[randomIndex];
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredTerms,
    allTerms: prodzSlangTerms,
    getRandomTerm
  };
};
