
import React from 'react';

import { Alert, Button } from 'antd';

import styles from './Banner.module.css';

const Banner = ({ showBanner, handleClickBanner, text }) => {

    return showBanner && (
        <>
            <div className={ styles.bannerBackground } />
            <Alert
                onClose={ () => handleClickBanner(false) }
                className={ styles.banner }
                message={ text }
                banner
                closable
                action={ <div>
                    <Button className={ styles.bannerBtn } type="primary" size="small" onClick={ () => handleClickBanner(true) }> Yes </Button>
                    <Button className={ styles.bannerBtn } size="small" onClick={ () => handleClickBanner(false) }> No </Button>
                </div> }
            />
        </>
    )
}

export default Banner;


