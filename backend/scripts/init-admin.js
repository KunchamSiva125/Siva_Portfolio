import { Client, Account, ID } from 'appwrite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const client = new Client()
    .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT)
    .setProject(process.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);

const createAdmin = async () => {
    try {
        console.log('Attempting to create admin user...');
        // Appwrite requires a valid email format for the second parameter
        await account.create(
            ID.unique(),
            'Siva@admin.com', 
            'Siva@1250',
            'Siva'
        );
        console.log('✅ Admin user created successfully!');
    } catch (error) {
        if (error.code === 409) {
            console.log('ℹ️ User already exists.');
        } else {
            console.error('❌ Error creating user:', error.message);
            console.log('\nNote: The second parameter MUST be a valid email format (e.g., Siva@admin.com).');
            console.log('Your login page is already configured to map the username "Siva" to "Siva@admin.com" automatically.');
        }
    }
};

createAdmin();
