const http = require('http');

// Test login first
function testLogin() {
    console.log('🔐 Testing login...');
    
    const loginData = JSON.stringify({
        username: 'financial',
        password: 'financial123'
    });

    const loginOptions = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(loginData)
        }
    };

    const loginReq = http.request(loginOptions, (res) => {
        console.log('Login status:', res.statusCode);
        
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
            console.log('Login response:', data);
            
            if (res.statusCode === 200) {
                // Extract session cookie
                const cookies = res.headers['set-cookie'];
                console.log('Cookies:', cookies);
                
                if (cookies) {
                    const sessionCookie = cookies.find(cookie => cookie.startsWith('connect.sid'));
                    if (sessionCookie) {
                        console.log('Session cookie found:', sessionCookie);
                        testCustomCards(sessionCookie);
                    } else {
                        console.log('No session cookie found');
                    }
                } else {
                    console.log('No cookies in response');
                }
            } else {
                console.log('Login failed');
            }
        });
    });

    loginReq.on('error', (e) => {
        console.error('Login error:', e.message);
    });

    loginReq.write(loginData);
    loginReq.end();
}

// Test custom cards generation
function testCustomCards(sessionCookie) {
    console.log('\n📋 Testing custom cards generation...');
    
    const testData = JSON.stringify({
        numbers: ['NEW001', 'NEW002', 'CUSTOM123'],
        value: 10
    });

    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/admin/prepaid-cards/generate-custom',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(testData),
            'Cookie': sessionCookie
        }
    };

    const req = http.request(options, (res) => {
        console.log('Generate cards status:', res.statusCode);
        console.log('Response headers:', res.headers);
        
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
            console.log('Generate cards response:', data);
            
            try {
                const jsonData = JSON.parse(data);
                if (jsonData.success) {
                    console.log('✅ Success! Generated cards:', jsonData.cards);
                } else {
                    console.log('❌ Error:', jsonData.error);
                }
            } catch (e) {
                console.log('Failed to parse JSON response:', e.message);
            }
        });
    });

    req.on('error', (e) => {
        console.error('Generate cards error:', e.message);
    });

    req.write(testData);
    req.end();
}

// Start test
console.log('🚀 Starting API test...');
testLogin();
