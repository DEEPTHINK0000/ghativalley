"use client";

import { useEffect, useState } from "react";

interface DishItem {
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
  items: DishItem[];
}

interface DishesResponse {
  success: boolean;
  currency: string;
  currency_symbol: string;
  categories: DishCategory[];
}

export default function Home() {
  const [menu, setMenu] = useState<DishesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  render -----------------------
    const API_URL = "https://ghati-valley.onrender.com";
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        // const API_URL = `https://ghati-valley.onrender.com/`;

        console.log("API URL:", API_URL);

        if (!API_URL) {
          throw new Error("NEXT_PUBLIC_API_URL is missing");
        }

        const url = `${API_URL}/api/dishes`;

        console.log("Fetching:", url);

        const response = await fetch(url);

        console.log("Status:", response.status);
        console.log("OK:", response.ok);

        const text = await response.text();

        console.log("Response:", text);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${text}`);
        }

        const data: DishesResponse = JSON.parse(text);

        console.log("Parsed data:", data);

        if (!data.success) {
          throw new Error("API returned success=false");
        }

        setMenu(data);
      } catch (error) {
        console.error("DISH API ERROR:", error);

        setError(
          error instanceof Error ? error.message : "Unable to load menu."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, []);

  // json        -------------------
  // useEffect(() => {
  //   const fetchDishes = async () => {
  //     try {
  //       const response = await fetch("http://localhost:5000/api/dishes");

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch dishes");
  //       }

  //       const data: DishesResponse = await response.json();

  //       if (!data.success) {
  //         throw new Error("API returned an error");
  //       }

  //       setMenu(data);
  //     } catch (error) {
  //       console.error(error);
  //       setError("Unable to load menu.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchDishes();
  // }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading menu...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Ghati Valley
          </p>

          <h1 className="mt-2 text-4xl font-bold">Our Menu</h1>

          <p className="mt-3 text-muted-foreground">
            Fresh flavours, delicious food and memorable dining.
          </p>
        </div>

        {/* Categories */}
        {menu?.categories.map((category) => (
          <section key={category.category_name} className="mb-14">
            {/* Category Name */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold">{category.category_name}</h2>

              <div className="mt-2 h-px w-16 bg-current" />
            </div>

            {/* Items */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {category.items.map((item) => (
                <div
                  key={item.name}
                  className="rounded-xl border p-5 transition hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-semibold">{item.name}</h3>

                    {/* Normal Price */}
                    {item.price !== undefined && (
                      <span className="whitespace-nowrap font-bold">
                        {menu.currency_symbol}
                        {item.price}
                      </span>
                    )}
                  </div>

                  {/* Half / Full Price */}
                  {item.half_price !== undefined &&
                    item.full_price !== undefined && (
                      <div className="mt-2 text-sm">
                        <span>
                          Half: {menu.currency_symbol}
                          {item.half_price}
                        </span>

                        <span className="mx-2">|</span>

                        <span>
                          Full: {menu.currency_symbol}
                          {item.full_price}
                        </span>
                      </div>
                    )}

                  {/* Description */}
                  {item.description && (
                    <p className="mt-3 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  )}

                  {/* Unit */}
                  {item.unit && (
                    <p className="mt-3 text-xs uppercase tracking-wide text-muted-foreground">
                      {item.unit}
                    </p>
                  )}

                  {/* Variants */}
                  {item.variants && item.variants.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.variants.map((variant) => (
                        <span
                          key={variant}
                          className="rounded-full border px-2.5 py-1 text-xs"
                        >
                          {variant}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
