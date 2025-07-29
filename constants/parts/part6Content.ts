
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

export const part6Content: Part = {
  id: "p6",
  partTitle: "الباب السادس: الحاويات (Containerization)",
  icon: "🐳",
  chapters: [
    {
        id: "p6_c1", chapterTitle: "الفصل 26: أساسيات Docker",
        sections: [
            generatePlaceholderSection(6, 1, 1, "ما هي الحاويات؟ Docker مقابل الآلات الافتراضية"),
            generatePlaceholderSection(6, 1, 2, "تثبيت Docker Engine على أوبونتو"),
            generatePlaceholderSection(6, 1, 3, "الأوامر الأساسية لـ Docker (run, ps, stop, rm)"),
            generatePlaceholderSection(6, 1, 4, "فهم الصور (Images) والحاويات (Containers)"),
            generatePlaceholderSection(6, 1, 5, "البحث عن الصور واستخدامها من Docker Hub"),
        ]
    },
    {
        id: "p6_c2", chapterTitle: "الفصل 27: بناء الصور مع Dockerfile",
        sections: [
            generatePlaceholderSection(6, 2, 1, "كتابة أول Dockerfile لتطبيق Node.js"),
            generatePlaceholderSection(6, 2, 2, "كتابة Dockerfile لتطبيق Python"),
            generatePlaceholderSection(6, 2, 3, "أفضل الممارسات لكتابة Dockerfile (التخزين المؤقت، الصور متعددة المراحل)"),
            generatePlaceholderSection(6, 2, 4, "فهم وإدارة طبقات الصور"),
            generatePlaceholderSection(6, 2, 5, "نشر الصور إلى سجل خاص (Private Registry)"),
        ]
    },
    {
        id: "p6_c3", chapterTitle: "الفصل 28: إدارة التطبيقات متعددة الحاويات",
        sections: [
            generatePlaceholderSection(6, 3, 1, "مقدمة إلى Docker Compose"),
            generatePlaceholderSection(6, 3, 2, "كتابة ملف docker-compose.yml لتطبيق ويب وقاعدة بيانات"),
            generatePlaceholderSection(6, 3, 3, "فهم شبكات Docker Compose"),
            generatePlaceholderSection(6, 3, 4, "إدارة البيانات مع Docker Volumes"),
            generatePlaceholderSection(6, 3, 5, "توسيع نطاق الخدمات مع Docker Compose"),
        ]
    },
    {
        id: "p6_c4", chapterTitle: "الفصل 29: مقدمة إلى Kubernetes",
        sections: [
            generatePlaceholderSection(6, 4, 1, "لماذا Kubernetes؟ المشاكل التي يحلها"),
            generatePlaceholderSection(6, 4, 2, "البنية الأساسية لـ Kubernetes (Nodes, Pods, Services, Deployments)"),
            generatePlaceholderSection(6, 4, 3, "إعداد بيئة Kubernetes محلية (Minikube, Kind)"),
            generatePlaceholderSection(6, 4, 4, "نشر أول تطبيق على Kubernetes باستخدام kubectl"),
            generatePlaceholderSection(6, 4, 5, "فحص وإدارة الموارد في Kubernetes"),
        ]
    },
    {
        id: "p6_c5", chapterTitle: "الفصل 30: أمان الحاويات",
        sections: [
            generatePlaceholderSection(6, 5, 1, "أفضل ممارسات أمان Dockerfile"),
            generatePlaceholderSection(6, 5, 2, "فحص الصور بحثًا عن الثغرات باستخدام Trivy"),
            generatePlaceholderSection(6, 5, 3, "تشغيل الحاويات كمستخدم غير جذري"),
            generatePlaceholderSection(6, 5, 4, "فهم سياقات الأمان في Kubernetes (Security Contexts)"),
            generatePlaceholderSection(6, 5, 5, "مقدمة إلى سياسات شبكة Kubernetes (Network Policies)"),
        ]
    },
  ]
};
