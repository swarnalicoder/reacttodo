import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [setshowFinished, setsetshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {

      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }

  }, [])


  const saveToLs = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setsetshowFinished(!setshowFinished)
  }
  

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLs()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLs()

  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLs()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    console.log(newTodos, todos)
    saveToLs()
  }


  return (
    <>
      <Navbar />
      <div className="container  bg-violet-300 min-h-[80vh] w-1/2 mx-auto my-5 rounded-xl p-2">
       <h1 className="font-extrabold  text-xl italic text-center mx-auto rounded-xl w-1/2 border px-2 py-1 border-violet-50 ">Manage your todos..</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-lg my-3 font-bold'>Add a Todo</h2>
          <div className="flex-col flex ">
            <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />

            <button onClick={handleAdd} disabled={todo.length<1} className='rounded-full disabled:bg-violet-800 py-1 bg-violet-800 text-white w-full my-1 hover:bg-violet-950 '>Add</button>
          </div>
        </div>
        <input onChange={toggleFinished}  type="checkbox" checked={setshowFinished} name="" id="" /> Show finished
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item => {



            return ( setshowFinished || !item.isCompleted) && <div key={item.id} className="todo flex  my-3 gap-5 justify">
              <div className="flex gap-3 ">
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={todo.isCompleted} />

                <div className={`w-52 m-1 my-2 px-2 break-words  ${item.isCompleted ? "line-through" : ""}`}>{item.todo}</div>
                </div>

                <div className="buttons flex h-full">
                  <button onClick={(e) => { handleEdit(e, item.id) }} className='rounded-lg bg-violet-800 text-white my-2 p-3 py-0 hover:bg-violet-950 mx-1'>Edit</button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='rounded-lg bg-violet-800 text-white my-2 p-3 py-0 hover:bg-violet-950 mx-1'>Delete</button>

                </div>

             

            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
