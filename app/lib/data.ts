import { sql } from '@vercel/postgres';
import {
  CustomerField,
  condominioTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
  CondominiosTable,
  CondominioField,
  CondominioForm,
} from './definitions';
import { formatCurrency } from './utils';
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
/*
export async function fetchLatestInvoices() {
  noStore();
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, condominio.name, condominio.image_url, condominio.email, invoices.id
      FROM invoices
      JOIN condominio ON invoices.customer_id = condominio.id
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
export async function fetchCardData() {
  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const condominioCountPromise = sql`SELECT COUNT(*) FROM condominios`;
    //const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    //const customerCountPromise = sql`SELECT COUNT(*) FROM condominio`;
    /*const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;
    */
    const data = await Promise.all([
      condominioCountPromise,
      //invoiceCountPromise,
      //customerCountPromise,
      //invoiceStatusPromise,
    ]);
    const numberOfCondominios = Number(data[0].rows[0].count ?? '0');
    //const numberOfInvoices = Number(data[1].rows[0].count ?? '0');
    //const numberOfcondominio = Number(data[1].rows[0].count ?? '0');
    //const totalPaidInvoices = formatCurrency(data[3].rows[0].paid ?? '0');
    //const totalPendingInvoices = formatCurrency(data[3].rows[0].pending ?? '0');

    return {
      numberOfCondominios,
      //numberOfcondominio,
      //numberOfInvoices,
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

const ITEMS_PER_PAGE_CONDOMINIOS = 10;
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
        condominios.nome ILIKE ${'%' + query + '%'}
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