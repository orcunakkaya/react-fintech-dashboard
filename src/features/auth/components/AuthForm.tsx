import { Formik } from "formik";
import { toast } from "react-toastify";
import Input from "@/shared/ui/Input";
import Button from "@/shared/ui/Button";
import { signInSchema, signUpSchema } from "../schemas/auth.schema";
import googleSvg from "@/assets/auth/google.svg"; 
import vectorSvg from "@/assets/auth/vector.svg"; 

import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useRegister } from "../hooks/useRegister";
import { getErrorMessage } from "@/shared/lib/errorHandler";
import { tokenStorage } from "../store/auth.token";

type Mode = "signin" | "signup";

type Values = {
  fullName: string;
  email: string;
  password: string;
};

type AuthFormProps = {
  mode: Mode;
  setMode: (mode: Mode) => void;
};

export default function AuthForm({ mode, setMode }: AuthFormProps) {
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const isSignUp = mode === "signup";
  const isLoading = loginMutation.isPending || registerMutation.isPending;
  const initialValues: Values = {
    fullName: "",
    email: "",
    password: "",
  };

  const validationSchema = isSignUp ? signUpSchema : signInSchema;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, helpers) => {
  try {
    if (isSignUp) {
      const res = await registerMutation.mutateAsync({
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      });

      toast.success(res.message || "User registered successfully");
      setMode("signin");
      return;
    }

    const res = await loginMutation.mutateAsync({
      email: values.email,
      password: values.password,
    });

    tokenStorage.set(res.data.accessToken);
    toast.success(res.message || "Login successful");
    navigate("/dashboard", { replace: true });
  } catch (err) {
    toast.error(getErrorMessage(err, "Authentication failed"));
  } finally {
    helpers.setSubmitting(false);
  }
}}
    >
      {(f) => (
        <form onSubmit={f.handleSubmit} className="space-y-6.25">
          <div className="space-y-5">
            {isSignUp && (
              <Input
                label="Full Name"
                name="fullName"
                placeholder="John Doe"
                value={f.values.fullName}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                disabled={isLoading}
                error={
                  f.touched.fullName
                    ? (f.errors.fullName as string | undefined)
                    : undefined
                }
              />
            )}

            <Input
              label="Email"
              name="email"
              placeholder="example@gmail.com"
              value={f.values.email}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              disabled={isLoading}
              error={
                f.touched.email
                  ? (f.errors.email as string | undefined)
                  : undefined
              }
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={f.values.password}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              disabled={isLoading}
              error={
                f.touched.password
                  ? (f.errors.password as string | undefined)
                  : undefined
              }
            />
          </div>

          <div className="space-y-6.25">
            <Button type="submit" isLoading={isLoading}>
              {isSignUp ? "Create Account" : "Sign In"}
            </Button>
            <Button type="button" disabled={isLoading} className="bg-transparent border border-[#F5F5F5] text-[#78778B] hover:bg-gray-100">
                <img src={googleSvg} alt="Google" className="w-6 h-6 mr-2.5 inline-block" />
                {isSignUp ? "Sign up with Google" : "Sign in with Google"}
            </Button>
            <p className="text-center">
                <span className="text-sm text-[#929EAE]">
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}
                </span>
                <button
                    type="button"
                    onClick={() => {
                        f.resetForm();
                        setMode(isSignUp ? "signin" : "signup");
                    }}
                    className="ml-1 text-sm cursor-pointer hover:underline"
                >
                    <div className="grid gap-1 place-items-center">
                        <span className="tracking-normal">
                            {isSignUp ? "Sign in" : "Sign up"}
                        </span>
                        <img src={vectorSvg} alt="Arrow" className="w-10.75 text-[#C8EE44]" />
                    </div>
                </button>
            </p>
          </div>
        </form>
      )}
    </Formik>
  );
}
