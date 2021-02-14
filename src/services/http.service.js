import http from '../http-common';

export const getAllBooks = () => {
    return http.get('/books');
};

export const getBook = (id) => {
    return http.get(`/books/${id}`);
};

export const createBook = (data) => {
    return http.post('/books', data);
};

export const updateBook = (id, data) => {
    return http.put(`/books/${id}`, data);
};

export const removeBook = (id) => {
    return http.delete(`/books/${id}`);
};