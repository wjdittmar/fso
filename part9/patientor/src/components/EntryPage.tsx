import { Entry } from "../types";
const EntryPage = ({ entry }: { entry: Entry }) => {
	return (
		<>
			<p> {entry.date} <em> {entry.description}</em></p>
			<ul>{entry.diagnosisCodes?.map((diagnosis) => <li> {diagnosis} </li>)}</ul>
		</>);
};

export default EntryPage;