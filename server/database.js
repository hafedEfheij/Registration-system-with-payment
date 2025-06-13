const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Ensure .data directory exists for Glitch persistence
const dataDir = path.join(__dirname, '../.data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Create a new database or open existing one
// Use .data directory for Glitch persistence
const dbPath = path.join(dataDir, 'university.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    createTables();
  }
});

// Create tables if they don't exist
function createTables() {
  // Users table (for authentication)
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`, (err) => {
    if (err) {
      console.error('Error creating users table', err.message);
    } else {
      console.log('Users table created or already exists');

      // Create admin user if it doesn't exist
      db.get("SELECT * FROM users WHERE username = 'admin'", (err, row) => {
        if (err) {
          console.error('Error checking admin user', err.message);
        } else if (!row) {
          // Create admin user with password 'admin123'
          db.run("INSERT INTO users (username, password, role) VALUES ('admin', 'admin123', 'admin')", (err) => {
            if (err) {
              console.error('Error creating admin user', err.message);
            } else {
              console.log('Admin user created successfully');
            }
          });
        }
      });

      // Create financial supervisor user if it doesn't exist
      db.get("SELECT * FROM users WHERE username = 'financial'", (err, row) => {
        if (err) {
          console.error('Error checking financial supervisor user', err.message);
        } else if (!row) {
          // Create financial supervisor user with password 'financial123'
          db.run("INSERT INTO users (username, password, role) VALUES ('financial', 'financial123', 'financial_supervisor')", (err) => {
            if (err) {
              console.error('Error creating financial supervisor user', err.message);
            } else {
              console.log('Financial supervisor user created successfully');
            }
          });
        }
      });

      // Create test student user if it doesn't exist
      db.get("SELECT * FROM users WHERE username = 'student1'", (err, row) => {
        if (err) {
          console.error('Error checking student user', err.message);
        } else if (!row) {
          // Create student user with password 'student123'
          db.run("INSERT INTO users (username, password, role) VALUES ('student1', 'student123', 'student')", function(err) {
            if (err) {
              console.error('Error creating student user', err.message);
            } else {
              console.log('Student user created successfully');
              const userId = this.lastID;

              // Create student record
              db.run("INSERT INTO students (user_id, name, student_id, department_id, phone, email) VALUES (?, ?, ?, ?, ?, ?)",
                [userId, 'طالب تجريبي', 'STU001', 1, '1234567890', 'student1@test.com'], (err) => {
                if (err) {
                  console.error('Error creating student record', err.message);
                } else {
                  console.log('Student record created successfully');
                }
              });
            }
          });
        }
      });
    }
  });

  // Departments table
  db.run(`CREATE TABLE IF NOT EXISTS departments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`, (err) => {
    if (err) {
      console.error('Error creating departments table', err.message);
    } else {
      console.log('Departments table created or already exists');
    }
  });

  // Students table (depends on users and departments)
  db.run(`CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id TEXT NOT NULL UNIQUE,
    user_id INTEGER,
    name TEXT NOT NULL,
    department_id INTEGER,
    registration_number TEXT NOT NULL UNIQUE,
    semester TEXT DEFAULT 'الأول',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (department_id) REFERENCES departments (id)
  )`, (err) => {
    if (err) {
      console.error('Error creating students table', err.message);
    } else {
      console.log('Students table created or already exists');

      // Check if semester column exists, if not add it
      db.all("PRAGMA table_info(students)", (err, rows) => {
        if (err) {
          console.error('Error checking students table schema:', err.message);
        } else {
          // Check if semester column exists
          const hasSemesterColumn = rows.some(row => row.name === 'semester');
          if (!hasSemesterColumn) {
            // Add semester column
            db.run("ALTER TABLE students ADD COLUMN semester TEXT DEFAULT 'الأول'", (err) => {
              if (err) {
                console.error('Error adding semester column to students table:', err.message);
              } else {
                console.log('Added semester column to students table');
              }
            });
          }

          // Check if group_name column exists
          const hasGroupNameColumn = rows.some(row => row.name === 'group_name');
          if (!hasGroupNameColumn) {
            // Add group_name column
            db.run("ALTER TABLE students ADD COLUMN group_name TEXT DEFAULT NULL", (err) => {
              if (err) {
                console.error('Error adding group_name column to students table:', err.message);
              } else {
                console.log('Added group_name column to students table');
              }
            });
          }
        }
      });
    }
  });

  // Courses table (depends on departments)
  db.run(`CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    department_id INTEGER,
    max_students INTEGER DEFAULT 30,
    semester TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments (id)
  )`, (err) => {
    if (err) {
      console.error('Error creating courses table', err.message);
    } else {
      console.log('Courses table created or already exists');

      // Check if semester column exists, if not add it
      db.all("PRAGMA table_info(courses)", (err, rows) => {
        if (err) {
          console.error('Error checking courses table schema:', err.message);
        } else {
          // Check if semester column exists
          const hasSemesterColumn = rows.some(row => row.name === 'semester');
          if (!hasSemesterColumn) {
            // Add semester column
            db.run("ALTER TABLE courses ADD COLUMN semester TEXT DEFAULT NULL", (err) => {
              if (err) {
                console.error('Error adding semester column to courses table:', err.message);
              } else {
                console.log('Added semester column to courses table');
              }
            });
          }

          // Check if price column exists, if not add it
          const hasPriceColumn = rows.some(row => row.name === 'price');
          if (!hasPriceColumn) {
            // Add price column as INTEGER for whole numbers only
            db.run("ALTER TABLE courses ADD COLUMN price INTEGER DEFAULT 0", (err) => {
              if (err) {
                console.error('Error adding price column to courses table:', err.message);
              } else {
                console.log('Added price column to courses table');
              }
            });
          }
        }
      });
    }
  });

  // Prerequisites table (depends on courses)
  db.run(`CREATE TABLE IF NOT EXISTS prerequisites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id INTEGER,
    prerequisite_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses (id),
    FOREIGN KEY (prerequisite_id) REFERENCES courses (id)
  )`, (err) => {
    if (err) {
      console.error('Error creating prerequisites table', err.message);
    } else {
      console.log('Prerequisites table created or already exists');
    }
  });

  // Enrollments table (depends on students and courses)
  db.run(`CREATE TABLE IF NOT EXISTS enrollments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER,
    course_id INTEGER,
    status TEXT DEFAULT 'enrolled',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students (id),
    FOREIGN KEY (course_id) REFERENCES courses (id)
  )`, (err) => {
    if (err) {
      console.error('Error creating enrollments table', err.message);
    } else {
      console.log('Enrollments table created or already exists');
    }
  });

  // Completed courses table (depends on students and courses)
  db.run(`CREATE TABLE IF NOT EXISTS completed_courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER,
    course_id INTEGER,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students (id),
    FOREIGN KEY (course_id) REFERENCES courses (id)
  )`, (err) => {
    if (err) {
      console.error('Error creating completed_courses table', err.message);
    } else {
      console.log('Completed courses table created or already exists');
    }
  });

  // Course groups table (depends on courses)
  db.run(`CREATE TABLE IF NOT EXISTS course_groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id INTEGER NOT NULL,
    group_name TEXT NOT NULL,
    max_students INTEGER DEFAULT 30,
    professor_name TEXT,
    time_slot TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses (id)
  )`, (err) => {
    if (err) {
      console.error('Error creating course_groups table', err.message);
    } else {
      console.log('Course groups table created or already exists');
    }
  });

  // Update enrollments table to include group_id if it doesn't exist
  db.all("PRAGMA table_info(enrollments)", (err, rows) => {
    if (err) {
      console.error('Error checking enrollments table schema:', err.message);
    } else {
      // Check if group_id column exists
      const hasGroupIdColumn = rows.some(row => row.name === 'group_id');
      if (!hasGroupIdColumn) {
        // Add group_id column
        db.run("ALTER TABLE enrollments ADD COLUMN group_id INTEGER DEFAULT NULL", (err) => {
          if (err) {
            console.error('Error adding group_id column to enrollments table:', err.message);
          } else {
            console.log('Added group_id column to enrollments table');
            // Add foreign key constraint
            db.run("PRAGMA foreign_keys = ON", (err) => {
              if (err) {
                console.error('Error enabling foreign keys:', err.message);
              }
            });
          }
        });
      }

      // Check if payment_status column exists
      const hasPaymentStatusColumn = rows.some(row => row.name === 'payment_status');
      if (!hasPaymentStatusColumn) {
        // Add payment_status column with default value 'غير خالص'
        db.run("ALTER TABLE enrollments ADD COLUMN payment_status TEXT DEFAULT 'غير خالص'", (err) => {
          if (err) {
            console.error('Error adding payment_status column to enrollments table:', err.message);
          } else {
            console.log('Added payment_status column to enrollments table');
          }
        });
      }

      // Check if receipt_number column exists
      const hasReceiptNumberColumn = rows.some(row => row.name === 'receipt_number');
      if (!hasReceiptNumberColumn) {
        // Add receipt_number column
        db.run("ALTER TABLE enrollments ADD COLUMN receipt_number TEXT DEFAULT NULL", (err) => {
          if (err) {
            console.error('Error adding receipt_number column to enrollments table:', err.message);
          } else {
            console.log('Added receipt_number column to enrollments table');
          }
        });
      }

      // Check if payment_date column exists
      const hasPaymentDateColumn = rows.some(row => row.name === 'payment_date');
      if (!hasPaymentDateColumn) {
        // Add payment_date column
        db.run("ALTER TABLE enrollments ADD COLUMN payment_date TIMESTAMP DEFAULT NULL", (err) => {
          if (err) {
            console.error('Error adding payment_date column to enrollments table:', err.message);
          } else {
            console.log('Added payment_date column to enrollments table');
          }
        });
      }
    }
  });

  // System settings table
  db.run(`CREATE TABLE IF NOT EXISTS system_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT UNIQUE,
    value TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`, (err) => {
    if (err) {
      console.error('Error creating system_settings table', err.message);
    } else {
      console.log('System settings table created or already exists');

      // Add prepaid_card_default_value setting if it doesn't exist
      db.get('SELECT * FROM system_settings WHERE key = ?', ['prepaid_card_default_value'], (err, row) => {
        if (err) {
          console.error('Error checking prepaid_card_default_value setting:', err.message);
        } else if (!row) {
          // Default to 5 dinars
          db.run('INSERT INTO system_settings (key, value) VALUES (?, ?)',
            ['prepaid_card_default_value', '5'],
            (err) => {
              if (err) {
                console.error('Error inserting default prepaid_card_default_value setting:', err.message);
              } else {
                console.log('Default prepaid_card_default_value setting inserted');
              }
            }
          );
        }
      });

      // Insert default settings if they don't exist
      db.get('SELECT * FROM system_settings WHERE key = ?', ['registration_open'], (err, row) => {
        if (err) {
          console.error('Error checking registration_open setting:', err.message);
        } else if (!row) {
          // Default to registration open
          db.run('INSERT INTO system_settings (key, value) VALUES (?, ?)',
            ['registration_open', 'true'],
            (err) => {
              if (err) {
                console.error('Error inserting default registration_open setting:', err.message);
              } else {
                console.log('Default registration_open setting inserted');
              }
            }
          );
        }
      });

      // Add max_courses_limit setting if it doesn't exist
      db.get('SELECT * FROM system_settings WHERE key = ?', ['max_courses_limit'], (err, row) => {
        if (err) {
          console.error('Error checking max_courses_limit setting:', err.message);
        } else if (!row) {
          // Default to 6 courses
          db.run('INSERT INTO system_settings (key, value) VALUES (?, ?)',
            ['max_courses_limit', '6'],
            (err) => {
              if (err) {
                console.error('Error inserting default max_courses_limit setting:', err.message);
              } else {
                console.log('Default max_courses_limit setting inserted');
              }
            }
          );
        }
      });

      // Add auto_logout setting if it doesn't exist
      db.get('SELECT * FROM system_settings WHERE key = ?', ['auto_logout_enabled'], (err, row) => {
        if (err) {
          console.error('Error checking auto_logout_enabled setting:', err.message);
        } else if (!row) {
          // Default to enabled
          db.run('INSERT INTO system_settings (key, value) VALUES (?, ?)',
            ['auto_logout_enabled', 'true'],
            (err) => {
              if (err) {
                console.error('Error inserting default auto_logout_enabled setting:', err.message);
              } else {
                console.log('Default auto_logout_enabled setting inserted');
              }
            }
          );
        }
      });

      // Add auto_logout_timeout setting if it doesn't exist
      db.get('SELECT * FROM system_settings WHERE key = ?', ['auto_logout_timeout'], (err, row) => {
        if (err) {
          console.error('Error checking auto_logout_timeout setting:', err.message);
        } else if (!row) {
          // Default to 30 seconds
          db.run('INSERT INTO system_settings (key, value) VALUES (?, ?)',
            ['auto_logout_timeout', '30'],
            (err) => {
              if (err) {
                console.error('Error inserting default auto_logout_timeout setting:', err.message);
              } else {
                console.log('Default auto_logout_timeout setting inserted');
              }
            }
          );
        }
      });
    }
  });

  // Prepaid cards table
  db.run(`CREATE TABLE IF NOT EXISTS prepaid_cards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    card_number TEXT NOT NULL UNIQUE,
    value INTEGER NOT NULL DEFAULT 5,
    is_used BOOLEAN DEFAULT FALSE,
    is_sold BOOLEAN DEFAULT FALSE,
    sold_at TIMESTAMP DEFAULT NULL,
    sold_by_admin_id INTEGER DEFAULT NULL,
    used_by_student_id INTEGER DEFAULT NULL,
    used_at TIMESTAMP DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (used_by_student_id) REFERENCES students (id),
    FOREIGN KEY (sold_by_admin_id) REFERENCES users (id)
  )`, (err) => {
    if (err) {
      console.error('Error creating prepaid_cards table', err.message);
    } else {
      console.log('Prepaid cards table created or already exists');

      // Add new columns if they don't exist
      db.run(`ALTER TABLE prepaid_cards ADD COLUMN is_sold BOOLEAN DEFAULT FALSE`, (err) => {
        if (err && !err.message.includes('duplicate column name')) {
          console.error('Error adding is_sold column:', err);
        }
      });

      db.run(`ALTER TABLE prepaid_cards ADD COLUMN sold_at TIMESTAMP DEFAULT NULL`, (err) => {
        if (err && !err.message.includes('duplicate column name')) {
          console.error('Error adding sold_at column:', err);
        }
      });

      db.run(`ALTER TABLE prepaid_cards ADD COLUMN sold_by_admin_id INTEGER DEFAULT NULL`, (err) => {
        if (err && !err.message.includes('duplicate column name')) {
          console.error('Error adding sold_by_admin_id column:', err);
        }
      });

      // Add some test prepaid cards if table is empty
      db.get('SELECT COUNT(*) as count FROM prepaid_cards', (err, result) => {
        if (!err && result.count === 0) {
          console.log('Adding test prepaid cards data...');

          // Insert test prepaid cards with correct data types
          const testCards = [
            // Used cards (is_used = 1 for SQLite)
            ['1235', 500, 1, 5, '2025-05-29 20:11:04', '2025-05-25 10:00:00'],
            ['5687', 500, 1, 8, '2025-05-28 23:26:14', '2025-05-25 10:05:00'],
            ['45874', 500, 1, 8, '2025-05-30 15:30:22', '2025-05-25 10:10:00'],
            // Available cards (is_used = 0 for SQLite)
            ['CARD001', 500, 0, null, null, '2025-05-25 10:15:00'],
            ['CARD002', 500, 0, null, null, '2025-05-25 10:20:00'],
            ['CARD003', 250, 0, null, null, '2025-05-25 10:25:00'],
            ['CARD004', 100, 0, null, null, '2025-05-25 10:30:00'],
            ['CARD005', 50, 0, null, null, '2025-05-25 10:35:00']
          ];

          let insertedCount = 0;
          testCards.forEach(card => {
            db.run(`INSERT INTO prepaid_cards
                    (card_number, value, is_used, used_by_student_id, used_at, created_at)
                    VALUES (?, ?, ?, ?, ?, ?)`,
              card,
              (err) => {
                if (err) {
                  console.log('Error inserting test prepaid card:', err.message);
                } else {
                  insertedCount++;
                  console.log(`✅ Inserted test prepaid card: ${card[0]} (is_used: ${card[2]})`);

                  if (insertedCount === testCards.length) {
                    console.log(`🎉 Successfully inserted ${insertedCount} test prepaid cards!`);
                  }
                }
              }
            );
          });
        }
      });
    }
  });

  // Receipt numbers table - to track used receipt numbers
  db.run(`CREATE TABLE IF NOT EXISTS receipt_numbers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    receipt_number TEXT NOT NULL UNIQUE,
    used_by_student_id INTEGER NOT NULL,
    used_by_enrollment_id INTEGER NOT NULL,
    used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    course_name TEXT,
    student_name TEXT,
    FOREIGN KEY (used_by_student_id) REFERENCES students (id),
    FOREIGN KEY (used_by_enrollment_id) REFERENCES enrollments (id)
  )`, (err) => {
    if (err) {
      console.error('Error creating receipt_numbers table', err.message);
    } else {
      console.log('Receipt numbers table created or already exists');

      // Add some test data if table is empty
      db.get('SELECT COUNT(*) as count FROM receipt_numbers', (err, result) => {
        if (!err && result.count === 0) {
          console.log('Adding test receipt numbers data...');

          // Insert test receipt numbers
          const testReceipts = [
            ['1235', 5, 14, '2025-05-29 20:11:04', 'حاسب 2', 'احمد محمد احمد'],
            ['5687', 8, 26, '2025-05-28 23:26:14', 'حاسب 3', 'دنيا علي'],
            ['45874', 8, 27, '2025-05-30 15:30:22', 'قواعد بيانات 1', 'دنيا علي']
          ];

          testReceipts.forEach(receipt => {
            db.run(`INSERT INTO receipt_numbers
                    (receipt_number, used_by_student_id, used_by_enrollment_id, used_at, course_name, student_name)
                    VALUES (?, ?, ?, ?, ?, ?)`,
              receipt,
              (err) => {
                if (err) {
                  console.log('Error inserting test receipt:', err.message);
                } else {
                  console.log('Inserted test receipt:', receipt[0]);
                }
              }
            );
          });
        }
      });
    }
  });

  // Failed receipt attempts table for account lockout
  db.run(`CREATE TABLE IF NOT EXISTS failed_receipt_attempts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    attempted_receipt_number TEXT NOT NULL,
    attempt_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address TEXT,
    FOREIGN KEY (student_id) REFERENCES students (id)
  )`, (err) => {
    if (err) {
      console.error('Error creating failed receipt attempts table', err.message);
    } else {
      console.log('Failed receipt attempts table created or already exists');
    }
  });

  // Add account lockout columns to students table
  db.run("PRAGMA table_info(students)", (err, rows) => {
    if (err) {
      console.error('Error checking students table structure:', err.message);
      return;
    }

    // Check if account_locked column exists
    db.all("PRAGMA table_info(students)", (err, rows) => {
      if (err) {
        console.error('Error checking students table columns:', err.message);
        return;
      }

      const hasAccountLocked = rows.some(row => row.name === 'account_locked');
      const hasLockedAt = rows.some(row => row.name === 'locked_at');
      const hasLockedReason = rows.some(row => row.name === 'locked_reason');

      if (!hasAccountLocked) {
        db.run("ALTER TABLE students ADD COLUMN account_locked INTEGER DEFAULT 0", (err) => {
          if (err) {
            console.error('Error adding account_locked column:', err.message);
          } else {
            console.log('Added account_locked column to students table');
          }
        });
      }

      if (!hasLockedAt) {
        db.run("ALTER TABLE students ADD COLUMN locked_at TIMESTAMP", (err) => {
          if (err) {
            console.error('Error adding locked_at column:', err.message);
          } else {
            console.log('Added locked_at column to students table');
          }
        });
      }

      if (!hasLockedReason) {
        db.run("ALTER TABLE students ADD COLUMN locked_reason TEXT", (err) => {
          if (err) {
            console.error('Error adding locked_reason column:', err.message);
          } else {
            console.log('Added locked_reason column to students table');
          }
        });
      }
    });
  });
}

module.exports = db;
