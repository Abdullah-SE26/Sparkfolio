import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY = defineQuery(`*[_type == "startup" && defined(slug.current)] | order(createdAt desc){
  id,
  title,
  slug,
  createdAt,
  author->{
    authorId,
    name,
    image,
    bio
  },
  views,
  description,
  category,
  image
}`);
