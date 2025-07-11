import Navbar from "../../components/Navbar";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="font-work-sans bg-white">
      <Navbar />

      {children}
    </main>
  );
};

export default Layout;
