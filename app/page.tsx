import Image from "next/image";
import Link from "next/link";
import { products } from "@/app/lib/products";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* HEADER */}
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              GLOBAL SUPPLY
            </h1>

            <p className="text-gray-500 text-sm mt-1">
              Premium products. Better prices.
            </p>
          </div>

          <Link
            href="/cart"
            className="flex items-center gap-2 rounded-full border border-black px-5 py-3 font-black hover:bg-black hover:text-white transition"
          >
            CART
          </Link>
        </header>

        {/* CATALOG */}
        <section>
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-black">
              CATALOG
            </h2>

            <span className="text-sm text-gray-500">
              {products.length} products
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <Link
                key={`${product.id}-${product.slug}`}
                href={`/products/${product.slug}`}
                className="group block"
              >
                <article className="h-full rounded-[1.7rem] border border-black/10 bg-white overflow-hidden transition duration-200 hover:-translate-y-1 hover:shadow-xl">

                  {/* PRODUCT IMAGE */}
                  <div className="relative aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={700}
                      height={700}
                      className="w-full h-full object-contain p-3 sm:p-4 transition duration-300 group-hover:scale-[1.04]"
                    />

                    {/* BADGE */}
                    {product.badge && (
                      <span className="absolute top-3 left-3 rounded-full bg-black text-white px-3 py-1.5 text-[10px] sm:text-xs font-black tracking-wide">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* PRODUCT INFORMATION */}
                  <div className="p-4 sm:p-5">
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-gray-500 font-bold">
                      {product.category}
                    </p>

                    <h3 className="mt-2 text-base sm:text-lg font-black leading-tight line-clamp-2">
                      {product.name}
                    </h3>

                    <div className="mt-4 flex items-center justify-between gap-2">
                      <div>
                        {product.price === 0 ? (
                          <span className="text-sm sm:text-base font-black">
                            Message for pricing
                          </span>
                        ) : (
                          <>
                            <span className="text-xs text-gray-500 block">
                              From
                            </span>

                            <span className="text-xl sm:text-2xl font-black">
                              ${product.price}
                            </span>
                          </>
                        )}
                      </div>

                      <span className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-black group-hover:scale-110 transition">
                        →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}