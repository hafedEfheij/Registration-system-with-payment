const fetch = require('node-fetch');

async function fixPrepaidCards() {
  try {
    console.log('🔧 Calling API to fix prepaid cards data...');
    
    const response = await fetch('http://localhost:3000/api/admin/fix-prepaid-cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': 'connect.sid=s%3A_your_session_id_here' // This would need a real session
      },
      body: JSON.stringify({})
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Success:', result.message);
      console.log('📊 Cards inserted:', result.count);
    } else {
      const error = await response.text();
      console.error('❌ Error:', error);
    }
  } catch (error) {
    console.error('❌ Network error:', error.message);
  }
}

fixPrepaidCards();
