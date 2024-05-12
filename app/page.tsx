import { LoginButton } from "@/components/login-button";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-sky-500">
      <div className="space-y-6">
        <h1 className="text-6xl font-bold text-white drop-shadow-md">Auth</h1>
        <p className="text-white text-lg">Auth.js authentication demo</p>
        <div>
          <LoginButton>
            <Button size="lg" variant="secondary">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
