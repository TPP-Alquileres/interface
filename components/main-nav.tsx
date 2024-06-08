import * as React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { NavItem } from "@/types/nav";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  const { data: session } = useSession();

  const landingPage = session?.user?.isAdmin ? "/admin/moderate" : "/home";
  const redirectUrl = session?.user ? landingPage : "/";

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href={redirectUrl} className="flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="inline-block font-bold">Seguros</span>
      </Link>
    </div>
  );
}
