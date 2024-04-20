const mainLoginData = document.querySelector("#mainLoginData");
const mainRegisterData = document.querySelector("#mainRegisterData");
const emailVal = document.querySelector("#email");
const nameVal = document.querySelector("#name");
const passwordVal = document.querySelector("#pass");

mainRegisterData.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log("bhai bhai");
  try {
    const response = await fetch(`/api/v1/tasks/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameVal,
        email: emailVal,
        password: passwordVal,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);
  } catch (e) {
    console.log("Something in Register", e);
  }
});
mainLoginData.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("bhaiasefef bhai");
});
