import { Client, Databases, Storage, Permission, Role } from 'node-appwrite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const client = new Client()
    .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT)
    .setProject(process.env.VITE_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY); // User needs to add this to .env

const databases = new Databases(client);
const storage = new Storage(client);

const databaseId = process.env.VITE_APPWRITE_DATABASE_ID;
const bucketId = process.env.VITE_APPWRITE_STORAGE_BUCKET_ID;

const setup = async () => {
    if (!process.env.APPWRITE_API_KEY) {
        console.error('❌ Error: APPWRITE_API_KEY is missing in .env file.');
        console.log('Please create an API Key in Appwrite Console -> Overview -> API Keys with all database and storage scopes.');
        return;
    }

    try {
        console.log('🚀 Starting Appwrite Setup...');

        // 1. Create Database
        try {
            await databases.create(databaseId, 'Portfolio Database');
            console.log(`✅ Database "${databaseId}" created.`);
        } catch (e) { console.log(`ℹ️ Database "${databaseId}" already exists or error: ${e.message}`); }

        // 2. Define Collections and Attributes
        const schema = [
            {
                id: 'profile',
                name: 'Profile',
                attributes: [
                    { key: 'name', type: 'string', size: 255, required: true },
                    { key: 'title', type: 'string', size: 255, required: true },
                    { key: 'bio', type: 'string', size: 1000, required: true },
                    { key: 'profileImage', type: 'string', size: 1000, required: false },
                    { key: 'resumeURL', type: 'string', size: 1000, required: false },
                    { key: 'socialLinks', type: 'string', size: 2000, required: false },
                    { key: 'location', type: 'string', size: 255, required: false },
                    { key: 'email', type: 'string', size: 255, required: false },
                    { key: 'phone', type: 'string', size: 20, required: false },
                    { key: 'birthday', type: 'string', size: 100, required: false },
                    { key: 'achievements', type: 'string', size: 2000, required: false },
                ]
            },
            {
                id: 'experience',
                name: 'Experience',
                attributes: [
                    { key: 'title', type: 'string', size: 255, required: true },
                    { key: 'company', type: 'string', size: 255, required: true },
                    { key: 'duration', type: 'string', size: 100, required: true },
                    { key: 'description', type: 'string', size: 1000, required: true },
                ]
            },
            {
                id: 'skills',
                name: 'Skills',
                attributes: [
                    { key: 'skillName', type: 'string', size: 255, required: true },
                    { key: 'category', type: 'string', size: 255, required: true },
                    { key: 'percentage', type: 'integer', min: 0, max: 100, required: true },
                ]
            },
            {
                id: 'certifications',
                name: 'Certifications',
                attributes: [
                    { key: 'title', type: 'string', size: 255, required: true },
                    { key: 'organization', type: 'string', size: 255, required: true },
                    { key: 'issueDate', type: 'string', size: 50, required: true },
                    { key: 'imageURL', type: 'string', size: 1000, required: false },
                    { key: 'verifyLink', type: 'string', size: 1000, required: false },
                ]
            },
            {
                id: 'education',
                name: 'Education',
                attributes: [
                    { key: 'institution', type: 'string', size: 255, required: true },
                    { key: 'degree', type: 'string', size: 255, required: true },
                    { key: 'stream', type: 'string', size: 255, required: true },
                    { key: 'cgpa', type: 'string', size: 50, required: true },
                    { key: 'duration', type: 'string', size: 100, required: true },
                ]
            },
            {
                id: 'contacts',
                name: 'Contacts',
                attributes: [
                    { key: 'name', type: 'string', size: 255, required: true },
                    { key: 'email', type: 'string', size: 255, required: true },
                    { key: 'subject', type: 'string', size: 255, required: false },
                    { key: 'message', type: 'string', size: 2000, required: true },
                ]
            },
            {
                id: 'projects',
                name: 'Projects',
                attributes: [
                    { key: 'title', type: 'string', size: 255, required: true },
                    { key: 'description', type: 'string', size: 1000, required: true },
                    { key: 'imageURL', type: 'string', size: 1000, required: false },
                    { key: 'githubLink', type: 'string', size: 500, required: false },
                    { key: 'liveLink', type: 'string', size: 500, required: false },
                    { key: 'tags', type: 'string', size: 1000, required: false }, // Store as "React, Tailwind, Appwrite"
                ]
            }
        ];

        for (const col of schema) {
            try {
                await databases.createCollection(databaseId, col.id, col.name, [
                    Permission.read(Role.any()),
                    Permission.write(Role.users()),
                ]);
                console.log(`✅ Collection "${col.id}" created.`);
            } catch (e) { 
                console.log(`ℹ️ Collection "${col.id}" already exists. Checking attributes...`); 
            }

            for (const attr of col.attributes) {
                try {
                    if (attr.type === 'string') {
                        await databases.createStringAttribute(databaseId, col.id, attr.key, attr.size, attr.required);
                    } else if (attr.type === 'integer') {
                        await databases.createIntegerAttribute(databaseId, col.id, attr.key, attr.required, attr.min, attr.max);
                    }
                    console.log(`   - Attribute "${attr.key}" added to "${col.id}".`);
                } catch (e) {
                    console.log(`   - Attribute "${attr.key}" already exists in "${col.id}".`);
                }
            }
        }

        // 3. Create Bucket
        try {
            await storage.createBucket(bucketId, 'Portfolio Storage', [
                Permission.read(Role.any()),
                Permission.write(Role.users()),
            ]);
            console.log(`✅ Bucket "${bucketId}" created.`);
        } catch (e) { console.log(`ℹ️ Bucket "${bucketId}" setup skipped: ${e.message}`); }

        console.log('\n✨ Setup Complete! Your Appwrite project is now fully configured.');
    } catch (error) {
        console.error('❌ Critical Error during setup:', error.message);
    }
};

setup();
