import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function YourPasswords() {
  // This is a placeholder. You would typically fetch this data from your backend.
  const passwords = [
    { id: 1, website: "example.com", username: "johndoe@example.com" },
    { id: 2, website: "anothersite.com", username: "janedoe@example.com" },
  ]

  return (
    <div className="space-y-4">
      {passwords.map((password) => (
        <Card key={password.id}>
          <CardHeader>
            <CardTitle>{password.website}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Username: {password.username}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

