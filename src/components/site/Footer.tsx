export default function Footer() {
  const getCurrentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-4 border-t border-border">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-body text-muted-foreground">
          ©{getCurrentYear} Banda Flashback. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
