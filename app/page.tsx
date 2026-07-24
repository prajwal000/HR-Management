import { LoginForm } from "@/app/login-form";

export default function LoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-neutral-900">
            HR Manager
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Sign in to your account
          </p>
        </div>

        <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
          <LoginForm />
        </div>

        <p className="mt-6 text-center text-xs text-neutral-400">
          Accounts are created by an administrator. Contact your admin if you
          don&apos;t have credentials.
        </p>
      </div>
    </main>
  );
}
