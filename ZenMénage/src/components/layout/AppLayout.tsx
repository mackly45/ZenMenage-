import { ReactNode } from 'react';
import { Sidebar } from '../dashboard/Sidebar';
import { MobileNav } from '../mobile/MobileNav';

interface AppLayoutProps {
    children: ReactNode;
    onLogout: () => void;
    onAddTask: () => void;
}

export function AppLayout({ children, onLogout, onAddTask }: AppLayoutProps) {
    return (
        <div className="flex min-h-screen bg-[#F5F6F8]">
            <Sidebar
                onLogout={onLogout}
            />
            <div className="flex-1 pb-20 md:pb-0">
                {children}
            </div>
            <MobileNav
                onAddTask={onAddTask}
            />
        </div>
    );
}
