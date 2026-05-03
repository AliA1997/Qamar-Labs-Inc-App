import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  // {
  //   id: 1,
  //   title: "Home",
  //   path: "/",
  //   newTab: false,
  // },
  {
    id: 2,
    title: "About",
    path: "/about",
    newTab: false,
  },
  {
    id: 3,
    title: "Privacy Policies",
    newTab: false,
    submenu: [
        {
          id: 1,
          title: "Dawaar(Work in Progress)",
          path: "/privacy-policy/dawaar",
          newTab: true,
        },
        {
          id: 2,
          title: "Al Saqr(Work in Progress)",
          path: "/privacy-policy/alsaqr",
          newTab: true,
        },
        {
          id: 3,
          title: "Mūsūʿah",
          path: "/privacy-policy/musuah",
          newTab: true,
        },
        {
          id: 4,
          title: "The Comeback App",
          path: "/privacy-policy/comebackapp",
          newTab: true,
        },

    ]
  },
  {
    id: 4,
    title: "Contact Us",
    path: "/contact",
    newTab: false,
  },
];
export default menuData;
