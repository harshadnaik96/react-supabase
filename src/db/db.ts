import { createClient } from "@supabase/supabase-js";

const DB_URL = import.meta.env.VITE_DB_URL;
const DB_SECRET_KEY = import.meta.env.VITE_DB_SECRET_KEY;

export const db = createClient(DB_URL, DB_SECRET_KEY);
