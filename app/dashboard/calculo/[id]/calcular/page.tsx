import Form from '@/app/ui/calculo/calculo-form';
import Breadcrumbs from '@/app/ui/calculo/breadcrumbs';
import { fetchCondominiosById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [condominios] = await Promise.all([
        fetchCondominiosById(id),

    ]);

    if (!condominios) {
        notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Condominios', href: '/dashboard/condominio' },
                    {
                        label: 'Calcular',
                        href: `/dashboard/condominio`,
                        active: true,
                    },
                ]}
            />
            <Form condominios={condominios} />
        </main>
    );
}