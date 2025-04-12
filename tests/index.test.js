const { default: axios } = require("axios");

function sum(a, b) {
  return a + b;
}

const BACKEND_URL = "https://localhost:3000"; //Hard-coded backend URL.

//TEST CASES FOR AUTHENTICATION
describe("Authentication", () => {
  test("User is able to sign in only once", async () => {
    const user = "utkarsh-" + Math.random(); //utkarsh.0125125
    const password = "123456";
    const type = "admin";

    //send HTTP request to the server
    const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      //body to send
      username,
      password,
      type,
    });

    expect(response.statusCode).toBe(200); //ensure the signup request succeeded.

    //send again and the server should reject since user already exists.
    const updatedResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      //body to send
      username,
      password,
      type,
    });

    expect(updatedResponse.statusCode).toBe(400);
  });

  test("Signup request fails if the username is empty", async () => {
    const username = "utkarsh" + Math.random;
    const password = "123456";

    axios.post(`${BACKEND_URL}/api/v1/signup`, {
      //not passing username
      password,
    });

    expect(response.statusCode).toBe(400);
  });

  test("Signin succeeds if the username and password are correct", async () => {
    const username = "utkarsh-" + Math.random();
    const password = "123456";

    await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
    });
    const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username,
      password,
    });

    expect(response.statusCode).toBe(200); //the user was signed in successfully

    expect(response.body.token).toBeDefined();
  });

  test("Signin fails if the username and password are incorrect", async () => {
    const username = "utkarsh-" + Math.random();
    const password = "123456";

    //Sign up the user
    await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
    });

    const response = await axios.post(`${BACKEND_URL}/v1/api/signin`, {
      username: "xyz", //pass in the wrong username
      password,
    });

    expect(response.statusCode).toBe(403); //403 FORBIDDEN
  });
});

//TEST CASES FOR USER INFORMATION ENDPOINTS
describe("User information endpoints", () => {
  let token = "";
  let avatarId = "";

  //Signup and Signin once
  //and then keep reusing the token

  //for that we can use the beforeAll function
  beforeAll(async () => {
    //it lets you run some logic before other test cases run
    //but only once in this case
    //if we had to run everytime we would've used beforeEach();

    console.log("beforeAll() was called.");
    const username = `utkarsh-${Math.random}`;
    const password = "123456";

    //SIGNUP
    await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      type: "admin",
    });
    //THEN SIGNIN
    await axios.post(`${BACKEND_URL}/v1/api/signin`, {
      username,
      password,
    });

    token = response.data.token;

    //since we are logged in admin
    //we can add avatars

    const avatarResponse = await axios.post(`${BACKEND_URL}/api/v1/avatar`, {
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
      name: "Timmy",
    });
    avatarId = avatarResponse.data.avatarId;
  });

  // use the token received from the signin and use it for further testcases
  // meaning the authorization header: Authorization Bearer
  test("Users cannot update their metadata with a wrong avatarId", async () => {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/user/metadata`,
      {
        avatarId: "123123213", //some random ID that does not exist on the server
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    expect(response.statusCode).toBe(400);
  });
  test("Users can update their metadata with correct avatarId", async () => {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/user/metadata`,
      {
        avatarId, //this time pass the correct avatarId
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    expect(response.statusCode).toBe(200);
  });


  test("User is not able to update their metadata if the auth header is not present", async() => {
    const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/metadata`,
        {
          avatarId, //this time pass the correct avatarId
        },
      );
      expect(response.statusCode).toBe(403);//403 FORBIDDEN since user did not send their authorization headers.
  });
});
