# Pre-requisites
- node version 19.9.0
- pnpm 
# Getting started
- pnpm install
- pnpm dev

The project will start on:  http://localhost:3000/

# Info
- The project is bootstrapped with vite and pnpm. Entire codebase is within the src directory.
- Other dependencies used within the project are React Router , TailwindCSS, Typescript and for the data Supabase was utilized for Authentication & Other Data Operations.

- Folder Structure
   - components: This folder is used for keeping reusable components used within the projects.
   - constants: This folder is used for housing constants used across the project.
   - context: The context is used for sharing authentication provider to share session details across the app.
   - db: This folder houses the client provider for hooking up to the supabase backend.
   - features: The features folder contains per feature folder which are injected into pages.
   - hooks: This folder contains common hooks used.
   - layouts: This folder contains reusable layouts for different views.
   - pages: The pages directory has pages per feature.
   - router: The routing for the app is handled in this folder.
   - services: This folder contains the api endpoints per feature-service to abstract api logic.
   - types: This folder contains the types per-feature
   - utils: Utils contains common utility/ helper methods. 