
import { notFound } from 'next/navigation';

export default function AdminPage() {
  // Rota desactivada por segurança. O acesso é exclusivo via /napau
  return notFound();
}
