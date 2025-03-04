import { LogOut, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "@/redux/slices/authSlice";

export default function FacebookNav() {
  const dispatch = useDispatch();
  return (
    <>
      <header className="bg-white p-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <h3 className="text-gray-600 text-2xl font-bold">platform 0</h3>
        <div className="flex space-x-2">
          <Button size="icon" variant="ghost">
            <Search className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="ghost" asChild>
            <Link to={"/post/create"}>
              <Plus className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => dispatch(logoutAction())}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>
    </>
  );
}
