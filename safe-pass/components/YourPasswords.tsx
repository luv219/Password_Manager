"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

interface Password {
  website: string;
  username: string;
  password: string;
}

export function YourPasswords({ passwords }: { passwords: Password[] }) {
  const [visiblePasswords, setVisiblePasswords] = useState<Record<number, boolean>>({});

  const toggleVisibility = (index: number) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Passwords</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 h-48 overflow-y-auto">
          {passwords.length === 0 && <span>No Passwords Added</span>}
          {passwords.map((pw, index) => (
            <li 
              key={index} 
              className="flex justify-between items-center p-2 rounded bg-secondary"
            >
              <div>
                <Link href={pw.website} target="_blank">
                  <div className="font-semibold hover:underline">{pw.website}</div>
                </Link>
                <div className="text-sm text-muted-foreground">{pw.username}</div>
                <div className="text-sm text-muted-foreground">
                  {visiblePasswords[index] ? pw.password : "••••••••"}
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => toggleVisibility(index)}
                aria-label={visiblePasswords[index] ? "Hide password" : "Show password"}
              >
                {visiblePasswords[index] ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}