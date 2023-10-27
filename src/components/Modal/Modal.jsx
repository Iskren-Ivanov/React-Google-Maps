import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';

import styles from './Modal.module.css';

const ModalForm = ({ children }) => {
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleCancel = () => {
        setIsModalOpen(false);
        const previousPage = -1;
        navigate(previousPage);
    };

    return (
        <Modal className={ styles.modal } open={ isModalOpen } onCancel={ handleCancel } footer={ children } />
    );
};

export default ModalForm;