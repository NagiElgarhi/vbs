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
                { type: ContentType.HEADING4, text: "الفوائد التي تغير قواعد اللعبة:" },
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "التكرار والثبات", definition: "يمكنك إنشاء نفس البيئة مرارًا وتكرارًا، مع ضمان أنها متطابقة في كل مرة. هذا يقضي على مشكلة 'لكنه يعمل على جهازي!'." },
                    { term: "السرعة والكفاءة", definition: "يمكن إنشاء بيئات معقدة كاملة في دقائق، بدلاً من ساعات أو أيام من العمل اليدوي." },
                    { term: "التحكم في الإصدارات", definition: "يمكن تخزين كود البنية التحتية الخاص بك في Git. يمكنك تتبع كل تغيير، ومراجعة التغييرات عبر طلبات السحب (Pull Requests)، والعودة إلى إصدار سابق إذا حدث خطأ." },
                    { term: "تقليل المخاطر", definition: "الأتمتة تقلل بشكل كبير من مخاطر الخطأ البشري الذي يمكن أن يؤدي إلى تكوينات خاطئة أو انقطاع في الخدمة." },
                    { term: "التعاون", definition: "يمكن للفريق بأكمله رؤية وفهم والمساهمة في تعريف البنية التحتية، تمامًا مثل كود التطبيق." }
                ]},
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
                { type: ContentType.NOTE, title: "Terraform + Ansible = فريق الأحلام", text: "النمط الأكثر شيوعًا وفعالية هو استخدام Terraform لتزويد البنية التحتية الأساسية (إنشاء الـ VPS، تكوين الشبكة)، ثم استخدام Ansible لتكوين البرامج داخل هذا الـ VPS (تثبيت Nginx، إعداد تطبيقك). هذا يفصل الاهتمامات ويسمح لكل أداة بالتألق في ما تفعله بشكل أفضل." },
              ]
            },
            {
              id: "p8_c1_s3",
              icon: "📜",
              title: "المستوى 177: فهم البرمجة الحتمية مقابل التصريحية",
              content: [
                { type: ContentType.PARAGRAPH, text: "فهم هذا الاختلاف هو المفتاح لفهم فلسفة أدوات IaC." },
                { type: ContentType.HEADING4, text: "النهج الحتمي (Imperative) - 'كيف'" },
                { type: ContentType.PARAGRAPH, text: "يشبه إعطاء تعليمات الطبخ خطوة بخطوة. أنت تحدد كل خطوة يجب اتخاذها للوصول إلى النتيجة النهائية. Ansible هو مثال جيد. أنت تكتب: `TASK 1: Install nginx`, `TASK 2: Copy config file`, `TASK 3: Start service`. أنت مسؤول عن المنطق والتسلسل." },
                { type: ContentType.HEADING4, text: "النهج التصريحي (Declarative) - 'ماذا'" },
                { type: ContentType.PARAGRAPH, text: "يشبه إظهار صورة للطبق النهائي للطاهي. أنت تصف الحالة النهائية التي تريدها، والأداة هي المسؤولة عن اكتشاف الخطوات اللازمة للوصول إلى هناك. Terraform هو مثال جيد. أنت تكتب: `resource \"hcloud_server\" \"web\" { image = \"ubuntu-22.04\" ... }`. لا تخبر Terraform بكيفية إنشاء الخادم؛ أنت فقط تصف كيف يجب أن يبدو. إذا قمت بتغيير `image` إلى `ubuntu-24.04`، فإن Terraform ذكي بما يكفي ليعرف أنه يجب عليه تدمير الخادم القديم وإنشاء واحد جديد." },
                { type: ContentType.NOTE, title: "لماذا التصريحي قوي للبنية التحتية؟", text: "النهج التصريحي يمنع 'انحراف التكوين' (configuration drift). بمرور الوقت، يمكن أن تصبح التغييرات اليدوية على الخادم غير متزامنة مع التكوين الأصلي. مع Terraform، يمكنك دائمًا تشغيل `terraform plan` لرؤية الفرق بين الحالة الموصوفة في الكود الخاص بك والواقع الفعلي، ثم `terraform apply` لإعادة الواقع إلى التوافق مع الكود." },
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
              title: "المستوى 181: إدارة خوادم VPS مع Terraform",
              content: [
                { type: ContentType.PARAGRAPH, text: "الآن بعد أن أصبح لدينا مفتاح SSH مُدار بواسطة Terraform، يمكننا استخدامه لإنشاء خادم. سنقوم بإضافة مورد `hcloud_server` إلى ملف `main.tf` الخاص بنا." },
                { type: ContentType.CODE_EXPLANATION, language: "hcl", codeTitle: "إضافة مورد خادم", code: `resource "hcloud_server" "web_1" {
  name        = "web-server-1"
  server_type = "cpx11"
  image       = "ubuntu-22.04"
  location    = "nbg1"
  ssh_keys    = [hcloud_ssh_key.my_key.id]
}`, explanations: [
                    { lines: "1-6", explanation: "نحدد اسم الخادم ونوعه وصورته وموقعه." },
                    { lines: "7", explanation: "هذا يوضح قوة Terraform. بدلاً من كتابة اسم مفتاح SSH، نشير إلى مورد `hcloud_ssh_key.my_key` الذي أنشأناه سابقًا ونستخدم `id` الخاص به. هذا ينشئ تبعية صريحة. سيعرف Terraform أنه يجب عليه إنشاء مفتاح SSH *قبل* محاولة إنشاء الخادم." }
                ]},
                { type: ContentType.PARAGRAPH, text: "بعد تشغيل `terraform apply`، سيتم إنشاء خادم VPS جديد بالكامل ومكون بمفتاح SSH الخاص بك في بضع دقائق." },
              ]
            },
            {
              id: "p8_c2_s3",
              icon: "💾",
              title: "المستوى 182: فهم حالة Terraform (State) وإدارتها عن بعد",
              content: [
                { type: ContentType.PARAGRAPH, text: "بعد تشغيل `apply`، ستلاحظ ملفًا جديدًا: `terraform.tfstate`. هذا الملف هو دماغ Terraform. إنه ملف JSON يسجل الموارد التي قمت بإنشائها، ومعرفاتها الفعلية في العالم الحقيقي (مثل معرف الخادم في Hetzner)، وجميع سماتها. عندما تقوم بتشغيل `plan`، يقارن Terraform بين الكود الخاص بك، وملف الحالة هذا، والواقع لمعرفة ما تغير." },
                { type: ContentType.HEADING4, text: "مشاكل الحالة المحلية" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "<strong>خطر:</strong> يحتوي على أسرار محتملة في نص عادي.",
                    "<strong>فردي:</strong> إذا كان لديك فريق، فكيف تشارك ملف الحالة؟ إرساله عبر البريد الإلكتر الإلكتروني أو Slack هو وصفة لكارثة.",
                    "<strong>قفل:</strong> ماذا لو حاول شخصان تشغيل `apply` في نفس الوقت؟ قد يؤدي ذلك إلى إفساد الحالة."
                ]},
                { type: ContentType.HEADING4, text: "الحل: الواجهات الخلفية عن بعد (Remote Backends)" },
                { type: ContentType.PARAGRAPH, text: "الواجهة الخلفية عن بعد تخبر Terraform بتخزين ملف الحالة في موقع مشترك ومؤمن بدلاً من جهازك المحلي. توفر الخدمات مثل Terraform Cloud أو AWS S3 واجهات خلفية تدعم التخزين عن بعد، وقفل الحالة (لمنع التشغيل المتزامن)، والتشفير في حالة السكون." },
                { type: ContentType.CODE_BLOCK, language: "hcl", codeTitle: "تكوين الواجهة الخلفية السحابية لـ Terraform", code: `terraform {
  cloud {
    organization = "your-org-name"
    workspaces {
      name = "production-infra"
    }
  }
  # ... required_providers
}` },
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
}` },
                { type: ContentType.PARAGRAPH, text: "الآن في `main.tf`، يمكنك استخدامه:" },
                { type: ContentType.CODE_BLOCK, language: "hcl", code: `resource "hcloud_server" "web_1" {
  # ...
  server_type = var.server_type
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
              title: "المستوى 184: تنظيم الكود باستخدام الوحدات (Modules)",
              content: [
                { type: ContentType.PARAGRAPH, text: "مع نمو البنية التحتية الخاصة بك، يصبح وضع كل شيء في ملف واحد فوضويًا. الوحدات هي الطريقة لتنظيم وإعادة استخدام كود Terraform. الوحدة هي مجرد مجموعة من ملفات `.tf` في دليل." },
                { type: ContentType.HEADING4, text: "إنشاء وحدة خادم ويب" },
                { type: ContentType.PARAGRAPH, text: "لنفترض أن لدينا بنية دليل مثل:" },
                { type: ContentType.PREFORMATTED_TEXT, text: `modules/
  web-server/
    main.tf
    variables.tf
    outputs.tf
main.tf` },
                { type: ContentType.PARAGRAPH, text: "ملف `modules/web-server/main.tf` سيحتوي على تعريف موارد الخادم ومفتاح SSH. الآن، في ملف `main.tf` الجذري، يمكنك استدعاء هذه الوحدة:" },
                { type: ContentType.CODE_BLOCK, language: "hcl", code: `module "web_server_prod" {
  source      = "./modules/web-server"
  server_type = "cpx21"
}

output "prod_server_ip" {
  value = module.web_server_prod.ip_address
}` },
                { type: ContentType.NOTE, title: "سجل Terraform (Terraform Registry)", text: "هناك سجل عام ضخم للوحدات التي أنشأها المجتمع والموردون الرسميون. قبل أن تكتب وحدة بنفسك، تحقق دائمًا من السجل أولاً. يمكنك العثور على وحدات تم اختبارها جيدًا لكل شيء بدءًا من إعداد VPC في AWS إلى نشر كتلة Kubernetes." },
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
              title: "المستوى 186: كتابة أول Playbook لتثبيت Nginx",
              content: [
                { type: ContentType.PARAGRAPH, text: "لنكتب playbook بسيطًا يقوم بتثبيت Nginx على خادمنا." },
                { type: ContentType.CODE_BLOCK, language: "ini", codeTitle: "inventory", code: `[webservers]
web-1 ansible_host=YOUR_SERVER_IP ansible_user=nagi` },
                { type: ContentType.CODE_EXPLANATION, language: "yaml", codeTitle: "nginx_playbook.yml", code: `---
- name: Install and configure Nginx
  hosts: webservers
  become: yes
  tasks:
    - name: Install Nginx
      ansible.builtin.apt:
        name: nginx
        state: latest
        update_cache: yes

    - name: Ensure Nginx is started and enabled
      ansible.builtin.service:
        name: nginx
        state: started
        enabled: yes`, explanations: [
                    { lines: "3", explanation: "`hosts: webservers` يخبر Ansible بتشغيل هذا الكتاب المسرحي على جميع المضيفين في مجموعة `webservers` في ملف المخزون." },
                    { lines: "4", explanation: "`become: yes` يعادل `sudo`. يخبر Ansible بتصعيد الامتيازات لتنفيذ المهام." },
                    { lines: "7", explanation: "هذه المهمة تستخدم وحدة `apt` المدمجة." },
                    { lines: "13", explanation: "هذه المهمة تستخدم وحدة `service` لضمان أن الخدمة قيد التشغيل وممكّنة عند الإقلاع." }
                ]},
                { type: ContentType.PARAGRAPH, text: "لتشغيله:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `ansible-playbook -i inventory nginx_playbook.yml` },
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
                { type: ContentType.CODE_EXPLANATION, language: "hcl", codeTitle: "إنشاء مخزون من Terraform", code: `resource "local_file" "ansible_inventory" {
  content = templatefile("templates/inventory.tpl", {
    web_server_ip = hcloud_server.web_1.ipv4_address
  })
  filename = "../ansible/inventory"
}`, explanations: [
                    { lines: "1", explanation: "نستخدم مورد `local_file` لإنشاء ملف على جهازنا المحلي." },
                    { lines: "2", explanation: "نستخدم دالة `templatefile` لمعالجة ملف قالب. نمرر عنوان IP للخادم الذي أنشأناه كمتغير." },
                    { lines: "5", explanation: "نحدد المسار حيث سيتم إنشاء ملف المخزون النهائي." }
                ]},
                { type: ContentType.PARAGRAPH, text: "سير العمل الكامل الخاص بك يصبح:" },
                { type: ContentType.CODE_BLOCK, language: "bash", code: `cd terraform/
terraform apply -auto-approve
cd ../ansible/
ansible-playbook -i inventory playbook.yml` },
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
              title: "المستوى 192: إدارة موارد AWS/GCP باستخدام Terraform",
              content: [
                { type: ContentType.PARAGRAPH, text: "هنا تتألق IaC حقًا. إدارة شبكة سحابية معقدة يدويًا عبر واجهة المستخدم ('ClickOps') أمر محكوم عليه بالفشل. Terraform يسمح لك بتعريف كل شيء في الكود." },
                { type: ContentType.CODE_BLOCK, language: "hcl", codeTitle: "مثال على AWS Terraform", code: `provider "aws" {
  region = "eu-west-1"
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "public" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"
}

resource "aws_security_group" "web" {
  # ... rules to allow SSH and HTTP ...
}

resource "aws_instance" "app_server" {
  ami           = "ami-0c55b159cbfafe1f0" # Ubuntu 22.04
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.public.id
  # ...
}` },
                { type: ContentType.PARAGRAPH, text: "لاحظ كيف أننا لا ننشئ فقط خادمًا، بل نحدد الشبكة بأكملها التي يعيش فيها. هذا هو مستوى التحكم الذي توفره السحابة و IaC." },
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
              title: "المستوى 196: خطوط أنابيب CI/CD للبنية التحتية",
              content: [
                { type: ContentType.PARAGRAPH, text: "يمكننا تطبيق نفس مبادئ CI/CD التي تعلمناها لتطبيقاتنا على كود البنية التحتية لدينا. سير عمل GitHub Actions نموذجي سيبدو كالتالي:" },
                { type: ContentType.HEADING4, text: "عند إنشاء طلب سحب (Pull Request):" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "شغّل `terraform init`.",
                    "شغّل `terraform validate` للتحقق من بناء الجملة.",
                    "شغّل `terraform plan` لإنشاء خطة.",
                    "انشر الخطة كتعليق على طلب السحب ليتمكن المراجعون من رؤية التأثير الدقيق للتغيير."
                ]},
                { type: ContentType.HEADING4, text: "عند الدمج في `main`:" },
                { type: ContentType.LIST_UNORDERED, items: [
                    "شغّل `terraform init`.",
                    "شغّل `terraform apply -auto-approve` لتطبيق التغييرات على بيئة الإنتاج."
                ]},
              ]
            },
            {
              id: "p8_c5_s3",
              icon: "🖼️",
              title: "المستوى 197: مقدمة إلى Packer لبناء صور الآلات",
              content: [
                { type: ContentType.PARAGRAPH, text: "Packer هي أداة أخرى من HashiCorp. وظيفتها هي أتمتة إنشاء صور الآلات. بدلاً من البدء بصورة أوبونتو خام ثم استخدام Ansible لتثبيت Nginx في كل مرة تقوم فيها بإنشاء خادم، يمكنك استخدام Packer لإنشاء 'صورة ذهبية' (golden image) تحتوي بالفعل على Nginx وكل تكويناتك الأساسية مثبتة مسبقًا." },
                { type: ContentType.PARAGRAPH, text: "ثم، في Terraform، يمكنك ببساطة الإشارة إلى هذه الصورة المخصصة. هذا يجعل أوقات تزويد الخادم أسرع بكثير وأكثر موثوقية، حيث يتم 'خبز' التكوين في الصورة نفسها." },
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
