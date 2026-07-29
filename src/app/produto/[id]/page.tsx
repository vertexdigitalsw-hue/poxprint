import { getAllProducts } from "@/lib/utils";
import ProductDetailClient from "@/components/ProductDetailClient";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ id: p.id }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  return <ProductDetailClient id={params.id} />;
}
