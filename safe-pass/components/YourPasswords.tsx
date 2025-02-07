import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "./ui/button"
import { Eye } from "lucide-react"
import Link from "next/link";

interface Password {
  website: string;
  username: string;
  password: string;
}

export function YourPasswords({passwords}: {passwords: Password[]}) {
  // This is a placeholder. You would typically fetch this data from your backend.


  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Passwords</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 h-48 overflow-y-auto">
        {passwords.length===0 && <span>No Cards Added</span>}
          {passwords.map((pw, index) => (
            <li key={index} className="flex justify-between items-center p-2 rounded">
              <div>
                <Link href={pw.website} target="_blank">
                <div className="font-semibold">{pw.website}</div>
                </Link>
                <div className="text-sm text-muted-foreground">{pw.username}</div>
                <div className="text-sm text-muted-foreground">{pw.password}</div>
              </div>
              <Button variant="ghost" size="icon">
                <Eye className="h-4 w-4"/>
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

