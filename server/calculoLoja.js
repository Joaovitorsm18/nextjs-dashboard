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
function passarFaixasLoja(valorConta, consumosApartamentos, consumoTotalApartamentos, numberOfApartments, numberOfLojas, consumoCondominio, valorCondomínio) {
    const taxaFixaApartamentos = 36.93;
    const taxaFixaLoja = 59.84;

    // Cálculo do valor excedente (valor da conta menos o total das taxas fixas)
    const valorMinimoResidencial = (taxaFixaApartamentos * numberOfApartments) + (taxaFixaLoja * numberOfLojas);
    let valorExcedenteComLoja = valorConta - valorMinimoResidencial;


    // Verificação se o valor da primeira faixa ultrapassa o valor correto (3,83)
    let firstTierRate = valorExcedenteComLoja / consumoTotalApartamentos;

    if (firstTierRate <= 3.83) {
        // Array para armazenar os valores multiplicados pela primeira faixa
        const resultPrimeiraFaixa = consumosApartamentos.map(consumo => consumo * firstTierRate);

        if (consumoCondominio > 0) {
            const ultimoItem1 = resultPrimeiraFaixa[resultPrimeiraFaixa.length - 1];
            valorCondomínio = (ultimoItem1) / numberOfApartments;
            // Removendo o último item do array, no caso o condomínio.
            resultPrimeiraFaixa.pop();
            consumosApartamentos.pop();
        }

        console.log('Valor da primeira faixa: ' + firstTierRate.toFixed(4));
        console.log('Valor do condomínio: R$ ' + (valorCondomínio.toFixed(2)));

        const consumosLoja = consumosApartamentos.slice(numberOfApartments);
        const resultPrimeiraFaixaLoja = resultPrimeiraFaixa.slice(numberOfApartments);

        // Cálculo da cobrança para cada apartamento
        consumosApartamentos.length -= numberOfLojas; // removendo a loja para cálculo dos apartamenos

        const cobrancasPorApartamento = consumosApartamentos.map((consumo, index) => {
            const firstTierValue = resultPrimeiraFaixa[index]; // Acesso ao valor correspondente de resultPrimeiraFaixa usando o índice
            return firstTierValue + taxaFixaApartamentos + valorCondomínio;
        });

        const cobrancasPorLoja = consumosLoja.map((consumo, index) => {
            const firstTierValue = resultPrimeiraFaixaLoja[index]; // Acesso ao valor correspondente de resultPrimeiraFaixa usando o índice
            return firstTierValue + taxaFixaLoja;
        });


        // Saída dos resultados
        console.log(`Cobrança por apartamento:`);
        cobrancasPorApartamento.forEach((cobranca, index) => console.log(`Apartamento ${index + 1}: R$ ${cobranca.toFixed(2)}`));

        // Saída dos resultados
        cobrancasPorLoja.forEach((cobranca, index) => console.log(`Loja ${index + 1}: R$ ${cobranca.toFixed(2)}`));

    } else {
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
        let secondTierRate = (valorExcedenteComLoja - totalFirstTierValue) / consumoTotalSegundaFaixa;

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

            console.log('Valor da primeira faixa: ' + firstTierRate.toFixed(4));
            console.log('Valor da segunda faixa: ' + secondTierRate.toFixed(4));
            console.log('Valor do condomínio: R$ ' + (valorCondomínio.toFixed(2)));

            const consumosLoja = consumosApartamentos.slice(numberOfApartments);
            const resultPrimeiraFaixaLoja = resultPrimeiraFaixa.slice(numberOfApartments)
            const resultSegundaFaixaLoja = resultSegundaFaixa.slice(numberOfApartments)

            // Cálculo da cobrança para cada apartamento
            consumosApartamentos.length -= numberOfLojas; // removendo a loja para cálculo dos apartamenos

            const cobrancasPorApartamento = consumosApartamentos.map((consumo, index) => {
                const firstTierValue = resultPrimeiraFaixa[index]; // Acesso ao valor correspondente de resultPrimeiraFaixa usando o índice
                const secondTierValue = resultSegundaFaixa[index]; // Acesso ao valor correspondente de resultSegundaFaixa usando o índice
                return firstTierValue + secondTierValue + taxaFixaApartamentos + valorCondomínio;
            });

            // Cálculo da cobrança para cada loja
            const cobrancasPorLoja = consumosLoja.map((consumo, index) => {
                const firstTierValue = resultPrimeiraFaixaLoja[index]; // Acesso ao valor correspondente de resultPrimeiraFaixa usando o índice
                const secondTierValue = resultSegundaFaixaLoja[index]; // Acesso ao valor correspondente de resultSegundaFaixa usando o índice
                return firstTierValue + secondTierValue + taxaFixaLoja;
            });

            // Saída dos resultados
            console.log(`Cobrança por apartamento:`);
            cobrancasPorApartamento.forEach((cobranca, index) => console.log(`Apartamento ${index + 1}: R$ ${cobranca.toFixed(2)}`));

            cobrancasPorLoja.forEach((cobranca, index) => console.log(`Loja ${index + 1}: R$ ${cobranca.toFixed(2)}`));

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

            let thirdTierRate = (valorExcedenteComLoja - totalFirstTierValue - totalSecondTierValue) / consumoTotalTerceiraFaixa;

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

                console.log('Valor da 1° faixa: ' + firstTierRate.toFixed(4));
                console.log('Valor da 2° faixa: ' + secondTierRate.toFixed(4));
                console.log('Valor da 3° faixa: ' + thirdTierRate.toFixed(4));
                console.log('Valor do condomínio: R$ ' + (valorCondomínio.toFixed(2)));

                const consumosLoja = consumosApartamentos.slice(numberOfApartments);
                const resultPrimeiraFaixaLoja = resultPrimeiraFaixa.slice(numberOfApartments)
                const resultSegundaFaixaLoja = resultSegundaFaixa.slice(numberOfApartments)
                const resultTerceiraFaixaLoja = resultTerceiraFaixa.slice(numberOfApartments)

                // Cálculo da cobrança para cada apartamento
                consumosApartamentos.length -= numberOfLojas; // removendo a loja para cálculo dos apartamenos

                const cobrancasPorApartamento = consumosApartamentos.map((consumo, index) => {
                    const firstTierValue = resultPrimeiraFaixa[index]; // Acesso ao valor correspondente de resultPrimeiraFaixa usando o índice
                    const secondTierValue = resultSegundaFaixa[index]; // Acesso ao valor correspondente de resultSegundaFaixa usando o índice
                    const thirdTierValue = resultTerceiraFaixa[index]; // Acesso ao valor correspondente de resultTerceiraFaixa usando o índice
                    return firstTierValue + secondTierValue + thirdTierValue + taxaFixaApartamentos + valorCondomínio;
                });

                const cobrancasPorLoja = consumosLoja.map((consumo, index) => {
                    const firstTierValue = resultPrimeiraFaixaLoja[index]; // Acesso ao valor correspondente de resultPrimeiraFaixa usando o índice
                    const secondTierValue = resultSegundaFaixaLoja[index]; // Acesso ao valor correspondente de resultSegundaFaixa usando o índice
                    const thirdTierValue = resultTerceiraFaixaLoja[index]; // Acesso ao valor correspondente de resultTerceiraFaixa usando o índice
                    return firstTierValue + secondTierValue + thirdTierValue + taxaFixaLoja;
                });

                // Saída dos resultados
                console.log(`Cobrança por apartamento:`);
                cobrancasPorApartamento.forEach((cobranca, index) => console.log(`Apartamento ${index + 1}: R$ ${cobranca.toFixed(2)}`));

                cobrancasPorLoja.forEach((cobranca, index) => console.log(`Loja ${index + 1}: R$ ${cobranca.toFixed(2)}`));
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

                let fourthTierRate = (valorExcedenteComLoja - totalFirstTierValue - totalSecondTierValue - totalThirdTierValue) / consumoTotalQuartaFaixa;

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

                    const consumosLoja = consumosApartamentos.slice(numberOfApartments);
                    const resultPrimeiraFaixaLoja = resultPrimeiraFaixa.slice(numberOfApartments)
                    const resultSegundaFaixaLoja = resultSegundaFaixa.slice(numberOfApartments)
                    const resultTerceiraFaixaLoja = resultTerceiraFaixa.slice(numberOfApartments)
                    const resultQuartaFaixaLoja = resultQuartaFaixa.slice(numberOfApartments)


                    // Cálculo da cobrança para cada apartamento
                    consumosApartamentos.length -= numberOfLojas; // removendo a loja para cálculo dos apartamenos

                    const cobrancasPorApartamento = consumosApartamentos.map((consumo, index) => {
                        const firstTierValue = resultPrimeiraFaixa[index]; // Acesso ao valor correspondente de resultPrimeiraFaixa usando o índice
                        const secondTierValue = resultSegundaFaixa[index]; // Acesso ao valor correspondente de resultSegundaFaixa usando o índice
                        const thirdTierValue = resultTerceiraFaixa[index]; // Acesso ao valor correspondente de resultTerceiraFaixa usando o índice
                        const fourthTierRate = resultQuartaFaixa[index]; // Acesso ao valor correspondente de resultQuartaFaixa usando o índice
                        return firstTierValue + secondTierValue + thirdTierValue + fourthTierRate + taxaFixaApartamentos + valorCondomínio;
                    });

                    const cobrancasPorLoja = consumosLoja.map((consumo, index) => {
                        const firstTierValue = resultPrimeiraFaixaLoja[index]; // Acesso ao valor correspondente de resultPrimeiraFaixa usando o índice
                        const secondTierValue = resultSegundaFaixaLoja[index]; // Acesso ao valor correspondente de resultSegundaFaixa usando o índice
                        const thirdTierValue = resultTerceiraFaixaLoja[index]; // Acesso ao valor correspondente de resultTerceiraFaixa usando o índice
                        const fourthTierValue = resultQuartaFaixaLoja[index]; // Acesso ao valor correspondente de resultQuartaFaixa usando o índice
                        return firstTierValue + secondTierValue + thirdTierValue + fourthTierValue + taxaFixaLoja;
                    });

                    // Saída dos resultados
                    console.log(`Cobrança por apartamento:`);
                    cobrancasPorApartamento.forEach((cobranca, index) => console.log(`Apartamento ${index + 1}: R$ ${cobranca.toFixed(2)}`));

                    cobrancasPorLoja.forEach((cobranca, index) => console.log(`Loja ${index + 1}: R$ ${cobranca.toFixed(2)}`));

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

                    let fifthTierRate = (valorExcedenteComLoja - totalFirstTierValue - totalSecondTierValue - totalThirdTierValue - totalfourhTierValue) / consumoTotalQuintaFaixa;

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

                        const consumosLoja = consumosApartamentos.slice(numberOfApartments);
                        const resultPrimeiraFaixaLoja = resultPrimeiraFaixa.slice(numberOfApartments)
                        const resultSegundaFaixaLoja = resultSegundaFaixa.slice(numberOfApartments)
                        const resultTerceiraFaixaLoja = resultTerceiraFaixa.slice(numberOfApartments)
                        const resultQuartaFaixaLoja = resultQuartaFaixa.slice(numberOfApartments)
                        const resultQuintaFaixaLoja = resultQuintaFaixa.slice(numberOfApartments)

                        // Cálculo da cobrança para cada apartamento
                        consumosApartamentos.length -= numberOfLojas; // removendo a loja para cálculo dos apartamenos

                        const cobrancasPorApartamento = consumosApartamentos.map((consumo, index) => {
                            const firstTierValue = resultPrimeiraFaixa[index]; // Acesso ao valor correspondente de resultPrimeiraFaixa usando o índice
                            const secondTierValue = resultSegundaFaixa[index]; // Acesso ao valor correspondente de resultSegundaFaixa usando o índice
                            const thirdTierValue = resultTerceiraFaixa[index]; // Acesso ao valor correspondente de resultTerceiraFaixa usando o índice
                            const fourthTierRate = resultQuartaFaixa[index]; // Acesso ao valor correspondente de resultQuartaFaixa usando o índice
                            const fifthTierRate = resultQuintaFaixa[index]; // Acesso ao valor correspondente de resultQuintaFaixa usando o índice
                            return firstTierValue + secondTierValue + thirdTierValue + fourthTierRate + fifthTierRate + taxaFixaApartamentos + valorCondomínio;
                        });

                        const cobrancasPorLoja = consumosLoja.map((consumo, index) => {
                            const firstTierValue = resultPrimeiraFaixaLoja[index]; // Acesso ao valor correspondente de resultPrimeiraFaixa usando o índice
                            const secondTierValue = resultSegundaFaixaLoja[index]; // Acesso ao valor correspondente de resultSegundaFaixa usando o índice
                            const thirdTierValue = resultTerceiraFaixaLoja[index]; // Acesso ao valor correspondente de resultTerceiraFaixa usando o índice
                            const fourthTierValue = resultQuartaFaixaLoja[index]; // Acesso ao valor correspondente de resultQuartaFaixa usando o índice
                            const fifthTierValue = resultQuintaFaixaLoja[index]; // Acesso ao valor correspondente de resultQuintaFaixa usando o índice
                            return firstTierValue + secondTierValue + thirdTierValue + fourthTierValue + fifthTierValue + taxaFixaLoja;
                        });

                        // Saída dos resultados
                        console.log(`Cobrança por apartamento:`);
                        cobrancasPorApartamento.forEach((cobranca, index) => console.log(`Apartamento ${index + 1}: R$ ${cobranca.toFixed(2)}`));

                        cobrancasPorLoja.forEach((cobranca, index) => console.log(`Loja ${index + 1}: R$ ${cobranca.toFixed(2)}`));

                    }

                    else {
                        console.log('Erro: ', 'Calculo passou por todas as faixas ')

                    }
                }
            }
        }
    }
}

module.exports = {
    passarFaixasLoja: passarFaixasLoja
}