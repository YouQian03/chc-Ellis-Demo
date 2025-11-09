import LoginForm from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="p-6 flex items-center justify-between">
        <img src="/ellis-logo.png" alt="Ellis Logo" className="h-12 w-auto" />
      </header>
      <main className="flex-1 flex items-center justify-center px-4">
        <LoginForm />
      </main>
    </div>
  )
}
