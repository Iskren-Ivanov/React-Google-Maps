import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/authSlice';
import Modal from '../Modal/Modal';

import { Avatar, Card } from 'antd';
import styles from './Profile.module.css';

const { Meta } = Card;

const Profile = () => {
    const [src, setSrc] = useState(null);
    const user = useSelector(selectUser);

    const getSrcAccordingToGender = ({ gender } = {}) => {
        if (!gender) return null;

        const genderSrcMap = {
            male: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp',
            female: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp',
        };

        return genderSrcMap[gender] || null;
    };

    useEffect(() => {
        if (user) {
            const srcAccordingToGender = getSrcAccordingToGender(user);
            if (srcAccordingToGender) setSrc(srcAccordingToGender);
        }
    }, [user]);

    return (
        <Modal>
            <Card className={ styles.profileCard } cover={ <Avatar size={ 200 } src={ src } /> } >
                <Meta className={ styles.profileCardMeta } title={ user && user.fullName } description={ user && user.email } />
            </Card>
        </Modal>
    )
}

export default Profile;
