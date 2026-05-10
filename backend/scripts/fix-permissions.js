import { Client, Storage, Permission, Role } from 'node-appwrite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const client = new Client()
    .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT)
    .setProject(process.env.VITE_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const storage = new Storage(client);
const bucketId = process.env.VITE_APPWRITE_STORAGE_BUCKET_ID;

const fixPermissions = async () => {
    try {
        console.log(`🔧 Updating permissions for bucket: ${bucketId}...`);
        await storage.updateBucket(
            bucketId,
            'Portfolio Storage',
            [
                Permission.read(Role.any()),
                Permission.create(Role.users()),
                Permission.update(Role.users()),
                Permission.delete(Role.users()),
            ],
            false, // fileSecurity
            true,  // enabled
            50000000, // max size
            [], // allowed extensions
            'none', // compression
            true, // encryption
            true // antivirus
        );
        console.log('✅ Bucket permissions updated successfully! Everyone can now VIEW images.');
    } catch (error) {
        console.error('❌ Error updating permissions:', error.message);
    }
};

fixPermissions();
