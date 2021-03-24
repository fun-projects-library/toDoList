
// ---- !!! --- CRUD - Create Read Update Delete



async function addItem () {
    
    const value = document.getElementById('todo_input').value;
    
    if(value) {
    
    const item = {title: document.getElementById('todo_input').value}
    
      const data = {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          'Content-type': 'application/json'
        }
      }
    
      const response = await fetch('http://127.0.0.1:8080/api/todoitems/', data);
      const jsonResponse = await response.json();
      //console.log(jsonResponse);
      listItem([jsonResponse]);
    }

}

async function getItems () {
    const response = await fetch('http://127.0.0.1:8080/api/todoitems/');
    const jsonResponse = await response.json();
    listItem(jsonResponse)
}

function listItem (todoItems) {
    const ulList = document.getElementById('todo_list');
    //console.log(todoItems);

    todoItems.forEach((item) => {
        // console.log(item.title)
        // ulList.innerHTML += `<li onclick="removeItem(this)"> ${item.title} </li>`
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <input type="checkbox" class="mark-as-completed" ${item.completed && 'checked'}>  
          <input type="text" class="todo-item-input" value="${item.title}">
          <a class="edit-item" href="">Edit</a>
          <span class="remove-item">Delete</span>
          <span class="date">updatedAt ${item.updatedAt}</span>
        `;
        listItem.id = item.id;
        
        listItem.querySelector('.remove-item').addEventListener('click', removeItem);

        listItem.querySelector('.mark-as-completed').addEventListener('click', completeItem);

        listItem.querySelector('.todo-item-input').addEventListener('focusout', editItem);

        listItem.querySelector('.edit-item').addEventListener('click', chooseInput);

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
    
    await fetch('http://127.0.0.1:8080/api/todoitems/' + e.target.parentElement.id, data);
    //await response.json();
    e.target.parentElement.remove();
  
}

async function completeItem(e){
  //console.log(e.target.parentElement.id);
  console.log(e);
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

async function editItem(e){
  console.log(e);


  const item = {
    title:  e.target.value
  }

  const data = {
    method: 'PUT',
    body: JSON.stringify(item),
    headers: {
      'Content-type': 'application/json'
    }
  }

  await fetch('http://127.0.0.1:8080/api/todoitems/'+ e.target.parentElement.id, data);

  // const jsonResponse = await response.json();
  // listItem([jsonResponse]);

  
}

async function chooseInput(e){
  //console.log(e.target.previousElementSibling);
  const path = e.target.parentElement.id;
  console.log(path);
  const result = e.target.parentElement.id + `87`;
  e.target.previousElementSibling.id = result;
  e.target.href = `#${result}`;
  //console.log(e.target.href)
  
}
getItems();





