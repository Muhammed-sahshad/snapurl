import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import { Link2, LogOut, Plus, User } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect } from "react";
import { logout } from "@/features/auth/authThunk";

export const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout())
  }
  useEffect(() => {}, [user]);

  return (
    <nav className="border-b border-white/10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to={"/"}>
            <div className="flex items-center space-x-2">
              <Link2 className="h-8 w-8 text-amber-400" />
              <span className="text-2xl font-bold text-white">SnapUrl</span>
            </div>
          </Link>
          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-white hover:text-amber-400">
                    Sign In
                  </Button>
                </Link>
                <Link to="/login">
                  <Button className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-black font-semibold">
                    Get Started
                  </Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback className="bg-gradient-to-r from-amber-400 to-orange-500 text-black">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-46 bg-white/5 border border-white/10 backdrop-blur-md shadow-lg text-white"
                >
                  <DropdownMenuLabel className="text-sm text-white px-2 py-1.5">
                    <div className="font-semibold text-white">{user.name || "My Account"}</div>
                    <div className="text-xs text-gray-400 truncate">{user.email}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem
                    className="text-white hover:bg-amber-400/10 hover:text-amber-300 transition-colors"
                    asChild
                  >
                    <Link to="/urls">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Short URL
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem
                    className="text-white hover:bg-amber-400/10 hover:text-amber-300 transition-colors"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
