export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="admin-card p-6">
        <h1 className="admin-title text-3xl font-bold mb-2">Dashboard</h1>
        <p className="admin-subtitle text-lg">
          Bem-vindo ao painel de controle
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="admin-card p-6">
          <h3 className="admin-title text-lg font-semibold mb-2">Usuários</h3>
          <p className="admin-subtitle">Gerencie os usuários do sistema</p>
        </div>

        <div className="admin-card p-6">
          <h3 className="admin-title text-lg font-semibold mb-2">
            Configurações
          </h3>
          <p className="admin-subtitle">Ajuste as configurações do sistema</p>
        </div>

        <div className="admin-card p-6">
          <h3 className="admin-title text-lg font-semibold mb-2">Relatórios</h3>
          <p className="admin-subtitle">Visualize relatórios e estatísticas</p>
        </div>
      </div>
    </div>
  );
}
