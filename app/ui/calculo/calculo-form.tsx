'use client';

import { CondominioForm, Resultado } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useState, useEffect } from 'react';

export default function EditCondominioForm({
  condominios,
}: {
  condominios: CondominioForm;
}) {
  const [resultados, setResultados] = useState<Resultado | null>(null);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, condominios: CondominioForm) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      valorConta: { value: string };
      consumoConta: { value: string };
      consumosApartamentosIndividuais: { value: string };
    };

    const data = {
      valorConta: target.valorConta.value,
      consumoConta: target.consumoConta.value,
      numberOfApartments: condominios.total_apartamentos,
      numberOfLojas: condominios.total_lojas,
      consumosApartamentosIndividuais: target.consumosApartamentosIndividuais.value
    };

    try {
      const response = await fetch('https://back-end-6hjm.onrender.com/process-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Resultado do servidor:', result);
      setResultados(result);  // Atualizar o estado com os resultados recebidos

      // Scroll para baixo após 100 pixels do topo
      window.scrollTo({
        top: window.pageYOffset + 1000, // Ajuste o valor conforme necessário
        behavior: 'smooth', // Scroll suave
      });
    } catch (error) {
      console.error('Houve um problema com a requisição fetch:', error);
    }
  };

  useEffect(() => {
    const substituirVirgulasPorPontos = () => {
      const inputs = document.querySelectorAll('input[type="text"]');
      inputs.forEach((input) => {
        input.addEventListener('change', () => {
          (input as HTMLInputElement).value = (input as HTMLInputElement).value.replace(/,/g, '.');
        });
      });
    };

    const removerR$ = () => {
      const inputConta = document.querySelectorAll('input[id="valorConta"]');
      inputConta.forEach((input) => {
        input.addEventListener('change', () => {
          let valor = (input as HTMLInputElement).value;
          valor = valor.replace(/\s*R\$\s*|\s+/g, '');
          valor = valor.replace(/(\d+)\.(\d+),(\d+)/g, '$1$2.$3');
          (input as HTMLInputElement).value = valor;
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

        <Button type="submit">Calcular</Button>
      </div>

      {resultados && (
        <div className="mt-8 rounded-md bg-white p-4 shadow-md">
          <h2 className="text-lg font-semibold mb-4">Resultados</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Faixa</th>
                <th className="border border-gray-300 px-4 py-2">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">1° Faixa</td>
                <td className="border border-gray-300 px-4 py-2">{resultados.valorFaixa1}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">2° Faixa</td>
                <td className="border border-gray-300 px-4 py-2">{resultados.valorFaixa2}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">3° Faixa</td>
                <td className="border border-gray-300 px-4 py-2">{resultados.valorFaixa3}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Condomínio</td>
                <td className="border border-gray-300 px-4 py-2">{resultados.valorCondominio}</td>
              </tr>
            </tbody>
          </table>

          <h2 className="text-lg font-semibold mt-8 mb-4">Cobrança por Apartamento</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Apartamento</th>
                <th className="border border-gray-300 px-4 py-2">Valor</th>
              </tr>
            </thead>
            <tbody>
              {resultados.cobrancaPorApartamento.map((apartamento, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{Object.keys(apartamento)[0]}</td>
                  <td className="border border-gray-300 px-4 py-2">{Object.values(apartamento)[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </form>
  );
}
