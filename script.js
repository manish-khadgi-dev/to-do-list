// get form data in form submit
// store that data in a global array
// create a display function to display all the data from array to our entry list
let taskList = [];
let badList = [];

const hrPerWeek = 24*7;

const handleOnSubmit = (e) => {
    const frmData =new  FormData(e);
    const task =frmData.get("task");
    const hr = +frmData.get("hr");
    console.log(task,hr);

    const obj ={
        task,
        hr,
    };

    const totalAllocatedHrs = totalTaskHours() + totalBadTaskHours();
    if (totalAllocatedHrs +hr > hrPerWeek) {
         return alert (
            "Sorry la try next time"
        );
    }

    taskList.push(obj);
    console.log(taskList);

    displayTasks();
    totalTaskHours();
};


const displayTasks = () => {
    let str ="";

  taskList.map((item, i)=>{
    console.log(item, i);
    str += ` <tr>
    <td>${i +1}</td>
    <td>${item.task}</td>
    <td>${item.hr}</td>
    <td class="text-end">
        <button onclick ="deleteTask(${i})" class = "btn btn-danger">  
            <i class="fa-solid fa-trash"></i>           
        </button>
        <button onclick="markAsNotToDo(${i})" class = "btn btn-success">      
            <i class="fa-solid fa-arrow-right"></i>      
        </button>
    </td>
  </tr>`;

  });

  document.getElementById('task-list').innerHTML = str;
};

const displayBadTask = () => {
    let str = "";
    badList.map((item, i) => {
        str += `<tr>
        <td>${i + 1}</td>
        <td>${item.task}</td>
        <td>${item.hr}</td>
        <td class="text-end">
            <button onclick ="markAsToDo(${i})" class = "btn btn-warning"> 
                <i class="fa-solid fa-arrow-left"></i> 
                        
            </button>
            <button onclick="deleteBadTask(${i})" class = "btn btn-success">      
                <i class="fa-solid fa-trash"></i>        
            </button>
        </td>
        </tr>`
    });

    document.getElementById("bad-task").innerHTML = str;
    totalBadTaskHours();
  };



const totalTaskHours = () => {
    const total = taskList.reduce((s, i)=> s + i.hr,0);
console.log(total);
document.getElementById("totalHrs").innerText = total + totalBadTaskHours();
return total;
}

const totalBadTaskHours = () => {
    const total = badList.reduce((s, i)=> s + i.hr,0);
console.log(total);
document.getElementById("totalBadHr").innerText = total;
return total;

}

const deleteTask = (i)=>{
    if(!window.confirm("Are you sure you want to delete")) {
        return;
    }

    taskList = taskList.filter((item, index)=>index !==i)

    displayTasks();
    totalTaskHours();
}

const deleteBadTask = (i)=>{
    if(!window.confirm("Are you sure you want to delete")) {
        return;
    }

    badList = badList.filter((item, index)=>index !==i)

    displayBadTask();
    totalBadTaskHours();
    totalTaskHours();

}


const markAsNotToDo = (i) => {
    const itm = taskList.splice(i, 1);
    badList.push (itm[0]);
    displayTasks();
    displayBadTask();
}

const markAsToDo = (i) => {
    const itm = badList.splice(i, 1);
    taskList.push (itm[0]);
    displayTasks();
    displayBadTask();
}