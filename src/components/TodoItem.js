
function TodoItem({ _todo, editTodo, deleteTodo, changeStatus }) {
    return <li key={_todo.id} id={_todo.id}>
        <div className="content">
            <span>{_todo.textContent}</span>    
        </div>
        <div className="buttons">
            <div className="icon-buttons">
                {
                    /**
                     * Eğer iş tamamlanan statüsünde değilse edit butonu gösterilmeyecek.
                     * Aksi halde _todo olarak alınan veri MainContext içindeki editTodo
                     * metotuna gönderilecek ve güncellenecek.  
                     * */ 
                    _todo.status !== 3 ?
                        <button type="button"
                            title="Edit this to-do"
                            className="icon-btn"
                            onClick={() => editTodo(_todo, _todo.status)}>
                            <span className="material-symbols-outlined">edit</span>
                        </button> : <></>
                }
                {/* MakeId ile oluşturulan id değerine göre yapılacak iş tüm süreçlerden silinebilir. */}
                <button type="button"
                    title="Delete this to-do"
                    className="icon-btn delete"
                    onClick={() => deleteTodo(_todo.id)}>
                    <span className="material-symbols-outlined">delete</span>
                </button>
                
            </div>
            <span className="date">{_todo.date}</span>
            {
                /**
                 * Status 3 değil ise 'Yapılıyor' veya 'Tamamlandı' durumuna göre diğer statuye veri gönderilir.
                 */
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
                /**
                 * Status 1 değilse yapılacak iş bir önceki status durumuna çekilebilir.
                 */
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