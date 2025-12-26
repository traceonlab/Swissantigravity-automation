#!/data/data/com.termux/files/usr/bin/sh
cd ~/automation-bot

# 1. إيقاف ngrok
pkill ngrok 2>/dev/null || killall ngrok 2>/dev/null || true

# 2. تثبيت pm2
npm install -g pm2

# 3. إنشاء تهيئة
mkdir -p ~/.pm2
echo '{
  "apps": [{
    "name": "swissgravity-bot",
    "script": "src/core.js",
    "cwd": "/data/data/com.termux/files/home/automation-bot"
  }]
}' > ~/.pm2/ecosystem.config.js

# 4. تشغيل البوت
pm2 delete swissgravity-bot 2>/dev/null || true
pm2 start ~/.pm2/ecosystem.config.js --only swissgravity-bot

# 5. ⚠️ عدل هذا السطر: ضع معرفك الحقيقي هنا 👇
YOUR_USER_ID="6350768064"  # ← 🔄 غيّر 123456789 إلى معرفك!

BOT_TOKEN=$(grep -o 'BOT_TOKEN=[^ ]*' .env | cut -d= -f2)

if [ -n "$BOT_TOKEN" ] && [ "$YOUR_USER_ID" != "123456789" ]; then
  curl -s "https://api.telegram.org/bot$BOT_TOKEN/sendMessage" \
    -d "chat_id=$YOUR_USER_ID" \
    -d "text=🟢 *SwissGravity Automation*\nبدأ التشغيل التلقائي في Termux.\nالوقت: $(date '+%d %B %Y، %H:%M')\n\n💎 traceonlab@gmail.com" \
    -d "parse_mode=Markdown" > /dev/null
fi

echo "✅ المصنع يعمل 24/7 — التنبيه أُرسل إلى تليجرام."
