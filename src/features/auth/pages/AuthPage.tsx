import { useMemo, useState } from "react";
import AuthLayout from "@/app/layouts/AuthLayout";
import logoSvg from "@/assets/auth/fintech-logo.svg";
import AuthForm from "../components/AuthForm";

type Mode = "signin" | "signup";

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>("signin");

  const title = useMemo(() => {
    return mode === "signin" ? "Sign In" : "Create new account";
  }, [mode]);

  return (
    <AuthLayout>
      <div className="absolute top-10">
        <img
          src={logoSvg}
          alt="Fintech"
          className="h-7.5 w-[107.314px]"
        />
      </div>

      <div className="space-y-6.25">
        <div className="space-y-2">
          <div className="text-3xl font-semibold text-[#1B212D]">{title}</div>
          <div className="text-[#78778B]">Welcome back! Please enter your details</div>
        </div>
        <AuthForm mode={mode} />
      </div>
    </AuthLayout>
  );
}
