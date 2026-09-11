import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-[#092923] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="mb-4 flex items-center gap-3">
              <Image
                src="/image/logo.svg"
                alt="Ghati Valley Logo"
                width={50}
                height={50}
                className="h-auto w-12"
              />

              <span className="text-2xl font-bold">GHATI VALLEY</span>
            </Link>

            <p className="max-w-sm text-sm leading-6 text-white/70">
              Hotel & Restaurant, Ramgarh, Jharkhand. Where the highway meets
              the hills.
            </p>

            <p className="mt-4 text-sm font-medium tracking-wider text-[#C9A45C]">
              REST. DINE. EXPLORE.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>

            <div className="flex flex-col gap-3 text-sm text-white/70">
              <Link
                href="/#services"
                className="transition hover:text-[#C9A45C]"
              >
                Services
              </Link>

              <Link href="/#dishes" className="transition hover:text-[#C9A45C]">
                Dishes
              </Link>

              <Link href="/#rooms" className="transition hover:text-[#C9A45C]">
                Rooms
              </Link>

              <Link
                href="/#contact"
                className="transition hover:text-[#C9A45C]"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>

            <div className="space-y-4 text-sm text-white/70">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#C9A45C]" />
                <span>Ramgarh, Jharkhand, India</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-[#C9A45C]" />
                <span>+91 XXXXX XXXXX</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-[#C9A45C]" />
                <span>hello@ghativalley.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/60 md:flex-row">
          <p>
            © {new Date().getFullYear()} GHATI VALLEY Hotel & Restaurant. All
            rights reserved.
          </p>

          <p>
            Built by{" "}
            <span className="font-semibold text-[#C9A45C]">devTrOO</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
