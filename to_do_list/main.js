
const addButton = document.getElementById('addButton');
let addInput = document.getElementById('itemInput');
const todoList = document.getElementById('todoList');
let listArray = [];

function listItemObj(content, status) {
    this.content = '';
    this.status = 'incomplete';
}
const changeToComp = function(){
    const parent = this.parentElement;
    parent.className = 'uncompleted well';
    this.innerText = 'Incomplete';
    this.removeEventListener('click',changeToComp);
    this.addEventListener('click',changeToInComp);
    changeListArray(parent.firstChild.innerText,'complete');

}

const changeToInComp = function(){
    const parent = this.parentElement;
    parent.className = 'completed well';
    this.innerText = 'Complete';
    this.removeEventListener('click',changeToInComp);
    this.addEventListener('click',changeToComp);

    changeListArray(parent.firstChild.innerText,'incomplete');

}

const removeItem = function(){
    const parent = this.parentElement.parentElement;
    parent.removeChild(this.parentElement);

    const data = this.parentElement.firstChild.innerText;
    for(let i=0; i < listArray.length; i++){

        if(listArray[i].content == data){
            listArray.splice(i,1);
            refreshLocal();
            break;
        }
    }


}

const changeListArray = function(data,status){

    for(let i=0; i < listArray.length; i++){

        if(listArray[i].content == data){
            listArray[i].status = status;
            refreshLocal();
            break;
        }
    }
}

const createItemDom = function(text,status){

    const listItem = document.createElement('li');

    const itemLabel = document.createElement('label');

    const itemCompBtn = document.createElement('button');

    const itemIncompBtn = document.createElement('button');

    listItem.className = (status == 'incomplete')?'completed well':'uncompleted well';

    itemLabel.innerText = text;
    itemCompBtn.className = 'btn btn-success';
    itemCompBtn.innerText = (status == 'incomplete')?'Complete':'Incomplete';
    if(status == 'incomplete'){
        itemCompBtn.addEventListener('click',changeToComp);
    }else{
        itemCompBtn.addEventListener('click',changeToInComp);
    }


    itemIncompBtn.className = 'btn btn-danger';
    itemIncompBtn.innerText = 'Delete';
    itemIncompBtn.addEventListener('click',removeItem);

    listItem.appendChild(itemLabel);
    listItem.appendChild(itemCompBtn);
    listItem.appendChild(itemIncompBtn);

    return listItem;
}

const refreshLocal = function(){
    const todos = listArray;
    localStorage.removeItem('todoList');
    localStorage.setItem('todoList', JSON.stringify(todos));
}

const addToList = function(){
    const newItem = new listItemObj();
    newItem.content = addInput.value;
    listArray.push(newItem);
    refreshLocal();
    const item = createItemDom(addInput.value,'incomplete');
    todoList.appendChild(item);
    addInput.value = '';
}

const clearList = function(){
    listArray = [];
    localStorage.removeItem('todoList');
    todoList.innerHTML = '';

}

window.onload = function(){
    const list = localStorage.getItem('todoList');

    if (list != null) {
        todos = JSON.parse(list);
        listArray = todos;

        for(let i=0; i<listArray.length;i++){
            const data = listArray[i].content;

            const item = createItemDom(data,listArray[i].status);
            todoList.appendChild(item);
        }

    }

};
addButton.addEventListener('click',addToList);
clearButton.addEventListener('click',clearList);
