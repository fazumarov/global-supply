"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
  const telegramUsername = "GlobalSupplyOffical";

  const orderMessage = `Hello Global Supply,

I'd like to order:

${cart.map((item) => `• ${item.name} - $${item.price}`).join("\n")}

Total: $${total}

Please send payment information.`;

  function copyOrder() {
    navigator.clipboard.writeText(orderMessage);
    alert("Order copied. Open Telegram, Paste your order into Telegram and send it..");
  }

  return (
    <main className="min-h-[55vh] md:min-h-[60vh] [050505] text-white">
      {cartOpen && (
        <div className="fixed inset-0 z-[100]">
          <div
            onClick={() => setCartOpen(false)}
            className="absolute inset-0 bg-black/70"
          ></div>

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

            <p className="text-gray-400 mt-2">
              {cart.length} item(s) selected
            </p>

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
                          
                          {item.bundleQuantity && item.bundleQuantity > 1 && (
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
<div className="w-full border-b border-white/10 bg-zinc-950">
  <div className="max-w-7xl mx-auto px-6 py-3 text-center">
    <p className="text-xs md:text-sm tracking-[0.2em] text-gray-300 font-bold">
      ⚡ NEW DROPS WEEKLY • PRIVATE TELEGRAM CHECKOUT • FAST RESPONSE TIMES
    </p>
  </div>
</div>
      <nav className="sticky top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-xl font-black tracking-widest">GLOBAL SUPPLY™</p>
            <p className="text-[10px] tracking-[0.3em] text-gray-500">
              EXCLUSIVE DROPS
            </p>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            <a href="#catalog" className="hover:text-white">
              Catalog
            </a>

            <button
              onClick={() => setCartOpen(true)}
              className="hover:text-white"
            >
              Cart
            </button>

            <a
              href={`https://t.me/${telegramUsername}`}
              target="_blank"
              className="hover:text-white"
            >
              Telegram
            </a>
          </div>
          <button
            onClick={() => setCartOpen(true)}
            className="rounded-full border border-white/20 px-4 py-2 text-sm hover:bg-white hover:text-black transition"
          >
           Cart: <span className="font-bold">
  {cart.reduce(
    (total, item) => total + (item.bundleQuantity || 1),
    0
  )}
</span>
          </button>
        </div>
      </nav>

     <section className="relative min-h-[55vh] md:min-h-[65vh] flex items-center px-6 pt-20 pb-8">
        <div className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center opacity-80"></div>
      <div className="absolute inset-0 bg-black/25"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-black/10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#050505]"></div>
        <div className="relative max-w-7xl mx-auto w-full">
          <div className="max-w-3xl">
          

           
            <p className="mt-5 text-base md:text-lg max-w-2xl">
             
            </p>

          <div className="mt-32 flex justify-center gap-4">
              <a
                href="#catalog"
                className="bg-white text-black px-8 py-4 rounded-full font-black text-center hover:bg-gray-200 transition"
              >
                SHOP COLLECTION
              </a>

              <a
                href={`https://t.me/${telegramUsername}`}
                target="_blank"
                className="border border-white/30 px-8 py-4 rounded-full font-black text-center hover:bg-white hover:text-black transition"
              >
                MESSAGE TELEGRAM
              </a>
            </div>
          </div>
        </div>
      </section>
<section className="px-6 pt-4 pb-10">
  <div className="max-w-7xl mx-auto">
    <p className="text-sm tracking-[0.3em] text-gray-500 font-bold">
      SHOP BY CATEGORY
    </p>

    <h2 className="text-4xl md:text-6xl font-black mt-3">
      EXPLORE COLLECTIONS
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
      <div
  onClick={() => {
    setCategory("Electronics");
    document
      .getElementById("catalog")
      ?.scrollIntoView({ behavior: "smooth" });
  }}
  className="group relative overflow-hidden bg-zinc-950 border border-white/10 rounded-[2rem] p-8 hover:border-white/40 transition cursor-pointer"
>
   <Image
    src="/airpods-pro.jpg"
    alt="Electronics"
    width={220}
    height={220}
    className="absolute right-0 bottom-0 w-40 opacity-30 group-hover:opacity-60 group-hover:scale-105 transition duration-500 pointer-events-none"
    />
        <h3 className="text-2xl font-black group-hover:text-white transition">Electronics</h3>
        <p className="text-gray-400 mt-3">
          AirPods, headphones, accessories and more.
        </p>
      </div>

      <div
  onClick={() => {
    setCategory("Clothing");
    document
      .getElementById("catalog")
      ?.scrollIntoView({ behavior: "smooth" });
  }}
 className="group relative overflow-hidden bg-zinc-950 border border-white/10 rounded-[2rem] p-8 hover:border-white/40 transition cursor-pointer"
>
  <Image
  src="/essentials-hoodie-beige.png"
  alt="Clothing"
  width={220}
  height={220}
  className="absolute right-0 bottom-0 w-44 opacity-30 group-hover:opacity-60 group-hover:scale-105 transition duration-500 pointer-events-none"
/>
       <h3 className="text-2xl font-black group-hover:text-white transition relative z-10">
  Clothing
</h3>

<p className="text-gray-400 mt-3 relative z-10">
  Essentials and Chrome Hearts.
</p>
      </div>
<div
  onClick={() => {
    setCategory("Shoes");
    document
      .getElementById("catalog")
      ?.scrollIntoView({ behavior: "smooth" });
  }}
 className="group relative overflow-hidden bg-zinc-950 border border-white/10 rounded-[2rem] p-8 hover:border-white/40 transition cursor-pointer"
>
  <Image
  src="/air-jordan-4-white-cement.png"
  alt="Shoes"
  width={220}
  height={220}
  className="absolute right-0 bottom-0 w-44 opacity-30 group-hover:opacity-60 group-hover:scale-105 transition duration-500 pointer-events-none"
/>
  <h3 className="text-2xl font-black group-hover:text-white transition">
    Shoes
  </h3>

  <p className="text-gray-400 mt-3">
    Jordan 4s and premium sneaker drops.
  </p>
</div>
<div
  onClick={() => {
    setCategory("Fragrances");
    document
      .getElementById("catalog")
      ?.scrollIntoView({ behavior: "smooth" });
  }}
 className="group relative overflow-hidden bg-zinc-950 border border-white/10 rounded-[2rem] p-8 hover:border-white/40 transition cursor-pointer"
>
  <Image
  src="/dior-sauvage.jpg"
  alt="Fragrances"
  width={200}
  height={200}
  className="absolute right-4 bottom-0 w-28 opacity-30 group-hover:opacity-60 group-hover:scale-105 transition duration-500 pointer-events-none"
/>
        <h3 className="text-2xl font-black group-hover:text-white transition relative z-10">
  Fragrances
</h3>

<p className="text-gray-400 mt-3 relative z-10">
  Designer fragrances and bundle deals.
</p>
      </div>

     <div
      onClick={() => {
        setCategory("Bags");
       document
        .getElementById("catalog")
        ?.scrollIntoView({ behavior: "smooth" });
}}
  className="group relative overflow-hidden bg-zinc-950 border border-white/10 rounded-[2rem] p-8 hover:border-white/40 transition cursor-pointer"
>
  <Image
  src="/lv-neverfull.png"
  alt="Bags"
  width={220}
  height={220}
  className="absolute right-0 bottom-0 w-40 opacity-30 group-hover:opacity-60 group-hover:scale-105 transition duration-500 pointer-events-none"
/>
        <h3 className="text-2xl font-black group-hover:text-white transition relative z-10">
  Bags
</h3>

<p className="text-gray-400 mt-3 relative z-10">
  Luxury handbags and accessories.
</p>
      </div>
    </div>
  </div>
</section>



<section className="px-6 py-20 border-t border-white/10">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      <div>
        <h3 className="text-4xl font-black">10K+</h3>
        <p className="text-gray-400 mt-2">Orders Delivered</p>
      </div>

      <div>
        <h3 className="text-4xl font-black">24/7</h3>
        <p className="text-gray-400 mt-2">Telegram Support</p>
      </div>

      <div>
        <h3 className="text-4xl font-black">500+</h3>
        <p className="text-gray-400 mt-2">Products Available</p>
      </div>

      <div>
        <h3 className="text-4xl font-black">100%</h3>
        <p className="text-gray-400 mt-2">Private Checkout</p>
      </div>
    </div>
  </div>
</section>
<section className="px-6 py-20 border-t border-white/10">
  <div className="max-w-7xl mx-auto">
    <p className="text-sm tracking-[0.3em] text-gray-500 font-bold">
      HOW TO ORDER
    </p>

    <h2 className="text-4xl md:text-6xl font-black mt-3">
      ORDER IN
      <br />
      3 SIMPLE STEPS.
    </h2>

    <p className="text-gray-400 mt-6 text-lg max-w-2xl">
      Browse products, build your cart, and checkout directly through Telegram.
      Fast, simple, and secure.
    </p>

    <div className="grid md:grid-cols-3 gap-6 mt-12">

      <div className="bg-zinc-950 border border-white/10 rounded-[2rem] p-8 hover:border-white/30 transition">
        <div className="text-5xl font-black text-white/20">01</div>

        <h3 className="text-2xl font-black mt-4">
          Browse
        </h3>

        <p className="text-gray-400 mt-3 leading-relaxed">
          Explore Electronics, Clothing, Shoes, Fragrances, and Bags.
        </p>
      </div>

      <div className="bg-zinc-950 border border-white/10 rounded-[2rem] p-8 hover:border-white/30 transition">
        <div className="text-5xl font-black text-white/20">02</div>

        <h3 className="text-2xl font-black mt-4">
          Add To Cart
        </h3>

        <p className="text-gray-400 mt-3 leading-relaxed">
          Choose your quantity or bundle deal, then review your cart before checkout.
        </p>
      </div>

      <div className="bg-zinc-950 border border-white/10 rounded-[2rem] p-8 hover:border-white/30 transition">
        <div className="text-5xl font-black text-white/20">03</div>

        <h3 className="text-2xl font-black mt-4">
          Checkout
        </h3>

        <p className="text-gray-400 mt-3 leading-relaxed">
          Complete your order through Telegram. We'll confirm your order, shipping details, and answer any questions.
        </p>
      </div>

    </div>
  </div>
</section>
      <section id="catalog" className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <div>
              <p className="text-sm tracking-[0.3em] text-gray-500 font-bold">
                FEATURED CATALOG
              </p>
              <h2 className="text-4xl md:text-6xl font-black mt-2">
                LATEST DROPS
              </h2>
            </div>

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-80 px-4 py-3 rounded-full bg-zinc-950 border border-white/10 text-white outline-none focus:border-white"
            />
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`px-5 py-2 rounded-full text-sm font-bold border transition ${
                  category === item
                    ? "bg-white text-black border-white"
                    : "bg-zinc-950 text-white border-white/10 hover:border-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {filteredProducts.length === 0 ? (
            <p className="text-gray-400">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-zinc-950 rounded-[2rem] p-4 border border-white/10 hover:border-white/40 transition"
                >
                  <div className="mb-3 inline-flex rounded-full bg-white text-black px-3 py-1 text-xs font-black tracking-widest">
                    {product.badge}
                  </div>

                  <a href={`/products/${product.slug}`}>
                    <div className="overflow-hidden rounded-[1.5rem] bg-zinc-900">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-72 w-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>
                  </a>

                  <div className="p-2 pt-5">
                    <p className="text-xs tracking-[0.25em] text-gray-500 font-bold">
                      {product.category}
                    </p>

                    <a href={`/products/${product.slug}`}>
                      <h3 className="text-2xl font-black mt-2 hover:underline">
                        {product.name}
                      </h3>
                    </a>

                    <p className="mt-2 text-lg text-gray-300">
                     {product.price === 0 ? "Message For Pricing" : `$${product.price}`}
                    </p>

                    <button
                      onClick={() => addToCart(product)}
                      className="mt-5 w-full bg-white text-black py-4 rounded-full font-black hover:bg-gray-200 transition"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>              ))}
            </div>
          )}
        </div>
      </section>
      <footer className="border-t border-white/10 py-12 px-6 mt-20">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
    <div>
      <h3 className="text-2xl font-black">GLOBAL SUPPLY™</h3>
      <p className="text-gray-500 text-sm mt-2">
        Exclusive Drops • Private Checkout
      </p>
    </div>

    <div className="flex gap-6 text-gray-400">
      <a href="#catalog" className="hover:text-white">
        Catalog
      </a>

      <a
        href="https://t.me/GlobalSupplyOffical"
        target="_blank"
        className="hover:text-white"
      >
        Telegram
      </a>
    </div>
  </div>
  <section className="px-6 py-24 border-t border-white/10">
  <div className="max-w-7xl mx-auto">
    <p className="text-sm tracking-[0.3em] text-gray-500 font-bold">
      TRUSTED BY THOUSANDS
    </p>

    <h2 className="text-5xl md:text-7xl font-black mt-4">
      REAL CUSTOMER
      <br />
      FEEDBACK
    </h2>

    <div className="grid md:grid-cols-3 gap-6 mt-16">
      <div className="bg-zinc-950 border border-white/10 rounded-[2rem] p-8">
        <p className="text-4xl font-black">15,000+</p>
        <p className="text-gray-400 mt-2">Orders Completed</p>
      </div>

      <div className="bg-zinc-950 border border-white/10 rounded-[2rem] p-8">
        <p className="text-4xl font-black">2,000+</p>
        <p className="text-gray-400 mt-2">Verified Reviews</p>
      </div>

      <div className="bg-zinc-950 border border-white/10 rounded-[2rem] p-8">
        <p className="text-4xl font-black">24/7</p>
        <p className="text-gray-400 mt-2">Customer Support</p>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-6 mt-16">
      <div className="bg-zinc-950 border border-white/10 rounded-[2rem] p-8">
        <p className="text-gray-300">
          "Fast response and smooth ordering process."
        </p>
      </div>

      <div className="bg-zinc-950 border border-white/10 rounded-[2rem] p-8">
        <p className="text-gray-300">
          "Product arrived exactly as expected."
        </p>
      </div>

      <div className="bg-zinc-950 border border-white/10 rounded-[2rem] p-8">
        <p className="text-gray-300">
          "Already placed my second order."
        </p>
      </div>

      <div className="bg-zinc-950 border border-white/10 rounded-[2rem] p-8">
        <p className="text-gray-300">
          "One of the easiest Telegram checkout experiences."
        </p>
      </div>
    </div>

    <div className="mt-12">
      <a
        href="https://t.me/+7pkvkpTPOgIxNjIx"
        target="_blank"
        className="inline-flex bg-white text-black px-8 py-4 rounded-full font-black hover:bg-gray-200 transition"
      >
        VIEW ALL REVIEWS →
      </a>
    </div>
  </div>
</section>
</footer>

 <a
  href="https://https://t.me/+UVjctKKEN_wzN2M5"
  target="_blank"
  className="fixed bottom-6 right-6 z-50 bg-white text-black px-6 py-3 rounded-full font-black shadow-lg hover:scale-105 transition"
>
  💬 Telegram
</a>

</main>
);
}