import {
  BanknotesIcon,
  PlusCircleIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  BuildingStorefrontIcon,
} from '@heroicons/react/24/outline';

import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  collected: BanknotesIcon,
  condominio: UserGroupIcon,
  apartamentos: BuildingOfficeIcon,
  lojas: BuildingStorefrontIcon,
  ultimoCondominio: PlusCircleIcon,
};

export default async function CardWrapper() {
  const {
    numberOfCondominios,
    numberOfApartamentos,
    numberOfLojas,
    ultimoCadastrado,
    /*
    numberOfInvoices,
    numberOfcondominio,
    totalPaidInvoices,
    totalPendingInvoices,
    */
  } = await fetchCardData();
  return (
    <>
      <Card title="Total Condomínios" value={numberOfCondominios} type="condominio" />
      <Card title="Total Apartamentos" value={numberOfApartamentos} type="apartamentos" />
      <Card title="Total Lojas" value={numberOfLojas} type="lojas" />
      {/* 
      <Card title="Ultimo cadastrado" value={ultimoCadastrado} type="ultimoCondominio" />
      */}

    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'condominio' | 'apartamentos' | 'lojas' | 'ultimoCondominio';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
