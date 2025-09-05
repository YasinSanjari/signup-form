import SignupForm from "./components/SignupForm";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";

function App() {
  return (
    <ThemeProvider>
      <main className="min-h-screen bg-background flex items-center justify-center p-4 flex-col">
        <div className="w-full flex justify-start">
          <ModeToggle />
        </div>
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              Create Account
            </h1>
            <p className="text-muted-foreground">
              Join university of Hormozgan today and get started
            </p>
          </div>
          <SignupForm />
          <Toaster />
        </div>
      </main>
    </ThemeProvider>
  );
}

export default App;
