document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("add-btn");
  const searchBox = document.getElementById("search-box");
  const searchBtn = document.getElementById("search-btn");
  const notesList = document.getElementById("notes-list");
  const modalScreen = document.querySelector(".modal-window-screen");
  const closeBtn = document.querySelector(".close-btn");
  const noteTitle = document.getElementById("note-title-input");
  const noteInput = document.getElementById("note-input");
  const addNoteBtn = document.getElementById("add-note-btn");

  let notes = [];

  addBtn.addEventListener("click", () => {
    modalScreen.classList.remove("hidden");
  });
  closeBtn.addEventListener("click", () => {
    modalScreen.classList.add("hidden");
  });

  addNoteBtn.addEventListener("click", () => {
    let title = noteTitle.value.trim();
    let content = noteInput.value;
    if (title === "" && content === "") return;
    let note = {
      id: Date.now(),
      title,
      content,
    };
    notes.push(note);
    renderNote(note);
    saveNoteToLocal();
  });

  function renderNote(noteObj) {
    const li = document.createElement("li");
    const div = document.createElement("div");
    const h2 = document.createElement("h2");
    const p = document.createElement("p");

    div.classList.add("close-btn");

    li.setAttribute("data-id", noteObj.id);
    h2.textContent = noteObj.title;
    p.textContent = noteObj.content;
    div.innerHTML = "&times;";

    li.append(div, h2, p);

    notesList.appendChild(li);

    modalScreen.classList.add("hidden");
  }
});
