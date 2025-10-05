import { Outlet, Link, useLocation } from "react-router-dom";
import { BadgeAlert, Dog, PawPrint, Settings } from 'lucide-react';
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { UserType } from "@/features/auth/types";

export function DefaultLayout() {
    const location = useLocation();
    const { user } = useAuth();



    return (
        <div className="shell">
            {/* Topbar */}
            <div className="topbar">
                {/* <small>Conta/Configurações</small>
                <span className="icon">⚙️</span> */}
            </div>

            {/* Page Content */}
            <main className="page">
                <Outlet />
            </main>

            {/* Bottom Navigation */}
            <nav className="bottom" aria-label="Navegação principal">
                <Link
                    to="/animals"
                    className={`navBtn ${location.pathname === '/animals' ? 'active' : ''}`}
                    aria-label="Animais para Adoção"
                >
                    <PawPrint />
                </Link>
                {user?.type === UserType.ONG && (
                    <Link
                        to="/my-animals"
                        className={`navBtn ${location.pathname === '/my-animals' ? 'active' : ''}`}
                        aria-label="Meus Animais"
                    >
                        <Dog />
                    </Link>
                )}
                {user?.type === UserType.USER && (
                    <Link
                        to="/my-reports"
                        className={`navBtn ${location.pathname === '/my-reports' ? 'active' : ''}`}
                        aria-label="Minhas denúncias"
                    >
                        <BadgeAlert />
                    </Link>
                )}
                {user && (
                    <Link
                        to="/settings"
                        className={`navBtn ${location.pathname === '/settings' ? 'active' : ''}`}
                        aria-label="Configurações"
                    >
                        <Settings />
                    </Link>
                )}
            </nav>
        </div>
    );
}
