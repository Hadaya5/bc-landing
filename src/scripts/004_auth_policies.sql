-- Update RLS policies to work with authentication
-- This script updates the policies to allow authenticated users to manage courses

-- Drop existing policies
DROP POLICY IF EXISTS "courses_select_all" ON public.courses;
DROP POLICY IF EXISTS "courses_insert_auth" ON public.courses;
DROP POLICY IF EXISTS "courses_update_auth" ON public.courses;
DROP POLICY IF EXISTS "courses_delete_auth" ON public.courses;

-- Create new policies for authenticated users
-- Allow anyone to read courses (public access)
CREATE POLICY "courses_select_public" 
  ON public.courses FOR SELECT 
  USING (true);

-- Allow authenticated users to insert courses
CREATE POLICY "courses_insert_authenticated" 
  ON public.courses FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

-- Allow authenticated users to update courses
CREATE POLICY "courses_update_authenticated" 
  ON public.courses FOR UPDATE 
  USING (auth.uid() IS NOT NULL);

-- Allow authenticated users to delete courses
CREATE POLICY "courses_delete_authenticated" 
  ON public.courses FOR DELETE 
  USING (auth.uid() IS NOT NULL);

-- Enable RLS (should already be enabled, but just in case)
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
