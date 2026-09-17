"use client";

import { useState } from "react";
import Image from "next/image";
import { products } from "@/app/lib/products";

type Product = (typeof products)[0] & {
  originalPrice?: number;
  withBoxPrice?: number;
};

type Deal = {
  quantity: number;
  price: number;
  label?: string;
};

export default function ProductPageClient({
  product,
}: {
  product: Product;
}) {
  const deals: Deal[] =
    product.deals || [{ quantity: 1, price: product.price }];

  const [selectedDeal, setSelectedDeal] = useState<Deal>(
    deals[0] || { quantity: 1, price: product.price }
  );

  const [withBox, setWithBox] = useState(false);

  function getPriceEach(deal: Deal) {
    return deal.price / deal.quantity;
  }

  function getRegularTotal(deal: Deal) {
    return product.price * deal.quantity;
  }

  function getSavings(deal: Deal) {
    return getRegularTotal(deal) - deal.price;
  }

  const cheapestPriceEach =
    deals.length > 0
      ? Math.min(
          ...deals.map((deal) => deal.price / deal.quantity)
        )
      : product.price;

  const isShoe = product.category === "Shoes";

  const selectedPrice =
    isShoe && withBox && product.withBoxPrice
      ? product.withBoxPrice
      : selectedDeal.price;

  function addToCart() {
    const savedCart = localStorage.getItem("globalSupplyCart");
    const cart = savedCart ? JSON.parse(savedCart) : [];

    const cartItem = {
      id: product.id,
      name: product.name,
      image: product.image,
      price: selectedPrice,
      bundleQuantity: selectedDeal.quantity,
      withBox: isShoe ? withBox : false,
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
        <a
          href="/"
          className="text-gray-400 hover:text-white transition"
        >
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
            {product.badge && (
              <div className="inline-flex rounded-full bg-white text-black px-4 py-2 text-xs font-black tracking-widest">
                {product.badge}
              </div>
            )}

            <h1 className="text-5xl md:text-6xl font-black mt-6">
              {product.name}
            </h1>

            <p className="text-gray-500 uppercase tracking-[0.3em] mt-4">
              {product.category}
            </p>

            <div className="mt-6 flex items-center gap-3 flex-wrap">
              {product.originalPrice && (
                <span className="text-2xl text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}

              <span className="text-4xl font-black">
                {product.price === 0
                  ? "Message For Pricing"
                  : `$${selectedPrice}`}
              </span>

              {product.originalPrice && (
                <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-black text-black">
                  PROMOTION
                </span>
              )}
            </div>

            {isShoe && product.withBoxPrice && (
              <div className="mt-8">
                <h3 className="text-xl font-black mb-4">
                  BOX OPTION
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setWithBox(false)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      !withBox
                        ? "border-green-500 bg-zinc-900"
                        : "border-white/10 bg-zinc-950 hover:border-white/30"
                    }`}
                  >
                    <div className="font-black">
                      Without Box
                    </div>
                    <div className="text-2xl font-black mt-1">
                      ${product.price}
                    </div>
                  </button>

                  <button
                    onClick={() => setWithBox(true)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      withBox
                        ? "border-green-500 bg-zinc-900"
                        : "border-white/10 bg-zinc-950 hover:border-white/30"
                    }`}
                  >
                    <div className="font-black">
                      With Box
                    </div>
                    <div className="text-2xl font-black mt-1">
                      ${product.withBoxPrice}
                    </div>
                  </button>
                </div>
              </div>
            )}

            {!isShoe &&
              deals.length > 0 &&
              product.price !== 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-black mb-4">
                    BULK DEALS
                  </h3>

                  <div className="space-y-3">
                    {deals.map((deal) => {
                      const priceEach =
                        getPriceEach(deal);

                      const regularTotal =
                        getRegularTotal(deal);

                      const savings =
                        getSavings(deal);

                      const isSelected =
                        selectedDeal.quantity ===
                        deal.quantity;

                      const isBestValue =
                        deal.quantity > 1 &&
                        priceEach === cheapestPriceEach;

                      return (
                        <button
                          key={deal.quantity}
                          onClick={() =>
                            setSelectedDeal(deal)
                          }
                          className={`relative w-full flex items-center justify-between rounded-2xl px-4 py-5 border transition ${
                            isSelected
                              ? "border-green-500 bg-zinc-900"
                              : "border-white/10 bg-zinc-950 hover:border-white/30"
                          }`}
                        >
                          <div className="text-left">
                            <span className="font-black block">
                              Buy {deal.quantity}
                            </span>

                            {deal.quantity > 1 && (
                              <div className="flex items-center gap-1 mt-1 text-xs font-bold">
                                <span className="text-gray-400">
                                  $
                                  {Number.isInteger(
                                    priceEach
                                  )
                                    ? priceEach
                                    : priceEach.toFixed(2)}{" "}
                                  each
                                </span>

                                {savings > 0 && (
                                  <>
                                    <span className="text-gray-500">
                                      ·
                                    </span>

                                    <span className="text-green-400">
                                      Save $
                                      {savings.toFixed(0)}
                                    </span>
                                  </>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col items-end">
                            <div className="flex items-center gap-2">
                              {deal.quantity > 1 &&
                                savings > 0 && (
                                  <span className="text-sm text-gray-500 line-through font-bold">
                                    $
                                    {regularTotal.toFixed(
                                      0
                                    )}
                                  </span>
                                )}

                              <span className="text-2xl font-black">
                                ${deal.price}
                              </span>
                            </div>

                            {isBestValue && (
                              <span className="mt-2 bg-lime-400 text-black text-[10px] font-black px-3 py-1 rounded-md">
                                BEST VALUE
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
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

            {product.price === 0 ? (
              <a
                href="https://t.me/GlobalSupplyTM"
                target="_blank"
                rel="noopener noreferrer"
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