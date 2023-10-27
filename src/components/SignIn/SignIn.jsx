
import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

import Modal from '../Modal/Modal';
import Notification from '../Notification/Notification';
import usersAccounts from '../../accounts/usersAccounts';
import { addUser } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import utils from '../../utils/utils';

import styles from './SignIn.module.css';

const SignIn = () => {
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = (formValues) => {
        try {
            setErrorMessage(null);
            const trimmedFormValues = utils.trimObjectValues(formValues);

            const user = usersAccounts.find((user) => user.email === trimmedFormValues.email && user.password === trimmedFormValues.password);
            if (user) {
                dispatch(addUser(user));
                navigate('/map');
            } else {
                setErrorMessage('Incorrect username or password.');
            }
        } catch (error) {
            setErrorMessage('An error occurred while handling the form.');
        }
    }

    return (
        <Modal>
            <Form
                className={ styles.form }
                labelCol={ { span: 8, } }
                wrapperCol={ { span: 16, } }
                onFinish={ handleSubmit }
                autoComplete='on'
            >
                <Form.Item
                    name='email'
                    rules={ [{ required: true, message: 'Please input your email!', }] }
                >
                    <Input placeholder='Еnter an email' />
                </Form.Item>
                <Form.Item
                    name='password'
                    autoComplete='on'
                    rules={ [{ required: true, message: 'Please input your password!', }] }
                >
                    <Input.Password placeholder='Еnter an password' />
                </Form.Item>
                <Form.Item wrapperCol={ { span: 2, } }  >
                    <Button type='primary' htmlType='submit'>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <Notification title='Error' text={ errorMessage } />
        </Modal>
    );
};

export default SignIn;