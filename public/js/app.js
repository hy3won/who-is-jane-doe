const form = document.querySelector("#form");
const formInput = document.querySelector("#form input");

function onForm() {
  const name = formInput.value;
  console.log(name);
  localStorage.setItem("username", name); 
}

form.addEventListener("submit", onForm);

