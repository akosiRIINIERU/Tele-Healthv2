import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Article, User } from '../App';
import { 
  ArrowLeft,
  Search,
  BookOpen,
  Calendar,
  Leaf
} from 'lucide-react';

interface ArticlesScreenProps {
  articles: Article[];
  selectedArticle?: Article | null;
  currentUser: User | null;
  onNavigate: (screen: string, data?: any) => void;
}

export function ArticlesScreen({ articles, selectedArticle, currentUser, onNavigate }: ArticlesScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...new Set(articles.map(a => a.category))];
  
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.herbs?.some(herb => herb.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         article.symptoms?.some(symptom => symptom.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (selectedArticle) {
    return (
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => onNavigate('articles')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1>Article Details</h1>
        </div>

        {/* Article Content */}
        <div className="space-y-4">
          <img 
            src={selectedArticle.image} 
            alt={selectedArticle.title}
            className="w-full h-48 object-cover rounded-lg"
          />
          
          <div>
            <Badge variant="secondary" className="mb-2">
              {selectedArticle.category}
            </Badge>
            <h2>{selectedArticle.title}</h2>
            <p className="text-muted-foreground mt-2">{selectedArticle.content}</p>
          </div>

          {selectedArticle.symptoms && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Common Symptoms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {selectedArticle.symptoms.map((symptom) => (
                    <Badge key={symptom} variant="outline">
                      {symptom}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {selectedArticle.herbs && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                  Recommended Herbs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {selectedArticle.herbs.map((herb) => (
                    <div key={herb} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                      <Leaf className="h-4 w-4 text-green-600" />
                      <span>{herb}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {currentUser?.type === 'patient' && (
            <Card className="bg-pink-50 border-pink-200">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-pink-800 mb-3">
                  Need professional consultation about this condition?
                </p>
                <Button onClick={() => onNavigate('doctors')}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => onNavigate(currentUser?.type === 'patient' ? 'patient-dashboard' : 'doctor-dashboard')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1>Health Articles</h1>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search articles, herbs, or symptoms..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="whitespace-nowrap"
          >
            {category === 'all' ? 'All Categories' : category}
          </Button>
        ))}
      </div>

      {/* Articles List */}
      <div className="space-y-4">
        {filteredArticles.map((article) => (
          <Card 
            key={article.id} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onNavigate('article-detail', { article })}
          >
            <CardContent className="p-4">
              <div className="flex gap-3">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <Badge variant="secondary" className="mb-2 text-xs">
                    {article.category}
                  </Badge>
                  <h3 className="font-medium mb-1">{article.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {article.content}
                  </p>
                  
                  {article.herbs && (
                    <div className="flex items-center gap-1 mt-2">
                      <Leaf className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-green-600">
                        {article.herbs.length} herbs recommended
                      </span>
                    </div>
                  )}
                </div>
                
                <BookOpen className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No articles found matching your search.</p>
        </div>
      )}
    </div>
  );
}