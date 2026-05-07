import { supabase } from "../lib/supabase";
import { Product } from "../types";

export const productsService = {
  async getAllProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
      return [];
    }

    return data || [];
  },

  async getProductById(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching product:", error);
      return null;
    }

    return data;
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .or(`category_ukr.eq.${category}, category_en.eq.${category}`)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching category products:", error);
      return [];
    }

    return data || [];
  },

  async getProductsByMaterial(material: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .or(`material_ukr.eq.${material}, material_en.eq.${material}`);

    if (error) {
      console.error("Error fetching material products:", error);
      return [];
    }

    return data || [];
  },

  async searchProducts(query: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .or(
        `name_ukr.ilike.%${query}%, name_en.ilike.%${query}%, description_ukr.ilike.%${query}%, description_en.ilike.%${query}%`,
      );

    if (error) {
      console.error("Error searching products:", error);
      return [];
    }

    return data || [];
  },
};
