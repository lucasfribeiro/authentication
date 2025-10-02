import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function createClientServer() {
     return createServerClient(
       supabaseUrl,
       supabaseAnonKey,
       {
         cookies: {
           get: (name) => undefined, 
         },
       }
     );
   }