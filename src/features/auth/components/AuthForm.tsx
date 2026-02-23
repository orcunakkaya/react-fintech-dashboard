import { Formik } from "formik";
import { toast } from "react-toastify";
import Input from "@/shared/ui/Input";
import Button from "@/shared/ui/Button";
import { signInSchema, signUpSchema } from "../schemas/auth.schema";
import googleSvg from "@/assets/auth/google.svg"; 
type Mode = "signin" | "signup";

type Values = {
  fullName: string;
  email: string;
  password: string;
};

type AuthFormProps = {
  mode: Mode;
};

export default function AuthForm({ mode }: AuthFormProps) {
  const isSignUp = mode === "signup";

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
          // Şimdilik API yok: loading + success simülasyonu
          await new Promise((r) => setTimeout(r, 600));

          toast.success(
            isSignUp ? "Account created (demo)" : "Signed in (demo)",
          );
          helpers.resetForm();
        } catch {
          toast.error("Something went wrong");
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
                disabled={f.isSubmitting}
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
              disabled={f.isSubmitting}
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
              disabled={f.isSubmitting}
              error={
                f.touched.password
                  ? (f.errors.password as string | undefined)
                  : undefined
              }
            />
          </div>

          <div className="space-y-6.25">
            <Button type="submit" isLoading={f.isSubmitting}>
              {isSignUp ? "Create Account" : "Sign In"}
            </Button>
            <Button type="button" disabled={f.isSubmitting} className="bg-transparent border border-[#F5F5F5] text-[#78778B] hover:bg-gray-100">
                <img src={googleSvg} alt="Google" className="w-6 h-6 mr-2.5 inline-block" />
                {isSignUp ? "Sign up with Google" : "Sign in with Google"}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
}
