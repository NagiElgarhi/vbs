import { Part, ContentType } from '../../types';

export const part7Content: Part = {
  id: "p7",
  partTitle: "الباب السابع: احتراف قواعد البيانات",
  icon: "📦",
  chapters: [
    {
        id: "p7_c1", chapterTitle: "الفصل الأول: أداء PostgreSQL",
        sections: [
            {
              id: "p7_c1_s1",
              icon: "📊",
              title: "المستوى 150: فهم وتحليل خطط الاستعلام (EXPLAIN ANALYZE)",
              content: [
                { type: ContentType.PARAGRAPH, text: "الاستعلامات البطيئة هي العدو الأول لأي تطبيق ويب عالي الأداء. لكن كيف تعرف لماذا استعلام معين بطيء؟ هل هو بسبب نقص الفهرس؟ أم أنه يقرأ بيانات أكثر من اللازم؟ `EXPLAIN` هي أداة التشخيص الأساسية في PostgreSQL التي تمنحك رؤية داخلية لكيفية تخطيط المُحسِّن (optimizer) لتنفيذ استعلامك." },
                { type: ContentType.PARAGRAPH, text: "`EXPLAIN` بمفرده يظهر لك الخطة المقدرة. لكن `EXPLAIN ANALYZE` يذهب خطوة أبعد: إنه يقوم بالفعل بتنفيذ الاستعلام ويظهر لك الخطة مع أوقات التنفيذ الفعلية والتكاليف. إنها مثل مقارنة خريطة الطريق المقترحة بالرحلة الفعلية التي قمت بها." },
                { type: ContentType.CODE_EXPLANATION, language: "sql", codeTitle: "تحليل استعلام بسيط", code: `EXPLAIN ANALYZE SELECT * FROM users WHERE id = 123;`, explanations: [
                    { lines: "1", explanation: "نقوم بوضع `EXPLAIN ANALYZE` قبل أي استعلام `SELECT`, `INSERT`, `UPDATE`, أو `DELETE` لرؤية خطة تنفيذه." }
                ]},
                { type: ContentType.PARAGRAPH, text: "المخرجات قد تبدو مخيفة في البداية، لكنها غنية بالمعلومات:" },
                { type: ContentType.PREFORMATTED_TEXT, text: `Index Scan using users_pkey on users  (cost=0.29..8.31 rows=1 width=117) (actual time=0.026..0.027 rows=1 loops=1)
  Index Cond: (id = 123)` },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "Index Scan", definition: "الخبر السار! المُحسِّن يستخدم فهرسًا (في هذه الحالة، المفتاح الأساسي `users_pkey`) للعثور على الصف مباشرة. هذا سريع للغاية." },
                    { term: "Seq Scan (Sequential Scan)", definition: "إذا رأيت هذا على جدول كبير، فهذه علامة حمراء. هذا يعني أن PostgreSQL يقرأ الجدول بأكمله صفًا بصف للعثور على بياناتك، وهو ما يشير غالبًا إلى نقص الفهرس." },
                    { term: "cost=0.29..8.31", definition: "تقدير المُحسِّن للتكلفة. الرقم الأول هو تكلفة بدء التشغيل، والثاني هو التكلفة الإجمالية." },
                    { term: "actual time=0.026..0.027", definition: "الوقت الفعلي بالمللي ثانية الذي استغرقه تنفيذ هذه الخطوة. هذا هو المقياس الأكثر أهمية." }
                ]},
                { type: ContentType.NOTE, title: "مفتاح تحسين الأداء", text: "تعلم قراءة مخرجات `EXPLAIN ANALYZE` هو أهم مهارة يمكنك تطويرها لتحسين أداء قاعدة البيانات. إنها تسمح لك بتحديد الاستعلامات غير الفعالة، والتحقق من استخدام الفهارس، واتخاذ قرارات مستنيرة حول كيفية إعادة كتابة استعلاماتك أو إضافة فهارس جديدة." },
              ]
            },
            {
              id: "p7_c1_s2",
              icon: "📑",
              title: "المستوى 151: استراتيجيات الفهرسة (Indexing) الفعالة",
              content: [
                { type: ContentType.PARAGRAPH, text: "الفهرس في قاعدة البيانات يشبه الفهرس في نهاية الكتاب. بدلاً من قراءة الكتاب بأكمله للعثور على مصطلح معين، يمكنك الذهاب إلى الفهرس، والعثور على المصطلح، والحصول على أرقام الصفحات الدقيقة. وبالمثل، يسمح الفهرس لـ PostgreSQL بالعثور على الصفوف التي تطابق شرط `WHERE` بسرعة دون الحاجة إلى مسح الجدول بأكمله." },
                { type: ContentType.HEADING4, text: "متى تستخدم الفهارس؟" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "على المفاتيح الخارجية (Foreign Keys).",
                    "على الأعمدة التي تستخدمها بشكل متكرر في عبارات `WHERE`.",
                    "على الأعمدة التي تستخدمها في عبارات `ORDER BY`."
                ]},
                { type: ContentType.HEADING4, text: "أنواع الفهارس الشائعة" },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "B-Tree", definition: "النوع الافتراضي والأكثر شيوعًا. إنه ممتاز لعمليات المقارنة (`=`, `<`, `>`, `BETWEEN`)." },
                    { term: "GIN (Generalized Inverted Index)", definition: "مصمم للبيانات المعقدة التي تحتوي على عناصر متعددة، مثل البحث في النص الكامل أو حقول `jsonb`." },
                    { term: "GiST (Generalized Search Tree)", definition: "مفيد لأنواع البيانات المعقدة والبحث الجغرافي (مع PostGIS)." }
                ]},
                { type: ContentType.CODE_BLOCK, language: "sql", code: `-- إنشاء فهرس B-Tree قياسي
CREATE INDEX idx_users_email ON users (email);

-- إنشاء فهرس GIN للبحث داخل عمود jsonb
CREATE INDEX idx_products_properties ON products USING GIN (properties);` },
                { type: ContentType.NOTE, title: "الفهارس ليست مجانية", text: "كل فهرس تضيفه يستهلك مساحة على القرص ويجعل عمليات الكتابة (`INSERT`, `UPDATE`, `DELETE`) أبطأ قليلاً، حيث يجب أيضًا تحديث الفهرس. لا تقم بفهرسة كل عمود. قم بتحليل استعلاماتك باستخدام `EXPLAIN ANALYZE` وأضف الفهارس فقط حيث يكون لها التأثير الأكبر." },
              ]
            },
            {
              id: "p7_c1_s3",
              icon: "🧹",
              title: "المستوى 152: صيانة قاعدة البيانات (VACUUM, REINDEX)",
              content: [
                { type: ContentType.PARAGRAPH, text: "يستخدم PostgreSQL آلية متطورة تسمى التحكم في التزامن متعدد الإصدارات (MVCC). هذا يسمح للقراء بعدم حظر الكتاب والعكس صحيح، وهو أمر رائع للأداء. الآثار الجانبية هي أنه عندما تقوم بتحديث أو حذف صف، فإن PostgreSQL لا يزيله فعليًا على الفور. إنه ببساطة يضع علامة عليه على أنه 'غير مرئي' للإصدارات المستقبلية. هذه الصفوف القديمة تسمى 'الصفوف الميتة' (dead tuples)." },
                { type: ContentType.HEADING4, text: "VACUUM: جامع القمامة" },
                { type: ContentType.PARAGRAPH, text: "`VACUUM` هي عملية صيانة تقوم بمسح الجداول لاستعادة المساحة التي تشغلها الصفوف الميتة. والأهم من ذلك، أنها تقوم بتحديث الإحصائيات الداخلية حول توزيع البيانات في جداولك. هذه الإحصائيات حيوية لمخطط الاستعلام لاتخاذ قرارات ذكية." },
                { type: ContentType.PARAGRAPH, text: "الخبر السار هو أن PostgreSQL لديه عملية خلفية تسمى `autovacuum` تقوم بهذا تلقائيًا. ومع ذلك، في الجداول ذات معدل الكتابة المرتفع جدًا، قد تحتاج أحيانًا إلى تشغيل `VACUUM ANALYZE your_table;` يدويًا." },
                { type: ContentType.HEADING4, text: "REINDEX: إعادة بناء الفهارس المنتفخة" },
                { type: ContentType.PARAGRAPH, text: "مثل الجداول، يمكن أن تصبح الفهارس أيضًا 'منتفخة' (bloated) بالصفحات الفارغة بمرور الوقت، مما يجعلها أقل كفاءة. الأمر `REINDEX` يعيد بناء الفهرس من البداية، مما يجعله أصغر وأسرع." },
                { type: ContentType.CODE_BLOCK, language: "sql", code: `REINDEX INDEX my_index;
REINDEX TABLE my_table; -- Rebuilds all indexes on the table` },
              ]
            },
            {
              id: "p7_c1_s4",
              icon: "⚙️",
              title: "المستوى 153: ضبط إعدادات PostgreSQL (postgresql.conf)",
              content: [
                { type: ContentType.PARAGRAPH, text: "الإعدادات الافتراضية لـ PostgreSQL متحفظة للغاية ومصممة لتعمل على أي شيء من Raspberry Pi إلى خادم ضخم. لكي تحصل على أقصى استفادة من أجهزتك، تحتاج إلى ضبط بعض المعلمات الرئيسية في ملف `/etc/postgresql/VERSION/main/postgresql.conf`." },
                { type: ContentType.HEADING4, text: "أهم المعلمات التي يجب ضبطها:" },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "shared_buffers", definition: "يحدد مقدار الذاكرة التي يمكن لـ PostgreSQL استخدامها للتخزين المؤقت المشترك. نقطة بداية جيدة هي 25% من إجمالي ذاكرة الوصول العشوائي للنظام." },
                    { term: "effective_cache_size", definition: "تقدير لمقدار الذاكرة المتاحة للتخزين المؤقت للقرص بواسطة نظام التشغيل و PostgreSQL. نقطة بداية جيدة هي 75% من إجمالي ذاكرة الوصول العشوائي." },
                    { term: "work_mem", definition: "يحدد مقدار الذاكرة التي يمكن استخدامها من قبل عمليات الفرز الداخلية والدمج قبل الكتابة إلى ملفات مؤقتة. زيادته يمكن أن تسرع الاستعلامات المعقدة. ابدأ بقيمة صغيرة (مثل 4 ميجابايت) وزدها بحذر." },
                    { term: "maintenance_work_mem", definition: "يحدد الحد الأقصى للذاكرة التي سيتم استخدامها من قبل عمليات الصيانة، مثل `VACUUM` و `CREATE INDEX`. نقطة بداية جيدة هي 10% من ذاكرة الوصول العشوائي." }
                ]},
                { type: ContentType.NOTE, title: "أعد التشغيل بعد التغييرات", text: "معظم هذه التغييرات تتطلب إعادة تشغيل كاملة لخدمة PostgreSQL لتصبح فعالة (`sudo systemctl restart postgresql`). استخدم أدوات عبر الإنترنت مثل `PGTune` للحصول على توصيات جيدة بناءً على مواصفات خادمك." },
              ]
            },
            {
              id: "p7_c1_s5",
              icon: "🔗",
              title: "المستوى 154: تجميع الاتصالات (Connection Pooling) مع PgBouncer",
              content: [
                { type: ContentType.PARAGRAPH, text: "إنشاء اتصال جديد بقاعدة بيانات PostgreSQL هو عملية مكلفة نسبيًا. يتطلب مصافحة TCP، ومصادقة، وإنشاء عملية خلفية جديدة. في تطبيق ويب يتعامل مع العديد من الطلبات القصيرة، يمكن أن يصبح الحمل الزائد لإنشاء وإغلاق الاتصالات باستمرار عنق زجاجة كبير في الأداء." },
                { type: ContentType.PARAGRAPH, text: "مجمع الاتصالات (Connection Pooler) هو برنامج وسيط يقع بين تطبيقك وقاعدة بيانات PostgreSQL. إنه يحتفظ بمجموعة ('pool') من الاتصالات المفتوحة دائمًا بقاعدة البيانات. عندما يحتاج تطبيقك إلى اتصال، فإنه يطلبه من المجمع، الذي يعطيه اتصالًا موجودًا مسبقًا. عندما ينتهي التطبيق، فإنه يعيد الاتصال إلى المجمع بدلاً من إغلاقه. هذا يقلل بشكل كبير من الحمل الزائد." },
                { type: ContentType.HEADING4, text: "PgBouncer: الخيار القياسي" },
                { type: ContentType.PARAGRAPH, text: "PgBouncer هو مجمع اتصالات خفيف الوزن وشائع جدًا لـ PostgreSQL. إنه سريع وموثوق." },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo apt install pgbouncer
sudo nano /etc/pgbouncer/pgbouncer.ini` },
                { type: ContentType.PARAGRAPH, text: "في `pgbouncer.ini`، تحتاج إلى تكوين 'قاعدة بيانات' وهمية تشير إلى قاعدة بياناتك الحقيقية وتكوين إعدادات التجميع. ثم، بدلاً من أن يتصل تطبيقك بـ PostgreSQL على المنفذ 5432، فإنه يتصل بـ PgBouncer على منفذه (عادةً 6432)." },
              ]
            }
        ]
    },
    {
        id: "p7_c2", chapterTitle: "الفصل الثاني: النسخ الاحتياطي المتقدم والتكرار",
        sections: [
            {
              id: "p7_c2_s1",
              icon: "💾",
              title: "المستوى 155: النسخ الاحتياطي الفيزيائي مقابل المنطقي (pg_dump)",
              content: [
                { type: ContentType.PARAGRAPH, text: "هناك طريقتان رئيسيتان لأخذ نسخة احتياطية من قاعدة بيانات PostgreSQL، ولكل منهما مزاياها وعيوبها." },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "النسخ الاحتياطي المنطقي (Logical Backup)", definition: "هذا هو ما يفعله `pg_dump`. إنه يقرأ قاعدة البيانات وينشئ ملفًا نصيًا (أو بتنسيق مخصص) يحتوي على أوامر SQL اللازمة لإعادة إنشاء الكائنات (الجداول، الفهارس) والبيانات. **المزايا:** مرن للغاية (يمكن استعادته على إصدارات PostgreSQL مختلفة أو معماريات مختلفة)، ويمكن استعادة كائنات فردية بسهولة. **العيوب:** يمكن أن يكون أبطأ في الاستعادة للجداول الكبيرة جدًا." },
                    { term: "النسخ الاحتياطي الفيزيائي (Physical Backup)", definition: "هذا يتضمن نسخ ملفات البيانات الفعلية التي يستخدمها PostgreSQL على مستوى نظام الملفات. **المزايا:** أسرع بكثير في الاستعادة، خاصة لقواعد البيانات الكبيرة. **العيوب:** أقل مرونة (يجب استعادته على نفس الإصدار الرئيسي والمعمارية)، وأكثر تعقيدًا في الإعداد." }
                ]},
                { type: ContentType.CODE_BLOCK, language: "bash", code: `# تفريغ قاعدة بيانات واحدة إلى ملف SQL
pg_dump -U myappuser -h localhost -W myappdb > myappdb.sql

# تفريغ قاعدة بيانات واحدة إلى تنسيق مخصص مضغوط
pg_dump -U myappuser -h localhost -Fc myappdb > myappdb.dump

# استعادة من ملف تنسيق مخصص
pg_restore -U myappuser -h localhost -d myappdb myappdb.dump` },
                { type: ContentType.NOTE, title: "pg_dumpall", text: "لأخذ نسخة احتياطية من جميع قواعد البيانات، بالإضافة إلى الكائنات العامة مثل المستخدمين، استخدم `pg_dumpall`." },
              ]
            },
            {
              id: "p7_c2_s2",
              icon: "⏳",
              title: "المستوى 156: إعداد الاسترداد في نقطة زمنية (PITR)",
              content: [
                { type: ContentType.PARAGRAPH, text: "نسخة `pg_dump` الاحتياطية هي لقطة في لحظة معينة. ولكن ماذا لو قمت بحذف جدول عن طريق الخطأ بعد 10 دقائق من أخذ النسخة الاحتياطية؟ الاسترداد في نقطة زمنية (PITR) هو حل قوي لهذه المشكلة. إنه يسمح لك باستعادة قاعدة بياناتك إلى *أي لحظة زمنية* منذ آخر نسخة احتياطية أساسية." },
                { type: ContentType.HEADING4, text: "كيف يعمل؟" },
                { type: ContentType.PARAGRAPH, text: "يعتمد PITR على مكونين:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>نسخة احتياطية أساسية:</strong> نسخة احتياطية فيزيائية كاملة من قاعدة البيانات.",
                    "<strong>أرشفة مستمرة لـ WAL:</strong> يقوم PostgreSQL بتسجيل كل تغيير يتم إجراؤه على قاعدة البيانات في ملفات سجل تسمى سجلات الكتابة المسبقة (Write-Ahead Logs - WALs). يمكنك تكوين PostgreSQL لأرشفة هذه الملفات بشكل مستمر إلى موقع آمن (مثل خادم تخزين آخر أو S3)."
                ]},
                { type: ContentType.PARAGRAPH, text: "للاستعادة، تبدأ بالنسخة الاحتياطية الأساسية، ثم 'تعيد تشغيل' ملفات WAL المؤرشفة حتى تصل إلى النقطة الزمنية المحددة التي تريدها." },
              ]
            },
            {
              id: "p7_c2_s3",
              icon: "🔁",
              title: "المستوى 157: إعداد التكرار المتدفق (Streaming Replication)",
              content: [
                { type: ContentType.PARAGRAPH, text: "التكرار هو عملية الحفاظ على نسخة طبق الأصل (replica) من قاعدة بياناتك على خادم منفصل. هذا يوفر فائدتين رئيسيتين: التوافر العالي (High Availability) وتوزيع حمل القراءة (Read Scale-out)." },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "التوافر العالي", definition: "إذا فشل خادم قاعدة البيانات الرئيسي (Primary)، يمكنك 'ترقية' (promote) الخادم النسخة الاحتياطية ليصبح الخادم الرئيسي الجديد، مما يقلل بشكل كبير من وقت التوقف." },
                    { term: "توزيع حمل القراءة", definition: "يمكنك توجيه جميع استعلامات القراءة المكثفة (مثل التقارير التحليلية) إلى الخادم النسخة الاحتياطية، مما يحرر الخادم الرئيسي للتركيز على عمليات الكتابة." }
                ]},
                { type: ContentType.PARAGRAPH, text: "التكرار المتدفق هو الطريقة المدمجة في PostgreSQL لتحقيق ذلك. يقوم الخادم الرئيسي بدفق تغييرات WAL الخاصة به عبر الشبكة إلى الخادم النسخة الاحتياطية في الوقت الفعلي، والذي يقوم بتطبيقها للحفاظ على تزامنها." },
              ]
            },
            {
              id: "p7_c2_s4",
              icon: "🤖",
              title: "المستوى 158: أتمتة النسخ الاحتياطي باستخدام أدوات مثل pgBackRest",
              content: [
                { type: ContentType.PARAGRAPH, text: "في حين أنه من الممكن بناء حل PITR والتكرار الخاص بك باستخدام نصوص برمجية مخصصة، إلا أنه معقد وعرضة للخطأ. أدوات النسخ الاحتياطي المخصصة مثل `pgBackRest` تجعل هذه العملية أسهل وأكثر موثوقية." },
                { type: ContentType.HEADING4, text: "لماذا استخدام pgBackRest؟" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>إدارة النسخ الاحتياطي الكاملة:</strong> يدير النسخ الاحتياطية الكاملة والتفاضلية والتزايدية.",
                    "<strong>PITR مبسط:</strong> يجعل أرشفة WAL والاستعادة إلى نقطة زمنية أمرًا سهلاً.",
                    "<strong>أداء عالي:</strong> يستخدم النسخ الاحتياطي والاستعادة المتوازيين.",
                    "<strong>سهولة التكوين:</strong> تكوينه أبسط بكثير من إعداد كل شيء يدويًا."
                ]},
                { type: ContentType.PARAGRAPH, text: "استثمار الوقت في تعلم أداة مخصصة مثل `pgBackRest` سيوفر لك ساعات من العمل ويمنحك راحة البال بأن استراتيجية التعافي من الكوارث الخاصة بك قوية ومختبرة." },
              ]
            },
            {
              id: "p7_c2_s5",
              icon: "🧪",
              title: "المستوى 159: اختبار استراتيجيات الاسترداد من الكوارث",
              content: [
                { type: ContentType.PARAGRAPH, text: "هذه هي القاعدة الأكثر أهمية في النسخ الاحتياطي: **النسخة الاحتياطية التي لم تختبر استعادتها ليست نسخة احتياطية على الإطلاق.**" },
                { type: ContentType.PARAGRAPH, text: "يجب عليك بانتظام إجراء 'تدريبات على التعافي من الكوارث'. هذا لا يعني العبث بخادم الإنتاج الخاص بك. بدلاً من ذلك، قم بإنشاء خادم مؤقت جديد، وحاول استعادة أحدث نسخة احتياطية لديك عليه. ثم قم بتشغيل سلسلة من الاختبارات للتحقق من أن البيانات كاملة ومتسقة." },
                { type: ContentType.HEADING4, text: "فوائد الاختبار:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "يؤكد أن نسخك الاحتياطية صالحة بالفعل.",
                    "يوثق ويصقل عملية الاستعادة الخاصة بك.",
                    "يمنحك وفريقك الثقة في أنه يمكنك التعامل مع كارثة حقيقية."
                ]},
                { type: ContentType.NOTE, title: "لا تنتظر حتى فوات الأوان", text: "آخر وقت تريد فيه اكتشاف أن نسخك الاحتياطية معطوبة أو أنك لا تعرف كيفية استعادتها هو عندما يكون خادم الإنتاج الخاص بك معطلاً. اجعل اختبار الاستعادة جزءًا منتظمًا من جدول الصيانة الخاص بك." },
              ]
            }
        ]
    },
    {
        id: "p7_c3", chapterTitle: "الفصل الثالث: أمان PostgreSQL",
        sections: [
            {
              id: "p7_c3_s1",
              icon: "🛡️",
              title: "المستوى 160: فهم ملف pg_hba.conf للتحكم في الوصول",
              content: [
                { type: ContentType.PARAGRAPH, text: "ملف `pg_hba.conf` (Host-Based Authentication) هو جدار الحماية الأساسي لـ PostgreSQL. إنه يحدد *من* يمكنه الاتصال، *بأي قاعدة بيانات*، *من أي مكان*، و *كيف* يجب عليهم المصادقة. تتم قراءة هذا الملف من الأعلى إلى الأسفل، ويتم استخدام القاعدة الأولى المطابقة. هذا يجعل الترتيب مهمًا للغاية." },
                { type: ContentType.HEADING4, text: "تنسيق السطر" },
                { type: ContentType.PREFORMATTED_TEXT, text: `TYPE  DATABASE        USER            ADDRESS                 METHOD` },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "TYPE", definition: "`local` (لمقابس يونكس) أو `host` (لاتصالات TCP/IP)." },
                    { term: "DATABASE, USER", definition: "يمكن أن تكون أسماء محددة، `all`، أو `sameuser`." },
                    { term: "ADDRESS", definition: "نطاق CIDR (مثل `192.168.1.0/24` أو `127.0.0.1/32`)." },
                    { term: "METHOD", definition: "`peer`, `scram-sha-256`, `md5`, `trust` (خطير!)، `reject`." }
                ]},
                { type: ContentType.NOTE, title: "القواعد الأكثر تحديدًا أولاً", text: "يجب دائمًا وضع القواعد الأكثر تحديدًا (مثل عنوان IP واحد) قبل القواعد الأكثر عمومية (مثل شبكة كاملة)." },
              ]
            },
            {
              id: "p7_c3_s2",
              icon: "🔒",
              title: "المستوى 161: تشفير الاتصالات باستخدام SSL/TLS",
              content: [
                { type: ContentType.PARAGRAPH, text: "إذا كان تطبيقك يتصل بقاعدة بياناتك عبر شبكة غير موثوق بها (حتى بين خادمين في نفس مركز البيانات)، فيجب عليك تشفير هذا الاتصال. هذا يمنع أي شخص على الشبكة من التنصت على استعلاماتك أو بياناتك." },
                { type: ContentType.HEADING4, text: "خطوات الإعداد الأساسية:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "1. قم بإنشاء شهادة ومفتاح SSL (يمكن أن تكون موقعة ذاتيًا للاتصالات الداخلية).",
                    "2. قم بتعديل `postgresql.conf`: قم بتعيين `ssl = on` وحدد المسارات إلى ملفات `ssl_cert_file` و `ssl_key_file`.",
                    "3. قم بتعديل `pg_hba.conf`: قم بتغيير نوع الاتصال من `host` إلى `hostssl` لفرض SSL لتلك الاتصالات.",
                    "4. أعد تشغيل PostgreSQL."
                ]},
              ]
            },
            {
              id: "p7_c3_s3",
              icon: "🔑",
              title: "المستوى 162: تشفير الأعمدة الحساسة باستخدام pgcrypto",
              content: [
                { type: ContentType.PARAGRAPH, text: "في بعض الأحيان، تحتاج إلى تخزين بيانات حساسة للغاية (مثل أرقام الضمان الاجتماعي أو المعلومات الصحية) في قاعدة البيانات. تشفير هذه البيانات في حالة السكون (at-rest) يوفر طبقة حماية إضافية في حالة تمكن المهاجم من الوصول إلى ملفات قاعدة البيانات مباشرة أو الحصول على نسخة احتياطية." },
                { type: ContentType.PARAGRAPH, text: "ملحق `pgcrypto`، الذي يأتي مع حزمة `postgresql-contrib`، يوفر مجموعة من وظائف التجزئة والتشفير." },
                { type: ContentType.CODE_BLOCK, language: "sql", code: `CREATE EXTENSION IF NOT EXISTS pgcrypto;

UPDATE customers
SET ssn = pgp_sym_encrypt('123-45-678', 'my-super-secret-key')
WHERE id = 1;

SELECT pgp_sym_decrypt(ssn::bytea, 'my-super-secret-key')
FROM customers
WHERE id = 1;` },
                { type: ContentType.NOTE, title: "تحدي إدارة المفاتيح", text: "التحدي الأكبر هنا هو: أين تخزن مفتاح التشفير؟ إذا قمت بتخزينه في ملف تكوين على نفس الخادم، فإنك تقلل من الفائدة. الحلول المتقدمة تتضمن استخدام خدمات إدارة المفاتيح (KMS) مثل HashiCorp Vault أو تلك التي يقدمها مزودو الخدمات السحابية." },
              ]
            },
            {
              id: "p7_c3_s4",
              icon: "👥",
              title: "المستوى 163: الأمان على مستوى الصف (Row-Level Security - RLS)",
              content: [
                { type: ContentType.PARAGRAPH, text: "الأمان على مستوى الصف هو ميزة قوية للغاية في PostgreSQL تسمح لك بتحديد سياسات وصول تتحكم في الصفوف التي يمكن للمستخدمين رؤيتها أو تعديلها. هذا مفيد بشكل لا يصدق في التطبيقات متعددة المستأجرين (multi-tenant) حيث يتم تخزين بيانات جميع العملاء في نفس الجدول." },
                { type: ContentType.PARAGRAPH, text: "على سبيل المثال، يمكنك إنشاء سياسة تقول 'لا تسمح للمستخدم إلا برؤية الفواتير التي يكون فيها `customer_id` مطابقًا لمعرف المستخدم الحالي'." },
                { type: ContentType.CODE_BLOCK, language: "sql", code: `ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY user_invoices_policy ON invoices
FOR SELECT
USING (customer_id = current_setting('app.current_user_id')::integer);` },
                { type: ContentType.PARAGRAPH, text: "الآن، حتى لو قام مستخدم بتشغيل `SELECT * FROM invoices;`، فإن قاعدة البيانات ستعيد فقط الصفوف التي تطابق سياسته، مما يفرض الأمان على أعمق مستوى ممكن." },
              ]
            },
            {
              id: "p7_c3_s5",
              icon: "📝",
              title: "المستوى 164: تدقيق نشاط قاعدة البيانات مع pgAudit",
              content: [
                { type: ContentType.PARAGRAPH, text: "لمعرفة من فعل ماذا ومتى في قاعدة بياناتك، تحتاج إلى تدقيق مفصل. `pgAudit` هو ملحق PostgreSQL يوفر تسجيل تدقيق مفصل. يمكنه تسجيل كل استعلام يتم تشغيله، أو فقط أنواع معينة من الاستعلامات (مثل `READ`, `WRITE`, `DDL`)." },
                { type: ContentType.HEADING4, text: "الإعداد" },
                { type: ContentType.PARAGRAPH, text: "يتضمن الإعداد إضافة `pgaudit` إلى `shared_preload_libraries` في `postgresql.conf` وتكوين مستوى التسجيل الذي تريده (على سبيل المثال، `pgaudit.log = 'all'`). السجلات الناتجة مفصلة للغاية وتوفر مسارًا كاملاً لكل نشاط، وهو أمر لا يقدر بثمن للتحليل الجنائي والامتثال." },
              ]
            }
        ]
    },
    {
        id: "p7_c4", chapterTitle: "الفصل الرابع: استخدام Redis للتخزين المؤقت",
        sections: [
            {
              id: "p7_c4_s1",
              icon: "🔧",
              title: "المستوى 165: تثبيت وتأمين Redis",
              content: [
                { type: ContentType.PARAGRAPH, text: "Redis هو مخزن بيانات في الذاكرة سريع بشكل لا يصدق. غالبًا ما يتم استخدامه كذاكرة تخزين مؤقت (cache) أو وسيط رسائل (message broker). نظرًا لأنه يعمل في الذاكرة، فإن عمليات القراءة والكتابة تكون شبه فورية." },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo apt install redis-server
sudo nano /etc/redis/redis.conf` },
                { type: ContentType.HEADING4, text: "خطوات التأمين الأساسية:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>الربط بـ localhost:</strong> ابحث عن `bind 127.0.0.1 ::1` وتأكد من أنه غير معلق. هذا يمنع Redis من قبول الاتصالات من خارج الخادم.",
                    "<strong>تعيين كلمة مرور:</strong> ابحث عن `# requirepass foobared`، وقم بإلغاء التعليق عليه، وقم بتغييره إلى كلمة مرور قوية: `requirepass YOUR_STRONG_PASSWORD`.",
                    "<strong>إعادة تسمية الأوامر الخطرة:</strong> يمكنك إعادة تسمية أوامر مثل `FLUSHALL` لمنع حذف جميع البيانات عن طريق الخطأ."
                ]},
              ]
            },
            {
              id: "p7_c4_s2",
              icon: "🧠",
              title: "المستوى 166: استراتيجيات التخزين المؤقت (Cache-aside)",
              content: [
                { type: ContentType.PARAGRAPH, text: "النمط الأكثر شيوعًا لاستخدام ذاكرة التخزين المؤقت هو 'cache-aside'." },
                { type: ContentType.HEADING4, text: "سير العمل:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "1. يحتاج التطبيق إلى بعض البيانات (على سبيل المثال، ملف تعريف المستخدم).",
                    "2. **الخطوة 1: تحقق من ذاكرة التخزين المؤقت.** يحاول التطبيق أولاً الحصول على البيانات من Redis باستخدام مفتاح (مثل `user:123`).",
                    "3. **الخطوة 2: ضربة ذاكرة التخزين المؤقت (Cache Hit).** إذا كانت البيانات موجودة في Redis، فإنه يعيدها على الفور إلى التطبيق. انتهت العملية.",
                    "4. **الخطوة 3: خطأ ذاكرة التخزين المؤقت (Cache Miss).** إذا لم تكن البيانات موجودة، يستمر التطبيق.",
                    "5. **الخطوة 4: احصل على البيانات من قاعدة البيانات.** يقوم التطبيق بإجراء الاستعلام العادي ضد PostgreSQL للحصول على البيانات.",
                    "6. **الخطوة 5: املأ ذاكرة التخزين المؤقت.** يقوم التطبيق بحفظ البيانات التي تم جلبها في Redis (عادةً مع وقت انتهاء صلاحية - TTL) حتى تكون متاحة للطلب التالي."
                ]},
              ]
            },
            {
              id: "p7_c4_s3",
              icon: "🍪",
              title: "المستوى 167: استخدام Redis كذاكرة تخزين مؤقت للجلسات",
              content: [
                { type: ContentType.PARAGRAPH, text: "يعد تخزين بيانات الجلسة في Redis حلاً ممتازًا للتطبيقات عديمة الحالة والقابلة للتطوير. بدلاً من تخزين الجلسات في ذاكرة عملية Node.js الفردية (وهو ما لا يعمل مع موازنة التحميل)، يمكنك تخزينها في Redis." },
                { type: ContentType.PARAGRAPH, text: "هذا يعني أن أيًا من خوادم التطبيق الخاصة بك يمكنه التعامل مع طلب أي مستخدم، لأنه يمكنهم جميعًا قراءة بيانات الجلسة من مخزن Redis المركزي المشترك. توفر معظم أطر عمل الويب مكتبات لهذا (مثل `connect-redis` لـ Express)." },
              ]
            },
            {
              id: "p7_c4_s4",
              icon: "⚡",
              title: "المستوى 168: تنفيذ التخزين المؤقت للاستعلامات المكلفة",
              content: [
                { type: ContentType.PARAGRAPH, text: "إذا كان لديك صفحة تتطلب استعلامًا معقدًا ومكلفًا لا تتغير بياناته كثيرًا (على سبيل المثال، 'أفضل 10 منتجات مبيعًا هذا الشهر')، فهذا مرشح مثالي للتخزين المؤقت." },
                { type: ContentType.PARAGRAPH, text: "يمكنك تنفيذ منطق 'cache-aside' لتخزين نتيجة هذا الاستعلام في Redis لمدة 5 دقائق. هذا يعني أن الاستعلام المكلف سيتم تشغيله مرة واحدة فقط كل 5 دقائق، وسيتم خدمة جميع الطلبات الأخرى مباشرة من ذاكرة Redis فائقة السرعة، مما يقلل بشكل كبير من الحمل على PostgreSQL." },
              ]
            },
            {
              id: "p7_c4_s5",
              icon: "🗑️",
              title: "المستوى 169: فهم سياسات إخلاء المفاتيح (Eviction Policies)",
              content: [
                { type: ContentType.PARAGRAPH, text: "نظرًا لأن Redis يعمل في الذاكرة، فإن المساحة محدودة. يمكنك تكوين `maxmemory` في `redis.conf` لتحديد مقدار الذاكرة التي يمكن أن يستخدمها. ولكن ماذا يحدث عندما يصل إلى هذا الحد؟ هذا هو المكان الذي تلعب فيه سياسات الإخلاء دورًا." },
                { type: ContentType.HEADING4, text: "بعض السياسات الشائعة:" },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "noeviction", definition: "(الافتراضي) لا تحذف أي شيء. ما عليك سوى إرجاع خطأ لأوامر الكتابة." },
                    { term: "allkeys-lru", definition: "احذف المفتاح الأقل استخدامًا مؤخرًا (Least Recently Used) من بين جميع المفاتيح." },
                    { term: "volatile-lru", definition: "احذف المفتاح الأقل استخدامًا مؤخرًا من بين المفاتيح التي لها وقت انتهاء صلاحية (TTL) محدد. هذه هي السياسة الأكثر شيوعًا لحالات استخدام التخزين المؤقت." }
                ]},
              ]
            }
        ]
    },
    {
        id: "p7_c5", chapterTitle: "الفصل الخامس: مفاهيم NoSQL أخرى",
        sections: [
            {
              id: "p7_c5_s1",
              icon: "📄",
              title: "المستوى 170: مقدمة إلى قواعد البيانات الوثائقية (MongoDB)",
              content: [
                { type: ContentType.PARAGRAPH, text: "MongoDB هي قاعدة بيانات NoSQL رائدة تخزن البيانات في مستندات مرنة تشبه JSON تسمى BSON. على عكس النموذج العلائقي، لا يتطلب MongoDB مخططًا محددًا مسبقًا. يمكنك تخزين مستندات ذات هياكل مختلفة في نفس المجموعة (collection)." },
                { type: ContentType.HEADING4, text: "نقاط القوة:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "تطوير سريع ونمذجة مرنة.",
                    "توسع أفقي سهل (Sharding).",
                    "لغة استعلام غنية للوثائق المعقدة."
                ]},
                { type: ContentType.HEADING4, text: "حالات الاستخدام:" },
                { type: ContentType.PARAGRAPH, text: "إدارة المحتوى، كتالوجات المنتجات، تطبيقات الهاتف المحمول حيث تتطور المتطلبات بسرعة." },
              ]
            },
            {
              id: "p7_c5_s2",
              icon: "🕰️",
              title: "المستوى 171: مقدمة إلى قواعد البيانات الزمنية (InfluxDB)",
              content: [
                { type: ContentType.PARAGRAPH, text: "قواعد البيانات الزمنية (Time-Series Databases - TSDBs) مصممة خصيصًا لتخزين واستعلام البيانات التي لها طابع زمني، مثل قراءات أجهزة الاستشعار، أو مقاييس أداء النظام، أو بيانات سوق الأوراق المالية. InfluxDB هو خيار شائع مفتوح المصدر." },
                { type: ContentType.HEADING4, text: "نقاط القوة:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "استيعاب كتابة عالي للغاية.",
                    "ضغط فعال للغاية للبيانات الزمنية.",
                    "وظائف مدمجة لتحليل البيانات الزمنية (المتوسطات المتحركة، أخذ العينات)."
                ]},
                { type: ContentType.HEADING4, text: "حالات الاستخدام:" },
                { type: ContentType.PARAGRAPH, text: "مراقبة DevOps (مثل تخزين مقاييس Prometheus)، تطبيقات إنترنت الأشياء (IoT)، التحليلات في الوقت الفعلي." },
              ]
            },
            {
              id: "p7_c5_s3",
              icon: "🔍",
              title: "المستوى 172: مقدمة إلى محركات البحث (Elasticsearch)",
              content: [
                { type: ContentType.PARAGRAPH, text: "في حين أنه من الناحية الفنية مخزن بيانات وثائقي، فإن حالة الاستخدام الأساسية لـ Elasticsearch هي البحث. إنه مبني على مكتبة Apache Lucene ويوفر إمكانات بحث نص كامل قوية بشكل لا يصدق، وتحليل، وتصنيف الصلة." },
                { type: ContentType.HEADING4, text: "نقاط القوة:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "بحث نص كامل سريع وذو صلة.",
                    "تحليلات وتجميعات قوية.",
                    "توسع أفقي."
                ]},
                { type: ContentType.HEADING4, text: "حالات الاستخدام:" },
                { type: ContentType.PARAGRAPH, text: "بحث الموقع، إدارة السجلات المركزية (حزمة ELK)، تحليلات الأعمال." },
              ]
            },
            {
              id: "p7_c5_s4",
              icon: "⚖️",
              title: "المستوى 173: متى تختار NoSQL على SQL؟",
              content: [
                { type: ContentType.PARAGRAPH, text: "القرار يعتمد على 'قانون كاب' (CAP Theorem) ومتطلباتك المحددة." },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "اختر SQL (مثل PostgreSQL) عندما:", definition: "تحتاج إلى ضمانات ACID قوية، وبياناتك منظمة بشكل جيد وعلائقية، وسلامة البيانات أمر بالغ الأهمية (الأنظمة المالية، التجارة الإلكترونية)." },
                    { term: "اختر NoSQL (مثل MongoDB) عندما:", definition: "تحتاج إلى مرونة في المخطط، وحجم بياناتك هائل وتحتاج إلى توسع أفقي سهل، والتوافر أهم قليلاً من الاتساق الصارم (الشبكات الاجتماعية، إدارة المحتوى)." }
                ]},
              ]
            },
            {
              id: "p7_c5_s5",
              icon: "🧩",
              title: "المستوى 174: المثابرة متعددة اللغات",
              content: [
                { type: ContentType.PARAGRAPH, text: "أفضل البنى الحديثة لا تختار قاعدة بيانات 'واحدة'. إنها تتبنى نهجًا يسمى 'المثابرة متعددة اللغات' (Polyglot Persistence). هذا يعني استخدام قاعدة البيانات المناسبة للمهمة المناسبة." },
                { type: ContentType.HEADING4, text: "مثال على بنية:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>PostgreSQL:</strong> كمصدر الحقيقة الأساسي لبيانات المستخدم والمعاملات.",
                    "<strong>Elasticsearch:</strong> لفهرسة بيانات المنتج وتوفير ميزة بحث قوية.",
                    "<strong>Redis:</strong> لتخزين الجلسات وتخزين النتائج المكلفة مؤقتًا.",
                    "<strong>InfluxDB:</strong> لجمع مقاييس أداء التطبيق والمستخدم."
                ]},
                { type: ContentType.PARAGRAPH, text: "هذا النهج يمنحك أفضل ما في كل العوالم، مما يسمح لك ببناء أنظمة قوية وقابلة للتطوير وعالية الأداء." },
              ]
            }
        ]
    },
  ]
};
