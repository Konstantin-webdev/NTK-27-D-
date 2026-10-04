import styles from './HeroBanner.module.css';

export default function HeroBanner() {
    return (
        <div className={styles.container}>
            {/* Левая часть: текст */}
            <div className={styles.content}>
                <h1 className={styles.title}>Добро пожаловать в Базу знаний!</h1>
                <p className={styles.description}>
                    Здесь собраны документы, инструкции, рекомендации и опыт наших специалистов
                    для удобной и эффективной работы.
                </p>
            </div>

            {/* Правая часть: изображение со слоганом */}
            <div className={styles.imageWrapper}>
                <img
                    src="/hero-banner.png"
                    alt="Газопровод"
                    className={styles.image}
                />
                <div className={styles.slogan}>
                    Опыт и знания — сила команды!
                </div>
            </div>
        </div>
    );
}