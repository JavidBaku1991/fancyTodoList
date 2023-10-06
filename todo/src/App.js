
import { useState,useEffect } from "react";
import './App.css';




function App() {

  const [newItem,setNewItem]=useState('');
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []

    return JSON.parse(localValue)
   

  })


  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))

  }, [todos])
 
function submit(e){
  e.preventDefault();

setTodos((currenTodos)=>{
  return [...currenTodos,{ id:crypto.randomUUID(),title:newItem,completed:false},]

})
setNewItem('')


}

function deleteTodo(id){
  setTodos(currentTodos=>{
    return currentTodos.filter(todo=>todo.id!==id)
  })
}
const isSubmittable = () => (newItem ? true : false);





  return  (
  <section >
  
      <form onSubmit={submit}>
  <label htmlFor="isler" className="text" id="form-label" onSubmit={submit}>İşlər</label>
      <input
         type='text'
         value={newItem}
         onChange={(e)=>setNewItem(e.target.value)}
         id='item'
         className="input"
         maxlength='20'
      />

      <p id="isler" className="text" muted  style={{ textAlign:'center'}}>
       Planlaşdırılan işlərinizi qeyd edin.
       Maimum 20 herf.
      </p>
            <button disabled={!isSubmittable()} type='submit' id="button-24" >Elave et</button>

</form>
 



       <h3 id="demoFont">Görülməli işlərim</h3>
    <ul className="ul">
      {todos.length===0 &&<p>Bekarçılıq</p>}
      {todos.map(todo=>{
  return <div id="item-div">           
              <input type="checkbox" id='checkbox'></input>

                <li key={todo.id} id="li" >
        <label id='label'> {todo.title}</label>
      </li>
              <button id='todo-button' onClick={()=>deleteTodo(todo.id)}>Sil</button>
 
        </div>
 
      })}
        
    </ul>
  </section>
 )
  
}

export default App;

