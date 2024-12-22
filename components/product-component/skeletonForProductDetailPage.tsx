"use client";

import React from "react";

export const ProductDetailsSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="bg-gradient-to-tr from-gray-200 via-gray-100 to-gray-50 rounded-lg p-2 flex flex-col items-center">
        </div>
        <div className="space-y-6 text-right">
          <div>
            <div className="h-4 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>
          </div>
          <div className="flex items-center gap-4 mb-4">
        
          </div>

          <div className="space-y-4">
            <div className="h-6 bg-gray-300 rounded w-1/2 animate-pulse"></div>
            <div className="space-y-2">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-gray-200 rounded w-full animate-pulse"
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {[1, 2, 3, 4].map((_, i) => (
              <div
                key={i}
                className="h-5 bg-gray-200 rounded w-full animate-pulse"
              />
            ))}
          </div>
          <div className="flex flex-col items-center gap-4 mt-6">
            <div className="h-12 bg-gray-300 rounded w-3/4 animate-pulse"></div>
            <div className="flex gap-3">
              <div className="w-12 h-12 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="w-12 h-12 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
