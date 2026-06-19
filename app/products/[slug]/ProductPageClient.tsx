"use client";

import { useState } from "react";
import Image from "next/image";
import { products } from "@/app/lib/products";
type Product = (typeof products)[0];

type Deal = {
  quantity: number;
  price: number;
};

export default function ProductPageClient({ product }: { product: Product }) {
  function getDeals(): Deal[] {
    if (product.price === 0) return [];

if (product.slug === "lv-cologne") {
  return [
    { quantity: 1, price: 80 },
    { quantity: 5, price: 400 },
    { quantity: 10, price: 800 },
  ];
}
    if (product.category === "Fragrances") {
      return [
        { quantity: 1, price: product.price },
        { quantity: 5, price: 250 },
        { quantity: 10, price: 450 },
      ];
    }

    if (product.category === "Shoes") {
      return [
        { quantity: 1, price: 100 },
        { quantity: 2, price: 190 },
        { quantity: 5, price: 450 },
      ];
    }

    if (product.slug === "airpods-pro-2") {
      return [
        { quantity: 1, price: 45 },
        { quantity: 2, price: 80 },
        { quantity: 5, price: 150 },
      ];
    }

    if (product.slug === "airpods-pro-3") {
      return [
        { quantity: 1, price: 60 },
        { quantity: 2, price: 100 },
        { quantity: 5, price: 200 },
      ];
    }

    if (product.slug === "airpods-max") {
      return [
        { quantity: 1, price: product.price },
        { quantity: 2, price: 280 },
        { quantity: 5, price: 650 },
      ];
    }

    return [{ quantity: 1, price: product.price }];
  }

  const deals = product.deals || getDeals();
  const [selectedDeal, setSelectedDeal] = useState<Deal>(
    deals[0] || { quantity: 1, price: product.price }
  );

  function addToCart() {
    const savedCart = localStorage.getItem("globalSupplyCart");
    const cart = savedCart ? JSON.parse(savedCart) : [];

    const cartItem = {
      id: product.id,
      name: product.name,
      image: product.image,
      price: selectedDeal.price,
      bundleQuantity: selectedDeal.quantity,
    };

    localStorage.setItem(
      "globalSupplyCart",
      JSON.stringify([...cart, cartItem])
    );

    alert("Added to cart.");
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <a href="/" className="text-gray-400 hover:text-white transition">
          ← Back to Catalog
        </a>

        <div className="grid md:grid-cols-2 gap-12 mt-8">
          <div className="bg-zinc-950 border border-white/10 rounded-[2rem] overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              width={1000}
              height={1000}
              className="w-full h-auto object-contain p-4"
              priority
            />
          </div>

          <div>
            <div className="inline-flex rounded-full bg-white text-black px-4 py-2 text-xs font-black tracking-widest">
              {product.badge}
            </div>

            <h1 className="text-5xl md:text-6xl font-black mt-6">
              {product.name}
            </h1>

            <p className="text-gray-500 uppercase tracking-[0.3em] mt-4">
              {product.category}
            </p>

            <p className="text-4xl font-black mt-6">
              {product.price === 0 ? "Message For Pricing" : `$${selectedDeal.price}`}
            </p>

            {deals.length > 0 && product.price !== 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-black mb-4">BULK DEALS</h3>

                <div className="space-y-3">
                  {deals.map((deal) => (
                    <button
                      key={deal.quantity}
                      onClick={() => setSelectedDeal(deal)}
                      className={`w-full flex items-center justify-between rounded-2xl p-4 border transition ${
                        selectedDeal.quantity === deal.quantity
                          ? "border-green-500 bg-zinc-900"
                          : "border-white/10 bg-zinc-950 hover:border-white/30"
                      }`}
                    >
                      <span className="font-bold">Buy {deal.quantity}</span>
                      <span className="text-2xl font-black">${deal.price}</span>
                    </button>
                  ))}
                </div>

                {product.category === "Shoes" && (
                  <p className="text-yellow-400 text-sm mt-4 font-semibold">
                    * Prices shown are WITHOUT box. Add $20 for original box.
                  </p>
                )}
              </div>
            )}

            <div className="mt-8 bg-zinc-950 border border-white/10 rounded-[2rem] p-6">
              <div className="space-y-3">
                <p>✓ Premium Quality</p>
                <p>✓ Fast Shipping</p>
                <p>✓ Secure Checkout</p>
                <p>✓ Exclusive Drop</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-black mb-4">Description</h2>
              <p className="text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            {product.price === 0 ? (
              <a
                href="https://t.me/GlobalSupplyOffical"
                target="_blank"
                className="block mt-8 w-full bg-white text-black py-4 rounded-full font-black text-center hover:bg-gray-200 transition"
              >
                MESSAGE FOR PRICING
              </a>
            ) : (
              <button
                onClick={addToCart}
                className="mt-8 w-full bg-white text-black py-4 rounded-full font-black hover:bg-gray-200 transition"
              >
                ADD TO CART
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}