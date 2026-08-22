// src/layouts/Header.tsx
function Header() {
  return (
    <header className="bg-brand-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center">
        <div className="flex items-center gap-3">
          <span className="text-2xl">👥</span>
          <span className="font-bold text-xl tracking-tight">Mini RRHH</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
