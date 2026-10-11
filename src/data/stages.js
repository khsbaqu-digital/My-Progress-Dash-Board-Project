export const stages = [
  {
    id: "strategy",
    number: "01",
    icon: "🚀",
    title: {
      en: "Project Strategy & Emerging Technologies",
      ar: "استراتيجية المشروع والتقنيات الناشئة"
    },
    description: {
      en: "Clarify the problem, users, MVP scope and the role of emerging technologies.",
      ar: "توضيح المشكلة والمستخدمين ونطاق الـMVP ودور التقنيات الناشئة."
    },
    tasks: [
      {
        id: "problem",
        en: "Define the environmental problem",
        ar: "تحديد المشكلة البيئية",
        criteria: {
          en: "Clear definition of desertification/green cover challenges with affected target segments.",
          ar: "تحديد دقيق لمشكلة الغطاء النباتي أو التصحر وتأثيرها على البيئة والمجتمع."
        },
        priority: "high",
        plannedHours: 1.5
      },
      {
        id: "solution",
        en: "Define the digital solution",
        ar: "تحديد الحل الرقمي",
        criteria: {
          en: "Value proposition of Sedra Green Action Hub documented clearly.",
          ar: "توثيق القيمة المضافة لمنصة سدرة وكيف تربط المبادرات بالداعمين."
        },
        priority: "high",
        plannedHours: 1.5
      },
      {
        id: "users",
        en: "Define target users and stakeholders",
        ar: "تحديد المستخدمين وأصحاب المصلحة",
        criteria: {
          en: "User personas identified: volunteers, environmental experts, donors, initiative owners.",
          ar: "تحديد الشرائح المستهدفة بدقة: متطوعون، خبراء بيئيون، مانحون، أصحاب مبادرات."
        },
        priority: "medium",
        plannedHours: 1
      },
      {
        id: "mvp",
        en: "Define the MVP scope",
        ar: "تحديد نطاق الـMVP",
        criteria: {
          en: "Must-have features list prioritized; out-of-scope features documented.",
          ar: "قائمة الميزات الأساسية الضرورية للإطلاق الأول مع استبعاد ما يمكن تأجيله."
        },
        priority: "high",
        plannedHours: 2
      },
      {
        id: "emerging",
        en: "Identify relevant emerging technologies",
        ar: "تحديد التقنيات الناشئة ذات الصلة",
        criteria: {
          en: "Identify where AI, IoT or spatial green mapping add real value.",
          ar: "تحديد مجالات الاستفادة من الذكاء الاصطناعي وإنترنت الأشياء والخرائط الرقمية."
        },
        priority: "medium",
        plannedHours: 1
      },
      {
        id: "genai",
        en: "Define the role of Generative AI",
        ar: "تحديد دور الذكاء الاصطناعي التوليدي",
        criteria: {
          en: "Plan how GenAI accelerates coding, content generation and recommendations.",
          ar: "تحديد دور الذكاء الاصطناعي التوليدي في سرعة بناء الكود وتوليد المحتوى والتوصيات."
        },
        priority: "medium",
        plannedHours: 1
      },
      {
        id: "future-ai",
        en: "Identify future AI opportunities",
        ar: "تحديد فرص الذكاء الاصطناعي المستقبلية",
        criteria: {
          en: "Brainstorm advanced AI models for environmental impact analysis.",
          ar: "اقتراح أفكار مستقبلية لنماذج ذكية لتحليل الأثر البيئي وتوقع الاحتياجات."
        },
        priority: "low",
        plannedHours: 1
      }
    ]
  },

  {
    id: "design",
    number: "02",
    icon: "🎨",
    title: {
      en: "Vibe Design — UI/UX",
      ar: "Vibe Design — تصميم UI/UX"
    },
    description: {
      en: "Design the interface and user experience of Sedra Green Action Hub.",
      ar: "تصميم واجهة وتجربة المستخدم لمنصة Sedra Green Action Hub."
    },
    tasks: [
      {
        id: "home",
        en: "Design Home Page",
        ar: "تصميم الصفحة الرئيسية",
        criteria: {
          en: "Hero section, call-to-action, key stats, and vision aligned with Sedra aesthetics.",
          ar: "تصميم واجهة رئيسية جذابة تحتوي على رسالة واضحة، أرقام بارزة، ودعوة للعمل."
        },
        priority: "high",
        plannedHours: 2
      },
      {
        id: "dashboard",
        en: "Design Dashboard",
        ar: "تصميم لوحة التحكم",
        criteria: {
          en: "Overview metrics, active challenges, and user participation cards.",
          ar: "تصميم لوحة مؤشرات تعرض التحديات النشطة والمبادرات والإنجازات."
        },
        priority: "high",
        plannedHours: 2
      },
      {
        id: "challenges",
        en: "Design Challenges",
        ar: "تصميم قسم التحديات",
        criteria: {
          en: "Card grid with status tags, difficulty levels, and urgency badges.",
          ar: "تصميم بطاقات التحديات البيئية مع مرشحات التصنيف ودرجة الأهمية."
        },
        priority: "medium",
        plannedHours: 1.5
      },
      {
        id: "initiatives",
        en: "Design Initiatives",
        ar: "تصميم قسم المبادرات",
        criteria: {
          en: "List/grid layout highlighting green actions, goals, and funding/volunteer needs.",
          ar: "تصميم عروض المبادرات الخضراء توضح الأهداف وعدد المتطوعين ومستوى الدعم."
        },
        priority: "medium",
        plannedHours: 1.5
      },
      {
        id: "network",
        en: "Design Networking / Connect",
        ar: "تصميم قسم التواصل والشبكات",
        criteria: {
          en: "Directory for experts, organizations, and volunteers to connect.",
          ar: "واجهة تواصل وشبكة مهنية تربط بين المهتمين والخبراء والجهات الداعمة."
        },
        priority: "medium",
        plannedHours: 1.5
      },
      {
        id: "mobile",
        en: "Check mobile-first responsive design",
        ar: "التأكد من التصميم المتجاوب Mobile-first",
        criteria: {
          en: "All pages adapt smoothly on small screens with clean touch navigation.",
          ar: "تناسق كافة الواجهات على شاشات الهواتف مع قوائم سهلة باللمس."
        },
        priority: "high",
        plannedHours: 1.5
      },
      {
        id: "sedra-brand",
        en: "Apply Sedra visual identity",
        ar: "تطبيق الهوية البصرية لسدرة",
        criteria: {
          en: "Sedra palette (#6F4E7C, #8DAA91, #F8F5F1, etc.) consistently applied.",
          ar: "تطبيق متناسق لألوان وهوية سدرة مع خطوط عربية وأيقونات ملائمة."
        },
        priority: "high",
        plannedHours: 1
      }
    ]
  },

  {
    id: "interactive",
    number: "03",
    icon: "⚡",
    title: {
      en: "Interactive Web Development",
      ar: "تطوير الويب التفاعلي"
    },
    description: {
      en: "Build interactive functionality using HTML, CSS/Tailwind and JavaScript.",
      ar: "بناء الوظائف التفاعلية باستخدام HTML وCSS/Tailwind وJavaScript."
    },
    tasks: [
      {
        id: "html",
        en: "Build HTML structure",
        ar: "بناء هيكل HTML",
        criteria: {
          en: "Semantic HTML5 tags throughout with accessible heading hierarchies.",
          ar: "بناء صفحات بهيكل دلالي سليم متوافق مع معايير الويب."
        },
        priority: "high",
        plannedHours: 2
      },
      {
        id: "tailwind",
        en: "Apply Tailwind CSS",
        ar: "تطبيق Tailwind CSS",
        criteria: {
          en: "Modern, clean Tailwind styling with utility classes and cohesive spacing.",
          ar: "تنسيق متقدم باستخدام Tailwind CSS يضمن مرونة التصميم وتوحيد المسافات."
        },
        priority: "high",
        plannedHours: 2
      },
      {
        id: "javascript",
        en: "Add JavaScript interactions",
        ar: "إضافة التفاعلات باستخدام JavaScript",
        criteria: {
          en: "Dynamic element toggles, modals, and event listeners functioning without errors.",
          ar: "إضافة أحداث النقر والقوائم المنبثقة والتفاعل اللحظي دون أخطاء."
        },
        priority: "high",
        plannedHours: 2
      },
      {
        id: "search-filter",
        en: "Implement search / filtering",
        ar: "تطبيق البحث والتصفية",
        criteria: {
          en: "Real-time filtering for challenges and initiatives by category or keyword.",
          ar: "بحث لحظي وتصفية سريعة للتحديات والمبادرات حسب التصنيف والاسم."
        },
        priority: "medium",
        plannedHours: 2
      },
      {
        id: "forms",
        en: "Implement interactive forms",
        ar: "تطبيق النماذج التفاعلية",
        criteria: {
          en: "Registration / submission forms with field validations and user feedback.",
          ar: "نماذج تسجيل وانضمام تفاعلية مع التحقق من صحة المدخلات ورسائل تأكيد."
        },
        priority: "medium",
        plannedHours: 1.5
      },
      {
        id: "arabic",
        en: "Implement Arabic / English",
        ar: "تطبيق العربية والإنجليزية",
        criteria: {
          en: "Bi-directional layout switching (dir='rtl' & dir='ltr') with natural translations.",
          ar: "تبديل سلس بين العربية والإنجليزية مع ضبط اتجاه النصوص والقوائم."
        },
        priority: "high",
        plannedHours: 1.5
      }
    ]
  },

  {
    id: "ai",
    number: "04",
    icon: "🤖",
    title: {
      en: "AI-Assisted Development",
      ar: "التطوير بمساعدة الذكاء الاصطناعي"
    },
    description: {
      en: "Use AI as a practical development assistant while understanding and reviewing the generated work.",
      ar: "استخدام الذكاء الاصطناعي كمساعد عملي في التطوير مع فهم ومراجعة ما يتم إنشاؤه."
    },
    tasks: [
      {
        id: "ai-prompts",
        en: "Write effective development prompts",
        ar: "كتابة Prompts فعالة للتطوير",
        criteria: {
          en: "Structured prompts specifying role, context, constraints, and output format.",
          ar: "صياغة أوامر برمجية دقيقة تحدد السياق، القيود، والشكل المطلوب."
        },
        priority: "medium",
        plannedHours: 1
      },
      {
        id: "ai-code",
        en: "Generate / improve code with AI",
        ar: "إنشاء وتحسين الكود باستخدام AI",
        criteria: {
          en: "AI generation of functional components and refactoring for cleaner code.",
          ar: "استخدام أدوات الذكاء الاصطناعي لإنتاج وتحسين دوال ومكونات المشروع."
        },
        priority: "high",
        plannedHours: 1.5
      },
      {
        id: "debug",
        en: "Use AI to diagnose errors",
        ar: "استخدام AI لتشخيص الأخطاء",
        criteria: {
          en: "Feeding console errors into AI to identify root causes and fixes.",
          ar: "تحليل الأخطاء ورسائل Console باستخدام AI للوصول للحل الجذري."
        },
        priority: "medium",
        plannedHours: 1
      },
      {
        id: "review",
        en: "Review and understand generated code",
        ar: "مراجعة وفهم الكود الناتج",
        criteria: {
          en: "Full personal understanding of every line written before adding to project.",
          ar: "الفهم التام لكل سطر كود يتم قبوله وشرح طريقة عمله قبل دمجه."
        },
        priority: "high",
        plannedHours: 1.5
      },
      {
        id: "refine",
        en: "Use AI for UI / UX refinement",
        ar: "استخدام AI لتحسين UI/UX",
        criteria: {
          en: "AI recommendations for contrast, typography, and micro-interactions applied.",
          ar: "الاستفادة من اقتراحات الذكاء الاصطناعي لتحسين التباين، الخطوط، وتجربة الاستخدام."
        },
        priority: "medium",
        plannedHours: 1
      }
    ]
  },

  {
    id: "mvp",
    number: "05",
    icon: "🧩",
    title: {
      en: "Integrated Project & MVP",
      ar: "المشروع المتكامل وبناء الـMVP"
    },
    description: {
      en: "Turn the designed concept into a working Sedra Green Action Hub MVP.",
      ar: "تحويل التصميم والفكرة إلى MVP عملي لمنصة Sedra Green Action Hub."
    },
    tasks: [
      {
        id: "core",
        en: "Build the core platform experience",
        ar: "بناء التجربة الأساسية للمنصة",
        criteria: {
          en: "Seamless end-to-end user navigation across main landing and action pages.",
          ar: "ربط متكامل لرحلة المستخدم بين الصفحة الرئيسية وصفحات العمل المختلفة."
        },
        priority: "high",
        plannedHours: 2.5
      },
      {
        id: "challenge-flow",
        en: "Build the challenge flow",
        ar: "بناء مسار التحديات",
        criteria: {
          en: "Users can view challenge details, criteria, and participate.",
          ar: "إتاحة تصفح تفاصيل التحدي البيئي، شروطه، وإمكانية المشاركة فيه."
        },
        priority: "high",
        plannedHours: 2
      },
      {
        id: "initiative-flow",
        en: "Build the initiative flow",
        ar: "بناء مسار المبادرات",
        criteria: {
          en: "Initiative details page, progress towards tree planting/greening goals.",
          ar: "صفحة استعراض المبادرة، نسبة تحقيق المستهدف من التشجير، وحالة الدعم."
        },
        priority: "high",
        plannedHours: 2
      },
      {
        id: "stakeholders",
        en: "Add stakeholder / networking flow",
        ar: "إضافة مسار أصحاب المصلحة والتواصل",
        criteria: {
          en: "Profiles or connect forms for specialists and volunteer groups.",
          ar: "إتاحة بطاقات تعريفية للمتخصصين ونماذج للتواصل والتعاون."
        },
        priority: "medium",
        plannedHours: 1.5
      },
      {
        id: "impact",
        en: "Add basic impact / progress indicators",
        ar: "إضافة مؤشرات أولية للأثر والتقدم",
        criteria: {
          en: "Counter widgets showing trees planted, volunteers registered, initiatives funded.",
          ar: "عدادات واضحة توضح عدد الأشجار المغروسة، المتطوعين، ونسبة إنجاز المبادرات."
        },
        priority: "medium",
        plannedHours: 1.5
      },
      {
        id: "mvp-final",
        en: "Complete the MVP version",
        ar: "إكمال نسخة الـMVP",
        criteria: {
          en: "A cohesive, bug-free MVP ready for testing and live demonstration.",
          ar: "اكتمال نسخة MVP متماسكة وخالية من الأخطاء وجاهزة للعرض العملي."
        },
        priority: "high",
        plannedHours: 2
      }
    ]
  },

  {
    id: "testing",
    number: "06",
    icon: "🧪",
    title: {
      en: "Testing & Final Refinement",
      ar: "الاختبار والتنقيح النهائي"
    },
    description: {
      en: "Review the project carefully and prepare a polished version for presentation.",
      ar: "مراجعة المشروع وتجهيزه بصورة احترافية للعرض."
    },
    tasks: [
      {
        id: "function",
        en: "Test all main functions",
        ar: "اختبار جميع الوظائف الأساسية",
        criteria: {
          en: "Every button, filter, tab, and form verified to work smoothly.",
          ar: "التحقق من عمل كافة الأزرار، التصفية، والتنقلات بشكل صحيح ومباشر."
        },
        priority: "high",
        plannedHours: 1.5
      },
      {
        id: "mobile-test",
        en: "Test mobile experience",
        ar: "اختبار تجربة الجوال",
        criteria: {
          en: "Tested on physical smartphone and DevTools responsive emulators.",
          ar: "اختبار الواجهات على شاشات الهواتف المحمولة والتأكد من سهولة القراءة."
        },
        priority: "high",
        plannedHours: 1.5
      },
      {
        id: "desktop-test",
        en: "Test desktop experience",
        ar: "اختبار تجربة الكمبيوتر",
        criteria: {
          en: "Tested on desktop resolutions with zero layout shifts.",
          ar: "التأكد من التناسق التام على شاشات الحواسيب المكتبية والمحمولة."
        },
        priority: "medium",
        plannedHours: 1
      },
      {
        id: "language-test",
        en: "Test Arabic / English",
        ar: "اختبار العربية والإنجليزية",
        criteria: {
          en: "Verified no broken layout, text truncation, or alignment flaws in RTL.",
          ar: "التأكد من سلامة صياغة النصوص وعدم تداخل العناصر عند تغيير اللغة."
        },
        priority: "high",
        plannedHours: 1
      },
      {
        id: "bugs",
        en: "Fix bugs",
        ar: "إصلاح الأخطاء",
        criteria: {
          en: "Console free of JavaScript errors and CSS warnings.",
          ar: "معالجة أية أخطاء تظهر في سجل المتصفح (Console) وتنظيف الكود."
        },
        priority: "high",
        plannedHours: 1.5
      },
      {
        id: "polish",
        en: "Final visual refinement",
        ar: "التنقيح البصري النهائي",
        criteria: {
          en: "Pixel-perfect spacing, elegant hover transitions, and clean typography.",
          ar: "تحسين اللمسات الجمالية، الحركات الناعمة، وتوحيد المسافات البصرية."
        },
        priority: "medium",
        plannedHours: 1
      }
    ]
  },

  {
    id: "devops",
    number: "07",
    icon: "🌐",
    title: {
      en: "Git → GitHub → Vercel",
      ar: "Git → GitHub → Vercel"
    },
    description: {
      en: "Save, publish and deploy the project online.",
      ar: "حفظ المشروع ورفعه ونشره على الإنترنت."
    },
    tasks: [
      {
        id: "git-install",
        en: "Verify Git installation",
        ar: "التحقق من تثبيت Git",
        criteria: {
          en: "Git configured on machine with user name and email.",
          ar: "التحقق من تثبيت Git وضبط الاسم والبريد الإلكتروني بنجاح."
        },
        priority: "high",
        plannedHours: 0.5
      },
      {
        id: "git-init",
        en: "Initialize Git repository",
        ar: "إنشاء مستودع Git",
        criteria: {
          en: "Repository initialized with git init and .gitignore configured.",
          ar: "تهيئة مستودع Git محلي داخل مجلد المشروع وإضافة ملف gitignore."
        },
        priority: "high",
        plannedHours: 0.5
      },
      {
        id: "commit",
        en: "Create meaningful commits",
        ar: "إنشاء Commits واضحة",
        criteria: {
          en: "Descriptive commit messages describing each stage of development.",
          ar: "توثيق التغييرات برسائل Commit معبرة توضح كل خطوة برمجية."
        },
        priority: "medium",
        plannedHours: 0.5
      },
      {
        id: "github-repo",
        en: "Create GitHub repository",
        ar: "إنشاء مستودع GitHub",
        criteria: {
          en: "New public or private repository created on GitHub account.",
          ar: "إنشاء مستودع جديد على حساب GitHub باسم مناسب للمشروع."
        },
        priority: "high",
        plannedHours: 0.5
      },
      {
        id: "push",
        en: "Push project to GitHub",
        ar: "رفع المشروع إلى GitHub",
        criteria: {
          en: "Code pushed to main/master branch on GitHub without sync errors.",
          ar: "رفع ملفات المشروع بنجاح إلى الفرع الرئيسي في GitHub."
        },
        priority: "high",
        plannedHours: 0.5
      },
      {
        id: "readme",
        en: "Prepare project README",
        ar: "تجهيز README للمشروع",
        criteria: {
          en: "Comprehensive README.md with overview, features, screenshots, and setup.",
          ar: "ملف README.md احترافي يحتوي على وصف المشروع، لقطات شاشة، ورابط المعاينة."
        },
        priority: "high",
        plannedHours: 1.5
      },
      {
        id: "vercel",
        en: "Deploy project with Vercel",
        ar: "نشر المشروع باستخدام Vercel",
        criteria: {
          en: "Connected GitHub repo to Vercel and built live production URL.",
          ar: "ربط مستودع GitHub بمنصة Vercel ونشر الموقع بنجاح."
        },
        priority: "high",
        plannedHours: 1
      },
      {
        id: "live-test",
        en: "Test the live website",
        ar: "اختبار الموقع المنشور",
        criteria: {
          en: "Live production URL loaded on multiple devices with SSL active.",
          ar: "فتح الرابط المنشور على الجوال والكمبيوتر والتأكد من سرعة وسلاسة التحميل."
        },
        priority: "high",
        plannedHours: 0.5
      },
      {
        id: "final-link",
        en: "Save final GitHub + Vercel links",
        ar: "حفظ روابط GitHub وVercel النهائية",
        criteria: {
          en: "Live URL and GitHub repository URLs documented in your portfolio.",
          ar: "حفظ الروابط النهائية لمشاركتها في ملف الإنجاز والتقديم المهني."
        },
        priority: "medium",
        plannedHours: 0.5
      }
    ]
  },

  {
    id: "career",
    number: "08",
    icon: "🎤",
    title: {
      en: "Pitch Deck & Career Presentation",
      ar: "Pitch Deck والعرض المهني"
    },
    description: {
      en: "Present the project professionally and document the skills gained.",
      ar: "تقديم المشروع بشكل احترافي وتوثيق المهارات المكتسبة."
    },
    tasks: [
      {
        id: "problem-slide",
        en: "Problem",
        ar: "المشكلة",
        criteria: {
          en: "Compelling slide summarizing environmental challenge with clear facts.",
          ar: "شريحة تعرض التحدي البيئي بأرقام وحقائق تدعم أهمية الحل."
        },
        priority: "high",
        plannedHours: 1
      },
      {
        id: "solution-slide",
        en: "Solution",
        ar: "الحل",
        criteria: {
          en: "Clear demonstration of how Sedra Green Action Hub provides the answer.",
          ar: "عرض القيمة الفريدة للمنصة وكيف توحد جهود العمل البيئي."
        },
        priority: "high",
        plannedHours: 1
      },
      {
        id: "users-slide",
        en: "Target users",
        ar: "المستخدمون المستهدفون",
        criteria: {
          en: "Clear diagram of stakeholders, beneficiaries, and partner ecosystem.",
          ar: "توضيح شرائح المستخدمين المستفيدين والشركاء المحتملين."
        },
        priority: "medium",
        plannedHours: 1
      },
      {
        id: "innovation-slide",
        en: "Technology & Innovation",
        ar: "التقنية والابتكار",
        criteria: {
          en: "Highlighting Vibe Coding, emerging technologies, and architecture.",
          ar: "إبراز استخدام منهجية Vibe Coding والتقنيات الحديثة في بناء المنصة."
        },
        priority: "high",
        plannedHours: 1
      },
      {
        id: "impact-slide",
        en: "Environmental impact",
        ar: "الأثر البيئي",
        criteria: {
          en: "Projected environmental and community outcomes measurable by KPIs.",
          ar: "شريحة توضح الأثر البيئي المتوقع والمؤشرات القابلة للقياس."
        },
        priority: "medium",
        plannedHours: 1
      },
      {
        id: "roadmap-slide",
        en: "Future roadmap",
        ar: "خارطة الطريق المستقبلية",
        criteria: {
          en: "Next phases beyond MVP: partnerships, AI analytics, scaling.",
          ar: "خطة تطوير مستقبلية لما بعد الـMVP تشمل التوسع والشراكات."
        },
        priority: "medium",
        plannedHours: 1
      },
      {
        id: "pitch-practice",
        en: "Practice final pitch",
        ar: "التدرب على العرض النهائي",
        criteria: {
          en: "Timed practice delivering the presentation with confidence within 3-5 mins.",
          ar: "التدرب على الإلقاء بثقة والالتزام بالوقت المحدد (3 إلى 5 دقائق)."
        },
        priority: "high",
        plannedHours: 2
      },
      {
        id: "cv",
        en: "Add verified digital skills to CV",
        ar: "إضافة المهارات الرقمية التي تم اكتسابها فعليًا إلى CV",
        criteria: {
          en: "Update CV with Vibe Coding, AI prompt engineering, Git, and web tech.",
          ar: "تحديث السيرة الذاتية بالمهارات المكتسبة عملياً مثل Vibe Coding وGit وتطوير الويب."
        },
        priority: "high",
        plannedHours: 1
      },
      {
        id: "linkedin",
        en: "Prepare LinkedIn project showcase",
        ar: "تجهيز عرض المشروع على LinkedIn",
        criteria: {
          en: "Post draft with project demo video/screenshots, insights, and live link.",
          ar: "صياغة منشور احترافي على LinkedIn يوثق رحلة المشروع مع فيديو/صور ورابط حي."
        },
        priority: "high",
        plannedHours: 1.5
      }
    ]
  }
];
