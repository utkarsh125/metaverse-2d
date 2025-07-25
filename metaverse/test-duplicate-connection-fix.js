const WebSocket = require('ws');

async function testDuplicateConnectionFix() {
    console.log('🧪 Testing Duplicate Connection Fix...\n');
    
    const spaceId = 'test-space-duplicate-fix';
    const testUsername = 'testuser';
    
    console.log('1. Testing first connection...');
    const ws1 = new WebSocket('ws://localhost:4000');
    
    await new Promise((resolve) => {
        ws1.on('open', () => {
            console.log('✅ WebSocket 1 connected');
            ws1.send(JSON.stringify({
                type: 'join',
                payload: {
                    spaceId: spaceId,
                    token: null,
                    username: testUsername
                }
            }));
        });
        
        ws1.on('message', (data) => {
            const message = JSON.parse(data.toString());
            console.log('📨 WS1 received:', message.type);
            
            if (message.type === 'space-joined') {
                console.log('✅ WS1 successfully joined space');
                resolve();
            } else if (message.type === 'error') {
                console.log('❌ WS1 error:', message.payload.message);
                resolve();
            }
        });
    });
    
    console.log('\n2. Testing second connection (should be blocked)...');
    const ws2 = new WebSocket('ws://localhost:4000');
    
    await new Promise((resolve) => {
        ws2.on('open', () => {
            console.log('✅ WebSocket 2 connected');
            ws2.send(JSON.stringify({
                type: 'join',
                payload: {
                    spaceId: spaceId,
                    token: null,
                    username: testUsername
                }
            }));
        });
        
        ws2.on('message', (data) => {
            const message = JSON.parse(data.toString());
            console.log('📨 WS2 received:', message.type);
            
            if (message.type === 'error') {
                console.log('✅ WS2 correctly blocked:', message.payload.message);
                ws2.close();
                resolve();
            } else if (message.type === 'space-joined') {
                console.log('❌ WS2 should have been blocked but was allowed');
                ws2.close();
                resolve();
            }
        });
        
        // Timeout after 3 seconds
        setTimeout(() => {
            console.log('⏰ Timeout waiting for WS2 response');
            ws2.close();
            resolve();
        }, 3000);
    });
    
    console.log('\n3. Testing third connection with different username (should succeed)...');
    const ws3 = new WebSocket('ws://localhost:4000');
    
    await new Promise((resolve) => {
        ws3.on('open', () => {
            console.log('✅ WebSocket 3 connected');
            ws3.send(JSON.stringify({
                type: 'join',
                payload: {
                    spaceId: spaceId,
                    token: null,
                    username: 'differentuser'
                }
            }));
        });
        
        ws3.on('message', (data) => {
            const message = JSON.parse(data.toString());
            console.log('📨 WS3 received:', message.type);
            
            if (message.type === 'space-joined') {
                console.log('✅ WS3 successfully joined space (different user)');
                ws3.close();
                resolve();
            } else if (message.type === 'error') {
                console.log('❌ WS3 error:', message.payload.message);
                ws3.close();
                resolve();
            }
        });
        
        // Timeout after 3 seconds
        setTimeout(() => {
            console.log('⏰ Timeout waiting for WS3 response');
            ws3.close();
            resolve();
        }, 3000);
    });
    
    // Clean up
    ws1.close();
    console.log('\n✅ Test completed');
}

// Run the test
testDuplicateConnectionFix().catch(console.error); 