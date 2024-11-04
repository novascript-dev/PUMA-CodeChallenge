const API_URL = 'http://127.0.0.1:3000/users';

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
        throw new Error(errorData.message || 'Erro desconhecido');
    }
    return response.status === 204 ? null : await response.json();
};

export const getUsers = async (sort = '') => {
    const url = sort ? `${API_URL}?sort=${sort}` : API_URL;
    const response = await fetch(url);
    return handleResponse(response);
};

export const getSortedUsers = async () => {
    const response = await fetch(`${API_URL}?sort=asc`);
    return handleResponse(response);
};

export const addUser = async (username) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
    });
    return handleResponse(response);
};

export const deleteUser = async (username) => {
    const response = await fetch(`${API_URL}/${username}`, {
        method: 'DELETE',
    });
    return handleResponse(response);
};
