# Rocket Food Delivery

This project is an application using **Java** for the backend and **Ngrok** to enable online access to the API. It requires a phone emulator or the **Expo Go** app for the front-end on a physical device.

## Prerequisites

1. **Java** must be installed.
2. **Ngrok** must be installed and configured.
3. A phone emulator or the **Expo Go** app on a physical phone.
4. **Node.js** and **npm** must be installed to manage the front-end libraries.

## Installation Instructions

### Front-end

1. Open a terminal in the client directory.
2. Install the dependencies by running the following command:

  ```bash
  npm install
  ```

3. To start the front-end, run:

  ```bash
  npm start
  ```

### Back-end

1. Open a terminal in the serverJAVA directory.
2. To start the back-end, run:

  ```bash
  mvn spring-boot:run
  ```

## Required Files

### .env

A .env file must be created in the client folder with the following path: client/.env.

Example content:
  ```bash
  EXPO_PUBLIC_NGROK_URL=""
  ```

### application.properties

An application.properties file must be created in the folder with the following path: /serverJAVA/src/main/resources/application.properties.

Example content:

  ```bash
  # Database Configuration
  spring.datasource.url=
  spring.datasource.username=
  spring.datasource.password=
  spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

  # JPA and Hibernate Configuration
  spring.jpa.hibernate.ddl-auto=update
  spring.jpa.show-sql=true
  hibernate.hbm2ddl.auto=create-drop
  hibernate.show_sql=true
  spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect

  # Thymeleaf Configuration
  spring.thymeleaf.cache=false

  # Application-specific Configuration
  app.jwt.secret=!*jwtToken*!

  # Spring Profile Configuration
  spring.profiles.active=manual-seeding

  # DevTools Configuration
  spring.devtools.restart.enabled=true
  spring.devtools.restart.additional-paths=src/main/java
  spring.devtools.restart.exclude=**/*.xml,**/*.properties

  # Twilio Configuration
  twilio.account.sid=""
  twilio.auth.token=""
  twilio.phone.number=""

  # Notify.EU Configuration
  notify.secret.key=""
  notify.client.id=""
  notify.template.id=""
  ```

## Useful Commands

### Installing dependencies

To install all the project dependencies, run this command in the client folder:

  ```bash
  npm install
  ```

### Starting the project

To start the front-end (in the client folder):

  ```bash
  npm start
  ```

To start the back-end (in the serverJAVA folder):

  ```bash
  mvn spring-boot:run
  ```

## Additional Configurations

### Ngrok Configuration

Ngrok must be configured to allow online access to the backend API. Make sure the Ngrok URL is correct in the client’s .env file.

### MySQL Configuration

The backend uses MySQL for the database. The connection information (URL, username, password) must be correctly set in the application.properties file.

### Twilio and Notify.EU Configuration

If you're using Twilio or Notify.EU services to send notifications, make sure to add the correct credentials in application.properties.

## Features

- MySQL Database: Connection and management via Spring Boot.
- JWT: Secure session management using JWT tokens.
- Twilio: SMS notifications.
- Notify.EU: Email notifications integration.

## Technologies Used

- Java with Spring Boot for the backend
- Expo Go and React Native for the frontend
- MySQL for the database
- Ngrok to expose the local server
- Twilio for SMS notifications
- Notify.EU for email notifications

## Authors

Pier-Alexandre - Developer
