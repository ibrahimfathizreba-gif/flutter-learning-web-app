export interface LessonResource {
  id: string;
  title: string;
  titleAr: string;
  type: "video" | "document" | "article" | "course";
  url: string;
  creatorOrSource: string;
  creatorOrSourceAr: string;
  language: "en" | "ar";
  description: string;
  descriptionAr: string;
  durationOrBadge?: string;
}

export const LESSON_RESOURCES: Record<string, LessonResource[]> = {
  step1: [
    {
      id: "s1-r1",
      title: "Flutter in Focus: Sound Null Safety",
      titleAr: "الأمان الصوتي من القيم الصفرية في فلاتر بالتفصيل",
      type: "video",
      url: "https://www.youtube.com/watch?v=yP5_gAmipfI",
      creatorOrSource: "Google Flutter Official",
      creatorOrSourceAr: "قناة فلاتر الرسمية من جوجل",
      language: "en",
      description: "Learn how Dart's compiler guarantees sound null safety, preventing NullPointerExceptions statically.",
      descriptionAr: "شرح تفصيلي من مهندسي جوجل حول الأمان الصوتي وكيف يحميك المترجم من أخطاء المراجع الصفرية.",
      durationOrBadge: "12 mins"
    },
    {
      id: "s1-r2",
      title: "Dart Null Safety Full Lecture & Flow Analysis",
      titleAr: "شرح الـ Null Safety بالتفصيل الممل في لغة Dart",
      type: "video",
      url: "https://www.youtube.com/watch?v=vV0fAnlKj40",
      creatorOrSource: "Wael Abo Hamza",
      creatorOrSourceAr: "المهندس وائل أبو حمزة",
      language: "ar",
      description: "A brilliant, step-by-step masterclass in Arabic explaining type promotion, late keyword, and nullable objects.",
      descriptionAr: "شرح تفصيلي باللغة العربية يغطي ترقية الأنواع، استخدام الكلمة المفتاحية late، وعلامات التقييم الصفري.",
      durationOrBadge: "35 mins"
    },
    {
      id: "s1-r3",
      title: "Official Dart Guide: Understanding Null Safety",
      titleAr: "الدليل البرمجي الرسمي لـ Null Safety من فريق Dart",
      type: "document",
      url: "https://dart.dev/null-safety/understanding-null-safety",
      creatorOrSource: "Dart Team",
      creatorOrSourceAr: "فريق تطوير لغة Dart",
      language: "en",
      description: "The definitive specification on nullable types, unsound vs sound modes, and type system details.",
      descriptionAr: "المرجع الكتابي الأقوى من منشئي اللغة لشرح تفاصيل الـ Soundness والترقية التلقائية للأكواد.",
      durationOrBadge: "Official Docs"
    },
    {
      id: "s1-r4",
      title: "Dart & Flutter Arabic Community Guides",
      titleAr: "دليل الأمان الصفري للمبتدئين والمحترفين بالعربية",
      type: "article",
      url: "https://flutter.dev",
      creatorOrSource: "Arabic Flutter Developers",
      creatorOrSourceAr: "مجتمعات فلاتر وجوجل العربية",
      language: "ar",
      description: "Interactive learning articles translating core Dart type declarations into simplified learning tracks.",
      descriptionAr: "مقالات تدريبية ميسرة تشرح قواعد ومصطلحات الـ Null Safety ومقارنتها باللغات الأخرى كـ Java.",
      durationOrBadge: "Article"
    }
  ],
  step2: [
    {
      id: "s2-r1",
      title: "Dart Object-Oriented Programming (OOP) & Constructors",
      titleAr: "البرمجة كائنية التوجه OOP وهندسة المنشئات في دارت",
      type: "video",
      url: "https://www.youtube.com/watch?v=9_t6Z-tLd6s",
      creatorOrSource: "Wael Abo Hamza",
      creatorOrSourceAr: "المهندس وائل أبو حمزة",
      language: "ar",
      description: "Comprehensive tutorial on Classes, named constructors, initializer lists, and implicit interfaces.",
      descriptionAr: "شرح تطبيقي ممتاز ومبسط بالعربية للفئات والمنشئات المسماة وقوائم التهيئة والوراثة والواجهات الضمنية.",
      durationOrBadge: "45 mins"
    },
    {
      id: "s2-r2",
      title: "Dart Classes and Constructors Deep Dive",
      titleAr: "المنشئات الذكية والواجهات الضمنية في Dart بالتفصيل",
      type: "video",
      url: "https://www.youtube.com/watch?v=M2_hR-Oisog",
      creatorOrSource: "Reso Coder",
      creatorOrSourceAr: "ريزو كودر (متقدم)",
      language: "en",
      description: "Advanced constructor designs including factory constructors, redirecting, and implicit interfaces.",
      descriptionAr: "شرح هندسي عميق لتصميم الفئات المتقدمة واستخدام المصانع (Factory) لإرجاع الكائنات والواجهات الضمنية.",
      durationOrBadge: "22 mins"
    },
    {
      id: "s2-r3",
      title: "Official Dart Language Tour: Classes & Interfaces",
      titleAr: "التوثيق الرسمي للفئات والوراثة والواجهات في Dart",
      type: "document",
      url: "https://dart.dev/language/classes",
      creatorOrSource: "Dart Language Team",
      creatorOrSourceAr: "فريق لغة دارت",
      language: "en",
      description: "Read the official language tour documentation regarding advanced class architectures.",
      descriptionAr: "التوثيق المرجعي الكامل لكيفية كتابة وتصميم الكلاسات، الواجهات، وتجاوز الدوال.",
      durationOrBadge: "Official Spec"
    }
  ],
  step3: [
    {
      id: "s3-r1",
      title: "Dart Isolates & Concurrency In-Depth",
      titleAr: "المعالجات المستقلة Isolates والبرمجة المتزامنة في دارت",
      type: "video",
      url: "https://www.youtube.com/watch?v=5AxWC49ZMzs",
      creatorOrSource: "Flutter Team",
      creatorOrSourceAr: "فريق تطوير فلاتر الرسمي",
      language: "en",
      description: "An incredible animated look at the single-threaded Event Loop, Futures, and spawning Isolates.",
      descriptionAr: "عرض رائع ومتحرك لكيفية إدارة حلقة الأحداث للمستقبلات وإنشاء خيوط معالجة منفصلة دون تضارب.",
      durationOrBadge: "25 mins"
    },
    {
      id: "s3-r2",
      title: "Understanding Async, Future, & Event Loop in Dart",
      titleAr: "فهم الـ Concurrency والـ Isolates وحلقة الأحداث بالعربية",
      type: "video",
      url: "https://www.youtube.com/watch?v=Y0-Y4Bv1Ets",
      creatorOrSource: "Abdullah Mansour",
      creatorOrSourceAr: "المهندس عبدالله منصور",
      language: "ar",
      description: "Learn how the single thread in Flutter processes events and how to run computational heavy scripts safely.",
      descriptionAr: "شرح مبسط وذكي للمهندسين العرب حول كيفية تشغيل الأكواد غير المتزامنة والتعامل مع المستقبلات والأيزوليت.",
      durationOrBadge: "18 mins"
    },
    {
      id: "s3-r3",
      title: "Dart Docs: Concurrency & Isolates Guides",
      titleAr: "دليل المطورين للتوازي والبرمجة غير المتزامنة في دارت",
      type: "document",
      url: "https://dart.dev/language/concurrency",
      creatorOrSource: "Dart Team",
      creatorOrSourceAr: "فريق تطوير لغة Dart",
      language: "en",
      description: "Highly academic documentation about asynchronous programming, Streams, and isolates communication.",
      descriptionAr: "التوثيق التقني والرياضي الكامل لكيفية تمرير الرسائل عبر منافذ الأيزوليت (Isolate Ports).",
      durationOrBadge: "Official Docs"
    }
  ],
  step4: [
    {
      id: "s4-r1",
      title: "Mixins and Extension Methods in Dart Explained",
      titleAr: "شرح الـ Mixins والـ Extension Methods بالتفصيل الممل",
      type: "video",
      url: "https://www.youtube.com/watch?v=9i6Rizv-fQ0",
      creatorOrSource: "Hassouna Academy",
      creatorOrSourceAr: "أكاديمية حسونة التعليمية",
      language: "ar",
      description: "A highly simplified lecture illustrating how to reuse code and extend classes with bespoke methods.",
      descriptionAr: "شرح بالعربية حول دمج الأكواد وإعادة استخدام الخصائص عبر الفئات المختلطة، مع تطبيق عملي للامتدادات.",
      durationOrBadge: "30 mins"
    },
    {
      id: "s4-r2",
      title: "Flutter Feature-First Architecture & Mixins",
      titleAr: "هيكلية المشاريع المتقدمة واستغلال الـ Mixins",
      type: "video",
      url: "https://www.youtube.com/watch?v=kYor5H-N25s",
      creatorOrSource: "Code with Andrea",
      creatorOrSourceAr: "أندريا بيزوتو (كود مع أندريا)",
      language: "en",
      description: "How to apply mixins for clean code practices in commercial architectures and production apps.",
      descriptionAr: "كيفية توظيف الـ Mixins لكتابة أكواد نظيفة وقابلة للصيانة والتوسيع في المشاريع التجارية الكبيرة.",
      durationOrBadge: "15 mins"
    },
    {
      id: "s4-r3",
      title: "Official Guide: Mixins & Extensions in Dart",
      titleAr: "التوثيق الرسمي للفئات المختلطة والامتدادات",
      type: "document",
      url: "https://dart.dev/language/mixins",
      creatorOrSource: "Dart Documentation",
      creatorOrSourceAr: "موقع توثيق لغة دارت",
      language: "en",
      description: "Official specs regarding mixin linear composition and extension method resolution.",
      descriptionAr: "القواعد والقيود الهندسية الرسمية المفروضة على كتابة الـ Mixins واستدعاء الدوال الممتدة.",
      durationOrBadge: "Language Reference"
    }
  ],
  step5: [
    {
      id: "s5-r1",
      title: "Flutter Declarative UI: How Widgets, Elements & RenderObjects Align",
      titleAr: "الأشجار الثلاثة في فلاتر: الودجات، العناصر، والرسومات",
      type: "video",
      url: "https://www.youtube.com/watch?v=996O-A_R_t4",
      creatorOrSource: "Flutter Core Team",
      creatorOrSourceAr: "فريق تطوير محرك فلاتر",
      language: "en",
      description: "Deep dive into the rendering architecture: why the widget tree is rebuilt while element tree is reused.",
      descriptionAr: "شرح تقني رائع يوضح الفارق بين شجرة الودجات وشجرة العناصر والـ RenderObject لزيادة كفاءة التطبيق.",
      durationOrBadge: "28 mins"
    },
    {
      id: "s5-r2",
      title: "StatefulWidget Lifecycle Methods Explained In Arabic",
      titleAr: "دورة حياة الـ StatefulWidget بالتفصيل الممل في فلاتر",
      type: "video",
      url: "https://www.youtube.com/watch?v=pYqAptG0xms",
      creatorOrSource: "Muhammed Issa",
      creatorOrSourceAr: "المهندس محمد عيسى",
      language: "ar",
      description: "Master the lifecycles: initState, didUpdateWidget, didChangeDependencies, and dispose.",
      descriptionAr: "فيديو متميز باللغة العربية يشرح ترتيب استدعاء دوال دورة الحياة، وكيفية تنظيف الذاكرة ومكافحة التسريب.",
      durationOrBadge: "20 mins"
    },
    {
      id: "s5-r3",
      title: "Flutter Architectural Overview: Core Engine Mechanics",
      titleAr: "التصميم الهيكلي والمبادئ التصريحية لواجهات فلاتر",
      type: "document",
      url: "https://docs.flutter.dev/resources/architectural-overview",
      creatorOrSource: "Flutter Documentation",
      creatorOrSourceAr: "موقع توثيق فلاتر الرسمي",
      language: "en",
      description: "An extensive architectural guide on the multi-layered design of Flutter.",
      descriptionAr: "مرجع كتابي شامل ومفصل يتناول بنية فلاتر المتعددة الطبقات وتنسيق الرسوم والبيانات.",
      durationOrBadge: "Architectural Spec"
    }
  ],
  step6: [
    {
      id: "s6-r1",
      title: "Slivers and CustomScrollView Masterclass",
      titleAr: "احترف الـ Slivers والتمرير المتقدم في فلاتر",
      type: "video",
      url: "https://www.youtube.com/watch?v=MyzGvI9V4Yc",
      creatorOrSource: "Flutter Team",
      creatorOrSourceAr: "فريق فلاتر الرسمي",
      language: "en",
      description: "Learn how to use Slivers to build complex scrolling headers, flexible lists, and responsive views.",
      descriptionAr: "كيفية تطويع الـ Slivers لإنشاء ترويسات متحركة وتأثيرات تمرير مذهلة وعالية الكفاءة.",
      durationOrBadge: "32 mins"
    },
    {
      id: "s6-r2",
      title: "Performance Optimization for Lists & ScrollControllers",
      titleAr: "التعامل مع ListView.builder وحل مشاكل تعليق الشاشة والذاكرة",
      type: "video",
      url: "https://www.youtube.com/watch?v=W0lA4fU2b18",
      creatorOrSource: "Tarek Al-Abadi",
      creatorOrSourceAr: "المهندس طارق العبادي",
      language: "ar",
      description: "Avoid frame drops in infinite scrolling. Learn lazy loading, cache extents, and asset loading.",
      descriptionAr: "كيفية تشغيل وإعداد القوائم اللانهائية وحماية الذاكرة العشوائية من الانهيار عند تحميل صور كثيرة.",
      durationOrBadge: "22 mins"
    },
    {
      id: "s6-r3",
      title: "Cookbook: Scrolling and High-Performance Lists",
      titleAr: "كتاب الطهي البرمجي لفلاتر: التمرير والقوائم المعقدة",
      type: "document",
      url: "https://docs.flutter.dev/cookbook/lists/mixed-list",
      creatorOrSource: "Flutter Docs",
      creatorOrSourceAr: "مستندات فلاتر الرسمية",
      language: "en",
      description: "Step-by-step recipes on how to implement lists with mixed items, grids, and horizontal scrolling.",
      descriptionAr: "شرح تفصيلي لتنفيذ سيناريوهات القوائم المختلفة وتطبيق أفضل معايير التصميم البرمجي.",
      durationOrBadge: "Cookbook Recipes"
    }
  ],
  step7: [
    {
      id: "s7-r1",
      title: "Asynchronous Streams & RxDart Pipelines in Flutter",
      titleAr: "قنوات تدفق البيانات Streams ومكتبة RxDart للمحترفين",
      type: "video",
      url: "https://www.youtube.com/watch?v=nQBp0b95y_Y",
      creatorOrSource: "Flutterly",
      creatorOrSourceAr: "فلاترلي (متقدم)",
      language: "en",
      description: "Understand the differences between single-subscription and broadcast Streams, and how RxDart boosts power.",
      descriptionAr: "شرح قنوات البث الفردي والبث المتعدد، والتعرف على المشغلات التفاعلية المتقدمة لـ RxDart.",
      durationOrBadge: "40 mins"
    },
    {
      id: "s7-r2",
      title: "StreamBuilder and Reactive States Complete Guide",
      titleAr: "شرح الـ StreamBuilder والبرمجة التفاعلية بالكامل",
      type: "video",
      url: "https://www.youtube.com/watch?v=f7BqM_xK69I",
      creatorOrSource: "Wael Abo Hamza",
      creatorOrSourceAr: "المهندس وائل أبو حمزة",
      language: "ar",
      description: "A highly practical demonstration of building real-time, event-driven interfaces with StreamBuilder.",
      descriptionAr: "دورة برمجية تطبيقية لشرح البناء التفاعلي وإعادة رندرة الشاشات بناء على تدفق البيانات المباشرة.",
      durationOrBadge: "26 mins"
    },
    {
      id: "s7-r3",
      title: "Dart Asynchronous Tutorial: Working with Streams",
      titleAr: "دليل المطورين للتعامل مع الـ Streams في لغة دارت",
      type: "document",
      url: "https://dart.dev/tutorials/language/streams",
      creatorOrSource: "Dart Team",
      creatorOrSourceAr: "فريق تطوير لغة Dart",
      language: "en",
      description: "Official guide on stream controllers, async/await generators, and error handling inside Streams.",
      descriptionAr: "شرح كتابي يوضح كيفية إنشاء مجاري البيانات، واستخدام مولدات البيانات async* للتعامل اللحظي.",
      durationOrBadge: "Official Tutorial"
    }
  ],
  step8: [
    {
      id: "s8-r1",
      title: "Obfuscate & Secure Your Flutter App - Production Build Tips",
      titleAr: "حماية وتأمين تطبيقات فلاتر ضد الهندسة العكسية والتعديل",
      type: "video",
      url: "https://www.youtube.com/watch?v=YmX46YwM1zM",
      creatorOrSource: "Flutter Pro",
      creatorOrSourceAr: "محترفي فلاتر (بالإنكليزية)",
      language: "en",
      description: "Learn how to obfuscate the compiled Dart binary, implement SSL pinning, and protect keys.",
      descriptionAr: "كيفية تشفير كود دارت النهائي لمنع قراءته بالهندسة العكسية وتطبيق حماية برمجية متطورة.",
      durationOrBadge: "15 mins"
    },
    {
      id: "s8-r2",
      title: "Flutter Obfuscation & App Signing Demystified",
      titleAr: "تشفير وحماية كود تطبيق فلاتر وتوقيعه للمتاجر بالعربية",
      type: "video",
      url: "https://www.youtube.com/watch?v=7MizFshv6H4",
      creatorOrSource: "Ahmed Abu El-Dahab",
      creatorOrSourceAr: "المهندس أحمد أبو الذهب",
      language: "ar",
      description: "Learn how to configure obfuscation flags on compile and sign APKs for secure Play Store launch.",
      descriptionAr: "شرح تطبيقي بالعربية لكيفية تفعيل تشفير الأكواد وتوليد مفاتيح التوقيع الرقمي الآمنة.",
      durationOrBadge: "24 mins"
    },
    {
      id: "s8-r3",
      title: "Official Docs: Obfuscating Flutter Code & Security Standards",
      titleAr: "دليل التشفير الرسمي وحماية الملفات البرمجية من فلاتر",
      type: "document",
      url: "https://docs.flutter.dev/deployment/obfuscate",
      creatorOrSource: "Flutter Security Team",
      creatorOrSourceAr: "فريق حماية فلاتر الرسمي",
      language: "en",
      description: "Official configuration reference for proguard, ndk levels, and obfuscating Dart symbols.",
      descriptionAr: "التوثيق الكتابي الكامل لشرح خيارات سطر الأوامر لتشويش الأكواد وحماية منطق أعمال التطبيق.",
      durationOrBadge: "Security Guide"
    }
  ],
  step9: [
    {
      id: "s9-r1",
      title: "Flutter Bloc Architecture (Complete Professional Course)",
      titleAr: "دورة إدارة الحالة المتقدمة باستخدام BLoC من الصفر للاحتراف",
      type: "video",
      url: "https://www.youtube.com/watch?v=7uV899Gk_uU",
      creatorOrSource: "Muhammed Issa",
      creatorOrSourceAr: "المهندس محمد عيسى",
      language: "ar",
      description: "Complete guide on events, states, Cubits, BlocProviders, and clean project setups in Arabic.",
      descriptionAr: "كورس كامل بالعربية لشرح نمط BLoC المعتمد في الشركات الكبرى وعزل منطق الأعمال عن الواجهات.",
      durationOrBadge: "1 Hour 10 Mins"
    },
    {
      id: "s9-r2",
      title: "Advanced Flutter State Management: Riverpod vs Bloc vs Provider",
      titleAr: "مقارنة شاملة لتقنيات إدارة الحالة وإيجابيات وسلبيات كل منها",
      type: "video",
      url: "https://www.youtube.com/watch?v=Zp7LuGgT6S4",
      creatorOrSource: "Andrea Bizzotto",
      creatorOrSourceAr: "أندريا بيزوتو (متقدم)",
      language: "en",
      description: "Deep comparison of modern Flutter state managers, their runtime performance, and compile benefits.",
      descriptionAr: "مقارنة علمية دقيقة توضح الفارق في الأداء، سهولة الاختبار، ومقدار الأكواد الإضافية في المشاريع.",
      durationOrBadge: "1 Hour 45 Mins"
    },
    {
      id: "s9-r3",
      title: "Flutter Docs: Choosing State Management",
      titleAr: "الخيارات الرسمية والمنهجية لإدارة الحالة في فلاتر",
      type: "document",
      url: "https://docs.flutter.dev/data-and-backend/state-mgmt/options",
      creatorOrSource: "Google Flutter Docs",
      creatorOrSourceAr: "مستندات جوجل فلاتر",
      language: "en",
      description: "Read about the official recommendations for architectural composition and reactive data states.",
      descriptionAr: "المستندات الرسمية التي تستعرض الهياكل المقترحة لإدارة حالات وتدفق بيانات التطبيق.",
      durationOrBadge: "Architecture Guide"
    }
  ],
  step10: [
    {
      id: "s10-r1",
      title: "Raising Quality: Automating Releases with Fastlane & GitHub Actions",
      titleAr: "أتمتة بناء وإطلاق التطبيقات مع Fastlane و GitHub Actions",
      type: "video",
      url: "https://www.youtube.com/watch?v=9_t6Z-tLd6s",
      creatorOrSource: "Mitch Koko",
      creatorOrSourceAr: "ميتش كوكو (محترفين)",
      language: "en",
      description: "Learn how to build automated pipelines that compile and push your code to the Stores on every commit.",
      descriptionAr: "كيفية كتابة سكربتات لبناء وإطلاق النسخ تلقائياً إلى متجري جوجل بلاي وآبل فور إرسال التحديثات.",
      durationOrBadge: "30 mins"
    },
    {
      id: "s10-r2",
      title: "Deploying Flutter Apps to Play Store and App Store Step-by-Step",
      titleAr: "شرح رفع ونشر تطبيقات فلاتر على المتاجر خطوة بخطوة بالكامل",
      type: "video",
      url: "https://www.youtube.com/watch?v=rWj8g6k_l8Y",
      creatorOrSource: "Code Shark",
      creatorOrSourceAr: "أكاديمية كود شارك بالعربية",
      language: "ar",
      description: "An incredibly detailed Arabic tutorial explaining console creations, screenshot requirements, and store guidelines.",
      descriptionAr: "شرح عملي مفصل لخطوات تفعيل حسابات المطورين وتوليد ملفات النشر ومراجعة سياسات المتاجر.",
      durationOrBadge: "35 mins"
    },
    {
      id: "s10-r3",
      title: "Flutter CD Guide: Automated Testing and App Delivery",
      titleAr: "الدليل الرسمي للـ Continuous Delivery في فلاتر",
      type: "document",
      url: "https://docs.flutter.dev/deployment/cd",
      creatorOrSource: "Flutter Engine Docs",
      creatorOrSourceAr: "مستندات النشر فلاتر",
      language: "en",
      description: "Comprehensive official cookbook to establish robust build automation servers.",
      descriptionAr: "دليل فلاتر لإعداد خوادم الأتمتة السحابية وتشغيل الفحوصات التلقائية قبل النشر النهائي.",
      durationOrBadge: "Deployment Spec"
    }
  ]
};
