import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, CheckCircle, Clock } from 'lucide-react';
import { mockKnowledgeCards } from '../mocks/knowledgeCards';
import { useFilterStore } from '../store/useFilterStore';
import type { CardStatus } from '../types';
import styles from './SearchPage.module.css';

export default function SearchPage() {
    const navigate = useNavigate();
    const { searchQuery, process, category, criticality, setSearchQuery, setProcess } = useFilterStore();

    const filteredCards = useMemo(() => {
        return mockKnowledgeCards.filter(card => {
            const matchesSearch = card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                card.id.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesProcess = process === 'ALL' || card.process === process;
            const matchesCategory = category === 'ALL' || card.category === category;
            const matchesCriticality = criticality === 'ALL' || card.criticality === criticality;
            return matchesSearch && matchesProcess && matchesCategory && matchesCriticality;
        });
    }, [searchQuery, process, category, criticality]);

    const getStatusText = (status: CardStatus) => {
        const statusMap = {
            'DRAFT': 'Черновик',
            'REVIEW': 'На проверке',
            'APPROVED': 'Утверждено',
            'NEEDS_UPDATE': 'Требует актуализации',
            'ARCHIVED': 'В архиве'
        };
        return statusMap[status];
    };

    const getProcessText = (process: string) => {
        const processMap = {
            'VERIFICATION': 'Поверка СИ',
            'CALIBRATION': 'Калибровка СИ',
            'METROLOGICAL_SUPERVISION': 'Метрологический надзор',
            'WORK_WITH_SI': 'Работа с СИ',
            'RESULTS_DOCUMENTATION': 'Документирование',
            'AUDIT': 'Аудит'
        };
        return processMap[process as keyof typeof processMap] || process;
    };

    // Хелпер для динамического класса критичности
    const getCriticalityClass = (criticality: string) => {
        const key = `criticality${criticality.charAt(0).toUpperCase() + criticality.slice(1).toLowerCase()}`;
        return styles[key as keyof typeof styles];
    };

    return (
        <div className={styles.page}>
            <h2 className={styles.pageTitle}>Поиск по базе знаний</h2>

            <div className={styles.controls}>
                <div className={styles.inputWrapper}>
                    <SearchIcon className={styles.searchIcon} size={20} />
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Поиск (например, 'поверка манометра')"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <select
                    className={styles.filterSelect}
                    value={process}
                    onChange={(e) => setProcess(e.target.value as any)}
                >
                    <option value="ALL">Все процессы</option>
                    <option value="VERIFICATION">Поверка СИ</option>
                    <option value="CALIBRATION">Калибровка СИ</option>
                    <option value="METROLOGICAL_SUPERVISION">Метрологический надзор</option>
                    <option value="WORK_WITH_SI">Работа с СИ</option>
                    <option value="RESULTS_DOCUMENTATION">Документирование</option>
                    <option value="AUDIT">Аудит</option>
                </select>
            </div>

            <div className={styles.cardsList}>
                {filteredCards.map(card => {
                    const statusKey = card.status.toLowerCase();
                    const statusClass = `${styles.statusBadge} ${styles[statusKey as keyof typeof styles] || ''}`;

                    return (
                        <div
                            key={card.id}
                            className={styles.card}
                            onClick={() => navigate(`/cards/${card.id}`)}
                        >
                            <div className={styles.cardHeader}>
                                <div className={styles.cardTitle}>
                                    {card.id}: {card.title}
                                </div>
                                <span className={statusClass}>
                                    {card.status === 'APPROVED' && <CheckCircle size={14} />}
                                    {card.status === 'REVIEW' && <Clock size={14} />}
                                    {getStatusText(card.status)}
                                </span>
                            </div>
                            <div className={styles.cardTags}>
                                <span className={styles.tag}>{getProcessText(card.process)}</span>
                                <span className={`${styles.tag} ${getCriticalityClass(card.criticality)}`}>
                                    {card.criticality}
                                </span>
                                {card.equipment && <span className={styles.tag}>{card.equipment}</span>}
                            </div>
                            {card.conclusion && (
                                <div className={styles.cardConclusion}>
                                    <strong>Вывод:</strong> {card.conclusion}
                                </div>
                            )}
                        </div>
                    );
                })}
                {filteredCards.length === 0 && (
                    <div className={styles.emptyState}>
                        По вашему запросу ничего не найдено. Попробуйте изменить фильтры.
                    </div>
                )}
            </div>
        </div>
    );
}