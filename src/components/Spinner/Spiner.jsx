import React from 'react';
import { Spin } from 'antd';

import style from './Spiner.module.css';

const Spinner = () => (
    <div className={ style.spinner }>
        <Spin size='large' /> 
    </div>
);
export default Spinner;