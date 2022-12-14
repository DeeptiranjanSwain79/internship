import axios from "axios";
import {
    REGISTER_USER_FAIL,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_REQUEST,

    UPDATE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,

    ALL_USERS_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,

    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,

    DELETE_USER_REQUEST,
    DELETE_USER_FAIL,
    DELETE_USER_SUCCESS,

    CLEAR_ERRORS
} from "../constants/userConstants";


//Register
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post("/register", userData, config);

        dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
    } catch (error) {
        // dispatch({ type: REGISTER_USER_FAIL, payload: error });
        dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message });
    }
}


//Update User
export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(`/user/${id}`, userData, config);

        dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
    } catch (error) {
        // dispatch({ type: REGISTER_USER_FAIL, payload: error });
        dispatch({ type: UPDATE_USER_FAIL, payload: error.response.data.message });
    }
}

//Delete User
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST });

        const { data } = await axios.delete(`/user/${id}`);

        dispatch({ type: DELETE_USER_SUCCESS, payload: data.success });
    } catch (error) {
        // dispatch({ type: REGISTER_USER_FAIL, payload: error });
        dispatch({ type: DELETE_USER_FAIL, payload: error.response.data.message });
    }
}


//Get all users
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST })
        const { data } = await axios.get("/users");

        dispatch({ type: ALL_USERS_SUCCESS, payload: data.users })
    } catch (error) {
        dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message })
    }
}

//Get User Details
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST })
        const { data } = await axios.get(`/user/${id}`);

        dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user })
    } catch (error) {
        dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message })
    }
}

//Clearing all errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}