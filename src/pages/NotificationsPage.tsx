import { useState } from "react";
import {
  Bell,
  FileText,
  AlertCircle,
  CheckCircle2,
  MessageSquare,
  Clock,
  Star,
  CheckCheck,
  Settings,
} from "lucide-react";
import styles from "./NotificationsPage.module.css";

type NotificationType =
  | "new_card"
  | "needs_update"
  | "approved"
  | "comment"
  | "reminder"
  | "mentor";
type TabType = "all" | "unread" | "important";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  date: string;
  isRead: boolean;
  isImportant: boolean;
  cardId?: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  // Сегодня
  {
    id: "1",
    type: "needs_update",
    title: "Карточка требует актуализации",
    description:
      "ПОМО-01-0042 «Поверка манометров МП-4А» — срок пересмотра истёк 3 дня назад",
    time: "2 часа назад",
    date: "Сегодня",
    isRead: false,
    isImportant: true,
    cardId: "ПОМО-01-0042",
  },
  {
    id: "2",
    type: "approved",
    title: "Карточка утверждена",
    description:
      "Ваша карточка «Нестандартная ситуация: отказ расходомера» утверждена руководителем группы",
    time: "4 часа назад",
    date: "Сегодня",
    isRead: false,
    isImportant: false,
    cardId: "ПОМО-02-0015",
  },
  {
    id: "3",
    type: "comment",
    title: "Новый комментарий",
    description:
      "Петров П.П. оставил комментарий к карточке «Калибровка УСР при низких температурах»",
    time: "5 часов назад",
    date: "Сегодня",
    isRead: true,
    isImportant: false,
    cardId: "ПОМО-03-0007",
  },
  // Вчера
  {
    id: "4",
    type: "new_card",
    title: "Новая карточка в разделе",
    description:
      "В разделе «Нестандартные ситуации» добавлена карточка «Превышение давления при поверке»",
    time: "Вчера, 16:42",
    date: "Вчера",
    isRead: true,
    isImportant: false,
    cardId: "ПОМО-04-0023",
  },
  {
    id: "5",
    type: "reminder",
    title: "Напоминание о пересмотре",
    description:
      "Через 7 дней потребуется пересмотр карточки «Методика поверки весов»",
    time: "Вчера, 09:00",
    date: "Вчера",
    isRead: true,
    isImportant: true,
    cardId: "ПОМО-05-0011",
  },
  {
    id: "6",
    type: "mentor",
    title: "Отзыв от наставника",
    description:
      "Иванов И.И. оставил отзыв по вашему дневнику наставника за сентябрь",
    time: "Вчера, 08:15",
    date: "Вчера",
    isRead: true,
    isImportant: false,
  },
  // Ранее
  {
    id: "7",
    type: "new_card",
    title: "Обновление нормативного документа",
    description: "ГОСТ 8.271-2017 обновлён. Проверьте связанные карточки.",
    time: "02.10.2026",
    date: "Ранее",
    isRead: true,
    isImportant: true,
  },
];

const NOTIFICATION_CONFIG: Record<
  NotificationType,
  {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    color: string;
  }
> = {
  new_card: { icon: FileText, color: "#3b82f6" },
  needs_update: { icon: AlertCircle, color: "#ef4444" },
  approved: { icon: CheckCircle2, color: "#10b981" },
  comment: { icon: MessageSquare, color: "#8b5cf6" },
  reminder: { icon: Clock, color: "#f59e0b" },
  mentor: { icon: Star, color: "#ec4899" },
};

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "unread") return !n.isRead;
    if (activeTab === "important") return n.isImportant;
    return true;
  });

  const groupedByDate = filteredNotifications.reduce<
    Record<string, Notification[]>
  >((acc, n) => {
    if (!acc[n.date]) acc[n.date] = [];
    acc[n.date].push(n);
    return acc;
  }, {});

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerIcon}>
            <Bell size={24} />
          </div>
          <div>
            <h1 className={styles.headerTitle}>Уведомления</h1>
            <p className={styles.headerSubtitle}>
              {unreadCount > 0
                ? `У вас ${unreadCount} непрочитанных уведомлений`
                : "Все уведомления прочитаны"}
            </p>
          </div>
        </div>
        {unreadCount > 0 && (
          <button className={styles.markAllButton} onClick={markAllAsRead}>
            <CheckCheck size={16} />
            Отметить все прочитанными
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "all" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("all")}
        >
          Все
          <span className={styles.tabCount}>{notifications.length}</span>
        </button>
        <button
          className={`${styles.tab} ${activeTab === "unread" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("unread")}
        >
          Непрочитанные
          <span className={styles.tabCount}>{unreadCount}</span>
        </button>
        <button
          className={`${styles.tab} ${activeTab === "important" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("important")}
        >
          Важные
          <span className={styles.tabCount}>
            {notifications.filter((n) => n.isImportant).length}
          </span>
        </button>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {Object.keys(groupedByDate).length === 0 ? (
          <div className={styles.emptyState}>
            <Bell className={styles.emptyIcon} size={48} />
            <h3 className={styles.emptyTitle}>Уведомлений нет</h3>
            <p className={styles.emptyText}>
              Здесь будут отображаться уведомления о карточках, комментариях и
              напоминаниях
            </p>
          </div>
        ) : (
          Object.entries(groupedByDate).map(([date, items]) => (
            <div key={date} className={styles.dateGroup}>
              <div className={styles.dateLabel}>{date}</div>
              <div className={styles.list}>
                {items.map((notification) => {
                  const config = NOTIFICATION_CONFIG[notification.type];
                  const Icon = config.icon;

                  return (
                    <div
                      key={notification.id}
                      className={`${styles.notification} ${!notification.isRead ? styles.unread : ""}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div
                        className={styles.iconWrapper}
                        style={{
                          backgroundColor: `${config.color}15`,
                          color: config.color,
                        }}
                      >
                        <Icon size={20} />
                      </div>

                      <div className={styles.notificationContent}>
                        <div className={styles.notificationHeader}>
                          <div className={styles.notificationTitle}>
                            {notification.title}
                          </div>
                          {!notification.isRead && (
                            <span className={styles.newBadge}>NEW</span>
                          )}
                          {notification.isImportant && (
                            <Star size={14} className={styles.importantIcon} />
                          )}
                        </div>
                        <div className={styles.notificationDescription}>
                          {notification.description}
                        </div>
                        <div className={styles.notificationMeta}>
                          <span className={styles.time}>
                            {notification.time}
                          </span>
                          {notification.cardId && (
                            <span className={styles.cardId}>
                              {notification.cardId}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        className={styles.actionButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(notification.id);
                        }}
                        title="Отметить как прочитанное"
                      >
                        <CheckCheck size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer hint */}
      <div className={styles.footerHint}>
        <Settings size={14} />
        <span>Настроить уведомления можно в разделе «Настройки»</span>
      </div>
    </div>
  );
}
