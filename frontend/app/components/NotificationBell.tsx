import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { motion } from "framer-motion";
import socket from "@/utils/socket.js";
import NotificationList from "./model/NotificationList";
type Notification = {
    id: string;
    message: string;
  };
const NotificationBell = ({ userId }: { userId: string | null }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isShaking, setIsShaking] = useState(false);
  useEffect(() => {
    if (!userId) return; 

    socket.emit("addUser", userId);

    socket.on("notification", (message) => {
      setNotifications((prev) => [...prev, message]);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 1000);
    });

    return () => {
      socket.off("notification");
    };
  }, [userId]); 
   console.log(notifications)
  return (
    <div className="relative">
      <motion.div
        animate={isShaking ? { rotate: [-5, 5, -5, 5, 0] } : {}}
        transition={{ duration: 0.5 }}
        className="cursor-pointer"
      >
        <Bell className="w-8 h-8 text-gray-700 dark:text-gray-300" />
      </motion.div>

      {notifications.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {notifications.length}
        </span>
      )}
      <NotificationList notifications={notifications}/>
    </div>
  );
};

export default NotificationBell;
