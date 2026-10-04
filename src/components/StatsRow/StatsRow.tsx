import { FileText, Users, Star, RefreshCw } from 'lucide-react';
import styles from './StatsRow.module.css';

interface StatItem {
    value: number;
    label: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    iconColor: 'blue' | 'green' | 'purple' | 'orange';
}

interface StatsRowProps {
    stats?: StatItem[];
}

const DEFAULT_STATS: StatItem[] = [
    {
        value: 245,
        label: 'Всего материалов',
        icon: FileText,
        iconColor: 'blue',
    },
    {
        value: 28,
        label: 'Экспертов',
        icon: Users,
        iconColor: 'green',
    },
    {
        value: 12,
        label: 'Ключевых знаний',
        icon: Star,
        iconColor: 'purple',
    },
    {
        value: 6,
        label: 'Обновлено за месяц',
        icon: RefreshCw,
        iconColor: 'orange',
    },
];

export default function StatsRow({ stats = DEFAULT_STATS }: StatsRowProps) {
    return (
        <div className={styles.container}>
            {stats.map((stat, index) => {
                const Icon = stat.icon;
                const iconClass = `${styles.iconWrapper} ${styles[`icon${stat.iconColor.charAt(0).toUpperCase() + stat.iconColor.slice(1)}`]}`;

                return (
                    <div key={index} className={styles.card}>
                        <div className={iconClass}>
                            <Icon className={styles.icon} size={20} />
                        </div>
                        <div className={styles.content}>
                            <div className={styles.value}>{stat.value}</div>
                            <div className={styles.label}>{stat.label}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}