import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addPointOfInterest } from '../../redux/slices/authSlice';
import utils from '../../utils/utils';

import PointOfInterestForm from '../PointOfInterestForm/PointOfInterestForm';

const AddPointOfInterest = () => {
    const [errorMsg, setErrorMsg] = useState(null);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { state } = useLocation();

    const handleSubmit = (formValues) => {
        try {
            const { lat, lng } = state || {};
            const id = utils.encodeUniqueIdFromCoordinates(lat, lng);

            const trimmedValues = utils.trimObjectValues(formValues);
            
             const currentPointOfInterest = {
                name: trimmedValues.name,
                description: trimmedValues.description,
                category: trimmedValues.category,
                lat,
                lng,
                id
            };

            dispatch(addPointOfInterest(currentPointOfInterest));
            navigate('/map');
        } catch (error) {
            setErrorMsg('An error occurred while handle submit form in point of interest.');
        }
    }

    return <PointOfInterestForm handleSubmit={ handleSubmit } state={ state } errorMsg={ errorMsg } />
};

export default AddPointOfInterest;
