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
              title: "المستوى 100: كشف الخبايا: لماذا السجلات المركزية هي شريان الحياة لنظامك",
              content: [
                { type: ContentType.PARAGRAPH, text: "حتى الآن، تعاملنا مع السجلات عن طريق تسجيل الدخول إلى الخادم واستخدام `journalctl` أو `tail`. هذا يعمل بشكل جيد لخادم واحد. ولكن تخيل أن لديك خمسة خوادم: خادمي ويب، خادم قاعدة بيانات، خادم تخزين مؤقت، وعامل مهام. إذا حدث خطأ، فهل ستسجل الدخول إلى كل خادم من هذه الخوادم على حدة وتفحص سجلاته يدويًا؟ هذا غير فعال ومستحيل تقريبًا لتشخيص المشاكل المعقدة التي تمتد عبر خدمات متعددة." },
                { type: ContentType.HEADING4, text: "دراسة حالة عملية: لغز فشل عملية الدفع" },
                { type: ContentType.PARAGRAPH, text: "تخيل أن مستخدمًا أبلغ عن فشل عملية دفع في الساعة 2:15 صباحًا. بدون سجلات مركزية، تبدو مهمتك مستحيلة. ولكن مع وجودها، تصبح محققًا رقميًا. إليك كيف تتبع القصة:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>1. تبدأ في Kibana (واجهة السجلات):</strong> تبحث عن `userId: \"12345\"` في آخر ساعة. ترى على الفور سلسلة من الأحداث مرتبة زمنيًا.",
                    "<strong>2. سجل Nginx:</strong> ترى `[web-1] POST /api/v1/payment 200`. هذا يعني أن الطلب وصل إلى خادم الويب بنجاح.",
                    "<strong>3. سجل تطبيق Node.js:</strong> السطر التالي هو من تطبيقك: `[node-app-1] INFO: Processing payment for userId: \"12345\", amount: 50.00`. كل شيء يبدو جيدًا حتى الآن.",
                    "<strong>4. سجل خدمة الدفع:</strong> ترى `[payment-worker-1] ERROR: Payment failed for userId: \"12345\". Reason: Stripe API Error - Invalid API Key provided.`. آها! هذه هي المشكلة.",
                    "<strong>5. سجل قاعدة البيانات:</strong> ترى `[postgres-1] STATEMENT: ROLLBACK`. قاعدة بياناتك قامت بعملها وتراجعت عن المعاملة بأمان.",
                ]},
                { type: ContentType.PARAGRAPH, text: "في ثوانٍ، قمت بتحديد السبب الجذري الدقيق (مفتاح Stripe API غير صالح) والخدمة المحددة التي فشلت، كل ذلك دون تسجيل الدخول إلى أي خادم. هذه هي قوة السجلات المركزية." },
                { type: ContentType.NOTE, title: "الفوائد التي لا تقدر بثمن", text: "إدارة السجلات المركزية ليست رفاهية، بل هي ضرورة. إنها توفر 'مصدر حقيقة واحدًا' يمكنك البحث فيه وتحليله وتصويره بيانيًا، مما يتيح لك تصحيح الأخطاء الشامل، والتحليل الأمني الاستباقي (مثل البحث عن محاولات تسجيل الدخول الفاشلة المتعددة من نفس IP)، والمراقبة الفعالة (إنشاء تنبيهات بناءً على أنماط السجلات)، والاحتفاظ طويل الأمد بالبيانات للامتثال والتحليل التاريخي." },
              ]
            },
            {
              id: "p5_c1_s2",
              icon: "🔗",
              title: "المستوى 101: تشريح حزمة ELK وبديلها السري Loki",
              content: [
                { type: ContentType.PARAGRAPH, text: "حزمة ELK (التي تسمى الآن Elastic Stack) هي المعيار الذهبي في عالم إدارة السجلات المركزية مفتوحة المصدر. إنها مجموعة قوية من ثلاث أدوات رئيسية، مع إضافة Beats كعنصر رابع شائع." },
                 { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "Elasticsearch", definition: "القلب. قاعدة بيانات بحث وتحليل موزعة قوية للغاية. إنها تفهرس كل البيانات التي تتلقاها، مما يجعل البحث سريعًا بشكل لا يصدق." },
                    { term: "Logstash", definition: "خط أنابيب معالجة البيانات من جانب الخادم. Logstash يأخذ السجلات من مصادر متعددة، ويقوم بتحويلها وتنظيفها وإثرائها، ثم يرسلها إلى Elasticsearch." },
                    { term: "Kibana", definition: "نافذتك إلى البيانات. Kibana هي واجهة مستخدم رسومية تتيح لك البحث في البيانات وتصورها وإنشاء لوحات معلومات ديناميكية." },
                    { term: "Beats", definition: "عائلة من 'شاحني البيانات' (data shippers) خفيفي الوزن. `Filebeat` هو الأكثر شيوعًا؛ تقوم بتثبيته على خوادمك، وهو يراقب ملفات السجل ويرسل أي تغييرات إلى Logstash أو Elasticsearch مباشرة." }
                ]},
                { type: ContentType.HEADING4, text: "كشف الخبايا: كيف يحول Logstash الفوضى إلى نظام" },
                { type: ContentType.PARAGRAPH, text: "لنفترض أن لديك سطر سجل Nginx غامض:" },
                { type: ContentType.PREFORMATTED_TEXT, text: `192.168.1.1 - - [10/Oct/2023:13:55:36 +0000] "GET /api/users HTTP/1.1" 200 1270 "-" "Mozilla/5.0 ..."` },
                { type: ContentType.PARAGRAPH, text: "هذا النص غير منظم. Logstash يأخذ هذا السطر ويستخدم مرشحًا يسمى `grok` لتحويله إلى وثيقة JSON منظمة وغنية بالمعلومات، والتي يتم تخزينها في Elasticsearch:" },
                { type: ContentType.CODE_BLOCK, language: "json", code: `{
  "client_ip": "192.168.1.1",
  "timestamp": "10/Oct/2023:13:55:36 +0000",
  "verb": "GET",
  "request": "/api/users",
  "http_version": "1.1",
  "status_code": 200,
  "bytes_sent": 1270,
  "user_agent": "Mozilla/5.0 ..."
}` },
                { type: ContentType.PARAGRAPH, text: "هذه البنية هي التي تجعل البحث والتحليل ممكنين. Elasticsearch يفهرس كل حقل من هذه الحقول، مما يسمح لك بإجراء استعلامات قوية. Kibana هي واجهة المستخدم الرسومية التي تستخدمها للبحث في هذه البيانات وإنشاء لوحات معلومات." },
                { type: ContentType.HEADING4, text: "السر الكبير: بديل فعال من حيث التكلفة - Grafana Loki" },
                { type: ContentType.PARAGRAPH, text: "Elasticsearch قوي جدًا لأنه يفهرس *كل كلمة* في كل سطر سجل. هذا يجعله يستهلك الكثير من الذاكرة ومساحة القرص، مما قد يكون مكلفًا للغاية. Loki يتبع نهجًا مختلفًا ومستوحى من Prometheus." },
                { type: ContentType.PARAGRAPH, text: "فلسفة Loki هي: **فهرسة البيانات الوصفية فقط، وليس أسطر السجل بأكملها**. Loki يفهرس فقط مجموعة صغيرة من 'التسميات' (labels) التي تحددها (مثل `job=\"nginx\"`, `server=\"web-1\"`). يتم ضغط أسطر السجل الفعلية وتخزينها ككتل. هذا يقلل بشكل كبير من تكلفة التخزين والفهرسة." },
                { type: ContentType.NOTE, title: "المقايضة", text: "المقايضة هي أن الاستعلامات في Loki أبطأ قليلاً للبحث النصي الكامل، حيث يجب عليه فحص الكتل غير المفهرسة بعد تصفيتها بالتسميات. ومع ذلك، بالنسبة لمعظم حالات استخدام تصحيح الأخطاء، حيث تعرف بالفعل ما الذي تبحث عنه (على سبيل-المثال، 'أرني سجلات nginx من الخادم web-1')، فإن Loki سريع بشكل مدهش وأرخص بكثير في التشغيل." },
              ]
            },
            {
              id: "p5_c1_s3",
              icon: "🚚",
              title: "المستوى 102: ورشة عمل: تكوين Filebeat و Promtail",
              content: [
                { type: ContentType.PARAGRAPH, text: "بدلاً من إعداد حزمة كاملة، سنركز على الجزء الذي يتم على خادم VPS الخاص بنا: شاحن السجلات. Filebeat (لـ ELK) و Promtail (لـ Loki) هما وكيلان خفيفا الوزن يقومان بنفس المهمة الأساسية: مراقبة الملفات وإرسالها." },
                { type: ContentType.HEADING4, text: "دراسة حالة: تكوين Filebeat مع وحدة Nginx" },
                { type: ContentType.PARAGRAPH, text: "أفضل طريقة لاستخدام Filebeat هي مع وحداته المدمجة. بعد التثبيت (`sudo apt install filebeat`)، تقوم بتمكين الوحدة:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo filebeat modules enable nginx` },
                { type: ContentType.PARAGRAPH, text: "ثم، في `/etc/filebeat/filebeat.yml`، تقوم فقط بتكوين المخرجات:" },
                { type: ContentType.CODE_BLOCK, language: "yaml", code: `# ...
output.elasticsearch:
  hosts: ["https://my-elastic-cluster.com:9200"]
  username: "elastic"
  password: "\${ELASTIC_PASSWORD}"` },
                { type: ContentType.PARAGRAPH, text: "هذا كل شيء! الوحدة تعرف تلقائيًا أين تجد سجلات Nginx، وكيفية تحليلها، وتأتي مع لوحات معلومات معدة مسبقًا لـ Kibana." },
                { type: ContentType.HEADING4, text: "دراسة حالة: تكوين Promtail لإرسال سجلات Auth و Nginx" },
                { type: ContentType.PARAGRAPH, text: "Promtail يتطلب تكوينًا يدويًا أكثر قليلاً، ولكنه مرن للغاية." },
                { type: ContentType.CODE_EXPLANATION, language: "yaml", codeTitle: "/etc/promtail/config.yml", code: `server:
  http_listen_port: 9080

positions:
  filename: /tmp/positions.yaml

clients:
  - url: http://your-loki-server:3100/loki/api/v1/push

scrape_configs:
- job_name: system
  static_configs:
  - targets:
      - localhost
    labels:
      job: varlogs
      host: \${HOSTNAME}
      __path__: /var/log/auth.log

- job_name: nginx
  static_configs:
  - targets:
      - localhost
    labels:
      job: nginx
      host: \${HOSTNAME}
      __path__: /var/log/nginx/*.log`, explanations: [
                    { lines: "9", explanation: "نحدد عنوان خادم Loki." },
                    { lines: "11-18", explanation: "أول 'scrape_config'. نحن نراقب `/var/log/auth.log` ونرفق تسمية ثابتة `job=varlogs` واسم المضيف الديناميكي لكل سطر سجل منه." },
                    { lines: "20-27", explanation: "ثاني 'scrape_config' لمراقبة سجلات وصول Nginx. هذه المرة، نرفق تسمية `job=nginx` ونستخدم حرف البدل لمراقبة كل من `access.log` و `error.log`." }
                ]},
                 { type: ContentType.NOTE, title: "نصيحة عملية حيوية: إدارة دوران السجلات (Log Rotation)", text: "تطبيقات مثل Nginx تكتب إلى ملفات السجل باستمرار. لمنع هذه الملفات من استهلاك كل مساحة القرص، نستخدم أداة تسمى `logrotate`. `logrotate` تقوم بشكل دوري بإعادة تسمية ملف السجل الحالي (مثل `access.log` إلى `access.log.1`) وإنشاء ملف فارغ جديد. يجب تكوين شاحن السجلات الخاص بك ليكون على دراية بهذا. كل من Filebeat و Promtail يتعاملان مع هذا تلقائيًا طالما أنهما يراقبان المسار الأصلي (مثل `/var/log/nginx/access.log`)." },
              ]
            },
            {
              id: "p5_c1_s4",
              icon: "🔍",
              title: "المستوى 103: ورشة عمل: استعلامات KQL و LogQL المتقدمة",
              content: [
                { type: ContentType.PARAGRAPH, text: "جمع السجلات لا فائدة منه إذا لم تتمكن من طرح الأسئلة الصحيحة. Kibana (لغة KQL) و Grafana (لغة LogQL) توفران لغات استعلام قوية." },
                { type: ContentType.HEADING4, text: "سيناريو 1: العثور على أخطاء 500 في Kibana (KQL)" },
                { type: ContentType.CODE_BLOCK, language: "text", code: `nginx.access.response_code >= 500 and not client.ip: "1.2.3.4"` },
                { type: ContentType.PARAGRAPH, text: "هذا يجد جميع أخطاء الخادم، مع استبعاد حركة المرور من عنوان IP داخلي (ربما اختبارات الصحة)." },
                { type: ContentType.HEADING4, text: "سيناريو 2: تتبع IP مشبوه في Grafana (LogQL)" },
                { type: ContentType.CODE_BLOCK, language: "text", code: `{job="nginx"} |~ "123.45.67.89" |= "POST" != "200"` },
                { type: ContentType.PARAGRAPH, text: "هذا يجد جميع أسطر السجل من مهمة `nginx` التي تحتوي على عنوان IP `123.45.67.89` (`|~`)، وتحتوي أيضًا على كلمة `POST` (`|=`)، ولا تحتوي على `200` (`!=`). هذا يظهر لك جميع طلبات POST الفاشلة من مهاجم محتمل." },
                { type: ContentType.HEADING4, text: "سيناريو 3: حساب معدل الخطأ في Grafana (LogQL)" },
                { type: ContentType.CODE_BLOCK, language: "text", code: `sum(rate({job="nginx"} | json | response_code_int > 499 [5m])) by (response_code)` },
                { type: ContentType.PARAGRAPH, text: "هذا يفعل شيئًا مذهلاً. `rate()` تحسب عدد أسطر السجل في الثانية التي تطابق المرشح. المرشح `| json | response_code_int > 499` يحلل السجل كـ JSON ويجد رموز الحالة 5xx. `sum() by (response_code)` يجمعه حسب رمز الحالة. النتيجة هي رسم بياني يوضح معدل أخطاء 5xx بمرور الوقت." },
                 { type: ContentType.HEADING4, text: "دراسة حالة أمنية: اكتشاف هجوم تعبئة بيانات الاعتماد (Credential Stuffing)" },
                { type: ContentType.PARAGRAPH, text: "هذا هجوم شائع حيث يحاول المهاجمون استخدام قوائم من بيانات الاعتماد المسروقة لتسجيل الدخول. لاكتشاف هذا، نحتاج إلى ربط البيانات من مصادر متعددة. إليك كيف نفعل ذلك في LogQL:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `sum by (client_ip) (rate({job="nginx", path="/login"} | pattern \`<client_ip>\` [5m])) > 10 and sum by (client_ip) (rate({job="node-app"} |= "Login Failed" | pattern \`<client_ip>\` [5m])) > 10` },
                { type: ContentType.PARAGRAPH, text: "هذا الاستعلام المعقد يجد عناوين IP التي: 1) أرسلت أكثر من 10 طلبات في الدقيقة إلى `/login` في سجلات Nginx، **و** 2) تسببت في أكثر من 10 أخطاء 'Login Failed' في سجلات التطبيق في نفس الفترة. هذا مؤشر قوي جدًا على هجوم." },
              ]
            },
             {
              id: "p5_c1_s5",
              icon: "🔄",
              title: "المستوى 104: ورشة عمل: بناء خط أنابيب سجلات كامل مع Logstash",
              content: [
                 { type: ContentType.PARAGRAPH, text: "لربط كل شيء معًا، إليك مثال كامل لملف تكوين Logstash يوضح خط أنابيب معالجة متقدم." },
                 { type: ContentType.CODE_EXPLANATION, language: "ruby", codeTitle: "logstash.conf", code: `input {
  beats {
    port => 5044
  }
}

filter {
  if [fileset][name] == "nginx" {
    grok {
      match => { "message" => "%{COMBINEDAPACHELOG}" }
    }
    geoip {
      source => "clientip"
    }
    useragent {
      source => "agent"
      target => "user_agent_parsed"
    }
    date {
      match => [ "timestamp", "dd/MMM/yyyy:HH:mm:ss Z" ]
    }
  }
}

output {
  elasticsearch {
    hosts => ["http://localhost:9200"]
    index => "filebeat-%{+YYYY.MM.dd}"
  }
}`, explanations: [
                    { lines: "1-5", explanation: "قسم **Input**: نخبر Logstash بالاستماع على المنفذ 5044 للبيانات الواردة من Filebeat." },
                    { lines: "8-24", explanation: "قسم **Filter**: هذا هو قلب المعالجة. إذا كان السجل قادمًا من مجموعة ملفات `nginx` الخاصة بـ Filebeat، فإننا نطبق سلسلة من المرشحات." },
                    { lines: "10-12", explanation: "نستخدم `grok` لتحليل رسالة السجل الأولية إلى حقول منظمة." },
                    { lines: "13-15", explanation: "نستخدم `geoip` لأخذ حقل `clientip` الذي تم تحليله وإضافة معلومات الموقع الجغرافي (المدينة، البلد، الإحداثيات)." },
                    { lines: "16-19", explanation: "نستخدم `useragent` لتحليل سلسلة وكيل المستخدم إلى حقول منفصلة (اسم المتصفح، الإصدار، نظام التشغيل)." },
                    { lines: "20-22", explanation: "نتأكد من أن حقل `@timestamp` الرئيسي يستخدم الطابع الزمني من السجل الفعلي، وليس وقت استيعابه." },
                    { lines: "27-31", explanation: "قسم **Output**: نرسل الوثيقة النهائية والمُثرَاة إلى Elasticsearch، ونقوم بإنشاء فهرس يومي جديد." }
                ]},
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
              title: "المستوى 105: Prometheus: عقلية السحب (Pull) بدلاً من الدفع (Push)",
              content: [
                { type: ContentType.PARAGRAPH, text: "Prometheus هو مشروع مفتوح المصدر رائد في عالم المراقبة والتنبيه. على عكس أنظمة المراقبة التقليدية التي تنتظر منك 'دفع' البيانات إليها، يعمل Prometheus على نموذج 'السحب' (pull model). يقوم بشكل دوري بالاتصال بأهداف محددة (مثل خوادمك وتطبيقاتك) و 'يكشط' (scrapes) المقاييس الحالية منها. يتم تخزين هذه المقاييس في قاعدة بيانات سلاسل زمنية عالية الكفاءة." },
                { type: ContentType.PARAGRAPH, text: "هذا النموذج له فوائد كبيرة: يسهل اكتشاف الأهداف المعطلة (إذا فشل الكشط، فالهدف معطل)، ويمكنك تشغيل Prometheus على جهازك المحلي لاختبار تكوينات الإنتاج، ويبسط تكوين العملاء (العميل لا يحتاج إلى معرفة مكان Prometheus)." },
                { type: ContentType.HEADING4, text: "دليل عملي: تثبيت وتكوين خادم Prometheus" },
                 { type: ContentType.PARAGRAPH, text: "التثبيت يتضمن تنزيل الملف الثنائي، إنشاء مستخدم وخدمة `systemd`، وإنشاء ملف تكوين أساسي `prometheus.yml`. (الخطوات التفصيلية تم حذفها للإيجاز، ولكنها متاحة في الوثائق الرسمية)." },
                 { type: ContentType.CODE_BLOCK, language: "yaml", code: `global:
  scrape_interval: 15s # اكشط الأهداف كل 15 ثانية

scrape_configs:
  - job_name: 'prometheus'
    # Prometheus يكشط نفسه لمراقبة صحته
    static_configs:
      - targets: ['localhost:9090']` },
                 { type: ContentType.NOTE, title: "سر المحترفين: استخدام `promtool`", text: "يأتي Prometheus مع أداة مساعدة لسطر الأوامر تسمى `promtool`. قبل إعادة تحميل Prometheus بأي تغييرات في التكوين، قم دائمًا بتشغيل `promtool check config /etc/prometheus/prometheus.yml`. هذا سيتحقق من وجود أخطاء في بناء الجملة ويمنعك من تعطيل نظام المراقبة الخاص بك بتكوين سيء." },
              ]
            },
            {
              id: "p5_c2_s2",
              icon: "💻",
              title: "المستوى 106: كشف خبايا مقاييس النظام مع Node Exporter",
              content: [
                { type: ContentType.PARAGRAPH, text: "للحصول على مقاييس مفصلة عن نظام التشغيل (استخدام وحدة المعالجة المركزية، الذاكرة، القرص، الشبكة، إلخ)، نستخدم 'مُصدِّرًا' (exporter). Node Exporter هو المصدر الرسمي لـ Prometheus لهذا الغرض. إنه برنامج صغير تقوم بتشغيله على كل خادم تريد مراقبته، وهو يكشف عن مئات المقاييس حول صحة المضيف على المنفذ 9100." },
                { type: ContentType.HEADING4, text: "السر: فهم المقاييس من نوع Counter و Gauge" },
                { type: ContentType.PARAGRAPH, text: "يعرض Node Exporter أنواعًا مختلفة من المقاييس. النوعان الأكثر شيوعًا هما:" },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "Gauge", definition: "قيمة يمكن أن ترتفع وتنخفض. مثال: `node_memory_MemAvailable_bytes` (الذاكرة المتاحة حاليًا)." },
                    { term: "Counter", definition: "قيمة تراكمية تزداد دائمًا. مثال: `node_cpu_seconds_total`. هذا المقياس لا يخبرك باستخدام وحدة المعالجة المركزية الحالي، بل يخبرك بإجمالي عدد الثواني التي قضتها وحدة المعالجة المركزية في أوضاع مختلفة منذ بدء تشغيل المصدر." },
                ]},
                { type: ContentType.HEADING4, text: "ورشة عمل: تحويل Counter إلى نسبة مئوية مفيدة" },
                { type: ContentType.PARAGRAPH, text: "للحصول على استخدام وحدة المعالجة المركزية، نستخدم دالة `rate()` في PromQL. `rate(node_cpu_seconds_total{mode=\"idle\"}[2m])` تحسب متوسط معدل الزيادة في الثانية لعداد 'الخمول' على مدى الدقيقتين الماضيتين. النتيجة هي رقم بين 0 و 1. للحصول على النسبة المئوية للاستخدام، نأخذ 1 ناقص معدل الخمول ونضربه في 100." },
                 { type: ContentType.CODE_BLOCK, language: "bash", code: `(1 - avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[2m]))) * 100` },
                { type: ContentType.NOTE, title: "عقلية المعدل", text: "فهم كيفية استخدام `rate()` مع العدادات هو أحد أهم المفاهيم الأساسية في Prometheus. إنه يسمح لك بتحويل المقاييس التراكمية إلى رؤى قابلة للتنفيذ في الوقت الفعلي." },
              ]
            },
            {
              id: "p5_c2_s3",
              icon: "🌐",
              title: "المستوى 107: ورشة عمل: مراقبة PostgreSQL و Nginx",
              content: [
                { type: ContentType.PARAGRAPH, text: "المبدأ هو نفسه لجميع الخدمات: قم بتثبيت مُصدِّر، وأضف مهمة كشط إلى Prometheus." },
                 { type: ContentType.HEADING4, text: "دراسة حالة: إعداد `postgres_exporter`" },
                { type: ContentType.PARAGRAPH, text: "هذا المصدر يتصل بقاعدة بياناتك ويستعلم من عروض `pg_stat_*` لتحويلها إلى مقاييس Prometheus." },
                 { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "خطوات `postgres_exporter`", code: `# 1. قم بتنزيل وتشغيل المصدر كخدمة systemd.

# 2. قم بإنشاء مستخدم للقراءة فقط في PostgreSQL ليستخدمه المصدر.
CREATE USER postgres_exporter PASSWORD '...';
GRANT pg_monitor TO postgres_exporter;

# 3. قم بتعيين متغير بيئة DATA_SOURCE_NAME بالإشارة إلى المستخدم الجديد.
# DATA_SOURCE_NAME="postgresql://postgres_exporter:password@localhost:5432/postgres"

# 4. أضف مهمة الكشط إلى prometheus.yml
# - job_name: 'postgres'
#   static_configs:
#     - targets: ['localhost:9187']
`, explanations: [
                    { lines: "4-6", explanation: "من الأهمية بمكان إنشاء مستخدم منفصل بأقل الامتيازات. الدور `pg_monitor` مخصص لهذا الغرض." },
                    { lines: "8-12", explanation: "نقوم بتكوين المصدر للاتصال بقاعدة البيانات، ثم نخبر Prometheus بكشطه." }
                ]},
                 { type: ContentType.HEADING4, text: "استعلامات PostgreSQL حيوية" },
                 { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>معدل إصابة ذاكرة التخزين المؤقت:</strong> `sum(rate(pg_stat_database_blks_hit{datname=\"myappdb\"}[5m])) / (sum(rate(pg_stat_database_blks_hit{datname=\"myappdb\"}[5m])) + sum(rate(pg_stat_database_blks_read{datname=\"myappdb\"}[5m]))) * 100` (يجب أن يكون > 99%).",
                    "<strong>الاتصالات النشطة:</strong> `sum(pg_stat_activity_count{datname=\"myappdb\", state=\"active\"})`."
                ]},
              ]
            },
            {
              id: "p5_c2_s4",
              icon: "❓",
              title: "المستوى 108: ورشة عمل PromQL: من مبتدئ إلى محترف",
              content: [
                { type: ContentType.PARAGRAPH, text: "PromQL هي لغة قوية للغاية. لنبني بعض الاستعلامات العملية." },
                { type: ContentType.HEADING4, text: "حالة استخدام 1: النسبة المئوية للذاكرة المستخدمة" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `100 * (1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes))` },
                { type: ContentType.PARAGRAPH, text: "هذا يستخدم مقياسين من نوع Gauge ويقوم بعملية حسابية بسيطة عليهما." },
                { type: ContentType.HEADING4, text: "حالة استخدام 2: أعلى 5 عمليات تستهلك الذاكرة" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `topk(5, node_procread_rss)` },
                { type: ContentType.PARAGRAPH, text: "`topk` هي دالة تجميع قوية تعرض أعلى N سلسلة زمنية." },
                { type: ContentType.HEADING4, text: "حالة استخدام 3 (احترافية): التنبؤ بنفاد مساحة القرص" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `predict_linear(node_filesystem_free_bytes{mountpoint="/"}[1h], 4 * 3600) < 0` },
                { type: ContentType.PARAGRAPH, text: "هذا استعلام تنبيه قوي. `predict_linear` يأخذ ساعة واحدة من البيانات (`[1h]`) ويستخدم الانحدار الخطي البسيط للتنبؤ بقيمة المقياس في المستقبل. هنا، نتنبأ بقيمته بعد 4 ساعات (`4 * 3600` ثانية). إذا كان التنبؤ أقل من 0، فسيتم إطلاق التنبيه. هذا يمنحك 4 ساعات من التحذير قبل أن يمتلئ القرص بالفعل." },
              ]
            },
            {
              id: "p5_c2_s5",
              icon: "🚨",
              title: "المستوى 109: دليل عملي: إعداد Alertmanager مع Slack",
              content: [
                { type: ContentType.PARAGRAPH, text: "Prometheus يطلق التنبيهات، و Alertmanager يزيل التكرار، ويجمع، ويوجه التنبيهات. لنقم ببناء تكوين كامل." },
                { type: ContentType.HEADING4, text: "1. `prometheus_rules.yml`" },
                { type: ContentType.CODE_EXPLANATION, language: "yaml", codeTitle: "مثال على ملف القواعد", code: `groups:
- name: HostAlerts
  rules:
  - alert: HostHighCpuLoad
    expr: 100 - (avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[2m])) * 100) > 80
    for: 5m
    labels:
      severity: warning
    annotations:
      summary: "High CPU load on {{ $labels.instance }}"
      description: "{{ $labels.instance }} has had a CPU load of over 80% for the last 5 minutes."
      
  - alert: ApiErrorRateTooHigh
    expr: (sum(rate(nginx_http_requests_total{status=~"5.."}[5m])) / sum(rate(nginx_http_requests_total[5m]))) * 100 > 5
    for: 10m
    labels:
      severity: critical
      team: backend
    annotations:
      summary: "High API Error Rate"
      description: "More than 5% of API requests are failing for the last 10 minutes. Current value is {{ $value }}%."
`, explanations: [
                    { lines: "1-11", explanation: "تنبيه بسيط لوحدة المعالجة المركزية كما رأينا من قبل." },
                    { lines: "13-22", explanation: "تنبيه أكثر تعقيدًا وواقعية. `expr` يحسب النسبة المئوية للطلبات التي لها رمز حالة 5xx على مدى 5 دقائق. يتم إطلاق التنبيه إذا تجاوزت هذه النسبة 5% لمدة 10 دقائق متواصلة (`for: 10m`). أضفنا أيضًا تسمية `team` للتوجيه." }
                ]},
                { type: ContentType.HEADING4, text: "2. `alertmanager.yml`" },
                { type: ContentType.CODE_EXPLANATION, language: "yaml", codeTitle: "مثال على alertmanager.yml", code: `global:
  slack_api_url: 'YOUR_SLACK_WEBHOOK_URL'

route:
  receiver: 'default-receiver'
  group_by: ['alertname', 'instance']
  
  routes:
    - receiver: 'backend-team-slack'
      match:
        team: backend
      group_wait: 30s
      group_interval: 5m
      repeat_interval: 1h

receivers:
- name: 'default-receiver'
  slack_configs:
  - channel: '#alerts-general'
    send_resolved: true
- name: 'backend-team-slack'
  slack_configs:
  - channel: '#alerts-backend-critical'
    send_resolved: true
    text: '{{ .CommonAnnotations.summary }}\\n{{ .CommonAnnotations.description }}'`, explanations: [
                    { lines: "4-13", explanation: "قسم `route` هو شجرة التوجيه. المسار الجذر يرسل كل شيء إلى `default-receiver`. ثم نحدد مسارًا فرعيًا. `match` يخبر Alertmanager أنه إذا كان للتنبيه تسمية `team: backend`، فيجب إرساله إلى المتلقي `backend-team-slack` بدلاً من ذلك." },
                    { lines: "15-23", explanation: "نحدد المتلقين المختلفين، كل منهم يرسل إلى قناة Slack مختلفة." }
                ]},
                { type: ContentType.PARAGRAPH, text: "أخيرًا، قم بتحديث `prometheus.yml` لإخباره بوجود هذه الملفات. الآن، سيتم توجيه تنبيهات وحدة المعالجة المركزية إلى `#alerts-general`، بينما سيتم توجيه تنبيهات معدل الخطأ الحرجة مباشرة إلى فريق الواجهة الخلفية." },
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
              title: "المستوى 110: Grafana: لوحة التحكم الفنية الخاصة بك",
              content: [
                { type: ContentType.PARAGRAPH, text: "في حين أن واجهة مستخدم Prometheus رائعة للاستعلامات المخصصة وتصحيح الأخطاء، إلا أنها ليست أداة للتصور البياني. لهذا الغرض، نستخدم Grafana. Grafana هي المنصة مفتوحة المصدر الرائدة للتصور البياني والمراقبة. إنها تسمح لك بإنشاء لوحات معلومات جميلة وتفاعلية وغنية بالمعلومات من مجموعة واسعة من مصادر البيانات، مع كون Prometheus هو الأكثر شيوعًا." },
                { type: ContentType.PARAGRAPH, text: "بعد تثبيت Grafana (`sudo apt install grafana`) وتشغيله، فإن الخطوة الأولى هي تسجيل الدخول (الافتراضي: `admin`/`admin`) وإضافة Prometheus كمصدر بيانات. هذا يتضمن ببساطة الذهاب إلى `Configuration > Data Sources` والإشارة إلى عنوان URL لخادم Prometheus الخاص بك (`http://localhost:9090`)." },
              ]
            },
            {
              id: "p5_c3_s2",
              icon: "🛠️",
              title: "المستوى 111: ورشة عمل: بناء لوحة معلومات من الصفر",
              content: [
                { type: ContentType.PARAGRAPH, text: "لوحة المعلومات هي مجموعة من 'اللوحات' (panels)، حيث تكون كل لوحة تصورًا بيانيًا لاستعلام معين. لنبني بعض اللوحات الأساسية:" },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "لوحة استخدام وحدة المعالجة المركزية", definition: "<strong>النوع:</strong> Time series. <strong>الاستعلام:</strong> `(1 - avg(rate(node_cpu_seconds_total{mode=\"idle\"}[$__rate_interval]))) * 100`. <strong>الوحدة:</strong> Percent (0-100). `$__rate_interval` هو متغير Grafana ذكي يتم ضبطه تلقائيًا بناءً على نطاق الوقت." },
                    { term: "لوحة الذاكرة المتاحة", definition: "<strong>النوع:</strong> Stat. <strong>الاستعلام:</strong> `node_memory_MemAvailable_bytes`. <strong>الوحدة:</strong> Bytes (IEC). <strong>العتبات:</strong> أضف عتبات لتغيير اللون إلى الأصفر والأحمر عندما تنخفض الذاكرة." },
                    { term: "لوحة استخدام القرص", definition: '<strong>النوع:</strong> Gauge. <strong>الاستعلام:</strong> `100 - (node_filesystem_free_bytes{mountpoint="/"} / node_filesystem_size_bytes{mountpoint="/"} * 100)`. <strong>الوحدة:</strong> Percent (0-100).' },
                ]},
                 { type: ContentType.HEADING4, text: "ورشة عمل تصور متقدمة: استخدام الخرائط الحرارية (Heatmaps)" },
                 { type: ContentType.PARAGRAPH, text: "الرسم البياني الخطي للمتوسط أو p99 لزمن الاستجابة مفيد، لكنه يخفي القصة الكاملة. الخريطة الحرارية تظهر لك توزيعًا كاملاً. لنقم ببناء واحدة لزمن استجابة Nginx:" },
                 { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>النوع:</strong> Heatmap.",
                    "<strong>الاستعلام:</strong> `sum by (le) (rate(nginx_http_request_duration_seconds_bucket[5m]))`.",
                    "<strong>تنسيق البيانات:</strong> `Heatmap`.",
                    "<strong>تسمية المحور Y:</strong> `{{le}}` (هذا يستخدم تسمية `le` - أقل من أو يساوي - من مقياس المدرج التكراري)."
                ]},
                 { type: ContentType.PARAGRAPH, text: "النتيجة هي تصور قوي. المحور السيني هو الوقت، والمحور الصادي هو زمن الاستجابة، ولون كل مربع يمثل عدد الطلبات التي انتهت في ذلك 'الدلو'. هذا يسمح لك برؤية الأنماط على الفور، مثل 'معظم الطلبات سريعة، ولكن هناك مجموعة صغيرة من الطلبات البطيئة جدًا تحدث كل 5 دقائق'." },
              ]
            },
            {
              id: "p5_c3_s3",
              icon: "📥",
              title: "المستوى 112: سر المحترفين: استخدام لوحات معلومات المجتمع والتعليقات التوضيحية",
              content: [
                { type: ContentType.PARAGRAPH, text: "بناء لوحات معلومات شاملة من الصفر يمكن أن يستغرق وقتًا طويلاً. لحسن الحظ، لدى Grafana مجتمع نابض بالحياة يشارك لوحات المعلومات المعدة مسبقًا على موقع Grafana.com الرسمي. لوحة معلومات 'Node Exporter Full' (ID: 1860) هي لوحة معلومات ممتازة وشاملة لمراقبة مقاييس النظام. يمكنك استيرادها بمعرفها في ثوانٍ. استكشاف هذه اللوحات المعدة مسبقًا هو أيضًا طريقة رائعة لتعلم استعلامات PromQL المعقدة." },
                 { type: ContentType.HEADING4, text: "سر المحترفين: التعليقات التوضيحية (Annotations) لربط الأحداث بالبيانات" },
                { type: ContentType.PARAGRAPH, text: "هل انخفض الأداء فجأة؟ هل كان ذلك بسبب عملية نشر؟ التعليقات التوضيحية تسمح لك بوضع علامات للأحداث مباشرة على الرسوم البيانية الخاصة بك. يمكنك تكوين Grafana لجلب التعليقات التوضيحية من مصادر مختلفة، أو يمكنك إنشاؤها عبر واجهة برمجة التطبيقات الخاصة به." },
                 { type: ContentType.CODE_BLOCK, language: "bash", codeTitle: "إضافة تعليق توضيحي من خط أنابيب CI/CD", code: `curl -X POST "http://user:pass@your-grafana/api/annotations" \\
-H "Content-Type: application/json" \\
-d '{
  "dashboardUID": "your-dashboard-uid",
  "tags": ["deployment", "production"],
  "text": "Deployed version v1.2.3"
}'` },
                 { type: ContentType.PARAGRAPH, text: "عندما تقوم بتشغيل هذا الأمر في نهاية خط أنابيب النشر الناجح، سيظهر خط عمودي ورسالة على جميع لوحات المعلومات الخاصة بك في ذلك الوقت. هذا لا يقدر بثمن لربط التغييرات في سلوك النظام بالأحداث المحددة التي تسببت فيها." },
              ]
            },
            {
              id: "p5_c3_s4",
              icon: "🔔",
              title: "المستوى 113: كشف الخبايا: تنبيهات Grafana مقابل Alertmanager",
              content: [
                { type: ContentType.PARAGRAPH, text: "يوفر Grafana نظام تنبيه خاص به، مما يطرح سؤالاً شائعًا: متى يجب أن أستخدمه ومتى يجب أن أستخدم Alertmanager؟" },
                { type: ContentType.HEADING4, text: "استخدم تنبيهات Grafana عندما:" },
                 { type: ContentType.LIST_UNORDERED, items: [
                    "تكون التنبيهات بسيطة وتستند إلى عتبة (threshold).",
                    "تريد أن يكون التنبيه مرتبطًا بصريًا بلوحة معينة.",
                    "لا تحتاج إلى توجيه معقد أو تجميع متقدم.",
                     "تريد تمكين أعضاء الفريق غير التقنيين من إنشاء تنبيهات بسهولة من لوحة المعلومات."
                ]},
                 { type: ContentType.HEADING4, text: "استخدم Prometheus Alertmanager عندما:" },
                 { type: ContentType.LIST_UNORDERED, items: [
                    "تحتاج إلى توجيه تنبيهات مختلفة إلى فرق مختلفة بناءً على التسميات (`team=backend`).",
                    "تحتاج إلى تجميع تنبيهات متعددة (على سبيل المثال، '5 خوادم ويب معطلة') في إشعار واحد.",
                    "تحتاج إلى كتم (silencing) التنبيهات أثناء الصيانة.",
                    "تريد إدارة تكوين التنبيه الخاص بك ككود (`alerting_rules.yml`) في Git.",
                     "تحتاج إلى منطق تنبيه معقد لا يمكن تمثيله بسهولة في استعلام Grafana واحد."
                ]},
                { type: ContentType.NOTE, title: "القاعدة العامة", text: "استخدم Grafana للتنبيهات المرئية والإعلامية. استخدم Alertmanager للتنبيهات التشغيلية الحرجة التي تتطلب إجراءً وتوجيهًا معقدًا. غالبًا ما يتم استخدامهما معًا." },
              ]
            },
            {
              id: "p5_c3_s5",
              icon: "🧩",
              title: "المستوى 114: دراسة حالة: بناء 'لوحة المعلومات النهائية' للملاحظة",
              content: [
                { type: ContentType.PARAGRAPH, text: "قوة Grafana الحقيقية هي قدرتها على دمج البيانات من مصادر متعددة في لوحة معلومات واحدة. لنصمم لوحة معلومات لتصحيح أخطاء واجهة برمجة تطبيقات بطيئة." },
                { type: ContentType.HEADING4, text: "1. إنشاء متغير" },
                { type: ContentType.PARAGRAPH, text: "أولاً، قم بإنشاء متغير `endpoint` من نوع 'Query'. استخدم استعلام Prometheus مثل `label_values(nginx_http_requests_total, request_uri)` للحصول على قائمة بجميع نقاط النهاية الخاصة بك." },
                { type: ContentType.HEADING4, text: "2. بناء اللوحات" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>لوحة 1 (Prometheus):</strong> رسم بياني لزمن استجابة p99 لنقطة النهاية المحددة: `histogram_quantile(0.99, sum(rate(nginx_http_request_duration_seconds_bucket{request_uri=\"$endpoint\"}[5m])) by (le))`.",
                    "<strong>لوحة 2 (Loki):</strong> لوحة سجلات تعرض سجلات الأخطاء فقط لنقطة النهاية المحددة: `{job=\"nginx\"} |= \"$endpoint\" |~ \" [5]\\\\d\\\\d \"`.",
                    "<strong>لوحة 3 (PostgreSQL):</strong> لوحة جدول تعرض أبطأ 5 استعلامات (تتطلب مصدر بيانات PostgreSQL وإعداد `pg_stat_statements`).",
                     "<strong>لوحة 4 (APM/Traces):</strong> إذا كان لديك مصدر بيانات تتبع مثل Jaeger أو Tempo، يمكنك إضافة لوحة تعرض أبطأ التتبعات لنقطة النهاية المحددة."
                ]},
                { type: ContentType.PARAGRAPH, text: "الآن، يمكنك تحديد نقطة النهاية من القائمة المنسدلة، وستقوم جميع اللوحات بالتحديث تلقائيًا. يمكنك رؤية ارتفاع في زمن الاستجابة، ورؤية سجلات الخطأ المرتبطة به، ورؤية الاستعلام البطيء في قاعدة البيانات الذي قد يكون السبب، كل ذلك في شاشة واحدة. هذه هي الملاحظة الحقيقية." },
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
              title: "المستوى 115: APM: الانتقال من الصندوق الأسود إلى الصندوق الزجاجي",
              content: [
                { type: ContentType.PARAGRAPH, text: "لقد قمنا بتغطية ركيزتين من أركان الملاحظة الثلاثة: السجلات والمقاييس. الركيزة الثالثة والأكثر تفصيلاً هي التتبعات (Traces). مراقبة أداء التطبيقات (APM) هي ممارسة استخدام التتبعات لفهم ما يحدث *داخل* تطبيقك." },
                { type: ContentType.PARAGRAPH, text: "لنفكر في تشبيه: المقاييس هي لوحة عدادات سيارتك (السرعة، درجة حرارة المحرك). السجلات هي تقرير الميكانيكي بعد الفحص. لكن التتبعات هي كاميرا عالية السرعة موضوعة داخل المحرك، تسجل كل شرارة وكل حركة مكبس. إنها تحول تطبيقك من صندوق أسود إلى صندوق زجاجي، مما يسمح لك برؤية كل جزء من الكود أثناء تنفيذه." },
              ]
            },
            {
              id: "p5_c4_s2",
              icon: "👣",
              title: "المستوى 116: كشف خبايا تتبع الطلبات الموزعة",
              content: [
                { type: ContentType.PARAGRAPH, text: "في البنى الحديثة القائمة على الخدمات المصغرة (microservices)، قد يمر طلب مستخدم واحد عبر خدمات متعددة قبل اكتماله. تتبع الطلبات الموزعة هو تقنية تتيح لك تتبع رحلة هذا الطلب عبر جميع هذه الخدمات." },
                { type: ContentType.PARAGRAPH, text: "عندما يدخل طلب إلى النظام لأول مرة، يتم إعطاؤه 'معرف تتبع' (Trace ID) فريدًا. يتم تمرير هذا المعرف في ترويسات HTTP (مثل `traceparent`) مع كل استدعاء لاحق بين الخدمات. كل قطعة عمل داخل خدمة (مثل استدعاء دالة، استعلام قاعدة بيانات) تسمى 'امتداد' (Span). كل امتداد له معرفه الخاص ويشير إلى معرف امتداده الأصلي. والنتيجة هي بنية شجرية يمكنك تصورها كرسم بياني شلالي (flame graph) يوضح بالضبط أين قضى الطلب وقته، مما يسهل تحديد الخدمة البطيئة." },
              ]
            },
            {
              id: "p5_c4_s3",
              icon: "🔧",
              title: "المستوى 117: ورشة عمل: إضافة OpenTelemetry إلى تطبيق Node.js",
              content: [
                { type: ContentType.PARAGRAPH, text: "OpenTelemetry هو معيار مفتوح المصدر لجمع بيانات التتبع. لدمجه، تحتاج إلى إضافة مكتبة 'instrumentation' إلى تطبيقك. هذه المكتبة تقوم تلقائيًا 'بترقيع' (monkey-patching) المكتبات الشائعة." },
                { type: ContentType.HEADING4, text: "مثال كامل لـ `instrumentation.js`:" },
                { type: ContentType.CODE_BLOCK, language: "javascript", code: `const { NodeSDK } = require('@opentelemetry/sdk-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
const { PgInstrumentation } = require('@opentelemetry/instrumentation-pg');

const sdk = new NodeSDK({
  serviceName: 'my-node-app',
  traceExporter: new OTLPTraceExporter({
    url: 'http://your-apm-collector:4318/v1/traces', // e.g., SigNoz or Jaeger
  }),
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
    new PgInstrumentation(),
  ]
});

sdk.start();
` },
                { type: ContentType.PARAGRAPH, text: "ثم تبدأ تطبيقك باستخدام: `node -r ./instrumentation.js index.js`. هذا كل شيء! ستبدأ المكتبات تلقائيًا في إنشاء وإرسال التتبعات دون أي تغييرات في كود تطبيقك." },
                 { type: ContentType.HEADING4, text: "ورشة عمل: إضافة امتدادات مخصصة (Custom Spans)" },
                { type: ContentType.PARAGRAPH, text: "القياس التلقائي رائع، لكن في بعض الأحيان تريد قياس دالة معينة ومهمة في الكود الخاص بك. يمكنك القيام بذلك يدويًا:" },
                 { type: ContentType.CODE_BLOCK, language: "javascript", code: `const opentelemetry = require("@opentelemetry/api");

async function processPayment(userId, amount) {
  const tracer = opentelemetry.trace.getTracer('my-app-tracer');
  
  // ابدأ امتدادًا جديدًا
  return tracer.startActiveSpan('processPayment', async (span) => {
    // أضف سمات (بيانات وصفية) مفيدة إلى الامتداد
    span.setAttribute("user.id", userId);
    span.setAttribute("payment.amount", amount);

    try {
      // ... (اتصل بـ Stripe، حدث قاعدة البيانات، إلخ) ...
      span.setStatus({ code: opentelemetry.SpanStatusCode.OK });
      return { success: true };
    } catch (error) {
      span.setStatus({ code: opentelemetry.SpanStatusCode.ERROR, message: error.message });
      span.recordException(error); // سجل الخطأ الكامل
      throw error;
    } finally {
      span.end(); // تأكد من إنهاء الامتداد دائمًا
    }
  });
}` },
              ]
            },
            {
              id: "p5_c4_s4",
              icon: "🏺",
              title: "المستوى 118: سرد قصة تتبع: من المقياس إلى السبب الجذري",
              content: [
                { type: ContentType.PARAGRAPH, text: "لنفترض أنك ترى ارتفاعًا في مقياس زمن استجابة p99 لنقطة النهاية `/api/orders` في Grafana." },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>1. الانتقال إلى APM:</strong> تنقر على الرسم البياني، الذي ينقلك إلى أداة APM الخاصة بك، مع تصفية التتبعات لنقطة النهاية `/api/orders` في تلك الفترة الزمنية.",
                    "<strong>2. تحديد التتبع البطيء:</strong> ترى قائمة بالتتبعات، معظمها سريع، ولكن أحدها يستغرق 3 ثوانٍ. تنقر عليه.",
                    "<strong>3. تحليل الرسم البياني الشلالي:</strong> ترى أن امتداد `express.request` يستغرق 3 ثوانٍ. تحته، ترى امتدادًا يسمى `pg.query` يستغرق 2.9 ثانية.",
                    "<strong>4. فحص الامتداد:</strong> تنقر على امتداد `pg.query`. ترى السمات (attributes) الكاملة، بما في ذلك استعلام SQL الفعلي: `SELECT * FROM order_items WHERE order_id = 12345;`.",
                    "<strong>5. اكتشاف السبب الجذري:</strong> تأخذ هذا الاستعلام وتشغل `EXPLAIN ANALYZE` عليه في قاعدة البيانات. تكتشف أنه يقوم بفحص تسلسلي (Seq Scan) لأنك نسيت إضافة فهرس على `order_id` في جدول `order_items`. لقد انتقلت من 'التطبيق بطيء' إلى السبب الجذري الدقيق في دقائق."
                ]},
                 { type: ContentType.HEADING4, text: "دراسة حالة كلاسيكية: مشكلة استعلام N+1" },
                 { type: ContentType.PARAGRAPH, text: "لنفترض أن لديك نقطة نهاية `/api/posts` تعرض آخر 10 منشورات مع اسم المؤلف. الكود الساذج قد يبدو كالتالي:" },
                 { type: ContentType.CODE_BLOCK, language: "javascript", code: `const posts = await db.query('SELECT * FROM posts LIMIT 10');
for (const post of posts) {
  post.author = await db.query('SELECT name FROM users WHERE id = $1', [post.author_id]);
}` },
                 { type: ContentType.PARAGRAPH, text: "في أداة APM، سيبدو هذا التتبع كارثيًا: امتداد واحد لـ `SELECT * FROM posts`، يليه 10 امتدادات `SELECT name FROM users` متسلسلة. هذا هو 1 (N) + 1 = 11 استعلامًا. الحل هو استخدام `JOIN`:" },
                 { type: ContentType.CODE_BLOCK, language: "javascript", code: `const posts = await db.query('SELECT p.*, u.name as author_name FROM posts p JOIN users u ON p.author_id = u.id LIMIT 10');` },
                 { type: ContentType.PARAGRAPH, text: "الآن، سيُظهر التتبع امتداد استعلام واحد فقط، وسيكون أسرع بكثير. APM يجعل هذا النوع من المشاكل واضحًا بصريًا على الفور." },
              ]
            },
            {
              id: "p5_c4_s5",
              icon: "🔗",
              title: "المستوى 119: الحلقة المقدسة: ربط التتبعات والسجلات والمقاييس",
              content: [
                { type: ContentType.PARAGRAPH, text: "الهدف النهائي للملاحظة هو ربط الركائز الثلاث معًا. عندما تقوم مكتبات OpenTelemetry بترقيع مكتبات التسجيل الخاصة بك (مثل Winston أو Pino)، فإنها تحقن تلقائيًا `trace_id` و `span_id` الحاليين في كل سطر سجل يتم إنشاؤه." },
                { type: ContentType.PREFORMATTED_TEXT, text: `{ "level": "error", "message": "Failed to process item 5", "trace_id": "...", "span_id": "..." }` },
                { type: ContentType.PARAGRAPH, text: "هذا يغير قواعد اللعبة. في أداة APM الخاصة بك، يمكنك الآن النقر على امتداد في تتبع ورؤية جميع السجلات الدقيقة التي تم إنشاؤها أثناء تنفيذ هذا الجزء من الكود لهذا الطلب المحدد. وبالمثل، في أداة السجلات الخاصة بك، يمكنك النقر على `trace_id` في سطر سجل خطأ ورؤية التتبع الموزع الكامل الذي أدى إلى هذا الخطأ. لقد قمت الآن بربط 'لماذا' (التتبع) بـ 'ماذا' (السجل)." },
                 { type: ContentType.HEADING4, text: "الوصلة المفقودة: Exemplars" },
                { type: ContentType.PARAGRAPH, text: "Exemplars هي ميزة حديثة في Prometheus و OpenTelemetry تربط المقاييس بالتتبعات. عندما يتم كشط مقياس (مثل `http_request_duration_seconds`)، يمكن للمصدر إرفاق 'مثال' (exemplar) به - وهو `trace_id` لطلب ساهم في هذا المقياس. في Grafana، يمكنك بعد ذلك رؤية نقاط صغيرة على الرسم البياني الخاص بك. النقر على إحدى هذه النقاط يمكن أن يأخذك مباشرة إلى التتبع المرتبط في أداة APM الخاصة بك. هذا يكمل المثلث: من المقياس إلى التتبع، ومن التتبع إلى السجل." },
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
              title: "المستوى 120: قوالب عملية: خطة الاستجابة للحوادث وكتيبات التشغيل",
              content: [
                { type: ContentType.PARAGRAPH, text: "محاولة معرفة ما يجب فعله في خضم أزمة في الساعة 3 صباحًا هي وصفة لكارثة. خطة الاستجابة للحوادث (IRP) وكتيبات التشغيل (Runbooks) هي وثائق حية تعدك مسبقًا." },
                { type: ContentType.HEADING4, text: "قالب كتيب تشغيل مصغر: قاعدة البيانات عند 100% CPU" },
                 { type: ContentType.PREFORMATTED_TEXT, text: `**الاسم:** قاعدة البيانات عند 100% CPU
**الشدة:** SEV-1 (حرجة)
**الكشف:** تنبيه Prometheus "PostgresHighCpu"

**خطة الاتصال:**
- **قائد الحادث:** الشخص المناوب.
- **الإبلاغ:** أرسل رسالة إلى قناة #incidents على Slack.

**خطوات التشخيص:**
1. SSH إلى خادم قاعدة البيانات.
2. قم بتشغيل \`sudo -u postgres psql -c "SELECT pid, usename, query, state FROM pg_stat_activity ORDER BY state;"\` لتحديد الاستعلامات النشطة.
3. ابحث عن أي استعلامات عالقة في حالة 'active' لفترة طويلة.
4. تحقق من لوحة معلومات Grafana الخاصة بـ PostgreSQL بحثًا عن ارتفاع في عدد الأقفال.

**مسار التصعيد:**
- إذا لم يتم حل المشكلة في غضون 15 دقيقة، قم باستدعاء خبير قاعدة البيانات المناوب.

**خطوات الحل:**
1. إذا تم تحديد استعلام مارق معروف، فقم بقتله باستخدام \`SELECT pg_terminate_backend(PID);\`.
2. إذا كانت هناك استعلامات متعددة عالقة، ففكر في إعادة تشغيل التطبيق الذي يرسلها.
3. كتصعيد أخير، اتصل بـ [اسم خبير قاعدة البيانات].` },
              ]
            },
            {
              id: "p5_c5_s2",
              icon: "📞",
              title: "المستوى 121: أدوات إدارة الحوادث وصفحات الحالة",
              content: [
                { type: ContentType.PARAGRAPH, text: "عندما يطلق Alertmanager تنبيهًا في منتصف الليل، كيف تضمن أن الشخص المناسب يستيقظ؟ هذا هو المكان الذي تأتي فيه أدوات مثل PagerDuty أو Opsgenie (من Atlassian). تتكامل هذه الخدمات مع نظام المراقبة الخاص بك (مثل Alertmanager) وتدير عملية الإشعار المعقدة، بما في ذلك جداول المناوبة، ومسارات التصعيد (إذا لم يرد الشخص الأول، اتصل بمديره)، والإشعارات متعددة القنوات (إشعار دفع، ثم رسالة نصية قصيرة، ثم مكالمة هاتفية)." },
                 { type: ContentType.HEADING4, text: "سر المحترفين: صفحات الحالة (Status Pages)" },
                { type: ContentType.PARAGRAPH, text: "أثناء وقوع حادث، آخر شيء تريده هو أن يقاطعك فريق الدعم أو المديرون كل 30 ثانية للسؤال عن تحديث. صفحة الحالة (مثل status.yourcompany.com) هي مصدر الحقيقة الوحيد أثناء الانقطاع. في بداية الحادث، تقوم بإنشاء حادث جديد على صفحة الحالة الخاصة بك ('نحن نحقق في مشكلة في واجهة برمجة تطبيقات الدفع'). ثم تقوم بتحديثه بشكل دوري. هذا يحرر المهندسين للتركيز على حل المشكلة، مع إبقاء بقية الشركة على اطلاع." },
              ]
            },
            {
              id: "p5_c5_s3",
              icon: "🔥",
              title: "المستوى 122: محاكاة الحوادث: كسر الأشياء عن قصد",
              content: [
                { type: ContentType.PARAGRAPH, text: "أيام اللعبة (أو هندسة الفوضى - Chaos Engineering) هي ممارسة كسر الأشياء عمدًا في بيئة خاضعة للرقابة لاختبار مرونة نظامك وفعالية استجابتك للحوادث. تبدأ ببساطة: قم بإيقاف تشغيل خادم ويب أساسي يدويًا. هل قام موزع الأحمال بتحويل حركة المرور؟ هل أطلقت التنبيهات الصحيحة؟ هل عرف الفريق المناوب ما يجب فعله؟ أيام اللعبة تكشف عن الافتراضات الخاطئة في تصميمك قبل أن يفعل ذلك حادث حقيقي." },
              ]
            },
            {
              id: "p5_c5_s4",
              icon: "🔬",
              title: "المستوى 123: ورشة عمل: كتابة تحليل ما بعد الحادثة واقعي",
              content: [
                { type: ContentType.PARAGRAPH, text: "بعد حل كل حادثة، يجب على الفريق إجراء تحليل ما بعد الحادثة. الهدف ليس إلقاء اللوم، بل التعلم. إليك قالب مفصل:" },
                 { type: ContentType.PREFORMATTED_TEXT, text: `**تحليل ما بعد الحادثة: انقطاع واجهة برمجة تطبيقات الدفع**

**ملخص:** في 15 أكتوبر 2023 الساعة 02:15 بالتوقيت العالمي المنسق، شهدت واجهة برمجة تطبيقات الدفع انقطاعًا كاملاً لمدة 22 دقيقة، مما أثر على 100% من معاملات العملاء. تم تحديد السبب الجذري على أنه نفاد اتصالات قاعدة البيانات بعد نشر خدمة جديدة.

**التأثير:**
- فشل 5,230 معاملة.
- تلقى فريق الدعم 150 تذكرة.
- الإيرادات المتأثرة: ~261,500 دولار.

**الأسباب الجذرية (تقنية 5 Whys):**
1. لماذا فشلت واجهة برمجة التطبيقات؟ -> نفدت اتصالات قاعدة البيانات.
2. لماذا نفدت الاتصالات؟ -> تم نشر خدمة 'receipt-generator' جديدة فتحت العديد من الاتصالات ولم تغلقها.
3. لماذا لم يتم اكتشاف هذا قبل النشر؟ -> الكود مر بمراجعة الكود، لكن تأثيره على تجمع الاتصالات لم يكن واضحًا.
4. لماذا لم يكن لدينا حماية؟ -> لم يتم تكوين الخدمة الجديدة لاستخدام PgBouncer.
5. لماذا لم نتلق تنبيهًا؟ -> لم يكن لدينا تنبيه لمراقبة نسبة استخدام اتصالات قاعدة البيانات.

**الجدول الزمني:**
- 02:10 UTC: تم نشر خدمة 'receipt-generator'.
- 02:15 UTC: إطلاق تنبيه "API Latency High".
- 02:18 UTC: المهندس المناوب يقر بالحادث.
- ...

**بنود العمل:**
- **[عاجل]** [API-123] إضافة PgBouncer إلى خدمة 'receipt-generator'. (المالك: ناجي، الموعد النهائي: 16 أكتوبر)
- **[عاجل]** [MON-45] إنشاء تنبيه Prometheus لاتصالات قاعدة البيانات > 90%. (المالك: سارة، الموعد النهائي: 16 أكتوبر)
- **[متوسط]** [DEV-78] تحديث قائمة مراجعة مراجعة الكود لتشمل تحليل استخدام الاتصالات. (المالك: فريق المنصة، الموعد النهائي: 23 أكتوبر)` },
              ]
            },
            {
              id: "p5_c5_s5",
              icon: "🤝",
              title: "المستوى 124: ثقافة عدم إلقاء اللوم: تغيير اللغة",
              content: [
                { type: ContentType.PARAGRAPH, text: "أهم عنصر في الاستجابة الفعالة للحوادث هو ثقافة عدم إلقاء اللوم. الفرضية هي أن الناس لا يأتون إلى العمل ليفشلوا. إذا ارتكب شخص ما خطأ، فمن المحتمل أن يكون ذلك بسبب فشل في النظام. الهدف من تحليل ما بعد الحادثة هو إصلاح النظام، وليس لوم الفرد." },
                { type: ContentType.HEADING4, text: "أمثلة على تغيير اللغة:" },
                 { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "لغة إلقاء اللوم:", definition: "'ناجي دفع الكود السيء الذي كسر الإنتاج.'" },
                    { term: "لغة عدم إلقاء اللوم:", definition: "'الكود الذي يحتوي على الخطأ تم دمجه ونشره في الإنتاج. فشلت عملية مراجعة الكود واختبارات CI في اكتشاف المشكلة قبل النشر.'" },
                ]},
                { type: ContentType.PARAGRAPH, text: "هذا التحول البسيط في اللغة يغير التركيز من الفرد إلى العملية، ويشجع على الصدق والشفافية، ويجعل من المرجح أن تتعلم الفرق وتتحسن بالفعل من الحوادث." },
              ]
            }
        ]
    }
  ]
};
