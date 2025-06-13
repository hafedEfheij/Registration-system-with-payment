const sqlite3 = require('sqlite3').verbose();

// Connect to database
const db = new sqlite3.Database('database.db', (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
    return;
  }
  console.log('Connected to SQLite database');
});

// Clear existing prepaid cards
db.run('DELETE FROM prepaid_cards', (err) => {
  if (err) {
    console.error('Error clearing prepaid cards:', err.message);
    return;
  }
  console.log('Cleared existing prepaid cards');

  // Insert test prepaid cards with correct data types
  const testCards = [
    // Used cards (is_used = 1)
    ['1235', 500, 1, 5, '2025-05-29 20:11:04', '2025-05-25 10:00:00'],
    ['5687', 500, 1, 8, '2025-05-28 23:26:14', '2025-05-25 10:05:00'],
    ['45874', 500, 1, 8, '2025-05-30 15:30:22', '2025-05-25 10:10:00'],
    // Available cards (is_used = 0)
    ['CARD001', 500, 0, null, null, '2025-05-25 10:15:00'],
    ['CARD002', 500, 0, null, null, '2025-05-25 10:20:00'],
    ['CARD003', 250, 0, null, null, '2025-05-25 10:25:00'],
    ['CARD004', 100, 0, null, null, '2025-05-25 10:30:00'],
    ['CARD005', 50, 0, null, null, '2025-05-25 10:35:00']
  ];

  let insertedCount = 0;
  testCards.forEach((card, index) => {
    db.run(`INSERT INTO prepaid_cards 
            (card_number, value, is_used, used_by_student_id, used_at, created_at)
            VALUES (?, ?, ?, ?, ?, ?)`,
      card,
      function(err) {
        if (err) {
          console.error(`Error inserting card ${card[0]}:`, err.message);
        } else {
          console.log(`✅ Inserted card: ${card[0]} (is_used: ${card[2]})`);
          insertedCount++;
          
          if (insertedCount === testCards.length) {
            console.log(`\n🎉 Successfully inserted ${insertedCount} prepaid cards!`);
            
            // Verify the data
            db.all('SELECT * FROM prepaid_cards ORDER BY created_at', (err, rows) => {
              if (err) {
                console.error('Error verifying data:', err.message);
              } else {
                console.log('\n📋 Verification - All prepaid cards:');
                rows.forEach((row, i) => {
                  console.log(`${i + 1}. ${row.card_number} - Used: ${row.is_used} - Student: ${row.used_by_student_id} - Date: ${row.used_at}`);
                });
              }
              
              // Close database connection
              db.close((err) => {
                if (err) {
                  console.error('Error closing database:', err.message);
                } else {
                  console.log('\n✅ Database connection closed');
                  console.log('🚀 You can now refresh the prepaid cards page to see the updated data!');
                }
              });
            });
          }
        }
      }
    );
  });
});
