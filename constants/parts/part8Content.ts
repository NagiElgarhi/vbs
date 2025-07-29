
import { Part, ContentType } from '../../types';

const generatePlaceholderSection = (part: number, chapter: number, level: number, title: string, icon: string = "🚧") => {
    const levelNumber = (part - 1) * 25 + (chapter - 1) * 5 + level;
    return {
        id: `p${part}_c${chapter}_l${levelNumber}`,
        icon,
        title: `المستوى ${levelNumber}: ${title}`,
        content: [{ type: ContentType.PARAGRAPH, text: "هذا المحتوى قيد التطوير وجارٍ العمل عليه." }],
    };
};

export const part8Content: Part = {
  id: "p8",
  partTitle: "الباب الثامن: البنية التحتية ككود (IaC)",
  icon: "🏗️",
  chapters: [
    {
        id: "p8_c1", chapterTitle: "الفصل 36: مقدمة إلى IaC",
        sections: [
            generatePlaceholderSection(8, 1, 1, "ما هي البنية التحتية ككود ولماذا؟"),
            generatePlaceholderSection(8, 1, 2, "مقارنة بين الأدوات: Terraform, Ansible, Pulumi"),
            generatePlaceholderSection(8, 1, 3, "فهم البرمجة الحتمية مقابل التصريحية"),
            generatePlaceholderSection(8, 1, 4, "إعداد بيئة عمل IaC"),
            generatePlaceholderSection(8, 1, 5, "تكامل IaC مع Git"),
        ]
    },
    {
        id: "p8_c2", chapterTitle: "الفصل 37: إدارة الموارد مع Terraform",
        sections: [
            generatePlaceholderSection(8, 2, 1, "تثبيت Terraform وكتابة أول تكوين"),
            generatePlaceholderSection(8, 2, 2, "إدارة خوادم VPS (DigitalOcean/Hetzner) مع Terraform"),
            generatePlaceholderSection(8, 2, 3, "فهم حالة Terraform (State) وإدارتها عن بعد"),
            generatePlaceholderSection(8, 2, 4, "استخدام المتغيرات والمخرجات"),
            generatePlaceholderSection(8, 2, 5, "تنظيم الكود باستخدام الوحدات (Modules)"),
        ]
    },
    {
        id: "p8_c3", chapterTitle: "الفصل 38: إدارة التكوين مع Ansible",
        sections: [
            generatePlaceholderSection(8, 3, 1, "تثبيت Ansible وفهم المفاهيم الأساسية (Playbooks, Inventory)"),
            generatePlaceholderSection(8, 3, 2, "كتابة أول Playbook لتثبيت Nginx"),
            generatePlaceholderSection(8, 3, 3, "استخدام الأدوار (Roles) لتنظيم المهام"),
            generatePlaceholderSection(8, 3, 4, "إدارة الأسرار مع Ansible Vault"),
            generatePlaceholderSection(8, 3, 5, "دمج Terraform و Ansible"),
        ]
    },
    {
        id: "p8_c4", chapterTitle: "الفصل 39: الانتقال إلى السحابة",
        sections: [
            generatePlaceholderSection(8, 4, 1, "مقدمة إلى AWS: المفاهيم الأساسية (EC2, S3, VPC)"),
            generatePlaceholderSection(8, 4, 2, "مقدمة إلى GCP: المفاهيم الأساسية (Compute Engine, Cloud Storage)"),
            generatePlaceholderSection(8, 4, 3, "إدارة موارد AWS/GCP باستخدام Terraform"),
            generatePlaceholderSection(8, 4, 4, "فهم فوائد وتكاليف السحابة"),
            generatePlaceholderSection(8, 4, 5, "استراتيجيات الهجرة من VPS إلى السحابة"),
        ]
    },
    {
        id: "p8_c5", chapterTitle: "الفصل 40: مفاهيم متقدمة",
        sections: [
            generatePlaceholderSection(8, 5, 1, "اختبار البنية التحتية (Terratest)"),
            generatePlaceholderSection(8, 5, 2, "خطوط أنابيب CI/CD للبنية التحتية"),
            generatePlaceholderSection(8, 5, 3, "مقدمة إلى Packer لبناء صور الآلات"),
            generatePlaceholderSection(8, 5, 4, "مقدمة إلى الحوسبة بدون خادم (Serverless)"),
            generatePlaceholderSection(8, 5, 5, "مستقبل IaC: Crossplane و OpenTofu"),
        ]
    },
  ]
};
