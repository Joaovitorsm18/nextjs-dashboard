import Form from '@/app/ui/condominio/edit-form';
import Breadcrumbs from '@/app/ui/condominio/breadcrumbs';
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
                        label: 'Editar Condominios',
                        href: `/dashboard/condominio/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form condominios={condominios} />
        </main>
    );
}