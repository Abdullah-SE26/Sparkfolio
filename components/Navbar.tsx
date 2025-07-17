import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import BackButton from "@/components/BackButton"; // <-- add this

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-6 py-4 bg-white shadow-md font-work-sans border-b">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Left side: Back button + Logo */}
        <div className="flex items-center gap-4">
          {/* Back Button component (hidden on home page) */}
          <BackButton />

          {/* Logo */}
          <Link href="/">
  <Image
    src="favicon.ico"
    alt="Logo"
    width={60}
    height={40}
    className="mix-blend-multiply cursor-pointer"
    style={{ width: 'auto', height: 'auto' }} 
  />
</Link>

        </div>

        {/* if a user exists in a session (session?.user) then we have to show create, logout and username links */}
        <div className="flex items-center gap-4">
          {session?.user ? (
            <>
              {/* Create Button */}
              <Link
                href="/startup/create"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
              >
                Create
              </Link>

              {/* Logout Form */}
              <form
                action={async () => {
                  "use server";
                  await signOut();
                  redirect("/");
                }}
              >
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
                >
                  Logout
                </button>
              </form>

              {/* Profile */}
              <Link
                href={`/user/${session.user.id}`}
                className="text-sm font-semibold text-gray-800 hover:text-black bg-gray-100 px-4 py-2 rounded-full transition"
              >
                {session.user.name}
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
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
              >
                Login
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

// we are turning buttons with onclick to forms so that we can keep our entire navbar on the server side as onclicks 
// cannot be used in server components.

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
