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
                { type: ContentType.HEADING4, text: "دراسة حالة: من الفحص التسلسلي إلى فحص الفهرس" },
                { type: ContentType.PARAGRAPH, text: "لنفترض أن لدينا جدول `posts` وجدول `comments` يحتوي على ملايين التعليقات. كل تعليق ينتمي إلى منشور (`post_id`)." },
                { type: ContentType.PARAGRAPH, text: "الآن، لنبحث عن جميع التعليقات لمنشور معين بدون فهرس:" },
                { type: ContentType.CODE_BLOCK, language: "sql", code: `EXPLAIN ANALYZE SELECT * FROM comments WHERE post_id = 12345;` },
                { type: ContentType.PARAGRAPH, text: "المخرجات ستكون شيئًا كهذا:" },
                { type: ContentType.PREFORMATTED_TEXT, text: `Seq Scan on comments  (cost=0.00..55160.00 rows=50 width=240) (actual time=0.015..350.123 rows=50 loops=1)
  Filter: (post_id = 12345)
Planning Time: 0.100 ms
Execution Time: 350.150 ms` },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "Seq Scan (Sequential Scan)", definition: "هذه هي العلامة الحمراء الكبرى. هذا يعني أن PostgreSQL اضطر إلى قراءة الجدول بأكمله، صفًا بصف، للعثور على التعليقات التي نريدها. هذا بطيء للغاية." },
                    { term: "Execution Time: 350.150 ms", definition: "استغرق الاستعلام 350 مللي ثانية، وهو أمر بطيء جدًا لطلب واجهة برمجة تطبيقات." }
                ]},
                { type: ContentType.PARAGRAPH, text: "الحل هو إضافة فهرس على عمود `post_id`:" },
                { type: ContentType.CODE_BLOCK, language: "sql", code: `CREATE INDEX idx_comments_post_id ON comments (post_id);` },
                { type: ContentType.PARAGRAPH, text: "الآن، لنقم بتشغيل نفس الاستعلام مرة أخرى:" },
                 { type: ContentType.PREFORMATTED_TEXT, text: `Index Scan using idx_comments_post_id on comments  (cost=0.42..12.34 rows=50 width=240) (actual time=0.050..0.150 rows=50 loops=1)
  Index Cond: (post_id = 12345)
Planning Time: 0.200 ms
Execution Time: 0.180 ms` },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "Index Scan", definition: "نجاح! استخدم PostgreSQL الآن الفهرس الخاص بنا للقفز مباشرة إلى الصفوف الصحيحة، تمامًا مثل استخدام فهرس الكتاب." },
                    { term: "Execution Time: 0.180 ms", definition: "الاستعلام الآن أسرع بأكثر من 1900 مرة. هذا هو الفرق بين تطبيق سريع وتطبيق غير قابل للاستخدام." }
                ]},
                { type: ContentType.NOTE, title: "مفتاح تحسين الأداء", text: "تعلم قراءة مخرجات `EXPLAIN ANALYZE` هو أهم مهارة يمكنك تطويرها لتحسين أداء قاعدة البيانات. إنها تسمح لك بتحديد الاستعلامات غير الفعالة، والتحقق من استخدام الفهارس، واتخاذ قرارات مستنيرة حول كيفية إعادة كتابة استعلاماتك أو إضافة فهارس جديدة." },
              ]
            },
            {
              id: "p7_c1_s2",
              icon: "📑",
              title: "المستوى 151: استراتيجيات الفهرسة المتقدمة",
              content: [
                { type: ContentType.PARAGRAPH, text: "الفهارس ذات العمود الواحد هي البداية فقط. PostgreSQL يقدم مجموعة متنوعة من استراتيجيات الفهرسة القوية لحالات الاستخدام المعقدة." },
                { type: ContentType.HEADING4, text: "الفهارس متعددة الأعمدة (Multi-column Indexes)" },
                { type: ContentType.PARAGRAPH, text: "إذا كنت تستعلم بشكل متكرر على أعمدة متعددة في نفس الوقت، فيمكن أن يكون الفهرس متعدد الأعمدة فعالاً للغاية. **ترتيب الأعمدة في الفهرس مهم للغاية.** القاعدة العامة هي وضع العمود الأكثر انتقائية (الذي يحتوي على أكبر عدد من القيم الفريدة) أولاً." },
                { type: ContentType.CODE_BLOCK, language: "sql", code: `-- جيد للاستعلامات مثل: WHERE user_id = ? AND status = 'published'
CREATE INDEX idx_posts_user_status ON posts (user_id, status);` },
                { type: ContentType.HEADING4, text: "الفهارس الجزئية (Partial Indexes)" },
                { type: ContentType.PARAGRAPH, text: "الفهرس الجزئي يفهرس فقط مجموعة فرعية من الصفوف في الجدول. هذا يجعل الفهرس أصغر بكثير وأسرع. إنه مثالي عندما تهتم فقط بجزء معين من بياناتك." },
                { type: ContentType.CODE_BLOCK, language: "sql", code: `-- فهرسة فقط الطلبات النشطة التي لم يتم إكمالها بعد.
CREATE INDEX idx_orders_pending ON orders (order_date) WHERE completed_at IS NULL;` },
                { type: ContentType.HEADING4, text: "فهارس التعبيرات (Expression Indexes)" },
                { type: ContentType.PARAGRAPH, text: "يمكنك إنشاء فهرس على نتيجة دالة أو تعبير. هذا مفيد بشكل لا يصدق لعمليات البحث غير الحساسة لحالة الأحرف." },
                { type: ContentType.CODE_BLOCK, language: "sql", code: `-- يسمح بالبحث السريع عن البريد الإلكتروني بغض النظر عن حالة الأحرف
-- WHERE lower(email) = 'test@example.com'
CREATE INDEX idx_users_lower_email ON users (lower(email));` },
                { type: ContentType.NOTE, title: "الفهارس ليست مجانية", text: "كل فهرس تضيفه يستهلك مساحة على القرص ويجعل عمليات الكتابة (`INSERT`, `UPDATE`, `DELETE`) أبطأ قليلاً، حيث يجب أيضًا تحديث الفهرس. لا تقم بفهرسة كل عمود. قم بتحليل استعلاماتك باستخدام `EXPLAIN ANALYZE` وأضف الفهارس فقط حيث يكون لها التأثير الأكبر." },
              ]
            },
            {
              id: "p7_c1_s3",
              icon: "🧹",
              title: "المستوى 152: الكشف عن 'الانتفاخ' (Bloat) وصيانة قاعدة البيانات",
              content: [
                { type: ContentType.PARAGRAPH, text: "يستخدم PostgreSQL آلية متطورة تسمى التحكم في التزامن متعدد الإصدارات (MVCC). هذا يسمح للقراء بعدم حظر الكتاب والعكس صحيح، وهو أمر رائع للأداء. الآثار الجانبية هي أنه عندما تقوم بتحديث أو حذف صف، فإن PostgreSQL لا يزيله فعليًا على الفور. إنه ببساطة يضع علامة عليه على أنه 'غير مرئي' للإصدارات المستقبلية. هذه الصفوف القديمة تسمى 'الصفوف الميتة' (dead tuples)." },
                { type: ContentType.PARAGRAPH, text: "بمرور الوقت، يمكن أن تتراكم هذه الصفوف الميتة، مما يؤدي إلى 'انتفاخ' الجداول والفهارس. الجدول المنتفخ يحتوي على الكثير من المساحة الفارغة، مما يجعل عمليات الفحص التسلسلي أبطأ ويستهلك مساحة قرص غير ضرورية." },
                { type: ContentType.HEADING4, text: "دراسة حالة: الكشف عن الانتفاخ وإصلاحه" },
                { type: ContentType.PARAGRAPH, text: "يمكنك استخدام استعلامات من ويكي PostgreSQL للتحقق من نسبة الانتفاخ. إليك نسخة مبسطة:" },
                { type: ContentType.CODE_BLOCK, language: "sql", code: `SELECT
  table_name,
  pg_size_pretty(pg_total_relation_size(quote_ident(table_name))) AS total_size,
  (100 * pg_total_relation_size(quote_ident(table_name)) / NULLIF(pg_relation_size(quote_ident(table_name)), 0) - 100) AS bloat_percentage
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY pg_total_relation_size(quote_ident(table_name)) DESC;` },
                { type: ContentType.PARAGRAPH, text: "إذا رأيت جداول ذات نسبة انتفاخ عالية (على سبيل المثال، > 20%)، فقد حان الوقت للصيانة." },
                { type: ContentType.HEADING4, text: "VACUUM: جامع القمامة" },
                { type: ContentType.PARAGRAPH, text: "الخبر السار هو أن PostgreSQL لديه عملية خلفية تسمى `autovacuum` تقوم بهذا تلقائيًا. في معظم الحالات، يقوم بعمل جيد. ومع ذلك، في الجداول ذات معدل التحديث/الحذف المرتفع جدًا، قد لا يتمكن من مواكبة ذلك. في هذه الحالات، قد تحتاج إلى تشغيل `VACUUM` يدويًا." },
                { type: ContentType.CODE_BLOCK, language: "sql", code: `-- استعادة المساحة وتحديث الإحصائيات (لا يؤدي إلى قفل الجدول)
VACUUM ANALYZE your_ bloated_table;

-- إعادة كتابة الجدول بالكامل لإزالة كل الانتفاخ (يؤدي إلى قفل حصري!)
VACUUM FULL your_bloated_table;` },
                { type: ContentType.HEADING4, text: "REINDEX: إعادة بناء الفهارس المنتفخة" },
                { type: ContentType.PARAGRAPH, text: "مثل الجداول، يمكن أن تصبح الفهارس أيضًا منتفخة. الأمر `REINDEX` يعيد بناء الفهرس من البداية." },
                { type: ContentType.CODE_BLOCK, language: "sql", code: `-- يتطلب قفلًا على الجدول
REINDEX TABLE my_table;` },
                { type: ContentType.NOTE, title: "الصيانة الوقائية", text: "بدلاً من الانتظار حتى تصبح الأمور بطيئة، من الجيد مراقبة الانتفاخ بشكل دوري وفهم الجداول الأكثر عرضة له في تطبيقك. ضبط إعدادات `autovacuum` بشكل أكثر قوة لهذه الجداول المحددة يمكن أن يمنع المشكلة قبل أن تبدأ." },
              ]
            },
            {
              id: "p7_c1_s4",
              icon: "⚙️",
              title: "المستوى 153: دراسة حالة: ضبط `postgresql.conf` لخادم 8GB RAM",
              content: [
                { type: ContentType.PARAGRAPH, text: "الإعدادات الافتراضية لـ PostgreSQL متحفظة للغاية. لكي تحصل على أقصى استفادة من أجهزتك، تحتاج إلى ضبط بعض المعلمات الرئيسية في ملف `/etc/postgresql/VERSION/main/postgresql.conf`." },
                { type: ContentType.HEADING4, text: "دراسة حالة: خادم ويب مخصص بـ 8GB RAM" },
                { type: ContentType.PARAGRAPH, text: "لنفترض أن لدينا خادمًا مخصصًا لتشغيل PostgreSQL بذاكرة وصول عشوائي 8 جيجابايت. إليك نقطة بداية جيدة للضبط:" },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "shared_buffers = 2GB", definition: "القاعدة العامة هي 25% من إجمالي ذاكرة الوصول العشوائي. هذا هو ذاكرة التخزين المؤقت الداخلية لـ PostgreSQL. زيادتها تعني أن المزيد من البيانات والفهارس يمكن الاحتفاظ بها في الذاكرة." },
                    { term: "effective_cache_size = 6GB", definition: "هذا يخبر المُحسِّن بمقدار الذاكرة المتاحة للتخزين المؤقت للقرص بواسطة نظام التشغيل. القاعدة العامة هي 75% من إجمالي ذاكرة الوصول العشوائي. هذا لا يخصص الذاكرة، بل يساعد المُحسِّن على اتخاذ قرارات أفضل حول ما إذا كان سيستخدم فحص الفهرس أم لا." },
                    { term: "work_mem = 16MB", definition: "هذا لكل عملية فرز. إذا كان لديك 100 اتصال، فقد يستهلك هذا 1.6 جيجابايت. ابدأ بقيمة صغيرة وزدها إذا كانت سجلاتك تظهر الكثير من 'ملفات الفرز المؤقتة'." },
                    { term: "maintenance_work_mem = 512MB", definition: "يستخدم لعمليات الصيانة مثل `VACUUM` و `CREATE INDEX`. تخصيص المزيد من الذاكرة هنا يمكن أن يسرع هذه العمليات بشكل كبير." },
                    { term: "log_min_duration_statement = 250", definition: "هذا لا يقدر بثمن. هذا الإعداد يسجل أي استعلام يستغرق أكثر من 250 مللي ثانية للتنفيذ. هذه هي أفضل طريقة للعثور على الاستعلامات البطيئة في تطبيقك." }
                ]},
                { type: ContentType.PARAGRAPH, text: "بعد حفظ هذه التغييرات، أعد تشغيل PostgreSQL:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo systemctl restart postgresql` },
                { type: ContentType.NOTE, title: "لا توجد صيغة سحرية", text: "الضبط يعتمد بشكل كبير على عبء العمل الخاص بك. أفضل طريقة هي استخدام أداة مثل `PGTune` للحصول على توصيات أولية، ثم مراقبة أداء نظامك، وفحص سجلاتك بحثًا عن الاستعلامات البطيئة، والضبط بمرور الوقت." },
              ]
            },
            {
              id: "p7_c1_s5",
              icon: "🔗",
              title: "المستوى 154: دراسة حالة: إعداد PgBouncer لتطبيق Node.js",
              content: [
                { type: ContentType.PARAGRAPH, text: "إنشاء اتصال جديد بقاعدة بيانات PostgreSQL هو عملية مكلفة. مجمع الاتصالات (Connection Pooler) مثل PgBouncer يحتفظ بمجموعة ('pool') من الاتصالات المفتوحة دائمًا، مما يقلل بشكل كبير من الحمل الزائد." },
                { type: ContentType.HEADING4, text: "الخطوة 1: تثبيت PgBouncer" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo apt install pgbouncer -y` },
                { type: ContentType.HEADING4, text: "الخطوة 2: تكوين `pgbouncer.ini`" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: "sudo nano /etc/pgbouncer/pgbouncer.ini" },
                { type: ContentType.CODE_EXPLANATION, language: "ini", codeTitle: "تعديلات على pgbouncer.ini", code: `[databases]
myappdb_pool = host=127.0.0.1 port=5432 dbname=myappdb

[pgbouncer]
listen_addr = 127.0.0.1
listen_port = 6432
auth_type = md5
auth_file = /etc/pgbouncer/userlist.txt
pool_mode = session
default_pool_size = 20
max_client_conn = 100`, explanations: [
                    { lines: "2", explanation: "نحدد 'قاعدة بيانات' وهمية جديدة. سيتصل تطبيقنا بـ `myappdb_pool`. PgBouncer سيقوم بعد ذلك بتوجيه هذا إلى قاعدة البيانات الحقيقية." },
                    { lines: "6-7", explanation: "نجعل PgBouncer يستمع على المنفذ 6432." },
                    { lines: "8-9", explanation: "نخبره باستخدام مصادقة كلمة المرور وقراءة كلمات المرور من `userlist.txt`." },
                    { lines: "10", explanation: "`pool_mode = session` هو الخيار الأكثر أمانًا لمعظم أطر عمل الويب." }
                ]},
                { type: ContentType.HEADING4, text: "الخطوة 3: إنشاء `userlist.txt`" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: "sudo nano /etc/pgbouncer/userlist.txt" },
                { type: ContentType.PARAGRAPH, text: "أضف المستخدم وكلمة المرور لتطبيقك:" },
                { type: ContentType.CODE_BLOCK, language: "text", code: `"myappuser" "a_very_secure_password_for_the_app"` },
                { type: ContentType.HEADING4, text: "الخطوة 4: بدء تشغيل PgBouncer وإعادة تشغيله" },
                { type: ContentType.PARAGRAPH, text: "قم بتعديل `/etc/default/pgbouncer` لتعيين `START=1`. ثم:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo systemctl restart pgbouncer` },
                { type: ContentType.HEADING4, text: "الخطوة 5: تحديث تطبيقك" },
                { type: ContentType.PARAGRAPH, text: "أخيرًا، قم بتغيير سلسلة اتصال تطبيق Node.js الخاص بك:" },
                { type: ContentType.CODE_BLOCK, language: "javascript", code: `// قبل
const connectionString = "postgres://myappuser:password@localhost:5432/myappdb";

// بعد
const connectionString = "postgres://myappuser:password@localhost:6432/myappdb_pool";` },
                { type: ContentType.PARAGRAPH, text: "لقد قمت الآن بتوجيه تطبيقك عبر مجمع الاتصالات، مما سيحسن بشكل كبير من أداء قاعدة البيانات تحت الحمل." },
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
              title: "المستوى 155: دراسة حالة: ترحيل قاعدة بيانات باستخدام `pg_dump`",
              content: [
                { type: ContentType.PARAGRAPH, text: "`pg_dump` هي أداة النسخ الاحتياطي المنطقي. إنها تنشئ ملفًا نصيًا يحتوي على أوامر SQL اللازمة لإعادة إنشاء قاعدة البيانات. هذا يجعلها مرنة بشكل لا يصدق." },
                { type: ContentType.HEADING4, text: "دراسة حالة: الترقية من خادم قديم إلى خادم جديد" },
                { type: ContentType.PARAGRAPH, text: "**السيناريو:** لديك قاعدة بيانات على خادم PostgreSQL 12 قديم وتريد ترحيلها إلى خادمك الجديد الذي يعمل بنظام PostgreSQL 14." },
                { type: ContentType.HEADING4, text: "الخطوة 1: على الخادم القديم، قم بإنشاء نسخة احتياطية" },
                { type: ContentType.PARAGRAPH, text: "التنسيق المخصص (`-Fc`) هو الأفضل لأنه مضغوط ويسمح بالاستعادة المتوازية." },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `pg_dump -U myappuser -h localhost -Fc myappdb > myappdb.dump` },
                { type: ContentType.HEADING4, text: "الخطوة 2: انقل ملف النسخ الاحتياطي" },
                { type: ContentType.PARAGRAPH, text: "استخدم `scp` لنسخ ملف `.dump` بأمان إلى خادمك الجديد." },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `scp myappdb.dump nagi@NEW_SERVER_IP:~/` },
                { type: ContentType.HEADING4, text: "الخطوة 3: على الخادم الجديد، قم بالاستعادة" },
                { type: ContentType.PARAGRAPH, text: "سنستخدم `pg_restore`، وهي الأداة المصاحبة لـ `pg_dump`." },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `# أولاً، قم بإنشاء قاعدة بيانات فارغة جديدة
createdb -U postgres myappdb_new

# الآن، قم بالاستعادة إلى قاعدة البيانات الجديدة
# -j 4 يستخدم 4 مهام متوازية لتسريع العملية
pg_restore -U postgres -d myappdb_new -j 4 myappdb.dump` },
                { type: ContentType.NOTE, title: "المرونة هي القوة", text: "هذا يوضح قوة النسخ الاحتياطي المنطقي. نظرًا لأنه مجرد مجموعة من أوامر SQL، فإنه لا يهتم بإصدار PostgreSQL الأساسي أو بنية نظام التشغيل، مما يجعله الأداة المثالية للترقيات والترحيل." },
              ]
            },
            {
              id: "p7_c2_s2",
              icon: "⏳",
              title: "المستوى 156: دليل عملي: إعداد الاسترداد في نقطة زمنية (PITR)",
              content: [
                { type: ContentType.PARAGRAPH, text: "الاسترداد في نقطة زمنية (PITR) يسمح لك باستعادة قاعدة بياناتك إلى *أي لحظة زمنية* منذ آخر نسخة احتياطية أساسية. إنه يعتمد على أرشفة سجلات الكتابة المسبقة (WALs)." },
                { type: ContentType.HEADING4, text: "الخطوة 1: تهيئة دليل الأرشيف" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo mkdir -p /var/lib/postgresql/wal_archive
sudo chown postgres:postgres /var/lib/postgresql/wal_archive` },
                { type: ContentType.HEADING4, text: "الخطوة 2: تكوين `postgresql.conf`" },
                { type: ContentType.CODE_EXPLANATION, language: "ini", codeTitle: "تعديلات على postgresql.conf", code: `wal_level = replica
archive_mode = on
archive_command = 'cp %p /var/lib/postgresql/wal_archive/%f'`, explanations: [
                    { lines: "1", explanation: "`wal_level = replica` يضمن كتابة معلومات كافية إلى WALs." },
                    { lines: "2", explanation: "يقوم بتشغيل وضع الأرشفة." },
                    { lines: "3", explanation: "هذا هو الأمر الذي سيقوم PostgreSQL بتشغيله لكل ملف WAL جاهز للأرشفة. `%p` هو المسار إلى الملف، و `%f` هو اسم الملف." }
                ]},
                { type: ContentType.HEADING4, text: "الخطوة 3: أعد تشغيل PostgreSQL وخذ نسخة احتياطية أساسية" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo systemctl restart postgresql
sudo -u postgres pg_basebackup -D /var/lib/postgresql/base_backup -Ft -z -P` },
                { type: ContentType.PARAGRAPH, text: "لديك الآن نسخة احتياطية أساسية وأرشفة WAL مستمرة. للاستعادة، ستقوم باستعادة النسخة الاحتياطية الأساسية وتكوين `restore_command` في `postgresql.conf` ليقرأ من دليل الأرشيف، وتحديد النقطة الزمنية التي تريدها باستخدام `recovery_target_time`." },
              ]
            },
            {
              id: "p7_c2_s3",
              icon: "🔁",
              title: "المستوى 157: دراسة حالة: إعداد خادم احتياطي ساخن (Hot Standby)",
              content: [
                { type: ContentType.PARAGRAPH, text: "التكرار المتدفق (Streaming Replication) ينشئ نسخة طبق الأصل من قاعدة بياناتك يمكن استخدامها لتجاوز الفشل (failover) أو لتوزيع حمل القراءة." },
                { type: ContentType.HEADING4, text: "على الخادم الرئيسي (Primary):" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "1. قم بتعديل `postgresql.conf` لتعيين `wal_level = replica` و `max_wal_senders` إلى قيمة أكبر من 0 (على سبيل المثال، 10).",
                    "2. قم بإنشاء مستخدم تكرار: `CREATE USER replicator REPLICATION LOGIN PASSWORD '...';`",
                    "3. أضف إدخالًا في `pg_hba.conf` للسماح لهذا المستخدم بالاتصال من عنوان IP للخادم النسخة الاحتياطية: `host replication replicator REPLICA_IP/32 scram-sha-256`",
                    "4. أعد تشغيل PostgreSQL."
                ]},
                { type: ContentType.HEADING4, text: "على الخادم النسخة الاحتياطية (Replica):" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "1. قم بإيقاف PostgreSQL إذا كان يعمل.",
                    "2. قم بإزالة دليل البيانات القديم: `sudo rm -rf /var/lib/postgresql/14/main`",
                    "3. استخدم `pg_basebackup` لنسخ البيانات من الخادم الرئيسي. الخيار `-R` مناسب لأنه يكتب تلقائيًا إعدادات الاتصال في دليل البيانات الجديد.",
                    "   `sudo -u postgres pg_basebackup -h PRIMARY_IP -U replicator -p 5432 -D /var/lib/postgresql/14/main -Fp -P -R`",
                    "4. قم بإنشاء ملف `standby.signal` في دليل البيانات الجديد: `sudo -u postgres touch /var/lib/postgresql/14/main/standby.signal`",
                    "5. ابدأ PostgreSQL. سيتحول إلى وضع الاسترداد ويبدأ في تلقي التغييرات من الخادم الرئيسي."
                ]},
              ]
            },
            {
              id: "p7_c2_s4",
              icon: "🤖",
              title: "المستوى 158: دراسة حالة: إعداد pgBackRest الأساسي",
              content: [
                { type: ContentType.PARAGRAPH, text: "pgBackRest هو أداة نسخ احتياطي واستعادة قوية وموثوقة لـ PostgreSQL. لنجرّب إعدادًا بسيطًا على خادم واحد." },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo apt install pgbackrest -y
sudo mkdir -p /var/lib/pgbackrest
sudo chmod 750 /var/lib/pgbackrest
sudo chown postgres:postgres /var/lib/pgbackrest` },
                { type: ContentType.HEADING4, text: "تكوين `pgbackrest.conf`" },
                { type: ContentType.CODE_BLOCK, language: "ini", codeTitle: "/etc/pgbackrest.conf", code: `[global]
repo1-path=/var/lib/pgbackrest
repo1-retention-full=2
start-fast=y

[main]
pg1-path=/var/lib/postgresql/14/main` },
                { type: ContentType.HEADING4, text: "تكوين `postgresql.conf`" },
                { type: ContentType.PARAGRAPH, text: "قم بتعيين `archive_command` ليستخدم pgBackRest:" },
                { type: ContentType.CODE_BLOCK, language: "ini", code: `archive_command = 'pgbackrest --stanza=main archive-push %p'` },
                { type: ContentType.HEADING4, text: "إنشاء الـ Stanza وأخذ نسخة احتياطية" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `# يجب تشغيله كمستخدم postgres
sudo -u postgres pgbackrest --stanza=main stanza-create
sudo -u postgres pgbackrest --stanza=main check
sudo -u postgres pgbackrest --stanza=main backup` },
                { type: ContentType.PARAGRAPH, text: "لقد قمت الآن بإعداد نظام نسخ احتياطي قوي يمكنه التعامل مع النسخ الاحتياطية الكاملة والتزايدية وأرشفة WAL." },
              ]
            },
            {
              id: "p7_c2_s5",
              icon: "🧪",
              title: "المستوى 159: دليل عملي: إجراء تدريب على التعافي من الكوارث",
              content: [
                { type: ContentType.PARAGRAPH, text: "النسخة الاحتياطية التي لم تختبر استعادتها ليست نسخة احتياطية. هذا دليل بسيط لإجراء تدريب على التعافي." },
                { type: ContentType.HEADING4, text: "السيناريو: لقد قمت بحذف جدول `users` عن طريق الخطأ." },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>1. لا داعي للذعر. قم بإيقاف التطبيق.</strong> هذا يمنع المزيد من الكتابة إلى قاعدة البيانات.",
                    "<strong>2. قم بإنشاء خادم مؤقت جديد.</strong> قم بتثبيت نفس إصدار PostgreSQL عليه.",
                    "<strong>3. قم باستعادة النسخة الاحتياطية.</strong> على الخادم الجديد، قم بتثبيت pgBackRest، وانسخ تكوينه، ثم قم بتشغيل `sudo -u postgres pgbackrest --stanza=main restore`.",
                    "<strong>4. التحقق من الصحة.</strong> ابدأ PostgreSQL على الخادم الجديد. اتصل به وتحقق من وجود جدول `users` وأن البيانات تبدو صحيحة.",
                    "<strong>5. خطط للتبديل.</strong> بمجرد أن تكون واثقًا، يمكنك تحديث سجلات DNS أو تكوين تطبيقك للإشارة إلى عنوان IP للخادم الجديد.",
                    "<strong>6. التوثيق.</strong> قم بتوثيق كل خطوة والمدة التي استغرقتها. سيساعدك هذا على تحسين عمليتك في المرة القادمة."
                ]},
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
              title: "المستوى 160: دراسة حالة: تكوين `pg_hba.conf` آمن",
              content: [
                { type: ContentType.PARAGRAPH, text: "ملف `pg_hba.conf` هو جدار الحماية الأساسي لـ PostgreSQL. لنقم ببناء تكوين آمن لتطبيق ويب وخادم تحليلات منفصل." },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "مثال على pg_hba.conf", code: `# TYPE  DATABASE        USER            ADDRESS                 METHOD
# ======================================================================
# أولاً، القواعد المحلية. هذه آمنة بشكل عام.
local   all             postgres                                peer
local   all             all                                     peer

# اسمح لخادم التطبيق بالاتصال بقاعدة بياناته عبر TCP/IP
# (افترض أن خادم التطبيق وخادم قاعدة البيانات على نفس الشبكة الخاصة)
host    myappdb         myappuser       10.0.1.10/32            scram-sha-256

# اسمح لمحلل البيانات بالاتصال بجميع قواعد البيانات، ولكن فقط للقراءة
# ويتطلب SSL.
hostssl all             analytics_user  10.0.2.20/32            scram-sha-256

# ارفض كل شيء آخر بشكل صريح. هذا ليس ضروريًا تمامًا ولكنه دفاع جيد في العمق.
host    all             all             0.0.0.0/0               reject
`, explanations: [
                    { lines: "7", explanation: "نحدد قاعدة صارمة جدًا: فقط المستخدم `myappuser` يمكنه الاتصال بقاعدة البيانات `myappdb` من عنوان IP `10.0.1.10`." },
                    { lines: "11", explanation: "هنا، نستخدم `hostssl` بدلاً من `host`. هذا يفرض على اتصال `analytics_user` أن يكون مشفرًا بـ SSL. إذا حاول الاتصال بدونه، فسيتم رفضه." },
                    { lines: "14", explanation: "وجود قاعدة `reject` في النهاية يضمن عدم السماح بأي اتصالات غير متوقعة." }
                ]},
              ]
            },
            {
              id: "p7_c3_s2",
              icon: "🔒",
              title: "المستوى 161: دليل عملي: تشفير الاتصالات باستخدام SSL/TLS",
              content: [
                { type: ContentType.PARAGRAPH, text: "للاتصالات الداخلية، غالبًا ما تكون الشهادة الموقعة ذاتيًا كافية وآمنة." },
                { type: ContentType.HEADING4, text: "الخطوة 1: إنشاء المفتاح والشهادة" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo openssl req -new -x509 -days 365 -nodes -text -out /etc/ssl/certs/pgsql.pem \\
  -keyout /etc/ssl/private/pgsql.key -subj "/CN=your_server_hostname"
sudo chmod 600 /etc/ssl/private/pgsql.key
sudo chown postgres:postgres /etc/ssl/private/pgsql.key /etc/ssl/certs/pgsql.pem` },
                { type: ContentType.HEADING4, text: "الخطوة 2: تكوين PostgreSQL" },
                { type: ContentType.PARAGRAPH, text: "في `postgresql.conf`:" },
                { type: ContentType.CODE_BLOCK, language: "ini", code: `ssl = on
ssl_cert_file = '/etc/ssl/certs/pgsql.pem'
ssl_key_file = '/etc/ssl/private/pgsql.key'` },
                { type: ContentType.PARAGRAPH, text: "لا تنس استخدام `hostssl` في `pg_hba.conf` وأعد تشغيل الخادم." },
                { type: ContentType.HEADING4, text: "الخطوة 3: الاتصال من العميل" },
                { type: ContentType.PARAGRAPH, text: "في سلسلة اتصال تطبيقك، قد تحتاج إلى إضافة `?ssl=true` أو معلمة مشابهة." },
              ]
            },
            {
              id: "p7_c3_s3",
              icon: "🔑",
              title: "المستوى 162: دراسة حالة: تشفير بيانات المستخدم الحساسة",
              content: [
                { type: ContentType.PARAGRAPH, text: "ملحق `pgcrypto` قوي جدًا. **السيناريو:** نريد تخزين رمز وصول API لجهة خارجية لمستخدمينا بشكل آمن." },
                { type: ContentType.PARAGRAPH, text: "المفتاح هو عدم تخزين مفتاح التشفير في قاعدة البيانات. بدلاً من ذلك، سنقوم بتخزينه كمتغير بيئة يتم تحميله بواسطة تطبيقنا. هذا يفصل بين البيانات والمفتاح." },
                { type: ContentType.CODE_BLOCK, language: "javascript", codeTitle: "مثال في Node.js", code: `const PGP_ENCRYPTION_KEY = process.env.PGP_ENCRYPTION_KEY;

async function saveApiToken(userId, token) {
  const query = 'UPDATE users SET api_token = pgp_sym_encrypt($1, $2) WHERE id = $3';
  await db.query(query, [token, PGP_ENCRYPTION_KEY, userId]);
}

async function getApiToken(userId) {
  const query = 'SELECT pgp_sym_decrypt(api_token::bytea, $1) AS decrypted_token FROM users WHERE id = $2';
  const result = await db.query(query, [PGP_ENCRYPTION_KEY, userId]);
  return result.rows[0].decrypted_token;
}` },
                { type: ContentType.PARAGRAPH, text: "بهذه الطريقة، حتى لو تم تسريب نسخة احتياطية من قاعدة البيانات، فإن رموز الوصول تظل مشفرة. لا يزال المهاجم بحاجة إلى اختراق خادم التطبيق للحصول على مفتاح فك التشفير." },
              ]
            },
            {
              id: "p7_c3_s4",
              icon: "👥",
              title: "المستوى 163: دراسة حالة: تنفيذ RLS لتطبيق SaaS",
              content: [
                { type: ContentType.PARAGRAPH, text: "الأمان على مستوى الصف (RLS) هو ميزة تغير قواعد اللعبة للتطبيقات متعددة المستأجرين. **السيناريو:** لدينا جدول `documents` واحد لجميع عملائنا، ويجب ألا يرى العميل `A` مستندات العميل `B` أبدًا." },
                { type: ContentType.HEADING4, text: "الخطوة 1: تمكين RLS على الجدول" },
                { type: ContentType.CODE_BLOCK, language: "sql", code: `ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents FORCE ROW LEVEL SECURITY; -- Also applies to the table owner` },
                { type: ContentType.HEADING4, text: "الخطوة 2: إنشاء السياسة" },
                { type: ContentType.CODE_BLOCK, language: "sql", code: `CREATE POLICY tenant_isolation_policy ON documents
FOR ALL -- Applies to SELECT, INSERT, UPDATE, DELETE
USING (tenant_id = current_setting('app.current_tenant_id'));` },
                { type: ContentType.HEADING4, text: "الخطوة 3: في Middleware التطبيق" },
                { type: ContentType.PARAGRAPH, text: "بعد مصادقة المستخدم وتحديد `tenant_id` الخاص به، قم بتشغيل هذا الاستعلام في بداية كل معاملة:" },
                { type: ContentType.CODE_BLOCK, language: "sql", code: `SET LOCAL app.current_tenant_id = 'the-user-tenant-id';` },
                { type: ContentType.PARAGRAPH, text: "الآن، كل استعلام لاحق في تلك المعاملة سيتم تصفيته تلقائيًا بواسطة PostgreSQL. هذا يزيل عبء إضافة `WHERE tenant_id = ?` إلى كل استعلام في الكود الخاص بك ويمنع الأخطاء العرضية." },
              ]
            },
            {
              id: "p7_c3_s5",
              icon: "📝",
              title: "المستوى 164: دليل عملي: إعداد pgAudit الأساسي",
              content: [
                { type: ContentType.PARAGRAPH, text: "pgAudit يوفر تسجيل تدقيق مفصل. هذا ضروري للامتثال والتحليل الجنائي." },
                { type: ContentType.HEADING4, text: "الخطوة 1: تعديل `postgresql.conf`" },
                { type: ContentType.CODE_BLOCK, language: "ini", code: `# يجب أن يتم تحميله مسبقًا
shared_preload_libraries = 'pgaudit'

# ما الذي يجب تسجيله؟
pgaudit.log = 'read, write, ddl' # Log SELECT, DML, and DDL statements` },
                { type: ContentType.HEADING4, text: "الخطوة 2: إنشاء الملحق وإعادة التشغيل" },
                { type: ContentType.CODE_BLOCK, language: "sql", code: `CREATE EXTENSION pgaudit;` },
                { type: ContentType.PARAGRAPH, text: "بعد إعادة تشغيل PostgreSQL، ستبدأ في رؤية سجلات تدقيق مفصلة في ملفات سجل PostgreSQL العادية. إليك مثال:" },
                { type: ContentType.PREFORMATTED_TEXT, text: `AUDIT: SESSION,1,1,READ,SELECT,,,"SELECT * FROM users WHERE id = 1",<not logged>` },
                { type: ContentType.PARAGRAPH, text: "يوفر هذا السجل معلومات كافية لإعادة بناء من فعل ماذا ومتى." },
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
              title: "المستوى 165: دليل عملي: تثبيت وتأمين Redis",
              content: [
                { type: ContentType.PARAGRAPH, text: "Redis هو مخزن بيانات في الذاكرة سريع بشكل لا يصدق. تثبيته وتأمينه أمران أساسيان قبل استخدامه." },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo apt install redis-server -y` },
                { type: ContentType.HEADING4, text: "الخطوة 1: تعديل `redis.conf`" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: "sudo nano /etc/redis/redis.conf" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "ابحث عن `supervised systemd` وقم بتعيينه (هذا يساعد Redis على الاندماج بشكل أفضل مع `systemd`).",
                    "تأكد من أن `bind 127.0.0.1 ::1` غير معلق. هذا يمنع الوصول عن بعد.",
                    "ابحث عن `# requirepass foobared`، قم بإلغاء التعليق عليه، وغيره إلى كلمة مرور قوية: `requirepass YOUR_STRONG_PASSWORD`."
                ]},
                { type: ContentType.HEADING4, text: "الخطوة 2: أعد تشغيل Redis واختبره" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo systemctl restart redis-server
redis-cli
> PING # Should fail
> AUTH YOUR_STRONG_PASSWORD
> PING # Should return PONG` },
              ]
            },
            {
              id: "p7_c4_s2",
              icon: "🧠",
              title: "المستوى 166: دراسة حالة: تنفيذ نمط Cache-Aside",
              content: [
                { type: ContentType.PARAGRAPH, text: "النمط الأكثر شيوعًا لاستخدام ذاكرة التخزين المؤقت هو 'cache-aside'." },
                { type: ContentType.CODE_BLOCK, language: "javascript", codeTitle: "مثال في Node.js", code: `const redisClient = require('./redisClient');
const dbClient = require('./dbClient');
const CACHE_EXPIRATION = 300; // 5 minutes

async function getUserProfile(userId) {
  const cacheKey = \`user:\${userId}:profile\`;

  // 1. تحقق من ذاكرة التخزين المؤقت أولاً
  const cachedData = await redisClient.get(cacheKey);
  if (cachedData) {
    console.log('Cache Hit!');
    return JSON.parse(cachedData);
  }

  // 2. خطأ ذاكرة التخزين المؤقت، اذهب إلى قاعدة البيانات
  console.log('Cache Miss!');
  const userData = await dbClient.query('SELECT * FROM users WHERE id = $1', [userId]);
  
  // 3. املأ ذاكرة التخزين المؤقت
  // SETEX يضبط المفتاح مع وقت انتهاء صلاحية (TTL)
  await redisClient.setEx(cacheKey, CACHE_EXPIRATION, JSON.stringify(userData.rows[0]));

  return userData.rows[0];
}` },
                { type: ContentType.NOTE, title: "مشكلة التدافع على ذاكرة التخزين المؤقت (Cache Stampede)", text: "ماذا يحدث إذا انتهت صلاحية مفتاح شائع فجأة؟ قد تذهب آلاف الطلبات المتزامنة إلى قاعدة البيانات في نفس الوقت. الحلول المتقدمة تتضمن استخدام قفل في Redis للسماح لعملية واحدة فقط بإعادة بناء ذاكرة التخزين المؤقت." },
              ]
            },
            {
              id: "p7_c4_s3",
              icon: "🍪",
              title: "المستوى 167: دراسة حالة: تخزين جلسات Express في Redis",
              content: [
                { type: ContentType.PARAGRAPH, text: "تخزين الجلسات في Redis ضروري للتطبيقات عديمة الحالة والقابلة للتطوير." },
                { type: ContentType.CODE_BLOCK, language: "javascript", codeTitle: "تكوين جلسة Express", code: `const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const { createClient } = require('redis');

const redisClient = createClient({ legacyMode: true, url: 'redis://:YOUR_STRONG_PASSWORD@127.0.0.1:6379' });
redisClient.connect().catch(console.error);

const app = express();

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: 'your-super-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true, httpOnly: true, maxAge: 86400000 } // 24 hours
  })
);` },
                { type: ContentType.PARAGRAPH, text: "الآن، سيتم تخزين جميع بيانات جلسة Express تلقائيًا في Redis. هذا يعني أنه يمكنك تشغيل نسخ متعددة من تطبيقك خلف موازن تحميل، وسيكون بإمكان أي نسخة الوصول إلى بيانات جلسة أي مستخدم." },
              ]
            },
            {
              id: "p7_c4_s4",
              icon: "⚡",
              title: "المستوى 168: التخزين المؤقت للاستعلامات: متى وكيف",
              content: [
                { type: ContentType.PARAGRAPH, text: "المرشحون المثاليون للتخزين المؤقت هم الاستعلامات التي:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "تستغرق وقتًا طويلاً للتنفيذ (مكلفة).",
                    "يتم تشغيلها بشكل متكرر.",
                    "لا تتغير بياناتها الأساسية كثيرًا (يمكن تحمل بعض البيانات القديمة)."
                ]},
                { type: ContentType.HEADING4, text: "دراسة حالة: تخزين مؤقت للوحة صدارة (Leaderboard)" },
                { type: ContentType.PARAGRAPH, text: "لنفترض أن لديك لوحة صدارة يتم تحديثها كل ساعة. يمكنك تشغيل الاستعلام المكلف مرة واحدة كل ساعة عبر `cron job`، وتخزين النتيجة (كسلسلة JSON) في مفتاح Redis واحد. ثم، يمكن لتطبيق الويب الخاص بك ببساطة قراءة هذا المفتاح مباشرة من Redis، دون لمس PostgreSQL على الإطلاق لمعظم الطلبات." },
              ]
            },
            {
              id: "p7_c4_s5",
              icon: "🗑️",
              title: "المستوى 169: اختيار سياسة الإخلاء الصحيحة",
              content: [
                { type: ContentType.PARAGRAPH, text: "عندما تمتلئ ذاكرة Redis، يجب أن يقرر كيفية إفساح المجال للبيانات الجديدة. يتم التحكم في هذا بواسطة سياسة الإخلاء في `redis.conf`." },
                { type: ContentType.HEADING4, text: "السياسات الرئيسية لحالات الاستخدام المختلفة:" },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "volatile-lru", definition: "**لحالات استخدام التخزين المؤقت.** يحذف المفتاح الأقل استخدامًا مؤخرًا من بين المفاتيح التي لها وقت انتهاء صلاحية (TTL). هذا هو الخيار الأفضل عندما تستخدم Redis كذاكرة تخزين مؤقت متسارعة لـ PostgreSQL." },
                    { term: "allkeys-lru", definition: "**عندما يكون Redis هو مخزن البيانات الأساسي الخاص بك.** يحذف المفتاح الأقل استخدامًا مؤخرًا من بين جميع المفاتيح." },
                    { term: "volatile-ttl", definition: "يحذف المفتاح الذي لديه أقصر وقت انتهاء صلاحية متبقٍ. مفيد عندما لا تهتم بأنماط الوصول." },
                    { term: "noeviction", definition: "لا تحذف أي شيء. ما عليك سوى إرجاع خطأ لأوامر الكتابة. مفيد عندما تريد التحكم الدقيق في الذاكرة." }
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
              title: "المستوى 170: دراسة حالة: كتالوج منتجات مرن مع MongoDB",
              content: [
                { type: ContentType.PARAGRAPH, text: "تتفوق قواعد البيانات الوثائقية مثل MongoDB عندما لا يكون لبياناتك بنية ثابتة. **السيناريو:** أنت تبني موقعًا للتجارة الإلكترونية يبيع كل شيء من الكتب إلى أجهزة الكمبيوتر المحمولة." },
                { type: ContentType.PARAGRAPH, text: "في SQL، ستحتاج إلى جدول `products` أساسي، ثم جداول منفصلة لكل نوع (`product_books`, `product_laptops`)، أو استخدام نمط EAV المعقد. في MongoDB، الأمر بسيط:" },
                { type: ContentType.CODE_BLOCK, language: "json", code: `// Document for a book in the 'products' collection
{
  "_id": "...",
  "name": "Learning SQL",
  "price": 29.99,
  "category": "book",
  "attributes": {
    "author": "Alan Beaulieu",
    "pages": 288
  }
}

// Document for a laptop in the SAME collection
{
  "_id": "...",
  "name": "SuperBook Pro",
  "price": 1299.99,
  "category": "laptop",
  "attributes": {
    "cpu": "M3 Pro",
    "ram_gb": 16,
    "screen_size_inch": 14
  }
}` },
              ]
            },
            {
              id: "p7_c5_s2",
              icon: "🕰️",
              title: "المستوى 171: دراسة حالة: مراقبة المقاييس مع InfluxDB",
              content: [
                { type: ContentType.PARAGRAPH, text: "قواعد البيانات الزمنية مصممة لاستيعاب كميات هائلة من البيانات ذات الطابع الزمني. **السيناريو:** نريد تسجيل استخدام وحدة المعالجة المركزية لخوادمنا كل 10 ثوانٍ." },
                { type: ContentType.PARAGRAPH, text: "البيانات في InfluxDB يتم كتابتها باستخدام بروتوكول الخط (Line Protocol):" },
                { type: ContentType.PREFORMATTED_TEXT, text: `cpu_usage,host=server1,region=us-west value=25.5 1678886400000000000` },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "cpu_usage", definition: "القياس (Measurement)." },
                    { term: "host, region", definition: "العلامات (Tags) - مفهرسة." },
                    { term: "value", definition: "الحقل (Field) - غير مفهرس." },
                    { term: "...", definition: "الطابع الزمني (Timestamp) بالنانو ثانية." }
                ]},
                { type: ContentType.PARAGRAPH, text: "هذا الهيكل يسمح باستعلامات سريعة للغاية على العلامات والفترات الزمنية، مثل 'أعطني متوسط استخدام وحدة المعالجة المركزية لجميع الخوادم في منطقة `us-west` خلال الساعة الماضية'." },
              ]
            },
            {
              id: "p7_c5_s3",
              icon: "🔍",
              title: "المستوى 172: دراسة حالة: بحث قوي للمدونة مع Elasticsearch",
              content: [
                { type: ContentType.PARAGRAPH, text: "تتفوق محركات البحث مثل Elasticsearch في البحث النصي الكامل. **السيناريو:** نريد إضافة ميزة بحث إلى مدونتنا تتعامل مع الأخطاء الإملائية وتصنف النتائج حسب الصلة." },
                { type: ContentType.PARAGRAPH, text: "عندما تقوم بفهرسة منشور مدونة، يقوم Elasticsearch بتحليله: يقسمه إلى كلمات (tokens)، ويحولها إلى أحرف صغيرة، ويزيل الكلمات الشائعة (stop words)، ويقوم بالتجذيع (stemming) (`running` -> `run`)." },
                { type: ContentType.PARAGRAPH, text: "عندما يبحث المستخدم عن 'runing fast' (مع خطأ إملائي)، يمكن لـ Elasticsearch:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "استخدام البحث الغامض (Fuzzy Search) لمطابقة 'runing' مع 'running'.",
                    "مطابقة 'fast' مع المستندات.",
                    "حساب درجة صلة (relevance score) لكل مستند وإرجاع أفضل النتائج أولاً."
                ]},
                { type: ContentType.PARAGRAPH, text: "تحقيق هذا المستوى من البحث باستخدام SQL وحده أمر صعب للغاية." },
              ]
            },
            {
              id: "p7_c5_s4",
              icon: "⚖️",
              title: "المستوى 173: متى تختار NoSQL على SQL؟",
              content: [
                { type: ContentType.PARAGRAPH, text: "القرار يعتمد على بياناتك وأنماط الوصول إليها." },
                { type: ContentType.PREFORMATTED_TEXT, text: `| الميزة          | SQL (PostgreSQL)                            | NoSQL (MongoDB)                               |
|------------------|---------------------------------------------|-----------------------------------------------|
| المخطط (Schema)  | صارم، محدد مسبقًا (Schema-on-Write)         | مرن، ديناميكي (Schema-on-Read)                 |
| قابلية التوسع     | عمودي (Vertical) بشكل أساسي                 | أفقي (Horizontal - Sharding) بشكل أساسي        |
| الاتساق         | قوي (ACID)                                 | قابل للضبط (BASE - Eventual Consistency)      |
| العلاقات        | من الدرجة الأولى (JOINs)                    | محدود (Denormalization, $lookup)              |
| أفضل لـ          | البيانات العلائقية، سلامة البيانات، الأنظمة المالية | بيانات غير منظمة، قابلية تطوير سريعة، Big Data |` },
              ]
            },
            {
              id: "p7_c5_s5",
              icon: "🧩",
              title: "المستوى 174: دراسة حالة: بنية المثابرة متعددة اللغات للتجارة الإلكترونية",
              content: [
                { type: ContentType.PARAGRAPH, text: "أفضل البنى الحديثة لا تختار قاعدة بيانات 'واحدة'. إنها تستخدم قاعدة البيانات المناسبة للمهمة المناسبة." },
                { type: ContentType.HEADING4, text: "بنية تطبيق تجارة إلكترونية:" },
                { type: ContentType.IMAGE_PLACEHOLDER, alt: "مخطط بنية يوضح استخدام قواعد بيانات متعددة", width: 800, height: 450 },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>PostgreSQL:</strong> كمصدر الحقيقة الأساسي. يخزن المستخدمين، والطلبات، والمدفوعات، والمخزون. أي شيء يتطلب ضمانات ACID قوية.",
                    "<strong>Elasticsearch:</strong> تتم مزامنة كتالوج المنتج من PostgreSQL إلى Elasticsearch. كل عمليات البحث والتصفية على الموقع تستخدم Elasticsearch لقوة البحث النصي الكامل.",
                    "<strong>Redis:</strong> يستخدم لتخزين عربات التسوق للمستخدمين غير المسجلين، وجلسات المستخدمين المسجلين، وتخزين نتائج الصفحات الشائعة مؤقتًا (مثل الصفحة الرئيسية).",
                    "<strong>InfluxDB:</strong> يتم إرسال جميع أحداث واجهة المستخدم (نقرات، مشاهدات الصفحة) ومقاييس أداء الواجهة الخلفية (أوقات استجابة واجهة برمجة التطبيقات) إلى InfluxDB للتحليل في الوقت الفعلي."
                ]},
              ]
            }
        ]
    },
  ]
};