# Projet JAVA & Ngrok avec Expo Go

Ce projet est une application utilisant **Java** pour le backend et **Ngrok** pour permettre un accès à l'API en ligne. Il nécessite un émulateur de téléphone ou l'application **Expo Go** pour le front-end sur un appareil physique.

## Prérequis

1. **Java** doit être installé.
2. **Ngrok** doit être installé et configuré.
3. Un émulateur de téléphone ou l'application **Expo Go** sur un téléphone physique.
4. **Node.js** et **npm** doivent être installés pour gérer les bibliothèques front-end.

## Instructions d'installation

### Front-end

1. Ouvrez un terminal dans le répertoire client.
2. Installez les dépendances en exécutant la commande suivante :

  ```bash
  npm install
  ```

3. Pour démarrer le front-end, exécutez :

  ```bash
  npm start
  ```

### Back-end

1. Ouvrez un terminal dans le répertoire serverJAVA.
2. Pour démarrer le back-end, exécutez: 

  ```bash
  mvn spring-boot:run
  ```

## Fichiers requis

### .env

Un fichier .env doit être créé dans le dossier client avec le chemin suivant : client/.env.

Exemple de contenu :

  EXPO_PUBLIC_NGROK_URL=""

### application.properties

Un fichier application.properties doit être créé dans le dossier avec le chemin suivant : /serverJAVA/src/main/resources/application.properties.

Exemple de contenu :

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

## Commandes utiles

### Installation des dépendances

Pour installer toutes les dépendances du projet, exécutez cette commande dans le dossier client

  ```bash
  npm install
  ```

### Démarrage du projet

Pour démarrer le front-end (dans le dossier client) :

  ```bash
  npm start
  ```

Pour démarrer le back-end (dans le dossier serverJAVA) :

  ```bash
  mvn spring-boot:run
  ```

## Configurations supplémentaires

### Configuration Ngrok

Ngrok doit être configuré pour permettre un accès à l'API du backend en ligne. Assurez-vous que l'URL Ngrok est correcte dans le fichier .env du client.

### Configuration MySQL

Le backend utilise MySQL pour la base de données. Les informations de connexion (URL, nom d'utilisateur, mot de passe) doivent être correctement définies dans le fichier application.properties.

### Configuration Twilio et Notify.EU

Si vous utilisez les services Twilio ou Notify.EU pour envoyer des notifications, assurez-vous d'ajouter les identifiants corrects dans application.properties.

## Fonctionnalités

- Base de données MySQL : Connexion et gestion via Spring Boot.
- JWT : Gestion des sessions sécurisées avec des tokens JWT.
- Twilio : Envoi de SMS pour des notifications.
- Notify.EU : Intégration pour l'envoi de notifications par email.

## Technologies Utilisées

- Java avec Spring Boot pour le backend
- Expo Go et React Native pour le frontend
- MySQL pour la base de données
- Ngrok pour exposer localement le serveur
- Twilio pour les notifications SMS
- Notify.EU pour les notifications email

## Auteurs

Pier-Alexandre - Développeur