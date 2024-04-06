interface HeaderProps {
	name: string;
}

export default function Header(props: HeaderProps) {
	return (<h1>Hello, {props.name} </h1>);
};