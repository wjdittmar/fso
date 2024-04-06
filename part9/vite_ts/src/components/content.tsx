import { CoursePartList } from "../types";

export default function Content({ courses }: CoursePartList) {
	return (
		<>
			{courses.map((course) => (
				<p key={course.name}> {course.name} {course.exerciseCount}</p>
			))}
		</>
	);
}