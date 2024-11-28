import { Button } from "@/shadcn/ui/button";
import { useState } from "react";
import filters from "../assets/json/grocery_filters_arabic.json";

type Subcategory = {
  type: string;
  brands: string[];
};

export function Filters() {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [translateY, setTranslateY] = useState(0);
  return (
    <div className="w-full relative h-14 bg-secondary mt-8 overflow-y-hidden">
      <div
        id="filters"
        className={`-translate-y-${translateY} transition-all duration-500`}
      >
        <div className="flex overflow-x-scroll w-full gap-2 p-2 no-scrollbar">
          {filters.map((filter, index) => (
            <Button
              onClick={() => {
                console.log(translateY + 14);
                setTranslateY(translateY + 14);
                setSubcategories(filter.subcategories);
              }}
              key={index}
            >
              {filter.category}
            </Button>
          ))}
        </div>

        <div className="flex overflow-x-scroll w-full gap-2 p-2 no-scrollbar">
          <Button
            onClick={() => {
              setTranslateY(translateY - 14);
            }}
          >
            رجوع
          </Button>

          {subcategories.map((subcategory: Subcategory, index: number) => (
            <Button
              onClick={() => {
                console.log(translateY + 14);
                setTranslateY(translateY + 14);
                setBrands(subcategory.brands);
              }}
              key={index}
            >
              {subcategory.type}
            </Button>
          ))}
        </div>
        <div className="flex overflow-x-scroll w-full gap-2 p-2 no-scrollbar">
          <Button
            onClick={() => {
              setTranslateY(translateY - 14);
            }}
          >
            رجوع
          </Button>
          {brands.map((brand, index) => (
            <Button key={index}>{brand}</Button>
          ))}
        </div>
      </div>
    </div>
  );
}
