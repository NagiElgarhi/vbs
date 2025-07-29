import { Part, ContentType } from '../../types';

export const part3Content: Part = {
  id: "p3",
  partTitle: "الباب الثالث: الأتمتة والتوزيع المستمر (CI/CD)",
  icon: "🔁",
  chapters: [
    {
        id: "p3_c1", chapterTitle: "الفصل الحادي عشر: إدارة الكود ونشره",
        sections: [
            {
              id: "p3_c1_s1",
              icon: "🔧",
              title: "المستوى 50: مقدمة إلى Git لإدارة الخادم",
              content: [
                { type: ContentType.PARAGRAPH, text: "حتى الآن، تعاملنا مع الخادم كنظام مستقل نعدل فيه الملفات مباشرة. لكن في العالم الحقيقي، الكود الذي يتم تشغيله على الخادم يأتي من مكان آخر: نظام التحكم في الإصدار (Version Control System). Git هو المعيار الفعلي لهذا الغرض. قد تفكر في Git كأداة للمطورين فقط، لتتبع التغييرات في الكود والتعاون. لكن في الحقيقة، هو أيضًا أداة قوية بشكل لا يصدق لإدارة ونشر التطبيقات على الخادم." },
                { type: ContentType.HEADING4, text: "دراسة حالة: من فوضى FTP إلى نظام Git المنظم" },
                { type: ContentType.PARAGRAPH, text: "تخيل الطريقة القديمة لنشر الكود: تقوم بضغط ملفات مشروعك، ثم تستخدم FTP أو SCP لرفعها إلى الخادم، ثم تقوم بفك ضغطها في المكان الصحيح. هذه العملية بطيئة، عرضة للخطأ، ولا يوجد سجل واضح لما تم تغييره. إذا حدث خطأ، فإن التراجع عنه يتطلب رفع النسخة القديمة مرة أخرى. مع Git، تتحول هذه الفوضى إلى عملية منظمة وموثوقة. كل عملية نشر هي مجرد 'سحب' (pull) لآخر التغييرات. كل تغيير يتم تسجيله، والتراجع عن نشر خاطئ هو ببساطة العودة إلى الالتزام (commit) السابق." },
                { type: ContentType.PARAGRAPH, text: "في هذا الفصل، سنقوم بتحويل سير عمل النشر لدينا. سننتقل من التعديل اليدوي على الخادم إلى نموذج احترافي حيث يكون مستودع Git (مثل GitHub أو GitLab) هو 'مصدر الحقيقة'. يقوم المطورون بالدفع إلى المستودع المركزي، ويقوم الخادم بسحب التحديثات من هذا المستودع. في النهاية، سنقوم بأتمتة هذه العملية بالكامل بحيث يصبح أمر `git push` البسيط من جهاز المطور هو كل ما يلزم لتشغيل عملية نشر كاملة وآمنة." },
                { type: ContentType.NOTE, title: "الهدف النهائي: النشر كحدث ممل", text: "الهدف هو تحويل النشر من حدث مرهق ومحفوف بالمخاطر إلى عملية روتينية ومملة وغير مؤلمة. استخدام Git بشكل صحيح على الخادم هو الخطوة الأولى والأساسية لتحقيق هذا الهدف. إنه يضع أساسًا للثقة والتكرار والأتمتة التي سنبني عليها في الفصول القادمة." },
              ]
            },
            {
              id: "p3_c1_s2",
              icon: "🏗️",
              title: "المستوى 51: ورشة عمل: إعداد مستودع Git مركزي (Bare Repository)",
              content: [
                { type: ContentType.PARAGRAPH, text: "قبل أن نتمكن من النشر باستخدام Git، نحتاج إلى مكان مركزي على خادمنا لـ 'دفع' (push) الكود إليه. يمكننا استخدام GitHub أو GitLab، ولكن لإعداد سير عمل بسيط وآمن بالكامل داخل بنيتنا التحتية، سنقوم بإنشاء مستودع Git خاص بنا على الخادم. هذا يشبه إنشاء 'GitHub صغير' خاص بك. للقيام بذلك، نستخدم مفهوم 'المستودع الفارغ' (Bare Repository)." },
                { type: ContentType.HEADING4, text: "كشف الخبايا: المستودع الفارغ مقابل المستودع العادي" },
                { type: ContentType.PARAGRAPH, text: "المستودع العادي الذي تستخدمه على جهازك يحتوي على شيئين: دليل `.git` الذي يخزن كل تاريخ المشروع، و 'شجرة العمل' (Working Tree) وهي الملفات الفعلية التي يمكنك رؤيتها وتعديلها. المستودع الفارغ، من ناحية أخرى، يحتوي فقط على دليل `.git`. لا توجد شجرة عمل. لا يمكنك `cd` إليه وتعديل الملفات. غرضه الوحيد هو العمل كنقطة نهاية بعيدة (remote) لتلقي الدفعات (pushes) من المطورين. هذا يمنع أي شخص من تعديل الكود مباشرة على الخادم المركزي، مما يجعله مثاليًا كنقطة مركزية آمنة." },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "إنشاء مستودع فارغ", code: `sudo mkdir -p /var/repo/my-app.git
sudo chown nagi:nagi /var/repo/my-app.git
cd /var/repo/my-app.git
git init --bare`, explanations: [
                    { lines: "1", explanation: "نقوم بإنشاء دليل لتخزين مستودعاتنا. من الممارسات الجيدة وضعها في `/var/repo`. اسم الدليل يجب أن ينتهي بـ `.git` للإشارة إلى أنه فارغ." },
                    { lines: "2", explanation: "نقوم بتغيير ملكية الدليل إلى مستخدمنا غير الجذري لضمان أننا نستطيع الكتابة إليه دون `sudo`." },
                    { lines: "3-4", explanation: "ندخل إلى الدليل ونقوم بتهيئة مستودع Git فارغ. سترى مخرجات مثل `Initialized empty Git repository in /var/repo/my-app.git/`." }
                ]},
                { type: ContentType.HEADING4, text: "ورشة عمل: ربط جهازك المحلي بالخادم" },
                { type: ContentType.PARAGRAPH, text: "الآن، من جهاز الكمبيوتر المحلي الخاص بك (داخل دليل مشروعك)، تحتاج إلى إخبار Git بوجود هذا المستودع البعيد الجديد:" },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "إضافة Remote جديد (على جهازك المحلي)", code: `git remote add production ssh://nagi@YOUR_SERVER_IP/var/repo/my-app.git
git push production main`, explanations: [
                    { lines: "1", explanation: "نضيف remote جديدًا نسميه `production`. العنوان يستخدم بروتوكول SSH للإشارة إلى المسار المطلق للمستودع الفارغ الذي أنشأناه على الخادم." },
                    { lines: "2", explanation: "نقوم بدفع فرع `main` المحلي إلى الـ remote الجديد `production`. هذا ينقل كل كودك وتاريخه إلى المستودع المركزي على الخادم." }
                ]},
                { type: ContentType.NOTE, title: "سر المحترفين: المصادقة بمفتاح SSH ضرورية", text: "لكي يعمل هذا بسلاسة وبشكل آمن، يجب أن تكون قد قمت بالفعل بإعداد مصادقة مفتاح SSH للوصول إلى خادمك (كما فعلنا في الباب الأول). هذا يسمح لـ Git بالاتصال بشكل آمن دون مطالبتك بكلمة مرور في كل مرة تقوم فيها بالدفع. هذا ليس مجرد راحة، بل هو مطلب أمني أساسي لسير عمل النشر الآلي." },
              ]
            },
            {
              id: "p3_c1_s3",
              icon: "🚚",
              title: "المستوى 52: استراتيجيات النشر: استنساخ مقابل سحب",
              content: [
                { type: ContentType.PARAGRAPH, text: "لدينا الآن الكود الخاص بنا في مستودع مركزي فارغ على الخادم. لكن هذا ليس المكان الذي سيتم فيه تشغيل التطبيق. نحتاج إلى 'استنساخ' (clone) هذا المستودع في دليل حي (live directory) - المكان الذي قمنا بتكوين Nginx للإشارة إليه، مثل `/var/www/my-app`. هذا الاستنساخ سيحتوي على شجرة عمل فعلية." },
                { type: ContentType.HEADING4, text: "الاستنساخ الأولي (مرة واحدة فقط)" },
                { type: ContentType.PARAGRAPH, text: "على الخادم، سنقوم بإنشاء نسخة عمل من مستودعنا الفارغ:" },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "استنساخ المستودع إلى الدليل الحي", code: `sudo git clone /var/repo/my-app.git /var/www/my-app
sudo chown -R nagi:nagi /var/www/my-app`, explanations: [
                    { lines: "1", explanation: "نستخدم `git clone` ونشير إلى المسار المحلي للمستودع الفارغ كـ 'مصدر'. الوجهة هي دليلنا الحي. هذا ينشئ نسخة كاملة من الكود في `/var/www/my-app`." },
                    { lines: "2", explanation: "كما هو الحال دائمًا، نضبط الأذونات بحيث يتمكن مستخدمنا العادي من إدارة هذا الدليل." }
                ]},
                { type: ContentType.HEADING4, text: "ورشة عمل: سير عمل النشر اليدوي" },
                { type: ContentType.PARAGRAPH, text: "الآن، لنفترض أنك قمت بإجراء بعض التغييرات على جهازك المحلي ودفعتها إلى الخادم (`git push production main`). هذه التغييرات موجودة الآن في المستودع الفارغ، ولكن ليس بعد في الدليل الحي. لتحديث التطبيق، تحتاج إلى 'سحب' (pull) هذه التغييرات إلى الدليل الحي. إليك سير العمل اليدوي الكامل للنشر:" },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "خطوات النشر اليدوي (على الخادم)", code: `# 1. انتقل إلى الدليل الحي
cd /var/www/my-app

# 2. اسحب أحدث التغييرات
git pull origin main

# 3. قم بتثبيت أي اعتماديات جديدة أو محدثة
npm install --production

# 4. أعد تشغيل التطبيق لتطبيق التغييرات
pm2 reload my-app`, explanations: [
                    { lines: "2", explanation: "الانتقال إلى دليل العمل الصحيح أمر بالغ الأهمية." },
                    { lines: "5", explanation: "يقوم `git pull` بالاتصال بالـ remote (الذي هو المستودع الفارغ في هذه الحالة) وتنزيل ودمج أي تغييرات جديدة." },
                    { lines: "8", explanation: "إذا قمت بإضافة حزم جديدة في `package.json`، فإن هذه الخطوة ضرورية. الخيار `--production` يتخطى تثبيت اعتماديات التطوير." },
                    { lines: "11", explanation: "هذه هي الخطوة الأخيرة والحاسمة. الكود الجديد موجود على القرص، لكن العملية الحالية لا تزال تعمل بالكود القديم. `pm2 reload` يقوم بإعادة تحميل التطبيق بسلاسة." }
                ]},
                { type: ContentType.PARAGRAPH, text: "هذا سير عمل أفضل بكثير من FTP. إنه موثوق، ويمكن تتبعه، وقابل للتكرار. لكنه لا يزال يدويًا. يتطلب منك تسجيل الدخول إلى الخادم وتشغيل عدة أوامر في كل مرة تريد فيها النشر. في المستوى التالي، سنقوم بأتمتة هذه الخطوات الأربع بالضبط." },
              ]
            },
            {
              id: "p3_c1_s4",
              icon: "🤖",
              title: "المستوى 53: ورشة عمل: أتمتة النشر باستخدام Git Hooks",
              content: [
                { type: ContentType.PARAGRAPH, text: "هنا يحدث السحر الحقيقي. Git Hooks هي نصوص برمجية (scripts) يقوم Git بتشغيلها تلقائيًا عند حدوث أحداث معينة في دورة حياته. الخطاف الذي يهمنا هو `post-receive`. هذا الخطاف يعمل على الخادم داخل المستودع الفارغ مباشرة بعد اكتمال عملية `git push` بنجاح. سنستخدم هذا الخطاف لتشغيل سير عمل النشر اليدوي الذي حددناه في المستوى السابق تلقائيًا. هذا يحول `git push` إلى أمر نشر كامل." },
                { type: ContentType.HEADING4, text: "كشف الخبايا: إنشاء نص `post-receive` برمجي مقاوم للرصاص" },
                { type: ContentType.PARAGRAPH, text: "يتم تخزين الخطافات في دليل `hooks` داخل المستودع الفارغ. سنقوم بإنشاء ملف جديد هناك:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: "sudo nano /var/repo/my-app.git/hooks/post-receive" },
                { type: ContentType.PARAGRAPH, text: "الآن، الصق النص البرمجي التالي. هذا هو قلب نظام النشر الآلي الخاص بنا:" },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "/var/repo/my-app.git/hooks/post-receive", code: `#!/bin/bash
# Script to automate deployment after a git push

# --- Variables ---
WORK_DIR="/var/www/my-app"
LIVE_BRANCH="main"

echo "====== DEPLOYMENT SCRIPT STARTED ======"

# --- Logic ---
while read oldrev newrev ref
do
    # Check if the push is to our live branch
    if [[ $ref = refs/heads/$LIVE_BRANCH ]];
    then
        echo "Push to live branch ($LIVE_BRANCH) detected. Starting deployment..."
        
        # Unset GIT_DIR to allow git commands in the working directory
        unset GIT_DIR
        
        # Navigate to the working directory and pull the changes
        cd $WORK_DIR && git pull origin $LIVE_BRANCH
        
        echo "Installing dependencies..."
        # Add NVM sourcing to make npm/node available
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"
        cd $WORK_DIR && npm install --production
        
        echo "Reloading application with PM2..."
        cd $WORK_DIR && pm2 reload my-app
        
        echo "Deployment finished successfully!"
    else
        echo "Push to branch other than $LIVE_BRANCH. No deployment needed."
    fi
done

echo "====== DEPLOYMENT SCRIPT FINISHED ======"`, explanations: [
                    { lines: "11-14", explanation: "يقرأ الخطاف المدخلات القياسية (stdin) لمعرفة ما تم دفعه. نتحقق مما إذا كان المرجع (ref) هو فرع الإنتاج الخاص بنا (`main`). هذا يمنع عمليات النشر من الحدوث عند الدفع إلى فروع أخرى." },
                    { lines: "17", explanation: "هذا هو السطر الأكثر أهمية والأكثر غموضًا. عندما يعمل الخطاف، يقوم Git بتعيين متغير البيئة `GIT_DIR`. إذا لم نقم بإلغاء تعيينه، فإن أي أوامر `git` لاحقة (مثل `git pull`) ستحاول العمل على المستودع الفارغ بدلاً من شجرة العمل. `unset` يحل هذه المشكلة." },
                    { lines: "20", explanation: "هنا نقوم بتنفيذ `git pull` في دليلنا الحي لجلب الكود الجديد." },
                    { lines: "23-25", explanation: "إذا كنت تستخدم NVM (وهو ما يجب عليك)، فإن الأوامر مثل `npm` قد لا تكون متاحة للخطاف. نقوم بـ 'source' لـ NVM لجعلها متاحة قبل تشغيل `npm install`." },
                    { lines: "28", explanation: "الخطوة الأخيرة: إعادة تحميل التطبيق بسلاسة باستخدام PM2 لتطبيق التغييرات." }
                ]},
                { type: ContentType.HEADING4, text: "جعله قابلاً للتنفيذ" },
                { type: ContentType.PARAGRAPH, text: "يجب أن يكون ملف الخطاف قابلاً للتنفيذ حتى يتمكن Git من تشغيله:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: "sudo chmod +x /var/repo/my-app.git/hooks/post-receive" },
                { type: ContentType.PARAGRAPH, text: "الآن، عد إلى جهازك المحلي، وقم بإجراء تغيير بسيط في الكود، وقم بتنفيذ `git commit`، ثم قم بالدفع باستخدام `git push production main`. يجب أن ترى كل مخرجات `echo` من النص البرمجي تظهر في الطرفية الخاصة بك. إذا نجح كل شيء، فقد قمت للتو بنشر تغيير إلى الإنتاج بأمر واحد." },
              ]
            },
            {
              id: "p3_c1_s5",
              icon: "🔒",
              title: "المستوى 54: دراسة حالة: التعامل الآمن مع الأسرار",
              content: [
                { type: ContentType.PARAGRAPH, text: "لقد قمنا بأتمتة نشر الكود، ولكن هناك مشكلة كبيرة: ماذا عن ملف `.env` أو ملفات التكوين الأخرى التي تحتوي على أسرار مثل كلمات مرور قاعدة البيانات ومفاتيح واجهة برمجة التطبيقات؟ لقد تعلمنا أنه لا يجب أبدًا، تحت أي ظرف من الظروف، إدراج هذه الملفات في مستودع Git الخاص بك." },
                { type: ContentType.HEADING4, text: "سر المحترفين: فصل الكود عن التكوين" },
                { type: ContentType.PARAGRAPH, text: "الفلسفة بسيطة: الكود الخاص بك (الذي يتغير ويتم التحكم في إصداره) يجب أن يكون منفصلاً تمامًا عن التكوين الخاص بك (الذي يختلف بين البيئات - تطوير، إنتاج - ويحتوي على أسرار). سير العمل الآلي الذي أنشأناه ينشر الكود فقط. ملفات التكوين الحساسة يجب أن توجد بالفعل على الخادم ويجب تجاهلها من قبل Git." },
                { type: ContentType.HEADING4, text: "ورشة عمل: سير العمل الكامل للتعامل مع الأسرار" },
                { type: ContentType.PARAGRAPH, text: "<strong>الخطوة 1: `.gitignore`</strong>: تأكد من أن ملف `.gitignore` في جذر مشروعك يتضمن أي ملفات أو مجلدات حساسة. هذا يخبر Git بعدم تتبعها أبدًا." },
                { type: ContentType.CODE_BLOCK, language: "text", code: `# .gitignore

# Dependencies
node_modules/

# Logs
*.log
npm-debug.log*

# Environment variables - CRITICAL
.env
.env.*.local

# Production build folder
dist/` },
                { type: ContentType.PARAGRAPH, text: "<strong>الخطوة 2: قالب التكوين (`.env.example`)</strong>: للمساعدة في توثيق المتغيرات التي يحتاجها تطبيقك، من الممارسات الجيدة إنشاء ملف قالب. هذا الملف يتم إدراجه في Git." },
                { type: ContentType.CODE_BLOCK, language: "text", code: `# .env.example - Commit this file to Git
DATABASE_URL=
NODE_ENV=
STRIPE_API_KEY=` },
                { type: ContentType.PARAGRAPH, text: "عندما يقوم مطور جديد باستنساخ المشروع، يمكنه نسخ `.env.example` إلى `.env` وملء القيم لبيئته المحلية." },
                { type: ContentType.PARAGRAPH, text: "<strong>الخطوة 3: الإعداد اليدوي لمرة واحدة على الخادم</strong>: على خادم الإنتاج الخاص بك، ستقوم بإنشاء ملف `.env` الحقيقي مرة واحدة فقط. ستتصل بالخادم عبر SSH وتضع الأسرار الحقيقية في `/var/www/my-app/.env`. نص النشر الآلي الذي أنشأناه لا يلمس هذا الملف أبدًا. إنه يسحب الكود الجديد، ويثبت الاعتماديات، ويعيد تشغيل التطبيق. سيقرأ التطبيق المعاد تشغيله بعد ذلك ملف `.env` الموجود بالفعل." },
                { type: ContentType.NOTE, title: "أمان ملفات الأسرار", text: "من الأهمية بمكان تأمين ملف `.env` على الخادم. يجب أن يكون مملوكًا لمستخدم التطبيق الخاص بك (`nagi`) ويجب أن يكون لديه أذونات مقيدة للغاية. استخدم `chmod 600 /var/www/my-app/.env` للتأكد من أن المالك فقط يمكنه قراءة وكتابة الملف، ولا يمكن لأي شخص آخر، بما في ذلك أعضاء المجموعة، الوصول إليه." },
              ]
            }
        ]
    },
    {
        id: "p3_c2", chapterTitle: "الفصل الثاني عشر: مقدمة إلى CI/CD",
        sections: [
            {
              id: "p3_c2_s1",
              icon: "🤔",
              title: "المستوى 55: كشف الخبايا: لماذا CI/CD أفضل من Git Hooks؟",
              content: [
                { type: ContentType.PARAGRAPH, text: "في الفصل السابق، قمنا ببناء نظام نشر آلي بسيط باستخدام Git Hooks. إنه فعال ولكنه بدائي. الأتمتة مقترنة مباشرة بخادمنا. ماذا لو أردنا تشغيل اختبارات قبل النشر؟ ماذا لو أردنا بناء أصول الواجهة الأمامية (frontend assets)؟ ماذا لو أردنا النشر على عدة خوادم؟ هنا يأتي دور CI/CD." },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "CI - التكامل المستمر (Continuous Integration)", definition: "هي ممارسة يقوم فيها المطورون بدمج تغييراتهم البرمجية في مستودع مركزي بشكل متكرر. بعد كل دمج، يتم تشغيل عملية بناء واختبار آلية. الهدف هو اكتشاف أخطاء التكامل مبكرًا. إذا فشل بناء أو اختبار، يمكن للفريق معالجة المشكلة على الفور. هذا يمنع 'جحيم الدمج' حيث ينتظر الجميع حتى النهاية لدمج عملهم، ليكتشفوا أن شيئًا لا يعمل." },
                    { term: "CD - التسليم المستمر / النشر المستمر (Continuous Delivery/Deployment)", definition: "التسليم المستمر هو امتداد للتكامل المستمر. إنه يضمن أنه يمكنك إصدار تغييرات جديدة لعملائك بسرعة وبشكل مستدام. هذا يعني أن كل تغيير يمر عبر خط أنابيب الاختبارات يتم إصداره تلقائيًا إلى بيئة تشبه الإنتاج (Staging). النشر المستمر يذهب خطوة أبعد: كل تغيير يمر عبر جميع المراحل يتم نشره تلقائيًا إلى الإنتاج. لا يوجد تدخل بشري." }
                ]},
                { type: ContentType.HEADING4, text: "دراسة حالة: Git Hooks مقابل CI/CD Runner" },
                { type: ContentType.PARAGRAPH, text: "Git Hooks تعمل على خادم الإنتاج الخاص بك. هذا يعني أن أي عملية بناء (مثل `npm install`) تستهلك موارد وحدة المعالجة المركزية والذاكرة على خادمك المباشر. أنظمة CI/CD مثل GitHub Actions تعمل على 'عدائين' (Runners) منفصلين ومؤقتين." },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>بيئات نظيفة:</strong> كل سير عمل (workflow) يعمل في بيئة افتراضية جديدة تمامًا، مما يضمن أن عمليات البناء والاختبار قابلة للتكرار وليست معتمدة على التكوين الخاص لخادمك.",
                    "<strong>فصل الاهتمامات:</strong> يتم فصل منطق البناء والاختبار والنشر تمامًا عن خادم الإنتاج. خادمك مسؤول فقط عن تشغيل الكود، وليس بنائه.",
                    "<strong>قوة الحوسبة:</strong> يمكنك تشغيل اختبارات معقدة أو عمليات بناء كثيفة الموارد على عدائين أقوياء دون التأثير على أداء تطبيقك المباشر.",
                    "<strong>التكامل:</strong> تتكامل منصات CI/CD بسهولة مع خدمات أخرى، مما يسمح لك بإرسال إشعارات Slack، وفحص الثغرات الأمنية، ونشر الصور إلى سجلات الحاويات، والمزيد."
                ]},
                { type: ContentType.NOTE, title: "التحول في العقلية", text: "الانتقال إلى CI/CD هو تحول من 'كيف أضع هذا الكود على الخادم؟' إلى 'كيف يمكنني التحقق من أن هذا الكود جاهز للإنتاج ونشره بأمان؟'. إنه يفرض عليك التفكير في الاختبار والجودة والأتمتة كجزء لا يتجزأ من عملية التطوير، وليس كخطوة أخيرة." },
              ]
            },
            {
              id: "p3_c2_s2",
              icon: "🚀",
              title: "المستوى 56: مقدمة إلى GitHub Actions",
              content: [
                { type: ContentType.PARAGRAPH, text: "GitHub Actions هي منصة CI/CD مدمجة مباشرة في GitHub. هذا التكامل العميق يجعلها خيارًا قويًا وسهلاً بشكل لا يصدق للبدء. لا حاجة لخدمة خارجية؛ كل شيء يحدث داخل النظام البيئي الذي تستخدمه بالفعل لإدارة الكود الخاص بك." },
                { type: ContentType.HEADING4, text: "كشف خبايا المفاهيم الأساسية" },
                { type: ContentType.PARAGRAPH, text: "لفهم GitHub Actions، تحتاج إلى معرفة بعض المصطلحات الأساسية:" },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "سير العمل (Workflow)", definition: "هو الإجراء الآلي الذي تريد القيام به. يتم تعريفه بواسطة ملف YAML يتم وضعه في دليل `.github/workflows/` في مستودعك. يمكن أن يحتوي المستودع على مهام سير عمل متعددة." },
                    { term: "الحدث (Event)", definition: "هو النشاط المحدد الذي يؤدي إلى تشغيل سير العمل. يمكن أن يكون هذا `push` إلى فرع، أو إنشاء `pull_request`، أو إصدار جديد، أو حتى جدول زمني (cron)." },
                    { term: "الوظيفة (Job)", definition: "تتكون مهام سير العمل من وظيفة واحدة أو أكثر. بشكل افتراضي، تعمل الوظائف بالتوازي. يمكنك أيضًا تكوينها لتعمل بشكل تسلسلي. كل وظيفة تعمل على 'عداء' منفصل." },
                    { term: "العداء (Runner)", definition: "هو خادم سيقوم بتشغيل سير عملك. يوفر GitHub عدائين مستضافين لأنظمة Ubuntu و Windows و macOS. يمكنك أيضًا استضافة عدائين خاصين بك على بنيتك التحتية." },
                    { term: "الخطوة (Step)", definition: "كل وظيفة تحتوي على سلسلة من الخطوات. يمكن للخطوة تشغيل أمر shell أو يمكن أن تكون 'إجراءً'." },
                    { term: "الإجراء (Action)", definition: "هي تطبيقات مستقلة وقابلة لإعادة الاستخدام يمكنك تضمينها في خطواتك. إنها طريقة لتعبئة المهام المعقدة. على سبيل المثال، `actions/checkout@v4` هو إجراء يقوم بسحب الكود الخاص بك إلى العداء. هناك الآلاف من الإجراءات المتاحة في GitHub Marketplace." }
                ]},
                { type: ContentType.PARAGRAPH, text: "باختصار، عندما يحدث **حدث**، فإنه يشغل **سير عمل**. يقوم سير العمل بتشغيل **وظيفة** واحدة أو أكثر على **عداء**. كل وظيفة تتبع سلسلة من **الخطوات**، والتي يمكن أن تكون أوامر أو **إجراءات**." },
              ]
            },
            {
              id: "p3_c2_s3",
              icon: "📄",
              title: "المستوى 57: ورشة عمل: إنشاء أول سير عمل للنشر",
              content: [
                { type: ContentType.PARAGRAPH, text: "حان الوقت لكتابة أول ملف سير عمل لنا. سنقوم بإنشاء سير عمل بسيط يقوم بنفس مهام Git Hook الخاص بنا، ولكنه يفعل ذلك بطريقة CI/CD. أولاً، على جهازك المحلي، قم بإنشاء الدلائل والملف:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `mkdir -p .github/workflows
nano .github/workflows/deploy.yml` },
                { type: ContentType.PARAGRAPH, text: "الآن، لنكتب سير العمل الأساسي. هذا الملف يحدد 'متى' و 'ماذا' يجب أن يحدث." },
                { type: ContentType.CODE_EXPLANATION, language: "yaml", codeTitle: ".github/workflows/deploy.yml", code: `name: Deploy to Production

on:
  push:
    branches:
      - main

jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18' # Or your preferred LTS version
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Deploy to server
        run: echo "Deployment step will be added here!"
`, explanations: [
                    { lines: "1", explanation: "`name`: اسم سير العمل الذي سيظهر في واجهة مستخدم GitHub." },
                    { lines: "3-6", explanation: "`on`: هذا هو قسم الأحداث. نحن نخبر Actions بتشغيل سير العمل هذا فقط عند حدوث `push` إلى فرع `main`." },
                    { lines: "8", explanation: "`jobs`: نبدأ في تحديد وظائفنا. لدينا وظيفة واحدة فقط هنا، نسميها `deploy`." },
                    { lines: "11", explanation: "`runs-on`: نحدد نوع العداء الذي نريد استخدامه. `ubuntu-latest` هو خيار جيد لمعظم تطبيقات الويب." },
                    { lines: "12", explanation: "`steps`: نبدأ في تحديد الخطوات التي ستنفذها الوظيفة بشكل تسلسلي." },
                    { lines: "13-14", explanation: "هذه هي أول خطوة وأكثرها شيوعًا. نستخدم الإجراء الرسمي `actions/checkout@v4` لسحب كود المستودع إلى العداء." },
                    { lines: "16-20", explanation: "نستخدم إجراءً آخر، `actions/setup-node@v4`، لتثبيت إصدار محدد من Node.js على العداء. `cache: 'npm'` هو تحسين ذكي يقوم بتخزين الاعتماديات مؤقتًا لتسريع عمليات التشغيل المستقبلية." },
                    { lines: "22-23", explanation: "هذه خطوة `run` بسيطة تقوم بتشغيل أمر shell. `npm ci` مشابه لـ `npm install` ولكنه أسرع ومصمم لبيئات CI، حيث يقوم بتثبيت الاعتماديات بناءً على ملف `package-lock.json`." },
                    { lines: "25-26", explanation: "هذه خطوة مؤقتة. في المستويات التالية، سنستبدل هذا الأمر بالمنطق الفعلي للاتصال بخادمنا ونشر الكود." }
                ]},
                { type: ContentType.PARAGRAPH, text: "بعد حفظ هذا الملف، قم بعمل commit و push له. انتقل إلى مستودعك على GitHub وانقر على علامة التبويب 'Actions'. يجب أن ترى سير عملك قيد التشغيل (أو مكتملًا). يمكنك النقر عليه لرؤية المخرجات التفصيلية لكل خطوة. لقد قمت للتو بإنشاء أول خط أنابيب CI/CD خاص بك!" },
              ]
            },
            {
              id: "p3_c2_s4",
              icon: "🔑",
              title: "المستوى 58: ورشة عمل: استخدام أسرار GitHub لتخزين بيانات الاعتماد",
              content: [
                { type: ContentType.PARAGRAPH, text: "خطوتنا الأخيرة في سير العمل هي الاتصال بالخادم عبر SSH. للقيام بذلك، يحتاج العداء إلى بيانات اعتماد حساسة: عنوان IP للخادم، واسم المستخدم، والأهم من ذلك، مفتاح SSH الخاص. كتابة هذه المعلومات مباشرة في ملف `deploy.yml` هو خطأ أمني فادح، حيث سيكون مرئيًا لأي شخص لديه حق الوصول إلى المستودع." },
                { type: ContentType.PARAGRAPH, text: "الحل الصحيح هو GitHub Secrets. إنها متغيرات بيئة مشفرة يمكنك إنشاؤها في إعدادات مستودعك. لا يمكن قراءة هذه الأسرار بمجرد تعيينها، ولكن يمكن الوصول إليها بأمان داخل سير عمل GitHub Actions." },
                { type: ContentType.HEADING4, text: "دليل عملي: إنشاء الأسرار اللازمة" },
                { type: ContentType.PARAGRAPH, text: "اذهب إلى مستودعك على GitHub، ثم `Settings` > `Secrets and variables` > `Actions`. انقر على `New repository secret` وأنشئ الأسرار الثلاثة التالية:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>`SERVER_HOST`</strong>: عنوان IP العام لخادم VPS الخاص بك.",
                    "<strong>`SERVER_USERNAME`</strong>: اسم المستخدم الذي تستخدمه للاتصال عبر SSH (على سبيل المثال، `nagi`).",
                    "<strong>`SSH_PRIVATE_KEY`</strong>: هذا هو الجزء الأكثر حساسية. تحتاج إلى نسخ محتوى **مفتاحك الخاص** (عادةً من ملف `~/.ssh/id_rsa` على جهازك المحلي) ولصقه هنا. **تأكد من نسخ كل شيء، بما في ذلك `-----BEGIN OPENSSH PRIVATE KEY-----` و `-----END OPENSSH PRIVATE KEY-----`**."
                ]},
                { type: ContentType.NOTE, title: "سر المحترفين: مفتاح SSH منفصل للنشر", text: "لأقصى درجات الأمان، من الأفضل إنشاء زوج مفاتيح SSH جديد مخصص للنشر فقط. أضف المفتاح العام إلى ملف `~/.ssh/authorized_keys` على خادمك، وضع المفتاح الخاص في سر `SSH_PRIVATE_KEY` في GitHub. بهذه الطريقة، إذا تم اختراق هذا المفتاح، فإنه يمنح الوصول فقط لغرض النشر ولا يعرض مفتاحك الشخصي للخطر." },
              ]
            },
            {
              id: "p3_c2_s5",
              icon: "✅",
              title: "المستوى 59: ورشة عمل: سير العمل الكامل والنتيجة النهائية",
              content: [
                { type: ContentType.PARAGRAPH, text: "الآن بعد أن أصبحت أسرارنا في مكانها، يمكننا إكمال سير العمل. بدلاً من محاولة التعامل مع SSH يدويًا، سنستخدم إجراءً شائعًا وموثوقًا من Marketplace يسمى `appleboy/ssh-action`. هذا الإجراء يبسط العملية بشكل كبير." },
                { type: ContentType.PARAGRAPH, text: "قم بتحديث ملف `deploy.yml` الخاص بك ليبدو كالتالي. هذا هو الإصدار النهائي الذي يجمع كل شيء معًا." },
                { type: ContentType.CODE_EXPLANATION, language: "yaml", codeTitle: ".github/workflows/deploy.yml (النهائي)", code: `name: Deploy to Production

on:
  push:
    branches:
      - main

jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      # يمكنك إضافة خطوات الاختبار والبناء هنا في المستقبل
      # - name: Run tests
      #   run: npm test

      - name: Deploy to server via SSH
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: \${{ secrets.SERVER_HOST }}
          username: \${{ secrets.SERVER_USERNAME }}
          key: \${{ secrets.SSH_PRIVATE_KEY }}
          port: 22 # or your custom SSH port
          script: |
            cd /var/www/my-app
            git pull origin main
            export NVM_DIR="$HOME/.nvm"
            [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"
            npm install --production
            pm2 reload my-app`, explanations: [
                    { lines: "17-18", explanation: "نستدعي إجراء `ssh-action`." },
                    { lines: "19-22", explanation: "هنا نمرر أسرارنا إلى الإجراء باستخدام بناء الجملة `\${{ secrets.SECRET_NAME }}`. يقوم الإجراء باستخدام هذه المعلومات لإنشاء اتصال SSH آمن." },
                    { lines: "24-30", explanation: "قسم `script` هو المكان الذي نضع فيه الأوامر التي نريد تشغيلها على خادمنا البعيد. هذه هي نفس الأوامر التي استخدمناها في Git Hook، وهي تقوم بسحب الكود، وتثبيت الاعتماديات، وإعادة تحميل التطبيق." }
                ]},
                { type: ContentType.HEADING4, text: "دراسة حالة: النتيجة النهائية" },
                { type: ContentType.PARAGRAPH, text: "قم بعمل commit و push لهذا الملف النهائي. الآن، في كل مرة يقوم فيها أي مطور في فريقك بالدفع إلى فرع `main`، سيحدث ما يلي تلقائيًا:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "1. تكتشف GitHub Actions الدفعة.",
                    "2. تبدأ تشغيل عداء Ubuntu جديد ونظيف.",
                    "3. يقوم العداء بسحب أحدث إصدار من الكود.",
                    "4. يتصل العداء بشكل آمن بخادم الإنتاج الخاص بك باستخدام الأسرار المشفرة.",
                    "5. يقوم بتشغيل أوامر النشر على خادمك، وتحديث التطبيق بسلاسة.",
                    "6. يمكنك مشاهدة سجلات العملية بأكملها مباشرة في واجهة GitHub."
                ]},
                { type: ContentType.PARAGRAPH, text: "لقد قمت للتو بالترقية من نظام نشر بسيط إلى خط أنابيب CI/CD احترافي. هذا النظام أكثر أمانًا، وأكثر قوة، ويوفر رؤية أفضل بكثير لعملية النشر. إنه الأساس الذي يمكنك البناء عليه لإضافة خطوات أكثر تعقيدًا مثل الاختبار الآلي، وفحص الأمان، والمزيد." },
              ]
            }
        ]
    },
    {
        id: "p3_c3", chapterTitle: "الفصل الثالث عشر: بناء خطوط أنابيب متقدمة",
        sections: [
            {
              id: "p3_c3_s1",
              icon: "🧪",
              title: "المستوى 60: ورشة عمل: إضافة خطوة الاختبار (CI) إلى سير العمل",
              content: [
                { type: ContentType.PARAGRAPH, text: "الغرض الحقيقي من التكامل المستمر (CI) هو بناء الثقة في الكود الخاص بك قبل نشره. الطريقة الأكثر فعالة لبناء هذه الثقة هي من خلال الاختبار الآلي. في هذا المستوى، سنقوم بتوسيع سير عملنا ليشمل وظيفة اختبار منفصلة تعمل *قبل* وظيفة النشر. إذا فشلت أي من الاختبارات، فسيتم إيقاف خط الأنابيب بأكمله ولن يتم نشر الكود المعيب أبدًا." },
                { type: ContentType.HEADING4, text: "كشف الخبايا: فصل الاختبار عن النشر" },
                { type: ContentType.PARAGRAPH, text: "من أفضل الممارسات فصل وظيفة الاختبار عن وظيفة النشر. هذا يجعل سير العمل أكثر وضوحًا وقابلية للإدارة. سننشئ وظيفة جديدة تسمى `test` ونجعل وظيفة `deploy` تعتمد عليها." },
                { type: ContentType.CODE_EXPLANATION, language: "yaml", codeTitle: "سير عمل مع وظيفة اختبار", code: `name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    name: Run Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm test # Assuming you have a test script in package.json

  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    needs: test # This is the crucial line
    if: github.ref == 'refs/heads/main' && github.event_name == 'push' # Only deploy on push to main
    steps:
      - uses: actions/checkout@v4
      - uses: appleboy/ssh-action@v1.0.3
        with:
          host: \${{ secrets.SERVER_HOST }}
          username: \${{ secrets.SERVER_USERNAME }}
          key: \${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /var/www/my-app
            git pull origin main
            # ... rest of deploy script
`, explanations: [
                    { lines: "5-7", explanation: "قمنا بتوسيع قسم `on`. الآن يتم تشغيل سير العمل أيضًا عند إنشاء طلب سحب (Pull Request) إلى `main`. هذا يسمح لنا بتشغيل الاختبارات على التغييرات المقترحة قبل دمجها." },
                    { lines: "9-19", explanation: "هذه هي وظيفة الاختبار الجديدة. إنها تقوم بإعداد بيئة Node.js تمامًا كما فعلنا من قبل، ولكن خطوتها الأخيرة هي `npm test`. إذا خرج هذا الأمر برمز خطأ (أي فشل اختبار)، فستفشل الوظيفة بأكملها." },
                    { lines: "24", explanation: "هذا هو التوجيه الذي يربط بين الوظيفتين. `needs: test` يخبر GitHub Actions بأنه لا يجب بدء وظيفة `deploy` إلا بعد اكتمال وظيفة `test` بنجاح." },
                    { lines: "25", explanation: "بما أن سير العمل يعمل الآن أيضًا على طلبات السحب، نحتاج إلى إضافة شرط. هذا يضمن أن خطوة النشر الفعلية تحدث فقط عندما يكون الحدث هو `push` إلى فرع `main`، وليس عند فتح طلب سحب." }
                ]},
                { type: ContentType.PARAGRAPH, text: "لقد قمنا الآن بتنفيذ الجزء 'CI' الحقيقي من CI/CD. كل تغيير يتم دفعه يتم التحقق منه تلقائيًا مقابل مجموعة الاختبارات الخاصة بك. هذا يوفر شبكة أمان لا تقدر بثمن، مما يسمح لفريقك بالتحرك بسرعة مع الحفاظ على مستوى عالٍ من الجودة والثقة." },
              ]
            },
            {
              id: "p3_c3_s2",
              icon: "📦",
              title: "المستوى 61: ورشة عمل: بناء الأصول باستخدام القطع الأثرية",
              content: [
                { type: ContentType.PARAGRAPH, text: "العديد من تطبيقات الويب الحديثة، خاصة تلك التي تستخدم أطر عمل مثل React أو Vue أو Svelte، لديها خطوة 'بناء'. تقوم هذه الخطوة بتحويل كود JavaScript الحديث و CSS إلى ملفات محسنة ومصغرة جاهزة للمتصفح. تشغيل خطوة البناء هذه على خادم الإنتاج الخاص بك هو ممارسة سيئة: فهو يستهلك موارد ثمينة (CPU و RAM) ويمكن أن يفشل إذا كانت بيئة الخادم تفتقد إلى بعض الاعتماديات. المكان الصحيح للقيام بذلك هو داخل خط أنابيب CI/CD الخاص بك." },
                { type: ContentType.HEADING4, text: "كشف الخبايا: القطع الأثرية (Artifacts)" },
                { type: ContentType.PARAGRAPH, text: "القطع الأثرية هي ملفات أو مجلدات يتم إنشاؤها أثناء تشغيل سير العمل. GitHub Actions يسمح لك بتحميل هذه القطع الأثرية في نهاية وظيفة ما ثم تنزيلها في وظيفة أخرى. هذا هو بالضبط ما نحتاجه: سننشئ وظيفة `build` جديدة، ونقوم بتشغيل `npm run build`، ثم نحمل المجلد الناتج (عادةً `dist` أو `build`) كقطعة أثرية. بعد ذلك، يمكن لوظيفة `deploy` تنزيل هذه القطعة الأثرية ونشرها." },
                { type: ContentType.CODE_EXPLANATION, language: "yaml", codeTitle: "سير عمل مع خطوة بناء", code: `jobs:
  build:
    name: Build Assets
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build # Creates the 'dist' folder
      - uses: actions/upload-artifact@v4
        with:
          name: production-files
          path: ./dist

  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: production-files
          path: ./dist
      # Now use an action like rsync to deploy the 'dist' folder
`, explanations: [
                    { lines: "2-12", explanation: "هذه هي وظيفة البناء الجديدة. إنها تشبه وظيفة الاختبار، لكنها تنتهي بتشغيل أمر البناء." },
                    { lines: "13-16", explanation: "نستخدم الإجراء الرسمي `actions/upload-artifact`. `name` هو اسم فريد لهذه القطعة الأثرية. `path` هو المجلد الذي نريد تحميله." },
                    { lines: "18-25", explanation: "في وظيفة النشر، التي تعتمد الآن على `build`، الخطوة الأولى هي `actions/download-artifact`. نستخدم نفس `name` ونحدد `path` حيث نريد وضع الملفات التي تم تنزيلها." }
                ]},
                { type: ContentType.NOTE, title: "لماذا هذا أفضل؟", text: "هذا يفصل تمامًا بين عملية البناء والنشر. العداء القوي والمؤقت يقوم بكل العمل الشاق (تجميع، تصغير، تحسين)، وخادم الإنتاج الخاص بك يتلقى فقط الملفات النهائية والمحسنة. هذا يجعل عمليات النشر أسرع وأكثر موثوقية ويحافظ على خادم الإنتاج الخاص بك نظيفًا ومركزًا على مهمته الوحيدة: خدمة الطلبات." },
              ]
            },
            {
              id: "p3_c3_s3",
              icon: "⚡",
              title: "المستوى 62: ورشة عمل: استخدام rsync للنشر الفعال",
              content: [
                { type: ContentType.PARAGRAPH, text: "في حين أن تشغيل `git pull` على الخادم يعمل، إلا أنه ليس الطريقة الأكثر فعالية لنشر الأصول المبنية. `git pull` يجلب تاريخ Git بأكمله وقد لا يتعامل بشكل جيد مع الملفات التي تم إنشاؤها. أداة أفضل بكثير لهذه المهمة هي `rsync`. `rsync` هي أداة مساعدة قوية لنظام يونكس تتفوق في مزامنة الملفات والمجلدات بين نظامين. قوتها تكمن في أنها تستخدم خوارزمية ذكية لنقل الأجزاء المتغيرة من الملفات فقط، مما يجعلها سريعة بشكل لا يصدق لعمليات النشر اللاحقة." },
                { type: ContentType.HEADING4, text: "كشف الخبايا: استخدام إجراء `rsync`" },
                { type: ContentType.PARAGRAPH, text: "بدلاً من `appleboy/ssh-action` الذي يقوم بتشغيل أوامر عامة، سنستخدم إجراءً متخصصًا يستخدم `rsync` عبر SSH. `easingthemes/ssh-deploy` هو خيار شائع." },
                { type: ContentType.CODE_EXPLANATION, language: "yaml", codeTitle: "خطوة النشر باستخدام rsync", code: `  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: production-files
          path: ./dist
      
      - name: Deploy to Server with rsync
        uses: easingthemes/ssh-deploy@v5.0.0
        with:
          SSH_PRIVATE_KEY: \${{ secrets.SSH_PRIVATE_KEY }}
          ARGS: "-rlgoDziv --delete"
          SOURCE: "dist/"
          REMOTE_HOST: \${{ secrets.SERVER_HOST }}
          REMOTE_USER: \${{ secrets.SERVER_USERNAME }}
          TARGET: "/var/www/my-app/dist"
`, explanations: [
                    { lines: "12-19", explanation: "نقوم بتكوين إجراء `ssh-deploy` بأسرارنا." },
                    { lines: "14", explanation: "`ARGS` تسمح لنا بتمرير خيارات إلى `rsync`. `-r` (recursive), `-l` (links), `-g` (group), `-o` (owner), `-D` (devices), `-z` (compress), `-i` (itemized changes), `-v` (verbose). `--delete` هو خيار قوي يضمن حذف أي ملفات في الوجهة لم تعد موجودة في المصدر، مما يحافظ على نظافة دليل النشر." },
                    { lines: "15", explanation: "`SOURCE` هو الدليل المحلي على العداء الذي نريد نشره (مجلد القطع الأثرية الذي قمنا بتنزيله)." },
                    { lines: "18", explanation: "`TARGET` هو المسار المطلق على الخادم البعيد حيث يجب مزامنة الملفات." }
                ]},
                { type: ContentType.PARAGRAPH, text: "هذا النهج أكثر قوة وملاءمة لنشر الأصول المبنية. بدلاً من سحب مستودع كامل، نقوم فقط بمزامنة المجلد المبني. في عمليات النشر اللاحقة، سينقل `rsync` فقط ملفات CSS أو JS التي تغيرت، مما يجعل عملية النشر أسرع بكثير." },
              ]
            },
            {
              id: "p3_c3_s4",
              icon: "⏪",
              title: "المستوى 63: دراسة حالة: استراتيجيات التراجع البسيطة والفعالة",
              content: [
                { type: ContentType.PARAGRAPH, text: "حتى مع وجود أفضل الاختبارات، قد تحتوي عملية النشر أحيانًا على خطأ حرج لا يظهر إلا في بيئة الإنتاج. عندما يحدث هذا، فإن القدرة على التراجع بسرعة إلى إصدار سابق ومستقر أمر بالغ الأهمية. استراتيجيات التراجع يمكن أن تكون معقدة للغاية، ولكن هناك بعض الطرق البسيطة والفعالة التي يمكننا تنفيذها." },
                { type: ContentType.HEADING4, text: "الطريقة 1: إعادة تشغيل سير العمل على Commit قديم" },
                { type: ContentType.PARAGRAPH, text: "هذه هي أبسط طريقة. GitHub Actions يسمح لك بإعادة تشغيل سير عمل يدويًا على أي commit سابق. إذا اكتشفت أن النشر الأخير كان سيئًا، يمكنك ببساطة:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "اذهب إلى علامة التبويب 'Actions' في مستودعك.",
                    "ابحث عن آخر تشغيل ناجح لسير عمل النشر الخاص بك.",
                    "انقر على زر 'Re-run jobs' أو 'Re-run all jobs'."
                ]},
                { type: ContentType.PARAGRAPH, text: "سيؤدي هذا إلى تشغيل خط الأنابيب بأكمله مرة أخرى باستخدام الكود من ذلك الـ commit المحدد، مما يؤدي فعليًا إلى 'التراجع' عن طريق إعادة نشر إصدار جيد معروف." },
                { type: ContentType.HEADING4, text: "الطريقة 2 (سر المحترفين): `git revert`" },
                { type: ContentType.PARAGRAPH, text: "الطريقة الأكثر 'صحة' من منظور Git هي إنشاء commit جديد يعكس تغييرات commit سيئ. هذا لا يعيد كتابة التاريخ ويترك سجلاً واضحًا لما حدث." },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `# على جهازك المحلي
git revert HEAD
git push origin main` },
                { type: ContentType.PARAGRAPH, text: "سيؤدي `git revert HEAD` إلى إنشاء commit جديد يحتوي على التغييرات المعاكسة لآخر commit. دفع هذا الـ commit سيؤدي إلى تشغيل سير عمل CI/CD الخاص بك كالمعتاد، والذي سيقوم بعد ذلك بنشر الكود الذي تم التراجع عنه." },
                { type: ContentType.NOTE, title: "نحو تراجع فوري", text: "هذه الاستراتيجيات تعمل ولكنها لا تزال تتطلب إعادة تشغيل خط الأنابيب بأكمله. الاستراتيجيات الأكثر تقدمًا مثل النشر الأزرق/الأخضر (التي سنناقشها في الفصل التالي) تسمح بالتراجع الفوري ببساطة عن طريق تغيير مؤشر، دون الحاجة إلى إعادة نشر كاملة." },
              ]
            },
            {
              id: "p3_c3_s5",
              icon: "🔔",
              title: "المستوى 64: ورشة عمل: إرسال إشعارات حالة النشر إلى Slack",
              content: [
                { type: ContentType.PARAGRAPH, text: "عندما تعمل في فريق، فإن إبقاء الجميع على اطلاع بحالة عمليات النشر أمر مهم. هل نجح النشر الأخير؟ هل فشل؟ إرسال إشعارات آلية إلى قناة دردشة مشتركة مثل Slack أو Discord هو طريقة ممتازة لتحسين الرؤية والتعاون." },
                { type: ContentType.HEADING4, text: "كشف الخبايا: Webhooks" },
                { type: ContentType.PARAGRAPH, text: "توفر كل من Slack و Discord ميزة تسمى 'Incoming Webhooks'. إنها في الأساس عناوين URL فريدة يمكنك إرسال طلبات HTTP POST إليها، وسيظهر محتوى هذا الطلب كرسالة في القناة المحددة. سنقوم بتخزين عنوان URL الخاص بالـ Webhook كسر في GitHub (على سبيل المثال، `SLACK_WEBHOOK_URL`)." },
                { type: ContentType.HEADING4, text: "ورشة عمل: إضافة خطوة الإشعار إلى سير العمل" },
                { type: ContentType.PARAGRAPH, text: "يمكننا إضافة وظيفة جديدة في نهاية سير عملنا تكون مسؤولة عن إرسال الإشعارات. سنستخدم الشروط المدمجة (`if:`) لتخصيص الرسالة بناءً على ما إذا كانت الوظائف السابقة قد نجحت أم فشلت." },
                { type: ContentType.CODE_EXPLANATION, language: "yaml", codeTitle: "وظيفة الإشعارات", code: `  notify:
    name: Notify
    runs-on: ubuntu-latest
    needs: [test, deploy] # Run after both test and deploy
    if: always() # IMPORTANT: This ensures the job runs even if previous jobs fail
    steps:
      - name: Send Slack Notification on Success
        if: success()
        run: |
          curl -X POST -H 'Content-type: application/json' --data '{"text":"✅ Deployment to production succeeded!"}' \${{ secrets.SLACK_WEBHOOK_URL }}

      - name: Send Slack Notification on Failure
        if: failure()
        run: |
          curl -X POST -H 'Content-type: application/json' --data '{"text":"❌ Deployment to production failed! Check Actions tab for details: \${{ github.server_url }}/\${{ github.repository }}/actions/runs/\${{ github.run_id }}"}' \${{ secrets.SLACK_WEBHOOK_URL }}
`, explanations: [
                    { lines: "4", explanation: "نجعل هذه الوظيفة تعتمد على جميع الوظائف الرئيسية السابقة." },
                    { lines: "5", explanation: "`if: always()` هو المفتاح. بشكل افتراضي، لن تعمل الوظيفة إذا فشلت إحدى تبعياتها. هذا الشرط يتجاوز ذلك، مما يضمن أننا نرسل دائمًا إشعارًا، سواء كان نجاحًا أم فشلاً." },
                    { lines: "7-10", explanation: "الخطوة الأولى تعمل فقط `if: success()`. نستخدم `curl` لإرسال حمولة JSON بسيطة إلى عنوان URL الخاص بالـ Webhook." },
                    { lines: "12-15", explanation: "الخطوة الثانية تعمل فقط `if: failure()`. هنا، نقوم بتضمين رسالة أكثر تفصيلاً ورابط مباشر إلى سجلات تشغيل سير العمل الفاشل باستخدام متغيرات سياق GitHub (`\${{ github.repository }}`, `\${{ github.run_id }}`)." }
                ]},
                { type: ContentType.PARAGRAPH, text: "هذا يكمل حلقة التغذية الراجعة. الآن، كل عملية دفع إلى `main` لا تقوم فقط باختبار ونشر الكود، بل تبلغ الفريق أيضًا بالنتيجة النهائية، مما يخلق سير عمل شفافًا وتعاونيًا بالكامل." },
              ]
            }
        ]
    },
    {
        id: "p3_c4", chapterTitle: "الفصل الرابع عشر: التوزيع بدون توقف",
        sections: [
            {
              id: "p3_c4_s1",
              icon: "⏳",
              title: "المستوى 65: كشف الخبايا: فهم مشكلة التوقف أثناء النشر",
              content: [
                { type: ContentType.PARAGRAPH, text: "حتى مع وجود خط أنابيب CI/CD آلي بالكامل، فإن استراتيجية النشر الحالية لدينا لا تزال بها عيب خفي: فترة توقف قصيرة (downtime). عندما نقوم بتشغيل `pm2 reload my-app` أو `sudo systemctl restart myapp.service`، هناك نافذة زمنية، حتى لو كانت مجرد بضع ثوانٍ، حيث يتم إيقاف العملية القديمة وبدء العملية الجديدة. خلال هذه النافذة، أي طلبات واردة من المستخدمين ستفشل، وغالبًا ما تؤدي إلى خطأ 502 Bad Gateway." },
                { type: ContentType.PARAGRAPH, text: "بالنسبة لمدونة شخصية، قد يكون هذا مقبولاً. ولكن بالنسبة لتطبيق أعمال حرج، أو واجهة برمجة تطبيقات (API) تخدم آلاف الطلبات في الدقيقة، فإن حتى بضع ثوانٍ من التوقف يمكن أن تؤدي إلى فقدان البيانات، وفشل المعاملات، وتجربة مستخدم سيئة للغاية. الهدف من النشر بدون توقف هو القضاء على هذه النافذة الزمنية تمامًا، مما يجعل عملية النشر غير مرئية تمامًا للمستخدم النهائي." },
                { type: ContentType.HEADING4, text: "دراسة حالة: تشريح إعادة التشغيل" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>T=0s:</strong> يبدأ أمر `restart`.",
                    "<strong>T=0.1s:</strong> يتم إرسال إشارة `SIGINT` إلى العملية القديمة.",
                    "<strong>T=0.2s:</strong> العملية القديمة تتوقف، ويتوقف الخادم عن الاستماع على المنفذ 3000.",
                    "<strong>T=0.3s:</strong> تبدأ العملية الجديدة.",
                    "<strong>T=1.5s:</strong> العملية الجديدة تنتهي من التهيئة (تحميل الكود، الاتصال بقاعدة البيانات) وتبدأ في الاستماع على المنفذ 3000.",
                    "<strong>النتيجة:</strong> كان هناك توقف لمدة 1.3 ثانية. أي طلبات وصلت خلال هذه الفترة فشلت."
                ]},
                { type: ContentType.NOTE, title: "سر المحترفين: `pm2 reload` مقابل `restart`", text: "`pm2 reload` أذكى من `pm2 restart`. إنه يحاول تحقيق النشر بدون توقف عن طريق الحفاظ على العملية القديمة قيد التشغيل حتى تصبح العملية الجديدة جاهزة. ومع ذلك، لا يزال هذا غير مضمون ويمكن أن يفشل في ظل ظروف معينة. الاستراتيجيات التي سنناقشها بعد ذلك، مثل النشر الأزرق/الأخضر، توفر نهجًا أكثر قوة وموثوقية لحل هذه المشكلة على مستوى البنية التحتية." },
              ]
            },
            {
              id: "p3_c4_s2",
              icon: "🔵🟢",
              title: "المستوى 66: كشف خبايا: استراتيجية النشر الأزرق/الأخضر",
              content: [
                { type: ContentType.PARAGRAPH, text: "النشر الأزرق/الأخضر هو استراتيجية قوية ومباشرة لتحقيق النشر بدون توقف والتراجع الفوري. الفكرة الأساسية هي الحفاظ على بيئتين متطابقتين تمامًا في الإنتاج. في أي وقت، تكون إحدى البيئات نشطة (زرقاء) والأخرى خاملة (خضراء)." },
                { type: ContentType.HEADING4, text: "دراسة حالة: كيف تعمل؟" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>1. الحالة الأولية:</strong> البيئة الزرقاء نشطة وتخدم كل حركة مرور الإنتاج. الموجه (عادة Nginx) يشير إلى النسخة الزرقاء. البيئة الخضراء خاملة، قد تحتوي على الإصدار القديم أو تكون فارغة.",
                    "<strong>2. النشر إلى الخامل:</strong> عندما تكون جاهزًا لنشر إصدار جديد، فإنك تنشره حصريًا إلى البيئة الخضراء. هذا لا يؤثر على البيئة الزرقاء على الإطلاق. يمكنك أن تأخذ وقتك بالكامل لتثبيت الاعتماديات، وتشغيل عمليات الترحيل، وبدء التطبيق.",
                    "<strong>3. الاختبار والتحقق:</strong> بمجرد أن تصبح البيئة الخضراء جاهزة، يمكنك إجراء اختبارات شاملة عليها. يمكنك الوصول إليها مباشرة عبر عنوان IP الخاص بها أو اسم مضيف داخلي للتحقق من أن كل شيء يعمل كما هو متوقع، كل ذلك بينما لا يزال المستخدمون يستخدمون البيئة الزرقاء المستقرة.",
                    "<strong>4. تبديل الموجه:</strong> عندما تكون واثقًا من البيئة الخضراء، تقوم بإجراء التبديل. تقوم بتحديث تكوين الموجه (Nginx) ليشير إلى البيئة الخضراء بدلاً من الزرقاء. هذا التغيير فوري تقريبًا. كل حركة المرور الجديدة تذهب الآن إلى الإصدار الجديد.",
                    "<strong>5. الحالة النهائية:</strong> البيئة الخضراء هي الآن البيئة النشطة الجديدة. البيئة الزرقاء الأصلية خاملة الآن ولكنها لا تزال تحتوي على الإصدار القديم، جاهزة للعمل كنسخة احتياطية."
                ]},
                { type: ContentType.HEADING4, text: "الفوائد الرئيسية" },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "لا توقف على الإطلاق", definition: "التبديل بين البيئات هو تغيير تكوين فوري. لا توجد نافذة زمنية يكون فيها التطبيق غير متاح." },
                    { term: "تراجع فوري وبسيط", definition: "إذا اكتشفت مشكلة في الإصدار الجديد بعد التبديل، فإن التراجع هو ببساطة إعادة توجيه الموجه مرة أخرى إلى البيئة الزرقاء. هذا يستغرق ثوانٍ وهو خالٍ تمامًا من المخاطر." },
                    { term: "اختبار في بيئة الإنتاج", definition: "لديك بيئة متطابقة تمامًا مع الإنتاج (البيئة الخضراء) يمكنك اختبارها بثقة قبل توجيه أي مستخدمين إليها." }
                ]},
                { type: ContentType.NOTE, title: "الجانب السلبي", text: "العيب الرئيسي للنشر الأزرق/الأخضر هو التكلفة. يتطلب منك تشغيل ضعف موارد البنية التحتية (خوادم، قواعد بيانات إذا لم تكن مشتركة). ومع ذلك، بالنسبة للتطبيقات الهامة، فإن الموثوقية التي يوفرها غالبًا ما تفوق التكلفة الإضافية." },
              ]
            },
            {
              id: "p3_c4_s3",
              icon: "🔄",
              title: "المستوى 67: ورشة عمل: التوزيع بدون انقطاع باستخدام PM2",
              content: [
                { type: ContentType.PARAGRAPH, text: "قبل الغوص في استراتيجيات البنية التحتية المعقدة، من المهم أن نفهم أن الأدوات الحديثة مثل PM2 لديها آليات مدمجة لتحقيق عمليات إعادة تحميل سلسة. أمر `pm2 reload` ليس مجرد اختصار لـ `stop` ثم `start`؛ إنه مصمم خصيصًا لتقليل وقت التوقف إلى الحد الأدنى." },
                { type: ContentType.HEADING4, text: "كشف الخبايا: كيف يعمل `pm2 reload`؟" },
                { type: ContentType.PARAGRAPH, text: "عندما تقوم بتشغيل `pm2 reload <app_name>`، يحدث التسلسل التالي:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "1. يبدأ PM2 عملية جديدة تمامًا للتطبيق باستخدام الكود المحدث.",
                    "2. ينتظر PM2 حتى تعلن العملية الجديدة عن نفسها بأنها 'جاهزة' (online). يمكن للتطبيق إرسال إشارة `process.send('ready')` لإعلام PM2 عندما يكون قد انتهى من التهيئة (مثل الاتصال بقاعدة البيانات).",
                    "3. بمجرد أن تكون العملية الجديدة جاهزة، يرسل PM2 إشارة `SIGINT` إلى العملية القديمة، طالبًا منها إنهاء عملها بأمان.",
                    "4. تتوقف العملية القديمة عن قبول الاتصالات الجديدة، وتنهي أي طلبات قيد المعالجة، ثم تتوقف.",
                    "5. العملية الجديدة تتولى الآن خدمة جميع حركة المرور."
                ]},
                { type: ContentType.HEADING4, text: "ورشة عمل: تكوين الانتظار (`listen_timeout`)" },
                { type: ContentType.PARAGRAPH, text: "يمكنك التحكم في هذه العملية باستخدام ملفات النظام البيئي. `listen_timeout` يخبر PM2 بالمدة التي يجب أن ينتظرها بعد بدء العملية الجديدة قبل أن يعتبرها جاهزة (إذا لم ترسل إشارة 'ready')." },
                { type: ContentType.CODE_BLOCK, language: "javascript", codeTitle: "ecosystem.config.js", code: `module.exports = {
  apps : [{
    // ...
    listen_timeout: 3000, // Wait 3 seconds for the app to be ready
    kill_timeout: 5000     // Wait 5 seconds for the old process to shut down gracefully
  }]
};` },
                { type: ContentType.NOTE, title: "القيود", text: "هذه الطريقة فعالة للغاية للعديد من التطبيقات عديمة الحالة (stateless). ومع ذلك، لا تزال تحدث على نفس الخادم، وتستخدم نفس الموارد، ولا تعالج سيناريوهات النشر الأكثر تعقيدًا مثل تغييرات قاعدة البيانات الكبيرة أو الاختبار الشامل قبل التبديل. إنها خطوة أولى ممتازة نحو النشر بدون توقف، لكن استراتيجية الأزرق/الأخضر على مستوى Nginx توفر مستوى أعلى من العزل والأمان." },
              ]
            },
            {
              id: "p3_c4_s4",
              icon: "🔵🟢",
              title: "المستوى 68: ورشة عمل: تنفيذ النشر الأزرق/الأخضر باستخدام Nginx",
              content: [
                { type: ContentType.PARAGRAPH, text: "هذا هو التنفيذ الكلاسيكي للنشر الأزرق/الأخضر. سنقوم بإعداد Nginx بحيث يمكنه التبديل بسهولة بين نسختين من تطبيقنا تعملان على منافذ مختلفة. سنستخدم الروابط الرمزية (Symbolic Links) لإدارة تكوين Nginx النشط، مما يجعل عملية التبديل أمرًا ذريًا (atomic) واحدًا." },
                { type: ContentType.HEADING4, text: "الخطوة 1: إعداد البيئات" },
                { type: ContentType.PARAGRAPH, text: "سنحتاج إلى دليلين للتطبيق ونسختين من التطبيق تعملان على منافذ مختلفة:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>البيئة الزرقاء:</strong> الكود في `/var/www/my-app-blue`، يعمل على المنفذ 3000.",
                    "<strong>البيئة الخضراء:</strong> الكود في `/var/www/my-app-green`، يعمل على المنفذ 3001."
                ]},
                { type: ContentType.HEADING4, text: "الخطوة 2: تكوين Nginx" },
                { type: ContentType.PARAGRAPH, text: "في `/etc/nginx/sites-available`، سننشئ ملفي تكوين، واحد لكل بيئة:" },
                { type: ContentType.CODE_BLOCK, language: "nginx", codeTitle: "my-app-blue", code: `server {
    listen 80;
    server_name your_domain;
    location / {
        proxy_pass http://127.0.0.1:3000;
        # ... proxy headers ...
    }
}` },
                { type: ContentType.CODE_BLOCK, language: "nginx", codeTitle: "my-app-green", code: `server {
    listen 80;
    server_name your_domain;
    location / {
        proxy_pass http://127.0.0.1:3001;
        # ... proxy headers ...
    }
}` },
                { type: ContentType.HEADING4, text: "الخطوة 3: التفعيل بالرابط الرمزي" },
                { type: ContentType.PARAGRAPH, text: "لتفعيل البيئة الزرقاء، نقوم بإنشاء رابط رمزي واحد فقط في `sites-enabled`:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `sudo ln -s /etc/nginx/sites-available/my-app-blue /etc/nginx/sites-enabled/my-app` },
                { type: ContentType.HEADING4, text: "الخطوة 4: ورشة عمل: نص النشر الآلي" },
                { type: ContentType.PARAGRAPH, text: "الآن، يمكن لسير عمل CI/CD الخاص بنا تشغيل نص برمجي على الخادم يقوم بالتبديل:" },
                { type: ContentType.CODE_EXPLANATION, language: "bash", codeTitle: "deploy-blue-green.sh", code: `#!/bin/bash
# Determine which color is currently live and which is idle
if [ -L /etc/nginx/sites-enabled/my-app ] && [ "$(readlink /etc/nginx/sites-enabled/my-app)" = "/etc/nginx/sites-available/my-app-blue" ]; then
    IDLE_COLOR="green"
    IDLE_PORT=3001
else
    IDLE_COLOR="blue"
    IDLE_PORT=3000
fi

echo "Deploying to idle environment: $IDLE_COLOR"

# 1. Deploy code to the idle directory
cd /var/www/my-app-$IDLE_COLOR
git pull origin main
npm install --production

# 2. Start the idle application
pm2 start ecosystem.config.js --name my-app-$IDLE_COLOR -- --port $IDLE_PORT

# 3. Wait for it to be ready (warm-up)
sleep 5 # Simple wait, can be a health check curl

# 4. Switch Nginx
sudo ln -snf /etc/nginx/sites-available/my-app-$IDLE_COLOR /etc/nginx/sites-enabled/my-app
sudo systemctl reload nginx

echo "Switched Nginx to $IDLE_COLOR. It is now live."

# 5. Stop the old application
# (Implementation left as an exercise)
`, explanations: [
                    { lines: "2-11", explanation: "نكتشف البيئة الخاملة الحالية عن طريق فحص وجهة الرابط الرمزي." },
                    { lines: "15-17", explanation: "نقوم بسحب الكود وتثبيت الاعتماديات في الدليل الخامل." },
                    { lines: "20", explanation: "نبدأ النسخة الجديدة من التطبيق على منفذها المخصص." },
                    { lines: "26", explanation: "هذا هو الأمر الذري للتبديل. `ln -snf` يقوم بتحديث الرابط الرمزي الحالي بشكل آمن ليشير إلى ملف التكوين الجديد. ثم نقوم بإعادة تحميل Nginx بسلاسة." }
                ]},
              ]
            },
            {
              id: "p3_c4_s5",
              icon: "🐦",
              title: "المستوى 69: كشف الخبايا: مقدمة إلى النشر الكناري",
              content: [
                { type: ContentType.PARAGRAPH, text: "النشر الكناري هو استراتيجية أكثر دقة من الأزرق/الأخضر. بدلاً من تبديل 100% من حركة المرور دفعة واحدة، تقوم بإصدار الإصدار الجديد إلى مجموعة صغيرة جدًا من المستخدمين أولاً (الكناري). تراقب أداء ومعدلات الخطأ لهذه المجموعة الصغيرة. إذا كان كل شيء يبدو جيدًا، تقوم بزيادة نسبة حركة المرور إلى الإصدار الجديد تدريجيًا حتى يتلقى 100% من المستخدمين التحديث. إذا ظهرت مشاكل، يمكنك التراجع بسرعة عن طريق توجيه كل حركة المرور مرة أخرى إلى الإصدار القديم، مما يؤثر فقط على نسبة صغيرة من المستخدمين." },
                { type: ContentType.HEADING4, text: "ورشة عمل: التنفيذ باستخدام Nginx" },
                { type: ContentType.PARAGRAPH, text: "يمكن تحقيق هذا في Nginx باستخدام كتلة `upstream` الموزونة أو وحدة `split_clients`." },
                { type: ContentType.CODE_EXPLANATION, language: "nginx", codeTitle: "النشر الكناري الموزون", code: `upstream myapp_backend {
    # Stable version
    server 127.0.0.1:3000 weight=95;
    
    # Canary version (new release)
    server 127.0.0.1:4000 weight=5;
}

server {
    # ...
    location / {
        proxy_pass http://myapp_backend;
    }
}`, explanations: [
                    { lines: "1-7", explanation: "في هذا التكوين، سيقوم Nginx بإرسال 95% من الطلبات إلى الإصدار المستقر على المنفذ 3000 و 5% فقط إلى إصدار الكناري الجديد على المنفذ 4000." }
                ]},
                { type: ContentType.HEADING4, text: "لماذا الكناري؟" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>تقليل المخاطر:</strong> يتم كشف الأخطاء على مجموعة صغيرة من المستخدمين، مما يقلل من تأثير الفشل.",
                    "<strong>اختبار في العالم الحقيقي:</strong> يمنحك بيانات حقيقية حول كيفية أداء إصدارك الجديد تحت حمل إنتاجي حقيقي.",
                    "<strong>الثقة في النشر:</strong> يسمح لك بالنشر بثقة أكبر، مع العلم أن لديك شبكة أمان."
                ]},
                { type: ContentType.NOTE, title: "التعقيد", text: "النشر الكناري أكثر تعقيدًا في الأتمتة ويتطلب أدوات مراقبة قوية لتحديد ما إذا كان إصدار الكناري 'جيدًا' أم 'سيئًا'. غالبًا ما يتم استخدامه في الأنظمة واسعة النطاق حيث يكون حتى أدنى توقف أو خطأ مكلفًا." },
              ]
            }
        ]
    },
    {
        id: "p3_c5", chapterTitle: "الفصل الخامس عشر: أدوات CI/CD أخرى",
        sections: [
            {
              id: "p3_c5_s1",
              icon: "👴",
              title: "المستوى 70: دراسة حالة: Jenkins - القوة والمرونة",
              content: [
                { type: ContentType.PARAGRAPH, text: "Jenkins هو الأب الروحي لعالم CI/CD. إنه مشروع مفتوح المصدر وناضج للغاية كان موجودًا منذ سنوات وهو الخيار المفضل في العديد من الشركات الكبيرة. على عكس GitHub Actions أو GitLab CI، فإن Jenkins هو خادم مستقل تقوم بتثبيته وإدارته بنفسك على بنيتك التحتية." },
                { type: ContentType.HEADING4, text: "نقاط القوة:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>قابلية التوسعة القصوى:</strong> قوة Jenkins الحقيقية تكمن في نظامه البيئي الهائل الذي يضم آلاف المكونات الإضافية (plugins). هناك مكون إضافي لكل شيء تقريبًا، من التكامل مع كل أداة سحابية يمكن تخيلها إلى عرض تقارير الاختبارات المعقدة.",
                    "<strong>التحكم الكامل:</strong> نظرًا لأنك تستضيفه بنفسك، فلديك سيطرة كاملة على البيئة، والأمان، والموارد. يمكنك تخصيص كل جانب من جوانب سلوكه.",
                    "<strong>المرونة:</strong> يمكنه بناء واختبار ونشر أي نوع من المشاريع تقريبًا، من تطبيقات Java القديمة إلى مشاريع التعلم الآلي الحديثة."
                ]},
                { type: ContentType.HEADING4, text: "نقاط الضعف:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>عبء الإدارة:</strong> قوته هي أيضًا ضعفه. أنت مسؤول عن تثبيت خادم Jenkins وتأمينه وتحديثه والنسخ الاحتياطي له وإدارة مكوناته الإضافية. يمكن أن يصبح هذا وظيفة بدوام كامل في حد ذاته.",
                    "<strong>واجهة مستخدم قديمة:</strong> على الرغم من التحسينات، لا تزال واجهة المستخدم تبدو قديمة مقارنة بالمنصات الحديثة.",
                    "<strong>منحنى التعلم:</strong> تكوين خطوط الأنابيب (باستخدام `Jenkinsfile` المكتوب بلغة Groovy) وإدارة النظام يمكن أن يكون معقدًا وصعبًا للمبتدئين."
                ]},
              ]
            },
            {
              id: "p3_c5_s2",
              icon: "🦊",
              title: "المستوى 71: دراسة حالة: GitLab CI/CD - منصة DevOps المتكاملة",
              content: [
                { type: ContentType.PARAGRAPH, text: "GitLab CI/CD هو المنافس المباشر لـ GitHub Actions، وهو مدمج بعمق في منصة GitLab. GitLab يهدف إلى أن يكون منصة DevOps كاملة في منتج واحد، و CI/CD هو جزء أساسي من هذه الرؤية." },
                { type: ContentType.HEADING4, text: "نقاط القوة:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>تكامل شامل:</strong> كل شيء يعمل معًا بسلاسة. يمكنك تتبع مشكلة من لوحة Kanban، إلى طلب دمج، إلى خط أنابيب CI/CD، إلى إصدار، كل ذلك داخل نفس الواجهة.",
                    "<strong>ميزات مدمجة قوية:</strong> يوفر GitLab ميزات متقدمة مدمجة، مثل سجل الحاويات الخاص، وفحص أمان الكود (SAST)، وفحص أمان الاعتماديات، ومراجعات التطبيقات، والتي غالبًا ما تتطلب إجراءات أو أدوات خارجية في GitHub Actions.",
                    "<strong>الاستضافة الذاتية والسحابة:</strong> مثل GitLab نفسه، يمكنك استخدام الإصدار السحابي (SaaS) أو استضافة كل شيء على خوادمك الخاصة للحصول على أقصى درجات التحكم."
                ]},
                { type: ContentType.HEADING4, text: "نقاط الضعف:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>مقيد بـ GitLab:</strong> إنه مصمم للعمل مع مستودعات GitLab. في حين أن هناك طرقًا لربطه بمستودعات خارجية، إلا أنه يفقد الكثير من سحره.",
                    "<strong>تعقيد الميزات:</strong> يمكن أن تكون مجموعة الميزات الواسعة مربكة بعض الشيء في البداية."
                ]},
                { type: ContentType.PARAGRAPH, text: "إذا كان فريقك يستخدم GitLab بالفعل، فإن استخدام CI/CD المدمج فيه هو الخيار المنطقي بلا منازع." },
              ]
            },
            {
              id: "p3_c5_s3",
              icon: "🔵",
              title: "المستوى 72: دراسة حالة: CircleCI - السرعة وتجربة المطور",
              content: [
                { type: ContentType.PARAGRAPH, text: "CircleCI هي منصة CI/CD سحابية رائدة ومعروفة بسرعتها وأدائها وتجربة المطور الممتازة. إنها ليست مرتبطة بنظام أساسي محدد للتحكم في الإصدار وتتكامل بسلاسة مع GitHub و Bitbucket و GitLab." },
                { type: ContentType.HEADING4, text: "نقاط القوة:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>السرعة والأداء:</strong> غالبًا ما يتم الإشادة بـ CircleCI لكونه أحد أسرع منصات CI/CD، مع آليات تخزين مؤقت قوية وتشغيل مهام متوازية متقدمة.",
                    "<strong>تجربة المطور:</strong> واجهة المستخدم نظيفة وحديثة، وملفات التكوين (YAML) منظمة جيدًا، وتصحيح الأخطاء عبر SSH في العداء الفاشل هي ميزة قوية للغاية.",
                    "<strong>Orbs:</strong> هي حزم تكوين قابلة لإعادة الاستخدام، تشبه إلى حد كبير GitHub Actions، مما يسهل دمج الأدوات والخدمات الشائعة."
                ]},
                { type: ContentType.HEADING4, text: "نقاط الضعف:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>السحابة أولاً:</strong> على الرغم من وجود خيار للاستضافة الذاتية، إلا أن CircleCI مصمم بشكل أساسي كمنتج SaaS.",
                    "<strong>التكلفة:</strong> يمكن أن يصبح النموذج القائم على الائتمان مكلفًا للفرق الكبيرة أو المشاريع التي تتطلب الكثير من وقت البناء."
                ]},
              ]
            },
            {
              id: "p3_c5_s4",
              icon: "📊",
              title: "المستوى 73: دراسة حالة: مقارنة مفصلة بين المنصات",
              content: [
                { type: ContentType.PARAGRAPH, text: "دعنا نلخص الاختلافات الرئيسية في جدول مقارنة:" },
                { type: ContentType.PREFORMATTED_TEXT, text: `| الميزة          | GitHub Actions                          | GitLab CI/CD                            | Jenkins                                 | CircleCI                                |
|------------------|-----------------------------------------|-----------------------------------------|-----------------------------------------|-----------------------------------------|
| الاستضافة        | SaaS (مع خيار الاستضافة الذاتية)        | SaaS و الاستضافة الذاتية                 | الاستضافة الذاتية فقط                    | SaaS (مع خيار الاستضافة الذاتية)        |
| التكامل          | مدمج بعمق في GitHub                     | مدمج بعمق في GitLab                     | مستقل عن المنصة (يتكامل مع كل شيء)      | مستقل عن المنصة (GitHub, GitLab, etc.) |
| سهولة الاستخدام   | سهل جدًا للبدء                        | سهل إلى متوسط                         | صعب، منحنى تعلم حاد                   | سهل، تجربة مطور ممتازة                |
| التوسعة          | ممتاز (GitHub Marketplace)              | جيد (قوالب مدمجة)                       | الأفضل في فئته (آلاف المكونات الإضافية)   | جيد جدًا (Orbs)                         |
| الصيانة          | لا يوجد (لـ SaaS)                       | لا يوجد (لـ SaaS)                       | عالية جدًا                              | لا يوجد (لـ SaaS)                       |
| الميزات الرئيسية  | تكامل سلس، مجتمع كبير                  | منصة DevOps شاملة، أمان مدمج           | تخصيص لا نهائي، مرونة                  | سرعة، أداء، تصحيح أخطاء SSH          |` },
              ]
            },
            {
              id: "p3_c5_s5",
              icon: "🎯",
              title: "المستوى 74: دراسة حالة: اختيار الأداة المناسبة لمشروعك",
              content: [
                { type: ContentType.PARAGRAPH, text: "لا يوجد 'أفضل' أداة CI/CD واحدة للجميع. يعتمد الاختيار الصحيح على سياقك المحدد. إليك بعض الإرشادات لمساعدتك على اتخاذ القرار:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>إذا كنت تستخدم GitHub بالفعل لمشروعك...</strong> ابدأ بـ **GitHub Actions**. إنه الخيار الأكثر منطقية. إنه مدمج، ولديه خطة مجانية سخية، ومجتمع ضخم، ومن المحتمل أن يلبي 95% من احتياجاتك.",
                    "<strong>إذا كنت تستخدم GitLab بالفعل...</strong> استخدم **GitLab CI/CD**. لا يوجد سبب للبحث في مكان آخر. التكامل السلس والميزات المدمجة تجعله الخيار الأفضل بلا منازع داخل النظام البيئي لـ GitLab.",
                    "<strong>إذا كنت في شركة كبيرة لديها متطلبات أمان صارمة، أو تحتاج إلى تكاملات معقدة مع أنظمة قديمة، أو تحتاج إلى التحكم الكامل في بيئة البناء...</strong> قد يكون **Jenkins** هو الخيار المناسب. كن مستعدًا لتخصيص فريق أو شخص لإدارته.",
                    "<strong>إذا كان فريقك يقدر السرعة والأداء فوق كل شيء، ويعمل على مشاريع سحابية حديثة، ويريد أفضل تجربة للمطور...</strong> ففكر في **CircleCI**. غالبًا ما يتم اختياره من قبل الشركات الناشئة والشركات التي تركز على التكنولوجيا والتي ترغب في التحرك بسرعة."
                ]},
                { type: ContentType.NOTE, title: "سر المحترفين: المبادئ أهم من الأدوات", text: "الأداة التي تختارها أقل أهمية من المبادئ التي تطبقها. إن فهم مفاهيم التكامل المستمر، والنشر بدون توقف، والبنية التحتية ككود هو ما سيجعلك مهندسًا فعالاً. الأدوات تتغير، لكن المبادئ تبقى." },
              ]
            }
        ]
    }
  ]
};