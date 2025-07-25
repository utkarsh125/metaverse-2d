const fetch = require('node-fetch');

async function testAuthFlow() {
  console.log('🧪 Testing Authentication Flow...\n');

  const baseUrl = 'http://localhost:3000/api/v1';
  
  // Test 1: Check if backend is accessible
  console.log('1. Testing backend accessibility...');
  try {
    const response = await fetch(`${baseUrl}/maps`);
    if (response.ok) {
      console.log('✅ Backend is accessible');
    } else {
      console.log('❌ Backend returned status:', response.status);
    }
  } catch (error) {
    console.log('❌ Backend not accessible:', error.message);
    return;
  }

  // Test 2: Test signin
  console.log('\n2. Testing signin...');
  try {
    const signinResponse = await fetch(`${baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'testuser',
        password: 'testpass'
      })
    });

    if (signinResponse.ok) {
      const data = await signinResponse.json();
      console.log('✅ Signin successful, got token');
      const token = data.token;

      // Test 3: Test user/me endpoint
      console.log('\n3. Testing /user/me endpoint...');
      const userResponse = await fetch(`${baseUrl}/user/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        console.log('✅ /user/me successful:', userData);
      } else {
        console.log('❌ /user/me failed:', userResponse.status, await userResponse.text());
      }

      // Test 4: Test space endpoint
      console.log('\n4. Testing /space/{spaceId} endpoint...');
      const spaceId = 'cmdj419p50002a8bp0i41xxvd';
      const spaceResponse = await fetch(`${baseUrl}/space/${spaceId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (spaceResponse.ok) {
        const spaceData = await spaceResponse.json();
        console.log('✅ /space/{spaceId} successful:', spaceData);
      } else {
        console.log('❌ /space/{spaceId} failed:', spaceResponse.status, await spaceResponse.text());
      }

    } else {
      console.log('❌ Signin failed:', signinResponse.status, await signinResponse.text());
    }
  } catch (error) {
    console.log('❌ Error during auth flow:', error.message);
  }

  console.log('\n✅ Authentication flow test completed!');
}

// Run the test
testAuthFlow().catch(console.error); 