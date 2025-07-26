import React, { useMemo, useState } from "react";
import { Item } from ".";

interface PerformanceDemoListItemProps {
  item: Item;
  search: string; // For highlighting
}

const PerformanceDemoListItem: React.FC<PerformanceDemoListItemProps> = ({ item, search }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const highlightedName = useMemo(() => {
    return item.name.split(new RegExp(`(${search})`, 'gi')).map((part, i) => (
      <span key={i} className={part.toLowerCase() === search.toLowerCase() ? 'bg-yellow-200' : ''}>
        {part}
      </span>
    ));
  }, [item.name, search]);

  const highlightedDescription = useMemo(() => {
    return item.description.split(new RegExp(`(${search})`, 'gi')).map((part, i) => (
      <span key={i} className={part.toLowerCase() === search.toLowerCase() ? 'bg-yellow-200' : ''}>
        {part}
      </span>
    ));
  }, [item.description, search]);

  const relatedItems = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: item.id * 100 + i,
      name: `Related ${i}`,
    }));
  }, [item.id]);

  const discountPrice = useMemo(() => {
    return item.price * 0.9;
  }, [item.price]);

  const taxAmount = useMemo(() => {
    return discountPrice * 0.08;
  }, [discountPrice]);

  const totalPrice = useMemo(() => {
    return (discountPrice + taxAmount) * quantity;
  }, [discountPrice, taxAmount, quantity]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg text-gray-900">
          {search ? highlightedName : item.name}
        </h3>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={`text-xl ${isFavorite ? 'text-red-500' : 'text-gray-300'}`}
        >
          ♥
        </button>
      </div>

      <div className="text-sm text-gray-600 mb-2">
        {search ? highlightedDescription : item.description}
      </div>

      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-bold text-green-600">
          ${item.price}
        </span>
        <span className={`px-2 py-1 rounded text-xs ${
          item.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {item.inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>

      <div className="flex items-center mb-2">
        <span className="text-yellow-400">
          {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
        </span>
        <span className="ml-2 text-sm text-gray-600">({item.rating}/5)</span>
      </div>

      <div className="mb-3">
        <div className="text-xs text-gray-500 mb-1">Tags:</div>
        <div className="flex flex-wrap gap-1">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {isExpanded && (
        <div className="border-t pt-3 mt-3 text-sm text-gray-600">
          <div className="mb-2">
            <strong>Category:</strong> {item.category}
          </div>
          <div className="mb-2">
            <strong>Discount Price:</strong> ${discountPrice.toFixed(2)}
          </div>
          <div className="mb-2">
            <strong>Tax:</strong> ${taxAmount.toFixed(2)}
          </div>
          <div className="mb-2">
            <strong>Total for {quantity} item(s):</strong> ${totalPrice.toFixed(2)}
          </div>
          <div className="mb-2">
            <strong>Related Items:</strong>
            <ul className="ml-4 mt-1">
              {relatedItems.slice(0, 3).map((related) => (
                <li key={related.id} className="text-blue-600 hover:underline cursor-pointer">
                  {related.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-2 py-1 bg-gray-200 rounded text-sm"
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="px-2">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-2 py-1 bg-gray-200 rounded text-sm"
          >
            +
          </button>
        </div>
        
        <div className="space-x-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          >
            {isExpanded ? 'Less' : 'More'}
          </button>
          <button
            disabled={!item.inStock}
            className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 disabled:bg-gray-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default PerformanceDemoListItem;