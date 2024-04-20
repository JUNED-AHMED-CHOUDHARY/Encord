const mainLoginData = document.querySelector("#mainLoginData");
const mainRegisterData = document.querySelector("#mainRegisterData");
const emailVal = document.querySelector("#email");
const nameVal = document.querySelector("#name");
const passwordVal = document.querySelector("#pass");

mainRegisterData.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log("Register button clicked");

  try {
    const response = await axios.post("/api/v1/tasks/register", {
      name: nameVal.value,
      email: emailVal.value,
      password: passwordVal.value,
    });

    console.log(response.data);
  } catch (error) {
    console.error("Error in Register", error);
  }
});

mainLoginData.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Login button clicked");
});
