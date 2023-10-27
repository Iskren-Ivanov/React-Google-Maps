
import React, { useEffect } from 'react';
import { notification } from 'antd';

const Notification = ({ title, text }) => {
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        api.error({
            message: title,
            description: text
        });
    }, [text, title])

    return text && (
        <>
            { contextHolder }
        </>
    );
};

export default Notification;
