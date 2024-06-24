/*
// use client
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Results() {
    const router = useRouter();
    const [resultado, setResultado] = useState(null);

    useEffect(() => {
        // Verifica se há dados na query params ao carregar a página
        if (router.query.data) {
            const data = JSON.parse(decodeURIComponent(router.query.data));
            setResultado(data);
        }
    }, [router.query.data]);

    if (!resultado) {
        return <p>Carregando...</p>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Resultados do Cálculo</h1>
            <div className="mb-4">
                <p>Valor da Faixa 1: {resultado.valorFaixa1}</p>
                <p>Valor da Faixa 2: {resultado.valorFaixa2}</p>
                <p>Valor da Faixa 3: {resultado.valorFaixa3}</p>
                <p>Valor do Condomínio: R$ {resultado.valorCondominio}</p>
            </div>
            <div>
                <h2 className="text-lg font-semibold mb-2">Cobrança por Apartamento:</h2>
                <ul>
                    {resultado.cobrancaPorApartamento.map((cobranca, index) => (
                        <li key={index}>
                            Apartamento {index + 1}: {cobranca[`Apartamento ${index + 1}`]}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
*/