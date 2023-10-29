import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addPointOfInterest, editPointOfInterest } from '../../redux/slices/authSlice';
import utils from '../../utils/utils';

import PointOfInterestForm from './PointOfInterestForm';

const PointOfInterestEditor = () => {
    const [errorMsg, setErrorMsg] = useState(null);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { state } = useLocation();

    const handleSubmit = (formValues) => {
        try {
            const { lat, lng, id, category } = state || {};

            const trimmedValues = utils.trimObjectValues(formValues);

            const currentPointOfInterest = {
                name: trimmedValues.name,
                description: trimmedValues.description,
                category: trimmedValues.category,
                lat,
                lng,
                id
            };

            if (id) {
                dispatch(editPointOfInterest({ editedPointOfInterest: currentPointOfInterest, previousCategory: category }));
            } else {
                currentPointOfInterest.id = utils.encodeUniqueIdFromCoordinates(lat, lng);
                dispatch(addPointOfInterest(currentPointOfInterest));
            }

            navigate('/map');
        } catch (error) {
            setErrorMsg('An error occurred while handle submit form in point of interest.');
        }
    }

    return <PointOfInterestForm handleSubmit={ handleSubmit } state={ state } errorMsg={ errorMsg } />
};

export default PointOfInterestEditor;
