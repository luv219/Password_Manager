"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Eye, EyeOff, Copy, Check } from "lucide-react";

interface CardProps {
  cardNo: string;
  expiry: string;
  cvv: number;
}

export function YourCards({ cards }: { cards: CardProps[] }) {
  const [visibleCVV, setVisibleCVV] = useState<Record<number, boolean>>({});
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const toggleCVVVisibility = (index: number) => {
    setVisibleCVV((prev) => ({
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
    <Card className="shadow-lg rounded-lg">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-t-lg">
        <CardTitle className="text-lg font-bold">Your Cards</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4 h-48 overflow-y-auto p-2">
          {cards.length === 0 && <span>No Cards Added</span>}
          {cards.map((card, index) => (
            <li key={card.cardNo} className="flex flex-col gap-2 p-3 rounded-lg border">
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm flex-grow">
                  Card Number: 
                  <span className="ml-2 font-medium">{card.cardNo}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => copyToClipboard(card.cardNo, `card-${index}`)}
                >
                  {copiedStates[`card-${index}`] ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </Button>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm">
                  Expiry: 
                  <span className="ml-2 font-medium">{card.expiry}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">
                    CVV: 
                    <span className="ml-2 font-medium">
                      {visibleCVV[index] ? card.cvv : "•••"}
                    </span>
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => toggleCVVVisibility(index)}
                  >
                    {visibleCVV[index] ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}