import Image from "next/image";

export default function Footer() {
  const getCurrentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-4 border-t border-border">
      <div className="max-w-7xl mx-auto text-center flex flex-col md:flex-row justify-between items-center">
        <a href="#home">
          <Image
            src="/img/logo-icon.png"
            alt="Logomarca"
            width={40}
            height={40}
          />
        </a>
        <div>
          <p className="font-body text-muted-foreground">
            ©{getCurrentYear} Banda Flashback. Todos os direitos reservados.
          </p>
        </div>
        <a
          href="https://romatorres.dev.br"
          target="_blank"
          className="hover:-translate-x-0.5 duration-300"
        >
          <Image
            src="/img/logo-roma.svg"
            alt="Logo Parceiro"
            width={28}
            height={28}
          />
        </a>
      </div>
    </footer>
  );
}
