# Thinkerly - A Focus App 👋

This application focuses on improving productivity using timers to keep exclusive times for focusing on a single task.

## Installation and running the application

1. Clone the repository

    ```bash
    git clone https://github.com/itsKia2/Thinkerly.git
    cd Thinkerly
    ```

2. Install dependencies

    ```bash
    npm install
    ```

Also make sure that Android Emulator (Android Studio/SDK) OR XCode (iOS) to run this application on your computer.

3. Start the app

    ```bash
     npx expo start --go
    ```

Choose from the options (Android/iOS/ExpoGo) to open the desired platform and running the application.

## Compiling into .apk

1. Ensure dependancies are installed

> eas-cli

> expo-client-dev

Now run the following commands

```bash
npx eas-cli build --profile production --platform {platform}
```

Replace `{platform}` with either 'android' or 'ios'.

Optionally, use the `--local` flag to compile the .apk on your own device instead of [expo.dev](expo.dev) servers.

This command will ask you to log into your Expo account.
The resulting .apk will be in your current directory.
