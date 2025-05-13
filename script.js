document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("add-btn");
  const searchBox = document.getElementById("search-box");
  const searchBtn = document.getElementById("search-btn");
  const notesList = document.getElementById("notes-list");
  const modalScreen = document.querySelector(".modal-window-screen");
  const closeBtn = document.querySelector(".close-btn");
  const modalHeaderTitle = document.querySelector("#modal-header-title");
  const noteBtnName = document.querySelector("#note-btn-name");
  const noteTitle = document.getElementById("note-title-input");
  const noteInput = document.getElementById("note-input");
  const addNoteBtn = document.getElementById("add-note-btn");

  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  notes.forEach((note) => {
    renderNote(note);
  });

  addBtn.addEventListener("click", () => {
    modalScreen.classList.remove("hidden");
  });

  closeBtn.addEventListener("click", () => {
    if (modalScreen.getAttribute("data-status") === "update") {
      // resettnig input values
      noteTitle.value = "";
      noteInput.value = "";

      // resetting modalHeaderTitle and noteBtnName
      noteBtnName.textContent = "Add";
      modalHeaderTitle.textContent = "Add";

      // resetting the modalScreen Attribute
      modalScreen.setAttribute("data-status", "");
    }
    // state is maintained in modal form
    modalScreen.classList.add("hidden");
  });

  // addNoteBtn Event Listener
  addNoteBtn.addEventListener("click", () => {
    let title = noteTitle.value.trim();
    let content = noteInput.value;
    if (title === "" && content === "") return;

    // Checks for the modalScreen data attribute to be update
    if (modalScreen.getAttribute("data-status") === "update") {
      let id = +modalScreen.getAttribute("data-id");
      let targetNoteData = notes.find((val) => val.id === id);

      targetNoteData.title = title;
      targetNoteData.content = content;

      renderNote();
      saveNoteToLocal();

      modalScreen.classList.add("hidden");

      // clearing the input fields
      noteTitle.value = "";
      noteInput.value = "";

      // resetting the modalHeaderTitle and noteBtnName
      modalHeaderTitle.textContent = "Add";
      noteBtnName.textContent = "Add";

      // resetting the modalScreen data attribute
      modalScreen.setAttribute("data-status", "");
    } else {
      // else, continues normal way
      let note = {
        id: Date.now(),
        title,
        content,
      };
      noteTitle.value = "";
      noteInput.value = "";
      notes.push(note);
      renderNote();
      saveNoteToLocal();
      modalScreen.classList.add("hidden");
    }
  });

  // notesList(action btns) event listener
  notesList.addEventListener("click", (e) => {
    if (e.target.id === "edit-note-btn") {
      console.log("clicked edit");
      e.stopPropagation();
      let noteData = notes.find(
        (val) => val.id === +e.target.getAttribute("data-id")
      );
      modalScreen.classList.remove("hidden");
      modalScreen.setAttribute("data-id", noteData.id);
      modalScreen.setAttribute("data-status", "update");
      noteTitle.value = noteData.title;
      noteInput.value = noteData.content;
      noteBtnName.textContent = "Save";
      modalHeaderTitle.textContent = "Edit";
    }
    if (e.target.id === "delete-note-btn") {
      e.stopPropagation();
      console.log("clicked delete");
      let noteId = +e.target.getAttribute("data-id");
      console.log(noteId);
      notes = notes.filter((item) => item.id !== noteId);
      console.log(notes);
      renderNote();
      saveNoteToLocal();
    }
  });

  // FIXED: renderNote() now needs no params and renders the DOM from data in notes (array)
  function renderNote() {
    notesList.innerHTML = ``;
    notes.forEach((item) => {
      const li = document.createElement("li");
      const divActionBtns = document.createElement("div");
      const editBtn = document.createElement("button");
      const deleteBtn = document.createElement("button");
      const h2 = document.createElement("h2");
      const p = document.createElement("p");

      divActionBtns.classList.add("action-btns");

      // editBtn
      editBtn.id = "edit-note-btn";
      editBtn.setAttribute("data-id", item.id);
      editBtn.textContent = "Edit";

      // deleteBtn
      deleteBtn.id = "delete-note-btn";
      deleteBtn.setAttribute("data-id", item.id);
      deleteBtn.textContent = "Delete";

      divActionBtns.append(editBtn, deleteBtn);

      h2.textContent = item.title;
      p.textContent = item.content;

      li.setAttribute("data-id", item.id);
      li.append(divActionBtns, h2, p);

      notesList.appendChild(li);
    });
  }

  function saveNoteToLocal() {
    localStorage.setItem("notes", JSON.stringify(notes));
  }
});

// TODO:
// -> Implementation of Search feature
// -> Need to be mobile friendly!
