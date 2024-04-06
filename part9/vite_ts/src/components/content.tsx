import { CoursePartList } from "../types";
import Part from "./part";
export default function Content({ courses }: CoursePartList) {
	return (
		<>
			{courses.map((course) => (
				<Part key={course.name} course={course} />
			))}
		</>
	);
}