import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "@/shared/ui/Button";
import { useProfile } from "@/features/auth/hooks/useProfile";
import { logout } from "@/features/auth/store/auth.actions";

export default function DashboardPage() {
  const navigate = useNavigate();
  const profile = useProfile();

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/auth", { replace: true });
  };

  return (
    <div className="min-h-screen p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">Dashboard</h1>

          {profile.isLoading ? (
            <p className="mt-2 text-sm text-gray-500">Loading profile...</p>
          ) : profile.isError ? (
            <p className="mt-2 text-sm text-red-600">Profile could not be loaded</p>
          ) : (
            <p className="mt-2 text-sm text-gray-600">
              {profile.data.fullName} • {profile.data.email}
            </p>
          )}
        </div>

        <div className="w-[160px]">
          <Button type="button" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      {/* Dashboard content later */}
      <div className="p-4 mt-8 text-sm text-gray-600 border rounded-xl">
        Dashboard widgets will be here.
      </div>
    </div>
  );
}