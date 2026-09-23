"use client";

import { useEffect } from "react";

export default function ExpansePage() {
  useEffect(() => {
    document
      .querySelector(".site-shell")
      ?.classList.remove("site-shell--exiting-to-expanse");
  }, []);

  return <div aria-hidden="true" className="expanse-page" />;
}
