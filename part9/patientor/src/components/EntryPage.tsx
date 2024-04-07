import { useEffect, useState } from "react";
import { Diagnosis, Entry } from "../types";
import diagnosesService from '../services/diagnoses';

const EntryPage = ({ entry }: { entry: Entry }) => {

	const [diagnoses, setDiagnoses] = useState<Array<Diagnosis>>([]);

	useEffect(() => {
		void diagnosesService.getAllDiagnoses().then(data => {
			setDiagnoses(data);
		});
	}, []);
	console.log(diagnoses);
	console.log(diagnoses.find((ele) => ele.code === 'M24.2'));
	return (
		<>
			<p> {entry.date} <em> {entry.description}</em></p>
			<ul>
				{entry.diagnosisCodes?.map((diagnosisCode) => (
					<li key={diagnosisCode}>
						{diagnosisCode} -{' '}
						{diagnoses.find((diagnosis) => diagnosis.code === diagnosisCode)?.name}
					</li>
				))}
			</ul>
		</>);
}

export default EntryPage;