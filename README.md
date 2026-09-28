# EIRA Mental Health App - Fixed v5

## Run without VS Code
1. Extract this folder.
2. Open Terminal or Command Prompt in the project folder.
3. Run `npm install`.
4. Create `.env.local` from `.env.example` and set your `GEMINI_API_KEY`:
   ```bash
   cp .env.example .env.local
   ```
5. Run `npm run dev`.
6. Open http://localhost:3000

## Authentication
- Sign up with name, email, phone and password.
- The app creates a local account in `data/db.json` and logs the user in.
- Login uses the same account.
- The navbar changes to the logged-in user's name/email and shows **LOG OUT**.
- Profile supports Edit Profile and Save Changes.
- Logout clears the session and returns to Login.

## Functional areas
- Home navigation and mood selection
- Services navigation
- AI chat (Google Gemini API — fast, student-first mental wellness companion)
- Journal save (requires login)
- Peer group tabs, join/leave and create-group demo
- Wellness games
- Mental wellness quizzes
- Doctor selection and booking demo
- Campus login/signup links, event actions and resource links
- Support call/chat/scheduling actions

## Google Gemini Chatbot Setup

EIRA uses the official Google Gemini API (`gemini-1.5-flash`) through a secure server-side API route. The API key is kept strictly on the backend and never exposed to client browsers.

### Configuration
1. Get a Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Add your key to `.env.local`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
3. (Optional) Customize the Gemini model:
   ```env
   GEMINI_MODEL=gemini-1.5-flash
   ```

## Notes
This is a local demo backend using a JSON file. For production, replace the JSON database and session-token approach with a real database/auth provider and HTTPS.
