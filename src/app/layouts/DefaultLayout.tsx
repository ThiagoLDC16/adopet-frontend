import { Outlet, Link, useLocation } from "react-router-dom";

export function DefaultLayout() {
    const location = useLocation();
    
    return (
        <div className="shell">
            {/* Topbar */}
            <div className="topbar">
                <small>Conta/Configurações</small>
                <span className="icon">⚙️</span>
            </div>

            {/* Page Content */}
            <main className="page">
                <Outlet />
            </main>

            {/* Bottom Navigation */}
            <nav className="bottom" aria-label="Navegação principal">
                <Link 
                    to="/people" 
                    className={`navBtn ${location.pathname === '/people' ? 'active' : ''}`}
                    aria-label="Pessoas"
                >
                    👥
                </Link>
                <Link 
                    to="/animals" 
                    className={`navBtn ${location.pathname === '/animals' || location.pathname === '/my-animals' ? 'active' : ''}`}
                    aria-label="Animais"
                >
                    🐾
                </Link>
                <Link 
                    to="/settings" 
                    className={`navBtn ${location.pathname === '/settings' ? 'active' : ''}`}
                    aria-label="Configurações"
                >
                    ⚙️
                </Link>
            </nav>
        </div>
    );
}
