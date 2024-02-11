import {$user} from '../stores';
import {LoginFormData, User} from '../types';

const API_URL = process.env.REACT_APP_API_URL;

type Options = {
  onSuccess?: () => Promise<void> | void;
  onError?: (e?: Error) => Promise<void> | void;
};

export const login = async (data: LoginFormData, {onSuccess, onError}: Options = {}) => {
  fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  })
    .then(async (res) => {
      const response = await res.json();

      if (!res.ok) {
        throw new Error(response?.message); // bubbles up
      }

      $user.set(response as User);

      onSuccess && onSuccess();
    })
    .catch((e) => {
      $user.set(null);
      onError && onError(e);
    });
};

export const validateToken = (token?: string, {onSuccess, onError}: Options = {}) => {
  if (!token) {
    return onError && onError();
  }

  fetch(`${API_URL}/auth/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (res) => {
      const response = await res.json();

      if (!res.ok) {
        throw new Error(response?.message); // bubbles up
      }

      const data = response as User;

      $user.set({
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        image: data.image,
        token,
      });

      onSuccess && onSuccess();
    })
    .catch(() => {
      $user.set(null);
      onError && onError();
    });
};
