import React, { useState } from "react";
import DoneIcon from "../img/done.png";
import MakeId from "../utils/MakeId";
import AddForm from "./AddForm";
import TodoItem from "./TodoItem";

function MainContext() {
    // Hooks
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState('');
    const [date, setDate] = useState('');
    const [filterDate, setFilterDate] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState(0);

    /**
     * Status:1 olarak yani Yapılacak İşler olarak AddForm fonksiyonundan 
     * gelen değerler ile değerleri React ın UseState kütüphanesinin
     * yardımı ile listemize ekliyoruz. Bu işlemi yaparken değerlerin
     * null olup olmadığını kontrol ediyoruz.
     **/
    const addTodo = () => {
        const newTodo = {
            id: MakeId(),
            status: 1,
            textContent: todo,
            deleted: 0,
            removed: 0,
            date: date
        }
        if (newTodo.textContent === '' || newTodo.textContent === null) {
            alert("Bir değer giriniz!");
            return;
        }
        if (newTodo.date === '' || newTodo.date === null) {
            alert("Tarih belirtiniz!");
            return;
        }
        setTodos([...todos, newTodo]);
        setTodo("");
        setDate("");
    }



    /**
     * todoNotFound fonksiyonu ile iş adetini alıyoruz.
     */
    const todoNotFound = () => todos.filter(todo => {
        if (todo.deleted === 0 && todo.removed === 0)
            return true;
        return false;
    }).length;

    /**
     *
     * @param _t
     * @param status
     *  prompt ile güncellenecek değer newValue değişkenine atanır.
     *  Tıklanan işin id değeri clickedTodo değişkenine atanır.
     *  Yeni girilen değerin null olması kontrol edilir.
     *  Tıklanan işin değeri güncellenir.
     */
    const editTodo = (_t, status) => {
        let newValue = prompt('Bugün ne yapacaksın ?'),
        clickedTodo = todos.find(todo => todo.id === _t.id);

        if (newValue === '' || newValue === null)
            return;

        setTodos([...todos, {
            id: MakeId(),
            status: status,
            textContent: newValue,
            date: clickedTodo.date,
            deleted: 0,
            removed: 0
        }])

        clickedTodo.deleted = 1;
    }

    /**
     *
     * @param todoID
     * Seçilen iş id değeri ile bulunur ve görünürlüğü kaldırılır.
     */
    const deleteTodo = (todoID) => {
        let clickedTodo = todos.find(todo => todo.id === todoID);

        setTodos([...todos]);

        clickedTodo.removed = 1;
        clickedTodo.deleted = 1;
    }

    /**
     *
     * @param _t
     * @param changeTo
     * Seçilen iş bulunur. 
     * Sonrasında seçilen işin yeni status değeri set edilir.
     */
    const changeStatus = (_t, changeTo) => {
        let clickedTodo = todos.find(todo => todo.id === _t.id);

        setTodos([...todos, { 
            id: MakeId(),
            status: changeTo,
            textContent: clickedTodo.textContent,
            date: clickedTodo.date,
            deleted: 0,
            removed: 0
        }]);

        clickedTodo.deleted = 1;
    }
    /**
     * handleFilterDate metotu bugün ve ileride seçilmiş tarih arasında bulunan gün
     * farkını hesaplıyor. AddDay parametresiyle kaç günlük filtreleme yapacağımızı 
     * belirtiyoruz.
     */
    const handleFilterDate = (addDay) => {
        setSelectedFilter(addDay);

        if (addDay === null) {
            setFilterDate(null);
            return;
        }

        const dateNow = new Date(Date.now());
        const d = new Date(dateNow.setDate(dateNow.getDate() + addDay));
        setFilterDate(d);
    }
    /**
     * Hangi filtre seçildiyse işler o filtreye
     * uygunluğuna göre gösterilir.
     */
    const filterApply = (todoDate) => {
        if (filterDate === null)
            return true;

        if(new Date(todoDate).toISOString().split("T")[0] === new Date(Date.now()).toISOString().split("T")[0])
        return true;


        return new Date(todoDate) <= filterDate && new Date(todoDate) >= new Date(Date.now());
    }
    


    return (
        <>
            <main className="main-container">

                <AddForm todo={todo} setTodo={setTodo} date={date} setDate={setDate} addTodo={addTodo} />

                {todos.length > 0 && todoNotFound() > 0 ? (
                    <>

                        <div className="filter-btns">
                            <button type="button" onClick={() => handleFilterDate(null)} className={selectedFilter === null ? 'active' : ''}>Tümü</button>
                            <button type="button" onClick={() => handleFilterDate(0)} className={selectedFilter === 0 ? 'active' : ''}>Bugün</button>
                            <button type="button" onClick={() => handleFilterDate(7)} className={selectedFilter === 7 ? 'active' : ''}>Bu Hafta</button>
                            <button type="button" onClick={() => handleFilterDate(30)} className={selectedFilter === 30 ? 'active' : ''}>Bu Ay</button>
                            <button type="button" onClick={() => handleFilterDate(365)} className={selectedFilter === 365 ? 'active' : ''}>Bu Yıl</button>
                        </div>
                        <div>

                        </div>
                        <div className="container">

                            <div className="to-do">

                                <h3 className="container-title">Yapılacak İşler</h3>
                                <ul>
                                    {todos.map((_todo, index) => _todo.status === 1 && _todo.deleted === 0 && _todo.removed === 0 && filterApply(_todo.date) ?
                                        <TodoItem key={index} _todo={_todo} editTodo={editTodo} deleteTodo={deleteTodo} changeStatus={changeStatus} /> : '')}
                                </ul>
                            </div>
                            <div className="doings">
                                <h3 className="container-title">Yapılan İşler</h3>
                                <ul>
                                    {todos.map((_todo, index) => _todo.status === 2 && _todo.deleted === 0 && _todo.removed === 0 && filterApply(_todo.date) ?
                                        <TodoItem key={index} _todo={_todo} editTodo={editTodo} deleteTodo={deleteTodo} changeStatus={changeStatus} /> : '')}
                                </ul>
                            </div>
                            <div className="done-s">
                                <h3 className="container-title">Tamamlanan İşler</h3>
                                <ul>
                                    {todos.map((_todo, index) => _todo.status === 3 && _todo.deleted === 0 && _todo.removed === 0 && filterApply(_todo.date) ?
                                        <TodoItem key={index} _todo={_todo} editTodo={editTodo} deleteTodo={deleteTodo} changeStatus={changeStatus} /> : '')}
                                </ul>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="no-task">
                        Yapılacak iş yok <img src={DoneIcon} width="40" height="40" alt="" />
                    </div>
                )}
            </main>
        </>
    );
}


export default MainContext;