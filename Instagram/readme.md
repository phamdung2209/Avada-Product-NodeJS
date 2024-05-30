# Mageplaza Tiktok Feed

> Application tag line describe here

## Preparation

* [A Firebase account](https://firebase.google.com/)

* A Firebase project

* [A Shopify partner account](https://www.shopify.com/partners)

* A Shopify app in partner account

## Installation

* Choose a project staging for Firebase application

```bash
firebase use --add
```

* Configure all settings for Firebase development environment by create a new file `.runtimeconfig.json` inside the `packages/functions`

```json
{
  "shopify": {
    "api_key": "<Shopify API Key>",
    "secret": "<Shopify Secret>",
    "firebase_api_key": "<Firebase API Key>"
  },
  "app": {
    "base_url": ""
  }
}
```

* Create a file `.env.development` with content in [packages/assets](/packages/assets)

```dotenv
SHOPIFY_API_KEY=<Insert here>
FIREBASE_API_KEY=<Insert here>
FIREBASE_AUTH_DOMAIN=<Insert here>
FIREBASE_PROJECT_ID=<Insert here>
FIREBASE_STORAGE_BUCKET=<Insert here>
FIREBASE_APP_ID=<Insert here>
FIREBASE_MEASUREMENT_ID=<Insert here>
```

* Create an empty Firestore database
* Deploy the Firestore default indexes
```bash
firebase deploy --only firestore
```

## Development

* To start to develop, please run 2 below commands

```bash
npm run start-dev
```

```bash
GOOGLE_APPLICATION_CREDENTIALS=<Path to service-account.json> firebase serve
```

## Lint

* All your files must be passed [ESLint](https://eslint.org/):

To setup a git hook before committing to Gitlab, please run:

```bash
cp git-hooks/pre-commit .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit
```

## Where you can see all function logs

* You can see all logs from your functions by follow commands

```bash
firebase functions:log
```

* You also view in Web interface by access

![View all logs from Firebase web interface](https://i.imgur.com/SLYqnhS.png)

## Common issues

### When you open an embedded app in local, it can throw an error like that

![Content Security Policy Error](https://raw.githubusercontent.com/baorv/faster-shopify-dev/master/screenshot.png)

**Solution**

Install [Disable Content-Security-Policy (CSP)](https://chrome.google.com/webstore/detail/disable-content-security/ieelmcmcagommplceebfedjlakkhpden) to disable CSP in Chromium browers

### I got message `Unauthorized` after authentication

**Solution**

Go `https://console.firebase.google.com/u/0/project/{project-id}/settings/serviceaccounts/adminsdk`

Click `Generate new private key`

Use command to export global environment

```bash
export GOOGLE_APPLICATION_CREDENTIALS=<Path to service-account.json>
```

### I got message `PERMISSION_DENIED: Missing or insufficient permissions`

**Solution**

Enable permission `Service Account Token Creator` for `user@appspot.gserviceaccount.com`

![Enable Permission for appspot](https://firebasestorage.googleapis.com/v0/b/pdf-invoice-4717c.appspot.com/o/images%2Fdev-docs%2Fiam_enable_jwt_creator.png?alt=media&token=ea1a3c08-64e2-4519-a6fc-81620249dbbd)

### I can't see `FIREBASE_MEASUREMENT_ID` in Firebase project

**Solution**

You can enable Analytics for your project from Firebase project

![Enable Google Analytics on your app](https://firebasestorage.googleapis.com/v0/b/avada-development.appspot.com/o/images%2Fscreenshots%2Fenable_analytics.png?alt=media&token=559669e1-65d5-4e7b-b2dd-ce82517a262e)

## TODO

- [ ] Add testing
- [x] CI/CD
- [ ] Add document
