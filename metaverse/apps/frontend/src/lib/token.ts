// Token storage utility with sessionStorage for better security
export const tokenStorage = {
  get: () => sessionStorage.getItem('token'),
  set: (token: string) => sessionStorage.setItem('token', token),
  remove: () => sessionStorage.removeItem('token'),
  isValid: (token: string | null) => {
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  },
  cleanup: () => {
    const token = sessionStorage.getItem('token');
    if (token && !tokenStorage.isValid(token)) {
      sessionStorage.removeItem('token');
      return true; // Token was invalid and removed
    }
    return false; // Token was valid or didn't exist
  }
}; 