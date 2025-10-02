'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { registerSchema } from '@/lib/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import z, { set } from 'zod';

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: '',
            password: '',
            phone: '',
            name: '',
        },
    });

    const onSubmit = async (data: RegisterForm) =>{
        setLoading(true);
        const { error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options:{
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            }
        });

        if(error){
            toast('Erro ao cadastrar', {
                description: error.message,
                duration: 4000,
            });
        } else{
            toast('Cadastro realizado! Verifique seu email para confirmar sua conta.', {
                duration: 4000,
            });
            router.push('./');
        }
        setLoading(false);
    }

    return(
       <div className='min-h-screen flex items-center justify-center font-sans'>
        <Toaster position="top-center" richColors />
        <Card className='w-[450px] border-0 shadow-none'>
        <CardHeader className='space-y-1 text-center mb-4'>
            <CardTitle className='text-[22px] font-bold'>Cadastrar-se</CardTitle>
            <CardDescription>Crie uma conta para continuar</CardDescription>
        </CardHeader>
        <CardContent >
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField control={form.control} name='name' render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                            <Input placeholder='Nome aqui' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name='phone' render={({ field }) => (
                    <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                            <Input placeholder='Telefone aqui' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name='email' render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder='seuemail@email.com' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name='password' render={({ field }) => (
                    <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                            <Input type='password' placeholder='Digite sua senha' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <Button type='submit' className='w-full cursor-pointer' disabled={loading}>
                    {loading ? 'Carregando...' : 'Cadastrar'}
                </Button>
                </form>
            </Form>
            <div className='mt-4 text-center text-sm text-muted-foreground'>
                Já tem uma conta?{' '}
                <a href="./" className='text-primary underline'>Faça login</a>
            </div>
        </CardContent>
        </Card>
       </div>
    )
}