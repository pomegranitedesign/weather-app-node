// console.log("Client side javascript file");

// fetch("http://puzzle.mead.io/puzzle").then(response => {
//   response.json().then(data => {
//     console.log(data);
//   });
// });

// weather fetch
// fetch("http://localhost:3000/weather?address=boston").then(response => {
//   response.json().then(data => {
//     if (data.error) {
//       console.log(data.error);
//     } else {
//       console.log(data.location);
//       console.log(data.forecast);
//     }
//   });
// });

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
  fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
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
