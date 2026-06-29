# Premium Developer Portfolio

A modern, fully responsive, real-time dynamic portfolio website built with React, Tailwind CSS, Framer Motion, and Appwrite.

Live Link: https://siva-portfolio-frontend.onrender.com/

## Features

- **Dynamic Hero Section**: Typing animations and profile details.
- **Real-time Data**: Content fetched directly from Appwrite Database.
- **Glassmorphism Design**: Modern, premium UI with neon highlights and smooth gradients.
- **Admin Dashboard**: Full CRUD capabilities for Profile, Skills, Certifications, and Education.
- **Secure Authentication**: Admin login powered by Appwrite Auth.
- **Contact Form**: Validated form that stores messages in the database with toast notifications.
- **Image Uploads**: Integrated with Appwrite Storage for profile and certificate images.

## Setup Instructions

### 1. Appwrite Configuration

1. Create a new project in [Appwrite Cloud](https://cloud.appwrite.io).
2. Create the following **Collections** in your database:
   - `profile`: Fields (`name`, `title`, `bio`, `profileImage`, `resumeURL`, `socialLinks`)
   - `skills`: Fields (`skillName`, `category`, `percentage`)
   - `certifications`: Fields (`title`, `organization`, `issueDate`, `imageURL`, `verifyLink`)
   - `education`: Fields (`institution`, `degree`, `stream`, `cgpa`, `duration`)
   - `contacts`: Fields (`name`, `email`, `subject`, `message`)
3. Create a **Storage Bucket** for images and resumes.
4. Set Permissions for all collections and the bucket to allow `role:all` for Read and `role:admin` (or specific user) for Create/Update/Delete.

### 2. Environment Variables

Update your `.env` file with your credentials. 

> [!IMPORTANT]
> **Admin Login**: The login system now uses a **Username** field. 
> To log in with the username **Siva**, you must create a user in your Appwrite console with the following details:
> - **Email**: `Siva@admin.com`
> - **Password**: `Siva@1250`

### 3. Installation

```bash
npm install
npm run dev
```

## Folder Structure

```
src/
├── admin/       # Protected admin modules and login
├── components/  # Reusable UI components
├── context/     # Auth state management
├── pages/       # Public landing page
├── sections/    # Individual portfolio sections
├── services/    # Appwrite API layer
└── styles/      # Global CSS and themes
```

## Security Considerations

- All admin routes are protected by `ProtectedRoute`.
- Form data is validated before submission.
- Environment variables are used to hide sensitive API keys.
- Ensure Appwrite permissions are correctly set to prevent unauthorized database access.

## Best Practices

- Component-based architecture for reusability.
- Mobile-first responsive design.
- Optimized performance with lazy loading (if implemented).
- Clean code and modular service layer.
