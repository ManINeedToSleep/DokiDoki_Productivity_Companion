import Navbar from '@/components/Dashboard/Navbar';
import NotebookWrapper from '@/components/Dashboard/NotebookWrapper';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen h-screen bg-[#FFF5F8]">
      <Navbar />
      <main className="h-[calc(100vh-4rem)]">
        {children}
      </main>
      <NotebookWrapper />
    </div>
  );
} 