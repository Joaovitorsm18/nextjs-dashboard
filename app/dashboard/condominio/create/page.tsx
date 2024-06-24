import Form from '@/app/ui/condominio/create-form';
import Breadcrumbs from '@/app/ui/condominio/breadcrumbs';
import { fetchCondominios } from '@/app/lib/data';

export default async function Page() {
    const condominios = await fetchCondominios();

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Condomínios', href: '/dashboard/costumers' },
                    {
                        label: 'Cadastrar Condomínio',
                        href: '/dashboard/costumers/create',
                        active: true,
                    },
                ]}
            />
            <Form condominios={condominios} />
        </main>
    );
}