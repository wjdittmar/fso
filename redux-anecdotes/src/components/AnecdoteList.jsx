import { useDispatch, useSelector } from 'react-redux'

const AnecdoteList = () => {

	const dispatch = useDispatch()
	const anecdotes = useSelector(state => state)
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