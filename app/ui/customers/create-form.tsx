'use client';

import { CondominioField } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createCondominium } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function Form({ condominios }: { condominios: CondominioField[] }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createCondominium, initialState);

  return <form action={dispatch}>
    <div className="rounded-md bg-gray-50 p-4 md:p-6">
      {/* Nome condomínio */}
      <div className="mb-4">
        <label htmlFor="amount" className="mb-2 block text-sm font-medium">
          Nome Condomínio
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="nome"
              name="nome"
              type="text"
              step="0.01"
              placeholder=""
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
              required
            />
          </div>
        </div>
      </div>

      {/* Apartamentos condomínio */}
      <div className="mb-4">
        <label htmlFor="amount" className="mb-2 block text-sm font-medium">
          Apartamentos
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="apartamentos"
              name="apartamentos"
              type="text"
              step="0.01"
              placeholder="101, 102..."
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
              required
            />
          </div>
        </div>
      </div>

      {/* Lojas condomínio */}
      <div className="mb-4">
        <label htmlFor="amount" className="mb-2 block text-sm font-medium">
          Lojas
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="lojas"
              name="lojas"
              type="text"
              step="0.01"
              placeholder="Loja 01, loja 02..."
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
              required
            />
          </div>
        </div>
      </div>

    </div>
    <div className="mt-6 flex justify-end gap-4">
      <Link
        href="/dashboard/invoices"
        className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
      >
        Cancel
      </Link>
      <Button type="submit">Criar Condomínio</Button>
    </div>
  </form>
}
