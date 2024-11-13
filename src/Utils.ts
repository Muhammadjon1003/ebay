import { useEffect, useState } from "react";
import { Product } from "./types/Product";

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

export const handleSelectedCategories = (url: string, limit: number) => {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result.slice(0, limit));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, [url, limit]);

  return data;
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