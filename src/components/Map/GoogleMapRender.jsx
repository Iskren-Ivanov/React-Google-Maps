import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'antd';

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

import { useSelector } from 'react-redux';
import { selectPointsOfInterest } from '../../redux/slices/authSlice';

import Banner from '../Banner/Banner';
import Spinner from '../Spinner/Spiner';

import '@reach/combobox/styles.css';

import styles from './GoogleMapRender.module.css';

const libraries = ['places'];

const GoogleMapRender = ({ selectedLocation, setSelectedLocation, setErrorMessage }) => {
    const pointsOfInterest = useSelector(selectPointsOfInterest);
    const navigate = useNavigate();

    const [myLocation, setMyLocation] = useState(null);
    const [showBanner, setShowBanner] = useState(false);

    const [zoom, setZoom] = useState(15);

    useEffect(() => {
        getCurrentLocation();
    }, []);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_APP_KEY,
        libraries: libraries,
    });

    const handleMapClick = async (event) => {
        try {
            const { lat, lng } = event.latLng.toJSON();
            const floatLat = parseFloat(lat);
            const floatLng = parseFloat(lng);
            if (floatLat && floatLng) setSelectedLocation({ lat: floatLat, lng: floatLng });
            setShowBanner(true);
        } catch (error) {
            setShowBanner(false);
            setErrorMessage('An error occurred while handling the map click.');
        }
    };

    const getCurrentLocation = () => {
        try {
            navigator.geolocation.getCurrentPosition((position) => {
                const floatLat = parseFloat(position.coords.latitude);
                const floatLng = parseFloat(position.coords.longitude);
                if (floatLat && floatLng) setMyLocation({ lat: floatLat, lng: floatLng });
            })
        } catch (error) {
            setErrorMessage('An error occurred while getting the current location.');
        }
    };

    const handleClickBanner = (answer) => {
        if (answer) {
            navigate('/addPointOfInterest', { state: selectedLocation });
        }
        setShowBanner(false);
    }

    const handleCenterLocation = () => {
        setSelectedLocation(myLocation)
        setZoom(19);
    }

    const pointsOfInterestValues = Object.values(pointsOfInterest).flat();

    if (loadError) {
        setErrorMessage('Error loading Google Maps API')
    }

    if (!isLoaded) {
        return <Spinner />
    }

    return isLoaded && (
        <GoogleMap
            zoom={ zoom }
            center={ selectedLocation || myLocation }
            mapContainerClassName={ styles.googleMapRender }
            onClick={ handleMapClick } >
            <Marker position={ myLocation } />
            { pointsOfInterestValues.map(({ lat, lng }, markerIndex) => (<Marker key={ markerIndex }
                position={ { lat, lng } } />)) }
            <Button type='primary' className={ styles.mapButtonCenter } onClick={ handleCenterLocation }>
                Center
            </Button>
            <Banner
                showBanner={ showBanner }
                handleClickBanner={ handleClickBanner }
                path='/addPointOfInterest'
                text='Do you want to add a point of interest?' />
        </GoogleMap>
    )
};

export default GoogleMapRender;