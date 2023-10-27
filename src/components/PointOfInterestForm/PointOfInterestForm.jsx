import React from 'react';
import Notification from '../Notification/Notification';

import { Form, Input, Select, Button } from 'antd';

import Modal from '../Modal/Modal';
import styles from './PointOfInterestForm.module.css';

const { TextArea } = Input;

const categories = [
    {
        value: 'Metro stations',
        label: 'Metro stations',
    },
    {
        value: 'Gas',
        label: 'Gas',
    },
    {
        value: 'Hotels',
        label: 'Hotels',
    },
    {
        value: 'Groceries',
        label: 'Groceries',
    },
    {
        value: 'Restaurants',
        label: 'Restaurants',
    },
    {
        value: 'Pharmacies',
        label: 'Pharmacies',
    },
    {
        value: 'ATMs',
        label: 'ATMs',
    },
];

const PointOfInterestForm = ({ handleSubmit, state, errorMsg }) => (
    <Modal>
        <Form className={ styles.form }
            onFinish={ handleSubmit }
            autoComplete='on'>
            <Form.Item
                initialValue={ state.name }
                name='name'
                rules={ [{ required: true }] }
                className={ styles.formItem }>
                <Input defaultValue={ state.name } className={ styles.formItemInput } placeholder='Name' />
            </Form.Item>
            <Form.Item
                initialValue={ state.category }
                name='category'
                rules={ [{ required: true }] }
                className={ styles.formItem }>
                <Select defaultValue={ state.category } placeholder='Category' options={ categories }>
                    <Select.Option className={ styles.formItemInput } />
                </Select>
            </Form.Item>
            <Form.Item
                initialValue={ state.description }
                name='description'
                className={ styles.formItem }>
                <TextArea className={ styles.formItemInput } defaultValue={ state.description } placeholder='Description' />
            </Form.Item>
            <Form.Item
                wrapperCol={ { span: 2 } } >
                <Button type='primary' htmlType='submit'>
                    Submit
                </Button>
            </Form.Item>
        </Form>
        <Notification title='Error' text={ errorMsg } />
    </Modal>
);

export default PointOfInterestForm;
