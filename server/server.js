// server/server.js

const express = require('express');
const next = require('next');
const { exec } = require('child_process');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());

    server.post('/process-login', (req, res) => {
        const { valorConta, consumoConta, numberOfApartments, numberOfLojas, consumosApartamentosIndividuais } = req.body;

        exec(`node ${path.join(__dirname, 'script.js')} "${valorConta}" "${consumoConta}" "${numberOfApartments}" "${numberOfLojas}" "${consumosApartamentosIndividuais}"`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Erro na execução do script: ${error.message}`);
                res.status(500).json({ error: `Erro na execução do script: ${error.message}` });
                return;
            }
            if (stderr) {
                console.error(`Erro no script: ${stderr}`);
                res.status(500).json({ error: `Erro no script: ${stderr}` });
                return;
            }

            const resultado = JSON.parse(stdout);
            console.log('Resultado do script:', resultado);

            // Redireciona para a rota /resultado com os resultados como query params
            res.redirect(`/dashboard/results?data=${encodeURIComponent(JSON.stringify(resultado))}`);
        });
    });

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(3000, (err) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
});
