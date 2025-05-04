import Image from 'next/image';
import { UserForm } from '@/components/UserForm';
import { GithubIcon } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 pb-20 gap-8 sm:p-10">
      <header className="flex justify-center gap-2">
        <GithubIcon />
        <h1 className="text-xl font-semibold">shadcn/ui ⚡️ Tanstack Form</h1>
      </header>

      <main className="flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-card border rounded-lg shadow-sm p-6">
          <UserForm />
        </div>
      </main>

      <footer className="flex flex-col gap-4 flex-wrap items-center justify-center text-sm text-muted-foreground">
        <p>Built with TanStack Form and shadcn/ui by <Link href="#">Aryan Chaurasia</Link></p>
        <div className='flex gap-4'>
        <Link className="flex items-center gap-2 hover:underline hover:underline-offset-4" href="https://tanstack.com/form/latest" target="_blank" rel="noopener noreferrer">
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          TanStack Form
        </Link>
        <Link className="flex items-center gap-2 hover:underline hover:underline-offset-4" href="https://ui.shadcn.com/" target="_blank" rel="noopener noreferrer">
          <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
          shadcn/ui
        </Link>
        </div>
      </footer>
    </div>
  );
}
