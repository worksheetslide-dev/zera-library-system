import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '@/src/hooks/useAuth';
import { 
  Book as BookIcon, 
  Search, 
  Library, 
  User, 
  LayoutDashboard, 
  BookOpen, 
  BarChart, 
  Settings,
  LogOut,
  ChevronRight,
  Plus,
  Users,
  GraduationCap,
  Globe,
  ShoppingCart,
  FileText,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  BookMarked
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

import { BookGrid } from '@/src/components/opac/BookGrid';
import { MemberPortal } from '@/src/components/opac/MemberPortal';
import { CatalogManager } from '@/src/components/admin/CatalogManager';
import { UserManagement } from '@/src/components/admin/UserManagement';
import { CirculationDashboard } from '@/src/components/admin/CirculationDashboard';
import { AdminDashboard } from '@/src/components/admin/AdminDashboard';
import { OnlineResources } from '@/src/components/admin/OnlineResources';
import { Acquisition } from '@/src/components/admin/Acquisition';
import { Reports } from '@/src/components/admin/Reports';
import { InventoryAudit } from '@/src/components/admin/InventoryAudit';
import { BarcodeStudio } from '@/src/components/admin/BarcodeStudio';
import { Barcode as BarcodeIcon } from 'lucide-react';

// --- Shared Components ---
const ZeraLogo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col", className)}>
      <span className="font-serif text-2xl font-black text-zera-emerald leading-none tracking-tighter uppercase">zera</span>
      <span className="text-[9px] font-bold text-zera-emerald-light uppercase tracking-[0.2em] -mt-1 whitespace-nowrap">International School</span>
    </div>
  );
};

const Navbar = ({ onSettleAdmin, isAdminView }: { onSettleAdmin: (val: boolean) => void, isAdminView: boolean }) => {
  const { profile, logout, signIn } = useAuth();
  
  return (
    <nav className="h-16 border-b border-natural-border flex items-center justify-between px-8 bg-natural-nav sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => onSettleAdmin(false)}>
        <ZeraLogo className="h-9" />
        <div className="h-6 w-px bg-natural-border mx-2" />
        <span className="font-serif text-xl font-bold text-zera-emerald tracking-tight opacity-70">Library System</span>
      </div>
      
      <div className="flex items-center gap-8 text-natural-text">
        <div className="flex items-center bg-natural-border/50 p-1 rounded-full text-[10px] font-black uppercase tracking-wider">
           <button 
              onClick={() => onSettleAdmin(false)}
              className={cn(
                "px-4 py-1.5 rounded-full transition-all", 
                !isAdminView ? "bg-zera-yellow text-zera-emerald shadow-sm" : "text-natural-muted hover:text-zera-emerald"
              )}
            >
              Public Catalog
            </button>
            <button 
              onClick={() => onSettleAdmin(true)}
              className={cn(
                "px-4 py-1.5 rounded-full transition-all", 
                isAdminView ? "bg-zera-yellow text-zera-emerald shadow-sm" : "text-natural-muted hover:text-zera-emerald"
              )}
            >
              Librarian Dashboard
            </button>
        </div>

        <div className="flex items-center gap-3 ml-4">
          {profile ? (
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-natural-text leading-none">{profile.name}</p>
                <p className="text-[9px] font-bold text-zera-emerald mt-1 uppercase tracking-widest">{profile.role}</p>
              </div>
              <button 
                onClick={logout}
                className="p-2 hover:bg-red-50 text-red-500 rounded-full transition-colors"
                title="Log Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button 
              onClick={signIn}
              className="flex items-center gap-2 px-6 py-2 bg-zera-emerald text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-zera-emerald-dark transition-all shadow-md active:scale-95"
            >
              <User className="w-4 h-4" /> Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

// --- View Components ---
const OPAC = () => {
  const [activeTab, setActiveTab] = useState<'books' | 'resources' | 'portal'>('books');

  const tabs = [
    { id: 'books', label: 'Physical Library', icon: BookIcon },
    { id: 'resources', label: 'Digital Resources', icon: Globe },
    { id: 'portal', label: 'Member Portal', icon: User },
  ];

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 min-h-[calc(100vh-104px)]">
      <div className="text-center mb-16 space-y-2">
         <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zera-yellow-dark">Zera International School</h2>
         <h1 className="text-4xl font-serif font-black text-zera-emerald tracking-tight">Institutional Knowledge Archive</h1>
         <div className="w-12 h-1 bg-zera-yellow mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="flex justify-center mb-16">
        <div className="flex bg-white p-1.5 rounded-3xl border-2 border-natural-border shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2.5 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all",
                activeTab === tab.id 
                  ? "bg-zera-yellow text-zera-emerald shadow-md translate-y-[-2px]" 
                  : "text-natural-muted hover:text-zera-emerald hover:bg-natural-bg"
              )}
            >
              <tab.icon className={cn("w-4 h-4", activeTab === tab.id ? "text-zera-emerald" : "text-natural-muted")} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'books' && <BookGrid />}
          {activeTab === 'resources' && <OnlineResources />}
          {activeTab === 'portal' && <MemberPortal />}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'catalog' | 'circulation' | 'inventory' | 'students' | 'teachers' | 'resources' | 'acquisition' | 'reports' | 'barcodes'>('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'catalog', label: 'Catalogue', icon: BookOpen },
    { id: 'circulation', label: 'Circulation', icon: BarChart },
    { id: 'inventory', label: 'Inventory Audit', icon: BookMarked },
    { id: 'barcodes', label: 'Barcode Studio', icon: BarcodeIcon },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'teachers', label: 'Teachers', icon: GraduationCap },
    { id: 'resources', label: 'Online Resources', icon: Globe },
    { id: 'acquisition', label: 'Acquisition', icon: ShoppingCart },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-natural-nav border-r border-natural-border p-4 flex flex-col gap-4">
        <div className="mb-6 px-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-natural-muted italic">Library Management</p>
        </div>
        
        <div className="mb-2">
          <div className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group",
                  activeTab === item.id 
                    ? "bg-zera-yellow text-zera-emerald-dark shadow-md" 
                    : "text-natural-muted hover:bg-zera-emerald/10 hover:text-zera-emerald"
                )}
              >
                <item.icon className={cn("w-4 h-4", activeTab === item.id ? "text-zera-emerald-dark" : "text-natural-muted group-hover:text-zera-emerald")} />
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <div className="bg-zera-yellow/10 rounded-2xl p-4 border border-zera-yellow/30 shadow-sm">
            <p className="text-xs font-bold text-zera-yellow-dark mb-2">System Health</p>
            <div className="w-full bg-white/50 h-2 rounded-full overflow-hidden">
              <div className="bg-zera-emerald h-full w-[98%]"></div>
            </div>
            <p className="text-[10px] text-zera-emerald-dark mt-2 font-bold">Z39.50 Active • DB Online</p>
          </div>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-8 bg-natural-bg/50">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'dashboard' && <AdminDashboard onNavigate={setActiveTab} />}
            {activeTab === 'catalog' && <CatalogManager />}
            {activeTab === 'circulation' && <CirculationDashboard />}
            {activeTab === 'students' && <UserManagement key="students" roleFilter="student" />}
            {activeTab === 'teachers' && <UserManagement key="teachers" roleFilter="teacher" />}
            {activeTab === 'resources' && <OnlineResources />}
            {activeTab === 'acquisition' && <Acquisition />}
            {activeTab === 'reports' && <Reports />}
            {activeTab === 'inventory' && <InventoryAudit />}
            {activeTab === 'barcodes' && <BarcodeStudio />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

const App = () => {
  const [isAdminView, setIsAdminView] = useState(false);

  return (
    <div className="min-h-screen bg-natural-bg text-natural-text font-sans selection:bg-zera-yellow selection:text-zera-emerald-dark antialiased">
      <Navbar onSettleAdmin={setIsAdminView} isAdminView={isAdminView} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={isAdminView ? 'admin' : 'opac'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isAdminView ? <AdminPanel /> : <OPAC />}
        </motion.div>
      </AnimatePresence>

      <footer className="h-10 bg-zera-emerald px-8 flex items-center justify-between text-white text-[11px] font-bold sticky bottom-0 z-50">
        <div className="flex gap-6">
          <span>Version 4.2.1-stable</span>
          <span>© Zera International School</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-zera-yellow rounded-full animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.8)]"></div>
          <span>Central Database Connected: 4.1ms latency</span>
        </div>
      </footer>
    </div>
  );
};

export default function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
