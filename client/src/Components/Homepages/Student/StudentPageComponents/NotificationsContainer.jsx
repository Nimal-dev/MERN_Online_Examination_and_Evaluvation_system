import React, { useEffect, useState } from 'react';

function NotificationsContainer({ classId }) {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch(`http://localhost:4000/notify/notifications/${classId}`);
                const data = await response.json();
                setNotifications(data);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        if (classId) {
            fetchNotifications();
        }
    }, [classId]);

    return (
        <div className="notifications-container">
            <h2>Notifications</h2>
            {notifications.length === 0 ? (
                <p>No new notifications</p>
            ) : (
                notifications.map((notification, index) => (
                    <div key={index} className="notification">
                        {notification.message}
                    </div>
                ))
            )}
        </div>
    );
}

export default NotificationsContainer;
