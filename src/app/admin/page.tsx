
import { redirect } from 'next/navigation';

export default function AdminRedirect() {
  // Rota renomeada para /napau por segurança e para evitar confusão com código antigo
  redirect('/napau');
}
