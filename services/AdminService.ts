const api = useApi()

export default {
    getAdmins(params?: object) {
        return api.get('admins', { params });
    },
    getAdmin(id: number, params?: object) {
        return api.get(`admins/${id}`, { params });
    },
    createAdmin(data: object) {
        return api.post('admins', data);
    },
    updateAdmin(id: number, data: object) {
        return api.post(`admins/${id}`, data);
    },
    deleteAdmin(id: number) {
        return api.delete(`admins/${id}`);
    }
}