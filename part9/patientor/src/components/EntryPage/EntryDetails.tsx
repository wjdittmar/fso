import { Entry } from "../../types";

const EntryDetails = ({ entry }: { entry: Entry }) => {
	switch (entry.type) {
		case "HealthCheck":
			return (<p>health check rating: {entry.healthCheckRating}</p>);
		case "Hospital":
			return (entry.discharge && <p> discharge date: {entry.discharge.date} and criteria: {entry.discharge.criteria}</p>);
		case "OccupationalHealthcare":
			const sickLeave = entry.sickLeave ? `sick leave -- start date: ${entry.sickLeave.startDate} end date: ${entry.sickLeave.endDate}` : null;
			return (<>
				<p>employer name : {entry.employerName}</p>
				<p>{sickLeave}</p>
			</>);
		default:
			throw new Error("invalid entry");
	}
};

export default EntryDetails;