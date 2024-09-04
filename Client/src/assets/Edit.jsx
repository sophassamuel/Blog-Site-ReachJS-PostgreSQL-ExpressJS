import { useNavigate } from "react-router-dom";

export default function EditPost({ id }) {
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate(`/${id}/edit`);
    };

    return (
        <button onClick={handleEditClick} className="submitpost">Edit Blog</button>
    );
}
