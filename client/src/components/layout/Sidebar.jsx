import { NavLink } from 'react-router-dom';
import { FolderOpenIcon, LayoutDashboardIcon, SettingsIcon, UsersIcon } from 'lucide-react';

import MyTasksSidebar from './MyTasksSidebar';
import ProjectSidebar from './ProjectsSidebar';

const Sidebar = ({ isOpen, onClose }) => {
    const menuItems = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboardIcon },
        { name: 'Projects', href: '/projects', icon: FolderOpenIcon },
        { name: 'Teams', href: '/teams', icon: UsersIcon },
        { name: 'Settings', href: '/settings', icon: SettingsIcon },
    ];

    return (
        <aside
            className={[
                'fixed inset-y-0 left-0 z-30 flex flex-col h-screen',
                'bg-white dark:bg-zinc-950 border-r border-gray-200 dark:border-white/10',
                'transition-all duration-300 ease-in-out',
                'lg:relative lg:translate-x-0 lg:z-auto',
                // Width management: icon-only on md (80px), full on lg (256px)
                'w-64 md:w-20 lg:w-64',
                isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
            ].join(' ')}
        >
            <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col py-4">
                <div className="px-3 space-y-1">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.href}
                            onClick={onClose}
                            className={({ isActive }) => [
                                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all',
                                'text-sm font-medium',
                                isActive
                                    ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white'
                                    : 'text-gray-600 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-white/5',
                                // Text label hide/show based on breakpoints
                                'justify-center lg:justify-start'
                            ].join(' ')}
                        >
                            <item.icon size={20} className="flex-shrink-0" />
                            <span className="truncate md:hidden lg:block">{item.name}</span>
                        </NavLink>
                    ))}
                </div>
                
                {/* Secondary sections - also need to handle collapsing if they have text labels */}
                <div className="mt-4 md:hidden lg:block">
                    <MyTasksSidebar />
                    <ProjectSidebar />
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;

