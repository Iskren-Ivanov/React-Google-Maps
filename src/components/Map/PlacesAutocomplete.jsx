import React from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng, } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption, } from '@reach/combobox';
import '@reach/combobox/styles.css';

import styles from './PlacesAutocomplete.module.css';

const PlacesAutocomplete = ({ setSelectedLocation, setErrorMessage }) => {
    const { ready, value, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplete();

    const handleSelect = async (address) => {
        try {
            setValue(address, false);
            clearSuggestions();
            const geocode = await getGeocode({ address });
            if (geocode && Array.isArray(geocode) && geocode.length) {
                const { lat, lng } = await getLatLng(geocode[0]);
                if (lat && lng) setSelectedLocation({ lat, lng });
            }
        } catch (error) {
            setErrorMessage('An error occurred while handle select places.');
        }
    };

    return (
        <Combobox onSelect={ handleSelect } className={ styles.combobox }>
            <ComboboxInput
                className={ styles.combobox_input }
                value={ value }
                onChange={ (e) => setValue(e.target.value) }
                disabled={ !ready }
                placeholder='Search an address'
            />
            <ComboboxPopover>
                <ComboboxList>
                    { status === 'OK' &&
                        data.map(({ place_id, description }) => (
                            <ComboboxOption key={ place_id } value={ description } />
                        )) }
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    );
};

export default PlacesAutocomplete;
