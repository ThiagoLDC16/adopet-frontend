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
        <div className="shell max-w-4xl w-full mx-auto">
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
            <main className="page w-full">
                <Outlet />
            </main>

            {/* Bottom Navigation */}
            <nav className={`flex gap-2 justify-center items-center mb-3`} aria-label="Navegação principal">
                <Link
                    to="/animals"
                    className={`navBtn ${user ? "flex-1" : "w-1/4"} ${location.pathname === '/animals' ? 'active' : ''}`}
                    aria-label="Animais para Adoção"
                >
                    <PawPrint />
                </Link>
                {user?.type === UserType.ONG && (
                    <Link
                        to="/my-animals"
                        className={`navBtn  flex-1 ${location.pathname === '/my-animals' ? 'active' : ''}`}
                        aria-label="Meus Animais"
                    >
                        <Dog />
                    </Link>
                )}
                {user?.type && (
                    <Link
                        to="/my-reports"
                        className={`navBtn flex-1 ${location.pathname === '/my-reports' ? 'active' : ''}`}
                        aria-label="Minhas denúncias"
                    >
                        {user.type === UserType.USER ? <BadgeAlert /> : <ClipboardList />}
                    </Link>
                )}
                {user?.type === UserType.ONG && (
                    <Link
                        to="/pending-reports"
                        className={`navBtn flex-1 ${location.pathname === '/pending-reports' ? 'active' : ''}`}
                        aria-label="Denúncias abertas"
                    >
                        <BadgeAlert />
                    </Link>
                )}
            </nav>
        </div>
    );
}
