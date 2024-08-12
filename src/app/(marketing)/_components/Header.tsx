"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, useAuth, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const { isLoaded } = useAuth();

  return (
    <div className="flex justify-between items-center max-w-[1800px] mx-auto p-4">
      <Image src="/logo.png" alt="logo" width={50} height={50} />
      <Unauthenticated>
        <Button className="bg-[#4dc88a]" asChild>
          <SignInButton mode="modal" />
        </Button>
      </Unauthenticated>
      <Authenticated>
        <div className="flex items-center gap-4">
          <Button className="bg-[#4dc88a]" size="sm" asChild>
            <Link href="/home">Enter MindDraft</Link>
          </Button>
          <UserButton />
        </div>
      </Authenticated>
      <AuthLoading>
        <Loader className="animate-spin" />
      </AuthLoading>
    </div>
  );
};

export default Header;
