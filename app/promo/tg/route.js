const TELEGRAM_URL = 'https://t.me/+uw1ti8qXDetjYTBi';
const PIXEL_ID = '27749735947983607';

const html = String.raw`<!doctype html>
<html lang="hi">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
  <meta name="robots" content="noindex,nofollow,noarchive" />
  <meta name="theme-color" content="#07101f" />
  <title>JanaVada Telegram — बिजनेस और फाइनेंस अपडेट्स</title>
  <link rel="icon" href="/favicon.webp" />
  <script>
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init','${PIXEL_ID}');fbq('track','PageView');
  </script>
  <style>
    *{box-sizing:border-box}
    html,body{margin:0;min-height:100%;background:#070b17;color:#f8f8fb;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
    body{overflow-x:hidden;background:radial-gradient(circle at 50% -12%,rgba(100,72,255,.16),transparent 31%),linear-gradient(180deg,#111326 0%,#08101f 45%,#070b17 100%)}
    .bg{position:fixed;width:40vw;height:40vw;min-width:240px;min-height:240px;border-radius:50%;filter:blur(80px);opacity:.2;pointer-events:none;z-index:0;animation:drift 12s ease-in-out infinite alternate,hue 14s linear infinite}
    .bg.a{top:-18vw;left:-8vw;background:#8b5cf6}.bg.b{top:30%;right:-16vw;background:#10d9a4;animation-delay:-4s}.bg.c{bottom:-20vw;left:10vw;background:#ff416c;animation-delay:-8s}
    main{position:relative;z-index:1;width:min(100%,660px);min-height:100svh;margin:auto;padding:12px 16px 10px;display:flex;flex-direction:column;justify-content:center}
    .logoWrap{display:grid;place-items:center}.logoWrap img{width:78px;height:78px;border-radius:50%;object-fit:cover;border:4px solid #02040a;box-shadow:0 0 0 3px #9f6cff,0 0 22px rgba(255,88,130,.22),0 0 45px rgba(139,92,246,.18);animation:pulse 3s ease-in-out infinite}
    .pill{margin-top:9px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.035);padding:5px 10px;border-radius:999px;color:#b9c2d2;font-size:10px;backdrop-filter:blur(12px)}
    .kicker{text-align:center;margin-top:10px;color:#aeb8cb;font-weight:800;font-size:9px;letter-spacing:.15em}
    h1{text-align:center;margin:5px 0 0;font-size:clamp(29px,4.2vw,42px);line-height:1.02;letter-spacing:-.04em;font-weight:900}
    h1 span,h2 span{color:transparent;background:linear-gradient(100deg,#ff6d8c,#b678ff,#27d6a3,#ff7a6c,#ff6d8c);background-size:320% 320%;-webkit-background-clip:text;background-clip:text;animation:gradient 8s ease infinite}
    .sub{text-align:center;color:#a6afc1;font-size:13px;line-height:1.35;margin:8px auto 0;max-width:520px}.sub b{color:#fff}
    .proof{margin-top:10px;min-height:42px;display:grid;grid-template-columns:1fr auto 1fr auto 1fr;align-items:center;gap:7px;border:1px solid rgba(255,255,255,.14);border-radius:999px;background:rgba(255,255,255,.035);padding:7px 14px;backdrop-filter:blur(14px)}
    .proof>div{display:flex;gap:5px;justify-content:center;align-items:center;font-size:10px}.proof i{width:1px;height:20px;background:rgba(255,255,255,.14)}
    .topics{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:9px}
    .topics>div{min-height:72px;border:1px solid rgba(255,255,255,.14);border-radius:18px;background:linear-gradient(160deg,rgba(255,255,255,.06),rgba(255,255,255,.015));display:flex;align-items:center;justify-content:center;gap:8px;text-align:center;padding:8px}
    .topics em{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,rgba(255,89,132,.22),rgba(133,83,255,.18));font-style:normal;font-size:16px;flex:0 0 auto}.topics b{font-size:11px}
    section{margin-top:9px;padding:13px 15px 12px;border:1px solid rgba(255,255,255,.16);border-radius:20px;background:rgba(14,22,39,.82);box-shadow:0 18px 55px rgba(0,0,0,.2);backdrop-filter:blur(16px)}
    h2{font-size:17px;margin:0 0 9px;text-align:center}
    ul{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:1fr 1fr;gap:7px 14px}
    li{font-size:11px;line-height:1.25;color:#e7ebf3;white-space:normal}
    #tg{position:relative;overflow:hidden;margin-top:10px;min-height:58px;border-radius:18px;display:flex;align-items:center;justify-content:center;gap:8px;padding:11px 18px;text-decoration:none;color:#fff;background:linear-gradient(100deg,#1da9e8,#346bff,#8b5cf6,#e54c73,#1fc99c,#1da9e8);background-size:360% 360%;box-shadow:0 14px 40px rgba(49,134,255,.25),0 0 0 1px rgba(255,255,255,.28) inset;animation:gradient 8s ease infinite,cta 2.6s ease-in-out infinite;font-size:15px}
    #tg:before{content:"";position:absolute;inset:-100% auto -100% -35%;width:24%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.38),transparent);transform:rotate(15deg);animation:shine 3.2s ease-in-out infinite}
    .micro{margin-top:8px;display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
    .micro span{min-height:30px;border:1px solid rgba(255,255,255,.1);border-radius:999px;background:rgba(255,255,255,.025);display:flex;align-items:center;justify-content:center;text-align:center;font-size:9px;color:#cad2df;padding:5px}
    small{display:block;text-align:center;color:#707a8c;margin-top:7px;font-size:8px}
    @keyframes gradient{0%{background-position:0 50%}50%{background-position:100% 50%}100%{background-position:0 50%}}
    @keyframes hue{0%{filter:blur(80px) hue-rotate(0)}100%{filter:blur(80px) hue-rotate(360deg)}}
    @keyframes drift{from{transform:translate3d(-3%,-2%,0) scale(.95)}to{transform:translate3d(7%,7%,0) scale(1.14)}}
    @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.025)}}
    @keyframes cta{0%,100%{box-shadow:0 14px 40px rgba(49,134,255,.24)}50%{box-shadow:0 16px 52px rgba(228,76,115,.34)}}
    @keyframes shine{0%,20%{left:-35%;opacity:0}35%{opacity:1}60%,100%{left:120%;opacity:0}}
    @media(max-width:620px){
      main{width:min(100%,430px);padding:8px 10px 8px;justify-content:flex-start}
      .logoWrap img{width:62px;height:62px;border-width:3px}.pill{margin-top:6px;font-size:8.5px;padding:4px 8px}
      .kicker{margin-top:7px;font-size:8px}h1{margin-top:3px;font-size:clamp(25px,8.3vw,34px);line-height:1.01}.sub{font-size:11px;margin-top:6px}
      .proof{margin-top:7px;min-height:36px;padding:5px 8px;gap:4px}.proof>div{font-size:8px;gap:3px}.proof i{height:17px}
      .topics{gap:5px;margin-top:6px}.topics>div{min-height:58px;border-radius:15px;padding:5px 3px;gap:5px;flex-direction:column}.topics em{width:28px;height:28px;font-size:13px}.topics b{font-size:9px}
      section{margin-top:6px;padding:9px 10px 9px;border-radius:16px}h2{font-size:14px;margin-bottom:6px}ul{gap:5px 8px}li{font-size:9px;line-height:1.18}
      #tg{margin-top:7px;min-height:50px;border-radius:16px;padding:9px 10px;font-size:12px}.micro{margin-top:6px;gap:4px}.micro span{min-height:26px;font-size:7.8px;padding:4px 2px}small{font-size:7px;margin-top:5px}
    }
    @media(max-height:760px) and (min-width:621px){main{padding-top:7px;padding-bottom:7px}.logoWrap img{width:64px;height:64px}.pill{margin-top:6px}.kicker{margin-top:7px}h1{font-size:34px}.sub{margin-top:5px}.proof{margin-top:7px}.topics{margin-top:6px}.topics>div{min-height:62px}section{margin-top:6px;padding-top:10px;padding-bottom:9px}#tg{margin-top:7px;min-height:50px}.micro{margin-top:5px}small{margin-top:4px}}
  </style>
</head>
<body>
  <div class="bg a"></div><div class="bg b"></div><div class="bg c"></div>
  <main>
    <div class="logoWrap"><img src="/favicon.webp" alt="JanaVada"><div class="pill">✓ भारत-केंद्रित खबरें और विश्लेषण</div></div>
    <div class="kicker">✦ JANAVADA NEWS</div>
    <h1>भारत की <span>सबसे महत्वपूर्ण</span><br>बिजनेस और फाइनेंस अपडेट्स</h1>
    <p class="sub">हर दिन सिर्फ <b>5 मिनट</b> में समाचार नहीं, बल्कि <b>समझ</b>।</p>
    <div class="proof"><div>📈 <b>भारत-केंद्रित</b></div><i></i><div>✨ <b>EN + HI</b></div><i></i><div>🔔 <b>रोज़ अपडेट</b></div></div>
    <div class="topics"><div><em>📈</em><b>स्टॉक मार्केट</b></div><div><em>💼</em><b>बिजनेस</b></div><div><em>💳</em><b>पर्सनल फाइनेंस</b></div></div>
    <section><h2>हमारे <span>Telegram चैनल</span> में मिलेगा</h2><ul><li>✓ रोज़ाना बिजनेस और मार्केट अपडेट</li><li>✓ स्टॉक मार्केट का साफ़ विश्लेषण</li><li>✓ स्टार्टअप और फंडिंग की अहम खबरें</li><li>✓ अर्थव्यवस्था आसान भाषा में</li><li>✓ पर्सनल फाइनेंस की उपयोगी बातें</li><li>✓ निवेश से जुड़ी गहरी व्याख्या</li></ul></section>
    <a id="tg" href="${TELEGRAM_URL}">✈️ <strong>🚀 फ्री Telegram चैनल जॉइन करें</strong> →</a>
    <div class="micro"><span>🔒 100% मुफ़्त</span><span>🔔 रोज़ अपडेट</span><span>🎓 गहरा विश्लेषण</span></div>
    <small>केवल शैक्षिक एवं समाचार उद्देश्यों के लिए।</small>
  </main>
  <script>
    document.getElementById('tg').addEventListener('click',function(e){e.preventDefault();try{if(typeof fbq==='function')fbq('track','Lead',{content_name:'JanaVada Telegram Promo',content_category:'Telegram Channel'});window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:'telegram_lead',placement:'promo_tg',destination:'telegram'});}catch(_){}setTimeout(function(){location.href='${TELEGRAM_URL}'},180)});
  </script>
</body>
</html>`;

export async function GET() {
  return new Response(html, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=60, s-maxage=300',
      'x-robots-tag': 'noindex, nofollow, noarchive',
    },
  });
}
