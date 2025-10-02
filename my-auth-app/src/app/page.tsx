'use client'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { loginSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import z from "zod";

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage(){
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    
    const form = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: LoginForm) =>{
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        });

        if (error) {
            toast('Erro ao fazer login', {
                description: error.message,
                duration: 4000,
            });
        } else {
            toast('Login realizado com sucesso!', {
                duration: 4000,
            });
            router.push('/dashboard');
            router.refresh();
        }
        setLoading(false);
    }

    return(
        <div className="min-h-screen flex items-center justify-center font-sans">
          <Toaster position="top-center" richColors />
          <Card className="w-[450px] border-0 shadow-none">
            <CardHeader className="space-y-1 text-center mb-4">
              <CardTitle className="text-[22px] font-bold">Login</CardTitle>
              <CardDescription>Acesse sua conta para continuar</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="seuemail@exemplo.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Digite sua senha" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
                    {loading ? 'Carregando...' : 'Entrar'}
                  </Button>
                </form>
              </Form>
              <div className='mt-4 text-center text-sm text-muted-foreground'>
                Ainda não tem uma conta?{' '}
                <a href="/register" className='text-primary underline'>Cadastre-se</a>
              </div>
            </CardContent>
          </Card> 
        </div>
    )
}