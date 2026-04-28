
import { notFound } from 'next/navigation';

export default function AdminPage() {
  // Rota desativada conforme solicitado. O acesso é apenas via /napau
  return notFound();
}
