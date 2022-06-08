function AddForm({ todo, setTodo, date, setDate, addTodo }) {
    let dateNow = new Date(Date.now()).toISOString().split("T")[0];
    return <form onSubmit={e => { e.preventDefault(); addTodo() }}>
        <h3>İş girin</h3>
        <div className="inputs">
            <input type="text"
                placeholder={'Yeni İş Ekleyin...'}
                value={todo}
                onChange={(e) => setTodo(e.target.value)} />
            <input type="date"
                value={date}
                min={dateNow}
                max="2032-06-06"
                onChange={(e) => setDate(e.target.value)} />
            <div className="addButton"><button type="button"
                onClick={() => addTodo()}>İş Ekle</button></div>
        </div>
        
    </form>
}

export default AddForm;