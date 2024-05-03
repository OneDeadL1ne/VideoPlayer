import { useParams } from 'react-router-dom';

export function FilmPage() {
	const { id } = useParams();
	return <div className="text-white">{id}</div>;
}
