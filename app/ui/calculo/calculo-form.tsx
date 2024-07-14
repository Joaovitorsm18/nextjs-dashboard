'use client';

import { CondominioForm, Resultado } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useState, useEffect, useRef } from 'react';
import Modal from './modal-erro';
import ModalDetalhes from './Modal';
import { EyeIcon } from '@heroicons/react/24/outline';

export default function EditCondominioForm({
  condominios,
}: {
  condominios: CondominioForm;
}) {
  const [resultados, setResultados] = useState<Resultado | null>(null);
  const [error, setError] = useState<string | null>(null); // Estado para o erro
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar o modal
  const [isModalDetalhesOpen, setIsModalDetalhesOpen] = useState(false); // Estado para controlar o modal
  const resultRef = useRef<HTMLDivElement | null>(null);

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
      consumosApartamentosIndividuais: target.consumosApartamentosIndividuais.value,
      apartamentos: condominios.apartamentos,
      lojas: condominios.lojas
    };

    try {
      //const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
      const response = await fetch('http://localhost:3001/process-login', {
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

      if (result.Erro) {
        setError(result.Erro);
        setIsModalOpen(true);
      } else {
        setResultados(result);
        setError(null);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Houve um problema com a requisição fetch:', error);
      setError('Houve um problema com a requisição.'); // Definir uma mensagem de erro genérica
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    if (resultados && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [resultados]); // Executar o scroll quando 'resultados' for atualizado

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

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/condominio"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancelar
          </Link>
          <Button type="submit">Calcular</Button>
        </div>
      </div>


      {/* Modal de erro */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <strong className="font-bold">Erro:</strong>
        <span className="block sm:inline">{error}</span>
      </Modal>

      {resultados && !error && (
        <div ref={resultRef} className="mt-8 rounded-md bg-gray-50 p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-6 text-center">Resultados</h2>
          <div className="flex justify-end">
            <button
              className="rounded-md border p-2 hover:bg-gray-100"
              onClick={() => setIsModalDetalhesOpen(true)}
            >
              <EyeIcon className="w-4" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full max-w-3xl mx-auto border-collapse rounded-md overflow-hidden shadow-2xl">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-2 border-r">Faixa</th>
                  <th className="px-4 py-2">Valor</th>
                </tr>
              </thead>
              <tbody>
                {resultados.valorFaixa1 && (
                  <tr className="bg-gray-50">
                    <td className="border px-4 py-2 border-r">1° Faixa</td>
                    <td className="border px-4 py-2">{resultados.valorFaixa1}</td>
                  </tr>
                )}
                {resultados.valorFaixa2 && (
                  <tr>
                    <td className="border px-4 py-2 border-r">2° Faixa</td>
                    <td className="border px-4 py-2">{resultados.valorFaixa2}</td>
                  </tr>
                )}
                {resultados.valorFaixa3 && (
                  <tr className="bg-gray-50">
                    <td className="border px-4 py-2 border-r">3° Faixa</td>
                    <td className="border px-4 py-2">{resultados.valorFaixa3}</td>
                  </tr>
                )}
                {resultados.valorFaixa4 && (
                  <tr>
                    <td className="border px-4 py-2 border-r">4° Faixa</td>
                    <td className="border px-4 py-2">{resultados.valorFaixa4}</td>
                  </tr>
                )}
                {resultados.valorFaixa5 && (
                  <tr className="bg-gray-50">
                    <td className="border px-4 py-2 border-r">5° Faixa</td>
                    <td className="border px-4 py-2">{resultados.valorFaixa5}</td>
                  </tr>
                )}
                {resultados.valorFaixa6 && (
                  <tr>
                    <td className="border px-4 py-2 border-r">6° Faixa</td>
                    <td className="border px-4 py-2">{resultados.valorFaixa6}</td>
                  </tr>
                )}
                <tr className="bg-gray-50">
                  <td className="border px-4 py-2 border-r">Condomínio</td>
                  <td className="border px-4 py-2">R$ {resultados.valorCondominio}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-semibold mt-8 mb-6 text-center">Cobrança por Unidades</h2>
          <div className="overflow-x-auto">
            <table className="w-full max-w-3xl mx-auto border-collapse rounded-md overflow-hidden shadow-2xl">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="px-4 py-2 border-r">Apartamento</th>
                  <th className="px-4 py-2">Valor</th>
                </tr>
              </thead>
              <tbody>
                {resultados.cobrancaPorApartamento.map((apartamento, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                    <td className="border px-4 py-2 border-r">{Object.keys(apartamento)[0]}</td>
                    <td className="border px-4 py-2">{Object.values(apartamento)[0]}</td>
                  </tr>
                ))}
              </tbody>
              {resultados.cobrancaPorLoja && (
                <>
                  <thead className="bg-purple-600 text-white">
                    <tr>
                      <th className="px-4 py-2 border-r">Lojas</th>
                      <th className="px-4 py-2">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultados.cobrancaPorLoja.map((loja, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                        <td className="border px-4 py-2 border-r">{Object.keys(loja)[0]}</td>
                        <td className="border px-4 py-2">{Object.values(loja)[0]}</td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}
            </table>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <Link
              href="/dashboard/condominio"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Voltar
            </Link>
            <Link href={`/dashboard/calculo/${condominios.id}/calcular`} className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">Calcular Novamente</Link>
            <button
              type="button"
              onClick={() => setIsModalDetalhesOpen(true)}
              className="flex h-10 items-center rounded-lg bg-green-500 px-4 text-sm font-medium text-white transition-colors hover:bg-green-400"
            >
              Salvar
            </button>
          </div>

          <ModalDetalhes isOpen={isModalDetalhesOpen} onClose={() => setIsModalDetalhesOpen(false)}>
            <h2 className="text-xl font-semibold mt-8 mb-6 text-center">Cobrança por Unidades</h2>
            <div className="overflow-x-auto">
              <table className="w-full max-w-4xl mx-auto border-collapse rounded-md overflow-hidden shadow-2xl">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="px-4 py-2 border-r w-1/12" rowSpan={2}>Apartamento</th>
                    <th className="px-4 py-2 border-r w-1/12" rowSpan={2}>Consumos</th>
                    <th className="px-4 py-2 border-r w-1/12" rowSpan={2}>Taxa Fixa</th>
                    {resultados.consumoApartamentosPrimeirafaixa && (
                      <th className="px-4 py-2 border-r w-1/6" colSpan={2}>Primeira faixa</th>
                    )}
                    {resultados.consumoApartamentosSegundafaixa && (
                      <th className="px-4 py-2 border-r w-1/6" colSpan={2}>Segunda faixa</th>
                    )}
                    {resultados.consumoApartamentosTerceirafaixa && (
                      <th className="px-4 py-2 border-r w-1/6" colSpan={2}>Terceira faixa</th>
                    )}
                    {resultados.consumoApartamentosQuartafaixa && (
                      <th className="px-4 py-2 border-r w-1/6" colSpan={2}>Quarta faixa</th>
                    )}
                    {resultados.consumoApartamentosQuintafaixa && (
                      <th className="px-4 py-2 border-r w-1/6" colSpan={2}>Quinta faixa</th>
                    )}
                    {resultados.valorCondominio && (
                      <th className="px-4 py-2 border-r w-1/12" rowSpan={2}>Condomínio</th>
                    )}
                    <th className="px-4 py-2 w-1/12" rowSpan={2}>Valor_Final</th>
                  </tr>
                  <tr>
                    {resultados.consumoApartamentosPrimeirafaixa && (
                      <>
                        <th className="bg-blue-600 px-4 py-2 border w-1/12">Consumo</th>
                        <th className="bg-blue-600 px-4 py-2 border w-1/12">Resultado</th>
                      </>
                    )}
                    {resultados.consumoApartamentosSegundafaixa && (
                      <>
                        <th className="bg-blue-600 px-4 py-2 border w-1/12">Consumo</th>
                        <th className="bg-blue-600 px-4 py-2 border w-1/12">Resultado</th>
                      </>
                    )}
                    {resultados.consumoApartamentosTerceirafaixa && (
                      <>
                        <th className="bg-blue-600 px-4 py-2 border w-1/12">Consumo</th>
                        <th className="bg-blue-600 px-4 py-2 border w-1/12">Resultado</th>
                      </>
                    )}
                    {resultados.consumoApartamentosQuartafaixa && (
                      <>
                        <th className="bg-blue-600 px-4 py-2 border w-1/12">Consumo</th>
                        <th className="bg-blue-600 px-4 py-2 border w-1/12">Resultado</th>
                      </>
                    )}
                    {resultados.consumoApartamentosQuintafaixa && (
                      <>
                        <th className="bg-blue-600 px-4 py-2 border w-1/12">Consumo</th>
                        <th className="bg-blue-600 px-4 py-2 border w-1/12">Resultado</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {resultados.cobrancaPorApartamento.map((apartamento, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                      <td className="border px-4 py-2 border-r">{Object.keys(apartamento)[0]}</td>
                      <td className="border px-4 py-2">{resultados.consumosApartamentos[index]}</td>
                      <td className="border px-4 py-2">{resultados.taxaFixa}</td>
                      {resultados.consumoApartamentosPrimeirafaixa && (
                        <>
                          <td className="border px-4 py-2">{resultados.consumoApartamentosPrimeirafaixa[index]}</td>
                          <td className="border px-4 py-2">{resultados.resultadoApartamentosPrimeirafaixa[index]}</td>
                        </>
                      )}
                      {resultados.consumoApartamentosSegundafaixa && (
                        <>
                          <td className="border px-4 py-2">{resultados.consumoApartamentosSegundafaixa[index]}</td>
                          <td className="border px-4 py-2">{resultados.resultadoApartamentosSegundafaixa[index]}</td>
                        </>
                      )}
                      {resultados.consumoApartamentosTerceirafaixa && (
                        <>
                          <td className="border px-4 py-2">{resultados.consumoApartamentosTerceirafaixa[index]}</td>
                          <td className="border px-4 py-2">{resultados.resultadoApartamentosTerceirafaixa[index]}</td>
                        </>
                      )}
                      {resultados.consumoApartamentosQuartafaixa && (
                        <>
                          <td className="border px-4 py-2">{resultados.consumoApartamentosQuartafaixa[index]}</td>
                          <td className="border px-4 py-2">{resultados.resultadoApartamentosQuartafaixa[index]}</td>
                        </>
                      )}
                      {resultados.consumoApartamentosQuintafaixa && (
                        <>
                          <td className="border px-4 py-2">{resultados.consumoApartamentosQuintafaixa[index]}</td>
                          <td className="border px-4 py-2">{resultados.resultadoApartamentosQuintafaixa[index]}</td>
                        </>
                      )}
                      {resultados.valorCondominio && (
                        <>
                          <td className="border px-4 py-2">{`R$ ` + resultados.valorCondominio}</td>
                        </>
                      )}
                      <td className="border px-4 py-2">{Object.values(apartamento)[0]}</td>
                    </tr>
                  ))}
                </tbody>
                {resultados.cobrancaPorLoja && (
                  <>
                    <tbody>
                      {resultados.cobrancaPorLoja.map((loja, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                          <td className="border px-4 py-2 border-r">{Object.keys(loja)[0]}</td>
                          <td className="border px-4 py-2">{resultados.consumosLoja[index]}</td>
                          <td className="border px-4 py-2">{resultados.taxaFixaLoja}</td>
                          {resultados.consumoLojaPrimeirafaixa && (
                            <>
                              <td className="border px-4 py-2">{resultados.consumoLojaPrimeirafaixa[index]}</td>
                              <td className="border px-4 py-2">{resultados.resultadoLojaPrimeirafaixa[index]}</td>
                            </>
                          )}
                          {resultados.consumoLojaSegundafaixa && (
                            <>
                              <td className="border px-4 py-2">{resultados.consumoLojaSegundafaixa[index]}</td>
                              <td className="border px-4 py-2">{resultados.resultadoLojaSegundafaixa[index]}</td>
                            </>
                          )}
                          {resultados.consumoLojaTerceirafaixa && (
                            <>
                              <td className="border px-4 py-2">{resultados.consumoLojaTerceirafaixa[index]}</td>
                              <td className="border px-4 py-2">{resultados.resultadoLojaTerceirafaixa[index]}</td>
                            </>
                          )}
                          {resultados.consumoLojaQuartafaixa && (
                            <>
                              <td className="border px-4 py-2">{resultados.consumoLojaQuartafaixa[index]}</td>
                              <td className="border px-4 py-2">{resultados.resultadoLojaQuartafaixa[index]}</td>
                            </>
                          )}
                          {resultados.consumoLojaQuintafaixa && (
                            <>
                              <td className="border px-4 py-2">{resultados.consumoLojaQuintafaixa[index]}</td>
                              <td className="border px-4 py-2">{resultados.resultadoLojaQuintafaixa[index]}</td>
                            </>
                          )}
                          <td className="border px-4 py-2"></td>
                          <td className="border px-4 py-2">{Object.values(loja)[0]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </>
                )}

              </table>
            </div>
          </ModalDetalhes>
        </div>

      )}
    </form>
  );
}
