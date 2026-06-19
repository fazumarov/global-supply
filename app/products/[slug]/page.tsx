import { notFound } from "next/navigation";
import { products } from "@/app/lib/products";
import ProductPageClient from "./ProductPageClient";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = products.find(
    (p) => p.slug === slug
  );

  if (!product) {
    notFound();
  }

  return <ProductPageClient product={product} />;
}