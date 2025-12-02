import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveLayout } from '../ResponsiveLayout';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Search, ShoppingCart, AlertTriangle, Star, Plus } from 'lucide-react';
import { mockMedicines } from '../../lib/mockData';
import { useCart } from '../../contexts/CartContext';
import { toast } from 'sonner';

export const MedicineShop: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart, getCartItemCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'prescription' | 'otc' | 'supplement' | 'firstaid' | 'herbal'>('all');

  const filteredMedicines = mockMedicines.filter((medicine) => {
    const matchesSearch = 
      medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'all' || 
      medicine.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'prescription', label: 'Prescription' },
    { value: 'otc', label: 'Over-the-Counter' },
    { value: 'supplement', label: 'Supplements' },
    { value: 'firstaid', label: 'First Aid' },
    { value: 'herbal', label: 'Herbal' },
  ];

  const handleAddToCart = (medicine: any) => {
    if (medicine.requiresPrescription) {
      toast.error('This medicine requires a prescription. Please upload your prescription at checkout.');
    } else {
      toast.success('Added to cart!');
    }
    addToCart(medicine, 1);
  };

  return (
    <ResponsiveLayout
      title="Medicine Shop"
      rightAction={
        <button
          onClick={() => navigate('/patient/cart')}
          className="relative p-2"
          aria-label="Shopping cart"
        >
          <ShoppingCart className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          {getCartItemCount() > 0 && (
            <span className="absolute -top-1 -right-1 bg-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
              {getCartItemCount()}
            </span>
          )}
        </button>
      }
    >
      <div>
        {/* Search and Filter */}
        <div className="p-4 md:p-6 lg:p-8 space-y-3 bg-white dark:bg-gray-800 sticky top-14 md:top-16 z-10 border-b border-gray-200 dark:border-gray-700">
          {/* Disclaimer */}
          <Card className="p-4 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-amber-900 dark:text-amber-100 mb-1">Medical Disclaimer</h4>
                <p className="text-amber-800 dark:text-amber-200">
                  This is a demo app. Always consult a healthcare professional before purchasing or taking any medications. 
                  Prescription medications require a valid prescription from a licensed doctor.
                </p>
              </div>
            </div>
          </Card>

          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search medicines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              aria-label="Search medicines"
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

        <div className="p-4 md:p-6 lg:p-8">
          {/* Featured Products */}
          {filteredMedicines.length > 0 && (
            <div className="mb-8">
              <h3 className="text-gray-900 dark:text-white mb-4">Featured Products</h3>
              <Card
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow max-w-3xl"
                onClick={() => navigate(`/patient/medicine/${filteredMedicines[0].id}`)}
              >
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <ImageWithFallback
                    src={filteredMedicines[0].image}
                    alt={filteredMedicines[0].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <Badge className="mb-2 bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300">
                        {filteredMedicines[0].category}
                      </Badge>
                      {filteredMedicines[0].requiresPrescription && (
                        <Badge variant="outline" className="ml-2 border-orange-500 text-orange-600">
                          Prescription Required
                        </Badge>
                      )}
                      <h3 className="text-gray-900 dark:text-white mb-1">
                        {filteredMedicines[0].name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        {filteredMedicines[0].description}
                      </p>
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-gray-700 dark:text-gray-300">{filteredMedicines[0].rating}</span>
                        <span className="text-gray-500 dark:text-gray-400">({filteredMedicines[0].reviews} reviews)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-pink-600 dark:text-pink-400">${filteredMedicines[0].price}</p>
                        <span className="text-gray-500 dark:text-gray-400">In stock: {filteredMedicines[0].stock}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      handleAddToCart(filteredMedicines[0]);
                    }}
                    className="w-full bg-pink-500 hover:bg-pink-600"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* Products Grid */}
          <div>
            <h3 className="text-gray-900 dark:text-white mb-4">All Products</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredMedicines.slice(1).map((medicine) => (
                <Card
                  key={medicine.id}
                  className="p-4 cursor-pointer hover:shadow-lg transition-shadow flex flex-col"
                  onClick={() => navigate(`/patient/medicine/${medicine.id}`)}
                >
                  <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 overflow-hidden">
                    <ImageWithFallback
                      src={medicine.image}
                      alt={medicine.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="mb-2">
                      <Badge className="bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300 text-xs">
                        {medicine.category}
                      </Badge>
                      {medicine.requiresPrescription && (
                        <Badge variant="outline" className="ml-1 text-xs border-orange-500 text-orange-600">
                          Rx
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-gray-900 dark:text-white mb-1">{medicine.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-2 flex-1">
                      {medicine.description}
                    </p>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-gray-700 dark:text-gray-300">{medicine.rating}</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-pink-600 dark:text-pink-400">${medicine.price}</p>
                      <span className="text-gray-500 dark:text-gray-400">Stock: {medicine.stock}</span>
                    </div>
                    <Button
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                        handleAddToCart(medicine);
                      }}
                      size="sm"
                      className="w-full bg-pink-500 hover:bg-pink-600"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {filteredMedicines.length === 0 && (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400">No products found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ResponsiveLayout>
  );
};
