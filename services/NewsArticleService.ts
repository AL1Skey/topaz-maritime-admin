const api = useApi()

export default {
    getNewsArticles(params?: object) {
        return api.get('news-articles', { params });
    },
    getNewsArticle(id: number, params?: object) {
        return api.get(`news-articles/${id}`, { params });
    },
    createNewsArticle(data: object) {
        return api.post('news-articles', data);
    },
    updateNewsArticle(id: number, data: object) {
        return api.post(`news-articles/${id}`, data);
    },
    deleteNewsArticle(id: number) {
        return api.delete(`news-articles/${id}`);
    },
    deleteNewsArticlePdf(id: number) {
        return api.delete(`news-articles/${id}/pdf`);
    }
}