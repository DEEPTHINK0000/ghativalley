"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

interface Dish {
  id: number;
  name: string;
  category: string;
  price: number | null;
  half_price: number | null;
  full_price: number | null;
  unit: string | null;
  description: string;
  variants: string[];
  available: boolean;
}

interface DishesResponse {
  success: boolean;
  currency: string;
  currency_symbol: string;
  total_categories: number;
  total_dishes: number;
  categories: unknown[];
  menu: Dish[];
}

export default function DishesPage() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [currencySymbol, setCurrencySymbol] = useState("₹");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDishes() {
      try {
        const data = await apiFetch<DishesResponse>("/api/dishes");

        if (!data.success) {
          throw new Error("Failed to load menu");
        }

        setDishes(data.menu);

        setCurrencySymbol(data.currency_symbol);
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
      <main className="flex min-h-screen items-center justify-center bg-[#F7F3EA]">
        <p className="text-lg text-[#123C35]">Loading Ghati Valley menu...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F3EA] px-6">
        <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow">
          <h1 className="text-xl font-bold text-red-600">
            Unable to load menu
          </h1>

          <p className="mt-2 text-sm text-gray-600">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F3EA]">
      {/* HERO */}

      <section className="bg-[#123C35] px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#E8D7AD]">
            Ghati Valley
          </p>

          <h1 className="mt-3 text-4xl font-bold md:text-6xl">Our Menu</h1>

          <p className="mx-auto mt-5 max-w-2xl text-white/70">
            Fresh flavours, traditional Indian favourites and memorable dining.
          </p>

          <div className="mx-auto mt-7 h-px w-20 bg-[#C9A45C]" />
        </div>
      </section>

      {/* MENU */}

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-12 text-center">
          <p className="text-sm text-[#5F6864]">Explore our complete menu</p>

          <p className="mt-2 text-sm text-[#123C35]">{dishes.length} dishes</p>
        </div>

        {/* GROUP BY CATEGORY */}

        {Array.from(new Set(dishes.map((dish) => dish.category))).map(
          (category) => {
            const categoryDishes = dishes.filter(
              (dish) => dish.category === category
            );

            return (
              <section key={category} className="mb-16">
                {/* CATEGORY TITLE */}

                <div className="mb-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A45C]">
                    Ghati Valley
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-[#123C35] md:text-3xl">
                    {category}
                  </h2>

                  <div className="mt-3 h-0.5 w-16 bg-[#C9A45C]" />
                </div>

                {/* DISHES */}

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryDishes.map((dish) => (
                    <article
                      key={dish.id}
                      className="group rounded-2xl border border-[#123C35]/10 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      {/* NAME + PRICE */}

                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-lg font-semibold text-[#171A19]">
                          {dish.name}
                        </h3>

                        {/* NORMAL PRICE */}

                        {dish.price !== null && (
                          <span className="whitespace-nowrap text-lg font-bold text-[#9E7A3D]">
                            {currencySymbol}
                            {dish.price}
                          </span>
                        )}
                      </div>

                      {/* HALF / FULL PRICE */}

                      {dish.half_price !== null && dish.full_price !== null && (
                        <div className="mt-4 rounded-lg bg-[#F7F3EA] px-3 py-3">
                          <div className="flex items-center gap-3 text-sm">
                            <span className="font-medium text-[#123C35]">
                              Half
                            </span>

                            <span className="font-bold text-[#9E7A3D]">
                              {currencySymbol}
                              {dish.half_price}
                            </span>

                            <span className="text-gray-400">/</span>

                            <span className="font-medium text-[#123C35]">
                              Full
                            </span>

                            <span className="font-bold text-[#9E7A3D]">
                              {currencySymbol}
                              {dish.full_price}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* DESCRIPTION */}

                      {dish.description && (
                        <p className="mt-4 text-sm leading-6 text-[#5F6864]">
                          {dish.description}
                        </p>
                      )}

                      {/* UNIT */}

                      {dish.unit && (
                        <p className="mt-4 text-xs font-medium uppercase tracking-wider text-[#123C35]/60">
                          {dish.unit}
                        </p>
                      )}

                      {/* VARIANTS */}

                      {dish.variants.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {dish.variants.map((variant) => (
                            <span
                              key={variant}
                              className="rounded-full border border-[#C9A45C]/40 bg-[#E8D7AD]/20 px-3 py-1 text-xs font-medium text-[#123C35]"
                            >
                              {variant}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* AVAILABLE */}

                      <div className="mt-5 flex items-center justify-between">
                        <span
                          className={
                            dish.available
                              ? "text-xs font-medium text-[#3F765B]"
                              : "text-xs font-medium text-red-600"
                          }
                        >
                          {dish.available ? "Available" : "Unavailable"}
                        </span>
                      </div>

                      {/* GOLD LINE */}

                      <div className="mt-5 h-px w-0 bg-[#C9A45C] transition-all duration-300 group-hover:w-full" />
                    </article>
                  ))}
                </div>
              </section>
            );
          }
        )}
      </section>

      {/* FOOTER */}

      <section className="border-t border-[#123C35]/10 bg-white px-6 py-10 text-center">
        <p className="text-sm text-[#5F6864]">All prices are in INR.</p>

        <p className="mt-2 text-sm font-medium text-[#123C35]">
          Where the road meets the hills
        </p>
      </section>
    </main>
  );
}
