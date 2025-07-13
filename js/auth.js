export function saveUserToStorage(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

export function getUserFromStorage() {
    return JSON.parse(localStorage.getItem('user'))
}

export function clearUserFromStorage() {
    localStorage.removeItem('user');
}