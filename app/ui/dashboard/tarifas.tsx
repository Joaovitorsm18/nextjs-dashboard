import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchTarifas } from '@/app/lib/data';


// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function TarifasChart() { // Make component async, remove the props
    const tarifas = await fetchTarifas(); // Fetch data inside the component
    const chartHeight = 350;



    return (
        <div className="w-full md:col-span-4">
            <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Tarifas Vigentes 2024
            </h2>
            <div className="rounded-xl bg-gray-50 p-4">
                <table className={`${lusitana.className} min-w-full bg-white border border-gray-200`}>
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border border-gray-400" colSpan={5}>Residencial</th>
                        </tr>
                        <tr>
                            <th className="py-2 px-4 border border-gray-400">Faixas</th>
                            <th className="py-2 px-4 border border-gray-400">Água</th>
                            <th className="py-2 px-4 border border-gray-400">Esgoto</th>
                            <th className="py-2 px-4 border border-gray-400">Total</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {tarifas.residencial.map((tarifa, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>

                                <td className="py-2 px-4 border border-gray-400 ">{tarifa.faixa}</td>
                                <td className="py-2 px-4 border border-gray-400">R$ {tarifa.agua}</td>
                                <td className="py-2 px-4 border border-gray-400">R$ {tarifa.esgoto}</td>
                                <td className="py-2 px-4 border border-gray-400">R$ {tarifa.total}</td>
                            </tr>
                        ))}
                    </tbody>
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border border-gray-400" colSpan={5}>Comercial</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {tarifas.comercial.map((tarifa, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>

                                <td className="py-2 px-4 border border-gray-400 ">{tarifa.faixa}</td>
                                <td className="py-2 px-4 border border-gray-400">R$ {tarifa.agua}</td>
                                <td className="py-2 px-4 border border-gray-400">R$ {tarifa.esgoto}</td>
                                <td className="py-2 px-4 border border-gray-400">R$ {tarifa.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
