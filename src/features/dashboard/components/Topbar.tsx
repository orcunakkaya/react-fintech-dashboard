import { useState } from "react";
import { useProfile } from "@/features/auth/hooks/useProfile";
import searchIcon from "@/assets/dashboard/search-icon.svg";
import notificationIcon from "@/assets/dashboard/notification-icon.svg";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logoutSvg from "@/assets/dashboard/logout-icon.svg";
import { logout } from "@/features/auth/store/auth.actions";
type Props = {
  title?: string;
  onOpenSidebar: () => void;
};

export default function Topbar({ title = "Dashboard", onOpenSidebar }: Props) {
  const { data: profile } = useProfile();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
      logout();
      toast.success("Logged out");
      navigate("/auth", { replace: true });
    };

  return (
    <div className="flex items-center justify-between gap-4 py-7.5 px-10">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="grid bg-white border border-gray-200 h-11 w-11 place-items-center rounded-xl lg:hidden"
          aria-label="Open menu"
        >
          ☰
        </button>

        <h1 className="text-[25px] font-semibold leading-none text-[#1B212D]">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-11.25">
        <button
          type="button"
          className="grid cursor-pointer place-items-center rounded-xl"
          aria-label="Search"
        >
          <img src={searchIcon} alt="Search" className="w-6 h-6" />
        </button>

        <button
          type="button"
          className="grid cursor-pointer place-items-center rounded-xl"
          aria-label="Notifications"
        >
          <img src={notificationIcon} alt="Notifications" className="w-6 h-6" />
        </button>

        <div className="relative">
          <button
            type="button"
            className="flex items-center w-[215px] gap-2 sm:gap-3 rounded-[100px] bg-[#FAFAFA] pl-1.75 pr-3.75 sm:px-3 py-1.5 text-sm text-slate-900 hover:bg-slate-50 cursor-pointer"
            aria-haspopup="menu"
            aria-expanded="false"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="inline-flex items-center justify-center text-xs font-semibold rounded-full w-9 h-9 sm:h-10 sm:w-10 bg-slate-200 text-slate-700 shrink-0">
              {(profile?.fullName ?? "U")
                      .split(" ")
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((p) => p[0]?.toUpperCase())
                      .join("")}
            </span>
            <span className="hidden sm:block max-w-[120px] lg:max-w-[160px] truncate text-sm font-medium text-slate-900">
              {profile?.fullName ?? 'User'}
            </span>
            <img
              alt=""
              aria-hidden="true"
              className="hidden w-2 h-2 sm:block shrink-0"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABjSURBVHgBhcqxEUBAEIXht7YAIglmVu56uBKURClK0IESBHICkchoYM0FN2NuDn+0++ajojYrAMFnOiekOuAnUox8nceUZjmByMaR9vu2dOyeN+yRu9mPIX6iaJWYtpTGhvsNeBMly8cSUGYAAAAASUVORK5CYII="
            />
          </button>

          {menuOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-[215px] rounded-xl border border-slate-200 bg-white p-1 shadow-lg z-50"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center w-full gap-2 px-3 py-2 text-sm text-left rounded-lg cursor-pointer text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                      role="menuitem"
                    >
                      <img
                        src={logoutSvg}
                        alt="Logout icon"
                        className="w-4 h-4"
                      />
                      Logout
                    </button>
                  </div>
                )}
        </div>
      </div>
    </div>
  );
}
