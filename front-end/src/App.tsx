import { Filters } from "./components/Filters";
import { NavBar } from "./components/NavBar";
import { useEffect, useState } from "react";
import { ProductsDisplay } from "./components/ProductsDisplay";
import { Cart } from "./components/Cart";

export type Product = {
  id: number;
  img: string;
  name: string;
  category: string;
  subcategory: string;
  brand: string;
  price: number;
  stock: number;
  unit: string;
};

export const url = "https://testing.smart-development.net/";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [productsJson, setProductsJson] = useState<Product[]>([]);

  useEffect(() => {
    fetch(url + "json/products_data.json")
      .then((response) => response.json())
      .then((data) => {
        setProductsJson(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    setProducts(productsJson);
  }, [productsJson]);

  console.log(products);

  return (
    <main className="h-screen flex justify-center overflow-hidden">
      <div className="w-full md:w-1/2 flex flex-col items-center overflow-x-hidden">
        <NavBar />
        <Filters
          productsJson={productsJson}
          products={products}
          setProducts={setProducts}
        />
        <ProductsDisplay cart={cart} setCart={setCart} products={products} />
        <Cart cart={cart} setCart={setCart} />
      </div>
    </main>
  );
}

export default App;
