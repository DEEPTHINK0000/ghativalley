"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
interface Dish {
  name: string;
  price?: number;
  half_price?: number;
  full_price?: number;
  unit?: string;
  description?: string;
  variants?: string[];
}
interface DishCategory {
  category_name: string;
  items: Dish[];
}
interface DishesResponse {
  success: boolean;
  currency: string;
  currency_symbol: string;
  categories: DishCategory[];
}
export default function DishesPage() {
  const [menu, setMenu] = useState<DishesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    async function loadDishes() {
      try {
        const data = await apiFetch<DishesResponse>("/api/dishes");
        if (!data.success) {
          throw new Error("Failed to load dishes");
        }
        setMenu(data);
      } catch (error) {
        console.error("Dishes error:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load dishes"
        );
      } finally {
        setLoading(false);
      }
    }
    loadDishes();
  }, []);
  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F3EA]">
        {" "}
        <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
          {" "}
          <p className="text-lg text-[#123C35]">
            {" "}
            Loading Ghati Valley menu...{" "}
          </p>{" "}
        </div>{" "}
      </main>
    );
  }
  if (error) {
    return (
      <main className="min-h-screen bg-[#F7F3EA]">
        {" "}
        <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
          {" "}
          <div className="rounded-xl border border-red-200 bg-white p-8 text-center shadow-sm">
            {" "}
            <h1 className="text-xl font-semibold text-red-600">
              {" "}
              Unable to load menu{" "}
            </h1>{" "}
            <p className="mt-2 text-sm text-gray-600"> {error} </p>{" "}
          </div>{" "}
        </div>{" "}
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-[#F7F3EA]">
      {" "}
      {/* Header */}{" "}
      <section className="bg-[#123C35] px-6 py-16 text-white">
        {" "}
        <div className="mx-auto max-w-7xl text-center">
          {" "}
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#E8D7AD]">
            {" "}
            Ghati Valley{" "}
          </p>{" "}
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            {" "}
            Our Menu{" "}
          </h1>{" "}
          <p className="mx-auto mt-4 max-w-2xl text-white/75">
            {" "}
            Fresh flavours, delicious food and memorable dining.{" "}
          </p>{" "}
          <div className="mx-auto mt-6 h-px w-20 bg-[#C9A45C]" />{" "}
        </div>{" "}
      </section>{" "}
      {/* Menu */}{" "}
      <section className="mx-auto max-w-7xl px-6 py-12">
        {" "}
        {menu?.categories.map((category) => (
          <section key={category.category_name} className="mb-16">
            {" "}
            {/* Category heading */}{" "}
            <div className="mb-7">
              {" "}
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A45C]">
                {" "}
                Ghati Valley{" "}
              </p>{" "}
              <h2 className="mt-2 text-2xl font-bold text-[#123C35] md:text-3xl">
                {" "}
                {category.category_name}{" "}
              </h2>{" "}
              <div className="mt-3 h-0.5 w-16 bg-[#C9A45C]" />{" "}
            </div>{" "}
            {/* Dishes */}{" "}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {" "}
              {category.items.map((dish) => (
                <article
                  key={dish.name}
                  className="group rounded-2xl border border-[#123C35]/10 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {" "}
                  {/* Dish name + price */}{" "}
                  <div className="flex items-start justify-between gap-4">
                    {" "}
                    <h3 className="text-lg font-semibold text-[#171A19]">
                      {" "}
                      {dish.name}{" "}
                    </h3>{" "}
                    {/* Normal price */}{" "}
                    {dish.price !== undefined && (
                      <span className="whitespace-nowrap text-lg font-bold text-[#9E7A3D]">
                        {" "}
                        {menu.currency_symbol} {dish.price}{" "}
                      </span>
                    )}{" "}
                  </div>{" "}
                  {/* Half / Full price */}{" "}
                  {dish.half_price !== undefined &&
                    dish.full_price !== undefined && (
                      <div className="mt-4 flex items-center gap-3 rounded-lg bg-[#F7F3EA] px-3 py-2 text-sm">
                        {" "}
                        <span className="font-medium text-[#123C35]">
                          {" "}
                          Half{" "}
                        </span>{" "}
                        <span className="font-bold text-[#9E7A3D]">
                          {" "}
                          {menu.currency_symbol} {dish.half_price}{" "}
                        </span>{" "}
                        <span className="text-gray-400"> / </span>{" "}
                        <span className="font-medium text-[#123C35]">
                          {" "}
                          Full{" "}
                        </span>{" "}
                        <span className="font-bold text-[#9E7A3D]">
                          {" "}
                          {menu.currency_symbol} {dish.full_price}{" "}
                        </span>{" "}
                      </div>
                    )}{" "}
                  {/* Description */}{" "}
                  {dish.description && (
                    <p className="mt-4 text-sm leading-6 text-[#5F6864]">
                      {" "}
                      {dish.description}{" "}
                    </p>
                  )}{" "}
                  {/* Unit */}{" "}
                  {dish.unit && (
                    <p className="mt-4 text-xs font-medium uppercase tracking-wider text-[#123C35]/60">
                      {" "}
                      {dish.unit}{" "}
                    </p>
                  )}{" "}
                  {/* Variants */}{" "}
                  {dish.variants && dish.variants.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {" "}
                      {dish.variants.map((variant) => (
                        <span
                          key={variant}
                          className="rounded-full border border-[#C9A45C]/40 bg-[#E8D7AD]/20 px-3 py-1 text-xs font-medium text-[#123C35]"
                        >
                          {" "}
                          {variant}{" "}
                        </span>
                      ))}{" "}
                    </div>
                  )}{" "}
                  {/* Bottom decoration */}{" "}
                  <div className="mt-5 h-px w-0 bg-[#C9A45C] transition-all duration-300 group-hover:w-full" />{" "}
                </article>
              ))}{" "}
            </div>{" "}
          </section>
        ))}{" "}
      </section>{" "}
      {/* Footer note */}{" "}
      <section className="border-t border-[#123C35]/10 bg-white px-6 py-10 text-center">
        {" "}
        <p className="text-sm text-[#5F6864]">
          {" "}
          All prices are in {menu?.currency || "INR"}.{" "}
        </p>{" "}
        <p className="mt-2 text-sm font-medium text-[#123C35]">
          {" "}
          Where the road meets the hills{" "}
        </p>{" "}
      </section>{" "}
    </main>
  );
}
