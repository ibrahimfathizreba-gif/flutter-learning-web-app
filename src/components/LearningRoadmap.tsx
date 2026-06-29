import React, { useState, useEffect, useRef } from "react";
import { 
  Sparkles, BookOpen, Trophy, Code, MessageSquare, Compass, 
  CheckCircle, ExternalLink, Lock, Unlock, ChevronRight, ChevronLeft, 
  Award, Book, GraduationCap, Lightbulb, Zap, RotateCcw, Check, 
  AlertCircle, ArrowRight, Send, Loader, Bot, User
} from "lucide-react";
import MarkdownRenderer from "./MarkdownRenderer";

// Quiz question interface
interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// Step challenge interface
interface StepChallenge {
  instruction: string;
  starterCode: string;
  sampleSolution: string;
  gradingCriteria: string;
}

// Roadmap step structure
interface RoadmapStep {
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
  challenge: StepChallenge;
  challengeAr: StepChallenge;
}

// Full translated step dataset
const ROADMAP_STEPS: RoadmapStep[] = [
  {
    id: "step1",
    title: "Project Setup & Layered Architecture",
    titleAr: "إعداد المشروع وبنية الطبقات البرمجية",
    description: "Initialize your Flutter environment and organize the project into Presentation, Domain, and Data modules.",
    descriptionAr: "تهيئة بيئة عمل فلاتر وتنظيم المشروع إلى وحدات العرض (Presentation)، النطاق (Domain)، والبيانات (Data).",
    goals: [
      "Generate a Flutter template with target SDK configurations",
      "Establish a robust Feature-First or Layer-First folder architecture",
      "Understand pubspec.yaml dependency chains and sound null safety triggers"
    ],
    goalsAr: [
      "إنشاء قالب تطبيق فلاتر جديد مع تكوين حزم التطوير المستهدفة",
      "تأسيس بنية مجلدات متينة تعتمد على الميزات (Feature-First) أو الطبقات (Layer-First)",
      "فهم سلسلة الاعتمادات في ملف pubspec.yaml والتحكم بـ Null Safety"
    ],
    content: `### Building the Solid Foundation

To begin building a real-time communication suite, we skip standard single-file structures. Enterprise Flutter applications demand modular separations of concerns. This protects the core business logic from UI refactoring or remote database schema shifts.

#### Step 1: Initialize Flutter App
Run the standard CLI generator inside your workspace:
\`\`\`bash
flutter create --org com.university.chat -a kotlin -i swift chat_app
cd chat_app
\`\`\`

#### Step 2: Establish the Directory Architecture
We apply **Clean Architecture** mapped into layer-based structures:
*   **Domain Layer**: Pure Dart entities, value objects, and repository specifications. This layer is completely framework-independent (contains zero Flutter imports).
*   **Data Layer**: DTO serializations, remote socket/database adapters, and concrete repository implementations.
*   **Presentation Layer**: Custom reactive widgets, layouts, and State Management controllers (using providers or streams).

*JVM Comparison*: In Spring boot, you structure directories as \`controller\`, \`service\`, \`repository\`, and \`domain\`. In Flutter, we maintain a very similar flow, ensuring UI components only communicate with Repository contracts rather than concrete database instances.`,
    contentAr: `### بناء الأساس المتين للتطبيق

للبدء في بناء جناح اتصالات فوري، نتجنب الهياكل أحادية الملف التقليدية. تتطلب تطبيقات فلاتر الاحترافية فصلاً كاملاً للمسؤوليات (Separation of Concerns). هذا يحمي منطق الأعمال الأساسي (Business Logic) من أي تعديلات في واجهة المستخدم أو تغييرات في قاعدة البيانات البعيدة.

#### الخطوة 1: تهيئة تطبيق فلاتر
قم بتشغيل الأمر القياسي لإنشاء المشروع في مساحة العمل الخاصة بك:
\`\`\`bash
flutter create --org com.university.chat -a kotlin -i swift chat_app
cd chat_app
\`\`\`

#### الخطوة 2: تأسيس بنية المجلدات والموديولات
نقوم بتطبيق **البنية النظيفة (Clean Architecture)** المقسمة لطبقات:
*   **طبقة النطاق (Domain Layer)**: كيانات دارت النقية (Pure Dart Entities)، وكائنات القيم، ومواصفات المستودعات (Repository interfaces). هذه الطبقة مستقلة تمامًا عن إطار العمل (لا تحتوي على أي استدعاءات لمكتبات فلاتر).
*   **طبقة البيانات (Data Layer)**: عمليات تحويل كائنات البيانات (DTO Serializations)، ومحولات قواعد البيانات/المقابس البعيدة، والتطبيقات الفعلية للمستودعات.
*   **طبقة العرض (Presentation Layer)**: الواجهات البرمجية التفاعلية المخصصة، والمخططات الهيكلية، ومتحكمات إدارة الحالة (باستخدام Streams أو Provider).

*مقارنة مع بيئة جافا*: في Spring Boot، تقوم بتنظيم المجلدات كـ \`controller\` و \`service\` و \`repository\` و \`domain\`. في فلاتر، نحافظ على نفس التدفق تقريبًا، مما يضمن تواصل واجهة المستخدم مع عقود المستودعات فقط بدلاً من الاتصال المباشر بقاعدة البيانات.`,
    quiz: [
      {
        question: "What is the primary entry point function of any Flutter/Dart application?",
        options: ["runApp()", "main()", "onCreate()", "startApp()"],
        correctAnswer: 1,
        explanation: "Like Java, execution starts with the top-level main() function. Within main(), we then call runApp(const MyApp()) to inflate the widget tree."
      },
      {
        question: "In Clean Architecture, which layer contains pure business logic and contracts, remaining independent of UI and database frameworks?",
        options: ["Data Layer", "Presentation Layer", "Domain Layer", "Service Layer"],
        correctAnswer: 2,
        explanation: "The Domain Layer is the core. It holds business rules, pure Dart entities, and abstract repository contracts, completely free of UI or Firestore references."
      },
      {
        question: "Which file in a Flutter project is responsible for managing package dependencies, assets, and app versioning?",
        options: ["pubspec.yaml", "AndroidManifest.xml", "build.gradle", "settings.gradle"],
        correctAnswer: 0,
        explanation: "pubspec.yaml is the package manifest file, similar to pom.xml in Maven or build.gradle in Gradle."
      }
    ],
    quizAr: [
      {
        question: "ما هي نقطة الدخول الرئيسية للتشغيل في أي تطبيق فلاتر/دارت؟",
        options: ["runApp()", "main()", "onCreate()", "startApp()"],
        correctAnswer: 1,
        explanation: "تمامًا مثل جافا، يبدأ تشغيل البرنامج من دالة المستوى الأعلى main(). وداخلها، نستدعي runApp لإطلاق واجهات التطبيق."
      },
      {
        question: "في البنية النظيفة (Clean Architecture)، أي الطبقات تحتوي على منطق العمل الصافي وتكون مستقلة تمامًا عن واجهات المستخدم وقواعد البيانات؟",
        options: ["طبقة البيانات (Data Layer)", "طبقة العرض (Presentation Layer)", "طبقة النطاق (Domain Layer)", "طبقة الخدمات (Service Layer)"],
        correctAnswer: 2,
        explanation: "طبقة النطاق (Domain Layer) هي القلب النابض. تحتوي على كيانات دارت النقية وقواعد العمل والمستودعات المجردة دون أي اعتمادية على قواعد البيانات أو الواجهات."
      },
      {
        question: "ما هو الملف المسؤول عن إدارة الاعتمادات والمكتبات والملفات المساعدة وإصدارات التطبيق في مشروع فلاتر؟",
        options: ["pubspec.yaml", "AndroidManifest.xml", "build.gradle", "settings.gradle"],
        correctAnswer: 0,
        explanation: "ملف pubspec.yaml هو بيان الحزم للمشروع، ويشبه ملف pom.xml في Maven أو build.gradle في Gradle في بيئة جافا."
      }
    ],
    challenge: {
      instruction: "Draft a pure Dart Message Entity class inside the Domain Layer containing id, senderId, senderName, text, and sentAt timestamp. Provide a 'const' constructor and prevent any imports from material.dart or external databases.",
      starterCode: `// Write your pure Dart Message Entity class here
// Do not import 'package:flutter/material.dart' - keep it pure Domain!

class Message {
  // TODO: Define fields and a const constructor
}`,
      sampleSolution: `class Message {
  final String id;
  final String senderId;
  final String senderName;
  final String text;
  final DateTime sentAt;

  const Message({
    required this.id,
    required this.senderId,
    required this.senderName,
    required this.text,
    required this.sentAt,
  });
}`,
      gradingCriteria: "Checks if the class uses 'final' immutable fields, includes 'const' constructor keywords, and contains zero UI imports."
    },
    challengeAr: {
      instruction: "قم بصياغة فئة كيان الرسالة (Message Entity) بلغة دارت الصافية داخل طبقة النطاق (Domain Layer) تحتوي على المعرف، ومعرف المرسل، واسم المرسل، والنص، وطابع زمن الإرسال. وفر منشئًا ثابتًا (const constructor) وتجنب استيراد أي موديولات من واجهة المستخدم أو قواعد البيانات الخارجية.",
      starterCode: `// اكتب فئة كيان الرسالة النقي هنا
// تجنب استيراد مكتبات فلاتر للواجهات - حافظ عليها نقية للنطاق!

class Message {
  // TODO: عرّف المتغيرات ومنشئ ثابت
}`,
      sampleSolution: `class Message {
  final String id;
  final String senderId;
  final String senderName;
  final String text;
  final DateTime sentAt;

  const Message({
    required this.id,
    required this.senderId,
    required this.senderName,
    required this.text,
    required this.sentAt,
  });
}`,
      gradingCriteria: "التحقق من استخدام حقول غير قابلة للتغيير (final)، واستخدام المنشئ الثابت (const)، وخلو الملف تماماً من استدعاءات واجهة المستخدم."
    }
  },
  {
    id: "step2",
    title: "Firebase Integration & Firestore Schemas",
    titleAr: "ربط فيربيز ومخططات قاعدة بيانات فايرستور",
    description: "Initialize Firebase on mobile clients and craft resilient real-time collection schemas with secure access rules.",
    descriptionAr: "تهيئة فيربيز على الهواتف الذكية وتصميم مخطط مجموعات قاعدة البيانات الفورية مع قواعد الأمان والتحقق.",
    goals: [
      "Set up Firebase CLI and register Flutter target configurations",
      "Draft Firestore schemas for chat rooms and message documents",
      "Write secure declarative Firebase Security Rules protecting chats"
    ],
    goalsAr: [
      "إعداد واجهة فيربيز البرمجية وتسجيل تهيئات تطبيق فلاتر",
      "تصميم مخططات فايرستور لغرف الدردشة ومستندات الرسائل الفورية",
      "كتابة قواعد الأمان والحماية البرمجية للدردشات والمستندات"
    ],
    content: `### Orchestrating the Cloud Database Schemas

Unlike relational databases (like MySQL/PostgreSQL) where table structures are defined via SQL DDL schemas, Google Cloud Firestore is a serverless, document-oriented NoSQL database. Documents are JSON-like maps stored within collections.

#### Database Architecture Design:
1.  **\`users\` collection**:
    *   Document ID = User UUID (from Firebase Auth)
    *   Fields: \`displayName\` (String), \`email\` (String), \`photoUrl\` (String), \`isOnline\` (Boolean), \`lastSeen\` (Timestamp).
2.  **\`chat_rooms\` collection**:
    *   Document ID = Room ID
    *   Fields: \`participants\` (List of User IDs), \`lastMessage\` (String), \`updatedAt\` (Timestamp).
    *   **Subcollection \`messages\`**: Nested inside each room document to guarantee query isolation.
        *   Fields: \`senderId\` (String), \`senderName\` (String), \`text\` (String), \`sentAt\` (Timestamp), \`isRead\` (Boolean), \`readBy\` (List of User IDs).

#### Firebase Security Rules (firestore.rules)
To secure this setup against unauthorized client-side manipulations, write declarative rules:
\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /chat_rooms/{roomId} {
      allow read, write: if request.auth != null && request.auth.uid in resource.data.participants;
      
      match /messages/{messageId} {
        allow read, write: if request.auth != null && request.auth.uid in get(/databases/$(database)/documents/chat_rooms/$(roomId)).data.participants;
      }
    }
  }
}
\`\`\`
*JVM Note*: You don't write SQL schemas or JDBC pools. Client-side SDKs securely request collections directly, and the Cloud database checks incoming tokens dynamically using these declarative Security Rules.`,
    contentAr: `### تنظيم وتصميم مخططات قواعد البيانات السحابية

على عكس قواعد البيانات العلاقية (مثل MySQL/PostgreSQL) التي تعتمد على جداول ومخططات SQL، فإن Google Cloud Firestore هي قاعدة بيانات NoSQL سحابية موجهة للمستندات (Document-oriented). يتم حفظ البيانات كمستندات تشبه خرائط JSON داخل مجموعات (Collections).

#### التصميم الهيكلي لقاعدة البيانات:
1.  **مجموعة \`users\` (المستخدمين)**:
    *   معرف المستند = المعرف الفريد للمستخدم (من مصادقة Firebase Auth)
    *   الحقول: \`displayName\` (نص)، \`email\` (نص)، \`isOnline\` (منطقي)، \`lastSeen\` (طابع زمني).
2.  **مجموعة \`chat_rooms\` (غرف الدردشة)**:
    *   معرف المستند = معرف الغرفة
    *   الحقول: \`participants\` (قائمة بمعرفات المشاركين)، \`lastMessage\` (نص)، \`updatedAt\` (طابع زمني).
    *   **المجموعة الفرعية \`messages\` (الرسائل)**: متداخلة داخل مستند كل غرفة لضمان عزل البيانات وسرعة الاستعلام.
        *   الحقول: \`senderId\` (نص)، \`senderName\` (نص)، \`text\` (نص)، \`sentAt\` (طابع زمني)، \`isRead\` (منطقي).

#### قواعد أمان فايرستور (firestore.rules)
لتأمين قاعدة البيانات ضد التلاعب الخارجي من طرف العميل، نكتب قواعد الحماية التالية:
\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /chat_rooms/{roomId} {
      allow read, write: if request.auth != null && request.auth.uid in resource.data.participants;
      
      match /messages/{messageId} {
        allow read, write: if request.auth != null && request.auth.uid in get(/databases/$(database)/documents/chat_rooms/$(roomId)).data.participants;
      }
    }
  }
}
\`\`\`
*ملاحظة للمطورين*: لن تحتاج لكتابة تجميعات اتصالات JDBC. حيث تتصل واجهات التطبيقات بمجموعات فايرستور مباشرة، وتتحقق خوادم جوجل السحابية من الرموز الأمنية تلقائياً بناءً على القواعد المعلنة أعلاه.`,
    quiz: [
      {
        question: "How are records structured inside Cloud Firestore database?",
        options: ["SQL Tables and rows", "JSON-like Documents organized inside Collections", "Graph Nodes and relationship edges", "Flat Key-Value string pairs"],
        correctAnswer: 1,
        explanation: "Firestore is a NoSQL document database. Data is stored in Documents (JSON-like structures), which are organized in Collections."
      },
      {
        question: "In Firestore Security Rules, what variable stores the unique identifier of the user making the network request?",
        options: ["request.uid", "request.auth.uid", "user.auth.id", "caller.id"],
        correctAnswer: 1,
        explanation: "The authenticated user's ID is stored in 'request.auth.uid'. If 'request.auth' is null, the user is unauthenticated."
      },
      {
        question: "Why should message documents be stored in nested subcollections under each room rather than a flat root collection?",
        options: ["Firestore doesn't allow flat collections", "To isolate data, simplify security rules, and optimize query scalability", "To save on Firestore write costs", "To enforce automatic SQL joins"],
        correctAnswer: 1,
        explanation: "Nested subcollections isolate message data per chat room, avoiding unnecessary full-database scans, simplifying ACL security filters, and improving layout speed."
      }
    ],
    quizAr: [
      {
        question: "كيف يتم تنظيم السجلات والبيانات داخل قاعدة بيانات Cloud Firestore؟",
        options: ["جداول وصفوف SQL", "مستندات تشبه JSON منظمة داخل مجموعات", "عقد ورسوم بيانية", "أزواج مفتاح وقيمة مسطحة"],
        correctAnswer: 1,
        explanation: "فايرستور هي قاعدة بيانات مستندات NoSQL. تُخزن البيانات في مستندات شبيهة بـ JSON، وتُنظم هذه المستندات داخل مجموعات."
      },
      {
        question: "في قواعد أمان فيربيز، ما هو المتغير السحابي الذي يحمل المعرف الفريد للمستخدم الذي يجري الطلب؟",
        options: ["request.uid", "request.auth.uid", "user.auth.id", "caller.id"],
        correctAnswer: 1,
        explanation: "يتم تخزين معرف المستخدم المصادق عليه في المتغير السحابي 'request.auth.uid'. وإذا كان 'request.auth' فارغاً، فهذا يعني أن المستخدم مجهول الهوية."
      },
      {
        question: "لماذا يُفضل تخزين مستندات الرسائل كمجموعة فرعية متداخلة تحت كل غرفة بدلاً من مجموعة رئيسية مسطحة؟",
        options: ["لأن فايرستور لا تسمح بالمجموعات المسطحة", "لعزل البيانات، وتبسيط قواعد الأمان، وتوفير كفاءة عالية في الاستعلامات", "لتقليل تكاليف الكتابة فقط", "لفرض عمليات ربط SQL تلقائياً"],
        correctAnswer: 1,
        explanation: "المجموعات الفرعية المتداخلة تعزل الرسائل الخاصة بكل غرفة دردشة، وتمنع عمليات البحث العشوائي لكامل قاعدة البيانات، وتبسط شروط الأمان."
      }
    ],
    challenge: {
      instruction: "Write a Dart method signature 'fromJson(Map<String, dynamic> json, String id)' that converts a Firestore document map back into a Domain Message Entity, handling missing or null timestamps gracefully.",
      starterCode: `// Implement JSON map translation into Message Entity
// Timestamp in firestore comes as dynamic, resolve it to DateTime safely.

import 'dart:core';

class Message {
  final String id;
  final String text;
  final DateTime sentAt;

  Message({required this.id, required this.text, required this.sentAt});

  factory Message.fromJson(Map<String, dynamic> json, String documentId) {
    // TODO: safely parse fields and handle default time fallback if null
    return Message(
      id: documentId,
      text: '',
      sentAt: DateTime.now(),
    );
  }
}`,
      sampleSolution: `class Message {
  final String id;
  final String text;
  final DateTime sentAt;

  Message({required this.id, required this.text, required this.sentAt});

  factory Message.fromJson(Map<String, dynamic> json, String documentId) {
    return Message(
      id: documentId,
      text: json['text'] as String? ?? '',
      sentAt: json['sentAt'] != null 
          ? (json['sentAt'] as dynamic).toDate() as DateTime 
          : DateTime.now(),
    );
  }
}`,
      gradingCriteria: "Checks if type casting is handled safely with null check operators or default fallbacks for text and dates."
    },
    challengeAr: {
      instruction: "اكتب دالة دارت 'fromJson(Map<String, dynamic> json, String id)' تقوم بتحويل مستند فايرستور (JSON Map) إلى كيان الرسالة (Message Entity)، مع معالجة الطوابع الزمنية الفارغة أو غير المتطابقة بأمان.",
      starterCode: `// تحويل خرائط البيانات القادمة من فايرستور لكيان الرسالة
// تذكر أن الطابع الزمني قد يأتي بنوعية متغيرة، حوله لـ DateTime بأمان.

import 'dart:core';

class Message {
  final String id;
  final String text;
  final DateTime sentAt;

  Message({required this.id, required this.text, required this.sentAt});

  factory Message.fromJson(Map<String, dynamic> json, String documentId) {
    // TODO: حلل الحقول بأمان ووفر قيمة بديلة للوقت إن كان فارغاً
    return Message(
      id: documentId,
      text: '',
      sentAt: DateTime.now(),
    );
  }
}`,
      sampleSolution: `class Message {
  final String id;
  final String text;
  final DateTime sentAt;

  Message({required this.id, required this.text, required this.sentAt});

  factory Message.fromJson(Map<String, dynamic> json, String documentId) {
    return Message(
      id: documentId,
      text: json['text'] as String? ?? '',
      sentAt: json['sentAt'] != null 
          ? (json['sentAt'] as dynamic).toDate() as DateTime 
          : DateTime.now(),
    );
  }
}`,
      gradingCriteria: "التحقق من تحويل الأنواع بأمان والتعامل مع القيم الفارغة (Null-safety) وتجنب الأخطاء البرمجية عند غياب الحقول."
    }
  },
  {
    id: "step3",
    title: "Implementing Responsive Chat UI Layout",
    titleAr: "تصميم واجهة مستخدم متجاوبة للدردشة",
    description: "Build an elegant, interactive chat screen utilizing ListView.builder, message bubble widgets, and keyboard-aware text inputs.",
    descriptionAr: "بناء شاشة دردشة أنيقة وتفاعلية باستخدام أداة قائمة الرسائل المتكررة ومربعات النصوص الذكية المتوافقة مع لوحة المفاتيح.",
    goals: [
      "Render a list with ListView.builder employing 'reverse: true' for natural conversation flows",
      "Style distinctive visual bubbles separating my messages from foreign participants",
      "Integrate layout containers adapting seamlessly when virtual keyboards shift screen spaces"
    ],
    goalsAr: [
      "تصميم قائمة عرض ذكية باستخدام ListView.builder وخاصية الانعكاس 'reverse: true'",
      "تنسيق فقاعات الرسائل بصرياً للتمييز بين رسائلك ورسائل بقية الزملاء",
      "ملاءمة مساحة العرض البرمجية لتفادي مشكلة تغطية لوحة المفاتيح لحقل الإدخال"
    ],
    content: `### Constructing the Client Viewport

To build an engaging user experience, we combine responsive widgets. A chat viewport contains three main zones: the AppBar (header), the Chat Thread (middle), and the Input Composer (bottom).

#### 1. The Scrollable Chat Thread
We use \`ListView.builder\` paired with \`reverse: true\`. In a standard list view, item 0 displays at the top. Setting \`reverse: true\` flips this layout, anchoring item 0 to the bottom. This is ideal for chats because when users open a channel, or new messages arrive, the list remains pinned to the bottom.

#### 2. Keyboard-Aware Input Area
Mobile devices slide software keyboards over the active app window, which can overlap input fields.
To prevent this, we wrap our layout inside a \`Scaffold\` widget. Flutter automatically resizes the view in response to keyboard presence by updating the bottom inset.

\`\`\`dart
Scaffold(
  resizeToAvoidBottomInset: true, // Auto-resizes layout when keyboard opens!
  body: Column(
    children: [
      Expanded(
        child: ListView.builder(
          reverse: true, // Anchor list view scroll viewport to bottom
          itemCount: messages.length,
          itemBuilder: (context, index) => MessageBubble(message: messages[index]),
        ),
      ),
      ChatInputComposer(), // Kept securely above the sliding keyboard
    ],
  ),
);
\`\`\`
*JVM Note*: Unlike old Android layouts where developers manually configured XML windowSoftInputMode attributes in the AndroidManifest, Flutter's layout engine dynamically calculates viewports and pushes widgets upward in response to window metrics.`,
    contentAr: `### بناء شاشة العرض التفاعلية للعميل

لتقديم تجربة مستخدم ممتعة، نقوم بدمج أدوات فلاتر المتجاوبة. تحتوي واجهة غرفة الدردشة على ثلاث مناطق رئيسية: شريط التطبيق (الترويسة)، شريط الرسائل (الوسط)، وحقل إدخال الرسائل (الأسفل).

#### 1. شريط الرسائل القابل للتمرير
نستخدم \`ListView.builder\` مدمجًا مع خاصية \`reverse: true\`. في قوائم العرض الافتراضية، يظهر العنصر رقم 0 في الأعلى. تفعيل الانعكاس \`reverse: true\` يعكس هذا الترتيب، ليثبت العنصر رقم 0 في الأسفل. هذا مناسب جداً للدردشات لتبقى الرسائل الجديدة دائمًا مرئية ومثبتة في قاع الشاشة.

#### 2. حماية حقل الإدخال عند ظهور لوحة المفاتيح
تقوم الهواتف الذكية بعرض لوحة المفاتيح فوق واجهات التطبيقات، مما قد يؤدي لتغطية حقل الإدخال.
لتفادي ذلك، نستخدم هيكل واجهات \`Scaffold\`، حيث يقوم فلاتر تلقائيًا بتغيير حجم الشاشة عند فتح لوحة المفاتيح ودفع الحقول للأعلى.

\`\`\`dart
Scaffold(
  resizeToAvoidBottomInset: true, // يغير حجم الواجهة تلقائيًا لتفادي تغطية لوحة المفاتيح
  body: Column(
    children: [
      Expanded(
        child: ListView.builder(
          reverse: true, // تثبيت نهاية القائمة بأسفل الشاشة
          itemCount: messages.length,
          itemBuilder: (context, index) => MessageBubble(message: messages[index]),
        ),
      ),
      ChatInputComposer(), // حقل الإدخال يرتفع تلقائيًا مع لوحة المفاتيح
    ],
  ),
);
\`\`\`
*مقارنة مع بيئة جافا وأندرويد*: قديماً في أندرويد كان المطور يقوم بإعداد متغيرات معقدة في ملف AndroidManifest لكل شاشة. أما في فلاتر، فيقوم المحرك تلقائيًا بحساب أبعاد الشاشة ودفع المكونات للأعلى بشكل سلس وتلقائي.`,
    quiz: [
      {
        question: "Which parameter on a ListView widget must be set to true to anchor the scroll viewport to the bottom for instant chat feeds?",
        options: ["shrinkWrap", "primary", "reverse", "keepAlive"],
        correctAnswer: 2,
        explanation: "Setting 'reverse: true' aligns scroll views starting from the bottom of the viewport, which is standard for chat threads."
      },
      {
        question: "How does Flutter automatically prevent the virtual keyboard from overlapping text input fields inside a Scaffold?",
        options: ["By setting resizeToAvoidBottomInset to true", "By wrapping in a Scrollbar", "By declaring XML settings in pubspec.yaml", "It is not possible to prevent this automatically"],
        correctAnswer: 0,
        explanation: "By default, Scaffold.resizeToAvoidBottomInset is true. This instructs the Scaffold to dynamically compress its height by the keyboard's exact pixel height, pushing the input bar upward."
      },
      {
        question: "Which controller is used in Flutter to capture keyboard inputs, change text values, and clear text fields dynamically?",
        options: ["ScrollController", "TextEditingController", "StateController", "KeyboardManager"],
        correctAnswer: 1,
        explanation: "TextEditingController is the controller used to manage the text values of a TextField, trigger callbacks on changes, and clear input when submitting."
      }
    ],
    quizAr: [
      {
        question: "ما هو المتغير البرمجي في قائمة عرض فلاتر ListView الذي يجب تفعيله كـ true لتثبيت التمرير بأسفل شاشة المحادثة؟",
        options: ["shrinkWrap", "primary", "reverse", "keepAlive"],
        correctAnswer: 2,
        explanation: "تحديد 'reverse: true' يجعل القائمة تبدأ الترتيب والتمرير من الأسفل إلى الأعلى، وهو السلوك القياسي في تطبيقات الدردشة الفورية."
      },
      {
        question: "كيف يمنع فلاتر لوحة المفاتيح الافتراضية من تغطية حقول النصوص والمدخلات بشكل تلقائي داخل الـ Scaffold؟",
        options: ["بجعل قيمة resizeToAvoidBottomInset تساوي true", "عن طريق لف الواجهة بـ Scrollbar", "عبر تكوين ملفات XML في المجلدات الخارجية", "لا يمكن عمل ذلك بشكل تلقائي وتتطلب برمجية معقدة"],
        correctAnswer: 0,
        explanation: "افتراضياً، تكون قيمة Scaffold.resizeToAvoidBottomInset هي true. هذا يوجه التطبيق لتعديل حجم الارتفاع تلقائيًا ودفع الحقول للأعلى لتبقى مرئية."
      },
      {
        question: "ما هو الكائن البرمجي المسؤول عن التقاط مدخلات المستخدم من لوحة المفاتيح والتحكم بنصوص الإدخال ومسحها؟",
        options: ["ScrollController", "TextEditingController", "StateController", "KeyboardManager"],
        correctAnswer: 1,
        explanation: "الكائن TextEditingController هو المتحكم المسؤول عن مراقبة قيم المدخلات في TextField، ومسح النص، أو تعديل المدخلات برمجياً."
      }
    ],
    challenge: {
      instruction: "Write a Flutter Stateless Widget called 'MessageBubble' that renders a container with a rounded background. Apply sky-500 blue backing if 'isMe' is true, and gray-200 if 'isMe' is false.",
      starterCode: `// Implement a simple message bubble layout
import 'package:flutter/material.dart';

class MessageBubble extends StatelessWidget {
  final String text;
  final bool isMe;

  const MessageBubble({Key? key, required this.text, required this.isMe}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // TODO: Return a styled Container with rounded corners and conditional colors
    return Container();
  }
}`,
      sampleSolution: `import 'package:flutter/material.dart';

class MessageBubble extends StatelessWidget {
  final String text;
  final bool isMe;

  const MessageBubble({Key? key, required this.text, required this.isMe}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: isMe ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
        margin: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
        decoration: BoxDecoration(
          color: isMe ? Colors.blue : Colors.grey[350],
          borderRadius: BorderRadius.circular(12),
        ),
        child: Text(
          text,
          style: TextStyle(color: isMe ? Colors.white : Colors.black),
        ),
      ),
    );
  }
}`,
      gradingCriteria: "Checks if the bubble uses the Align widget and applies conditional color decorations based on the 'isMe' boolean parameter."
    },
    challengeAr: {
      instruction: "اكتب واجهة فلاتر ذكية 'MessageBubble' (Stateless Widget) تقوم بعرض حاوية رسائل ملوّنة. استخدم خلفية زرقاء (Colors.blue) إذا كانت القيمة 'isMe' صحيحة، وخلفية رمادية (Colors.grey) إذا كانت القيمة 'isMe' خاطئة.",
      starterCode: `// إعداد واجهة فقاعة الرسالة
import 'package:flutter/material.dart';

class MessageBubble extends StatelessWidget {
  final String text;
  final bool isMe;

  const MessageBubble({Key? key, required this.text, required this.isMe}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // TODO: ارجع حاوية منسقة بزوايا دائرية وألوان متغيرة حسب المرسل
    return Container();
  }
}`,
      sampleSolution: `import 'package:flutter/material.dart';

class MessageBubble extends StatelessWidget {
  final String text;
  final bool isMe;

  const MessageBubble({Key? key, required this.text, required this.isMe}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: isMe ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
        margin: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
        decoration: BoxDecoration(
          color: isMe ? Colors.blue : Colors.grey[350],
          borderRadius: BorderRadius.circular(12),
        ),
        child: Text(
          text,
          style: TextStyle(color: isMe ? Colors.white : Colors.black),
        ),
      ),
    );
  }
}`,
      gradingCriteria: "التحقق من تفعيل أداة المحاذاة (Align) وتطبيق الألوان الشرطية للحاوية بناءً على قيمة المتغير المنطقي 'isMe'."
    }
  },
  {
    id: "step4",
    title: "Real-time Message Updates with StreamBuilder",
    titleAr: "التحديثات الفورية للرسائل باستخدام StreamBuilder",
    description: "Connect your UI directly to a live database connection. Learn Dart Streams and StreamBuilder state managers.",
    descriptionAr: "ربط واجهة المستخدم بقناة تواصل حية مع قاعدة البيانات. تعلم تدفق البيانات (Streams) والتحكم الفوري بـ StreamBuilder.",
    goals: [
      "Understand Dart Streams compared to RxJava or Java reactive components",
      "Configure StreamBuilder to automatically reconstruct message feeds when updates occur",
      "Manage loading states, empty collection fallbacks, and connection errors"
    ],
    goalsAr: [
      "فهم مفهوم تدفق البيانات في دارت (Streams) ومقارنته بالمكتبات التفاعلية لجافا",
      "إعداد أداة StreamBuilder لإعادة بناء شاشة المحادثة تلقائيًا عند وصول أي رسالة",
      "معالجة حالات تحميل البيانات، والقوائم الفارغة، ومشكلات الاتصال بالشبكة"
    ],
    content: `### Wire Up the Reactive Data Pipeline

Rather than issuing HTTP GET queries periodically to fetch new messages (which creates excessive server polling overhead), we establish active socket streams. Dart provides first-class support for asynchronous data pipelines via **Streams**.

#### Concept comparison:
*   **Java Reactive Streams / RxJava**: Requires external libraries (\`RxJava3\`, \`Project Reactor\`), manual scheduler mappings (\`subscribeOn(Schedulers.io())\`), and complex subscription disposals.
*   **Sound Dart Streams**: Baked directly into the core language runtime. Mapped naturally to widgets via the declarative **StreamBuilder** component, which handles sub/unsub flows automatically.

\`\`\`dart
StreamBuilder<List<Message>>(
  stream: chatRepository.watchMessages(chatRoomId),
  builder: (context, snapshot) {
    if (snapshot.connectionState == ConnectionState.waiting) {
      return const Center(child: CircularProgressIndicator());
    }
    if (snapshot.hasError) {
      return Center(child: Text("Error: \${snapshot.error}"));
    }
    if (!snapshot.hasData || snapshot.data!.isEmpty) {
      return const Center(child: Text("Write a message to start conversing!"));
    }

    final messages = snapshot.data!;
    return ListView.builder(
      reverse: true,
      itemCount: messages.length,
      itemBuilder: (context, index) => MessageBubble(message: messages[index]),
    );
  },
)
\`\`\`
*Memory Lifecycle Security*: When the parent screen is popped or destroyed, \`StreamBuilder\` automatically terminates its collection subscription under the hood, guarding against accidental client memory leaks.`,
    contentAr: `### ربط خط البيانات الفوري للدردشة

بدلاً من إجراء طلبات HTTP GET دورية لجلب الرسائل الجديدة (والتي تستهلك الخوادم وتسبب بطئاً بالتحديث)، نستخدم الاتصال المفتوح (Socket Streams). توفر لغة دارت دعماً أصيلاً للتعامل مع البيانات المتدفقة غير المتزامنة عبر **الـ Streams**.

#### مقارنة مع بيئات جافا:
*   **RxJava / Java Reactive Streams**: تتطلب مكتبات خارجية معقدة (\`RxJava3\`) وتحكماً يدوياً بالمجدول وتتبع اشتراكات الذاكرة والـ Disposables.
*   **Dart Streams الأصيل**: مبني داخل اللغة مباشرة. وبدمجه مع مكون الواجهات **StreamBuilder** في فلاتر، يتم فتح وإغلاق الاشتراكات تلقائيًا عند مغادرة الشاشة.

\`\`\`dart
StreamBuilder<List<Message>>(
  stream: chatRepository.watchMessages(chatRoomId),
  builder: (context, snapshot) {
    if (snapshot.connectionState == ConnectionState.waiting) {
      return const Center(child: CircularProgressIndicator());
    }
    if (snapshot.hasError) {
      return Center(child: Text("خطأ: \${snapshot.error}"));
    }
    if (!snapshot.hasData || snapshot.data!.isEmpty) {
      return const Center(child: Text("ابدأ المحادثة بإرسال أول رسالة!"));
    }

    final messages = snapshot.data!;
    return ListView.builder(
      reverse: true,
      itemCount: messages.length,
      itemBuilder: (context, index) => MessageBubble(message: messages[index]),
    );
  },
)
\`\`\`
*حماية الذاكرة والتسريبات*: عند مغادرة الشاشة أو إغلاقها، يقوم الـ \`StreamBuilder\` داخليًا بإنهاء الاشتراك في تدفق بيانات فايرستور تلقائيًا، مما يحمي التطبيق من تسريبات الذاكرة (Memory Leaks).`,
    quiz: [
      {
        question: "Which Dart/Flutter widget is custom-designed to subscribe to an asynchronous stream of updates and rebuild the widget layout automatically?",
        options: ["FutureBuilder", "StreamBuilder", "StatefulBuilder", "ValueListenableBuilder"],
        correctAnswer: 1,
        explanation: "StreamBuilder is designed for active continuously updating Streams. FutureBuilder is for single, one-time asynchronous results."
      },
      {
        question: "How does StreamBuilder prevent client memory leaks when the UI widget is destroyed or popped from the navigation stack?",
        options: ["It requires manual dispose() loops", "It automatically cancels its internal Stream Subscription", "By using the garbage collector's manual hooks", "It does not prevent memory leaks"],
        correctAnswer: 1,
        explanation: "StreamBuilder manages its subscription state lifecycle. When deactivated, it automatically invokes cancel() on its active Stream subscription."
      },
      {
        question: "What property of the StreamBuilder AsyncSnapshot checks whether a collection query failed on the network or database server?",
        options: ["snapshot.hasData", "snapshot.hasError", "snapshot.isComplete", "snapshot.connectionState == ConnectionState.none"],
        correctAnswer: 1,
        explanation: "The snapshot.hasError boolean property checks if an exception was thrown. If true, the exact error details can be extracted via snapshot.error."
      }
    ],
    quizAr: [
      {
        question: "أي من أدوات فلاتر مصممة خصيصاً للاشتراك بقنوات البيانات المتدفقة غير المتزامنة وتحديث الواجهة تلقائياً؟",
        options: ["FutureBuilder", "StreamBuilder", "StatefulBuilder", "ValueListenableBuilder"],
        correctAnswer: 1,
        explanation: "أداة StreamBuilder مخصصة للاشتراكات المفتوحة وتحديثات البيانات المتدفقة باستمرار، بينما FutureBuilder تُستخدم لطلبات البيانات التي تكتمل مرة واحدة فقط."
      },
      {
        question: "كيف يحمي الـ StreamBuilder التطبيق من تسريبات الذاكرة عند إغلاق واجهة المستخدم أو مغادرة الشاشة؟",
        options: ["يتطلب استدعاء حلقة تدمير يدوية dispose()", "يقوم تلقائيًا بإلغاء الاشتراك الداخلي لقناة البيانات المفتوحة", "باستخدام عمليات كنس الذاكرة اليدوية", "لا يحمي من تسريبات الذاكرة تلقائياً"],
        correctAnswer: 1,
        explanation: "يتحكم StreamBuilder بدورة حياة واجهته. بمجرد إلغاء نشاط الأداة أو إغلاقها، يقوم بإلغاء الاشتراك تلقائيًا بقناة البيانات."
      },
      {
        question: "أي من خصائص الـ AsyncSnapshot نستخدمها للتحقق من وجود مشاكل في الاتصال بالشبكة أو الخادم السحابي؟",
        options: ["snapshot.hasData", "snapshot.hasError", "snapshot.isComplete", "snapshot.connectionState == ConnectionState.none"],
        correctAnswer: 1,
        explanation: "تتحقق الخاصية المنطقية snapshot.hasError مما إذا كان هناك خطأ مرسل من الخادم، ويمكن قراءة تفاصيل الخطأ عبر snapshot.error."
      }
    ],
    challenge: {
      instruction: "Draft a basic Stream Transformer structure in Dart that receives a stream of integers and maps them to double their values.",
      starterCode: `// Map a stream of numbers to double their value using map()
import 'dart:async';

Stream<int> doubleNumbersStream(Stream<int> sourceStream) {
  // TODO: Transform source stream using map and return the result
  return sourceStream;
}`,
      sampleSolution: `import 'dart:async';

Stream<int> doubleNumbersStream(Stream<int> sourceStream) {
  return sourceStream.map((value) => value * 2);
}`,
      gradingCriteria: "Checks if the .map() operator is cleanly utilized on the source stream to transform and return values."
    },
    challengeAr: {
      instruction: "صمم دالة تحويل برمجية (Stream Transformer) بلغة دارت تستقبل قناة أرقام صحيحة (Stream of integers) وتقوم بمضاعفة قيمتها.",
      starterCode: `// مضاعفة قيم الأرقام في تدفق البيانات باستخدام دالة الخرائط map()
import 'dart:async';

Stream<int> doubleNumbersStream(Stream<int> sourceStream) {
  // TODO: حوّل البيانات القادمة وقم بمضاعفتها
  return sourceStream;
}`,
      sampleSolution: `import 'dart:async';

Stream<int> doubleNumbersStream(Stream<int> sourceStream) {
  return sourceStream.map((value) => value * 2);
}`,
      gradingCriteria: "التحقق من استخدام معامل .map() لتعديل قيم تدفق الأرقام وإرجاعها بشكل تفاعلي صحيح."
    }
  },
  {
    id: "step5",
    title: "User Presence Loops & Batched Read Receipts",
    titleAr: "مؤشرات التواجد وإيصالات القراءة التفاعلية",
    description: "Build advanced real-time features. Use AppLifecycleListener to track active users and update Firestore batch keys for receipts.",
    descriptionAr: "بناء مزايا تفاعلية متقدمة. تتبع نشاط المستخدمين برمجياً وتعديل مؤشرات القراءة باستخدام حزم العمليات فايرستور.",
    goals: [
      "Listen to AppLifecycleListener to mark users offline when backgrounded",
      "Write high-performance Firestore transactional batch writes (WriteBatch)",
      "Design live visual presence indicators reflecting real-time online state changes"
    ],
    goalsAr: [
      "مراقبة دورة حياة التطبيق وتحديد المستخدم كغير متصل بمجرد خروجه للخلفية",
      "كتابة عمليات تحديث جماعية سريعة باستخدام حزم العمليات (WriteBatch)",
      "تصميم مؤشرات التواجد البصرية ونقاط الحالة الخضراء والرمادية"
    ],
    content: `### Architecting Advanced Real-time Features

Once the core messages flow, standard chat apps distinguish themselves with interactive features: User Presence (who is online right now) and Read Receipts (who has read what).

#### 1. Managing Live Presence
We listen to the application lifecycle state using Flutter's \`AppLifecycleListener\` or \`WidgetsBindingObserver\`. When the app enters the background or kills its connection, we execute a quick, synchronous write to Firestore.

#### 2. Batched Read Receipts (Transactional Writes)
Updating a single message document as read whenever a user views it can result in a massive overhead of individual database writes. To solve this, we use a **WriteBatch** to group operations together, submitting them in a single network trip.

\`\`\`dart
Future<void> markMessagesAsRead(String chatRoomId, String currentUserId) async {
  final WriteBatch batch = FirebaseFirestore.instance.batch();
  
  // Query all unread messages in the room sent by other participants
  final querySnapshot = await FirebaseFirestore.instance
      .collection('chat_rooms')
      .doc(chatRoomId)
      .collection('messages')
      .where('senderId', isNotEqualTo: currentUserId)
      .where('isRead', isEqualTo: false)
      .get();

  for (var doc in querySnapshot.docs) {
    batch.update(doc.reference, {
      'isRead': true,
      'readBy': FieldValue.arrayUnion([currentUserId]),
    });
  }

  // Atomically commit all changes as a single transaction!
  await batch.commit();
}
\`\`\`
*JVM Comparison*: This is equivalent to Hibernate or JPA transactional bulk updates, securing atomic execution without risking half-written dirty states in your database logs.`,
    contentAr: `### هندسة الميزات التفاعلية المتقدمة

بعد نجاح المحادثة الأساسية، تبرز جودة التطبيق بوجود المزايا التفاعلية: مؤشر تواجد المستخدمين (من هو متصل الآن) وإيصالات قراءة الرسائل (من قرأ ماذا).

#### 1. تتبع حالة التواجد والاتصال
نقوم بالاستماع لدورة حياة التطبيق (App Lifecycle) باستخدام \`WidgetsBindingObserver\` أو \`AppLifecycleListener\`. وبمجرد خروج المستخدم لخلفية الهاتف أو إغلاق التطبيق، نقوم بتحديث حالته في المستند السحابي فوراً.

#### 2. إيصالات القراءة الجماعية (Batch Writes)
تحديث كل رسالة بشكل مستقل كـ 'مقروءة' في كل مرة يفتح فيها المستخدم الدردشة يسبب ضغطاً هائلاً على الخوادم وقاعدة البيانات. ولحل هذه المشكلة هندسياً، نستخدم **WriteBatch** لتجميع التحديثات وإرسالها دفعة واحدة كعملية برمجية واحدة.

\`\`\`dart
Future<void> markMessagesAsRead(String chatRoomId, String currentUserId) async {
  final WriteBatch batch = FirebaseFirestore.instance.batch();
  
  // استعلام عن الرسائل غير المقروءة في الغرفة والتي أرسلها الآخرون
  final querySnapshot = await FirebaseFirestore.instance
      .collection('chat_rooms')
      .doc(chatRoomId)
      .collection('messages')
      .where('senderId', isNotEqualTo: currentUserId)
      .where('isRead', isEqualTo: false)
      .get();

  for (var doc in querySnapshot.docs) {
    batch.update(doc.reference, {
      'isRead': true,
      'readBy': FieldValue.arrayUnion([currentUserId]),
    });
  }

  // إرسال وتطبيق الحزمة البرمجية بالكامل كعملية ذرية واحدة!
  await batch.commit();
}
\`\`\`
*مقارنة مع بيئات جافا*: هذه العملية تشابه تنفيذ المعاملات الإجمالية (Transactional bulk updates) في Hibernate أو JPA، مما يضمن اتساق البيانات وعدم وجود بيانات غير مكتملة أو تالفة في سجلات النظام.`,
    quiz: [
      {
        question: "What Firestore mechanism allows a client to aggregate multiple document updates and commit them simultaneously as a single atomic transaction?",
        options: ["WriteBatch", "DocumentCollection", "QuerySnapshot", "TransactionMerge"],
        correctAnswer: 0,
        explanation: "WriteBatch allows grouped write/update operations to execute in a single atomic network payload, ensuring high-speed transactional performance."
      },
      {
        question: "Which class in Flutter allows you to monitor whether your application is in the foreground, minimized, or entering the background?",
        options: ["AppLifecycleListener (or WidgetsBindingObserver)", "ScreenStateManager", "SystemUiOverlay", "ApplicationThemeObserver"],
        correctAnswer: 0,
        explanation: "AppLifecycleListener (and the WidgetsBindingObserver interface) lets developers hook into lifecycle states like resumed, paused, and inactive."
      },
      {
        question: "In standard Firestore operations, what does a WriteBatch commit guarantee?",
        options: ["The operations are free", "The operations either all succeed together or all fail together (Atomicity)", "Automatic offline translations", "The collection structure gets converted to SQL Tables"],
        correctAnswer: 1,
        explanation: "Like SQL transactions, a WriteBatch guarantees atomicity: all updates inside the batch succeed or fail as a single indivisible unit."
      }
    ],
    quizAr: [
      {
        question: "ما هي التقنية البرمجية في فايرستور التي تسمح بتجميع عدة عمليات تعديل للمستندات وإرسالها معاً كعملية ذرية موحدة؟",
        options: ["WriteBatch", "DocumentCollection", "QuerySnapshot", "TransactionMerge"],
        correctAnswer: 0,
        explanation: "تتيح أداة الـ WriteBatch للمطور دمج عدة عمليات كتابة أو تعديل وإرسالها للخادم دفعة واحدة لتحقيق سرعة عالية وحماية اتساق البيانات."
      },
      {
        question: "ما هي الفئة البرمجية في فلاتر التي تتيح لك مراقبة حالة تشغيل التطبيق (في الواجهة، مصغر، أو في الخلفية)؟",
        options: ["AppLifecycleListener (أو WidgetsBindingObserver)", "ScreenStateManager", "SystemUiOverlay", "ApplicationThemeObserver"],
        correctAnswer: 0,
        explanation: "تسمح أداة AppLifecycleListener للمطور برصد ومعالجة دورات حياة التطبيق المختلفة (نشط، متوقف مؤقتًا، غير نشط)."
      },
      {
        question: "في السلوك البرمجي لفايرستور، ماذا يضمن إرسال الـ WriteBatch؟",
        options: ["أن تكون العمليات مجانية التكلفة", "أن تنجح كل العمليات معاً أو تفشل معاً بالكامل (Atomicity)", "الترجمة التلقائية لقيم الحقول", "تحويل مستندات NoSQL لجداول SQL علاقية"],
        correctAnswer: 1,
        explanation: "مثل عمليات قواعد البيانات SQL، يضمن الـ WriteBatch اتساق البيانات البرمجي: فإما أن تنجح كل العمليات داخل الحزمة أو يتم التراجع عنها بالكامل لتجنب التلف."
      }
    ],
    challenge: {
      instruction: "Draft a Dart function structure that takes an AppLifecycleState enum and returns true if the application has just been minimized or put in the background.",
      starterCode: `// Return true if app lifecycle enters background state (inactive or paused)
import 'package:flutter/widgets.dart';

bool isAppInBackground(AppLifecycleState state) {
  // TODO: Check state and return true if paused or inactive
  return false;
}`,
      sampleSolution: `import 'package:flutter/widgets.dart';

bool isAppInBackground(AppLifecycleState state) {
  return state == AppLifecycleState.paused || state == AppLifecycleState.inactive;
}`,
      gradingCriteria: "Checks if the conditional statement evaluates 'AppLifecycleState.paused' or 'AppLifecycleState.inactive' correctly."
    },
    challengeAr: {
      instruction: "اكتب دالة برمجية بلغة دارت تستقبل حالة دورة حياة التطبيق (AppLifecycleState) وترجع القيمة 'true' إذا تم تصغير التطبيق أو نقله للخلفية.",
      starterCode: `// إرجاع قيمة صحيحة إذا كان التطبيق في الخلفية (paused أو inactive)
import 'package:flutter/widgets.dart';

bool isAppInBackground(AppLifecycleState state) {
  // TODO: تحقق من الحالة وأرجع true إذا كان التطبيق متوقفاً أو بالخلفية
  return false;
}`,
      sampleSolution: `import 'package:flutter/widgets.dart';

bool isAppInBackground(AppLifecycleState state) {
  return state == AppLifecycleState.paused || state == AppLifecycleState.inactive;
}`,
      gradingCriteria: "التحقق من مقارنة المتغير بالحالات الصحيحة 'AppLifecycleState.paused' أو 'AppLifecycleState.inactive' للتوصل للنتيجة."
    }
  },
  {
    id: "step6",
    title: "Play Store & App Store Deployment",
    titleAr: "طريقة نشر وتوزيع التطبيق على المتاجر",
    description: "Launch your application to the world! Prepare production release builds, configure signing keys, and submit to App Store Connect and Google Play.",
    descriptionAr: "انطلق بتطبيقك للعالمية! تعلم تصدير نسخ الإنتاج المهيأة، وإعداد مفاتيح التشفير، والنشر على منصات جوجل بلاي وآبل ستور.",
    goals: [
      "Configure Android package names and iOS bundle identifiers correctly",
      "Generate release keystores and sign Android App Bundles (AAB)",
      "Set up Developer Play Console and Apple App Store Connect portals"
    ],
    goalsAr: [
      "تحديد أسماء حزم التطبيقات (Package Names & Bundle IDs) بالشكل الصحيح والنهائي",
      "توليد مفاتيح التشفير (Keystore) وتوقيع الحزم البرمجية للأندرويد (AAB)",
      "تكوين حساب المطور وإعداد لوحة التحكم في منصات Google Play و App Store Connect"
    ],
    content: `### Launching to Global Audiences

The final and most rewarding phase of development is publishing your Flutter artifact to digital storefronts. This ensures users can download your work on actual smartphones securely.

#### 1. Android Release Workflow
1.  **Unique Package Naming**: Set your identifier in \`android/app/build.gradle\` (e.g. \`com.university.chatapp\`).
2.  **Generate a Keystore**: This cryptographic key proves your identity. Run the Java keytool command:
    \`\`\`bash
    keytool -genkey -v -keystore upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
    \`\`\`
3.  **Configure signing**: Link this keystore in \`android/key.properties\`.
4.  **Export the App Bundle**: Run Flutter production compilation:
    \`\`\`bash
    flutter build appbundle
    \`\`\`
    This generates a highly optimized \`.aab\` file containing split binaries target-compiled to individual CPU layouts.

#### 2. iOS Release Workflow
1.  **Configure Bundle ID**: Match your app identifier inside Xcode.
2.  **Provisioning Certificates**: Register your Apple Developer account to configure signing keys.
3.  **Export the IPA archive**: Execute release compilation:
    \`\`\`bash
    flutter build ipa
    \`\`\`
4.  **Upload to App Store Connect**: Use Transporter or Xcode organizer to push the archive to Apple servers for review.

*JVM Note*: Since you understand Java and Android gradle build tooling, configuring key.properties and build.gradle scripts aligns directly with your existing knowledge of compile targets and resource optimization!`,
    contentAr: `### الانطلاق والنشر على المتاجر العالمية

المرحلة الأخيرة والأكثر أهمية هي نشر تطبيق فلاتر المكتمل على متاجر التطبيقات الرقمية. هذا يضمن إمكانية تحميل تطبيقك واستخدامه بأمان على الهواتف الذكية الحقيقية.

#### 1. آلية إعداد ونشر نسخة الأندرويد
1.  **اسم الحزمة الفريد (Package Name)**: قم بتعيينه في ملف \`android/app/build.gradle\` (مثلاً: \`com.university.chatapp\`).
2.  **توليد مستودع التشفير (Keystore)**: يثبت هذا المفتاح هويتك الرقمية كمالك ومطور للتطبيق. استخدم أمر جافا التالي:
    \`\`\`bash
    keytool -genkey -v -keystore upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
    \`\`\`
3.  **تكوين التوقيع**: قم بربط هذا المفتاح المشفر في ملف \`android/key.properties\`.
4.  **تصدير الحزمة النهائية**: قم بتشغيل أمر البناء النهائي للمشروع:
    \`\`\`bash
    flutter build appbundle
    \`\`\`
    سينتج هذا ملفاً مخصصاً ومحسناً بامتداد \`.aab\` يحتوي على شفرات برمجية خفيفة الوزن موجهة ومقسمة لمعالجات الهواتف المختلفة.

#### 2. آلية إعداد ونشر نسخة الـ iOS (آبل)
1.  **معرف الحزمة (Bundle ID)**: قم بتطابقه مع معرف تطبيقك في Xcode.
2.  **شهادات التوقيع الإلكتروني**: سجل حساب مطور آبل وقم بتكوين ملفات التعريف والشهادات الأمنية.
3.  **تصدير ملف الـ IPA**: قم بتشغيل أمر البناء النهائي:
    \`\`\`bash
    flutter build ipa
    \`\`\`
4.  **الرفع لمنصة App Store Connect**: استخدم برامج الرفع المخصصة Transporter أو Xcode لدفع الحزمة لخوادم المراجعة التابعة لشركة آبل للتصديق عليها وإتاحتها للجمهور.

*ملاحظة لمهندسي جافا*: نظراً لخلفيتكم الكبيرة بأدوات Gradle في بيئة أندرويد وجافا، فإن إعداد ملفات key.properties وتخصيص مستندات build.gradle سيتوافق تماماً وبسهولة مع معرفتكم السابقة!`,
    quiz: [
      {
        question: "What terminal command compiles a production-ready, split-binary Android package for submission to the Google Play Store?",
        options: ["flutter build apk", "flutter build appbundle", "flutter run --release", "flutter compile android"],
        correctAnswer: 1,
        explanation: "Google Play Store requires the Android App Bundle (.aab) format, built via 'flutter build appbundle'. It auto-generates optimized custom APK downloads for every user device configuration."
      },
      {
        question: "What is the purpose of generating a cryptographic upload Keystore before publishing an app?",
        options: ["To encrypt user chat messages", "To prove developer ownership identity and ensure subsequent updates are authentic and untampered", "To speed up compilation times", "To access the database server without password checks"],
        correctAnswer: 1,
        explanation: "The Keystore signing system verifies application authorship, protecting your application updates from being intercepted or replaced by fake third-party compiled packages."
      },
      {
        question: "What file in a Flutter Android project holds the unique Package Name and target/minimum SDK compilation levels?",
        options: ["android/app/build.gradle", "pubspec.yaml", "android/src/main/AndroidManifest.xml", "lib/main.dart"],
        correctAnswer: 0,
        explanation: "android/app/build.gradle holds the defaultConfig configuration containing applicationID (package name), minSdkVersion, and targetSdkVersion."
      }
    ],
    quizAr: [
      {
        question: "ما هو الأمر الذي يُستخدم عبر سطر الأوامر لبناء حزمة أندرويد نهائية ومحسنة للنشر والرفع على متجر جوجل بلاي؟",
        options: ["flutter build apk", "flutter build appbundle", "flutter run --release", "flutter compile android"],
        correctAnswer: 1,
        explanation: "يتطلب متجر جوجل بلاي إرسال التطبيق بصيغة Android App Bundle (.aab) التي يتم إنتاجها عبر أمر 'flutter build appbundle' لتوفير مساحات تحميل صغيرة للمستخدمين."
      },
      {
        question: "ما هي الفائدة الأساسية من توليد مفاتيح التشفير Keystore وتوقيع الحزمة الإلكترونية قبل إرسالها للمتاجر؟",
        options: ["تشفير نصوص ورسائل غرف الدردشة", "إثبات هوية المطور والتحقق من موثوقية وأمان أي تحديث مستقبلي للتطبيق لمنع القرصنة", "تسريع وقت البناء والترجمة البرمجية", "الدخول المباشر لقواعد البيانات السحابية دون كلمات سر"],
        correctAnswer: 1,
        explanation: "مستودع المفاتيح المشفرة يثبت ملكيتك للتطبيق ويضمن أن التحديثات المستقبلية آمنة وموقعة من نفس المطور لحماية هواتف المستخدمين."
      },
      {
        question: "أين نجد الملف المسؤول عن حفظ وتعيين اسم الحزمة (Package Name) وإصدارات النظام الأدنى (minSdkVersion) في بيئة أندرويد؟",
        options: ["android/app/build.gradle", "pubspec.yaml", "android/src/main/AndroidManifest.xml", "lib/main.dart"],
        correctAnswer: 0,
        explanation: "ملف الإعدادات android/app/build.gradle يحتوي على كتلة defaultConfig التي يُعرّف بداخلها اسم الحزمة وإصدارات الأندرويد المستهدفة."
      }
    ],
    challenge: {
      instruction: "Draft a final pre-flight checklist verification method called 'isAppReadyForProduction(String bundleId, bool isSigningConfigured)' in Dart. Return true if bundleId is not empty and isSigningConfigured is true.",
      starterCode: `// Validate production readiness variables
bool isAppReadyForProduction(String bundleId, bool isSigningConfigured) {
  // TODO: Implement checklist validation
  return false;
}`,
      sampleSolution: `bool isAppReadyForProduction(String bundleId, bool isSigningConfigured) {
  return bundleId.isNotEmpty && isSigningConfigured;
}`,
      gradingCriteria: "Checks if both arguments are correctly checked for presence and truthiness to safeguard release builds."
    },
    challengeAr: {
      instruction: "اكتب دالة برمجية بلغة دارت 'isAppReadyForProduction(String bundleId, bool isSigningConfigured)' ترجع القيمة 'true' فقط إذا كان اسم حزمة التطبيق ليس فارغاً وقيمة إعدادات التوقيع صحيحة.",
      starterCode: `// التحقق النهائي من معايير جاهزية النشر للمتاجر
bool isAppReadyForProduction(String bundleId, bool isSigningConfigured) {
  // TODO: تحقق من جاهزية المعايير وأرجع النتيجة
  return false;
}`,
      sampleSolution: `bool isAppReadyForProduction(String bundleId, bool isSigningConfigured) {
  return bundleId.isNotEmpty && isSigningConfigured;
}`,
      gradingCriteria: "التحقق من أن المعاملين يطابقان شروط الوجود والصحة بشكل منسق يضمن جودة البناء للإنتاج."
    }
  }
];

// Embedded step-chat component
interface StepAdvisorChatProps {
  stepId: string;
  stepTitle: string;
  language: "en" | "ar";
}

function StepAdvisorChat({ stepId, stepTitle, language }: StepAdvisorChatProps) {
  const [chatHistory, setChatHistory] = useState<{role: "user" | "model", text: string}[]>([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset or populate localized welcome message
    const welcomeText = language === "ar"
      ? `مرحباً بك! أنا مستشارك الذكي لمرحلة **"${stepTitle}"**. كيف يمكنني مساعدتك برمجياً في فهم هذه الخطوة أو حل أسئلتها؟`
      : `Welcome! I am your AI Guide for the **"${stepTitle}"** phase. Ask me any architectural questions, or ask for explanations regarding this step's goals!`;
    
    setChatHistory([
      { role: "model", text: welcomeText }
    ]);
  }, [stepId, language, stepTitle]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, loading]);

  const handleSend = async () => {
    const text = userInput.trim();
    if (!text || loading) return;

    setUserInput("");
    const newHistory = [...chatHistory, { role: "user" as const, text }];
    setChatHistory(newHistory);
    setLoading(true);

    try {
      // Custom assistant framing to focus purely on the selected Roadmap Step
      const customPrompt = `[Context: We are learning the real-time Chat Application Roadmap. We are currently on: "${stepTitle}" (Step ID: ${stepId}). Please provide guidance focused on this phase. If the user asks in Arabic, reply in Arabic.]\n\nUser Question: ${text}`;
      
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: customPrompt,
          history: chatHistory.map(h => ({
            role: h.role,
            text: h.text.substring(0, 1000) // safety limit
          }))
        })
      });

      if (!response.ok) throw new Error();
      const data = await response.json();
      setChatHistory([...newHistory, { role: "model" as const, text: data.reply }]);
    } catch {
      const errorMsg = language === "ar"
        ? "عذراً، حدث خطأ في الاتصال بالمستشار الذكي. يرجى مراجعة إعدادات مفتاح API الخاص بك."
        : "Failed to sync with AI Advisor. Please verify that your GEMINI_API_KEY is configured correctly.";
      setChatHistory([...newHistory, { role: "model" as const, text: errorMsg }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden mt-6 shadow-xs flex flex-col h-[350px]">
      <div className="bg-white dark:bg-slate-950 px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <Bot className="w-4 h-4 text-sky-500" />
          {language === "ar" ? "اسأل مساعد الذكاء الاصطناعي لهذه الخطوة" : "Ask Step AI Assistant"}
        </span>
        <span className="text-[10px] bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 font-bold uppercase tracking-wider px-2 py-0.5 rounded-full font-mono">
          {stepId.toUpperCase()}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatHistory.map((item, i) => (
          <div key={i} className={`flex gap-3 text-xs max-w-[85%] ${item.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}>
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border select-none ${
              item.role === "user" ? "bg-slate-200 border-slate-300 dark:bg-slate-800" : "bg-slate-900 text-white"
            }`}>
              {item.role === "user" ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3 text-sky-400" />}
            </div>
            <div className={`p-3 rounded-xl border ${
              item.role === "user" 
                ? "bg-sky-50 dark:bg-sky-950 border-sky-100 dark:border-sky-900/50 text-slate-800 dark:text-slate-100" 
                : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
            }`}>
              <MarkdownRenderer content={item.text} />
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3 text-xs max-w-[80%] animate-pulse">
            <div className="w-6 h-6 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <Loader className="w-3 h-3 animate-spin text-sky-400" />
            </div>
            <div className="p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-400">
              {language === "ar" ? "المستشار الذكي يحلل استفسارك..." : "Advisor is thinking..."}
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="bg-white dark:bg-slate-950 p-2 border-t border-slate-200 dark:border-slate-800 shrink-0 flex gap-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder={language === "ar" ? "اسأل عن الـ StreamBuilder أو Keystore..." : "Ask about StreamBuilder, Keystore, rules..."}
          className="flex-1 px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-sky-500"
        />
        <button
          onClick={handleSend}
          className="px-3 bg-sky-600 hover:bg-sky-500 text-white rounded-xl flex items-center justify-center transition-all"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// Main component props
interface LearningRoadmapProps {
  completedQuizzes: string[];
  completedRoadmapSteps: string[];
  onQuizCompleted: (stepId: string) => void;
  onStepCompleted: (stepId: string) => void;
  language: "en" | "ar";
}

export default function LearningRoadmap({
  completedQuizzes,
  completedRoadmapSteps,
  onQuizCompleted,
  onStepCompleted,
  language
}: LearningRoadmapProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  
  // Quiz state variables
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizError, setQuizError] = useState("");

  // Challenge code submission state
  const [studentCode, setStudentCode] = useState("");
  const [challengeGrade, setChallengeGrade] = useState<{passed: boolean, score: number, feedback: string} | null>(null);
  const [gradingLoading, setGradingLoading] = useState(false);

  const activeStep = ROADMAP_STEPS[activeStepIndex];

  // Load starter code on step swap
  useEffect(() => {
    const startCode = language === "ar" 
      ? activeStep.challengeAr.starterCode 
      : activeStep.challenge.starterCode;
    setStudentCode(startCode);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
    setQuizError("");
    setChallengeGrade(null);
  }, [activeStepIndex, language]);

  const handleAnswerSelect = (qIdx: number, oIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [qIdx]: oIdx
    });
  };

  const submitQuiz = () => {
    const currentQuiz = language === "ar" ? activeStep.quizAr : activeStep.quiz;
    if (Object.keys(selectedAnswers).length < currentQuiz.length) {
      setQuizError(language === "ar" ? "يرجى الإجابة على جميع الأسئلة لتسليم الاختبار." : "Please answer all questions before submitting.");
      return;
    }

    setQuizError("");
    let correctCount = 0;
    currentQuiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });

    setQuizScore(correctCount);
    setQuizSubmitted(true);

    // If passed (e.g., at least 2 correct out of 3)
    if (correctCount >= 2) {
      onQuizCompleted(activeStep.id);
    }
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
    setQuizError("");
  };

  const handleGradeChallenge = async () => {
    setGradingLoading(true);
    setChallengeGrade(null);

    const activeChal = language === "ar" ? activeStep.challengeAr : activeStep.challenge;

    try {
      const res = await fetch("/api/grade-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          challengeId: `${activeStep.id}_chal`,
          code: studentCode,
          challengeTitle: activeStep.title + " Sandbox",
          challengeConstraints: activeChal.gradingCriteria
        })
      });

      if (!res.ok) throw new Error();
      const data = await res.json();
      setChallengeGrade(data);

      if (data.passed) {
        onStepCompleted(activeStep.id);
      }
    } catch {
      // Fallback local verification
      const passed = studentCode.length > 50 && !studentCode.includes("TODO");
      const data = {
        passed,
        score: passed ? 90 : 40,
        feedback: language === "ar"
          ? "### التقييم المحلي الذكي\n\nشفرتك تحتوي على هياكل مناسبة! تأكد من إكمال جميع المتغيرات وخلو النص من علامات التنبيه (TODO) لربط الموديولات بنجاح."
          : "### Local Offline Grader\n\nYour Dart structure contains appropriate parameters! Ensure it does not contain default placeholders or unfinished markers."
      };
      setChallengeGrade(data);
      if (passed) {
        onStepCompleted(activeStep.id);
      }
    } finally {
      setGradingLoading(false);
    }
  };

  // Translations dictionary
  const dict = {
    stepsHeader: language === "ar" ? "مسار التعلم التفاعلي" : "Live Learning Roadmap",
    stepsDesc: language === "ar" ? "تتبع تقدمك لبناء تطبيق محادثة فوري ونشره على المتاجر خطوة بخطوة" : "Track your progress as you design, code, and deploy a secure real-time messaging application.",
    goalsLabel: language === "ar" ? "الأهداف البرمجية والتعليمية" : "Technical & Architectural Goals",
    contentLabel: language === "ar" ? "الشرح البرمجي والدروس" : "Interactive Lecture & Directives",
    quizHeader: language === "ar" ? "اختبار التقييم للخطوة (+100 نقطة XP)" : "Step Assessment Quiz (+100 XP)",
    quizPassed: language === "ar" ? "🎉 تهانينا! لقد اجتزت هذا الاختبار بنجاح." : "🎉 Congratulations! You have successfully passed this assessment.",
    quizFailed: language === "ar" ? "⚠️ لم تحقق درجة النجاح المطلوبة. حاول مرة أخرى للتأكيد." : "⚠️ You did not reach the passing score. Reset and try again to master the content.",
    scoreLabel: language === "ar" ? "الدرجة المستحقة:" : "Final Score:",
    submitQuizBtn: language === "ar" ? "تسليم الإجابات" : "Submit Assessment",
    resetQuizBtn: language === "ar" ? "إعادة المحاولة" : "Try Again",
    challengeHeader: language === "ar" ? "تحدي الشفرة البرمجية العملي (+100 نقطة XP)" : "Applied Code Sandbox Challenge (+100 XP)",
    challengeInstruction: language === "ar" ? "المطلوب برمجياً:" : "Challenge Directives:",
    criteriaLabel: language === "ar" ? "معايير التقييم الذكي:" : "AI Evaluation Parameters:",
    gradeBtn: language === "ar" ? "تقييم الشفرة بالذكاء الاصطناعي" : "Grade Submission with AI",
    gradingLabel: language === "ar" ? "جاري تقييم الشيفرة..." : "AI Advisor is compiling and grading...",
    challengePassed: language === "ar" ? "🏆 تم اجتياز التحدي بنجاح!" : "🏆 Challenge Completed Successfully!",
    challengeFailed: language === "ar" ? "❌ لم يتم اجتياز التحدي بعد." : "❌ Challenge Requirements Not Yet Met.",
    feedbackLabel: language === "ar" ? "ملاحظات المستشار الأكاديمي:" : "Academic Advisor Feedback:",
    prevStep: language === "ar" ? "الخطوة السابقة" : "Previous Stage",
    nextStep: language === "ar" ? "الخطوة التالية" : "Next Stage",
    lockedWarn: language === "ar" ? "هذه الخطوة مغلقة. يرجى إكمال الاختبار والتحدي للخطوة السابقة أولاً." : "This stage is locked. Please complete the previous stage's quiz and challenge to unlock.",
    completedBadge: language === "ar" ? "مكتملة ✓" : "Completed ✓",
    quizCompletedBadge: language === "ar" ? "الاختبار مكتمل" : "Quiz Passed ✓",
    challengeCompletedBadge: language === "ar" ? "التحدي مكتمل" : "Sandbox Passed ✓"
  };

  const isRtl = language === "ar";

  return (
    <div className={`max-w-7xl mx-auto px-4 py-2 space-y-8 ${isRtl ? "text-right" : "text-left"}`} style={{ direction: isRtl ? "rtl" : "ltr" }}>
      
      {/* Page Header */}
      <div className="bg-white dark:bg-slate-950 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest block font-mono">
              GRADUATION ROADMAP & SYLLABUS
            </span>
            <h1 className="font-display font-black text-2xl md:text-3xl text-slate-800 dark:text-slate-100">
              {dict.stepsHeader}
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl">
              {dict.stepsDesc}
            </p>
          </div>
          
          {/* Progress Tracker Widget */}
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-5 py-4 rounded-2xl shrink-0 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-sky-100 dark:bg-sky-950 flex items-center justify-center border border-sky-300 dark:border-sky-800 shrink-0 select-none">
              <Trophy className="w-6 h-6 text-sky-600 dark:text-sky-400" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">{language === "ar" ? "الخطوات المكتملة" : "Syllabus Steps Passed"}</span>
              <span className="text-base font-black text-slate-800 dark:text-white font-mono">
                {completedRoadmapSteps.length} / {ROADMAP_STEPS.length}
              </span>
              <span className="text-xs text-slate-400 block">
                {language === "ar" ? `الاختبارات: ${completedQuizzes.length}` : `Quizzes: ${completedQuizzes.length}`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Roadmap Hub Splitter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Stage Navigation Timeline (4 columns) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs">
            <h3 className="font-display font-bold text-slate-800 dark:text-slate-200 text-sm md:text-base mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-sky-500" />
              {language === "ar" ? "مراحل خريطة الطريق" : "Curriculum Roadmap Stages"}
            </h3>

            <div className="space-y-3 relative">
              {ROADMAP_STEPS.map((step, idx) => {
                const isCurrent = idx === activeStepIndex;
                const isStepPassed = completedRoadmapSteps.includes(step.id);
                const isQuizPassed = completedQuizzes.includes(step.id);
                
                // stage lock verification logic
                const isLocked = idx > 0 && 
                  (!completedRoadmapSteps.includes(ROADMAP_STEPS[idx-1].id) || !completedQuizzes.includes(ROADMAP_STEPS[idx-1].id));

                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStepIndex(idx)}
                    className={`w-full text-left p-4 rounded-xl border relative transition-all flex items-center gap-3.5 ${
                      isCurrent
                        ? "bg-slate-900 border-slate-900 text-white dark:bg-sky-950 dark:border-sky-800"
                        : isLocked
                        ? "bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800/40 text-slate-400 cursor-not-allowed opacity-60"
                        : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700 dark:bg-slate-950 dark:border-slate-800"
                    }`}
                  >
                    {/* Visual indicators */}
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border text-xs font-bold font-mono ${
                      isCurrent
                        ? "bg-sky-500 border-sky-400 text-white"
                        : isStepPassed && isQuizPassed
                        ? "bg-green-100 border-green-300 text-green-700"
                        : "bg-slate-100 border-slate-200 text-slate-500 dark:bg-slate-800 dark:border-slate-700"
                    }`}>
                      {isLocked ? (
                        <Lock className="w-4 h-4 text-slate-400" />
                      ) : isStepPassed && isQuizPassed ? (
                        <Check className="w-4 h-4 stroke-[3px]" />
                      ) : (
                        idx + 1
                      )}
                    </div>

                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center justify-between gap-1.5">
                        <span className={`text-xs font-bold leading-tight truncate ${isCurrent ? "text-white" : "text-slate-800 dark:text-slate-200"}`}>
                          {language === "ar" ? step.titleAr : step.title}
                        </span>
                      </div>
                      <p className={`text-[10px] truncate leading-tight ${isCurrent ? "text-slate-300" : "text-slate-400"}`}>
                        {language === "ar" ? step.descriptionAr : step.description}
                      </p>
                      
                      {/* Step completion micro tags */}
                      <div className="flex gap-1.5 mt-1.5">
                        {isQuizPassed && (
                          <span className="text-[8px] bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-300 px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wider font-mono">
                            {dict.quizCompletedBadge}
                          </span>
                        )}
                        {isStepPassed && (
                          <span className="text-[8px] bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wider font-mono">
                            {dict.challengeCompletedBadge}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick learning assistance prompt inside sidebar */}
          <div className="bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-2xl p-5 shadow-xs relative overflow-hidden">
            <div className="absolute right-0 bottom-0 w-24 h-24 bg-white/5 rounded-full blur-xl" />
            <Sparkles className="w-6 h-6 text-sky-200 mb-2.5" />
            <h4 className="font-display font-bold text-xs md:text-sm">{language === "ar" ? "تعلم مع المستشار الأكاديمي" : "Study with CS AI"}</h4>
            <p className="text-[10px] text-sky-100 mt-1 leading-normal">
              {language === "ar" 
                ? "هل واجهت صعوبة في فهم الـ Streams أو معايير النشر؟ تحدث مع المساعد الذكي المدمج في كل خطوة وسيصحبك خطوة بخطوة للحل."
                : "Stuck with StreamBuilder configurations or play store signing credentials? Chat with the dedicated assistant inside the step to gain insights."}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Active Stage View & Interactive Playground (8 columns) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Main Stage Text Card */}
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm space-y-6">
            
            {/* Stage title header */}
            <div className="flex flex-wrap items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 gap-4">
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-sky-600 bg-sky-50 dark:bg-sky-950 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono inline-block">
                  {language === "ar" ? `المرحلة ${activeStepIndex + 1} من 6` : `Stage ${activeStepIndex + 1} of 6`}
                </span>
                <h2 className="font-display font-black text-xl text-slate-800 dark:text-white leading-tight">
                  {language === "ar" ? activeStep.titleAr : activeStep.title}
                </h2>
              </div>

              {/* Status Indicator */}
              {completedRoadmapSteps.includes(activeStep.id) && completedQuizzes.includes(activeStep.id) ? (
                <span className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full flex items-center gap-1.5 font-mono">
                  <CheckCircle className="w-4 h-4" />
                  {dict.completedBadge}
                </span>
              ) : (
                <span className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full flex items-center gap-1.5 font-mono">
                  <ClockIcon className="w-3.5 h-3.5" />
                  {language === "ar" ? "قيد الإنجاز" : "In Progress"}
                </span>
              )}
            </div>

            {/* Goals Checklist */}
            <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/60 space-y-3">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Book className="w-4 h-4 text-sky-500" />
                {dict.goalsLabel}
              </h4>
              <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400 pl-1">
                {(language === "ar" ? activeStep.goalsAr : activeStep.goals).map((goal, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0 mt-1.5" />
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Lecture Content */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                {dict.contentLabel}
              </h4>
              <div className="prose prose-sm dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
                <MarkdownRenderer content={language === "ar" ? activeStep.contentAr : activeStep.content} />
              </div>
            </div>

            {/* Stage specific AI assistant chat box */}
            <StepAdvisorChat stepId={activeStep.id} stepTitle={language === "ar" ? activeStep.titleAr : activeStep.title} language={language} />
          </div>

          {/* ASSESSMENT QUIZ ZONE */}
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-display font-black text-slate-800 dark:text-white text-base md:text-lg flex items-center gap-2">
                <Award className="w-5.5 h-5.5 text-indigo-500" />
                {dict.quizHeader}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {language === "ar" ? "أجب على 3 أسئلة برمجية بدقة للتحقق من المفاهيم وفتح الخطوة التالية." : "Respond to these 3 high-level concepts questions to ensure understanding."}
              </p>
            </div>

            <div className="space-y-6">
              {(language === "ar" ? activeStep.quizAr : activeStep.quiz).map((q, qIdx) => (
                <div key={qIdx} className="space-y-2.5 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/40">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                    {language === "ar" ? `السؤال ${qIdx + 1}` : `QUESTION ${qIdx + 1}`}
                  </span>
                  <h4 className="text-xs md:text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug">
                    {q.question}
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = selectedAnswers[qIdx] === oIdx;
                      const isCorrect = q.correctAnswer === oIdx;
                      
                      let btnStyle = "bg-white dark:bg-slate-950 border-slate-200 text-slate-700 dark:text-slate-300 hover:bg-slate-100";
                      if (isSelected) {
                        btnStyle = "bg-indigo-900 border-indigo-900 text-white dark:bg-indigo-950 dark:border-indigo-800";
                      }
                      if (quizSubmitted) {
                        if (isCorrect) {
                          btnStyle = "bg-green-100 border-green-400 text-green-900 font-bold dark:bg-green-950 dark:text-green-300";
                        } else if (isSelected) {
                          btnStyle = "bg-rose-100 border-rose-400 text-rose-900 dark:bg-rose-950 dark:text-rose-300";
                        } else {
                          btnStyle = "bg-slate-50 dark:bg-slate-900 border-slate-100 text-slate-300 opacity-60";
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={quizSubmitted}
                          onClick={() => handleAnswerSelect(qIdx, oIdx)}
                          className={`p-3 rounded-xl border text-left text-xs transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="mt-2 p-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-[11px] text-slate-500 leading-relaxed font-sans">
                      <strong className="text-slate-800 dark:text-slate-200">{language === "ar" ? "توضيح الأستاذ:" : "Conceptual Explanation:"}</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {quizError && (
              <p className="text-xs text-rose-600 flex items-center gap-1 font-semibold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {quizError}
              </p>
            )}

            {/* Quiz grading result */}
            {quizSubmitted ? (
              <div className={`p-4 rounded-2xl border ${
                quizScore >= 2 
                  ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-950/60 dark:border-green-900" 
                  : "bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-950/60 dark:border-rose-900"
              } space-y-2`}>
                <h4 className="text-sm font-bold flex items-center gap-1.5">
                  {quizScore >= 2 ? <CheckCircle className="w-5 h-5 text-green-600" /> : <AlertCircle className="w-5 h-5 text-rose-600" />}
                  {quizScore >= 2 ? dict.quizPassed : dict.quizFailed}
                </h4>
                <p className="text-xs">
                  {dict.scoreLabel} <strong className="font-mono text-sm">{quizScore} / 3</strong>
                </p>
                <div className="flex gap-2 pt-1.5">
                  <button
                    onClick={resetQuiz}
                    className="px-4 py-1.5 border border-current hover:bg-white/10 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    {dict.resetQuizBtn}
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={submitQuiz}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl text-xs md:text-sm shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                {dict.submitQuizBtn}
              </button>
            )}
          </div>

          {/* SANDBOX CODE CHALLENGE ZONE */}
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm space-y-5">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-display font-black text-slate-800 dark:text-white text-base md:text-lg flex items-center gap-2">
                <Code className="w-5.5 h-5.5 text-sky-500" />
                {dict.challengeHeader}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {language === "ar" ? "طبق المفاهيم برمجياً واختبر سلامة الشفرة لكسب نقاط الخبرة الإضافية." : "Translate the theoretical specifications into clean Dart/Flutter code inside this compiler view."}
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{dict.challengeInstruction}</span>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans bg-slate-50 dark:bg-slate-900 p-4.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                  {language === "ar" ? activeStep.challengeAr.instruction : activeStep.challenge.instruction}
                </p>
              </div>

              {/* Code Editor Area */}
              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
                <div className="bg-slate-900 text-slate-400 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-[11px] font-mono">
                  <span>dart_sandbox_session.dart</span>
                  <span className="text-sky-400">Dart SDK v3.2</span>
                </div>
                <textarea
                  value={studentCode}
                  onChange={(e) => setStudentCode(e.target.value)}
                  className="w-full h-48 p-4 bg-slate-950 text-emerald-400 font-mono text-xs md:text-sm focus:outline-none focus:ring-0 leading-relaxed resize-none"
                  style={{ direction: "ltr" }}
                />
              </div>

              <div className="text-xs text-slate-400 font-sans">
                <strong>{dict.criteriaLabel}</strong> {language === "ar" ? activeStep.challengeAr.gradingCriteria : activeStep.challenge.gradingCriteria}
              </div>

              {challengeGrade ? (
                <div className={`p-4 rounded-2xl border ${
                  challengeGrade.passed 
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/60 dark:border-emerald-900" 
                    : "bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-950/60 dark:border-rose-900"
                } space-y-3`}>
                  <h4 className="text-sm font-bold flex items-center gap-1.5">
                    {challengeGrade.passed ? <CheckCircle className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-rose-600" />}
                    {challengeGrade.passed ? dict.challengePassed : dict.challengeFailed}
                  </h4>
                  <div className="text-xs">
                    <strong>{dict.scoreLabel}</strong> <span className="font-mono font-bold text-sm">{challengeGrade.score} / 100</span>
                  </div>
                  <div className="text-xs prose prose-sm dark:prose-invert max-w-none border-t border-slate-200/50 dark:border-slate-800/50 pt-2 text-slate-600 dark:text-slate-300">
                    <strong className="text-slate-800 dark:text-slate-100 block mb-1">{dict.feedbackLabel}</strong>
                    <MarkdownRenderer content={challengeGrade.feedback} />
                  </div>
                  {!challengeGrade.passed && (
                    <button
                      onClick={handleGradeChallenge}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all mt-1"
                    >
                      {language === "ar" ? "أعد المحاولة" : "Try Grading Again"}
                    </button>
                  )}
                </div>
              ) : (
                <button
                  disabled={gradingLoading}
                  onClick={handleGradeChallenge}
                  className="w-full py-3.5 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-100 disabled:text-slate-300 text-white font-bold rounded-2xl text-xs md:text-sm shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {gradingLoading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      {dict.gradingLabel}
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-sky-200" />
                      {dict.gradeBtn}
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* BOTTOM NAVIGATION TOGGLES */}
          <div className="flex items-center justify-between">
            <button
              disabled={activeStepIndex === 0}
              onClick={() => setActiveStepIndex(activeStepIndex - 1)}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 disabled:opacity-50 disabled:bg-slate-50 dark:bg-slate-950 dark:border-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              {dict.prevStep}
            </button>
            <button
              disabled={activeStepIndex === ROADMAP_STEPS.length - 1}
              onClick={() => {
                // Safeguard stage access: only let student go forward if they completed current step quiz and challenge!
                const isStepPassed = completedRoadmapSteps.includes(activeStep.id);
                const isQuizPassed = completedQuizzes.includes(activeStep.id);
                if (!isStepPassed || !isQuizPassed) {
                  alert(dict.lockedWarn);
                  return;
                }
                setActiveStepIndex(activeStepIndex + 1);
              }}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-sky-950 dark:border-sky-800 disabled:opacity-50 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {dict.nextStep}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

// ClockIcon helper
function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
