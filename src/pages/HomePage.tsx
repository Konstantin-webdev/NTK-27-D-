import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Scale,
    BookOpen,
    Gauge,
    AlertTriangle,
    Lightbulb,
    ClipboardCheck,
    Users,
    ArrowRight,
    Eye,
    Bookmark,
} from 'lucide-react';
import { mockKnowledgeCards } from '../mocks/knowledgeCards';
import type { Category } from '../types';
import styles from './HomePage.module.css';
import StatsRow from '../components/StatsRow/StatsRow';
import PopularSections from '../components/PopularSections/PopularSections';
import RecentItems from '../components/RecentItems/RecentItems';
import HeroBanner from '../components/HeroBanner/HeroBanner';

const SECTIONS = [
    {
        id: 'regulatory',
        title: 'Нормативные документы',
        description: 'ФЗ, ГОСТ, СТО, локальные акты',
        icon: Scale,
        filter: { category: 'ALL' as Category | 'ALL' },
        priority: false,
    },
    {
        id: 'methodologies',
        title: 'Методики и инструкции',
        description: 'МИ, РЭ, технологические карты',
        icon: BookOpen,
        filter: { category: 'ALL' as Category | 'ALL' },
        priority: false,
    },
    {
        id: 'equipment',
        title: 'Оборудование и СИ',
        description: 'Средства измерений, поверочные стенды',
        icon: Gauge,
        filter: { category: 'ALL' as Category | 'ALL' },
        priority: false,
    },
    {
        id: 'nonstandard',
        title: 'Нестандартные ситуации',
        description: 'Приоритетный раздел: инциденты, отклонения',
        icon: AlertTriangle,
        filter: { category: 'NONSTANDARD' },
        priority: true,
    },
    {
        id: 'cases',
        title: 'Практический опыт / кейсы',
        description: 'Реальные ситуации и их разбор',
        icon: Lightbulb,
        filter: { category: 'ALL' as Category | 'ALL' },
        priority: false,
    },
    {
        id: 'audit-lessons',
        title: 'Уроки аудитов и несоответствий',
        description: 'Разбор замечаний и корректирующие действия',
        icon: ClipboardCheck,
        filter: { category: 'ALL' as Category | 'ALL' },
        priority: false,
    },
    {
        id: 'training',
        title: 'Обучение и наставничество',
        description: 'Программы обучения, дневники наставника',
        icon: Users,
        filter: { category: 'ALL' as Category | 'ALL' },
        priority: false,
    },
];

export default function HomePage() {
    const navigate = useNavigate();

    const recentCards = useMemo(() => {
        return [...mockKnowledgeCards]
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 4);
    }, []);

    const getCriticalityClass = (criticality: string) => {
        return styles[`criticality-${criticality.toLowerCase()}`];
    };

    return (
        <div className={styles.page}>
            <HeroBanner />
            <StatsRow />
            {/* Разделы */}
            <div className={styles.contentGrid}>
                <div className={styles.mainColumn}>
                    <PopularSections />
                </div>
                <div className={styles.sideColumn}>
                    <RecentItems />
                </div>
            </div>
            <section className={styles.sections}>
                <h2 className={styles.sectionTitle}>Разделы базы знаний</h2>
                <div className={styles.sectionsGrid}>
                    {SECTIONS.map((section) => {
                        const Icon = section.icon;
                        const cardClass = section.priority
                            ? `${styles.sectionCard} ${styles.priority}`
                            : styles.sectionCard;

                        return (
                            <div key={section.id} className={cardClass}>
                                <div className={styles.sectionCardIcon}>
                                    <Icon size={28} />
                                </div>
                                <div className={styles.sectionCardContent}>
                                    <h3 className={styles.sectionCardTitle}>
                                        {section.title}
                                        {section.priority && (
                                            <span className={styles.priorityBadge}>Приоритет</span>
                                        )}
                                    </h3>
                                    <p className={styles.sectionCardDescription}>{section.description}</p>
                                </div>
                                <ArrowRight className={styles.sectionCardArrow} size={20} />
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Последние добавленные */}
            <section className={styles.recent}>
                <div className={styles.recentHeader}>
                    <h2 className={styles.sectionTitle}>Последние добавленные</h2>
                    <button className={styles.viewAllButton} onClick={() => navigate('/search')}>
                        Смотреть все <ArrowRight size={16} />
                    </button>
                </div>

                <div className={styles.recentGrid}>
                    {recentCards.map((card) => (
                        <div
                            key={card.id}
                            className={styles.recentCard}
                            onClick={() => navigate(`/cards/${card.id}`)}
                        >
                            <div className={styles.recentCardHeader}>
                                <span className={styles.recentCardId}>{card.id}</span>
                                <span className={`${styles.statusBadge} ${styles[card.status.toLowerCase()]}`}>
                                    {card.status === 'APPROVED' ? 'Утверждено' : 'На проверке'}
                                </span>
                            </div>
                            <h3 className={styles.recentCardTitle}>{card.title}</h3>
                            <div className={styles.recentCardMeta}>
                                <span className={styles.recentCardProcess}>{card.process}</span>
                                <span className={`${styles.recentCardCriticality} ${getCriticalityClass(card.criticality)}`}>
                                    {card.criticality}
                                </span>
                            </div>
                            <div className={styles.recentCardStats}>
                                <span className={styles.statItem}>
                                    <Eye size={14} /> {card.stats.views}
                                </span>
                                <span className={styles.statItem}>
                                    <Bookmark size={14} /> {card.stats.bookmarks}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}