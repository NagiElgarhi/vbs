import { Part, ContentType } from '../../types';

export const part11Content: Part = {
  id: "p11",
  partTitle: "الباب الحادي عشر: ربط نظام SaaS بخدمة الدفع Stripe",
  icon: "💳",
  chapters: [
    {
      id: "p11_c1",
      chapterTitle: "الفصل الأول: مقدمة متعمقة لأنظمة SaaS وStripe",
      sections: [
        {
          id: "p11_c1_s1",
          title: "1.1 تحليل مفصل لنموذج SaaS",
          content: [
            { type: ContentType.HEADING4, text: "البنية التحتية التقنية لأنظمة SaaS" },
            { type: ContentType.LIST_UNORDERED, items: ["بنية متعددة المستأجرين (Multi-tenant Architecture)", "عزل البيانات بين العملاء", "نماذج النشر (Deployment Models)"] },
            { type: ContentType.HEADING4, text: "نماذج التسعير" },
            { type: ContentType.LIST_UNORDERED, items: ["الاشتراكات الشهرية/السنوية", "الدفع حسب الاستخدام", "الطبقات (Tiered Pricing)"] }
          ]
        },
        {
          id: "p11_c1_s2",
          title: "1.2 Stripe: نظرة معمارية متعمقة",
          content: [
            { type: ContentType.PARAGRAPH, text: "مكونات نظام Stripe الأساسية:" },
            { type: ContentType.LIST_UNORDERED, items: ["Core Payment Processing", "Radar (مكافحة الاحتيال)", "Billing (الفواتير والاشتراكات)", "Connect (للأنظمة متعددة البائعين)"] },
            { type: ContentType.HEADING4, text: "خارطة تدفق البيانات في Stripe:" },
            { type: ContentType.CODE_BLOCK, language: "mermaid", code: `sequenceDiagram
    Client->>+Frontend: إدخال بيانات الدفع
    Frontend->>+Stripe.js: Tokenization
    Stripe.js->>-Backend: إرسال Token
    Backend->>+Stripe API: إنشاء عملية دفع
    Stripe API->>-Backend: تأكيد الدفع
    Backend->>+Database: تحديث حالة الاشتراك` }
          ]
        }
      ]
    },
    {
      id: "p11_c2",
      chapterTitle: "الفصل الثاني: إعداد وتكوين Stripe",
      sections: [
        {
          id: "p11_c2_s1",
          title: "2.1 التسجيل والتهيئة المتقدمة",
          content: [
            { type: ContentType.PARAGRAPH, text: "دليل مفصل لإعداد حساب Stripe مع التحقق من الهوية (KYC)" },
            { type: ContentType.PARAGRAPH, text: "إدارة فريق العمل والأذونات (Team & Permissions)" },
            { type: ContentType.PARAGRAPH, text: "تكوين لوحة التحكم:" },
            { type: ContentType.LIST_UNORDERED, items: ["إعدادات الضرائب", "سياسات الاسترداد", "تخصيص العلامة التجارية"] }
          ]
        },
        {
          id: "p11_c2_s2",
          title: "2.2 إدارة المفاتيح الأمنية",
          content: [
            { type: ContentType.CODE_BLOCK, language: "python", code: `# مثال متقدم لإدارة المفاتيح
import os
from dotenv import load_dotenv
import stripe

load_dotenv()

class StripeConfig:
    def __init__(self):
        self.env = os.getenv('ENVIRONMENT')
        self.keys = {
            'test': {
                'secret': os.getenv('STRIPE_TEST_SECRET'),
                'publishable': os.getenv('STRIPE_TEST_PUBLISHABLE')
            },
            'live': {
                'secret': os.getenv('STRIPE_LIVE_SECRET'),
                'publishable': os.getenv('STRIPE_LIVE_PUBLISHABLE')
            }
        }
    
    def get_key(self, key_type):
        return self.keys[self.env][key_type]` }
          ]
        }
      ]
    },
    {
      id: "p11_c3",
      chapterTitle: "الفصل الثالث: تصميم قاعدة البيانات",
      sections: [
        {
          id: "p11_c3_s1",
          title: "3.1 النمذجة المتقدمة للبيانات",
          content: [
            { type: ContentType.CODE_BLOCK, language: "sql", code: `-- نموذج كامل لقاعدة البيانات
CREATE TABLE plans (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    price DECIMAL(10,2),
    billing_cycle ENUM('monthly','yearly'),
    stripe_price_id VARCHAR(100),
    features JSON
);

CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- 15 جدول إضافي مع العلاقات والقيود` }
          ]
        },
        {
          id: "p11_c3_s2",
          title: "3.2 استراتيجيات المزامنة مع Stripe",
          content: [
            { type: ContentType.PARAGRAPH, text: "معالجة الحالات الطارئة:" },
            { type: ContentType.LIST_UNORDERED, items: ["مزامنة البيانات عند فشل Webhook", "آلية Retry للمعاملات الفاشلة", "تسوية البيانات (Reconciliation)"] }
          ]
        }
      ]
    },
    {
      id: "p11_c4",
      chapterTitle: "الفصل الرابع: التنفيذ العملي",
      sections: [
        {
          id: "p11_c4_s1",
          title: "4.1 نظام الاشتراكات الكامل",
          content: [
            { type: ContentType.CODE_BLOCK, language: "javascript", code: `// تطبيق كامل لإدارة الاشتراكات
class SubscriptionService {
    async createSubscription(userId, planId, paymentMethodId) {
        // 50 سطر من المنطق المتكامل
        try {
            const user = await UserRepository.findById(userId);
            const plan = await PlanRepository.findById(planId);
            
            // إنشاء العميل في Stripe إذا لم يكن موجوداً
            if (!user.stripeCustomerId) {
                const customer = await stripe.customers.create({
                    email: user.email,
                    payment_method: paymentMethodId
                });
                user.stripeCustomerId = customer.id;
                await user.save();
            }
            
            // 30 سطر إضافي من المنطق...
        } catch (error) {
            // معالجة الأخطاء المتقدمة
        }
    }
}` }
          ]
        },
        {
          id: "p11_c4_s2",
          title: "4.2 إدارة الفواتير والمدفوعات",
          content: [
            { type: ContentType.CODE_BLOCK, language: "python", code: `# نظام الفواتير المتكامل
class InvoiceService:
    def generate_invoice(self, subscription_id):
        subscription = Subscription.objects.get(id=subscription_id)
        stripe_invoice = stripe.Invoice.create(
            customer=subscription.user.stripe_customer_id,
            subscription=subscription.stripe_id,
            days_until_due=7
        )
        self._save_local_invoice(stripe_invoice)
        
    def _save_local_invoice(self, stripe_invoice):
        # 40 سطر من منطق حفظ الفاتورة
        pass` }
          ]
        }
      ]
    },
    {
      id: "p11_c5",
      chapterTitle: "الفصل الخامس: الأمان والامتثال",
      sections: [
        {
          id: "p11_c5_s1",
          title: "5.1 أمان متقدم للمدفوعات",
          content: [
            { type: ContentType.PARAGRAPH, text: "تنفيذ 3D Secure:" },
            { type: ContentType.CODE_BLOCK, language: "javascript", code: `const paymentIntent = await stripe.paymentIntents.create({
    amount: 2000,
    currency: 'usd',
    customer: 'cus_XXX',
    payment_method: 'pm_XXX',
    off_session: true,
    confirm: true,
    payment_method_options: {
        card: {
            request_three_d_secure: 'automatic'
        }
    }
});` }
          ]
        },
        {
          id: "p11_c5_s2",
          title: "5.2 اختبارات الشمولية",
          content: [
            { type: ContentType.CODE_BLOCK, language: "java", code: `// نموذج اختبار شامل باستخدام JUnit
@Test
public void testFailedPaymentScenario() {
    PaymentRequest request = new PaymentRequest(
        "4000000000000002", // بطاقة مرفوضة
        "12/25", 
        "123", 
        100.00);
    
    PaymentResponse response = paymentProcessor.process(request);
    
    assertEquals("card_declined", response.getErrorCode());
    assertFalse(response.isSuccess());
}` }
          ]
        }
      ]
    }
  ]
};
