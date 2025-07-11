import { Search } from 'lucide-react'
import ResetButton from './ResetButton'




function SearchBar({query}: {query? : string}) {


  return (
    <form action = '/'  className="max-w-3xl w-full min-h-[80px] bg-white border-[5px] border-black rounded-[80px] text-[24px] mt-8 px-5 flex flex-row items-center gap-5">
        <input
        name="query"
        defaultValue={query}
        className='flex-1  font-bold placeholder:font-semibold placeholder:text-black-100 w-full h-auto outline-none'
        placeholder='Search Startups'
        />

        <div className="flex gap-2">
            {query && (
                <ResetButton/>
            )}

            <button type='submit' className='size-[50px] rounded-full text-white bg-black flex justify-center items-center'>
                <Search className='size-5'/>
            </button>

        </div>
    </form>
  )
}

export default SearchBar