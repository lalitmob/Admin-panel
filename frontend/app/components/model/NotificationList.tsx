interface Notification {
  id: string;
  message: {
    type: string;
    projectName: string;
    description: string;
    clientEmail: string;
    proposedDuration: number;
    quotation: Record<string, number>;
    techStack: string[];
  };
}

interface NotificationListProps {
  notifications: Notification[];
  onNotificationClick: (notification: Notification) => void;
}

export default function NotificationList({
  notifications,
  onNotificationClick,
}: NotificationListProps) {
  console.log(notifications);

  return (
    <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4">
      <h3 className="text-gray-800 font-semibold mb-2">Notifications</h3>
      {notifications.length === 0 ? (
        <p className="text-gray-500 text-sm">No new notifications</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map((notif, index) => (
            <li
              key={index}
              onClick={() => onNotificationClick(notif)}
              className="p-2 border-b border-gray-200 text-sm cursor-pointer hover:bg-gray-100"
            >
              {notif.message.type}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
