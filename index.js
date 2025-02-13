const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

// ایجاد یک نمونه از کلاینت واتساپ
const client = new Client({
    authStrategy: new LocalAuth()
});

// تنظیم پیام‌های خودکار
const autoReplies = {
    'سلام': 'سلام! چطور میتونم کمکتون کنم؟',
    'قیمت': 'برای دریافت لیست قیمت‌ها لطفا با شماره 123456789 تماس بگیرید.',
    'ساعت کاری': 'ساعت کاری ما از شنبه تا پنجشنبه از ساعت 9 صبح تا 6 عصر می‌باشد.'
};

// نمایش QR کد برای اتصال
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('QR کد را با واتساپ خود اسکن کنید');
});

// وقتی کلاینت آماده شد
client.on('ready', () => {
    console.log('کلاینت با موفقیت متصل شد!');
});

// گوش دادن به پیام‌های جدید
client.on('message', async msg => {
    const messageText = msg.body.toLowerCase();

    // بررسی پیام‌های دریافتی و ارسال پاسخ خودکار
    for (const [trigger, response] of Object.entries(autoReplies)) {
        if (messageText.includes(trigger.toLowerCase())) {
            try {
                await msg.reply(response);
                console.log(`پاسخ خودکار برای "${trigger}" ارسال شد`);
            } catch (error) {
                console.error(`خطا در ارسال پاسخ: ${error}`);
            }
            break;
        }
    }
});

// اتصال به واتساپ
client.initialize();


