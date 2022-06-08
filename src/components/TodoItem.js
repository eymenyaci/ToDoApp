
function TodoItem({ _todo, editTodo, deleteTodo, changeStatus }) {
    return <li key={_todo.id} id={_todo.id}>
        <div className="content">
            <span>{_todo.textContent}</span>    
        </div>
        <div className="buttons">
            <div className="icon-buttons">
                {
                    _todo.status !== 3 ?
                        <button type="button"
                            title="Edit this to-do"
                            className="icon-btn"
                            onClick={() => editTodo(_todo, _todo.status)}>
                            <span className="material-symbols-outlined">edit</span>
                        </button> : <></>
                }
                <button type="button"
                    title="Delete this to-do"
                    className="icon-btn delete"
                    onClick={() => deleteTodo(_todo.id)}>
                    <span className="material-symbols-outlined">delete</span>
                </button>
                
            </div>
            <span className="date">{_todo.date}</span>
            {
                _todo.status === 3 ?
                    <>
                    </> :
                    <>
                        <button type="button"
                            className="right-btn"
                            onClick={() => changeStatus(_todo, _todo.status + 1)}>{_todo.status === 1 ? 'Yapılıyor' : 'Tamamlandı'}</button>
                    </>
            }
            {
                _todo.status === 1 ?
                    <>
                    </> :
                    <>
                        <button type="button"
                            className="right-btn"
                            onClick={() => changeStatus(_todo, _todo.status - 1)}>Geri Al</button>
                    </>
            }
        </div>
    </li>
}

export default TodoItem;