import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
	name: 'anecdote',
	initialState: [],
	reducers: {
		createAnecdote(state, action) {
			// now called from the anecdote service which returns the anecdote object
			// so no longer need to call asObject
			state.push(action.payload);
		},
		voteAnecdote(state, action) {
			const id = action.payload;
			const anecdoteToChange = state.find(n => n.id === id)
			const changedAnecdote = {
				...anecdoteToChange, votes: anecdoteToChange.votes + 1
			}
			return state.map(anecdote =>
				anecdote.id !== id ? anecdote : changedAnecdote
			);
		},
		setAnecdotes(state, action) {
			return action.payload;
		}
	},
});

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer