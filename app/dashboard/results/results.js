// pages/results.js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Results = () => {
  const router = useRouter();
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (router.query.data) {
      const data = JSON.parse(decodeURIComponent(router.query.data));
      setResults(data);
    }
  }, [router.query.data]);

  if (!results) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Resultados do Script</h1>
      <table>
        <thead>
          <tr>
            <th>Apartamento</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(results.cobrancaPorApartamento).map(([apartamento, valor]) => (
            <tr key={apartamento}>
              <td>{apartamento}</td>
              <td>{`R$ ${valor.toFixed(2)}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form>
        <button type="submit" formaction="/">Calcular Novamente</button>
      </form>
    </div>
  );
};

export default Results;
