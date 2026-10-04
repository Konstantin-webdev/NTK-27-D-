import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Sidebar from './components/Sidebar/Sidebar';
import TopBar from './components/TopBar/TopBar';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import NotificationsPage from './pages/NotificationsPage';
import styles from './App.module.css';

const queryClient = new QueryClient();

function App() {
  // Локальный стейт для меню. Никаких лишних сторов!
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className={styles.wrapper}>
          <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

          <div className={styles.main}>
            <TopBar onMenuClick={toggleSidebar} />

            <main className={styles.content}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/categories" element={<div>Категории (скоро)</div>} />
                <Route path="/bookmarks" element={<div>Мои закладки (скоро)</div>} />
                <Route path="/feedback" element={<div>Обратная связь (скоро)</div>} />
                <Route path="/settings" element={<div>Настройки (скоро)</div>} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;