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

  addBtn.addEventListener("click", displayModal);

  function displayModal() {}
});
