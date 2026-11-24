import {
  apiDownload,
  apiRequest,
  clearSessionToken,
  setSessionToken,
} from './apiClient';

function toQueryString(params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && String(value).trim() !== '') {
      qs.set(key, String(value).trim());
    }
  });
  const encoded = qs.toString();
  return encoded ? `?${encoded}` : '';
}

export const adminApi = {
  async getAuthConfig() {
    return apiRequest('/api/auth/config');
  },

  async loginWithGoogle(idToken) {
    const data = await apiRequest('/api/auth/google', {
      method: 'POST',
      body: { idToken },
    });
    if (data?.status === 'AUTHENTICATED' && data?.accessToken) {
      setSessionToken(data.accessToken);
    }
    return data;
  },

  async bootstrapInitialAdmin({ onboardingToken, bootstrapCode, nombreInterno }) {
    const data = await apiRequest('/api/auth/bootstrap-admin', {
      method: 'POST',
      body: { onboardingToken, bootstrapCode, nombreInterno },
    });
    if (data?.accessToken) {
      setSessionToken(data.accessToken);
    }
    return data;
  },

  async registerWithInvitationCode({ onboardingToken, invitationCode }) {
    const data = await apiRequest('/api/auth/register-with-code', {
      method: 'POST',
      body: { onboardingToken, invitationCode },
    });
    if (data?.accessToken) {
      setSessionToken(data.accessToken);
    }
    return data;
  },

  async getMe() {
    return apiRequest('/api/auth/me');
  },

  async logout() {
    try {
      await apiRequest('/api/auth/logout', { method: 'POST' });
    } finally {
      clearSessionToken();
    }
  },

  async getFormsSummary() {
    return apiRequest('/api/admin/formularios/resumen');
  },

  async listAniversario(params) {
    return apiRequest(`/api/admin/formularios/aniversario${toQueryString(params)}`);
  },

  async updateAniversarioReview(id, payload) {
    return apiRequest(`/api/admin/formularios/aniversario/${id}`, {
      method: 'PATCH',
      body: payload,
    });
  },

  async listConsultas(params) {
    return apiRequest(`/api/admin/formularios/consultas${toQueryString(params)}`);
  },

  async updateConsultaReview(id, payload) {
    return apiRequest(`/api/admin/formularios/consultas/${id}`, {
      method: 'PATCH',
      body: payload,
    });
  },

  async downloadExport(params) {
    const ext = params?.formato === 'csv' ? 'csv' : 'xlsx';
    const tipo = params?.tipo || 'todos';
    return apiDownload(
      `/api/admin/export${toQueryString(params)}`,
      `amf-${tipo}.${ext}`,
    );
  },

  async listUsers() {
    return apiRequest('/api/admin/users/users');
  },

  async updateUser(id, payload) {
    return apiRequest(`/api/admin/users/users/${id}`, {
      method: 'PATCH',
      body: payload,
    });
  },

  async deleteUser(id) {
    return apiRequest(`/api/admin/users/users/${id}`, {
      method: 'DELETE',
    });
  },

  async listInvitations() {
    return apiRequest('/api/admin/users/invitations');
  },

  async createInvitation(payload) {
    return apiRequest('/api/admin/users/invitations', {
      method: 'POST',
      body: payload,
    });
  },

  async revokeInvitation(id) {
    return apiRequest(`/api/admin/users/invitations/${id}/revoke`, {
      method: 'PATCH',
    });
  },
};
