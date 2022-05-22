const Note = ({ note, deleteNote }) => {
    return (
        <div className="card">
            <div className="card-header">
                <h5 className="card-title">{note.title}</h5>
                <button className="btn btn-danger" onClick={() => deleteNote(note.id)}>Delete</button>
            </div>
            <div class="card-body">
                <p className="card-text">{note.description}</p>
                <p className="card-text">{note.created_at}</p>
            </div>
        </div>
    );

}

export default Note;