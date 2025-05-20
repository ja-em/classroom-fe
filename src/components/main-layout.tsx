import { MenuItems, MenuLink } from "@/types/menu";
import Link from "next/link";
import { clsx } from "clsx";
import { SearchInput } from "./input/search-input";
import { Suspense } from "react";

export default function MainLayout({
  children,
  title,
  active,
  hideSearch,
}: {
  children: React.ReactNode;
  title?: React.ReactNode;
  active: MenuLink;
  hideSearch?: boolean;
}) {
  const renderTitle = () => {
    if (title) return title;
    return MenuItems[active]?.title ?? "Classroom";
  };
  return (
    <div className="drawer lg:drawer-open min-h-screen">
      {/* Sidebar toggle for mobile */}
      <input id="sidebar-toggle" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-base-200 px-4 shadow-md">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="sidebar-toggle"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 text-xl font-semibold">
            {renderTitle()}
          </div>
          {!hideSearch && (
            <Suspense>
              <SearchInput />
            </Suspense>
          )}
        </div>

        {/* Page Content */}
        <main className="p-4">{children}</main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side shadow-md">
        <label htmlFor="sidebar-toggle" className="drawer-overlay"></label>
        <aside className="menu p-4 w-52 h-full bg-base-200 text-base-content">
          <h2 className="text-xl font-bold mb-4">Classroom</h2>
          <ul className="menu w-full">
            {Object.keys(MenuItems).map((key) => {
              const keyKnown = key as unknown as MenuLink;

              const target = MenuItems[keyKnown];
              return (
                <li key={target?.href}>
                  <Link
                    href={target?.href ?? ""}
                    className={clsx("rounded-lg w-full", {
                      "menu-active": keyKnown === active,
                    })}
                  >
                    {target?.title ?? title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </div>
  );
}
