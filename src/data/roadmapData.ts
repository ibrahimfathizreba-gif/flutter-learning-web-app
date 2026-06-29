export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface CodeChallenge {
  instruction: string;
  starterCode: string;
  sampleSolution: string;
  gradingCriteria: string;
  localGraderRegex: string[];
}

export interface RoadmapStep {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  goals: string[];
  goalsAr: string[];
  content: string;
  contentAr: string;
  quiz: QuizQuestion[];
  quizAr: QuizQuestion[];
  challenge: CodeChallenge;
  challengeAr: CodeChallenge;
}

export const ROADMAP_STEPS: RoadmapStep[] = [
  {
    id: "step1",
    title: "Sound Null Safety & Compile-Time Robustness",
    titleAr: "الأمان الصوتي من القيم الصفرية وتماسك الكود",
    description: "Master Dart's sound null-safety. Understand type promotion, late variables, and compile-time null safety optimizations.",
    descriptionAr: "احترف ميزة الأمان الصوتي من القيم الصفرية (Null Safety) في دارت. وتعرف على ترفيع الأنواع، المتغيرات المتأخرة، وتحسينات المترجم.",
    goals: [
      "Understand the difference between nullable (?) and non-nullable types",
      "Leverage flow analysis for automatic type promotion",
      "Use the late keyword for lazy initialization and compile-time safety"
    ],
    goalsAr: [
      "فهم الفارق الجوهري بين الأنواع القابلة للقيمة الصفرية (?) وغير القابلة لها",
      "توظيف تحليل التدفق للمترجم في الترقية التلقائية للأنواع",
      "استخدام الكلمة المفتاحية late للتهيئة المتأخرة وضمان الأمان أثناء الترجمة"
    ],
    content: `### Sound Null Safety in Dart 🛡️

Dart features **Sound Null Safety**. This means that types in your code are non-nullable by default: variables cannot contain \`null\` unless you explicitly declare them to allow it.

#### Key Principles:
1. **Non-Nullable by Default**: A standard variable \`String name\` can never hold \`null\`.
2. **Nullable Types**: To allow a variable to hold a null value, append \`?\` to its type, e.g., \`String? nullableName\`.
3. **Type Promotion**: Dart's compiler is smart. If you check a nullable variable for \`null\` using an \`if\` statement, Dart automatically "promotes" the variable to a non-nullable type within that block.
4. **The \`late\` Keyword**: Used to declare a variable that will be initialized after its declaration, but guarantees to the compiler that it will not be null when accessed.

\`\`\`dart
void main() {
  String name = "Dart"; // Non-nullable
  String? nullableName; // Nullable, defaults to null

  if (nullableName != null) {
    // Type promotion in action: nullableName is promoted to String
    print(nullableName.length);
  }

  late String databaseUrl;
  databaseUrl = "https://api.flutter.dev"; // Initialized later
  print(databaseUrl.length); // Guaranteed safe
}
\`\`\`
`,
    contentAr: `### الأمان الصوتي من القيم الصفرية (Sound Null Safety) 🛡️

تتميز لغة دارت بنظام **الأمان الصوتي من القيم الصفرية**. وهذا يعني أن كافة أنواع البيانات في الكود غير قابلة لاستقبال القيمة الفارغة (\`null\`) بشكل افتراضي، مما يمنع حدوث أخطاء وقت التشغيل الشهيرة (NullPointerExceptions).

#### المبادئ الأساسية:
1. **غير قابلة للقيم الصفرية افتراضياً**: المتغير العادي مثل \`String name\` لا يمكن أبداً أن يحمل القيمة \`null\`.
2. **الأنواع القابلة للقيم الصفرية**: للسماح للمتغير بقبول قيم فارغة، نضيف علامة الاستفهام \`?\` لنهاية النوع، مثل \`String? nullableName\`.
3. **ترقية الأنواع (Type Promotion)**: مترجم دارت ذكي للغاية. إذا قمت بفحص متغير قابل للقيمة الصفرية باستخدام شرط \`if\` للتأكد من وجود قيمة، فسيقوم المترجم تلقائياً بترقية نوع المتغير إلى نوع غير قابل للقيمة الصفرية داخل كتلة الشرط.
4. **الكلمة المفتاحية \`late\`**: تُستخدم للإعلان عن متغير سيتم تهيئته لاحقاً بعد تعريفه، مع تقديم ضمان للمترجم بأنه لن يكون فارغاً عند محاولة الوصول إليه.

\`\`\`dart
void main() {
  String name = "Dart"; // غير قابل للقيمة الصفرية
  String? nullableName; // قابل للقيمة الصفرية، القيمة الافتراضية هي null

  if (nullableName != null) {
    // ترقية الأنواع: يتم ترقية nullableName تلقائياً إلى نوع String عادي
    print(nullableName.length);
  }

  late String databaseUrl;
  databaseUrl = "https://api.flutter.dev"; // تهيئة لاحقة
  print(databaseUrl.length); // تشغيل آمن ومضمون
}
\`\`\`
`,
    quiz: [
      {
        question: "What does 'Sound Null Safety' guarantee in Dart?",
        options: [
          "Variables can never be modified after declaration",
          "A non-nullable variable can never evaluate to null at runtime",
          "All null checks are automatically removed for performance",
          "The program will run inside a virtual sandbox"
        ],
        correctAnswer: 1,
        explanation: "Sound Null Safety guarantees that if a type is marked as non-nullable, it can never be null during compilation or at runtime, completely eliminating NullPointerExceptions."
      },
      {
        question: "How do you declare a variable 'age' that can either hold an integer or a null value?",
        options: [
          "int age = null;",
          "Nullable<int> age;",
          "int? age;",
          "late int age;"
        ],
        correctAnswer: 2,
        explanation: "Appending a '?' to the type (e.g., 'int?') informs the compiler that the variable is nullable."
      },
      {
        question: "What is the purpose of the 'late' keyword?",
        options: [
          "To mark a function as asynchronous",
          "To force a variable to be garbage collected late",
          "To declare a variable that will be initialized after its declaration, guaranteeing it is non-null before read",
          "To allow compile-time macros"
        ],
        correctAnswer: 2,
        explanation: "The 'late' keyword defers initialization while assuring the compiler that the value will be present before anyone reads it, preventing static analysis errors."
      }
    ],
    quizAr: [
      {
        question: "ما الذي تضمنه ميزة 'الأمان الصوتي من القيم الصفرية' في لغة دارت؟",
        options: [
          "لا يمكن تعديل المتغيرات أبداً بعد الإعلان عنها",
          "المتغير غير القابل للقيمة الصفرية لا يمكن أن يحمل القيمة null مطلقاً وقت التشغيل",
          "يتم حذف جميع عمليات التحقق من القيم الصفرية تلقائياً لزيادة الأداء",
          "سيتم تشغيل البرنامج داخل بيئة افتراضية معزولة"
        ],
        correctAnswer: 1,
        explanation: "يضمن الأمان الصوتي أنه إذا تم تمييز متغير بأنه غير قابل للقيمة الصفرية، فلن يحمل القيمة null أبداً سواء أثناء الترجمة أو التشغيل، مما يقضي تماماً على أخطاء المراجع الصفرية."
      },
      {
        question: "كيف تعلن عن متغير باسم 'age' يمكن أن يحمل رقماً صحيحاً أو قيمة فارغة (null)؟",
        options: [
          "int age = null;",
          "Nullable<int> age;",
          "int? age;",
          "late int age;"
        ],
        correctAnswer: 2,
        explanation: "إضافة علامة الاستفهام '?' إلى نهاية اسم النوع (مثل 'int?') تعني إخبار المترجم بأن هذا المتغير قابل لاستقبال القيمة الصفرية."
      },
      {
        question: "ما الغرض من استخدام الكلمة المفتاحية 'late' في دارت؟",
        options: [
          "لتحديد دالة على أنها غير متزامنة (asynchronous)",
          "لإجبار النظام على تنظيف المتغير من الذاكرة بشكل متأخر",
          "للإعلان عن متغير سيتم تهيئته لاحقاً، مع ضمان عدم قراءته قبل وضع قيمة فيه",
          "للسماح بالماكروهات البرمجية أثناء الترجمة"
        ],
        correctAnswer: 2,
        explanation: "تقوم الكلمة late بتأجيل التهيئة الفعلية للمتغير مع طمأنة المترجم بأن القيمة ستكون متوفرة قبل محاولة قراءتها، لتجنب أخطاء التحليل الساكن."
      }
    ],
    challenge: {
      instruction: "Write a function 'String getUsername(Map<String, String>? userData)' that safely extracts a user's name from a nullable Map under the key 'name'. If the map is null, or if the key 'name' is missing or null, return 'Guest'.",
      starterCode: `String getUsername(Map<String, String>? userData) {
  // TODO: Implement safe extraction
  return "Guest";
}`,
      sampleSolution: `String getUsername(Map<String, String>? userData) {
  if (userData == null) {
    return "Guest";
  }
  return userData['name'] ?? "Guest";
}`,
      gradingCriteria: "Must handle a null userData map and return 'Guest'. Must check the key 'name' and apply a default fallback using null-coalescing.",
      localGraderRegex: ["String getUsername", "userData", "??", "Guest"]
    },
    challengeAr: {
      instruction: "اكتب دالة برمجية باسم 'String getUsername(Map<String, String>? userData)' تستخرج بأمان اسم المستخدم من قاموس قابل للقيمة الصفرية (nullable Map) تحت المفتاح 'name'. إذا كان القاموس فارغاً (null)، أو إذا كان المفتاح 'name' مفقوداً، يجب إرجاع القيمة الافتراضية 'Guest'.",
      starterCode: `String getUsername(Map<String, String>? userData) {
  // TODO: قم بتنفيذ الاستخراج الآمن هنا
  return "Guest";
}`,
      sampleSolution: `String getUsername(Map<String, String>? userData) {
  if (userData == null) {
    return "Guest";
  }
  return userData['name'] ?? "Guest";
}`,
      gradingCriteria: "يجب التعامل مع قاموس userData عندما يكون null وإرجاع 'Guest'. كما يجب التحقق من المفتاح 'name' واستخدام عامل التقييم الصفري ??.",
      localGraderRegex: ["String getUsername", "userData", "??", "Guest"]
    }
  },
  {
    id: "step2",
    title: "Dart OOP & Advanced Constructor Architectures",
    titleAr: "برمجة الكائنات وهندسة المنشئات المتقدمة",
    description: "Deep dive into Dart object creation. Master initializer lists, named constructors, redirecting constructors, and implicit interfaces.",
    descriptionAr: "تعمق في إنشاء الكائنات في دارت. احترف قوائم التهيئة، المنشئات المسماة، المنشئات الموجهة، والواجهات الضمنية.",
    goals: [
      "Define named and redirecting constructors for rich initialization interfaces",
      "Use initializer lists to safely initialize final instance fields",
      "Understand and implement implicit interfaces defined by every class"
    ],
    goalsAr: [
      "تعريف المنشئات المسماة والموجهة لتوفير واجهات تهيئة غنية للكائنات",
      "استخدام قوائم التهيئة (Initializer Lists) لتهيئة الحقول النهائية بأمان",
      "فهم وتطبيق مفهوم الواجهات الضمنية (Implicit Interfaces) التي تنشأ لكل فئة تلقائياً"
    ],
    content: `### Dart Advanced Constructor Architecture 🏛️

Dart provides a highly expressive and safe object initialization pipeline. Unlike classic OOP languages, Dart supports multiple specialized constructors and runs static assertions before the object is fully materialized in memory.

#### 1. Named Constructors
Dart does not support method/constructor overloading. Instead, it uses **Named Constructors** to define multiple ways to instantiate a class.

#### 2. Initializer Lists
An initializer list executes **before** the constructor body. This makes it perfect for setting \`final\` fields, performing sanity checks, and preparing computed values safely.

#### 3. Implicit Interfaces
In Dart, **there is no \`interface\` keyword**. Every class implicitly defines an interface containing all its instance fields and methods. Any class can implement another class's implicit interface!

\`\`\`dart
class Vector {
  final double x;
  final double y;

  // Primary constructor with syntactic sugar
  Vector(this.x, this.y);

  // Named Constructor
  Vector.zero()
      : x = 0.0,
        y = 0.0 {
    print("Zero vector initialized");
  }

  // Redirecting Constructor
  Vector.horizontal(double val) : this(val, 0.0);
}

// Implicit Interface implementation
class MockVector implements Vector {
  @override
  double get x => 1.0;
  @override
  double get y => 2.0;
}
\`\`\`
`,
    contentAr: `### البنية البرمجية المتقدمة لمنشئات الكائنات في دارت 🏛️

توفر لغة دارت نظاماً تعبيرياً فائق القوة لتهيئة الكائنات ومصادقتها في الذاكرة. على عكس لغات البرمجة كائنية التوجه التقليدية، تدعم دارت أشكالاً مخصصة متعددة للمنشئات وتسمح بإجراء عمليات الفحص والتحقق قبل تشييد الكائن بالكامل.

#### 1. المنشئات المسماة (Named Constructors)
لا تدعم دارت تحميل الدوال الزائد (overloading) للمنشئات. عوضاً عن ذلك، تستخدم **المنشئات المسماة** لتمكين المبرمج من توفير طرق متعددة وواضحة لإنشاء الكائنات.

#### 2. قوائم التهيئة (Initializer Lists)
تُنفذ قائمة التهيئة **قبل** تشغيل جسم المنشئ نفسه. وهذا يجعلها المكان الأمثل لتعيين قيم الحقول النهائية (\`final\`)، وإجراء عمليات التحقق السريع، وإعداد الحسابات المسبقة بأمان تام.

#### 3. الواجهات الضمنية (Implicit Interfaces)
في دارت، **لا توجد كلمة مفتاحية تسمى \`interface\`**. كل فئة (Class) تقوم تلقائياً بتعريف واجهة برمجية (Interface) تحتوي على كافة حقولها ودوالها، ويمكن لأي فئة أخرى تطبيق هذه الواجهة باستخدام الكلمة \`implements\`.

\`\`\`dart
class Vector {
  final double x;
  final double y;

  // المنشئ الرئيسي المختصر
  Vector(this.x, this.y);

  // منشئ مسمى
  Vector.zero()
      : x = 0.0,
        y = 0.0 {
    print("تم تهيئة متجه صفري");
  }

  // منشئ موجه (Redirecting)
  Vector.horizontal(double val) : this(val, 0.0);
}

// تطبيق الواجهة الضمنية لفئة Vector
class MockVector implements Vector {
  @override
  double get x => 1.0;
  @override
  double get y => 2.0;
}
\`\`\`
`,
    quiz: [
      {
        question: "Why does Dart feature Named Constructors?",
        options: [
          "To allow subclasses to modify parent final fields directly",
          "Because Dart does not support standard method overloading",
          "To force all constructors to run asynchronously",
          "To bypass compiling steps"
        ],
        correctAnswer: 1,
        explanation: "Since Dart does not support constructor overloading, named constructors are the official and clean way to define multiple constructors with distinct names."
      },
      {
        question: "When does an Initializer List execute in Dart?",
        options: [
          "Immediately after the constructor body completes",
          "Concurrently on a background Isolate",
          "Before the constructor body runs, allowing final fields to be safely assigned",
          "Only when compiling in production mode"
        ],
        correctAnswer: 2,
        explanation: "The initializer list runs strictly before the constructor body executes, meaning fields are initialized early and final variables can be set safely."
      },
      {
        question: "Which keyword is used to implement a class's implicit interface in Dart?",
        options: [
          "extends",
          "implements",
          "with",
          "mixin"
        ],
        correctAnswer: 1,
        explanation: "The 'implements' keyword is used to implement any class's implicit interface, requiring the subclass to override all fields and methods."
      }
    ],
    quizAr: [
      {
        question: "لماذا تدعم لغة دارت ميزة 'المنشئات المسماة' (Named Constructors)؟",
        options: [
          "للسماح للفئات الفرعية بتعديل الحقول النهائية للفئة الأب مباشرة",
          "لأن لغة دارت لا تدعم التحميل الزائد (overloading) التقليدي للمنشئات بنفس الاسم",
          "لإجبار كافة المنشئات على العمل بشكل غير متزامن",
          "لتخطي خطوات الترجمة والتحقق الساكن"
        ],
        correctAnswer: 1,
        explanation: "نظراً لعدم وجود ميزة تحميل المنشئات الزائد في دارت، تعد المنشئات المسماة الطريقة الرسمية والأكثر وضوحاً لتوفير منشئات متعددة بأسماء مختلفة."
      },
      {
        question: "متى يتم تنفيذ 'قائمة التهيئة' (Initializer List) في دارت؟",
        options: [
          "فوراً بعد اكتمال تنفيذ جسم المنشئ",
          "بالتوازي في خيط معالجة خلفي مستقل",
          "قبل تشغيل جسم المنشئ، مما يتيح تعيين الحقول النهائية بشكل آمن",
          "فقط عند تشغيل التطبيق في وضع الإنتاج"
        ],
        correctAnswer: 2,
        explanation: "تعمل قائمة التهيئة قبل جسم المنشئ تماماً، مما يضمن تهيئة حقول الكائن في وقت مبكر ويسمح بإسناد القيم للمتغيرات الثابتة والنهائية (final)."
      },
      {
        question: "ما هي الكلمة المفتاحية المستخدمة لتطبيق الواجهة الضمنية لفئة أخرى في دارت؟",
        options: [
          "extends",
          "implements",
          "with",
          "mixin"
        ],
        correctAnswer: 1,
        explanation: "تُستخدم الكلمة المفتاحية 'implements' لتطبيق الواجهات الضمنية، مما يلزم الفئة بكتابة وتجاوز (override) كافة الدوال والحقول المعرفة في الفئة المستهدفة."
      }
    ],
    challenge: {
      instruction: "Create a class named 'Point' with two final double fields, 'x' and 'y'. Add a primary constructor 'Point(this.x, this.y)' and a named constructor 'Point.origin()' that uses an initializer list to set both 'x' and 'y' to 0.0.",
      starterCode: `class Point {
  final double x;
  final double y;

  // TODO: Implement primary constructor and Point.origin() named constructor
}`,
      sampleSolution: `class Point {
  final double x;
  final double y;

  Point(this.x, this.y);

  Point.origin() : x = 0.0, y = 0.0;
}`,
      gradingCriteria: "The Point class must define x and y as final doubles, include a primary constructor, and have a named constructor Point.origin setting x and y to 0.0 using an initializer list.",
      localGraderRegex: ["class Point", "final double x", "final double y", "Point(this.x, this.y)", "Point.origin() : x = 0.0, y = 0.0"]
    },
    challengeAr: {
      instruction: "قم بإنشاء فئة برمجية باسم 'Point' تحتوي على حقلين نهائيين من نوع double هما 'x' و 'y'. أضف المنشئ الرئيسي 'Point(this.x, this.y)' ومنشئاً مسمى باسم 'Point.origin()' يستخدم قائمة التهيئة لتعيين كل من 'x' و 'y' إلى القيمة 0.0.",
      starterCode: `class Point {
  final double x;
  final double y;

  // TODO: قم بتنفيذ المنشئ الرئيسي والمنشئ المسمى Point.origin هنا
}`,
      sampleSolution: `class Point {
  final double x;
  final double y;

  Point(this.x, this.y);

  Point.origin() : x = 0.0, y = 0.0;
}`,
      gradingCriteria: "يجب أن تحتوي فئة Point على حقول نهائية، والمنشئ الرئيسي، والمنشئ المسمى Point.origin المربوط بتهيئة قيم x و y إلى 0.0.",
      localGraderRegex: ["class Point", "final double x", "final double y", "Point(this.x, this.y)", "Point.origin() : x = 0.0, y = 0.0"]
    }
  },
  {
    id: "step3",
    title: "Dart Concurrency, Event Loops & Isolates",
    titleAr: "التزامن البرمجي، حلقات الأحداث والمعالجات المستقلة",
    description: "Master asynchronous code execution in Dart. Learn how the single-threaded event loop manages Futures and Streams, and how to spawn Isolates.",
    descriptionAr: "احترف المعالجة غير المتزامنة في دارت. تعلم كيف تدير حلقة الأحداث الأحادية كائنات Futures و Streams، ومتى تنشئ المعالجات المستقلة (Isolates).",
    goals: [
      "Navigate the single-threaded execution model and the Event Loop",
      "Chain and await asynchronous Futures gracefully",
      "Spawn background Isolates to process heavy CPU computations without blocking UI rendering"
    ],
    goalsAr: [
      "فهم نموذج المعالجة أحادي الخيط وكيفية عمل حلقة الأحداث (Event Loop)",
      "ربط وانتظار العمليات غير المتزامنة (Futures) بشكل أنيق وآمن",
      "إنشاء معالجات مستقلة (Isolates) لمعالجة البيانات المعقدة خلف الكواليس دون إعاقة واجهات المستخدم"
    ],
    content: `### Dart Concurrency Architecture 🏎️

Dart is fundamentally **single-threaded**. It executes your code inside an **Event Loop**. This is incredibly beneficial for UI development because it completely eliminates thread synchronization bugs and race conditions.

#### 1. The Event Loop
The Event Loop handles external events like touch gestures, drawing frames, network responses, and timers. It pulls tasks from two queues:
*   **Microtask Queue**: High-priority tasks that need to run immediately after the current code.
*   **Event Queue**: Standard asynchronous actions (I/O, mouse clicks, timers).

#### 2. Futures and Streams
*   **Future**: Represents a single value that will be available asynchronously in the future.
*   **Stream**: A continuous pipeline emitting multiple asynchronous values over time.

#### 3. Isolates
When you need to run heavy CPU computations (like parsing 50MB of raw JSON or manipulating images), running them on the Event Loop will freeze your app. Dart solves this via **Isolates**.
Isolates are separate execution threads that **do not share memory**. They run in parallel on separate CPU cores and communicate exclusively by passing messages via ports.

\`\`\`dart
import 'dart:isolate';

// This function runs on a separate Isolate! Shared memory is protected.
void heavyTask(SendPort mainPort) {
  int sum = 0;
  for (int i = 0; i < 10000000; i++) sum += i;
  mainPort.send(sum); // Send result back
}

void main() async {
  final receivePort = ReceivePort();
  await Isolate.spawn(heavyTask, receivePort.sendPort);

  receivePort.listen((result) {
    print("Heavy task result: $result");
    receivePort.close();
  });
}
\`\`\`
`,
    contentAr: `### معمارية التزامن والتوازي في لغة دارت 🏎️

تعمل لغة دارت بنظام **أحادي الخيط (Single-Threaded)** بشكل أساسي، حيث تنفذ جميع الأكواد البرمجية داخل ما يسمى **حلقة الأحداث (Event Loop)**. هذا النموذج فعال جداً في واجهات المستخدم لأنه يلغي تماماً مشاكل التزامن وتضارب خيوط المعالجة المتعددة (Race Conditions).

#### 1. حلقة الأحداث (Event Loop)
تقوم حلقة الأحداث بمعالجة المدخلات مثل نقرات الشاشة، ورسم الإطارات، وردود الشبكة، والمؤقتات. وتقوم بجدولة المهام عبر طابورين:
*   **طابور المهام الدقيقة (Microtask Queue)**: مهام عالية الأهمية تعمل مباشرة فور انتهاء المهمة الحالية.
*   **طابور الأحداث (Event Queue)**: يحتوي على العمليات غير المتزامنة المعتادة (مثل طلبات الإنترنت والملفات والمؤقتات).

#### 2. المستقبلات وقنوات تدفق البيانات (Futures & Streams)
*   **Future**: يمثل قيمة منفردة ستتوفر لاحقاً بشكل غير متزامن.
*   **Stream**: يمثل تدفقاً مستمراً للبيانات يرسل قيماً متعددة بمرور الوقت.

#### 3. المعالجات المستقلة (Isolates)
إذا كنت بحاجة إلى معالجة عمليات برمجية معقدة وثقيلة تستهلك كامل المعالج (مثل فك ضغط ملفات ضخمة أو تعديل جودة الصور)، فإن تشغيلها على حلقة الأحداث سيجعل التطبيق يتجمد. لحل هذه المعضلة، تدعم دارت **الـ Isolates**.
الـ Isolates عبارة عن خيوط معالجة منفصلة تماماً **لا تشترك في الذاكرة العشوائية**. تعمل بالتوازي على نوى المعالج المختلفة وتتواصل فيما بينها حصراً عن طريق تبادل الرسائل من خلال المنافذ (Ports).

\`\`\`dart
import 'dart:isolate';

// تعمل هذه الدالة في Isolate منفصل تماماً دون مشاركة الذاكرة لحمايتها
void heavyTask(SendPort mainPort) {
  int sum = 0;
  for (int i = 0; i < 10000000; i++) sum += i;
  mainPort.send(sum); // إرسال النتيجة للخيط الرئيسي
}

void main() async {
  final receivePort = ReceivePort();
  await Isolate.spawn(heavyTask, receivePort.sendPort);

  receivePort.listen((result) {
    print("النتيجة من المعالج المستقل: $result");
    receivePort.close();
  });
}
\`\`\`
`,
    quiz: [
      {
        question: "How does Dart's thread model manage parallel processing without memory locking?",
        options: [
          "By employing synchronized blocks like Java",
          "By spawning Isolates, which run on separate threads and do not share memory",
          "By running all code inside the web browser compiler",
          "It does not support parallel processing"
        ],
        correctAnswer: 1,
        explanation: "Dart utilizes Isolates for concurrency. Because Isolates do not share memory, they require no synchronization mutexes or locks, preventing classic deadlock bugs."
      },
      {
        question: "Which queue has the higher execution priority in the Dart Event Loop?",
        options: [
          "The Event Queue",
          "The Isolate Port Queue",
          "The Microtask Queue",
          "They are executed simultaneously"
        ],
        correctAnswer: 2,
        explanation: "The Microtask Queue is always drained before the Event Queue begins processing tasks, ensuring high-priority internals run immediately."
      },
      {
        question: "What does a 'Future<String>' object represent?",
        options: [
          "A continuous stream of strings",
          "A compile-time static macro string",
          "A placeholder for a single string value that will be computed and returned asynchronously",
          "An encrypted secure string"
        ],
        correctAnswer: 2,
        explanation: "A Future represents a single asynchronous value (or error) that will complete at some point in the future."
      }
    ],
    quizAr: [
      {
        question: "كيف يدير نموذج التزامن في دارت المعالجة المتوازية دون الحاجة لإقفال الذاكرة والتعقيدات المتزامنة؟",
        options: [
          "باستخدام كتل المزامنة (synchronized blocks) كـ جافا",
          "عبر إنشاء كائنات Isolate تعمل على خيوط منفصلة ولا تشترك في الذاكرة",
          "بتشغيل كافة الأكواد داخل متصفح الإنترنت مباشرة",
          "دارت لا تدعم التوازي البرمجي مطلقاً"
        ],
        correctAnswer: 1,
        explanation: "تعتمد دارت على الـ Isolates. وبما أنها لا تتشارك نفس مساحة الذاكرة، فإنها لا تحتاج إلى أقفال تزامن، مما يحمي التطبيق من التجميد أو الموت البرمجي المتبادل."
      },
      {
        question: "أي طابور له أولوية التنفيذ الأعلى في حلقة الأحداث (Event Loop) الخاصة بـ دارت؟",
        options: [
          "طابور الأحداث (Event Queue)",
          "طابور منفذ الـ Isolate",
          "طابور المهام الدقيقة (Microtask Queue)",
          "يتم تنفيذهما معاً بالتوازي وفي نفس اللحظة"
        ],
        correctAnswer: 2,
        explanation: "يتم إفراغ طابور المهام الدقيقة (Microtask Queue) بالكامل دائماً قبل البدء في معالجة عناصر طابور الأحداث (Event Queue)."
      },
      {
        question: "ما الذي يمثله كائن من النوع 'Future<String>' في لغة دارت؟",
        options: [
          "تدفقاً مستمراً غير منقطع من النصوص",
          "قيمة نصية ثابتة تُعرف بالكامل وقت الترجمة",
          "قيمة نصية برمجية واحدة ستكتمل عمليات معالجتها وإرجاعها لاحقاً بشكل غير متزامن",
          "سلسلة نصية مشفرة بشكل فائق الأمان"
        ],
        correctAnswer: 2,
        explanation: "كائن Future يمثل وعاءً مؤقتاً لعملية غير متزامنة ستنتهي بإرجاع قيمة واحدة (أو رمي خطأ) لاحقاً وقت التشغيل."
      }
    ],
    challenge: {
      instruction: "Implement a function 'Future<int> fetchUserId()' that simulates a network request. It should return the integer 42 after waiting for 100 milliseconds using 'Future.delayed'.",
      starterCode: `import 'dart:async';

Future<int> fetchUserId() {
  // TODO: Wait 100 milliseconds and return 42
  return Future.value(0);
}`,
      sampleSolution: `import 'dart:async';

Future<int> fetchUserId() async {
  await Future.delayed(const Duration(milliseconds: 100));
  return 42;
}`,
      gradingCriteria: "The function must return a Future<int>, wait exactly 100 milliseconds asynchronously, and return 42.",
      localGraderRegex: ["Future<int> fetchUserId", "Future.delayed", "Duration(milliseconds:", "42"]
    },
    challengeAr: {
      instruction: "قم بتنفيذ دالة برمجية باسم 'Future<int> fetchUserId()' تحاكي طلباً شبكياً. يجب أن تعيد الدالة الرقم الصحيح 42 بعد الانتظار لمدة 100 مللي ثانية باستخدام 'Future.delayed'.",
      starterCode: `import 'dart:async';

Future<int> fetchUserId() {
  // TODO: انتظر 100 مللي ثانية وأرجع القيمة 42
  return Future.value(0);
}`,
      sampleSolution: `import 'dart:async';

Future<int> fetchUserId() async {
  await Future.delayed(const Duration(milliseconds: 100));
  return 42;
}`,
      gradingCriteria: "يجب أن ترجع الدالة Future<int>، وتقوم بعملية انتظار غير متزامنة لمدة 100 مللي ثانية، ثم تعيد القيمة 42.",
      localGraderRegex: ["Future<int> fetchUserId", "Future.delayed", "Duration(milliseconds:", "42"]
    }
  },
  {
    id: "step4",
    title: "Composition, Mixins & Extension Methods",
    titleAr: "التركيب، الفئات المختلطة وميزات الامتداد",
    description: "Learn advanced modular structures. Implement code reuse with Mixins and expand utility with clean Extension Methods.",
    descriptionAr: "تعلم الهياكل البرمجية المتقدمة لتقسيم الكود. أعد استخدام الشيفرات البرمجية بواسطة Mixins، ووسع فئاتك باستخدام امتدادات الدوال النظيفة.",
    goals: [
      "Compose rich modular classes using Mixins for behavior inheritance",
      "Avoid the classic 'multiple inheritance diamond problem'",
      "Add bespoke methods to existing framework classes via Extension Methods"
    ],
    goalsAr: [
      "تركيب فئات مرنة وقوية عبر دمج الخصائص والوظائف باستخدام الـ Mixins",
      "تجنب المشكلة التاريخية لتعدد الوراثة البرمجية (Diamond Problem)",
      "إضافة دوال مخصصة للفئات البرمجية الموجودة مسبقاً في النظام عبر امتدادات المنهج (Extension Methods)"
    ],
    content: `### Advanced Structural Composition 🧩

Dart favors modular composition. It resolves the classic problems of multiple inheritance using linear behavioral composition (Mixins) and lets you augment closed libraries using extension APIs.

#### 1. Mixins
Mixins allow a class to reuse code from multiple separate blocks without inheriting from them directly. Mixins are declared with the \`mixin\` keyword and applied using \`with\`. Dart resolves conflicts by sequentially stacking mixins from left to right, solving the famous diamond inheritance conflict.

#### 2. Extension Methods
Extension Methods allow you to add new functions to an existing class (even SDK classes like \`String\`, \`List\`, or \`int\`) without modifying the original class or creating a wrapper subclass.

\`\`\`dart
// Define a Mixin
mixin Encryption {
  String encrypt(String input) => input.split('').reversed.join();
}

// Attach Mixin to a Class
class SecureDatabase with Encryption {
  void savePassword(String raw) {
    String secure = encrypt(raw);
    print("Saving encrypted payload: $secure");
  }
}

// Define an Extension
extension NumberParsing on String {
  int parseInt() => int.parse(this);
}

void main() {
  final db = SecureDatabase();
  db.savePassword("admin123"); // Prints: 321nimda

  // Calling extension method directly on raw string
  int score = "100".parseInt();
  print(score + 50); // Prints: 150
}
\`\`\`
`,
    contentAr: `### دمج وتركيب الكود المتقدم 🧩

تفضل لغة دارت مرونة تركيب الكود الموديولي على الوراثة الصلبة. وهي تحل المشكلات التاريخية للوراثة المتعددة باستخدام نظام دمج السلوك الخطي (Mixins) وتتيح لك توسيع قدرات المكتبات المغلقة بسهولة فائقة.

#### 1. الفئات المختلطة (Mixins)
تسمح الـ Mixins للفئة بإعادة استخدام كود معين من كتل برمجية متعددة دون وراثة مباشرة. يتم الإعلان عن الـ Mixin بالكلمة المفتاحية \`mixin\` ويتم استخدامها وتطبيقها مع الفئات عبر الكلمة \`with\`. تقوم دارت بترتيب الـ Mixins بشكل خطي متراكم لحل تضارب التسميات تماماً.

#### 2. امتدادات الفئات (Extension Methods)
تتيح لك ميزة امتدادات الفئات إضافة دوال برمجية جديدة إلى فئات موجودة مسبقاً (حتى فئات النظام الأساسية مثل \`String\` أو \`List\` أو \`int\`) دون الحاجة لتعديل الفئة الأصلية أو إنشاء فئة فرعية موروثة منها.

\`\`\`dart
// تعريف Mixin خاص بالتشفير
mixin Encryption {
  String encrypt(String input) => input.split('').reversed.join();
}

// دمج الـ Mixin مع فئة جديدة
class SecureDatabase with Encryption {
  void savePassword(String raw) {
    String secure = encrypt(raw);
    print("جاري حفظ البيانات المشفرة: $secure");
  }
}

// تعريف امتداد لتحويل النصوص إلى أرقام
extension NumberParsing on String {
  int parseInt() => int.parse(this);
}

void main() {
  final db = SecureDatabase();
  db.savePassword("admin123"); // يطبع: 321nimda

  // استدعاء دالة الامتداد مباشرة على نص برمي
  int score = "100".parseInt();
  print(score + 50); // يطبع: 150
}
\`\`\`
`,
    quiz: [
      {
        question: "Which keyword is used to attach a Mixin to a class in Dart?",
        options: [
          "implements",
          "extends",
          "with",
          "mixin"
        ],
        correctAnswer: 2,
        explanation: "The 'with' keyword is used to apply one or more mixins to a class structure."
      },
      {
        question: "How do Extension Methods enhance object-oriented coding in Dart?",
        options: [
          "They compile client-side code directly into native WebAssembly",
          "They allow developer-defined methods to be added to existing, closed SDK classes",
          "They allow variables to accept null inputs dynamically",
          "They encrypt the runtime bytecode"
        ],
        correctAnswer: 1,
        explanation: "Extension Methods allow you to add functionality to existing types (like String, List, etc.) without modifying the original code or subclassing."
      },
      {
        question: "How does Dart solve the 'multiple inheritance diamond problem'?",
        options: [
          "By throwing a compile error whenever two classes share a function",
          "By strictly forbidding classes from having any fields",
          "By using mixins which are evaluated sequentially in a flat linear structure from left to right",
          "By enforcing runtime memory locks"
        ],
        correctAnswer: 2,
        explanation: "Dart uses mixins applied with a flat, linear execution order. If mixins share methods, the method on the rightmost mixin overrides those to its left, resolving all conflicts."
      }
    ],
    quizAr: [
      {
        question: "ما هي الكلمة المفتاحية المستخدمة لربط ودمج كائن Mixin مع فئة برمجية في دارت؟",
        options: [
          "implements",
          "extends",
          "with",
          "mixin"
        ],
        correctAnswer: 2,
        explanation: "تُستخدم الكلمة المفتاحية 'with' لإضافة ودمج كود الـ mixin أو أكثر داخل هيكلية الفئة الحالية."
      },
      {
        question: "كيف تعزز 'امتدادات الفئات' (Extension Methods) البرمجة كائنية التوجه في دارت؟",
        options: [
          "بتحويل الأكواد البرمجية مباشرة إلى لغة الآلة WebAssembly",
          "بالسماح للمطور بإضافة دوال جديدة لفئات جاهزة ومغلقة مسبقاً في النظام",
          "بتمكين المتغيرات من قبول القيم الفارغة بشكل ديناميكي",
          "بتشفير الكود البرمجي وقت التشغيل لمنع الاختراق"
        ],
        correctAnswer: 1,
        explanation: "تتيح امتدادات الفئات كتابة دوال مخصصة للمطور واستدعائها مباشرة على أنواع بيانات جاهزة في اللغة دون الحاجة لبنائها من الصفر."
      },
      {
        question: "كيف تحل لغة دارت مشكلة 'تعدد الوراثة المتبادل' (Diamond Problem)؟",
        options: [
          "برمي خطأ ترجمة صارم بمجرد اشتراك فئتين في دالة بنفس الاسم",
          "بمنع الفئات البرمجية من امتلاك أي حقول برمجية داخلها",
          "عبر توظيف الـ mixins التي تُرتب وتُنفذ خطياً من اليسار إلى اليمين",
          "بفرض أقفال على الذاكرة العشوائية وقت التشغيل"
        ],
        correctAnswer: 2,
        explanation: "تعتمد دارت على معالجة خطية مسطحة لترتيب دمج الـ Mixins. إذا تكرر اسم الدالة، فإن الـ mixin المكتوب أقصى اليمين يتجاوز ما قبله، مما يزيل التضارب تماماً."
      }
    ],
    challenge: {
      instruction: "Create a mixin named 'Logger' with a method 'void logInfo(String message)' that prints the message. Then, write a class 'AuthService' that applies the 'Logger' mixin using the 'with' keyword.",
      starterCode: `// TODO: Define the Logger mixin and the AuthService class using it
`,
      sampleSolution: `mixin Logger {
  void logInfo(String message) {
    print(message);
  }
}

class AuthService with Logger {}`,
      gradingCriteria: "The code must define 'mixin Logger' with a method 'logInfo' and declare a class 'AuthService with Logger'.",
      localGraderRegex: ["mixin Logger", "void logInfo", "class AuthService with Logger"]
    },
    challengeAr: {
      instruction: "قم بإنشاء فئة مختلطة (mixin) باسم 'Logger' تحتوي على دالة برمجية 'void logInfo(String message)' تقوم بطباعة الرسالة المرسلة. ثم اكتب فئة باسم 'AuthService' تدمج الـ mixin المذكور باستخدام الكلمة 'with'.",
      starterCode: `// TODO: قم بتعريف الـ mixin باسم Logger وفئة AuthService التي تستخدمه هنا
`,
      sampleSolution: `mixin Logger {
  void logInfo(String message) {
    print(message);
  }
}

class AuthService with Logger {}`,
      gradingCriteria: "يجب تعريف mixin باسم Logger يحتوي على الدالة logInfo، وفئة AuthService المدمجة معه باستخدام الكلمة with.",
      localGraderRegex: ["mixin Logger", "void logInfo", "class AuthService with Logger"]
    }
  },
  {
    id: "step5",
    title: "Flutter Declarative UI, Lifecycles & Context",
    titleAr: "واجهات فلاتر التصريحية، دورات الحياة وسياق البناء",
    description: "Deep dive into Flutter's declarative layout system. Master the Stateless and Stateful widget lifecycles, and understand BuildContext and the Three Trees.",
    descriptionAr: "تعمق في نظام التصميم التصريحي في فلاتر. احترف دورات حياة الأدوات الثابتة والتفاعلية، وافهم سياق البناء (BuildContext) والأشجار الثلاثة للواجهة.",
    goals: [
      "Explain the declarative UI paradigm: UI is a function of State: f(State)",
      "Master Stateful Widget lifecycle methods (initState, didChangeDependencies, dispose)",
      "Understand how BuildContext traverses the Widget, Element, and Render trees"
    ],
    goalsAr: [
      "فهم وتطبيق نموذج الواجهات التصريحية: واجهة المستخدم هي دالة للحالة: UI = f(State)",
      "احتراف دوال دورة حياة الـ StatefulWidget (مثل initState و didChangeDependencies و dispose)",
      "فهم طبيعة عمل BuildContext وكيفية تنقله عبر أشجار الـ Widget والـ Element والـ Render"
    ],
    content: `### Flutter Declarative Rendering Framework 🌳

In native Android (Java/XML) or iOS (Objective-C/UIKit), the UI is imperative. You fetch a reference to a text box and mutate it (\`textView.setText("Hello")\`). 

Flutter operates on a **Declarative UI Paradigm**. You declare how your UI looks based on the current application state. When state changes, the framework re-evaluates the layout automatically: \`UI = f(State)\`.

#### 1. The Three Trees of Flutter
To maintain high performance (60/120 FPS), Flutter manages three parallel hierarchies:
*   **Widget Tree**: Extremely lightweight configurations. Destroyed and rebuilt constantly on every state change.
*   **Element Tree**: Logical managers. They orchestrate and map widgets to the physical pixels, maintaining state persistence when widgets are rebuilt.
*   **Render Tree**: The actual heavy-lifters. They perform math for sizes, margins, and paint vectors onto the screen.

#### 2. Stateful Widget Lifecycle
Stateful widgets are managed by a persistent \`State\` class, which features a highly structured lifecycle:
1.  **initState()**: Executed exactly once. Ideal for setup, loading network tokens, and initializing controllers.
2.  **didChangeDependencies()**: Runs immediately after \`initState\` and whenever inherited models update.
3.  **build()**: Called repeatedly to construct the Widget configurations.
4.  **dispose()**: Executed once when the widget leaves the tree. You **must** release resources, timers, and controllers here to prevent memory leaks.

#### 3. BuildContext
\`BuildContext\` is the element representing your widget in the element tree. It tells the widget where it is situated in the parent hierarchy, allowing it to lookup state providers and themes.

\`\`\`dart
import 'package:flutter/material.dart';

class CounterWidget extends StatefulWidget {
  const CounterWidget({super.key});

  @override
  State<CounterWidget> createState() => _CounterWidgetState();
}

class _CounterWidgetState extends State<CounterWidget> {
  int _counter = 0;

  @override
  void initState() {
    super.initState();
    print("Widget born into the tree!");
  }

  @override
  void dispose() {
    print("Widget leaving the tree, releasing controllers...");
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text("Count: $_counter"),
        ElevatedButton(
          onPressed: () => setState(() => _counter++),
          child: const Text("Increment"),
        ),
      ],
    );
  }
}
\`\`\`
`,
    contentAr: `### إطار العمل التصريحي لبناء وعرض الواجهات في فلاتر 🌳

في بيئات تطوير الأندرويد والآي أو إس التقليدية، تتبع الواجهات الأسلوب الإمرائي (Imperative). حيث تجلب مرجعاً لمربع النص ثم تعدل قيمته يدوياً (\`textView.setText("Hello")\`).

أما فلاتر فتعمل بـ **نموذج الواجهة التصريحي (Declarative UI Paradigm)**. أنت تصف كيف يجب أن تبدو الشاشة بناءً على الحالة الحالية للبرنامج (State). وعندما تتغير الحالة، يقوم النظام بإعادة حساب الواجهة تلقائياً: \`UI = f(State)\`.

#### 1. الأشجار الثلاثة في فلاتر (The Three Trees)
لتحقيق أداء فائق وسرعة عرض فائقة (60 أو 120 إطاراً بالثانية)، تدير فلاتر ثلاثة تسلسلات هرمية متوازية خلف الكواليس:
*   **شجرة الواجهات (Widget Tree)**: تكوينات خفيفة الوزن للغاية ورخيصة البناء. يتم إنشاؤها وتدميرها باستمرار مع كل تحديث للحالة.
*   **شجرة العناصر (Element Tree)**: المدراء المنطقيون للواجهات. تقوم هذه الشجرة بربط وتنسيق الواجهات المؤقتة مع البكسلات الحقيقية، وهي المسؤولة عن تذكر وحفظ الحالات وقت البناء المتكرر.
*   **شجرة الرسم (Render Tree)**: المكونات الفنية الحقيقية. تقوم بحساب المساحات، الهوامش، ورسم الخطوط والأشكال الهندسية والرسومية على الشاشة فعلياً.

#### 2. دورة حياة الـ Stateful Widget
يتم إدارة الـ StatefulWidget بواسطة فئة \`State\` مستمرة في الذاكرة وتخضع لدورة حياة بالغة الدقة:
1.  **initState()**: تُستدعى مرة واحدة فقط عند ولادة المكون. المكان الأمثل لتهيئة البيانات، وإعداد الاتصالات الأولية.
2.  **didChangeDependencies()**: تعمل مباشرة بعد التهيئة الأولى، وتُستدعى تلقائياً كلما تم تحديث النماذج والسمات الموروثة المشتركة.
3.  **build()**: تُستدعى مراراً وتكراراً لرسم وتركيب الواجهات ووصف هيكلها الحالي.
4.  **dispose()**: تُستدعى مرة واحدة فقط عند مغادرة المكون للهيكل تماماً. **يجب** عليك هنا تفكيك المؤقتات وإلغاء تهيئة المتحكمات لتجنب أي تسريب للذاكرة.

#### 3. سياق البناء (BuildContext)
يمثل \`BuildContext\` عنوان المكون الحالي ومكانه وموقعه داخل شجرة العناصر. وهو يتيح للمكون البحث البرمجي عن الأنماط والتنسيقات ونماذج البيانات الموجودة في الفئات الأعلى منه في شجرة الواجهات.

\`\`\`dart
import 'package:flutter/material.dart';

class CounterWidget extends StatefulWidget {
  const CounterWidget({super.key});

  @override
  State<CounterWidget> createState() => _CounterWidgetState();
}

class _CounterWidgetState extends State<CounterWidget> {
  int _counter = 0;

  @override
  void initState() {
    super.initState();
    print("ولادة المكون في شجرة العناصر!");
  }

  @override
  void dispose() {
    print("المكون يغادر الشجرة، جاري إغلاق وتفكيك المتحكمات البرمجية...");
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text("الرقم الحالي: $_counter"),
        ElevatedButton(
          onPressed: () => setState(() => _counter++),
          child: const Text("زيادة العداد"),
        ),
      ],
    );
  }
}
\`\`\`
`,
    quiz: [
      {
        question: "In Flutter's rendering architecture, what are the 'Three Trees' managed by the framework?",
        options: [
          "Java Tree, XML Tree, C++ Compiler Tree",
          "Widget Tree, Element Tree, RenderObject Tree",
          "Stateful Tree, Stateless Tree, Inherited Tree",
          "Layout Tree, Paint Tree, Event Tree"
        ],
        correctAnswer: 1,
        explanation: "Flutter uses the Widget Tree (declarative blueprint), Element Tree (structural manager/state repository), and RenderObject Tree (physical layout and rendering operations) to drive maximum frame rates."
      },
      {
        question: "Which lifecycle method in a State class is the single best location to release controllers and timers?",
        options: [
          "initState()",
          "didChangeDependencies()",
          "dispose()",
          "build()"
        ],
        correctAnswer: 2,
        explanation: "The dispose() method is called when the widget is permanently removed from the tree. Failing to cancel stream subscriptions and controller objects here results in persistent memory leaks."
      },
      {
        question: "What does 'BuildContext' represent?",
        options: [
          "The compiled machine code of the application",
          "A widget's unique position handle and handle token in the overall Element Tree",
          "The main background threat loop",
          "An external configuration file"
        ],
        correctAnswer: 1,
        explanation: "BuildContext is the handle to the location of the widget in the Element Tree, which is passed to the build() method so it can traverse up/down the hierarchy."
      }
    ],
    quizAr: [
      {
        question: "في معمارية عرض ورسم الواجهات في فلاتر، ما هي 'الأشجار الثلاثة' التي يديرها النظام لضمان الأداء الفائق؟",
        options: [
          "شجرة جافا، شجرة XML، شجرة مترجم C++",
          "شجرة الواجهات (Widget)، شجرة العناصر (Element)، شجرة كائنات الرسم (RenderObject)",
          "الشجرة التفاعلية، الشجرة الساكنة، الشجرة الموروثة",
          "شجرة التنسيق، شجرة الطلاء، شجرة الأحداث والمدخلات"
        ],
        correctAnswer: 1,
        explanation: "تدير فلاتر شجرة الواجهات (مخطط وصفي)، شجرة العناصر (مدير هيكلي لحفظ الحالة)، وشجرة الرسم (الحسابات الهندسية ورسم الأشكال) لإتاحة التحديثات الخاطفة بمرونة عالية."
      },
      {
        question: "ما هي الدالة الأنسب والوحيدة في دورة حياة المكون تفريغ وإغلاق المتحكمات والاشتراكات والمؤقتات لتفادي تسريب الذاكرة؟",
        options: [
          "initState()",
          "didChangeDependencies()",
          "dispose()",
          "build()"
        ],
        correctAnswer: 2,
        explanation: "تُستدعى دالة dispose() عند إزالة المكون نهائياً من الشجرة. إهمال التخلص من الاشتراكات المفتوحة والمتحكمات بداخلها يسبب تسريباً واستهلاكاً مستمراً لذاكرة الهاتف."
      },
      {
        question: "ما الذي يمثله مفهوم 'سياق البناء' (BuildContext) في فلاتر؟",
        options: [
          "الأكواد والملفات الثنائية والمترجمة للتطبيق بالكامل",
          "مقبض المكون وموقعه الدقيق داخل شجرة العناصر الهيكلية الكلية",
          "الخيط الخلفي الرئيسي لمعالجة البيانات غير المتزامنة",
          "ملف تكوين إعدادات خارجي خاص بالمحاكي"
        ],
        correctAnswer: 1,
        explanation: "يمثل BuildContext عنوان المكون وموقعه داخل شجرة العناصر، ويُمرر لدالة البناء لتمكينه من تحديد الأنماط وتوفير سياق البحث داخل التطبيق."
      }
    ],
    challenge: {
      instruction: "Draft a basic 'StatelessWidget' class named 'BannerWidget' that accepts a final 'String title' field. The build method should return an 'Align' widget with alignment set to 'Alignment.center' and containing a 'Text(title)' widget.",
      starterCode: `import 'package:flutter/material.dart';

// TODO: Create the BannerWidget class extending StatelessWidget
`,
      sampleSolution: `import 'package:flutter/material.dart';

class BannerWidget extends StatelessWidget {
  final String title;

  const BannerWidget({super.key, required this.title});

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment.center,
      child: Text(title),
    );
  }
}`,
      gradingCriteria: "The class must extend StatelessWidget, declare a final String title parameter, and return an Align widget with Alignment.center wrapping a Text widget inside the build method.",
      localGraderRegex: ["class BannerWidget extends StatelessWidget", "final String title", "Widget build", "Align", "Alignment.center", "Text(title)"]
    },
    challengeAr: {
      instruction: "اكتب فئة برمجية لـ 'StatelessWidget' مخصص باسم 'BannerWidget' يستقبل معاملاً نهائياً باسم 'String title'. يجب أن تعيد دالة البناء (build) مكوناً من نوع 'Align' بمحاذاة مضبوطة على الوسط 'Alignment.center' ويحتوي بداخله على مكون 'Text(title)'.",
      starterCode: `import 'package:flutter/material.dart';

// TODO: قم بكتابة فئة BannerWidget الموروثة من StatelessWidget هنا
`,
      sampleSolution: `import 'package:flutter/material.dart';

class BannerWidget extends StatelessWidget {
  final String title;

  const BannerWidget({super.key, required this.title});

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment.center,
      child: Text(title),
    );
  }
}`,
      gradingCriteria: "يجب وراثة StatelessWidget لـ BannerWidget، مع تعريف حقل title النهائي، واستخدام Align وضبط محاذاته للوسط وبداخله نص.",
      localGraderRegex: ["class BannerWidget extends StatelessWidget", "final String title", "Widget build", "Align", "Alignment.center", "Text(title)"]
    }
  },
  {
    id: "step6",
    title: "High-Performance List Rendering & Scroll Control",
    titleAr: "عرض القوائم عالي الأداء ومتحكمات التمرير",
    description: "Learn list rendering optimization. Master ListView.builder lazy viewport recycling and scroll state tracking.",
    descriptionAr: "تعلم طرق تحسين أداء القوائم المعقدة وضبطها. احترف التدوير التلقائي للذاكرة عبر ListView.builder ومراقبة التمرير الذكي.",
    goals: [
      "Explain viewport recycling and lazy item compilation in ListView.builder",
      "Avoid memory freezing caused by nested list calculations",
      "Implement ScrollControllers to build 'scroll-to-top' shortcuts and bottom-detection triggers"
    ],
    goalsAr: [
      "فهم وتطبيق آليات إعادة استخدام العناصر (Recycling) والتحميل الكسول في ListView.builder",
      "تجنب بطء وتجمد الذاكرة الناتج عن حسابات القوائم المتداخلة غير المنسقة",
      "توظيف متحكمات التمرير (ScrollControllers) لبناء أزرار القفز للأعلى وتتبع الوصول لنهاية القوائم"
    ],
    content: `### High-Performance Infinite Scroll Optimization 📱

Rendering a static list of 1,000 components in native software is highly expensive and often freezes client hardware. Flutter solves this issue by lazy compile virtualization.

#### 1. ListView.builder Recycler Mechanism
Unlike a standard column or row, \`ListView.builder\` does not build all elements at once. It compiles and allocates resources **only for widgets currently visible in the screen's viewport** (plus a small cache margin). 
As list items scroll out of view, their physical Element containers are recycled for newly entering items.

#### 2. Optimization Rules:
*   **Never set \`shrinkWrap: true\` in deep lists**: This disables virtualization by forcing Flutter to calculate the height of all items in advance, completely destroying performance.
*   **Always provide accurate \`itemExtent\` or \`prototypeItem\`** if items have fixed dimensions, enabling Flutter to compute list dimensions instantly.

#### 3. ScrollController
\`ScrollController\` tracks active scroll offset positions, allowing you to trigger reactive loads (e.g., infinite scrolling) or display scroll action buttons:

\`\`\`dart
class LogView extends StatefulWidget {
  const LogView({super.key});

  @override
  State<LogView> createState() => _LogViewState();
}

class _LogViewState extends State<LogView> {
  final ScrollController _scrollController = ScrollController();

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(() {
      if (_scrollController.position.atEdge) {
        if (_scrollController.position.pixels != 0) {
          print("Reached the bottom of the scroll viewport! Loading more elements...");
        }
      }
    });
  }

  @override
  void dispose() {
    _scrollController.dispose(); // Always release!
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      controller: _scrollController,
      itemCount: 500,
      itemBuilder: (context, index) {
        return ListTile(
          title: Text("Log Item #$index"),
        );
      },
    );
  }
}
\`\`\`
`,
    contentAr: `### تكنولوجيا تحسين أداء التمرير اللانهائي 📱

يعتبر بناء قائمة من 1,000 مكون دفعة واحدة أمراً مكلفاً للغاية للبطارية والمعالج في الأجهزة الذكية ويسبب تجمداً فورياً للشاشة. تقدم فلاتر حلاً جذرياً عبر تقنية المحاكاة الافتراضية والتحميل الكسول.

#### 1. آلية التدوير في ListView.builder
على عكس المكونات العادية، لا يقوم \`ListView.builder\` بإنشاء جميع العناصر دفعة واحدة. بل يترجم ويخصص الذاكرة **فقط للعناصر المرئية على الشاشة حالياً** (مع هامش تخزين مؤقت بسيط جداً).
وعندما يختفي عنصر خارج حدود الشاشة، يتم تدوير هيكله وحاويته البرمجية مباشرة لإعادة استخدامها لعرض العنصر الجديد القادم، مما يحافظ على ثبات استهلاك الذاكرة العشوائية.

#### 2. قواعد تحسين الأداء الصارمة:
*   **تجنب ضبط \`shrinkWrap: true\` في القوائم الطويلة والضخمة**: هذا الخيار يلغي آلية المحاكاة الافتراضية والكسل، حيث يجبر فلاتر على قياس وحساب طول كافة العناصر الـ 1,000 مسبقاً، مما يتلف الأداء تماماً.
*   **قم دائماً بتحديد \`itemExtent\` أو \`prototypeItem\`** إذا كانت أطوال العناصر في القائمة ثابتة وموحدة، مما يسمح لفلاتر بحساب المسافات بسرعة مذهلة.

#### 3. متحكم التمرير (ScrollController)
يتيح لك \`ScrollController\` تتبع إحداثيات ومستوى التمرير الحالي، وهو ضروري للغاية لتحميل المزيد من البيانات تلقائياً (Infinite Scrolling) أو إظهار أزرار التحكم بالتنقل:

\`\`\`dart
class LogView extends StatefulWidget {
  const LogView({super.key});

  @override
  State<LogView> createState() => _LogViewState();
}

class _LogViewState extends State<LogView> {
  final ScrollController _scrollController = ScrollController();

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(() {
      if (_scrollController.position.atEdge) {
        if (_scrollController.position.pixels != 0) {
          print("تم الوصول لنهاية القائمة! جاري تحميل المزيد من السجلات...");
        }
      }
    });
  }

  @override
  void dispose() {
    _scrollController.dispose(); // يجب تفكيكه دائماً!
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      controller: _scrollController,
      itemCount: 500,
      itemBuilder: (context, index) {
        return ListTile(
          title: Text("سجل رقم #$index"),
        );
      },
    );
  }
}
\`\`\`
`,
    quiz: [
      {
        question: "Why does using 'shrinkWrap: true' inside a ListView with thousands of items damage performance?",
        options: [
          "It forces the compiler to run on a background thread",
          "It disables lazy item virtualization and forces Flutter to pre-calculate the heights of all items",
          "It converts the screen rendering into static raw bitmaps",
          "It triggers immediate garbage collection loops"
        ],
        correctAnswer: 1,
        explanation: "Using shrinkWrap: true tells the parent scroll view that the ListView wants to calculate its aggregate height, which completely breaks lazy viewport rendering and forces physical initialization of all items."
      },
      {
        question: "What is the primary role of an element 'itemBuilder' in 'ListView.builder'?",
        options: [
          "To sort the input data collection based on alphabetical ordering",
          "To serve as a template that builds and retrieves widgets dynamically for the current viewport offset",
          "To establish network connection rules",
          "To convert widgets into database schemas"
        ],
        correctAnswer: 1,
        explanation: "The itemBuilder is a lazy callback executed only when the framework determines that a specific index is about to enter the viewport, saving immense memory."
      },
      {
        question: "Why must you invoke '.dispose()' on an active 'ScrollController'?",
        options: [
          "To update the user's cached level",
          "To allow the operating system to clear memory leaks, as ScrollControllers register persistent listeners",
          "To encrypt the application's local database keys",
          "It is not required"
        ],
        correctAnswer: 1,
        explanation: "ScrollControllers hold internal references to native listeners. Failing to dispose of them leaves dangling observers, resulting in major memory leaks."
      }
    ],
    quizAr: [
      {
        question: "لماذا يتسبب تفعيل 'shrinkWrap: true' داخل أداة ListView تحتوي على آلاف العناصر في إلحاق ضرر فادح بأداء التطبيق؟",
        options: [
          "لأنه يجبر المترجم على التشغيل في خيط خلفي مستقل ومعزول",
          "لأنه يعطل ميزة التحميل الافتراضي الكسول ويجبر فلاتر على حساب أبعاد وارتفاعات جميع العناصر دفعة واحدة مسبقاً",
          "لأنه يحول رسم الشاشة بأكمله إلى بكسلات نقطية ثابتة وغير تفاعلية",
          "لأنه يشغل عمليات تنظيف الذاكرة العشوائية بشكل مفرط"
        ],
        correctAnswer: 1,
        explanation: "استخدام shrinkWrap: true يعني إخبار المكون الأب بأن القائمة تريد حساب مجموع أطوال كافة عناصرها دفعة واحدة، مما يلغي تماماً المحاكاة الافتراضية للأداء."
      },
      {
        question: "ما هو الدور الأساسي لمعامل 'itemBuilder' داخل مكون القوائم الذكي 'ListView.builder'؟",
        options: [
          "فرز مصفوفة البيانات المدخلة ترتيباً تصاعدياً أو أبجدياً",
          "العمل كدالة استدعاء خلفية تبني وتعيد المكونات ديناميكياً فقط للمساحة المعروضة حالياً على الشاشة",
          "إنشاء قواعد الاتصال السحابية والأمنية للتطبيق",
          "تحويل واجهات المستخدم إلى جداول في قواعد البيانات"
        ],
        correctAnswer: 1,
        explanation: "دالة itemBuilder تُستدعى فقط وبشكل كسول عندما يقرر النظام أن العنصر ذو الفهرس (Index) المحدد على وشك الدخول والظهور في واجهة المستخدم الحالية."
      },
      {
        question: "لماذا يتوجب عليك استدعاء دالة التفكيك '.dispose()' على كائن 'ScrollController' النشط؟",
        options: [
          "لتحديث بيانات الجلسة وسجلات المستخدم الحالية في المتصفح",
          "للسماح لنظام التشغيل بتحرير الذاكرة لمنع تسريبات الذاكرة لأن المتحكم يسجل مستمعين مستمرين في الذاكرة",
          "لتشفير مفاتيح قاعدة البيانات المحلية والاتصال",
          "هذه الخطوة اختيارية ولا حاجة للقيام بها على الإطلاق"
        ],
        correctAnswer: 1,
        explanation: "متحكم التمرير يحتفظ بمستمعين هيكليين في نظام التشغيل. وإذا غادرت الصفحة دون تدميره عبر dispose()، فستبقى هذه المستمعات نشطة وتلتهم الذاكرة العشوائية."
      }
    ],
    challenge: {
      instruction: "Write a short 'itemBuilder' function fragment that accepts '(context, index)'. It should return a 'ListTile' widget with 'title' set to 'Text(\"Item $index\")'.",
      starterCode: `Widget myItemBuilder(BuildContext context, int index) {
  // TODO: Return a ListTile with title set to Text("Item $index")
  return Container();
}`,
      sampleSolution: `Widget myItemBuilder(BuildContext context, int index) {
  return ListTile(
    title: Text("Item $index"),
  );
}`,
      gradingCriteria: "Must return a ListTile widget where title is a Text containing 'Item $index'.",
      localGraderRegex: ["ListTile", "title", "Text", "Item $index"]
    },
    challengeAr: {
      instruction: "اكتب دالة مبسطة لمعامل 'itemBuilder' تستقبل المعاملات '(context, index)'. يجب أن ترجع الدالة أداة 'ListTile' تحتوي على حقل 'title' مضبوط على كائن النص 'Text(\"Item $index\")'.",
      starterCode: `Widget myItemBuilder(BuildContext context, int index) {
  // TODO: قم بإرجاع ListTile يحمل العنوان المطلوب هنا
  return Container();
}`,
      sampleSolution: `Widget myItemBuilder(BuildContext context, int index) {
  return ListTile(
    title: Text("Item $index"),
  );
}`,
      gradingCriteria: "يجب إرجاع ListTile يحتوي على Text وبداخله نص منسق بالفهرس Item $index.",
      localGraderRegex: ["ListTile", "title", "Text", "Item $index"]
    }
  },
  {
    id: "step7",
    title: "Reactive State & StreamBuilder Pipelines",
    titleAr: "إدارة الحالة التفاعلية وبناء الواجهات المعتمدة على الـ Streams",
    description: "Map raw data pipelines directly to widgets! Understand Dart streams and build responsive interfaces using StreamBuilder.",
    descriptionAr: "اربط قنوات البيانات المتدفقة بالواجهات السحابية مباشرة! تعلم مفهوم الـ Streams واستخدم StreamBuilder لإعادة بناء الواجهات فوراً وبذكاء.",
    goals: [
      "Explain the reactive pattern and how Streams power active Firestore or local databases",
      "Configure StreamBuilder to automatically construct views whenever backend inputs update",
      "Manage loading states, offline connections, and empty collection snapshots safely"
    ],
    goalsAr: [
      "فهم النموذج التفاعلي وكيف تشغل قنوات الـ Streams قواعد البيانات الحية وسحابية",
      "إعداد مكون StreamBuilder لإعادة بناء الشاشات فوراً عند ورود أي بيانات جديدة من الشبكة",
      "التحكم الآمن بحالات التحميل، وانقطاع الاتصال، وتمرير الرسائل واللقطات الفارغة بشكل هندسي صحيح"
    ],
    content: `### Wire Up the Reactive Pipeline 🌊

Polling the server for new records is highly inefficient. Instead, we open a continuous reactive channel. Dart provides native support for these asynchronous data pipelines via **Streams**.

#### Concept Design:
*   **Reactive Flow**: Instead of manually triggering \`setState\` on every database update, your UI subscribes to a Stream of updates.
*   **Dart StreamBuilder**: A built-in, highly-optimized widget that subscribes to a stream, listens for incoming packets, translates connection states, and **automatically disposes of listeners** when the widget leaves the hierarchy!

\`\`\`dart
StreamBuilder<List<String>>(
  stream: chatService.streamMessages(),
  builder: (context, snapshot) {
    if (snapshot.connectionState == ConnectionState.waiting) {
      return const Center(child: CircularProgressIndicator());
    }
    if (snapshot.hasError) {
      return Text("Error loading stream: \${snapshot.error}");
    }
    
    final messages = snapshot.data ?? [];
    return ListView.builder(
      itemCount: messages.length,
      itemBuilder: (context, index) => Text(messages[index]),
    );
  },
)
\`\`\`
`,
    contentAr: `### ربط خطوط وقنوات البيانات الفورية التفاعلية 🌊

عمليات سحب التحديثات المتكررة من الخادم (Polling) غير فعالة تماماً. بدلاً من ذلك، نفتح قناة تفاعلية حية حقيقية. تقدم دارت دعماً أصيلاً للتعامل مع هذه القنوات عبر **الـ Streams**.

#### الهيكل البرمجي التفاعلي:
*   **التدفق التفاعلي**: بدلاً من كتابة دوال يدوية لتحديث الحالات واستدعاء \`setState\` عند وصول أي سجل سحابي جديد، تشترك شاشاتك في قناة تدفق مباشرة.
*   **أداة StreamBuilder**: مكون أصيل مدمج فائق الأداء يتولى فتح الاشتراك في الـ Stream، ومعالجة حالات الاتصال المختلفة، و**إلغاء الاشتراكات ذاتياً** وبأمان عند تدمير المكون أو مغادرته الشاشة!

\`\`\`dart
StreamBuilder<List<String>>(
  stream: chatService.streamMessages(),
  builder: (context, snapshot) {
    if (snapshot.connectionState == ConnectionState.waiting) {
      return const Center(child: CircularProgressIndicator());
    }
    if (snapshot.hasError) {
      return Text("حدث خطأ أثناء تحميل البيانات: \${snapshot.error}");
    }
    
    final messages = snapshot.data ?? [];
    return ListView.builder(
      itemCount: messages.length,
      itemBuilder: (context, index) => Text(messages[index]),
    );
  },
)
\`\`\`
`,
    quiz: [
      {
        question: "What built-in Flutter widget subscribes to a Stream and automatically updates the UI on every data emission?",
        options: [
          "FutureBuilder",
          "StreamBuilder",
          "StateBuilder",
          "IsolateBuilder"
        ],
        correctAnswer: 1,
        explanation: "StreamBuilder is custom-designed for continuous, multi-result streams. FutureBuilder is optimized for a single future value resolver."
      },
      {
        question: "How does StreamBuilder prevent memory leaks when a widget is removed from the screen?",
        options: [
          "It requests a system GC command",
          "It automatically cancels its internal subscription inside its deactivate/dispose lifecycle routines",
          "It shuts down the client connection completely",
          "It does not handle memory leaks"
        ],
        correctAnswer: 1,
        explanation: "StreamBuilder completely manages its own lifecycle, ensuring that when the widget is unmounted, its background stream listeners are cleanly closed."
      },
      {
        question: "Which Snapshot property helps verify if the asynchronous stream channel is still establishing its first connection?",
        options: [
          "snapshot.connectionState",
          "snapshot.isConnecting",
          "snapshot.activeStatus",
          "snapshot.streamReady"
        ],
        correctAnswer: 0,
        explanation: "The connectionState property holds enum values like ConnectionState.waiting, ConnectionState.active, or ConnectionState.done to tell you the channel's status."
      }
    ],
    quizAr: [
      {
        question: "ما هو المكون الأصيل المدمج في فلاتر الذي يستمع لقنوات الـ Stream ويعيد بناء الشاشة فور وصول أي قيمة جديدة؟",
        options: [
          "FutureBuilder",
          "StreamBuilder",
          "StateBuilder",
          "IsolateBuilder"
        ],
        correctAnswer: 1,
        explanation: "مكون StreamBuilder مصمم خصيصاً للاستماع لقنوات البيانات المتتابعة والمستمرة، بينما FutureBuilder يتعامل مع المستقبلات أحادية القيمة."
      },
      {
        question: "كيف يمنع الـ StreamBuilder تسريب ذاكرة الهاتف عند إزالة المكون البرمجي أو الانتقال لصفحة أخرى؟",
        options: [
          "بطلب استدعاء أمر تنظيف الذاكرة المباشر من المعالج",
          "يقوم تلقائياً وبشكل ذاتي بإلغاء اشتراكه الداخلي في قنوات التدفق فور مغادرته الشاشة",
          "بقطع اتصالات الإنترنت بالكامل عن التطبيق",
          "لا يعالج تسريبات الذاكرة ويتطلب من المطور كتابة أكواد تفكيك وإلغاء معقدة"
        ],
        correctAnswer: 1,
        explanation: "يتميز الـ StreamBuilder بإدارة ذاتية كاملة، حيث يقوم بفصل وتفكيك اشتراكات الاستماع للشبكة تلقائياً فور فك المكون ومغادرته الهيكل."
      },
      {
        question: "أي الخصائص في كائن اللقطة (snapshot) تساعد في تتبع ما إذا كانت قناة الاتصال لا تزال قيد التأسيس الأولي؟",
        options: [
          "snapshot.connectionState",
          "snapshot.isConnecting",
          "snapshot.activeStatus",
          "snapshot.streamReady"
        ],
        correctAnswer: 0,
        explanation: "الخاصية connectionState تحمل حالات واضحة عبر العدادات (Enum) مثل ConnectionState.waiting لتحديد حالة خط الاتصال حالياً."
      }
    ],
    challenge: {
      instruction: "Draft a Dart function 'Stream<int> doubleNumbers(Stream<int> input)' that takes a 'Stream<int>' and returns a modified stream where every integer is multiplied by 2 using the '.map()' operator.",
      starterCode: `import 'dart:async';

Stream<int> doubleNumbers(Stream<int> input) {
  // TODO: Use input.map to multiply values by 2
  return input;
}`,
      sampleSolution: `import 'dart:async';

Stream<int> doubleNumbers(Stream<int> input) {
  return input.map((val) => val * 2);
}`,
      gradingCriteria: "The function must return a Stream<int>, use the .map operator, and multiply values by 2.",
      localGraderRegex: ["Stream<int> doubleNumbers", "input.map", "val * 2"]
    },
    challengeAr: {
      instruction: "اكتب دالة برمجية بلغة دارت باسم 'Stream<int> doubleNumbers(Stream<int> input)' تستقبل قناة أرقام Stream<int> وترجع تدفقاً معدلاً يتم فيه مضاعفة قيم الأرقام (ضربها في 2) باستخدام دالة التحويل الخريطي '.map()'.",
      starterCode: `import 'dart:async';

Stream<int> doubleNumbers(Stream<int> input) {
  // TODO: استخدم دالة map لمضاعفة القيم الوداردة هنا
  return input;
}`,
      sampleSolution: `import 'dart:async';

Stream<int> doubleNumbers(Stream<int> input) {
  return input.map((val) => val * 2);
}`,
      gradingCriteria: "يجب أن تعيد الدالة Stream<int> وتوظف عامل map لمضاعفة الأعداد الواردة بضربها في القيمة 2.",
      localGraderRegex: ["Stream<int> doubleNumbers", "input.map", "val * 2"]
    }
  },
  {
    id: "step8",
    title: "Production Compilation, Security Obfuscation & App Signing",
    titleAr: "بناء وتجميع الإنتاج، تشفير الكود والتوقيع الإلكتروني للمتاجر",
    description: "Submit your app to stores. Learn cryptographic release Keystores, Proguard/R8 code obfuscation, and compiling Android App Bundles (.aab).",
    descriptionAr: "انطلق بتطبيقك للعالم! تعلم كيفية إعداد مفاتيح التوقيع الرقمي Keystores، وتشفير الأكواد ضد الاختراق عبر R8/Proguard، وبناء حزم .aab للمتاجر.",
    goals: [
      "Configure unique App Bundling identifiers in Gradle build files",
      "Generate cryptographic Keystores to verify app authenticity",
      "Apply Proguard/R8 rules to obfuscate Dart and native compilation outputs"
    ],
    goalsAr: [
      "تحديد معرفات التطبيقات الفريدة داخل ملفات إعدادات البناء Gradle",
      "إنشاء مفاتيح التشفير والمصادقة الأمنية Keystores للتوقيع الرسمي للتطبيق",
      "تفعيل وتطبيق قواعد تشتيت الكود Proguard/R8 لمنع الهندسة العكسية واختراق التطبيق"
    ],
    content: `### Global Deployment & Security Compilation 🚀

The final milestone is transforming your code into a signed, highly secured production binary, optimized for worldwide app stores.

#### 1. Android App Bundle (.aab)
Unlike old legacy APK files which contained massive assets for every CPU architecture (ARMv7, ARMv8, x86), Flutter outputs **Android App Bundles (.aab)**.
The Google Play console reads your \`.aab\` and dynamically splits and packages customized APKs optimized exclusively for the downloading user's specific hardware, reducing download sizes by up to 50%!

#### 2. Code Obfuscation
Dart compiles code directly to native machine assembly. However, string symbols and metadata can still be reverse-engineered. By compiling with obfuscation flags, Flutter replaces class and method names with unreadable gibberish:
\`\`\`bash
flutter build appbundle --obfuscate --split-debug-info=symbols/
\`\`\`

#### 3. Release Signing
To guarantee to Google Play and Apple App Store that updates are genuine, you sign your artifact with a private cryptographic certificate generated via Java Keytool:
\`\`\`keytool
keytool -genkey -v -keystore release-keystore.jks -keyalg RSA -keysize 2048 -validity 10000
\`\`\`
`,
    contentAr: `### الإخراج النهائي والنشر السحابي الآمن للمتاجر 🚀

المحطة الأخيرة في رحلتك هي تحويل كودك البرمجي إلى تطبيق حقيقي موقع رقمياً ومشفر ومحمي ومحسّن تماماً للنشر العالمي على متاجر التطبيقات.

#### 1. حزم تطبيقات الأندرويد (Android App Bundle - .aab)
على عكس حزم APK التقليدية والقديمة التي كانت تحمل بداخلها كافة المكونات والصور لكل معالجات الهواتف بلا داعٍ، تعتمد فلاتر الآن على **حزم التطبيقات الذكية (.aab)**.
يقوم متجر جوجل بلاي بقراءة ملف \`.aab\` ويقوم تلقائياً بتفكيكه وتوليد حزمة APK مصغرة ومخصصة تناسب نوع هاتف المستخدم وصلاحيات شاشته ومعالجه بالتحديد، مما يقلل حجم التحميل بنسبة تصل إلى 50%!

#### 2. تشتيت وتشفير الأكواد (Obfuscation)
تقوم فلاتر بترجمة الكود البرمجي مباشرة إلى لغة الآلة الثنائية (Machine Code). ومع ذلك، يمكن استخراج بعض أسماء الدوال البرمجية في الهندسة العكسية. للتصدي لذلك، نستخدم أعلام التشتيت لتغيير أسماء الفئات والوظائف إلى رموز عشوائية مبهمة:
\`\`\`bash
flutter build appbundle --obfuscate --split-debug-info=symbols/
\`\`\`

#### 3. التوقيع الرقمي (Cryptographic Signing)
لضمان أمان وهوية التطبيق وإثبات أن التحديثات المستقبلية آتية من المطور الأصلي، يتم توقيع الحزمة بمفتاح تشفير سري يتم توليده عبر أداة Keytool المدمجة:
\`\`\`keytool
keytool -genkey -v -keystore release-keystore.jks -keyalg RSA -keysize 2048 -validity 10000
\`\`\`
`,
    quiz: [
      {
        question: "What is the primary advantage of Android App Bundles (.aab) over raw APK files?",
        options: [
          "They compile client code into raw HTML web pages",
          "They enable the Google Play Console to dynamically generate custom-tailored, minimized APKs for each user's device",
          "They allow runtime editing of compiled codes",
          "They remove all native database limits"
        ],
        correctAnswer: 1,
        explanation: "Android App Bundles (.aab) compile the application for all architectures and hand it to Google Play, which builds and delivers optimized smaller APKs matching only the downloading user's device."
      },
      {
        question: "How does code obfuscation enhance Flutter app security?",
        options: [
          "It blocks the application from being installed on root devices",
          "It encrypts the text files inside the database",
          "It replaces method, class, and variable names with gibberish, preventing hackers from reverse-engineering the codebase",
          "It forces the application to request security certificates"
        ],
        correctAnswer: 2,
        explanation: "Obfuscation hides the semantic meaning of your variables, class trees, and function routines, transforming readable identifiers into tiny nonsense characters."
      },
      {
        question: "Which command builds a release-ready, obfuscated Android App Bundle with debug symbols split?",
        options: [
          "flutter run --release",
          "flutter build apk --no-signing",
          "flutter build appbundle --obfuscate --split-debug-info=symbols/",
          "flutter compile production"
        ],
        correctAnswer: 2,
        explanation: "Using the --obfuscate flag alongside --split-debug-info builds an optimized .aab while pulling key symbols into a secure separate file for safe crash diagnostics."
      }
    ],
    quizAr: [
      {
        question: "ما هي الميزة الأساسية لحزم التطبيقات (.aab) مقارنة بملفات APK التقليدية والقديمة؟",
        options: [
          "أنها تترجم كافة الأكواد لصفحات إنترنت ثابتة",
          "تمكين متجر جوجل بلاي من توليد حزم APK مخصصة ومصغرة لكل مستخدم وفقاً لمواصفات هاتفه بالتحديد",
          "تتيح للمطور تعديل الكود البرمجي بعد تشغيله على الهواتف",
          "تلغي قيود قواعد البيانات بالكامل"
        ],
        correctAnswer: 1,
        explanation: "حزمة الـ .aab ترسل الهياكل بالكامل إلى جوجل بلاي، وهو بدوره يقوم بتفكيكها وبناء نسخة APK صغيرة وخفيفة موجهة بالتحديد للمعالج وحجم الشاشة الخاص بالهاتف الذي يحمل حالياً."
      },
      {
        question: "كيف يساهم 'تشتيت الكود' (Obfuscation) في تأمين تطبيق فلاتر؟",
        options: [
          "يمنع تثبيت التطبيق تماماً على الهواتف ذات الصلاحيات المفتوحة (Rooted)",
          "يشفر ملفات النصوص المخزنة داخل قواعد البيانات السحابية",
          "يستبدل أسماء الكلاسات والدوال والمتغيرات المعبرة برموز عشوائية مبهمة يصعب فكها أو قراءتها برمجياً",
          "يجبر الهاتف على طلب شهادات أمان سحابية مع كل عملية نقر"
        ],
        correctAnswer: 2,
        explanation: "يقوم التشتيت بحذف معاني وأسماء الكود الذي قمت بكتابته ويحولها لأحرف قصيرة غير مفهومة، مما يعرقل ويقضي تماماً على محاولات الهندسة العكسية وسرقة الأكواد."
      },
      {
        question: "ما هو الأمر الرسمي لبناء حزمة أندرويد نهائية مشفرة ومشتتة الأكواد مع تقسيم رموز تتبع الأخطاء؟",
        options: [
          "flutter run --release",
          "flutter build apk --no-signing",
          "flutter build appbundle --obfuscate --split-debug-info=symbols/",
          "flutter compile production"
        ],
        correctAnswer: 2,
        explanation: "استخدام الأعلام --obfuscate و --split-debug-info مع أمر البناء ينتج حزمة .aab فائقة الأمان مع تجميع معلومات الأخطاء بشكل خارجي لتسهيل قراءتها لاحقاً."
      }
    ],
    challenge: {
      instruction: "Draft a mock bash string representation in Dart: 'const String buildCmd = ...' containing the correct release compilation shell command: 'flutter build appbundle --obfuscate --split-debug-info=symbols/'.",
      starterCode: `const String buildCmd = "";`,
      sampleSolution: `const String buildCmd = "flutter build appbundle --obfuscate --split-debug-info=symbols/";`,
      gradingCriteria: "The string constant buildCmd must contain the exact command text.",
      localGraderRegex: ["const String buildCmd", "flutter build appbundle --obfuscate"]
    },
    challengeAr: {
      instruction: "اكتب ثابتاً برمجياً بلغة دارت باسم 'const String buildCmd = ...' يحتوي على الأمر الصدفي الصحيح لبناء تطبيق أندرويد تفاعلي موقع ومشتت الأكواد: 'flutter build appbundle --obfuscate --split-debug-info=symbols/'.",
      starterCode: `const String buildCmd = "";`,
      sampleSolution: `const String buildCmd = "flutter build appbundle --obfuscate --split-debug-info=symbols/";`,
      gradingCriteria: "يجب أن يحتوي الثابت buildCmd على النص الدقيق للأمر الصدفي المستخدم لتشتيت الأكواد وبناء الحزمة.",
      localGraderRegex: ["const String buildCmd", "flutter build appbundle --obfuscate"]
    }
  },
  {
    id: "step9",
    title: "Widget Rendering Architecture & Advanced State Management",
    titleAr: "هيكلية رندرة الودجات وإدارة الحالة المتقدمة",
    description: "Deep dive into Flutter's rendering pipeline (Widget, Element, and RenderObject Trees) and master clean patterns using Provider, Riverpod, and BLoC.",
    descriptionAr: "غص في أعماق معالجة الواجهات وفهم الـ 3 Trees وتدفق البيانات، واحترف أنماط معمارية مثل Provider و Riverpod و BLoC لإدارة حالة التطبيقات.",
    goals: [
      "Explain the roles of Widget, Element, and RenderObject trees in Flutter's performance",
      "Implement robust state notifications using ChangeNotifier, StateNotifier, or Riverpod providers",
      "Apply optimized rebuild controls like Selectors and const constructors"
    ],
    goalsAr: [
      "شرح وظيفة كل شجرة من أشجار فلاتر الثلاث (Widget, Element, RenderObject) وعلاقتها بالسرعة العالية",
      "بناء هيكلية تتبع للحالة باستخدام ChangeNotifier و StateNotifier ومزودي Riverpod",
      "توظيف مرشحات الإعادة الدقيقة مثل Selectors والمشيدات الثابتة const لتفادي إعادة الرندرة العشوائية"
    ],
    content: `### Flutter's Three-Tree Architecture 🌳🌳🌳

To deliver ultra-smooth 60fps/120fps interfaces, Flutter implements a sophisticated **Three-Tree Rendering Pipeline** instead of rebuilding everything from scratch.

#### The Three Trees:
1. **Widget Tree**: Lightweight, immutable configurations. They are blue-prints that are created and destroyed constantly with almost zero memory overhead.
2. **Element Tree**: The "glue" or orchestrator. It manages the lifecycle of widgets, represents a physical location in the tree, and persists across rebuilds.
3. **RenderObject Tree**: The heavy lifters. They handle layout constraints, size calculations, and actual visual painting on the screen.

\`\`\`
[Widget Tree] (Blueprint)
      │
      ▼ (instantiates)
[Element Tree] (Lifecycle / Coordination)
      │
      ▼ (creates & updates)
[RenderObject Tree] (Layout & Paint)
\`\`\`

#### Advanced State Management Options:
- **ChangeNotifier (Provider)**: Great for simple apps, relies on \`notifyListeners()\` to broadcast updates to subscribing Consumer widgets.
- **Riverpod**: A modern, compile-safe replacement for Provider that eliminates BuildContext dependency and supports global provider declarations.
- **BLoC (Business Logic Component)**: An event-driven state manager that uses Streams. Perfect for enterprise applications requiring strict separation of logic and presentation.

\`\`\`dart
// Riverpod Example: Counter Provider
import 'package:flutter_riverpod/flutter_riverpod.dart';

final counterProvider = StateProvider<int>((ref) => 0);

// Inside a ConsumerWidget:
// int count = ref.watch(counterProvider);
\`\`\`
`,
    contentAr: `### معمارية أشجار فلاتر الثلاثة لإدارة الرندرة 🌳🌳🌳

لتقديم واجهات مستخدم فائقة السلاسة والسرعة (60 إلى 120 إطاراً في الثانية)، تعتمد فلاتر على **معمارية ثلاثية الأشجار متوازية** بدلاً من إعادة رسم الشاشة بالكامل عند كل نقرة.

#### شجيرات الواجهة الثلاث:
1. **شجرة الودجات (Widget Tree)**: تكوينات خفيفة الوزن للغاية وغير قابلة للتعديل بعد إنشائها (Immutable). تمثل الكروكي الهندسي ويتم تفكيكها وبنائها بشكل مستمر دون استهلاك للذاكرة.
2. **شجرة العناصر (Element Tree)**: المنسق الفعلي والعمود الفقري. تدير دورة حياة الواجهات، وتحدد مكان الودج الجغرافي في الشجرة، وتظل حية وثابتة عند تبدل الودجات.
3. **شجرة كائنات الرندرة (RenderObject Tree)**: المحركات التنفيذية الثقيلة. تحسب مساحات الحجم والقيود (Constraints) وتتولى الرسم الفعلي وتلوين البكسلات على الشاشة.

\`\`
[شجرة الودجات] (مخطط هندسي مؤقت)
      │
      ▼ (توليد ملموس)
[شجرة العناصر] (إدارة دورة الحياة والتنسيق)
      │
      ▼ (إنشاء وتحديث)
[شجرة كائنات الرندرة] (حساب الأبعاد والرسم الفعلي)
\`\`

#### خيارات إدارة الحالة (State Management):
- **ChangeNotifier (مع Provider)**: ممتاز للمشاريع المتوسطة، ويعتمد على بث إشعار \`notifyListeners()\` للودجات المشتركة لتقوم بإعادة بناء نفسها.
- **Riverpod**: النسخة العصرية الأكثر أماناً وقوة، تلغي الحاجة لمعامل \`BuildContext\` وتمنع حدوث أخطاء وقت التشغيل الشائعة.
- **BLoC (مكون منطق الأعمال)**: معتمد على نظام الأحداث المتدفقة (Streams). رائع للمشاريع الضخمة التي تتطلب فصلاً تاماً بين منطق الواجهة والعمليات الخلفية.

\`\`\`dart
// مثال لإدارة عداد برمجياً باستخدام Riverpod:
import 'package:flutter_riverpod/flutter_riverpod.dart';

final counterProvider = StateProvider<int>((ref) => 0);

// وبداخل الودج المستهلك:
// int count = ref.watch(counterProvider);
\`\`\`
`,
    quiz: [
      {
        question: "Which of the three trees in Flutter performs the heavy visual layout constraints and actual painting?",
        options: [
          "The Widget Tree",
          "The Element Tree",
          "The RenderObject Tree",
          "The State Tree"
        ],
        correctAnswer: 2,
        explanation: "RenderObject Tree is responsible for measuring dimensions, executing layout, and painting actual pixels onto the screen canvas."
      },
      {
        question: "Why does Riverpod improve on traditional Provider?",
        options: [
          "It compiles Dart into raw Python script",
          "It is completely compile-safe, eliminates BuildContext lookups, and avoids common provider-not-found runtime bugs",
          "It renders UI in a background web browser thread",
          "It forces the system to use SQLite databases"
        ],
        correctAnswer: 1,
        explanation: "Riverpod is declared globally, resolving scope at compile-time instead of running runtime AncestorWidget lookups via BuildContext, which frequently caused ProviderNotFoundException."
      },
      {
        question: "How do you optimize rebuilding of a widget that only needs to listen to a specific property of a complex model?",
        options: [
          "Always rebuild the entire parent MaterialApp widget",
          "Use the 'select' function on a provider, or Selector in Provider, to only trigger rebuilds when that specific property changes",
          "Reinitialize the state manager in main.dart",
          "By converting every widget into a StatefulWidget"
        ],
        correctAnswer: 1,
        explanation: "The select operator allows widgets to filter incoming updates and rebuild only when the tracked subset property changes, conserving critical CPU cycles."
      }
    ],
    quizAr: [
      {
        question: "أي من أشجار فلاتر الثلاثة هي المسؤولة عن حساب قيود الأبعاد والرسم الفعلي للبكسلات على الشاشة؟",
        options: [
          "شجرة الودجات (Widget Tree)",
          "شجرة العناصر (Element Tree)",
          "شجرة كائنات الرندرة (RenderObject Tree)",
          "شجرة الحالة (State Tree)"
        ],
        correctAnswer: 2,
        explanation: "شجرة كائنات الرندرة هي التي تدير المهام الحسابية الصعبة مثل قياس المساحات، وإجراء التخطيط ورسم العناصر وتلوينها فعلياً."
      },
      {
        question: "لماذا يعتبر نظام Riverpod تطوراً وتحسيناً كبيراً مقارنة بنظام Provider التقليدي؟",
        options: [
          "لأنه يترجم أكواد دارت إلى لغة بايثون",
          "لأنه آمن تماماً وقت الترجمة، ولا يعتمد على BuildContext، ويتجنب أخطاء وقت التشغيل مثل عدم العثور على المزود",
          "لأنه يقوم برسم الواجهة في خلفية المتصفح عبر خيوط معالجة أخرى",
          "لأنه يجبر التطبيق على تشغيل قواعد بيانات SQLite"
        ],
        correctAnswer: 1,
        explanation: "يتيح Riverpod تعريف المزودين (Providers) كمتغيرات عالمية، مما يضمن تتبع النطاقات وحمايتها أثناء البرمجة وقبل التشغيل، دون المخاطرة بأخطاء فقدان سياق البناء."
      },
      {
        question: "كيف يمكنك تحسين أداء ودج يعتمد على حقل محدد واحد فقط داخل كائن بيانات كبير ومعقد؟",
        options: [
          "إعادة بناء الودج الأب الكبير MaterialApp بالكامل في كل مرة",
          "استخدام دالة المرشح 'select' في Riverpod أو Selector في Provider لإعادة البناء فقط عند تغير هذا الحقل بالتحديد",
          "إعادة تهيئة نظام إدارة الحالة داخل ملف main.dart",
          "بتحويل كل ودج في التطبيق ليكون StatefulWidget"
        ],
        correctAnswer: 1,
        explanation: "تتيح ميزة select للودج رصد وتصفية التحديثات وتجاوز أي عمليات إعادة بناء للشاشة طالما أن الحقل المحدد لم يطرأ عليه أي تغيير."
      }
    ],
    challenge: {
      instruction: "Create a simple Riverpod StateNotifier state tracker draft in Dart. Define a class named 'CounterTracker' that extends StateNotifier<int> and includes a method 'increment()' that updates the state by adding 1.",
      starterCode: `// Assume StateNotifier is imported. Write the class here:
class CounterTracker {
}`,
      sampleSolution: `class CounterTracker extends StateNotifier<int> {
  CounterTracker() : super(0);

  void increment() {
    state = state + 1;
  }
}`,
      gradingCriteria: "The class CounterTracker must extend StateNotifier<int>, initialize state with super(0), and declare a method increment() to update state.",
      localGraderRegex: ["class CounterTracker extends StateNotifier<int>", "increment()", "state = state + 1"]
    },
    challengeAr: {
      instruction: "قم بصياغة متتبع حالة بسيط بلغة دارت متوافق مع معمارية Riverpod. عرّف فئة برمجية (Class) باسم 'CounterTracker' يرث من الفئة 'StateNotifier<int>' ويحتوي على دالة 'increment()' تزيد الحالة (state) بمقدار 1.",
      starterCode: `// اكتب الكلاس المناسب لمتتبع العداد هنا:
class CounterTracker {
}`,
      sampleSolution: `class CounterTracker extends StateNotifier<int> {
  CounterTracker() : super(0);

  void increment() {
    state = state + 1;
  }
}`,
      gradingCriteria: "يجب أن يرث الكلاس CounterTracker من StateNotifier<int>، ويقوم بتهيئة السوبر بالقيمة صفر، مع تعريف دالة لزيادة الحالة.",
      localGraderRegex: ["class CounterTracker extends StateNotifier<int>", "increment()", "state = state + 1"]
    }
  },
  {
    id: "step10",
    title: "Complete Cross-Platform Deployment & Automated CI/CD",
    titleAr: "إطلاق التطبيق عبر المنصات وأتمتة الـ CI/CD",
    description: "Learn App Store Connect provisioning, fastlane distribution, Firebase/Docker hosting for Flutter Web, and automate build cycles using Github Actions.",
    descriptionAr: "احترف كيفية تهيئة شهادات آبل وتوزيع التطبيقات عبر fastlane، واستضافة تطبيقات الويب عبر Docker، وأتمتة دورات البناء السحابية بالكامل.",
    goals: [
      "Set up certificates, Provisioning Profiles, and App Store Connect bundles",
      "Draft unified Flutter Web deployments using optimized static web hosting",
      "Configure automatic testing and binary distribution via GitHub Actions pipelines"
    ],
    goalsAr: [
      "ضبط الشهادات الأمنية، ملفات تعريف الهوية المعتمدة، وحزم التوزيع لمطورين آبل",
      "تجهيز بيئات عمل لرفع واستضافة تطبيقات فلاتر ويب بنسخ ثابتة وسريعة",
      "بناء ملف إعداد لأتمتة الاختبارات الدورية وتوليد ملفات النشر عبر GitHub Actions"
    ],
    content: `### Cross-Platform Deployment & Automations 🏁

Mastering Flutter means knowing how to take a unified codebase and deliver it flawlessly to hundreds of millions of screens on Android, iOS, and Web.

#### 1. The Apple iOS Deployment Pipeline:
Deploying to iOS requires a Mac with Xcode. You must configure:
- **App ID & Bundle Identifier**: Unique reverse-domain ID (e.g., \`com.example.myapp\`).
- **Signing Certificate**: Verifies developer identity.
- **Provisioning Profile**: Combines your app certificate, App ID, and target devices.
- **TestFlight**: Apple's premium sandbox that lets you invite up to 10,000 beta testers securely before releasing to public App Store review.

#### 2. Flutter Web Production Hosting:
Flutter compiles web builds into lightning-fast JavaScript or WebAssembly canvas layers:
\`\`\`bash
flutter build web --release --web-renderer canvaskit
\`\`\`
To deploy:
- **Firebase Hosting**: Run \`firebase init\` and point the public directory to \`build/web\`.
- **Docker**: Package with an Nginx container serving static HTML, JS, and asset directories.

#### 3. CI/CD Pipeline Automation:
Modern mobile dev teams never build binaries manually on their own laptops. They use **CI/CD** tools (like **GitHub Actions** or **Codemagic**) to build, run tests, and sign binaries on every commit:

\`\`\`yaml
# Simple GitHub Actions Build Snippet
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: subosito/flutter-action@v2
        with:
          channel: 'stable'
      - run: flutter pub get
      - run: flutter test
      - run: flutter build apk --release
\`\`\`
`,
    contentAr: `### الإطلاق الشامل وأتمتة البناء (CI/CD) عبر المنصات 🏁

احتراف فلاتر يعني القدرة على جلب كود برمجي واحد وتوزيعه بكفاءة ليعمل بدقة وسرعة على مئات الملايين من الأجهزة سواء كانت أندرويد، آيفون، أو متصفح ويب.

#### 1. رحلة الإطلاق لمتجر آبل (iOS App Store):
يتطلب رفع تطبيق الآيفون وجود جهاز ماك (Mac) واستخدام برنامج Xcode لضبط المكونات التالية:
- **Bundle Identifier (معرف الحزمة)**: معرف فريد بنمط النطاق العكسي (مثل \`com.example.myapp\`).
- **شهادة التوقيع الرقمي (Signing Certificate)**: لإثبات هوية المطور المعتمد للشركة.
- **ملف تعريف النشر (Provisioning Profile)**: يربط شهادة المطور، معرف التطبيق، والأجهزة المسموح بالتثبيت عليها.
- **تطبيق TestFlight**: منصة آبل الرسمية لدعوة ما يصل إلى 10,000 مستخدم تجريبي لتحسين استقرار التطبيق قبل النشر النهائي.

#### 2. استضافة تطبيقات فلاتر ويب (Flutter Web):
تقوم فلاتر بترجمة كودك البرمجي إلى كود جافاسكريبت فائق الخفة أو طبقات WebAssembly محسنة:
\`\`\`bash
flutter build web --release --web-renderer canvaskit
\`\`\`
طرق الاستضافة الرائعة:
- **Firebase Hosting**: كتابة الأمر \`firebase init\` وتوجيه خادم الرفع لمجلد \`build/web\`.
- **Docker / Nginx**: تضمين المخرجات داخل حاوية ويب Nginx خفيفة لخدمة المستخدمين بسرعة.

#### 3. أتمتة خطوط البناء السحابي (CI/CD):
لا تقوم الفرق البرمجية الحديثة ببناء ملفات الإنتاج يدوياً من حواسيب المطورين! بل يتم توظيف أدوات **الدمج والرفع المستمر (CI/CD)** مثل **GitHub Actions** أو **Codemagic** لتبدأ فوراً ببناء الكود واختباره وتوقيعه رقمياً مع كل تحديث جديد:

\`\`\`yaml
# نموذج مصغر لإعدادات GitHub Actions:
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: subosito/flutter-action@v2
        with:
          channel: 'stable'
      - run: flutter pub get
      - run: flutter test
      - run: flutter build apk --release
\`\`\`
`,
    quiz: [
      {
        question: "Which Apple sandbox tool allows you to invite up to 10,000 external beta testers to check your iOS build before public submission?",
        options: [
          "Xcode Simulator",
          "TestFlight",
          "Swift Playground",
          "App Store Direct"
        ],
        correctAnswer: 1,
        explanation: "TestFlight is Apple's official beta testing portal that allows safe sandboxed testing and automatic OTA builds distribution."
      },
      {
        question: "Which command compiles a high-performance production build for the browser utilizing CanvasKit?",
        options: [
          "flutter build web --release --web-renderer canvaskit",
          "flutter run web --dev",
          "flutter compile html5",
          "flutter build chrome --obfuscate"
        ],
        correctAnswer: 0,
        explanation: "Using 'flutter build web' with canvaskit ensures consistent, pixel-perfect rendering across browser rendering contexts."
      },
      {
        question: "What is the primary benefit of setting up a CI/CD pipeline (e.g., GitHub Actions) for Flutter?",
        options: [
          "It automatically rewrites your Dart code into Swift",
          "It compiles the app entirely in the user's browser",
          "It automates repetitive checkout, testing, and multi-platform binary building tasks on secure remote servers with every code commit",
          "It eliminates the need to pay for an Apple Developer Account"
        ],
        correctAnswer: 2,
        explanation: "CI/CD pipelines run scripts in virtual machines, automatically checking test suites and compiling clean .apk, .aab, and .ipa assets whenever developers push code."
      }
    ],
    quizAr: [
      {
        question: "ما هي أداة آبل الرسمية التي تتيح لك دعوة ما يصل لـ 10,000 مستخدم لتجربة تطبيقك على نظام iOS قبل عرضه للمراجعة العامة؟",
        options: [
          "Xcode Simulator",
          "برنامج TestFlight",
          "بيئة Swift Playgrounds",
          "متجر التطبيقات المباشر App Store Direct"
        ],
        correctAnswer: 1,
        explanation: "تطبيق TestFlight هو الأداة الرسمية من آبل لتوزيع النسخ التجريبية وإخضاعها للاختبار بأمان وسهولة بالغة."
      },
      {
        question: "ما هو الأمر الصحيح لبناء تطبيق فلاتر للويب مخصص للإنتاج والسرعة العالية بالاعتماد على CanvasKit؟",
        options: [
          "flutter build web --release --web-renderer canvaskit",
          "flutter run web --dev",
          "flutter compile html5",
          "flutter build chrome --obfuscate"
        ],
        correctAnswer: 0,
        explanation: "أمر البناء build web مع علم التجسيد canvaskit يضمن تقديم واجهة متسقة ومتطابقة تماماً وخالية من العيوب البصرية على المتصفحات المختلفة."
      },
      {
        question: "ما هي الميزة الجوهرية والأساسية لتأسيس خطوط الدمج والنشر المستمر (CI/CD) لمشروع فلاتر؟",
        options: [
          "تقوم تلقائياً بإعادة كتابة أكواد دارت وترجمتها للغة Swift",
          "تقوم بتشغيل وبناء التطبيق بأكمله داخل متصفح المستخدم النهائي",
          "أتمتة مهام فحص الكود، تشغيل الاختبارات، وبناء حزم المنصات المختلفة تلقائياً على خوادم سحابية آمنة فور رفع الكود",
          "تلغي الحاجة تماماً لدفع اشتراك حساب المطورين لشركة آبل"
        ],
        correctAnswer: 2,
        explanation: "تقوم خوادم الـ CI/CD بتشغيل بيئات برمجية معزولة لفحص التطبيق وبناء ملفات التثبيت آلياً وتزويد المطورين بها دون تعطيل حواسيبهم المحلية."
      }
    ],
    challenge: {
      instruction: "Write a mock Dart script representing a CI/CD build configuration validator: 'const String actionYaml = ...' containing the checkout instruction key 'uses: actions/checkout@v3'.",
      starterCode: `const String actionYaml = "";`,
      sampleSolution: `const String actionYaml = "uses: actions/checkout@v3";`,
      gradingCriteria: "The constant actionYaml must contain 'uses: actions/checkout@v3'.",
      localGraderRegex: ["const String actionYaml", "uses: actions/checkout@v3"]
    },
    challengeAr: {
      instruction: "اكتب ثابتاً برمجياً بلغة دارت باسم 'const String actionYaml = ...' يحتوي على نص سطر تفعيل فحص جلب الكود الشهير في GitHub Actions وهو 'uses: actions/checkout@v3'.",
      starterCode: `const String actionYaml = "";`,
      sampleSolution: `const String actionYaml = "uses: actions/checkout@v3";`,
      gradingCriteria: "يجب أن يحتوي الثابت actionYaml على العبارة الفريدة للتحقق من جلب الكود 'uses: actions/checkout@v3'.",
      localGraderRegex: ["const String actionYaml", "uses: actions/checkout@v3"]
    }
  }
];
