const fetch = require('node-fetch');

async function testLoginRateLimit() {
    console.log('Testing login rate limiting...\n');
    
    // Test 1: Multiple failed attempts for same username
    console.log('Test 1: Multiple failed attempts for same username (user1)');
    for (let i = 1; i <= 12; i++) {
        try {
            const response = await fetch('http://localhost:3000/api/v1/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: 'user1',
                    password: 'wrongpassword'
                })
            });
            
            if (response.status === 429) {
                const data = await response.json();
                console.log(`Attempt ${i}: Rate limited - ${data.message}`);
                console.log(`Rate limit key: ${data.key}`);
                break;
            } else {
                console.log(`Attempt ${i}: Status ${response.status}`);
            }
        } catch (error) {
            console.log(`Attempt ${i}: Error - ${error.message}`);
        }
    }
    
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Test 2: Different usernames should have separate limits
    console.log('Test 2: Different usernames should have separate limits');
    for (let i = 1; i <= 12; i++) {
        try {
            const response = await fetch('http://localhost:3000/api/v1/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: `user${i}`,
                    password: 'wrongpassword'
                })
            });
            
            if (response.status === 429) {
                const data = await response.json();
                console.log(`Attempt ${i}: Rate limited - ${data.message}`);
                console.log(`Rate limit key: ${data.key}`);
                break;
            } else {
                console.log(`Attempt ${i}: Status ${response.status}`);
            }
        } catch (error) {
            console.log(`Attempt ${i}: Error - ${error.message}`);
        }
    }
    
    console.log('\nTest completed!');
}

testLoginRateLimit(); 