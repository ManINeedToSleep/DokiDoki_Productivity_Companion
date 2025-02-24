"use client";

import { usePathname } from 'next/navigation';
import NotebookMessage from './NotebookMessage';

export default function NotebookWrapper() {
  const pathname = usePathname();
  const isMainDashboard = pathname === '/dashboard';

  if (!isMainDashboard) return null;
  
  return <NotebookMessage />;
} 