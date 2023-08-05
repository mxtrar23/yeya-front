const API = process.env.NEXT_PUBLIC_API_URL || 'https://yeya-back-w3a2-dev.fl0.io';

const endPoints = {
  info: `${API}/info`,
  auth: {
    login: `${API}/api/v1/auth/login`,
    getuser: (id) => `${API}/api/v1/users/${id}`,
  },
  categories: {
    list: `${API}/api/v1/categories`,
    create: `${API}/api/v1/categories`,
    edit: (id) => `${API}/api/v1/categories/${id}`,
  },
  registers: {
    list: `${API}/api/v1/registers`,
    create: `${API}/api/v1/registers`,
    edit: (id) => `${API}/api/v1/registers/${id}`,
    delete: (id) => `${API}/api/v1/registers/${id}`,
  },
};

export default endPoints;
