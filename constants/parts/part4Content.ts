import { Part, ContentType } from '../../types';

export const part4Content: Part = {
  id: "p4",
  partTitle: "الباب الرابع: الأمان والتحصين المتقدم",
  icon: "🛡️",
  chapters: [
     {
        id: "p4_c1", chapterTitle: "الفصل الأول: تأمين Nginx بـ SSL/TLS",
        sections: [
            {
              id: "p4_c1_s1",
              icon: "🔒",
              title: "المستوى 75: مقدمة إلى HTTPS وتشفير TLS/SSL",
              content: [
                { type: ContentType.PARAGRAPH, text: "حتى الآن، كل حركة المرور بين مستخدمينا وخادمنا تنتقل كنص عادي عبر بروتوكول HTTP. هذا يعني أن أي شخص على الشبكة (مثل مزود خدمة الإنترنت، أو شخص على نفس شبكة Wi-Fi العامة) يمكنه اعتراض وقراءة كل شيء: كلمات المرور، البيانات الشخصية، ملفات تعريف الارتباط للجلسات. في عالم اليوم، هذا غير مقبول على الإطلاق. الحل هو HTTPS (بروتوكول نقل النص الفائق الآمن)." },
                { type: ContentType.PARAGRAPH, text: "HTTPS هو ببساطة HTTP مع طبقة أمان إضافية فوقه تسمى TLS (Transport Layer Security)، والتي كانت تُعرف سابقًا باسم SSL (Secure Sockets Layer). TLS يوفر ثلاث ضمانات أمنية حيوية:" },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "التشفير (Encryption)", definition: "يتم تشفير جميع البيانات المتبادلة بين المتصفح والخادم. إذا اعترضها أي شخص، فسيراها كبيانات عشوائية غير قابلة للقراءة بدون مفتاح فك التشفير." },
                    { term: "المصادقة (Authentication)", definition: "يستخدم الخادم شهادة SSL/TLS ليثبت للمتصفح أنه هو الخادم الحقيقي لـ `your_domain.com` وليس منتحلاً. هذا يمنع هجمات 'الوسيط' (Man-in-the-Middle)." },
                    { term: "السلامة (Integrity)", definition: "يتم التحقق من أن البيانات لم يتم تعديلها أو العبث بها أثناء النقل. يتم إرفاق توقيع رقمي مع كل رسالة، وأي تغيير بسيط سيؤدي إلى فشل التحقق من التوقيع." }
                ]},
                { type: ContentType.NOTE, title: "أكثر من مجرد أمان", text: "في عام 2024، لم يعد HTTPS خيارًا. متصفحات الويب الحديثة مثل Chrome و Firefox تحذر المستخدمين بوضوح من المواقع التي لا تستخدم HTTPS وتصفها بأنها 'غير آمنة'. علاوة على ذلك، تعطي محركات البحث مثل Google دفعة في الترتيب للمواقع التي تستخدم HTTPS. لذا، فإن تمكين HTTPS ضروري للثقة والأمان وتجربة المستخدم وتحسين محركات البحث (SEO)." },
              ]
            },
            {
              id: "p4_c1_s2",
              icon: "📜",
              title: "المستوى 76: الحصول على شهادة SSL مجانية من Let's Encrypt مع Certbot",
              content: [
                { type: ContentType.PARAGRAPH, text: "في الماضي، كانت شهادات SSL باهظة الثمن ومعقدة في التركيب. لقد غيرت Let's Encrypt كل ذلك. Let's Encrypt هي هيئة إصدار شهادات (CA) غير ربحية توفر شهادات SSL/TLS مجانية وموثوقة من قبل جميع المتصفحات الرئيسية. هدفها هو تشفير الويب بأكمله." },
                { type: ContentType.PARAGRAPH, text: "الأداة التي نستخدمها للتفاعل مع Let's Encrypt تسمى Certbot. Certbot هو عميل يقوم بأتمتة عملية طلب الشهادات وتثبيتها وتجديدها بالكامل. إنه سهل الاستخدام بشكل لا يصدق." },
                { type: ContentType.HEADING4, text: "تثبيت Certbot ومكون Nginx الإضافي" },
                { type: ContentType.PARAGRAPH, text: "توصي Let's Encrypt بتثبيت Certbot باستخدام `snapd` لضمان الحصول دائمًا على أحدث إصدار." },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "تثبيت Certbot", code: `sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot`, explanations: [
                    { lines: "1", explanation: "نقوم بتثبيت حزمة Certbot `snap`. الخيار `--classic` يسمح لها بالوصول إلى نظام الملفات خارج بيئتها المعزولة، وهو أمر ضروري لتعديل تكوينات Nginx." },
                    { lines: "2", explanation: "نقوم بإنشاء رابط رمزي لجعل أمر `certbot` متاحًا عالميًا في النظام." }
                ]},
                { type: ContentType.HEADING4, text: "طلب الشهادة" },
                { type: ContentType.PARAGRAPH, text: "قبل تشغيل Certbot، هناك شرطان أساسيان:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "يجب أن يكون لديك اسم نطاق مسجل وموجه إلى عنوان IP العام لخادمك.",
                    "يجب أن يكون لديك كتلة خادم Nginx مكونة بالفعل لهذا النطاق (كما فعلنا في الباب الثاني)."
                ]},
                { type: ContentType.PARAGRAPH, text: "الآن، يمكننا تشغيل Certbot. المكون الإضافي لـ Nginx سيقوم بكل العمل الشاق." },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "تشغيل Certbot", code: `sudo certbot --nginx -d your_domain.com -d www.your_domain.com`, explanations: [
                    { lines: "1", explanation: "`--nginx`: يخبر Certbot باستخدام المكون الإضافي لـ Nginx، الذي سيكتشف تلقائيًا تكويناتك ويعدلها." },
                    { lines: "1", explanation: "`-d your_domain.com -d www.your_domain.com`: نحدد جميع النطاقات والنطاقات الفرعية التي نريد تضمينها في الشهادة." }
                ]},
                { type: ContentType.PARAGRAPH, text: "سيقوم Certbot بطرح بعض الأسئلة عليك، مثل عنوان بريدك الإلكتروني (لإشعارات انتهاء الصلاحية) والموافقة على شروط الخدمة. الأهم من ذلك، أنه سيسألك عما إذا كنت تريد إعادة توجيه كل حركة مرور HTTP إلى HTTPS. اختر الخيار 2 (Redirect). هذا هو الخيار الموصى به." },
                { type: ContentType.PARAGRAPH, text: "إذا نجح كل شيء، فسيقوم Certbot بتهنئتك ويخبرك بمكان حفظ شهاداتك (عادة في `/etc/letsencrypt/live/your_domain.com/`). لقد قمت للتو بتأمين موقعك بشهادة SSL صالحة!" },
              ]
            },
            {
              id: "p4_c1_s3",
              icon: "⚙️",
              title: "المستوى 77: تكوين Nginx لاستخدام شهادات SSL",
              content: [
                { type: ContentType.PARAGRAPH, text: "عندما تقوم بتشغيل `certbot --nginx`، فإنه يقوم بتعديل ملف تكوين Nginx الخاص بك تلقائيًا. في حين أن هذا مريح، فمن الضروري أن تفهم ما هي التغييرات التي أجراها بالضبط. هذا يزيل الغموض ويمنحك القدرة على تصحيح الأخطاء أو تخصيص التكوين في المستقبل." },
                { type: ContentType.PARAGRAPH, text: "دعنا نفحص ملف `/etc/nginx/sites-available/your_domain` بعد تشغيل Certbot. ستلاحظ أنه أصبح أطول بكثير. لقد تم تقسيمه إلى كتلتين `server`." },
                { type: ContentType.HEADING4, text: "كتلة الخادم الأولى: إعادة التوجيه من HTTP إلى HTTPS" },
                { type: ContentType.CODE_EXPLANATION, language: "nginx", codeTitle: "كتلة إعادة التوجيه", code: `server {
    listen 80;
    server_name your_domain.com www.your_domain.com;
    return 301 https://$server_name$request_uri;
}`, explanations: [
                    { lines: "2-3", explanation: "لا تزال هذه الكتلة تستمع على المنفذ 80 (HTTP) لنطاقاتك." },
                    { lines: "4", explanation: "هذا هو التغيير الرئيسي. بدلاً من خدمة أي محتوى، فإنها تستجيب على الفور بإعادة توجيه دائمة (301) إلى نفس عنوان URL ولكن باستخدام مخطط `https`." }
                ]},
                { type: ContentType.HEADING4, text: "كتلة الخادم الثانية: تكوين SSL/TLS" },
                { type: ContentType.CODE_EXPLANATION, language: "nginx", codeTitle: "كتلة HTTPS", code: `server {
    listen 443 ssl http2;
    server_name your_domain.com www.your_domain.com;

    ssl_certificate /etc/letsencrypt/live/your_domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your_domain.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # ... The rest of your configuration (root, location, proxy_pass, etc.)
    # now lives inside this block.
}`, explanations: [
                    { lines: "2", explanation: "`listen 443 ssl`: يخبر Nginx بالاستماع على المنفذ 443 (المنفذ القياسي لـ HTTPS) وتفعيل SSL/TLS على هذا المنفذ. `http2` يقوم بتمكين بروتوكول HTTP/2، وهو أسرع وأكثر كفاءة." },
                    { lines: "5", explanation: "`ssl_certificate`: يحدد المسار إلى ملف شهادتك العامة. `fullchain.pem` يحتوي على شهادتك بالإضافة إلى الشهادات الوسيطة اللازمة." },
                    { lines: "6", explanation: "`ssl_certificate_key`: يحدد المسار إلى مفتاحك الخاص. هذا الملف حساس ويجب أن يكون محميًا." },
                    { lines: "7", explanation: "يقوم Certbot بإنشاء هذا الملف الذي يحتوي على إعدادات أمان TLS موصى بها (مثل الأصفار القوية والبروتوكولات الآمنة). استخدام `include` هنا يبقي تكوينك الرئيسي نظيفًا." },
                    { lines: "8", explanation: "يحدد ملفًا لمعلمات Diffie-Hellman، وهو ضروري لـ Perfect Forward Secrecy." }
                ]},
                { type: ContentType.NOTE, title: "التحقق من الصحة", text: "بعد تشغيل Certbot، قم بزيارة موقعك باستخدام `https://your_domain.com`. يجب أن ترى قفلًا في شريط العناوين بالمتصفح. يمكنك أيضًا استخدام أدوات عبر الإنترنت مثل 'SSL Labs SSL Test' للحصول على تقرير مفصل حول قوة تكوين TLS الخاص بك." },
              ]
            },
            {
              id: "p4_c1_s4",
              icon: "🔄",
              title: "المستوى 78: أتمتة تجديد شهادات Let's Encrypt",
              content: [
                { type: ContentType.PARAGRAPH, text: "شهادات Let's Encrypt صالحة لمدة 90 يومًا فقط. هذا التصميم المتعمد يشجع على الأتمتة ويقلل من الضرر الناجم عن اختراق المفاتيح. الخبر السار هو أن Certbot يجعل عملية التجديد مؤتمتة بالكامل. لا تحتاج إلى القيام بأي شيء يدويًا بعد الإعداد الأولي." },
                { type: ContentType.HEADING4, text: "كيف يعمل التجديد؟" },
                { type: ContentType.PARAGRAPH, text: "عندما تقوم بتثبيت حزمة Certbot (خاصة من `snap` أو مستودعات أوبونتو)، فإنها تقوم تلقائيًا بإنشاء مهمة مجدولة ستعمل مرتين يوميًا. يمكن أن تكون هذه المهمة إما `cron job` في `/etc/cron.d/certbot` أو مؤقت `systemd`." },
                { type: ContentType.PARAGRAPH, text: "يمكنك رؤية مؤقت `systemd` باستخدام:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo systemctl list-timers` },
                { type: ContentType.PARAGRAPH, text: "ابحث عن سطر يحتوي على `certbot.timer`." },
                { type: ContentType.PARAGRAPH, text: "عندما تعمل هذه المهمة، فإنها تقوم بتشغيل أمر `certbot renew`. هذا الأمر يفعل ما يلي:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "يفحص جميع الشهادات المثبتة على الخادم.",
                    "يتحقق من تاريخ انتهاء صلاحية كل شهادة.",
                    "إذا كانت الشهادة ستنتهي في غضون 30 يومًا، فإنه سيحاول تجديدها.",
                    "إذا لم تكن الشهادة قريبة من انتهاء الصلاحية، فإنه لا يفعل شيئًا."
                ]},
                { type: ContentType.HEADING4, text: "إجراء 'تشغيل جاف' للتجديد" },
                { type: ContentType.PARAGRAPH, text: "للتأكد من أن عملية التجديد تعمل بشكل صحيح دون انتظار 60 يومًا، يمكنك إجراء محاكاة. لن يقوم هذا بتجديد الشهادة فعليًا، ولكنه سيقوم بجميع الخطوات للتحقق من أن كل شيء على ما يرام." },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo certbot renew --dry-run` },
                { type: ContentType.PARAGRAPH, text: "إذا انتهى هذا الأمر بنجاح، يمكنك أن تطمئن إلى أن شهاداتك سيتم تجديدها تلقائيًا عندما يحين الوقت." },
                { type: ContentType.NOTE, title: "إعادة تحميل Nginx", text: "جزء مهم من أمر `certbot renew` هو أنه يحتوي على 'خطاف' (hook) مدمج. بعد تجديد الشهادة بنجاح، سيقوم تلقائيًا بتشغيل `sudo systemctl reload nginx` (أو ما يعادله) للتأكد من أن Nginx يبدأ في استخدام الشهادة الجديدة دون أي توقف في الخدمة." },
              ]
            },
            {
              id: "p4_c1_s5",
              icon: "✨",
              title: "المستوى 79: تحسين أمان وأداء TLS",
              content: [
                { type: ContentType.PARAGRAPH, text: "الحصول على قفل أخضر هو البداية فقط. يمكننا، ويجب علينا، تحسين تكوين TLS الخاص بنا ليكون أكثر أمانًا وأداءً. ملف `options-ssl-nginx.conf` الذي أنشأه Certbot يوفر أساسًا ممتازًا، ولكن فهم هذه التوجيهات المتقدمة سيجعلك مسؤول نظام أكثر كفاءة." },
                { type: ContentType.HEADING4, text: "مجموعات التشفير (Cipher Suites)" },
                { type: ContentType.PARAGRAPH, text: "مجموعة التشفير هي مجموعة من الخوارزميات التي يستخدمها اتصال TLS. يحدد ملف `options-ssl-nginx.conf` قائمة من مجموعات التشفير الحديثة والقوية، مع استبعاد الخوارزميات القديمة والضعيفة. من المهم الحفاظ على هذه القائمة محدثة." },
                { type: ContentType.HEADING4, text: "HSTS - الأمان الصارم لنقل HTTP" },
                { type: ContentType.PARAGRAPH, text: "HSTS (HTTP Strict Transport Security) هو ترويسة أمان يرسلها الخادم إلى المتصفح. هذه الترويسة تخبر المتصفح: 'لمدة X القادمة من الوقت، تواصل معي فقط عبر HTTPS. لا تحاول أبدًا إجراء اتصال HTTP.' هذا يحمي من هجمات 'تجريد SSL' (SSL stripping) حيث يحاول المهاجم خداع المتصفح للعودة إلى HTTP." },
                { type: ContentType.PARAGRAPH, text: "لتمكينه، أضف الترويسة التالية إلى كتلة الخادم `https` الخاصة بك:" },
                { type: ContentType.CODE_BLOCK, language: "nginx", code: `# Add within your 'server' block for port 443
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;` },
                { type: ContentType.PARAGRAPH, text: "`max-age` بالثواني (سنة واحدة هنا). `includeSubDomains` يطبق القاعدة على جميع النطاقات الفرعية. **تحذير:** بمجرد أن يرى المتصفح هذه الترويسة، فإنه *لن* يسمح بالاتصالات عبر HTTP لفترة `max-age`. لا تقم بتمكين هذا إلا إذا كنت ملتزمًا تمامًا بـ HTTPS." },
                { type: ContentType.HEADING4, text: "تدبيس OCSP (OCSP Stapling)" },
                { type: ContentType.PARAGRAPH, text: "عندما يتصل المتصفح، فإنه يحتاج إلى التحقق من أن شهادتك لم يتم إلغاؤها. يقوم بذلك عن طريق الاتصال بخوادم هيئة إصدار الشهادات (CA). تدبيس OCSP هو تحسين للأداء. يقوم خادمك بشكل دوري بالاستعلام عن حالة الإلغاء من CA و 'يدبس' (staples) الاستجابة الموقعة بالختم الزمني على شهادته. عندما يتصل متصفح، يمكن لخادمك تقديم هذه الاستجابة المدبسة مباشرة، مما يوفر على المتصفح رحلة ذهاب وعودة إضافية." },
                { type: ContentType.PARAGRAPH, text: "يتم تمكين هذا عادةً في ملف `options-ssl-nginx.conf`:" },
                { type: ContentType.CODE_BLOCK, language: "nginx", code: `ssl_stapling on;
ssl_stapling_verify on;` },
              ]
            }
        ]
    },
     {
        id: "p4_c2", chapterTitle: "الفصل الثاني: أنظمة كشف التسلل والحماية",
        sections: [
            {
              id: "p4_c2_s1",
              icon: "📝",
              title: "المستوى 80: تكوين Fail2Ban المتقدم لمراقبة سجلات Nginx",
              content: [
                { type: ContentType.PARAGRAPH, text: "لقد قمنا بتكوين `fail2ban` لحماية SSH، ولكن قوته الحقيقية تكمن في قدرته على مراقبة أي ملف سجل لأي تطبيق. أحد أهم التطبيقات التي يجب مراقبتها هو Nginx. يمكن للمهاجمين استخدام الروبوتات للبحث عن نقاط الضعف (مثل `wp-admin.php` أو `phpMyAdmin`) أو محاولة هجمات القوة الغاشمة على نماذج تسجيل الدخول. يمكن لـ `fail2ban` اكتشاف هذا السلوك وحظر المهاجمين." },
                { type: ContentType.HEADING4, text: "إنشاء سجن Nginx مخصص" },
                { type: ContentType.PARAGRAPH, text: "يأتي `fail2ban` مع بعض المرشحات المعدة مسبقًا لـ Nginx. سنقوم بإنشاء ملف 'سجن' محلي جديد لتفعيلها وتخصيصها. لا تقم بتعديل `jail.local` مباشرة لهذا الغرض؛ فمن الأفضل إنشاء ملفات منفصلة لكل خدمة." },
                { type: ContentType.CODE_BLOCK, language: "bash", code: "sudo nano /etc/fail2ban/jail.d/nginx.local" },
                { type: ContentType.PARAGRAPH, text: "أضف التكوين التالي:" },
                { type: ContentType.CODE_EXPLANATION, language: "ini", codeTitle: "/etc/fail2ban/jail.d/nginx.local", code: `[nginx-http-auth]
enabled  = true
port     = http,https
filter   = nginx-http-auth
logpath  = /var/log/nginx/error.log
maxretry = 3
bantime  = 1h

[nginx-botsearch]
enabled  = true
port     = http,https
filter   = nginx-botsearch
logpath  = /var/log/nginx/access.log
maxretry = 2
bantime  = 1d`, explanations: [
                    { lines: "1-7", explanation: "هذا السجن مخصص لحماية الدلائل المحمية بكلمة مرور (مصادقة HTTP الأساسية). المرشح `nginx-http-auth` يبحث في `error.log` عن محاولات تسجيل الدخول الفاشلة. بعد 3 محاولات فاشلة، يتم حظر IP المهاجم لمدة ساعة." },
                    { lines: "9-15", explanation: "هذا السجن أكثر عمومية. المرشح `nginx-botsearch` يبحث في `access.log` عن الروبوتات التي تبحث عن نقاط ضعف شائعة. إذا طلب نفس IP ملفين مشبوهين، فسيتم حظره لمدة يوم كامل." }
                ]},
                { type: ContentType.PARAGRAPH, text: "بعد حفظ الملف، أعد تشغيل `fail2ban` لتطبيق التكوين الجديد:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: "sudo systemctl restart fail2ban" },
                { type: ContentType.PARAGRAPH, text: "يمكنك التحقق من أن السجون الجديدة نشطة باستخدام `sudo fail2ban-client status`." },
              ]
            },
            {
              id: "p4_c2_s2",
              icon: "📧",
              title: "المستوى 81: إعداد تنبيهات Fail2Ban",
              content: [
                { type: ContentType.PARAGRAPH, text: "حظر المهاجمين أمر رائع، لكن معرفة أنك تتعرض للهجوم أمر أفضل. يمكن تكوين `fail2ban` لإرسال بريد إلكتروني إليك في كل مرة يقوم فيها بحظر عنوان IP. هذا يمنحك وعيًا فوريًا بالتهديدات ويمكن أن يساعدك في تحديد الهجمات المستهدفة." },
                { type: ContentType.HEADING4, text: "تكوين إعدادات البريد الإلكتروني" },
                { type: ContentType.PARAGRAPH, text: "سنقوم بتعديل ملف `jail.local` الذي أنشأناه سابقًا لإضافة إعدادات الإشعارات." },
                { type: ContentType.CODE_BLOCK, language: "bash", code: "sudo nano /etc/fail2ban/jail.local" },
                { type: ContentType.PARAGRAPH, text: "ابحث عن قسم `[DEFAULT]` في الأعلى وأضف أو عدل الأسطر التالية:" },
                { type: ContentType.CODE_EXPLANATION, language: "ini", codeTitle: "تعديلات على /etc/fail2ban/jail.local", code: `[DEFAULT]
# ... other defaults ...

# Destination email for notifications
destemail = your-email@example.com

# Sender email
sender = fail2ban@your_domain.com

# Action to take. %(action_mwl)s bans, emails with whois report, and logs.
action = %(action_mwl)s`, explanations: [
                    { lines: "5", explanation: "`destemail`: عنوان البريد الإلكتروني الذي ستتلقى عليه التنبيهات." },
                    { lines: "8", explanation: "`sender`: عنوان البريد الإلكتروني الذي ستظهر الرسائل منه." },
                    { lines: "11", explanation: "`action`: هذا هو الجزء الأكثر أهمية. `fail2ban` يأتي مع العديد من الإجراءات المعرفة مسبقًا. `%(action_)s` هو الإجراء الافتراضي (الحظر فقط). `%(action_mw)s` يحظر ويرسل بريدًا إلكترونيًا بتقرير `whois`. `%(action_mwl)s` يفعل كل ذلك بالإضافة إلى تضمين أسطر السجل ذات الصلة في البريد الإلكتروني، وهو الأكثر فائدة للتحليل." }
                ]},
                { type: ContentType.PARAGRAPH, text: "بعد حفظ التغييرات، أعد تشغيل `fail2ban`. الآن، في المرة التالية التي يتم فيها حظر عنوان IP، ستتلقى بريدًا إلكترونيًا مفصلاً." },
                { type: ContentType.NOTE, title: "متطلبات MTA", text: "كما هو الحال مع تنبيهات `sudo`، يتطلب هذا أن يكون لديك وكيل نقل بريد (MTA) مثل Postfix أو SSMTP مثبتًا ومكونًا على خادمك لإرسال رسائل البريد الإلكتروني." },
              ]
            },
            {
              id: "p4_c2_s3",
              icon: "🏠",
              title: "المستوى 82: مقدمة إلى أنظمة كشف التسلل المستندة إلى المضيف (HIDS)",
              content: [
                { type: ContentType.PARAGRAPH, text: "جدران الحماية و `fail2ban` هما دفاعات محيطية. إنهما يراقبان حركة المرور القادمة إلى الخادم. ولكن ماذا لو تمكن مهاجم من تجاوز هذه الدفاعات؟ هنا يأتي دور نظام كشف التسلل المستند إلى المضيف (HIDS). HIDS هو بمثابة نظام إنذار داخل منزلك. إنه لا يراقب الباب الأمامي، بل يراقب النوافذ والأبواب الداخلية وما يحدث داخل الغرف." },
                { type: ContentType.HEADING4, text: "ما الذي يفعله HIDS؟" },
                { type: ContentType.PARAGRAPH, text: "يعمل HIDS عن طريق مراقبة الحالة الداخلية للخادم والبحث عن علامات النشاط المشبوه. تشمل مهامه الرئيسية:" },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "مراقبة سلامة الملفات (File Integrity Monitoring - FIM)", definition: "هذه هي الوظيفة الأساسية. يأخذ HIDS 'لقطة' (مجموع اختباري - checksum) للملفات الهامة في النظام (مثل `/bin`, `/etc`, `/sbin`). ثم يقوم بفحص هذه الملفات بشكل دوري. إذا تغير أي ملف، فإنه يطلق تنبيهًا. هذا يمكن أن يكتشف على الفور ما إذا كان المهاجم قد قام بتعديل ثنائي نظام لإخفاء آثاره أو تثبيت باب خلفي." },
                    { term: "كشف البرامج الضارة والجذور الخفية (Rootkits)", definition: "يقوم بفحص النظام بحثًا عن توقيعات البرامج الضارة المعروفة والتقنيات التي تستخدمها الجذور الخفية لإخفاء وجودها." },
                    { term: "تحليل السجلات", definition: "يمكن لـ HIDS جمع وتحليل السجلات من مصادر متعددة على الخادم، والبحث عن أنماط الهجوم التي قد لا تكتشفها قاعدة `fail2ban` واحدة." },
                    { term: "مراقبة السياسات", definition: "يتحقق من أن تكوين الخادم يلتزم بمعايير الأمان المحددة مسبقًا (على سبيل المثال، 'هل لا يزال تسجيل الدخول بكلمة مرور SSH معطلاً؟')." }
                ]},
                { type: ContentType.PARAGRAPH, text: "Wazuh و OSSEC هما من أشهر حلول HIDS مفتوحة المصدر. وعادة ما تعمل في نموذج العميل/الخادم. تقوم بتثبيت 'وكيل' (agent) خفيف الوزن على كل خادم تريد مراقبته، ويقوم هذا الوكيل بإرسال المعلومات إلى 'مدير' (manager) مركزي يقوم بتحليل البيانات وتخزينها وإطلاق التنبيهات." },
              ]
            },
            {
              id: "p4_c2_s4",
              icon: "👁️",
              title: "المستوى 83: تثبيت وتكوين Wazuh Agent",
              content: [
                { type: ContentType.PARAGRAPH, text: "Wazuh هو حل أمان شامل يتضمن HIDS، ومراقبة أمنية، وقدرات استجابة للحوادث. في حين أن إعداد خادم Wazuh Manager الكامل هو عملية معقدة خارج نطاق هذا الكتاب، فإن تثبيت Wazuh Agent على خادمنا أمر بسيط نسبيًا ويمنحك فكرة عن كيفية عمل هذه الأنظمة." },
                { type: ContentType.NOTE, title: "المتطلبات المسبقة", text: "يفترض هذا المستوى أن لديك خادم Wazuh Manager يعمل في مكان ما وأن لديك عنوان IP الخاص به ومفتاح تسجيل للوكيل. يمكنك استخدام الخدمة السحابية لـ Wazuh لتجربة هذا بسهولة." },
                { type: ContentType.HEADING4, text: "تثبيت Wazuh Agent" },
                { type: ContentType.PARAGRAPH, text: "يوفر Wazuh مستودع حزم يجعل التثبيت سهلاً." },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "تثبيت Wazuh Agent", code: `# 1. أضف مفتاح GPG لمستودع Wazuh
curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | gpg --no-default-keyring --keyring gnupg-ring:/usr/share/keyrings/wazuh.gpg --import && chmod 644 /usr/share/keyrings/wazuh.gpg

# 2. أضف مستودع Wazuh
echo "deb [signed-by=/usr/share/keyrings/wazuh.gpg] https://packages.wazuh.com/4.x/apt/ stable main" | sudo tee -a /etc/apt/sources.list.d/wazuh.list

# 3. قم بالتثبيت
sudo apt-get update
sudo apt-get install wazuh-agent -y`, explanations: [
                    { lines: "2-3", explanation: "هذه الخطوات تقوم بتكوين `apt` للثقة وتنزيل الحزم من مستودع Wazuh الرسمي." },
                    { lines: "8", explanation: "نقوم بتثبيت حزمة `wazuh-agent`." }
                ]},
                { type: ContentType.HEADING4, text: "تسجيل وتكوين الوكيل" },
                { type: ContentType.PARAGRAPH, text: "الآن، نحتاج إلى إخبار الوكيل بمكان المدير الخاص به. يتم ذلك عن طريق تحرير ملف التكوين الخاص به:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: "sudo nano /var/ossec/etc/ossec.conf" },
                { type: ContentType.PARAGRAPH, text: "ابحث عن كتلة `<client>` وغير عنوان IP إلى عنوان Wazuh Manager الخاص بك:" },
                { type: ContentType.CODE_BLOCK, language: "xml", code: `<client>
  <server>
    <address>YOUR_WAZUH_MANAGER_IP</address>
    ...
  </server>
</client>` },
                { type: ContentType.HEADING4, text: "بدء تشغيل الخدمة" },
                { type: ContentType.PARAGRAPH, text: "أخيرًا، قم بتمكين وبدء خدمة الوكيل:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo systemctl daemon-reload
sudo systemctl enable wazuh-agent
sudo systemctl start wazuh-agent` },
                { type: ContentType.PARAGRAPH, text: "الآن، سيبدأ وكيل Wazuh في مراقبة خادمك وإرسال البيانات (تغييرات الملفات، السجلات، نتائج فحص الثغرات) إلى المدير لتحليلها. في لوحة تحكم Wazuh (Kibana)، ستبدأ في رؤية تنبيهات مفصلة حول صحة وأمان خادمك." },
              ]
            },
            {
              id: "p4_c2_s5",
              icon: "🛡️",
              title: "المستوى 84: مقدمة إلى ModSecurity (WAF for Nginx)",
              content: [
                { type: ContentType.PARAGRAPH, text: "جدار حماية تطبيقات الويب (WAF) هو نوع متخصص من جدران الحماية يقع أمام تطبيقات الويب الخاصة بك ويفحص حركة مرور HTTP بحثًا عن الهجمات الشائعة. في حين أن UFW يعمل على مستوى الشبكة (المنافذ وعناوين IP)، فإن WAF يعمل على مستوى التطبيق. إنه يفهم بروتوكول HTTP ويمكنه فحص الطلبات بحثًا عن علامات هجمات مثل حقن SQL (SQL Injection) والبرمجة النصية عبر المواقع (XSS) وتضمين الملفات عن بعد (RFI)." },
                { type: ContentType.PARAGRAPH, text: "ModSecurity هو WAF مفتوح المصدر الأكثر شهرة. يمكن تجميعه كوحدة ديناميكية لـ Nginx، مما يسمح لك بدمج هذه الحماية القوية مباشرة في خادم الويب الخاص بك." },
                { type: ContentType.HEADING4, text: "مجموعة القواعد الأساسية لـ OWASP (Core Rule Set - CRS)" },
                { type: ContentType.PARAGRAPH, text: "ModSecurity هو المحرك، لكنه يحتاج إلى 'قواعد' ليخبره بما يجب البحث عنه. مجموعة القواعد الأساسية لـ OWASP (CRS) هي مجموعة قواعد مجانية ومفتوحة المصدر توفر الحماية ضد مجموعة واسعة من الهجمات، بما في ذلك العديد من المخاطر في قائمة OWASP Top Ten." },
                { type: ContentType.HEADING4, text: "كيف يعمل؟" },
                { type: ContentType.PARAGRAPH, text: "عندما يأتي طلب HTTP إلى Nginx، وقبل أن يتم تمريره إلى تطبيقك الخلفي، يتم تمريره عبر ModSecurity. يقوم ModSecurity بتقييم الطلب مقابل CRS. كل قاعدة مطابقة تزيد من 'درجة الشذوذ' (anomaly score) للطلب. إذا تجاوزت الدرجة الإجمالية حدًا معينًا، يمكن تكوين ModSecurity لحظر الطلب وتسجيله وإرجاع استجابة خطأ 403 Forbidden، مما يمنع الهجوم من الوصول إلى تطبيقك على الإطلاق." },
                { type: ContentType.NOTE, title: "الإيجابيات الكاذبة (False Positives)", text: "أكبر تحدٍ عند تنفيذ WAF هو 'الإيجابيات الكاذبة' - حظر الطلبات المشروعة التي تبدو عن طريق الخطأ وكأنها هجوم. يتطلب ضبط CRS ليعمل بشكل صحيح مع تطبيقك المحدد وقتًا وخبرة. غالبًا ما يتم تشغيله في البداية في 'وضع الكشف فقط' (DetectionOnly) لتسجيل الهجمات المحتملة دون حظرها، مما يسمح لك بتحليل السجلات وتعديل القواعد لتقليل الإيجابيات الكاذبة قبل التبديل إلى وضع الحظر الكامل." },
              ]
            }
        ]
    },
     {
        id: "p4_c3", chapterTitle: "الفصل الثالث: تدقيق النظام وتقويته",
        sections: [
            {
              id: "p4_c3_s1",
              icon: "🔍",
              title: "المستوى 85: استخدام `lynis` لتدقيق أمان النظام",
              content: [
                { type: ContentType.PARAGRAPH, text: "بعد تطبيق العديد من إجراءات الأمان، كيف يمكنك التحقق من وضعك الأمني العام والعثور على أي شيء قد فاتك؟ `lynis` هي أداة تدقيق أمان مفتوحة المصدر وشاملة تقوم بفحص نظام لينكس الخاص بك بحثًا عن أفضل الممارسات الأمنية، والأخطاء في التكوين، والثغرات المحتملة. إنها مثل وجود مستشار أمني آلي تحت تصرفك." },
                { type: ContentType.HEADING4, text: "تثبيت وتشغيل Lynis" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo apt install lynis
sudo lynis audit system` },
                { type: ContentType.PARAGRAPH, text: "`lynis` لا يتطلب تكوينًا معقدًا. عند تشغيله، سيقوم بإجراء مئات الاختبارات الفردية عبر فئات مختلفة، بما في ذلك:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "أدوات النظام والخدمات",
                    "النواة (Kernel)",
                    "الذاكرة والعمليات",
                    "المستخدمون والمجموعات والمصادقة",
                    "أنظمة الملفات",
                    "الشبكات وجدران الحماية",
                    "خوادم الويب وقواعد البيانات"
                ]},
                { type: ContentType.HEADING4, text: "فهم المخرجات" },
                { type: ContentType.PARAGRAPH, text: "أثناء تشغيل `lynis`، سترى الكثير من المخرجات. في النهاية، سيقدم لك ملخصًا. الأجزاء الأكثر أهمية هي قسم **الاقتراحات (Suggestions)** وقسم **التحذيرات (Warnings)**." },
                { type: ContentType.PREFORMATTED_TEXT, text: `  -[ Suggestions ]-
  * Harden the system by installing at least one malware scanner, to perform periodic scans on the system. (e.g. rkhunter / chkrootkit) [SECURITY-5120]
  * Consider hardening SSH configuration [SSH-7408]
    - Option: ClientAliveInterval` },
                { type: ContentType.PARAGRAPH, text: "كل اقتراح أو تحذير يأتي مع معرف (مثل `[SECURITY-5120]`) ورابط إلى موقع `lynis` للحصول على مزيد من التفاصيل حول المشكلة وكيفية إصلاحها. التقرير الكامل يتم حفظه في `/var/log/lynis.log`." },
                { type: ContentType.NOTE, title: "أداة تدقيق، وليست أداة تقوية", text: "`lynis` لا يقوم بإجراء أي تغييرات على نظامك. إنه يخبرك فقط بما يجب عليك تغييره. مهمتك هي مراجعة الاقتراحات، وفهم سبب أهميتها، وتطبيق التغييرات الموصى بها يدويًا. تشغيل `lynis` بشكل دوري (على سبيل المثال، عبر `cron` job شهريًا) هو طريقة ممتازة للحفاظ على وضع أمني قوي." },
              ]
            },
            {
              id: "p4_c3_s2",
              icon: "🦠",
              title: "المستوى 86: استخدام `chkrootkit` و `rkhunter` للبحث عن أدوات الاختراق",
              content: [
                { type: ContentType.PARAGRAPH, text: "الجذور الخفية (Rootkits) هي نوع من البرامج الضارة الخبيثة بشكل خاص. بمجرد أن يتمكن المهاجم من الوصول إلى نظامك، يمكنه تثبيت rootkit ليخفي وجوده عن طريق تعديل أو استبدال أدوات النظام الأساسية مثل `ls` أو `ps` أو `top`. قد تعتقد أنك ترى قائمة عمليات عادية، لكن الـ rootkit يقوم بتصفية عمليات المهاجم من الإخراج." },
                { type: ContentType.PARAGRAPH, text: "`chkrootkit` و `rkhunter` (Rootkit Hunter) هما أداتان متخصصتان في البحث عن هذه التهديدات. إنهما لا يعتمدان على أدوات النظام التي قد تكون مخترقة، ويقومان بإجراء فحوصات منخفضة المستوى للبحث عن علامات الإصابة." },
                { type: ContentType.HEADING4, text: "التثبيت والتشغيل" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo apt install chkrootkit rkhunter -y

# تحديث قاعدة بيانات rkhunter أولاً
sudo rkhunter --update

# تشغيل الفحوصات
sudo chkrootkit
sudo rkhunter --check` },
                { type: ContentType.HEADING4, text: "ما الذي يبحثون عنه؟" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>تواقيع الجذور الخفية المعروفة:</strong> لديهم قواعد بيانات للجذور الخفية الشائعة.",
                    "<strong>تعديلات الثنائيات:</strong> `rkhunter` يقوم بإنشاء مجموعات اختبارية لملفات النظام الهامة ومقارنتها، على غرار HIDS.",
                    "<strong>ملفات وإعدادات مشبوهة:</strong> يبحثون عن ملفات مخفية في أماكن غير عادية، وأذونات غير صحيحة، وواجهات شبكة في وضع 'promiscuous'."
                ]},
                { type: ContentType.NOTE, title: "الإيجابيات الكاذبة والخطوات التالية", text: "يمكن لكلتا الأداتين أحيانًا إصدار تحذيرات تكون 'إيجابيات كاذبة'. من المهم التحقق من كل تحذير. إذا وجدت إصابة مؤكدة، فإن أفضل مسار للعمل هو عادةً أخذ نسخة احتياطية من بياناتك، ومسح الخادم بالكامل، وإعادة بنائه من الصفر. محاولة 'تنظيف' نظام مخترق أمر صعب للغاية وغير موثوق به." },
              ]
            },
            {
              id: "p4_c3_s3",
              icon: "🧠",
              title: "المستوى 87: فهم وتطبيق تقوية نواة لينكس (Kernel Hardening)",
              content: [
                { type: ContentType.PARAGRAPH, text: "نواة لينكس هي قلب نظام التشغيل. تقوية النواة نفسها يمكن أن تحمي من فئة كاملة من الهجمات على مستوى الشبكة والنظام. يتم ذلك عن طريق ضبط معلمات النواة أثناء وقت التشغيل باستخدام `sysctl`." },
                { type: ContentType.PARAGRAPH, text: "ملف التكوين الرئيسي لهذه المعلمات هو `/etc/sysctl.conf`. أي تغييرات تجريها هنا سيتم تطبيقها تلقائيًا عند كل إقلاع." },
                { type: ContentType.HEADING4, text: "إعدادات تقوية شائعة" },
                { type: ContentType.PARAGRAPH, text: "افتح `/etc/sysctl.conf` باستخدام `sudo nano` وأضف بعض هذه الإعدادات الموصى بها:" },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "مقتطف من /etc/sysctl.conf", code: `# IP Spoofing protection
net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.default.rp_filter = 1

# Ignore ICMP broadcast requests
net.ipv4.icmp_echo_ignore_broadcasts = 1

# Disable source routing
net.ipv4.conf.all.accept_source_route = 0

# Protection from SYN flood attacks
net.ipv4.tcp_syncookies = 1`, explanations: [
                    { lines: "2-3", explanation: "`rp_filter` (Reverse Path Filtering) يساعد على منع هجمات 'انتحال IP' (IP Spoofing) عن طريق التأكد من أن الحزم الواردة تأتي من حيث تدعي." },
                    { lines: "6", explanation: "يمنع خادمك من المشاركة في هجمات 'Smurf' عن طريق تجاهل طلبات البث." },
                    { lines: "9", explanation: "التوجيه المصدر هو ميزة قديمة يمكن استغلالها لتجاوز قواعد جدار الحماية. يجب دائمًا تعطيلها." },
                    { lines: "12", explanation: "`tcp_syncookies` هي آلية دفاع فعالة ضد هجمات 'فيضان SYN' (SYN flood)، وهي نوع شائع من هجمات حجب الخدمة (DoS)." }
                ]},
                { type: ContentType.PARAGRAPH, text: "لتطبيق هذه الإعدادات على الفور دون إعادة التشغيل، قم بتشغيل:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo sysctl -p` },
                { type: ContentType.NOTE, title: "لا تقم بالنسخ واللصق الأعمى", text: "في حين أن الإعدادات المذكورة أعلاه آمنة بشكل عام، فإن ملف `sysctl.conf` يحتوي على العديد من المعلمات القوية. ابحث دائمًا عن معنى المعلمة قبل تغييرها للتأكد من أنها لن تؤثر سلبًا على تطبيقك. على سبيل المثال، إذا كان خادمك يعمل كجهاز توجيه (router)، فإن تعطيل إعادة توجيه IP (`net.ipv4.ip_forward = 0`) سيكسر وظيفته." },
              ]
            },
            {
              id: "p4_c3_s4",
              icon: "📂",
              title: "المستوى 88: مراجعة أذونات الملفات والبحث عن نقاط الضعف",
              content: [
                { type: ContentType.PARAGRAPH, text: "يمكن أن تكون الأذونات غير الصحيحة للملفات بمثابة باب خلفي مفتوح للمهاجمين. يمكن للمهاجم الذي تمكن من الوصول كمستخدم منخفض الامتيازات استخدام ملفات قابلة للكتابة عالميًا (world-writable files) أو ملفات SUID سيئة التكوين لتصعيد امتيازاته إلى `root`." },
                { type: ContentType.HEADING4, text: "البحث عن الملفات الخطرة باستخدام `find`" },
                { type: ContentType.PARAGRAPH, text: "الأمر `find` هو أداة قوية للغاية لمسح نظام الملفات بحثًا عن ملفات ذات أذونات محددة." },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "أوامر Find للأمان", code: `# 1. البحث عن الملفات القابلة للكتابة عالميًا
find / -type f -perm -0002 -exec ls -ld {} \\;

# 2. البحث عن الدلائل القابلة للكتابة عالميًا
find / -type d -perm -0002 -exec ls -ld {} \\;

# 3. البحث عن ملفات SUID
find / -type f -perm -4000 -exec ls -l {} \\;`, explanations: [
                    { lines: "2", explanation: "`-perm -0002` يبحث عن الملفات التي لديها إذن كتابة لـ 'الآخرين'. يجب أن يكون هناك عدد قليل جدًا من هذه الملفات خارج `/tmp` و `/var/tmp`. أي ملف آخر هو علامة حمراء." },
                    { lines: "5", explanation: "الدلائل القابلة للكتابة عالميًا يمكن أن تكون خطيرة أيضًا، حيث يمكن للمهاجم وضع ملفات ضارة فيها." },
                    { lines: "8", explanation: "بت SUID (`-perm -4000`) يسمح للمستخدم بتشغيل الملف بامتيازات المالك، وليس بامتيازاته الخاصة. إذا كان المالك هو `root`، فهذا خطير بشكل خاص. يجب عليك التحقق من كل ملف SUID للتأكد من أنه شرعي وضروري." }
                ]},
                { type: ContentType.NOTE, title: "الاستثناءات والإصلاح", text: "ستجد بعض النتائج المشروعة (خاصة لـ SUID، مثل `passwd` و `sudo`). مهمتك هي التحقيق في أي شيء يبدو غير عادي. إذا وجدت ملفًا بأذونات غير صحيحة، يمكنك إصلاحه باستخدام `chmod`. على سبيل المثال، `sudo chmod o-w /path/to/insecure/file` يزيل إذن الكتابة من 'الآخرين'." },
              ]
            },
            {
              id: "p4_c3_s5",
              icon: "🧠",
              title: "المستوى 89: تأمين الذاكرة المشتركة (`/dev/shm`)",
              content: [
                { type: ContentType.PARAGRAPH, text: "`/dev/shm` هو نظام ملفات مؤقت (tmpfs) يتم تخزينه مباشرة في الذاكرة (RAM) بدلاً من القرص الصلب. الغرض منه هو توفير طريقة سريعة للعمليات لمشاركة البيانات (الذاكرة المشتركة). في حين أن هذا مفيد، فإن الإعدادات الافتراضية يمكن أن تشكل خطرًا أمنيًا." },
                { type: ContentType.HEADING4, text: "المخاطر" },
                { type: ContentType.PARAGRAPH, text: "بشكل افتراضي، يتم تحميل `/dev/shm` بأذونات تسمح لأي شخص بإنشاء ملفات فيه وتنفيذها. يمكن للمهاجم استخدام هذا لتنزيل وتجميع وتشغيل برامج ضارة مباشرة في الذاكرة، متجاوزًا بعض عمليات فحص القرص." },
                { type: ContentType.HEADING4, text: "التقوية عبر `fstab`" },
                { type: ContentType.PARAGRAPH, text: "يمكننا تقوية هذا عن طريق تعديل كيفية تحميله في `/etc/fstab`. هذا الملف يحدد كيف يتم تحميل أنظمة الملفات عند الإقلاع." },
                { type: ContentType.CODE_BLOCK, language: "bash", code: "sudo nano /etc/fstab" },
                { type: ContentType.PARAGRAPH, text: "ابحث عن السطر الذي يبدأ بـ `tmpfs` ويشير إلى `/dev/shm`. قم بتعديله لإضافة الخيارات التالية:" },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "تعديل /etc/fstab", code: `tmpfs   /dev/shm   tmpfs   defaults,noexec,nosuid   0   0`, explanations: [
                    { lines: "1", explanation: "`noexec`: يمنع تشغيل أي ملفات ثنائية من هذا الموقع. هذا هو أهم إجراء تقوية." },
                    { lines: "1", explanation: "`nosuid`: يمنع بتات SUID/SGID من أن يكون لها أي تأثير، مما يمنع هجمات تصعيد الامتيازات." }
                ]},
                { type: ContentType.PARAGRAPH, text: "لتطبيق التغيير على الفور، يمكنك إعادة تحميل `/dev/shm`:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo mount -o remount,noexec,nosuid /dev/shm` },
                { type: ContentType.NOTE, title: "توافق التطبيقات", text: "بعض التطبيقات القديمة أو سيئة الكتابة قد تتطلب القدرة على التنفيذ من `/dev/shm`. في حين أن هذا نادر، يجب عليك اختبار تطبيقاتك بعد إجراء هذا التغيير. بالنسبة لمعظم تطبيقات الويب الحديثة، هذا الإجراء التقوي آمن تمامًا ويوفر طبقة حماية قيمة." },
              ]
            }
        ]
    },
     {
        id: "p4_c4", chapterTitle: "الفصل الرابع: أمان التطبيقات",
        sections: [
            {
              id: "p4_c4_s1",
              icon: "💉",
              title: "المستوى 90: الحماية من XSS و CSRF",
              content: [
                { type: ContentType.PARAGRAPH, text: "بينما ركزنا حتى الآن على تأمين الخادم، من المهم أن نتذكر أن تطبيق الويب نفسه غالبًا ما يكون أضعف حلقة. اثنان من أكثر أنواع الهجمات شيوعًا هما البرمجة النصية عبر المواقع (XSS) وتزييف الطلبات عبر المواقع (CSRF)." },
                { type: ContentType.HEADING4, text: "البرمجة النصية عبر المواقع (Cross-Site Scripting - XSS)" },
                { type: ContentType.PARAGRAPH, text: "يحدث XSS عندما يقوم تطبيقك بأخذ مدخلات غير موثوق بها من مستخدم وعرضها على صفحة ويب دون تنقيتها بشكل صحيح. هذا يسمح للمهاجم بحقن كود JavaScript ضار يتم تشغيله في متصفح الضحية." },
                { type: ContentType.PARAGRAPH, text: "**الدفاع (من جانب الخادم):** القاعدة الذهبية هي **الترميز عند الإخراج (Encode on Output)**. لا تثق أبدًا في أي بيانات قادمة من قاعدة البيانات أو من المستخدم. قبل عرض أي بيانات في قالب HTML، استخدم دائمًا دالة تقوم بترميز الكيانات (entity-encoding). على سبيل المثال، تحويل `<script>` إلى `&lt;script&gt;`. معظم محركات القوالب الحديثة (مثل EJS, Jinja2, Pug) تفعل هذا تلقائيًا افتراضيًا." },
                { type: ContentType.HEADING4, text: "تزييف الطلبات عبر المواقع (Cross-Site Request Forgery - CSRF)" },
                { type: ContentType.PARAGRAPH, text: "يحدث CSRF عندما يخدع موقع ويب ضار متصفح المستخدم لإجراء طلب غير مقصود إلى موقع آخر يكون المستخدم مسجلاً دخوله إليه (مثل تحويل الأموال أو تغيير كلمة المرور). المتصفح يرسل تلقائيًا ملفات تعريف الارتباط للجلسة مع الطلب، مما يجعل الطلب يبدو شرعيًا." },
                { type: ContentType.PARAGRAPH, text: "**الدفاع:** الطريقة القياسية هي استخدام **الرموز المميزة المضادة لـ CSRF (Anti-CSRF Tokens)**. عندما يطلب المستخدم نموذجًا، يقوم الخادم بإنشاء رمز مميز عشوائي وفريد، ويضعه في حقل مخفي في النموذج، ويخزنه أيضًا في جلسة المستخدم. عندما يتم إرسال النموذج، يتحقق الخادم من أن الرمز المميز المرسل يطابق الرمز المخزن في الجلسة. نظرًا لأن الموقع الضار لا يمكنه تخمين هذا الرمز، يفشل الطلب. توفر العديد من أطر عمل الويب (مثل `csurf` لـ Express و `Flask-WTF` لـ Flask) هذه الوظيفة." },
              ]
            },
            {
              id: "p4_c4_s2",
              icon: "🏷️",
              title: "المستوى 91: تأمين ترويسات HTTP (HTTP Security Headers)",
              content: [
                { type: ContentType.PARAGRAPH, text: "يمكننا استخدام Nginx لإضافة طبقة دفاع أخرى ضد هجمات مثل XSS والنقر الاحتيالي (Clickjacking) عن طريق إرسال ترويسات استجابة HTTP محددة. هذه الترويسات هي تعليمات للمتصفح حول كيفية التصرف." },
                { type: ContentType.PARAGRAPH, text: "يمكننا إنشاء مقتطف (snippet) في `/etc/nginx/snippets/security-headers.conf` و`include` له في كتل الخادم الخاصة بنا." },
                { type: ContentType.CODE_EXPLANATION, language: "nginx", codeTitle: "/etc/nginx/snippets/security-headers.conf", code: `# يمنع المتصفح من تخمين أنواع MIME، ويحمي من هجمات معينة.
add_header X-Content-Type-Options "nosniff" always;

# يمنع تحميل الموقع في <iframe>، ويحمي من النقر الاحتيالي.
add_header X-Frame-Options "SAMEORIGIN" always;

# آلية للإبلاغ عن هجمات XSS ومنعها.
# هذا مثال أساسي؛ CSP يمكن أن تكون معقدة للغاية.
add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self';" always;`, explanations: [
                    { lines: "2", explanation: "`X-Content-Type-Options: nosniff`: يمنع المتصفح من محاولة 'تخمين' نوع محتوى الملف إذا لم يتم تحديده بشكل صحيح، وهو ما يمكن أن يؤدي إلى ثغرات XSS." },
                    { lines: "5", explanation: "`X-Frame-Options: SAMEORIGIN`: يخبر المتصفح أنه لا يُسمح بعرض هذه الصفحة داخل إطار (`<iframe>` أو `<frame>`) إلا إذا كان الموقع الأصلي هو نفسه. هذا هو الدفاع الأساسي ضد النقر الاحتيالي." },
                    { lines: "9", explanation: "`Content-Security-Policy (CSP)`: هي أقوى ترويسة. إنها تحدد قائمة بيضاء بالمصادر الموثوقة التي يمكن للمتصفح تحميل الموارد منها (مثل النصوص البرمجية والأنماط والصور). هذا المثال المقيد للغاية يسمح فقط بتحميل الموارد من نفس المصدر (`'self'`)." }
                ]},
                { type: ContentType.PARAGRAPH, text: "لتطبيق هذه، أضف `include /etc/nginx/snippets/security-headers.conf;` داخل كتلة الخادم `https` الخاصة بك." },
              ]
            },
            {
              id: "p4_c4_s3",
              icon: "✅",
              title: "المستوى 92: التحقق من صحة المدخلات لمنع هجمات الحقن",
              content: [
                { type: ContentType.PARAGRAPH, text: "فئة كاملة من الهجمات، بما في ذلك حقن SQL وحقن الأوامر، ممكنة فقط عندما يأخذ التطبيق مدخلات من المستخدم ويدمجها مباشرة في سلسلة سيتم تنفيذها لاحقًا (استعلام قاعدة بيانات، أمر shell)." },
                { type: ContentType.HEADING4, text: "مبدأ أساسي: لا تثق أبدًا في مدخلات المستخدم" },
                { type: ContentType.PARAGRAPH, text: "يجب التعامل مع كل جزء من البيانات يأتي من العميل (عناوين URL، حمولات JSON، بيانات النماذج) على أنه ضار محتمل. التحقق من صحة المدخلات هو عملية التأكد من أن البيانات الواردة تتوافق مع التنسيق والنوع والنطاق المتوقع." },
                { type: ContentType.HEADING4, text: "الدفاع ضد حقن SQL" },
                { type: ContentType.PARAGRAPH, text: "الخطأ الكلاسيكي هو بناء استعلامات SQL مثل هذا:" },
                { type: ContentType.CODE_BLOCK, language: "javascript", code: `// DANGEROUS - DO NOT DO THIS
const query = \`SELECT * FROM users WHERE email = '\${userInput.email}'\`;` },
                { type: ContentType.PARAGRAPH, text: "إذا أدخل المهاجم `' OR 1=1; --` كبريد إلكتروني، فسيصبح الاستعلام `SELECT * FROM users WHERE email = '' OR 1=1; --`، مما يعيد جميع المستخدمين." },
                { type: ContentType.PARAGRAPH, text: "**الحل:** استخدم دائمًا **الاستعلامات المعدة (Prepared Statements)** أو **الاستعلامات ذات المعلمات (Parameterized Queries)**. يتم توفيرها من قبل جميع مكتبات قواعد البيانات الحديثة و ORMs. هذا يفصل الاستعلام عن البيانات. يتم إرسال قالب الاستعلام إلى قاعدة البيانات أولاً، ثم يتم إرسال البيانات بشكل منفصل، مما يجعل من المستحيل على البيانات تغيير منطق الاستعلام." },
                { type: ContentType.CODE_BLOCK, language: "javascript", code: `// SAFE
const query = 'SELECT * FROM users WHERE email = $1';
db.query(query, [userInput.email]);` },
              ]
            },
            {
              id: "p4_c4_s4",
              icon: "🍪",
              title: "المستوى 93: إدارة الجلسات وملفات تعريف الارتباط بأمان",
              content: [
                { type: ContentType.PARAGRAPH, text: "الجلسات هي الطريقة التي تتذكر بها تطبيقات الويب المستخدمين عبر طلبات متعددة. عادةً ما يتم ذلك عن طريق إعطاء المستخدم معرف جلسة فريد يتم تخزينه في ملف تعريف ارتباط (cookie). إذا تمكن المهاجم من سرقة ملف تعريف الارتباط هذا، فيمكنه انتحال شخصية المستخدم." },
                { type: ContentType.HEADING4, text: "أفضل الممارسات لملفات تعريف الارتباط الآمنة" },
                { type: ContentType.PARAGRAPH, text: "عند تعيين ملف تعريف الارتباط للجلسة، يجب عليك دائمًا استخدام السمات التالية:" },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "Secure", definition: "تضمن هذه السمة أن المتصفح سيرسل ملف تعريف الارتباط فقط عبر اتصالات HTTPS. بدون هذا، يمكن سرقته بسهولة على شبكات غير مشفرة." },
                    { term: "HttpOnly", definition: "هذه سمة حاسمة تمنع الوصول إلى ملف تعريف الارتباط عبر JavaScript من جانب العميل (`document.cookie`). هذا هو دفاعك الأساسي ضد سرقة الجلسة عبر هجمات XSS." },
                    { term: "SameSite", definition: "يساعد في الحماية من هجمات CSRF. `SameSite=Strict` يمنع إرسال ملف تعريف الارتباط مع الطلبات عبر المواقع. `SameSite=Lax` هو توازن جيد يسمح بإرساله مع التنقلات العلوية (النقر على رابط)." },
                    { term: "Expires / Max-Age", definition: "قم دائمًا بتعيين تاريخ انتهاء صلاحية معقول للجلسات لمنعها من البقاء نشطة إلى الأبد." }
                ]},
                { type: ContentType.HEADING4, text: "أمان الجلسة من جانب الخادم" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>استخدم معرفات جلسة طويلة وعشوائية:</strong> يجب أن تكون معرفات الجلسة غير قابلة للتخمين. استخدم مكتبة موثوقة لإنشائها.",
                    "<strong>قم بتخزين الجلسات بأمان:</strong> قم بتخزين بيانات الجلسة على الخادم (على سبيل المثال، في Redis أو PostgreSQL) بدلاً من تخزين البيانات مباشرة في ملف تعريف الارتباط (باستثناء JWTs الموقعة).",
                    "<strong>قم بتجديد معرف الجلسة:</strong> بعد أي تغيير في مستوى الامتياز (مثل تسجيل الدخول)، قم بإبطال معرف الجلسة القديم وإصدار واحد جديد للمساعدة في منع هجمات 'تثبيت الجلسة' (Session Fixation)."
                ]},
              ]
            },
            {
              id: "p4_c4_s5",
              icon: "🔟",
              title: "المستوى 94: مقدمة إلى OWASP Top 10",
              content: [
                { type: ContentType.PARAGRAPH, text: "مشروع أمان تطبيقات الويب المفتوح (OWASP) هو مجتمع عالمي غير ربحي يركز على تحسين أمان البرمجيات. أحد أشهر مشاريعهم هو OWASP Top 10. هذه ليست قائمة شاملة بكل ثغرة أمنية، بل هي وثيقة توعية قياسية تمثل إجماعًا واسعًا حول المخاطر الأمنية الأكثر خطورة على تطبيقات الويب." },
                { type: ContentType.PARAGRAPH, text: "تهدف القائمة إلى زيادة وعي المطورين بالمخاطر الأمنية الشائعة. العديد من الموضوعات التي ناقشناها في هذا الفصل تقع مباشرة ضمن فئات OWASP Top 10." },
                { type: ContentType.HEADING4, text: "بعض الأمثلة من قائمة 2021:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>A01:2021 - التحكم في الوصول المعطل (Broken Access Control):</strong> هذا هو الخطر الأول. يحدث عندما يتمكن المستخدمون من التصرف خارج نطاق أذوناتهم المقصودة.",
                    "<strong>A02:2021 - الإخفاقات التشفيرية (Cryptographic Failures):</strong> يتعلق بالبيانات الحساسة التي يتم كشفها بسبب عدم استخدام التشفير (مثل استخدام HTTP) أو استخدام تشفير ضعيف.",
                    "<strong>A03:2021 - الحقن (Injection):</strong> فئة واسعة تشمل حقن SQL، وحقن الأوامر، و XSS.",
                    "<strong>A07:2021 - إخفاقات تحديد الهوية والمصادقة (Identification and Authentication Failures):</strong> يتعلق بالمشاكل في إدارة الجلسات والمصادقة، مما يسمح للمهاجمين بانتحال هويات المستخدمين.",
                    "<strong>A08:2021 - إخفاقات سلامة البرامج والبيانات (Software and Data Integrity Failures):</strong> يتعلق بالتحقق من سلامة التحديثات والبيانات، مثل الاعتماد على تبعيات غير آمنة في خط أنابيب CI/CD."
                ]},
                { type: ContentType.NOTE, title: "أداة تعليمية", text: "استخدم OWASP Top 10 كقائمة مراجعة وأداة تعليمية. إنها نقطة انطلاق ممتازة لفهم 'ما يمكن أن يحدث بشكل خاطئ' وتساعد في توجيه جهودك الأمنية نحو المجالات الأكثر تأثيرًا." },
              ]
            }
        ]
    },
     {
        id: "p4_c5", chapterTitle: "الفصل الخامس: أمان الشبكة المتقدم",
        sections: [
            {
              id: "p4_c5_s1",
              icon: "🔥",
              title: "المستوى 95: فهم `iptables` والفرق بينه وبين UFW",
              content: [
                { type: ContentType.PARAGRAPH, text: "لقد استخدمنا UFW (Uncomplicated Firewall) لأنه سهل الاستخدام بشكل لا يصدق. ومع ذلك، من المهم أن نفهم أن UFW ليس جدار حماية في حد ذاته. إنه واجهة أمامية سهلة الاستخدام لنظام Netfilter، وهو إطار عمل جدار الحماية المدمج في نواة لينكس. الأداة الرئيسية للتفاعل مع Netfilter هي `iptables`." },
                { type: ContentType.PARAGRAPH, text: "`iptables` قوي للغاية، ولكنه أيضًا معقد وصعب في بناء الجملة. إنه يعمل مع مفهوم 'السلاسل' (chains) و 'الجداول' (tables). السلاسل الرئيسية هي `INPUT` (للحزم الواردة)، `OUTPUT` (للحزم الصادرة)، و `FORWARD` (للحزم التي يتم توجيهها عبر الخادم)." },
                { type: ContentType.HEADING4, text: "رؤية ما يفعله UFW" },
                { type: ContentType.PARAGRAPH, text: "يمكنك رؤية قواعد `iptables` الفعلية التي أنشأها UFW. هذا تمرين مفيد لإزالة الغموض." },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo iptables -L -n -v` },
                { type: ContentType.PARAGRAPH, text: "ستلاحظ أن UFW ينشئ العديد من السلاسل المخصصة (مثل `ufw-user-input`) التي يتم استدعاؤها من السلاسل الرئيسية. هذا هو كيف ينظم قواعده. على الرغم من أنك قد لا تكتب قواعد `iptables` يدويًا كل يوم، فإن فهم أنها القوة الكامنة وراء UFW يمنحك فهمًا أعمق لكيفية عمل أمان الشبكة على خادمك." },
              ]
            },
            {
              id: "p4_c5_s2",
              icon: "📝",
              title: "المستوى 96: إنشاء قواعد `iptables` مخصصة",
              content: [
                { type: ContentType.PARAGRAPH, text: "في حين أن UFW يغطي 99% من حالات الاستخدام، قد تواجه أحيانًا سيناريو تحتاج فيه إلى قاعدة أكثر تحديدًا. على سبيل المثال، لنفترض أنك تريد تسجيل جميع محاولات الاتصال المرفوضة قبل رفضها." },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `# This is an example, persistence is complex
# Create a new chain for logging
sudo iptables -N LOG_AND_DROP

# Log the packet with a prefix
sudo iptables -A LOG_AND_DROP -j LOG --log-prefix "Dropped Packet: "

# Drop the packet
sudo iptables -A LOG_AND_DROP -j DROP

# Redirect packets you want to block to this new chain
# e.g., to block a specific IP
sudo iptables -I INPUT -s 123.123.123.123 -j LOG_AND_DROP` },
                { type: ContentType.NOTE, title: "التعقيد والمثابرة", text: "قواعد `iptables` التي تم إنشاؤها يدويًا لا تستمر بعد إعادة التشغيل. جعلها دائمة يتطلب حزمًا إضافية مثل `iptables-persistent`. هذا يسلط الضوء على سبب كون UFW، الذي يدير كل هذا التعقيد من أجلك، هو الخيار الصحيح لمعظم المهام." },
              ]
            },
            {
              id: "p4_c5_s3",
              icon: "🌊",
              title: "المستوى 97: الحماية من هجمات DDoS البسيطة",
              content: [
                { type: ContentType.PARAGRAPH, text: "هجمات حجب الخدمة الموزعة (DDoS) واسعة النطاق تتطلب حلولاً متخصصة من مزود الخدمة أو خدمات مثل Cloudflare. ومع ذلك، يمكنك تكوين خادمك للتخفيف من الهجمات البسيطة أو هجمات حجب الخدمة (DoS) من مصدر واحد." },
                { type: ContentType.HEADING4, text: "الحد من المعدل في Nginx" },
                { type: ContentType.PARAGRAPH, text: "Nginx ممتاز في الحد من معدل الطلبات. يمكننا تحديد 'مناطق' تحد من عدد الطلبات التي يمكن لعنوان IP واحد إجراؤها في الثانية." },
                { type: ContentType.CODE_EXPLANATION, language: "nginx", codeTitle: "تكوين Nginx للحد من المعدل", code: `# Add this in the http block of nginx.conf
limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s;

# In your server block
location /login {
    limit_req zone=mylimit burst=20 nodelay;
    # ... proxy_pass etc.
}`, explanations: [
                    { lines: "2", explanation: "`limit_req_zone` تنشئ منطقة ذاكرة مشتركة (10 ميغابايت) لتخزين حالة عناوين IP. `rate=10r/s` يضبط الحد الأساسي على 10 طلبات في الثانية." },
                    { lines: "6", explanation: "نطبق هذا الحد على موقع حساس مثل `/login`. `burst=20` يسمح للعميل بإجراء دفعة تصل إلى 20 طلبًا قبل أن يبدأ الحد. `nodelay` يخدم الطلبات في الدفعة على الفور." }
                ]},
                { type: ContentType.HEADING4, text: "الحد من الاتصالات في `iptables`" },
                { type: ContentType.PARAGRAPH, text: "يمكن لـ `iptables` أيضًا الحد من الاتصالات الجديدة لمنع هجمات فيضان SYN." },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo iptables -A INPUT -p tcp --syn -m limit --limit 1/s --limit-burst 3 -j ACCEPT
sudo iptables -A INPUT -p tcp --syn -j DROP` },
                { type: ContentType.PARAGRAPH, text: "هذه القاعدة تسمح فقط باتصال SYN جديد واحد في الثانية (مع دفعة صغيرة)، وترفض كل شيء آخر. هذه قاعدة قوية ويجب استخدامها بحذر." },
              ]
            },
            {
              id: "p4_c5_s4",
              icon: "🔑",
              title: "المستوى 98: إعداد شبكة خاصة افتراضية (VPN) للوصول الإداري",
              content: [
                { type: ContentType.PARAGRAPH, text: "لقد قمنا بتأمين SSH باستخدام المفاتيح، وتغيير المنفذ، واستخدام `fail2ban`. لكن المنفذ لا يزال مكشوفًا للعالم، ويخضع للمسح المستمر. النهج الأكثر أمانًا هو إزالة SSH تمامًا من الإنترنت العام وجعله متاحًا فقط عبر شبكة خاصة افتراضية (VPN)." },
                { type: ContentType.PARAGRAPH, text: "VPN ينشئ نفقًا مشفرًا وآمنًا بين جهاز الكمبيوتر الخاص بك وخادمك. بمجرد الاتصال بالـ VPN، يصبح جهازك كما لو كان على نفس الشبكة المحلية مثل الخادم. يمكنك بعد ذلك تكوين جدار الحماية للسماح باتصالات SSH فقط من شبكة VPN الداخلية (على سبيل المثال، من نطاق IP `10.0.0.0/8`)." },
                { type: ContentType.HEADING4, text: "WireGuard: البساطة والسرعة" },
                { type: ContentType.PARAGRAPH, text: "WireGuard هو بروتوكول VPN حديث وبسيط للغاية وسريع. إعداده أسهل بكثير من البروتوكولات القديمة مثل OpenVPN. هناك العديد من النصوص البرمجية الممتازة التي يمكنها أتمتة تثبيت خادم WireGuard بالكامل في بضع دقائق، مثل `wireguard-install` من Nyr." },
                { type: ContentType.HEADING4, text: "سير العمل" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "1. قم بتثبيت خادم WireGuard على VPS الخاص بك.",
                    "2. قم بإنشاء ملفات تكوين للعملاء (جهاز الكمبيوتر المحمول، الهاتف).",
                    "3. قم بتكوين UFW للسماح بحركة مرور WireGuard الواردة على منفذه (عادةً منفذ UDP).",
                    "4. قم بتعديل قاعدة UFW SSH للسماح بالوصول فقط من نطاق IP الخاص بـ WireGuard.",
                    "5. الآن، للوصول إلى SSH، يجب عليك أولاً الاتصال بالـ VPN."
                ]},
                { type: ContentType.NOTE, title: "أقصى درجات الأمان", text: "هذا يقلل بشكل كبير من سطح الهجوم على خادمك. منفذ SSH الخاص بك غير مرئي تمامًا للإنترنت العام، مما يزيل فعليًا خطر هجمات القوة الغاشمة على SSH." },
              ]
            },
            {
              id: "p4_c5_s5",
              icon: "🕸️",
              title: "المستوى 99: عزل الشبكات باستخدام VLANs (مفهوم)",
              content: [
                { type: ContentType.PARAGRAPH, text: "في حين أن هذا المفهوم أكثر صلة بالبنى التحتية متعددة الخوادم من خادم VPS واحد، فمن المهم فهمه كخطوة تالية في رحلتك." },
                { type: ContentType.PARAGRAPH, text: "تخيل أن لديك خادم ويب وخادم قاعدة بيانات. في إعداد بسيط، قد يكون لكلا الخادمين عناوين IP عامة ويتحدثان مع بعضهما البعض عبر الإنترنت العام. هذا أمر سيء للأمان والأداء. الحل هو إنشاء شبكة خاصة." },
                { type: ContentType.PARAGRAPH, text: "VLAN (Virtual LAN) أو الشبكة الخاصة السحابية (VPC لدى مزودي الخدمات السحابية) تسمح لك بإنشاء شبكة معزولة ومنطقية لا يمكن الوصول إليها من الإنترنت العام. يمكنك وضع كل من خادم الويب وخادم قاعدة البيانات في هذه الشبكة الخاصة. سيتواصلان مع بعضهما البعض باستخدام عناوين IP خاصة (مثل `10.0.1.5`)." },
                { type: ContentType.HEADING4, text: "التكوين النموذجي" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>خادم الويب:</strong> لديه واجهتا شبكة: واحدة بعنوان IP عام (لخدمة المستخدمين) وواحدة بعنوان IP خاص (للتحدث مع قاعدة البيانات).",
                    "<strong>خادم قاعدة البيانات:</strong> لديه واجهة شبكة واحدة فقط: عنوان IP خاص. لا يمكن الوصول إليه على الإطلاق من الإنترنت العام."
                ]},
                { type: ContentType.PARAGRAPH, text: "هذا يعزل تمامًا أهم أصولك (قاعدة بياناتك). الطريقة الوحيدة للوصول إليها هي عبر خادم الويب المخترق أولاً. هذا مثال آخر على مبدأ 'الدفاع في العمق'." },
              ]
            }
        ]
    }
  ]
};
