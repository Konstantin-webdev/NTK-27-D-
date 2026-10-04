import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, User, Menu } from 'lucide-react';
import { useFilterStore } from '../../store/useFilterStore';
import { useAuthStore } from '../../store/useAuthStore';
import styles from './TopBar.module.css';

interface TopBarProps {
    onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
    const navigate = useNavigate();
    const { setSearchQuery } = useFilterStore();
    const user = useAuthStore((state) => state.user);
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearchQuery(searchValue);
        navigate('/search');
    };

    const getInitials = (name: string) => {
        return name.split(' ').map((part) => part[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
        <header className={styles.topBar}>
            {/* Кнопка меню (видна только на мобильных через CSS) */}
            <button className={styles.menuButton} onClick={onMenuClick} title="Открыть меню">
                <Menu size={24} />
            </button>

            <form className={styles.searchWrapper} onSubmit={handleSearch}>
                <Search className={styles.searchIcon} size={18} />
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Поиск по базе знаний..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </form>

            <div className={styles.actions}>
                <button className={styles.iconButton} onClick={() => navigate('/notifications')} title="Уведомления">
                    <Bell size={20} />
                    <span className={styles.notificationBadge}>3</span>
                </button>

                <button className={styles.userButton} onClick={() => navigate('/profile')} title="Профиль">
                    <div className={styles.userAvatar}>
                        {user ? getInitials(user.name) : <User size={16} />}
                    </div>
                    <span className={styles.userName}>{user?.name ?? 'Гость'}</span>
                </button>
            </div>
        </header>
    );
}