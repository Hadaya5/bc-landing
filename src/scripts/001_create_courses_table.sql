-- Create courses table for Baila Ciencias
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  instructor TEXT NOT NULL,
  category TEXT NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('Principiante', 'Intermedio', 'Avanzado')),
  duration TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for security
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (courses are public)
-- But only authenticated users can manage them
CREATE POLICY "courses_select_all" 
  ON public.courses FOR SELECT 
  USING (true);

CREATE POLICY "courses_insert_auth" 
  ON public.courses FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "courses_update_auth" 
  ON public.courses FOR UPDATE 
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "courses_delete_auth" 
  ON public.courses FOR DELETE 
  USING (auth.uid() IS NOT NULL);

-- Insert some sample courses
INSERT INTO public.courses (title, description, instructor, category, level, duration, price, image_url) VALUES
('Salsa Básica', 'Aprende los pasos fundamentales de la salsa cubana con ritmo y estilo.', 'María González', 'Salsa', 'Principiante', '8 semanas', 120.00, '/placeholder.svg?height=300&width=400'),
('Bachata Sensual', 'Domina la bachata sensual con movimientos fluidos y conexión.', 'Carlos Rodríguez', 'Bachata', 'Intermedio', '6 semanas', 150.00, '/placeholder.svg?height=300&width=400'),
('Merengue Tradicional', 'Descubre la alegría del merengue dominicano tradicional.', 'Ana Martínez', 'Merengue', 'Principiante', '4 semanas', 80.00, '/placeholder.svg?height=300&width=400'),
('Salsa Avanzada', 'Perfecciona tu técnica con figuras complejas y estilo propio.', 'Luis Fernández', 'Salsa', 'Avanzado', '10 semanas', 200.00, '/placeholder.svg?height=300&width=400'),
('Bachata Moderna', 'Explora las nuevas tendencias de la bachata contemporánea.', 'Sofia López', 'Bachata', 'Intermedio', '8 semanas', 160.00, '/placeholder.svg?height=300&width=400'),
('Reggaeton Fitness', 'Combina baile y ejercicio con los ritmos del reggaeton.', 'Diego Morales', 'Reggaeton', 'Principiante', '6 semanas', 100.00, '/placeholder.svg?height=300&width=400');
