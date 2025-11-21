# Deploying to Render

Follow these steps to deploy the app (server + client) to Render using a single Web Service that serves the built React app and provides the API.

1) Create a Git repository and push

- At repo root (contains `client/` and `server/`) create a git repo, commit, and push to GitHub.

Windows PowerShell example:

```
cd path\to\kanha_national_park
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/<your-user>/<your-repo>.git
git push -u origin main
```

2) Create a new Web Service on Render

- In Render dashboard create a new "Web Service".
- Connect to your GitHub repo and select the branch (e.g. `main`).
- Set the `Root Directory` to `server` (very important).
- Build Command: `npm run build` (this runs the `build` script in `server/package.json`, which builds the client)
- Start Command: `npm start`
- Environment: Node 16+ (choose the runtime Render recommends)

3) Add required Environment Variables in Render

- In the Render service settings (Environment > Environment Variables) add:
  - `SMTP_USER` = your gmail address (or SMTP username)
  - `SMTP_PASS` = your app-specific password or SMTP password

Note: For Gmail you should create an App Password (if using 2FA) or use a proper transactional mail provider (SendGrid, Mailgun) for production.

4) Confirm build output and static serving

- The server expects the built React app at `../client/build` relative to `server` during build; the server serves files from `../client/build` at runtime.
- When Render runs `npm run build` in `server`, the `server` script executes `npm --prefix ../client install && npm --prefix ../client run build` which installs and builds the React app into `client/build`.

5) Test the deployed app

- Open the Render service URL. The React app should load and the form POST to `/send` will hit the server API.
- Check the service logs in Render for build or runtime errors.

6) Troubleshooting

- If you see 500 errors when sending the form, check that `SMTP_USER` and `SMTP_PASS` are set.
- If static files 404, confirm `Root Directory` was set to `server` and the build step ran successfully.
- For CORS issues (if you ever host client separately), set `CLIENT_ORIGIN` and update `server.js` to use it.

7) (Optional) Deploy client separately as a Static Site

- If you prefer two Render services, create a Static Site for the `client` folder and a Web Service for the `server` folder. Then set the client to call the server's URL (replace `fetch('/send')` with the server full URL or use an env var at build time).
