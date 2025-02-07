import { AddCard } from "@/components/AddCard";
import { AddPassword } from "@/components/AddPassword";
import { YourCards } from "@/components/YourCards";
import { YourPasswords } from "@/components/YourPasswords";
import { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";

export const metadata: Metadata = {
  title: "Safe PASS - Home",
  description: "This is my homepage of my password manager",
};

export default async function Home() {
  const user = await currentUser();
  console.log(user?.privateMetadata);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-primary">
            Add a Credit/Debit Card
          </h1>
          <AddCard />
        </div>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-primary">Add a Password</h1>
          <AddPassword />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-primary">Your Cards</h1>
          <YourCards
            cards={
              Array.isArray(user?.privateMetadata.cards)
                ? user?.privateMetadata.cards
                : []
            }
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-primary">Your Passwords</h1>
          <YourPasswords
            passwords={
              Array.isArray(user?.privateMetadata.passwords)
                ? user?.privateMetadata.passwords
                : []
            }
          />
        </div>
      </div>
    </div>
  );
}
