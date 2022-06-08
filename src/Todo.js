import './App.css';
import Header from './components/Header';
import MainContext from './components/MainContext';

function Todo() {
    return (
      <>
          <Header title={"Todo App"} />
          <MainContext />
      </>
    );
}

export default Todo;