import React from 'react';
import { useParams } from 'react-router-dom';
import { MobileLayout } from '../MobileLayout';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Clock, Share2, Bookmark } from 'lucide-react';
import { mockArticles } from '../../lib/mockData';
import { Button } from '../ui/button';
import { toast } from 'sonner@2.0.3';

export const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const article = mockArticles.find((a) => a.id === id);

  if (!article) {
    return (
      <MobileLayout title="Article Not Found" showBack>
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500 dark:text-gray-400">Article not found</p>
        </div>
      </MobileLayout>
    );
  }

  const handleShare = () => {
    toast.success('Share link copied to clipboard!');
  };

  const handleBookmark = () => {
    toast.success('Article bookmarked!');
  };

  return (
    <MobileLayout
      title="Article"
      showBack
      rightAction={
        <div className="flex gap-2">
          <button onClick={handleBookmark} className="p-1">
            <Bookmark className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          </button>
          <button onClick={handleShare} className="p-1">
            <Share2 className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          </button>
        </div>
      }
    >
      <div className="pb-6">
        {/* Featured Image */}
        <div className="aspect-video bg-gray-200 dark:bg-gray-700 overflow-hidden">
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

        <div className="p-6">
          {/* Meta */}
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300">
              {article.category}
            </Badge>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{article.readTime}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-gray-900 dark:text-white mb-4">{article.title}</h1>

          {/* Date */}
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {new Date(article.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          {/* Content */}
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4">{article.excerpt}</p>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4">{article.content}</p>

            {article.category === 'illness' && (
              <Card className="p-4 bg-pink-50 dark:bg-pink-900/20 my-6">
                <h3 className="text-gray-900 dark:text-white mb-2">Key Symptoms</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Persistent pain or discomfort</li>
                  <li>Unusual fatigue or weakness</li>
                  <li>Changes in appetite or weight</li>
                  <li>Difficulty breathing or chest pain</li>
                </ul>
              </Card>
            )}

            {article.category === 'herbal' && (
              <Card className="p-4 bg-green-50 dark:bg-green-900/20 my-6">
                <h3 className="text-gray-900 dark:text-white mb-2">How to Use</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Take 1-2 teaspoons daily</li>
                  <li>Can be mixed with warm water or tea</li>
                  <li>Best consumed on an empty stomach</li>
                  <li>Consult your doctor before starting any herbal remedy</li>
                </ul>
              </Card>
            )}

            <p className="text-gray-700 dark:text-gray-300 mb-4">
              For more detailed information and personalized advice, please consult with a 
              healthcare professional. Our experienced doctors are available to answer your 
              questions and provide guidance tailored to your specific needs.
            </p>

            <Card className="p-4 bg-purple-50 dark:bg-purple-900/20 my-6">
              <h3 className="text-gray-900 dark:text-white mb-2">⚠️ Disclaimer</h3>
              <p className="text-gray-700 dark:text-gray-300">
                This article is for informational purposes only and should not be considered 
                medical advice. Always consult with a qualified healthcare provider before 
                making any health decisions or changes to your treatment plan.
              </p>
            </Card>
          </div>

          {/* Related Articles */}
          <div className="mt-8">
            <h3 className="text-gray-900 dark:text-white mb-4">Related Articles</h3>
            <div className="space-y-3">
              {mockArticles
                .filter((a) => a.id !== article.id && a.category === article.category)
                .slice(0, 2)
                .map((relatedArticle) => (
                  <Card
                    key={relatedArticle.id}
                    className="p-3 cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    <h4 className="text-gray-900 dark:text-white mb-1">
                      {relatedArticle.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {relatedArticle.readTime}
                    </p>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};
