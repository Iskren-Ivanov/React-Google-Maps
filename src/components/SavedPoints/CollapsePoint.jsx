import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Button } from 'antd';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { removePointOfInterest } from '../../redux/slices/authSlice';

import styles from './CollapsePoint.module.css';

const CollapsePoint = ({ point }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRemove = () => {
        dispatch(removePointOfInterest(point));
    };

    const handleEdit = () => {
        navigate('/editPointOfInterest', { state: point });
    };

    console.log(`Render CollapsePoint`)

    return (
        <div className={ styles.collapsPoint }>
            <div className={ styles.collapsPointBtns }>
                <Button
                    onClick={ handleEdit }
                    type="dashed"
                    size="small"
                    icon={ <EditOutlined /> } />
                <Button
                    onClick={ handleRemove }
                    type="dashed"
                    size='small' danger
                    icon={ <CloseOutlined /> } />
            </div>
            <div className={ styles.collapsPointsCurrCategory }> <strong>Description:</strong> { point.description } </div>
            <div className={ styles.collapsPointsCurrCategory }> <strong>Category:</strong> { point.category }</div>
        </div>
    )
}

export default CollapsePoint;