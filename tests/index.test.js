const { default: axios } = require("axios");

function sum(a, b) {
  return a + b;
}

const BACKEND_URL = "https://localhost:3000"; //Hard-coded backend URL. Write this later in express or something 
//or create a new application from scratch

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

describe("Get User avatar information", () => {
  
  let avatarId;
  let token;
  let userId;

  beforeAll(async () => {
    //it lets you run some logic before other test cases run
    //but only once in this case
    //if we had to run everytime we would've used beforeEach();

    console.log("beforeAll() was called.");
    const username = `utkarsh-${Math.random}`;
    const password = "123456";

    //SIGNUP
    const signupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      type: "admin",
    });

    userId = signupResponse.data.userId
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


  test("Get back avatar information for a user", async() => {
    const response = axios.get(`${BACKEND_URL}/api/v1/user/metadata/bulk?id=[${userId}]`);

    expect(response.data.avatars.length).toBe(1);
    expect(response.data.avatars[0].userId).toBeDefined();
    expect(response.data.avatars[0].userId).toBe(userId);

  })

  test("Available avatars lists the recently created avatar", async() => {
    const response = axios.post(`${BACKEND_URL}/api/v1/avatars`);
    
    expect(response.data.avatars.length).not.toBe(0);

    const currentAvatar = response.data.avatars.find(x = x.id == avatarId);

    expect(currentAvatar).toBeDefined();
  })
})

describe("Space information", () => {
  
  let mapId;
  let element1Id;
  let element2Id;
  let adminToken;
  let userToken;
  let adminId;
  let userId;

  beforeAll(async () => {
    //Sign up then sign-in the user
    //Authentication is needed for us to access spaces
    console.log("beforeAll() was called.");
    const username = `utkarsh-${Math.random}`;
    const password = "123456";

    //SIGNUP
    const signupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      type: "admin",
    });

    adminId = signupResponse.data.userId
    //THEN SIGNIN
    const response = await axios.post(`${BACKEND_URL}/v1/api/signin`, {
      username,
      password,
    });


    adminToken = response.data.token; //CACHE THE TOKEN
    const suserSignupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      type: "admin",
    });

    userId = signupResponse.data.userId
    //THEN SIGNIN
    const userSigninResponse= await axios.post(`${BACKEND_URL}/v1/api/signin`, {
      username,
      password,
    });


    userToken = userSigninResponse.data.token; //CACHE THE TOKEN

    const element1 = axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
      "imageUrl":"https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
      "width": 1,
      "height": 1,
      "static": true,
    }, {
      headers: {
        authorization: `Bearer ${adminToken}`
      }
    })
    const element2 = axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
      "imageUrl":"https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
      "width": 1,
      "height": 1,
      "static": true,
    }, {
      headers: {
        authorization: `Bearer ${adminToken}`
      }
    })

    element1Id = element1.id; //return the id of the element.
    element2Id = element2.id; //return the id of the element.

    const map = await axios.post(`${BACKEND_URL}/api/v1/admin/map`, {
      "thumbnail": "https://thumbnail.com/a.png",
      "dimensions": "100x200",
      "name": "100 person interview room",
      "defaultElements": [{
          elementId: element1Id,
          x: 20,
          y: 20
        }, {
          elementId: element1Id,
          x: 18,
          y: 20
        }, {
          elementId: element2Id,
          x: 19,
          y: 20
        }, {
          elementId: element2Id,
          x: 19,
          y: 20
        }
      ]
   } , {
    headers: {
      authorization: `Bearer ${adminToken}`
    }
   })

   mapId = map.id; //get the mapId
  })

  test("User is able to create a space", async() => {
    const response = await axios.post(`${BACKEND_URL}/api/v1/space`, {
      "name": "Test",
      "dimensions": "100x200",
      "mapId": mapId
    }, {
      headers: {
        authorization: `Bearer ${userToken}`
      }
    })

    expect(response.spaceId).toBeDefined()
  })
  test("User is able to create a space without mapId (empty space)", async() => {
    const response = await axios.post(`${BACKEND_URL}/api/v1/space`, {
      "name": "Test",
      "dimensions": "100x200"
      //NO MAPID
    }, {
      headers: {
        authorization: `Bearer ${userToken}`
      }
    })

    expect(response.spaceId).toBeDefined()
  })

  test("User is able to create a space without mapId and dimensions", async() => {

    const response = await axios.post(`${BACKEND_URL}/api/v1/space`, {
      "name":"Test",
      //NOT PASSING DIMENsIONS
      //NOT PASSING MAPID
    }, {
      headers: {
        authorization: `Bearer ${userToken}`
      }
    })

    //user should not be able to create a map w/o mapId and dimensions
    expect(response.statusCode).toBe(400)
  })

  test("User is nto able to delete a space that doesn't exists", async() => {
    const response = await axios.delete(`${BACKEND_URL}/api/v1/space/randomIdDoesntExist`, {
      headers: {
        authorization: `Bearer ${userToken}`
      }
    });
    //user should not be able to delete w/o mapId and dimensions
    expect(response.statusCode).toBe(400);
  }, {
    headers: {
      authorization: `Bearer ${userToken}`
    }
  })

  test("User is able to delete a space that does exist", async() => {

    const response = await axios.post(`${BACKEND_URL}/api/v1/space`, {
      "name": "Test",
      "dimensions": "100x200",

    }, {
      headers: {
        authorization: `Bearer ${userToken}`
      }
    })

    //the user should be able to delete the space since it exists.
    const deleteResponse = await axios.delete(`${BACKEND_URL}/api/v1/space/${response.data.spaceId}`, {
      headers: {
        authorization: `Bearer ${userToken}`
      }
    });

    expect(deleteResponse.statusCode).toBe(200);
  })

  test("User should not be able to delete a space created by another user", async () => {
    const response = await axios.post(`${BACKEND_URL}/api/v1/space`, {
      "name": "Test",
      "dimensions": "100x200",

    }, {
      headers: {
        authorization: `Bearer ${userToken}`
      }
    })

    //the user should be able to delete the space since it exists.
    const deleteResponse = await axios.delete(`${BACKEND_URL}/api/v1/space/${response.data.spaceId}`, {
      headers: {
        authorization: `Bearer ${adminToken}`
      }
    });

    expect(deleteResponse.statusCode).toBe(400); //should be 403 technically but change later
  })

  test("Admin has no spaces initially", async () => {
    const response = await axios.get(`${BACKEND_URL}/api/v1/space/all`);
    expect(response.data.spaces.length).toBe(0);
  })

  test("Admin has 1 space initially", async() => {

    const spaceCreateResponse = await axios.post(`${BACKEND_URL}/api/v1/space`, {
      "name":"Test",
      "dimensions": "100x200",

    }, {
      header: {
        authorization: `Bearer ${userToken}`
      }
    })
    const response = await axios.get(`${BACKEND_URL}/api/v1/space/all`);
    const filteredSpace = response.data.spaces.find(x => x.id == spaceCreateResponse.spaceId)
    expect(response.data.spaces.length).toBe(1);
    expect(filteredSpace).toBeDefined()
    expect(filteredSpace.id).toBeDefined()
  })
})