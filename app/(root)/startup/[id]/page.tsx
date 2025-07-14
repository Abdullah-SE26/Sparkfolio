import { client } from '@/sanity/lib/client';
import { STARTUPS_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';


export const experimental_ppr = true;

const page = async ({params}: {params: Promise<{id: string}>}) => {
    const id = (await params).id

    const post = await client.fetch(STARTUPS_BY_ID_QUERY, {id})

    if(!post) return notFound()

  return (
    <div>
        <h1 className="text-3xl">
            {post.title}
        </h1>
    </div>
  )
}

export default page


// import { after } from 'next/server';
// after(async () =>
// await writeClient
// .patch(id)
// .set({ views: totalViews + 1 })
// .commit()
// );