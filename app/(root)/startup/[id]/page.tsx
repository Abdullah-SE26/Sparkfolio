import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUPS_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import markdownit from "markdown-it";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";

const md = markdownit();

export const experimental_ppr = true;

type PageProps = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: PageProps) => {
  const id = params.id;

  const [post, editorPlaylist] = await Promise.all([
    client.fetch(STARTUPS_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "editor-picks" }),
  ]);

  if (!post) return notFound();

  console.log("🖼️ Author image URL:", post.author?.image);


 
    const pitchMarkdown =
    typeof post.pitch === "string"
    ? post.pitch
    : post?.pitch?.markdown ?? "";

    const parsedContent = md.render(pitchMarkdown);

    console.log("Pitch content:", post.pitch);




  const editorPosts = editorPlaylist?.select || [];

  return (
    <div>
      {/* Header Section */}
      <section className="min-h-[230px] w-full bg-primary pattern flex justify-center items-center flex-col py-10 px-6">
        <p
          className="bg-blue-400 px-6 py-3 font-work-sans font-bold rounded-sm uppercase relative 
            before:content-[''] before:absolute before:top-2 before:left-2 
            before:border-t-[10px] before:border-t-black before:border-r-[10px] before:border-r-transparent 
            after:content-[''] after:absolute after:bottom-2 after:right-2 
            after:border-b-[10px] after:border-b-black after:border-l-[10px] after:border-l-transparent"
        >
          {formatDate(post?._createdAt)}
        </p>

        <h1 className="uppercase bg-black px-6 py-3 font-work-sans font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5">
          {post.title}
        </h1>

        <p className="font-medium text-[20px] text-white max-w-5xl text-center break-words">
          {post.description}
        </p>
      </section>

      {/* Content Section */}
      <section className="px-6 py-10 max-w-7xl mx-auto">
        <Image
          src={post.image || "/fallback.jpg"}
          alt="thumbnail"
          width={1280}
          height={720}
          className="w-full max-h-[500px] object-cover rounded-xl"
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          {/* Author Info & Category */}
          <div className="flex justify-between items-start flex-wrap gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
                <img
                src={post.author?.image || "/default-avatar.png"}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full"
                />

              <div>
                <p className="text-20-medium">{post.author?.name}</p>
                <p className="text-16-medium text-black-300">
                  @{post.author?.username}
                </p>
              </div>
            </Link>

            <p className="font-medium text-[16px] bg-primary-100 px-4 py-2 rounded-full">
              {post.category}
            </p>
          </div>

          {/* ✅ Pitch Content */}
          <h3 className="text-30 font-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>

        <hr className="border-dotted bg-zinc-400 max-w-4xl my-10 mx-auto" />

        {/* Editor Picks */}
        {editorPosts.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Editor Picks</p>

            <ul className="mt-7 grid sm:grid-cols-2 gap-5">
              {editorPosts.map((post: StartupTypeCard, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}

        {/* Views Tracker */}
        <Suspense
          fallback={
            <Skeleton className="bg-zinc-400 h-10 w-24 rounded-lg fixed bottom-3 right-3" />
          }
        >
          <View id={id} />
        </Suspense>
      </section>
    </div>
  );
};

export default Page;
