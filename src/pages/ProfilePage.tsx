import {
    User,
    Mail,
    Phone,
    Building2,
    Shield,
    Calendar,
    FileText,
    MessageSquare,
    Bookmark,
    CheckCircle2,
    Clock,
    Star,
    Edit3,
    LogOut,
    Settings,
    Award,
    TrendingUp,
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import styles from './ProfilePage.module.css';

type ActivityType = 'created' | 'reviewed' | 'commented' | 'bookmarked' | 'updated';

interface Activity {
    id: string;
    type: ActivityType;
    title: string;
    description: string;
    date: string;
    cardId?: string;
}

const MOCK_ACTIVITIES: Activity[] = [
    {
        id: '1',
        type: 'created',
        title: 'Создана новая карточка',
        description: '«Нестандартная ситуация: отказ манометра при поверке»',
        date: '04.10.2026',
        cardId: 'ПОМО-01-0042',
    },
    {
        id: '2',
        type: 'reviewed',
        title: 'Утверждена карточка',
        description: '«Методика калибровки ультразвукового расходомера»',
        date: '03.10.2026',
        cardId: 'ПОМО-02-0015',
    },
    {
        id: '3',
        type: 'commented',
        title: 'Оставлен комментарий',
        description: 'К карточке «Поверка весов: типичные ошибки»',
        date: '02.10.2026',
        cardId: 'ПОМО-03-0007',
    },
    {
        id: '4',
        type: 'bookmarked',
        title: 'Добавлено в закладки',
        description: '«Инструкция по эксплуатации газоанализатора ГАЗК-4»',
        date: '01.10.2026',
        cardId: 'ПОМО-04-0023',
    },
    {
        id: '5',
        type: 'updated',
        title: 'Обновлена карточка',
        description: '«Чек-лист подготовки к поверке манометров» (версия 2)',
        date: '30.09.2026',
        cardId: 'ПОМО-05-0011',
    },
];

const ACTIVITY_CONFIG: Record<ActivityType, { icon: React.ComponentType<{ size?: number; className?: string }>; color: string; label: string }> = {
    created: { icon: FileText, color: '#3b82f6', label: 'Создано' },
    reviewed: { icon: CheckCircle2, color: '#10b981', label: 'Проверено' },
    commented: { icon: MessageSquare, color: '#8b5cf6', label: 'Комментарии' },
    bookmarked: { icon: Bookmark, color: '#f59e0b', label: 'Закладки' },
    updated: { icon: Edit3, color: '#ec4899', label: 'Обновлено' },
};

export default function ProfilePage() {
    const user = useAuthStore((state) => state.user);

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((part) => part[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // Мок-статистика пользователя
    const userStats = [
        { label: 'Создано карточек', value: 12, icon: FileText, color: '#3b82f6' },
        { label: 'Проверено', value: 8, icon: CheckCircle2, color: '#10b981' },
        { label: 'Комментариев', value: 24, icon: MessageSquare, color: '#8b5cf6' },
        { label: 'В закладках', value: 15, icon: Bookmark, color: '#f59e0b' },
    ];

    const getRoleText = (role: string) => {
        const roleMap: Record<string, string> = {
            'READER': 'Читатель',
            'SECTION_OWNER': 'Ответственный за раздел',
            'GROUP_HEAD': 'Руководитель группы',
            'SMK_REPRESENTATIVE': 'Представитель СМК',
        };
        return roleMap[role] || role;
    };

    return (
        <div className={styles.page}>
            {/* Header с аватаром */}
            <div className={styles.header}>
                <div className={styles.avatarWrapper}>
                    <div className={styles.avatar}>
                        {user ? getInitials(user.name) : <User size={32} />}
                    </div>
                    <div className={styles.avatarBadge}>
                        <Award size={16} />
                    </div>
                </div>

                <div className={styles.headerContent}>
                    <h1 className={styles.name}>{user?.name ?? 'Гость'}</h1>
                    <p className={styles.position}>{user?.position ?? 'Не указана'}</p>
                    <div className={styles.roleBadge}>
                        <Shield size={14} />
                        {user ? getRoleText(user.role) : 'Не авторизован'}
                    </div>
                </div>

                <div className={styles.headerActions}>
                    <button className={styles.editButton}>
                        <Edit3 size={16} />
                        Редактировать
                    </button>
                </div>
            </div>

            {/* Статистика */}
            <div className={styles.statsGrid}>
                {userStats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className={styles.statCard}>
                            <div
                                className={styles.statIcon}
                                style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                            >
                                <Icon size={20} />
                            </div>
                            <div className={styles.statContent}>
                                <div className={styles.statValue}>{stat.value}</div>
                                <div className={styles.statLabel}>{stat.label}</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Двухколоночный layout */}
            <div className={styles.contentGrid}>
                {/* Левая колонка: Информация */}
                <div className={styles.mainColumn}>
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2 className={styles.cardTitle}>Информация</h2>
                            <Settings size={18} className={styles.cardIcon} />
                        </div>

                        <div className={styles.infoList}>
                            <div className={styles.infoItem}>
                                <div className={styles.infoIcon}>
                                    <Mail size={16} />
                                </div>
                                <div className={styles.infoContent}>
                                    <div className={styles.infoLabel}>Email</div>
                                    <div className={styles.infoValue}>ivanov.ii@gazprom.ru</div>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <div className={styles.infoIcon}>
                                    <Phone size={16} />
                                </div>
                                <div className={styles.infoContent}>
                                    <div className={styles.infoLabel}>Телефон</div>
                                    <div className={styles.infoValue}>+7 (343) 123-45-67</div>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <div className={styles.infoIcon}>
                                    <Building2 size={16} />
                                </div>
                                <div className={styles.infoContent}>
                                    <div className={styles.infoLabel}>Подразделение</div>
                                    <div className={styles.infoValue}>УАВР № 4, Группа метрологии</div>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <div className={styles.infoIcon}>
                                    <Calendar size={16} />
                                </div>
                                <div className={styles.infoContent}>
                                    <div className={styles.infoLabel}>В системе с</div>
                                    <div className={styles.infoValue}>15.03.2024</div>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <div className={styles.infoIcon}>
                                    <User size={16} />
                                </div>
                                <div className={styles.infoContent}>
                                    <div className={styles.infoLabel}>ID пользователя</div>
                                    <div className={styles.infoValueMono}>{user?.id ?? '—'}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Достижения */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2 className={styles.cardTitle}>Достижения</h2>
                            <Star size={18} className={styles.cardIcon} />
                        </div>

                        <div className={styles.achievements}>
                            <div className={styles.achievement}>
                                <div className={styles.achievementIcon}>
                                    <TrendingUp size={20} />
                                </div>
                                <div className={styles.achievementContent}>
                                    <div className={styles.achievementTitle}>Активный автор</div>
                                    <div className={styles.achievementDescription}>
                                        Создано более 10 карточек
                                    </div>
                                </div>
                            </div>

                            <div className={styles.achievement}>
                                <div className={styles.achievementIcon}>
                                    <CheckCircle2 size={20} />
                                </div>
                                <div className={styles.achievementContent}>
                                    <div className={styles.achievementTitle}>Эксперт раздела</div>
                                    <div className={styles.achievementDescription}>
                                        Ответственный за раздел «Нестандартные ситуации»
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Правая колонка: Активность */}
                <div className={styles.sideColumn}>
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2 className={styles.cardTitle}>Последняя активность</h2>
                            <Clock size={18} className={styles.cardIcon} />
                        </div>

                        <div className={styles.activityList}>
                            {MOCK_ACTIVITIES.map((activity) => {
                                const config = ACTIVITY_CONFIG[activity.type];
                                const Icon = config.icon;

                                return (
                                    <div key={activity.id} className={styles.activityItem}>
                                        <div
                                            className={styles.activityIcon}
                                            style={{ backgroundColor: `${config.color}15`, color: config.color }}
                                        >
                                            <Icon size={16} />
                                        </div>
                                        <div className={styles.activityContent}>
                                            <div className={styles.activityTitle}>{activity.title}</div>
                                            <div className={styles.activityDescription}>
                                                {activity.description}
                                            </div>
                                            <div className={styles.activityMeta}>
                                                <span className={styles.activityDate}>{activity.date}</span>
                                                {activity.cardId && (
                                                    <span className={styles.activityCardId}>{activity.cardId}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Быстрые действия */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2 className={styles.cardTitle}>Быстрые действия</h2>
                        </div>

                        <div className={styles.quickActions}>
                            <button className={styles.quickAction}>
                                <FileText size={18} />
                                <span>Мои карточки</span>
                            </button>
                            <button className={styles.quickAction}>
                                <Bookmark size={18} />
                                <span>Закладки</span>
                            </button>
                            <button className={styles.quickAction}>
                                <Settings size={18} />
                                <span>Настройки</span>
                            </button>
                            <button className={`${styles.quickAction} ${styles.danger}`}>
                                <LogOut size={18} />
                                <span>Выйти</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}