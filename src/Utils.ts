import { useEffect, useState } from "react";
import { Product, Category } from "./types/Product";

export const useFetchData = (url: string) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [url]);

  return data;
};

export const useFetchCategories = (url: string, limit: number) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        if (Array.isArray(result)) {
          const formattedCategories = result.slice(0, limit).map(category => ({
            name: category.name,
            slug: category.slug,
            url: category.url
          }));
          setCategories(formattedCategories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      }
    };

    fetchData();
  }, [url, limit]);

  return categories;
};

export const renderProducts = (url: string): Product[] => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setProducts(result.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
    };

    fetchData();
  }, [url]);

  return products;
};

export const saveToLocalStorage = (key: string, data: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadFromLocalStorage = (key: string): any => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

export const calculateOldPrice = (price: number, discountPercentage: number): number => {
  return Number((price / (1 - discountPercentage / 100)).toFixed(2));
};

export const isProductLiked = (productId: number, storageKey: string): boolean => {
  const likedProducts = loadFromLocalStorage(storageKey) || [];
  return likedProducts.some((product: Product) => product.id === productId);
}; 