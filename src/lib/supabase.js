import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://feftdttbnbsacxohrtlv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlZnRkdHRibmJzYWN4b2hydGx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE3MTg1NTYsImV4cCI6MjEwNzI5NDU1Nn0.86ZyXmzVi8l2D3qra7YR-deytBi8TuM6o7h_WDkZjvw";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
