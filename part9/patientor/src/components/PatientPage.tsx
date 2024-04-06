import { Patient } from "../types";
import { FemaleIcon } from '@mui/icons-material';
const PatientPage = ({ patient }: { patient: Patient }) => {
	console.log(patient);
	return (
		<>
			<h2>{patient.name}</h2 >
			<p>gender: {patient.gender}</p>
			<p>ssn: {patient.ssn}</p>
			<p>occupation: {patient.occupation}</p>
		</>);
};

export default PatientPage;