import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		addNotification(state, action) {
			return action.payload;
		},
		removeNotification(state, action) {
			return '';
		},
	}
});

export const setNotification = (content, seconds) => {
	return async dispatch => {
		dispatch(addNotification(content))
		setTimeout(() => {
			dispatch(removeNotification())
		}, seconds * 1000)
	}
}


export const { addNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer