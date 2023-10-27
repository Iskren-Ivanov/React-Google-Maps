import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
    HomeOutlined, UserOutlined, AimOutlined, LoginOutlined, LogoutOutlined
} from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import { removeUser, selectUser, clearPointsOfInterestData } from '../../redux/slices/authSlice';

const { Header } = Layout;

const menuItems = [
    {
        key: '1',
        icon: <HomeOutlined />,
        title: 'Home',
        navigationPath: '/'
    },
    {
        key: '2',
        icon: <UserOutlined />,
        title: 'Profile',
        navigationPath: '/profile'
    },
    {
        key: '3',
        icon: <AimOutlined />,
        title: 'Map',
        navigationPath: '/map'
    },
    {
        key: '4',
        icon: <LoginOutlined />,
        title: 'Sign in',
        navigationPath: '/signIn'
    },
    {
        key: '5',
        icon: <LogoutOutlined />,
        title: 'Sign out',
        navigationPath: '/signOut'
    },
];

const NavigationBar = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const [selectedKey, setSelectedKey] = useState('1')

    const handleClick = ({ navigationPath, title, key }) => {
        try {
            if (title === 'Sign out') {
                dispatch(removeUser());
                dispatch(clearPointsOfInterestData());
                setSelectedKey('1');
                navigate('/');
            } else {
                setSelectedKey(key);
                navigate(navigationPath);
            }
        } catch (error) {
            setSelectedKey('1');
            navigate('/');
        }
    }

    const menuButtonsWithUser = menuItems.filter(item => item.title !== 'Sign in');
    const menuButtonsWithoutUser = menuItems.filter(item => item.title !== 'Sign out' && item.title !== 'Map' && item.title !== 'Profile');

    const menuButtons = user ? menuButtonsWithUser : menuButtonsWithoutUser;

    return (
        <Layout className="layout">
            <Header>
                <Menu theme="dark" mode="horizontal" selectedKeys={ selectedKey } defaultSelectedKeys={ ['1'] }  >
                    { menuButtons.map(item => <Menu.Item onClick={ () => handleClick(item) } key={ item.key } icon={ item.icon }>
                        { item.title }
                    </Menu.Item>) }
                </Menu>
            </Header>
        </Layout >
    );
}

export default NavigationBar;
