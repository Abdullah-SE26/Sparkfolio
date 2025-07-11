import { auth, signIn, signOut } from "@/auth"; 
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={80}
            height={30}
            className="mix-blend-multiply cursor-pointer"
          />
        </Link>

        
        <div className="flex items-center gap-3 text-black cursor-pointer ">
{/* if a user exists in a sesion (session?.user) then we have to show create, logout and username  links */}
          {session?.user ? (
            <>
              <Link href="/startup/create" className="font-semibold py-1 px-3 rounded-sm bg-blue-500 hover:bg-blue-600">
                <span>Create</span>
              </Link>

              {/* Logout form */}
              <form
                action={async () => {
                  "use server";
                  await signOut();
                  redirect("/");
                }}
              >
                <button type="submit" className="cursor-pointer font-semibold py-1 px-3 rounded-sm bg-red-500 hover:bg-red-600">
                  <span>Logout</span>
                </button>
              </form>

              <Link href={`/user/${session.user.id}`} className="font-bold  text-black">
                <span>{session.user.name}</span>
              </Link>
            </>
          ) : (
            // else show Login form
            <form 
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit" className="cursor-pointer font-semibold py-1 px-3 rounded-sm bg-green-600 hover:bg-green-700">
                <span>Login</span>
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

//========================#  NOTES #=============================//

//we are turning buttons with onclick to forms so that we can keep our entire navbar on the client side as onclicks 
//cannot be used in server components.

// <form 
//   action={async () => {
//     "use server";
//     await signIn("github");
//   }}
// >
//   <button type="submit" className="cursor-pointer">
//     <span>Login</span>
//   </button>
// </form>
