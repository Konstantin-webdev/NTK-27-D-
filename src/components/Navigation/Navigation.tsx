import { Link, useLocation } from 'react-router-dom';
import { Home, Search, PlusCircle, BarChart3, BookOpen } from 'lucide-react';
import styles from './Navigation.module.css';

const NAV_ITEMS = [
    { path: '/', label: 'Главная', icon: Home },
    { path: '/search', label: 'Поиск по базе', icon: Search },
    { path: '/cards/new', label: 'Новая карточка', icon: PlusCircle },
    { path: '/knowledge-map', label: 'Карта знаний', icon: BookOpen },
    { path: '/analytics', label: 'KPI и Аналитика', icon: BarChart3 },
];

export default function Navigation() {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <Link to="/" className={styles.brand}>
                        <BookOpen className={styles.logoIcon} size={24} />
                        <span className={styles.brandTitle}>ПОМО: База Знаний</span>
                    </Link>
                    <div className={styles.menu}>
                        {NAV_ITEMS.map((item) => {
                            const Icon = item.icon;
                            const className = isActive(item.path)
                                ? `${styles.navLink} ${styles.active}`
                                : styles.navLink;
                            return (
                                <Link key={item.path} to={item.path} className={className}>
                                    <Icon size={16} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
}