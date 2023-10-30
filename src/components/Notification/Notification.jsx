import React, { useEffect } from 'react';
import { notification } from 'antd';

const Notification = ({ title, text }) => {
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        if (text) {
            api.error({
                message: title,
                description: text
            });
        }
    }, [api, title, text]);

    return (
        <>{contextHolder}</>
    );
};

export default Notification;
