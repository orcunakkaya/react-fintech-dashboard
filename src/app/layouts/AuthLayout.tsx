import type { ReactNode } from "react";
import heroImage from "@/assets/auth/auth-hero.png";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-[765fr_675fr]">
        <div className="flex items-center justify-center px-6 py-10 md:justify-start md:px-0 md:py-0">
          <div className="w-full max-w-md md:w-101 md:max-w-none md:ml-[calc((100%-404px)*0.374)]">
            {children}
          </div>
        </div>

        <div className="relative hidden md:block bg-[#E6E6E6]">
          <img
            src={heroImage}
            alt="Fintech hero"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
