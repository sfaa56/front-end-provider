"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { House, Mail } from "lucide-react";
// import { Mail } from "lucide-react";
import { Package2 } from "lucide-react";
import { MapPinned } from "lucide-react";
import { Users } from "lucide-react";
import { CreditCard } from "lucide-react";

import { Button } from "./ui/button";
import { LayoutDashboard } from "lucide-react";

import { FaRegFlag } from "react-icons/fa6";
import { Building } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { IoPhoneLandscapeSharp } from "react-icons/io5";
import { FaCreativeCommonsShare } from "react-icons/fa";

import { MdOutlineLibraryBooks } from "react-icons/md";
import { TbUserQuestion } from "react-icons/tb";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlinePostAdd } from "react-icons/md";

// Menu items.
const items = [
  {
    title: "Overview",
    url: "/overview",
    icon: <LayoutDashboard />,
  },
  {
    title: "Users",
    url: "/users",
    icon: <Users />,
  },

  {
    title: "Service Requests",
    url: "/ServiceRequests",
    icon: <MdOutlinePostAdd />,
  }, 
  
  {
    title: "Categories",
    url: "/categoriesAndServices",
    icon: <BiCategoryAlt  />,
  },
  {
    title: "Cities",
    url: "/cities",
    icon: <MapPinned />,
  },

  // {
  //   title: "Projects",
  //   url: "/projects",
  //   icon: <House />,
  // },

  // {
  //   title: "Users",
  //   url: "/users",
  //   icon: <Users />,
  // },

  // {
  //   title: "Package",
  //   url: "/plans",
  //   icon: <Package2 />,
  // },
  // {
  //   title: "Messages",
  //   url: "/messages",
  //   icon: <Mail />,
  // },
  // {
  //   title: "Requests",
  //   url: "/requests",
  //   icon: <TbUserQuestion />,
  // },
  // {
  //   title: "Reports",
  //   url: "/reports",
  //   icon: <FaRegFlag />,
  // },
  {
    title: "Payments",
    url: "/payments/transaction",
    icon: <CreditCard />,
  },
  // {
  //   title: "Amenities",
  //   url: "/amenities",
  //   icon: <FaCreativeCommonsShare />,
  // },
  // {
  //   title: "Panners",
  //   url: "/panners",
  //   icon: <IoPhoneLandscapeSharp />,
  // },
  // {
  //   title: "Blogs",
  //   url: "/blogs",
  //   icon: <MdOutlineLibraryBooks />,
  // },

  // {
  //   title: "CMS",
  //   url: "/cms",
  //   icon: <IoPhoneLandscapeSharp />,
  // },

   {
    title: "Logout",
    icon: <FiLogOut />,
  },
];

export function AppSidebar() {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const pathname = usePathname();

  const handleItemClick = (title: string) => {
    setActiveItem(title);
  };

  console.log("pathhhhh", pathname);

  const pathMap = {
    "/overview": "Overview",
    "/users": "Users",
    "/ServiceRequests":"Service Requests",
    "/categoriesAndServices":"Categories",
    "/pending": "Pending",
    "/Properties": "Properties",
    "/cities": "Cities",
    "/Projects": "Projects",
    "/plans": "Package",
    "/messages": "Messages",
    "/payments": "Payments",
    "/amenities": "Amenities",
    "/panners": "Panners",
    "/requests": "Requests",
    "/reports": "Reports",
    "/cms": "CMS",
    "/blogs": "Blogs",
  };

  useEffect(() => {
    const foundKey = Object.keys(pathMap).find((key) => pathname.includes(key));
    if (foundKey) {
      setActiveItem(pathMap[foundKey as keyof typeof pathMap]);
    }
  }, [pathname]);

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <div className="flex justify-center w-full mb-4">
          <span className="text-2xl font-extrabold tracking-wide font-logo">
            <span className="text-secondary">Pro</span>
            <span className="text-tertiary/90">vider</span>
          </span>
        </div>

        <div className="flex  flex-col gap-1  mt-5">
          {items.map((i, key) => (
            <Link href={i.url || "#"} key={key} className="block">
              <div className="relative w-full px-4">
                {activeItem === i.title && (
                  <div className="rounded-tr-md rounded-br-md w-1 h-6 bg-secondary  absolute top-[6px] left-0 transition-all"></div>
                )}

                <Button
                  variant={"sidebar"}
                  key={key}
                  className={` items-center justify-start gap-3 text-gray-500 ${
                    activeItem === i.title
                      ? " text-secondary bg-secondary bg-opacity-10 font-sans font-semibold"
                      : ""
                  }`}
                  onClick={() => handleItemClick(i.title)}
                >
                  <span
                    className={`${
                      activeItem === i.title ? "text-secondary " : ""
                    }`}
                  >
                    {i.icon}
                  </span>
                  
                  <span className="te">{i.title}</span>
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
