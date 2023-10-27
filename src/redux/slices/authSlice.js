import { createSlice } from '@reduxjs/toolkit';

import localStore from '../../utils/localStoreUtils';
import appConstants from '../../constants/appConstants';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userInfo: localStore.getUser(appConstants.USER) || null,
        pointsOfInterest: localStore.getPointsOfInterest(appConstants.POINTS_OF_INTEREST) || {}
    },
    reducers: {
        addUser: (state, action) => {
            localStore.setUser(appConstants.USER, action.payload)
            state.userInfo = action.payload;
        },
        removeUser: (state) => {
            localStore.removeUser(appConstants.USER);
            state.userInfo = null;
        },
        addPointOfInterest: (state, action) => {
            const { category } = action.payload || {};
            if (!state.pointsOfInterest[category]) {
                state.pointsOfInterest[category] = [];
            }

            state.pointsOfInterest[category].push(action.payload);
            localStore.setPointsOfInterest(appConstants.POINTS_OF_INTEREST, state.pointsOfInterest);
        },
        editPointOfInterest: (state, action) => {
            const updatedPointsOfInterest = { ...state.pointsOfInterest };

            const { category: editedCategory, id } = action.payload.editedPointOfInterest || {};
            const previousCategory = action.payload.previousCategory;

            const remainingCategoryPoints = (updatedPointsOfInterest[previousCategory] || []).filter(point => point.id !== id);

             if (remainingCategoryPoints.length) {
                updatedPointsOfInterest[previousCategory] = remainingCategoryPoints;
            } else {
                delete updatedPointsOfInterest[previousCategory];
            }
            if (!updatedPointsOfInterest[editedCategory]) {
                updatedPointsOfInterest[editedCategory] = [];
            }
            updatedPointsOfInterest[editedCategory].push(action.payload.editedPointOfInterest);

            state.pointsOfInterest = updatedPointsOfInterest;
            localStore.setPointsOfInterest(appConstants.POINTS_OF_INTEREST, updatedPointsOfInterest);
        },
        clearPointsOfInterestData: (state) => {
            localStore.clearPointsOfInterestData(appConstants.POINTS_OF_INTEREST);
            state.pointsOfInterest = {};
        },
        removePointOfInterest: (state, action) => {
            const updatedPointsOfInterest = { ...state.pointsOfInterest };
            const { category, id } = action.payload || {};

            const remainingCategoryPoints = (updatedPointsOfInterest[category] || []).filter(point => point.id !== id);
             if (remainingCategoryPoints.length) {
                updatedPointsOfInterest[category] = remainingCategoryPoints;
            } else {
                delete updatedPointsOfInterest[category];
            }

            state.pointsOfInterest = updatedPointsOfInterest;
            localStore.setPointsOfInterest(appConstants.POINTS_OF_INTEREST, updatedPointsOfInterest);
        },
    },
});

export const { addUser, removeUser, addPointOfInterest, removePointOfInterest, editPointOfInterest, clearPointsOfInterestData } = authSlice.actions;

export const selectUser = (state) => state.auth.userInfo;
export const selectPointsOfInterest = state => state.auth.pointsOfInterest;

export default authSlice.reducer;