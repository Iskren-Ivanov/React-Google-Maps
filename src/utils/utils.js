/**
 * Encode a unique ID from latitude and longitude coordinates.
 *
 * @param {number} lat - Latitude coordinate
 * @param {number} lng - Longitude coordinate
 * @returns {string|null} - The Base64 encoded unique ID or null in case of an error.
 */
const encodeUniqueIdFromCoordinates = (lat, lng) => {
    try {
        const uniqueId = `${lat.toFixed(6)}_${lng.toFixed(6)}`;
        const encodedId = btoa(uniqueId);
        return encodedId;
    } catch (error) {
        console.error('An error occurred while encode unique id:', error);
        return null;
    }
};

/**
 * Trim the values of a given object if they are strings.
 *
 * @param {Object} obj - The object containing values to trim.
 * @returns {Object} - The object with trimmed string values.
 */
const trimObjectValues = (obj) => {
    const trimmedValues = {};

    try {
        for (const key in obj) {
            if (typeof obj[key] === 'string') {
                trimmedValues[key] = obj[key].trim();
            } else {
                trimmedValues[key] = obj[key];
            }
        }
    } catch (error) {
        console.error('An error occurred while trimming object values:', error);
    }

    return trimmedValues;
}

const utils = {
    encodeUniqueIdFromCoordinates,
    trimObjectValues
}

export default utils;
