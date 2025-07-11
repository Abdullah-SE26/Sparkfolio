"use client";
import { MdClear } from "react-icons/md";
import Link from "next/link";

const ResetButton = () => {

 const reset = () => {
        const form = document.querySelector('search.form') as HTMLFormElement;

        if(form) form.reset();
    }
  return (
    <button type='reset' onClick={reset}>
        <Link href='/' className="size-[50px] rounded-full bg-black flex justify-center items-center text-white">
           <MdClear size={20} />
        </Link>
    </button>
  )
}

export default ResetButton