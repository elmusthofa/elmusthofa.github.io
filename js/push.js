var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BC5bLyKuPVppKNH5DaysfCFAq7tYjs9RAWO9yZa1Zhkh9oQ6rWIsKWFs5WVOzk1U-ekKClJJu9A0ndwIeRqfNoY",
    "privateKey": "8FlFQerYL8pk_odCp66Y62dVVJZ1sGC0zx0ZJYlpExE"
};

webPush.setVapidDetails(
    'mailto:hyunjee212@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fLetVVCjUcA:APA91bGBUHcH0J2SzS4gtAsLdO4mrzTxEdW2RkLnNx6Z3LKtTnHnJAccXRZNfe_xtFrsGfhX1WOvuL5w8FP2Tfo-FoPJBEp9ika74UHGpGdWf2kbPNjiJ-tBscpq6AEk_oGw3SyytC1n",
    "keys": {
        "p256dh": "BPIebZxlDRXe9qszPopGmfhx1CQkaAK++SSgv5thlouqttuXhvMizeR5Svubc8WwvCs9G+YG2NWgFIv0D4idz1E=",
        "auth": "oh5JWE607JAE2HD6MFtx6Q=="
    }
};

var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notification!';

var options = {
    gcmAPIKey: '1070584621428',
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);