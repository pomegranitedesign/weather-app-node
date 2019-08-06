const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", event => {
  event.preventDefault();

  const location = search.value; // pull the value out of the search form

  // print the loading message
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  // fetch the weather
  fetch(`/weather?address=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = `${data.forecast}`;
        messageTwo.textContent = `${data.location}`;
        search.value = "";
      }
    });
  });
});
