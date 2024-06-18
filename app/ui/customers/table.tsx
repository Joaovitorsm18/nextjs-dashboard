import Image from 'next/image';
import { UpdateCondominium, DeleteCondominium } from '@/app/ui/customers/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';

import { fetchFilteredCondominiums } from '@/app/lib/data';
//
export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const condominios = await fetchFilteredCondominiums(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {condominios?.map((condominios) => (
              <div
                key={condominios.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="mb-2 flex items-center">
                    <p>{condominios.nome}</p>
                  </div>
                </div>
                <div className="flex justify-between py-2">
                  <div className="flex flex-col items-center">
                    <p className="text-sm font-medium">Apartamentos</p>
                    <p>{condominios.total_apartamentos}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-sm font-medium">Lojas</p>
                    <p>{condominios.total_lojas}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                    <UpdateCondominium id={condominios.id} />
                    <DeleteCondominium id={condominios.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Condomínios
                </th>
                <th scope="col" className="px-3 py-5 font-medium ">
                  Apartamentos
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Lojas
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {condominios?.map((condominios) => (
                <tr
                  key={condominios.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{condominios.nome}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {condominios.total_apartamentos}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {condominios.total_lojas}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateCondominium id={condominios.id} />
                      <DeleteCondominium id={condominios.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
