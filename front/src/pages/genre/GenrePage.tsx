import { useParams } from 'react-router-dom';

export function GenrePage() {
	const { id } = useParams();
	return <div className="text-white">{id}</div>;
}
