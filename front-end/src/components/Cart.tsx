import { Product } from "@/App";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shadcn/ui/accordion";
import { Button } from "@/shadcn/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export function Cart({
  cart,
  setCart,
}: {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  const [cartHeight, setCartHeight] = useState<number>(88);

  const aggregated = cart.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.qty += 1;
    } else {
      acc.push({ ...item, qty: 1 });
    }
    return acc;
  }, [] as (Product & { qty: number })[]);

  return (
    <div
      className="w-full md:w-1/2 bg-background fixed h-[95vh] rounded-t-3xl border-t-2 border-primary transition-all duration-300 overflow-x-hidden overflow-y-scroll"
      style={{ bottom: `-${cartHeight}vh` }}
    >
      <div
        onClick={() => {
          if (!cartHeight) {
            setCartHeight(88);
            console.log(cartHeight);
          } else {
            setCartHeight(0);
            console.log(cartHeight);
          }
        }}
        className="w-full h-10 absolute"
      >
        <span className="absolute bg-primary w-10 h-1 right-[calc(50%-1.25rem)] rounded-full top-1"></span>
      </div>
      <div className="w-full h-12 flex items-center justify-around gap-2 mt-[0.5vh]">
        <span>العدد: {cart.length}</span>
        <span>
          الاجمالي:{" "}
          {cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
        </span>
      </div>

      <div className="p-5">
        <Button className="w-full">اتمام الطلب</Button>
        {aggregated.map((product) => (
          <Accordion key={"cart-" + product.id} type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="gap-5 items-center">
                <img
                  className="size-16 object-contain"
                  src={product.img}
                  alt=""
                />
                <div className="w-full flex justify-between">
                  <span className="">{product.name}</span>
                  <span>الكمية: {product.qty}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="w-full flex justify-between items-center">
                  <Button
                    onClick={() => {
                      const updatedCart = cart.filter(
                        (item) => item.id !== product.id
                      );
                      setCart(updatedCart);
                    }}
                    variant="outline"
                    className="size-8"
                  >
                    <Trash2 />
                  </Button>
                  <span>السعر: {product.price}</span>
                  <span>
                    الاجمالي: {(product.qty * product.price).toFixed(2)}
                  </span>
                  <div>
                    <Button
                      onClick={() => setCart([...cart, product])}
                      className="h-0 p-3 rounded-l-none"
                    >
                      +
                    </Button>
                    <span className=" px-3 ">{product.qty}</span>
                    <Button
                      onClick={() => {
                        const updatedCart = [...cart];
                        const itemIndex = updatedCart
                          .map((item) => item.id)
                          .lastIndexOf(product.id);

                        if (itemIndex !== -1) {
                          // Remove the last instance of the product
                          updatedCart.splice(itemIndex, 1);
                        }

                        setCart(updatedCart);
                      }}
                      className="h-0 p-3 rounded-r-none"
                    >
                      -
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
