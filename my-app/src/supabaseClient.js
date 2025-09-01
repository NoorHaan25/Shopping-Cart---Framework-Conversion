import { createClient } from '@supabase/supabase-js'

// ده الـ URL و الـ anon key اللي عندك من Supabase
const supabaseUrl = 'https://siffunrtqpwjrzshgocm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpZmZ1bnJ0cXB3anJ6c2hnb2NtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYyMTg2MDIsImV4cCI6MjA3MTc5NDYwMn0.uqxND7TpMOKNRqkNKDNXn5KlHukRMIyf89ojovFBjr8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)