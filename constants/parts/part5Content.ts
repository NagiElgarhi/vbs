import { Part, ContentType } from '../../types';

export const part5Content: Part = {
  id: "p5",
  partTitle: "الباب الخامس: المراقبة والسجلات والملاحظة",
  icon: "📊",
  chapters: [
    {
        id: "p5_c1", chapterTitle: "الفصل الأول: إدارة السجلات المركزية",
        sections: [
            {
              id: "p5_c1_s1",
              icon: "📚",
              title: "المستوى 100: لماذا تحتاج إلى سجلات مركزية؟",
              content: [
                { type: ContentType.PARAGRAPH, text: "حتى الآن، تعاملنا مع السجلات عن طريق تسجيل الدخول إلى الخادم واستخدام `journalctl` أو `tail`. هذا يعمل بشكل جيد لخادم واحد. ولكن تخيل أن لديك خمسة خوادم: خادمي ويب، خادم قاعدة بيانات، خادم تخزين مؤقت، وعامل مهام. إذا حدث خطأ، فهل ستسجل الدخول إلى كل خادم من هذه الخوادم على حدة وتفحص سجلاته يدويًا؟ هذا غير فعال ومستحيل تقريبًا لتشخيص المشاكل المعقدة التي تمتد عبر خدمات متعددة." },
                { type: ContentType.PARAGRAPH, text: "إدارة السجلات المركزية هي ممارسة جمع السجلات من جميع خوادمك وخدماتك وتطبيقاتك في مكان واحد مركزي. هذا يوفر 'مصدر حقيقة واحدًا' يمكنك البحث فيه وتحليله وتصويره بيانيًا. الفوائد هائلة:" },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "تصحيح الأخطاء الشامل", definition: "يمكنك رؤية قصة طلب كاملة، من وصوله إلى Nginx، إلى معالجته بواسطة تطبيق Node.js، إلى استعلام قاعدة البيانات الذي قام به، كل ذلك في واجهة واحدة مترابطة بالوقت." },
                    { term: "التحليل الأمني", definition: "يمكنك اكتشاف أنماط الهجوم التي تستهدف خدمات متعددة، مثل محاولة فاشلة لتسجيل الدخول على خادم الويب تليها محاولة اتصال بقاعدة البيانات من نفس عنوان IP." },
                    { term: "المراقبة الاستباقية", definition: "يمكنك إنشاء تنبيهات عندما يتجاوز عدد أخطاء 500 حدًا معينًا عبر جميع خوادم الويب الخاصة بك، بدلاً من مراقبة كل واحد على حدة." },
                    { term: "الاحتفاظ طويل الأمد", definition: "يمكنك أرشفة السجلات للامتثال للمتطلبات التنظيمية أو للتحليل التاريخي دون استهلاك مساحة القرص على خوادم الإنتاج الخاصة بك." }
                ]},
              ]
            },
            {
              id: "p5_c1_s2",
              icon: "🔗",
              title: "المستوى 101: مقدمة إلى حزمة ELK (Elasticsearch, Logstash, Kibana)",
              content: [
                { type: ContentType.PARAGRAPH, text: "حزمة ELK (التي تسمى الآن Elastic Stack) هي المعيار الذهبي في عالم إدارة السجلات المركزية مفتوحة المصدر. إنها مجموعة قوية من ثلاث أدوات تعمل معًا:" },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "Elasticsearch", definition: "هو القلب النابض للمجموعة. إنه محرك بحث وتحليل موزع. فكر فيه كقاعدة بيانات فائقة القوة ومصممة خصيصًا للبحث في كميات هائلة من البيانات النصية (مثل السجلات) بسرعة لا تصدق." },
                    { term: "Logstash", definition: "هو خط أنابيب لمعالجة البيانات من جانب الخادم. وظيفته هي استيعاب البيانات من مصادر متعددة، وتحويلها (على سبيل المثال، تحليل سطر سجل Nginx إلى حقول منفصلة مثل `ip_address`, `status_code`, `url`)، ثم إرسالها إلى 'مخزن' مثل Elasticsearch." },
                    { term: "Kibana", definition: "هي نافذتك إلى البيانات. إنها واجهة مستخدم ويب قوية للتصور البياني والاستكشاف. تتيح لك إنشاء لوحات معلومات مذهلة، والبحث في سجلاتك، واكتشاف الاتجاهات." }
                ]},
                { type: ContentType.PARAGRAPH, text: "في السنوات الأخيرة، تمت إضافة مكون رابع غالبًا ما يحل محل Logstash للمهام البسيطة:" },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "Beats", definition: "هي مجموعة من وكلاء الشحن خفيفي الوزن الذين تقوم بتثبيتهم على خوادمك. `Filebeat` يراقب الملفات (مثل ملفات السجل) ويرسل أي تغييرات جديدة. `Metricbeat` يجمع المقاييس. إنها تستهلك موارد أقل بكثير من Logstash." }
                ]},
                { type: ContentType.IMAGE_PLACEHOLDER, alt: "مخطط يوضح كيفية عمل حزمة ELK مع Filebeat", width: 800, height: 450 },
                { type: ContentType.NOTE, title: "التعقيد", text: "إعداد وصيانة حزمة ELK كاملة يمكن أن يكون معقدًا ويستهلك الكثير من الموارد. لهذا السبب، غالبًا ما تستخدم الشركات خدمات ELK المُدارة أو تبحث عن بدائل أبسط. ومع ذلك، فإن فهم مكوناتها هو أساس لفهم أي نظام سجلات مركزي." },
              ]
            },
            {
              id: "p5_c1_s3",
              icon: "🚚",
              title: "المستوى 102: تثبيت وتكوين Filebeat لإرسال السجلات",
              content: [
                { type: ContentType.PARAGRAPH, text: "بدلاً من إعداد حزمة ELK كاملة، سنركز على الجزء الذي يتم على خادم VPS الخاص بنا: شاحن السجلات. Filebeat هو وكيل خفيف الوزن مكتوب بلغة Go. وظيفته بسيطة: مراقبة ملفات السجل وإرسال أي أسطر جديدة إلى وجهة محددة، مثل Logstash أو Elasticsearch مباشرة. إنه فعال وموثوق وسهل التكوين." },
                { type: ContentType.HEADING4, text: "التثبيت" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `# 1. قم بتنزيل وتثبيت مفتاح Elastic GPG
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo gpg --dearmor -o /usr/share/keyrings/elasticsearch-keyring.gpg

# 2. قم بإضافة مستودع Elastic
echo "deb [signed-by=/usr/share/keyrings/elasticsearch-keyring.gpg] https://artifacts.elastic.co/packages/8.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-8.x.list

# 3. قم بتثبيت Filebeat
sudo apt-get update && sudo apt-get install filebeat` },
                { type: ContentType.HEADING4, text: "التكوين الأساسي" },
                { type: ContentType.PARAGRAPH, text: "ملف التكوين الرئيسي هو `/etc/filebeat/filebeat.yml`. سنقوم بتكوينه لمراقبة سجلات وصول Nginx وإرسالها إلى خادم Elasticsearch (افترض أن لديك واحدًا يعمل)." },
                { type: ContentType.CODE_EXPLANATION, language: "yaml", codeTitle: "/etc/filebeat/filebeat.yml", code: `filebeat.inputs:
- type: filestream
  id: nginx-access-logs
  enabled: true
  paths:
    - /var/log/nginx/access.log

# ... other configurations ...

output.elasticsearch:
  hosts: ["https://my-elasticsearch-server:9200"]
  username: "elastic"
  password: "some_password"`, explanations: [
                    { lines: "1-6", explanation: "في قسم `filebeat.inputs`، نحدد 'مدخلاً'. `type: filestream` هو النوع الحديث لمراقبة الملفات. `paths` تحدد قائمة الملفات التي يجب مراقبتها." },
                    { lines: "10-13", explanation: "في قسم `output.elasticsearch`، نحدد وجهتنا. `hosts` هو عنوان خادم Elasticsearch الخاص بك. يجب عليك أيضًا توفير بيانات الاعتماد." }
                ]},
                { type: ContentType.HEADING4, text: "تمكين وحدة Nginx" },
                { type: ContentType.PARAGRAPH, text: "الأفضل من ذلك، يأتي Filebeat مع 'وحدات' (modules) معدة مسبقًا للخدمات الشائعة مثل Nginx. هذه الوحدات لا تعرف فقط الملفات التي يجب مراقبتها، بل تعرف أيضًا كيفية تحليلها وتأتي مع لوحات معلومات Kibana معدة مسبقًا." },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo filebeat modules enable nginx
sudo filebeat setup
sudo systemctl start filebeat` },
                { type: ContentType.PARAGRAPH, text: "الآن، سيقوم Filebeat تلقائيًا باكتشاف سجلات وصول وأخطاء Nginx، وتحليلها، وإرسالها كبيانات منظمة. هذا هو الطريق الموصى به." },
              ]
            },
            {
              id: "p5_c1_s4",
              icon: "🔍",
              title: "المستوى 103: تحليل سجلات Nginx في Kibana",
              content: [
                { type: ContentType.PARAGRAPH, text: "بمجرد أن يبدأ Filebeat في إرسال السجلات إلى Elasticsearch، يمكنك البدء في استكشافها باستخدام Kibana. Kibana هي واجهة قوية للغاية. إذا قمت بتمكين وحدة Nginx، فستحصل على لوحة معلومات معدة مسبقًا." },
                { type: ContentType.IMAGE_PLACEHOLDER, alt: "لقطة شاشة للوحة معلومات Nginx في Kibana تظهر الرسوم البيانية", width: 800, height: 450 },
                { type: ContentType.HEADING4, text: "ما الذي يمكنك رؤيته؟" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>خريطة جغرافية:</strong> عرض مواقع عناوين IP للزوار على خريطة العالم.",
                    "<strong>رموز الاستجابة بمرور الوقت:</strong> رسم بياني شريطي يوضح عدد استجابات 2xx (نجاح)، 3xx (إعادة توجيه)، 4xx (خطأ العميل)، و 5xx (خطأ الخادم). هذا رائع لاكتشاف الزيادات في الأخطاء.",
                    "<strong>أفضل عناوين URL المطلوبة:</strong> قائمة بالصفحات الأكثر شعبية على موقعك.",
                    "<strong>أكثر وكلاء المستخدم:</strong> معرفة المتصفحات والروبوتات التي تصل إلى موقعك."
                ]},
                { type: ContentType.HEADING4, text: "الاستكشاف المباشر" },
                { type: ContentType.PARAGRAPH, text: "بالإضافة إلى لوحات المعلومات، تتيح لك واجهة 'Discover' في Kibana البحث والتصفية في سجلاتك الأولية في الوقت الفعلي. يمكنك كتابة استعلامات مثل `response.status_code: 404` لرؤية جميع طلبات 'لم يتم العثور عليه'، أو `source.ip: \"123.123.123.123\"` لتتبع نشاط مستخدم معين. هذه القدرة على البحث الفوري في ملايين أسطر السجل هي القوة الخارقة التي توفرها إدارة السجلات المركزية." },
              ]
            },
            {
              id: "p5_c1_s5",
              icon: "🔄",
              title: "المستوى 104: بدائل ELK: Loki و Grafana",
              content: [
                { type: ContentType.PARAGRAPH, text: "في حين أن حزمة ELK قوية، إلا أنها يمكن أن تكون معقدة ومكلفة للتشغيل. في السنوات الأخيرة، ظهر نهج جديد وأخف وزنًا مستوحى من Prometheus: Grafana Loki." },
                { type: ContentType.HEADING4, text: "فلسفة Loki" },
                { type: ContentType.PARAGRAPH, text: "فلسفة Loki هي: **فهرسة البيانات الوصفية فقط، وليس أسطر السجل بأكملها**. Elasticsearch يفهرس كل كلمة في كل سطر سجل، وهذا هو السبب في أنه قوي جدًا ولكنه يستهلك الكثير من الموارد. Loki، من ناحية أخرى، يفهرس فقط مجموعة صغيرة من 'التسميات' (labels) لكل تدفق سجل (على سبيل المثال، `job=\"nginx\"`, `server=\"web-1\"`). يتم ضغط أسطر السجل الفعلية وتخزينها ككتل." },
                { type: ContentType.PARAGRAPH, text: "هذا يعني أن الاستعلام في Loki يعمل على مرحلتين: أولاً، تستخدم التسميات لتصفية تدفقات السجل التي تهتم بها بسرعة (وهو أمر سريع جدًا)، ثم يقوم بفحص (grep) هذه التدفقات المحدودة بحثًا عن النص الذي تبحث عنه." },
                { type: ContentType.HEADING4, text: "المجموعة: Promtail, Loki, Grafana" },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "Promtail", definition: "هو وكيل جمع السجلات لـ Loki (مثل Filebeat). وظيفته هي مراقبة الملفات، وإرفاق التسميات الصحيحة، وإرسال السجلات إلى Loki." },
                    { term: "Loki", definition: "هو خادم التجميع والتخزين. إنه يتلقى السجلات من Promtail ويخزنها." },
                    { term: "Grafana", definition: "هي واجهة المستخدم لـ Loki (مثل Kibana). يمكنك استكشاف السجلات وتصويرها بيانيًا وربطها بمقاييس Prometheus في نفس لوحة المعلومات." }
                ]},
                { type: ContentType.NOTE, title: "متى تختار Loki؟", text: "إذا كنت تستخدم Prometheus بالفعل للمقاييس، فإن Loki هو امتداد طبيعي. إنه أبسط وأرخص بكثير في التشغيل من ELK. إنه يتألق في تصحيح الأخطاء حيث تعرف بالفعل ما الذي تبحث عنه (على سبيل المثال، 'أرني جميع سجلات nginx من الخادم web-1 التي تحتوي على الخطأ 500'). قد يكون Elasticsearch أفضل للتحليلات المعقدة حيث لا تعرف ما الذي تبحث عنه وتحتاج إلى تجميع بيانات السجل بطرق معقدة." },
              ]
            }
        ]
    },
    {
        id: "p5_c2", chapterTitle: "الفصل الثاني: المراقبة المتقدمة مع Prometheus",
        sections: [
            {
              id: "p5_c2_s1",
              icon: "🔥",
              title: "المستوى 105: تثبيت خادم Prometheus",
              content: [
                { type: ContentType.PARAGRAPH, text: "Prometheus هو مشروع مفتوح المصدر رائد في عالم المراقبة والتنبيه. على عكس أنظمة المراقبة التقليدية التي تنتظر منك 'دفع' البيانات إليها، يعمل Prometheus على نموذج 'السحب' (pull model). يقوم بشكل دوري بالاتصال بأهداف محددة (مثل خوادمك وتطبيقاتك) و 'يكشط' (scrapes) المقاييس الحالية منها. يتم تخزين هذه المقاييس في قاعدة بيانات سلاسل زمنية عالية الكفاءة." },
                { type: ContentType.HEADING4, text: "التثبيت والإعداد" },
                { type: ContentType.PARAGRAPH, text: "سنقوم بتنزيل أحدث إصدار من Prometheus مباشرة من موقعهم الرسمي. (تحقق دائمًا من صفحة التنزيلات للحصول على أحدث إصدار)." },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "تثبيت Prometheus", code: `# 1. قم بإنشاء مستخدم نظام لـ Prometheus
sudo useradd --no-create-home --shell /bin/false prometheus

# 2. قم بإنشاء دلائل التكوين والبيانات
sudo mkdir /etc/prometheus
sudo mkdir /var/lib/prometheus

# 3. قم بتنزيل واستخراج Prometheus
wget https://github.com/prometheus/prometheus/releases/download/v2.53.0/prometheus-2.53.0.linux-amd64.tar.gz
tar xvf prometheus-2.53.0.linux-amd64.tar.gz

# 4. قم بنقل الملفات وتعيين الأذونات
cd prometheus-2.53.0.linux-amd64
sudo mv prometheus promtool /usr/local/bin/
sudo mv consoles console_libraries /etc/prometheus/
sudo chown -R prometheus:prometheus /etc/prometheus /var/lib/prometheus

# 5. قم بإنشاء ملف التكوين
sudo nano /etc/prometheus/prometheus.yml

# 6. قم بإنشاء ملف خدمة systemd
sudo nano /etc/systemd/system/prometheus.service`, explanations: [
                    { lines: "2", explanation: "نقوم بإنشاء مستخدم خدمة مخصص كأفضل ممارسة أمنية." },
                    { lines: "8", explanation: "نقوم بتنزيل الإصدار الثنائي المترجم مسبقًا. لا حاجة للتجميع من المصدر." },
                    { lines: "13-16", explanation: "ننظم الملفات في مواقع قياسية في نظام لينكس ونضبط الملكية الصحيحة." }
                ]},
                { type: ContentType.PARAGRAPH, text: "محتوى `prometheus.yml` الأساسي:" },
                { type: ContentType.CODE_BLOCK, language: "yaml", code: `global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']` },
                { type: ContentType.PARAGRAPH, text: "محتوى `prometheus.service`:" },
                { type: ContentType.CODE_BLOCK, language: "ini", code: `[Unit]
Description=Prometheus
Wants=network-online.target
After=network-online.target

[Service]
User=prometheus
Group=prometheus
Type=simple
ExecStart=/usr/local/bin/prometheus \\
    --config.file /etc/prometheus/prometheus.yml \\
    --storage.tsdb.path /var/lib/prometheus/ \\
    --web.console.templates=/etc/prometheus/consoles \\
    --web.console.libraries=/etc/prometheus/console_libraries

[Install]
WantedBy=multi-user.target` },
                { type: ContentType.PARAGRAPH, text: "أخيرًا، قم ببدء تشغيل الخدمة:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo systemctl daemon-reload
sudo systemctl start prometheus
sudo systemctl enable prometheus` },
                { type: ContentType.PARAGRAPH, text: "يمكنك الآن الوصول إلى واجهة مستخدم Prometheus على `http://YOUR_SERVER_IP:9090`." },
              ]
            },
            {
              id: "p5_c2_s2",
              icon: "💻",
              title: "المستوى 106: مراقبة مقاييس النظام باستخدام Node Exporter",
              content: [
                { type: ContentType.PARAGRAPH, text: "Prometheus الآن يعمل، لكنه لا يراقب أي شيء سوى نفسه. للحصول على مقاييس مفصلة عن نظام التشغيل (استخدام وحدة المعالجة المركزية، الذاكرة، القرص، الشبكة، إلخ)، نستخدم 'مُصدِّرًا' (exporter). Node Exporter هو المصدر الرسمي لـ Prometheus لهذا الغرض. إنه برنامج صغير تقوم بتشغيله على كل خادم تريد مراقبته، وهو يكشف عن مئات المقاييس حول صحة المضيف." },
                { type: ContentType.HEADING4, text: "تثبيت وتشغيل Node Exporter" },
                { type: ContentType.PARAGRAPH, text: "العملية مشابهة لتثبيت Prometheus:" },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "تثبيت Node Exporter", code: `# 1. قم بإنشاء مستخدم نظام
sudo useradd --no-create-home --shell /bin/false node_exporter

# 2. قم بتنزيل واستخراج
wget https://github.com/prometheus/node_exporter/releases/download/v1.8.1/node_exporter-1.8.1.linux-amd64.tar.gz
tar xvf node_exporter-1.8.1.linux-amd64.tar.gz

# 3. قم بنقل الملف وتعيين الأذونات
sudo mv node_exporter-1.8.1.linux-amd64/node_exporter /usr/local/bin/
sudo chown node_exporter:node_exporter /usr/local/bin/node_exporter

# 4. قم بإنشاء ملف خدمة systemd
sudo nano /etc/systemd/system/node_exporter.service`, explanations: [
                    { lines: "1-11", explanation: "نتبع نفس النمط: إنشاء مستخدم، تنزيل، نقل، وتعيين الأذونات." }
                ]},
                { type: ContentType.PARAGRAPH, text: "محتوى `node_exporter.service`:" },
                { type: ContentType.CODE_BLOCK, language: "ini", code: `[Unit]
Description=Prometheus Node Exporter

[Service]
User=node_exporter
Group=node_exporter
Type=simple
ExecStart=/usr/local/bin/node_exporter

[Install]
WantedBy=multi-user.target` },
                { type: ContentType.PARAGRAPH, text: "ابدأ الخدمة:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo systemctl daemon-reload
sudo systemctl start node_exporter
sudo systemctl enable node_exporter` },
                { type: ContentType.PARAGRAPH, text: "إذا قمت بزيارة `http://YOUR_SERVER_IP:9500/metrics`، فسترى صفحة نصية ضخمة تحتوي على جميع المقاييس التي يكشفها Node Exporter." },
                { type: ContentType.HEADING4, text: "تكوين Prometheus لكشط Node Exporter" },
                { type: ContentType.PARAGRAPH, text: "أخيرًا، نحتاج إلى إخبار Prometheus بوجود هذا الهدف الجديد. قم بتحرير `/etc/prometheus/prometheus.yml`:" },
                { type: ContentType.CODE_BLOCK, language: "yaml", code: `scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
  
  - job_name: 'node_exporter'
    static_configs:
      - targets: ['localhost:9500']` },
                { type: ContentType.PARAGRAPH, text: "أعد تشغيل Prometheus (`sudo systemctl restart prometheus`). الآن، إذا ذهبت إلى واجهة Prometheus، وانتقلت إلى `Status` > `Targets`، يجب أن ترى كلا الهدفين (`prometheus` و `node_exporter`) بحالة 'UP'." },
              ]
            },
            {
              id: "p5_c2_s3",
              icon: "🌐",
              title: "المستوى 107: مراقبة مقاييس Nginx",
              content: [
                { type: ContentType.PARAGRAPH, text: "الحصول على مقاييس النظام أمر رائع، لكننا نريد أيضًا مقاييس على مستوى التطبيق. يمكن تكوين Nginx لكشف المقاييس الأساسية حول نشاطه باستخدام وحدة تسمى `ngx_http_stub_status_module`. هذه الوحدة مجمعة في إصدار أوبونتو من Nginx بشكل افتراضي." },
                { type: ContentType.HEADING4, text: "تمكين نقطة نهاية الحالة" },
                { type: ContentType.PARAGRAPH, text: "نحتاج إلى إنشاء كتلة خادم جديدة (أو تعديل كتلة موجودة) لكشف هذه المقاييس. من أفضل الممارسات كشفها على منفذ منفصل لا يمكن الوصول إليه إلا من الخادم المحلي." },
                { type: ContentType.CODE_BLOCK, language: "bash", code: "sudo nano /etc/nginx/sites-available/prometheus-metrics" },
                { type: ContentType.CODE_EXPLANATION, language: "nginx", codeTitle: "تكوين Nginx للمقاييس", code: `server {
    listen 9113;
    server_name localhost;

    location /metrics {
        stub_status;
        allow 127.0.0.1;
        deny all;
    }
}`, explanations: [
                    { lines: "2", explanation: "نجعل Nginx يستمع على منفذ غير قياسي." },
                    { lines: "6", explanation: "`stub_status;`: هذا هو التوجيه السحري الذي يقوم بتمكين نقطة النهاية." },
                    { lines: "7-8", explanation: "هذه توجيهات أمان حاسمة. نسمح بالوصول إلى نقطة النهاية هذه فقط من `localhost` ونرفض جميع الاتصالات الأخرى." }
                ]},
                { type: ContentType.PARAGRAPH, text: "قم بتمكين هذا الموقع وأعد تشغيل Nginx. ستحتاج أيضًا إلى مُصدِّر Nginx متخصص (مثل `nginx-prometheus-exporter`) لقراءة نقطة النهاية هذه وتحويلها إلى تنسيق يفهمه Prometheus." },
              ]
            },
            {
              id: "p5_c2_s4",
              icon: "❓",
              title: "المستوى 108: فهم لغة استعلام PromQL",
              content: [
                { type: ContentType.PARAGRAPH, text: "جمع المقاييس لا فائدة منه إذا لم تتمكن من الاستعلام عنها. PromQL هي لغة استعلام قوية للغاية ومصممة خصيصًا للبيانات ذات السلاسل الزمنية. يمكنك استخدامها في واجهة Prometheus (علامة تبويب 'Graph') وفي Grafana." },
                { type: ContentType.HEADING4, text: "أساسيات PromQL" },
                { type: ContentType.PARAGRAPH, text: "كل مقياس له اسم (مثل `node_cpu_seconds_total`) ومجموعة من التسميات (مثل `cpu=\"0\"`, `mode=\"idle\"`)." },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "التحديد البسيط", definition: "`node_memory_MemAvailable_bytes` - يعيد القيمة الحالية لهذا المقياس." },
                    { term: "التصفية بالتسميات", definition: "`node_cpu_seconds_total{mode=\"system\"}` - يعيد مقياس استخدام وحدة المعالجة المركزية فقط لوضع 'system'." },
                    { term: "النطاق الزمني", definition: "`rate(node_cpu_seconds_total{mode=\"system\"}[5m])` - هذه هي القوة الحقيقية. `[5m]` يحدد نافذة زمنية مدتها 5 دقائق. `rate()` تحسب المعدل لكل ثانية على مدى تلك النافذة. هذا الاستعلام يخبرك بـ 'متوسط استخدام وحدة المعالجة المركزية في وضع النظام على مدى الخمس دقائق الماضية'." },
                    { term: "التجميع", definition: "`sum(rate(node_cpu_seconds_total[1m])) by (instance)` - يجمع (`sum`) المعدل عبر جميع أوضاع وحدة المعالجة المركزية، ويجمعه (`by (instance)`) لكل خادم." }
                ]},
                { type: ContentType.PARAGRAPH, text: "PromQL لديها منحنى تعلم، لكن إتقان بعض الوظائف الأساسية مثل `rate()`, `sum()`, `avg()` و `topk()` سيسمح لك بالحصول على رؤى عميقة حول أداء نظامك." },
              ]
            },
            {
              id: "p5_c2_s5",
              icon: "🚨",
              title: "المستوى 109: إعداد مدير التنبيهات (Alertmanager)",
              content: [
                { type: ContentType.PARAGRAPH, text: "المراقبة ليست فقط للنظر إلى الرسوم البيانية. Prometheus يسمح لك بتحديد 'قواعد التنبيه' (alerting rules). عندما يكون شرط القاعدة صحيحًا (على سبيل المثال، 'استخدام الذاكرة أعلى من 90% لمدة 5 دقائق')، فإن Prometheus يطلق حالة 'تنبيه'." },
                { type: ContentType.PARAGRAPH, text: "ومع ذلك، فإن Prometheus نفسه لا يعرف كيفية إرسال الإشعارات. وظيفته هي إرسال هذه التنبيهات إلى مكون منفصل يسمى Alertmanager. Alertmanager هو المسؤول عن:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>إلغاء التكرار (Deduplication):</strong> إذا أطلق 10 خوادم نفس التنبيه، فسيجمعها في إشعار واحد.",
                    "<strong>التجميع (Grouping):</strong> يجمع التنبيهات ذات الصلة معًا (على سبيل المثال، جميع التنبيهات من نفس المجموعة).",
                    "<strong>التوجيه (Routing):</strong> يوجه الإشعارات إلى القناة الصحيحة. يمكن إرسال تنبيهات قاعدة البيانات إلى فريق DBA عبر PagerDuty، بينما تذهب تنبيهات الويب إلى فريق الويب عبر Slack.",
                    "<strong>الكتم (Silencing):</strong> يسمح لك بكتم التنبيهات مؤقتًا أثناء فترات الصيانة المخطط لها."
                ]},
                { type: ContentType.HEADING4, text: "التكوين" },
                { type: ContentType.PARAGRAPH, text: "يتضمن الإعداد الكامل:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "1. تثبيت وتشغيل Alertmanager كخدمة منفصلة.",
                    "2. إنشاء ملف تكوين لـ Alertmanager (`alertmanager.yml`) يحدد مسارات التوجيه والمستقبلين (receivers) مثل Slack أو PagerDuty.",
                    "3. إنشاء ملف قواعد تنبيه لـ Prometheus (`alerts.rules.yml`) يحدد شروط التنبيه باستخدام PromQL.",
                    "4. إخبار Prometheus بمكان العثور على Alertmanager وملف القواعد في `prometheus.yml`."
                ]},
                { type: ContentType.PARAGRAPH, text: "هذا يكمل حلقة المراقبة: Prometheus يجمع البيانات، ويقيم القواعد، ويرسل التنبيهات إلى Alertmanager، الذي يقوم بعد ذلك بإعلام البشر المناسبين لاتخاذ إجراء." },
              ]
            }
        ]
    },
    {
        id: "p5_c3", chapterTitle: "الفصل الثالث: التصور البياني مع Grafana",
        sections: [
            {
              id: "p5_c3_s1",
              icon: "🎨",
              title: "المستوى 110: تثبيت Grafana وربطه بـ Prometheus",
              content: [
                { type: ContentType.PARAGRAPH, text: "في حين أن واجهة مستخدم Prometheus رائعة للاستعلامات المخصصة وتصحيح الأخطاء، إلا أنها ليست أداة للتصور البياني. لهذا الغرض، نستخدم Grafana. Grafana هي المنصة مفتوحة المصدر الرائدة للتصور البياني والمراقبة. إنها تسمح لك بإنشاء لوحات معلومات جميلة وتفاعلية وغنية بالمعلومات من مجموعة واسعة من مصادر البيانات، مع كون Prometheus هو الأكثر شيوعًا." },
                { type: ContentType.HEADING4, text: "تثبيت Grafana" },
                { type: ContentType.PARAGRAPH, text: "يوفر Grafana مستودع APT رسميًا يجعل التثبيت سهلاً." },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo apt-get install -y apt-transport-https software-properties-common
wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
sudo add-apt-repository "deb https://packages.grafana.com/oss/deb stable main"
sudo apt-get update
sudo apt-get install grafana` },
                { type: ContentType.PARAGRAPH, text: "بعد التثبيت، قم ببدء تشغيل الخدمة:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo systemctl daemon-reload
sudo systemctl start grafana-server
sudo systemctl enable grafana-server` },
                { type: ContentType.PARAGRAPH, text: "يمكنك الآن الوصول إلى واجهة Grafana على `http://YOUR_SERVER_IP:3000`. اسم المستخدم وكلمة المرور الافتراضيان هما `admin`/`admin`. سيُطلب منك تغييرهما عند تسجيل الدخول لأول مرة." },
                { type: ContentType.HEADING4, text: "إضافة Prometheus كمصدر بيانات" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "1. في واجهة Grafana، انتقل إلى أيقونة الترس (Configuration) > Data Sources.",
                    "2. انقر على 'Add data source'.",
                    "3. ابحث عن 'Prometheus' واختره.",
                    "4. في حقل URL، أدخل عنوان خادم Prometheus الخاص بك: `http://localhost:9090` (لأن Grafana و Prometheus يعملان على نفس الخادم).",
                    "5. انقر على 'Save & Test'. يجب أن ترى رسالة نجاح خضراء."
                ]},
              ]
            },
            {
              id: "p5_c3_s2",
              icon: "🛠️",
              title: "المستوى 111: بناء لوحة معلومات (Dashboard) لمراقبة الخادم",
              content: [
                { type: ContentType.PARAGRAPH, text: "الآن بعد أن تم ربط Grafana بـ Prometheus، يمكننا البدء في بناء لوحات المعلومات. لوحة المعلومات هي مجموعة من 'اللوحات' (panels)، حيث تكون كل لوحة تصورًا بيانيًا لاستعلام معين." },
                { type: ContentType.HEADING4, text: "خطوات إنشاء أول لوحة لك" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "1. انقر على أيقونة '+' في الشريط الجانبي الأيسر واختر 'Dashboard'.",
                    "2. انقر على 'Add new panel'.",
                    "3. في الجزء السفلي، تأكد من تحديد مصدر بيانات 'Prometheus'.",
                    "4. في حقل الاستعلام ('Metrics browser')، ابدأ في كتابة استعلام PromQL. على سبيل المثال، لعرض استخدام وحدة المعالجة المركزية للنظام:" ]},
                { type: ContentType.CODE_BLOCK, language: "bash", code: `(1 - avg(rate(node_cpu_seconds_total{mode="idle"}[5m]))) * 100` },
                 { type: ContentType.LIST_UNORDERED, items: [
                    "5. على اليمين، يمكنك تخصيص التصور البياني. اختر 'Time series' كنوع. في قسم 'Standard options'، يمكنك تعيين 'Unit' إلى 'Percent (0-100)'.",
                    "6. أعطِ اللوحة عنوانًا (مثل 'CPU Usage') وانقر على 'Apply' في الأعلى."
                ]},
                { type: ContentType.PARAGRAPH, text: "تهانينا! لقد أنشأت أول لوحة مراقبة لك. يمكنك الآن إضافة المزيد من اللوحات لمراقبة الذاكرة، ومساحة القرص، وحركة مرور الشبكة، باستخدام استعلامات PromQL المناسبة." },
              ]
            },
            {
              id: "p5_c3_s3",
              icon: "📥",
              title: "المستوى 112: استيراد لوحات معلومات جاهزة من المجتمع",
              content: [
                { type: ContentType.PARAGRAPH, text: "بناء لوحات معلومات شاملة من الصفر يمكن أن يستغرق وقتًا طويلاً. لحسن الحظ، لدى Grafana مجتمع نابض بالحياة يشارك لوحات المعلومات المعدة مسبقًا على موقع Grafana.com الرسمي." },
                { type: ContentType.PARAGRAPH, text: "لوحة معلومات 'Node Exporter Full' (ID: 1860) هي لوحة معلومات ممتازة وشاملة لمراقبة مقاييس النظام." },
                { type: ContentType.HEADING4, text: "كيفية الاستيراد" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "1. اذهب إلى أيقونة '+' > 'Import'.",
                    "2. في حقل 'Import via grafana.com'، أدخل معرف لوحة المعلومات (على سبيل المثال، `1860`).",
                    "3. انقر على 'Load'.",
                    "4. سيطلب منك Grafana اختيار مصدر بيانات Prometheus. اختر المصدر الذي قمت بتكوينه.",
                    "5. انقر على 'Import'."
                ]},
                { type: ContentType.PARAGRAPH, text: "بشكل فوري، سيكون لديك لوحة معلومات احترافية تحتوي على العشرات من الرسوم البيانية التي تعرض كل جانب من جوانب صحة خادمك، من الحمل المتوسط واستخدام الذاكرة إلى تفاصيل دقيقة حول نظام الملفات وأداء الشبكة. استكشاف هذه اللوحات المعدة مسبقًا هو أيضًا طريقة رائعة لتعلم استعلامات PromQL المعقدة." },
              ]
            },
            {
              id: "p5_c3_s4",
              icon: "🔔",
              title: "المستوى 113: إعداد التنبيهات المرئية في Grafana",
              content: [
                { type: ContentType.PARAGRAPH, text: "بالإضافة إلى Alertmanager، يوفر Grafana نظام تنبيه خاص به. هذا مفيد بشكل خاص للتنبيهات التي تريد رؤيتها مباشرة على الرسوم البيانية الخاصة بك. يمكنك إنشاء قواعد تنبيه مباشرة من لوحة الرسم البياني." },
                { type: ContentType.HEADING4, text: "إنشاء قاعدة تنبيه" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "1. قم بتحرير لوحة (مثل استخدام الذاكرة).",
                    "2. انتقل إلى علامة التبويب 'Alert'.",
                    "3. انقر على 'Create alert rule'.",
                    "4. قم بتكوين الشرط. على سبيل المثال: `WHEN last() OF A IS ABOVE 90`.",
                    "5. قم بتكوين 'نقاط الاتصال' (Contact points) لتحديد أين يجب إرسال الإشعار (بريد إلكتروني، Slack، إلخ)."
                ]},
                { type: ContentType.PARAGRAPH, text: "عندما يتم تشغيل التنبيه، ستتحول اللوحة إلى اللون الأحمر في لوحة المعلومات، وسترسل Grafana إشعارًا، مما يوفر تغذية راجعة مرئية فورية بالإضافة إلى التنبيهات الخارجية." },
              ]
            },
            {
              id: "p5_c3_s5",
              icon: "🧩",
              title: "المتوى 114: دمج مصادر بيانات متعددة",
              content: [
                { type: ContentType.PARAGRAPH, text: "قوة Grafana الحقيقية هي قدرتها على دمج البيانات من مصادر متعددة في لوحة معلومات واحدة. لقد أضفنا Prometheus للمقاييس. ولكن يمكنك أيضًا إضافة:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>Loki:</strong> لمشاهدة السجلات.",
                    "<strong>Elasticsearch:</strong> لمشاهدة السجلات أو بيانات أخرى.",
                    "<strong>PostgreSQL:</strong> لتشغيل استعلامات SQL مباشرة على قاعدة بياناتك وتصوير النتائج بيانيًا.",
                    "<strong>CloudWatch / Azure Monitor:</strong> لمراقبة موارد السحابة."
                ]},
                { type: ContentType.PARAGRAPH, text: "تخيل لوحة معلومات تعرض رسمًا بيانيًا لطلبات Nginx في الثانية (من Prometheus)، وبجانبه لوحة تعرض سجلات أخطاء Nginx (من Loki)، وتحته لوحة تعرض أبطأ 5 استعلامات في قاعدة بيانات PostgreSQL. هذه القدرة على ربط المقاييس والسجلات والبيانات الأخرى معًا هي جوهر 'الملاحظة' (Observability) وتسمح لك بفهم نظامك بشكل شامل." },
              ]
            }
        ]
    },
    {
        id: "p5_c4", chapterTitle: "الفصل الرابع: مراقبة أداء التطبيقات (APM)",
        sections: [
            {
              id: "p5_c4_s1",
              icon: "🚀",
              title: "المستوى 115: ما هي APM وما أهميتها؟",
              content: [
                { type: ContentType.PARAGRAPH, text: "لقد قمنا بتغطية ركيزتين من أركان الملاحظة الثلاثة: السجلات والمقاييس. الركيزة الثالثة والأكثر تفصيلاً هي التتبعات (Traces). مراقبة أداء التطبيقات (APM) هي ممارسة استخدام التتبعات لفهم ما يحدث *داخل* تطبيقك. في حين أن المقاييس يمكن أن تخبرك أن 'نقطة النهاية /api/users بطيئة'، فإن APM يمكن أن يخبرك *لماذا* هي بطيئة. يمكن أن يوضح لك أن 50 مللي ثانية تم قضاؤها في معالجة الطلب، و 200 مللي ثانية في انتظار استعلام قاعدة بيانات معين، و 100 مللي ثانية في انتظار استدعاء واجهة برمجة تطبيقات خارجية." },
                { type: ContentType.HEADING4, text: "من المراقبة إلى الملاحظة" },
                { type: ContentType.PARAGRAPH, text: "المراقبة تخبرك عندما يكون هناك خطأ. الملاحظة تخبرك لماذا. APM هو الجسر بين الاثنين. إنه يسمح لك بالانتقال من رؤية عالية المستوى ('استخدام وحدة المعالجة المركزية مرتفع') إلى رؤية على مستوى الكود ('هذه الوظيفة المحددة تسبب استعلامات N+1 في قاعدة البيانات')." },
              ]
            },
            {
              id: "p5_c4_s2",
              icon: "👣",
              title: "المستوى 116: مقدمة إلى تتبع الطلبات الموزعة",
              content: [
                { type: ContentType.PARAGRAPH, text: "في البنى الحديثة القائمة على الخدمات المصغرة (microservices)، قد يمر طلب مستخدم واحد عبر خدمات متعددة قبل اكتماله. تتبع الطلبات الموزعة هو تقنية تتيح لك تتبع رحلة هذا الطلب عبر جميع هذه الخدمات." },
                { type: ContentType.HEADING4, text: "كيف يعمل؟" },
                { type: ContentType.PARAGRAPH, text: "عندما يدخل طلب إلى النظام لأول مرة، يتم إعطاؤه 'معرف تتبع' (Trace ID) فريدًا. يتم تمرير هذا المعرف في ترويسات HTTP (مثل `traceparent`) مع كل استدعاء لاحق بين الخدمات. كل قطعة عمل داخل خدمة (مثل استدعاء دالة، استعلام قاعدة بيانات) تسمى 'امتداد' (Span). كل امتداد له معرفه الخاص ويشير إلى معرف امتداده الأصلي. والنتيجة هي بنية شجرية يمكنك تصورها كرسم بياني شلالي (flame graph) يوضح بالضبط أين قضى الطلب وقته." },
                { type: ContentType.IMAGE_PLACEHOLDER, alt: "رسم بياني شلالي يوضح تتبعًا موزعًا", width: 800, height: 400 },
                { type: ContentType.PARAGRAPH, text: "OpenTelemetry هو معيار مفتوح المصدر ناشئ لجمع بيانات التتبع والمقاييس والسجلات بطريقة موحدة ومستقلة عن المورد." },
              ]
            },
            {
              id: "p5_c4_s3",
              icon: "🔧",
              title: "المستوى 117: استخدام أدوات APM مفتوحة المصدر (مثل SigNoz)",
              content: [
                { type: ContentType.PARAGRAPH, text: "هناك العديد من أدوات APM التجارية الممتازة (مثل Datadog, New Relic)، ولكن هناك أيضًا بدائل قوية مفتوحة المصدر. SigNoz و Jaeger هما مثالان بارزان." },
                { type: ContentType.PARAGRAPH, text: "SigNoz هو حل ملاحظة كامل يجمع بين التتبعات والمقاييس والسجلات في منصة واحدة. وهو مبني على OpenTelemetry أصلاً." },
                { type: ContentType.HEADING4, text: "كيفية الدمج" },
                { type: ContentType.PARAGRAPH, text: "لدمج APM، تحتاج عادةً إلى إضافة مكتبة 'instrumentation' إلى تطبيقك. هذه المكتبة تقوم تلقائيًا 'بتصحيح' (patch) المكتبات الشائعة (مثل Express, Flask, عملاء قاعدة البيانات) لإنشاء امتدادات وإرفاق معرفات التتبع." },
                { type: ContentType.CODE_BLOCK, language: "javascript", codeTitle: "مثال على Instrumentation في Node.js", code: `// instrumentation.js
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: 'http://<signoz-collector-address>:4318/v1/traces',
  }),
  // ... instrumentations for express, http, pg, etc.
});
sdk.start();` },
                { type: ContentType.PARAGRAPH, text: "ثم تبدأ تطبيقك باستخدام: `node -r ./instrumentation.js index.js`." },
              ]
            },
            {
              id: "p5_c4_s4",
              icon: "🏺",
              title: "المستوى 118: تحليل أداء التطبيق وتحديد نقاط الاختناق",
              content: [
                { type: ContentType.PARAGRAPH, text: "بمجرد أن تبدأ بيانات التتبع في التدفق إلى أداة APM الخاصة بك، يمكنك البدء في العثور على نقاط الاختناق في الأداء." },
                { type: ContentType.HEADING4, text: "المقاييس الرئيسية التي يجب البحث عنها (The RED Method):" },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "المعدل (Rate)", definition: "عدد الطلبات في الثانية التي تتلقاها كل نقطة نهاية." },
                    { term: "الأخطاء (Errors)", definition: "معدل الأخطاء لكل نقطة نهاية. هل تزداد الأخطاء بعد النشر؟" },
                    { term: "المدة (Duration)", definition: "كم من الوقت تستغرق طلباتك؟ الأهم من ذلك، انظر إلى النسب المئوية (p95, p99) وليس المتوسط فقط. قد يكون متوسط زمن الاستجابة سريعًا، لكن 1% من المستخدمين قد يواجهون أوقات تحميل بطيئة للغاية." }
                ]},
                { type: ContentType.PARAGRAPH, text: "عندما تجد نقطة نهاية بطيئة، يمكنك التعمق في تتبعاتها الفردية. الرسم البياني الشلالي سيظهر لك على الفور ما إذا كان استعلام قاعدة بيانات معين، أو استدعاء واجهة برمجة تطبيقات خارجية، أو جزء من الكود هو السبب في البطء." },
              ]
            },
            {
              id: "p5_c4_s5",
              icon: "🔗",
              title: "المستوى 119: ربط التتبع بالسجلات والمقاييس",
              content: [
                { type: ContentType.PARAGRAPH, text: "الهدف النهائي للملاحظة هو ربط الركائز الثلاث معًا. الأدوات الحديثة تجعل هذا ممكنًا." },
                { type: ContentType.HEADING4, text: "من المقاييس إلى التتبعات:" },
                { type: ContentType.PARAGRAPH, text: "في Grafana، قد ترى ارتفاعًا في زمن استجابة p99 (مقياس). يمكنك تكوين لوحة المعلومات الخاصة بك بحيث يؤدي النقر على هذا الارتفاع إلى نقلك إلى أداة APM الخاصة بك، مع تصفية التتبعات لتلك الفترة الزمنية ونقطة النهاية المحددة." },
                { type: ContentType.HEADING4, text: "من التتبعات إلى السجلات:" },
                { type: ContentType.PARAGRAPH, text: "عندما تقوم مكتبات 'instrumentation' الخاصة بك بإنشاء امتدادات، فإنها تحقن أيضًا `trace_id` و `span_id` في سياق تسجيلك. هذا يعني أن كل سطر سجل يتم إنتاجه أثناء معالجة امتداد معين سيتم تمييزه بهذه المعرفات. في أداة APM أو السجلات الخاصة بك، يمكنك النقر على امتداد في تتبع ورؤية جميع السجلات الدقيقة التي تم إنشاؤها أثناء تنفيذ هذا الجزء من الكود. هذا يغير قواعد اللعبة لتصحيح الأخطاء." },
              ]
            }
        ]
    },
    {
        id: "p5_c5", chapterTitle: "الفصل الخامس: الاستجابة للحوادث",
        sections: [
            {
              id: "p5_c5_s1",
              icon: "📜",
              title: "المستوى 120: إنشاء خطة استجابة للحوادث",
              content: [
                { type: ContentType.PARAGRAPH, text: "المراقبة الرائعة ستخبرك عندما ينكسر شيء ما. خطة الاستجابة للحوادث (IRP) تخبرك بما يجب فعله حيال ذلك. محاولة معرفة من يجب الاتصال به وما هي الخطوات التي يجب اتخاذها في خضم أزمة في الساعة 3 صباحًا هي وصفة لكارثة. خطة الاستجابة للحوادث هي وثيقة حية تحدد مسبقًا الأدوار والمسؤوليات وعمليات الاتصال والخطوات الفنية لحل الحوادث." },
                { type: ContentType.HEADING4, text: "المكونات الرئيسية لخطة بسيطة:" },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "تعريف الحادثة", definition: "ما الذي يشكل حادثة؟ (على سبيل المثال، 'معدل خطأ 5xx أعلى من 5% لمدة 5 دقائق'، 'الموقع غير متاح لأكثر من دقيقة')." },
                    { term: "الأدوار والمسؤوليات", definition: "من هو 'قائد الحادثة' (Incident Commander) المسؤول عن تنسيق الاستجابة؟ من هم خبراء الموضوع (SMEs) لقاعدة البيانات أو الشبكة؟" },
                    { term: "قنوات الاتصال", definition: "أين سيتم تنسيق الاستجابة؟ (على سبيل المثال، قناة Slack مخصصة لـ `#incidents`). كيف سيتم إبلاغ أصحاب المصلحة (الإدارة، دعم العملاء)؟" },
                    { term: "كتيبات التشغيل (Runbooks)", definition: "مجموعات من الإجراءات المحددة مسبقًا لحل أنواع شائعة من الحوادث. (على سبيل المثال، 'ماذا تفعل عندما تمتلئ قاعدة البيانات؟ -> 1. تحقق من أكبر الجداول. 2. قم بأرشفة البيانات القديمة...')." }
                ]},
              ]
            },
            {
              id: "p5_c5_s2",
              icon: "📞",
              title: "المستوى 121: إعداد أدوات إدارة الحوادث (PagerDuty, Opsgenie)",
              content: [
                { type: ContentType.PARAGRAPH, text: "عندما يطلق Alertmanager تنبيهًا في منتصف الليل، كيف تضمن أن الشخص المناسب يستيقظ؟ هذا هو المكان الذي تأتي فيه أدوات مثل PagerDuty أو Opsgenie (من Atlassian). تتكامل هذه الخدمات مع نظام المراقبة الخاص بك (مثل Alertmanager) وتدير عملية الإشعار المعقدة." },
                { type: ContentType.HEADING4, text: "الميزات الرئيسية:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>جداول المناوبة (On-Call Schedules):</strong> يمكنك تحديد من هو المناوب وفي أي وقت.",
                    "<strong>مسارات التصعيد (Escalation Paths):</strong> إذا لم يعترف المهندس المناوب الأول بالتنبيه في غضون 5 دقائق، يمكن للأداة تصعيد التنبيه تلقائيًا إلى المهندس التالي في السلسلة أو إلى مديرهم.",
                    "<strong>إشعارات متعددة القنوات:</strong> يمكنها محاولة الوصول إليك عبر إشعار دفع، ثم رسالة نصية قصيرة، ثم مكالمة هاتفية آلية حتى تستجيب.",
                    "<strong>تكاملات:</strong> تتكامل مع كل شيء تقريبًا، مما يسمح لك بتجميع التنبيهات من مصادر متعددة في مكان واحد."
                ]},
              ]
            },
            {
              id: "p5_c5_s3",
              icon: "🔥",
              title: "المستوى 122: محاكاة الحوادث (Game Days)",
              content: [
                { type: ContentType.PARAGRAPH, text: "وجود خطة استجابة للحوادث لا يكفي؛ يجب عليك ممارستها. أيام اللعبة (أو هندسة الفوضى - Chaos Engineering) هي ممارسة كسر الأشياء عمدًا في بيئة خاضعة للرقابة لاختبار مرونة نظامك وفعالية استجابتك للحوادث." },
                { type: ContentType.PARAGRAPH, text: "تبدأ ببساطة. على سبيل المثال:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>الفرضية:</strong> 'نعتقد أنه إذا فشل خادم الويب الأساسي، فإن موزع الأحمال الخاص بنا سيقوم تلقائيًا بتحويل حركة المرور إلى الخادم الثانوي دون أي تأثير على المستخدم.'",
                    "<strong>التجربة:</strong> قم بإيقاف تشغيل خادم الويب الأساسي يدويًا.",
                    "<strong>الملاحظة:</strong> هل حدث ما توقعناه؟ هل أطلقت التنبيهات الصحيحة؟ هل عرف الفريق المناوب ما يجب فعله؟ كم من الوقت استغرق التعافي؟"
                ]},
                { type: ContentType.PARAGRAPH, text: "أيام اللعبة تكشف عن الافتراضات الخاطئة في تصميمك، والثغرات في المراقبة، والارتباك في خطط الاستجابة الخاصة بك، كل ذلك في بيئة آمنة حيث يكون الفشل متوقعًا ويتم التعلم منه." },
              ]
            },
            {
              id: "p5_c5_s4",
              icon: "🔬",
              title: "المستوى 123: تحليل ما بعد الحادثة (Post-mortem Analysis)",
              content: [
                { type: ContentType.PARAGRAPH, text: "بعد حل كل حادثة (حقيقية أو محاكاة)، يجب على الفريق إجراء تحليل ما بعد الحادثة. الهدف ليس إلقاء اللوم، بل فهم ما حدث ولماذا، وتحديد الإجراءات التي يمكن اتخاذها لمنع تكرار نفس النوع من الحوادث." },
                { type: ContentType.HEADING4, text: "الأسئلة الرئيسية التي يجب الإجابة عليها:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>ملخص:</strong> ماذا كان التأثير على المستخدمين؟ كم من الوقت استمرت الحادثة؟",
                    "<strong>الجدول الزمني:</strong> جدول زمني مفصل للأحداث، من أول اكتشاف إلى الحل الكامل.",
                    "<strong>الأسباب الجذرية:</strong> لماذا حدث هذا؟ غالبًا ما يكون هناك أسباب متعددة (خطأ في الكود، فشل في البنية التحتية، فجوة في المراقبة).",
                    "<strong>الدروس المستفادة:</strong> ما الذي سار بشكل جيد؟ ما الذي لم يسر بشكل جيد؟",
                    "<strong>بنود العمل (Action Items):</strong> قائمة مهام محددة وقابلة للتتبع مع مالكين ومواعيد نهائية لمنع تكرار الحادثة (على سبيل المثال، 'إضافة تنبيه لضغط القرص'، 'إصلاح استعلام N+1 في User API')."
                ]},
              ]
            },
            {
              id: "p5_c5_s5",
              icon: "🤝",
              title: "المستوى 124: ثقافة عدم إلقاء اللوم (Blameless Culture)",
              content: [
                { type: ContentType.PARAGRAPH, text: "أهم عنصر في الاستجابة الفعالة للحوادث وتحليل ما بعد الحادثة هو ثقافة عدم إلقاء اللوم. يجب أن يفهم الناس أن الأخطاء تحدث وأن الأنظمة المعقدة تفشل بطرق غير متوقعة. إذا كان المهندسون يخشون العقاب لارتكابهم أخطاء، فسوف يميلون إلى إخفاء المعلومات، مما يجعل من المستحيل تحديد الأسباب الجذرية الحقيقية." },
                { type: ContentType.PARAGRAPH, text: "تركز ثقافة عدم إلقاء اللوم على 'ماذا' و 'لماذا'، وليس 'من'. الفرضية هي أن الناس لا يأتون إلى العمل ليفشلوا. إذا ارتكب شخص ما خطأ، فمن المحتمل أن يكون ذلك بسبب فشل في النظام (عملية سيئة، وثائق غير واضحة، نقص في شبكات الأمان). الهدف من تحليل ما بعد الحادثة هو إصلاح النظام، وليس لوم الفرد. هذه الثقافة تشجع على الانفتاح والصدق والتعلم، وهي ضرورية لبناء أنظمة مرنة وموثوقة على المدى الطويل." },
              ]
            }
        ]
    }
  ]
};
