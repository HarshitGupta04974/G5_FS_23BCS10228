
const API_BASE_URL = 'http://localhost:8080/api';


const getToken = () => localStorage.getItem('token');


const handleResponse = async (response) => {
    
    if (response.status === 401 || response.status === 403) {
        
        logout(); 
        throw new Error('Session expired. Please log in again.');
    }

    
    if (response.status === 204) {
        return null;
    }

   
    const text = await response.text();
 
    const data = text ? JSON.parse(text) : null;

    if (!response.ok) {

        const error = (data && data.message) || response.statusText;
        throw new Error(error);
    }
    
    return data;
};


export const login = async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    
    const data = await handleResponse(response);

    console.log('Login response data:', data);

    if (data && data.accessToken && data.user) {
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data.user;
    }

    throw new Error("Login failed: Could not find 'accessToken' or 'user' in response.");
};


export const register = (username, email, password) => {
    return fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
    }).then(handleResponse);
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
 
    window.location.href = '/'; 
};


export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    try {
        return userStr ? JSON.parse(userStr) : null;
    } catch (e) {
        console.error("Could not parse user from localStorage", e);
        return null;
    }
};


const authHeader = () => {
    const token = getToken();
    if (!token || token === 'undefined') {
        console.error('Invalid token found in localStorage. Logging out.');
        logout();
        return {};
    }
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};


export const getHabits = () => {
    return fetch(`${API_BASE_URL}/habits`, {
        headers: authHeader() // Send the token
    }).then(handleResponse);
};

export const createHabit = (habitData) => {
    return fetch(`${API_BASE_URL}/habits`, {
        method: 'POST',
        headers: authHeader(), // Send the token
        body: JSON.stringify(habitData),
    }).then(handleResponse);
};


export const completeHabit = (habitId) => {
    return fetch(`${API_BASE_URL}/habits/${habitId}/complete`, {
        method: 'POST',
        headers: authHeader(), // Send the token
    }).then(handleResponse);
};


export const deleteHabit = (habitId) => {
    return fetch(`${API_BASE_URL}/habits/${habitId}`, {
        method: 'DELETE',
        headers: authHeader(), // Send the token
    }).then(handleResponse);
};