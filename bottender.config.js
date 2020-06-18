module.exports = {
  session: {
    driver: 'memory',
    stores: {
      memory: {
        maxSize: 500,
      },
      file: {
        dirname: '.sessions',
      },
      redis: {
        port: 6379,
        host: '127.0.0.1',
        password: 'auth',
        db: 0,
      },
      mongo: {
        url: 'mongodb://localhost:27017',
        collectionName: 'sessions',
      },
    },
  },
  initialState: {},
  channels: {
    messenger: {
      enabled: true,
      path: '/webhooks/messenger',
      pageId: process.env.MESSENGER_PAGE_ID,
      accessToken: process.env.MESSENGER_ACCESS_TOKEN,
      appId: process.env.MESSENGER_APP_ID,
      appSecret: process.env.MESSENGER_APP_SECRET,
      verifyToken: process.env.MESSENGER_VERIFY_TOKEN,
      profile: {
        greeting: [
          {
            locale: 'default',
            text: 'Hello {{user_first_name}}! Welcome to my bot~ ?',
          },
        ],
        getStarted: {
          payload: 'GET_STARTED',
        },
        persistentMenu: [
          {
            locale: 'default',
            composerInputDisabled: false,
            callToActions: [
              {
                type: 'web_url',
                title: '🏛 Home',
                url: 'https://finfine.jp.ngrok.io/',
                webviewHeightRatio: "full"
              },
              {
                type: 'web_url',
                title: '💲 Wallet',
                url: 'https://finfine.jp.ngrok.io/',
                webviewHeightRatio: "full"
              },
              {
                type: 'postback',
                title: '🔀 Share',
                payload: 'SHARE',
              },
            ],
          },
        ],
      },
    },

    telegram: {
      enabled: true,
      path: '/webhooks/telegram',
      accessToken: process.env.TELEGRAM_ACCESS_TOKEN,
    },
  },
}