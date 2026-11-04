"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { sanitizeSearchTerm } from "../../../services/Queries/queryActions";
import { request } from "../../../services/requests/request";

function itemHref(kind, item) {
  if (kind === "product") return `/products/${item.id}`;
  return `/view?entity=companies&id=${item.id}`;
}

export default function HeaderSearch({ autoFocus = false, onNavigate }) {
  const router = useRouter();
  const inputId = useId();
  const rootRef = useRef(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({ products: [], companies: [] });
  const [error, setError] = useState("");

  useEffect(() => {
    const term = sanitizeSearchTerm(query);

    if (term.length < 2) {
      setResults({ products: [], companies: [] });
      setError("");
      setLoading(false);
      return;
    }

    let active = true;
    setLoading(true);
    setError("");

    const timer = window.setTimeout(async () => {
      try {
        const search = { term, columns: ["name", "description"] };
        const [products, companies] = await Promise.all([
          request("Products", { search, limit: 5 }),
          request("Companies", { search, limit: 5 }),
        ]);

        if (!active) return;
        setResults({
          products: products || [],
          companies: companies || [],
        });
      } catch (searchError) {
        if (!active) return;
        setResults({ products: [], companies: [] });
        setError(searchError.message || "Search failed.");
      } finally {
        if (active) setLoading(false);
      }
    }, 250);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [query]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const term = sanitizeSearchTerm(query);
  const hasQuery = term.length >= 2;
  const empty = !loading && hasQuery && !results.products.length && !results.companies.length;

  const goToList = () => {
    if (!term) return;
    setOpen(false);
    onNavigate?.();
    router.push(`/view-list?entity=products&q=${encodeURIComponent(term)}`);
  };

  return (
    <div ref={rootRef} className="relative w-full min-w-0">
      <label htmlFor={inputId} className="sr-only">
        Search products and companies
      </label>
      <div className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3">
        <svg
          className="h-4 w-4 shrink-0 text-slate-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path strokeLinecap="round" d="M20 20l-3-3" />
        </svg>
        <input
          id={inputId}
          value={query}
          autoFocus={autoFocus}
          placeholder="Search products or companies"
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              goToList();
            }
            if (event.key === "Escape") setOpen(false);
          }}
          className="h-10 w-full min-w-0 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
        />
      </div>

      {open && hasQuery ? (
        <div className="absolute left-0 right-0 z-50 mt-2 max-h-[min(24rem,70vh)] overflow-auto rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
          {loading ? (
            <p className="px-3 py-3 text-sm text-slate-500">Searching...</p>
          ) : null}

          {error ? (
            <p className="px-3 py-3 text-sm text-red-700">{error}</p>
          ) : null}

          {empty && !error ? (
            <p className="px-3 py-3 text-sm text-slate-500">No matches found.</p>
          ) : null}

          {results.products.length > 0 ? (
            <div>
              <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Products
              </p>
              {results.products.map((item) => (
                <Link
                  key={item.id}
                  href={itemHref("product", item)}
                  onClick={() => {
                    setOpen(false);
                    onNavigate?.();
                  }}
                  className="block rounded-lg px-3 py-2 hover:bg-blue-50"
                >
                  <span className="block text-sm font-medium text-slate-900">
                    {item.name}
                  </span>
                  <span className="block text-xs text-slate-500">
                    {item.type || "Product"}
                    {item.company?.name ? ` · ${item.company.name}` : ""}
                  </span>
                </Link>
              ))}
            </div>
          ) : null}

          {results.companies.length > 0 ? (
            <div>
              <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Companies
              </p>
              {results.companies.map((item) => (
                <Link
                  key={item.id}
                  href={itemHref("company", item)}
                  onClick={() => {
                    setOpen(false);
                    onNavigate?.();
                  }}
                  className="block rounded-lg px-3 py-2 hover:bg-blue-50"
                >
                  <span className="block text-sm font-medium text-slate-900">
                    {item.name}
                  </span>
                  <span className="block text-xs text-slate-500">
                    {item.is_contracted ? "Contracted" : "Company"}
                  </span>
                </Link>
              ))}
            </div>
          ) : null}

          <button
            type="button"
            onClick={goToList}
            className="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-blue-600 hover:bg-blue-50"
          >
            View all results for “{term}”
          </button>
        </div>
      ) : null}
    </div>
  );
}
