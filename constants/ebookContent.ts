import { Book, ContentType } from '../types';

const generatePlaceholderSection = (part: number, chapter: number, level: number, title: string, icon: string = "🚧") => {
    const levelNumber = (part - 1) * 25 + (chapter - 1) * 5 + level;
    return {
        id: `p${part}_c${chapter}_l${levelNumber}`,
        icon,
        title: `المستوى ${levelNumber}: ${title}`,
        content: [{ type: ContentType.PARAGRAPH, text: "هذا المحتوى قيد التطوير وجارٍ العمل عليه." }],
    };
};

export const bookData: Book = {
  bookTitle: "إدارة وتشغيل الباك-إند على VPS – من الصفر للاحتراف",
  arabicBookTitle: "إدارة وتشغيل الباك-إند على VPS – من الصفر للاحتراف",
  parts: [
    {
      id: "p1",
      partTitle: "الباب الأول: إعداد وتأمين الخادم",
      icon: "🚀",
      chapters: [
        {
          id: "p1_c1",
          chapterTitle: "الفصل الأول: التجهيز والوصول الأولي",
          sections: [
            {
              id: "p1_c1_s1",
              icon: "🌟",
              title: "المستوى 0: المقدمة والبداية",
              content: [
                {
                  type: ContentType.PARAGRAPH,
                  text: "أهلاً بك في رحلتك الحقيقية نحو احتراف عالم الواجهة الخلفية (Backend). إذا كنت قد تساءلت يومًا كيف تعمل التطبيقات التي نستخدمها يوميًا، من منصات التواصل الاجتماعي إلى بوابات التجارة الإلكترونية، وكيف تتعامل مع آلاف الطلبات في الثانية، وكيف تبقى متاحة ومستقرة على مدار الساعة، فأنت في المكان الصحيح تمامًا. هذا الكتاب ليس مجرد ت