import { AddCard } from "@/components/AddCard"
import { AddPassword } from "@/components/AddPassword"
import { YourCards } from "@/components/YourCards"
import { YourPasswords } from "@/components/YourPasswords"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-primary">Add a Credit/Debit Card</h1>
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
          <YourCards />
        </div>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-primary">Your Passwords</h1>
          <YourPasswords />
        </div>
      </div>
    </div>
  )
}

