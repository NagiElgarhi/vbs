
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

export const part5Content: Part = {
  id: "p5",
  partTitle: "الباب الخامس: المراقبة والسجلات والملاحظة",
  icon: "📊",
  chapters: [
    {
        id: "p5_c1", chapterTitle: "الفصل 21: إدارة السجلات المركزية",
        sections: [
            generatePlaceholderSection(5, 1, 1, "لماذا تحتاج إلى سجلات مركزية؟"),
            generatePlaceholderSection(5, 1, 2, "مقدمة إلى حزمة ELK (Elasticsearch, Logstash, Kibana)"),
            generatePlaceholderSection(5, 1, 3, "تثبيت وتكوين Filebeat لإرسال السجلات"),
            generatePlaceholderSection(5, 1, 4, "تحليل سجلات Nginx في Kibana"),
            generatePlaceholderSection(5, 1, 5, "بدائل ELK: Loki و Grafana"),
        ]
    },
    {
        id: "p5_c2", chapterTitle: "الفصل 22: المراقبة المتقدمة مع Prometheus",
        sections: [
            generatePlaceholderSection(5, 2, 1, "تثبيت خادم Prometheus"),
            generatePlaceholderSection(5, 2, 2, "مراقبة مقاييس النظام باستخدام Node Exporter"),
            generatePlaceholderSection(5, 2, 3, "مراقبة مقاييس Nginx"),
            generatePlaceholderSection(5, 2, 4, "فهم لغة استعلام PromQL"),
            generatePlaceholderSection(5, 2, 5, "إعداد مدير التنبيهات (Alertmanager)"),
        ]
    },
    {
        id: "p5_c3", chapterTitle: "الفصل 23: التصور البياني مع Grafana",
        sections: [
            generatePlaceholderSection(5, 3, 1, "تثبيت Grafana وربطه بـ Prometheus"),
            generatePlaceholderSection(5, 3, 2, "بناء لوحة معلومات (Dashboard) لمراقبة الخادم"),
            generatePlaceholderSection(5, 3, 3, "استيراد لوحات معلومات جاهزة من المجتمع"),
            generatePlaceholderSection(5, 3, 4, "إعداد التنبيهات المرئية في Grafana"),
            generatePlaceholderSection(5, 3, 5, "دمج مصادر بيانات متعددة (Loki, Elasticsearch)"),
        ]
    },
    {
        id: "p5_c4", chapterTitle: "الفصل 24: مراقبة أداء التطبيقات (APM)",
        sections: [
            generatePlaceholderSection(5, 4, 1, "ما هي APM وما أهميتها؟"),
            generatePlaceholderSection(5, 4, 2, "مقدمة إلى تتبع الطلبات الموزعة (Distributed Tracing)"),
            generatePlaceholderSection(5, 4, 3, "استخدام أدوات APM مفتوحة المصدر (مثل SigNoz)"),
            generatePlaceholderSection(5, 4, 4, "تحليل أداء التطبيق وتحديد نقاط الاختناق"),
            generatePlaceholderSection(5, 4, 5, "ربط التتبع بالسجلات والمقاييس"),
        ]
    },
    {
        id: "p5_c5", chapterTitle: "الفصل 25: الاستجابة للحوادث",
        sections: [
            generatePlaceholderSection(5, 5, 1, "إنشاء خطة استجابة للحوادث (Incident Response Plan)"),
            generatePlaceholderSection(5, 5, 2, "إعداد أدوات إدارة الحوادث (PagerDuty, Opsgenie)"),
            generatePlaceholderSection(5, 5, 3, "محاكاة الحوادث (Game Days)"),
            generatePlaceholderSection(5, 5, 4, "تحليل ما بعد الحادثة (Post-mortem Analysis)"),
            generatePlaceholderSection(5, 5, 5, "ثقافة عدم إلقاء اللوم (Blameless Culture)"),
        ]
    },
  ]
};
