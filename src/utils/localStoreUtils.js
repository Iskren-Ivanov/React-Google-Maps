/**
 * Get user from local storage.
 *
 * @param {String} key - Storage key
 * @returns {Object|null} - The retrieved user data or null on error.
 */
const getUser = (key) => {
    try {
        const item = localStorage.getItem(key);

        return item ? JSON.parse(item) : null;
    } catch (error) {
        return null;
    }
};

/**
 * Set user to local storage.
 *
 * @param {String} key - Storage key
 * @param {Object} value - User data to store
 * @returns {Boolean} - true on success, false on error.
 */
const setUser = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));

        return true;
    } catch (error) {
        return false;
    }
};

/**
 * Remove user from local storage.
 *
 * @param {String} key - Storage key
 * @returns {Boolean} - true on success, false on error.
 */
const removeUser = (key) => {
    try {
        localStorage.removeItem(key);

        return true;
    } catch (error) {
        return false;
    }
};

/**
 * Get points of interest from local storage.
 *
 * @param {String} key - Storage key
 * @returns {Object|false} - The retrieved points of interest or false.
 */
const getPointsOfInterest = (key) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : {};
    } catch (error) {
        return false;
    }
};

/**
 * Set points of interest to local storage.
 *
 * @param {String} key - Storage key
 * @param {Object} value - Points of interest data to store
 * @returns {Boolean} - true on success, false on error.
 */
const setPointsOfInterest = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        return false;
    }
};

/**
 * Remove points of interest from local storage.
 *
 * @param {String} key - Storage key
 * @returns {Boolean} - true on success, false on error.
 */
const clearPointsOfInterestData = (key) => {
    try {
        localStorage.removeItem(key);

        return true;
    } catch (error) {
        return false;
    }
};

const localStoreUtils = {
    getUser,
    setUser,
    removeUser,
    getPointsOfInterest,
    setPointsOfInterest,
    clearPointsOfInterestData
};

export default localStoreUtils;
