


export default async function MainLayout({
    children,
}:{
    children: React.ReactNode;
}) {


return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header con padding e larghezza uniformi */}
      <header className="w-full border-b border-gray-100 py-5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Household Scheduler
          </h1>
        </div>
      </header>

      {/* Main content con la stessa identica spaziatura */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        {children}
      </main>
    </div>
  );
}