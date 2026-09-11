"use client";

import { useState } from "react";
import { X, PartyPopper } from "lucide-react";

export default function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="w-full overflow-hidden bg-ghati-gold text-ghati-charcoal">
      <div className="mx-auto flex min-h-10 max-w-7xl items-center gap-3 px-4 py-2 text-sm font-medium">
        {/* Discount Badge */}
        <span className="shrink-0 rounded-md bg-ghati-forest px-3 py-1 text-xs font-bold tracking-wide text-white">
          50% DISCOUNT
        </span>

        {/* Announcement */}
        <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
          <PartyPopper className="h-4 w-4 shrink-0" />

          {/* Marquee Container */}
          <div className="min-w-0 flex-1 overflow-hidden whitespace-nowrap">
            <div className="inline-block animate-marquee">
              <span>
                Discount 50% for today only. Available now! &nbsp; • &nbsp;
              </span>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="shrink-0 rounded-md p-1 transition hover:bg-black/10"
          aria-label="Close announcement"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
