const Note = ({ note }) => {

    const modalId = "#ModalNote" + note.id;

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="card-title">{note.title}</h5>
                <span data-bs-toggle="modal" data-bs-target={modalId}>
                    &#x2699;
                </span>
            </div>
            <div className="card-body">
                <p className="card-text">{note.description}</p>
                <p className="card-text">{note.created_at}</p>
            </div>
        </div>
    );

}

export default Note;