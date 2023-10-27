import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editPointOfInterest } from '../../redux/slices/authSlice';
import PointOfInterestForm from '../PointOfInterestForm/PointOfInterestForm';
import utils from '../../utils/utils';


const EditPointOfInterest = () => {
    const [errorMsg, setErrorMsg] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { state } = useLocation();

    const handleSubmit = (formValues) => {
        try {
            const { id, lat, lng, } = state;

            const trimmedValues = utils.trimObjectValues(formValues);
 
            const editedPointOfInterest = {
                name: trimmedValues.name,
                description: trimmedValues.description,
                category: trimmedValues.category,
                lat,
                lng,
                id
            };

            dispatch(editPointOfInterest({ editedPointOfInterest, previousCategory: state.category }));
            navigate('/map');
        } catch (error) {
            setErrorMsg('An error occurred while handle submit form in point of interest.');
        }
    }

    return <PointOfInterestForm handleSubmit={ handleSubmit } state={ state } errorMsg={ errorMsg } />
};

export default EditPointOfInterest;
