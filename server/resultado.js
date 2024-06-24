// pages/resultado.js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Resultado() {
    const router = useRouter();
    const { output, apartamentos } = router.query; // Obtém os parâmetros 'output' e 'apartamentos' da URL

    // Estado para armazenar o resultado
    const [resultado, setResultado] = useState('');
    // Estado para armazenar os apartamentos
    const [listaApartamentos, setListaApartamentos] = useState([]);

    useEffect(() => {
        // Atualiza o estado 'resultado' ao montar o componente
        if (output) {
            setResultado(output);
        }
        // Atualiza o estado 'listaApartamentos' ao montar o componente
        if (apartamentos) {
            setListaApartamentos(JSON.parse(apartamentos));
        }
    }, [output, apartamentos]);

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mt-8">Resultados do Cálculo</h1>
            <div className="mt-4">
                <p>Resultado:</p>
                <pre>{resultado}</pre>
            </div>
            <div className="mt-4">
                <p>Cobrança por apartamento:</p>
                <ul>
                    {listaApartamentos.map((apartamento, index) => (
                        <li key={index}>
                            {apartamento}: R$ {/* Aqui você pode formatar o resultado específico para cada apartamento */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
