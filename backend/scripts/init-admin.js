import { Client, Users, ID } from 'node-appwrite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const client = new Client()
    .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT)
    .setProject(process.env.VITE_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const users = new Users(client);

const createAdmin = async () => {
    try {
        console.log('Attempting to create admin user...');
        
        if (!process.env.APPWRITE_API_KEY) {
            console.error('❌ Error: APPWRITE_API_KEY is missing in backend/.env file.');
            return;
        }

        // Create user using node-appwrite Users API
        // Signature: create(userId, email, phone, password, name)
        await users.create(
            ID.unique(),
            'Siva@admin.com', 
            undefined, // phone
            'Siva@1250',
            'Siva'
        );
        console.log('✅ Admin user created successfully!');
    } catch (error) {
        if (error.code === 409) {
            console.log('ℹ️ User already exists.');
        } else {
            console.error('❌ Error creating user:', error.message);
            console.log('\nNote: Make sure your APPWRITE_API_KEY and environment variables in the backend/.env file are correct.');
            console.log('Your login page is already configured to map the username "Siva" to "Siva@admin.com" automatically.');
        }
    }
};

createAdmin();
