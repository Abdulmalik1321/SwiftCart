import { Button } from "@/shadcn/ui/button";
import { useState } from "react";
import filters from "../assets/json/grocery_filters_arabic.json";
import { ChevronRightCircleIcon } from "lucide-react";
import { Input } from "@/shadcn/ui/input";
import { Product } from "@/App";

type Subcategory = {
  type: string;
  brands: string[];
};

export function Filters({
  productsJson,

  setProducts,
}: {
  productsJson: Product[];
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [translateY, setTranslateY] = useState(0);

  const [selectedFilters, setSelectedFilters] = useState({
    category: "",
    subcategory: "",
    brand: "",
  });

  const filterProducts = (filterType: string, filterValue: string) => {
    switch (filterType) {
      case "category":
        setSelectedFilters({
          ...selectedFilters,
          category: filterValue,
        });
        setProducts(
          productsJson.filter((product) => product.category === filterValue)
        );
        break;

      case "subcategory":
        setSelectedFilters({
          ...selectedFilters,
          subcategory: filterValue,
        });
        setProducts(
          productsJson.filter(
            (product) =>
              product.subcategory === filterValue &&
              product.category === selectedFilters.category
          )
        );
        break;

      case "brand":
        setSelectedFilters({
          ...selectedFilters,
          brand: filterValue,
        });
        setProducts(
          productsJson.filter(
            (product) =>
              product.brand === filterValue &&
              product.category === selectedFilters.category &&
              product.subcategory === selectedFilters.subcategory
          )
        );
        break;

      default:
        break;
    }
  };

  const handelSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProducts(
      productsJson.filter((product) =>
        product.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <div className="w-full mt-8 flex flex-col justify-center ">
      <div className="w-full flex justify-center relative mb-3">
        <Input
          placeholder="🔍"
          type="search"
          className="w-[95%]"
          onChange={handelSearch}
        />
      </div>
      <div className="w-full relative h-14 bg-secondary overflow-y-hidden">
        <div
          id="filters"
          className={` transition-all duration-500`}
          style={{ transform: `translateY(-${translateY}rem)` }}
        >
          <div className="flex overflow-x-scroll w-full gap-2 p-2 no-scrollbar">
            {filters.map((filter, index) => (
              <Button
                onClick={() => {
                  console.log(translateY + 3.5);
                  setTranslateY(translateY + 3.5);
                  setSubcategories(filter.subcategories);
                  filterProducts("category", filter.category);
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
                setTranslateY(translateY - 3.5);
              }}
              className="flex items-center gap-1"
            >
              <ChevronRightCircleIcon className="!size-5" />
            </Button>

            {subcategories.map((subcategory: Subcategory, index: number) => (
              <Button
                onClick={() => {
                  console.log(translateY + 3.5);
                  setTranslateY(translateY + 3.5);
                  setBrands(subcategory.brands);
                  filterProducts("subcategory", subcategory.type);
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
                setTranslateY(translateY - 3.5);
              }}
              className="flex items-center gap-1"
            >
              <ChevronRightCircleIcon className="!size-5" />
            </Button>
            {brands.map((brand, index) => (
              <Button
                onClick={() => filterProducts("brand", brand)}
                key={index}
              >
                {brand}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
