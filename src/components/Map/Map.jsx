import React, { useState } from 'react';

import { Layout, theme } from 'antd';

import PlacesAutocomplete from './PlacesAutocomplete';
import SavedPoints from '../SavedPoints/SavedPoints';
import Notification from '../Notification/Notification';
import GoogleMapRender from './GoogleMapRender';

import '@reach/combobox/styles.css';

import styles from './Map.module.css';

const { Content, Sider } = Layout;

const Map = () => {
    const { token: { colorBgContainer } } = theme.useToken();
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    return (
        <Layout>
            <div className={ styles.mapHeader }  >
                <PlacesAutocomplete
                    setSelectedLocation={ setSelectedLocation }
                    setErrorMessage={ setErrorMessage }
                />
            </div>
            <Content className={ styles.mapContent }>
                <Layout className={ styles.mapLayout }  >
                    <Sider style={ { background: colorBgContainer } } width={ 300 }  >
                        <SavedPoints />
                    </Sider>
                    <GoogleMapRender
                        selectedLocation={ selectedLocation }
                        setSelectedLocation={ setSelectedLocation }
                        setErrorMessage={ setErrorMessage }
                    />
                </Layout>
            </Content>
            <Notification title='Error' text={ errorMessage } />
        </Layout >
    );
};

export default Map;
