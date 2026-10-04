export type ProcessSMK =
    | 'VERIFICATION' | 'CALIBRATION' | 'METROLOGICAL_SUPERVISION'
    | 'WORK_WITH_SI' | 'RESULTS_DOCUMENTATION' | 'AUDIT';

export type RecordType = 'CASE' | 'KNOWLEDGE' | 'COMBINED';
export type Category = 'NONSTANDARD' | 'TYPICAL_ERROR' | 'DEVIATION' | 'INCIDENT' | 'IMPROVEMENT';
export type Criticality = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type CardStatus = 'DRAFT' | 'REVIEW' | 'APPROVED' | 'NEEDS_UPDATE' | 'ARCHIVED';
export type KnowledgeType = 'REGULATORY' | 'METHODOLOGICAL' | 'TECHNICAL' | 'PRACTICAL';

export interface Person {
    id: string;
    name: string;
    position: string;
    role: 'READER' | 'SECTION_OWNER' | 'GROUP_HEAD' | 'SMK_REPRESENTATIVE';
}

export interface AppliedKnowledge {
    knowledge: string;
    type: KnowledgeType;
    ref: string;
}

export interface SourceRef {
    type: 'CARD' | 'NORMATIVE_DOC' | 'METHODOLOGY' | 'MANUAL' | 'PRACTICAL';
    number?: string;
    location: string;
}

export interface AlgorithmStep {
    order: number;
    action: string;
    source: string;
    note?: string;
}

export interface KnowledgeCard {
    id: string;            // ПОМО-05-0042
    direction: string;     // метрология
    subcategory: string;   // средства измерения
    recordType: RecordType;
    title: string;
    process: ProcessSMK;
    equipment?: string;
    category: Category;
    criticality: Criticality;

    // Кейс
    situation?: string;
    standardSequence?: string;
    actualActions?: string;
    whyStandardFailed?: string;
    result?: string;
    recognitionSigns?: string;
    conclusion?: string;

    appliedKnowledge: AppliedKnowledge[];
    sources: SourceRef[];
    algorithm: AlgorithmStep[];

    typicalError?: string;
    practicalAdvice?: string;
    whenToApply?: string;

    author: Person;
    reviewer?: Person;
    createdAt: string;
    reviewedAt?: string;
    nextReviewDate: string;
    version: number;
    status: CardStatus;

    stats: { views: number; bookmarks: number; feedbackCount: number };
}

export interface CriticalKnowledge {
    area: string;
    importance: number;  // I, 1-5
    lossRisk: number;    // R, 1-5
    priority: number;    // P = I * R
    riskRefs: string[];
    measure: string;
    carriers: string[];
}