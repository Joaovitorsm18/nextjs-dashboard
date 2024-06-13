import Form from '@/app/ui/customers/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
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
                    { label: 'Condominios', href: '/dashboard/customers' },
                    {
                        label: 'Editar Condominios',
                        href: `/dashboard/customers/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form condominios={condominios} />
        </main>
    );
}