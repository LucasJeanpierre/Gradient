const Category = ({ category, handleClick, deleteCategory }) => {
    const modalId = "#ModalCategory" + category.id;

    const modalColor = {
        backgroundColor: category.color
    }

    return (
        <div className="card">
            <div className="card-header" style={modalColor}>
                <h5 className="card-title">{category.name}</h5>
                <button className="btn btn-danger" onClick={(e) => { deleteCategory(category.id) }}>-</button>
                <span data-bs-toggle="modal" data-bs-target={modalId}>
                    &#x2699;
                </span>
            </div>
            <div className="card-body">
                <p className="card-text">{category.description}</p>
            </div>
            <div className="card-body" onClick={(e) => { handleClick(e, category.id, 'notes') }}>
                Notes
            </div>
            <div className="card-body" onClick={(e) => { handleClick(e, category.id, 'tasks') }}>
                Tasks
            </div>
        </div>
    );
}

export default Category;