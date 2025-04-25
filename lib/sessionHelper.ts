export interface UserSession {
  id: string;
  name: string;
  email: string;
  bio?: string;
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
}

export const setUserSession = (userData: UserSession) => {
  sessionStorage.setItem('user', JSON.stringify(userData));
};

export const getUserSession = (): UserSession | null => {
  if (typeof window === 'undefined') return null;
  const user = sessionStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const clearUserSession = () => {
  sessionStorage.removeItem('user');
};
