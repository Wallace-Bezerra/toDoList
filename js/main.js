const Main = {
  init: function () {
    this.cacheSelectors();
    this.bindEvents();
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
  Events: {
    checkButton_click: (event) => {
      event.currentTarget.parentElement.classList.toggle("done");
      // event.currentTarget.classList.add("teste");
    },
    inputEnter: (event) => {

      if (event.key === "Enter" && event.currentTarget.value != "") {
        console.log(event.currentTarget);
        const valor = event.currentTarget.value
        event.currentTarget.value = "";
        // const newTask = Main.$checkButtons[0].parentElement.cloneNode(true);
        // newTask.querySelector(".task").innerText = valor;
        // Main.$list.appendChild(newTask);
        // console.log(this);
        Main.$list.innerHTML += `<li>
        <div class="check"></div>
        <label class="task">
          ${valor}
        </label>
        <button class="remove"></button>
      </li>`
        Main.init();
        // console.log(newTask);
      }
    },
    deleteTask: (event) => {
      const li = event.currentTarget.parentElement;
      li.classList.add("removed");

      // event.currentTarget.parentElement.remove();
      setTimeout(() => {
        li.classList.add("hidden");
      }, 300);

      // event.currentTarget.parentElement.remove();
    }
  }
}
Main.init();
