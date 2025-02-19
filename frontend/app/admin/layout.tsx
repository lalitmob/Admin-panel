import Navbar from "../components/Navbar";

import Sidebar from "../components/Sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gray-100/90 w-full min-h-screen flex flex-col">
      <section className="mb-5">
        <Navbar />
      </section>

      <div className="flex flex-1 px-10 pb-5 overflow-hidden">
      
        <div className="w-[300px] ">
          <Sidebar />
        </div>

        <div className="flex-1 overflow-auto px-10">{children}</div>
      </div>
    </div>
  );
}
