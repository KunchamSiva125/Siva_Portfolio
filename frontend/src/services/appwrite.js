import { Client, Account, Databases, Storage, ID, Query } from 'appwrite';

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client = new Client();
client
    .setEndpoint(endpoint)
    .setProject(projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const collections = {
    profile: import.meta.env.VITE_APPWRITE_PROFILE_COLLECTION_ID,
    skills: import.meta.env.VITE_APPWRITE_SKILLS_COLLECTION_ID,
    certifications: import.meta.env.VITE_APPWRITE_CERTIFICATIONS_COLLECTION_ID,
    education: import.meta.env.VITE_APPWRITE_EDUCATION_COLLECTION_ID,
    contacts: import.meta.env.VITE_APPWRITE_CONTACTS_COLLECTION_ID,
    experience: import.meta.env.VITE_APPWRITE_EXPERIENCE_COLLECTION_ID,
    projects: import.meta.env.VITE_APPWRITE_PROJECTS_COLLECTION_ID,
};
const bucketId = import.meta.env.VITE_APPWRITE_STORAGE_BUCKET_ID;

export const appwriteService = {
    // Auth
    async login(email, password) {
        return await account.createEmailPasswordSession(email, password);
    },
    async logout() {
        return await account.deleteSession('current');
    },
    async getCurrentUser() {
        try {
            return await account.get();
        } catch (error) {
            return null;
        }
    },

    // Database CRUD
    async getDocuments(collectionKey, queries = []) {
        return await databases.listDocuments(databaseId, collections[collectionKey], queries);
    },
    async getDocument(collectionKey, documentId) {
        return await databases.getDocument(databaseId, collections[collectionKey], documentId);
    },
    async createDocument(collectionKey, data) {
        return await databases.createDocument(databaseId, collections[collectionKey], ID.unique(), data);
    },
    async updateDocument(collectionKey, documentId, data) {
        return await databases.updateDocument(databaseId, collections[collectionKey], documentId, data);
    },
    async deleteDocument(collectionKey, documentId) {
        return await databases.deleteDocument(databaseId, collections[collectionKey], documentId);
    },

    // Storage
    async uploadFile(file) {
        return await storage.createFile(bucketId, ID.unique(), file);
    },
    async deleteFile(fileId) {
        return await storage.deleteFile(bucketId, fileId);
    },
    getFilePreview(fileId) {
        return `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/preview?project=${projectId}`;
    },
    getFileView(fileId) {
        return `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
    }
};

export { ID, Query };
