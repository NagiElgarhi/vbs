
import { Part, ContentType } from '../../types';

const generatePlaceholderSection = (part: number, chapter: number, level: number, title: string, icon: string = "🚧") => {
    const levelNumber = 25 + (chapter - 1) * 5 + level;
    return {
        id: `p${part}_c${chapter}_l${levelNumber}`,
        icon,
        title: `المستوى ${levelNumber}: ${title}`,
        content: [{ type: ContentType.PARAGRAPH, text: "هذا المحتوى قيد التطوير وجارٍ العمل عليه." }],
    };
};

export const part2Content: Part = {
  id: "p2",
  partTitle: "الباب الثاني: حزمة الواجهة الخلفية (Backend Stack)",
  icon: "⚙️",
  chapters: [
    {
        id: "p2_c1",
        chapterTitle: "الفصل السادس: تثبيت وتكوين Nginx",
        sections: [
            {
              id: "p2_c1_s1",
              icon: "🔌",
              title: "المستوى 25: مقدمة إلى Nginx: خادم الويب والوكيل العكسي",
              content: [
                { type: ContentType.PARAGRAPH, text: "إذا كان الخادم هو الأرض التي نبني عليها، فإن Nginx (يُنطق Engine-X) هو الأساس وبوابة الدخول الرئيسية لقلعتنا. إنه أكثر من مجرد خادم ويب؛ إنه سكين الجيش السويسري لمطوري الواجهة الخلفية. في هذا المستوى، سنفهم دوريه الرئيسيين: كخادم ويب فائق السرعة، وكوكيل عكسي ذكي." },
                { type: ContentType.HEADING4, text: "Nginx كخادم ويب: السرعة والكفاءة" },
                { type: ContentType.PARAGRAPH, text: "في أبسط صوره، مهمة خادم الويب هي تلقي طلبات HTTP من متصفحات المستخدمين وإرجاع المحتوى المطلوب، مثل صفحات HTML، صور، أو ملفات CSS. ما يميز Nginx هو بنيته القائمة على الأحداث (Event-Driven). على عكس الخوادم التقليدية مثل Apache التي قد تنشئ عملية جديدة لكل طلب، يمكن لـ Nginx التعامل مع آلاف الاتصالات المتزامنة في عملية واحدة، مما يجعله خفيفًا للغاية على الذاكرة وسريعًا بشكل لا يصدق، خاصة في خدمة الملفات الثابتة." },
                { type: ContentType.HEADING4, text: "Nginx كوكيل عكسي (Reverse Proxy): الحارس الذكي" },
                { type: ContentType.PARAGRAPH, text: "هذا هو الدور الذي يجعل Nginx لا غنى عنه في أي حزمة خلفية حديثة. الوكيل العكسي يجلس بين الإنترنت وتطبيقاتك (مثل تطبيق Node.js أو Python). بدلاً من أن يتصل المستخدم مباشرة بتطبيقك، فإنه يتصل بـ Nginx، الذي يقوم بعد ذلك بتوجيه الطلب 'داخليًا' إلى التطبيق المناسب. هذا يوفر فوائد هائلة:" },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "توزيع الأحمال (Load Balancing)", definition: "إذا كان لديك عدة نسخ من تطبيقك تعمل، يمكن لـ Nginx توزيع الطلبات الواردة بينها، مما يزيد من الموثوقية والأداء." },
                    { term: "إنهاء SSL/TLS", definition: "بدلاً من تكوين التشفير المعقد (HTTPS) في كل تطبيق، يمكنك تكوينه مرة واحدة فقط في Nginx. يتحدث Nginx بشكل آمن مع العالم الخارجي، ثم يتحدث مع تطبيقاتك داخليًا عبر HTTP العادي، مما يبسط الأمور بشكل كبير." },
                    { term: "خدمة المحتوى الثابت", definition: "Nginx أسرع بكثير في خدمة الصور وملفات CSS و JavaScript من معظم لغات برمجة الواجهة الخلفية. يمكنك تكوينه ليعالج هذه الملفات مباشرة ويترك لتطبيقك التركيز على المنطق الديناميكي." },
                    { term: "الأمان والإخفاء", definition: "يعمل Nginx كطبقة حماية إضافية، حيث يخفي بنية شبكتك الداخلية عن العالم الخارجي ويمكنه حظر الطلبات الضارة قبل أن تصل إلى تطبيقك." }
                ]},
                { type: ContentType.NOTE, title: "القلب النابض للبنية التحتية", text: "فهم Nginx ليس خيارًا، بل هو ضرورة. إنه الأداة التي ستربط كل مكونات خدمتك معًا، من الواجهة الأمامية إلى قواعد البيانات. إتقانه يمنحك السيطرة الكاملة على كيفية تدفق حركة المرور والأداء والأمان في نظامك." },
              ]
            },
            {
              id: "p2_c1_s2",
              icon: "📦",
              title: "المستوى 26: تثبيت Nginx على أوبونتو",
              content: [
                { type: ContentType.PARAGRAPH, text: "الآن بعد أن فهمنا 'لماذا' Nginx مهم، حان الوقت للانتقال إلى 'كيف'. عملية التثبيت على أوبونتو بسيطة ومباشرة بفضل مدير الحزم `apt`. سنقوم بتثبيت Nginx، التحقق من تشغيله، وتعديل جدار الحماية للسماح بمرور حركة المرور إليه." },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "تثبيت Nginx", code: "sudo apt update\nsudo apt install nginx -y", explanations: [
                    { lines: "1", explanation: "كما تعلمنا، هذا الأمر يقوم بتحديث قائمة الحزم لدينا للتأكد من أننا سنحصل على أحدث إصدار متاح من Nginx." },
                    { lines: "2", explanation: "هذا هو الأمر الذي يقوم بتنزيل وتثبيت Nginx وجميع اعتمادياته. سيقوم أيضًا بإعداد Nginx كخدمة `systemd`، مما يعني أنه سيبدأ تلقائيًا عند إقلاع الخادم." }
                ]},
                { type: ContentType.PARAGRAPH, text: "يمثل هذان الأمران خطوة أساسية في بناء حزمة الويب الخاصة بك. فمن خلالهما، لا تقوم فقط بوضع برنامج Nginx على نظامك، بل تقوم أيضًا بدمجه كخدمة مُدارة بالكامل (daemon)، جاهزة للعمل في الخلفية والاستجابة للطلبات والبدء تلقائيًا مع كل إعادة تشغيل للخادم." },
                { type: ContentType.HEADING4, text: "التحقق من حالة الخدمة" },
                { type: ContentType.PARAGRAPH, text: "بعد التثبيت، يجب أن يكون Nginx قيد التشغيل بالفعل. يمكننا التحقق من ذلك باستخدام `systemctl`:" },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "التحقق من حالة Nginx", code: "sudo systemctl status nginx", explanations: [
                    { lines: "1", explanation: "يستعلم هذا الأمر من `systemd` (مدير الخدمات في لينكس) عن حالة خدمة Nginx. يجب أن ترى `active (running)` باللون الأخضر، مما يؤكد أن كل شيء يعمل كما هو متوقع." }
                ]},
                { type: ContentType.PARAGRAPH, text: "هذا الأمر هو أداة التشخيص الأساسية الخاصة بك لأي خدمة تعمل على الخادم. إذا واجهت مشكلة في Nginx، فإن تشغيل `systemctl status nginx` هو دائمًا الخطوة الأولى. سيعرض لك الأخطاء الأخيرة من سجلاته ويوجهك نحو الحل." },
                { type: ContentType.HEADING4, text: "ضبط جدار الحماية" },
                { type: ContentType.PARAGRAPH, text: "Nginx الآن يعمل، لكن جدار الحماية UFW الذي أعددناه سابقًا لا يزال يمنع الوصول إليه. نحتاج إلى فتح الأبواب الصحيحة. UFW يعرف Nginx، لذا يمكننا استخدام ملف تعريف التطبيق الخاص به." },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "السماح لـ Nginx في UFW", code: "sudo ufw app list\nsudo ufw allow 'Nginx HTTP'\nsudo ufw status", explanations: [
                    { lines: "1", explanation: "يعرض هذا الأمر جميع ملفات تعريف التطبيقات التي يعرفها UFW. يجب أن ترى `Nginx Full`, `Nginx HTTP`, `Nginx HTTPS`." },
                    { lines: "2", explanation: "هذا يفتح المنفذ 80 (HTTP) فقط. إذا كنت تريد فتح كل من 80 و 443 (HTTPS)، فاستخدم `Nginx Full`. سنبدأ بـ HTTP الآن." },
                    { lines: "3", explanation: "تحقق دائمًا من القواعد بعد أي تغيير للتأكد من تطبيقها بشكل صحيح." }
                ]},
                { type: ContentType.PARAGRAPH, text: "توضح هذه الأوامر التكامل السلس بين خدمات النظام. نحن لا نفتح منفذًا عشوائيًا، بل نستخدم ملف تعريف تطبيق معرف مسبقًا (`Nginx HTTP`) لإبلاغ جدار الحماية بشكل صريح بنوع حركة المرور التي نسمح بها. هذا يجعل قواعدنا أكثر وضوحًا وأمانًا وقابلية للصيانة." },
                { type: ContentType.HEADING4, text: "التحقق النهائي" },
                { type: ContentType.PARAGRAPH, text: "الآن، افتح متصفح الويب على جهاز الكمبيوتر الخاص بك وانتقل إلى عنوان IP الخاص بخادمك (`http://YOUR_SERVER_IP`). يجب أن ترى صفحة الترحيب الافتراضية لـ Nginx!" },
                { type: ContentType.IMAGE_PLACEHOLDER, alt: "صفحة الترحيب الافتراضية لـ Nginx", width: 600, height: 350 },
              ]
            },
            {
              id: "p2_c1_s3",
              icon: "🏗️",
              title: "المستوى 27: فهم ملفات وبنية تكوين Nginx",
              content: [
                { type: ContentType.PARAGRAPH, text: "لقد قمنا بتثبيت Nginx وهو يعمل، ولكن قوته الحقيقية تكمن في تكوينه. قد تبدو بنية ملفات تكوين Nginx مربكة في البداية، لكنها مصممة بشكل منطقي للغاية للفصل بين الاهتمامات وتسهيل إدارة مواقع متعددة على خادم واحد." },
                { type: ContentType.HEADING4, text: "الدلائل الرئيسية" },
                { type: ContentType.PARAGRAPH, text: "كل شيء يبدأ في `/etc/nginx/`. داخل هذا الدليل، هناك بعض الملفات والدلائل الرئيسية التي يجب أن تعرفها:" },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "/etc/nginx/nginx.conf", definition: "ملف التكوين العام. يضبط الإعدادات الشاملة مثل المستخدم الذي يعمل به Nginx وعدد العمليات العاملة. نادرًا ما تحتاج إلى تعديله مباشرة." },
                    { term: "/etc/nginx/sites-available/", definition: "مستودع 'الوصفات'. هنا تقوم بإنشاء وتخزين ملف تكوين لكل موقع ويب (أو 'كتلة خادم - server block') تريد استضافته. الملفات هنا خاملة ولا تفعل شيئًا بمفردها." },
                    { term: "/etc/nginx/sites-enabled/", definition: "قائمة 'الطعام' النشطة. عندما تريد تفعيل موقع من `sites-available`، فإنك لا تنسخه، بل تنشئ 'رابطًا رمزيًا' (symbolic link) إليه في هذا الدليل. هذا هو الدليل الذي يقرأه Nginx بالفعل عند بدء التشغيل." },
                    { term: "/etc/nginx/snippets/", definition: "مجلد للمقتطفات القابلة لإعادة الاستخدام. إذا كان لديك كتل تكوين متكررة (مثل إعدادات SSL)، يمكنك وضعها هنا واستدعائها في ملفات موقعك." }
                ]},
                { type: ContentType.PARAGRAPH, text: "هذا الفصل بين `sites-available` و `sites-enabled` هو المفهوم الأساسي. إنه يسمح لك بتعطيل موقع بسرعة وأمان عن طريق حذف الرابط الرمزي فقط، دون حذف ملف التكوين الفعلي، مما يجعل إعادة تفعيله سهلة في المستقبل." },
                { type: ContentType.HEADING4, text: "نظرة داخل `nginx.conf`" },
                { type: ContentType.PARAGRAPH, text: "دعنا نلقي نظرة سريعة على بعض التوجيهات الهامة في الملف العام. لن نغيرها، لكن فهمها يساعد على إزالة الغموض." },
                { type: ContentType.CODE_EXPLANATION, language: "nginx", codeTitle: "مقتطف من /etc/nginx/nginx.conf", code: `user www-data;
worker_processes auto;
pid /run/nginx.pid;

include /etc/nginx/sites-enabled/*;`, explanations: [
                    { lines: "1", explanation: "يحدد المستخدم والمجموعة التي ستعمل بها عمليات Nginx العاملة. `www-data` هو مستخدم غير مميز، وهو أمر جيد للأمان." },
                    { lines: "2", explanation: "يخبر Nginx بتحديد عدد العمليات العاملة تلقائيًا، عادةً ما يساوي عدد أنوية المعالج المتاحة." },
                    { lines: "3", explanation: "المكان الذي سيخزن فيه Nginx ملف معرف العملية (PID) الرئيسي الخاص به." },
                    { lines: "5", explanation: "أهم سطر في الملف! هذا التوجيه يخبر Nginx بتحميل جميع ملفات التكوين الموجودة داخل دليل `sites-enabled`. هذا هو السحر الذي يجعل بنية `sites-available`/`sites-enabled` تعمل." }
                ]},
                { type: ContentType.PARAGRAPH, text: "هذا الملف هو نقطة الانطلاق لتكوين Nginx بأكمله. فهم توجيه `include` على وجه الخصوص هو المفتاح لفهم كيف يجمع Nginx تكوينه من أجزاء متعددة. بدلاً من وجود ملف تكوين واحد ضخم، لدينا نظام معياري حيث يتم تحميل الإعدادات العامة أولاً، ثم يتم تضمين تكوينات المواقع المحددة، مما يجعل الإدارة أكثر تنظيمًا وأقل عرضة للخطأ." },
                { type: ContentType.NOTE, title: "أفضل ممارسة: ملف واحد لكل موقع", text: "القاعدة الذهبية هي إنشاء ملف تكوين منفصل لكل موقع أو نطاق تستضيفه داخل `sites-available`. لا تضع تكوينات مواقع متعددة في ملف واحد، فهذا يجعل الصيانة كابوسًا." },
              ]
            },
            {
              id: "p2_c1_s4",
              icon: "🌐",
              title: "المستوى 28: إعداد أول Server Block (Virtual Host)",
              content: [
                { type: ContentType.PARAGRAPH, text: "حان الوقت لتطبيق ما تعلمناه. في هذا المستوى، سنقوم بإنشاء أول موقع ويب حقيقي لنا على Nginx. سنقوم بإنشاء 'كتلة خادم' (Server Block)، وهو المصطلح الذي يستخدمه Nginx لما يسمى 'المضيف الافتراضي' (Virtual Host) في Apache. هذا يسمح لـ Nginx بمعرفة كيفية التعامل مع الطلبات لنطاق معين، مما يمكننا من استضافة مواقع متعددة على نفس عنوان IP." },
                { type: ContentType.HEADING4, text: "الخطوة 1: إنشاء دليل للموقع" },
                { type: ContentType.PARAGRAPH, text: "من الممارسات الجيدة إنشاء دليل جديد لكل موقع داخل `/var/www`." },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "إنشاء دليل وتعيين الأذونات", code: `sudo mkdir -p /var/www/your_domain/html
sudo chown -R $USER:$USER /var/www/your_domain
sudo chmod -R 755 /var/www`, explanations: [
                    { lines: "1", explanation: "ينشئ هذا الدليل الذي سيحتوي على ملفات موقعنا. الخيار `-p` ينشئ الدلائل الأصلية إذا لم تكن موجودة." },
                    { lines: "2", explanation: "يقوم بتغيير ملكية الدليل إلى المستخدم الحالي. هذا يسمح لك بإنشاء وتعديل الملفات دون الحاجة إلى `sudo` في كل مرة." },
                    { lines: "3", explanation: "يضمن أن Nginx (الذي يعمل كمستخدم `www-data`) لديه الأذونات الصحيحة لقراءة الملفات." }
                ]},
                { type: ContentType.PARAGRAPH, text: "هذه الأوامر تجهز 'قطعة الأرض' التي سنبني عليها موقعنا. من خلال إنشاء هيكل دليل منظم وتعيين الأذونات الصحيحة، نضمن أننا نستطيع العمل بسهولة مع الحفاظ على الأمان، مما يسمح لنا بالكتابة في الدليل بينما نسمح لـ Nginx بالقراءة منه فقط." },
                { type: ContentType.HEADING4, text: "الخطوة 2: إنشاء صفحة ويب بسيطة" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: "nano /var/www/your_domain/html/index.html" },
                { type: ContentType.PARAGRAPH, text: "أضف كود HTML التالي:" },
                { type: ContentType.CODE_BLOCK, language: "html", code: `<html>
    <head>
        <title>Welcome to your_domain!</title>
    </head>
    <body>
        <h1>Success! The your_domain server block is working!</h1>
    </body>
</html>` },
                { type: ContentType.HEADING4, text: "الخطوة 3: إنشاء ملف Server Block" },
                { type: ContentType.PARAGRAPH, text: "الآن، سننشئ ملف التكوين في `sites-available`:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: "sudo nano /etc/nginx/sites-available/your_domain" },
                { type: ContentType.CODE_EXPLANATION, language: "nginx", codeTitle: "/etc/nginx/sites-available/your_domain", code: `server {
    listen 80;
    listen [::]:80;

    root /var/www/your_domain/html;
    index index.html index.htm;

    server_name your_domain www.your_domain;

    location / {
        try_files $uri $uri/ =404;
    }
}`, explanations: [
                    { lines: "2-3", explanation: "يخبر Nginx بالاستماع للطلبات الواردة على المنفذ 80 لكل من IPv4 و IPv6." },
                    { lines: "5", explanation: "يحدد الدليل الجذر (root directory) لهذا الموقع. عندما يأتي طلب، سيبحث Nginx عن الملفات هنا." },
                    { lines: "6", explanation: "يحدد الملفات التي سيتم البحث عنها إذا طلب المستخدم مجلدًا (على سبيل المثال، `http://your_domain/`)." },
                    { lines: "8", explanation: "هذا هو التوجيه الأكثر أهمية. يخبر Nginx بأن كتلة الخادم هذه يجب أن تستجيب للطلبات الموجهة إلى `your_domain` أو `www.your_domain`." },
                    { lines: "10-12", explanation: "كتلة الموقع الافتراضية. `try_files` يحاول خدمة الملف المطلوب مباشرة، ثم يبحث عن دليل بنفس الاسم، وإذا فشل كل شيء، فإنه يعرض خطأ 404." }
                ]},
                { type: ContentType.PARAGRAPH, text: "ملف كتلة الخادم هذا هو المخطط الذي يتبعه Nginx لتوجيه حركة المرور. إنه يربط اسم النطاق الذي يكتبه المستخدم في المتصفح بمجلد محدد على القرص الصلب لخادمك، ويحدد بالضبط كيفية التعامل مع الطلبات الواردة لهذا النطاق. إتقان هذه الكتل هو مفتاح استضافة مواقع متعددة ومستقلة على خادم واحد." },
                { type: ContentType.HEADING4, text: "الخطوة 4: تفعيل Server Block" },
                { type: ContentType.PARAGRAPH, text: "ننشئ الآن الرابط الرمزي لتفعيل الموقع:" },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "إنشاء الرابط الرمزي", code: "sudo ln -s /etc/nginx/sites-available/your_domain /etc/nginx/sites-enabled/", explanations: [
                    { lines: "1", explanation: "هذا الأمر ينشئ اختصارًا (رابطًا رمزيًا) من ملف التكوين في `sites-available` إلى دليل `sites-enabled`. Nginx يقرأ فقط من `sites-enabled`، لذا فإن هذه الخطوة 'تشغل' الموقع." }
                ]},
                { type: ContentType.PARAGRAPH, text: "إنشاء الرابط الرمزي هو الفعل الذي يحول ملف تكوين خامل إلى قاعدة نشطة. هذه التقنية تمنحك القدرة على تشغيل وإيقاف مواقع الويب بسرعة دون حذف تكويناتها، مما يجعل إدارة الخادم أكثر مرونة وأمانًا." },
                { type: ContentType.HEADING4, text: "الخطوة 5: اختبار وإعادة تشغيل Nginx" },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "الاختبار وإعادة التشغيل", code: "sudo nginx -t\nsudo systemctl restart nginx", explanations: [
                    { lines: "1", explanation: "قبل إعادة التشغيل دائمًا، اختبر ملفات التكوين بحثًا عن أخطاء في بناء الجملة. إذا كان كل شيء على ما يرام، فسترى رسالة `syntax is ok`." },
                    { lines: "2", explanation: "يقوم بإعادة تشغيل Nginx لتحميل التكوين الجديد." }
                ]},
                { type: ContentType.PARAGRAPH, text: "هذا الثنائي من الأوامر هو روتين الأمان الخاص بك عند إجراء أي تغيير في تكوين Nginx. `nginx -t` هو شبكة الأمان التي تمنعك من تحميل تكوين معطل، بينما `systemctl restart nginx` هو الزر الذي يطبق تغييراتك الناجحة على الخادم المباشر." },
                { type: ContentType.NOTE, title: "ملاحظة حول DNS", text: "لكي يعمل هذا على الإنترنت، ستحتاج إلى توجيه سجلات DNS لنطاقك إلى عنوان IP الخاص بخادمك. للاختبار المحلي، يمكنك تعديل ملف `hosts` على جهاز الكمبيوتر الخاص بك لإضافة سطر مثل: `YOUR_SERVER_IP your_domain`." },
              ]
            },
            {
              id: "p2_c1_s5",
              icon: "🖼️",
              title: "المستوى 29: خدمة الملفات الثابتة (HTML, CSS, JS) مع Nginx",
              content: [
                { type: ContentType.PARAGRAPH, text: "لقد أثبتنا أن Nginx يمكنه خدمة ملف HTML واحد. الآن، دعنا نرى كيف يتألق في خدمة موقع ويب بسيط كامل بالملفات الثابتة (Static Assets) مثل CSS و JavaScript. هذه إحدى نقاط قوة Nginx الأساسية، حيث يمكنه التعامل مع هذه الملفات بسرعة أكبر بكثير من خادم التطبيق (مثل Node.js)، مما يحرر تطبيقك للتركيز على المهام الديناميكية." },
                { type: ContentType.HEADING4, text: "إضافة ملفات CSS و JavaScript" },
                { type: ContentType.PARAGRAPH, text: "دعنا ننشئ ملف CSS بسيط:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: "nano /var/www/your_domain/html/style.css" },
                { type: ContentType.CODE_BLOCK, language: "css", code: `body {
    background-color: #222;
    color: #00ff00;
    font-family: monospace;
    text-align: center;
    padding-top: 50px;
}` },
                { type: ContentType.PARAGRAPH, text: "وملف JavaScript بسيط:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: "nano /var/www/your_domain/html/script.js" },
                { type: ContentType.CODE_BLOCK, language: "javascript", code: `document.addEventListener('DOMContentLoaded', () => {
    console.log('Nginx is serving JS files!');
});` },
                { type: ContentType.PARAGRAPH, text: "أخيرًا، قم بتحديث ملف `index.html` لربط هذه الملفات:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: "nano /var/www/your_domain/html/index.html" },
                { type: ContentType.CODE_BLOCK, language: "html", code: `<html>
    <head>
        <title>Welcome to your_domain!</title>
        <link rel="stylesheet" href="/style.css">
    </head>
    <body>
        <h1>Success! Nginx is serving HTML, CSS, and JS!</h1>
        <script src="/script.js"></script>
    </body>
</html>` },
                { type: ContentType.PARAGRAPH, text: "بعد حفظ هذه الملفات، أعد تحميل الصفحة في متصفحك. يجب أن ترى النمط الجديد مطبقًا. تكوين كتلة الخادم الحالي لدينا كافٍ لخدمة هذه الملفات لأن `try_files` يعثر عليها." },
                { type: ContentType.HEADING4, text: "تحسين الأداء باستخدام التخزين المؤقت للمتصفح" },
                { type: ContentType.PARAGRAPH, text: "يمكننا تحسين الأداء بشكل كبير عن طريق إخبار متصفحات المستخدمين بتخزين هذه الملفات مؤقتًا. هذا يقلل من عدد الطلبات إلى خادمنا في الزيارات اللاحقة. سنضيف كتلة `location` جديدة إلى ملف تكوين موقعنا للتعامل مع أنواع الملفات الثابتة." },
                { type: ContentType.CODE_EXPLANATION, language: "nginx", codeTitle: "إضافة إلى /etc/nginx/sites-available/your_domain", code: `server {
    # ... (listen, root, server_name directives) ...

    location / {
        try_files $uri $uri/ =404;
    }

    location ~* \\.(css|js|jpg|jpeg|png|gif|ico|svg)$ {
        expires 1d;
        add_header Cache-Control "public";
    }
}`, explanations: [
                    { lines: "8", explanation: "توجيه `location` هذا يستخدم تعبيرًا نمطيًا (regex). `~*` يعني أن المطابقة غير حساسة لحالة الأحرف. `\\.(` يبدأ مجموعة من امتدادات الملفات التي نريد مطابقتها." },
                    { lines: "9", explanation: "`expires 1d;` يضيف ترويسة `Expires` إلى الاستجابة، ويخبر المتصفح أنه يمكنه استخدام نسخته المحلية من هذا الملف لمدة يوم واحد قبل أن يحتاج إلى التحقق مرة أخرى." },
                    { lines: "10", explanation: "`add_header Cache-Control \"public\";` يضيف ترويسة أخرى تخبر المتصفحات والوكلاء الوسيطين (proxies) أنه يمكن تخزين هذا الأصل مؤقتًا." }
                ]},
                { type: ContentType.PARAGRAPH, text: "تعتبر كتلة الموقع هذه تحسينًا بسيطًا لكنه فعال للغاية. فمن خلال إرشاد متصفح المستخدم لتخزين الملفات الثابتة مؤقتًا، فإنك تقلل بشكل كبير من الحمل على الخادم وتحسن بشكل كبير من سرعة تحميل الصفحة للمستخدمين العائدين. إنها خطوة أساسية في تكوين Nginx احترافي." },
                { type: ContentType.HEADING4, text: "التحقق من التغييرات" },
                { type: ContentType.PARAGRAPH, text: "لا تنس اختبار وإعادة تشغيل Nginx:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: "sudo nginx -t && sudo systemctl restart nginx" },
                { type: ContentType.PARAGRAPH, text: "يمكنك الآن استخدام أدوات المطور في متصفحك (علامة تبويب الشبكة) أو `curl` للتحقق من ترويسات الاستجابة لملف CSS:" },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "التحقق من الترويسات", code: "curl -I http://your_domain/style.css", explanations: [
                    { lines: "1", explanation: "الخيار `-I` يخبر `curl` بجلب الترويسات فقط وعدم تنزيل المحتوى. ابحث عن `Cache-Control: public` و `Expires` مع تاريخ في المستقبل." }
                ]},
                { type: ContentType.PARAGRAPH, text: "يؤكد هذا الأمر أن تحسينات التخزين المؤقت التي قمت بها نشطة وتعمل. القدرة على فحص ترويسات HTTP مباشرة باستخدام أدوات مثل `curl` هي مهارة أساسية لتصحيح أخطاء التكوين والتحقق من سلوك خادم الويب الخاص بك." },
              ]
            }
        ]
    },
    {
        id: "p2_c2",
        chapterTitle: "الفصل السابع: Nginx كوكيل عكسي (Reverse Proxy)",
        sections: [
            {
              id: "p2_c2_s1",
              icon: "🔄",
              title: "المستوى 30: لماذا تحتاج إلى وكيل عكسي؟",
              content: [
                { type: ContentType.PARAGRAPH, text: "لقد أشرنا إلى مفهوم الوكيل العكسي، ولكن حان الوقت للتعمق في سبب كونه حجر الزاوية في كل بنية تحتية حديثة لتطبيقات الويب. معظم أطر عمل الواجهة الخلفية (Node.js, Python, Ruby, Go) تأتي مع خوادم ويب مدمجة. هذه الخوادم، مثل خادم Express أو Uvicorn في FastAPI، رائعة للتطوير السريع، لكنها ليست مصممة لمواجهة قسوة الإنترنت المفتوح مباشرة. إنها مثل محرك سيارة سباق: قوي للغاية في أداء مهمته الأساسية (تنفيذ الكود)، ولكنه يفتقر إلى الهيكل الخارجي، ونظام التعليق، والمكابح المانعة للانغلاق اللازمة للقيادة بأمان في شارع مزدحم. هنا يأتي دور Nginx كوكيل عكسي - إنه الهيكل، ونظام التعليق، والمكابح لتطبيقك." },
                { type: ContentType.PARAGRAPH, text: "الوكيل العكسي هو وسيط متخصص يجلس كحارس بوابة بين الإنترنت وتطبيقاتك. يتلقى جميع الطلبات من المستخدمين، ويفحصها، ثم يقرر بذكاء كيفية التعامل معها. إنه بمثابة موظف استقبال متعدد المهام وواسع الحيلة لمبنى المكاتب الخاص بك (تطبيقاتك الخلفية)." },
                 { type: ContentType.IMAGE_PLACEHOLDER, alt: "مخطط يوضح كيفية عمل الوكيل العكسي مع مسارات متعددة لتطبيقات مختلفة", width: 800, height: 500 },
                 { type: ContentType.HEADING4, text: "التشريح العميق لفوائد الوكيل العكسي:" },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "فصل الاهتمامات (Separation of Concerns)", definition: "هذا هو المبدأ الهندسي الأساسي. Nginx يتخصص في التعامل مع تحديات الشبكة: إدارة آلاف الاتصالات المتزامنة بكفاءة، وامتصاص الطلبات البطيئة (slowloris attacks)، وإنهاء تشفير SSL/TLS المعقد حسابيًا، وضغط الاستجابات، وخدمة الملفات الثابتة بسرعة البرق. هذا يحرر تطبيقك (Node.js/Python) للتركيز على مهمته الوحيدة: تنفيذ منطق الأعمال. تطبيقك لم يعد بحاجة للقلق بشأن تفاصيل بروتوكول HTTP أو كيفية التعامل مع اتصال شبكة غير مستقر. هذا يجعل كود تطبيقك أبسط، وأكثر تركيزًا، وأسهل في الاختبار والصيانة." },
                    { term: "حصن الأمان (Security Fortress)", definition: "تطبيقك الآن مخفي تمامًا عن الإنترنت العام. المهاجم لا يتفاعل أبدًا مع خادم التطبيق مباشرة. Nginx هو خط الدفاع الأول. يمكنك استخدامه لفرض قيود صارمة: حظر عناوين IP الضارة، والحد من معدل الطلبات من عميل واحد لمنع هجمات القوة الغاشمة أو حجب الخدمة (DoS)، والتحقق من صحة ترويسات HTTP، وإضافة ترويسات أمان حيوية مثل HSTS (HTTP Strict Transport Security) و CSP (Content Security Policy). إذا تم اكتشاف ثغرة أمنية في Nginx، يمكن تحديثه بشكل مستقل دون لمس تطبيقك." },
                    { term: "قائد الأوركسترا (Orchestration & Flexibility)", definition: "هل تريد تشغيل واجهة برمجة تطبيقات Node.js بجانب لوحة إدارة مكتوبة بـ Python (Django) ومدونة WordPress (PHP)؟ بدون وكيل عكسي، هذا كابوس. مع Nginx، هذا أمر تافه. يمكنك تكوين Nginx لفحص عنوان URL المطلوب وتوجيه الطلبات بذكاء: أي شيء يبدأ بـ `/api/v1` يذهب إلى خادم Node.js على المنفذ 3000، وأي شيء يبدأ بـ `/admin` يذهب إلى خادم Gunicorn على المنفذ 8000، وكل شيء آخر يذهب إلى خادم PHP-FPM. هذا يمنحك مرونة لا تصدق لبناء أنظمة متعددة اللغات والاستفادة من أفضل أداة لكل مهمة." },
                    { term: "معزز الأداء (Performance Booster)", definition: "Nginx لا يصدق في التخزين المؤقت. يمكنك تكوينه لتخزين استجابات واجهة برمجة التطبيقات المكلفة مؤقتًا. إذا جاء طلب آخر لنفس المورد خلال فترة زمنية قصيرة، يمكن لـ Nginx خدمة النسخة المخبأة مباشرة في أجزاء من الثانية دون إزعاج تطبيقك على الإطلاق. هذا يقلل بشكل كبير من الحمل على قاعدة البيانات وعلى تطبيقك. بالإضافة إلى ذلك، يمكنه ضغط الاستجابات باستخدام gzip أو brotli قبل إرسالها إلى العميل، مما يقلل من حجم النقل ويسرع أوقات التحميل بشكل كبير." },
                    { term: "التوافر العالي وتوزيع الأحمال (High Availability & Load Balancing)", definition: "إذا أصبح تطبيقك شائعًا، يمكنك ببساطة تشغيل ثلاث أو أربع نسخ متطابقة منه. Nginx سيقوم بتوزيع الطلبات الواردة بين هذه النسخ تلقائيًا. هذا لا يسمح لك فقط بخدمة المزيد من المستخدمين (التوسع الأفقي)، بل يوفر أيضًا التكرار (redundancy). إذا تعطلت إحدى نسخ التطبيق فجأة، سيلاحظ Nginx ذلك ويتوقف عن إرسال حركة المرور إليها، ويستمر في خدمة الطلبات من النسخ السليمة المتبقية، كل ذلك بشفافية تامة للمستخدم النهائي. هذا هو مفتاح بناء أنظمة لا تتوقف عن العمل." }
                ]},
                { type: ContentType.NOTE, title: "قاعدة حديدية لا تقبل التفاوض", text: "في أي بيئة إنتاج، لا تقم أبدًا، تحت أي ظرف من الظروف، بتعريض خادم التطبيق الخاص بك (Express, Gunicorn, Uvicorn, Puma, etc.) للإنترنت مباشرة. إن وضع وكيل عكسي محصن ومختبر مثل Nginx أمامه ليس مجرد ممارسة جيدة، بل هو ضرورة مطلقة. إنه طبقة الدفاع والتنظيم والأداء الأساسية التي تحول تطبيقًا من مشروع تطوير إلى خدمة قوية وموثوقة وقابلة للتطوير." },
              ]
            },
            {
              id: "p2_c2_s2",
              icon: "🚀",
              title: "المستوى 31: إعداد Nginx لتوجيه الطلبات إلى تطبيق Node.js",
              content: [
                { type: ContentType.PARAGRAPH, text: "هذا هو التطبيق العملي الأول لمفهوم الوكيل العكسي. سننشئ تطبيق Node.js بسيطًا باستخدام إطار العمل Express، وسنجعله يستمع على منفذ داخلي (localhost)، ثم نكوّن Nginx ليعمل كبوابة أمامية، يتلقى الطلبات من العالم الخارجي على المنفذ 80 ويوجهها بأمان إلى تطبيقنا. سنستكشف أيضًا كيفية التعامل مع اتصالات WebSocket، وهو مطلب شائع للتطبيقات التفاعلية." },
                { type: ContentType.HEADING4, text: "الخطوة 1: بناء تطبيق Express أكثر واقعية" },
                { type: ContentType.PARAGRAPH, text: "تأكد من أن لديك إصدار Node.js LTS مثبتًا عبر NVM. لنقم بإعداد مشروعنا:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `mkdir -p ~/projects/node-proxy-app
cd ~/projects/node-proxy-app
npm init -y
npm install express ws` },
                { type: ContentType.PARAGRAPH, text: "الآن، أنشئ ملف `index.js`. هذا التطبيق سيحتوي على نقطة نهاية HTTP عادية ونقطة نهاية WebSocket للتعامل مع الاتصالات في الوقت الفعلي." },
                { type: ContentType.CODE_BLOCK, language: "bash", code: "nano index.js" },
                { type: ContentType.CODE_EXPLANATION, language: "javascript", codeTitle: "index.js", code: `const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = 3000;
const HOST = '127.0.0.1'; // الاستماع محليًا فقط!

// نقطة نهاية HTTP العادية
app.get('/', (req, res) => {
    console.log(\`Received HTTP request from IP: \${req.ip}\`);
    res.send(\`<h1>Hello from Node.js App!</h1><p>Your IP as seen by the app: \${req.ip}</p>\`);
});

// منطق WebSocket
wss.on('connection', (ws) => {
    console.log('Client connected via WebSocket');
    ws.on('message', (message) => {
        console.log(\`Received: \${message}\`);
        ws.send(\`Echo from server: \${message}\`);
    });
    ws.send('Welcome to the WebSocket server!');
});

server.listen(PORT, HOST, () => {
    console.log(\`Server running at http://\${HOST}:\${PORT}/\`);
});

app.set('trust proxy', 1); // ثق في الوكيل العكسي الأول
` , explanations: [
                    { lines: "2-3", explanation: "نقوم باستيراد وحدات `http` و `ws` الأصلية. سنحتاج إلى خادم HTTP صريح لربط خادم WebSocket به." },
                    { lines: "6-7", explanation: "نقوم بإنشاء خادم HTTP من تطبيق Express الخاص بنا، ثم ننشئ خادم WebSocket ونرفقه بنفس خادم HTTP." },
                    { lines: "10", explanation: "الأهمية القصوى: نجعل الخادم يستمع على `127.0.0.1` (localhost). هذا يجعله غير قابل للوصول من خارج الخادم، مما يجبر كل حركة المرور على المرور عبر Nginx. هذا إجراء أمني أساسي." },
                    { lines: "20-27", explanation: "منطق WebSocket بسيط: عند اتصال عميل جديد، نستمع للرسائل ونعيد إرسالها كصدى." },
                    { lines: "33", explanation: "هذا السطر حيوي. إنه يخبر Express بأنه يجلس خلف وكيل عكسي واحد ويجب أن يثق في ترويسات `X-Forwarded-*` التي يرسلها هذا الوكيل. بدون هذا، `req.ip` سيعرض دائمًا `127.0.0.1`." }
                ]},
                { type: ContentType.PARAGRAPH, text: "هذا الكود هو مثال عملي لتطبيق حديث. إنه لا يخدم فقط طلبات HTTP التقليدية ولكنه يفتح أيضًا قناة اتصال ثنائية الاتجاه عبر WebSockets، مما يجعله أساسًا جيدًا لتطبيقات الدردشة أو لوحات المعلومات الحية. من خلال ضبط `trust proxy`، نجهز التطبيق للعمل بانسجام مع Nginx." },
                { type: ContentType.PARAGRAPH, text: "شغل التطبيق باستخدام مدير العمليات PM2 لضمان الموثوقية:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: "pm2 start index.js --name 'node-app'" },

                { type: ContentType.HEADING4, text: "الخطوة 2: تكوين Nginx كوكيل عكسي شامل" },
                { type: ContentType.PARAGRAPH, text: "الآن، سنعدل ملف تكوين النطاق الخاص بنا (`sudo nano /etc/nginx/sites-available/your_domain`). سنقوم بإزالة أي كتل `location` قديمة ونستبدلها بتكوين وكيل عكسي قوي يتعامل مع كل من HTTP و WebSockets." },
                { type: ContentType.CODE_EXPLANATION, language: "nginx", codeTitle: "تكوين الوكيل العكسي الكامل", code: `server {
    listen 80;
    server_name your_domain www.your_domain;

    location / {
        proxy_pass http://127.0.0.1:3000;
        
        # ترويسات الوكيل العكسي القياسية
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # تمكين WebSockets
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}`, explanations: [
                    { lines: "6", explanation: "هذا هو التوجيه الأساسي. نخبر Nginx بتمرير أي طلب يطابق هذا الموقع (`/`، أي كل شيء) إلى تطبيق Node.js الذي يعمل على المنفذ 3000." },
                    { lines: "9-12", explanation: "هذه الترويسات حيوية. إنها تمرر معلومات حول الطلب الأصلي إلى تطبيق Express. بدونها، لن يعرف تطبيقك عنوان IP الحقيقي للمستخدم أو اسم النطاق الذي طلبه." },
                    { lines: "15", explanation: "WebSockets تتطلب HTTP/1.1. هذا التوجيه يضمن أن Nginx سيتحدث مع الخادم الخلفي باستخدام الإصدار الصحيح." },
                    { lines: "16-17", explanation: "هذان السطران هما مفتاح عمل WebSockets. إنهما يمرران ترويسات `Upgrade` و `Connection` من العميل إلى الخادم الخلفي. هذه الترويسات هي التي تبدأ 'المصافحة' التي تحول اتصال HTTP إلى اتصال WebSocket دائم." }
                ]},
                { type: ContentType.PARAGRAPH, text: "هذا التكوين هو نموذج أساسي وقوي لأي تطبيق حديث. `proxy_pass` ينشئ الجسر إلى تطبيقك، وترويسات `proxy_set_header` تضمن عدم فقدان السياق الأصلي للطلب، وتوجيهات WebSocket تفتح الباب للاتصالات التفاعلية في الوقت الفعلي. هذا التكوين يحول Nginx إلى بوابة متعددة الاستخدامات وقوية." },
                { type: ContentType.HEADING4, text: "الخطوة 3: اختبار وإعادة تشغيل" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: "sudo nginx -t && sudo systemctl restart nginx" },
                { type: ContentType.PARAGRAPH, text: "الآن، إذا قمت بزيارة `http://your_domain` في متصفحك، يجب أن ترى رسالة Node.js. الأهم من ذلك، إذا فتحت أدوات المطور في المتصفح وكتبت كود JavaScript للاتصال بـ WebSocket (`const ws = new WebSocket('ws://your_domain');`)، يجب أن ترى اتصالًا ناجحًا ورسالة ترحيب في وحدة التحكم." },
              ]
            },
            {
              id: "p2_c2_s3",
              icon: "🐍",
              title: "المستوى 32: إعداد Nginx لتوجيه الطلبات إلى تطبيق Python (Gunicorn)",
              content: [
                { type: ContentType.PARAGRAPH, text: "النمط هو نفسه تقريبًا لتطبيقات Python، ولكن مع فارق بسيط وهام. خوادم الويب المدمجة في أطر عمل Python (مثل خادم تطوير Flask) مخصصة بشكل صارم للتطوير فقط. في بيئة الإنتاج، نستخدم دائمًا خادم واجهة بوابة خادم الويب (WSGI) مثل `Gunicorn` لإدارة وتشغيل تطبيق Python، ثم نضع Nginx أمامه. Gunicorn هو مدير العمليات الذي يعرف كيفية التحدث بلغة Python، و Nginx هو الحارس الذي يعرف كيفية التحدث بلغة الإنترنت." },
                { type: ContentType.PARAGRAPH, text: "في هذا المستوى، سنتعمق في استخدام مقابس يونكس (Unix Sockets) للاتصال بين Nginx و Gunicorn. في حين أن الاتصال عبر منفذ TCP (مثل `127.0.0.1:8000`) يعمل بشكل جيد، فإن استخدام المقابس له مزايا طفيفة في الأداء والأمان للعمليات التي تعمل على نفس الجهاز." },
                { type: ContentType.HEADING4, text: "الخطوة 1: بناء تطبيق Flask وتحضيره للإنتاج" },
                { type: ContentType.PARAGRAPH, text: "تأكد من أن لديك بيئة Python افتراضية (راجع المستوى 41). لنقم بإعداد المشروع:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `mkdir -p ~/projects/python-proxy-app
cd ~/projects/python-proxy-app
python3 -m venv venv
source venv/bin/activate
pip install Flask Gunicorn` },
                { type: ContentType.PARAGRAPH, text: "أنشئ ملف `app.py`:" },
                { type: ContentType.CODE_BLOCK, language: "python", code: `from flask import Flask, request

app = Flask(__name__)

# أخبر Flask أنه يثق في ترويسات الوكيل
from werkzeug.middleware.proxy_fix import ProxyFix
app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1)


@app.route("/")
def hello():
    # بفضل ProxyFix، سيعرض request.remote_addr الآن IP الحقيقي للمستخدم
    user_ip = request.remote_addr
    return f"<h1>Hello from Python App (via Gunicorn)!</h1><p>Your IP is: {user_ip}</p>"` },
                 { type: ContentType.NOTE, title: "لماذا ProxyFix؟", text: "على عكس Express، لا يحتوي Flask على إعداد بسيط مثل `app.set('trust proxy', true)`. الطريقة الصحيحة هي استخدام `ProxyFix` middleware. `x_for=1` يعني 'ثق في عنوان IP واحد في ترويسة X-Forwarded-For'، وهو ما يتوافق مع وجود وكيل عكسي واحد (Nginx) أمامنا. هذا ضروري لجعل `request.remote_addr` يعرض عنوان IP الصحيح للمستخدم." },
                { type: ContentType.HEADING4, text: "الخطوة 2: تشغيل التطبيق مع Gunicorn عبر مقبس يونكس" },
                { type: ContentType.PARAGRAPH, text: "Gunicorn هو الذي سيقوم بتشغيل تطبيقنا. بدلاً من الاستماع على منفذ TCP، سنجعله ينشئ ملف مقبس. المقبس هو مجرد ملف على نظام الملفات يمكن للعمليات استخدامه للتواصل مع بعضها البعض. هذا يتجنب الحمل الزائد لمكدس شبكة TCP/IP، مما يجعله أسرع قليلاً للاتصالات المحلية." },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "تشغيل Gunicorn", code: "gunicorn --workers 3 --bind unix:/tmp/myapp.socket -m 007 app:app", explanations: [
                    { lines: "1", explanation: "`--workers 3`: يحدد عدد العمليات العاملة التي سيتم تشغيلها. القاعدة الجيدة هي `(2 * عدد أنوية المعالج) + 1`." },
                    { lines: "1", explanation: "`--bind unix:/tmp/myapp.socket`: يخبر Gunicorn بإنشاء ملف مقبس في `/tmp/myapp.socket` والاستماع عليه. هذا هو 'العنوان' الذي سيتصل به Nginx. `unix:` هي البادئة التي تميزه عن ربط TCP/IP." },
                    { lines: "1", explanation: "`-m 007`: هذا أمر أذونات حاسم. إنه يضبط قناع أذونات الملف للمقبس ليكون قابلاً للقراءة والكتابة والتنفيذ من قبل الجميع. هذا ضروري لأن Nginx يعمل كمستخدم `www-data`، وهو يحتاج إلى إذن للكتابة إلى المقبس الذي يملكه المستخدم `nagi`." },
                    { lines: "1", explanation: "`app:app`: يخبر Gunicorn بكيفية العثور على تطبيقنا. `app` الأول هو اسم الملف (`app.py`)، و `app` الثاني هو اسم متغير التطبيق داخل الملف (`app = Flask(__name__)`)." }
                ]},
                { type: ContentType.PARAGRAPH, text: "هذا الأمر هو الطريقة الاحترافية لتشغيل تطبيق Python في الإنتاج. بدلاً من الاعتماد على خادم التطوير، يوفر Gunicorn بيئة قوية متعددة العمليات يمكنها التعامل مع طلبات متزامنة متعددة. استخدام مقبس يونكس بدلاً من منفذ TCP هو تحسين طفيف للأداء ويوفر طريقة اتصال مباشرة بين Nginx و Gunicorn." },
                { type: ContentType.PARAGRAPH, text: "لجعل هذا دائمًا، سنقوم بإنشاء خدمة `systemd` في الفصل التالي." },
                { type: ContentType.HEADING4, text: "الخطوة 3: تكوين Nginx للتحدث مع مقبس يونكس" },
                { type: ContentType.PARAGRAPH, text: "الآن، نعدل تكوين Nginx ليشير إلى ملف المقبس. هذا يوضح مرونة Nginx في الاتصال بأنواع مختلفة من الخدمات الخلفية." },
                { type: ContentType.CODE_EXPLANATION, language: "nginx", codeTitle: "الوكيل العكسي إلى مقبس يونكس", code: `server {
    listen 80;
    server_name your_domain www.your_domain;

    location / {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        proxy_pass http://unix:/tmp/myapp.socket;
    }
}`, explanations: [
                    { lines: "11", explanation: "هذا هو التغيير الوحيد والمهم. بدلاً من عنوان IP ومنفذ، نخبر Nginx بالاتصال مباشرة بملف مقبس يونكس الذي أنشأه Gunicorn. البادئة `http://unix:` هي بناء الجملة الخاص الذي يفهمه Nginx لهذا الغرض. الترويسات الأخرى (`proxy_set_header`) تظل كما هي ومهمة." }
                ]},
                { type: ContentType.PARAGRAPH, text: "هذا التعديل البسيط في `proxy_pass` يوضح قوة Nginx. إنه قادر على توجيه الطلبات ليس فقط إلى عناوين الشبكة ولكن أيضًا إلى نقاط النهاية في نظام الملفات مثل مقابس يونكس، مما يوفر طريقة اتصال أسرع وأكثر مباشرة بين Nginx وتطبيقك الخلفي." },
                { type: ContentType.PARAGRAPH, text: "بعد اختبار التكوين (`sudo nginx -t`) وإعادة تشغيل Nginx (`sudo systemctl restart nginx`)، يجب أن ترى رسالة تطبيق Python عند زيارة نطاقك." },
              ]
            },
            {
              id: "p2_c2_s4",
              icon: "🏷️",
              title: "المستوى 33: فهم ترويسات الوكيل العكسي (X-Forwarded-For)",
              content: [
                { type: ContentType.PARAGRAPH, text: "عندما يجلس Nginx أمام تطبيقك، فإنه يعمل كعميل نيابة عن المستخدم الأصلي. هذا يعني أن من منظور تطبيقك الخلفي، كل طلب يأتي من نفس المكان: Nginx نفسه (أي من `127.0.0.1`). هذا يخلق مشكلة كبيرة تُعرف بـ 'فقدان هوية العميل'. إذا لم يعرف تطبيقك عنوان IP الحقيقي للمستخدم، فإنه لا يمكنه تسجيله، أو تطبيق حدود المعدل بناءً عليه، أو استخدامه لتحديد الموقع الجغرافي. الحل يكمن في مجموعة من ترويسات HTTP القياسية التي يجب على الوكيل العكسي إضافتها إلى الطلب قبل تمريره." },
                { type: ContentType.HEADING4, text: "التشريح الكامل للترويسات الحيوية" },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "X-Forwarded-For", definition: "هذه هي الترويسة الأكثر أهمية. إنها قائمة مفصولة بفاصلة لعناوين IP التي مر الطلب من خلالها. يضيف كل وكيل عكسي عنوان IP للعميل الذي اتصل به إلى نهاية القائمة. لذلك، فإن أول عنوان IP في القائمة هو دائمًا المستخدم الأصلي. على سبيل المثال: `X-Forwarded-For: 203.0.113.195, 70.41.3.18, 150.172.238.178`. هنا، `203.0.113.195` هو المستخدم الحقيقي." },
                    { term: "X-Forwarded-Proto", definition: "تخبر تطبيقك بالبروتوكول الأصلي الذي استخدمه المستخدم (`http` أو `https`). هذا أمر بالغ الأهمية عند إنهاء SSL في Nginx. إذا لم يعرف تطبيقك أن الاتصال الأصلي كان HTTPS، فقد يقوم عن طريق الخطأ بإنشاء عناوين URL باستخدام `http://`، مما يؤدي إلى تحذيرات أمان أو حلقات إعادة توجيه لا نهائية." },
                    { term: "X-Forwarded-Host", definition: "يحتوي على اسم المضيف الأصلي الذي طلبه المستخدم (مثل `www.example.com`). هذا مفيد إذا كان تطبيقك يخدم نطاقات متعددة أو يحتاج إلى إنشاء عناوين URL كاملة." },
                    { term: "Host", definition: "ليست ترويسة `X-`، ولكن من المهم جدًا تعيينها بشكل صحيح. بشكل افتراضي، قد يمرر Nginx اسم مضيف الوكيل (على سبيل المثال، اسم كتلة `upstream` أو `localhost`). تعيين `proxy_set_header Host $host;` يضمن أن تطبيقك يرى ترويسة `Host` الأصلية التي أرسلها متصفح المستخدم، وهو أمر ضروري للمضيفات الافتراضية المستندة إلى الاسم." },
                    { term: "X-Real-IP", definition: "ترويسة غير قياسية ولكنها شائعة جدًا، وغالبًا ما يستخدمها Nginx. إنها تحتوي دائمًا على عنوان IP واحد فقط: عنوان العميل المباشر الذي اتصل بـ Nginx. إنها أبسط من `X-Forwarded-For` ولكنها لا تحمل تاريخ السلسلة الكاملة للوكلاء." }
                ]},
                { type: ContentType.HEADING4, text: "التكوين النموذجي والآمن في Nginx" },
                { type: ContentType.PARAGRAPH, text: "التكوين الذي استخدمناه في المستويات السابقة هو نقطة بداية ممتازة ويغطي معظم الحالات. دعنا نفككه بعمق:" },
                { type: ContentType.CODE_EXPLANATION, language: "nginx", codeTitle: "شرح تكوين الترويسات", code: `proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;`, explanations: [
                    { lines: "1", explanation: "يمرر ترويسة `Host` الأصلية من العميل إلى الخادم الخلفي. `$host` هو متغير Nginx يحتوي على اسم المضيف من سطر الطلب أو ترويسة `Host`." },
                    { lines: "2", explanation: "يعين `X-Real-IP` إلى عنوان IP للعميل الذي يتصل بـ Nginx مباشرة. `$remote_addr` هو متغير Nginx لهذا الغرض." },
                    { lines: "3", explanation: "هذا هو الأكثر ذكاءً. `$proxy_add_x_forwarded_for` هو متغير Nginx خاص يأخذ قيمة ترويسة `X-Forwarded-For` الواردة (إذا كانت موجودة) ويلحق بها `$remote_addr` مفصولاً بفاصلة. هذا يبني سلسلة الوكلاء بشكل صحيح." },
                    { lines: "4", explanation: "يعين `X-Forwarded-Proto` إلى `http` أو `https`، اعتمادًا على البروتوكول الذي استخدمه العميل للاتصال بـ Nginx. `$scheme` هو المتغير لهذا الغرض." }
                ]},
                { type: ContentType.PARAGRAPH, text: "مجموعة الترويسات هذه هي المعيار الفعلي لتوفير سياق طلب دقيق لتطبيقاتك الخلفية. إنها تضمن أن تطبيقك لا يعمل في فراغ، بل لديه كل المعلومات اللازمة حول العميل الأصلي لاتخاذ قرارات أمنية ومنطقية صحيحة." },
                { type: ContentType.HEADING4, text: "تكوين الثقة من جانب التطبيق" },
                { type: ContentType.PARAGRAPH, text: "بعد تكوين Nginx، يجب أن تخبر إطار عمل الويب الخاص بك بأنه يجب أن يثق في هذه الترويسات. هذا إجراء أمني لمنع المهاجمين من إرسال ترويسات `X-Forwarded-For` مزيفة مباشرة إلى تطبيقك إذا تمكنوا من تجنب Nginx." },
                { type: ContentType.PARAGRAPH, text: "في **Express (Node.js)**:" },
                { type: ContentType.CODE_BLOCK, language: "javascript", code: `// ثق في وكيل عكسي واحد (Nginx)
app.set('trust proxy', 1);` },
                { type: ContentType.PARAGRAPH, text: "في **Flask (Python)**، باستخدام middleware:" },
                { type: ContentType.CODE_BLOCK, language: "python", code: `from werkzeug.middleware.proxy_fix import ProxyFix
# ثق في وكيل عكسي واحد لكل من For و Proto
app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1)` },
                { type: ContentType.NOTE, title: "الثقة ولكن تحقق", text: "تمكين `trust proxy` أو ما يعادله في إطار عملك يعني أنك تؤكد أن تطبيقك لن يتم الوصول إليه إلا من خلال وكيل عكسي موثوق به. هذا هو السبب في أن تكوين جدار الحماية الخاص بك (UFW) لمنع الوصول المباشر إلى منفذ التطبيق (مثل 3000 أو 8000) أمر بالغ الأهمية. يجب أن يكون Nginx هو البوابة الوحيدة." },
              ]
            },
            {
              id: "p2_c2_s5",
              icon: "⚖️",
              title: "المستوى 34: توزيع الحمل الأساسي (Load Balancing) مع Nginx",
              content: [
                { type: ContentType.PARAGRAPH, text: "توزيع الأحمال هو تقنية أساسية لتحقيق هدفين رئيسيين في أي نظام جاد: قابلية التوسع (Scalability) والتوافر العالي (High Availability). بدلاً من تشغيل نسخة واحدة من تطبيقك (نقطة فشل واحدة)، يمكنك تشغيل عدة نسخ وتوزيع الطلبات الواردة عليها. هذا لا يسمح لك فقط بخدمة المزيد من المستخدمين (التوسع)، بل يوفر أيضًا التكرار (redundancy)؛ إذا تعطلت إحدى نسخ التطبيق، يمكن للنسخ الأخرى الاستمرار في خدمة حركة المرور بسلاسة. Nginx يجعل توزيع الأحمال الأساسي سهلاً بشكل مدهش من خلال كتلة `upstream`." },
                { type: ContentType.HEADING4, text: "كتلة `upstream`: تعريف مجموعة الخوادم" },
                { type: ContentType.PARAGRAPH, text: "المكون الرئيسي لتوزيع الأحمال في Nginx هو كتلة `upstream`. إنها تسمح لك بتعريف مجموعة مسماة من الخوادم الخلفية. بدلاً من توجيه `proxy_pass` إلى خادم واحد، يمكنك توجيهه إلى هذه المجموعة، وسيقوم Nginx بالباقي." },
                { type: ContentType.HEADING4, text: "مثال عملي: توسيع نطاق تطبيق Node.js" },
                { type: ContentType.PARAGRAPH, text: "لنفترض أن تطبيق Node.js الخاص بنا أصبح شائعًا وبدأ في التباطؤ تحت الحمل. الحل هو تشغيل عدة نسخ منه. يمكننا استخدام PM2 بسهولة لتشغيل التطبيق في وضع الكتلة، أو يمكننا تشغيل عمليات منفصلة على منافذ مختلفة. لغرض التوضيح، لنفترض أننا قمنا بتشغيل ثلاث عمليات:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "`pm2 start index.js --name app1 -p 3000`",
                    "`pm2 start index.js --name app2 -p 3001`",
                    "`pm2 start index.js --name app3 -p 3002`"
                ]},
                { type: ContentType.PARAGRAPH, text: "الآن، نكوّن Nginx لتوزيع الحمل بين هذه العمليات الثلاث." },
                { type: ContentType.CODE_EXPLANATION, language: "nginx", codeTitle: "تكوين توزيع الأحمال", code: `http {
    # ...
    upstream myapp_backend {
        # least_conn; # <-- إلغاء التعليق لاستخدام خوارزمية الاتصالات الأقل
        server 127.0.0.1:3000;
        server 127.0.0.1:3001;
        server 127.0.0.1:3002;
    }

    server {
        listen 80;
        server_name your_domain www.your_domain;

        location / {
            proxy_pass http://myapp_backend;
            # ... proxy_set_header directives ...
        }
    }
    # ...
}`, explanations: [
                    { lines: "3", explanation: "نحدد كتلة `upstream` ونعطيها اسمًا فريدًا (`myapp_backend`). يجب أن تكون هذه الكتلة خارج كتلة `server`، عادة في سياق `http`." },
                    { lines: "5-7", explanation: "نسرد عناوين الخوادم الخلفية. يمكن أن تكون هذه منافذ على نفس الجهاز، أو عناوين IP لخوادم مختلفة تمامًا في شبكتك الخاصة. كل خادم في القائمة يعتبر مرشحًا لتلقي الطلبات." },
                    { lines: "14", explanation: "التغيير الرئيسي هنا. بدلاً من `proxy_pass` إلى عنوان IP ومنفذ معين، نقوم بتمريره إلى اسم مجموعة `upstream` التي حددناها، مسبوقة بـ `http://`. Nginx الآن يعرف أنه يجب عليه الاختيار من بين الخوادم في تلك المجموعة." }
                ]},
                { type: ContentType.PARAGRAPH, text: "باستخدام كتلة `upstream`، نقوم بفصل منطق توجيه الطلبات عن قائمة الخوادم الفعلية. هذا يجعل التكوين أكثر مرونة وقابلية للصيانة. `proxy_pass` الآن يوجه الطلبات إلى مجموعة من الخوادم، ويقوم Nginx بالباقي، حيث يوزع الطلبات بذكاء بين الأعضاء المتاحين في المجموعة." },
                { type: ContentType.HEADING4, text: "خوارزميات توزيع الأحمال المتقدمة" },
                { type: ContentType.PARAGRAPH, text: "بشكل افتراضي، يستخدم Nginx خوارزمية **الترتيب الدوري (Round Robin)**. يرسل الطلب الأول إلى الخادم 3000، والثاني إلى 3001، والثالث إلى 3002، والرابع إلى 3000 مرة أخرى، وهكذا. هذا بسيط وفعال. لكن Nginx يدعم خوارزميات أخرى أكثر تقدمًا:" },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "الاتصالات الأقل (Least Connections)", definition: "مع `least_conn;`، يرسل Nginx الطلب التالي إلى الخادم الذي لديه أقل عدد من الاتصالات النشطة حاليًا. هذا مفيد جدًا عندما تكون مدة معالجة الطلبات متفاوتة. إنه يمنع تراكم الطلبات على خادم واحد بينما الخوادم الأخرى خاملة." },
                    { term: "تجزئة IP (IP Hash)", definition: "مع `ip_hash;`، يقوم Nginx بحساب 'تجزئة' (hash) من عنوان IP الخاص بالعميل ويستخدمها لتحديد الخادم الذي يجب أن يتلقى الطلب. هذا يضمن أن الطلبات من نفس المستخدم ستذهب دائمًا إلى نفس الخادم الخلفي. هذا ضروري للتطبيقات القديمة التي تخزن حالة الجلسة في ذاكرة الخادم المحلي (وهو ما لا يوصى به)، ولكنه قد يكون مفيدًا أيضًا لتحسين أداء ذاكرة التخزين المؤقت المحلية." },
                    { term: "الترتيب الدوري الموزون (Weighted Round Robin)", definition: "يمكنك إعطاء وزن لكل خادم: `server 127.0.0.1:3000 weight=3;`. في هذا المثال، سيتلقى الخادم 3000 ثلاثة أضعاف عدد الطلبات التي يتلقاها الآخرون. هذا مفيد إذا كان لديك خوادم ذات قدرات مختلفة." }
                ]},
                { type: ContentType.HEADING4, text: "فحوصات الصحة والتكرار" },
                { type: ContentType.PARAGRAPH, text: "يقوم Nginx أيضًا بإجراء فحص صحة أساسي. بشكل افتراضي (`max_fails=1` و `fail_timeout=10s`)، إذا فشل خادم في الاستجابة لطلب واحد، فسيعتبره Nginx 'معطلاً' ويتوقف عن إرسال الطلبات إليه لمدة 10 ثوانٍ، ثم يحاول مرة أخرى. هذا يمنع المستخدمين من مواجهة أخطاء بسبب خادم واحد معطل ويزيد من موثوقية نظامك بشكل كبير." },
                { type: ContentType.NOTE, title: "الحالة المشتركة", text: "عند استخدام توزيع الأحمال، من المهم جدًا تصميم تطبيقاتك لتكون 'عديمة الحالة' (stateless). يجب ألا يخزن أي خادم تطبيق بيانات جلسة خاصة به. يجب تخزين الحالة في مكان مشترك، مثل قاعدة بيانات PostgreSQL أو ذاكرة تخزين مؤقت Redis، حتى يتمكن أي خادم تطبيق من معالجة أي طلب من أي مستخدم في أي وقت." },
              ]
            }
        ]
    },
    {
        id: "p2_c3",
        chapterTitle: "الفصل الثامن: إعداد قاعدة البيانات (PostgreSQL)",
        sections: [
            {
              id: "p2_c3_s1",
              icon: "🤔",
              title: "المستوى 35: لماذا PostgreSQL؟ مقارنة مع MySQL و MongoDB",
              content: [
                { type: ContentType.PARAGRAPH, text: "اختيار قاعدة البيانات هو أحد أهم القرارات المعمارية التي ستتخذها. إنه ليس مجرد قرار تقني، بل هو التزام طويل الأمد يؤثر على كيفية نمذجة بياناتك، وتطور تطبيقك، وقدرتك على طرح ميزات جديدة. في هذا المستوى، سنستكشف بعمق لماذا تعتبر PostgreSQL، غالبًا، الخيار الافتراضي الأكثر حكمة وقوة لمعظم تطبيقات الويب الحديثة، من خلال مقارنتها بالمنافسين الرئيسيين: MySQL (ممثل قواعد البيانات العلائقية الأخرى) و MongoDB (ممثل عالم NoSQL)." },
                { type: ContentType.HEADING4, text: "PostgreSQL: سكين الجيش السويسري لقواعد البيانات العلائقية" },
                { type: ContentType.PARAGRAPH, text: "PostgreSQL هي نظام إدارة قواعد بيانات كائنية-علائقية (ORDBMS) مفتوح المصدر وناضج للغاية. تُعرف في مجتمع المطورين بأنها 'قاعدة البيانات التي تفعل كل شيء بشكل صحيح'. التزامها الصارم بمعايير SQL وخصائص ACID (الذرية، الاتساق، العزلة، الدوام) يعني أنها تضع سلامة البيانات فوق كل شيء آخر. هذا ليس مجرد مصطلح تقني، بل هو وعد بأن بياناتك ستظل متسقة ويمكن التنبؤ بها حتى في ظل ظروف الفشل المعقدة." },
                { type: ContentType.PARAGRAPH, text: "لكن قوتها الحقيقية تكمن في قابليتها للتوسعة. يمكنك تعريف أنواع بياناتك الخاصة، ووظائفك المخصصة بلغات مثل PL/pgSQL أو Python أو C، وأنواع فهارس متخصصة. هذا يجعلها قابلة للتكيف بشكل لا يصدق. هل تحتاج إلى التعامل مع بيانات جغرافية؟ إضافة PostGIS تحولها إلى نظام معلومات جغرافية كامل. هل تحتاج إلى التعامل مع بيانات السلاسل الزمنية؟ إضافة TimescaleDB تفعل ذلك. هذا يعني أنك غالبًا ما يمكنك تلبية متطلبات جديدة دون الحاجة إلى إضافة نظام قاعدة بيانات جديد تمامًا إلى حزمتك." },
                { type: ContentType.HEADING4, text: "المواجهة العائلية: PostgreSQL مقابل MySQL" },
                { type: ContentType.PARAGRAPH, text: "MySQL هو أيضًا RDBMS شائع وموثوق، وهو الخيار الافتراضي في نظام LAMP (Linux, Apache, MySQL, PHP). تاريخيًا، كان يُنظر إلى MySQL على أنه أسرع وأبسط، بينما كان PostgreSQL أقوى وأكثر ثراءً بالميزات. في السنوات الأخيرة، تقاربت الفجوة، لكن بعض الاختلافات الفلسفية لا تزال قائمة. MySQL، وخاصة مع محرك التخزين MyISAM الأقدم، قد يتنازل عن بعض ضمانات الاتساق الصارمة مقابل سرعة القراءة. PostgreSQL، مع بنية التحكم في التزامن متعدد الإصدارات (MVCC) المتطورة، يتفوق في البيئات ذات الأحمال العالية من القراءة والكتابة المتزامنة، ويتعامل مع الاستعلامات التحليلية المعقدة ووظائف النوافذ وتعبيرات الجداول المشتركة (CTEs) بشكل أكثر أناقة وقوة من MySQL." },
                { type: ContentType.HEADING4, text: "صراع النماذج: PostgreSQL (SQL) مقابل MongoDB (NoSQL)" },
                { type: ContentType.PARAGRAPH, text: "هذه مقارنة بين نماذج مختلفة تمامًا. MongoDB هي قاعدة بيانات وثائقية رائدة في عالم NoSQL. إنها تخزن البيانات في مستندات BSON (Binary JSON) مرنة، مما يلغي الحاجة إلى مخطط (schema) صارم. هذا يجعلها جذابة للغاية للمطورين في المراحل المبكرة من المشروع، حيث تتغير المتطلبات بسرعة. يمكنك إضافة حقول جديدة إلى مستنداتك دون الحاجة إلى تشغيل عمليات ترحيل (migration) معقدة." },
                { type: ContentType.PARAGRAPH, text: "ومع ذلك، هذه المرونة تأتي بتكلفة. ضمان الاتساق عبر مستندات متعددة يتطلب منطقًا إضافيًا في طبقة التطبيق. الصلات (Joins)، وهي عملية أساسية في قواعد البيانات العلائقية، ليست عملية أصلية في MongoDB وتتطلب استخدام إطار عمل التجميع (`$lookup`)، الذي يمكن أن يكون معقدًا وأقل كفاءة. المعاملات التي تشمل مستندات متعددة ممكنة ولكنها كانت إضافة حديثة نسبيًا وليست بقوة وصلابة المعاملات في PostgreSQL." },
                { type: ContentType.NOTE, title: "PostgreSQL: أفضل ما في العالمين؟", text: "أحد أقوى جوانب PostgreSQL الحديثة هو دعمه الأصلي والممتاز لبيانات JSON، وخاصة عبر نوع البيانات `jsonb`. `jsonb` يخزن JSON بتنسيق ثنائي مُحسَّن، مما يسمح لك بفهرسة والاستعلام داخل مستندات JSON بكفاءة لا تصدق. يمكنك أن يكون لديك عمود `jsonb` في جدول علائقي، مما يمنحك المرونة الكاملة لـ NoSQL لتخزين بيانات غير مهيكلة، مع الاستمرار في الاستفادة من قوة الصلات والمعاملات وسلامة البيانات في العالم العلائقي. هذه القدرة على الجمع بين العالمين تجعل PostgreSQL الخيار الافتراضي الأكثر أمانًا وقوة ومرونة لمعظم المشاريع الجديدة، حيث يمكنها أن تنمو وتتكيف مع متطلباتك المستقبلية دون الحاجة إلى إعادة تصميم كاملة." },
              ]
            },
            {
              id: "p2_c3_s2",
              icon: "📦",
              title: "المستوى 36: تثبيت PostgreSQL على أوبونتو",
              content: [
                { type: ContentType.PARAGRAPH, text: "تثبيت PostgreSQL على أوبونتو عملية سهلة ومباشرة، حيث يتم الحفاظ على الحزم بشكل جيد في المستودعات الرسمية. ومع ذلك، فإن فهم ما يحدث خلف الكواليس أثناء هذا التثبيت البسيط أمر بالغ الأهمية لتكون مسؤول نظام فعالاً. أنت لا تقوم فقط بوضع بعض الملفات على القرص، بل تقوم بتهيئة نظام معقد له مستخدموه وأذوناته وتكويناته الخاصة." },
                { type: ContentType.HEADING4, text: "التثبيت: خطوة واحدة، تأثيرات متعددة" },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "تثبيت PostgreSQL", code: `sudo apt update
sudo apt install postgresql postgresql-contrib -y`, explanations: [
                    { lines: "1", explanation: "نقوم بتحديث فهرس الحزم المحلي كالمعتاد لضمان الحصول على أحدث المعلومات من مستودعات أوبونتو." },
                    { lines: "2", explanation: "هذا الأمر يقوم بتثبيت حزمتين رئيسيتين: `postgresql` هي المحرك الأساسي لقاعدة البيانات، و `postgresql-contrib` هي مجموعة لا تقدر بثمن من الأدوات والإضافات التي طورها المجتمع. تتضمن هذه الحزمة أدوات مثل `pgcrypto` للتشفير داخل قاعدة البيانات، و `hstore` لتخزين أزواج المفتاح/القيمة، والمزيد. تثبيتها الآن يوفر عليك الوقت في المستقبل." }
                ]},
                { type: ContentType.PARAGRAPH, text: "هذا الأمر البسيط يقوم بسلسلة من الإجراءات الهامة:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>إنشاء مستخدم نظام:</strong> يتم إنشاء مستخدم نظام لينكس جديد يسمى `postgres`. هذا المستخدم ليس مستخدمًا عاديًا ولا يمتلك كلمة مرور بشكل افتراضي. إنه حساب خدمة مخصص لامتلاك وإدارة جميع ملفات وعمليات PostgreSQL.",
                    "<strong>تهيئة كتلة قاعدة البيانات:</strong> يتم إنشاء دليل بيانات جديد (عادة في `/var/lib/postgresql/VERSION/main`). هذا هو المكان الذي سيتم فيه تخزين جميع بياناتك الفعلية (الجداول، الفهارس، إلخ).",
                    "<strong>إنشاء دور `postgres`:</strong> داخل قاعدة البيانات نفسها، يتم إنشاء 'دور' (role) خارق يسمى `postgres`. هذا هو المستخدم الإداري الأعلى داخل PostgreSQL.",
                    "<strong>إعداد الخدمة:</strong> يتم إنشاء وتفعيل خدمة `systemd` تسمى `postgresql.service`. هذا يضمن أن قاعدة البيانات ستبدأ تلقائيًا عند إقلاع الخادم وتعمل في الخلفية."
                ]},
                { type: ContentType.PARAGRAPH, text: "هذا الأمر هو أكثر من مجرد تثبيت برنامج؛ إنه يقوم بتهيئة بنية تحتية كاملة لقاعدة البيانات. من خلال إنشاء مستخدم وخدمة مخصصين، يضمن أوبونتو أن PostgreSQL تعمل في بيئة معزولة وآمنة، منفصلة عن بقية النظام." },
                { type: ContentType.HEADING4, text: "فهم المصادقة الأولية: `peer authentication`" },
                { type: ContentType.PARAGRAPH, text: "بشكل افتراضي، يتم تكوين PostgreSQL باستخدام طريقة مصادقة محلية تسمى `peer`. إنها آلية ذكية وآمنة. القاعدة بسيطة: 'اسمح بالوصول بدون كلمة مرور إذا كان اسم مستخدم نظام التشغيل الذي يقوم بالطلب هو نفسه اسم دور قاعدة البيانات الذي يحاول الوصول إليه'. هذا يعني أن مستخدم النظام `nagi` لا يمكنه تسجيل الدخول كدور قاعدة البيانات `postgres` مباشرة. للقيام بذلك، يجب أن تصبح أولاً مستخدم النظام `postgres`." },
                { type: ContentType.HEADING4, text: "الوصول الأول إلى `psql`" },
                { type: ContentType.PARAGRAPH, text: "بناءً على ما سبق، للوصول إلى موجه أوامر PostgreSQL (`psql`) بصلاحيات إدارية، يجب عليك أولاً تبديل هويتك إلى مستخدم النظام `postgres`." },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "الوصول الأولي إلى psql", code: `sudo -i -u postgres`, explanations: [
                    { lines: "1", explanation: "هذا الأمر يفتح جلسة shell تفاعلية (`-i`) كمستخدم `postgres` (`-u postgres`). أنت الآن تعمل كالمستخدم الذي يملك عملية قاعدة البيانات. ستلاحظ أن موجه الأوامر الخاص بك قد تغير إلى `postgres@your-hostname:~$`." }
                ]},
                { type: ContentType.PARAGRAPH, text: "بمجرد أن تكون في جلسة `postgres`، يمكنك تشغيل `psql` مباشرة. نظرًا لأنك الآن مستخدم النظام `postgres` وتحاول الوصول إلى دور قاعدة البيانات `postgres`، فإن مصادقة `peer` ستسمح لك بالدخول دون كلمة مرور." },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `psql` },
                { type: ContentType.PARAGRAPH, text: "يجب أن ترى موجه الأوامر الترحيبي `psql (VERSION)` وينتهي بـ `postgres=#`. هذا يعني أنك متصل بقاعدة البيانات الافتراضية `postgres` كدور `postgres`. أنت الآن في مقعد القيادة." },
                { type: ContentType.NOTE, title: "الخروج بأمان", text: "للخروج من `psql`، اكتب `\\q` واضغط Enter. للخروج من جلسة المستخدم `postgres` والعودة إلى المستخدم العادي `nagi`، اكتب `exit` واضغط Enter." },
              ]
            },
            {
              id: "p2_c3_s3",
              icon: "🛡️",
              title: "المستوى 37: التأمين الأولي لـ PostgreSQL",
              content: [
                { type: ContentType.PARAGRAPH, text: "التثبيت الافتراضي لـ PostgreSQL آمن تمامًا للعمل المحلي، حيث لا يقبل أي اتصالات عن بعد ومصادقة `peer` تمنع الوصول غير المصرح به. ومع ذلك, من الممارسات الأمنية الجيدة دائمًا تعيين كلمة مرور قوية للمستخدم الإداري `postgres`. هذا يضيف طبقة دفاع إضافية في حالة تمكن مهاجم من الوصول إلى حساب `postgres` على مستوى النظام، ويعد خطوة ضرورية قبل التفكير في تمكين أي نوع من الوصول عن بعد في المستقبل." },
                { type: ContentType.HEADING4, text: "لماذا تعيين كلمة مرور إذا كنا نستخدم `peer`؟" },
                { type: ContentType.PARAGRAPH, text: "هذا سؤال ممتاز. في الوقت الحالي، مصادقة `peer` هي التي تحمينا. لكن ملفات التكوين يمكن أن تتغير. إذا قمت أنت أو زميل لك بتغيير طريقة المصادقة إلى `md5` (كلمة مرور) في المستقبل ونسيت تعيين كلمة مرور أولاً، فسيكون لديك دور خارق بدون حماية. تعيين كلمة المرور الآن هو إجراء استباقي يتبع مبدأ 'الدفاع في العمق' (Defense in Depth)." },
                { type: ContentType.HEADING4, text: "تعيين كلمة المرور عبر `psql`" },
                { type: ContentType.PARAGRAPH, text: "سنصل إلى موجه أوامر `psql` باستخدام الطريقة التي تعلمناها، ثم نستخدم أمر SQL لتغيير كلمة المرور. هذه هي الطريقة الرسمية والموصى بها." },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "تعيين كلمة المرور", code: `sudo -u postgres psql

-- Once inside psql, run the following SQL command:
ALTER USER postgres WITH PASSWORD 'YOUR_VERY_STRONG_PASSWORD';`, explanations: [
                    { lines: "1", explanation: "نستخدم `sudo -u postgres` للوصول إلى `psql` باستخدام مصادقة `peer`." },
                    { lines: "4", explanation: "هذا هو أمر SQL القياسي لتعديل خصائص المستخدم. `ALTER USER postgres` يستهدف الدور الخارق. `WITH PASSWORD '...'` يعين كلمة مرور جديدة. من الأهمية بمكان استخدام كلمة مرور طويلة ومعقدة وفريدة هنا وتخزينها في مدير كلمات مرور آمن." }
                ]},
                { type: ContentType.PARAGRAPH, text: "هذا الأمر هو مثال على كيفية إدارة قاعدة البيانات مباشرة. من خلال تغيير كلمة مرور المستخدم الإداري، نقوم بتحصين الحساب الأكثر امتيازًا في نظام قاعدة البيانات لدينا، مما يضيف طبقة دفاع حيوية. حتى لو لم نستخدمها اليوم، فهي موجودة كشبكة أمان للمستقبل." },
                { type: ContentType.HEADING4, text: "جولة في ملفات التكوين الرئيسية" },
                { type: ContentType.PARAGRAPH, text: "مثل Nginx، لدى PostgreSQL ملفات تكوين رئيسية تتحكم في سلوكها. فهم مكانها وماذا تفعل أمر بالغ الأهمية. توجد هذه الملفات عادة في `/etc/postgresql/VERSION/main/`. استبدل `VERSION` بإصدار PostgreSQL المثبت لديك (مثل 14)." },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "postgresql.conf", definition: "هذا هو ملف التكوين العام والخادم الرئيسي. إنه ملف نصي طويل يحتوي على مئات التوجيهات، معظمها معلق. يتحكم في كل شيء بدءًا من تخصيص الموارد (مثل `shared_buffers` و `work_mem`) إلى إعدادات الشبكة (`listen_addresses`, `port`) والتسجيل (`log_destination`, `log_statement`). في البداية، لن تحتاج إلى لمس هذا الملف، ولكن معرفة وجوده أمر أساسي للضبط المتقدم لاحقًا." },
                    { term: "pg_hba.conf", definition: "ملف التحكم في الوصول المستند إلى المضيف (Host-Based Authentication). هذا هو جدار الحماية الخاص بـ PostgreSQL. إنه ملف تكوين بسيط وقوي للغاية يحدد *من* يمكنه الاتصال، *بأي قاعدة بيانات*، *من أي عنوان IP*، و*بأي طريقة مصادقة*. تتم قراءة هذا الملف من الأعلى إلى الأسفل، ويتم تطبيق القاعدة الأولى المطابقة. أي تغييرات هنا تتطلب إعادة تحميل تكوين PostgreSQL لتصبح فعالة. سنعمل مع هذا الملف كثيرًا." }
                ]},
                { type: ContentType.NOTE, title: "لا تعدل بعد", text: "في هذه المرحلة، لا نحتاج إلى تعديل هذه الملفات. التكوين الافتراضي الذي يسمح فقط بالاتصالات المحلية عبر مصادقة `peer` هو بالضبط ما نريده. معرفة هذه الملفات الآن سيجعل المستويات اللاحقة، خاصة عند تمكين الوصول عن بعد، أسهل بكثير للفهم." },
              ]
            },
            {
              id: "p2_c3_s4",
              icon: "👥",
              title: "المستوى 38: إنشاء المستخدمين وقواعد البيانات الأولى",
              content: [
                { type: ContentType.PARAGRAPH, text: "من الممارسات الأمنية السيئة للغاية أن يتصل تطبيقك بقاعدة البيانات باستخدام الدور الخارق `postgres`. هذا يعادل تشغيل كل برنامج على جهاز الكمبيوتر الخاص بك بصلاحيات المسؤول. إذا تم اختراق تطبيقك، فسيكون للمهاجم السيطرة الكاملة على نظام قاعدة البيانات بأكمله، بما في ذلك القدرة على حذف جميع قواعد البيانات أو الوصول إلى بيانات من تطبيقات أخرى. الحل دائمًا هو اتباع مبدأ أقل الامتيازات (Principle of Least Privilege)." },
                { type: ContentType.PARAGRAPH, text: "سنقوم بإنشاء دور مخصص (مستخدم) وقاعدة بيانات مخصصة لكل تطبيق. سيتمتع هذا الدور بالسيطرة الكاملة على قاعدة بياناته الخاصة، ولكن ليس لديه أي معرفة أو وصول إلى أي قواعد بيانات أخرى على الخادم. هذا يعزل تطبيقاتك عن بعضها البعض ويحد بشكل كبير من الضرر المحتمل للاختراق." },
                { type: ContentType.HEADING4, text: "إنشاء مستخدم وقاعدة بيانات جديدة عبر SQL" },
                { type: ContentType.PARAGRAPH, text: "سنقوم بإنشاء دور يسمى `myappuser` وقاعدة بيانات تسمى `myappdb`. الطريقة الأكثر مباشرة هي عبر `psql`." },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "أوامر SQL للإنشاء", code: `sudo -u postgres psql

-- بمجرد الدخول إلى psql، قم بتشغيل الأوامر التالية:

-- 1. أنشئ قاعدة بيانات جديدة. ENCODING 'UTF8' هو أفضل ممارسة للتوافق العالمي.
CREATE DATABASE myappdb WITH ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8' TEMPLATE template0;

-- 2. أنشئ دورًا جديدًا (مستخدمًا) بكلمة مرور مشفرة.
CREATE USER myappuser WITH ENCRYPTED PASSWORD 'a_very_secure_password_for_the_app';

-- 3. امنح هذا المستخدم جميع الامتيازات على قاعدة البيانات الجديدة.
GRANT ALL PRIVILEGES ON DATABASE myappdb TO myappuser;
`, explanations: [
                    { lines: "1", explanation: "ندخل أولاً إلى موجه أوامر psql كمستخدم `postgres` الإداري." },
                    { lines: "6", explanation: "ينشئ هذا الأمر قاعدة بيانات فارغة جديدة تسمى `myappdb`. تحديد `ENCODING`, `LC_COLLATE` (ترتيب السلاسل), و `LC_CTYPE` (تصنيف الأحرف) يضمن التعامل الصحيح مع البيانات الدولية. `TEMPLATE template0` يضمن عدم نسخ أي كائنات من قاعدة بيانات أخرى." },
                    { lines: "9", explanation: "ينشئ هذا دورًا جديدًا. `WITH ENCRYPTED PASSWORD` يضمن تخزين كلمة المرور بشكل آمن. من المهم جدًا استخدام كلمة مرور قوية ومختلفة عن كلمة مرور المستخدم `postgres`." },
                    { lines: "12", explanation: "هذا هو الأمر الذي يربط بينهما. إنه يمنح `myappuser` جميع الأذونات (لإنشاء جداول، إدراج بيانات، وما إلى ذلك) على قاعدة البيانات `myappdb` *فقط*. هذا الدور ليس لديه أي امتيازات على قواعد البيانات الأخرى مثل `postgres`." }
                ]},
                { type: ContentType.PARAGRAPH, text: "هذه الأوامر الثلاثة هي الوصفة القياسية لإعداد بيئة معزولة وآمنة لتطبيقك. من خلال إنشاء مستخدم وقاعدة بيانات منفصلين، فإنك تحد من الضرر المحتمل في حالة اختراق تطبيقك؛ سيكون لدى المهاجم حق الوصول إلى قاعدة بيانات هذا التطبيق فقط، وليس إلى النظام بأكمله." },
                { type: ContentType.HEADING4, text: "الأدوات المساعدة لسطر الأوامر" },
                { type: ContentType.PARAGRAPH, text: "يوفر PostgreSQL أيضًا أدوات مساعدة لسطر الأوامر يمكنها القيام بذلك من الـ shell مباشرة، وهو ما قد يكون مفيدًا في النصوص البرمجية للتشغيل الآلي." },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "استخدام createuser و createdb", code: `sudo -u postgres createuser myappuser_from_cli
sudo -u postgres createdb -O myappuser_from_cli myappdb_from_cli`, explanations: [
                    { lines: "1", explanation: "`createuser` هو غلاف حول أمر `CREATE USER` SQL. سيطرح عليك أسئلة بشكل تفاعلي (هل يجب أن يكون المستخدم خارقًا؟ إلخ)." },
                    { lines: "2", explanation: "`createdb` هو غلاف حول `CREATE DATABASE`. الخيار `-O` (`--owner`) يحدد مالك قاعدة البيانات الجديدة." }
                ]},
                { type: ContentType.PARAGRAPH, text: "على الرغم من أن هذه الأدوات مفيدة، فإن استخدام SQL الصريح داخل `psql` غالبًا ما يكون أكثر وضوحًا ويمنحك المزيد من التحكم في الخيارات الدقيقة مثل كلمات المرور والترميز." },
                { type: ContentType.HEADING4, text: "التحقق من الاتصال (والفشل المتوقع)" },
                { type: ContentType.PARAGRAPH, text: "يمكننا الآن محاولة الاتصال بقاعدة البيانات الجديدة باستخدام المستخدم الجديد من حساب `nagi` العادي. سيفشل هذا في البداية، ولكنه يوضح كيفية استخدام الخيارات المختلفة لأمر `psql`." },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `# psql -h host -U user -d database -W
psql -h localhost -U myappuser -d myappdb -W` },
                { type: ContentType.PARAGRAPH, text: "سيؤدي هذا إلى ظهور خطأ `psql: error: connection to server at \"localhost\" (127.0.0.1), port 5432 failed: FATAL:  Peer authentication failed for user \"myappuser\"`. هذا ليس خطأ، بل هو دليل على أن أمان PostgreSQL يعمل! مصادقة `peer` تمنع مستخدم النظام `nagi` من تسجيل الدخول كدور قاعدة البيانات `myappuser`. لإصلاح هذا والسماح لتطبيقنا بالاتصال، سنحتاج إلى تعديل `pg_hba.conf`، وهو ما سنغطيه في المستوى التالي." },
              ]
            },
            {
              id: "p2_c3_s5",
              icon: "🔗",
              title: "المستوى 39: الاتصال بقاعدة البيانات عن بعد بشكل آمن",
              content: [
                { type: ContentType.PARAGRAPH, text: "في كثير من الحالات، ستحتاج إلى الوصول إلى قاعدة بيانات PostgreSQL الخاصة بك من خارج الخادم نفسه. قد يكون هذا للاتصال عبر أداة واجهة مستخدم رسومية (GUI) مثل DBeaver أو pgAdmin من جهاز الكمبيوتر المحلي الخاص بك لتسهيل الإدارة، أو قد يكون لديك تطبيق يعمل على خادم آخر (خادم تطبيق منفصل عن خادم قاعدة البيانات) يحتاج إلى الوصول. بشكل افتراضي، يرفض PostgreSQL جميع الاتصالات عن بعد كإجراء أمني. في هذا المستوى، سنقوم بتمكين الوصول عن بعد بشكل آمن ومقيد للغاية." },
                { type: ContentType.HEADING4, text: "الخطوة 1: تعديل `postgresql.conf` للاستماع خارجيًا" },
                { type: ContentType.PARAGRAPH, text: "أولاً، نحتاج إلى إخبار PostgreSQL بالتوقف عن الاستماع فقط على الواجهة المحلية (`localhost`) والبدء في قبول الاتصالات على واجهات الشبكة العامة. يتم ذلك في ملف التكوين الرئيسي." },
                { type: ContentType.CODE_BLOCK, language: "bash", code: "sudo nano /etc/postgresql/VERSION/main/postgresql.conf" },
                { type: ContentType.PARAGRAPH, text: "ابحث عن السطر `#listen_addresses = 'localhost'`. هذا هو الإعداد الافتراضي. قم بإلغاء التعليق عليه (احذف `#`) وغير قيمته إلى `'*'`، مما يعني 'الاستماع على جميع واجهات الشبكة المتاحة'." },
                { type: ContentType.CODE_EXPLANATION, language: "ini", codeTitle: "تغيير في postgresql.conf", code: `# -----------------------------
# CONNECTIONS AND AUTHENTICATION
# -----------------------------

# - Connection Settings -

listen_addresses = '*'         # what IP address(es) to listen on;` , explanations: [
                    { lines: "7", explanation: "تغيير هذا من `'localhost'` إلى `'*'` هو الخطوة الأولى لفتح الباب. إذا كان لخادمك عدة عناوين IP (عامة وخاصة)، يمكنك أيضًا تحديد عنوان IP معين للاستماع عليه، وهو أكثر أمانًا." }
                ]},
                { type: ContentType.PARAGRAPH, text: "هذا التغيير يخبر PostgreSQL بالاستعداد لتلقي الاتصالات من العالم الخارجي، لكنه لا يسمح بها بعد. للقيام بذلك، نحتاج إلى تكوين جدار الحماية الخاص بـ PostgreSQL." },
                { type: ContentType.HEADING4, text: "الخطوة 2: تعديل `pg_hba.conf` لإنشاء قاعدة وصول" },
                { type: ContentType.PARAGRAPH, text: "هذا هو المكان الذي نحدد فيه بالضبط *من* يمكنه الاتصال. سنضيف قاعدة جديدة ومحددة للغاية إلى ملف `pg_hba.conf`." },
                { type: ContentType.CODE_BLOCK, language: "bash", code: "sudo nano /etc/postgresql/VERSION/main/pg_hba.conf" },
                { type: ContentType.PARAGRAPH, text: "أضف سطرًا جديدًا في نهاية الملف. لإنشاء قاعدة تسمح لمستخدم `myappuser` بالاتصال بقاعدة بيانات `myappdb` من عنوان IP الخاص بمحطة عملك فقط، أضف:" },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "قاعدة الوصول عن بعد الآمنة", code: `# TYPE  DATABASE        USER            ADDRESS                 METHOD
# "local" is for Unix domain socket connections only
local   all             all                                     peer
# IPv4 local connections:
host    all             all             127.0.0.1/32            scram-sha-256
# IPv6 local connections:
host    all             all             ::1/128                 scram-sha-256

# --- أضف قاعدتك المخصصة هنا ---
# السماح لـ myappuser بالوصول إلى myappdb من عنوان IP محدد باستخدام مصادقة كلمة المرور
host    myappdb         myappuser       YOUR_WORKSTATION_IP/32    scram-sha-256
`, explanations: [
                    { lines: "11", explanation: "`host`: يحدد أن هذه القاعدة مخصصة للاتصالات عبر TCP/IP (وليست مقابس يونكس المحلية)." },
                    { lines: "11", explanation: "`myappdb`, `myappuser`: يحدد أن هذه القاعدة تنطبق فقط عندما يحاول المستخدم `myappuser` الاتصال بقاعدة البيانات `myappdb`. هذا يمنع المستخدم من محاولة الوصول إلى قواعد بيانات أخرى." },
                    { lines: "11", explanation: "`YOUR_WORKSTATION_IP/32`: هذا هو الجزء الأكثر أهمية للأمان. استبدل هذا بعنوان IP العام لمحطة عملك. `/32` تعني أن القاعدة تنطبق على هذا العنوان الفردي فقط، وليس على شبكة كاملة. لا تستخدم `0.0.0.0/0` أبدًا، فهذا يسمح للعالم كله بالمحاولة." },
                    { lines: "11", explanation: "`scram-sha-256`: هذه هي طريقة مصادقة كلمة المرور الأكثر أمانًا والموصى بها حاليًا. إنها تتطلب من العميل تقديم كلمة مرور مشفرة. `md5` هو خيار أقدم وأقل أمانًا قليلاً." }
                ]},
                { type: ContentType.PARAGRAPH, text: "هذه القاعدة هي تعريف دقيق ومقيد للوصول. إنها لا تفتح قاعدة البيانات للعالم، بل تنشئ بابًا صغيرًا ومحددًا للغاية لا يمكن فتحه إلا بمفتاح معين (كلمة المرور) ومن موقع معين (عنوان IP الخاص بك). هذا هو جوهر تكوين الوصول الآمن." },
                { type: ContentType.HEADING4, text: "الخطوة 3: فتح المنفذ في جدار حماية UFW" },
                { type: ContentType.PARAGRAPH, text: "الآن بعد أن أصبحت PostgreSQL مستعدة وقاعدة الوصول محددة، نحتاج إلى إخبار جدار حماية نظام التشغيل بالسماح بمرور حركة المرور. مرة أخرى، سنكون محددين للغاية." },
                { type: ContentType.CODE_BLOCK, language: "bash", code: "sudo ufw allow from YOUR_WORKSTATION_IP to any port 5432 proto tcp" },
                { type: ContentType.PARAGRAPH, text: "هذا الأمر يخبر UFW: 'اسمح فقط لحركة مرور TCP القادمة من `YOUR_WORKSTATION_IP` بالوصول إلى المنفذ 5432'. أي محاولة اتصال من أي عنوان IP آخر سيتم حظرها على مستوى نظام التشغيل قبل أن تصل إلى PostgreSQL." },
                { type: ContentType.HEADING4, text: "الخطوة 4: إعادة تشغيل PostgreSQL وتطبيق التغييرات" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: "sudo systemctl restart postgresql" },
                { type: ContentType.PARAGRAPH, text: "بعد هذه الخطوات، يجب أن تكون قادرًا على الاتصال بقاعدة بياناتك من جهازك المحلي باستخدام أداة قاعدة بيانات، وتوفير عنوان IP للخادم، والمنفذ 5432، واسم قاعدة البيانات، واسم المستخدم، وكلمة المرور التي أنشأتها." },
                { type: ContentType.NOTE, title: "بديل أكثر أمانًا: أنفاق SSH", text: "بدلاً من فتح المنفذ 5432 للعالم الخارجي (حتى لو كان مقيدًا بعنوان IP واحد)، هناك طريقة أكثر أمانًا: نفق SSH. يمكنك إنشاء اتصال SSH بخادمك يقوم بتوجيه منفذ محلي على جهازك (مثل 5433) إلى منفذ PostgreSQL على الخادم (`localhost:5432`). ثم تقوم بتوجيه أداة قاعدة البيانات الخاصة بك للاتصال بـ `localhost:5433`. كل حركة المرور ستمر عبر نفق SSH المشفر. هذا يعني أنك لست بحاجة إلى فتح أي منافذ إضافية في UFW أو تغيير `listen_addresses` في PostgreSQL." },
              ]
            }
        ]
    },
    {
        id: "p2_c4",
        chapterTitle: "الفصل التاسع: تثبيت بيئات التشغيل",
        sections: [
            {
              id: "p2_c4_s1",
              icon: "🚀",
              title: "المستوى 40: تثبيت Node.js باستخدام NVM (Node Version Manager)",
              content: [
                { type: ContentType.PARAGRAPH, text: "عندما يتعلق الأمر بـ Node.js في بيئة احترافية، فإن استخدام مدير الحزم `apt` لتثبيته مباشرة على النظام (`sudo apt install nodejs`) يعتبر ممارسة سيئة. غالبًا ما تكون الإصدارات في مستودعات أوبونتو قديمة جدًا، والأهم من ذلك، أنها تفرض عليك استخدام إصدار واحد فقط على مستوى النظام بأكمله. هذا يخلق مشاكل كبيرة عندما تحتاج إلى العمل على مشاريع مختلفة: قد يتطلب مشروع قديم إصدار Node 14، بينما يتطلب مشروع جديد إصدار Node 18. محاولة تلبية كلا المطلبين على نفس النظام تصبح كابوسًا." },
                { type: ContentType.PARAGRAPH, text: "الحل لهذه المشكلة هو NVM (Node Version Manager). NVM هي أداة سطر أوامر بسيطة لكنها قوية للغاية، وهي الأداة القياسية في الصناعة لإدارة Node.js. إنها تسمح لك بتثبيت وإدارة إصدارات متعددة ومنفصلة من Node.js على نفس النظام والتبديل بينها بسهولة بأمر واحد. الأهم من ذلك، أنها تثبت كل شيء داخل الدليل الرئيسي للمستخدم (`~/.nvm`)، مما يعني أنك لست بحاجة إلى `sudo` لتثبيت حزم npm بشكل عام، وهذا يحل مجموعة كاملة من مشاكل الأذونات." },
                { type: ContentType.HEADING4, text: "تثبيت NVM واستخدامه: دليل شامل" },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "تثبيت واستخدام NVM", code: `# 1. تنزيل وتشغيل نص التثبيت من GitHub
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# 2. تفعيل NVM في الجلسة الحالية
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \\. "$NVM_DIR/bash_completion"

# 3. تثبيت أحدث إصدار LTS (Long-Term Support)
nvm install --lts

# 4. التحقق من الإصدارات المثبتة
nvm ls

# 5. تعيين إصدار افتراضي للجلسات الجديدة
nvm alias default lts/*`, explanations: [
                    { lines: "2", explanation: "هذا الأمر يقوم بتنزيل نص التثبيت من مستودع NVM الرسمي على GitHub وتمريره مباشرة إلى `bash` لتنفيذه. سيقوم بإنشاء دليل `~/.nvm` وإضافة أسطر التفعيل إلى ملف تهيئة الـ shell الخاص بك (مثل `~/.bashrc` أو `~/.zshrc`)." },
                    { lines: "5-8", explanation: "نص التثبيت يضيف هذه الأسطر إلى ملف `.bashrc` الخاص بك، ولكنها لن تكون فعالة حتى تفتح جلسة جديدة. تشغيلها يدويًا يقوم بتفعيل NVM على الفور. `export NVM_DIR` يخبر النظام بمكان العثور على NVM، والأسطر التالية تقوم بتشغيل (source) نصوص NVM الرئيسية." },
                    { lines: "11", explanation: "هذا هو الأمر الأكثر شيوعًا. بدلاً من تثبيت رقم إصدار معين، فإن `--lts` يطلب من NVM تثبيت أحدث إصدار دعم طويل الأمد، وهو الخيار الموصى به دائمًا لبيئات الإنتاج نظرًا لاستقراره وأمانه." },
                    { lines: "14", explanation: "يعرض هذا الأمر جميع إصدارات Node.js التي قمت بتثبيتها عبر NVM، ويشير بعلامة سهم إلى الإصدار النشط حاليًا." },
                    { lines: "17", explanation: "هذا أمر مهم للراحة. إنه يخبر NVM أنه في كل مرة تفتح فيها نافذة طرفية جديدة، يجب أن يستخدم تلقائيًا أحدث إصدار LTS قمت بتثبيته. بدون هذا، ستحتاج إلى تشغيل `nvm use` في كل مرة." }
                ]},
                { type: ContentType.PARAGRAPH, text: "هذه السلسلة من الأوامر تحررك من قيود إصدار Node.js الواحد على مستوى النظام. NVM يمنحك المرونة الكاملة للتبديل بين إصدارات مختلفة حسب احتياجات المشروع (`nvm use 18`، `nvm use 16`)، مع الحفاظ على بيئة تطوير وإنتاج نظيفة ومنظمة. إنها الأداة القياسية للمحترفين في عالم Node.js." },
                { type: ContentType.HEADING4, text: "إدارة المشاريع باستخدام `.nvmrc`" },
                { type: ContentType.PARAGRAPH, text: "لتحسين سير العمل، يمكنك إنشاء ملف يسمى `.nvmrc` في الدليل الجذر لمشروعك. داخل هذا الملف، اكتب ببساطة رقم الإصدار المطلوب (مثل `lts/gallium` أو `18.17.1`)." },
                { type: ContentType.CODE_BLOCK, language: "text", code: "lts/gallium" },
                { type: ContentType.PARAGRAPH, text: "الآن، عندما تنتقل إلى دليل المشروع في الطرفية، يمكنك ببساطة تشغيل `nvm use`. سيقوم NVM تلقائيًا بقراءة ملف `.nvmrc` والتبديل إلى الإصدار الصحيح. هذا يضمن أنك وفريقك تستخدمون دائمًا نفس بيئة Node.js بالضبط لهذا المشروع." },
                { type: ContentType.NOTE, title: "NVM و `sudo`", text: "أحد أكبر فوائد NVM هو أنك لم تعد بحاجة إلى `sudo` لتثبيت حزم npm بشكل عام (`npm install -g`). نظرًا لأن كل شيء مثبت في الدليل الرئيسي الخاص بك، فلديك الأذونات الكاملة. هذا يمنع فوضى الأذونات التي يمكن أن تحدث عند استخدام `sudo npm`." },
              ]
            },
            {
              id: "p2_c4_s2",
              icon: "🐍",
              title: "المستوى 41: تثبيت Python وإدارة الحزم مع Pip و Venv",
              content: [
                { type: ContentType.PARAGRAPH, text: "يأتي Python مثبتًا مسبقًا على معظم أنظمة لينكس، بما في ذلك أوبونتو. ومع ذلك، فإن تثبيت الحزم مباشرة في بيئة Python على مستوى النظام باستخدام `sudo pip install <package>` هي واحدة من أسوأ الممارسات التي يمكن أن يقوم بها مطور Python. هذا يؤدي إلى ما يسمى بـ 'جحيم الاعتماديات' (Dependency Hell). قد يحتاج مشروع ما إلى إصدار 1.2 من مكتبة، بينما يحتاج مشروع آخر إلى إصدار 2.0 من نفس المكتبة. تثبيتهما معًا على مستوى النظام أمر مستحيل وسيؤدي إلى كسر أحدهما أو كليهما." },
                { type: ContentType.PARAGRAPH, text: "الحل الشامل والقياسي في مجتمع Python هو استخدام البيئات الافتراضية. `venv` هي وحدة مدمجة في Python تنشئ بيئة معزولة تحتوي على نسخة من مترجم Python ومدير الحزم `pip`. أي حزم تقوم بتثبيتها عندما تكون البيئة الافتراضية 'نشطة' يتم تثبيتها داخل دليل هذه البيئة فقط، وتبقى معزولة تمامًا عن النظام العام والمشاريع الأخرى." },
                { type: ContentType.HEADING4, text: "سير عمل `venv` و `pip`: من الإنشاء إلى التجميد" },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "سير عمل Venv الكامل", code: `# 1. تأكد من تثبيت أدوات venv على مستوى النظام
sudo apt install python3.10-venv -y

# 2. انتقل إلى دليل مشروعك وأنشئ البيئة الافتراضية
cd ~/projects/my-python-app
python3 -m venv venv

# 3. قم بتفعيل البيئة الافتراضية
source venv/bin/activate

# 4. قم بترقية pip داخل البيئة وتثبيت الاعتماديات
pip install --upgrade pip
pip install Flask Gunicorn "psycopg2-binary"

# 5. قم بـ 'تجميد' الاعتماديات في ملف requirements.txt
pip freeze > requirements.txt

# 6. اعمل على مشروعك...

# 7. قم بإلغاء تنشيط البيئة عند الانتهاء
deactivate`, explanations: [
                    { lines: "2", explanation: "نتأكد من تثبيت الوحدة `venv` لإصدار Python الذي نستخدمه." },
                    { lines: "6", explanation: "هذا هو أمر الإنشاء. `python3 -m venv` يستدعي وحدة `venv`. `venv` الأخير هو اسم الدليل الذي سيتم إنشاؤه. من المتعارف عليه تسميته `venv`." },
                    { lines: "9", explanation: "هذا هو أمر التفعيل. يقوم بتعديل متغير `PATH` الخاص بالـ shell ليشير إلى دليل `bin` داخل `venv` أولاً. ستلاحظ أن موجه الأوامر الخاص بك قد تغير الآن ليبدأ بـ `(venv)`، مما يشير إلى أنك 'داخل' البيئة." },
                    { lines: "12-13", explanation: "الآن، أي أمر `pip` سيستخدم `pip` الموجود داخل `venv`. يتم تثبيت الحزم في `venv/lib/python3.10/site-packages/`. لا حاجة لـ `sudo` على الإطلاق. `psycopg2-binary` هي المكتبة اللازمة للتحدث مع PostgreSQL." },
                    { lines: "16", explanation: "هذه هي أهم خطوة لإمكانية التكرار. `pip freeze` يسرد جميع الحزم المثبتة في البيئة الحالية وإصداراتها الدقيقة. إعادة توجيه هذا الإخراج إلى ملف `requirements.txt` ينشئ 'مخططًا' لاعتماديات مشروعك." },
                    { lines: "21", explanation: "يعيد الـ shell الخاص بك إلى حالته الطبيعية، ويزيل `(venv)` من موجه الأوامر." }
                ]},
                { type: ContentType.PARAGRAPH, text: "سير العمل هذا هو أساس إدارة مشاريع Python الاحترافية. من خلال عزل اعتماديات كل مشروع، تضمن أن المشاريع لا تتداخل مع بعضها البعض وأن بيئتك قابلة للتكرار. ملف `requirements.txt` هو حجر الزاوية في هذا. يمكنك إعطاء هذا الملف لأي مطور آخر، أو استخدامه في خادم الإنتاج الخاص بك، وتشغيل `pip install -r requirements.txt`، وستحصل على نفس البيئة الدقيقة، مما يزيل عبارة 'لكنه يعمل على جهازي!'." },
                { type: ContentType.HEADING4, text: "لماذا ليس `pyenv` مثل NVM؟" },
                { type: ContentType.PARAGRAPH, text: "قد تتساءل عن وجود أداة مثل NVM لـ Python. توجد أداة تسمى `pyenv` تسمح لك بتثبيت إصدارات Python مختلفة (مثل 3.9، 3.10، 3.11). ومع ذلك، في بيئات الخادم، غالبًا ما يكون هذا مبالغة. عادةً ما تلتزم بإصدار Python الواحد الذي يأتي مع توزيعة نظام التشغيل الخاصة بك (وهو ما يضمن الاستقرار والتحديثات الأمنية) وتستخدم `venv` لإدارة اعتماديات المشروع. `pyenv` أكثر شيوعًا في بيئات تطوير الماكينات المحلية حيث يحتاج المطورون إلى اختبار مكتباتهم مقابل إصدارات Python متعددة." },
              ]
            },
            {
              id: "p2_c4_s3",
              icon: "🔄",
              title: "المستوى 42: إدارة عمليات Node.js مع PM2",
              content: [
                { type: ContentType.PARAGRAPH, text: "لقد قمنا بتشغيل تطبيق Node.js الخاص بنا باستخدام `node index.js`. هذا جيد للتجربة، ولكنه كارثي للإنتاج. هناك ثلاث مشاكل رئيسية: **الموثوقية**: إذا تعطل التطبيق بسبب خطأ غير متوقع، فإنه سيبقى متوقفًا حتى تتدخل يدويًا. **الأداء**: `node` يعمل بشكل طبيعي في عملية واحدة، مما يعني أنه يستخدم نواة معالج واحدة فقط، تاركًا بقية أنوية معالجك الحديث خاملة. **الإدارة**: لا توجد طريقة سهلة لمراقبته، أو إعادة تشغيله بسلاسة، أو إدارة سجلاته. PM2 هو مدير عمليات إنتاج متقدم لـ Node.js يحل كل هذه المشاكل ببراعة." },
                { type: ContentType.HEADING4, text: "تثبيت PM2 وتكوين البدء التلقائي" },
                { type: ContentType.PARAGRAPH, text: "نقوم بتثبيته بشكل عام باستخدام npm لأنه أداة على مستوى النظام. ثم نقوم بتكوينه ليبدأ تلقائيًا عند إقلاع الخادم." },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "التثبيت والإعداد", code: `# 1. قم بتثبيت PM2 بشكل عام
sudo npm install pm2 -g

# 2. قم بإنشاء نص بدء التشغيل
pm2 startup

# 3. قم بتشغيل الأمر الذي تم إخراجه بواسطة الخطوة السابقة
sudo env PATH=$PATH:/home/nagi/.nvm/versions/node/v18.17.1/bin /home/nagi/.nvm/versions/node/v18.17.1/lib/node_modules/pm2/bin/pm2 startup systemd -u nagi --hp /home/nagi`, explanations: [
                    { lines: "2", explanation: "الخيار `-g` يثبت PM2 بحيث يمكن الوصول إليه من أي مكان في النظام." },
                    { lines: "5", explanation: "هذا الأمر السحري يكتشف نظام التشغيل الخاص بك (`systemd` في حالتنا) وينشئ نصًا برمجيًا للخدمة. الأهم من ذلك، أنه سيخرج أمرًا آخر ويطلب منك تشغيله." },
                    { lines: "8", explanation: "هذا هو الأمر الذي تم إخراجه. إنه يقوم بإنشاء وتفعيل ملف خدمة `systemd` لـ PM2. هذا يضمن أنه عند إعادة تشغيل الخادم، سيبدأ PM2 تلقائيًا ويقوم بدوره بإعادة تشغيل جميع تطبيقاتك التي كان يديرها. هذه هي خطوة 'اضبطها وانساها'." }
                ]},
                { type: ContentType.PARAGRAPH, text: "هذه الخطوات تحول PM2 من مجرد أداة سطر أوامر إلى خدمة نظام متكاملة. من خلال ربطه بـ `systemd`، نضمن أن تطبيقاتنا ستكون مرنة في مواجهة إعادة تشغيل الخادم، مما يوفر طبقة أساسية من الموثوقية." },
                { type: ContentType.HEADING4, text: "إدارة التطبيقات: من البدء إلى المراقبة" },
                { type: ContentType.PARAGRAPH, text: "الآن بعد أن تم إعداد PM2، يمكننا استخدامه لإدارة تطبيقنا." },
                 { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "الأوامر الأساسية لإدارة التطبيقات", code: `# 1. بدء تشغيل التطبيق في وضع الكتلة للاستفادة من جميع الأنوية
pm2 start index.js -i max --name "my-api"

# 2. عرض قائمة بجميع العمليات المدارة
pm2 list

# 3. عرض لوحة معلومات المراقبة في الوقت الفعلي
pm2 monit

# 4. إعادة تحميل التطبيق بسلاسة (بدون توقف)
pm2 reload my-api

# 5. حفظ قائمة العمليات الحالية لإعادة التشغيل عند الإقلاع
pm2 save`, explanations: [
                    { lines: "2", explanation: "هذا هو الأمر الأكثر أهمية. `-i max` يخبر PM2 بتشغيل نسخة من التطبيق على كل نواة معالج متاحة، مع توزيع الحمل المدمج بينها. هذا يزيد من الأداء وقابلية التوسع بشكل كبير. `--name` يعطيه اسمًا يسهل التعرف عليه." },
                    { lines: "5", explanation: "يعرض لك جدولًا ملونًا ومفيدًا بحالة جميع تطبيقاتك، بما في ذلك وقت التشغيل، واستخدام الذاكرة/المعالج، وعدد مرات إعادة التشغيل." },
                    { lines: "8", explanation: "هذا يفتح لوحة معلومات رائعة في الطرفية تعرض استخدام الموارد والسجلات المباشرة لكل عملية، وهو أمر لا يقدر بثمن للمراقبة." },
                    { lines: "11", explanation: "هذه ميزة قوية. بدلاً من `restart` الذي يوقف العملية ثم يبدأها، يقوم `reload` ببدء عملية جديدة، وينتظر حتى تصبح جاهزة، ثم يوقف العملية القديمة. هذا يضمن عدم وجود أي توقف في الخدمة أثناء عمليات النشر." },
                    { lines: "14", explanation: "يقوم هذا الأمر بأخذ لقطة من قائمة العمليات التي تديرها حاليًا ويحفظها في `~/.pm2/dump.pm2`. عندما يبدأ PM2 عند إقلاع الخادم، فإنه يقرأ هذا الملف ويعيد تشغيل كل شيء." }
                ]},
                { type: ContentType.HEADING4, text: "ملف النظام البيئي (Ecosystem File)" },
                { type: ContentType.PARAGRAPH, text: "لتجنب كتابة خيارات سطر الأوامر الطويلة، يمكنك تحديد كل شيء في ملف تكوين JavaScript يسمى `ecosystem.config.js`." },
                 { type: ContentType.CODE_BLOCK, language: "javascript", code: `module.exports = {
  apps : [{
    name: "my-api",
    script: "index.js",
    instances: "max",
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: "production",
    }
  }]
};` },
                { type: ContentType.PARAGRAPH, text: "الآن يمكنك ببساطة تشغيل `pm2 start ecosystem.config.js`. هذا يجعل تكوينك قابلاً لإعادة الاستخدام ومحفوظًا في نظام التحكم في الإصدار." },
                { type: ContentType.NOTE, title: "أداة لا غنى عنها", text: "PM2 هو أكثر من مجرد مشغل تطبيقات؛ إنه نظام بيئي كامل لإدارة دورة حياة تطبيقات Node.js في الإنتاج. إنه يوفر الموثوقية (إعادة التشغيل التلقائي)، والأداء (وضع الكتلة)، والمراقبة (السجلات والمقاييس)، وسهولة الإدارة، مما يجعله أداة لا غنى عنها لأي نشر جاد لـ Node.js." },
              ]
            },
            {
              id: "p2_c4_s4",
              icon: "🦄",
              title: "المستوى 43: تشغيل تطبيقات Python مع Gunicorn",
              content: [
                { type: ContentType.PARAGRAPH, text: "كما ذكرنا سابقًا، Gunicorn (Green Unicorn) هو خادم WSGI المفضل لتشغيل تطبيقات Python في الإنتاج. إنه ناضج ومستقر وموثوق. بينما يمكن لـ PM2 تشغيل تطبيقات Python، فإن Gunicorn مصمم خصيصًا لهذا الغرض وهو الخيار القياسي في الصناعة. إنه يعمل كجسر بين وكيلك العكسي (Nginx) وتطبيق Python المتوافق مع WSGI (مثل Flask أو Django)." },
                { type: ContentType.HEADING4, text: "فهم دور Gunicorn وعماله" },
                { type: ContentType.PARAGRAPH, text: "Gunicorn هو في الأساس مدير عمليات. يبدأ عملية رئيسية واحدة (Master Process) تكون مسؤولة عن إدارة مجموعة من العمليات العاملة (Worker Processes). العمليات العاملة هي التي تقوم بالفعل بتشغيل كود تطبيق Python الخاص بك. هذا النموذج متعدد العمليات يسمح لتطبيقك بمعالجة طلبات متزامنة متعددة، مما يستغل بالكامل أنوية المعالج المتعددة في خادمك. عندما يأتي طلب جديد، تقوم العملية الرئيسية بتسليمه إلى عامل متاح." },
                { type: ContentType.HEADING4, text: "التشغيل والضبط المتقدم" },
                { type: ContentType.PARAGRAPH, text: "لقد رأينا الأمر الأساسي من قبل، ولكن للإنتاج، من الأفضل استخدام ملف تكوين لتحديد الخيارات بدلاً من أعلام سطر الأوامر الطويلة. لننشئ ملف `gunicorn.conf.py`:" },
                 { type: ContentType.CODE_BLOCK, language: "python", codeTitle: "gunicorn.conf.py", code: `import multiprocessing

bind = "unix:/tmp/myapp.socket"
workers = multiprocessing.cpu_count() * 2 + 1
worker_class = "sync"  # Or "gevent" for async frameworks

# Logging
loglevel = "info"
accesslog = "/var/log/gunicorn/access.log"
errorlog = "/var/log/gunicorn/error.log"

# Process Naming
proc_name = "myapp-gunicorn"
` },
                { type: ContentType.PARAGRAPH, text: "قبل تشغيله، نحتاج إلى إنشاء دليل السجلات ومنح الأذونات:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo mkdir /var/log/gunicorn
sudo chown nagi:www-data /var/log/gunicorn` },
                { type: ContentType.PARAGRAPH, text: "الآن يمكننا تشغيل Gunicorn باستخدام ملف التكوين هذا (تأكد من أن بيئتك الافتراضية نشطة):" },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "أمر Gunicorn كامل", code: `gunicorn --config gunicorn.conf.py app:app`, explanations: [
                    { lines: "1", explanation: "`--config`: يخبر Gunicorn بتحميل تكوينه من ملف Python المحدد. هذا أكثر نظافة وقابلية للصيانة." },
                    { lines: "1", explanation: "`app:app`: لا يزال هذا مطلوبًا لإخبار Gunicorn بنقطة الدخول للتطبيق (`module:variable`)." }
                ]},
                { type: ContentType.HEADING4, text: "شرح معمق لملف التكوين:" },
                 { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "`workers`", definition: "هنا نستخدم `multiprocessing.cpu_count()` لحساب عدد الأنوية ديناميكيًا وتطبيق القاعدة الموصى بها `(2 * cores) + 1`. هذا يجعل تكويننا قابلاً للنقل بين الخوادم المختلفة." },
                    { term: "`bind`", definition: "نحدد المقبس الذي سيستمع عليه Gunicorn. استخدام المقابس يمنع أي وصول عرضي إلى Gunicorn من الشبكة." },
                    { term: "`worker_class`", definition: "هذا خيار مهم. `sync` هو العامل الافتراضي والموثوق. كل عامل يعالج طلبًا واحدًا في كل مرة. إذا كنت تستخدم إطار عمل غير متزامن مثل FastAPI، فيجب عليك استخدام عامل غير متزامن مثل `uvicorn.workers.UvicornWorker` لتحقيق أقصى استفادة من `async/await`." },
                    { term: "`accesslog` و `errorlog`", definition: "من الأهمية بمكان توجيه السجلات إلى ملفات مخصصة بدلاً من إخراجها إلى وحدة التحكم. هذا يجعل المراقبة والتدقيق أسهل بكثير. `/var/log` هو المكان القياسي للسجلات على مستوى النظام." }
                ]},
                { type: ContentType.PARAGRAPH, text: "ملف التكوين هذا يحول Gunicorn من مجرد مشغل بسيط إلى خادم تطبيقات إنتاجي كامل الميزات. من خلال ضبط العمال، وأنواعهم، والتسجيل، يمكنك إنشاء بيئة تشغيل قوية وآمنة وقابلة للمراقبة لتطبيق Python الخاص بك." },
                { type: ContentType.NOTE, title: "الخطوة التالية: `systemd`", text: "هذا الإعداد رائع، لكنه لا يزال يتطلب تشغيلًا يدويًا. لجعل هذا دائمًا وموثوقًا، سنقوم بإنشاء خدمة `systemd` في الفصل التالي لتشغيل هذا الأمر بالضبط عند بدء تشغيل الخادم." },
              ]
            },
            {
              id: "p2_c4_s5",
              icon: "🔒",
              title: "المستوى 44: إدارة متغيرات البيئة (Environment Variables)",
              content: [
                { type: ContentType.PARAGRAPH, text: "من أكبر الأخطاء الأمنية التي يمكن ارتكابها، والتي يقع فيها العديد من المطورين المبتدئين، هو كتابة الأسرار (Hardcoding secrets) مباشرة في الكود. وضع كلمات مرور قاعدة البيانات، ومفاتيح واجهات برمجة التطبيقات (API keys)، وغيرها من المعلومات الحساسة في ملفات كود المصدر (`index.js`, `app.py`) هو كارثة أمنية محققة. هذا لا يجعلها مرئية فقط لأي شخص لديه حق الوصول إلى مستودع الكود الخاص بك، بل يجعل أيضًا من المستحيل إدارة تكوينات مختلفة للبيئات المختلفة (التطوير، الاختبار، الإنتاج) دون تغيير الكود في كل مرة." },
                { type: ContentType.PARAGRAPH, text: "الحل لهذه المشكلة هو مبدأ أساسي في تطوير البرمجيات الحديثة، وهو منصوص عليه في منهجية 'التطبيق المكون من اثني عشر عاملاً' (The Twelve-Factor App): **افصل التكوين عن الكود**. الطريقة القياسية لتحقيق هذا الفصل هي استخدام **متغيرات البيئة**." },
                { type: ContentType.PARAGRAPH, text: "متغيرات البيئة هي قيم ديناميكية يتم حقنها في بيئة تشغيل العملية (process) من الخارج. تطبيقك يقرأ هذه القيم عند بدء التشغيل، لكنها ليست جزءًا من كود المصدر. هذا يمنحك مرونة وأمانًا هائلين." },
                { type: ContentType.HEADING4, text: "الطريقة 1: ملفات `.env` (للتطوير المحلي)" },
                { type: ContentType.PARAGRAPH, text: "هذه هي الطريقة الأكثر شيوعًا وملاءمة للتطوير المحلي. يمكنك إنشاء ملف نصي بسيط يسمى `.env` في الدليل الجذر لمشروعك:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `# .env - DO NOT COMMIT TO GIT!
DATABASE_URL="postgresql://myappuser:a_secure_password@localhost/myappdb"
STRIPE_API_KEY="sk_test_123abc..."
NODE_ENV="development"` },
                { type: ContentType.PARAGRAPH, text: "ثم تستخدم مكتبة بسيطة لتحميل هذه المتغيرات تلقائيًا في بيئة تشغيل تطبيقك عند بدء التشغيل:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "**لـ Node.js:** `npm install dotenv` ثم أضف `require('dotenv').config();` في بداية ملف `index.js`.",
                    "**لـ Python:** `pip install python-dotenv` ثم أضف `from dotenv import load_dotenv; load_dotenv();` في بداية ملف `app.py`."
                ]},
                { type: ContentType.PARAGRAPH, text: "بعد ذلك، يمكنك الوصول إلى هذه القيم في الكود الخاص بك (على سبيل المثال، `process.env.DATABASE_URL` في Node.js أو `os.environ.get('DATABASE_URL')` في Python). أهم خطوة على الإطلاق هي إضافة `.env` إلى ملف `.gitignore` الخاص بك. هذا يمنع إرسال ملف الأسرار الخاص بك عن طريق الخطأ إلى GitHub أو أي مستودع آخر." },
                { type: ContentType.HEADING4, text: "الطريقة 2: ملفات `EnvironmentFile` في Systemd (للإنتاج)" },
                { type: ContentType.PARAGRAPH, text: "في بيئة الإنتاج، لا نستخدم عادةً ملفات `.env`. نريد طريقة أكثر قوة وأمانًا لإدارة الأسرار. `systemd`، مدير الخدمات الذي نستخدمه، لديه حل مدمج ممتاز. يمكنك إنشاء ملف منفصل يحتوي على متغيرات البيئة الخاصة بالإنتاج:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `# /etc/my-app/environment
DATABASE_URL="postgresql://myappuser:prod_db_password@localhost/myappdb_prod"
STRIPE_API_KEY="sk_live_456xyz..."
NODE_ENV="production"` },
                { type: ContentType.PARAGRAPH, text: "يجب عليك تأمين هذا الملف بتقييد أذونات القراءة بحيث لا يمكن قراءته إلا من قبل المستخدم `root` والمستخدم الذي يشغل تطبيقك (`nagi`): `sudo chmod 640 /etc/my-app/environment`. بعد ذلك، في ملف خدمة `systemd` الخاص بتطبيقك (الذي سننشئه في الفصل التالي)، يمكنك ببساطة إضافة توجيه واحد:" },
                { type: ContentType.CODE_BLOCK, language: "ini", code: `[Service]
EnvironmentFile=/etc/my-app/environment
# ... other service directives ...` },
                { type: ContentType.PARAGRAPH, text: "عندما يبدأ `systemd` خدمتك، سيقرأ هذا الملف أولاً ويحقن كل متغير كمتغير بيئة في عملية تطبيقك. هذا يبقي تكوين الإنتاج منفصلاً تمامًا عن الكود، في مكان آمن ومنظم." },
                 { type: ContentType.HEADING4, text: "الطريقة 3: حقن مباشر (أقل شيوعًا للإنتاج)" },
                { type: ContentType.PARAGRAPH, text: "يمكنك أيضًا تمرير متغيرات البيئة مباشرة على سطر الأوامر عند بدء تشغيل التطبيق، ولكن هذا أقل مثالية لأنه يمكن أن يسرب الأسرار إلى سجلات الـ shell أو تاريخ الأوامر:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `NODE_ENV="production" DATABASE_URL="..." pm2 start index.js` },
                { type: ContentType.NOTE, title: "القاعدة الذهبية التي لا تتغير", text: "افصل دائمًا التكوين عن الكود. لا تكتب أبدًا أي شيء يتغير بين البيئات (عناوين URL لقاعدة البيانات، مفاتيح API، إعدادات النشر) مباشرة في كودك. متغيرات البيئة هي الطريقة القياسية لتحقيق هذا الفصل، مما يجعل تطبيقك أكثر أمانًا ومرونة وقابلية للنقل بين بيئات التطوير والإنتاج." },
              ]
            }
        ]
    },
    {
        id: "p2_c5",
        chapterTitle: "الفصل العاشر: نشر أول تطبيق متكامل",
        sections: [
            {
              id: "p2_c5_s1",
              icon: "🧩",
              title: "المستوى 45: مشروع عملي: نشر تطبيق Express.js بسيط",
              content: [
                { type: ContentType.PARAGRAPH, text: "في هذا المستوى، سنجمع كل ما تعلمناه في هذا الباب لنشر تطبيق Node.js/Express حقيقي من البداية إلى النهاية. سنقوم بمحاكاة سير عمل كامل للإنتاج، بدءًا من سحب الكود من مستودع Git، وتثبيت الاعتماديات، وإعداده ليعمل في الخلفية بشكل موثوق باستخدام PM2، ووضع Nginx أمامه كوكيل عكسي محصن. هذا هو تتويج عملنا في النظام البيئي لـ Node.js." },
                { type: ContentType.HEADING4, text: "الخطوات الكاملة لنشر تطبيق Express:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>1. تجهيز الخادم:</strong> تأكد من أن NVM و Node.js (LTS) و PM2 مثبتة بشكل عام، وأن PostgreSQL يعمل ومتاح.",
                    "<strong>2. سحب الكود:</strong> انتقل إلى دليل المشاريع الخاص بك وقم باستنساخ مستودع التطبيق من GitHub. <code>cd ~/projects && git clone https://github.com/example/my-node-app.git</code>",
                    "<strong>3. تثبيت الاعتماديات:</strong> انتقل إلى دليل التطبيق واستخدم npm لتثبيت جميع الحزم المدرجة في <code>package.json</code>. <code>cd ~/projects/my-node-app && npm install</code>",
                    "<strong>4. إعداد متغيرات البيئة:</strong> قم بإنشاء ملف <code>.env</code> واملأه بأسرار الإنتاج. <code>nano .env</code>. يجب أن يحتوي على الأقل على <code>DATABASE_URL</code> و <code>PORT=3000</code> و <code>NODE_ENV=production</code>.",
                    "<strong>5. بدء التشغيل الأولي مع PM2:</strong> سنستخدم ملف <code>ecosystem.config.js</code> للحصول على تكوين قابل لإعادة الاستخدام. <code>pm2 start ecosystem.config.js --env production</code>. هذا يبدأ التطبيق في وضع الكتلة ويديره PM2.",
                    "<strong>6. حفظ حالة PM2:</strong> قم بتشغيل <code>pm2 save</code>. هذا يأخذ لقطة من العمليات الحالية التي يديرها PM2 ويضمن أنه سيعيد تشغيلها تلقائيًا بعد إعادة إقلاع الخادم.",
                    "<strong>7. تكوين Nginx:</strong> قم بإنشاء أو تعديل ملف تكوين Nginx في <code>/etc/nginx/sites-available/your_domain</code>. يجب أن يحتوي على كتلة <code>server</code> تستمع على المنفذ 80 وكتلة <code>location /</code> مع <code>proxy_pass</code> للإشارة إلى منفذ تطبيق Node.js (<code>http://127.0.0.1:3000</code>). لا تنس إضافة ترويسات <code>X-Forwarded-*</code>.",
                    "<strong>8. تفعيل الموقع واختبار Nginx:</strong> قم بإنشاء رابط رمزي (<code>sudo ln -s ...</code>)، ثم اختبر التكوين (<code>sudo nginx -t</code>)، وأعد تشغيل Nginx (<code>sudo systemctl restart nginx</code>).",
                    "<strong>9. التحقق من جدار الحماية:</strong> تأكد من أن UFW يسمح بحركة المرور على المنفذ 80 (<code>sudo ufw allow 'Nginx HTTP'</code>).",
                    "<strong>10. الاختبار النهائي:</strong> افتح متصفحك وانتقل إلى نطاقك. يجب أن ترى تطبيق Express الخاص بك يعمل. تحقق من سجلات PM2 (<code>pm2 logs my-app</code>) وسجلات Nginx (<code>/var/log/nginx/access.log</code>) لتأكيد تدفق الطلبات."
                ]},
                { type: ContentType.PARAGRAPH, text: "بعد إكمال هذه الخطوات، لم يعد لديك مجرد كود يعمل، بل لديك خدمة ويب حقيقية. تطبيقك الآن مرن ضد الأعطال بفضل PM2، ويستفيد من جميع أنوية المعالج، ويتم تقديمه بشكل آمن وفعال من خلال Nginx. هذا هو أساس أي تطبيق Node.js جاهز للإنتاج." },
              ]
            },
            {
              id: "p2_c5_s2",
              icon: "🧩",
              title: "المستوى 46: مشروع عملي: نشر تطبيق FastAPI بسيط",
              content: [
                { type: ContentType.PARAGRAPH, text: "الآن، سنكرر العملية لتطبيق Python، باستخدام FastAPI كمثال. النمط العام مشابه جدًا، مما يؤكد أن المبادئ المعمارية (الوكيل العكسي، إدارة العمليات) عالمية، حتى لو تغيرت الأدوات المحددة للنظام البيئي. سنستخدم `venv` للعزل، و Gunicorn كخادم تطبيق، و `systemd` لإدارة العملية كخدمة نظام أساسية." },
                { type: ContentType.HEADING4, text: "الخطوات الكاملة لنشر تطبيق FastAPI:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>1. تجهيز الخادم:</strong> تأكد من أن Python3 و <code>python3-venv</code> مثبتان، وأن PostgreSQL يعمل.",
                    "<strong>2. سحب الكود:</strong> <code>cd ~/projects && git clone https://github.com/example/my-python-app.git</code>",
                    "<strong>3. إعداد البيئة الافتراضية:</strong> <code>cd ~/projects/my-python-app && python3 -m venv venv && source venv/bin/activate</code>",
                    "<strong>4. تثبيت الاعتماديات:</strong> <code>pip install -r requirements.txt</code>. يجب أن يحتوي هذا الملف على <code>fastapi</code>, <code>uvicorn</code>, <code>gunicorn</code>, <code>psycopg2-binary</code>, <code>python-dotenv</code>.",
                    "<strong>5. إعداد متغيرات البيئة للإنتاج:</strong> بدلاً من ملف <code>.env</code>، سنقوم بإنشاء ملف بيئة لـ <code>systemd</code>: <code>sudo nano /etc/default/myapp-env</code>. أضف <code>DATABASE_URL=...</code> هنا وقم بتأمينه (<code>sudo chmod 640 ...</code>).",
                    "<strong>6. إنشاء ملف خدمة <code>systemd</code>:</strong> هذه هي الخطوة الرئيسية. قم بإنشاء <code>sudo nano /etc/systemd/system/myapp.service</code> واملأه بالتكوين الصحيح (راجع المستوى التالي للحصول على تفاصيل كاملة). يجب أن يشير <code>ExecStart</code> إلى Gunicorn داخل <code>venv</code> ويستخدم مقبس يونكس.",
                    "<strong>7. إدارة خدمة <code>systemd</code>:</strong> قم بإعادة تحميل <code>systemd</code> (<code>sudo systemctl daemon-reload</code>)، ثم ابدأ الخدمة (<code>sudo systemctl start myapp</code>) وقم بتمكينها لتبدأ عند الإقلاع (<code>sudo systemctl enable myapp</code>). تحقق من حالتها (<code>sudo systemctl status myapp</code>).",
                    "<strong>8. تكوين Nginx:</strong> قم بإنشاء أو تعديل ملف تكوين Nginx للإشارة إلى مقبس يونكس الذي أنشأه Gunicorn (<code>proxy_pass http://unix:/tmp/myapp.socket;</code>).",
                    "<strong>9. اختبار وإعادة تشغيل Nginx:</strong> <code>sudo nginx -t && sudo systemctl restart nginx</code>",
                    "<strong>10. الاختبار النهائي:</strong> انتقل إلى نطاقك. يجب أن ترى واجهة برمجة تطبيقات FastAPI الخاصة بك. تحقق من سجلات الخدمة (<code>sudo journalctl -u myapp.service</code>) لتشخيص أي مشاكل."
                ]},
                { type: ContentType.PARAGRAPH, text: "هذا يوضح سير عمل نشر Python الأكثر تقليدية والقوي. باستخدام `systemd`، نقوم بدمج تطبيقنا بعمق مع نظام التشغيل، مما يجعله خدمة من الدرجة الأولى تتمتع بنفس الموثوقية وقدرات الإدارة مثل Nginx أو PostgreSQL نفسها." },
              ]
            },
            {
              id: "p2_c5_s3",
              icon: "⚙️",
              title: "المستوى 47: إدارة التطبيق كخدمة Systemd",
              content: [
                { type: ContentType.PARAGRAPH, text: "تشغيل Gunicorn أو أي عملية خادم أخرى يدويًا في الطرفية ليس حلاً قابلاً للتطبيق في الإنتاج. نريد أن يبدأ تطبيقنا تلقائيًا عند إقلاع الخادم، وأن تتم إدارته بواسطة مدير خدمات النظام، `systemd`. `systemd` هو معيار إدارة الخدمات في معظم توزيعات لينكس الحديثة، بما في ذلك أوبونتو. من خلال إنشاء 'ملف وحدة' (unit file) مخصص لتطبيقنا، يمكننا تعليمه كيفية بدء تطبيقنا وإيقافه ومراقبته." },
                { type: ContentType.HEADING4, text: "تشريح ملف خدمة `systemd`" },
                { type: ContentType.PARAGRAPH, text: "سنقوم بإنشاء ملف خدمة مخصص لتطبيق Python/Gunicorn الخاص بنا. يتم وضع هذه الملفات في `/etc/systemd/system/`." },
                { type: ContentType.CODE_BLOCK, language: "bash", code: "sudo nano /etc/systemd/system/myapp.service" },
                { type: ContentType.CODE_EXPLANATION, language: "ini", codeTitle: "/etc/systemd/system/myapp.service", code: `[Unit]
Description=Gunicorn instance to serve my Python application
Documentation=https://docs.example.com
After=network.target

[Service]
User=nagi
Group=www-data
WorkingDirectory=/home/nagi/projects/my-python-app
EnvironmentFile=/etc/default/myapp-env
ExecStart=/home/nagi/projects/my-python-app/venv/bin/gunicorn --config /home/nagi/projects/my-python-app/gunicorn.conf.py app:app
ExecReload=/bin/kill -s HUP $MAINPID
KillMode=mixed
TimeoutStopSec=5
Restart=on-failure
RestartSec=2

[Install]
WantedBy=multi-user.target`, explanations: [
                    { lines: "1-4", explanation: "قسم **[Unit]** يصف الوحدة وعلاقتها بالخدمات الأخرى. `Description` هو وصف مقروء للبشر. `After=network.target` هو توجيه مهم يضمن أن الشبكة متاحة بالكامل قبل محاولة بدء تشغيل هذه الخدمة." },
                    { lines: "6-16", explanation: "قسم **[Service]** يحدد كيفية تشغيل الخدمة. `User` و `Group` يحددان المستخدم والمجموعة التي ستعمل بها الخدمة، وهو أمر حاسم للأمان. `WorkingDirectory` يضبط دليل العمل قبل تشغيل الأمر. `EnvironmentFile` يقوم بتحميل متغيرات البيئة من ملف محدد. `ExecStart` هو الأمر الفعلي الذي سيتم تشغيله؛ لاحظ أننا نستخدم المسار الكامل إلى Gunicorn داخل بيئتنا الافتراضية. `Restart=on-failure` هو توجيه موثوقية رئيسي يخبر systemd بإعادة تشغيل الخدمة تلقائيًا إذا توقفت بشكل غير طبيعي." },
                    { lines: "18-19", explanation: "قسم **[Install]** يحدد كيفية تثبيت الخدمة. `WantedBy=multi-user.target` يربط هذه الخدمة بالهدف (target) متعدد المستخدمين، مما يعني أنها ستبدأ تلقائيًا عند إقلاع الخادم في وضع التشغيل العادي." }
                ]},
                { type: ContentType.PARAGRAPH, text: "ملف الخدمة هذا هو الطريقة 'الأصلية' في لينكس لتحويل تطبيقك إلى خادم يعمل في الخلفية ومُدار بالكامل. إنه يوفر الموثوقية (البدء عند الإقلاع، إعادة التشغيل عند الفشل)، والأمان (التشغيل كمستخدم غير مميز)، والتكامل مع بقية أدوات النظام مثل `journalctl`." },
                { type: ContentType.HEADING4, text: "دورة حياة إدارة الخدمة" },
                { type: ContentType.PARAGRAPH, text: "بعد إنشاء أو تعديل ملف خدمة، يجب عليك دائمًا إخبار `systemd` بإعادة تحميل تكويناته:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo systemctl daemon-reload` },
                { type: ContentType.PARAGRAPH, text: "ثم يمكنك إدارة الخدمة باستخدام الأوامر القياسية:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "`sudo systemctl start myapp`: لبدء الخدمة.",
                    "`sudo systemctl stop myapp`: لإيقاف الخدمة.",
                    "`sudo systemctl restart myapp`: لإعادة تشغيل الخدمة.",
                    "`sudo systemctl status myapp`: لعرض حالتها التفصيلية وآخر أسطر السجل.",
                    "`sudo systemctl enable myapp`: لتمكين الخدمة لتبدأ تلقائيًا عند الإقلاع.",
                    "`sudo systemctl disable myapp`: لتعطيل البدء التلقائي."
                ]},
              ]
            },
            {
              id: "p2_c5_s4",
              icon: "📜",
              title: "المستوى 48: فحص سجلات التطبيق واستكشاف الأخطاء وإصلاحها",
              content: [
                { type: ContentType.PARAGRAPH, text: "عندما تسوء الأمور حتمًا، تكون السجلات هي أفضل صديق لك وأداة التشخيص الأولى. نظرًا لأننا ندير تطبيقنا كخدمة `systemd`، يتم التقاط جميع مخرجاته القياسية (stdout) ومخرجات الخطأ (stderr) تلقائيًا وتوجيهها إلى `journald`، نظام التسجيل المركزي في لينكس. هذا يمنحنا واجهة قوية وموحدة لفحص كل ما يحدث." },
                { type: ContentType.HEADING4, text: "إتقان `journalctl` لتصحيح أخطاء التطبيق" },
                { type: ContentType.PARAGRAPH, text: "يمكننا استخدام `journalctl` مع الخيار `-u` (للوحدة) لعرض سجلات خدمتنا المحددة فقط، وتصفية كل ضوضاء النظام الأخرى:" },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "عرض سجلات الخدمة", code: `# عرض جميع السجلات للخدمة منذ آخر إقلاع
sudo journalctl -u myapp.service

# متابعة السجلات في الوقت الفعلي (الأمر الأكثر فائدة لتصحيح الأخطاء)
sudo journalctl -u myapp.service -f

# عرض آخر 100 سطر من السجل
sudo journalctl -u myapp.service -n 100

# عرض السجلات منذ وقت معين (مثل آخر 10 دقائق)
sudo journalctl -u myapp.service --since "10 min ago"`, explanations: [
                    { lines: "2", explanation: "يمنحك السجل الكامل للخدمة، وهو مفيد لفهم تاريخها." },
                    { lines: "5", explanation: "هذا هو الأمر الذي ستستخدمه في 90% من الوقت. إنه يفتح بثًا مباشرًا للسجلات. يمكنك الآن إرسال طلب إلى تطبيقك ورؤية أي أخطاء أو رسائل تسجيل تظهر على الفور." },
                    { lines: "8", explanation: "مفيد للحصول على لمحة سريعة عن أحدث الأحداث دون الحاجة إلى التمرير عبر السجل بأكمله." },
                    { lines: "11", explanation: "مثالي عندما تعرف تقريبًا متى حدثت المشكلة وتريد تضييق نطاق البحث." }
                ]},
                { type: ContentType.PARAGRAPH, text: "تكامل تطبيقاتك مع `systemd` لا يوفر فقط إدارة قوية للعمليات، بل يوفر أيضًا نظامًا موحدًا وقويًا لإدارة السجلات. استخدام `journalctl` لعرض سجلات تطبيقك يسمح لك بربطها بسهولة مع أحداث النظام الأخرى، مما يوفر رؤية شاملة لصحة الخادم." },
                { type: ContentType.HEADING4, text: "دراسة حالة: تشخيص خطأ 502 Bad Gateway" },
                { type: ContentType.PARAGRAPH, text: "خطأ 502 هو أحد أكثر الأخطاء شيوعًا في بنية الوكيل العكسي. إنه يعني ببساطة: 'أنا، Nginx، أعمل بشكل جيد، لكن عندما حاولت التحدث مع التطبيق الخلفي، فشل الاتصال'. مهمتك كمحقق هي معرفة السبب. سير عمل التشخيص هو كالتالي:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>1. تحقق من سجل أخطاء Nginx:</strong> <code>sudo tail -f /var/log/nginx/error.log</code>. ابحث عن رسائل مثل <code>(111: Connection refused)</code> أو <code>(13: Permission denied)</code> أثناء محاولة الاتصال بالمقبس/المنفذ الخلفي. هذا يؤكد المشكلة من جانب Nginx.",
                    "<strong>2. تحقق من حالة خدمة التطبيق:</strong> <code>sudo systemctl status myapp.service</code>. هل هي <code>active (running)</code>؟ إذا كانت <code>failed</code>، فقد وجدت المشكلة.",
                    "<strong>3. إذا فشلت الخدمة، افحص سجلاتها:</strong> <code>sudo journalctl -u myapp.service</code>. قم بالتمرير عبر السجلات بحثًا عن تتبعات الأخطاء (stack traces). الأسباب الشائعة هي: خطأ في بناء الجملة في كود Python/JS، متغير بيئة مفقود، فشل الاتصال بقاعدة البيانات.",
                    `<strong>4. إذا كانت الخدمة تعمل ولكن Nginx لا يزال يفشل:</strong>
                        <ul class="mr-6 mt-2 list-disc space-y-1">
                          <li><strong>تكوين خاطئ للوكيل:</strong> تحقق مرة أخرى من أن <code>proxy_pass</code> في Nginx يشير إلى المقبس أو المنفذ الصحيح الذي يستمع عليه Gunicorn/Node.</li>
                          <li><strong>مشاكل في أذونات المقبس (Socket):</strong> إذا كنت تستخدم مقبس يونكس، فهذا هو السبب الأكثر شيوعًا. تأكد من وجود ملف المقبس (<code>ls -l /tmp/myapp.socket</code>). تأكد من أن مستخدم Nginx (<code>www-data</code>) لديه أذونات للقراءة والكتابة عليه.</li>
                          <li><strong>جدار الحماية:</strong> هل نسيت فتح المنفذ في UFW إذا كنت تستخدم اتصال TCP؟</li>
                        </ul>`
                ]},
                { type: ContentType.PARAGRAPH, text: "باتباع هذا النهج المنهجي، يمكنك عزل المشكلة بسرعة. ابدأ من الأمام (Nginx) وتحقق من كل خطوة في السلسلة إلى الخلف (التطبيق) حتى تجد الحلقة المكسورة." },
              ]
            },
            {
              id: "p2_c5_s5",
              icon: "🔗",
              title: "المستوى 49: ربط كل شيء: من الطلب إلى Nginx إلى التطبيق",
              content: [
                { type: ContentType.PARAGRAPH, text: "لقد قطعنا شوطًا طويلاً وقمنا ببناء العديد من المكونات. الآن، دعنا نأخذ لحظة لتصور دورة حياة طلب الويب الكاملة في البنية التحتية التي بنيناها. فهم هذا التدفق من البداية إلى النهاية هو تتويج لكل ما تعلمناه في هذا الباب، ويحول مجموعة من الأدوات المنفصلة إلى نظام متكامل ومتناغم." },
                { type: ContentType.IMAGE_PLACEHOLDER, alt: "مخطط تدفق الطلب الكامل من المستخدم إلى قاعدة البيانات والعودة", width: 800, height: 600 },
                { type: ContentType.HEADING4, text: "رحلة طلب ويب واحد:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>1. المستخدم والنطاق:</strong> يكتب المستخدم <code>https://your_domain.com</code> في متصفحه ويضغط Enter.",
                    "<strong>2. نظام أسماء النطاقات (DNS):</strong> يقوم متصفح المستخدم بالاتصال بخادم DNS لترجمة <code>your_domain.com</code> إلى عنوان IP العام لخادم VPS الخاص بك.",
                    "<strong>3. جدار الحماية (UFW):</strong> يصل الطلب إلى خادمك على المنفذ 443 (HTTPS). يتحقق UFW من قواعده. نظرًا لأننا سنقوم (في باب لاحق) بإعداد قاعدة للسماح بحركة مرور <code>Nginx Full</code> أو <code>https</code>، فإنه يسمح للطلب بالمرور.",
                    "<strong>4. Nginx - خط الدفاع الأول:</strong> يتلقى Nginx الطلب على المنفذ 443. يقوم 'بإنهاء' اتصال SSL/TLS، وفك تشفير الطلب باستخدام شهادتك. هذا يعني أن بقية نظامك يمكن أن يتعامل مع HTTP غير مشفر، مما يبسط الأمور.",
                    "<strong>5. Nginx - الموجه:</strong> يفحص Nginx ترويسة <code>Host</code> (<code>your_domain.com</code>) ويطابقها مع توجيه <code>server_name</code> في ملف تكوين موقعك لتحديد كتلة الخادم الصحيحة التي يجب استخدامها.",
                    "<strong>6. Nginx - خدمة الأصول الثابتة:</strong> إذا كان الطلب لملف مثل <code>/images/logo.png</code>، فقد يطابقه Nginx مع كتلة <code>location ~* \\.(png|jpg)$</code>. في هذه الحالة، يخدم الملف مباشرة من نظام الملفات (<code>/var/www/your_domain/static/images/logo.png</code>) ويعيد الاستجابة إلى المستخدم. لا يتم إزعاج تطبيق Python/Node.js على الإطلاق.",
                    "<strong>7. Nginx - الوكيل العكسي:</strong> إذا كان الطلب لنقطة نهاية API مثل <code>/api/users</code>، فإنه يطابق كتلة <code>location /</code>. هنا، يرى Nginx توجيه <code>proxy_pass</code>. يقوم بإعداد ترويسات <code>X-Forwarded-*</code> الحيوية.",
                    "<strong>8. الاتصال الداخلي (Nginx -> Gunicorn/PM2):</strong> يقوم Nginx بتمرير الطلب داخليًا إلى مدير عمليات تطبيقك، إما عبر مقبس يونكس (<code>http://unix:/tmp/myapp.socket</code>) أو منفذ TCP (<code>http://127.0.0.1:8000</code>).",
                    "<strong>9. مدير العمليات (Gunicorn/PM2):</strong> يتلقى Gunicorn أو PM2 الطلب ويسلمه إلى إحدى العمليات العاملة المتاحة التي تشغل كود تطبيقك.",
                    "<strong>10. التطبيق (Python/Node.js):</strong> يقوم الكود الخاص بك الآن بمعالجة الطلب. يقرأ الترويسات (مثل <code>X-Real-IP</code>) لمعرفة من هو المستخدم. يقوم بالتحقق من صحة المدخلات وتنفيذ منطق الأعمال.",
                    "<strong>11. الاتصال بقاعدة البيانات:</strong> إذا لزم الأمر، يقوم تطبيقك بفتح اتصال بـ PostgreSQL (الذي يعمل على نفس الخادم أو خادم آخر). يقوم بإرسال استعلام SQL لجلب البيانات أو تحديثها. PostgreSQL يعيد النتائج.",
                    "<strong>12. رحلة العودة:</strong> يقوم تطبيقك بإنشاء استجابة (غالبًا JSON لـ API). يعيدها إلى Gunicorn/PM2، الذي يعيدها إلى Nginx. قد يقوم Nginx بضغط الاستجابة باستخدام gzip، ثم يقوم بتشفيرها باستخدام SSL/TLS، ويرسلها أخيرًا مرة أخرى عبر الإنترنت إلى متصفح المستخدم.",
                    "<strong>13. المتصفح:</strong> يتلقى المتصفح الاستجابة ويعرض النتائج للمستخدم."
                ]},
                { type: ContentType.NOTE, title: "تهانينا! لقد بنيت حزمة ويب حقيقية!", text: "لقد قمت الآن ببناء وتكوين حزمة خلفية كاملة واحترافية. لديك خادم ويب قوي، ووكيل عكسي، وبيئة تشغيل معزولة، وقاعدة بيانات علائقية قوية، ومدير عمليات موثوق به. أنت الآن تمتلك المعرفة الأساسية لنشر أي تطبيق ويب تقريبًا، من مدونة بسيطة إلى واجهة برمجة تطبيقات معقدة. هذه المهارات هي أساس الهندسة الخلفية الحديثة." },
              ]
            }
        ]
    }
  ]
};
