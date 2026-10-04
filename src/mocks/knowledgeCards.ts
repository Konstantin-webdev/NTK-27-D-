import type { KnowledgeCard } from "../types";


export const mockKnowledgeCards: KnowledgeCard[] = [
    {
        id: 'ПОМО-01-0001',
        direction: 'метрология',
        subcategory: 'средства измерения давления',
        recordType: 'CASE',
        title: 'Нестандартная ситуация: отказ манометра при поверке на стенде',
        process: 'VERIFICATION',
        equipment: 'Манометр МП-4А, поверочный стенд СМЦ-50',
        category: 'NONSTANDARD',
        criticality: 'HIGH',
        situation: 'При подаче давления 40 МПа стрелка манометра начала хаотично колебаться, затем упала на ноль.',
        standardSequence: 'Плавная подача давления до 25%, 50%, 75%, 100% с выдержкой 1 мин.',
        actualActions: 'Оператор немедленно перекрыл вентиль подачи давления, сбросил остаточное давление через дренаж.',
        whyStandardFailed: 'Разрыв мембраны внутри манометра из-за микротрещины, не выявленной при визуальном осмотре.',
        result: 'СИ признано непригодным, составлен акт о браковке. Инцидент зафиксирован без травм и повреждений стенда.',
        recognitionSigns: 'Резкие скачки показаний, нехарактерный звук шипения в корпусе.',
        conclusion: 'Перед поверкой манометров старше 5 лет проводить дополнительную проверку герметичности корпуса.',
        appliedKnowledge: [
            { knowledge: 'Методика поверки МИ 2192-2004', type: 'METHODOLOGICAL', ref: 'МИ 2192-2004, п. 4.3' }
        ],
        sources: [
            { type: 'NORMATIVE_DOC', number: 'ГОСТ 8.271-2017', location: 'База знаний → Нормативные документы' }
        ],
        algorithm: [
            { order: 1, action: 'Немедленно прекратить подачу давления', source: 'Инструкция по ОТ', note: 'Безопасность превыше всего' },
            { order: 2, action: 'Сбросить давление через дренажный вентиль', source: 'Паспорт стенда СМЦ-50' },
            { order: 3, action: 'Зафиксировать показания и составить акт о нестандартной ситуации', source: 'СТО Газпром 2.1.11-123' }
        ],
        typicalError: 'Попытка продолжить поверку или "постучать" по корпусу для проверки.',
        practicalAdvice: 'Всегда держите руку на аварийном вентиле при превышении 80% от предельного давления.',
        whenToApply: 'При любых аномальных показаниях стрелочных СИ давления.',
        author: { id: 'u1', name: 'Иванов И.И.', position: 'Инженер по метрологии', role: 'SECTION_OWNER' },
        createdAt: '2026-09-15T10:00:00Z',
        nextReviewDate: '2027-03-15T10:00:00Z',
        version: 1,
        status: 'APPROVED',
        stats: { views: 42, bookmarks: 15, feedbackCount: 3 }
    },
    {
        id: 'ПОМО-02-0015',
        direction: 'учет газа',
        subcategory: 'ультразвуковые расходомеры',
        recordType: 'KNOWLEDGE',
        title: 'Корректировка коэффициента сжимаемости при низких температурах',
        process: 'WORK_WITH_SI',
        equipment: 'Ультразвуковой расходомер УСР',
        category: 'TYPICAL_ERROR',
        criticality: 'MEDIUM',
        appliedKnowledge: [],
        sources: [{ type: 'MANUAL', location: 'Руководство по эксплуатации УСР, гл. 5' }],
        algorithm: [
            { order: 1, action: 'Проверить показания термометра сопротивления', source: 'Схема КИП' },
            { order: 2, action: 'Сверить расчетный коэффициент сжимаемости в вычислителе', source: 'ГОСТ 30319.2' }
        ],
        author: { id: 'u2', name: 'Петров П.П.', position: 'Ведущий метролог', role: 'GROUP_HEAD' },
        createdAt: '2026-08-01T09:00:00Z',
        nextReviewDate: '2027-02-01T09:00:00Z',
        version: 2,
        status: 'REVIEW',
        stats: { views: 12, bookmarks: 5, feedbackCount: 0 }
    }
];