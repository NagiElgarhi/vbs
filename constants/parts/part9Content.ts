
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

export const part9Content: Part = {
  id: "p9",
  partTitle: "الباب التاسع: العمليات المظلمة والدفاع الاستباقي",
  icon: "☠️",
  chapters: [
     {
        id: "p9_c1", chapterTitle: "الفصل 41: نمذجة التهديدات والدفاع النشط",
        sections: [
            generatePlaceholderSection(9, 1, 1, "مقدمة إلى نمذجة التهديدات وإطار STRIDE"),
            generatePlaceholderSection(9, 1, 2, "إجراء أول جلسة نمذجة تهديد لتطبيق ويب"),
            generatePlaceholderSection(9, 1, 3, "فلسفة الدفاع النشط مقابل الدفاع السلبي"),
            generatePlaceholderSection(9, 1, 4, "تقنيات الخداع: مقدمة إلى Honeypots"),
            generatePlaceholderSection(9, 1, 5, "إعداد Honeypot بسيط لـ SSH"),
        ]
    },
     {
        id: "p9_c2", chapterTitle: "الفصل 42: تقنيات الخداع المتقدمة",
        sections: [
            generatePlaceholderSection(9, 2, 1, "إنشاء نقاط نهاية API وهمية (Honeypots)"),
            generatePlaceholderSection(9, 2, 2, "بصمات المتصفح وتحديات JavaScript"),
            generatePlaceholderSection(9, 2, 3, "خادم المتاهة المضاد للروبوتات"),
            generatePlaceholderSection(9, 2, 4, "تسميم بيانات الروبوتات المهاجمة"),
            generatePlaceholderSection(9, 2, 5, "تحليل بيانات الـ Honeypot لتحديد المهاجمين"),
        ]
    },
     {
        id: "p9_c3", chapterTitle: "الفصل 43: عمليات BlackMetaOps",
        sections: [
            generatePlaceholderSection(9, 3, 1, "نقاط النهاية ذاتية التحور: جعل API هدفًا متحركًا"),
            generatePlaceholderSection(9, 3, 2, "إدارة التكوين الديناميكي من جانب العميل"),
            generatePlaceholderSection(9, 3, 3, "توليد رموز مسار ديناميكية"),
            generatePlaceholderSection(9, 3, 4, "توجيه حركة المرور المشبوهة إلى بنية تحتية خادعة"),
            generatePlaceholderSection(9, 3, 5, "الأخلاقيات والاعتبارات القانونية"),
        ]
    },
     {
        id: "p9_c4", chapterTitle: "الفصل 44: التحليل الجنائي والاستجابة",
        sections: [
            generatePlaceholderSection(9, 4, 1, "أساسيات التحليل الجنائي الرقمي"),
            generatePlaceholderSection(9, 4, 2, "جمع الأدلة من نظام مخترق"),
            generatePlaceholderSection(9, 4, 3, "تحليل سجلات النظام والشبكة"),
            generatePlaceholderSection(9, 4, 4, "تحليل الذاكرة (Memory Forensics)"),
            generatePlaceholderSection(9, 4, 5, "كتابة تقرير ما بعد الاختراق"),
        ]
    },
     {
        id: "p9_c5", chapterTitle: "الفصل 45: الخاتمة والخطوات التالية",
        sections: [
            generatePlaceholderSection(9, 5, 1, "مراجعة الرحلة: من VPS إلى DarkOps"),
            generatePlaceholderSection(9, 5, 2, "بناء عقلية أمنية"),
            generatePlaceholderSection(9, 5, 3, "مواكبة أحدث التهديدات والتقنيات"),
            generatePlaceholderSection(9, 5, 4, "المساهمة في مجتمع المصادر المفتوحة"),
            generatePlaceholderSection(9, 5, 5, "الرحلة لا تنتهي: التعلم المستمر"),
        ]
    },
  ]
};
