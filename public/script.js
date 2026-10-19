function addTask() {

    let task = document.getElementById("taskInput").value;

    if (task === "") {
        return;
    }

    let li = document.createElement("li");

    li.innerHTML = task;

    document.getElementById("taskList").appendChild(li);

    document.getElementById("taskInput").value = "";
}
