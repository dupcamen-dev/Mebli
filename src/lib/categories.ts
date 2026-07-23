import categoriesData from "../../data/categories.json";

export interface Category {
  slug: string;
  title: string;
  desc: string;
  image: string;
  photos: { src: string; alt: string }[];
}

export const categories: Category[] = categoriesData as Category[];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
