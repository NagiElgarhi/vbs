import { Part, ContentType } from '../../types';

export const part10Content: Part = {
  id: "p10",
  partTitle: "الباب العاشر: صفحة التسعير وربطها بالباكند في تطبيقات SaaS",
  icon: "💳",
  chapters: [
    {
      id: "p10_c1",
      chapterTitle: "الفصل الأول: مفهوم تطبيقات SaaS ونماذج التسعير",
      sections: [
        {
          id: "p10_c1_s1",
          title: "مقدمة",
          content: [
            { type: ContentType.PARAGRAPH, text: "في عصر الانتقال الرقمي، أصبحت خدمات البرمجيات كخدمة (Software as a Service – SaaS) نموذجًا تجاريًا رئيسيًا لتقديم الحلول التقنية للشركات والأفراد. تُعد صفحات التسعير (Pricing Page) من أهم عناصر التسويق والتحويل في أي تطبيق SaaS، فهي الجسر الذي يربط بين المنتج وعملائه المحتملين، وتلعب دورًا محوريًا في اتخاذ قرار الشراء." },
            { type: ContentType.PARAGRAPH, text: "لكن ما لا يدركه الكثيرون هو أن صفحة التسعير ليست مجرد عرض جمالي للخطط والأسعار، بل هي واجهة تفاعلية معقدة تتطلب دمجًا تقنيًا دقيقًا مع الباكند (Backend) لضمان دقة البيانات، وتحديث الأسعار في الوقت الفعلي، وربط المستخدمين بالخطط المناسبة، ومعالجة الاشتراكات، وتقديم تجربة سلسة من العرض إلى الدفع." },
            { type: ContentType.PARAGRAPH, text: "يهدف هذا البحث إلى تحليل وتصميم وتنفيذ صفحة تسعير فعّالة في تطبيق SaaS، مع التركيز على التكامل بين الواجهة الأمامية (Frontend) والباكند (Backend)، وتقديم نماذج عملية، وأفضل الممارسات، وحلول تقنية معاصرة، ودراسة حالة واقعية، بالإضافة إلى تحليل أمني وتجربة مستخدم (UX)." }
          ]
        },
        {
          id: "p10_c1_s2",
          title: "1.1 ما هي تطبيقات SaaS؟",
          content: [
            { type: ContentType.PARAGRAPH, text: "Software as a Service (SaaS) هو نموذج توزيع البرمجيات عبر الإنترنت، حيث لا يُشترى البرنامج كمنتج مادي، بل يُستخدم عبر اشتراك شهري أو سنوي. يتم استضافته على خوادم المطور، ويُمكن الوصول إليه من خلال متصفح الويب أو تطبيق جوال." },
            { type: ContentType.HEADING4, text: "مميزات نموذج SaaS:" },
            { type: ContentType.LIST_UNORDERED, items: ["سهولة التحديث: يتم التحديث تلقائيًا من قبل المطور.", "الوصول من أي مكان: عبر الإنترنت.", "التكلفة المنخفضة في البداية: لا حاجة لشراء خوادم أو تراخيص.", "قابلية التوسع (Scalability): يمكن زيادة أو تقليل الموارد حسب الحاجة."] },
            { type: ContentType.HEADING4, text: "أمثلة على تطبيقات SaaS ناجحة:" },
            { type: ContentType.LIST_UNORDERED, items: ["Slack (الاتصالات)", "Notion (إدارة المحتوى)", "Zoom (الاتصال المرئي)", "Shopify (إنشاء المتاجر الإلكترونية)", "Mailchimp (التسويق عبر البريد الإلكتروني)"] }
          ]
        },
        {
            id: "p10_c1_s3",
            title: "1.2 أهمية صفحة التسعير في SaaS",
            content: [
              { type: ContentType.PARAGRAPH, text: "صفحة التسعير ليست مجرد قائمة بالأسعار، بل هي:" },
              { type: ContentType.LIST_UNORDERED, items: ["أداة تسويقية: تُقنع المستخدم بقيمة المنتج.", "أداة تحويل (Conversion Tool): تحول الزائر إلى عميل.", "أداة توضيحية: تشرح الفروقات بين الخطط.", "أداة تفاعلية: تُمكن من التبديل بين الخطط، وعرض المميزات، والبدء بالتجربة."] },
              { type: ContentType.HEADING4, text: "إحصائيات مهمة:" },
              { type: ContentType.LIST_UNORDERED, items: ["وفقًا لـ HubSpot، فإن 76% من الزوار يزورون صفحة التسعير قبل اتخاذ قرار الشراء.", "وفقًا لـ Paddle، فإن تحسين صفحة التسعير يمكن أن يزيد التحويل بنسبة تصل إلى 30%."] }
            ]
        },
        {
            id: "p10_c1_s4",
            title: "1.3 نماذج التسعير الشائعة في SaaS",
            content: [
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "التسعير الثابت (Flat Rate)", definition: "سعر واحد لكل المستخدمين. مثال: Basecamp (في بعض الخطط)." },
                    { term: "التسعير المتدرج (Tiered Pricing)", definition: "خطط متعددة بأسعار مختلفة. مثال: Notion، Slack." },
                    { term: "التسعير القائم على الاستخدام (Usage-Based)", definition: "السعر يعتمد على الاستهلاك (مثل عدد الرسائل، التخزين، إلخ). مثال: Twilio، AWS." },
                    { term: "التسعير المختلط (Hybrid)", definition: "مزيج من المتدرج والمستخدم. مثال: Zoom، Shopify." },
                    { term: "التسعير التجريبي المجاني (Freemium)", definition: "خطة مجانية + خطط مدفوعة. مثال: Dropbox، Canva." }
                ]}
            ]
        }
      ]
    },
    {
        id: "p10_c2",
        chapterTitle: "الفصل الثاني: تصميم صفحة التسعير من منظور تجربة المستخدم (UX)",
        sections: [
            {
                id: "p10_c2_s1",
                title: "2.1 مبادئ تصميم واجهة صفحة التسعير",
                content: [
                    { type: ContentType.HEADING4, text: "2.1.1 الوضوح والبساطة" },
                    { type: ContentType.LIST_UNORDERED, items: ["تجنب المصطلحات التقنية المعقدة.", "استخدام لغة بسيطة ومباشرة.", "توضيح الفوائد بدلًا من الميزات فقط."] },
                    { type: ContentType.HEADING4, text: "2.1.2 التسلسل الهرمي البصري (Visual Hierarchy)" },
                    { type: ContentType.LIST_UNORDERED, items: ["يجب أن يكون التركيز على الخطة الموصى بها (Recommended Plan).", "استخدام الألوان، الحجم، والمسافات لجذب الانتباه.", "تضمين زر 'ابدأ الآن' أو 'جرب مجانًا' بشكل بارز."] },
                    { type: ContentType.HEADING4, text: "2.1.3 تحسين التحويل (Conversion Optimization)" },
                    { type: ContentType.LIST_UNORDERED, items: ["وضع العناصر الحاسمة في 'المنطقة الميتة' (Above the Fold).", "تقليل عدد الخطوات للتسجيل.", "تضمين عناصر ثقة (Trust Elements): شهادات العملاء، شعارات العملاء، ضمان استرداد."] },
                    { type: ContentType.HEADING4, text: "2.1.4 التفاعل الديناميكي" },
                    { type: ContentType.LIST_UNORDERED, items: ["إمكانية تبديل بين 'شهري' و'سنوي' مع عرض التوفير.", "عرض الميزات المخفية عند النقر.", "دعم التخصيص حسب احتياجات العميل."] }
                ]
            },
            {
                id: "p10_c2_s2",
                title: "2.2 عناصر رئيسية في صفحة التسعير",
                content: [
                    { type: ContentType.LIST_UNORDERED, items: ["عنوان رئيسي جذاب: مثل 'اختر الخطة التي تناسبك'", "وصف مختصر: يوضح الفوائد العامة.", "الخطط (Plans): Free، Pro، Business، Enterprise", "الميزات (Features): قائمة واضحة لكل خطة.", "أسعار واضحة: مع إظهار التوفير عند الدفع السنوي.", "أزرار الحث على اتخاذ إجراء (CTA): 'ابدأ تجربة مجانية'، 'اشترك الآن'", "أسئلة شائعة (FAQ): توضح الشكوك حول الفوترة، الإلغاء، الدعم.", "عناصر الثقة: شعارات عملاء، تقييمات، شهادات أمان."] }
                ]
            },
            {
                id: "p10_c2_s3",
                title: "2.3 دراسة حالة: تحليل صفحة تسعير Notion",
                content: [
                    { type: ContentType.HEADING4, text: "نقاط القوة:" },
                    { type: ContentType.LIST_UNORDERED, items: ["تصميم بسيط ونظيف.", "تبديل بين الشهري والسنوي.", "توضيح الفرق بين الخطط بوضوح.", "خطة مجانية قوية تحفز التسجيل.", "زر CTA واضح."] },
                    { type: ContentType.HEADING4, text: "نقاط الضعف:" },
                    { type: ContentType.LIST_UNORDERED, items: ["لا يوجد تخصيص ديناميكي حسب الاستخدام.", "لا توجد محاكاة حسابية للسعر بناءً على الاستخدام."] }
                ]
            }
        ]
    },
    {
        id: "p10_c3",
        chapterTitle: "الفصل الثالث: البنية التقنية لصفحة التسعير",
        sections: [
            {
                id: "p10_c3_s1",
                title: "3.1 نظرة عامة على البنية (Architecture)",
                content: [
                    { type: ContentType.PARAGRAPH, text: "تتكون صفحة التسعير من:"},
                    { type: ContentType.LIST_UNORDERED, items: [
                        "الواجهة الأمامية (Frontend): HTML، CSS، JavaScript، React/Vue.",
                        "الواجهة الخلفية (Backend): Node.js، Django، Laravel، إلخ.",
                        "قاعدة البيانات (Database): PostgreSQL، MySQL، MongoDB.",
                        "خدمة الدفع (Payment Gateway): Stripe، PayPal، Paddle.",
                        "نظام إدارة الاشتراكات (Subscription Management)."
                    ]}
                ]
            },
            {
                id: "p10_c3_s2",
                title: "3.2 تدفق البيانات في صفحة التسعير",
                content: [
                    { type: ContentType.LIST_UNORDERED, items: [
                        "1. يزور المستخدم صفحة التسعير.",
                        "2. يقوم الـ Frontend بطلب بيانات الخطط من الـ Backend عبر API.",
                        "3. يُرسل الـ Backend بيانات الخطط من قاعدة البيانات.",
                        "4. يعرض الـ Frontend الخطط مع الميزات والأسعار.",
                        "5. عند اختيار الخطة، يتم توجيه المستخدم إلى صفحة التسجيل أو الدفع.",
                        "6. يتم إرسال طلب إلى الـ Backend لبدء عملية الاشتراك.",
                        "7. يتم ربط المستخدم بالخطة المحددة في قاعدة البيانات."
                    ]}
                ]
            },
            {
                id: "p10_c3_s3",
                title: "3.3 تصميم قاعدة البيانات لخطط التسعير",
                content: [
                    { type: ContentType.HEADING4, text: "الجداول المقترحة:" },
                    { type: ContentType.PARAGRAPH, text: "<b>1. `plans`</b>" },
                    { type: ContentType.PREFORMATTED_TEXT, text: `| الحقل | النوع | الوصف |
|-------|------|-------|
| id | INT (PK) | معرف الخطة |
| name | VARCHAR | اسم الخطة (Free, Pro, Enterprise) |
| description | TEXT | وصف الخطة |
| monthly_price | DECIMAL | السعر الشهري |
| yearly_price | DECIMAL | السعر السنوي |
| is_active | BOOLEAN | هل الخطة مفعلة؟ |
| recommended | BOOLEAN | هل هي الخطة الموصى بها؟ |`},
                    { type: ContentType.PARAGRAPH, text: "<b>2. `features`</b>" },
                    { type: ContentType.PREFORMATTED_TEXT, text: `| الحقل | النوع | الوصف |
|-------|------|-------|
| id | INT (PK) | معرف الميزة |
| name | VARCHAR | اسم الميزة (مثل "تخزين 10GB") |
| description | TEXT | وصف الميزة |`},
                    { type: ContentType.PARAGRAPH, text: "<b>3. `plan_features`</b> (جدول ارتباط)" },
                    { type: ContentType.PREFORMATTED_TEXT, text: `| الحقل | النوع | الوصف |
|-------|------|-------|
| plan_id | INT (FK) | معرف الخطة |
| feature_id | INT (FK) | معرف الميزة |
| included | BOOLEAN | هل الميزة متضمنة؟ |
| limit | INT | حد معين (مثل 5 مستخدمين) |`},
                    { type: ContentType.PARAGRAPH, text: "<b>4. `subscriptions`</b>" },
                    { type: ContentType.PREFORMATTED_TEXT, text: `| الحقل | النوع | الوصف |
|-------|------|-------|
| id | INT (PK) | معرف الاشتراك |
| user_id | INT (FK) | معرف المستخدم |
| plan_id | INT (FK) | معرف الخطة |
| start_date | DATETIME | تاريخ البدء |
| end_date | DATETIME | تاريخ الانتهاء |
| status | ENUM | (active, canceled, expired) |
| billing_cycle | ENUM | (monthly, yearly) |`}
                ]
            }
        ]
    },
    {
        id: "p10_c4",
        chapterTitle: "الفصل الرابع: تطوير واجهة الأمام (Frontend) لصفحة التسعير",
        sections: [
            {
                id: "p10_c4_s1",
                title: "4.1 اختيار الإطار (Framework)",
                content: [
                    { type: ContentType.PARAGRAPH, text: "نستخدم React.js كمثال لبناء الواجهة، لما يوفره من:" },
                    { type: ContentType.LIST_UNORDERED, items: [
                        "إعادة استخدام المكونات (Components).",
                        "إدارة الحالة (State Management).",
                        "دعم API بسهولة."
                    ]}
                ]
            },
            {
                id: "p10_c4_s2",
                title: "4.2 هيكل المكونات (Component Structure)",
                content: [
                    { type: ContentType.CODE_BLOCK, language: "bash", code: `PricingPage/
├── PlanCard.jsx        // بطاقة خطة واحدة
├── FeatureList.jsx     // قائمة الميزات
├── ToggleBilling.jsx   // مفتاح تبديل بين شهري/سنوي
├── FAQSection.jsx      // قسم الأسئلة الشائعة
└── CTAButton.jsx       // زر الحث على اتخاذ إجراء` }
                ]
            },
            {
                id: "p10_c4_s3",
                title: "4.3 مثال عملي: كود React لبطاقة الخطة",
                content: [
                    { type: ContentType.CODE_BLOCK, language: "jsx", code: `// PlanCard.jsx
import React from 'react';

const PlanCard = ({ plan, isYearly, onSubscribe }) => {
  const price = isYearly ? plan.yearly_price : plan.monthly_price;
  const savings = plan.monthly_price * 12 - plan.yearly_price;

  return (
    <div className={\`plan-card \${plan.recommended ? 'recommended' : ''}\`}>
      {plan.recommended && <span className="badge">الأكثر شيوعًا</span>}
      <h3>{plan.name}</h3>
      <p>{plan.description}</p>
      <div className="price">
        <span className="amount">$\{price}</span>
        <span className="period">/\${isYearly ? 'سنة' : 'شهر'}</span>
      </div>
      {isYearly && savings > 0 && (
        <p className="savings">توفير $\{savings} سنويًا!</p>
      )}
      <ul className="features">
        {plan.features.map((feature) => (
          <li key={feature.id}>
            {feature.included ? '✔' : '✘'} {feature.name}
            {feature.limit && \` (\${feature.limit})\`}
          </li>
        ))}
      </ul>
      <button onClick={() => onSubscribe(plan.id)} className="cta">
        ابدأ الآن
      </button>
    </div>
  );
};

export default PlanCard;` }
                ]
            },
            {
                id: "p10_c4_s4",
                title: "4.4 تبديل بين الشهري والسنوي",
                content: [
                    { type: ContentType.CODE_BLOCK, language: "jsx", code: `// ToggleBilling.jsx
import React from 'react';

const ToggleBilling = ({ isYearly, onToggle }) => {
  return (
    <div className="toggle-billing">
      <span>شهري</span>
      <label className="switch">
        <input type="checkbox" checked={isYearly} onChange={onToggle} />
        <span className="slider"></span>
      </label>
      <span>سنوي (-20%)</span>
    </div>
  );
};

export default ToggleBilling;` }
                ]
            }
        ]
    },
    {
        id: "p10_c5",
        chapterTitle: "الفصل الخامس: تطوير الباكند وربطه بصفحة التسعير",
        sections: [
            { id: "p10_c5_s1", title: "5.1 اختيار لغة الباكند", content: [{ type: ContentType.PARAGRAPH, text: "نستخدم Node.js مع Express.js لبناء واجهة برمجة التطبيقات (API)." }] },
            { id: "p10_c5_s2", title: "5.2 هيكل API", content: [{ type: ContentType.CODE_BLOCK, language: "bash", code: `GET /api/plans          → جلب جميع الخطط
GET /api/plans/:id      → جلب خطة محددة
POST /api/subscriptions → إنشاء اشتراك جديد` }] },
            {
                id: "p10_c5_s3",
                title: "5.3 كود API لإرجاع الخطط",
                content: [
                    { type: ContentType.CODE_BLOCK, language: "javascript", code: `// routes/plans.js
const express = require('express');
const db = require('../db'); // اتصال بقاعدة البيانات
const router = express.Router();

// جلب جميع الخطط مع الميزات
router.get('/', async (req, res) => {
  try {
    const plansQuery = \`
      SELECT p.*, f.name as feature_name, pf.included, pf.limit
      FROM plans p
      LEFT JOIN plan_features pf ON p.id = pf.plan_id
      LEFT JOIN features f ON pf.feature_id = f.id
      WHERE p.is_active = true
      ORDER BY p.id;
    \`;
    
    const result = await db.query(plansQuery);
    
    // تحويل النتيجة إلى هيكل منظم
    const plans = {};
    result.rows.forEach(row => {
      if (!plans[row.id]) {
        plans[row.id] = {
          id: row.id,
          name: row.name,
          description: row.description,
          monthly_price: row.monthly_price,
          yearly_price: row.yearly_price,
          recommended: row.recommended,
          features: []
        };
      }
      if (row.feature_name) {
        plans[row.id].features.push({
          name: row.feature_name,
          included: row.included,
          limit: row.limit
        });
      }
    });

    res.json(Object.values(plans));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;` }
                ]
            },
            {
                id: "p10_c5_s4",
                title: "5.4 ربط صفحة التسعير بالباكند",
                content: [
                    { type: ContentType.PARAGRAPH, text: "في الواجهة الأمامية، نستخدم `useEffect` لجلب البيانات:" },
                    { type: ContentType.CODE_BLOCK, language: "jsx", code: `// PricingPage.jsx
import React, { useState, useEffect } from 'react';
import PlanCard from './PlanCard';
import ToggleBilling from './ToggleBilling';

const PricingPage = () => {
  const [plans, setPlans] = useState([]);
  const [isYearly, setIsYearly] = useState(false);

  useEffect(() => {
    fetch('/api/plans')
      .then(res => res.json())
      .then(data => setPlans(data))
      .catch(err => console.error(err));
  }, []);

  const handleSubscribe = (planId) => {
    // توجيه المستخدم إلى صفحة التسجيل أو الدفع
    window.location.href = \`/signup?plan=\${planId}&billing=\${isYearly ? 'yearly' : 'monthly'}\`;
  };

  return (
    <div className="pricing-page">
      <h1>اختر الخطة التي تناسبك</h1>
      <ToggleBilling isYearly={isYearly} onToggle={() => setIsYearly(!isYearly)} />
      
      <div className="plans-grid">
        {plans.map(plan => (
          <PlanCard 
            key={plan.id} 
            plan={plan} 
            isYearly={isYearly} 
            onSubscribe={handleSubscribe} 
          />
        ))}
      </div>
    </div>
  );
};

export default PricingPage;` }
                ]
            }
        ]
    },
    {
        id: "p10_c6",
        chapterTitle: "الفصل السادس: إدارة الاشتراكات والدفع",
        sections: [
            {
                id: "p10_c6_s1",
                title: "6.1 دمج بوابة الدفع: Stripe كمثال",
                content: [
                    { type: ContentType.PARAGRAPH, text: "Stripe هو الحل الأكثر شيوعًا لإدارة الاشتراكات في SaaS."},
                    { type: ContentType.HEADING4, text: "الخطوات:"},
                    { type: ContentType.PARAGRAPH, text: "1. إنشاء حساب على Stripe."},
                    { type: ContentType.PARAGRAPH, text: "2. تثبيت `stripe` في الباكند:"},
                    { type: ContentType.CODE_BLOCK, language: "bash", code: `npm install stripe`},
                    { type: ContentType.PARAGRAPH, text: "3. إنشاء جلسة دفع (Checkout Session):"},
                    { type: ContentType.CODE_BLOCK, language: "javascript", code: `// routes/checkout.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {
  const { planId, userId } = req.body;

  // جلب تفاصيل الخطة من قاعدة البيانات
  const plan = await db.query('SELECT * FROM plans WHERE id = $1', [planId]);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [
      {
        price: plan.rows[0].stripe_price_id, // يجب تخزين هذا في قاعدة البيانات
        quantity: 1,
      },
    ],
    success_url: \`\${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}\`,
    cancel_url: \`\${process.env.FRONTEND_URL}/pricing\`,
    client_reference_id: userId, // لربط المستخدم بالاشتراك
  });

  res.json({ id: session.id });
});` }
                ]
            },
            {
                id: "p10_c6_s2",
                title: "6.2 معالجة Webhooks من Stripe",
                content: [
                    { type: ContentType.PARAGRAPH, text: "لتحديث حالة الاشتراك تلقائيًا:"},
                    { type: ContentType.CODE_BLOCK, language: "javascript", code: `// routes/webhooks.js
app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(\`Webhook Error: \${err.message}\`);
  }

  // معالجة الأحداث
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.client_reference_id;
    const subscriptionId = session.subscription;

    // تحديث قاعدة البيانات
    db.query(
      'INSERT INTO subscriptions (user_id, plan_id, stripe_subscription_id, status, billing_cycle) VALUES ($1, $2, $3, $4, $5)',
      [userId, planId, subscriptionId, 'active', 'monthly']
    );
  }

  res.json({ received: true });
});` }
                ]
            }
        ]
    },
    {
        id: "p10_c7",
        chapterTitle: "الفصل السابع: الأمان والامتثال",
        sections: [
            { id: "p10_c7_s1", title: "7.1 حماية واجهة برمجة التطبيقات (API Security)", content: [
                { type: ContentType.LIST_UNORDERED, items: [
                    "استخدام JWT للمصادقة.",
                    "تقييد الوصول إلى /api/plans للقراءة فقط.",
                    "تشفير البيانات الحساسة.",
                    "منع هجمات SQL Injection باستخدام المعاملات (Parameterized Queries)."
                ]}
            ]},
            { id: "p10_c7_s2", title: "7.2 الامتثال لـ GDPR و CCPA", content: [
                { type: ContentType.LIST_UNORDERED, items: [
                    "الحصول على موافقة المستخدم قبل جمع البيانات.",
                    "توفير خيار حذف الحساب.",
                    "تشفير بيانات الدفع."
                ]}
            ]},
            { id: "p10_c7_s3", title: "7.3 حماية بيانات الدفع", content: [
                { type: ContentType.LIST_UNORDERED, items: [
                    "عدم تخزين تفاصيل البطاقة.",
                    "استخدام Stripe أو بوابات معتمدة PCI-DSS."
                ]}
            ]}
        ]
    },
    {
        id: "p10_c8",
        chapterTitle: "الفصل الثامن: تحسين الأداء وقابلية التوسع",
        sections: [
            { id: "p10_c8_s1", title: "8.1 التخزين المؤقت (Caching)", content: [ { type: ContentType.LIST_UNORDERED, items: ["استخدام Redis لتخزين بيانات الخطط لفترة قصيرة (مثلاً 10 دقائق).", "تقليل الضغط على قاعدة البيانات."] } ] },
            { id: "p10_c8_s2", title: "8.2 التحميل التدريجي (Lazy Loading)", content: [ { type: ContentType.PARAGRAPH, text: "تحميل صفحات التسعير بسرعة حتى مع اتصال بطيء." } ] },
            { id: "p10_c8_s3", title: "8.3 التوسع الأفقي (Horizontal Scaling)", content: [ { type: ContentType.LIST_UNORDERED, items: ["استخدام Load Balancer لتوزيع الطلبات.", "تقسيم قاعدة البيانات (Sharding) عند النمو."] } ] }
        ]
    },
    {
        id: "p10_c9",
        chapterTitle: "الفصل التاسع: تجربة المستخدم المتقدمة",
        sections: [
            { id: "p10_c9_s1", title: "9.1 التخصيص الديناميكي", content: [ { type: ContentType.LIST_UNORDERED, items: ["حساب السعر بناءً على الاستخدام (مثل عدد المستخدمين).", "عرض تقدير تلقائي."] } ] },
            { id: "p10_c9_s2", title: "9.2 دعم اللغات والمناطق", content: [ { type: ContentType.LIST_UNORDERED, items: ["عرض الأسعار بالعملة المحلية.", "ترجمة الميزات."] } ] },
            { id: "p10_c9_s3", title: "9.3 تحليلات المستخدم", content: [ { type: ContentType.LIST_UNORDERED, items: ["تتبع النقرات على خطط التسعير.", "تحليل معدل التحويل."] } ] }
        ]
    },
    {
        id: "p10_c10",
        chapterTitle: "الفصل العاشر: دراسة حالة: تطبيق SaaS واقعي",
        sections: [
            {
                id: "p10_c10_s1",
                title: "10.1 اسم التطبيق: TaskFlow (أداة إدارة مهام)",
                content: [
                    { type: ContentType.HEADING4, text: "الخطط:" },
                    { type: ContentType.LIST_UNORDERED, items: ["Free: 3 مشاريع، 5 مستخدمين.", "Pro: $9/شهر، 20 مشروعًا، 100 مستخدم.", "Business: $29/شهر، غير محدود، دعم فني."] },
                    { type: ContentType.HEADING4, text: "التكامل:" },
                    { type: ContentType.LIST_UNORDERED, items: ["واجهة React.", "باكند Node.js + PostgreSQL.", "دفع عبر Stripe.", "Webhooks للتحديث التلقائي."] },
                    { type: ContentType.HEADING4, text: "النتائج:" },
                    { type: ContentType.LIST_UNORDERED, items: ["زيادة التحويل بنسبة 25% بعد تحسين صفحة التسعير.", "انخفاض معدل الإلغاء بنسبة 15% بعد إضافة خطة تجريبية."] }
                ]
            }
        ]
    },
    {
        id: "p10_c11",
        chapterTitle: "الفصل الحادي عشر: الأخطاء الشائعة وتجنبها",
        sections: [
            {
                id: "p10_c11_s1",
                content: [
                    { type: ContentType.DEFINITION_LIST, definitionItems: [
                        { term: "تسعير معقد", definition: "تبسيط العروض" },
                        { term: "عدم توضيح الفوائد", definition: "استخدام لغة فوائد بدل الميزات" },
                        { term: "عدم دعم الدفع السنوي", definition: "إضافة خصم سنوي" },
                        { term: "عدم تكامل مع الباكند", definition: "بناء API موثوق" },
                        { term: "عدم وجود تجربة مجانية", definition: "إضافة خطة Freemium" }
                    ]}
                ]
            }
        ]
    },
    {
        id: "p10_c12",
        chapterTitle: "الفصل الثاني عشر: مستقبل صفحات التسعير في SaaS",
        sections: [
            {
                id: "p10_c12_s1",
                content: [
                    { type: ContentType.LIST_UNORDERED, items: [
                        "التسعير الذكي: استخدام الذكاء الاصطناعي لاقتراح الخطة المناسبة.",
                        "الواقع المعزز: عرض خطط تفاعلية.",
                        "الدفع بالعملات الرقمية.",
                        "التكامل مع أدوات التحليل التلقائي."
                    ]}
                ]
            }
        ]
    }
  ]
};
