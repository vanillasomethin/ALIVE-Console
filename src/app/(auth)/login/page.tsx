import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  return (
    <div className="grid" style={{ minHeight: "70vh", placeItems: "center" }}>
      <Card style={{ maxWidth: "420px", width: "100%" }}>
        <CardHeader>
          <h1>Admin login</h1>
          <p style={{ color: "#6b7280" }}>
            Authentication will be wired to the admin auth provider once available.
          </p>
        </CardHeader>
        <CardContent>
          <Input label="Email" type="email" placeholder="admin@alive.com" />
          <Input label="Password" type="password" placeholder="••••••••" />
          <Button type="button">Sign in</Button>
          <Button type="button" variant="outline">
            Use SSO (placeholder)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
