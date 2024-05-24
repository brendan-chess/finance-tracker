"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardNavBar() {
  return (
    <div className="flex w-full justify-center gap-10 py-6 px-20 mb-10">
      <DashboardNavBarLink path="" title="Dashboard" />
      <DashboardNavBarLink path="/transactions" title="Transactions" />
      <DashboardNavBarLink path="/categories" title="Categories" />
      <DashboardNavBarLink path="/account" title="Account" />
    </div>
  );
}

function DashboardNavBarLink(props: { path: string; title: string }) {
  const pathname = usePathname();

  return (
    <Link
      href={`/dashboard${props.path}`}
      className={
        pathname === `/dashboard${props.path}`
          ? "underline underline-offset-4 decoration-2"
          : ""
      }
    >
      {props.title}
    </Link>
  );
}
