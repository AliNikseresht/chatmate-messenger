# Project: chatmate

## Description

`chatmate` is a private project aimed at creating a chat application. It is built using modern web development technologies and follows a modular approach.

## Version

Current version: 0.0.0

## Scripts

The project includes the following scripts:

- `dev`: Starts the development server using Vite.
- `build`: Builds the project using TypeScript and Vite.
- `lint`: Lints the project using ESLint with TypeScript support.
- `preview`: Previews the project using Vite.

## Dependencies

The project relies on the following dependencies:

### Runtime Dependencies

- `@emotion/react`: Version 11.11.3
- `@emotion/styled`: Version 11.11.0
- `@mui/icons-material`: Version 5.15.2
- `@mui/material`: Version 5.15.2
- `axios`: Version 1.6.8
- `react`: Version 18.2.0
- `react-dom`: Version 18.2.0
- `react-router-dom`: Version 6.22.3

### Development Dependencies

- `@types/react`: Version 18.2.43
- `@types/react-dom`: Version 18.2.17
- `@vitejs/plugin-react`: Version 4.2.1
- `eslint`: Version 8.55.0
- `eslint-plugin-react-hooks`: Version 4.6.0
- `eslint-plugin-react-refresh`: Version 0.4.5
- `typescript`: Version 5.2.2
- `vite`: Version 5.0.8

## Folder Structure

- data: This directory contains any data files or resources used by the application, such as JSON files or databases.
- dist: The dist directory typically stores the compiled or bundled code of the application, ready for deployment.
- node_modules: This directory contains all the installed dependencies of the project, managed by npm or yarn.
- public: The public directory holds static assets like HTML files, images, or other resources that are served as-is by the web server.
- src
  - assets: This directory contains static assets such as images, fonts, or other resources used in the project.
  - components: Here, you'll find reusable UI components that are used across different parts of the application.
  - hooks: This directory houses custom React hooks, providing reusable logic across components.
  - pages: Each subdirectory within this folder represents a separate page or view in the application, facilitating a modular and organized approach to routing and navigation.
    - Create: Contains components related to creating content or items in the application.
    - Explore: Includes components and logic for exploring or browsing content within the application.
    - Home: Houses components specific to the home page of the application.
    - login: Contains components and logic related to user authentication and login functionality.
    - messages: This directory contains components and logic related to messaging functionalities within the application. It may include features such as sending and receiving messages, message threads, or chat rooms.
    - Notifications: Includes components and logic for managing user notifications or alerts.
    - profile: Houses components and logic related to user profiles or account settings.
    - settings:The settings directory houses components and logic related to user settings and preferences. It may include options for customizing the user experience, managing account settings, or adjusting application preferences.
    - SignUp: Contains components and logic for user registration or sign-up processes.
    - UsersProfile: Contains components and logic related to viewing other users' profiles.
  - routes: This directory contains configuration files or logic related to routing within the application, defining paths and corresponding components.
  - types: Houses TypeScript type definitions or interfaces used throughout the project, ensuring type safety and consistency.
  - utils:
- App.tsx: This is the main entry point of the React application, where the root component is defined and rendered.
- index.tsx: This file serves as the entry point for the application, where React is initialized and the root component is rendered into the DOM.
- vite-env.d.ts: This file contains type definitions for Vite-specific environment variables or configurations.
- .eslintrc.cjs: This file configures ESLint, a tool for identifying and reporting patterns found in ECMAScript/JavaScript code.
- .gitignore: This file specifies intentionally untracked files to be ignored by Git, helping to keep the repository clean and avoiding unnecessary commits.
- index.html: The HTML template file for the application, providing the structure and initial content to be rendered by the browser.
- package.json: This file contains metadata about the project and its dependencies, as well as scripts for managing the project's lifecycle.
- README.md: This Markdown file serves as the project's main documentation, providing an overview, setup instructions, and other relevant information.
- tsconfig.json: This file contains TypeScript compiler options and settings for the project, ensuring type-checking and compilation adhere to specified configurations.
- tsconfig.node.json: A TypeScript configuration file specifically for Node.js environments, providing separate settings for server-side code.
- vite.config.ts: This file configures Vite, the build tool used for the project, specifying settings such as plugins, optimizations, and development server options.

## Pages

The `pages` directory contains various views or pages of the chatmate application. Each page serves a distinct purpose and provides specific functionalities:

- **Create**: This page allows users to create new content, such as posts, messages, or discussions within the chat application. It provides a form or interface for users to input their content and submit it to the system.

- **Explore**: The explore page offers users the ability to browse and discover new content or conversations within the chat application. It may include features such as trending topics, recommended chats, or popular posts to help users explore the platform.

- **Home**: The home page serves as the main landing page of the application. It typically displays personalized content, recent activity, or a feed of updates from users and groups that the user follows.

- **Login**: This page provides the interface for user authentication, allowing users to log in to their accounts. It typically includes input fields for username/email and password, along with options for password recovery or account creation.

- **Notifications**: The notifications page displays updates, alerts, or notifications relevant to the user's activity within the application. It informs users about new messages, mentions, friend requests, or other important events.

- **Profile**: The profile page showcases user profiles, displaying information such as bio, profile picture, and user preferences. It also allows users to edit their profile settings, update personal information, or manage privacy settings.

- **SignUp**: This page enables new users to register and create an account on the chat application. It typically includes a registration form with fields for username, email, password, and other necessary information.

- **UsersProfile**: The user profile page displays detailed information about other users on the platform. It may include their bio, recent activity, friends list, and other relevant details. Users can view each other's profiles to connect or interact within the application.

Each page contributes to the overall user experience of the chatmate application, providing essential features and functionalities for users to communicate, interact, and engage with the platform.

## Usage

1. Clone the repository.

```bash
git clone https://github.com/AliNikseresht/chatmate-messenger.git
Install dependencies using npm install.
Run development server using npm run dev.
Build the project using npm run build.
Preview the project using npm run preview.
```

Project Preview
You can view the project online at the following address:

[Chatmate Messenger](https://chatmate-messenger.vercel.app/)

This addition provides a convenient way for users to access the project online. If there's anything else you'd like to modify or include, just let me know!
