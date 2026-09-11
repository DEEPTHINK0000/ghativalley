"use client";

import * as React from "react";
import Link from "next/link";
import {
  BedDouble,
  ChevronRight,
  Hotel,
  LogIn,
  Phone,
  UserPlus,
} from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";

const services = [
  {
    title: "Hotel Services",
    href: "/services/hotel",
    description:
      "Comfortable stays, room service, housekeeping, and complete hotel facilities.",
  },
  {
    title: "Restaurant Services",
    href: "/services/restaurant",
    description:
      "Enjoy quality food, table service, online ordering, and restaurant facilities.",
  },
  {
    title: "Table Booking",
    href: "/services/table-booking",
    description:
      "Reserve your table easily and enjoy a comfortable dining experience.",
  },
];

const dishes = [
  {
    title: "Breakfast",
    href: "/dishes/breakfast",
    description: "Fresh and delicious breakfast options.",
  },
  {
    title: "Main Course",
    href: "/dishes/main-course",
    description: "A variety of delicious main course dishes.",
  },
  {
    title: "Beverages",
    href: "/dishes/beverages",
    description: "Refreshing hot and cold beverages.",
  },
  {
    title: "Desserts",
    href: "/dishes/desserts",
    description: "Sweet dishes to complete your meal.",
  },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      {" "}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/image/logo.svg"
            alt="Ghati Valley Logo"
            width={50}
            height={50}
            className="w-10 h-auto"
          />

          <span className="text-xl font-bold">GHATI VALLEY</span>
        </Link>

        {/* Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {/* Services */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Services</NavigationMenuTrigger>

              <NavigationMenuContent>
                <ul className="grid w-[500px] gap-2 p-3 md:grid-cols-2">
                  {services.map((service) => (
                    <ListItem
                      key={service.title}
                      href={service.href}
                      title={service.title}
                    >
                      {service.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Dishes */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Dishes</NavigationMenuTrigger>

              <NavigationMenuContent>
                <ul className="grid w-[450px] gap-2 p-3 md:grid-cols-2">
                  {dishes.map((dish) => (
                    <ListItem
                      key={dish.title}
                      href={dish.href}
                      title={dish.title}
                    >
                      {dish.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Rooms */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <div className="flex items-center gap-2">
                  <BedDouble className="h-4 w-4" />
                  Rooms
                </div>
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                <ul className="grid w-[500px] gap-2 p-3 md:grid-cols-3">
                  {/* Silver Room */}
                  <ListItem href="/rooms/silver" title="Silver Room">
                    Low-price rooms with self-receiving and self-service
                    facilities.
                  </ListItem>

                  {/* Bronze Room */}
                  <ListItem href="/rooms/bronze" title="Bronze Room">
                    Mid-price rooms with basic quality and selected food orders
                    delivered to your room.
                  </ListItem>

                  {/* Gold Room */}
                  <ListItem href="/rooms/gold" title="Gold Room">
                    Premium rooms with high-quality facilities and in-room food
                    delivery.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Contact */}
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                render={
                  <Link href="/contact" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Contact
                  </Link>
                }
              />
            </NavigationMenuItem>

            {/* Account */}
            <NavigationMenuItem className="hidden md:block">
              <NavigationMenuTrigger>Account</NavigationMenuTrigger>

              <NavigationMenuContent>
                <ul className="w-[220px] p-2">
                  {/* Login */}
                  <li>
                    <NavigationMenuLink
                      render={
                        <Link
                          href="/login"
                          className="flex items-center gap-3 rounded-md p-3 hover:bg-muted"
                        >
                          <LogIn className="h-5 w-5" />

                          <div>
                            <div className="text-sm font-medium">Login</div>

                            <div className="text-xs text-muted-foreground">
                              Sign in to your account
                            </div>
                          </div>
                        </Link>
                      }
                    />
                  </li>

                  {/* Sign Up */}
                  <li>
                    <NavigationMenuLink
                      render={
                        <Link
                          href="/signup"
                          className="flex items-center gap-3 rounded-md p-3 hover:bg-muted"
                        >
                          <UserPlus className="h-5 w-5" />

                          <div>
                            <div className="text-sm font-medium">Sign Up</div>

                            <div className="text-xs text-muted-foreground">
                              Create a new account
                            </div>
                          </div>
                        </Link>
                      }
                    />
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  href: string;
}) {
  return (
    <li {...props}>
      <NavigationMenuLink
        render={
          <Link
            href={href}
            className="group flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-muted"
          >
            <div className="flex-1">
              <div className="mb-1 text-sm font-medium leading-none">
                {title}
              </div>

              <div className="line-clamp-2 text-sm text-muted-foreground">
                {children}
              </div>
            </div>

            <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        }
      />
    </li>
  );
}
