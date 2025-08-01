import { Part, ContentType } from '../../types';

export const part12Content: Part = {
  id: "p12",
  partTitle: "الباب الثاني عشر: مصادقة كلمات المرور باستخدام حساب المستخدم في جوجل",
  icon: "🔐",
  chapters: [
    {
      id: "p12_c0",
      chapterTitle: "مقدمة",
      sections: [
        {
          id: "p12_c0_s1",
          content: [
            { type: ContentType.PARAGRAPH, text: "في العصر الرقمي الحديث، أصبحت أمانات البيانات والمعلومات الشخصية من أبرز التحديات التي تواجه المستخدمين وشركات التكنولوجيا على حد سواء. مع تزايد عدد الحسابات الرقمية التي يمتلكها الفرد — والتي قد تصل إلى مئات الحسابات عبر منصات مختلفة — أصبح من الصعب إدارة كلمات المرور بشكل آمن وفعال." },
            { type: ContentType.PARAGRAPH, text: "ومن هنا برزت الحاجة إلى حلول بديلة للمصادقة التقليدية (إدخال اسم المستخدم وكلمة المرور)، ومن أبرز هذه الحلول: **مصادقة الدخول باستخدام حسابات اجتماعية أو عبر مزودي خدمة موثوقين مثل Google**." },
            { type: ContentType.PARAGRAPH, text: "تُعرف هذه الطريقة باسم **\"Sign in with Google\"** أو **\"Google Account Authentication\"**، وهي تتيح للمستخدمين تسجيل الدخول إلى تطبيقات ومواقع ويب مختلفة باستخدام حساب Google الخاص بهم، دون الحاجة إلى إنشاء كلمة مرور جديدة أو تذكرها." },
            { type: ContentType.PARAGRAPH, text: "لكن السؤال المهم: هل هذه الطريقة تعتمد فعليًا على \"كلمة المرور\"؟ أم أنها تُحلّل محلها؟ وكيف يتم استخدام حساب Google في عملية المصادقة؟" },
            { type: ContentType.PARAGRAPH, text: "يهدف هذا البحث إلى توضيح **آلية مصادقة المستخدمين باستخدام حساب Google**، مع التركيز على ما إذا كانت هذه العملية تُعد \"مصادقة بكلمة مرور\" أم لا، وكيف يتم دمجها تقنيًا مع الباكند، وما هي البروتوكولات المستخدمة، والاعتبارات الأمنية، وتجارب المستخدم، وأفضل الممارسات." }
          ]
        }
      ]
    },
    {
      id: "p12_c1",
      chapterTitle: "الفصل الأول: مفهوم المصادقة (Authentication) وأنواعها",
      sections: [
        {
          id: "p12_c1_s1",
          title: "1.1 ما هي المصادقة؟",
          content: [
            { type: ContentType.PARAGRAPH, text: "**المصادقة (Authentication)** هي عملية التحقق من هوية المستخدم قبل السماح له بالوصول إلى نظام أو خدمة. تُعد هذه الخطوة الأولى في سلسلة الأمان، وتسبق **التفويض (Authorization)**، الذي يحدد ما يُسمح للمستخدم بالوصول إليه." }
          ]
        },
        {
          id: "p12_c1_s2",
          title: "1.2 أنواع المصادقة",
          content: [
            { type: ContentType.PARAGRAPH, text: "تُصنف طرق المصادقة إلى عدة فئات حسب \"عوامل المصادقة\" (Authentication Factors):" },
            { type: ContentType.DEFINITION_LIST, definitionItems: [
                { term: "1. شيء تعرفه (Something you know)", definition: "معلومة يحفظها المستخدم. أمثلة: كلمة المرور، PIN، سؤال أمان." },
                { term: "2. شيء تمتلكه (Something you have)", definition: "جهاز أو أداة بحوزة المستخدم. أمثلة: هاتف، بطاقة ذكية، مفتاح أمان." },
                { term: "3. شيء أنت عليه (Something you are)", definition: "خاصية حيوية (Biometric). أمثلة: بصمة الإصبع، التعرف على الوجه، القزحية." }
            ]}
          ]
        },
        {
          id: "p12_c1_s3",
          title: "1.3 المصادقة أحادية العامل مقابل متعددة العوامل",
          content: [
            { type: ContentType.LIST_UNORDERED, items: [
                "**أحادية العامل**: تعتمد على عنصر واحد (مثل كلمة المرور فقط).",
                "**متعددة العوامل (MFA)**: تجمع بين عاملين أو أكثر (مثل كلمة مرور + رمز من الهاتف)."
            ]}
          ]
        }
      ]
    },
    {
      id: "p12_c2",
      chapterTitle: "الفصل الثاني: المصادقة التقليدية مقابل المصادقة الاجتماعية",
      sections: [
        {
          id: "p12_c2_s1",
          title: "2.1 المصادقة التقليدية (Username + Password)",
          content: [
            { type: ContentType.PARAGRAPH, text: "في النموذج الكلاسيكي، يُطلب من المستخدم: 1. إنشاء حساب جديد. 2. اختيار اسم مستخدم (أو بريد إلكتروني). 3. تحديد كلمة مرور. 4. التحقق من البريد الإلكتروني. 5. تسجيل الدخول لاحقًا باستخدام نفس البيانات." },
            { type: ContentType.HEADING4, text: "مشاكل المصادقة التقليدية:" },
            { type: ContentType.LIST_UNORDERED, items: [
                "**إرهاق المستخدم**: تعدد الحسابات → تعدد كلمات المرور.",
                "**استخدام كلمات مرور ضعيفة** أو متكررة.",
                "**مخاطر التصيد الاحتيالي (Phishing)**.",
                "**تسريبات كلمات المرور** من قواعد بيانات مخترقة."
            ]}
          ]
        },
        {
          id: "p12_c2_s2",
          title: "2.2 المصادقة الاجتماعية (Social Login)",
          content: [
            { type: ContentType.PARAGRAPH, text: "تُعرف أيضًا باسم **\"Sign in with Google / Facebook / Apple\"**، وتسمح للمستخدم بتسجيل الدخول باستخدام حساب اجتماعي أو عبر مزود هوية موثوق (Identity Provider)." },
            { type: ContentType.HEADING4, text: "مزايا المصادقة الاجتماعية:" },
            { type: ContentType.LIST_UNORDERED, items: [
                "**تقليل عبء إدارة كلمات المرور**.",
                "**تجربة مستخدم أسرع وأبسط**.",
                "**زيادة معدلات التحويل (Conversion Rate)**.",
                "**أمان أعلى** (بما أن مزود الهوية مثل Google يمتلك أنظمة أمان متقدمة)."
            ]},
            { type: ContentType.HEADING4, text: "عيوبها:" },
            { type: ContentType.LIST_UNORDERED, items: [
                "**تجميع البيانات** من قبل الشركات الكبرى.",
                "**الاعتماد على طرف ثالث** (إذا تعطل Google، لا يمكن الدخول).",
                "**قيود على التخصيص**."
            ]}
          ]
        }
      ]
    },
    {
        id: "p12_c3",
        chapterTitle: "الفصل الثالث: هل 'Sign in with Google' يُعد مصادقة بكلمة مرور؟",
        sections: [
            {
                id: "p12_c3_s1",
                title: "3.1 السؤال الجوهري",
                content: [
                    { type: ContentType.PARAGRAPH, text: "هل يمكن اعتبار **تسجيل الدخول باستخدام حساب Google** \"مصادقة بكلمة مرور\"؟" },
                    { type: ContentType.PARAGRAPH, text: "الإجابة: **لا بشكل مباشر، ولكن نعم بشكل غير مباشر**." }
                ]
            },
            {
                id: "p12_c3_s2",
                title: "3.2 التحليل الدقيق",
                content: [
                    { type: ContentType.PARAGRAPH, text: "عند استخدام \"Sign in with Google\"، لا يُطلب من المستخدم إدخال كلمة مرور التطبيق الذي يحاول الدخول إليه، **لكن قد يُطلب منه إدخال كلمة مرور حساب Google نفسه**." },
                    { type: ContentType.HEADING4, text: "السيناريوهات المختلفة:" },
                    { type: ContentType.DEFINITION_LIST, definitionItems: [
                        { term: "1. المستخدم مسجل دخول بالفعل على Google", definition: "❌ لا. يتم التحقق تلقائيًا عبر الجلسة الحالية (Session)." },
                        { term: "2. المستخدم لم يسجل دخول بعد", definition: "✅ نعم. يُطلب منه إدخال بريد Google وكلمة المرور." },
                        { term: "3. تم تفعيل التحقق بخطوتين (2FA)", definition: "✅ نعم + ✅ عامل آخر. كلمة مرور + رمز من الهاتف أو المصادق." },
                        { term: "4. استخدام مفتاح أمان (Security Key)", definition: "❌ لا. يُستخدم العامل الحيوي أو المادي بدلًا من كلمة المرور." }
                    ]}
                ]
            },
            {
                id: "p12_c3_s3",
                title: "3.3 الاستنتاج",
                content: [
                    { type: ContentType.LIST_UNORDERED, items: [
                        "**عملية \"Sign in with Google\" لا تعتمد على كلمة مرور التطبيق**، بل على **هوية المستخدم في نظام Google**.",
                        "**لكن الوصول إلى حساب Google قد يتطلب كلمة مرور**، لذلك فهي **مرتبطة بكلمة مرور، لكن بشكل غير مباشر**.",
                        "إذًا، **الكلمة المرور تُستخدم في مزود الهوية (Google)، وليس في التطبيق المحلي**."
                    ]}
                ]
            }
        ]
    },
    {
        id: "p12_c4",
        chapterTitle: "الفصل الرابع: بروتوكولات المصادقة المستخدمة مع Google",
        sections: [
            {
                id: "p12_c4_s1",
                title: "4.1 OAuth 2.0: بروتوكول التفويض (Not Authentication!)",
                content: [
                    { type: ContentType.HEADING4, text: "ما هو OAuth 2.0؟" },
                    { type: ContentType.PARAGRAPH, text: "OAuth 2.0 هو بروتوكول **تفويض (Authorization)**، وليس مصادقة. يُستخدم للسماح لتطبيقات طرف ثالث بالوصول إلى موارد المستخدم (مثل جهات الاتصال، البريد، التقويم) دون معرفة كلمة المرور." },
                    { type: ContentType.HEADING4, text: "كيف يعمل؟" },
                    { type: ContentType.LIST_UNORDERED, items: ["1. التطبيق يطلب إذنًا من المستخدم للوصول إلى بيانات من Google.", "2. يتم توجيه المستخدم إلى صفحة Google.", "3. يُدخل المستخدم بيانات الدخول (كلمة المرور إن لزم).", "4. Google يُصدر **رمز تفويض (Authorization Code)**.", "5. التطبيق يستخدم الرمز للحصول على **رمز وصول (Access Token)**.", "6. يستخدم الـ Token للوصول إلى واجهة برمجة التطبيقات (API)."] },
                    { type: ContentType.NOTE, title: "تحذير ⚠️", text: "OAuth 2.0 لا يُستخدم وحده للمصادقة، بل للوصول إلى الموارد." }
                ]
            },
            {
                id: "p12_c4_s2",
                title: "4.2 OpenID Connect (OIDC): بروتوكول المصادقة فوق OAuth 2.0",
                content: [
                    { type: ContentType.HEADING4, text: "ما هو OpenID Connect؟" },
                    { type: ContentType.PARAGRAPH, text: "هو **طبقة تُبنى فوق OAuth 2.0** وتُستخدم خصيصًا **للمصادقة (Authentication)**. يُضيف OIDC: **رمز المعرف (ID Token)**: JWT يحتوي على معلومات عن المستخدم (مثل البريد، الاسم، الصورة). **نهاية جلسة (Logout Endpoint)**. **تحقق من هوية المستخدم**." },
                    { type: ContentType.HEADING4, text: "كيف يعمل؟" },
                    { type: ContentType.LIST_UNORDERED, items: ["1. التطبيق يطلب 'تسجيل الدخول باستخدام Google'.", "2. يتم توجيه المستخدم إلى Google.", "3. يُصادق Google على هوية المستخدم (باستخدام كلمة المرور أو 2FA).", "4. Google يُصدر: **Access Token** (للوصول إلى API) و **ID Token** (للمصادقة – يحتوي بيانات المستخدم).", "5. التطبيق يستخدم **ID Token** للتحقق من هوية المستخدم وتسجيله داخليًا."] },
                    { type: ContentType.HEADING4, text: "الفرق بين OAuth 2.0 و OpenID Connect:" },
                    { type: ContentType.DEFINITION_LIST, definitionItems: [
                        { term: "OAuth 2.0", definition: "الغرض: تفويض الوصول. ID Token: ❌ لا. بيانات المستخدم: تحتاج استدعاء API. مناسب لـ: الوصول إلى الموارد." },
                        { term: "OpenID Connect", definition: "الغرض: مصادقة الهوية. ID Token: ✅ نعم (JWT). بيانات المستخدم: متضمنة في ID Token. مناسب لـ: تسجيل الدخول." }
                    ]}
                ]
            }
        ]
    },
    {
        id: "p12_c5",
        chapterTitle: "الفصل الخامس: كيف يعمل 'Sign in with Google' خطوة بخطوة؟",
        sections: [
            {
                id: "p12_c5_s1",
                title: "5.1 التدفق التفاعلي (Flow)",
                content: [
                    { type: ContentType.HEADING4, text: "1. الضغط على زر 'Sign in with Google'" },
                    { type: ContentType.CODE_BLOCK, language: "html", code: `<button id="google-signin">Sign in with Google</button>` },
                    { type: ContentType.HEADING4, text: "2. تحميل Google Identity Services" },
                    { type: ContentType.CODE_BLOCK, language: "html", code: `<script src="https://accounts.google.com/gsi/client" async defer></script>` },
                    { type: ContentType.HEADING4, text: "3. تهيئة الزر" },
                    { type: ContentType.CODE_BLOCK, language: "javascript", code: `google.accounts.id.initialize({
  client_id: 'YOUR_GOOGLE_CLIENT_ID',
  callback: handleCredentialResponse
});

google.accounts.id.renderButton(
  document.getElementById("google-signin"),
  { theme: "outline", size: "large" }
);` },
                    { type: ContentType.HEADING4, text: "4. استقبال الرد (Callback)" },
                    { type: ContentType.CODE_BLOCK, language: "javascript", code: `function handleCredentialResponse(response) {
  // response.credential هو ID Token (JWT)
  const idToken = response.credential;

  // إرساله إلى الباكند للتحقق
  fetch('/api/auth/google', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: idToken })
  });
}` },
                    { type: ContentType.HEADING4, text: "5. التحقق من ID Token في الباكند" },
                    { type: ContentType.CODE_BLOCK, language: "javascript", code: `// Node.js + Google Auth Library
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('YOUR_CLIENT_ID');

async function verifyGoogleToken(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: 'YOUR_CLIENT_ID',
    });
    const payload = ticket.getPayload();
    return {
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      googleId: payload.sub
    };
  } catch (error) {
    throw new Error('Invalid token');
  }
}` },
                    { type: ContentType.HEADING4, text: "6. إنشاء جلسة للمستخدم في التطبيق" },
                    { type: ContentType.PARAGRAPH, text: "البحث في قاعدة البيانات عن مستخدم ببريد Google. إذا وُجد: تسجيل دخول. إذا لم يُوجد: إنشاء حساب تلقائي (Login with Google = تسجيل + دخول)." }
                ]
            }
        ]
    },
    {
        id: "p12_c6",
        chapterTitle: "الفصل السادس: دمج Google Authentication مع الباكند",
        sections: [
            { id: "p12_c6_s1", title: "6.1 المتطلبات الأساسية", content: [
                { type: ContentType.LIST_UNORDERED, items: [
                    "1. حساب مطور على Google Cloud Console.", "2. إنشاء مشروع.", "3. تفعيل Google Identity Platform.", "4. إنشاء 'OAuth 2.0 Client ID' (نوع: Web Application).", "5. إضافة نطاقات (Origins) مسموحة (مثل: `http://localhost:3000`, `https://yoursite.com`)."
                ]}
            ]},
            { id: "p12_c6_s2", title: "6.2 هيكل قاعدة البيانات", content: [
                { type: ContentType.HEADING4, text: "جدول `users`" },
                { type: ContentType.PREFORMATTED_TEXT, text: `| الحقل | النوع | الوصف |
|------|------|------|
| id | INT (PK) | معرف المستخدم |
| email | VARCHAR | بريد Google (فريد) |
| name | VARCHAR | الاسم الكامل |
| google_id | VARCHAR | معرف Google (sub من JWT) |
| picture | TEXT | رابط الصورة |
| created_at | DATETIME | تاريخ الإنشاء |
| last_login | DATETIME | آخر دخول |`},
                { type: ContentType.NOTE, title: "⚠️", text: "لا يوجد حقل `password` لأن المستخدم لا يُنشئ كلمة مرور."}
            ]},
            { id: "p12_c6_s3", title: "6.3 إدارة الجلسات (Sessions)", content: [
                { type: ContentType.PARAGRAPH, text: "بعد التحقق من ID Token:" },
                { type: ContentType.CODE_BLOCK, language: "javascript", code: `req.session.userId = user.id;
req.session.authProvider = 'google';
res.redirect('/dashboard');` }
            ]},
            { id: "p12_c6_s4", title: "6.4 التحقق من الهوية في كل طلب لاحق", content: [
                { type: ContentType.CODE_BLOCK, language: "javascript", code: `function requireAuth(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/login');
  }
}` }
            ]}
        ]
    },
    {
        id: "p12_c7",
        chapterTitle: "الفصل السابع: الأمان في مصادقة Google",
        sections: [
            { id: "p12_c7_s1", title: "7.1 فوائد الأمان", content: [
                { type: ContentType.LIST_UNORDERED, items: ["لا يتم تخزين كلمات مرور في التطبيق.", "لا يمكن للتطبيق رؤية كلمة مرور Google.", "Google يُطبّق التحقق بخطوتين (2FA) تلقائيًا.", "حماية من التصيد (Phishing): لأن الصفحة تظهر على نطاق Google.", "إعادة تعيين كلمات المرور مركزيًا."] }
            ]},
            { id: "p12_c7_s2", title: "7.2 التهديدات المحتملة", content: [
                { type: ContentType.DEFINITION_LIST, definitionItems: [
                    { term: "انتحال الهوية (Impersonation)", definition: "هجوم يحاول تقليد ID Token. الوقاية: التحقق من التوقيع باستخدام Google Public Keys." },
                    { term: "replay attack", definition: "إعادة إرسال الـ Token. الوقاية: التحقق من `exp` (انتهاء الصلاحية) و `nonce`." },
                    { term: "اختراق حساب Google", definition: "إذا تم اختراق حساب Google، يتم اختراق كل التطبيقات. الوقاية: تشجيع المستخدمين على تفعيل 2FA." },
                    { term: "Clickjacking", definition: "زر Google مخفي تحت زر آخر. الوقاية: استخدام `data-allowed-origins` وتصفية النطاقات." }
                ]}
            ]},
            { id: "p12_c7_s3", title: "7.3 أفضل ممارسات الأمان", content: [
                { type: ContentType.LIST_UNORDERED, items: ["✅ التحقق من ID Token على الباكند فقط (لا تعتمد على الـ Frontend).", "✅ التحقق من audience (aud): يجب أن يكون مطابقًا لـ Client ID.", "✅ التحقق من issuer (iss): يجب أن يكون `https://accounts.google.com` أو `https://www.googleapis.com/auth/userinfo.email`.", "✅ استخدام HTTPS فقط.", "✅ تدمير الجلسة عند تسجيل الخروج."] }
            ]}
        ]
    },
    {
        id: "p12_c8",
        chapterTitle: "الفصل الثامن: تجربة المستخدم (UX) في 'Sign in with Google'",
        sections: [
            { id: "p12_c8_s1", title: "8.1 مزايا تجربة المستخدم", content: [
                { type: ContentType.LIST_UNORDERED, items: ["سرعة التسجيل: لا حاجة لملء نموذج.", "تقليل الانسحاب (Drop-off): 50% من المستخدمين يتركون التسجيل عند طلب كلمة مرور.", "ثقة أعلى: شعار Google يُشعر المستخدم بالأمان.", "دعم متعدد الأجهزة: إذا سجل دخول على الهاتف، يمكنه الدخول بسهولة على الكمبيوتر."] }
            ]},
            { id: "p12_c8_s2", title: "8.2 تصميم الزر وفق إرشادات Google", content: [
                { type: ContentType.LIST_UNORDERED, items: ["استخدام الزر الرسمي: لا تُعدّل الشكل.", "لا تستخدم نصوص مضللة مثل 'Login with Gmail'.", "اعرض الزر بجانب خيارات أخرى (مثل البريد الإلكتروني).", "ضع الزر في مكان بارز."] }
            ]},
            { id: "p12_c8_s3", title: "8.3 التخصيص بعد الدخول", content: [
                { type: ContentType.LIST_UNORDERED, items: ["استيراد الصورة والاسم تلقائيًا.", "إكمال الملف الشخصي لاحقًا (مثل اختيار اسم مستخدم).", "عدم طلب إذونات غير ضرورية."] }
            ]}
        ]
    },
    {
        id: "p12_c9",
        chapterTitle: "الفصل التاسع: المقارنة مع طرق المصادقة الأخرى",
        sections: [
            {
                id: "p12_c9_s1",
                content: [
                    { type: ContentType.DEFINITION_LIST, definitionItems: [
                        { term: "Sign in with Google", definition: "المزايا: سهل، آمن، لا يحتاج كلمة مرور. العيوب: يعتمد على Google، لا يناسب الجميع." },
                        { term: "كلمة مرور تقليدية", definition: "المزايا: كامل التحكم. العيوب: ضعيفة، يصعب تذكرها." },
                        { term: "التحقق بخطوتين (2FA)", definition: "المزايا: آمن جدًا. العيوب: معقد قليلاً." },
                        { term: "مصادقة بدون كلمة مرور (Passwordless)", definition: "المزايا: لا توجد كلمات مرور. العيوب: تعتمد على البريد أو الهاتف." },
                        { term: "Apple Sign In", definition: "المزايا: خصوصية عالية. العيوب: محدود بالأجهزة." },
                        { term: "Facebook Login", definition: "المزايا: انتشار واسع. العيوب: مخاوف خصوصية." }
                    ]}
                ]
            }
        ]
    },
    {
        id: "p12_c10",
        chapterTitle: "الفصل العاشر: دراسات حالة واقعية",
        sections: [
            { id: "p12_c10_s1", title: "10.1 Airbnb", content: [{ type: ContentType.LIST_UNORDERED, items: ["يسمح بالتسجيل عبر Google.", "يُستخدم OpenID Connect.", "يُقلل من معدل الإحباط في التسجيل.", "يُكمل الملف الشخصي لاحقًا."] }] },
            { id: "p12_c10_s2", title: "10.2 Notion", content: [{ type: ContentType.LIST_UNORDERED, items: ["يُقدم 'Sign in with Google' كخيار أول.", "لا يُطلب كلمة مرور.", "يُستخدم ID Token للتحقق.", "يُمكن تغيير البريد لاحقًا."] }] },
            { id: "p12_c10_s3", title: "10.3 Duolingo", content: [{ type: ContentType.LIST_UNORDERED, items: ["يُستخدم Google Authentication.", "يُمكن ربط حسابات متعددة.", "يُعالج حالات 'الحساب موجود بالفعل'."] }] }
        ]
    },
    {
        id: "p12_c11",
        chapterTitle: "الفصل الحادي عشر: الأخطاء الشائعة وتجنبها",
        sections: [
            {
                id: "p12_c11_s1",
                content: [
                    { type: ContentType.DEFINITION_LIST, definitionItems: [
                        { term: "التحقق من ID Token في الـ Frontend فقط", definition: "دائمًا تحقق في الباكند." },
                        { term: "عدم التحقق من audience", definition: "تأكد من مطابقة Client ID." },
                        { term: "استخدام OAuth 2.0 بدون OpenID Connect", definition: "استخدم OIDC للحصول على ID Token." },
                        { term: "السماح بتسجيل دخول بدون تحقق", definition: "تحقق من صحة التوقيع." },
                        { term: "عدم معالجة حالة 'البريد مستخدم مسبقًا'", definition: "اعرض رسالة واضحة: 'هذا البريد مرتبط بحساب آخر'." }
                    ]}
                ]
            }
        ]
    },
    {
        id: "p12_c12",
        chapterTitle: "الفصل الثاني عشر: مستقبل المصادقة بدون كلمات المرور",
        sections: [
            {
                id: "p12_c12_s1",
                title: "12.1 مفهوم 'Passwordless Authentication'",
                content: [
                    { type: ContentType.PARAGRAPH, text: "هي عملية تسجيل دخول **بدون استخدام كلمات المرور نهائيًا**، وتتضمن: مصادقة عبر البريد الإلكتروني (Magic Link). مصادقة عبر الرسائل النصية (OTP). مصادقة حيوية (Biometrics). مفاتيح أمان (Security Keys) مثل YubiKey. Passkeys (تقنية جديدة من Apple, Google, Microsoft)." }
                ]
            },
            {
                id: "p12_c12_s2",
                title: "12.2 Passkeys: بديل ذكي لكلمة المرور",
                content: [
                    { type: ContentType.LIST_UNORDERED, items: ["تُخزن على الجهاز (مثل الهاتف).", "تُستخدم عبر التعرف على الوجه أو البصمة.", "لا يمكن سرقتها أو تسريبها.", "تُدعم من Google Password Manager و iCloud Keychain."] }
                ]
            },
            {
                id: "p12_c12_s3",
                title: "12.3 علاقة Passkeys بـ Google",
                content: [
                    { type: ContentType.LIST_UNORDERED, items: ["Google تدعم Passkeys على أجهزة Android.", "يمكن استخدامها كـ 'Sign in with Google' بدون كلمة مرور.", "تُستخدم نفس البنية التحتية (FIDO2، WebAuthn)."] }
                ]
            }
        ]
    },
    {
      id: "p12_c13",
      chapterTitle: "الفصل الثالث عشر: دمج Google Authentication مع أنظمة إدارة الهوية (IAM)",
      sections: [
          { id: "p12_c13_s1", title: "13.1 Single Sign-On (SSO)", content: [
              { type: ContentType.PARAGRAPH, text: "في الشركات، تُستخدم أنظمة مثل: Google Workspace (G Suite), Azure AD, Okta, Auth0." },
              { type: ContentType.LIST_UNORDERED, items: ["الموظف يسجل دخول مرة واحدة عبر حساب Google.", "يمكنه الدخول إلى جميع التطبيقات الداخلية.", "لا حاجة لكلمات مرور متعددة."] }
          ]},
          { id: "p12_c13_s2", title: "13.2 SAML vs OIDC", content: [
              { type: ContentType.DEFINITION_LIST, definitionItems: [
                  { term: "SAML", definition: "الأساس: XML. السرعة: أبطأ. الاستخدام: المؤسسات. الدعم: واسع." },
                  { term: "OpenID Connect", definition: "الأساس: JSON / JWT. السرعة: أسرع. الاستخدام: التطبيقات الحديثة. الدعم: متزايد." }
              ]}
          ]}
      ]
    },
    {
      id: "p12_c14",
      chapterTitle: "الفصل الرابع عشر: التحليل القانوني والامتثال",
      sections: [
          { id: "p12_c14_s1", title: "14.1 GDPR (الاتحاد الأوروبي)", content: [
              { type: ContentType.LIST_UNORDERED, items: ["يجب الحصول على موافقة المستخدم قبل جمع بياناته من Google.", "يجب توضيح 'ما الذي سنفعله ببياناتك؟'.", "حق المستخدم في حذف الحساب."] }
          ]},
          { id: "p12_c14_s2", title: "14.2 CCPA (كاليفورنيا)", content: [
              { type: ContentType.LIST_UNORDERED, items: ["حق المستخدم في معرفة ما يتم جمعه.", "حق في رفض بيع البيانات."] }
          ]},
          { id: "p12_c14_s3", title: "14.3 سياسة الخصوصية المطلوبة", content: [
              { type: ContentType.PARAGRAPH, text: "يجب أن توضح:" },
              { type: ContentType.LIST_UNORDERED, items: ["أن الدخول عبر Google لا يعطي التطبيق كلمة المرور.", "أن البيانات تُستخدم فقط للتسجيل.", "كيفية حذف الحساب."] }
          ]}
      ]
    },
    {
      id: "p12_c15",
      chapterTitle: "الفصل الخامس عشر: تطوير واجهة الأمام (Frontend) لمصادقة Google",
      sections: [
          {
              id: "p12_c15_s1",
              title: "15.1 استخدام Google Identity Services (GSI)",
              content: [
                  { type: ContentType.PARAGRAPH, text: "هي الأداة الرسمية الجديدة من Google (استبدال Google+ Sign-In)." },
                  { type: ContentType.HEADING4, text: "الميزات:"},
                  { type: ContentType.LIST_UNORDERED, items: ["دعم Passkeys.", "واجهة بسيطة.", "حماية من التصيد."] }
              ]
          },
          {
              id: "p12_c15_s2",
              title: "15.2 مثال كامل (React + Google GSI)",
              content: [
                  { type: ContentType.CODE_BLOCK, language: "jsx", code: `import { useEffect } from 'react';

function GoogleSignIn() {
  useEffect(() => {
    window.onload = function () {
      google.accounts.id.initialize({
        client_id: 'YOUR_CLIENT_ID',
        callback: async (response) => {
          const res = await fetch('/api/auth/google', {
            method: 'POST',
            body: JSON.stringify({ token: response.credential }),
          });
          const data = await res.json();
          if (data.success) window.location.href = '/dashboard';
        },
      });
      google.accounts.id.renderButton(
        document.getElementById('google-btn'),
        { theme: 'outline', size: 'large' }
      );
    };
  }, []);

  return <div id="google-btn"></div>;
}` }
              ]
          }
      ]
    },
    {
      id: "p12_c16",
      chapterTitle: "الفصل السادس عشر: تطوير الباكند (Node.js + Express)",
      sections: [
          { id: "p12_c16_s1", title: "16.1 التثبيت", content: [{ type: ContentType.CODE_BLOCK, language: "bash", code: `npm install google-auth-library express express-session` }] },
          {
              id: "p12_c16_s2",
              title: "16.2 التحقق من ID Token",
              content: [{ type: ContentType.CODE_BLOCK, language: "javascript", code: `const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('YOUR_CLIENT_ID');

app.post('/api/auth/google', async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: 'YOUR_CLIENT_ID',
    });
    const payload = ticket.getPayload();
    
    // البحث أو إنشاء المستخدم
    let user = await User.findOne({ email: payload.email });
    if (!user) {
      user = await User.create({
        email: payload.email,
        name: payload.name,
        google_id: payload.sub,
        picture: payload.picture,
      });
    }

    req.session.userId = user.id;
    res.json({ success: true, user: user.name });
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
});` }]
          }
      ]
    },
    {
      id: "p12_c17",
      chapterTitle: "الفصل السابع عشر: اختبار وتصحيح الأخطاء",
      sections: [
          { id: "p12_c17_s1", title: "17.1 أدوات الاختبار", content: [{ type: ContentType.LIST_UNORDERED, items: ["Postman: لاختبار API.", "Chrome DevTools: لفحص الـ JWT.", "jwt.io: لفك تشفير ID Token."] }] },
          { id: "p12_c17_s2", title: "17.2 أخطاء شائعة", content: [{ type: ContentType.LIST_UNORDERED, items: ["`invalid_audience`: audience لا يطابق Client ID.", "`invalid_token`: توقيع غير صحيح.", "`login_required`: لم يسجل دخول على Google."] }] }
      ]
    },
    {
      id: "p12_c18",
      chapterTitle: "الفصل الثامن عشر: الأداء والتوسع",
      sections: [
          { id: "p12_c18_s1", title: "18.1 التخزين المؤقت (Caching)", content: [{ type: ContentType.LIST_UNORDERED, items: ["تخزين مفاتيح التوقيع من Google.", "تقليل عدد الطلبات الخارجية."] }] },
          { id: "p12_c18_s2", title: "18.2 التوسع الأفقي", content: [{ type: ContentType.LIST_UNORDERED, items: ["استخدام Load Balancer.", "جلسات مخزنة في Redis."] }] }
      ]
    },
    {
      id: "p12_c19",
      chapterTitle: "الفصل التاسع عشر: الخصوصية والبيانات",
      sections: [
          { id: "p12_c19_s1", content: [{ type: ContentType.LIST_UNORDERED, items: ["لا يُمكن للتطبيق رؤية كلمة مرور Google.", "لا يُمكن الوصول إلى بريد المستخدم بدون إذن.", "يمكن للمستخدم إلغاء الوصول من myaccount.google.com."] }] }
      ]
    },
    {
      id: "p12_c20",
      chapterTitle: "الفصل العشرون: الخاتمة",
      sections: [
          {
              id: "p12_c20_s1",
              content: [
                  { type: ContentType.PARAGRAPH, text: "مصادقة المستخدم باستخدام حساب Google **ليست مصادقة بكلمة مرور في التطبيق المحلي**، لكنها **قد تعتمد على كلمة مرور في حساب Google نفسه**. إذًا، هي **مصادقة غير مباشرة بكلمة مرور**، ولكنها تُحسّن الأمان وتجربة المستخدم بشكل كبير." },
                  { type: ContentType.PARAGRAPH, text: "تُعد تقنية **OpenID Connect** هي الأساس في هذه العملية، وتُستخدم لإصدار **ID Token** يُثبت هوية المستخدم. ويتم التحقق من هذا الـ Token في الباكند، ثم إنشاء جلسة محلية." },
                  { type: ContentType.HEADING4, text: "المزايا:"},
                  { type: ContentType.LIST_UNORDERED, items: ["تقليل تسريبات كلمات المرور.", "تسريع عملية التسجيل.", "تحسين الأمان عبر 2FA من Google."]},
                  { type: ContentType.HEADING4, text: "التحديات:"},
                  { type: ContentType.LIST_UNORDERED, items: ["الاعتماد على طرف ثالث.", "مخاوف الخصوصية.", "الحاجة إلى بنية تقنية صحيحة."]},
                  { type: ContentType.PARAGRAPH, text: "في المستقبل، مع تطور تقنيات مثل **Passkeys**، قد تختفي كلمة المرور تمامًا، وتُصبح المصادقة عبر Google أو Apple أكثر أمانًا وسهولة." }
              ]
          }
      ]
    }
  ]
};
