import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/app/lib/products";

export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = products.find(
    (p) => p.slug === params.slug
  );

  if (!product) {
    notFound();
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
              className="w-full h-auto object-cover"
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
             {product.price === 0 ? "Message For Pricing" : `$${product.price}`}
            </p>

            <div className="mt-8 bg-zinc-950 border border-white/10 rounded-[2rem] p-6">
              <div className="space-y-3">
                <p>✓ Premium Quality</p>
                <p>✓ Fast Shipping</p>
                <p>✓ Secure Checkout</p>
                <p>✓ Exclusive Drop</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-black mb-4">
                Description
              </h2>

              <p className="text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            <button className="mt-8 w-full bg-white text-black py-4 rounded-full font-black hover:bg-gray-200 transition">
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}