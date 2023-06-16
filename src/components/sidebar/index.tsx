import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const MENU = [
  {
    label: "Thông tin thiếu nhi",
    path: "/student",
  },
  {
    label: "Điểm danh",
    path: "/attendance",
  },
];

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="min-h-full bg-white border-r border-[#E0E0E0] w-[300px] p-4">
      {MENU.map((item, index) => {
        return (
          <Link
            key={item.path}
            href={item.path}
            className={`block p-2 hover:bg-opacity-20 transition ease-out rounded-md mt-2 first:mt-0 ${
              router.pathname === item.path
                ? "text-primary bg-primary bg-opacity-20 font-bold hover:bg-primary"
                : "text-secondary hover:bg-secondary"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
