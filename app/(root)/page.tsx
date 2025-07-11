import HeadingBox from "../../components/HeadingsBox";
import SearchBar from "../../components/SearchBar";


const Home = async ({searchParams}: {
    searchParams: Promise <{query?: string}>
}) => {
    const query = (await searchParams).query
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

            </section>
        </div>
    );
}

export default Home;
