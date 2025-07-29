import { Part, ContentType } from '../../types';

export const part4Content: Part = {
  id: "p4",
  partTitle: "الباب الرابع: الأمان والتحصين المتقدم",
  icon: "🛡️",
  chapters: [
     {
        id: "p4_c1", chapterTitle: "الفصل السادس عشر: تأمين Nginx بـ SSL/TLS",
        sections: [
            {
              id: "p4_c1_s1",
              icon: "🔒",
              title: "المستوى 75: كشف خبايا HTTPS ومصافحة TLS",
              content: [
                { type: ContentType.PARAGRAPH, text: "حتى الآن، كل حركة المرور بين مستخدمينا وخادمنا تنتقل كنص عادي عبر بروتوكول HTTP. هذا يعني أن أي شخص على الشبكة (مثل مزود خدمة الإنترنت، أو شخص على نفس شبكة Wi-Fi العامة) يمكنه اعتراض وقراءة كل شيء: كلمات المرور، البيانات الشخصية، ملفات تعريف الارتباط للجلسات. في عالم اليوم، هذا غير مقبول على الإطلاق. الحل هو HTTPS (بروتوكول نقل النص الفائق الآمن)." },
                { type: ContentType.PARAGRAPH, text: "HTTPS هو ببساطة HTTP مع طبقة أمان إضافية فوقه تسمى TLS (Transport Layer Security)، والتي كانت تُعرف سابقًا باسم SSL (Secure Sockets Layer). TLS يوفر ثلاث ضمانات أمنية حيوية:" },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "التشفير (Encryption)", definition: "يتم تشفير جميع البيانات المتبادلة بين المتصفح والخادم. إذا اعترضها أي شخص، فسيراها كبيانات عشوائية غير قابلة للقراءة بدون مفتاح فك التشفير." },
                    { term: "المصادقة (Authentication)", definition: "يستخدم الخادم شهادة SSL/TLS ليثبت للمتصفح أنه هو الخادم الحقيقي لـ `your_domain.com` وليس منتحلاً. هذا يمنع هجمات 'الوسيط' (Man-in-the-Middle)." },
                    { term: "السلامة (Integrity)", definition: "يتم التحقق من أن البيانات لم يتم تعديلها أو العبث بها أثناء النقل. يتم إرفاق توقيع رقمي مع كل رسالة، وأي تغيير بسيط سيؤدي إلى فشل التحقق من التوقيع." }
                ]},
                { type: ContentType.HEADING4, text: "ورشة عمل: تشريح مصافحة TLS (TLS Handshake)"},
                { type: ContentType.PARAGRAPH, text: "عندما تتصل بـ `https://google.com`، تحدث 'رقصة' معقدة في أجزاء من الثانية تسمى مصافحة TLS. إليك نسخة مبسطة لما يحدث خلف الكواليس، خطوة بخطوة:"},
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>1. العميل يقول مرحباً (Client Hello):</strong> يقول متصفحك للخادم: 'مرحباً، أريد بدء اتصال آمن. هذه هي إصدارات TLS التي أدعمها وهذه هي مجموعات التشفير التي أعرفها.'",
                    "<strong>2. الخادم يرد التحية (Server Hello):</strong> يرد الخادم: 'مرحباً أيضاً. لقد اخترت أقوى إصدار TLS ومجموعة تشفير ندعمها كلانا. إليك شهادتي العامة (Public Certificate).' هذه الشهادة تحتوي على المفتاح العام للخادم وموقعة من قبل هيئة إصدار شهادات (CA) موثوقة.",
                    "<strong>3. المتصفح يتحقق من الهوية:</strong> يتحقق متصفحك من توقيع الشهادة مقابل قائمة هيئات إصدار الشهادات الموثوقة المدمجة فيه (مثل DigiCert, GlobalSign). إذا كانت الشهادة موثوقة وصالحة للنطاق المطلوب، فإنه يعلم أنه يتحدث إلى الخادم الحقيقي.",
                    "<strong>4. تبادل المفاتيح السري:</strong> ينشئ المتصفح 'سرًا مشتركًا' جديدًا وفريدًا لهذه الجلسة (مفتاح جلسة متماثل). يقوم بتشفير هذا السر باستخدام المفتاح العام للخادم (الذي حصل عليه من الشهادة) ويرسله مرة أخرى. فقط الخادم، بمفتاحه الخاص المقابل، يمكنه فك تشفير هذا السر.",
                    "<strong>5. تم التشفير!:</strong> الآن، يمتلك كل من المتصفح والخادم نفس مفتاح الجلسة السري. يستخدمون هذا المفتاح لتشفير وفك تشفير جميع البيانات اللاحقة في هذه الجلسة. هذا التشفير المتماثل أسرع بكثير من التشفير غير المتماثل المستخدم في البداية."
                ]},
                { type: ContentType.NOTE, title: "أكثر من مجرد أمان", text: "في عام 2024، لم يعد HTTPS خيارًا. متصفحات الويب الحديثة مثل Chrome و Firefox تحذر المستخدمين بوضوح من المواقع التي لا تستخدم HTTPS وتصفها بأنها 'غير آمنة'. علاوة على ذلك، تعطي محركات البحث مثل Google دفعة في الترتيب للمواقع التي تستخدم HTTPS. لذا، فإن تمكين HTTPS ضروري للثقة والأمان وتجربة المستخدم وتحسين محركات البحث (SEO)." },
              ]
            },
            {
              id: "p4_c1_s2",
              icon: "📜",
              title: "المستوى 76: ورشة عمل Certbot: أتمتة التشفير",
              content: [
                { type: ContentType.PARAGRAPH, text: "في الماضي، كان الحصول على شهادة SSL عملية مكلفة ومعقدة تتطلب معرفة تقنية. لقد غيرت Let's Encrypt، وهي هيئة إصدار شهادات مجانية وآلية ومفتوحة، كل ذلك. Certbot هي الأداة (العميل) التي نستخدمها على خادمنا للتفاعل مع Let's Encrypt والحصول على هذه الشهادات المجانية وتثبيتها." },
                { type: ContentType.HEADING4, text: "كشف خبايا بروتوكول ACME" },
                { type: ContentType.PARAGRAPH, text: "يعمل Certbot باستخدام بروتوكول يسمى ACME (Automated Certificate Management Environment). ACME هو بروتوكول اتصال يسمح لـ Certbot (على خادمك) بالتحدث مع Let's Encrypt (الـ CA) لإثبات أنك تسيطر بالفعل على نطاقك، ومن ثم إصدار شهادة لك. الجزء الأكثر أهمية هو 'التحدي' (Challenge)." },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "تحدي HTTP-01 (الأكثر شيوعًا)", definition: "هذا هو ما يستخدمه `certbot --nginx`. 1) يخبر Certbot Let's Encrypt: 'أريد شهادة لـ `your_domain.com`'. 2) يرد Let's Encrypt: 'بالتأكيد. لإثبات أنك تملك هذا النطاق، قم بإنشاء ملف يحتوي على هذا الرمز السري العشوائي `XYZ` واجعله متاحًا على `http://your_domain.com/.well-known/acme-challenge/XYZ`'. 3) يقوم Certbot بإنشاء هذا الملف مؤقتًا على خادم Nginx الخاص بك. 4) يخبر Let's Encrypt: 'أنا جاهز'. 5) يحاول خادم Let's Encrypt تنزيل الملف من هذا العنوان. إذا نجح وتطابق الرمز السري، فهذا يثبت أنك تسيطر على الخادم، ويتم إصدار الشهادة." },
                    { term: "تحدي DNS-01", definition: "يستخدم هذا عندما لا يكون المنفذ 80 مفتوحًا أو للنطاقات البدل (`*.your_domain.com`). هنا، يطلب منك Let's Encrypt إنشاء سجل TXT معين في إعدادات DNS لنطاقك. هذا يتطلب أن يكون لدى Certbot وصول API إلى مزود DNS الخاص بك، مما يجعله أكثر تعقيدًا في الإعداد." }
                ]},
                { type: ContentType.HEADING4, text: "ورشة عمل التثبيت والتشغيل"},
                { type: ContentType.PARAGRAPH, text: "تثبيت Certbot عبر snap يضمن أنك تحصل دائمًا على أحدث إصدار. الأمر الرئيسي يقوم بكل السحر:"},
                { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
sudo certbot --nginx -d your_domain.com -d www.your_domain.com`},
                { type: ContentType.PARAGRAPH, text: "سيقوم هذا الأمر بالتحدث إلى Nginx، والعثور على كتلة الخادم الصحيحة، وتعديلها مؤقتًا لإكمال تحدي HTTP-01، ثم الحصول على الشهادة، وتثبيتها، وإعادة تحميل Nginx. كل ذلك في خطوة واحدة." },
                { type: ContentType.HEADING4, text: "ورشة عمل تصحيح الأخطاء: لماذا فشل التجديد؟"},
                { type: ContentType.PARAGRAPH, text: "أكثر سببين شيوعًا لفشل تجديد Certbot هما:"},
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>قواعد جدار الحماية:</strong> تأكد من أن المنفذ 80 مفتوح دائمًا للعالم. Let's Encrypt يحتاج إلى الوصول إليه لإجراء تحدي HTTP-01. حتى لو كنت تعيد توجيه كل شيء إلى 443، يجب أن يظل المنفذ 80 مفتوحًا.",
                    "<strong>مشاكل IPv6:</strong> إذا كان نطاقك يحتوي على سجل AAAA (IPv6) في DNS ولكنه لا يستمع بشكل صحيح على IPv6 على خادمك، فقد يحاول Let's Encrypt التحقق عبر IPv6 ويفشل. تأكد من أن Nginx الخاص بك يستمع على كل من IPv4 و IPv6 (`listen [::]:80;`)."
                ]},
              ]
            },
            {
              id: "p4_c1_s3",
              icon: "⚙️",
              title: "المستوى 77: تشريح تكوين Nginx الذي أنشأه Certbot",
              content: [
                { type: ContentType.PARAGRAPH, text: "يقوم `certbot --nginx` بتعديل ملف تكوين Nginx الخاص بك تلقائيًا. فهم هذه التغييرات يزيل الغموض ويمنحك القدرة على تخصيص التكوين. لقد تم تقسيم ملفك الأصلي إلى كتلتين `server`." },
                { type: ContentType.HEADING4, text: "كتلة الخادم الأولى: إعادة التوجيه الدائم من HTTP إلى HTTPS" },
                { type: ContentType.CODE_EXPLANATION, language: "nginx", codeTitle: "كتلة إعادة التوجيه", code: `server {
    listen 80;
    listen [::]:80;
    server_name your_domain.com www.your_domain.com;
    
    # This block is added by Certbot for renewals
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}`, explanations: [
                    { lines: "7-9", explanation: "هذه الكتلة مهمة. إنها تستثني مسار تحدي ACME من إعادة التوجيه، مما يسمح لـ Let's Encrypt بالتحقق من نطاقك عبر HTTP حتى بعد إعداد HTTPS." },
                    { lines: "11-13", explanation: "أي طلب آخر إلى المنفذ 80 يتم على الفور إعادة توجيهه بشكل دائم (301) إلى نفس عنوان URL ولكن باستخدام مخطط `https`. `$host` هو متغير Nginx يحتوي على اسم المضيف الذي طلبه المستخدم." }
                ]},
                { type: ContentType.HEADING4, text: "كتلة الخادم الثانية: تكوين SSL/TLS الفعلي" },
                { type: ContentType.CODE_EXPLANATION, language: "nginx", codeTitle: "كتلة HTTPS", code: `server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name your_domain.com www.your_domain.com;

    ssl_certificate /etc/letsencrypt/live/your_domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your_domain.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # ... The rest of your configuration (root, location, proxy_pass, etc.)
    # now lives inside this block.
}`, explanations: [
                    { lines: "2-3", explanation: "`listen 443 ssl`: يخبر Nginx بالاستماع على المنفذ 443 (المنفذ القياسي لـ HTTPS) وتفعيل SSL/TLS. `http2` يقوم بتمكين بروتوكول HTTP/2، وهو أسرع وأكثر كفاءة." },
                    { lines: "6-7", explanation: "هذه هي التوجيهات التي تشير إلى شهادتك ومفتاحك الخاص. لاحظ أن المسار يشير إلى `live`، وهو دليل يحتوي على روابط رمزية إلى أحدث ملفات الشهادات الفعلية. هذا يسمح بالتجديد السلس دون تغيير هذا التكوين." },
                    { lines: "8", explanation: "يقوم Certbot بإنشاء هذا الملف الذي يحتوي على إعدادات أمان TLS موصى بها (مثل الأصفار القوية والبروتوكولات الآمنة). استخدام `include` هنا يبقي تكوينك الرئيسي نظيفًا." },
                    { lines: "9", explanation: "`ssl_dhparam` يشير إلى ملف لمعلمات Diffie-Hellman، وهو ضروري لتمكين السرية الأمامية التامة (Perfect Forward Secrecy)." }
                ]},
              ]
            },
            {
              id: "p4_c1_s4",
              icon: "🔄",
              title: "المستوى 78: كشف خبايا أتمتة تجديد الشهادات",
              content: [
                { type: ContentType.PARAGRAPH, text: "شهادات Let's Encrypt صالحة لمدة 90 يومًا فقط. هذا التصميم المتعمد يشجع على الأتمتة ويقلل من الضرر الناجم عن اختراق المفاتيح. يقوم Certbot بإعداد هذه الأتمتة لك." },
                { type: ContentType.HEADING4, text: "مؤقت Systemd: الحارس الصامت" },
                { type: ContentType.PARAGRAPH, text: "عندما تقوم بتثبيت حزمة Certbot، فإنها تنشئ وتفعل مؤقت `systemd`. يمكنك رؤيته باستخدام:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo systemctl list-timers` },
                { type: ContentType.PARAGRAPH, text: "ابحث عن سطر يحتوي على `snap.certbot.renew.timer`. هذا المؤقت يقوم بتشغيل `certbot renew` مرتين يوميًا. هذا الأمر ذكي:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "يفحص جميع الشهادات المثبتة على الخادم.",
                    "يتحقق من تاريخ انتهاء صلاحية كل شهادة.",
                    "إذا كانت الشهادة ستنتهي في غضون 30 يومًا، فإنه سيحاول تجديدها.",
                    "إذا لم تكن الشهادة قريبة من انتهاء الصلاحية، فإنه لا يفعل شيئًا ويخرج بصمت."
                ]},
                { type: ContentType.HEADING4, text: "ورشة عمل: إجراء 'تشغيل جاف' والتحقق من الخطافات" },
                { type: ContentType.PARAGRAPH, text: "يمكنك محاكاة عملية التجديد للتأكد من أنها ستعمل عندما يحين الوقت." },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo certbot renew --dry-run` },
                { type: ContentType.PARAGRAPH, text: "إذا انتهى هذا الأمر بنجاح، فأنت جاهز. جزء مهم من هذا النجاح هو 'خطافات النشر' (deploy hooks). يقوم Certbot تلقائيًا بوضع نص برمجي في `/etc/letsencrypt/renewal-hooks/deploy/`. هذا النص البرمجي يتم تشغيله *فقط* بعد تجديد ناجح. بالنسبة لمكون Nginx الإضافي، هذا النص البرمجي يقوم بتشغيل `sudo systemctl reload nginx`، مما يضمن أن Nginx يبدأ في استخدام الشهادة الجديدة دون أي توقف في الخدمة." },
                { type: ContentType.NOTE, title: "التحقق من سجلات المؤقت", text: "إذا كنت تريد التحقق مما إذا كان المؤقت قد تم تشغيله بنجاح، يمكنك فحص سجلات systemd الخاصة به: `sudo journalctl -u snap.certbot.renew.service`." },
              ]
            },
            {
              id: "p4_c1_s5",
              icon: "✨",
              title: "المستوى 79: ورشة عمل: تحقيق درجة A+ على SSL Labs",
              content: [
                { type: ContentType.PARAGRAPH, text: "SSL Labs' SSL Test هي الأداة القياسية لتحليل قوة تكوين TLS الخاص بك. الحصول على درجة A+ ليس فقط للمفاخرة؛ إنه يضمن أنك تستخدم أقوى البروتوكولات والأصفار المتاحة. يوفر Certbot أساسًا جيدًا، ولكن يمكننا تحسينه." },
                { type: ContentType.HEADING4, text: "الخطوة 1: HSTS - الأمان الصارم لنقل HTTP" },
                { type: ContentType.PARAGRAPH, text: "HSTS هو ترويسة أمان تخبر المتصفح بالتواصل مع موقعك فقط عبر HTTPS. بعد الزيارة الأولى، لن يقوم المتصفح أبدًا بإجراء اتصال HTTP أولي مرة أخرى، مما يحمي من هجمات 'تجريد SSL'. أضف الترويسة التالية إلى كتلة الخادم `https` الخاصة بك:" },
                { type: ContentType.CODE_BLOCK, language: "nginx", code: `add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;` },
                { type: ContentType.PARAGRAPH, text: "**كشف الخبايا:** `max-age=31536000` يخبر المتصفح بتذكر هذه القاعدة لمدة عام واحد. `includeSubDomains` يطبق القاعدة على جميع النطاقات الفرعية. `preload` هي الخطوة الإضافية. بمجرد أن تكون واثقًا من تكوينك، يمكنك إرسال نطاقك إلى [hstspreload.org](https://hstspreload.org/). سيؤدي هذا إلى تضمين نطاقك مباشرة في كود المصدر للمتصفحات الرئيسية، مما يعني أنها لن تحاول أبدًا إجراء اتصال HTTP أولي، حتى في المرة الأولى التي يزور فيها المستخدم موقعك." },
                { type: ContentType.HEADING4, text: "الخطوة 2: تدبيس OCSP (OCSP Stapling)" },
                { type: ContentType.PARAGRAPH, text: "هذا تحسين للأداء. يقوم خادمك بالتحقق بشكل دوري من حالة إلغاء شهادته و 'يدبس' الاستجابة على شهادته، مما يوفر على متصفح المستخدم رحلة ذهاب وعودة. يتم تمكين هذا عادةً في ملف `options-ssl-nginx.conf` الذي أنشأه Certbot. تأكد من أن هذه الأسطر موجودة وغير معلقة:" },
                { type: ContentType.CODE_BLOCK, language: "nginx", code: `ssl_stapling on;
ssl_stapling_verify on;
# You also need to specify a trusted resolver for OCSP lookups
resolver 8.8.8.8 8.8.4.4 valid=300s;` },
                { type: ContentType.HEADING4, text: "الخطوة 3: مجموعات التشفير القوية (Strong Cipher Suites)" },
                { type: ContentType.PARAGRAPH, text: "يجب عليك تقييد خادمك لقبول مجموعات التشفير الحديثة والقوية فقط التي تدعم السرية الأمامية التامة (Perfect Forward Secrecy). مرة أخرى، يوفر Certbot قائمة جيدة في `options-ssl-nginx.conf`. يمكنك استخدام 'مولد تكوين SSL' من Mozilla للحصول على أحدث التوصيات. تأكد من أن تكوين `ssl_ciphers` الخاص بك يعطي الأولوية لأصفار `ECDHE` و `TLS_AES_256_GCM_SHA384`." },
                { type: ContentType.NOTE, title: "الاختبار، الاختبار، الاختبار", text: "بعد إجراء هذه التغييرات، أعد تشغيل Nginx (`sudo systemctl restart nginx`) وأعد تشغيل اختبار SSL Labs. يجب أن ترى الآن درجة A+ اللامعة. لقد قمت بتحويل خادمك من 'آمن' إلى 'محصن'." },
              ]
            }
        ]
    },
     {
        id: "p4_c2", chapterTitle: "الفصل السابع عشر: أنظمة كشف التسلل والحماية",
        sections: [
            {
              id: "p4_c2_s1",
              icon: "📝",
              title: "المستوى 80: ورشة عمل Fail2Ban: إنشاء مرشح وسجن مخصص",
              content: [
                { type: ContentType.PARAGRAPH, text: "قوة Fail2Ban الحقيقية هي قدرته على مراقبة أي ملف سجل لأي تطبيق. **السيناريو:** لدينا تطبيق Node.js/Express يسجل محاولات تسجيل الدخول الفاشلة إلى `/var/log/my-app.log` بالتنسيق التالي:" },
                { type: ContentType.PREFORMATTED_TEXT, text: `[2023-10-26T10:30:00Z] ERROR: Login failed for user 'admin' from IP 1.2.3.4` },
                { type: ContentType.HEADING4, text: "الخطوة 1: إنشاء مرشح مخصص (Filter)" },
                { type: ContentType.PARAGRAPH, text: "المرشح يخبر Fail2Ban بكيفية العثور على عناوين IP الضارة في السجل. سننشئ ملفًا جديدًا:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: "sudo nano /etc/fail2ban/filter.d/my-app-auth.conf" },
                { type: ContentType.CODE_EXPLANATION, language: "ini", codeTitle: "my-app-auth.conf", code: `[Definition]
failregex = ^.*ERROR: Login failed for user '.*' from IP <HOST>$
ignoreregex =`, explanations: [
                    { lines: "2", explanation: "`failregex` هو تعبير نمطي (regex). `<HOST>` هو عنصر نائب خاص بـ Fail2Ban يلتقط عنوان IP المطابق. هذا التعبير النمطي يطابق بالضبط تنسيق سطر السجل الخاص بنا." }
                ]},
                { type: ContentType.HEADING4, text: "الخطوة 2: إنشاء سجن مخصص (Jail)" },
                { type: ContentType.PARAGRAPH, text: "السجن يربط المرشح بملف سجل وإجراء. لا تعدل `jail.conf` مباشرة. بدلاً من ذلك، قم بإنشاء ملف `.local` للتجاوزات." },
                { type: ContentType.CODE_BLOCK, language: "bash", code: "sudo nano /etc/fail2ban/jail.d/my-app.local" },
                { type: ContentType.CODE_EXPLANATION, language: "ini", codeTitle: "my-app.local", code: `[my-app-auth]
enabled = true
port = http,https
filter = my-app-auth
logpath = /var/log/my-app.log
maxretry = 5
bantime = 1h
findtime = 10m`, explanations: [
                    { lines: "1", explanation: "اسم السجن. يجب أن يكون فريدًا." },
                    { lines: "2-7", explanation: "نقول لـ Fail2Ban أن هذا السجن ممكّن، ويجب أن يحظر حركة المرور على منافذ الويب، ويستخدم المرشح الذي أنشأناه، ويراقب ملف السجل الصحيح. `maxretry = 5`, `findtime = 10m`, `bantime = 1h` تعني: 'إذا رأيت 5 محاولات فاشلة من نفس IP في غضون 10 دقائق، فقم بحظره لمدة ساعة'." },
                  ] },
                { type: ContentType.HEADING4, text: "الخطوة 3: أعد التشغيل واختبر" },
                { type: ContentType.PARAGRAPH, text: "أعد تشغيل Fail2Ban (`sudo systemctl restart fail2ban`). يمكنك اختبار التعبير النمطي الخاص بك باستخدام: `fail2ban-regex /var/log/my-app.log /etc/fail2ban/filter.d/my-app-auth.conf`. يجب أن يظهر لك عدد المطابقات. لقد قمت الآن بتوسيع Fail2Ban لحماية تطبيقك المخصص." },
              ]
            },
            {
                id: "p4_c2_s2",
                icon: "🔔",
                title: "المستوى 81: إعداد تنبيهات Fail2Ban عبر البريد الإلكتروني",
                content: [
                  { type: ContentType.PARAGRAPH, text: "الحظر التلقائي رائع، ولكن من المفيد أيضًا أن تعرف متى يتم حظر شخص ما. يمكن لـ Fail2Ban إرسال بريد إلكتروني مفصل في كل مرة يتخذ فيها إجراءً. يتطلب هذا إعداد وكيل نقل البريد (MTA) مثل `postfix` على خادمك." },
                  { type: ContentType.HEADING4, text: "الخطوة 1: تثبيت وتكوين Postfix" },
                  { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo apt update
sudo apt install postfix mailutils -y`},
                  { type: ContentType.PARAGRAPH, text: "أثناء التثبيت، اختر 'Internet Site'. اضبط 'system mail name' على نطاقك. بعد ذلك، ستحتاج إلى تكوين Postfix لإعادة توجيه البريد عبر مزود بريد إلكتروني حقيقي (مثل SendGrid أو Mailgun) لتجنب وضع علامة على رسائلك كبريد عشوائي. يتضمن هذا تعديل `/etc/postfix/main.cf` وتكوين مصادقة SMTP." },
                  { type: ContentType.HEADING4, text: "الخطوة 2: تكوين إجراء البريد الإلكتروني في Fail2Ban" },
                  { type: ContentType.PARAGRAPH, text: "في ملف `/etc/fail2ban/jail.d/my-app.local`، قم بتعديل سجنك ليشمل إعدادات البريد الإلكتروني:" },
                  { type: ContentType.CODE_EXPLANATION, language: "ini", codeTitle: "تحديث my-app.local", code: `[my-app-auth]
# ... (enabled, port, filter, logpath, etc.) ...
destemail = your.email@example.com
sender = fail2ban@your_domain.com
action = %(action_mwl)s`, explanations: [
                      { lines: "3", explanation: "`destemail` هو عنوان البريد الإلكتروني الذي سيتلقى التنبيهات." },
                      { lines: "4", explanation: "`sender` هو عنوان 'من'." },
                      { lines: "5", explanation: "`action` هو أهم جزء. `%(action_mwl)s` هو اختصار لإجراء مدمج يعني: 'قم بالحظر وأرسل بريدًا إلكترونيًا يحتوي على تقرير `whois` وسطور السجل ذات الصلة'. هناك إجراءات أخرى مثل `%(action_m)s` (بريد إلكتروني فقط) أو `%(action_mw)s` (بريد إلكتروني + whois)." }
                  ] },
                  { type: ContentType.PARAGRAPH, text: "أعد تشغيل Fail2Ban. الآن، في المرة التالية التي يتم فيها تشغيل هذا السجن، ستتلقى بريدًا إلكترونيًا يحتوي على تفاصيل كاملة عن المهاجم، مما يمنحك رؤية فورية للتهديدات ضد تطبيقك." },
                ]
            },
            {
                id: "p4_c2_s3",
                icon: "👁️",
                title: "المستوى 82: مقدمة إلى HIDS ودراسة حالة Wazuh",
                content: [
                  { type: ContentType.PARAGRAPH, text: "Fail2Ban ممتاز لمراقبة السجلات، لكنه لا يرى ما يحدث في بقية النظام. نظام كشف التسلل المستند إلى المضيف (HIDS) يفعل ذلك. Wazuh هو HIDS مفتوح المصدر ورائد. إنه يعمل من خلال نموذج وكيل/خادم: تقوم بتثبيت وكيل (agent) خفيف الوزن على كل خادم تريد مراقبته، ويقوم هذا الوكيل بجمع البيانات وإرسالها إلى خادم Wazuh مركزي للتحليل." },
                  { type: ContentType.HEADING4, text: "ما الذي يراقبه وكيل Wazuh؟" },
                  { type: ContentType.LIST_UNORDERED, items: [
                      "<strong>سلامة الملفات (File Integrity Monitoring - FIM):</strong> يراقب التغييرات (الإنشاء، التعديل، الحذف) في الملفات والدلائل الحيوية. هذا هو جوهر HIDS.",
                      "<strong>كشف أدوات الاختراق (Rootkit Detection):</strong> يبحث عن علامات أدوات الاختراق الشائعة.",
                      "<strong>سجلات النظام والتطبيقات:</strong> يجمع السجلات من مصادر متعددة، ويقوم بتطبيعها، وتحليلها بحثًا عن مؤشرات الهجوم.",
                      "<strong>تكوين الأمان:</strong> يتحقق بشكل دوري من تكوين النظام مقابل معايير الأمان (مثل CIS Benchmarks).",
                      "<strong>نشاط الشبكة والعمليات:</strong> يراقب العمليات الجديدة والاتصالات الشبكية المشبوهة."
                  ] },
                  { type: ContentType.HEADING4, text: "دراسة حالة: القبض على متسلل متلبسًا" },
                  { type: ContentType.PARAGRAPH, text: "**السيناريو:** تمكن مهاجم من الوصول إلى خادمك. لإخفاء آثاره، يحاول استبدال الأمر `/bin/ls` بإصدار معدل يخفي ملفاته وعملياته. لنرى كيف يكتشف Wazuh هذا." },
                  { type: ContentType.PARAGRAPH, text: "عندما يتم تثبيت وكيل Wazuh، فإنه يقوم بمسح أولي للملفات الحيوية في النظام (في `/bin`, `/sbin`, `/etc`، إلخ). يقوم بحساب المجموع الاختباري (checksum) لكل ملف (مثل SHA256) ويخزن هذه 'الحالة الذهبية' في قاعدة بياناته. يقوم الوكيل بعد ذلك بإعادة فحص هذه الدلائل بشكل دوري. عندما يقوم المهاجم باستبدال `/bin/ls`، سيلاحظ Wazuh في الفحص التالي أن المجموع الاختباري للملف قد تغير." },
                  { type: ContentType.PARAGRAPH, text: "سيقوم الوكيل على الفور بإرسال تنبيه إلى مدير Wazuh، والذي سيظهر في لوحة التحكم (Kibana). سيبدو التنبيه شيئًا كهذا:" },
                  { type: ContentType.PREFORMATTED_TEXT, text: `**Rule: 550 - Integrity checksum changed.**
**Level:** 7 (High importance)
**Location:** web-server-1
**File:** /bin/ls
**Description:** Integrity checksum changed for '/bin/ls'.
**Old Checksum:** sha256:abc...
**New Checksum:** sha256:xyz...` },
                  { type: ContentType.PARAGRAPH, text: "هذا التنبيه هو دليل قاطع على وجود تسوية. يخبرك بالضبط بالملف الذي تم تغييره، ومتى، وكيف. بدون HIDS، قد تمر هذه الأنواع من التعديلات الخفية دون أن يلاحظها أحد لأسابيع أو أشهر." },
                ]
            },
            {
                id: "p4_c2_s4",
                icon: "📦",
                title: "المستوى 83: تثبيت وتكوين وكيل Wazuh",
                content: [
                  { type: ContentType.PARAGRAPH, text: "يتطلب Wazuh خادمًا مركزيًا، والذي غالبًا ما يتم تثبيته باستخدام Docker أو كحزمة. بمجرد تشغيل الخادم، فإن إضافة وكيل أمر بسيط. سنفترض أن خادم Wazuh الخاص بك موجود على `10.0.0.5`." },
                  { type: ContentType.HEADING4, text: "الخطوة 1: تسجيل الوكيل (على خادم Wazuh)" },
                  { type: ContentType.PARAGRAPH, text: "تحتاج إلى تسجيل كل وكيل جديد والحصول على مفتاح مصادقة فريد له." },
                  { type: ContentType.HEADING4, text: "الخطوة 2: تثبيت الوكيل (على خادم الويب الخاص بك)" },
                  { type: ContentType.CODE_BLOCK, language: "bash", code: `curl -so wazuh-agent.deb https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent_4.5.2-1_amd64.deb
sudo WAZUH_MANAGER='10.0.0.5' WAZUH_AGENT_NAME='web-server-01' dpkg -i ./wazuh-agent.deb` },
                  { type: ContentType.PARAGRAPH, text: "نقوم بتمرير عنوان IP للخادم واسم فريد للوكيل كمتغيرات بيئة أثناء التثبيت." },
                  { type: ContentType.HEADING4, text: "الخطوة 3: استيراد المفتاح وبدء التشغيل" },
                  { type: ContentType.PARAGRAPH, text: "أنت الآن بحاجة إلى استيراد المفتاح الذي تم إنشاؤه في الخطوة 1." },
                  { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo /var/ossec/bin/manage_agents -i <KEY_FROM_STEP_1>
sudo systemctl daemon-reload
sudo systemctl enable wazuh-agent
sudo systemctl start wazuh-agent` },
                  { type: ContentType.PARAGRAPH, text: "سيقوم الوكيل الآن بالاتصال بالخادم، وتنزيل تكوينه المركزي، والبدء في مراقبة نظامك." },
                ]
            },
            {
                id: "p4_c2_s5",
                icon: "🛡️",
                title: "المستوى 84: ورشة عمل ModSecurity: حظر هجوم حقن SQL",
                content: [
                  { type: ContentType.PARAGRAPH, text: "جدار حماية تطبيقات الويب (WAF) مثل ModSecurity يفحص حركة مرور HTTP الفعلية بحثًا عن أنماط الهجوم. إنه يعمل كمرشح بين الإنترنت و Nginx. **السيناريو:** يحاول مهاجم استغلال ثغرة حقن SQL في معلمة URL." },
                  { type: ContentType.PARAGRAPH, text: "الطلب الضار:" },
                  { type: ContentType.PREFORMATTED_TEXT, text: `GET /products?id=123' OR 1=1; --` },
                  { type: ContentType.HEADING4, text: "آلية الكشف: مجموعة القواعد الأساسية لـ OWASP (CRS)" },
                  { type: ContentType.PARAGRAPH, text: "بعد تثبيت ModSecurity و CRS، يمر كل طلب عبر محرك القواعد. إحدى القواعد في CRS (على وجه التحديد القاعدة 942100) مصممة للبحث عن أنماط حقن SQL الشائعة. عندما يرى ModSecurity هذا الطلب، سيحدث ما يلي:" },
                  { type: ContentType.LIST_UNORDERED, items: [
                      "يطابق الجزء `' OR 1=1` مع نمط معروف في القاعدة 942100.",
                      "يزيد 'درجة الشذوذ' (anomaly score) للطلب.",
                      "نظرًا لأن حقن SQL خطير، فإن هذه القاعدة الواحدة ستزيد الدرجة بما يكفي لتجاوز الحد الافتراضي.",
                      "سيقوم ModSecurity بحظر الطلب وإرجاع استجابة `403 Forbidden` إلى المهاجم.",
                      "سيتم تسجيل الهجوم في سجل تدقيق ModSecurity (`/var/log/modsec_audit.log`)."
                  ] },
                  { type: ContentType.HEADING4, text: "سجل التدقيق" },
                  { type: ContentType.PARAGRAPH, text: "سيحتوي السجل على تفاصيل كاملة عن الهجوم:" },
                  { type: ContentType.PREFORMATTED_TEXT, text: `---b8a7b3e8---
[26/Oct/2023:11:00:00 +0000] ...
Request: GET /products?id=123' OR 1=1; --
...
Message: SQL Injection Attack Detected via libinjection
...
Action: Intercepted (phase 2)
...` },
                  { type: ContentType.NOTE, title: "الإيجابيات الكاذبة (False Positives)", text: "أكبر تحدٍ مع WAFs هو الإيجابيات الكاذبة، حيث يتم حظر الطلبات الشرعية عن طريق الخطأ. يتطلب ضبط ModSecurity و CRS وقتًا وخبرة. ابدأ دائمًا في وضع الكشف فقط (`SecRuleEngine DetectionOnly`) وقم بتحليل السجلات قبل التبديل إلى وضع الحظر (`SecRuleEngine On`)." },
                ]
            }
        ]
    },
     {
        id: "p4_c3", chapterTitle: "الفصل الثامن عشر: تدقيق النظام وتقويته",
        sections: [
            {
              id: "p4_c3_s1",
              icon: "🔍",
              title: "المستوى 85: ورشة عمل `lynis`: من C إلى A",
              content: [
                { type: ContentType.PARAGRAPH, text: "`lynis` هي أداة تدقيق أمان تقوم بفحص نظامك مقابل مئات من أفضل الممارسات الأمنية وتقدم توصيات لتقويته. **السيناريو:** سنقوم بإجراء فحص 'قبل وبعد' على خادم Ubuntu جديد." },
                { type: ContentType.HEADING4, text: "الفحص الأول (قبل)" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo apt install lynis -y
sudo lynis audit system` },
                { type: ContentType.PARAGRAPH, text: "بعد اكتمال الفحص، قد يعطيك `lynis` 'درجة تقوية' أولية، لنقل 65. سيقدم قائمة طويلة من التحذيرات والاقتراحات. لنركز على اثنين من أهمها:" },
                { type: ContentType.PREFORMATTED_TEXT, text: `  * Harden the system by installing at least one malware scanner. [SECURITY-5120]
  * Harden compilers by installing 'hardening-wrapper'. [HARD-8264]
  * Consider hardening SSH configuration. [SSH-7408]` },
                { type: ContentType.HEADING4, text: "الخطوة 2: الإصلاح" },
                { type: ContentType.PARAGRAPH, text: "بناءً على الاقتراحات، سنقوم بتنفيذ الإصلاحات:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `# Fix 1: Install a malware scanner
sudo apt install chkrootkit -y

# Fix 2: Install hardening-wrapper
sudo apt install hardening-wrapper -y

# Fix 3: Harden SSH (add ClientAliveInterval)
echo "ClientAliveInterval 300" | sudo tee -a /etc/ssh/sshd_config
sudo systemctl restart sshd` },
                { type: ContentType.HEADING4, text: "الفحص الثاني (بعد)" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo lynis audit system` },
                { type: ContentType.PARAGRAPH, text: "هذه المرة، يجب أن تكون درجة التقوية أعلى بكثير (على سبيل المثال، 80). التحذيرات التي عالجناها ستختفي. هذا يوضح كيف يمكن استخدام `lynis` كخارطة طريق منهجية لتحسين أمان خادمك." },
              ]
            },
            {
                id: "p4_c3_s2",
                icon: "🦠",
                title: "المستوى 86: استخدام `chkrootkit` و `rkhunter` للبحث عن أدوات الاختراق",
                content: [
                  { type: ContentType.PARAGRAPH, text: "أدوات الاختراق (Rootkits) هي برامج ضارة مصممة لإخفاء وجودها ووجود برامج ضارة أخرى على النظام. `chkrootkit` و `rkhunter` هما أداتان كلاسيكيتان لسطر الأوامر تبحثان عن علامات شائعة للإصابة." },
                  { type: ContentType.HEADING4, text: "كيف تعمل؟" },
                  { type: ContentType.PARAGRAPH, text: "تقوم هذه الأدوات بسلسلة من الاختبارات، بما في ذلك:" },
                  { type: ContentType.LIST_UNORDERED, items: [
                      "مقارنة خصائص الملفات الثنائية الهامة للنظام (مثل `ls`, `ps`) بنُسخ جيدة معروفة.",
                      "البحث عن توقيعات أدوات الاختراق المعروفة في الملفات.",
                      "التحقق من وجود واجهات شبكة في وضع promiscuous.",
                      "فحص الملفات المخفية في دلائل النظام."
                  ] },
                  { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo apt install chkrootkit rkhunter -y
# تحديث قاعدة بيانات rkhunter
sudo rkhunter --update
# تشغيل الفحوصات
sudo chkrootkit
sudo rkhunter --check` },
                  { type: ContentType.NOTE, title: "الإيجابيات الكاذبة والقيود", text: "يمكن لهذه الأدوات أن تنتج أحيانًا إيجابيات كاذبة. من المهم التحقيق في أي نتائج. علاوة على ذلك، يمكن لأدوات الاختراق الحديثة أن تتجنب هذه الأنواع من الفحوصات. لهذا السبب، تعد أدوات مثل Wazuh (HIDS) التي تراقب سلوك النظام في الوقت الفعلي أكثر فعالية ضد التهديدات المتقدمة." },
                ]
            },
            {
              id: "p4_c3_s3",
              icon: "🧠",
              title: "المستوى 87: كشف خبايا تقوية نواة لينكس (Kernel Hardening)",
              content: [
                { type: ContentType.PARAGRAPH, text: "تقوية النواة عبر `sysctl` هي إحدى أكثر الطرق فعالية للحماية من الهجمات على مستوى الشبكة. لن نتعلم فقط 'ماذا' نغير، ولكن 'لماذا' يعمل. يتم إجراء هذه التغييرات في `/etc/sysctl.conf`." },
                { type: ContentType.HEADING4, text: "دراسة حالة 1: منع انتحال IP مع `rp_filter`" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.default.rp_filter = 1`},
                { type: ContentType.PARAGRAPH, text: "**لماذا يعمل؟** `rp_filter` (Reverse Path Filtering) يقوم بإجراء فحص بسيط ولكنه قوي: عندما تصل حزمة من واجهة شبكة معينة، تتحقق النواة من جدول التوجيه الخاص بها. هل سترسل حزمة *عائدة* إلى عنوان IP المصدر هذا عبر نفس الواجهة التي وصلت منها؟ إذا كانت الإجابة لا، فهذا يعني على الأرجح أن عنوان IP المصدر مزيف (منتحل)، وتقوم النواة بإسقاط الحزمة. هذا يخفف من هجمات DDoS التي تستخدم عناوين IP منتحلة." },
                { type: ContentType.HEADING4, text: "دراسة حالة 2: النجاة من فيضان SYN مع `tcp_syncookies`" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `net.ipv4.tcp_syncookies = 1`},
                { type: ContentType.PARAGRAPH, text: "**لماذا يعمل؟** هجوم فيضان SYN يهدف إلى استنفاد 'قائمة انتظار' الاتصالات المعلقة في الخادم عن طريق إرسال عدد كبير من حزم SYN الأولية دون إكمال المصافحة الثلاثية. عندما تكون `tcp_syncookies` ممكّنة وتمتلئ قائمة الانتظار، لا يقوم الخادم بتخصيص ذاكرة للاتصال الجديد. بدلاً من ذلك، فإنه يرسل استجابة SYN-ACK خاصة تحتوي على جميع المعلومات اللازمة مشفرة في رقم التسلسل (`syncookie`). إذا كان العميل شرعيًا، فسيرد بالرقم الصحيح، ويمكن للخادم إعادة بناء الاتصال من الصفر. هذا يسمح للخادم بالاستمرار في قبول الاتصالات الشرعية حتى أثناء تعرضه لهجوم." },
                { type: ContentType.PARAGRAPH, text: "لتطبيق التغييرات: `sudo sysctl -p`." },
              ]
            },
            {
              id: "p4_c3_s4",
              icon: "📂",
              title: "المستوى 88: ورشة عمل تدقيق الأذونات: العثور على أبواب خلفية",
              content: [
                { type: ContentType.PARAGRAPH, text: "يمكن أن تكون الأذونات غير الصحيحة للملفات بمثابة ناقل لتصعيد الامتيازات. **السيناريو:** قام مسؤول نظام سابق بترك نص برمجي 'مساعد' في `/usr/local/bin/cleanup.sh` لمساعدته في تنظيف سجلات `root`. لتسهيل الأمور، قام بتعيين بت SUID عليه." },
                { type: ContentType.HEADING4, text: "الخطوة 1: البحث عن ملفات SUID المشبوهة" },
                { type: ContentType.PARAGRAPH, text: "ملفات SUID (Set User ID) هي ملفات يتم تنفيذها بصلاحيات المالك، وليس المستخدم الذي قام بتشغيلها. هذا ضروري لأدوات مثل `passwd`، ولكنه خطير للغاية للملفات المخصصة." },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `find / -type f -perm -4000 -exec ls -l {} \\; 2>/dev/null`},
                { type: ContentType.PARAGRAPH, text: "في المخرجات، ترى `/usr/local/bin/cleanup.sh` مملوكًا لـ `root` ومعه بت SUID. هذا أمر غير عادي للغاية لنص برمجي." },
                { type: ContentType.HEADING4, text: "الخطوة 2: فحص الملف والاستغلال" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `cat /usr/local/bin/cleanup.sh`},
                { type: ContentType.PREFORMATTED_TEXT, text: `#!/bin/bash
rm -rf /var/log/oldlogs/*`},
                { type: ContentType.PARAGRAPH, text: "يبدو بريئًا. ولكن نظرًا لأنه يتم تشغيله كـ `root` ويستخدم مسارًا نسبيًا (`rm`)، يمكننا استغلال كيفية عمل متغير `PATH` في النصوص البرمجية." },
                { type: ContentType.PARAGRAPH, text: "كمستخدم عادي، نقوم بالآتي:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `cd /tmp
echo "/bin/bash" > rm
chmod +x rm
export PATH=/tmp:$PATH
/usr/local/bin/cleanup.sh`},
                { type: ContentType.PARAGRAPH, text: "**ماذا حدث؟** عندما يقوم النص البرمجي `cleanup.sh` (الذي يعمل كـ `root`) باستدعاء `rm`، فإنه يبحث في `PATH` الخاص بنا أولاً. يجد `/tmp/rm`، وهو في الواقع مجرد نص برمجي يقوم بتشغيل `bash`. نظرًا لأن النص الأصلي يعمل كـ `root`، فإن هذا الـ `bash` الجديد يتم تشغيله أيضًا كـ `root`. لقد حصلت للتو على جلسة `root`." },
                { type: ContentType.HEADING4, text: "الإصلاح:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>الصحيح:</strong> `sudo chmod u-s /usr/local/bin/cleanup.sh` (إزالة بت SUID).",
                    "<strong>الأفضل:</strong> حذف النص البرمجي غير الضروري."
                ]},
              ]
            },
            {
                id: "p4_c3_s5",
                icon: "💾",
                title: "المستوى 89: تأمين الذاكرة المشتركة (`/dev/shm`)",
                content: [
                  { type: ContentType.PARAGRAPH, text: "`/dev/shm` هو نظام ملفات مؤقت يتم تخزينه بالكامل في الذاكرة (tmpfs). تستخدمه بعض التطبيقات (مثل متصفحات الويب أو قواعد البيانات) للاتصال بين العمليات بسرعة. المشكلة هي أنه بشكل افتراضي، يمكن تركيبه مع أذونات تسمح بالتنفيذ." },
                  { type: ContentType.HEADING4, text: "التهديد" },
                  { type: ContentType.PARAGRAPH, text: "يمكن للمهاجم الذي حصل على وصول منخفض الامتيازات استخدام `/dev/shm` لتنزيل وتجميع وتشغيل برامج ضارة. نظرًا لأنه في الذاكرة، فقد يتجنب بعض أدوات الفحص المستندة إلى القرص." },
                  { type: ContentType.HEADING4, text: "الحل: إعادة التركيب مع خيارات آمنة" },
                  { type: ContentType.PARAGRAPH, text: "يمكننا ضمان أن `/dev/shm` يتم تركيبه دائمًا بخيارات آمنة عن طريق إضافة إدخال إلى `/etc/fstab`. هذا الملف يحدد كيفية تركيب أنظمة الملفات عند بدء التشغيل." },
                  { type: ContentType.CODE_BLOCK, language: "bash", code: `echo "tmpfs /dev/shm tmpfs defaults,noexec,nosuid,nodev 0 0" | sudo tee -a /etc/fstab` },
                  { type: ContentType.DEFINITION_LIST, definitionItems: [
                      { term: "noexec", definition: "يمنع تنفيذ أي ملفات ثنائية من هذا الموقع." },
                      { term: "nosuid", definition: "يتجاهل بتات SUID/SGID." },
                      { term: "nodev", definition: "يمنع إنشاء ملفات الأجهزة." }
                  ] },
                  { type: ContentType.PARAGRAPH, text: "للتطبيق فورًا دون إعادة التشغيل: `sudo mount -o remount /dev/shm`." },
                ]
            }
        ]
    },
     {
        id: "p4_c4", chapterTitle: "الفصل التاسع عشر: أمان التطبيقات",
        sections: [
            {
              id: "p4_c4_s1",
              icon: "💉",
              title: "المستوى 90: دراسة حالة: XSS, CSRF, SQLi",
              content: [
                { type: ContentType.HEADING4, text: "حقن SQL: من سيء إلى جيد" },
                { type: ContentType.PARAGRAPH, text: "**سيء (Node.js):** يتم بناء الاستعلام عن طريق ربط السلاسل مباشرة. إذا كان `req.query.category` هو `' OR 1=1; --`، فسيتم إرجاع جميع المنتجات." },
                { type: ContentType.CODE_BLOCK, language: "javascript", code: `const query = \`SELECT * FROM products WHERE category = '\${req.query.category}'\`;
const { rows } = await pool.query(query);` },
                { type: ContentType.PARAGRAPH, text: "**جيد (Node.js):** نستخدم استعلامات ذات معلمات (Parameterized Queries). يتم إرسال الاستعلام والبيانات إلى قاعدة البيانات بشكل منفصل. قاعدة البيانات هي المسؤولة عن الهروب الآمن للبيانات." },
                { type: ContentType.CODE_BLOCK, language: "javascript", code: `const query = 'SELECT * FROM products WHERE category = $1';
const { rows } = await pool.query(query, [req.query.category]);` },
                { type: ContentType.HEADING4, text: "البرمجة النصية عبر المواقع (XSS): من سيء إلى جيد" },
                { type: ContentType.PARAGRAPH, text: "**سيء (React):** استخدام `dangerouslySetInnerHTML` دون تعقيم المدخلات. إذا كان `comment.text` يحتوي على `<img src=x onerror=alert('XSS')>`، فسيتم تنفيذه." },
                { type: ContentType.CODE_BLOCK, language: "jsx", code: `<div dangerouslySetInnerHTML={{ __html: comment.text }} />` },
                { type: ContentType.PARAGRAPH, text: "**جيد (React):** بشكل افتراضي، يقوم React بالهروب من كل شيء. ببساطة قم بعرض المحتوى. سيتم عرضه كنص." },
                { type: ContentType.CODE_BLOCK, language: "jsx", code: `<div>{comment.text}</div>` },
                { type: ContentType.HEADING4, text: "تزوير الطلبات عبر المواقع (CSRF): من سيء إلى جيد" },
                { type: ContentType.PARAGRAPH, text: "**سيء:** نموذج بسيط لتغيير البريد الإلكتروني. إذا قام مستخدم مسجل دخوله بزيارة موقع ضار يحتوي على نموذج مخفي يتم إرساله تلقائيًا إلى `/update-email`، فسيتم تغيير بريده الإلكتروني دون علمه." },
                { type: ContentType.CODE_BLOCK, language: "html", code: `<form action="/update-email" method="POST">
  <input type="email" name="email" value="hacker@example.com">
</form>` },
                 { type: ContentType.PARAGRAPH, text: "**جيد (Express.js):** نستخدم middleware مثل `csurf` لإنشاء رمز فريد لكل جلسة. يجب تضمين هذا الرمز في كل طلب POST." },
                { type: ContentType.CODE_BLOCK, language: "javascript", code: `// In your form (rendered by server)
<input type="hidden" name="_csrf" value="<%= csrfToken %>">

// In your server middleware
const csrfProtection = csrf({ cookie: true });
app.post('/update-email', csrfProtection, (req, res) => {
  // ... update email ...
});` },
              ]
            },
            {
              id: "p4_c4_s2",
              icon: "🏷️",
              title: "المستوى 91: ورشة عمل ترويسات الأمان: بناء حصن",
              content: [
                { type: ContentType.PARAGRAPH, text: "يمكن تكوين ترويسات الأمان في Nginx لمنع فئات كاملة من الهجمات. لنقم ببناء مقتطف قوي." },
                { type: ContentType.CODE_EXPLANATION, language: "nginx", codeTitle: "/etc/nginx/snippets/security-headers.conf", code: `# HSTS (HTTP Strict Transport Security) for 1 year
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

# Prevent MIME-sniffing
add_header X-Content-Type-Options "nosniff" always;

# Prevent Clickjacking
add_header X-Frame-Options "SAMEORIGIN" always;

# Control information shared with other sites
add_header Referrer-Policy "strict-origin-when-cross-origin" always;

# A very strict Content-Security-Policy (CSP) as a starting point
# This allows resources only from the same origin. You will likely need to expand this.
add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self'; form-action 'self';" always;`, explanations: [
                    { lines: "2", explanation: "يفرض HTTPS، كما تمت مناقشته سابقًا." },
                    { lines: "5", explanation: "يمنع المتصفح من محاولة تخمين نوع المحتوى، مما يحمي من هجمات XSS." },
                    { lines: "8", explanation: "يمنع تحميل موقعك داخل `<iframe>` على موقع آخر." },
                    { lines: "11", explanation: "يتحكم في مقدار المعلومات المرجعية التي يتم إرسالها عند النقر على رابط." },
                    { lines: "14-16", explanation: "هذه هي سياسة أمان المحتوى (CSP). هذه السياسة المحددة صارمة للغاية. إنها تمنع تحميل أي نصوص برمجية أو أنماط أو صور من نطاقات خارجية. ستحتاج على الأرجح إلى تعديلها لتشمل نطاقات CDN أو Google Fonts التي تستخدمها." }
                ]},
                { type: ContentType.PARAGRAPH, text: "يمكنك بعد ذلك تضمين هذا الملف في كتلة الخادم الخاصة بك: `include /etc/nginx/snippets/security-headers.conf;`." },
              ]
            },
            {
                id: "p4_c4_s3",
                icon: "✅",
                title: "المستوى 92: التحقق من صحة المدخلات لمنع هجمات الحقن",
                content: [
                  { type: ContentType.PARAGRAPH, text: "التحقق من صحة المدخلات هو أكثر من مجرد منع حقن SQL. يتعلق الأمر بفرض قواعد صارمة على كل جزء من البيانات التي تدخل نظامك. القاعدة الذهبية هي: **لا تثق أبدًا في مدخلات المستخدم**." },
                  { type: ContentType.HEADING4, text: "مستويات التحقق من الصحة" },
                  { type: ContentType.LIST_UNORDERED, items: [
                      "<strong>التحقق من الصحة من جانب العميل (Client-side):</strong> باستخدام سمات HTML5 (`required`, `type='email'`) أو JavaScript. هذا جيد لتحسين تجربة المستخدم، ولكنه **ليس إجراءً أمنيًا**. يمكن للمهاجم تجاوزه بسهولة.",
                      "<strong>التحقق من الصحة من جانب الخادم (Server-side):</strong> هذا هو المكان الذي يحدث فيه الأمان الحقيقي. يجب أن يتحقق الخادم دائمًا من صحة كل شيء، حتى لو تم التحقق منه بالفعل على الواجهة الأمامية."
                  ] },
                  { type: ContentType.HEADING4, text: "دراسة حالة: استخدام `express-validator`" },
                  { type: ContentType.CODE_BLOCK, language: "javascript", code: `const { body, validationResult } = require('express-validator');

app.post('/register',
  // Middleware للتحقق من الصحة
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 chars long'),
  body('age').isInt({ min: 18, max: 99 }),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // ... proceed with registration ...
  }
);` },
                ]
            },
            {
                id: "p4_c4_s4",
                icon: "🍪",
                title: "المستوى 93: إدارة الجلسات وملفات تعريف الارتباط بأمان",
                content: [
                  { type: ContentType.PARAGRAPH, text: "الجلسات هي ذاكرة تطبيق الويب. إدارتها بشكل غير آمن يمكن أن تؤدي إلى اختطاف الجلسة (session hijacking)." },
                  { type: ContentType.HEADING4, text: "أفضل ممارسات ملفات تعريف الارتباط للجلسات" },
                  { type: ContentType.PARAGRAPH, text: "عند تكوين middleware الجلسة (مثل `express-session`)، استخدم دائمًا هذه الخيارات للإنتاج:" },
                  { type: ContentType.CODE_BLOCK, language: "javascript", code: `cookie: {
  secure: true,       // Only send cookie over HTTPS
  httpOnly: true,     // Prevent JavaScript access to the cookie
  sameSite: 'lax'     // Mitigates CSRF attacks. 'strict' is even better.
}` },
                  { type: ContentType.HEADING4, text: "التخزين من جانب الخادم هو الملك" },
                  { type: ContentType.PARAGRAPH, text: "تجنب تخزين أي بيانات حساسة في JWTs من جانب العميل. JWTs رائعة للمصادقة بين الخدمات، ولكن للجلسات، من الأفضل تخزين معرف جلسة عشوائي وغير شفاف فقط في ملف تعريف الارتباط، وتخزين جميع بيانات الجلسة الفعلية في مخزن من جانب الخادم مثل Redis. هذا يسمح لك بإلغاء جلسة على الفور عن طريق حذفها من Redis." },
                ]
            },
            {
              id: "p4_c4_s5",
              icon: "🔟",
              title: "المستوى 94: دراسة حالة OWASP: التحكم في الوصول المعطل",
              content: [
                { type: ContentType.PARAGRAPH, text: "هذا هو الخطر الأمني رقم 1 في قائمة OWASP Top 10 لعام 2021. **السيناريو:** لدينا واجهة برمجة تطبيقات للحصول على تفاصيل الطلب: `GET /api/orders/:orderId`." },
                { type: ContentType.PARAGRAPH, text: "**الكود السيء (Vulnerable Code):**" },
                { type: ContentType.CODE_BLOCK, language: "javascript", code: `// User Alice is logged in (session.userId = 1)
// She requests /api/orders/99, which belongs to User Bob (userId = 2)

app.get('/api/orders/:orderId', (req, res) => {
  const { orderId } = req.params;
  // The fatal flaw: The query only checks for the order ID.
  const order = db.query('SELECT * FROM orders WHERE id = $1', [orderId]);
  
  if (order) {
    res.json(order);
  } else {
    res.sendStatus(404);
  }
});` },
                { type: ContentType.PARAGRAPH, text: "المشكلة هي أن الكود لا يتحقق أبدًا مما إذا كان المستخدم المسجل دخوله *يملك* الطلب الذي يطلبه. يمكن لـ Alice ببساطة تخمين معرفات الطلبات للوصول إلى بيانات Bob." },
                { type: ContentType.PARAGRAPH, text: "**الكود الجيد (Patched Code):**" },
                { type: ContentType.CODE_BLOCK, language: "javascript", code: `app.get('/api/orders/:orderId', (req, res) => {
  const { orderId } = req.params;
  const { userId } = req.session; // Get the user ID from the trusted session
  
  // The fix: The query now checks for BOTH the order ID AND the owner ID.
  const order = db.query('SELECT * FROM orders WHERE id = $1 AND user_id = $2', [orderId, userId]);

  if (order) {
    res.json(order);
  } else {
    // Return 404 even if the order exists but belongs to someone else.
    // This prevents leaking information.
    res.sendStatus(404);
  }
});` },
              ]
            }
        ]
    },
     {
        id: "p4_c5", chapterTitle: "الفصل العشرون: أمان الشبكة المتقدم",
        sections: [
            {
                id: "p4_c5_s1",
                icon: "🔥",
                title: "المستوى 95: فهم `iptables` والفرق بينه وبين UFW",
                content: [
                  { type: ContentType.PARAGRAPH, text: "`iptables` هو جدار الحماية الفعلي في نواة لينكس. إنه قوي للغاية ولكنه معقد. UFW هو واجهة سهلة الاستخدام تقوم بإنشاء قواعد `iptables` لك. فهم الأساسيات يمنحك المزيد من القوة." },
                  { type: ContentType.HEADING4, text: "تشريح `iptables`" },
                  { type: ContentType.DEFINITION_LIST, definitionItems: [
                      { term: "الجداول (Tables)", definition: "حاويات للقواعد. الجدول الأكثر شيوعًا هو `filter` (للسماح/الرفض)." },
                      { term: "السلاسل (Chains)", definition: "قوائم من القواعد داخل جدول. السلاسل المدمجة الرئيسية هي `INPUT` (للحركة الواردة إلى الخادم)، و `OUTPUT` (للحركة الصادرة)، و `FORWARD` (للحركة التي يتم توجيهها عبر الخادم)." },
                      { term: "القواعد (Rules)", definition: "تطابق الحزم وتتخذ إجراءً (`ACCEPT`, `DROP`, `REJECT`)." }
                  ] },
                  { type: ContentType.PARAGRAPH, text: "عندما تقوم بتشغيل `sudo ufw allow 22`، يقوم UFW في الخلفية بإضافة قاعدة إلى سلسلة `INPUT` في جدول `filter` تبدو كـ `-A INPUT -p tcp --dport 22 -j ACCEPT`." },
                ]
            },
            {
                id: "p4_c5_s2",
                icon: "🔧",
                title: "المستوى 96: دراسة حالة: الحد من معدل SSH باستخدام `iptables`",
                content: [
                  { type: ContentType.PARAGRAPH, text: "هذه مهمة لا يمكن لـ UFW القيام بها بسهولة، لكن `iptables` يتفوق فيها. سننشئ قاعدة تحد من محاولات الاتصال الجديدة بـ SSH إلى 4 في الدقيقة." },
                  { type: ContentType.CODE_BLOCK, language: "bash", code: `# أنشئ سلسلة جديدة مخصصة
sudo iptables -N SSH_BRUTE_FORCE

# أضف قاعدة للقفز إلى السلسلة الجديدة لاتصالات SSH الجديدة
sudo iptables -A INPUT -p tcp --dport 22 -m conntrack --ctstate NEW -j SSH_BRUTE_FORCE

# في السلسلة الجديدة، اسمح بـ 4 اتصالات في الدقيقة
sudo iptables -A SSH_BRUTE_FORCE -m recent --set --name SSH
sudo iptables -A SSH_BRUTE_FORCE -m recent --update --seconds 60 --hitcount 4 --name SSH -j DROP

# إذا لم يتم إسقاطها، اسمح بها
sudo iptables -A SSH_BRUTE_FORCE -j ACCEPT` },
                  { type: ContentType.PARAGRAPH, text: "هذا يستخدم وحدة `recent` في `iptables` لتتبع عناوين IP التي تتصل حديثًا." },
                ]
            },
            {
                id: "p4_c5_s3",
                icon: "🌊",
                title: "المستوى 97: الحماية من هجمات DDoS البسيطة",
                content: [
                  { type: ContentType.PARAGRAPH, text: "يمكن لـ `iptables` و `sysctl` المساعدة في التخفيف من هجمات حجب الخدمة (DDoS) الصغيرة." },
                  { type: ContentType.HEADING4, text: "حماية فيضان SYN" },
                  { type: ContentType.PARAGRAPH, text: "لقد ناقشنا `tcp_syncookies` بالفعل. يمكن لـ `iptables` المساعدة أيضًا:" },
                  { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo iptables -A INPUT -p tcp --syn -m limit --limit 1/s --limit-burst 3 -j ACCEPT
sudo iptables -A INPUT -p tcp --syn -j DROP` },
                  { type: ContentType.PARAGRAPH, text: "هذا يسمح فقط بمعدل محدود من حزم SYN الجديدة، ويسقط الباقي." },
                  { type: ContentType.HEADING4, text: "حظر Ping of Death" },
                  { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo iptables -A INPUT -p icmp --icmp-type echo-request -m limit --limit 1/s -j ACCEPT
sudo iptables -A INPUT -p icmp --icmp-type echo-request -j DROP` },
                ]
            },
            {
              id: "p4_c5_s4",
              icon: "🔑",
              title: "المستوى 98: ورشة عمل WireGuard: حصن إداري كامل",
              content: [
                { type: ContentType.PARAGRAPH, text: "هذا هو المعيار الذهبي لتأمين الوصول الإداري. سنجعل منفذ SSH الخاص بنا غير مرئي تمامًا للإنترنت العام. **السيناريو:** إعداد VPN WireGuard وإغلاق SSH بحيث لا يمكن الوصول إليه إلا من خلاله." },
                { type: ContentType.HEADING4, text: "الخطوة 1: تثبيت WireGuard" },
                { type: ContentType.PARAGRAPH, text: "استخدم نصًا برمجيًا موثوقًا مثل [wireguard-install](https://github.com/Nyr/wireguard-install) لأتمتة التثبيت الكامل للخادم. إنه يتعامل مع إنشاء المفاتيح وتكوين `sysctl` وإعداد الواجهة." },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `curl -O https://raw.githubusercontent.com/Nyr/wireguard-install/master/wireguard-install.sh
chmod +x wireguard-install.sh
sudo ./wireguard-install.sh` },
                { type: ContentType.PARAGRAPH, text: "سيقوم النص البرمجي بإرشادك خلال العملية. بعد اكتماله، سيكون لديك ملف تكوين عميل (على سبيل المثال, `wg0-client-nagi.conf`)." },
                { type: ContentType.HEADING4, text: "الخطوة 2: تكوين العميل" },
                { type: ContentType.PARAGRAPH, text: "انقل ملف `.conf` إلى جهازك المحلي وقم باستيراده إلى عميل WireGuard الخاص بك. اتصل بالـ VPN. يجب أن تكون قادرًا على `ping` عنوان IP الداخلي للخادم (عادة `10.0.0.1`)." },
                { type: ContentType.HEADING4, text: "الخطوة 3: ورشة عمل UFW: إغلاق البوابة" },
                { type: ContentType.PARAGRAPH, text: "هذه هي الخطوة الحاسمة. الآن بعد أن أصبح لدينا باب خلفي آمن، يمكننا إغلاق الباب الأمامي." },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `# 1. اعرض القواعد الحالية بالأرقام
sudo ufw status numbered

# 2. احذف قاعدة SSH العامة القديمة (على سبيل المثال, رقم 4)
sudo ufw delete 4

# 3. أضف قاعدة جديدة تسمح بـ SSH فقط من شبكة WireGuard الداخلية
# (افترض أن شبكتك هي 10.0.0.0/24 ومنفذ SSH هو 2222)
sudo ufw allow from 10.0.0.0/24 to any port 2222 proto tcp

# 4. تحقق من القواعد الجديدة
sudo ufw status` },
                { type: ContentType.NOTE, title: "اختبر قبل قطع الاتصال!", text: "أثناء اتصالك عبر SSH العام، اتصل بالـ VPN في نافذة أخرى وحاول الاتصال عبر SSH باستخدام عنوان IP *الداخلي* للخادم (`ssh nagi@10.0.0.1 -p 2222`). فقط بعد أن تتأكد من أن هذا يعمل، يمكنك بأمان حذف قاعدة SSH العامة." },
              ]
            },
            {
              id: "p4_c5_s5",
              icon: "🕸️",
              title: "المستوى 99: دراسة حالة عزل الشبكة: بنية الويب + قاعدة البيانات",
              content: [
                { type: ContentType.PARAGRAPH, text: "مع نمو تطبيقك، سترغب في فصل خادم الويب الخاص بك عن خادم قاعدة البيانات. القيام بذلك عبر الإنترنت العام أمر غير آمن. الحل هو استخدام الشبكات الخاصة (تسمى أحيانًا VPCs أو vRack)." },
                { type: ContentType.HEADING4, text: "البنية" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>خادم الويب (web-1):</strong> لديه واجهتا شبكة. واحدة بعنوان IP عام (مثل `203.0.113.10`) وواحدة بعنوان IP خاص (مثل `10.0.1.10`).",
                    "<strong>خادم قاعدة البيانات (db-1):</strong> لديه واجهة شبكة واحدة فقط: عنوان IP خاص (مثل `10.0.1.20`). ليس لديه عنوان IP عام على الإطلاق."
                ]},
                { type: ContentType.HEADING4, text: "التكوين" },
                { type: ContentType.PARAGRAPH, text: "1. **في تطبيق الويب الخاص بك:** سلسلة الاتصال بقاعدة البيانات تشير الآن إلى عنوان IP الخاص: `postgres://user:pass@10.0.1.20/mydb`." },
                { type: ContentType.PARAGRAPH, text: "2. **على خادم قاعدة البيانات (db-1):**" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "في `postgresql.conf`، قم بتعيين `listen_addresses = '10.0.1.20,localhost'` للاستماع فقط على الواجهة الخاصة.",
                    "في `pg_hba.conf`، قم بإنشاء قاعدة للسماح بالاتصالات من عنوان IP الخاص بخادم الويب: `host all all 10.0.1.10/32 scram-sha-256`.",
                    "في UFW، اسمح بالاتصالات الواردة على المنفذ 5432 فقط من عنوان IP الخاص بخادم الويب: `sudo ufw allow from 10.0.1.10 to any port 5432`."
                ]},
                { type: ContentType.PARAGRAPH, text: "النتيجة هي حصن. قاعدة بياناتك، وهي أهم أصولك، غير مرئية تمامًا للإنترنت العام. الطريقة الوحيدة للوصول إليها هي عن طريق اختراق خادم الويب أولاً. هذا يقلل بشكل كبير من سطح الهجوم الخاص بك." },
              ]
            }
        ]
    }
  ]
};