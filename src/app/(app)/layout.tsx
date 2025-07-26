'use client';
import { useAuthStore } from '@/store/auth-store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sidebar } from '@/components/ui/sidebar';
export default function AppLayout({
  children,
  sheet,
}: {
  children: React.ReactNode;
  sheet: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();


  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading) return (
     <div className="flex items-center justify-center h-screen w-full">
        <Loader2 className={cn('h-6 w-6 animate-spin text-muted-foreground')} />
      </div>
  )

  return (
    <div className="flex h-screen">
    <Sidebar />
    <main className="flex-1 overflow-auto">
      {children}
      {sheet}
    </main>
  </div>
  );
}
