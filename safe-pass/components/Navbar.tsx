"use client";
import React, {useEffect} from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const router=useRouter()
  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  useEffect(() => {
    const handleSignOut = () => {
      router.refresh(); // Refresh the page when the user signs out
    };

    return () => {
      handleSignOut();
    };
  }, [router]);


  return (
    <nav className="flex justify-between items-center px-4 h-16 text-white bg-[linear-gradient(90deg,_#6366f1_0%,_#818cf8_30%,_#818cf8_70%,_#6366f1_100%)] relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,_#8b5cf6_0%,_#8b5cf6_20%,_transparent_50%,_#8b5cf6_80%,_#8b5cf6_100%)] " />
      <span className="font-bold text-xl relative z-10">Safe PASS</span>
      {/* <ul className="flex gap-5 items-center justify-start relative z-10 font-bold">
        <li>Home</li>
        <li>About</li>
        <li>Services</li>
      </ul> */}
      <div className="flex gap-2 justify-center items-center relative z-10">
        <Button variant="outline" size="icon" onClick={toggleTheme}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;