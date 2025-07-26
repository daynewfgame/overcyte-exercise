'use client';

import { useMemo, useState, useEffect, useTransition } from "react";
import PerformanceDemoListItem from "./performance-demo-list-item";
import Pagination from "../pagination";

export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  inStock: boolean;
  rating: number;
}

const PerformanceDemo = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name');
  const [showInStockOnly, setShowInStockOnly] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [_isSearchPending, startSearchTransition] = useTransition();

  const itemsPerPage = 20;

  useEffect(() => {
    const generateItems = (count: number): Item[] => {
      setIsLoading(false);
      return Array.from({ length: count }, (_, i) => ({
        id: i,
        name: `Item ${i}`,
        description: `This is a description for item ${i}. It contains some text that makes each item unique.`,
        price: Math.floor(Math.random() * 1000) + 10,
        category: `Category ${i % 10}`,
        tags: [`tag${i % 5}`, `tag${(i + 1) % 5}`, `tag${(i + 2) % 5}`],
        inStock: Math.random() > 0.3,
        rating: Math.floor(Math.random() * 5) + 1,
      }));
    };
    
    setItems(generateItems(5000));
  }, []);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    startSearchTransition(() => {
      setSearch(e.target.value);
    });
  }

  const filteredItems = useMemo(() => (
    items.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesStock = !showInStockOnly || item.inStock;

      return matchesSearch && matchesCategory && matchesStock;
    })
  ), [search, selectedCategory, showInStockOnly, items]);

  const sortedItems = useMemo(() => {
    let filtered = filteredItems;

    if(sortBy === 'name') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    } else if(sortBy === 'price') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if(sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [filteredItems, sortBy, items]);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedItems.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedItems, currentPage]);

  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

  const categories = useMemo(() => {
    return ['all', ...new Set(items.map((item) => item.category))];
  }, [items]);

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, showInStockOnly, sortBy]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              value={search}
              onChange={onSearchChange}
              placeholder="Search items..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort by
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'rating')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={showInStockOnly}
                onChange={(e) => setShowInStockOnly(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">In stock only</span>
            </label>
          </div>
        </div>
        
        <div className="text-sm text-gray-600">
          Showing {paginatedItems.length} of {sortedItems.length} items (Page {currentPage} of {totalPages})
        </div>
      </div>

      { isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          { Array.from({ length: 20 }).map((_, index) => (
            <div key={index} className="bg-gray-50 rounded-lg h-[290px] animate-pulse" />
          )) }
        </div>
      ) : (
        <div className="space-y-4">
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            setPage={handlePageChange}
          />
          
          { Boolean(paginatedItems.length) ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              { paginatedItems.map(item => (
                <PerformanceDemoListItem key={item.id} item={item} search={search} />
              )) }
            </div>
          ) : (
            <div className="text-center text-gray-500">
              No items found
            </div>
          ) }

          <Pagination
            page={currentPage}
            totalPages={totalPages}
            setPage={handlePageChange}
          />
        </div>
      ) }

    </div>
  );
};

export default PerformanceDemo;