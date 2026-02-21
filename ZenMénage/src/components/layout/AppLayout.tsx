import { ReactNode } from 'react';
import { Sidebar } from '../dashboard/Sidebar';
import { MobileNav } from '../mobile/MobileNav';

interface AppLayoutProps {
    children: ReactNode;
    currentPage: string;
    onPageChange: (page: any) => void;
    onLogout: () => void;
    onAddTask: () => void;
}

export function AppLayout({ children, currentPage, onPageChange, onLogout, onAddTask }: AppLayoutProps) {
    return (
        <div className="flex min-h-screen bg-[#F5F6F8]">
            <Sidebar
                currentPage={currentPage}
                onPageChange={onPageChange}
                onLogout={onLogout}
            />
            <div className="flex-1 pb-20 md:pb-0">
                {children}
            </div>
            <MobileNav
                currentPage={currentPage}
                onPageChange={onPageChange}
                onAddTask={onAddTask}
            />
        </div>
    );
}
