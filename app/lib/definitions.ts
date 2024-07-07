// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};


export type condominioTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedcondominioTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type FormattedCondominiosTable = {
  id: string;
  name: string;
  apartamentos: string;
  lojas: string;
};

export type CondominioField = {
  id: string;
  name: string;
};

export type CondominioForm = {
  id: string;
  nome: string;
  apartamentos: string;
  lojas: string;
  msg: string;
  total_apartamentos: string;
  total_lojas: string;

};

export type TarifasForm = {
  id: string;
  categoria: string;
  faixa: string;
  agua: string;
  esgoto: string;
  total: string;
};

export type CondominiosTable = {
  id: string;
  name: string;
  apartamentos: string;
  loja: string;
};

export type CondominioFormCalculo = {
  id: string;
  nome: string;
  apartamentos: string;
  lojas: string;
  total_apartamentos: string;
  total_lojas: string;
};

export type LatestCondominio = {
  id: string;
  nome: string;
};

export type Resultado = {
  valorFaixa1: string;
  valorFaixa2: string;
  valorFaixa3: string;
  valorFaixa4: string;
  valorFaixa5: string;
  valorFaixa6: string;
  valorCondominio: string;
  cobrancaPorApartamento: { [apartamento: string]: string }[];
  cobrancaPorLoja: { [loja: string]: string }[];
  Erro: string;
};
