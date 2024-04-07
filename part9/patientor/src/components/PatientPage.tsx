import { Patient } from "../types";
import EntryPage from "./EntryPage/EntryPage";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";

const PatientPage = () => {
	const id = useParams().id;
	const [patient, setPatient] = useState<Patient | null>(null);

	useEffect(() => {
		if (id) {
			void patientService.getPatient(id).then(data => {
				setPatient(data);
			});
		}
	}, [id]);

	if (!patient) return null;

	return (
		<>
			<h2>{patient.name}</h2 >
			<p>gender: {patient.gender}</p>
			<p>ssn: {patient.ssn}</p>
			<p>occupation: {patient.occupation}</p>
			{patient.entries?.map((entry) => (
				<EntryPage entry={entry} />
			))}
		</>);
};

export default PatientPage;