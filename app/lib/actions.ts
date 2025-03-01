'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce
        .number()
        .gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),
})

const FormSchemaa = z.object({
    id: z.string(),
    nome: z.string(),
    apartamentos: z.string(),
    lojas: z.string(),
    msg: z.string(),
});

const FormSchemaaa = z.object({
    id: z.string(),
    condominio_id: z.string(),
    data: z.string(),
    resultado: z.string()
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });


export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};

export type State1 = {
    errors?: {
        nome?: string[];
        apartamentos?: string[];
        lojas?: string[];
        msg?: string[];
    };
    message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    // Prepare data for insertion into the database
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    try {
        await sql`
          INSERT INTO invoices (customer_id, amount, status, date)
          VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
        `;
    } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
            message: 'Database Error: Failed to Create Invoice.',
        };
    }

    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function updateInvoice(
    id: string,
    prevState: State,
    formData: FormData,
) {
    const validatedFields = UpdateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Invoice.',
        };
    }

    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;

    try {
        await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
    } catch (error) {
        return { message: 'Database Error: Failed to Update Invoice.' };
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
    try {
        await sql`DELETE FROM invoices WHERE id = ${id}`;
        revalidatePath('/dashboard/invoices');
        return { message: 'Deleted Invoice.' };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Invoice.' };
    }

}

const CreateCondominium = FormSchemaa.omit({ id: true });
const UpdateCondominium = FormSchemaa.omit({ id: true });
const CreateHistoricoCondominium = FormSchemaaa.omit({ id: true });


export async function createCondominium(prevState: State, formData: FormData) {
    const { nome, apartamentos, lojas, msg } = CreateCondominium.parse({
        nome: formData.get('nome'),
        apartamentos: formData.get('apartamentos'),
        lojas: formData.get('lojas'),
        msg: formData.get('msg'),
    });
    try {
        await sql`
          INSERT INTO condominios (nome, apartamentos, lojas, msg)
          VALUES (${nome}, ${apartamentos}, ${lojas}, ${msg})
        `;
    } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
            message: 'Database Error: Failed to Create Invoice.',
        };
    }

    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard/condominio');
    redirect('/dashboard/condominio');
}

export async function updateCondominium(
    id: string,
    prevState: State1,
    formData: FormData,
) {
    const validatedFields = UpdateCondominium.safeParse({
        nome: formData.get('nome'),
        apartamentos: formData.get('apartamentos'),
        lojas: formData.get('lojas'),
        msg: formData.get('msg'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Invoice.',
        };
    }

    const { nome, apartamentos, lojas, msg } = validatedFields.data;

    try {
        await sql`
        UPDATE condominios
        SET nome = ${nome}, apartamentos = ${apartamentos}, lojas = ${lojas}, msg = ${msg}
        WHERE id = ${id}
      `;
    } catch (error) {
        return { message: 'Database Error: Failed to Update Condominio.' };
    }

    revalidatePath('/dashboard/condominio');
    redirect('/dashboard/condominio');
}

export async function deleteCondominium(id: string) {
    try {
        await sql`DELETE FROM condominios WHERE id = ${id}`;
        revalidatePath('/dashboard/costumers');
        return { message: 'Deleted condominio.' };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Condominio.' };
    }

}

export async function createHistoricoCondominium(prevState: any, formData: FormData) {
    const { condominio_id, data, resultado } = CreateHistoricoCondominium.parse({
        condominio_id: formData.get('condominio_id'),
        data: formData.get('data'),
        resultado: formData.get('resultado'),
    });

    // Formatar a data para o formato YYYY-MM-DD
    const formattedDate = new Date(data).toISOString().split('T')[0];
    const dataMes = new Date(data).toISOString().slice(0, 7); // Formato YYYY-MM

    try {
        // Verificar se já existe um registro para o mesmo mês e ano
        const result = await sql`
          SELECT id FROM HistoricoResultados
          WHERE condominio_id = ${condominio_id}
          AND to_char(data, 'YYYY-MM') = ${dataMes}`;

        const existing = result.rows; // Acesso aos resultados da consulta

        if (existing.length > 0) {
            // Se existir, retorna a informação de que já existe uma entrada
            return {
                status: 'exists',
                message: 'Já existe um histórico para este mês. Deseja substituir?',
                existingId: existing[0].id
            };
        } else {
            // Se não existir, salva o novo histórico
            await sql`
              INSERT INTO HistoricoResultados (condominio_id, data, resultado)
              VALUES (${condominio_id}, ${formattedDate}, ${resultado})
            `;
            // Revalidar o cache para a página de condomínios e redirecionar o usuário.
            revalidatePath('/dashboard/condominio');
            // Retornar status de sucesso
            return {
                status: 'success',
            };
        }
    } catch (error) {
        // Se ocorrer um erro no banco de dados, retornar um erro específico.
        return {
            message: 'Database Error: Failed to Create Historico.',
        };
    }
}

export async function replaceHistoricoCondominium(existingId: string, formData: FormData) {
    const { data, resultado } = CreateHistoricoCondominium.parse({
        condominio_id: formData.get('condominio_id'),
        data: formData.get('data'),
        resultado: formData.get('resultado'),
    });

    // Formatar a data para o formato YYYY-MM-DD
    const formattedDate = new Date(data).toISOString().split('T')[0];

    try {
        // Substituir o histórico existente
        await sql`
          UPDATE HistoricoResultados
          SET data = ${formattedDate}, resultado = ${resultado}
          WHERE id = ${existingId}
        `;
        // Revalidar o cache para a página de condomínios e redirecionar o usuário.
        revalidatePath('/dashboard/condominio');
        // Retornar status de sucesso
        return {
            status: 'success',
        };
    } catch (error) {
        // Se ocorrer um erro no banco de dados, retornar um erro específico.
        return {
            message: 'Database Error: Failed to Replace Historico.',
        };
    }
}

export async function deleteHistorico(id: string) {
    try {
        await sql`DELETE FROM HistoricoResultados WHERE id = ${id}`;
        revalidatePath('/dashboard/costumers');
        return { message: 'Deleted condominio.' };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete histórico.' };
    }

}