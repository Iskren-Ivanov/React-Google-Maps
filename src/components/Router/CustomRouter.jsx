import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/authSlice';

import Home from '../Home/Home';
import Map from '../Map/Map';
import SignIn from '../SignIn/SignIn';
import Profile from '../Profile/Profile';
import AddPointOfInterest from '../AddPointOfInterest/AddPointOfInterest';
import EditPointOfInterest from '../EditPointOfInterest/EditPointOfInterest';

const CustomRouter = () => {
    const user = useSelector(selectUser);

    const routesWithUser = (
        <>
            <Route path="/" element={ <Home /> } />
            <Route path="/map" element={ <Map /> } />
            <Route path="/profile" element={ <Profile /> } />
            <Route path="/addPointOfInterest" element={ <AddPointOfInterest /> } />
            <Route path="/editPointOfInterest" element={ <EditPointOfInterest /> } />
        </>
    );
    const routesWithoutUser = (
        <>
            <Route path="/" element={ <Home /> } />
            <Route path="/signIn" element={ <SignIn /> } />
        </>
    );


    return (
        <Routes>
            { user ? routesWithUser : routesWithoutUser }
        </Routes>
    );
}

export default CustomRouter;
