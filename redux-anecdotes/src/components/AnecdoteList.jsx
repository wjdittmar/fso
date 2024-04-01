import { useDispatch, useSelector } from 'react-redux'

const AnecdoteList = () => {

	const dispatch = useDispatch()
	const anecdotes = useSelector(state => {
		// return everything if the filter is empty
		if (state.filter === '') return state.anecdotes;
		else {
			return state.anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()));
		}
	});
	const vote = (id) => {
		return ({
			type: 'VOTE',
			id: id
		})

	}



	return (
		<>
			<h2>Anecdotes</h2>
			{anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
					</div>
				</div>
			)}
		</>);
}
export default AnecdoteList