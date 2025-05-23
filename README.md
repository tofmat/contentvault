# ContentVault

Meet ContentVault - your digital treasure chest! 🎁 This app helps you collect and organize all your favorite stuff from the internet in one magical place. Whether it's cool articles, fun videos, or interesting links, just click once to save them into your own custom folders. Think of it as your personal digital library, but way more fun and organized! 🌟

The platform aims to integrate with browser share functionality, allowing for one-click content saving directly from any 
webpage or application.

## Features of the mobile app

- Save content from any app and socials using the share sheet
- Organize content in custom folders with icons
- Search through your saved content
- Beautiful animations and transitions
- Google authentication
- Cross-platform (iOS & Android)

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Vite
- Expo CLI
- Supabase account
- Google Cloud Console project (for OAuth)

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/content-vault.git
cd content-vault
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your_google_web_client_id
```

4. Set up Supabase:
   - Create a new project in Supabase
   - Create the following tables:
     - `folders` (id, name, icon, parent_id, user_id, created_at)
     - `contents` (id, url, title, description, thumbnail_url, folder_id, user_id, created_at, metadata)
   - Enable Google OAuth in Authentication settings

5. Set up Google OAuth:
   - Create a project in Google Cloud Console
   - Enable Google Sign-In API
   - Create OAuth 2.0 credentials
   - Add your app's bundle identifier/package name
   - Add authorized redirect URIs from Supabase

## Development

1. Start the development server:
```bash
npm start
```

2. Run on iOS:
```bash
npm run ios
```

3. Run on Android:
```bash
npm run android
```

## Building for Production

1. Configure app.json with your bundle identifier/package name

2. Build for iOS:
```bash
eas build --platform ios
```

3. Build for Android:
```bash
eas build --platform android
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [Supabase](https://supabase.io/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [Moti](https://moti.fyi/)
# contentvault
# content-vault-web
# content-vault-web
