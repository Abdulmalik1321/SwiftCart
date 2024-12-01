import { Product } from "@/App";
import { Button } from "@/shadcn/ui/button";
import { Card, CardContent, CardFooter } from "@/shadcn/ui/card";

export function ProductsDisplay({
  products,
  cart,
  setCart,
}: {
  products: Product[];
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  return (
    <div className="w-full grid grid-cols-2 gap-2 p-2 mb-16">
      {products.map((product: Product) => (
        <Card
          key={product.id}
          className="items-center justify-center flex flex-col bg-gradient-to-t from-primary/10 to-secondary/20"
        >
          <CardContent className="p-4 flex flex-col items-center">
            <img
              src={product.img}
              alt={product.name}
              className="size-28 object-contain"
            />
            <p className="text-center text-nowrap">{product.name}</p>
            <p className="text-center text-muted-foreground text-sm">
              {product.price} ريال
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => setCart([...cart, product])}
              className="font-normal p-0 py-1 px-2 h-auto"
            >
              اضف الى العربة
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
