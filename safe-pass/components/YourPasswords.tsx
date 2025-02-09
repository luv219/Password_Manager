"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Eye, EyeOff, Copy, Check } from "lucide-react";
import Link from "next/link";

interface Password {
  website: string;
  username: string;
  password: string;
}

export function YourPasswords({ passwords }: { passwords: Password[] }) {
  const [visiblePasswords, setVisiblePasswords] = useState<Record<number, boolean>>({});
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const toggleVisibility = (index: number) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const copyToClipboard = async (text: string, identifier: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates((prev) => ({ ...prev, [identifier]: true }));
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [identifier]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Card className="shadow-lg rounded-lg border">
      <CardHeader className="bg-gradient-to-l from-blue-500 to-purple-600 text-white py-4 rounded-t-lg">
        <CardTitle className="text-lg font-bold">Your Passwords</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4 h-48 overflow-y-auto p-2">
          {passwords.length === 0 && <span className="text-gray-500">No Passwords Added</span>}
          {passwords.map((pw, index) => (
            <li key={index} className="flex flex-col gap-2 p-3 rounded-lg border ">
              <div className="flex items-center justify-between gap-2">
                <Link href={pw.website} target="_blank" className="text-sm-600 font-semibold hover:underline">
                  {pw.website}
                </Link>
                <Button variant="ghost" size="icon" onClick={() => toggleVisibility(index)}>
                  {visiblePasswords[index] ? <EyeOff className="h-5 w-5 text-gray-600" /> : <Eye className="h-5 w-5 text-gray-600" />}
                </Button>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm text-sm-700 flex-grow">{pw.username}</div>
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(pw.username, `username-${index}`)}>
                  {copiedStates[`username-${index}`] ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5 text-gray-600" />}
                </Button>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm text-sm-700 flex-grow">
                  {visiblePasswords[index] ? pw.password : "••••••••"}
                </div>
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(pw.password, `password-${index}`)}>
                  {copiedStates[`password-${index}`] ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5 text-gray-600" />}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
