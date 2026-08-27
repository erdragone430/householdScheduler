import readline from 'readline';
import db from '@/db/schema/schema';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showMenu() {
    console.log('\n--- HOUSEHOLD ADMIN CLI ---\n');
    console.log('1. Check Flatmates');
    console.log('2. Add user admin');
    console.log('3. Add normal user');
    console.log('4. Delete user');
    console.log('5. Quit');

    rl.question('\nChoose one option: ', (answer) => {
        if (answer === '1') {
            const users = db.prepare('SELECT * FROM users').all();
            console.table(users);
            showMenu();
        } else if (answer === '2') {
            rl.question('User: ', (name) => {
                db.prepare('INSERT INTO users (id, name, role) VALUES (?, ?, ?)').run(crypto.randomUUID(), name, 'admin');
                console.log(`✅ Admin ${name} added!`);
                showMenu();
            });
        } else if (answer === '3') {
            rl.question('User: ', (name) => {
                db.prepare('INSERT INTO users (id, name, role) VALUES (?, ?, ?)').run(crypto.randomUUID(), name, 'member');
                console.log(`✅ User ${name} added!`);
                showMenu(); 
            });
        } else if (answer === '4') {
            rl.question('User to delete: ', (name) => {
                const check = db.prepare('SELECT name FROM users WHERE name = ?').get(name);
                if (!check) {
                    console.log(`❌ No user named "${name}" found.`);
                } else {
                    db.prepare('DELETE FROM users WHERE name = ?').run(name);
                    console.log(`✅ User ${name} deleted!`);
                }
                showMenu(); 
            });
        } else {
            rl.close();
        }
    });
}

showMenu();