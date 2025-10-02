   'use client';
   import { useEffect, useState } from 'react';
   import { useRouter } from 'next/navigation';
   import { supabase } from '@/lib/supabase';
   import { Button } from '@/components/ui/button';
   import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

   export default function Dashboard() {
     const router = useRouter();
     const [user, setUser ] = useState<any>(null);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
       const getUser  = async () => {
         const { data: { user } } = await supabase.auth.getUser ();
         if (!user) 
         setUser (user);
         setLoading(false);
       };
       getUser ();

       const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
         if (!session) router.push('./');
       });

       return () => subscription.unsubscribe();
     }, [router]);

     if (loading) return <div>Loading...</div>;

     const handleLogout = async () => {
       await supabase.auth.signOut();
       router.push('./');
     };

     return (
       <div className="min-h-screen flex items-center justify-center bg-gray-50">
         <Card className="w-[400px]">
           <CardHeader>
             <CardTitle>Welcome, {user?.email}!</CardTitle>
           </CardHeader>
           <CardContent>
             <Button onClick={handleLogout} className="w-full">Logout</Button>
           </CardContent>
         </Card>
       </div>
     );
   }
   