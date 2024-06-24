'use client';

import { CondominioForm } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';

import { useState, useEffect } from 'react';

export default function EditCondominioForm({
  condominios,
}: {
  condominios: CondominioForm;
}) {
  const handleSubmit = async (event, condominios) => { // Passar condominios como parâmetro
    event.preventDefault();

    const data = {
      valorConta: event.target.valorConta.value,
      consumoConta: event.target.consumoConta.value,
      numberOfApartments: condominios.total_apartamentos,
      numberOfLojas: condominios.total_lojas,
      consumosApartamentosIndividuais: event.target.consumosApartamentosIndividuais.value
    };

    const response = await fetch('/process-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log('Resultado do servidor:', result);
  };

  useEffect(() => {
    const substituirVirgulasPorPontos = () => {
      const inputs = document.querySelectorAll('input[type="text"]');
      inputs.forEach((input) => {
        input.addEventListener('change', () => {
          input.value = input.value.replace(/,/g, '.');
        });
      });
    };

    const removerR$ = () => {
      const inputConta = document.querySelectorAll('input[id="valorConta"]');
      inputConta.forEach((input) => {
        input.addEventListener('change', () => {
          let valor = input.value;
          valor = valor.replace(/\s*R\$\s*|\s+/g, '');
          valor = valor.replace(/(\d+)\.(\d+),(\d+)/g, '$1$2.$3');
          input.value = valor;
        });
      });
    };

    removerR$();
    substituirVirgulasPorPontos();
  }, []);

  return (
    <form onSubmit={(event) => handleSubmit(event, condominios)}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <label htmlFor="nome" className="mb-2 block text-sm font-medium">
              Nome do condomínio
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500 bg-gray-50">
                {condominios.nome}
              </div>
            </div>
          </div>
          <div className="flex-1">
            <label htmlFor="apartamento" className="mb-2 block text-sm font-medium">
              Apartamentos
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500">
                {condominios.total_apartamentos}
              </div>
            </div>
          </div>
          <div className="flex-1">
            <label htmlFor="loja" className="mb-2 block text-sm font-medium">
              Lojas
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500">
                {condominios.total_lojas}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="loja" className="mb-2 block text-sm font-medium">
            Particularidades
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500">
              {condominios.msg}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Valor da conta
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="valorConta"
                name="valorConta"
                type="text"
                step="0.01"
                required
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="consumoConta" className="mb-2 block text-sm font-medium">
            Consumo da conta
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="consumoConta"
                name="consumoConta"
                type="text"
                step="0.01"
                required
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="consumosApartamentosIndividuais" className="mb-2 block text-sm font-medium">
            Consumos das unidades
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="consumosApartamentosIndividuais"
                name="consumosApartamentosIndividuais"
                type="text"
                step="0.01"
                required
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/condominio"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Calcular</Button>
      </div>
    </form>
  );
}
