import { useEffect, useReducer, useRef } from 'react';
import { AxiosRequestConfig } from 'axios';

// services
import api from '@core/services/api';

interface IState<T> {
    status: 'init' | 'fetching' | 'error' | 'fetched';
    error?: string | null;
    data?: T | null; 
}

type IAction<T> = | { type: 'FETCH_REQUEST' } | { type: 'FETCH_SUCCESS'; payload: T } | { type: 'FETCH_FAIL', payload: string };

const useFetch = <T = unknown>(url: string, options?: AxiosRequestConfig): IState<T> => {

    const initialState: IState<T> = {
        status: 'init',
        error: null,
        data: null,
    }

    const cancelRequest = useRef<boolean>(false);

    const fetchReducer = (state: IState<T>, action: IAction<T>): IState<T> => {
        switch (action.type) {
            case 'FETCH_REQUEST':
                return { ...initialState, status: 'fetching' };
            case 'FETCH_SUCCESS':
                return { ...initialState, status: 'fetched', data: action.payload };
            case 'FETCH_FAIL':
                return { ...initialState, status: 'error', error: action.payload };
            default: 
                return state;
        }
    }

    const [state, dispatch] = useReducer(fetchReducer, initialState);

    const fetchData = async () => {
        try {
            dispatch({ type: 'FETCH_REQUEST' });

            const { data } = await api.get(url, options);
            if (cancelRequest.current) return;

            dispatch({ type: 'FETCH_SUCCESS', payload: data });
        } catch (error) {
            if (cancelRequest.current) return;
            dispatch({ type: 'FETCH_FAIL', payload: error.message });
        }
    }

    useEffect(() => {
        if (!url) {
            return;
        }
        
        fetchData();

        return () => {
            cancelRequest.current = true;
        }

    }, []);

    return { ...state };
}

export default useFetch;
