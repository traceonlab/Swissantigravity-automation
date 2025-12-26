kconst { check } = require('../factory/ethics');
const { crystalMessage, rtl } = require('../ui/crystal');

function registerEthics(bot) {
  bot.command('check', (ctx) => {
    const desc = ctx.message.text.split(' ').slice(1).join(' ');
    if (!desc) {
      return ctx.reply('💡 استخدم: /check "وصف الأتمتة"\nمثال: /check أريد نسخ احتياطي يومي');
    }

    const res = check(desc);
    let color = 'info';
    if (res.verdict === 'forbidden') color = 'warning';
    if (res.verdict === 'encouraged') color = 'success';

    const content = rtl(`
<b>الوصف:</b> ${desc}

${res.msg}
${res.ayah ? `\n${res.ayah}` : ''}
`);

    ctx.reply(crystalMessage('⚖️ العقد الأخلاقي', content, color), {
      parse_mode: 'HTML'
    });
  });
}

module.exports = { registerEthics };
