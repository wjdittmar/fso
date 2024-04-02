import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
const AnecdoteList = () => {

	const dispatch = useDispatch()
	const anecdotes = useSelector(state => {
		// return everything if the filter is empty
		if (state.filter === '') return state.anecdotes;
		else {
			return state.anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()));
		}
	});

	const handleVote = (anecdote) => {
		dispatch(setNotification(`You voted for ${anecdote.content}`, 1));
		dispatch(voteAnecdote(anecdote.id));
	}

	return (
		<>
			<h2>Anecdotes</h2>
			{[...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote =>

				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						{<button onClick={() => handleVote(anecdote)}>vote</button>}
					</div>
				</div>
			)}
		</>);
}
export default AnecdoteList