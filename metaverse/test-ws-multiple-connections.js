const WebSocket = require('ws');

async function testMultipleConnections() {
    console.log('Testing multiple WebSocket connections from same user...\n');
    
    // First, let's create a test user and get a token
    const testUser = {
        username: 'testuser',
        password: 'testpass'
    };
    
    try {
        // Create user if it doesn't exist
        const signupResponse = await fetch('http://localhost:3000/api/v1/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...testUser,
                type: 'user'
            })
        });
        
        if (signupResponse.ok) {
            console.log('✅ Test user created');
        } else {
            console.log('ℹ️ Test user already exists');
        }
        
        // Sign in to get token
        const signinResponse = await fetch('http://localhost:3000/api/v1/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testUser)
        });
        
        if (!signinResponse.ok) {
            console.log('❌ Failed to sign in:', await signinResponse.text());
            return;
        }
        
        const { token } = await signinResponse.json();
        console.log('✅ Got token:', token.substring(0, 50) + '...');
        
        const spaceId = 'cmdj419p50002a8bp0i41xxvd';
        
        // Test 1: First connection should succeed
        console.log('\n🔗 Test 1: First connection');
        const ws1 = new WebSocket('ws://localhost:4000');
        
        ws1.on('open', () => {
            console.log('✅ WebSocket 1 connected');
            ws1.send(JSON.stringify({
                type: 'join',
                payload: {
                    spaceId: spaceId,
                    token: token,
                    username: testUser.username
                }
            }));
        });
        
        ws1.on('message', (data) => {
            const message = JSON.parse(data.toString());
            console.log('📨 WS1 received:', message.type);
            
            if (message.type === 'space-joined') {
                console.log('✅ WS1 successfully joined space');
                
                // Test 2: Second connection should be blocked
                console.log('\n🔗 Test 2: Second connection (should be blocked)');
                const ws2 = new WebSocket('ws://localhost:4000');
                
                ws2.on('open', () => {
                    console.log('✅ WebSocket 2 connected');
                    ws2.send(JSON.stringify({
                        type: 'join',
                        payload: {
                            spaceId: spaceId,
                            token: token,
                            username: testUser.username
                        }
                    }));
                });
                
                ws2.on('message', (data) => {
                    const message = JSON.parse(data.toString());
                    console.log('📨 WS2 received:', message.type);
                    
                    if (message.type === 'error') {
                        console.log('✅ WS2 correctly blocked:', message.payload.message);
                        ws2.close();
                        
                        // Test 3: Close first connection and try again
                        console.log('\n🔗 Test 3: Close first connection and try again');
                        ws1.close();
                        
                        setTimeout(() => {
                            console.log('🔗 Test 3: Third connection (should succeed)');
                            const ws3 = new WebSocket('ws://localhost:4000');
                            
                            ws3.on('open', () => {
                                console.log('✅ WebSocket 3 connected');
                                ws3.send(JSON.stringify({
                                    type: 'join',
                                    payload: {
                                        spaceId: spaceId,
                                        token: token,
                                        username: testUser.username
                                    }
                                }));
                            });
                            
                            ws3.on('message', (data) => {
                                const message = JSON.parse(data.toString());
                                console.log('📨 WS3 received:', message.type);
                                
                                if (message.type === 'space-joined') {
                                    console.log('✅ WS3 successfully joined space after WS1 closed');
                                    ws3.close();
                                    console.log('\n🎉 All tests completed successfully!');
                                }
                            });
                        }, 1000);
                    }
                });
            }
        });
        
    } catch (error) {
        console.error('❌ Test failed:', error);
    }
}

testMultipleConnections(); 