
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

export const part4Content: Part = {
  id: "p4",
  partTitle: "الباب الرابع: الأمان والتحصين المتقدم",
  icon: "🛡️",
  chapters: [
     {
        id: "p4_c1", chapterTitle: "الفصل 16: تأمين Nginx بـ SSL/TLS",
        sections: [
            generatePlaceholderSection(4, 1, 1, "مقدمة إلى HTTPS وتشفير TLS/SSL"),
            generatePlaceholderSection(4, 1, 2, "الحصول على شهادة SSL مجانية من Let's Encrypt مع Certbot"),
            generatePlaceholderSection(4, 1, 3, "تكوين Nginx لاستخدام شهادات SSL"),
            generatePlaceholderSection(4, 1, 4, "أتمتة تجديد شهادات Let's Encrypt"),
            generatePlaceholderSection(4, 1, 5, "تحسين أداء وأمان TLS (HSTS, Perfect Forward Secrecy)"),
        ]
    },
     {
        id: "p4_c2", chapterTitle: "الفصل 17: أنظمة كشف التسلل والحماية",
        sections: [
            generatePlaceholderSection(4, 2, 1, "تكوين Fail2Ban المتقدم لمراقبة سجلات Nginx"),
            generatePlaceholderSection(4, 2, 2, "إعداد تنبيهات Fail2Ban"),
            generatePlaceholderSection(4, 2, 3, "مقدمة إلى أنظمة كشف التسلل المستندة إلى المضيف (HIDS)"),
            generatePlaceholderSection(4, 2, 4, "تثبيت وتكوين Wazuh Agent"),
            generatePlaceholderSection(4, 2, 5, "مقدمة إلى ModSecurity (WAF for Nginx)"),
        ]
    },
     {
        id: "p4_c3", chapterTitle: "الفصل 18: تدقيق النظام وتقويته",
        sections: [
            generatePlaceholderSection(4, 3, 1, "استخدام `lynis` لتدقيق أمان النظام"),
            generatePlaceholderSection(4, 3, 2, "استخدام `chkrootkit` و `rkhunter` للبحث عن أدوات الاختراق"),
            generatePlaceholderSection(4, 3, 3, "فهم وتطبيق تقوية نواة لينكس (Kernel Hardening)"),
            generatePlaceholderSection(4, 3, 4, "مراجعة أذونات الملفات والبحث عن نقاط الضعف"),
            generatePlaceholderSection(4, 3, 5, "تأمين الذاكرة المشتركة (`/dev/shm`)"),
        ]
    },
     {
        id: "p4_c4", chapterTitle: "الفصل 19: أمان التطبيقات",
        sections: [
            generatePlaceholderSection(4, 4, 1, "الحماية من هجمات XSS و CSRF"),
            generatePlaceholderSection(4, 4, 2, "تأمين ترويسات HTTP (HTTP Security Headers)"),
            generatePlaceholderSection(4, 4, 3, "التحقق من صحة المدخلات لمنع هجمات الحقن"),
            generatePlaceholderSection(4, 4, 4, "إدارة الجلسات وملفات تعريف الارتباط بأمان"),
            generatePlaceholderSection(4, 4, 5, "مقدمة إلى OWASP Top 10"),
        ]
    },
     {
        id: "p4_c5", chapterTitle: "الفصل 20: أمان الشبكة المتقدم",
        sections: [
            generatePlaceholderSection(4, 5, 1, "فهم `iptables` والفرق بينه وبين UFW"),
            generatePlaceholderSection(4, 5, 2, "إنشاء قواعد `iptables` مخصصة"),
            generatePlaceholderSection(4, 5, 3, "الحماية من هجمات DDoS البسيطة"),
            generatePlaceholderSection(4, 5, 4, "إعداد شبكة خاصة افتراضية (VPN) للوصول الإداري"),
            generatePlaceholderSection(4, 5, 5, "عزل الشبكات باستخدام VLANs (مفهوم)"),
        ]
    }
  ]
};
