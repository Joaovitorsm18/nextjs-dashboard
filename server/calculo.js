// função para passar para segunda faixa, visto que a primeira ultrapassou o limite
function passarSegundaFaixa(consumosApartamentos) {
    // Criando o array apartamentoprimeirafaixa

    const apartamentoPrimeiraFaixa = consumosApartamentos.map(consumo => {
        if (consumo > 5) {
            return 5;
        } else {
            return consumo;
        }
    });

    // Criando o array apartamentoSegundaFaixa
    const apartamentoSegundaFaixa = consumosApartamentos.map((consumo, index) => {
        const primeiraFaixa = apartamentoPrimeiraFaixa[index];
        const diff = consumo - primeiraFaixa;
        return diff > 0 ? diff : 0;
    });

    return { apartamentoPrimeiraFaixa, apartamentoSegundaFaixa };
}
// função para passar para terceira faixa, visto que a segunda ultrapassou o limite
function passarTerceiraFaixa(consumosApartamentos) {
    // Criando o array apartamentoprimeirafaixa
    const apartamentoPrimeiraFaixa = consumosApartamentos.map(consumo => {
        if (consumo > 5) {
            return 5;
        } else {
            return consumo;
        }
    });

    // Criando o array apartamentoSegundaFaixa
    const apartamentoSegundaFaixa = consumosApartamentos.map((consumo, index) => {
        const primeiraFaixa = apartamentoPrimeiraFaixa[index];
        const diff = consumo - primeiraFaixa;
        return diff > 0 ? Math.min(diff, 5) : 0;
    });

    // Criando o array apartamentoTerceiraFaixa
    const apartamentoTerceiraFaixa = consumosApartamentos.map((consumo, index) => {
        const primeiraFaixa = apartamentoPrimeiraFaixa[index];
        const segundaFaixa = apartamentoSegundaFaixa[index];
        const diff = consumo - primeiraFaixa - segundaFaixa;
        return diff > 0 ? diff : 0;
    });

    return { apartamentoPrimeiraFaixa, apartamentoSegundaFaixa, apartamentoTerceiraFaixa };
}
// função para passar para quarta faixa, visto que a terceira ultrapassou o limite
function passarQuartaFaixa(consumosApartamentos) {
    // Criando o array apartamentoprimeirafaixa
    const apartamentoPrimeiraFaixa = consumosApartamentos.map(consumo => {
        if (consumo > 5) {
            return 5;
        } else {
            return consumo;
        }
    });

    // Criando o array apartamentoSegundaFaixa
    const apartamentoSegundaFaixa = consumosApartamentos.map((consumo, index) => {
        const primeiraFaixa = apartamentoPrimeiraFaixa[index];
        const diff = consumo - primeiraFaixa;
        return diff > 0 ? Math.min(diff, 5) : 0;
    });

    // Criando o array apartamentoTerceiraFaixa
    const apartamentoTerceiraFaixa = consumosApartamentos.map((consumo, index) => {
        const primeiraFaixa = apartamentoPrimeiraFaixa[index];
        const segundaFaixa = apartamentoSegundaFaixa[index];
        const diff = consumo - primeiraFaixa - segundaFaixa;
        return diff > 0 ? Math.min(diff, 5) : 0;
    });

    // Criando o array apartamentoTQuartaFaixa
    const apartamentoQuartaFaixa = consumosApartamentos.map((consumo, index) => {
        const primeiraFaixa = apartamentoPrimeiraFaixa[index];
        const segundaFaixa = apartamentoSegundaFaixa[index];
        const terceiraFaixa = apartamentoTerceiraFaixa[index];
        const diff = consumo - primeiraFaixa - segundaFaixa - terceiraFaixa;
        return diff > 0 ? diff : 0;
    });

    return { apartamentoPrimeiraFaixa, apartamentoSegundaFaixa, apartamentoTerceiraFaixa, apartamentoQuartaFaixa };
}

function passarQuintaFaixa(consumosApartamentos) {
    // Criando o array apartamentoprimeirafaixa
    const apartamentoPrimeiraFaixa = consumosApartamentos.map(consumo => {
        if (consumo > 5) {
            return 5;
        } else {
            return consumo;
        }
    });

    // Criando o array apartamentoSegundaFaixa
    const apartamentoSegundaFaixa = consumosApartamentos.map((consumo, index) => {
        const primeiraFaixa = apartamentoPrimeiraFaixa[index];
        const diff = consumo - primeiraFaixa;
        return diff > 0 ? Math.min(diff, 5) : 0;
    });

    // Criando o array apartamentoTerceiraFaixa
    const apartamentoTerceiraFaixa = consumosApartamentos.map((consumo, index) => {
        const primeiraFaixa = apartamentoPrimeiraFaixa[index];
        const segundaFaixa = apartamentoSegundaFaixa[index];
        const diff = consumo - primeiraFaixa - segundaFaixa;
        return diff > 0 ? Math.min(diff, 5) : 0;
    });

    // Criando o array apartamentoQuartaFaixa
    const apartamentoQuartaFaixa = consumosApartamentos.map((consumo, index) => {
        const primeiraFaixa = apartamentoPrimeiraFaixa[index];
        const segundaFaixa = apartamentoSegundaFaixa[index];
        const terceiraFaixa = apartamentoTerceiraFaixa[index];
        const diff = consumo - primeiraFaixa - segundaFaixa - terceiraFaixa;
        return diff > 0 ? Math.min(diff, 5) : 0;
    });

    // Criando o array apartamentoQuintaFaixa
    const apartamentoQuintaFaixa = consumosApartamentos.map((consumo, index) => {
        const primeiraFaixa = apartamentoPrimeiraFaixa[index];
        const segundaFaixa = apartamentoSegundaFaixa[index];
        const terceiraFaixa = apartamentoTerceiraFaixa[index];
        const quartaFaixa = apartamentoQuartaFaixa[index];
        const diff = consumo - primeiraFaixa - segundaFaixa - terceiraFaixa - quartaFaixa;
        return diff > 0 ? diff : 0;
    });

    return { apartamentoPrimeiraFaixa, apartamentoSegundaFaixa, apartamentoTerceiraFaixa, apartamentoQuartaFaixa, apartamentoQuintaFaixa };
}

// função que pega todos os parâmetros necessários para calcular as faixas e retornar no console quando for a correta
function passarFaixas(consumosApartamentos, valorExcedente, numberOfApartments, taxaFixa, consumoCondominio, valorCondomínio) {
    firstTierRate = 3.83;

    //chamando a função para trasforamr consumos apartamentos em dois arrays
    const { apartamentoPrimeiraFaixa, apartamentoSegundaFaixa } = passarSegundaFaixa(consumosApartamentos);

    // Array para armazenar os valores multiplicados pela primeira faixa
    const resultPrimeiraFaixa = apartamentoPrimeiraFaixa.map(consumo => consumo * firstTierRate);

    // Cálculo do valor total da primeira faixa   
    const totalFirstTierValue = resultPrimeiraFaixa.reduce((total, value) => total + value, 0);

    // Cálculo do consumo total da segunda faixa
    const consumoTotalSegundaFaixa = apartamentoSegundaFaixa.reduce((total, consumo) => total + consumo, 0);

    // Cálculo do valor de segunda faixa
    let secondTierRate = (valorExcedente - totalFirstTierValue) / consumoTotalSegundaFaixa;

    // se a segunda faixa não ultrapassar o seu valor máximo, o resultado será retornado
    if (secondTierRate <= 8.152) {
        // Array para armazenar os valores multiplicados pela Segunda faixa
        const resultSegundaFaixa = apartamentoSegundaFaixa.map(consumo => consumo * secondTierRate);

        if (consumoCondominio > 0) {
            const ultimoItem1 = resultPrimeiraFaixa[resultPrimeiraFaixa.length - 1];
            const ultimoItem2 = resultSegundaFaixa[resultSegundaFaixa.length - 1];
            valorCondomínio = (ultimoItem1 + ultimoItem2) / numberOfApartments;
            // Removendo o último item do array, no caso o condomínio.
            resultPrimeiraFaixa.pop();
            resultSegundaFaixa.pop();
            consumosApartamentos.pop();

        }


        console.log('Valor da 1° faixa: ' + firstTierRate.toFixed(4));
        console.log('Valor da 2° faixa: ' + secondTierRate.toFixed(4));
        console.log('Valor do condomínio: R$ ' + (valorCondomínio.toFixed(2)));
        // Cálculo da cobrança para cada apartamento
        const cobrancasPorApartamento = consumosApartamentos.map((consumo, index) => {
            const firstTierValue = resultPrimeiraFaixa[index]; // Acesso ao valor correspondente de resultPrimeiraFaixa usando o índice
            const secondTierValue = resultSegundaFaixa[index]; // Acesso ao valor correspondente de resultSegundaFaixa usando o índice
            return firstTierValue + secondTierValue + taxaFixa + valorCondomínio;
        });

        // Saída dos resultados
        console.log(`Cobrança por apartamento:`);
        cobrancasPorApartamento.forEach((cobranca, index) => console.log(`Apartamento ${index + 1}: R$ ${cobranca.toFixed(2)}`));

    }
    else {
        let firstTierRate = 3.83;
        let secondTierRate = 8.152
        const { apartamentoPrimeiraFaixa, apartamentoSegundaFaixa, apartamentoTerceiraFaixa } = passarTerceiraFaixa(consumosApartamentos);

        // Array para armazenar os valores multiplicados pela primeira faixa
        const resultPrimeiraFaixa = apartamentoPrimeiraFaixa.map(consumo => consumo * firstTierRate);

        // Cálculo do valor total da primeira faixa   
        const totalFirstTierValue = resultPrimeiraFaixa.reduce((total, value) => total + value, 0);

        // Array para armazenar os valores multiplicados pela Segunda faixa
        const resultSegundaFaixa = apartamentoSegundaFaixa.map(consumo => consumo * secondTierRate);

        // Cálculo do valor total da segunda faixa   
        const totalSecondTierValue = resultSegundaFaixa.reduce((total, value) => total + value, 0);

        // Cálculo do consumo total da terceira faixa
        const consumoTotalTerceiraFaixa = apartamentoTerceiraFaixa.reduce((total, consumo) => total + consumo, 0);

        let thirdTierRate = (valorExcedente - totalFirstTierValue - totalSecondTierValue) / consumoTotalTerceiraFaixa;

        if (thirdTierRate <= 12.632) {
            // Array para armazenar os valores multiplicados pela Terceira faixa
            const resultTerceiraFaixa = apartamentoTerceiraFaixa.map(consumo => consumo * thirdTierRate);

            if (consumoCondominio > 0) {
                const ultimoItem1 = resultPrimeiraFaixa[resultPrimeiraFaixa.length - 1];
                const ultimoItem2 = resultSegundaFaixa[resultSegundaFaixa.length - 1];
                const ultimoItem3 = resultTerceiraFaixa[resultTerceiraFaixa.length - 1];

                valorCondomínio = (ultimoItem1 + ultimoItem2 + ultimoItem3) / numberOfApartments;
                // Removendo o último item do array, no caso o condomínio.
                resultPrimeiraFaixa.pop();
                resultSegundaFaixa.pop();
                resultTerceiraFaixa.pop();
                consumosApartamentos.pop();
            }

            const cobrancasPorApartamento = consumosApartamentos.map((consumo, index) => {
                const firstTierValue = resultPrimeiraFaixa[index];
                const secondTierValue = resultSegundaFaixa[index];
                const thirdTierValue = resultTerceiraFaixa[index];
                return firstTierValue + secondTierValue + thirdTierValue + taxaFixa + valorCondomínio;
            });

            // Construir o objeto de resultado
            const resultado = {
                valorFaixa1: firstTierRate.toFixed(4),
                valorFaixa2: secondTierRate.toFixed(4),
                valorFaixa3: thirdTierRate.toFixed(4),
                valorCondominio: valorCondomínio.toFixed(2),
                cobrancaPorApartamento: cobrancasPorApartamento.map((cobranca, index) => ({
                    [`Apartamento ${index + 1}`]: `R$ ${cobranca.toFixed(2)}`
                }))
            };

            // Imprimir o objeto como JSON
            console.log(JSON.stringify(resultado));
        }
        else {
            let firstTierRate = 3.83;
            let secondTierRate = 8.152;
            let thirdTierRate = 12.632;
            const { apartamentoPrimeiraFaixa, apartamentoSegundaFaixa, apartamentoTerceiraFaixa, apartamentoQuartaFaixa } = passarQuartaFaixa(consumosApartamentos);

            // Array para armazenar os valores multiplicados pela primeira faixa
            const resultPrimeiraFaixa = apartamentoPrimeiraFaixa.map(consumo => consumo * firstTierRate);

            // Cálculo do valor total da primeira faixa   
            const totalFirstTierValue = resultPrimeiraFaixa.reduce((total, value) => total + value, 0);

            // Array para armazenar os valores multiplicados pela Segunda faixa
            const resultSegundaFaixa = apartamentoSegundaFaixa.map(consumo => consumo * secondTierRate);

            // Cálculo do valor total da segunda faixa   
            const totalSecondTierValue = resultSegundaFaixa.reduce((total, value) => total + value, 0);

            // Array para armazenar os valores multiplicados pela Terceira faixa
            const resultTerceiraFaixa = apartamentoTerceiraFaixa.map(consumo => consumo * thirdTierRate);

            // Cálculo do valor total da terceira faixa   
            const totalThirdTierValue = resultTerceiraFaixa.reduce((total, value) => total + value, 0);

            // Cálculo do consumo total da Quarta faixa
            const consumoTotalQuartaFaixa = apartamentoQuartaFaixa.reduce((total, consumo) => total + consumo, 0);

            let fourthTierRate = (valorExcedente - totalFirstTierValue - totalSecondTierValue - totalThirdTierValue) / consumoTotalQuartaFaixa;


            if (fourthTierRate <= 17.245) {
                // Array para armazenar os valores multiplicados pela Quarta faixa
                const resultQuartaFaixa = apartamentoQuartaFaixa.map(consumo => consumo * fourthTierRate);


                if (consumoCondominio > 0) {
                    const ultimoItem1 = resultPrimeiraFaixa[resultPrimeiraFaixa.length - 1];
                    const ultimoItem2 = resultSegundaFaixa[resultSegundaFaixa.length - 1];
                    const ultimoItem3 = resultTerceiraFaixa[resultTerceiraFaixa.length - 1];
                    const ultimoItem4 = resultQuartaFaixa[resultQuartaFaixa.length - 1];


                    valorCondomínio = (ultimoItem1 + ultimoItem2 + ultimoItem3 + ultimoItem4) / numberOfApartments;
                    // Removendo o último item do array, no caso o condomínio.
                    resultPrimeiraFaixa.pop();
                    resultSegundaFaixa.pop();
                    resultTerceiraFaixa.pop();
                    resultQuartaFaixa.pop();
                    consumosApartamentos.pop();
                }

                console.log('Valor da 1° faixa: R$' + firstTierRate.toFixed(4));
                console.log('Valor da 2° faixa: R$' + secondTierRate.toFixed(4));
                console.log('Valor da 3° faixa: R$' + thirdTierRate.toFixed(4));
                console.log('Valor da 4° faixa: R$' + fourthTierRate.toFixed(4));
                console.log('Valor do condomínio: R$' + (valorCondomínio.toFixed(2)));
                // Cálculo da cobrança para cada apartamento
                const cobrancasPorApartamento = consumosApartamentos.map((consumo, index) => {
                    const firstTierValue = resultPrimeiraFaixa[index]; // Acesso ao valor correspondente de resultPrimeiraFaixa usando o índice
                    const secondTierValue = resultSegundaFaixa[index]; // Acesso ao valor correspondente de resultSegundaFaixa usando o índice
                    const thirdTierValue = resultTerceiraFaixa[index]; // Acesso ao valor correspondente de resultTerceirafaixa usando o índice
                    const fourthTierRate = resultQuartaFaixa[index]; // Acesso ao valor correspondente de resultQuartaFaixa usando o índice
                    return firstTierValue + secondTierValue + thirdTierValue + fourthTierRate + taxaFixa + valorCondomínio;
                });

                // Saída dos resultados
                console.log(`Cobrança por apartamento:`);
                cobrancasPorApartamento.forEach((cobranca, index) => console.log(`Apartamento ${index + 1}: R$ ${cobranca.toFixed(2)}`));

            } else {
                let firstTierRate = 3.83;
                let secondTierRate = 8.152;
                let thirdTierRate = 12.632;
                let fourthTierRate = 17.245;
                const { apartamentoPrimeiraFaixa, apartamentoSegundaFaixa, apartamentoTerceiraFaixa, apartamentoQuartaFaixa, apartamentoQuintaFaixa } = passarQuintaFaixa(consumosApartamentos);

                // Array para armazenar os valores multiplicados pela primeira faixa
                const resultPrimeiraFaixa = apartamentoPrimeiraFaixa.map(consumo => consumo * firstTierRate);

                // Cálculo do valor total da primeira faixa   
                const totalFirstTierValue = resultPrimeiraFaixa.reduce((total, value) => total + value, 0);

                // Array para armazenar os valores multiplicados pela Segunda faixa
                const resultSegundaFaixa = apartamentoSegundaFaixa.map(consumo => consumo * secondTierRate);

                // Cálculo do valor total da segunda faixa   
                const totalSecondTierValue = resultSegundaFaixa.reduce((total, value) => total + value, 0);

                // Array para armazenar os valores multiplicados pela Terceira faixa
                const resultTerceiraFaixa = apartamentoTerceiraFaixa.map(consumo => consumo * thirdTierRate);

                // Cálculo do valor total da terceira faixa   
                const totalThirdTierValue = resultTerceiraFaixa.reduce((total, value) => total + value, 0);

                // Array para armazenar os valores multiplicados pela Quarta faixa
                const resultQuartaFaixa = apartamentoQuartaFaixa.map(consumo => consumo * fourthTierRate);

                // Cálculo do valor total da Quarta faixa   
                const totalfourhTierValue = resultQuartaFaixa.reduce((total, value) => total + value, 0);

                // Cálculo do consumo total da Quarta faixa
                const consumoTotalQuintaFaixa = apartamentoQuintaFaixa.reduce((total, consumo) => total + consumo, 0);

                let fifthTierRate = (valorExcedente - totalFirstTierValue - totalSecondTierValue - totalThirdTierValue - totalfourhTierValue) / consumoTotalQuintaFaixa;

                if (fifthTierRate <= 21.936) {
                    // Array para armazenar os valores multiplicados pela Terceira faixa
                    const resultQuintaFaixa = apartamentoQuintaFaixa.map(consumo => consumo * fifthTierRate);


                    if (consumoCondominio > 0) {
                        const ultimoItem1 = resultPrimeiraFaixa[resultPrimeiraFaixa.length - 1];
                        const ultimoItem2 = resultSegundaFaixa[resultSegundaFaixa.length - 1];
                        const ultimoItem3 = resultTerceiraFaixa[resultTerceiraFaixa.length - 1];
                        const ultimoItem4 = resultQuartaFaixa[resultQuartaFaixa.length - 1];
                        const ultimoItem5 = resultQuintaFaixa[resultQuintaFaixa.length - 1];


                        valorCondomínio = (ultimoItem1 + ultimoItem2 + ultimoItem3 + ultimoItem4 + ultimoItem5) / numberOfApartments;
                        // Removendo o último item do array, no caso o condomínio.
                        resultPrimeiraFaixa.pop();
                        resultSegundaFaixa.pop();
                        resultTerceiraFaixa.pop();
                        resultQuartaFaixa.pop();
                        resultQuintaFaixa.pop();
                        consumosApartamentos.pop();
                    }

                    console.log('Valor da 1° faixa: R$ ' + firstTierRate.toFixed(4));
                    console.log('Valor da 2° faixa: R$ ' + secondTierRate.toFixed(4));
                    console.log('Valor da 3° faixa: R$ ' + thirdTierRate.toFixed(4));
                    console.log('Valor da 4° faixa: R$ ' + fourthTierRate.toFixed(4));
                    console.log('Valor da 5° faixa: R$ ' + fifthTierRate.toFixed(4));
                    console.log('Valor do condomínio: R$ ' + (valorCondomínio.toFixed(2)));
                    // Cálculo da cobrança para cada apartamento
                    const cobrancasPorApartamento = consumosApartamentos.map((consumo, index) => {
                        const firstTierValue = resultPrimeiraFaixa[index]; // Acesso ao valor correspondente de resultPrimeiraFaixa usando o índice
                        const secondTierValue = resultSegundaFaixa[index]; // Acesso ao valor correspondente de resultSegundaFaixa usando o índice
                        const thirdTierValue = resultTerceiraFaixa[index]; // Acesso ao valor correspondente de resultTerceiraFaixa usando o índice
                        const fourthTierRate = resultQuartaFaixa[index]; // Acesso ao valor correspondente de resultQuartaFaixa usando o índice
                        const fifthTierRate = resultQuintaFaixa[index]; // Acesso ao valor correspondente de resultQuintaFaixa usando o índice
                        return firstTierValue + secondTierValue + thirdTierValue + fourthTierRate + fifthTierRate + taxaFixa + valorCondomínio;
                    });

                    // Saída dos resultados
                    console.log(`Cobrança por apartamento:`);
                    cobrancasPorApartamento.forEach((cobranca, index) => console.log(`Apartamento ${index + 1}: R$ ${cobranca.toFixed(2)}`));

                }
                else {
                    alert('erro no calculo');
                    console.log('Resultado');
                    console.log('Não foi possível calcular');
                }
            }
        }
    }
}


module.exports = {
    passarFaixas: passarFaixas
}