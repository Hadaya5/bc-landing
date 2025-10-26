import { Dispatch, SetStateAction } from "react";
import { createClient } from "./supabase/client";

export interface Course {
    id?: string;
    title: string;
    instructor: string;
    level: "Principiante" | "Intermedio" | "Avanzado";
    duration: string;
    price: number;
    description: string;
    category: string;
    image_url?: string;
    created_at?: string;
    updated_at?: string;
  }

export const fetchCourses = async (setCourses: Dispatch<SetStateAction<any[]>>, setLoading: (val: boolean) => void) => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching courses:", error);
        return;
      }

      setCourses(data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };


export const createCourse = async (courseData: Omit<Course, "id">, setCourses: Dispatch<SetStateAction<any[]>>) => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("courses")
        .insert([courseData])
        .select();

      if (error) {
        console.error("Error creating course:", error);
        return false;
      }

      if (data) {
        setCourses((prev) => [data[0], ...prev]);
      }
      return true;
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };

export const updateCourse = async (id: string, courseData: Partial<Course>, setCourses: Dispatch<SetStateAction<any[]>>, setLoading: (val: boolean) => void) => {
    try {
      setLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from("courses")
        .update(courseData)
        .eq("id", id)
        .select();

      if (error) {
        console.error("Error updating course:", error);
        return false;
      }

      if (data) {
        setCourses((prev) =>
          prev.map((curso) => (curso.id === id ? data[0] : curso))
        );
      }
      setLoading(false);

      return true;
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };

export const deleteCourse = async (id: string, setCourses: Dispatch<SetStateAction<any[]>>) => {
    try {
      const supabase = createClient();
      const { error } = await supabase.from("courses").delete().eq("id", id);

      if (error) {
        console.error("Error deleting course:", error);
        return false;
      }

      setCourses((prev) => prev.filter((curso) => curso.id !== id));
      return true;
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };