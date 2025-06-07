import {create} from 'zustand';
import axios from 'axios';

const serverApi = import.meta.env.VITE_SERVER_API;
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
	isAuthenticated: false,
	error: null,
	isLoading: false,
	isCheckingAuth: true,
    
    signup: async (email, password, name) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${serverApi}/signup`, { email, password, name });
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
		} catch (error) {
			set({ error: error.response.data.message || "Error signing up", isLoading: false });
			throw error;
		}
	},

	login: async (email, password) => {
		set({isLoading: true, error: null});
		try {
			const response = await axios.post(`${serverApi}/login`, {email, password});
			set({ user: response.data.user, isAuthenticated: true, isLoading: false })
		} catch (error) {
			set({ error: error.response.data.message || "Error Login", isLoading: false });
			throw error;
		}
	},

	logout: async () => {
		set({isLoading: true, error: null});
		try {
			const response = await axios.post(`${serverApi}/logout`);
			set({ user: response.data.user, isAuthenticated: false, isLoading: false, error: null })
		} catch (error) {
			set({ error: error.response.data.message || "Error logging in", isLoading: false });
			throw error;
		}
	},

    verifyEmail: async (code) => {
        try {
            const response = await axios.post(`${serverApi}/verify-email`, {code});
            set({ user: response.data.user, isAuthenticated: true });
            return response.data;
        } catch (error) {
            set({ error: error.response.data.message || "Error verifying email"});
            throw error;
        }
    },

	checkAuth: async () => {
		set({ isCheckingAuth: true, error: null});
		try {
			const response = await axios.get(`${serverApi}/check-auth`);
			set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false})
		} catch (error) {
			set({error: null, isCheckingAuth: false, isAuthenticated: false })
		}
	},

	forgetPassword: async (email) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${serverApi}/forget-password`, {email});
			set({ user: response.data.user, isLoading: false });
		} catch (error) {
			set({ error: error.response.data.message || 'error forgeting password', isLoading: false })
			throw error ;
		}
	},

	resetPassword: async (token, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${serverApi}/reset-password/${token}`, {password});
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({ error: error.response.data.message || 'error reseting password', isLoading: false })
			throw error ;
		}
	}
})
)