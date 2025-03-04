import { Button } from "@/components/ui/button";
import {
  Home,
  MessageCircle,
  UserRound,
  Users,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <nav className="bg-white border-t flex justify-around p-2 sticky bottom-0">
        <Button variant="ghost" size="icon" asChild>
          <Link to={"/"}>
            <Home className="h-6 w-6" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <Link to={"/user/profile"}>
            <UserRound className="h-6 w-6" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon">
          <MessageCircle className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <Link to={"/users/list"}>
            <UsersRound className="h-6 w-6" />
          </Link>
        </Button>
      </nav>
    </>
  );
};

export default Footer;
