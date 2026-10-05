import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Database,
  FolderOpen,
  Bookmark,
  PlusCircle,
  MessageSquare,
  Settings,
  User,
  X,
} from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import styles from "./Sidebar.module.css";

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  section: "main" | "actions" | "system";
}

const NAV_ITEMS: NavItem[] = [
  { path: "/", label: "Главная", icon: Home, section: "main" },
  { path: "/search", label: "База знаний", icon: Database, section: "main" },
  {
    path: "/categories",
    label: "Категории",
    icon: FolderOpen,
    section: "main",
  },
  {
    path: "/bookmarks",
    label: "Мои закладки",
    icon: Bookmark,
    section: "main",
  },
  {
    path: "/cards/new",
    label: "Добавить значение",
    icon: PlusCircle,
    section: "actions",
  },
  {
    path: "/feedback",
    label: "Обратная связь",
    icon: MessageSquare,
    section: "actions",
  },
  { path: "/settings", label: "Настройки", icon: Settings, section: "system" },
];

const SECTIONS: { key: NavItem["section"]; title: string }[] = [
  { key: "main", title: "Навигация" },
  { key: "actions", title: "Действия" },
  { key: "system", title: "Система" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);

  // Блокируем скролл страницы при открытом меню на мобильных
  useEffect(() => {
    if (isOpen && window.innerWidth <= 1024) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Очищаем стиль при размонтировании компонента
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Закрыть меню"
        >
          <X size={24} />
        </button>

        <div className={styles.header}>
          <Link to="/" className={styles.brand} onClick={onClose}>
            <img src="/logo.jpg" alt="Логотип" className={styles.brandImage} />
          </Link>
        </div>

        <nav className={styles.nav}>
          {SECTIONS.map((section) => {
            const items = NAV_ITEMS.filter(
              (item) => item.section === section.key,
            );
            if (items.length === 0) return null;

            return (
              <div key={section.key} className={styles.navSection}>
                <div className={styles.navSectionTitle}>{section.title}</div>
                <div className={styles.navList}>
                  {items.map((item) => {
                    const Icon = item.icon;
                    const className = isActive(item.path)
                      ? `${styles.navLink} ${styles.active}`
                      : styles.navLink;

                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={className}
                        onClick={onClose}
                      >
                        <Icon size={18} />
                        <span className={styles.navLabel}>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        <div className={styles.footer}>
          <div className={styles.userCard}>
            <div className={styles.userAvatar}>
              {user ? getInitials(user.name) : <User size={20} />}
            </div>
            <div className={styles.userInfo}>
              <div className={styles.userName}>{user?.name ?? "Гость"}</div>
              <div className={styles.userRole}>
                {user?.position ?? "Не авторизован"}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
