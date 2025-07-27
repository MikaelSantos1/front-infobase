'use client';
import { useAuthStore } from '@/store/auth-store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AppSidebar, Sidebar } from '@/components/ui/app-sidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';
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
    <div className="flex w-full h-screen">
    <AppSidebar />
    
    <main className="w-full overflow-auto">
      <SidebarTrigger className="ml-1 size-10"/>
      {children}
      {sheet}
    </main>
  </div>
  );
}
