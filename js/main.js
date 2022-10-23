const Main = {
  
  init: function () {
    this.cacheSelectors();
    this.bindEvents();
    
    // console.log(this.tarefasObj)
    
  },
  cacheSelectors: function () {
    this.$checkButtons = document.querySelectorAll(".check");
    this.$inputTask = document.querySelector("#inputTask");
    this.$list = document.querySelector(".list");
    this.$removeButtons = document.querySelectorAll(".remove");
  },
  bindEvents: function () {
    const teste = this;
    this.$checkButtons.forEach((item) => {

      item.addEventListener('click', this.Events.checkButton_click);

    });
    this.$inputTask.addEventListener('keypress', this.Events.inputEnter.bind(teste));
    this.$removeButtons.forEach((item) => {
      item.addEventListener('click', this.Events.deleteTask);
    })
  },
  
  getStoraged:()=>{
    
    const newTarefas = JSON.parse(localStorage.getItem("tarefas"))
    if(newTarefas){
      Main.tasks = newTarefas;
    }
    console.log("tarefas",Main.tasks)
  },
  tasks:[],
  buildTasks:()=>{
    Main.tasks.forEach((item)=>{
      let classe;
      if(item.done){
        classe = 'class="done"';
      }
      else{
        classe = 'class=""';
      }
      document.querySelector(".list").innerHTML += `<li ${classe}>
      <div class="check"></div>
      <label class="task">
        ${item.tarefa}
      </label>
      <button class="remove"></button>
    </li>`
    })
    
  },

  Events: {
    checkButton_click: (event) => {
      const li = event.currentTarget.parentElement;
      const task = li.querySelector(".task");

      Main.tasks.forEach((item)=>{
        if(item.tarefa === task.innerText){
          if(li.classList.contains("done")){
            item.done = false;
          }
          else{
            item.done = true;
          }
        }
      });
      localStorage.setItem('tarefas', JSON.stringify(Main.tasks));
      console.log(Main.tasks);

      if(li.classList.contains("done")){
        li.classList.remove("done");
      }
      else{
        li.classList.add("done");
      }
      
      
    },
    inputEnter: (event) => {

      if (event.key === "Enter" && event.currentTarget.value != "") {
        // console.log(event.currentTarget);
        const valor = event.currentTarget.value

        Main.tasks.push( {tarefa: valor,done:false});
        localStorage.setItem('tarefas', JSON.stringify(Main.tasks));

        event.currentTarget.value = "";
        Main.$list.innerHTML += `<li>
        <div class="check"></div>
        <label class="task">
          ${valor}
        </label>
        <button class="remove"></button>
      </li>`
        Main.init();
      }
    },
    deleteTask: (event) => {
      const li = event.currentTarget.parentElement;
      const task = li.querySelector(".task");
      Main.tasks.forEach((item,index,array)=>{
      if(item.tarefa === task.innerText){
        array.splice(index,1);
        console.log("deletado",item)
      }
      });
      // const newArray = Main.tasks.filter((item)=>{
      //   return item.tarefa !== task.innerText
      // })
      localStorage.setItem('tarefas', JSON.stringify(Main.tasks));
      
      li.classList.add("removed");
      setTimeout(() => {
        li.classList.add("hidden");
        li.remove();
      }, 300);
     

    }
  }
}

Main.getStoraged();
Main.buildTasks();
Main.init();


