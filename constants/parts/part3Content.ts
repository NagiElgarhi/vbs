
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

export const part3Content: Part = {
  id: "p3",
  partTitle: "الباب الثالث: الأتمتة والتوزيع المستمر (CI/CD)",
  icon: "🔁",
  chapters: [
    {
        id: "p3_c1", chapterTitle: "الفصل 11: إدارة الكود ونشره",
        sections: [
            generatePlaceholderSection(3, 1, 1, "مقدمة إلى Git لإدارة الخادم"),
            generatePlaceholderSection(3, 1, 2, "إعداد مستودع Git على الخادم"),
            generatePlaceholderSection(3, 1, 3, "استراتيجيات النشر: Git Pull مقابل Git Clone"),
            generatePlaceholderSection(3, 1, 4, "أتمتة النشر البسيط باستخدام Git Hooks"),
            generatePlaceholderSection(3, 1, 5, "التعامل مع ملفات التكوين والأسرار في Git"),
        ]
    },
    {
        id: "p3_c2", chapterTitle: "الفصل 12: مقدمة إلى CI/CD",
        sections: [
            generatePlaceholderSection(3, 2, 1, "ما هو CI/CD ولماذا هو مهم؟"),
            generatePlaceholderSection(3, 2, 2, "مقدمة إلى GitHub Actions"),
            generatePlaceholderSection(3, 2, 3, "إنشاء أول سير عمل (Workflow) للنشر"),
            generatePlaceholderSection(3, 2, 4, "استخدام أسرار GitHub لتخزين بيانات الاعتماد"),
            generatePlaceholderSection(3, 2, 5, "تشغيل سير العمل عند الدفع إلى فرع معين"),
        ]
    },
    {
        id: "p3_c3", chapterTitle: "الفصل 13: بناء خطوط أنابيب متقدمة",
        sections: [
            generatePlaceholderSection(3, 3, 1, "إضافة خطوة الاختبار (CI) إلى سير العمل"),
            generatePlaceholderSection(3, 3, 2, "بناء الأصول (Assets) على GitHub Actions"),
            generatePlaceholderSection(3, 3, 3, "استخدام rsync للنشر الفعال"),
            generatePlaceholderSection(3, 3, 4, "استراتيجيات التراجع (Rollback) البسيطة"),
            generatePlaceholderSection(3, 3, 5, "إرسال إشعارات حالة النشر (Slack/Discord)"),
        ]
    },
    {
        id: "p3_c4", chapterTitle: "الفصل 14: التوزيع بدون توقف",
        sections: [
            generatePlaceholderSection(3, 4, 1, "فهم مشكلة التوقف أثناء النشر"),
            generatePlaceholderSection(3, 4, 2, "استراتيجية النشر الأزرق/الأخضر (Blue/Green Deployment)"),
            generatePlaceholderSection(3, 4, 3, "تنفيذ النشر الأزرق/الأخضر باستخدام PM2"),
            generatePlaceholderSection(3, 4, 4, "تنفيذ النشر الأزرق/الأخضر باستخدام Nginx"),
            generatePlaceholderSection(3, 4, 5, "مقدمة إلى النشر الكناري (Canary Deployment)"),
        ]
    },
    {
        id: "p3_c5", chapterTitle: "الفصل 15: أدوات CI/CD أخرى",
        sections: [
            generatePlaceholderSection(3, 5, 1, "نظرة عامة على Jenkins"),
            generatePlaceholderSection(3, 5, 2, "نظرة عامة على GitLab CI/CD"),
            generatePlaceholderSection(3, 5, 3, "نظرة عامة على CircleCI"),
            generatePlaceholderSection(3, 5, 4, "مقارنة بين المنصات المختلفة"),
            generatePlaceholderSection(3, 5, 5, "اختيار الأداة المناسبة لمشروعك"),
        ]
    },
  ]
};
