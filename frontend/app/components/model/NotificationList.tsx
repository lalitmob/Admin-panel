
export default function NotificationList({ notifications }: { notifications: any[] }) {
    console.log(notifications)
    return (
      <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4">
        <h3 className="text-gray-800 font-semibold mb-2">Notifications</h3>
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-sm">No new notifications</p>
        ) : (
          <ul className="space-y-2">
            {/* {notifications.map((notif, index) => (
              <li key={index} className="p-2 border-b border-gray-200 text-sm">
                {notif.message}
              </li>
            ))} */}
          </ul>
        )}
      </div>
    );
  }
  