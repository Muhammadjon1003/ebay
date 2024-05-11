import { useEffect, useState } from 'react';
export const useFetchData = (url: string): any => {
const [data, setData] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseData = await response.json();
        setData(responseData); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the fetch function when the component mounts
  }, [url]);

  return data;
};
export const saveToLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
 }

export const loadFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};
export const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  
  return array;
};
export const renderProducts = (url: string) => {
  const data = useFetchData(url);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if(data){
      setProducts(data?.products)

    }
}, [data])
  return products;
}
export   const calculateOldPrice = (price:number, discountPercent:number) => {
  if (discountPercent > 0) {
    const oldPrice = parseInt('' + price / (1 - discountPercent / 100));
    return oldPrice;
  } else {
    return price;
  }
};
export const handleSelectedCategories = (url: string, numberOfCategories: number) => {
  
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
  
  // Fetch product data
  const data = useFetchData(url);
let categories: any[] = []
  useEffect(() => {
    if (data) {
     if(Array.isArray(data)){
        categories = data
     }else{
       categories = data.products
     }

      const shuffledCategories = shuffleArray(categories);
      const uniqueCategories = Array.from(new Set(shuffledCategories.slice(0, numberOfCategories)));

      setSelectedCategories(uniqueCategories);
    }
  }, [data]);
  return selectedCategories;
}
export const isProductLiked = (productId: number, arr_name: string): boolean => {
  const likedProducts: Product[] = loadFromLocalStorage(arr_name) || [];
  
  return likedProducts.some(product => product.id === productId);
};