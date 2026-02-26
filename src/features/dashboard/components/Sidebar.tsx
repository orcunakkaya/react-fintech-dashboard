import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import logoSvg from "@/assets/auth/fintech-logo.svg";
import helpSvg from "@/assets/dashboard/help-icon.svg";
import logoutSvg from "@/assets/dashboard/logout-icon.svg";

import HomeIcon from "@/shared/ui/Icons/HomeIcon";
import TransactionsIcon from "@/shared/ui/Icons/TransactionsIcon";
import InvoicesIcon from "@/shared/ui/Icons/InvoicesIcon";
import WalletIcon from "@/shared/ui/Icons/WalletIcon";
import SettingsIcon from "@/shared/ui/Icons/SettingsIcon";

import { logout } from "@/features/auth/store/auth.actions";

type IconProps = { className?: string };
type NavItem = {
  to: string;
  label: string;
  icon: React.ComponentType<IconProps>;
};

const navItems: NavItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: HomeIcon },
  {
    to: "/transactions",
    label: "Transactions",
    icon: TransactionsIcon,
  },
  {
    to: "/invoices",
    label: "Invoices",
    icon: InvoicesIcon,
  },
  {
    to: "/wallets",
    label: "My Wallets",
    icon: WalletIcon,
  },
  {
    to: "/settings",
    label: "Settings",
    icon: SettingsIcon,
  },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/auth", { replace: true });
  };
  return (
    <div className="h-full lg:fixed w-67.5 gap-8 flex flex-col px-6.25 pt-7.5 pb-25 bg-[#FAFAFA]">
      <img src={logoSvg} alt="Fintech" className="h-7.5 w-[107.314px]" />

      <div className="flex flex-col justify-between flex-1">
        <nav className="flex flex-col gap-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "flex w-full items-center gap-3 rounded-lg py-3.5 pl-3.75 pr-20.25 text-left text-sm",
                    isActive
                      ? "bg-[#C8EE44] text-[#1B212D] font-semibold"
                      : "text-gray-500 font-medium hover:bg-white",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`w-5 h-5 ${isActive ? "text-[#1B212D]" : "text-[#929EAE]"}`}
                    />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
        <div className="flex flex-col gap-0.5">
          <button
            className={`w-full gap-3 flex items-center cursor-pointer pl-3.75 pr-20.25 py-3.5 text-sm font-medium text-left rounded-lg text-gray-500`}
          >
            <img
              src={helpSvg}
              alt={`Help icon`}
              className="inline-block w-5 h-5"
            />
            <span>Help</span>
          </button>
          <button
            className={`w-full gap-3 flex items-center cursor-pointer pl-3.75 pr-20.25 py-3.5 text-sm font-medium text-left rounded-lg text-gray-500`}
            onClick={handleLogout}
            type="button"
          >
            <img
              src={logoutSvg}
              alt={`Logout icon`}
              className="inline-block w-5 h-5"
            />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
