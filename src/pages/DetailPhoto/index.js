import { useParams } from 'react-router-dom';

function DetailPhoto() {
    const params = useParams();
    const id = params.id.slice(0, params.id.length);
    return (
        <div>
            <h1>{id}</h1>
        </div>
    );
}

export default DetailPhoto;
