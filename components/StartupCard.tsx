import React from 'react';
import { cn, formatDate } from '@/lib/utils';
import { EyeIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import { Author, Startup } from '@/sanity/types';

export type StartupTypeCard = Omit<Startup, 'author'> & { author?: Author };

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    _createdAt,
    _id,
    views,
    author,
    description,
    image,
    category,
    title,
  } = post;

  return (
    <li className="bg-white border-[3px] border-black p-5 rounded-[22px] shadow-md hover:border-primary hover:bg-primary-50 transition-all duration-300">
      {/* Top Bar: Date and Views */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium bg-primary-100 px-1 py-1.5 rounded-full group-hover:bg-white">
          {formatDate(_createdAt)}
        </p>
        <div className="flex items-center gap-2">
          <EyeIcon className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium">{views ?? 0}</span>
        </div>
      </div>

      {/* Author Info */}
      <div className="flex items-center gap-3 mb-4">
        <Link href={`/user/${author?._id}`}>
          <img
            src={author?.image || '/default-avatar.png'}
            alt={author?.name || 'Author'}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />

        </Link>
        <Link href={`/user/${author?._id}`}>
          <p className="text-[15px] font-medium text-black line-clamp-1">
            {author?.name ?? 'Unknown'}
          </p>
        </Link>
      </div>

      {/* Title */}
      <Link href={`/startup/${_id}`}>
        <h3 className="text-xl font-semibold text-black line-clamp-1 mb-2 hover:underline">
          {title}
        </h3>
      </Link>

      {/* Description & Image */}
      <Link href={`/startup/${_id}`}>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{description}</p>
        <img
          src={image}
          alt="Startup"
          className="w-full h-[164px] object-fill rounded-xl transition-transform hover:scale-[1.01]"
        />
      </Link>

      {/* Category & Button */}
      <div className="flex items-center justify-between mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-sm font-medium text-primary hover:underline">
            {category}
          </p>
        </Link>
        <Button
          className="rounded-full bg-black text-white text-sm px-5 py-2.5 hover:bg-primary transition-colors"
          asChild
        >
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn('skeleton', index)}>
        <Skeleton className="startup-card_skeleton" />
      </li>
    ))}
  </>
);

export default StartupCard;
