import { useNavigate } from 'react-router-dom';
import {
    FileText,
    BookOpen,
    Gauge,
    AlertTriangle,
    ClipboardCheck,
} from 'lucide-react';
import styles from './RecentItems.module.css';

interface RecentItem {
    id: string;
    title: string;
    category: string;
    date: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    iconColor: 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'teal';
}

const ITEMS: RecentItem[] = [
    {
        id: '1',
        title: 'Порядок действий при отклонении результатов поверки СИ',
        category: 'Нестандартные ситуации',
        date: '12.09.2026',
        icon: AlertTriangle,
        iconColor: 'teal',
    },
    {
        id: '2',
        title: 'Инструкция по эксплуатации газоанализатора ГАЗК-4',
        category: 'Методики и инструкции',
        date: '10.09.2026',
        icon: BookOpen,
        iconColor: 'green',
    },
    {
        id: '3',
        title: 'Чек-лист подготовки к поверке манометров',
        category: 'Методики и инструкции',
        date: '08.09.2026',
        icon: ClipboardCheck,
        iconColor: 'blue',
    },
    {
        id: '4',
        title: 'Памятка по работе с эталонами',
        category: 'Оборудование и СИ',
        date: '05.09.2026',
        icon: Gauge,
        iconColor: 'purple',
    },
    {
        id: '5',
        title: 'Опыт работы с нестабильными показаниями (из практики)',
        category: 'Практический опыт',
        date: '03.09.2026',
        icon: FileText,
        iconColor: 'orange',
    },
];

export default function RecentItems() {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Последние добавленные</h2>
            <div className={styles.list}>
                {ITEMS.map((item) => {
                    const Icon = item.icon;
                    const iconClass = `${styles.iconWrapper} ${styles[`icon${item.iconColor.charAt(0).toUpperCase() + item.iconColor.slice(1)}`]}`;

                    return (
                        <div
                            key={item.id}
                            className={styles.item}
                            onClick={() => navigate(`/cards/${item.id}`)}
                        >
                            <div className={iconClass}>
                                <Icon className={styles.icon} size={14} />
                            </div>
                            <div className={styles.content}>
                                <div className={styles.itemTitle}>{item.title}</div>
                                <div className={styles.itemCategory}>{item.category}</div>
                            </div>
                            <div className={styles.date}>{item.date}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}