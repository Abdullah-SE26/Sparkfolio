import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    createdAt,
    id,
    views,
    author: { authorId, name },
    description,
    image,
    category,
    title,
  } = post

  return (
    <li className="bg-white border-[3px] border-black p-5 rounded-[22px] shadow-md hover:border-primary hover:bg-primary-50 transition-all duration-300">
      {/* Top Bar: Date and Views */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium bg-primary-100 px-1 py-1.5 rounded-full group-hover:bg-white">
          {formatDate(createdAt)}
        </p>
        <div className="flex items-center gap-2">
          <EyeIcon className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium">{views}</span>
        </div>
      </div>

      {/* Author Info */}
      <div className="flex items-center gap-3 mb-4">
        <Link href={`/users/${authorId}`}>
          <Image
            src="/robot.jpg"
            alt="Author"
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        </Link>
        <Link href={`/users/${authorId}`}>
          <p className="text-[15px] font-medium text-black line-clamp-1">{name}</p>
        </Link>
      </div>

      {/* Title */}
      <Link href={`/startup/${id}`}>
        <h3 className="text-xl font-semibold text-black line-clamp-1 mb-2 hover:underline">{title}</h3>
      </Link>

      {/* Description */}
      <Link href={`/startup/${id}`}>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{description}</p>
        <img
          src={image}
          alt="Startup"
          className="w-full h-[164px] object-cover rounded-xl transition-transform hover:scale-[1.01]"
        />
      </Link>

      {/* Bottom: Category and Button */}
      <div className="flex items-center justify-between mt-5">
        <Link href={`/?query=${category.toLowerCase()}`}>
          <p className="text-sm font-medium text-primary hover:underline">{category}</p>
        </Link>

        <Button
          className="rounded-full bg-black text-white text-sm px-5 py-2.5 hover:bg-primary transition-colors"
          asChild
        >
          <Link href={`/startup/${id}`}>Details</Link>
        </Button>
      </div>
    </li>
  )
}

export default StartupCard
