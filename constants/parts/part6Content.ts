import { Part, ContentType } from '../../types';

export const part6Content: Part = {
  id: "p6",
  partTitle: "الباب السادس: الحاويات (Containerization)",
  icon: "🐳",
  chapters: [
    {
        id: "p6_c1", chapterTitle: "الفصل الأول: أساسيات Docker",
        sections: [
            {
              id: "p6_c1_s1",
              icon: "📦",
              title: "المستوى 125: ما هي الحاويات؟ Docker مقابل الآلات الافتراضية",
              content: [
                { type: ContentType.PARAGRAPH, text: "حتى هذه اللحظة، قمنا بتثبيت وإدارة تطبيقاتنا مباشرة على نظام التشغيل المضيف (Host OS). هذا النهج يعمل، لكنه يأتي مع تحديات كبيرة: 'جحيم الاعتماديات'، وصعوبة تكرار البيئات، ونقص العزل. لقد حل عالم الحوسبة هذه المشكلة منذ فترة طويلة من خلال مفهومين رئيسيين: الآلات الاftراضية (VMs) والحاويات (Containers)." },
                { type: ContentType.HEADING4, text: "الطريقة القديمة: الآلات الاftراضية (Virtual Machines - VMs)" },
                { type: ContentType.PARAGRAPH, text: "الآلة الاftراضية هي محاكاة كاملة لجهاز كمبيوتر. إنها تقوم بتشغيل نظام تشغيل ضيف (Guest OS) كامل خاص بها فوق نظام التشغيل المضيف، معزول بواسطة طبقة تسمى 'Hypervisor'. تخيل منزلك (الخادم المادي) وتقسيمه إلى عدة منازل مستقلة تمامًا (VMs). كل منزل لديه أساساته الخاصة (نواة نظام التشغيل)، وجدرانه، وأنابيبه، وكهربائه. هذا يوفر عزلًا قويًا جدًا، لكنه مكلف للغاية من حيث الموارد. كل VM تستهلك كمية كبيرة من الذاكرة العشوائية ومساحة القرص لنظام التشغيل الضيف الخاص بها، وتستغرق وقتًا طويلاً للبدء." },
                { type: ContentType.HEADING4, text: "الطريقة الحديثة: الحاويات (Containers)" },
                { type: ContentType.PARAGRAPH, text: "الحاوية تتبع نهجًا مختلفًا وأكثر كفاءة. بدلاً من محاكاة جهاز كمبيوتر كامل، تقوم الحاويات بعزل العمليات على مستوى نظام التشغيل. جميع الحاويات تعمل مباشرة فوق نواة نظام التشغيل المضيف وتشاركها. تخيل منزلك (الخادم) وتقسيمه إلى شقق (حاويات). تشترك جميع الشقق في نفس الأساس (نواة المضيف) والبنية التحتية الرئيسية للمبنى، لكن كل شقة لها جدرانها الخاصة، وبابها المقفل، ومساحتها الخاصة المعزولة. هذا يعني أن الحاويات خفيفة الوزن بشكل لا يصدق، وتبدأ في أجزاء من الثانية، وتستهلك موارد أقل بكثير من VMs." },
                { type: ContentType.IMAGE_PLACEHOLDER, alt: "مقارنة مرئية بين بنية الآلات الاftراضية والحاويات", width: 800, height: 450 },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "Docker", definition: "هو المنصة الرائدة لإنشاء وتشغيل وإدارة الحاويات. إنه يوفر الأدوات والنظام البيئي الذي جعل تكنولوجيا الحاويات سهلة الوصول وشائعة." },
                    { term: "الصورة (Image)", definition: "هي القالب أو المخطط. إنها حزمة خاملة وقابلة للتنفيذ تحتوي على كل ما يلزم لتشغيل التطبيق: الكود، وقت التشغيل (runtime)، المكتبات، متغيرات البيئة، وملفات التكوين. الصور مبنية من طبقات للقراءة فقط." },
                    { term: "الحاوية (Container)", definition: "هي نسخة قيد التشغيل من الصورة. إنها كائن (object) من فئة (class). يمكنك تشغيل العديد من الحاويات من نفس الصورة، كل منها معزول عن الآخر." }
                ]},
                { type: ContentType.NOTE, title: "المشكلة التي يحلها Docker: 'لكنه يعمل على جهازي!'", text: "الفائدة الأكبر للحاويات هي أنها تحل مشكلة 'لكنه يعمل على جهازي!' الكلاسيكية. نظرًا لأن الصورة تحتوي على كل شيء، من نظام التشغيل الأساسي إلى الاعتماديات الدقيقة، يمكنك أن تكون واثقًا بنسبة 100% من أن التطبيق الذي يعمل في حاوية على جهاز الكمبيوتر المحمول الخاص بك سيعمل بنفس الطريقة تمامًا في حاوية على خادم الإنتاج. إنها توفر قابلية نقل وتكرار غير مسبوقة." },
              ]
            },
            {
              id: "p6_c1_s2",
              icon: "🔧",
              title: "المستوى 126: تثبيت Docker Engine على أوبونتو",
              content: [
                { type: ContentType.PARAGRAPH, text: "تثبيت Docker على أوبونتو عملية مباشرة، ولكن من المهم اتباع التعليمات الرسمية لضمان حصولك على أحدث إصدار من مستودعات Docker الخاصة، وليس الإصدار الذي قد يكون قديمًا في مستودعات أوبونتو الافتراضية." },
                { type: ContentType.HEADING4, text: "الخطوات الكاملة للتثبيت" },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "تثبيت Docker Engine", code: `# 1. قم بإزالة أي إصدارات قديمة
sudo apt-get remove docker docker-engine docker.io containerd runc

# 2. قم بإعداد المستودع
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 3. قم بتثبيت Docker Engine
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin`, explanations: [
                    { lines: "2", explanation: "من الجيد دائمًا البدء ببيئة نظيفة عن طريق إزالة أي حزم Docker قديمة." },
                    { lines: "5-11", explanation: "هذه السلسلة من الأوامر تقوم بتكوين `apt` للثقة وتنزيل الحزم من مستودع Docker الرسمي. إنها تضيف مفتاح GPG الخاص بـ Docker وتنشئ ملف مصدر جديد." },
                    { lines: "14-15", explanation: "الآن بعد أن تم تكوين المستودع، نقوم بتثبيت أحدث الإصدارات من محرك Docker (`docker-ce`)، وواجهة سطر الأوامر (`docker-ce-cli`)، و `containerd` (وقت تشغيل الحاوية)، والمكونات الإضافية الحديثة مثل `buildx` و `docker-compose`." }
                ]},
                { type: ContentType.HEADING4, text: "الإدارة كغير جذري (Post-installation steps)" },
                { type: ContentType.PARAGRAPH, text: "بشكل افتراضي، لا يمكن تشغيل أوامر Docker إلا من قبل المستخدم `root`. هذا يعني أنه سيتعين عليك كتابة `sudo` قبل كل أمر. لإصلاح ذلك، يجب عليك إضافة المستخدم الخاص بك إلى مجموعة `docker`." },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "إضافة المستخدم إلى مجموعة Docker", code: `sudo groupadd docker # May already exist
sudo usermod -aG docker $USER
newgrp docker # Apply group changes to the current shell`, explanations: [
                    { lines: "2", explanation: "يضيف المستخدم الحالي (`$USER`) إلى مجموعة `docker`." },
                    { lines: "3", explanation: "لتطبيق تغييرات المجموعة دون الحاجة إلى تسجيل الخروج والعودة، يمكنك استخدام `newgrp`. ستحتاج إلى القيام بذلك مرة واحدة فقط في جلستك الحالية." }
                ]},
                { type: ContentType.HEADING4, text: "التحقق من التثبيت" },
                { type: ContentType.PARAGRAPH, text: "أخيرًا، تحقق من أن كل شيء يعمل عن طريق تشغيل حاوية 'hello-world' الشهيرة:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `docker run hello-world` },
                { type: ContentType.PARAGRAPH, text: "إذا رأيت رسالة ترحيب من Docker، فهذا يعني أن التثبيت الخاص بك ناجح وأنك جاهز لبدء استخدام الحاويات." },
              ]
            },
            {
              id: "p6_c1_s3",
              icon: "▶️",
              title: "المستوى 127: الأوامر الأساسية لـ Docker",
              content: [
                { type: ContentType.PARAGRAPH, text: "الآن بعد أن تم تثبيت Docker، حان الوقت لتعلم الأوامر الأساسية التي ستستخدمها كل يوم. هذه الأوامر هي لبنات البناء لإدارة دورة حياة الحاويات الخاصة بك." },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "docker run [OPTIONS] IMAGE [COMMAND]", definition: "هذا هو الأمر الأكثر أهمية. يقوم بإنشاء وتشغيل حاوية جديدة من صورة محددة. إذا لم تكن الصورة موجودة محليًا، فسيقوم بتنزيلها تلقائيًا من Docker Hub. مثال: `docker run -d -p 8080:80 --name my-nginx nginx`. `-d` (detached) يشغل الحاوية في الخلفية. `-p 8080:80` (publish) يربط المنفذ 8080 على المضيف بالمنفذ 80 في الحاوية. `--name` يعطي الحاوية اسمًا." },
                    { term: "docker ps", definition: "يسرد جميع الحاويات *قيد التشغيل*. استخدم `docker ps -a` لسرد *جميع* الحاويات، بما في ذلك تلك التي توقفت." },
                    { term: "docker stop [CONTAINER_ID or NAME]", definition: "يوقف حاوية قيد التشغيل بأمان عن طريق إرسال إشارة `SIGTERM`." },
                    { term: "docker start [CONTAINER_ID or NAME]", definition: "يبدأ حاوية متوقفة." },
                    { term: "docker rm [CONTAINER_ID or NAME]", definition: "يحذف حاوية متوقفة. لا يمكنك حذف حاوية قيد التشغيل. استخدم `docker rm -f` لفرض الحذف." },
                    { term: "docker logs [CONTAINER_ID or NAME]", definition: "يعرض المخرجات القياسية (logs) من حاوية. استخدم `docker logs -f` لمتابعة السجلات في الوقت الفعلي." },
                    { term: "docker exec -it [CONTAINER_ID or NAME] [COMMAND]", definition: "يشغل أمرًا *داخل* حاوية قيد التشغيل. `-it` (interactive tty) يسمح لك بفتح جلسة shell تفاعلية. مثال: `docker exec -it my-nginx /bin/bash`. هذا لا يقدر بثمن لتصحيح الأخطاء." },
                    { term: "docker images", definition: "يسرد جميع الصور الموجودة على جهازك المحلي." },
                    { term: "docker rmi [IMAGE_ID or NAME]", definition: "يحذف صورة من جهازك المحلي." }
                ]},
              ]
            },
            {
              id: "p6_c1_s4",
              icon: "📦",
              title: "المستوى 128: فهم الصور (Images) والحاويات (Containers)",
              content: [
                { type: ContentType.PARAGRAPH, text: "التباس مفهومي الصور والحاويات هو أمر شائع للمبتدئين. استخدام التشبيهات من البرمجة الشيئية يمكن أن يوضح الأمر بشكل كبير." },
                { type: ContentType.HEADING4, text: "الصورة (Image) هي الفئة (Class)" },
                { type: ContentType.PARAGRAPH, text: "الصورة هي مخطط ثابت للقراءة فقط. إنها تعريف لكل ما يحتاجه تطبيقك. مثل الفئة في لغة البرمجة، إنها لا تفعل شيئًا بمفردها؛ إنها مجرد مجموعة من التعليمات والملفات." },
                { type: ContentType.HEADING4, text: "الحاوية (Container) هي الكائن (Object)" },
                { type: ContentType.PARAGRAPH, text: "الحاوية هي نسخة قيد التشغيل من الصورة. إنها الكائن الذي تم إنشاؤه من الفئة. عندما تقوم بتشغيل `docker run`، فأنت تأخذ مخطط الصورة وتنشئ منه عملية حية ومعزولة. يمكنك إنشاء العديد من الحاويات (الكائنات) من نفس الصورة (الفئة)، كل منها له حالته الخاصة وذاكرته ونظام ملفاته." },
                { type: ContentType.HEADING4, text: "طبقات الصورة ونظام ملفات الحاوية" },
                { type: ContentType.PARAGRAPH, text: "الصور ليست ملفًا واحدًا كبيرًا. إنها مبنية من سلسلة من الطبقات للقراءة فقط. كل تعليمة في `Dockerfile` (مثل `RUN`, `COPY`) تنشئ طبقة جديدة. عندما تقوم بإنشاء حاوية، لا يقوم Docker بنسخ الصورة بأكملها. بدلاً من ذلك، فإنه يضع طبقة رقيقة للكتابة فوق طبقات الصورة. أي تغييرات تقوم بها داخل الحاوية (مثل إنشاء ملف) تتم كتابتها في هذه الطبقة القابلة للكتابة. هذا يجعل إنشاء الحاويات سريعًا وفعالاً للغاية في استخدام المساحة." },
              ]
            },
            {
              id: "p6_c1_s5",
              icon: "☁️",
              title: "المستوى 129: البحث عن الصور واستخدامها من Docker Hub",
              content: [
                { type: ContentType.PARAGRAPH, text: "Docker Hub هو السجل العام الافتراضي للحاويات، وهو يشبه GitHub للصور. يحتوي على ملايين الصور التي أنشأها المجتمع والموردون الرسميون. يمكنك العثور على صور لكل شيء تقريبًا، من قواعد البيانات (PostgreSQL, Redis) إلى خوادم الويب (Nginx) إلى لغات البرمجة (Node, Python)." },
                { type: ContentType.HEADING4, text: "البحث عن الصور وسحبها" },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "البحث والسحب", code: `# ابحث عن الصور المتعلقة بـ postgres
docker search postgres

# قم بتنزيل أحدث إصدار من الصورة الرسمية لـ postgres
docker pull postgres`, explanations: [
                    { lines: "2", explanation: "`docker search` يبحث في Docker Hub ويعرض قائمة بالصور المطابقة مع أوصافها." },
                    { lines: "5", explanation: "`docker pull` يقوم بتنزيل الصورة وطبقاتها إلى جهازك المحلي. `postgres` هو اختصار لـ `postgres:latest`." }
                ]},
                { type: ContentType.NOTE, title: "استخدم دائمًا الصور الرسمية", text: "عند البحث، سترى العديد من الصور. ابحث دائمًا عن العلامة 'Official Image'. هذه الصور تتم صيانتها من قبل المطورين الأصليين للبرنامج أو Docker، وهي مضمونة لتكون محدثة وآمنة ومبنية وفقًا لأفضل الممارسات." },
                { type: ContentType.HEADING4, text: "تشغيل حاوية PostgreSQL" },
                { type: ContentType.PARAGRAPH, text: "دعنا نستخدم الصورة التي قمنا بتنزيلها لتشغيل قاعدة بيانات PostgreSQL في حاوية. تتطلب معظم صور قواعد البيانات تمرير بعض متغيرات البيئة لتهيئتها." },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `docker run -d --name my-postgres \\
  -e POSTGRES_PASSWORD=mysecretpassword \\
  -p 5432:5432 \\
  postgres` },
                { type: ContentType.PARAGRAPH, text: "بأمر واحد، لديك الآن قاعدة بيانات PostgreSQL كاملة تعمل في بيئة معزولة. يمكنك الاتصال بها من تطبيقك أو أداة قاعدة البيانات الخاصة بك على `localhost:5432`. هذا يوضح قوة Docker في تبسيط إعداد البيئات المعقدة." },
              ]
            }
        ]
    },
    {
        id: "p6_c2", chapterTitle: "الفصل الثاني: بناء الصور مع Dockerfile",
        sections: [
            {
              id: "p6_c2_s1",
              icon: "📄",
              title: "المستوى 130: كتابة أول Dockerfile لتطبيق Node.js",
              content: [
                { type: ContentType.PARAGRAPH, text: "في حين أن استخدام الصور الجاهزة رائع، فإن القوة الحقيقية لـ Docker تأتي من القدرة على تغليف تطبيقاتك الخاصة. `Dockerfile` هو ملف نصي بسيط يحتوي على التعليمات خطوة بخطوة التي يحتاجها Docker لبناء صورتك المخصصة. إنه وصفة لتطبيقك." },
                { type: ContentType.HEADING4, text: "Dockerfile بسيط لتطبيق Express" },
                { type: ContentType.PARAGRAPH, text: "لنفترض أن لديك تطبيق Express بسيط مع `package.json` و `index.js`. إليك `Dockerfile` أساسي له:" },
                { type: ContentType.CODE_EXPLANATION, language: "dockerfile", codeTitle: "Dockerfile", code: `# استخدم صورة Node.js رسمية كقاعدة
FROM node:18-alpine

# قم بإنشاء وتعيين دليل العمل داخل الحاوية
WORKDIR /usr/src/app

# انسخ ملفات package.json و package-lock.json
COPY package*.json ./

# قم بتثبيت اعتماديات التطبيق
RUN npm ci --only=production

# انسخ بقية كود المصدر للتطبيق
COPY . .

# اكشف المنفذ الذي يعمل عليه التطبيق
EXPOSE 3000

# حدد الأمر لتشغيل التطبيق
CMD [ "node", "index.js" ]`, explanations: [
                    { lines: "2", explanation: "`FROM`: كل `Dockerfile` يجب أن يبدأ بـ `FROM`. إنه يحدد الصورة الأساسية التي ستبني عليها. `node:18-alpine` هي صورة رسمية ممتازة لأنها تستخدم توزيعة Alpine Linux الصغيرة جدًا." },
                    { lines: "5", explanation: "`WORKDIR`: يضبط دليل العمل لأي تعليمات `RUN`, `CMD`, `COPY` لاحقة. إذا لم يكن الدليل موجودًا، فسيتم إنشاؤه." },
                    { lines: "8", explanation: "`COPY`: ينسخ الملفات من نظامك المحلي إلى نظام ملفات الحاوية." },
                    { lines: "11", explanation: "`RUN`: يشغل أمرًا داخل الحاوية أثناء عملية البناء. نستخدمه هنا لتثبيت الاعتماديات." },
                    { lines: "14", explanation: "`COPY . .`: ننسخ الآن بقية الكود." },
                    { lines: "17", explanation: "`EXPOSE`: يوثق المنفذ الذي يستمع عليه التطبيق. لا يقوم فعليًا بنشر المنفذ." },
                    { lines: "20", explanation: "`CMD`: يوفر الأمر الافتراضي لتشغيل الحاوية. سيتم تشغيل هذا الأمر عندما تبدأ الحاوية." }
                ]},
                { type: ContentType.HEADING4, text: "بناء وتشغيل الصورة" },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "بناء وتشغيل", code: `# قم ببناء الصورة وقم بتمييزها (tag)
docker build -t my-node-app .

# قم بتشغيل حاوية من صورتك الجديدة
docker run -d -p 3000:3000 --name my-running-app my-node-app`, explanations: [
                    { lines: "2", explanation: "`docker build` هو أمر البناء. `-t` (tag) يسمح لك بإعطاء الصورة اسمًا. `.` يخبر Docker بالبحث عن `Dockerfile` في الدليل الحالي." },
                    { lines: "5", explanation: "نقوم بتشغيل حاوية من الصورة التي بنيناها للتو، ونقوم بنشر المنفذ 3000." }
                ]},
              ]
            },
            {
              id: "p6_c2_s2",
              icon: "🐍",
              title: "المستوى 131: كتابة Dockerfile لتطبيق Python",
              content: [
                { type: ContentType.PARAGRAPH, text: "النمط لبناء صورة تطبيق Python مشابه جدًا، مع بعض الاختلافات الطفيفة في كيفية تثبيت الاعتماديات وتشغيل التطبيق. سنستخدم Gunicorn لتشغيل تطبيق Flask الخاص بنا في الحاوية." },
                { type: ContentType.CODE_EXPLANATION, language: "dockerfile", codeTitle: "Dockerfile لتطبيق Flask", code: `# استخدم صورة Python رسمية نحيفة (slim)
FROM python:3.9-slim

# اضبط دليل العمل
WORKDIR /app

# انسخ ملف الاعتماديات
COPY requirements.txt .

# قم بتثبيت الاعتماديات
RUN pip install --no-cache-dir -r requirements.txt

# انسخ بقية كود المصدر
COPY . .

# اكشف المنفذ الذي سيعمل عليه Gunicorn
EXPOSE 5000

# شغّل التطبيق باستخدام Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]`, explanations: [
                    { lines: "2", explanation: "نبدأ بصورة Python رسمية. النسخة `slim` هي خيار جيد لأنها أصغر من النسخة الكاملة." },
                    { lines: "11", explanation: "نستخدم `pip` لتثبيت الاعتماديات من `requirements.txt`. `--no-cache-dir` يمنع pip من تخزين الحزم مؤقتًا، مما يساعد على الحفاظ على حجم الصورة صغيرًا." },
                    { lines: "20", explanation: "نستخدم Gunicorn كأمر `CMD` الخاص بنا. `--bind 0.0.0.0:5000` يخبر Gunicorn بالاستماع على جميع واجهات الشبكة داخل الحاوية على المنفذ 5000. هذا ضروري حتى يتمكن Docker من توجيه حركة المرور من المضيف." }
                ]},
              ]
            },
            {
              id: "p6_c2_s3",
              icon: "✨",
              title: "المستوى 132: أفضل الممارسات لكتابة Dockerfile",
              content: [
                { type: ContentType.PARAGRAPH, text: "كتابة `Dockerfile` يعمل أمر سهل. كتابة `Dockerfile` فعال وآمن وصغير يتطلب اتباع بعض أفضل الممارسات الرئيسية." },
                { type: ContentType.HEADING4, text: "1. الاستفادة من التخزين المؤقت للطبقات (Layer Caching)" },
                { type: ContentType.PARAGRAPH, text: "يقوم Docker ببناء الصور في طبقات، ويقوم بتخزين كل طبقة مؤقتًا. إذا لم يتغير شيء يؤثر على طبقة ما، فسيقوم Docker بإعادة استخدام النسخة المخبأة بدلاً من إعادة بنائها. للاستفادة من هذا، قم بترتيب تعليماتك من الأقل تغييرًا إلى الأكثر تغييرًا." },
                { type: ContentType.PARAGRAPH, text: "**سيء:**" },
                { type: ContentType.CODE_BLOCK, language: "dockerfile", code: `COPY . .
RUN npm install` },
                { type: ContentType.PARAGRAPH, text: "هنا، أي تغيير في أي ملف كود سيبطل ذاكرة التخزين المؤقت لطبقة `COPY` ويجبر `npm install` على العمل مرة أخرى، حتى لو لم تتغير الاعتماديات." },
                { type: ContentType.PARAGRAPH, text: "**جيد:**" },
                { type: ContentType.CODE_BLOCK, language: "dockerfile", code: `COPY package*.json ./
RUN npm ci
COPY . .` },
                { type: ContentType.PARAGRAPH, text: "هنا، `npm ci` سيعمل مرة أخرى فقط إذا تغير `package.json`. التغييرات في كود المصدر الخاص بك ستؤدي فقط إلى إبطال طبقة `COPY . .` الأخيرة، مما يجعل عمليات البناء أسرع بكثير." },
                { type: ContentType.HEADING4, text: "2. البناء متعدد المراحل (Multi-stage Builds)" },
                { type: ContentType.PARAGRAPH, text: "هذه هي أهم تقنية لإنشاء صور إنتاج صغيرة وآمنة. الفكرة هي استخدام مرحلة بناء واحدة تحتوي على جميع أدوات التطوير والاعتماديات اللازمة لبناء تطبيقك، ثم نسخ القطع الأثرية المبنية فقط إلى مرحلة إنتاج نهائية نظيفة." },
                { type: ContentType.CODE_EXPLANATION, language: "dockerfile", codeTitle: "Dockerfile متعدد المراحل لـ React", code: `# المرحلة 1: مرحلة البناء
FROM node:18 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# المرحلة 2: مرحلة الإنتاج
FROM nginx:1.25-alpine
# انسخ الأصول المبنية من مرحلة البناء
COPY --from=builder /app/build /usr/share/nginx/html
# انسخ تكوين Nginx المخصص (اختياري)
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`, explanations: [
                    { lines: "2", explanation: "نبدأ بصورة Node كاملة ونطلق عليها اسم `builder`." },
                    { lines: "7", explanation: "نقوم بتشغيل `npm run build`، الذي ينشئ مجلد `/app/build` بالملفات الثابتة المحسنة." },
                    { lines: "10", explanation: "نبدأ من جديد بصورة `nginx` صغيرة جدًا. لا شيء من مرحلة البناء (Node.js، `node_modules`) موجود هنا." },
                    { lines: "12", explanation: "هذا هو السحر. `COPY --from=builder` يسمح لنا بنسخ الملفات من مرحلة سابقة. ننسخ فقط المجلد المبني النهائي إلى دليل Nginx." },
                    { lines: "18", explanation: "النتيجة النهائية هي صورة صغيرة جدًا تحتوي فقط على Nginx والملفات الثابتة، بدون أي من فوضى بيئة البناء." }
                ]},
              ]
            },
            {
              id: "p6_c2_s4",
              icon: "겹",
              title: "المستوى 133: فهم وإدارة طبقات الصور",
              content: [
                { type: ContentType.PARAGRAPH, text: "كما ذكرنا، الصور مبنية من طبقات. فهم كيفية عمل هذه الطبقات يمكن أن يساعدك على تحسين صورك بشكل أكبر." },
                { type: ContentType.HEADING4, text: "عرض طبقات الصورة" },
                { type: ContentType.PARAGRAPH, text: "يمكنك فحص الطبقات التي تتكون منها الصورة باستخدام الأمر `docker history`:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `docker history my-node-app` },
                { type: ContentType.PARAGRAPH, text: "سيُظهر لك هذا كل طبقة، والأمر الذي أنشأها، وحجمها. ستلاحظ أن التعليمات مثل `RUN` يمكن أن تخلق طبقات كبيرة." },
                { type: ContentType.HEADING4, text: "تقليل عدد الطبقات" },
                { type: ContentType.PARAGRAPH, text: "في حين أن التخزين المؤقت للطبقات جيد، فإن وجود عدد كبير جدًا من الطبقات يمكن أن يبطئ الأمور قليلاً. يمكنك دمج أوامر `RUN` المتعددة في طبقة واحدة باستخدام `&&`." },
                { type: ContentType.CODE_BLOCK, language: "dockerfile", code: `# بدلاً من:
# RUN apt-get update
# RUN apt-get install -y curl

# افعل هذا:
RUN apt-get update && apt-get install -y curl \\
    && rm -rf /var/lib/apt/lists/*` },
                { type: ContentType.PARAGRAPH, text: "لاحظ `rm -rf /var/lib/apt/lists/*`. من المهم تنظيف أي ملفات مؤقتة تم إنشاؤها بواسطة أمر ما داخل نفس تعليمة `RUN`، وإلا فسيتم تضمينها في الطبقة إلى الأبد، حتى لو قمت بحذفها في طبقة لاحقة." },
              ]
            },
            {
              id: "p6_c2_s5",
              icon: "📤",
              title: "المستوى 134: نشر الصور إلى سجل خاص (Private Registry)",
              content: [
                { type: ContentType.PARAGRAPH, text: "Docker Hub رائع للصور العامة، ولكن بالنسبة لتطبيقاتك الخاصة، فأنت تريد سجلًا خاصًا (Private Registry). يوفر كل من GitHub و GitLab و Docker Hub وجميع مزودي الخدمات السحابية سجلات حاويات خاصة." },
                { type: ContentType.HEADING4, text: "سير عمل النشر" },
                { type: ContentType.PARAGRAPH, text: "باستخدام GitHub Container Registry (GHCR) كمثال:" },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "النشر إلى GHCR", code: `# 1. قم بتسجيل الدخول إلى سجل GitHub (تحتاج إلى رمز وصول شخصي)
echo "$CR_PAT" | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin

# 2. قم بتمييز صورتك بالاسم الصحيح
docker tag my-node-app:latest ghcr.io/YOUR_GITHUB_USERNAME/my-node-app:latest

# 3. قم بدفع الصورة
docker push ghcr.io/YOUR_GITHUB_USERNAME/my-node-app:latest`, explanations: [
                    { lines: "2", explanation: "نقوم بتسجيل الدخول إلى السجل. من أفضل الممارسات استخدام رمز وصول شخصي (Personal Access Token) وتمريره عبر `stdin` بدلاً من كتابة كلمة المرور في الطرفية." },
                    { lines: "5", explanation: "قبل أن تتمكن من دفع صورة، يجب عليك تمييزها بالاسم الكامل للسجل. التنسيق هو `REGISTRY_URL/USERNAME/IMAGE_NAME:TAG`." },
                    { lines: "8", explanation: "`docker push` يقوم بتحميل الصورة وطبقاتها إلى السجل الخاص. يمكن الآن سحبها على أي خادم لديه بيانات الاعتماد الصحيحة." }
                ]},
                { type: ContentType.NOTE, title: "التكامل مع CI/CD", text: "هذا هو المكان الذي يتألق فيه خط أنابيب CI/CD. يمكنك إضافة خطوة إلى سير عمل GitHub Actions الخاص بك تقوم ببناء الصورة، وتسجيل الدخول إلى GHCR باستخدام رمز مميز مؤقت، ودفع الصورة تلقائيًا بعد نجاح الاختبارات. هذا يؤتمت بالكامل عملية تسليم برامجك." }
              ]
            }
        ]
    },
    {
        id: "p6_c3", chapterTitle: "الفصل الثالث: إدارة التطبيقات متعددة الحاويات",
        sections: [
            {
              id: "p6_c3_s1",
              icon: "🧩",
              title: "المستوى 135: مقدمة إلى Docker Compose",
              content: [
                { type: ContentType.PARAGRAPH, text: "بينما نعمل على تطبيقات أكثر تعقيدًا، نادرًا ما نعمل مع حاوية واحدة. تطبيق ويب نموذجي قد يتطلب حاوية لتطبيق الويب نفسه، وحاوية لقاعدة البيانات، وربما حاوية لـ Nginx كوكيل عكسي. إدارة دورة حياة كل هذه الحاويات يدويًا باستخدام `docker run` و `docker stop` يصبح أمرًا مرهقًا بسرعة." },
                { type: ContentType.PARAGRAPH, text: "Docker Compose هي أداة لحل هذه المشكلة بالضبط. إنها تسمح لك بتعريف وإدارة تطبيقات Docker متعددة الحاويات في ملف YAML واحد. باستخدام أمر واحد، `docker-compose up`، يمكنك إنشاء وبدء جميع الخدمات في تكوينك. وبأمر واحد، `docker-compose down`، يمكنك إيقاف وحذف جميع الحاويات والشبكات المتعلقة." },
              ]
            },
            {
              id: "p6_c3_s2",
              icon: "📄",
              title: "المستوى 136: كتابة ملف docker-compose.yml لتطبيق ويب وقاعدة بيانات",
              content: [
                { type: ContentType.PARAGRAPH, text: "ملف `docker-compose.yml` هو قلب Docker Compose. لنقم بإنشاء ملف يحدد خدمة تطبيق Node.js (`web`) وخدمة قاعدة بيانات PostgreSQL (`db`)." },
                { type: ContentType.CODE_EXPLANATION, language: "yaml", codeTitle: "docker-compose.yml", code: `version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/usr/src/app
    environment:
      - DATABASE_URL=postgres://user:password@db:5432/mydb
    depends_on:
      - db

  db:
    image: postgres:14-alpine
    volumes:
      - db-data:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=mydb

volumes:
  db-data:`, explanations: [
                    { lines: "1", explanation: "يحدد إصدار صيغة ملف Compose." },
                    { lines: "3", explanation: "نبدأ في تعريف خدماتنا الفردية." },
                    { lines: "5", explanation: "`build: .` يخبر Compose ببناء صورة من `Dockerfile` في الدليل الحالي." },
                    { lines: "7", explanation: "ينشر المنفذ 3000 من الحاوية إلى المنفذ 3000 على المضيف." },
                    { lines: "9", explanation: "يربط الدليل الحالي على المضيف بالدليل داخل الحاوية، وهو أمر رائع للتطوير المباشر." },
                    { lines: "11", explanation: "يمرر متغيرات البيئة إلى الحاوية. لاحظ كيف يمكننا الإشارة إلى خدمة `db` باسم المضيف الخاص بها." },
                    { lines: "13", explanation: "`depends_on` يخبر Compose ببدء خدمة `db` قبل خدمة `web`." },
                    { lines: "16", explanation: "هنا نستخدم صورة PostgreSQL جاهزة من Docker Hub." },
                    { lines: "18", explanation: "نستخدم وحدة تخزين مسماة للحفاظ على بيانات قاعدة البيانات." },
                    { lines: "25", explanation: "نعلن عن وحدة التخزين المسماة الخاصة بنا." }
                ]},
              ]
            },
            {
              id: "p6_c3_s3",
              icon: "🕸️",
              title: "المستوى 137: فهم شبكات Docker Compose",
              content: [
                { type: ContentType.PARAGRAPH, text: "أحد أقوى جوانب Docker Compose هو كيفية تعامله مع الشبكات. عندما تقوم بتشغيل `docker-compose up`، فإنه يقوم تلقائيًا بإنشاء شبكة افتراضية مخصصة لتطبيقك ويربط جميع الحاويات المحددة في الملف بها." },
                { type: ContentType.HEADING4, text: "الاكتشاف القائم على DNS" },
                { type: ContentType.PARAGRAPH, text: "الأهم من ذلك، أن Docker لديه خادم DNS مدمج لهذه الشبكة. هذا يعني أن كل حاوية يمكنها العثور على أي حاوية أخرى والاتصال بها باستخدام اسم الخدمة الخاص بها كما هو محدد في ملف `docker-compose.yml`. هذا هو السبب في أن `DATABASE_URL` الخاص بنا يمكنه استخدام `db` كاسم مضيف: `postgres://user:password@db:5432/mydb`. تقوم الحاوية `web` بإجراء بحث DNS عن `db`، ويقوم Docker بحلها إلى عنوان IP الداخلي الصحيح للحاوية `db`. هذا يجعل التكوين قابلاً للنقل ومستقلاً عن عناوين IP الداخلية التي قد تتغير." },
              ]
            },
            {
              id: "p6_c3_s4",
              icon: "💾",
              title: "المستوى 138: إدارة البيانات مع Docker Volumes",
              content: [
                { type: ContentType.PARAGRAPH, text: "الحاويات سريعة الزوال. إذا قمت بحذف حاوية قاعدة البيانات (`docker rm my-postgres`)، فستفقد جميع بياناتك. Docker Volumes هي الآلية المفضلة للحفاظ على البيانات التي تم إنشاؤها بواسطة الحاويات." },
                { type: ContentType.HEADING4, text: "ما هي Volumes؟" },
                { type: ContentType.PARAGRAPH, text: "وحدة التخزين هي دليل خاص على الجهاز المضيف تتم إدارته بواسطة Docker. عندما تقوم بربط وحدة تخزين بحاوية (مثل ربط `db-data` بـ `/var/lib/postgresql/data`)، فإن أي شيء تكتبه الحاوية في هذا المسار يتم حفظه فعليًا في دليل وحدة التخزين على المضيف. الأهم من ذلك، أن دورة حياة وحدة التخزين منفصلة تمامًا عن دورة حياة الحاوية. يمكنك حذف الحاوية وترقيتها وإعادة إنشائها، وستظل وحدة التخزين موجودة. عندما تقوم بربط الحاوية الجديدة بنفس وحدة التخزين، فإنها ستلتقط جميع البيانات القديمة." },
              ]
            },
            {
              id: "p6_c3_s5",
              icon: "⚖️",
              title: "المستوى 139: توسيع نطاق الخدمات مع Docker Compose",
              content: [
                { type: ContentType.PARAGRAPH, text: "Docker Compose يجعل من السهل تشغيل نسخ متعددة من خدمة معينة (عادةً خدمة تطبيق الويب الخاصة بك) لتوزيع الحمل." },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "توسيع نطاق خدمة الويب", code: `docker-compose up -d --scale web=3`, explanations: [
                    { lines: "1", explanation: "هذا الأمر سيقوم ببدء خدمة `db` واحدة (كما هو محدد)، ولكن سيقوم ببدء ثلاث نسخ من خدمة `web`. سيتم تسميتهم تلقائيًا، على سبيل المثال `myproject_web_1`, `myproject_web_2`, `myproject_web_3`." }
                ]},
                { type: ContentType.PARAGRAPH, text: "لتوزيع حركة المرور بين هذه النسخ الثلاث، ستحتاج إلى وكيل عكسي مثل Nginx أو Traefik يجلس أمامها. ومع ذلك، فإن Docker Compose نفسه لا يوفر موازنة تحميل مدمجة للطلبات الواردة. هذا هو أحد المجالات التي يتألق فيها Kubernetes." },
              ]
            }
        ]
    },
    {
        id: "p6_c4", chapterTitle: "الفصل الرابع: مقدمة إلى Kubernetes",
        sections: [
            {
              id: "p6_c4_s1",
              icon: "🤔",
              title: "المستوى 140: لماذا Kubernetes؟ المشاكل التي يحلها",
              content: [
                { type: ContentType.PARAGRAPH, text: "Docker Compose رائع للتطوير المحلي ولعمليات النشر البسيطة على خادم واحد. ولكن عندما تبدأ في التفكير في الإنتاج على نطاق واسع، تظهر مجموعة جديدة من المشاكل:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>إدارة خوادم متعددة (Multi-node):</strong> كيف تدير الحاويات عبر أسطول من 5 أو 10 أو 100 خادم؟",
                    "<strong>التوافر العالي (High Availability):</strong> ماذا يحدث إذا تعطل خادم كامل؟ كيف تعيد تشغيل الحاويات التي كانت عليه تلقائيًا على خادم سليم آخر؟",
                    "<strong>التوسع الذكي (Intelligent Scaling):</strong> كيف يمكنك توسيع نطاق تطبيقك تلقائيًا لأعلى ولأسفل بناءً على استخدام وحدة المعالجة المركزية؟",
                    "<strong>اكتشاف الخدمات والشبكات:</strong> كيف يمكن للحاويات أن تكتشف بعضها البعض وتتواصل بشكل آمن عبر خوادم مختلفة؟"
                ]},
                { type: ContentType.PARAGRAPH, text: "Kubernetes (يُنطق Kube-r-net-ees، وغالبًا ما يختصر بـ K8s) هو نظام تنسيق حاويات (Container Orchestration) مفتوح المصدر تم إنشاؤه في الأصل بواسطة Google. وظيفته هي أتمتة نشر الحاويات وتوسيع نطاقها وإدارتها. إنه يحل المشاكل المذكورة أعلاه وأكثر من ذلك بكثير. فكر فيه كـ 'نظام تشغيل لمركز البيانات'." },
              ]
            },
            {
              id: "p6_c4_s2",
              icon: "🏗️",
              title: "المستوى 141: البنية الأساسية لـ Kubernetes",
              content: [
                { type: ContentType.PARAGRAPH, text: "Kubernetes لديه مجموعة من المفاهيم الأساسية التي تشكل لبنات البناء الخاصة به:" },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "الكتلة (Cluster)", definition: "مجموعة من الخوادم (تسمى العقد - Nodes) التي يديرها Kubernetes. تتكون من عقدة رئيسية واحدة على الأقل (Master Node) وعدة عقد عاملة (Worker Nodes)." },
                    { term: "العقدة (Node)", definition: "هي خادم (إما آلة افتراضية أو مادية) في الكتلة. العقد العاملة هي التي تقوم بتشغيل الحاويات الخاصة بك." },
                    { term: "الحجرة (Pod)", definition: "أصغر وحدة قابلة للنشر في Kubernetes. الحجرة هي غلاف حول حاوية واحدة أو أكثر. تشترك الحاويات داخل نفس الحجرة في نفس مساحة الشبكة ووحدات التخزين." },
                    { term: "النشر (Deployment)", definition: "يصف الحالة المرغوبة لتطبيقك. يخبر Kubernetes بالصورة التي يجب استخدامها وعدد النسخ (replicas) التي يجب تشغيلها. إذا فشلت حجرة، فإن وحدة التحكم في النشر (Deployment Controller) ستنشئ تلقائيًا حجرة جديدة لتحل محلها (الشفاء الذاتي - self-healing)." },
                    { term: "الخدمة (Service)", definition: "توفر نقطة نهاية شبكة ثابتة ومستقرة لمجموعة من الحجرات. نظرًا لأن الحجرات يمكن أن تموت وتُستبدل (وتحصل على عناوين IP جديدة)، فإن الخدمة توفر عنوان IP ثابتًا واسم DNS يمكن للتطبيقات الأخرى الاعتماد عليه للاتصال بالحجرات." }
                ]},
              ]
            },
            {
              id: "p6_c4_s3",
              icon: "💻",
              title: "المستوى 142: إعداد بيئة Kubernetes محلية (Minikube, Kind)",
              content: [
                { type: ContentType.PARAGRAPH, text: "إعداد كتلة Kubernetes كاملة للإنتاج أمر معقد. لحسن الحظ، هناك أدوات رائعة لإنشاء كتل Kubernetes بعقدة واحدة على جهازك المحلي للتطوير والتجربة." },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "Minikube", definition: "الأداة الكلاسيكية. تقوم بتشغيل كتلة K8s داخل آلة افتراضية على جهازك." },
                    { term: "Kind (Kubernetes in Docker)", definition: "نهج أحدث. يستخدم حاويات Docker كـ 'عقد' Kubernetes. إنه أسرع في البدء وأخف على الموارد." }
                ]},
                { type: ContentType.PARAGRAPH, text: "بالإضافة إلى أداة الكتلة، ستحتاج إلى `kubectl`، وهي أداة سطر الأوامر الرئيسية للتفاعل مع أي كتلة Kubernetes." },
              ]
            },
            {
              id: "p6_c4_s4",
              icon: "🚀",
              title: "المستوى 143: نشر أول تطبيق على Kubernetes باستخدام kubectl",
              content: [
                { type: ContentType.PARAGRAPH, text: "في Kubernetes، كل شيء يتم تعريفه بشكل تصريحي باستخدام ملفات YAML. أنت تصف 'ماذا' تريد، و Kubernetes يكتشف 'كيف' يجعله حقيقة." },
                { type: ContentType.HEADING4, text: "ملف النشر (deployment.yaml)" },
                { type: ContentType.CODE_BLOCK, language: "yaml", code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-nginx
  template:
    metadata:
      labels:
        app: my-nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.25
        ports:
        - containerPort: 80` },
                { type: ContentType.HEADING4, text: "ملف الخدمة (service.yaml)" },
                { type: ContentType.CODE_BLOCK, language: "yaml", code: `apiVersion: v1
kind: Service
metadata:
  name: my-nginx-service
spec:
  selector:
    app: my-nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: LoadBalancer` },
                { type: ContentType.PARAGRAPH, text: "لتطبيق هذه، تقوم بتشغيل:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `kubectl apply -f deployment.yaml
kubectl apply -f service.yaml` },
              ]
            },
            {
              id: "p6_c4_s5",
              icon: "🔎",
              title: "المستوى 144: فحص وإدارة الموارد في Kubernetes",
              content: [
                { type: ContentType.PARAGRAPH, text: "`kubectl` هي سكين الجيش السويسري الخاص بك للتفاعل مع الكتلة." },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "kubectl get pods", definition: "يسرد جميع الحجرات قيد التشغيل. يجب أن ترى 3 حجرات nginx." },
                    { term: "kubectl get services", definition: "يسرد جميع الخدمات. ابحث عن `my-nginx-service` وعنوان IP الخارجي الخاص به." },
                    { term: "kubectl describe pod <pod-name>", definition: "يعطي معلومات مفصلة للغاية حول حجرة معينة، بما في ذلك الأحداث، وهو أمر رائع لتصحيح الأخطاء." },
                    { term: "kubectl logs <pod-name>", definition: "يعرض سجلات حاوية داخل حجرة." },
                    { term: "kubectl delete -f deployment.yaml", definition: "يحذف الموارد التي تم إنشاؤها بواسطة ملف." }
                ]},
              ]
            }
        ]
    },
    {
        id: "p6_c5", chapterTitle: "الفصل الخامس: أمان الحاويات",
        sections: [
            {
              id: "p6_c5_s1",
              icon: "🛡️",
              title: "المستوى 145: أفضل ممارسات أمان Dockerfile",
              content: [
                { type: ContentType.PARAGRAPH, text: "يبدأ أمان الحاويات بـ `Dockerfile` الخاص بك. بناء صورة آمنة يقلل بشكل كبير من سطح الهجوم لتطبيقك." },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>استخدم صورًا أساسية صغيرة وموثوقة:</strong> ابدأ دائمًا بصورة رسمية. صور `alpine` أو `slim` ممتازة لأنها تحتوي على عدد أقل من الحزم، مما يعني عددًا أقل من الثغرات المحتملة.",
                    "<strong>لا تقم بتشغيل العمليات كـ `root`:</strong> هذه هي القاعدة الأكثر أهمية. بشكل افتراضي، تعمل العمليات داخل الحاوية كمستخدم `root`. إذا تمكن المهاجم من الهروب من الحاوية، فسيكون لديه وصول `root` إلى المضيف. استخدم دائمًا تعليمة `USER` للتبديل إلى مستخدم غير مميز.",
                    "<strong>استخدم البناء متعدد المراحل:</strong> كما تعلمنا، هذا يضمن أن صورة الإنتاج النهائية لا تحتوي على أي أدوات بناء أو اعتماديات تطوير أو كود مصدر.",
                    "<strong>لا تقم بتضمين الأسرار:</strong> لا تقم أبدًا بنسخ مفاتيح API أو كلمات المرور أو مفاتيح SSH الخاصة إلى صورتك."
                ]},
              ]
            },
            {
              id: "p6_c5_s2",
              icon: "🔍",
              title: "المستوى 146: فحص الصور بحثًا عن الثغرات باستخدام Trivy",
              content: [
                { type: ContentType.PARAGRAPH, text: "حتى عند استخدام الصور الأساسية الرسمية، قد تحتوي الحزم التي تثبتها على ثغرات أمنية معروفة (CVEs). أدوات فحص الصور تقوم بتحليل طبقات صورتك ومقارنة قائمة الحزم بقواعد بيانات الثغرات." },
                { type: ContentType.PARAGRAPH, text: "Trivy هي أداة فحص ثغرات مفتوحة المصدر وشائعة وسهلة الاستخدام." },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "فحص صورة باستخدام Trivy", code: `# قم بتثبيت Trivy ...
# افحص صورة
trivy image my-app:latest`, explanations: [
                    { lines: "3", explanation: "سيقوم Trivy بتنزيل قاعدة بيانات الثغرات وفحص الصورة. سيعطيك تقريرًا مفصلاً عن أي ثغرات تم العثور عليها، وشدتها، والإصدار الذي تم فيه إصلاحها." }
                ]},
                { type: ContentType.PARAGRAPH, text: "يجب أن يكون فحص الصور خطوة إلزامية في خط أنابيب CI/CD الخاص بك. يمكنك تكوين خط الأنابيب ليفشل إذا تم العثور على أي ثغرات حرجة." },
              ]
            },
            {
              id: "p6_c5_s3",
              icon: "👤",
              title: "المستوى 147: تشغيل الحاويات كمستخدم غير جذري",
              content: [
                { type: ContentType.PARAGRAPH, text: "دعنا نتعمق في كيفية تنفيذ التشغيل كمستخدم غير جذري في `Dockerfile`." },
                { type: ContentType.CODE_EXPLANATION, language: "dockerfile", codeTitle: "Dockerfile مع مستخدم غير جذري", code: `FROM node:18-alpine

# قم بإنشاء مستخدم ومجموعة نظام مخصصين
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production

COPY . .

# قم بتغيير ملكية ملفات التطبيق
RUN chown -R appuser:appgroup /usr/src/app

# بدّل إلى المستخدم غير الجذري
USER appuser

EXPOSE 3000
CMD [ "node", "index.js" ]`, explanations: [
                    { lines: "4", explanation: "نقوم بإنشاء مجموعة ومستخدم نظام جديدين (`-S`)." },
                    { lines: "13", explanation: "بعد نسخ ملفاتنا، نقوم بتغيير ملكيتها إلى المستخدم الجديد." },
                    { lines: "16", explanation: "هذه هي الخطوة الحاسمة. أي تعليمات لاحقة (`CMD`, `ENTRYPOINT`) سيتم تشغيلها كمستخدم `appuser`، وليس `root`." }
                ]},
              ]
            },
            {
              id: "p6_c5_s4",
              icon: "🛡️",
              title: "المستوى 148: فهم سياقات الأمان في Kubernetes",
              content: [
                { type: ContentType.PARAGRAPH, text: "يوفر Kubernetes آليات قوية لفرض قيود الأمان على الحجرات والحاويات على مستوى الكتلة. `SecurityContext` هو حقل في ملف YAML الخاص بالنشر أو الحجرة يسمح لك بتحديد إعدادات الامتيازات والتحكم في الوصول." },
                { type: ContentType.CODE_BLOCK, language: "yaml", code: `apiVersion: v1
kind: Pod
metadata:
  name: security-context-demo
spec:
  securityContext:
    runAsUser: 1000
    runAsGroup: 3000
    fsGroup: 2000
  containers:
  - name: sec-ctx-demo
    image: busybox
    securityContext:
      runAsNonRoot: true
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
      capabilities:
        drop:
        - "ALL"
` },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "runAsUser / runAsGroup", definition: "يفرض تشغيل العمليات داخل الحاوية بمعرف مستخدم ومجموعة محددين." },
                    { term: "runAsNonRoot: true", definition: "يمنع بدء الحاوية إذا كانت ستحاول العمل كـ `root`." },
                    { term: "allowPrivilegeEscalation: false", definition: "يمنع العملية من اكتساب امتيازات أكثر من عمليتها الأم." },
                    { term: "readOnlyRootFilesystem: true", definition: "يجعل نظام ملفات الحاوية للقراءة فقط، وهي ممارسة أمان ممتازة." }
                ]},
              ]
            },
            {
              id: "p6_c5_s5",
              icon: "🌐",
              title: "المستوى 149: مقدمة إلى سياسات شبكة Kubernetes",
              content: [
                { type: ContentType.PARAGRAPH, text: "بشكل افتراضي، في Kubernetes، تكون الشبكة 'مسطحة'. يمكن لأي حجرة التحدث مع أي حجرة أخرى. هذا ليس مثاليًا للأمان. سياسات الشبكة (Network Policies) هي مثل جدار حماية للحجرات. إنها تسمح لك بتحديد قواعد دقيقة حول حركة المرور المسموح بها من وإلى الحجرات." },
                { type: ContentType.PARAGRAPH, text: "على سبيل المثال، يمكنك إنشاء سياسة تقول: 'اسمح فقط للحجرات التي تحمل التسمية `app=frontend` بالاتصال بالحجرات التي تحمل التسمية `app=backend` على المنفذ 5000'." },
                {
                  type: ContentType.CODE_BLOCK, language: "yaml", code: `apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: backend-policy
spec:
  podSelector:
    matchLabels:
      app: backend
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
    ports:
    - protocol: TCP
      port: 5000`
                },
                { type: ContentType.PARAGRAPH, text: "سياسات الشبكة ضرورية لتنفيذ مبدأ 'أقل الامتيازات' على مستوى الشبكة وإنشاء بنية تحتية آمنة بتجزئة دقيقة." },
              ]
            }
        ]
    }
  ]
};
