import Navbar from '@/components/Dashboard/Navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5F8]">
      <Navbar />
      <br></br>
      <br></br>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
} 