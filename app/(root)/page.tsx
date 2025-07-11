import StartupCard from "@/components/StartupCard";
import HeadingBox from "../../components/HeadingsBox";
import SearchBar from "../../components/SearchBar";


const Home = async ({searchParams}: {
    searchParams: Promise <{query?: string}>
}) => {
    const query = (await searchParams).query

    const posts = [{
        _cretedAt : new Date(),
        views: 55,
        author: {_id: 1},
        _id : 1,
        description : 'This is a description',
        image : '/robot.jpg',
        category: 'Robots',
        title: 'We robots',
    },
];
    return (
        <div>
            <section className="w-full bg-indigo-950 min-h-[530px] pattern flex justify-center items-center flex-col py-10 px-6;">
                
                <HeadingBox
                    heading={`Pitch your startup,\nConnect with entrepreneurs`}
                    subheading="Turn your vision into traction — one pitch at a time."
                />

                <SearchBar query = {query}/>
            </section>

            <section className=" px-6 py-10 max-w-7xl mx-auto">
            <p className="text-30-semibold">
                {query ? `Search results for "${query}"`: 'All Startups'}
            </p>

                <ul className='mt-7 rid md:grid-cols-3 sm:grid-cols-2 gap-5'>
                    {posts?.length > 0 ? (
                        posts.map((post : StartupCardType, index: number)=>(
                            <StartupCard key={posts?._id} post={post}/>
                        ))
                    ) : (
                        <p className='text-black-100 text-sm font-normal'>No startups found</p>
                    )}
                </ul>
            </section>
        </div>
    );
}

export default Home;
