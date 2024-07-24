import Form from '@/app/ui/historico/resultado-form';
import Breadcrumbs from '@/app/ui/calculo/breadcrumbs';
import { fetchCondominiosById, fetchHistoricosyId } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [condominios, historicos] = await Promise.all([
        fetchCondominiosById(id),
        fetchHistoricosyId(id) // Agora isso deve retornar um array
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
            <Form condominios={condominios} historicos={historicos} />
        </main>
    );
}
