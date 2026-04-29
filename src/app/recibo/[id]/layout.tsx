import { supabase } from '@/lib/supabase';

export async function generateStaticParams() {
  const { data } = await supabase
    .from('registrations')
    .select('id');

  if (!data || data.length === 0) {
    return [{ id: 'placeholder' }];
  }

  return data.map((reg) => ({
    id: reg.id,
  }));
}

export default function ReciboLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
