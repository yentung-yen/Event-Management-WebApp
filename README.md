# Event Management Web App

This is a Node.js-based web application for event management, featuring API endpoints, real-time translation using Google Cloud Translation, and text-to-speech capabilities using Google Cloud Text-to-Speech.

## Features

- **Angular Frontend**: Built using Angular framework.
- **Express.js Backend**: Handles routing and API requests.
- **MongoDB Database**: Stores event, category, and statistics data.
- **Socket.io**: Enables real-time translation and text-to-speech functionality.
- **Google Cloud Services**:
  - Translation API for multilingual support.
  - Text-to-Speech API for generating speech from text.

## Installation

### Prerequisites
- **Angular CLI** (Ensure you have Angular CLI installed globally using `npm install -g @angular/cli`)
- **Node.js** (Ensure you have Node.js installed)
- **MongoDB** (Local or cloud-hosted)
- **Google Cloud Service Account Key** (For Translation & Text-to-Speech APIs)

### Setup

1. **Clone the repository**:
   ```sh
   git clone https://github.com/yentung-yen/Event-Management-App.git
   cd Event-Management-App
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Set up MongoDB**:
   - Ensure MongoDB is running on `mongodb://127.0.0.1:27017/event-management-webapp`
   - Update the connection URL in `app.js` if needed.

4. **Configure Google Cloud API**:
   - Place your Google Cloud service account key file in the root directory.

5. **Build the Angular frontend**:
   ```sh
   ng build
   ```

6. **Start the server**:
   ```sh
   node app.js
   ```

7. **Access the application**:
   - Frontend: `http://localhost:8888`

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Real-time Communication**: Socket.io
- **Google Cloud APIs**: Translation, Text-to-Speech
- **Frontend**: Angular, served via `dist/event-management-webapp`

---

# Angular Documentation
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.