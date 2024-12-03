/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from "@/App";
import { Button } from "@/shadcn/ui/button";
import { DialogFooter, DialogHeader, DialogTitle } from "@/shadcn/ui/dialog";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { useState } from "react";

export function Checkout({
  cart,
  totalAmount,
}: {
  cart: Product[];
  totalAmount: number;
}) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const request = {
      cartAmount: totalAmount,
      cartItems: cart,
      customer_details: form,
    };

    fetch("http://localhost:3000/php/checkout.php", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    console.log(request);
  };
  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        {/* <c>إتمام الطلب</c> */}
        <DialogTitle>يرجى إدخال بياناتك لإتمام عملية الطلب.</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            الاسم:
          </Label>
          <Input
            placeholder="الاسم الكامل"
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            required
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            البريد الإلكتروني:
          </Label>
          <Input
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            placeholder="email@example.com"
            type="email"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="phone" className="text-right">
            رقم الجوال:
          </Label>
          <Input
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
            placeholder="05xxxxxxxx"
            type="number"
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">إتمام الطلب</Button>
      </DialogFooter>
    </form>
  );
}
