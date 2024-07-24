'use client';

import { CondominioForm, HistoricoForm } from '@/app/lib/definitions';
import { useState, useEffect, useRef } from 'react';

import ModalDetalhes from './Modal';
import { EyeIcon } from '@heroicons/react/24/outline';

export default function ResultadoHistoricoForm({
  historicos,
  condominios,
}: {
  historicos: HistoricoForm[];
  condominios: CondominioForm;
}) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [resultados, setResultados] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  //console.log('Dados de historicos no componente pai:', historicos);

  useEffect(() => {
    if (selectedDate) {
      const formattedDate = new Date(selectedDate).toISOString().split('T')[0]; // Formata para YYYY-MM-DD
      console.log('Tipo de historico.data:', typeof historicos[0]?.data);
      console.log('Valor de historico.data:', historicos[0]?.data);

      const filteredResult = historicos.find(
        (historico) => {
          const data = typeof historico.data === 'string'
            ? historico.data.split('T')[0]
            : new Date(historico.data).toISOString().split('T')[0];
          return data === formattedDate;
        }
      );
      setResultados(filteredResult ? filteredResult.resultado : null);
    }
  }, [selectedDate, historicos]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const getValue = (obj: any): React.ReactNode => {
    const values = Object.values(obj);
    return values.length > 0 ? (typeof values[0] === 'string' || typeof values[0] === 'number' ? values[0] : JSON.stringify(values[0])) : null;
  };

  return (
    <form>
      {/* Seletor de Data */}
      <div className="mb-4">
        <label htmlFor="data" className="mb-2 block text-sm font-medium">
          Selecione a Data
        </label>
        <input
          type="month"
          id="data"
          value={selectedDate ?? ''}
          onChange={handleDateChange}
          className="block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm"
        />
      </div>
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
      </div>


      {resultados && !error && (
        <div className="mt-8 rounded-md bg-gray-50 p-6 shadow-md">
          <div className="mb-4">
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              Valor da conta
            </label>
            <div className="relative mt-2 rounded-md">
              {resultados.valorConta}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              Consumo da conta
            </label>
            <div className="relative mt-2 rounded-md">
              {resultados.consumoConta}
            </div>
          </div>
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
                {resultados.cobrancaPorApartamento.map((apartamento: any, index: number) => (
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
                    <td className="border px-4 py-2">{getValue(apartamento)}</td>
                  </tr>
                ))}
              </tbody>
              {resultados.cobrancaPorLoja && (
                <>
                  <tbody>
                    {resultados.cobrancaPorLoja.map((loja: any, index: number) => (
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
                        <td className="border px-4 py-2">{getValue(loja)}</td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}
            </table>
          </div>
        </div>
      )}
    </form>
  );
}
