import { CoursePart } from "../types";

const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

export default function Part({ course }: { course: CoursePart }) {
	switch (course.kind) {
		case "basic":
			return (<>
				<p key={course.name}> <b>{course.name} {course.exerciseCount} </b> </p>
				<em> {course.description} </em>
			</>);
		case "background":
			return (<>
				<p key={course.name}> <b>{course.name} {course.exerciseCount}</b> </p>
				<em>{course.description} {course.backgroundMaterial}</em>
			</>);
		case "group":
			return ((<>
				<p key={course.name}> <b>{course.name} {course.exerciseCount}  {course.groupProjectCount} </b></p>
			</>));
		case "special":
			return (<><p key={course.name}> <b> {course.name}  {course.exerciseCount} </b></p>
				<em> {course.description} </em><em>{course.requirements.join(', ')}</em></>);
		default:
			return assertNever(course);
	}
	return (
		<p key={course.name}> {course.name} {course.exerciseCount}</p>
	);
}