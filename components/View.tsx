import React from 'react';
import Ping from '@/components/Ping';
import { client } from '@/sanity/lib/client';
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries';
import { writeClient } from '@/sanity/lib/write-client';
import { after } from 'next/server';

type ViewProps = {
  id: string;
};

const View = async ({ id }: ViewProps) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });

  after(async () =>
    await writeClient.patch(id).set({ views: totalViews + 1 }).commit()
  );

  return (
    <div className="fixed bottom-20 right-8 bg-pink-200 bg-opacity-90 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-lg min-w-[110px] transition duration-300 hover:bg-pink-300 cursor-default">
      <Ping />
      <span className="text-black text-sm font-semibold leading-none">Views: {totalViews}</span>
    </div>
  );
};

export default View;
