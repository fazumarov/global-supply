"use client";

import { useEffect, useState } from "react";
import { products } from "./lib/products";

export default function Home() {
  type CartItem = {
    id: number;
    name: string;
    price: number;
    image: string;
    bundleQuantity?: number;
  };

  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("globalSupplyCart");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("globalSupplyCart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(
    product: (typeof products)[0],
    bundleQuantity = 1,
    bundlePrice = product.price
  ) {
    const cartItem = {
      id: product.id,
      name: product.name,
      image: product.image,
      price: bundlePrice,
      bundleQuantity,
    };

    setCart([...cart, cartItem]);
    setCartOpen(true);
  }

  function removeFromCart(indexToRemove: number) {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  }

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const telegramUsername = "GlobalSupplyTM";

  const orderMessage = `Hello Global Supply,

I'd like to order:

${cart.map((item) => `• ${item.name} - $${item.price}`).join("\n")}

Total: $${total}

Please send payment information.`;

  function copyOrder() {
    navigator.clipboard.writeText(orderMessage);
    alert(
      "Order copied. Open Telegram, paste your order into Telegram and send it."
    );
  }

  const cartCount = cart.reduce(
    (sum, item) => sum + (item.bundleQuantity || 1),
    0
  );

  return (
    <main className="min-h-screen bg-black text-white">
      {cartOpen && (
        <div className="fixed inset-0 z-[100]">
          <div
            onClick={() => setCartOpen(false)}
            className="absolute inset-0 bg-black/70"
          />

          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-zinc-950 border-l border-white/10 p-6 overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black">YOUR CART</h2>

              <button
                onClick={() => setCartOpen(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <p className="text-gray-400 mt-2">{cart.length} item(s) selected</p>

            {cart.length === 0 ? (
              <p className="text-gray-400 mt-8">Your cart is empty.</p>
            ) : (
              <>
                <div className="mt-6 space-y-3">
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="bg-black border border-white/10 rounded-2xl p-4"
                    >
                      <div className="flex justify-between gap-4">
                        <div>
                          <p className="font-bold">{item.name}</p>

                          {item.bundleQuantity &&
                            item.bundleQuantity > 1 && (
                              <p className="text-sm text-gray-400">
                                Bundle: {item.bundleQuantity}
                              </p>
                            )}

                          <p className="text-gray-400">${item.price}</p>
                        </div>

                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-red-400 text-sm font-bold"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-white/10 pt-5">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Total</p>
                    <p className="text-2xl font-black">${total}</p>
                  </div>

                  <div className="mt-5 bg-black border border-white/10 rounded-2xl p-4">
                    <p className="font-black">Checkout Instructions</p>
                    <p className="text-sm text-gray-400 mt-2">
                      1. Copy your order.
                    </p>
                    <p className="text-sm text-gray-400">
                      2. Open Telegram.
                    </p>
                    <p className="text-sm text-gray-400">
                      3. Paste your order into Telegram and send it.
                    </p>
                  </div>

                  <button
                    onClick={copyOrder}
                    className="mt-5 w-full bg-white text-black py-4 rounded-full font-black hover:bg-gray-200 transition"
                  >
                    STEP 1: COPY ORDER
                  </button>

                  <a
                    href={`https://t.me/${telegramUsername}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 block text-center border border-white/30 py-4 rounded-full font-black hover:bg-white hover:text-black transition"
                  >
                    STEP 2: OPEN TELEGRAM
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-4">
          <a href="#catalog" className="shrink-0">
            <p className="text-lg md:text-xl font-black tracking-widest">
              GLOBAL SUPPLY™
            </p>
          </a>

          <button
            onClick={() => setCartOpen(true)}
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-bold hover:bg-white hover:text-black transition"
          >
            Cart ({cartCount})
          </button>
        </div>
      </nav>

      <section id="catalog" className="px-4 md:px-6 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-black">CATALOG</h1>
              <p className="text-gray-500 mt-2 text-sm md:text-base">
                Browse all available products.
              </p>
            </div>

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-80 px-4 py-3 rounded-full bg-zinc-950 border border-white/10 text-white outline-none focus:border-white"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-bold border transition ${
                  category === item
                    ? "bg-white text-black border-white"
                    : "bg-zinc-950 text-white border-white/10 hover:border-white/40"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {filteredProducts.length === 0 ? (
            <p className="text-gray-400">No products found.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.slug}
                  className="group bg-zinc-950 rounded-2xl md:rounded-[2rem] p-3 md:p-4 border border-white/10 hover:border-white/30 transition"
                >
                  <a href={`/products/${product.slug}`}>
                    <div className="overflow-hidden rounded-xl md:rounded-[1.5rem] bg-zinc-900 aspect-square">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-contain p-3 group-hover:scale-105 transition duration-500"
                      />
                    </div>
                  </a>

                  <div className="pt-4">
                    <p className="text-[10px] md:text-xs tracking-[0.18em] text-gray-500 font-bold uppercase">
                      {product.category}
                    </p>

                    <a href={`/products/${product.slug}`}>
                      <h2 className="text-base md:text-xl font-black mt-1 leading-tight hover:underline">
                        {product.name}
                      </h2>
                    </a>

                    <p className="mt-2 text-sm md:text-lg text-gray-300">
                      {product.price === 0
                        ? "Message For Pricing"
                        : `$${product.price}`}
                    </p>

                    <button
                      onClick={() => addToCart(product)}
                      className="mt-4 w-full bg-white text-black py-3 rounded-full text-xs md:text-sm font-black hover:bg-gray-200 transition"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 md:px-6 py-8 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <p className="font-black tracking-widest">GLOBAL SUPPLY™</p>

          <a
            href={`https://t.me/${telegramUsername}`}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-gray-400 hover:text-white"
          >
            Telegram Support
          </a>
        </div>
      </footer>
    </main>
  );
}
