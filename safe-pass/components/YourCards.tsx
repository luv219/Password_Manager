import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function YourCards() {
  // This is a placeholder. You would typically fetch this data from your backend.
  const cards = [
    { id: 1, last4: "1234", brand: "Visa", expiry: "12/24" },
    { id: 2, last4: "5678", brand: "Mastercard", expiry: "06/25" },
  ]

  return (
    <div className="space-y-4">
      {cards.map((card) => (
        <Card key={card.id}>
          <CardHeader>
            <CardTitle>
              {card.brand} ending in {card.last4}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Expires: {card.expiry}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

