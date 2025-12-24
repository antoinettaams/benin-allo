'use client';

import React, { Suspense } from 'react';
import SubscriptionForm from '../components/SubscriptionForm';
import { Loader2 } from 'lucide-react';

export default function SubscribePage() {
  return (
    <Suspense fallback={
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-gray-50/30">
        <div className="bg-white p-10 md:p-16 rounded-[3.5rem] shadow-2xl shadow-blue-900/5 border border-gray-100 max-w-lg w-full">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl mb-10 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded-xl mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-100 rounded-xl mb-8 animate-pulse"></div>
          
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <div className="h-4 bg-gray-100 rounded mb-2 w-32 animate-pulse"></div>
                <div className="h-12 bg-gray-50 rounded-2xl animate-pulse"></div>
              </div>
            ))}
          </div>
          
          <div className="h-14 bg-gray-200 rounded-2xl mt-8 animate-pulse"></div>
          <div className="h-8 bg-gray-100 rounded-xl mt-4 animate-pulse"></div>
        </div>
      </div>
    }>
      <SubscriptionForm />
    </Suspense>
  );
}