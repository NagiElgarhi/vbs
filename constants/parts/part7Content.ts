
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

export const part7Content: Part = {
  id: "p7",
  partTitle: "الباب السابع: احتراف قواعد البيانات",
  icon: "📦",
  chapters: [
    {
        id: "p7_c1", chapterTitle: "الفصل 31: أداء PostgreSQL",
        sections: [
            generatePlaceholderSection(7, 1, 1, "فهم وتحليل خطط الاستعلام (EXPLAIN ANALYZE)"),
            generatePlaceholderSection(7, 1, 2, "استراتيجيات الفهرسة (Indexing) الفعالة"),
            generatePlaceholderSection(7, 1, 3, "صيانة قاعدة البيانات (VACUUM, REINDEX)"),
            generatePlaceholderSection(7, 1, 4, "ضبط إعدادات PostgreSQL (postgresql.conf)"),
            generatePlaceholderSection(7, 1, 5, "تجميع الاتصالات (Connection Pooling) مع PgBouncer"),
        ]
    },
    {
        id: "p7_c2", chapterTitle: "الفصل 32: النسخ الاحتياطي المتقدم والتكرار",
        sections: [
            generatePlaceholderSection(7, 2, 1, "النسخ الاحتياطي الفيزيائي مقابل المنطقي (pg_dump)"),
            generatePlaceholderSection(7, 2, 2, "إعداد الاسترداد في نقطة زمنية (PITR)"),
            generatePlaceholderSection(7, 2, 3, "إعداد التكرار المتدفق (Streaming Replication) لخادم احتياطي"),
            generatePlaceholderSection(7, 2, 4, "أتمتة النسخ الاحتياطي باستخدام أدوات مثل pgBackRest"),
            generatePlaceholderSection(7, 2, 5, "اختبار استراتيجيات الاسترداد من الكوارث"),
        ]
    },
    {
        id: "p7_c3", chapterTitle: "الفصل 33: أمان PostgreSQL",
        sections: [
            generatePlaceholderSection(7, 3, 1, "فهم ملف pg_hba.conf للتحكم في الوصول"),
            generatePlaceholderSection(7, 3, 2, "تشفير الاتصالات باستخدام SSL/TLS"),
            generatePlaceholderSection(7, 3, 3, "تشفير الأعمدة الحساسة باستخدام pgcrypto"),
            generatePlaceholderSection(7, 3, 4, "الأمان على مستوى الصف (Row-Level Security)"),
            generatePlaceholderSection(7, 3, 5, "تدقيق نشاط قاعدة البيانات مع pgAudit"),
        ]
    },
    {
        id: "p7_c4", chapterTitle: "الفصل 34: استخدام Redis للتخزين المؤقت",
        sections: [
            generatePlaceholderSection(7, 4, 1, "تثبيت وتأمين Redis"),
            generatePlaceholderSection(7, 4, 2, "استراتيجيات التخزين المؤقت (Cache-aside, Read-through)"),
            generatePlaceholderSection(7, 4, 3, "استخدام Redis كذاكرة تخزين مؤقت للجلسات"),
            generatePlaceholderSection(7, 4, 4, "تنفيذ التخزين المؤقت للاستعلامات المكلفة"),
            generatePlaceholderSection(7, 4, 5, "فهم سياسات إخلاء المفاتيح (Eviction Policies)"),
        ]
    },
    {
        id: "p7_c5", chapterTitle: "الفصل 35: مفاهيم NoSQL أخرى",
        sections: [
            generatePlaceholderSection(7, 5, 1, "مقدمة إلى قواعد البيانات الوثائقية (MongoDB)"),
            generatePlaceholderSection(7, 5, 2, "مقدمة إلى قواعد البيانات الزمنية (InfluxDB)"),
            generatePlaceholderSection(7, 5, 3, "مقدمة إلى محركات البحث (Elasticsearch)"),
            generatePlaceholderSection(7, 5, 4, "متى تختار NoSQL على SQL؟"),
            generatePlaceholderSection(7, 5, 5, "التعامل مع البيانات في عالم متعدد قواعد البيانات"),
        ]
    },
  ]
};
