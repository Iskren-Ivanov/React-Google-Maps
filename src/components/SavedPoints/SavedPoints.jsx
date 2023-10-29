import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Collapse, Select } from 'antd';
import { selectPointsOfInterest } from '../../redux/slices/authSlice';
import CollapsePoint from './CollapsePoint';

import styles from './SavedPoints.module.css';

const SavedPoints = () => {
    const pointsOfInterest = useSelector(selectPointsOfInterest);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedSorting, setSelectedSorting] = useState('Name');

    const categories = Object.keys(pointsOfInterest).map((category, id) => ({
        key: id,
        value: category,
        label: category,
    }));

    const pointsData = selectedCategory === 'All' ? pointsOfInterest : pointsOfInterest[selectedCategory] || [];
    const allPointsOfInterestValues = Object.values(pointsData).flat();

    const sortedPoints = allPointsOfInterestValues.sort((a, b) => {
        if (selectedSorting === 'name') {
            return a.name.localeCompare(b.name);
        } else if (selectedSorting === 'description') {
            return a.description.localeCompare(b.description);
        }
        return 0;
    });

    const collapsablePoints = sortedPoints.map((point) => ({
        key: point?.id,
        label: point?.name,
        children: <CollapsePoint point={ point } />,
    }));

    return (
        <div className={ styles.savedPoints }>
            <div className={ styles.savedPointsMenu }>
                <Select
                    className={ styles.savedPointsSelect }
                    defaultValue="All"
                    onChange={ (category) => setSelectedCategory(category) }
                    options={ [{ value: 'All', label: 'All' }, ...categories] }
                />
                <Select
                    className={ styles.savedPointsSelect }
                    defaultValue="name"
                    onChange={ (sorting) => setSelectedSorting(sorting) }
                    options={ [
                        { value: 'name', label: 'Sort by Name' },
                        { value: 'description', label: 'Sort by Description' },
                    ] }
                />
            </div>
            <div className={ styles.savedPointsList }>
                <Collapse accordion items={ collapsablePoints } />
            </div>
        </div>
    );
};

export default SavedPoints;
