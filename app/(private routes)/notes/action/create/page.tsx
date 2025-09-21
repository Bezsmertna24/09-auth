// page.tsx — Server Component
import NoteFormServerWrapper from '@/components/NoteForm/NoteFormServerWrapper';
import css from './CreateNote.module.css';

export const metadata = {
  title: 'Create note',
  description: 'Create a new note in NoteHub',
  openGraph: {
    title: 'Create note',
    description: 'Create a new note in NoteHub',
    url: 'https://your-vercel-url.vercel.app/notes/action/create',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>

        <NoteFormServerWrapper />
      </div>
    </main>
  );
}

