import { createClient } from "@supabase/supabase-js";

const base_url = "https://ivocmnvocothdwolpkmt.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2b2NtbnZvY290aGR3b2xwa210Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY5ODU5MzcsImV4cCI6MjAzMjU2MTkzN30.m46Yz-TaYJMlyfzUj55ORJY3ogYTFEpnrE72yXztHPw";
const supabase = createClient(base_url, key);

export default supabase;
