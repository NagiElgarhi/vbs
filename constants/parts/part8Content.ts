import { Part, ContentType } from '../../types';

export const part8Content: Part = {
  id: "p8",
  partTitle: "الباب الثامن: البنية التحتية ككود (IaC)",
  icon: "🏗️",
  chapters: [
    {
        id: "p8_c1", chapterTitle: "الفصل الأول: مقدمة إلى IaC",
        sections: [
            {
              id: "p8_c1_s1",
              icon: "🤔",
              title: "المستوى 175: ما هي البنية التحتية ككود ولماذا؟",
              content: [
                { type: ContentType.PARAGRAPH, text: "حتى الآن، قمنا ببناء وتكوين خادمنا خطوة بخطوة، باستخدام أوامر مباشرة عبر SSH. هذه الطريقة رائعة للتعلم، لكنها تصبح كابوسًا في العالم الحقيقي. ماذا لو احتجت إلى إعداد 5 خوادم ويب متطابقة؟ ماذا لو تعطل خادمك بالكامل واحتجت إلى إعادة بنائه بسرعة من الصفر؟ الطريقة اليدوية بطيئة، عرضة للخطأ البشري، ومن المستحيل تكرارها بشكل موثوق." },
                { type: ContentType.PARAGRAPH, text: "البنية التحتية ككود (Infrastructure as Code - IaC) هي ممارسة إدارة وتوفير البنية التحتية (الخوادم، موازنات التحميل، قواعد البيانات، الشبكات) من خلال ملفات تعريف يمكن قراءتها آليًا، بدلاً من التكوين المادي للأجهزة أو أدوات التكوين التفاعلية. أنت تكتب كودًا يصف البنية التحتية التي تريدها، وتقوم أداة IaC بجعلها حقيقة." },
                { type: ContentType.HEADING4, text: "دراسة حالة: قبل وبعد IaC" },
                { type: ContentType.PARAGRAPH, text: "لتوضيح القوة التحويلية لـ IaC، دعنا نقارن بين طريقتين لإعداد خادم ويب بسيط." },
                {
                  type: ContentType.CODE_EXPLANATION,
                  codeTitle: "الطريقة القديمة: نص برمجي Bash",
                  language: "bash",
                  code: `#!/bin/bash
# A script to set up a basic web server

echo "Updating packages..."
apt-get update -y

echo "Installing Nginx..."
apt-get install nginx -y

echo "Creating web directory..."
mkdir -p /var/www/my-app

echo "Creating dummy index file..."
echo "<h1>Hello from Bash</h1>" > /var/www/my-app/index.html

echo "Configuring Nginx..."
cat > /etc/nginx/sites-available/my-app << EOL
server {
    listen 80;
    root /var/www/my-app;
    index index.html;
}
EOL

echo "Enabling site..."
ln -s /etc/nginx/sites-available/my-app /etc/nginx/sites-enabled/

echo "Restarting Nginx..."
systemctl restart nginx

echo "Done!"`,
                  explanations: [
                    { lines: "1-30", explanation: "**العيوب:** هذا النص حتمي (يحدد 'كيف')، طويل، وعرضة للخطأ. ليس له 'حالة' - إذا فشل في منتصف الطريق، فقد يترك النظام في حالة غير متسقة. تشغيله مرة أخرى قد يسبب أخطاء. التحقق مما إذا كان الخادم في الحالة الصحيحة أمر صعب." }
                  ]
                },
                {
                  type: ContentType.CODE_EXPLANATION,
                  codeTitle: "طريقة IaC: ملف Terraform",
                  language: "hcl",
                  code: `resource "hcloud_server" "web" {
  name        = "my-app-server"
  server_type = "cpx11"
  image       = "ubuntu-22.04"

  user_data = <<-EOF
    #cloud-config
    packages:
      - nginx
    runcmd:
      - mkdir -p /var/www/my-app
      - echo "<h1>Hello from Terraform</h1>" > /var/www/my-app/index.html
      # Nginx's default config is often sufficient for this
  EOF
}`,
                  explanations: [
                    { lines: "1-14", explanation: "**المزايا:** هذا الكود تصريحي (يصف 'ماذا'). إنه موجز، سهل القراءة، ويدير الحالة. Terraform يعرف ما إذا كان الخادم موجودًا بالفعل. يمكنك تشغيل `terraform apply` مائة مرة، وإذا لم يتغير شيء، فلن يتم إجراء أي تغييرات. إنه متسق وقابل للتكرار." }
                  ]
                },
                { type: ContentType.HEADING4, text: "الفوائد التي تغير قواعد اللعبة:" },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "التكرار والثبات", definition: "يمكنك إنشاء نفس البيئة مرارًا وتكرارًا، مع ضمان أنها متطابقة في كل مرة. هذا يقضي على مشكلة 'لكنه يعمل على جهازي!'." },
                    { term: "السرعة والكفاءة", definition: "يمكن إنشاء بيئات معقدة كاملة في دقائق، بدلاً من ساعات أو أيام من العمل اليدوي." },
                    { term: "التحكم في الإصدارات", definition: "يمكن تخزين كود البنية التحتية الخاص بك في Git. يمكنك تتبع كل تغيير، ومراجعة التغييرات عبر طلبات السحب (Pull Requests)، والعودة إلى إصدار سابق إذا حدث خطأ." },
                    { term: "تقليل المخاطر", definition: "الأتمتة تقلل بشكل كبير من مخاطر الخطأ البشري الذي يمكن أن يؤدي إلى تكوينات خاطئة أو انقطاع في الخدمة." },
                    { term: "التعاون", definition: "يمكن للفريق بأكمله رؤية وفهم والمساهمة في تعريف البنية التحتية، تمامًا مثل كود التطبيق." }
                ]}
              ]
            },
            {
              id: "p8_c1_s2",
              icon: "🛠️",
              title: "المستوى 176: مقارنة بين الأدوات: Terraform, Ansible, Pulumi",
              content: [
                { type: ContentType.PARAGRAPH, text: "هناك نوعان رئيسيان من أدوات IaC: أدوات التزويد (Provisioning Tools) وأدوات إدارة التكوين (Configuration Management Tools). في كثير من الأحيان، يتم استخدامهما معًا." },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "Terraform", definition: "الأداة الرائدة في تزويد البنية التحتية. إنها أداة **تصريحية** (declarative). أنت تصف الحالة النهائية التي تريدها (أريد خادمًا بهذه المواصفات)، و Terraform يكتشف كيفية الوصول إلى هناك. إنه يتفوق في إنشاء وتعديل وحذف الموارد السحابية." },
                    { term: "Ansible", definition: "الأداة الرائدة في إدارة التكوين. إنها أداة **حتمية** (imperative). أنت تكتب سلسلة من الخطوات (تثبيت nginx، نسخ هذا الملف، بدء الخدمة). إنه يتفوق في تكوين البرامج على خادم موجود بالفعل. لا يتطلب أي 'وكيل' (agent) على الخوادم، ويعمل عبر SSH." },
                    { term: "Pulumi", definition: "نهج أحدث يسمح لك بتعريف البنية التحتية باستخدام لغات برمجة للأغراض العامة مثل TypeScript أو Python أو Go. هذا يمنحك قوة الحلقات والوظائف والفئات، ولكنه يأتي مع تعقيد إضافي." }
                ]},
                { type: ContentType.NOTE, title: "Terraform + Ansible = فريق الأحلام", text: "النمط الأكثر شيوعًا وفعالية هو استخدام Terraform لتزويد البنية التحتية الأساسية (إنشاء الـ VPS، تكوين الشبكة وجدار الحماية)، ثم تمرير عنوان IP للخادم الجديد إلى Ansible. بعد ذلك، يتولى Ansible مهمة تكوين البرامج داخل هذا الـ VPS (تثبيت Nginx، إعداد تطبيقك، إنشاء المستخدمين). هذا يفصل الاهتمامات ويسمح لكل أداة بالتألق في ما تفعله بشكل أفضل. Terraform يبني المنزل، و Ansible يؤثثه." },
              ]
            },
            {
              id: "p8_c1_s3",
              icon: "📜",
              title: "المستوى 177: فهم البرمجة الحتمية مقابل التصريحية",
              content: [
                { type: ContentType.PARAGRAPH, text: "فهم هذا الاختلاف هو المفتاح لفهم فلسفة أدوات IaC." },
                { type: ContentType.HEADING4, text: "النهج الحتمي (Imperative) - 'كيف'" },
                { type: ContentType.PARAGRAPH, text: "يشبه إعطاء تعليمات الطبخ خطوة بخطوة أو إعطاء توجيهات مفصلة لشخص ما. أنت تحدد كل خطوة يجب اتخاذها للوصول إلى النتيجة النهائية. Ansible هو مثال جيد. أنت تكتب: `TASK 1: Install nginx`, `TASK 2: Copy config file`, `TASK 3: Start service`. أنت مسؤول عن المنطق والتسلسل. إذا كان nginx مثبتًا بالفعل، يجب أن تكون المهمة ذكية بما يكفي لتخطيه." },
                { type: ContentType.HEADING4, text: "النهج التصريحي (Declarative) - 'ماذا'" },
                { type: ContentType.PARAGRAPH, text: "يشبه إظهار صورة للطبق النهائي للطاهي أو إعطاء عنوان الوجهة لنظام تحديد المواقع العالمي (GPS). أنت تصف الحالة النهائية التي تريدها، والأداة هي المسؤولة عن اكتشاف الخطوات اللازمة للوصول إلى هناك من الحالة الحالية. Terraform هو مثال جيد. أنت تكتب: `resource \"hcloud_server\" \"web\" { image = \"ubuntu-22.04\" ... }`. لا تخبر Terraform بكيفية إنشاء الخادم؛ أنت فقط تصف كيف يجب أن يبدو. إذا قمت بتغيير `image` إلى `ubuntu-24.04`، فإن Terraform ذكي بما يكفي ليعرف أنه يجب عليه تدمير الخادم القديم وإنشاء واحد جديد." },
                { type: ContentType.NOTE, title: "لماذا التصريحي قوي للبنية التحتية؟", text: "النهج التصريحي يمنع 'انحراف التكوين' (configuration drift). بمرور الوقت، يمكن أن تصبح التغييرات اليدوية على الخادم غير متزامنة مع التكوين الأصلي. مع Terraform، يمكنك دائمًا تشغيل `terraform plan` لرؤية الفرق بين الحالة الموصوفة في الكود الخاص بك والواقع الفعلي، ثم `terraform apply` لإعادة الواقع إلى التوافق مع الكود. إنه يفرض 'مصدر حقيقة' واحدًا." },
              ]
            },
            {
              id: "p8_c1_s4",
              icon: "💻",
              title: "المستوى 178: إعداد بيئة عمل IaC",
              content: [
                { type: ContentType.PARAGRAPH, text: "قبل أن نتمكن من بناء أي شيء، نحتاج إلى تثبيت الأدوات على جهاز الكمبيوتر المحلي الخاص بنا." },
                { type: ContentType.HEADING4, text: "تثبيت Terraform" },
                { type: ContentType.PARAGRAPH, text: "Terraform هو ملف ثنائي واحد. الطريقة الأسهل لإدارته هي عبر مديري الحزم مثل Homebrew (macOS) أو Chocolatey (Windows)، أو عن طريق تنزيله مباشرة من موقع HashiCorp." },
                { type: ContentType.HEADING4, text: "تثبيت Ansible" },
                { type: ContentType.PARAGRAPH, text: "Ansible مكتوب بلغة Python، لذا فإن أفضل طريقة لتثبيته هي عبر `pip` في بيئة Python افتراضية." },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `python3 -m venv ansible_env
source ansible_env/bin/activate
pip install ansible` },
                { type: ContentType.HEADING4, text: "تكوين مفاتيح API للمزود" },
                { type: ContentType.PARAGRAPH, text: "ستحتاج إلى إنشاء رمز API من مزود VPS الخاص بك (مثل DigitalOcean أو Hetzner). **لا تقم أبدًا بكتابة هذا الرمز مباشرة في الكود الخاص بك!** الطريقة القياسية هي تعيينه كمتغير بيئة في الـ shell الخاص بك:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `export HCLOUD_TOKEN="your_hetzner_api_token"` },
                { type: ContentType.PARAGRAPH, text: "سيبحث موفر Terraform تلقائيًا عن متغيرات البيئة هذه." },
              ]
            },
            {
              id: "p8_c1_s5",
              icon: "🔗",
              title: "المستوى 179: تكامل IaC مع Git",
              content: [
                { type: ContentType.PARAGRAPH, text: "الخطوة الأخيرة والأكثر أهمية هي معاملة كود البنية التحتية الخاص بك بنفس الاحترام الذي تعامل به كود تطبيقك. هذا يعني وضعه في نظام التحكم في الإصدارات." },
                { type: ContentType.HEADING4, text: "سير العمل" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "1. قم بإنشاء مستودع Git جديد لمشروع البنية التحتية الخاص بك (`infra-project`).",
                    "2. **الأهم على الإطلاق:** قم بإنشاء ملف `.gitignore` قوي. هذا يجب أن يتجاهل أي ملفات حالة محلية أو ملفات مؤقتة تنشئها أدواتك.",
                    "3. قم بتطوير البنية التحتية الخاصة بك على فرع (مثل `feature/add-database`).",
                    "4. افتح طلب سحب (Pull Request) لمراجعة التغييرات من قبل أعضاء الفريق الآخرين. مخرجات `terraform plan` يمكن لصقها في طلب السحب للمراجعة.",
                    "5. بمجرد الموافقة، قم بدمج التغييرات في الفرع الرئيسي (`main`)."
                ]},
                { type: ContentType.CODE_BLOCK, language: "text", codeTitle: ".gitignore for Terraform/Ansible", code: `# Terraform
**/.terraform/*
*.tfstate
*.tfstate.*
crash.log
.terraform.lock.hcl

# Ansible
*.retry` },
              ]
            }
        ]
    },
    {
        id: "p8_c2", chapterTitle: "الفصل الثاني: إدارة الموارد مع Terraform",
        sections: [
            {
              id: "p8_c2_s1",
              icon: "📄",
              title: "المستوى 180: تثبيت Terraform وكتابة أول تكوين",
              content: [
                { type: ContentType.PARAGRAPH, text: "الآن بعد أن تم إعداد كل شيء، حان الوقت لكتابة أول كود Terraform لنا. سنبدأ ببساطة لتعلم دورة حياة Terraform الأساسية." },
                { type: ContentType.HEADING4, text: "دورة حياة Terraform" },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "terraform init", definition: "يجب تشغيله مرة واحدة في بداية كل مشروع. يقوم بتنزيل المكونات الإضافية للمزود (`provider plugins`) اللازمة وتهيئة الدليل." },
                    { term: "terraform plan", definition: "يقرأ الكود الخاص بك وحالة العالم الحقيقي، ثم يعرض لك 'خطة' لما سيقوم به. هذه خطوة للقراءة فقط وهي آمنة تمامًا. إنها تخبرك بما سيتم إنشاؤه أو تعديله أو حذفه." },
                    { term: "terraform apply", definition: "يقوم بتنفيذ الخطة التي تم إنشاؤها. سيطلب منك تأكيدًا قبل إجراء أي تغييرات." },
                    { term: "terraform destroy", definition: "يقوم بتدمير جميع الموارد المدارة بواسطة التكوين الحالي." }
                ]},
                { type: ContentType.HEADING4, text: "أول تكوين لنا: `main.tf`" },
                { type: ContentType.CODE_EXPLANATION, language: "hcl", codeTitle: "main.tf", code: `terraform {
  required_providers {
    hcloud = {
      source  = "hetznercloud/hcloud"
      version = "~> 1.0"
    }
  }
}

provider "hcloud" {
  # The token is read from the HCLOUD_TOKEN environment variable
}

resource "hcloud_ssh_key" "my_key" {
  name       = "my-ssh-key-tf"
  public_key = file("~/.ssh/id_rsa.pub")
}
`, explanations: [
                    { lines: "1-9", explanation: "كتلة `terraform` تحدد متطلبات المزود. نحن نخبر Terraform بأننا نحتاج إلى مزود `hcloud` من Hetzner." },
                    { lines: "11-13", explanation: "كتلة `provider` تقوم بتكوين المزود. هنا، نتركها فارغة لأن المزود سيقرأ الرمز المميز تلقائيًا من متغير البيئة." },
                    { lines: "15-18", explanation: "هذه هي أول 'مورد' لنا. `resource \"hcloud_ssh_key\" \"my_key\"` يخبر Terraform بأننا نريد إدارة مورد من نوع `hcloud_ssh_key` ونطلق عليه اسم `my_key` داخل الكود الخاص بنا. نقوم بتعيين اسمه في Hetzner ونقرأ محتوى مفتاحنا العام من ملف." }
                ]},
              ]
            },
            {
              id: "p8_c2_s2",
              icon: "🚀",
              title: "المستوى 181: إعداد بنية تحتية واقعية: الخادم، القرص، وجدار الحماية",
              content: [
                { type: ContentType.PARAGRAPH, text: "الآن، لنبني بنية تحتية أكثر واقعية. خادم واحد جيد، لكن الخادم الحقيقي يحتاج إلى تخزين دائم وجدار حماية. سنقوم بتوسيع تكويننا لإنشاء خادم، وقرص تخزين منفصل، وجدار حماية، ثم نربطهم جميعًا معًا." },
                { type: ContentType.CODE_EXPLANATION, language: "hcl", codeTitle: "توسيع main.tf", code: `
# ... (terraform, provider, and ssh_key blocks from previous level) ...

# 1. إنشاء قرص تخزين منفصل
resource "hcloud_volume" "app_data" {
  name     = "my-app-data-vol"
  size     = 10
  location = "nbg1"
  format   = "ext4"
}

# 2. إنشاء خادم الويب
resource "hcloud_server" "web_1" {
  name        = "web-server-1"
  server_type = "cpx11"
  image       = "ubuntu-22.04"
  location    = "nbg1"
  ssh_keys    = [hcloud_ssh_key.my_key.id]
}

# 3. ربط القرص بالخادم
resource "hcloud_volume_attachment" "app_data_attachment" {
  volume_id = hcloud_volume.app_data.id
  server_id = hcloud_server.web_1.id
  automount = true
}

# 4. إنشاء جدار حماية
resource "hcloud_firewall" "web_firewall" {
  name = "web-firewall"
  rule {
    direction = "in"
    protocol  = "tcp"
    port      = "22"
    source_ips = [
      "0.0.0.0/0",
      "::/0"
    ]
  }
  rule {
    direction = "in"
    protocol  = "tcp"
    port      = "80"
    source_ips = ["0.0.0.0/0", "::/0"]
  }
  rule {
    direction = "in"
    protocol  = "tcp"
    port      = "443"
    source_ips = ["0.0.0.0/0", "::/0"]
  }
}

# 5. تطبيق جدار الحماية على الخادم
resource "hcloud_firewall_attachment" "fw_attachment" {
  firewall_id = hcloud_firewall.web_firewall.id
  server_ids  = [hcloud_server.web_1.id]
}`, explanations: [
                    { lines: "4-10", explanation: "نحدد مورد `hcloud_volume`. فصل بيانات التطبيق على قرص منفصل هو ممارسة جيدة للنسخ الاحتياطي والمرونة." },
                    { lines: "22-26", explanation: "نحدد مورد `hcloud_volume_attachment`. لاحظ كيف نشير إلى `id` كل من القرص والخادم. هذا ينشئ تبعية، مما يضمن أن Terraform سينشئ كلاهما قبل محاولة الربط." },
                    { lines: "29-54", explanation: "نحدد مورد `hcloud_firewall` مع قواعد للسماح بالاتصالات الواردة على منافذ SSH و HTTP و HTTPS." },
                    { lines: "57-60", explanation: "أخيرًا، نستخدم `hcloud_firewall_attachment` لتطبيق مجموعة القواعد هذه على خادمنا. هذا يوضح قوة الربط بين الموارد في Terraform." }
                ]},
                { type: ContentType.PARAGRAPH, text: "بعد تشغيل `terraform apply` على هذا التكوين، سيكون لديك بنية تحتية صغيرة ولكنها كاملة وجاهزة للإنتاج، تم إنشاؤها بالكامل من الكود." },
              ]
            },
            {
              id: "p8_c2_s3",
              icon: "💾",
              title: "المستوى 182: كشف خبايا حالة Terraform",
              content: [
                { type: ContentType.PARAGRAPH, text: "بعد تشغيل `apply`، ستلاحظ ملفًا جديدًا: `terraform.tfstate`. هذا الملف هو دماغ Terraform. إنه ملف JSON يسجل الموارد التي قمت بإنشائها، ومعرفاتها الفعلية في العالم الحقيقي (مثل معرف الخادم في Hetzner)، وجميع سماتها. عندما تقوم بتشغيل `plan`، يقارن Terraform بين الكود الخاص بك، وملف الحالة هذا، والواقع لمعرفة ما تغير." },
                { type: ContentType.HEADING4, text: "خطر انحراف الحالة (State Drift)" },
                { type: ContentType.PARAGRAPH, text: "ماذا لو قمت، بعد نشر جدار الحماية، بتسجيل الدخول إلى لوحة تحكم Hetzner وأضفت قاعدة للسماح بالمنفذ 8080 يدويًا؟ لقد أنشأت الآن 'انحرافًا'. العالم الحقيقي لم يعد يطابق ما هو مسجل في ملف الحالة الخاص بك. في المرة التالية التي تقوم فيها بتشغيل `terraform plan`، سيكتشف Terraform هذا الانحراف ويقترح تغييرًا لإزالة القاعدة 8080 'لإصلاح' الواقع ليعود متوافقًا مع الكود. هذه ميزة قوية للغاية لمنع التغييرات اليدوية غير الموثقة." },
                { type: ContentType.HEADING4, text: "أهمية قفل الحالة (State Locking)" },
                { type: ContentType.PARAGRAPH, text: "تخيل أنك وزميلك تعملان على نفس البنية التحتية. تقوم بتشغيل `terraform apply` لإضافة خادم جديد. في نفس الوقت بالضبط، يقوم زميلك بتشغيل `apply` لتغيير نوع خادم موجود. كلا العمليتين ستقرأان نفس ملف الحالة الأولي، لكن كلاهما سيحاول كتابة ملف حالة جديد في النهاية. العملية التي تنتهي أخيرًا ست sobrescribe تغييرات الأخرى، مما يؤدي إلى إفساد الحالة وفقدان تتبع الموارد. هذه حالة سباق (race condition)." },
                { type: ContentType.NOTE, title: "الحل: الواجهات الخلفية عن بعد (Remote Backends)", text: "الواجهة الخلفية عن بعد تحل كلتا المشكلتين. إنها تخبر Terraform بتخزين ملف الحالة في موقع مشترك ومؤمن (مثل AWS S3 أو Terraform Cloud). الأهم من ذلك، أن الواجهات الخلفية عن بعد تدعم **قفل الحالة**. قبل أن يبدأ Terraform أي عملية كتابة، فإنه 'يقفل' الحالة. إذا حاول شخص آخر تشغيل `apply` في نفس الوقت، فسيرى رسالة بأن الحالة مقفلة وسيتعين عليه الانتظار. هذا يضمن أن عملية واحدة فقط يمكنها تعديل البنية التحتية في كل مرة، مما يمنع إفساد الحالة." },
              ]
            },
            {
              id: "p8_c2_s4",
              icon: "↔️",
              title: "المستوى 183: استخدام المتغيرات والمخرجات",
              content: [
                { type: ContentType.PARAGRAPH, text: "كتابة القيم مباشرة في الكود (Hardcoding) أمر سيء. المتغيرات والمخرجات تجعل تكويناتك قابلة لإعادة الاستخدام وأكثر مرونة." },
                { type: ContentType.HEADING4, text: "المتغيرات (Variables)" },
                { type: ContentType.PARAGRAPH, text: "لنقم بتعريف متغير لنوع الخادم:" },
                { type: ContentType.CODE_BLOCK, language: "hcl", codeTitle: "variables.tf", code: `variable "server_type" {
  description = "The type of server to provision."
  type        = string
  default     = "cpx11"
}

variable "location" {
  description = "The Hetzner location to deploy to."
  type = string
  default = "nbg1"
}` },
                { type: ContentType.PARAGRAPH, text: "الآن في `main.tf`، يمكنك استخدامه:" },
                { type: ContentType.CODE_BLOCK, language: "hcl", code: `resource "hcloud_server" "web_1" {
  # ...
  server_type = var.server_type
  location    = var.location
  # ...
}` },
                { type: ContentType.HEADING4, text: "المخرجات (Outputs)" },
                { type: ContentType.PARAGRAPH, text: "بعد إنشاء خادم، نريد معرفة عنوان IP الخاص به. يمكننا استخدام كتلة الإخراج:" },
                { type: ContentType.CODE_BLOCK, language: "hcl", codeTitle: "outputs.tf", code: `output "web_server_ip" {
  description = "The public IP address of the web server."
  value       = hcloud_server.web_1.ipv4_address
}` },
                { type: ContentType.PARAGRAPH, text: "بعد `apply`، سيطبع Terraform هذه القيمة على الشاشة." },
              ]
            },
            {
              id: "p8_c2_s5",
              icon: "🧩",
              title: "المستوى 184: دراسة حالة: إنشاء وحدة خادم ويب قابلة لإعادة الاستخدام",
              content: [
                { type: ContentType.PARAGRAPH, text: "مع نمو البنية التحتية الخاصة بك، يصبح وضع كل شيء في ملف واحد فوضويًا. الوحدات هي الطريقة لتنظيم وإعادة استخدام كود Terraform. الوحدة هي مجرد مجموعة من ملفات `.tf` في دليل. لنقم بتحويل البنية التحتية لخادمنا إلى وحدة قابلة لإعادة الاستخدام." },
                { type: ContentType.HEADING4, text: "هيكل الوحدة" },
                { type: ContentType.PREFORMATTED_TEXT, text: `project/
├── modules/
│   └── webserver/
│       ├── main.tf       # Defines the resources (server, volume, firewall)
│       ├── variables.tf  # Defines input variables for the module
│       └── outputs.tf    # Defines output values from the module
└── main.tf               # Root module that calls the webserver module` },
                { type: ContentType.CODE_BLOCK, language: "hcl", codeTitle: "modules/webserver/variables.tf", code: `variable "server_name" {
  description = "The name of the web server."
  type        = string
}` },
                 { type: ContentType.CODE_BLOCK, language: "hcl", codeTitle: "modules/webserver/main.tf", code: `# This file now contains all the resource definitions
# for server, volume, firewall, attachments, etc.
# but it uses variables for customization.
resource "hcloud_server" "web" {
  name = var.server_name
  # ... other properties ...
}` },
                { type: ContentType.CODE_BLOCK, language: "hcl", codeTitle: "modules/webserver/outputs.tf", code: `output "ip_address" {
  value = hcloud_server.web.ipv4_address
}` },
                { type: ContentType.HEADING4, text: "استدعاء الوحدة" },
                { type: ContentType.PARAGRAPH, text: "الآن، ملف `main.tf` الجذري يصبح بسيطًا للغاية. يمكننا استدعاء وحدتنا لإنشاء بيئات متعددة:" },
                { type: ContentType.CODE_BLOCK, language: "hcl", codeTitle: "project/main.tf", code: `module "staging_server" {
  source      = "./modules/webserver"
  server_name = "web-staging-01"
}

module "production_server" {
  source      = "./modules/webserver"
  server_name = "web-prod-01"
}

output "staging_ip" {
  value = module.staging_server.ip_address
}

output "production_ip" {
  value = module.production_server.ip_address
}` },
                { type: ContentType.PARAGRAPH, text: "هذا يوضح قوة الوحدات. لقد قمنا بتجريد تعقيد إنشاء خادم ويب كامل في كتلة بسيطة وقابلة لإعادة الاستخدام، مما يجعل الكود الجذري نظيفًا وسهل الفهم." },
              ]
            }
        ]
    },
    {
        id: "p8_c3", chapterTitle: "الفصل الثالث: إدارة التكوين مع Ansible",
        sections: [
            {
              id: "p8_c3_s1",
              icon: "📖",
              title: "المستوى 185: تثبيت Ansible وفهم المفاهيم الأساسية",
              content: [
                { type: ContentType.PARAGRAPH, text: "Ansible هو الأداة التي نستخدمها لتكوين البرامج على الخوادم التي أنشأناها. إنه يعمل عبر SSH ولا يتطلب أي برنامج خاص (وكيل) ليتم تثبيته على الخوادم المستهدفة." },
                { type: ContentType.HEADING4, text: "المفاهيم الأساسية:" },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "المخزون (Inventory)", definition: "ملف نصي (عادة بتنسيق INI أو YAML) يسرد المضيفين (الخوادم) التي سيديرها Ansible. يمكن تجميع المضيفين." },
                    { term: "الكتاب المسرحي (Playbook)", definition: "ملف YAML يصف مجموعة من المهام التي سيتم تنفيذها على مجموعة من المضيفين." },
                    { term: "المهمة (Task)", definition: "وحدة عمل واحدة. كل مهمة تستدعي 'وحدة' Ansible." },
                    { term: "الوحدة (Module)", definition: "قطعة من الكود تقوم بإجراء معين (مثل `apt` لتثبيت الحزم، `copy` لنسخ الملفات، `service` لإدارة الخدمات)." },
                    { term: "المعالج (Handler)", definition: "مهمة خاصة لا تعمل إلا عندما يتم 'إعلامها' من قبل مهمة أخرى. تُستخدم لإجراءات مثل إعادة تشغيل خدمة فقط إذا تغير ملف تكوينها." }
                ]},
              ]
            },
            {
              id: "p8_c3_s2",
              icon: "🎭",
              title: "المستوى 186: بناء Playbook احترافي (القوالب والمعالجات)",
              content: [
                { type: ContentType.PARAGRAPH, text: "لنكتب playbook أكثر احترافية لتثبيت وتكوين Nginx. بدلاً من مجرد التثبيت، سنستخدم قالبًا لإنشاء ملف تكوين ديناميكي وسنستخدم معالجًا لإعادة تشغيل Nginx فقط عند الضرورة." },
                { type: ContentType.CODE_BLOCK, language: "ini", codeTitle: "inventory", code: `[webservers]
web-1 ansible_host=YOUR_SERVER_IP ansible_user=nagi` },
                { type: ContentType.PARAGRAPH, text: "سنحتاج إلى ملف قالب. هذا الملف هو ملف تكوين عادي، ولكنه يمكن أن يحتوي على متغيرات Ansible." },
                { type: ContentType.CODE_BLOCK, language: "jinja2", codeTitle: "templates/nginx.conf.j2", code: `server {
    listen 80;
    server_name {{ server_name }};
    root /var/www/{{ server_name }};
    index index.html;
}` },
                { type: ContentType.CODE_EXPLANATION, language: "yaml", codeTitle: "nginx_playbook.yml", code: `---
- name: Install and configure Nginx
  hosts: webservers
  become: yes
  vars:
    server_name: "my-awesome-app.com"
  tasks:
    - name: Install Nginx
      ansible.builtin.apt:
        name: nginx
        state: latest

    - name: Create web directory
      ansible.builtin.file:
        path: "/var/www/{{ server_name }}"
        state: directory

    - name: Copy Nginx config from template
      ansible.builtin.template:
        src: templates/nginx.conf.j2
        dest: "/etc/nginx/sites-available/{{ server_name }}"
      notify: Restart Nginx

    - name: Enable site
      ansible.builtin.file:
        src: "/etc/nginx/sites-available/{{ server_name }}"
        dest: "/etc/nginx/sites-enabled/{{ server_name }}"
        state: link
      notify: Restart Nginx

  handlers:
    - name: Restart Nginx
      ansible.builtin.service:
        name: nginx
        state: restarted`, explanations: [
                    { lines: "5-6", explanation: "نحدد متغيرًا يمكن استخدامه في جميع أنحاء الـ playbook والقوالب." },
                    { lines: "19", explanation: "مهمة `template` تأخذ ملف `.j2`، وتعوض المتغيرات، وتضع الملف الناتج على الخادم البعيد." },
                    { lines: "22", explanation: "هذا هو المفتاح. `notify: Restart Nginx` يخبر Ansible أنه إذا تغير هذا الملف، فيجب عليه تشغيل المعالج المسمى 'Restart Nginx' في نهاية الـ play." },
                    { lines: "30-34", explanation: "يتم تعريف المعالجات في قسم منفصل. لن يتم تشغيل هذا المعالج إلا إذا أبلغته مهمة واحدة على الأقل. هذا يمنع إعادة تشغيل Nginx دون داعٍ." }
                ]},
                { type: ContentType.PARAGRAPH, text: "لتشغيله: `ansible-playbook -i inventory nginx_playbook.yml`" },
              ]
            },
            {
              id: "p8_c3_s3",
              icon: "🧩",
              title: "المستوى 187: استخدام الأدوار (Roles) لتنظيم المهام",
              content: [
                { type: ContentType.PARAGRAPH, text: "الأدوار هي طريقة Ansible القياسية لتجميع المحتوى القابل لإعادة الاستخدام. بدلاً من وجود playbook ضخم واحد، يمكنك تقسيم مهامك إلى أدوار منطقية (مثل `nginx`, `database`, `monitoring`)." },
                { type: ContentType.PREFORMATTED_TEXT, text: `roles/
  nginx/
    tasks/
      main.yml
    handlers/
      main.yml
    templates/
      nginx.conf.j2` },
                { type: ContentType.PARAGRAPH, text: "ملف `roles/nginx/tasks/main.yml` سيحتوي على المهام لتثبيت Nginx. يمكنك بعد ذلك استدعاء هذا الدور في playbook الرئيسي الخاص بك:" },
                { type: ContentType.CODE_BLOCK, language: "yaml", code: `---
- name: Configure web server
  hosts: webservers
  become: yes
  roles:
    - nginx` },
              ]
            },
            {
              id: "p8_c3_s4",
              icon: "🔒",
              title: "المستوى 188: إدارة الأسرار مع Ansible Vault",
              content: [
                { type: ContentType.PARAGRAPH, text: "Ansible Vault هي ميزة مدمجة لتشفير الملفات أو المتغيرات الحساسة." },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `# قم بإنشاء ملف متغيرات مشفر
ansible-vault create vars/secrets.yml

# قم بتحرير ملف موجود
ansible-vault edit vars/secrets.yml` },
                { type: ContentType.PARAGRAPH, text: "سيطلب منك كلمة مرور. الملف سيتم تخزينه مشفرًا على القرص. عند تشغيل playbook، يمكنك توفير كلمة المرور:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `ansible-playbook -i inventory playbook.yml --ask-vault-pass` },
                { type: ContentType.PARAGRAPH, text: "هذا يسمح لك بتخزين الأسرار بأمان في مستودع Git الخاص بك." },
              ]
            },
            {
              id: "p8_c3_s5",
              icon: "🤝",
              title: "المستوى 189: دمج Terraform و Ansible",
              content: [
                { type: ContentType.PARAGRAPH, text: "النمط الكلاسيكي هو استخدام Terraform لإنشاء البنية التحتية، ثم استخدام Ansible لتكوينها. الطريقة الأكثر شيوعًا ومرونة لتحقيق ذلك هي جعل Terraform ينشئ ملف مخزون Ansible ديناميكيًا." },
                { type: ContentType.PARAGRAPH, text: "أولاً، سنحتاج إلى ملف قالب للمخزون." },
                 { type: ContentType.CODE_BLOCK, language: "jinja2", codeTitle: "templates/inventory.tpl", code: `[webservers]
web-1 ansible_host=\${web_server_ip}

[all:vars]
ansible_user=nagi
ansible_ssh_private_key_file=~/.ssh/id_rsa
ansible_python_interpreter=/usr/bin/python3
` },
                {
                  type: ContentType.CODE_EXPLANATION, language: "hcl", codeTitle: "إنشاء مخزون من Terraform (outputs.tf)", code: `resource "local_file" "ansible_inventory" {
  content = templatefile("templates/inventory.tpl", {
    web_server_ip = hcloud_server.web_1.ipv4_address
  })
  filename = "../ansible/inventory"
}`, explanations: [
                    { lines: "1", explanation: "نستخدم مورد `local_file` لإنشاء ملف على جهازنا المحلي." },
                    { lines: "2", explanation: "نستخدم دالة `templatefile` لمعالجة ملف قالب. نمرر عنوان IP للخادم الذي أنشأناه كمتغير." },
                    { lines: "5", explanation: "نحدد المسار حيث سيتم إنشاء ملف المخزون النهائي، مباشرة في مجلد Ansible." }
                ]},
                { type: ContentType.NOTE, title: "سير العمل الكامل", text: "سير العمل الكامل الخاص بك يصبح: \n1. `cd terraform/` \n2. `terraform apply -auto-approve` \n3. `cd ../ansible/` \n4. `ansible-playbook -i inventory playbook.yml` \n\nهذا يوضح الفصل الواضح بين الاهتمامات: Terraform يتعامل مع 'ماذا' (البنية التحتية)، و Ansible يتعامل مع 'كيف' (التكوين)." },
              ]
            }
        ]
    },
    {
        id: "p8_c4", chapterTitle: "الفصل الرابع: الانتقال إلى السحابة",
        sections: [
            {
              id: "p8_c4_s1",
              icon: "☁️",
              title: "المستوى 190: مقدمة إلى AWS: المفاهيم الأساسية",
              content: [
                { type: ContentType.PARAGRAPH, text: "Amazon Web Services (AWS) هي منصة الحوسبة السحابية الأكثر شمولاً واعتمادًا على نطاق واسع. إنها تقدم أكثر من 200 خدمة كاملة الميزات. الانتقال من VPS إلى AWS هو قفزة من استئجار منزل إلى تصميم وبناء مدينة بأكملها." },
                { type: ContentType.HEADING4, text: "الخدمات الأساسية:" },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "EC2 (Elastic Compute Cloud)", definition: "هذه هي خدمة الخوادم الافتراضية. إنها تعادل الـ VPS الخاص بك، ولكن مع مرونة هائلة في الأحجام والأنواع." },
                    { term: "S3 (Simple Storage Service)", definition: "خدمة تخزين كائنات قابلة للتطوير بشكل لا نهائي. مثالية لتخزين الملفات التي تم تحميلها، والنسخ الاحتياطية، والأصول الثابتة." },
                    { term: "VPC (Virtual Private Cloud)", definition: "تسمح لك بإنشاء شبكة افتراضية معزولة تمامًا في السحابة. يمكنك تحديد نطاقات IP الخاصة بك، والشبكات الفرعية، وجداول التوجيه، والبوابات." },
                    { term: "IAM (Identity and Access Management)", definition: "الخدمة المركزية لإدارة الأذونات. تتيح لك التحكم بدقة في من يمكنه فعل ماذا على أي مورد." }
                ]},
              ]
            },
            {
              id: "p8_c4_s2",
              icon: "☁️",
              title: "المستوى 191: مقدمة إلى GCP: المفاهيم الأساسية",
              content: [
                { type: ContentType.PARAGRAPH, text: "Google Cloud Platform (GCP) هي المنافس الرئيسي لـ AWS، وهي معروفة بقوتها في الشبكات والبيانات والتعلم الآلي. المفاهيم الأساسية مشابهة جدًا لـ AWS." },
                { type: ContentType.HEADING4, text: "الخدمات الأساسية:" },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "Compute Engine", definition: "خدمة الخوادم الافتراضية (تعادل EC2)." },
                    { term: "Cloud Storage", definition: "خدمة تخزين الكائنات (تعادل S3)." },
                    { term: "VPC (Virtual Private Cloud)", definition: "خدمة الشبكات (تعادل AWS VPC)." },
                    { term: "Cloud IAM", definition: "خدمة إدارة الهوية والوصول (تعادل AWS IAM)." }
                ]},
              ]
            },
            {
              id: "p8_c4_s3",
              icon: "🏗️",
              title: "دراسة حالة: بناء بنية تحتية ويب قابلة للتطوير على AWS",
              content: [
                { type: ContentType.PARAGRAPH, text: "هنا تتألق IaC حقًا. لنقم ببناء بنية تحتية ويب حقيقية وقابلة للتطوير وعالية التوافر على AWS باستخدام Terraform. هذا المثال يوضح كيف يمكن استخدام خدمات متعددة معًا لإنشاء نظام قوي." },
                { type: ContentType.CODE_EXPLANATION, language: "hcl", codeTitle: "بنية تحتية ويب قابلة للتطوير على AWS", code: `provider "aws" { region = "eu-central-1" }

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "public" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"
  map_public_ip_on_launch = true # Instances get a public IP
}

resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.main.id
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }
}

resource "aws_route_table_association" "a" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}

resource "aws_security_group" "web_sg" {
  vpc_id = aws_vpc.main.id
  ingress { # Inbound rule for HTTP
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress { # Allow all outbound traffic
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_launch_template" "web_template" {
  name_prefix   = "web-"
  image_id      = "ami-0c55b159cbfafe1f0" # Ubuntu 22.04
  instance_type = "t2.micro"
  security_group_names = [aws_security_group.web_sg.name]
  user_data = base64encode(<<-EOF
    #!/bin/bash
    sudo apt-get update
    sudo apt-get install -y nginx
    sudo systemctl start nginx
  EOF
  )
}

resource "aws_autoscaling_group" "web_asg" {
  launch_template {
    id      = aws_launch_template.web_template.id
    version = "$Latest"
  }
  min_size = 2
  max_size = 5
  desired_capacity = 2
  vpc_zone_identifier = [aws_subnet.public.id]

  # Example scaling policy
  # (Requires more setup like CloudWatch alarms)
}`, explanations: [
                    { lines: "3-10", explanation: "نحدد شبكتنا الخاصة (VPC) وشبكة فرعية عامة واحدة." },
                    { lines: "12-28", explanation: "ننشئ بوابة إنترنت ونقوم بتوجيه كل حركة المرور من شبكتنا الفرعية إليها، مما يمنحها الوصول إلى الإنترنت." },
                    { lines: "30-46", explanation: "نحدد مجموعة أمان (جدار حماية) تسمح بحركة مرور HTTP الواردة من أي مكان." },
                    { lines: "48-61", explanation: "نحدد `aws_launch_template`. هذا هو مخطط لخوادمنا. يحدد نوع المثيل، وصورة النظام، ومجموعات الأمان، و `user_data` (نص برمجي يتم تشغيله عند بدء التشغيل)." },
                    { lines: "63-74", explanation: "أخيرًا، نحدد `aws_autoscaling_group`. هذا يخبر AWS بالحفاظ على عدد معين من المثيلات قيد التشغيل دائمًا (بين 2 و 5). إذا فشل مثيل، ستقوم مجموعة التوسع التلقائي بإنشاء واحد جديد تلقائيًا (الشفاء الذاتي)." }
                ]},
              ]
            },
            {
              id: "p8_c4_s4",
              icon: "💰",
              title: "المستوى 193: فهم فوائد وتكاليف السحابة",
              content: [
                { type: ContentType.HEADING4, text: "الفوائد:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>الخدمات المدارة:</strong> يمكنك استخدام خدمات مثل Amazon RDS لقاعدة بيانات PostgreSQL مُدارة بالكامل. AWS يعتني بالنسخ الاحتياطي، والتصحيح، والتوافر العالي، مما يحررك للتركيز على تطبيقك.",
                    "<strong>المرونة وقابلية التوسع:</strong> يمكنك زيادة أو تقليل الموارد بسهولة، أو استخدام مجموعات التوسع التلقائي (Auto Scaling Groups) لتغيير حجم أسطولك تلقائيًا بناءً على الطلب.",
                    "<strong>الدفع مقابل الاستخدام:</strong> أنت تدفع فقط مقابل ما تستهلكه، مما يمكن أن يكون فعالاً من حيث التكلفة للمشاريع الصغيرة."
                ]},
                { type: ContentType.HEADING4, text: "التكاليف:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>التعقيد:</strong> هناك منحنى تعلم حاد.",
                    "<strong>'صدمة الفاتورة' (Bill Shock):</strong> من السهل ارتكاب خطأ في التكوين يؤدي إلى فاتورة ضخمة غير متوقعة. المراقبة الصارمة للميزانية ضرورية.",
                    "<strong>التقييد بالمورد (Vendor Lock-in):</strong> كلما استخدمت المزيد من الخدمات المدارة الخاصة بالموفر، أصبح من الصعب الانتقال إلى موفر آخر."
                ]},
              ]
            },
            {
              id: "p8_c4_s5",
              icon: "🚚",
              title: "المستوى 194: استراتيجيات الهجرة من VPS إلى السحابة",
              content: [
                { type: ContentType.PARAGRAPH, text: "هناك عدة طرق للانتقال من إعداد VPS بسيط إلى السحابة." },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "الرفع والنقل (Lift and Shift)", definition: "أبسط نهج. تقوم بشكل أساسي بإعادة إنشاء إعداد VPS الحالي الخاص بك على مثيل EC2. أنت لا تستفيد كثيرًا من ميزات السحابة، لكنها خطوة أولى سريعة ومنخفضة المخاطر." },
                    { term: "إعادة النظام الأساسي (Re-platforming)", definition: "تقوم بإجراء بعض التحسينات للاستفادة من السحابة. على سبيل المثال، يمكنك نقل تطبيقك إلى EC2، ولكنك تهاجر قاعدة بيانات PostgreSQL التي تديرها بنفسك إلى خدمة Amazon RDS المدارة. هذا يقلل من العبء التشغيلي." },
                    { term: "إعادة البناء (Re-architecting / Re-factoring)", definition: "النهج الأكثر تعقيدًا وقوة. تقوم بإعادة تصميم تطبيقك ليكون 'سحابيًا أصليًا' (cloud-native). قد يعني هذا تقسيم تطبيقك المترابط إلى خدمات مصغرة تعمل في حاويات على Kubernetes (EKS/GKE) أو إعادة كتابة أجزاء منه كوظائف بدون خادم (Serverless Functions)." }
                ]},
              ]
            }
        ]
    },
    {
        id: "p8_c5", chapterTitle: "الفصل الخامس: مفاهيم متقدمة",
        sections: [
            {
              id: "p8_c5_s1",
              icon: "🧪",
              title: "المستوى 195: اختبار البنية التحتية (Terratest)",
              content: [
                { type: ContentType.PARAGRAPH, text: "كيف تتأكد من أن كود IaC الخاص بك يعمل كما هو متوقع؟ عن طريق اختباره! اختبار البنية التحتية هو ممارسة كتابة اختبارات آلية تتحقق من أن البنية التحتية التي تم إنشاؤها صحيحة وتعمل بشكل صحيح." },
                { type: ContentType.PARAGRAPH, text: "Terratest هي مكتبة Go رائدة من Gruntwork لهذا الغرض. سير عمل الاختبار النموذجي هو:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "1. اكتب اختبارًا في Go.",
                    "2. يقوم الاختبار بتشغيل `terraform apply` لإنشاء البنية التحتية.",
                    "3. يقوم بإجراء تأكيدات على البنية التحتية (على سبيل المثال، 'هل يمكنني الاتصال بـ SSH بالخادم؟'، 'هل تعيد صفحة الويب رمز الحالة 200؟').",
                    "4. يستخدم `defer` لضمان تشغيل `terraform destroy` دائمًا في النهاية، حتى لو فشلت الاختبارات."
                ]},
              ]
            },
            {
              id: "p8_c5_s2",
              icon: "🔁",
              title: "دراسة حالة: خط أنابيب CI/CD للبنية التحتية",
              content: [
                { type: ContentType.PARAGRAPH, text: "يمكننا تطبيق نفس مبادئ CI/CD التي تعلمناها لتطبيقاتنا على كود البنية التحتية لدينا. هذا مثال كامل لسير عمل GitHub Actions لـ Terraform." },
                { type: ContentType.CODE_EXPLANATION, language: "yaml", codeTitle: ".github/workflows/terraform.yml", code: `name: 'Terraform CI/CD'

on:
  push:
    branches: [ "main" ]
  pull_request:

jobs:
  terraform:
    name: 'Terraform'
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v3

      - name: Terraform Init
        run: terraform init
        env:
          HCLOUD_TOKEN: \${{ secrets.HCLOUD_TOKEN }}

      - name: Terraform Format
        run: terraform fmt -check

      - name: Terraform Plan
        id: plan
        if: github.event_name == 'pull_request'
        run: terraform plan -no-color
        env:
          HCLOUD_TOKEN: \${{ secrets.HCLOUD_TOKEN }}
      
      - name: Add Plan to PR
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            const output = \`#### Terraform Plan 📖\`
            \`\`\`hcl
            \${{ steps.plan.outputs.stdout }}
            \`\`\`
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: output
            })
            
      - name: Terraform Apply
        if: github.ref == 'refs/heads/main' && github.event_name == 'push'
        run: terraform apply -auto-approve
        env:
          HCLOUD_TOKEN: \${{ secrets.HCLOUD_TOKEN }}
`, explanations: [
                    { lines: "22-27", explanation: "نقوم بتشغيل `terraform plan` فقط إذا كان الحدث هو طلب سحب." },
                    { lines: "29-43", explanation: "هذه خطوة ذكية تستخدم `github-script` لأخذ مخرجات خطوة الخطة ونشرها كتعليق مباشرة على طلب السحب. هذا يسمح للمراجعين برؤية التأثير الدقيق للتغيير المقترح." },
                    { lines: "45-49", explanation: "نقوم بتشغيل `terraform apply` فقط عندما يتم دمج التغييرات في الفرع `main`." }
                ]},
              ]
            },
            {
              id: "p8_c5_s3",
              icon: "🖼️",
              title: "دراسة حالة: بناء 'صورة ذهبية' مع Packer",
              content: [
                { type: ContentType.PARAGRAPH, text: "Packer هي أداة أخرى من HashiCorp. وظيفتها هي أتمتة إنشاء صور الآلات. بدلاً من البدء بصورة أوبونتو خام ثم استخدام Ansible لتثبيت Nginx في كل مرة تقوم فيها بإنشاء خادم، يمكنك استخدام Packer لإنشاء 'صورة ذهبية' (golden image) تحتوي بالفعل على Nginx وكل تكويناتك الأساسية مثبتة مسبقًا." },
                 { type: ContentType.CODE_EXPLANATION, language: "hcl", codeTitle: "ubuntu-nginx.pkr.hcl", code: `packer {
  required_plugins {
    hetzner-cloud = {
      version = ">= 1.2.0"
      source  = "github.com/hetznercloud/hetzner-cloud"
    }
  }
}

source "hetzner-cloud" "ubuntu-nginx" {
  token        = var.hcloud_token
  server_type  = "cpx11"
  image        = "ubuntu-22.04"
  location     = "fsn1"
  snapshot_name = "ubuntu-2204-nginx-{{timestamp}}"
}

build {
  sources = ["source.hetzner-cloud.ubuntu-nginx"]

  provisioner "shell" {
    inline = [
      "sleep 30",
      "sudo apt-get update",
      "sudo apt-get install -y nginx",
      "sudo systemctl enable nginx"
    ]
  }
}`, explanations: [
                    { lines: "11-17", explanation: "نحدد 'المنشئ' (builder). نخبر Packer باستخدام Hetzner Cloud، وبدء خادم مؤقت من صورة أوبونتو، وإعطاء اللقطة الناتجة اسمًا فريدًا." },
                    { lines: "22-29", explanation: "نحدد 'المزود' (provisioner). هذا يخبر Packer بكيفية تكوين الخادم المؤقت. هنا، نستخدم مزود `shell` لتشغيل بعض الأوامر لتحديث النظام وتثبيت Nginx." }
                ]},
                { type: ContentType.PARAGRAPH, text: "عند تشغيل `packer build .`، سيقوم Packer بإنشاء خادم، وتشغيل هذه الأوامر، ثم أخذ لقطة (snapshot) من الخادم، وتدمير الخادم المؤقت. النتيجة هي صورة مخصصة يمكنك استخدام `id` الخاص بها مباشرة في مورد `hcloud_server` في Terraform، مما يجعل أوقات التزويد أسرع بكثير." },
              ]
            },
            {
              id: "p8_c5_s4",
              icon: "☁️",
              title: "المستوى 198: مقدمة إلى الحوسبة بدون خادم (Serverless)",
              content: [
                { type: ContentType.PARAGRAPH, text: "الحوسبة بدون خادم هي التطور التالي في التجريد السحابي. إنها لا تعني عدم وجود خوادم؛ بل تعني أنك كمطور لا تحتاج إلى التفكير في الخوادم على الإطلاق. أنت تكتب منطقك كـ 'وظائف' (functions) مستقلة وتقوم بتحميلها إلى السحابة." },
                { type: ContentType.PARAGRAPH, text: "المنصة (مثل AWS Lambda أو Google Cloud Functions) تعتني بكل شيء آخر: توفير الموارد، والتوسع من صفر إلى آلاف الطلبات في الثانية، والتصحيح، والتسجيل. أنت تدفع فقط مقابل وقت الحوسبة الفعلي الذي تستهلكه وظيفتك، وصولاً إلى الملي ثانية. هذا نموذج قوي للغاية للتطبيقات القائمة على الأحداث وواجهات برمجة التطبيقات." },
              ]
            },
            {
              id: "p8_c5_s5",
              icon: "🚀",
              title: "المستوى 199: مستقبل IaC: OpenTofu و Crossplane",
              content: [
                { type: ContentType.PARAGRAPH, text: "عالم IaC يتطور باستمرار. مشروعان حديثان مهمان يجب مراقبتهما:" },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "OpenTofu", definition: "في عام 2023، غيرت HashiCorp ترخيص Terraform من ترخيص مفتوح المصدر إلى ترخيص مصدر أعمال (BSL). ردًا على ذلك، أنشأت مؤسسة Linux تفرعًا (fork) مفتوح المصدر بالكامل لـ Terraform يسمى OpenTofu. في الوقت الحالي، هو بديل مباشر لـ Terraform، لكنه قد يبتكر في اتجاهات مختلفة في المستقبل." },
                    { term: "Crossplane", definition: "نهج مختلف تمامًا. Crossplane هو إضافة لـ Kubernetes تحول كتلة K8s الخاصة بك إلى 'طائرة تحكم' (control plane) عالمية. يسمح لك بتعريف وإدارة البنية التحتية السحابية (مثل قواعد بيانات RDS أو مجموعات GKE) باستخدام نفس ملفات YAML وواجهة برمجة تطبيقات Kubernetes التي تستخدمها لإدارة تطبيقاتك. الفكرة هي أن يكون لديك واجهة برمجة تطبيقات واحدة موحدة لكل شيء، من التطبيقات إلى البنية التحتية." }
                ]},
              ]
            }
        ]
    }
  ]
};