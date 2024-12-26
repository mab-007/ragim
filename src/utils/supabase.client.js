import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const NEXT_PUBLIC_SUPABASE_URL = 'https://bshrfukmdupmguaegojl.supabase.co';
const NEXT_PUBLIC_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzaHJmdWttZHVwbWd1YWVnb2psIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyNjcyNjQsImV4cCI6MjA0Nzg0MzI2NH0.k7wuAok5u2jwLWFo3skxPh3hkD8vFmlitUGnXorbdDM';

export const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY);