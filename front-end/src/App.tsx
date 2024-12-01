import { Filters } from "./components/Filters";
import { NavBar } from "./components/NavBar";
import productsJson from "./assets/json/products_data.json";
import { useState } from "react";
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

function App() {
  const [products, setProducts] = useState<Product[]>(productsJson);
  const [cart, setCart] = useState<Product[]>([]);

  console.log(cart);

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
