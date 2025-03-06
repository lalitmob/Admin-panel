import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { motion } from "framer-motion";
import socket from "@/utils/socket.js";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import NotificationList from "./model/NotificationList";

type Notification = {
  id: string;
  message: {
    projectName: string;
    description: string;
    clientEmail: string;
    proposedDuration: number;
    quotation: Record<string, number>; 
    techStack: string[];
    type: string;
  };
};

const NotificationBell = ({ userId }: { userId: string | null }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isShaking, setIsShaking] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  useEffect(() => {
    if (!userId) return;
    console.log("userId", userId);

    socket.emit("addUser", userId);

    socket.on("notification", (message: Notification) => {
      setNotifications((prev) => [...prev, message]);
      setIsShaking(true);
    });

    return () => {
      socket.off("notification");
    };
  }, [userId]);

  const handleClick = () => {
    setIsShaking(false);
    setNotifications([]);
  };

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    setOpen(true);
  };

  return (
    <div className="relative">
      <motion.div
        animate={isShaking ? { rotate: [-10, 10, -10, 10, 0] } : {}}
        transition={{
          duration: 0.3,
          repeat: isShaking ? Infinity : 0,
          repeatType: "loop",
          ease: "easeInOut",
        }}
        className="cursor-pointer"
        onClick={handleClick}
      >
        <Bell className="w-8 h-8 text-gray-700 dark:text-gray-300" />
      </motion.div>

      {notifications.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {notifications.length}
        </span>
      )}

      <NotificationList
        notifications={notifications}
        onNotificationClick={handleNotificationClick}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Notification Details</DialogTitle>
          <DialogDescription>
            {selectedNotification ? (
              <div className="p-4 bg-white shadow-md rounded-md">
                <label className="font-semibold">Project Name:</label>
                <p className="mb-2 text-gray-700">
                  {selectedNotification.message.projectName}
                </p>

                <label className="font-semibold">Description:</label>
                <p className="mb-2 text-gray-700">
                  {selectedNotification.message.description}
                </p>

                <label className="font-semibold">Client:</label>
                <p className="mb-2 text-gray-700">
                  {selectedNotification.message.clientEmail}
                </p>

                <label className="font-semibold">Proposed Duration:</label>
                <p className="mb-2 text-gray-700">
                  {selectedNotification.message.proposedDuration} days
                </p>

                <div className="mb-2">
                  <label className="font-semibold">Employees:</label>
                  <div className="ml-2">
                    {selectedNotification.message.quotation ? (
                      Object.entries(selectedNotification.message.quotation).map(
                        ([role, count], index) => (
                          <p key={index} className="text-gray-600">
                            {role}: {count}
                          </p>
                        )
                      )
                    ) : (
                      <p className="text-gray-500">No employees listed.</p>
                    )}
                  </div>
                </div>

                <label className="font-semibold">Tech Stack:</label>
                <p className="mb-2 text-gray-700">
                  {selectedNotification.message.techStack.join(", ")}
                </p>
              </div>
            ) : (
              <p className="text-gray-500">No notification selected.</p>
            )}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotificationBell;
