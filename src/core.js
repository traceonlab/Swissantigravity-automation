require('dotenv').config();
const { Telegraf } = require('telegraf');
const { log } = require('../utils/logger');

if (!process.env.BOT_TOKEN) {
  console.error('❌ BOT_TOKEN مفقود في .env');
  process.exit(1);
}

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  const msg = `💎 *SwissGravity Automation*\nمرحبًا بك في المصنع.\n\n🛠️ أرسل: "أريد أتمتة نسخ احتياطي"\nأو جرّب: /help`;
  log(`Start by ${ctx.from.id}`, 'CMD');
  return ctx.replyWithMarkdown(msg);
});

bot.help((ctx) => {
  return ctx.replyWithMarkdown(`
🛠️ *الأوامر المتاحة*:
• /start — الترحيب
• /help — هذه القائمة
• /ping — فحص الاتصال
`);
});

bot.command('ping', (ctx) => {
  ctx.reply('✅ البوت شغال — جاهز للإنتاج.');
});

bot.launch().then(() => {
  log('✅ المصنع جاهز — البدء في الإنتاج', 'START');
  require('fs').writeFileSync('bot.pid', process.pid.toString());
});
