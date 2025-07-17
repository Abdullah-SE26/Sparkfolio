import { Toaster } from "@/components/ui/sonner";
import Navbar from "../../components/Navbar";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="font-work-sans bg-white">
      <Navbar />

      {children}
      <Toaster position="bottom-right" />
    </main>
  );
};

export default Layout;
