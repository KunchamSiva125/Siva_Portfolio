import { Client, Storage } from 'node-appwrite';
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

const listBuckets = async () => {
    try {
        const res = await storage.listBuckets();
        console.log('Buckets found:', JSON.stringify(res.buckets, null, 2));
    } catch (error) {
        console.error('Error listing buckets:', error.message);
    }
};

listBuckets();
