const Category = ({ category, handleClick, deleteCategory }) => {
    return (
        <div className="card">
            <div className="card-header">
                <h5 className="card-title">{category.name}</h5>
                <button className="btn btn-danger" onClick={(e) => { deleteCategory(category.id) }}>-</button>
            </div>
            <div class="card-body">
                <p className="card-text">{category.description}</p>
            </div>
            <div class="card-body" onClick={(e) => { handleClick(e, category.id, 'notes') }}>
                Notes
            </div>
            <div class="card-body" onClick={(e) => { handleClick(e, category.id, 'tasks') }}>
                Tasks
            </div>
        </div>
    );
}

export default Category;