import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { BadgeAlert, ClipboardList, Dog, PawPrint } from 'lucide-react';
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { UserType } from "@/features/auth/types";
import { Button } from "@/components/ui/button";

export function DefaultLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout: _logout } = useAuth();

    const logout = () => {
        _logout();
        navigate('/login');
    }

    return (
        <div className="shell">
            {/* Topbar */}
            <div className="topbar">
                <div className="flex w-full gap-3 justify-between">
                    <b className="py-2">Adopet</b>

                    <div className="flex gap-3">
                        {user
                            ? <>
                                <Button onClick={logout}>
                                    Sair
                                </Button>
                            </>
                            : <>
                                <Link to="/login">
                                    <Button>
                                        Login
                                    </Button>
                                </Link>
                            </>}
                    </div>
                </div>
            </div>

            {/* Page Content */}
            <main className="page">
                <Outlet />
            </main>

            {/* Bottom Navigation */}
            <nav className={`grid gap-2.5 py-2 px-4 ${user?.type == UserType.ONG ? 'grid-cols-4' : 'grid-cols-3'}`} aria-label="Navegação principal">
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
                {user?.type && (
                    <Link
                        to="/my-reports"
                        className={`navBtn ${location.pathname === '/my-reports' ? 'active' : ''}`}
                        aria-label="Minhas denúncias"
                    >
                        {user.type === UserType.USER ? <BadgeAlert /> : <ClipboardList />}
                    </Link>
                )}
                {user?.type === UserType.ONG && (
                    <Link
                        to="/pending-reports"
                        className={`navBtn ${location.pathname === '/pending-reports' ? 'active' : ''}`}
                        aria-label="Denúncias abertas"
                    >
                        <BadgeAlert />
                    </Link>
                )}
            </nav>
        </div>
    );
}
