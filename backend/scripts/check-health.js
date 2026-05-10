import { Client, Databases, Storage } from 'appwrite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const client = new Client()
    .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT)
    .setProject(process.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);
const storage = new Storage(client);

const databaseId = process.env.VITE_APPWRITE_DATABASE_ID;
const collections = {
    profile: process.env.VITE_APPWRITE_PROFILE_COLLECTION_ID,
    skills: process.env.VITE_APPWRITE_SKILLS_COLLECTION_ID,
    certifications: process.env.VITE_APPWRITE_CERTIFICATIONS_COLLECTION_ID,
    education: process.env.VITE_APPWRITE_EDUCATION_COLLECTION_ID,
    contacts: process.env.VITE_APPWRITE_CONTACTS_COLLECTION_ID,
};
const bucketId = process.env.VITE_APPWRITE_STORAGE_BUCKET_ID;

const checkHealth = async () => {
    console.log('--- Appwrite Health Check ---\n');
    
    // Check Database
    try {
        await databases.get(databaseId);
        console.log(`✅ Database "${databaseId}" exists.`);
    } catch (error) {
        console.error(`❌ Database "${databaseId}" NOT FOUND. Please create it in Appwrite console.`);
    }

    // Check Collections
    for (const [name, id] of Object.entries(collections)) {
        try {
            await databases.getCollection(databaseId, id);
            console.log(`✅ Collection "${name}" (ID: ${id}) exists.`);
        } catch (error) {
            console.error(`❌ Collection "${name}" (ID: ${id}) NOT FOUND. Please create it.`);
        }
    }

    // Check Bucket
    try {
        await storage.getBucket(bucketId);
        console.log(`✅ Bucket "${bucketId}" exists.`);
    } catch (error) {
        console.error(`❌ Bucket "${bucketId}" NOT FOUND. Please create it.`);
    }

    console.log('\n--- Attributes Check (Manual) ---');
    console.log('Ensure the following attributes are created in your collections:');
    console.log('- profile: name, title, bio, profileImage, resumeURL, socialLinks');
    console.log('- skills: skillName, category, percentage');
    console.log('- certifications: title, organization, issueDate, imageURL, verifyLink');
    console.log('- education: institution, degree, stream, cgpa, duration');
    console.log('- contacts: name, email, subject, message');
    
    console.log('\n--- Permissions Check (Manual) ---');
    console.log('Go to Settings -> Permissions for each collection/bucket:');
    console.log('- Add "Any" with "Read" access (for public view).');
    console.log('- Add "Users" or your specific user with "Create", "Update", "Delete" access (for admin).');
};

checkHealth();
