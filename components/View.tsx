import React from 'react';
import Ping from '@/components/Ping';
import { client } from '@/sanity/lib/client';
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries';
import { EyeIcon } from 'lucide-react';

type ViewProps = {
  id: string;
};

const View = async ({ id }: ViewProps) => {
  let totalViews = 0;

  try {
    const data = await client.withConfig({ useCdn: false }).fetch(STARTUP_VIEWS_QUERY, { id });
    totalViews = data?.views || 0;
  } catch (error) {
    console.error('Error fetching views:', error);
  }

  return (
    <div className="fixed bottom-3 right-3 bg-pink-200 px-2 py-2 rounded-2xl flex items-center gap-3 shadow-lg min-w-[100px]">
      {/* Ping dot */}
      <div className="relative w-3 h-3">
        <Ping />
      </div>

      {/* Icon and Count */}
      <div className="flex items-center gap-2 text-black font-semibold">
        <EyeIcon className="w-5 h-5" />
        <span className="text-base">{totalViews}</span>
      </div>
    </div>
  );
};

export default View;
