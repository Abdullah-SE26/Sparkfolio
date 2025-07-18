import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import HeadingBox from "../../components/HeadingsBox";
import SearchBar from "../../components/SearchBar";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";


interface HomeProps {
  searchParams?: { query?: string }
}

const Home = async ({ searchParams }: HomeProps) => {
  const query = searchParams?.query ?? null;
  const params = { search: query };

  const session = await auth();
   console.log(session?.id);

   
  const {data : posts} = await sanityFetch({query: STARTUPS_QUERY, params});


  return (
    <div>
      <section className="w-full bg-indigo-950 min-h-[530px] pattern flex justify-center items-center flex-col py-10 px-6">
        <HeadingBox
          heading={`Pitch your startup,\nConnect with entrepreneurs`}
          subheading="Turn your vision into traction — one pitch at a time."
        />

        <SearchBar query={query ?? undefined} />
      </section>

      <section className="px-6 py-10 max-w-7xl mx-auto">
        <p className="text-[30px] font-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>

       <ul className="mt-7 grid md:grid-cols-3 sm:grid-cols-2 gap-5">
  {posts?.length > 0 ? (
    posts.map((post: StartupTypeCard) => (
      <StartupCard key={post?._id} post={post} /> 
    ))
  ) : (
    <p className="text-black-100 text-sm font-normal">No startups found</p>
  )}
</ul>

      </section>

      <SanityLive/>
    </div>
  );
};

export default Home;
