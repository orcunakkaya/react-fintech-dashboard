import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[calc(100vh-140px)] items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-[#F5F5F5] bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold text-[#929EAE]">404</p>
        <h1 className="mt-2 text-2xl font-bold text-[#1B212D]">Page not found</h1>
        <p className="mt-2 text-sm text-[#929EAE]">
          The page you are looking for does not exist or may have been moved.
        </p>

        <Link
          to="/dashboard"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#C8EE44] px-5 py-2.5 text-sm font-semibold text-[#1B212D]"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}