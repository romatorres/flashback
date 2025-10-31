import { LoginForm } from "./_components/login-form";
import Image from "next/image";

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Image
        src="/img/logo-branco.svg"
        alt="Banda Flashback"
        width={180}
        height={140}
        className="mb-8"
      />
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Entre com suas credenciais para acessar sua conta
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
