import { useNavigate } from 'react-router-dom';
import {
    FileText,
    BookOpen,
    Gauge,
    GraduationCap,
    Users,
    AlertTriangle,
} from 'lucide-react';
import styles from './PopularSections.module.css';

interface Section {
    id: string;
    title: string;
    count: number;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    iconColor: 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'teal';
    path: string;
}

const SECTIONS: Section[] = [
    {
        id: 'regulatory',
        title: 'Нормативные документы',
        count: 56,
        icon: FileText,
        iconColor: 'blue',
        path: '/search?section=regulatory',
    },
    {
        id: 'methodologies',
        title: 'Методики и инструкции',
        count: 72,
        icon: BookOpen,
        iconColor: 'green',
        path: '/search?section=methodologies',
    },
    {
        id: 'equipment',
        title: 'Оборудование и СИ',
        count: 38,
        icon: Gauge,
        iconColor: 'purple',
        path: '/search?section=equipment',
    },
    {
        id: 'training',
        title: 'Обучение и развитие',
        count: 24,
        icon: GraduationCap,
        iconColor: 'orange',
        path: '/search?section=training',
    },
    {
        id: 'mentorship',
        title: 'Наставничество',
        count: 18,
        icon: Users,
        iconColor: 'pink',
        path: '/search?section=mentorship',
    },
    {
        id: 'nonstandard',
        title: 'Нестандартные ситуации',
        count: 17,
        icon: AlertTriangle,
        iconColor: 'teal',
        path: '/search?section=nonstandard',
    },
];

export default function PopularSections() {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Популярные разделы</h2>
            <div className={styles.grid}>
                {SECTIONS.map((section) => {
                    const Icon = section.icon;
                    const iconClass = `${styles.iconWrapper} ${styles[`icon${section.iconColor.charAt(0).toUpperCase() + section.iconColor.slice(1)}`]}`;

                    return (
                        <div
                            key={section.id}
                            className={styles.card}
                            onClick={() => navigate(section.path)}
                        >
                            <div className={iconClass}>
                                <Icon className={styles.icon} size={20} />
                            </div>
                            <div className={styles.content}>
                                <div className={styles.cardTitle}>{section.title}</div>
                                <div className={styles.cardCount}>{section.count} материалов</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}