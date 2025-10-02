import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(2, 'O nome deve ter no mínimo 2 caracteres!'),
    email: z.string().email('Email inválido! Tente novamente.'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres!'),
    phone: z.string().min(10, 'Telefone inválido! Tente novamente.'),
});

export const loginSchema = z.object({
    email: z.string().email('Email inválido! Tente novamente.'),
    password: z.string().min(6, 'Senha incorreta! Tente novamente.'),
});