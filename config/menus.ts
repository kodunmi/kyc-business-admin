import {
  Application,
  DashBoard,
  ListFill,
  PretentionChartLine2,
  Stacks2,
  User,
} from "@/components/svg";

export interface MenuItemProps {
  title: string;
  icon: any;
  href?: string;
  child?: MenuItemProps[];
  megaMenu?: MenuItemProps[];
  multi_menu?: MenuItemProps[];
  nested?: MenuItemProps[];
  onClick: () => void;
}

export const menusConfig = {
  mainNav: [
    {
      title: "Home",
      icon: Application,
      href: "/",
    },
    {
      title: "Workflows",
      icon: Stacks2,
      href: "/workflows",
    },
    {
      title: "Verifications",
      icon: ListFill,
      href: "/verifications",
    },
    {
      title: "Customers",
      icon: User,
      href: "/customers",
    },
    {
      title: "Integration",
      icon: PretentionChartLine2,
      href: "/integration",
    },
  ],
  sidebarNav: {
    modern: [
      {
        title: "Home",
        icon: Application,
        href: "/",
      },
      {
        title: "Workflows",
        icon: Stacks2,
        href: "/workflows",
      },
      {
        title: "Verifications",
        icon: ListFill,
        href: "/verifications",
      },
      {
        title: "Customers",
        icon: User,
        href: "/customers",
      },
      {
        title: "Integration",
        icon: PretentionChartLine2,
        href: "/integration",
      },
    ],
    classic: [
      {
        isHeader: true,
        title: "menu",
      },
      {
        title: "blank",
        icon: DashBoard,
        href: "/blank",
      },
    ],
  },
};

export type ModernNavType = (typeof menusConfig.sidebarNav.modern)[number];
export type ClassicNavType = (typeof menusConfig.sidebarNav.classic)[number];
export type MainNavType = (typeof menusConfig.mainNav)[number];
