import { Client, Databases, Permission, Role } from 'node-appwrite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const client = new Client()
    .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT)
    .setProject(process.env.VITE_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const databaseId = process.env.VITE_APPWRITE_DATABASE_ID;

const fixContactPermissions = async () => {
    try {
        console.log('🔄 Updating permissions for "contacts" collection...');
        
        await databases.updateCollection(
            databaseId, 
            'contacts', 
            'Contacts', 
            [
                Permission.read(Role.any()),
                Permission.write(Role.any()), // Allow anyone to send messages
            ]
        );
        
        console.log('✅ Success! Website visitors can now send messages.');
    } catch (error) {
        console.error('❌ Error updating permissions:', error.message);
    }
};

fixContactPermissions();
