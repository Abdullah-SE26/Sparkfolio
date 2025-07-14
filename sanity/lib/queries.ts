import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY = defineQuery(`*[_type == "startup" && defined(slug.current)] | order(createdAt desc){
  _id,
  title,
  slug,
  _createdAt,
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
