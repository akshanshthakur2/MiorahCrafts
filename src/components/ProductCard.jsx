import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="group block">
      <motion.div 
        whileHover={{ y: -4 }}
        className="cursor-pointer"
      >
        {/* Compact Square Image */}
        <div className="relative aspect-square overflow-hidden rounded-xl bg-stone-100 mb-3">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Text Info */}
        <div className="px-1">
          <div className="flex justify-between items-baseline gap-2">
            <h3 className="text-sm font-medium text-stone-800 truncate">
              {product.name}
            </h3>
            <span className="text-sm font-serif font-bold text-stone-900">
              ${product.price}
            </span>
          </div>
          <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-1">
            {product.category}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;