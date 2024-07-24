import { sql } from '@vercel/postgres';
import {
  InvoiceForm,
  Revenue,
  CondominioField,
  CondominioForm,
  LatestCondominio,
  HistoricoForm,
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchRevenue() {
  noStore();
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)



    const data = await sql<Revenue>`SELECT * FROM revenue`;

    console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchTarifas() {
  noStore();
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    const residencialPromise = await sql`SELECT categoria, faixa, agua, esgoto, total 
    FROM tarifas WHERE categoria = 'Residencial'
    ORDER BY categoria DESC, 
        CASE 
            WHEN faixa ILIKE 'Fixa' THEN 0
            WHEN faixa ILIKE '1ª%' THEN 1
            WHEN faixa ILIKE '2ª%' THEN 2
            WHEN faixa ILIKE '3ª%' THEN 3
            WHEN faixa ILIKE '4ª%' THEN 4
            WHEN faixa ILIKE '5ª%' THEN 5
            WHEN faixa ILIKE '6ª%' THEN 6
            ELSE 7
        END;`;

    const comercialPromise = await sql`SELECT categoria, faixa, agua, esgoto, total 
        FROM tarifas WHERE categoria = 'Comercial'
        ORDER BY categoria DESC, 
            CASE 
                WHEN faixa ILIKE 'Fixa' THEN 0
                WHEN faixa ILIKE '1ª%' THEN 1
                WHEN faixa ILIKE '2ª%' THEN 2
                WHEN faixa ILIKE '3ª%' THEN 3
                WHEN faixa ILIKE '4ª%' THEN 4
                WHEN faixa ILIKE '5ª%' THEN 5
                WHEN faixa ILIKE '6ª%' THEN 6
                ELSE 7
            END;`;

    const data = await Promise.all([
      residencialPromise,
      comercialPromise
    ]);

    const residencial = data[0].rows;
    const comercial = data[1].rows;

    return { residencial, comercial }
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tarifas data.');
  }
}

/*
export async function fetchLatestInvoices() {
  noStore();
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}
*/
export async function fetchLatestCondominio() {
  noStore();
  try {
    const data = await sql<LatestCondominio>`
      SELECT condominios.id, condominios.nome
      FROM condominios
      ORDER BY id DESC
      LIMIT 11`;

    const latestCondominios = data.rows.map((condominio) => ({
      ...condominio,
    }));
    return latestCondominios;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest condominios.');
  }
}

export async function fetchCardData() {
  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const condominioCountPromise = sql`SELECT COUNT(*) FROM condominios`;
    const apartamentosCountPromise = sql`SELECT SUM(array_length(string_to_array(apartamentos, ','), 1)) AS count
      FROM condominios`;
    const lojasCountPromise = sql`SELECT SUM(array_length(string_to_array(lojas, ','), 1)) AS count
      FROM condominios`;
    const ultimoCadastradoPromise = sql`SELECT nome FROM condominios ORDER BY id DESC LIMIT 1`;
    /*const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;
    */
    const data = await Promise.all([
      condominioCountPromise,
      apartamentosCountPromise,
      lojasCountPromise,
      ultimoCadastradoPromise,
    ]);
    const numberOfCondominios = Number(data[0].rows[0].count ?? '0');
    const numberOfApartamentos = Number(data[1].rows[0].count ?? '0');
    const numberOfLojas = Number(data[2].rows[0].count ?? '0');
    const ultimoCadastrado = data[3].rows[0]?.nome ?? 'N/A';
    //const totalPaidInvoices = formatCurrency(data[3].rows[0].paid ?? '0');
    //const totalPendingInvoices = formatCurrency(data[3].rows[0].pending ?? '0');

    return {
      numberOfCondominios,
      numberOfApartamentos,
      numberOfLojas,
      ultimoCadastrado,
      //totalPaidInvoices,
      //totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}
/*
const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        condominio.name,
        condominio.email,
        condominio.image_url
      FROM invoices
      JOIN condominio ON invoices.customer_id = condominio.id
      WHERE
        condominio.name ILIKE ${`%${query}%`} OR
        condominio.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}
*/
/*
export async function fetchInvoicesPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN condominio ON invoices.customer_id = condominio.id
    WHERE
      condominio.name ILIKE ${`%${query}%`} OR
      condominio.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}
*/
export async function fetchInvoiceById(id: string) {
  noStore();
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));
    console.log(invoice); // Invoice is an empty array []
    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCondominios() {
  try {
    const data = await sql<CondominioField>`
      SELECT
        id,
        nome
      FROM condominios
      ORDER BY nome ASC
    `;

    const condominios = data.rows;
    return condominios;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all condominioooos.');
  }
}

const ITEMS_PER_PAGE_CONDOMINIOS = 6;
export async function fetchFilteredCondominiums(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE_CONDOMINIOS;

  try {
    const data = await sql`
      SELECT
        condominios.id,
        condominios.nome,
        condominios.apartamentos,
        condominios.lojas,
        (
          SELECT COUNT(*)
          FROM (
            SELECT UNNEST(string_to_array(condominios.apartamentos, ',')) AS apartment
          ) AS apartment_list
        ) AS total_apartamentos,
        (
          SELECT COUNT(*)
          FROM (
            SELECT UNNEST(string_to_array(condominios.lojas, ',')) AS loja
          ) AS loja_list
        ) AS total_lojas,
        COUNT(condominios.id) OVER() AS total_condominios,
        CASE
          WHEN condominios.msg IS NULL OR condominios.msg = '' THEN 'Não'
          ELSE 'Sim'
        END AS msg_status
      FROM condominios
      WHERE
        UNACCENT(condominios.nome) ILIKE ${'%' + query + '%'}
      GROUP BY condominios.id, condominios.nome, condominios.apartamentos, condominios.lojas, condominios.msg
      ORDER BY UNACCENT(LOWER(condominios.nome)) ASC
      LIMIT ${ITEMS_PER_PAGE_CONDOMINIOS} OFFSET ${offset}
    `;

    const condominios = data.rows.map((condominio) => ({
      ...condominio,
    }));

    return condominios;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    console.error('Database Error:', errorMessage);
    throw new Error('Failed to fetch condominiums table.');
  }
}



export async function fetchCondominiosById(id: string) {
  noStore();
  try {
    const data = await sql<CondominioForm>`
       SELECT
  condominios.id,
  condominios.nome,
  condominios.apartamentos,
  condominios.lojas,
  condominios.msg,
  (
    SELECT COUNT(*)
    FROM (
      SELECT UNNEST(string_to_array(condominios.apartamentos, ',')) AS apartment
    ) AS apartment_list
  ) AS total_apartamentos,
  (
    SELECT COUNT(*)
    FROM (
      SELECT UNNEST(string_to_array(condominios.lojas, ',')) AS loja
    ) AS loja_list
  ) AS total_lojas
FROM condominios
WHERE condominios.id = ${id};
    `;

    const condominios = data.rows.map((condominio) => ({
      ...condominio,
    }));

    console.log(condominios); // Invoice is an empty array []
    return condominios[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch condominios.');
  }
}


export async function fetchCondominiosPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM condominios    
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE_CONDOMINIOS);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of condominios.');
  }
}

export async function fetchHistoricosyId(id: string) {
  noStore();
  try {
    const data = await sql<HistoricoForm>`
       SELECT
          historicoresultados.id,
          historicoresultados.condominio_id,
          historicoresultados.data,
          historicoresultados.resultado
       FROM historicoresultados
       WHERE historicoresultados.condominio_id = ${id};
    `;

    const historicos = data.rows.map((historico) => ({
      ...historico,
    }));

    console.log(historicos); // Deve mostrar um array de objetos
    return historicos; // Retorne o array completo, não apenas o primeiro item
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch historico.');
  }
}
