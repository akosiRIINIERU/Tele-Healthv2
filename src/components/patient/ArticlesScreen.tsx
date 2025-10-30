import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '../MobileLayout';
import { BottomNav } from '../BottomNav';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Search, Clock, BookOpen } from 'lucide-react';
import { mockArticles } from '../../lib/mockData';

export const ArticlesScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'illness' | 'herbal' | 'wellness'>('all');

  const filteredArticles = mockArticles.filter((article) => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'all' || 
      article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'illness', label: 'Illness Info' },
    { value: 'herbal', label: 'Herbal Remedies' },
    { value: 'wellness', label: 'Wellness' },
  ];

  return (
    <MobileLayout title="Health Articles">
      <div className="pb-20">
        {/* Search and Filter */}
        <div className="p-4 space-y-3 bg-white dark:bg-gray-800 sticky top-14 z-10 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <Badge
                key={cat.value}
                variant={selectedCategory === cat.value ? 'default' : 'outline'}
                className={`cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat.value 
                    ? 'bg-pink-500 hover:bg-pink-600' 
                    : ''
                }`}
                onClick={() => setSelectedCategory(cat.value as any)}
              >
                {cat.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Featured Article */}
        {filteredArticles.length > 0 && (
          <div className="p-4">
            <h3 className="text-gray-900 dark:text-white mb-3">Featured</h3>
            <Card
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/patient/article/${filteredArticles[0].id}`)}
            >
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1535914254981-b5012eebbd15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjB3ZWxsbmVzc3xlbnwxfHx8fDE3NjE3NDM0OTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt={filteredArticles[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <Badge className="mb-2 bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300">
                  {filteredArticles[0].category}
                </Badge>
                <h3 className="text-gray-900 dark:text-white mb-2">
                  {filteredArticles[0].title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  {filteredArticles[0].excerpt}
                </p>
                <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{filteredArticles[0].readTime}</span>
                  </div>
                  <span>•</span>
                  <span>{new Date(filteredArticles[0].date).toLocaleDateString()}</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Articles List */}
        <div className="p-4">
          <h3 className="text-gray-900 dark:text-white mb-3">Recent Articles</h3>
          <div className="space-y-3">
            {filteredArticles.slice(1).map((article) => (
              <Card
                key={article.id}
                className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/patient/article/${article.id}`)}
              >
                <div className="flex gap-3">
                  <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg flex-shrink-0 overflow-hidden">
                    <ImageWithFallback
                      src={
                        article.category === 'herbal'
                          ? 'https://images.unsplash.com/photo-1545840716-c82e9eec6930?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiYWwlMjBtZWRpY2luZXxlbnwxfHx8fDE3NjE3OTAwMzN8MA&ixlib=rb-4.1.0&q=80&w=1080'
                          : 'https://images.unsplash.com/photo-1535914254981-b5012eebbd15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjB3ZWxsbmVzc3xlbnwxfHx8fDE3NjE3NDM0OTh8MA&ixlib=rb-4.1.0&q=80&w=1080'
                      }
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <Badge className="mb-2 bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300 text-xs">
                      {article.category}
                    </Badge>
                    <h3 className="text-gray-900 dark:text-white mb-1 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400">No articles found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomNav />
    </MobileLayout>
  );
};
