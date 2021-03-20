
// ---- !!! --- CRUD - Create Read Update Delete




async function addItem () {

    const item = {
        title:  document.getElementById('todo_input').value
      }
    
      const data = {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          'Content-type': 'application/json'
        }
      }
    
      const response = await fetch('http://127.0.0.1:8080/api/todoitems/', data);
      const jsonResponse = await response.json();
      listItem([jsonResponse]);


}


async function getItems () {
    const response = await fetch('http://127.0.0.1:8080/api/todoitems/');
    const jsonResponse = await response.json();
    listItem(jsonResponse)
}

function listItem (todoItems) {
    const ulList = document.getElementById('todo_list');

    todoItems.forEach((item) => {
        // console.log(item.title)
        // ulList.innerHTML += `<li onclick="removeItem(this)"> ${item.title} </li>`
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <input type="checkbox" class="mark-as-completed" ${item.completed && 'checked'}>  
          <input type="text" class="todo-item-input" value="${item.title}">
          <span class="remove-item">Delete</span>
        `;
        listItem.id = item.id;
        
        listItem.querySelector('.remove-item').addEventListener('click', removeItem);
        listItem.querySelector('.mark-as-completed').addEventListener('click', completeItem);
        listItem.querySelector('.todo-item-input').style.textDecoration = item.completed && 'line-through';
        // listItem.addEventListener('click', removeItem);
        ulList.appendChild(listItem);
      });
}


async function removeItem(e) {
    
    // const xhr = new XMLHttpRequest();
    // const url = 'https://jsonplaceholder.typicode.com/todos/' + e.target.id;
    // xhr.responseType = 'json';
    // xhr.onreadystatechange = () => {
    //     if (xhr.readyState === XMLHttpRequest.DONE){
    //         e.target.remove();
    //     }
    // }
    // xhr.open('DELETE', url);
    // xhr.send();

    const data = {
        method: 'DELETE',
    }
    
    const response = await fetch('http://127.0.0.1:8080/api/todoitems/' + e.target.parentElement.id, data);
    await response.json();
    e.target.parentElement.remove();
  
}


async function completeItem(e){
  // console.log(e.target.parentElement.id);
  // console.log(e.target.checked);
  const item = {
    completed:  e.target.checked
  }

  const data = {
    method: 'PUT',
    body: JSON.stringify(item),
    headers: {
      'Content-type': 'application/json'
    }
  }

  await fetch('http://127.0.0.1:8080/api/todoitems/'+ e.target.parentElement.id, data);
  //const jsonResponse = await response.json();
  //listItem([jsonResponse]);

  e.target.parentElement.querySelector('.todo-item-input').style.textDecoration = e.target.checked ? 'line-through' : 'none';

}

getItems();











// --- toDoList with LocalStorage ---


// let itemList = [];


// function removeItem (item) {
//     const filteredArray = itemList.filter( element => element !== item.target.innerHTML);
//     localStorage.setItem("todoItems" , filteredArray)
//     console.log(filteredArray)
//     //document.location.reload(true)
//     //document.getElementById("todo_list").innerHTML = "";
//     print()
// }

// // itemList.forEach( element => {
// //     let item = document.createElement("li");
// //     item.innerHTML =element;
// //     item.addEventListener("click", removeItem)
// //     document.getElementById("todo_list").appendChild(item);
// // })

// function print(){
//     itemList = localStorage.getItem("todoItems") ? localStorage.getItem("todoItems").split(",") : [];
//     document.getElementById("todo_list").innerHTML = "";
    
//     for(i=0; i<itemList.length; i++){
//         let item = document.createElement("li");
//         item.innerHTML =itemList[i];
//         item.addEventListener("click", removeItem)
//         document.getElementById("todo_list").appendChild(item);
//     }
// }

// print()

// // --- Keyboard Event
// const keyboard = document.getElementById("todo_input");

// keyboard.addEventListener("keyup" , (event) => {
//     const keyName = event.key;
//     if(keyName === "Enter"){ addItem() }
// }, false)


// const addItem = () => {
//     let inputValue = document.getElementById("todo_input").value;
    
//     if(inputValue){
//         let item = document.createElement("li");
//         item.innerHTML =inputValue;
//         // item.onclick = () => {
//         //     //document.getElementById("todo_list").removeChild(item)
//         //     removeItem(item)  // you can use them both. we are creating a newfunc here.   
//         // };
        
//         document.getElementById("todo_list").appendChild(item);

//         itemList.push(document.getElementById("todo_input").value)
        
//         localStorage.setItem("todoItems" , itemList)

//         document.getElementById("todo_input").value = "";
//     } else {
//         alert("Enter an item!")
//     }
// }




