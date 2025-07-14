import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Author, Startup } from '@/sanity/types'

export type StartupTypeCard = Omit<Startup,'author'> & {author?: Author};

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
          <span className="text-sm font-medium">{views}</span>
        </div>
      </div>

      {/* Author Info */}
      <div className="flex items-center gap-3 mb-4">
        <Link href={`/users/${author?._id}`}>
          <Image
            src={author?.image || '/default-avatar.png'}
            alt={author?.name || 'Author'}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        </Link>
        <Link href={`/users/${author?._id}`}>
          <p className="text-[15px] font-medium text-black line-clamp-1">{author?.name}</p>
        </Link>
      </div>

      {/* Title */}
      <Link href={`/startup/${_id}`}>
        <h3 className="text-xl font-semibold text-black line-clamp-1 mb-2 hover:underline">{title}</h3>
      </Link>

      {/* Description & Startup Image */}
      <Link href={`/startup/${_id}`}>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{description}</p>
        <img
          src={image}
          alt="Startup"
          className="w-full h-[164px] object-cover rounded-xl transition-transform hover:scale-[1.01]"
        />
      </Link>

      {/* Category and Button */}
      <div className="flex items-center justify-between mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-sm font-medium text-primary hover:underline">{category}</p>
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

export default StartupCard;
