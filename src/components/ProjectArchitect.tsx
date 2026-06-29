import React, { useState } from "react";
import { Folder, File, ChevronRight, ChevronDown, CheckSquare, Square, Code, ExternalLink, Clipboard, Copy, Check } from "lucide-react";
import { ProjectModule } from "../types";
import { PROJECT_MODULES } from "../data";
import MarkdownRenderer from "./MarkdownRenderer";

interface ProjectArchitectProps {
  completedChecklists: string[];
  onChecklistToggle: (id: string) => void;
  language: "en" | "ar";
}

// Arabic translations for the 4 projects
const PROJECT_TRANSLATIONS: Record<string, {
  titleAr: string;
  descriptionAr: string;
  architectureTypeAr: string;
  javaContextAr: string;
}> = {
  pm1: {
    titleAr: "قارئ الأخبار بالبنية النظيفة",
    descriptionAr: "تعلم كيفية بناء تطبيق فلاتر قوي وقابل للتطوير باتباع التصميم الموجه للنطاق ومبادئ SOLID الصارمة. يربط هذا الموديول بين بنيات جافا للمؤسسات (مثل Spring Layered) وجانب العميل.",
    architectureTypeAr: "البنية النظيفة (طبقة العرض، النطاق، والبيانات)",
    javaContextAr: "في تطبيقات Spring Boot للمؤسسات، تقوم بفصل طبقة التحكم (Controller) عن طبقة الخدمات (Service) وطبقة المستودعات (Repository). نطبق في فلاتر نفس هذه البنية تماماً لمنع تداخل واجهة المستخدم مع منطق جلب البيانات وسرعة الاختبار والتعديل."
  },
  pm2: {
    titleAr: "محرك تصفية الصور المتزامن",
    descriptionAr: "ابنِ لوحة رسم لتصفية وتعديل الصور بشكل متزامن وغير متوقف. تعلم كيفية إدارة البكسلات الخام، وتحميل الصور في الذاكرة، وإجراء العمليات الحسابية المعقدة في الخلفية باستخدام خيوط العمل المستقلة (Isolates).",
    architectureTypeAr: "نموذج الفاعل / معمارية تمرير رسائل الـ Isolate",
    javaContextAr: "يتعامل مطورو جافا مع التزامن عبر برمجيات ThreadPools وتعديل قيم المتغيرات الذرية (Atomic) مع وجود أقفال لمنع التصادم. أما في دارت، فنحقق التوازي الآمن من خلال تشغيل خيوط عمل (Isolates) معزولة تماماً في الذاكرة لتقوم بالعمليات الشاقة دون إبطاء واجهة التطبيق."
  },
  pm3: {
    titleAr: "مزامن قاعدة بيانات SQL المحلية (SQFlite)",
    descriptionAr: "صمم مديراً لقاعدة البيانات المحلية يشابه مكتبة Room في أندرويد أو JPA في Spring. قم بتهيئة جداول قاعدة البيانات المحلية، وإجراء ترقيات الجداول (Migrations)، وبناء مرسل مزامنة محلي وسحابي متكامل.",
    architectureTypeAr: "نمط التخزين المؤقت المحلي (تطبيقات تدعم عدم الاتصال أولاً)",
    javaContextAr: "إذا كنت معتاداً على استخدام قواعد بيانات H2 أو SQLite محلياً عبر Spring Data JPA، يوفر لك فلاتر مكتبة SQFlite لإجراء عمليات الحفظ والاسترجاع وإدارة علاقات الجداول والـ SQL المباشرة على الأجهزة المحمولة بأمان وسرعة فائقة."
  },
  pm4: {
    titleAr: "محرك دردشة فيربيز الفوري",
    descriptionAr: "صمم وابنِ تطبيق محادثة فوري وعالي الأداء. يربط بين عناصر فلاتر التفاعلية المتدفقة ومصادقة فيربيز مع مخططات قاعدة بيانات فايرستور. يتضمن ميزات تتبع التواجد، وحفظ البيانات بلا اتصال، وإيصالات قراءة الرسائل.",
    architectureTypeAr: "معمارية التدفق التفاعلي (StreamBuilder + نمط المستودع)",
    javaContextAr: "بدلاً من تكرار الاستعلامات الطويلة (Long Polling) على خوادم الويب لجلب الرسائل، نستخدم قنوات تدفق البيانات (Streams) المباشرة. هذا يشابه تفعيل WebSockets أو ردود الأفعال التفاعلية في Spring WebFlux، حيث تتدفق البيانات تلقائياً وبأمان لواجهة المستخدم عند حدوث أي تعديل سحابي."
  }
};

const CHECKLIST_TRANSLATIONS: Record<string, {
  taskAr: string;
  explanationAr: string;
}> = {
  chk1_1: {
    taskAr: "تهيئة حدود المجلدات البرمجية",
    explanationAr: "تأسيس مجلدات منفصلة تماماً لطبقات core, data, domain, presentation لضمان تنظيم الكود وصيانته مستقبلاً."
  },
  chk1_2: {
    taskAr: "بناء كيانات النطاق النقية",
    explanationAr: "كتابة فئات الكيانات الأساسية (Entities) بدون أي اعتماد خارجي على قواعد البيانات أو مكتبات جلب البيانات سحابياً."
  },
  chk1_3: {
    taskAr: "ربط وحقن الاعتمادات (Dependency Injection)",
    explanationAr: "استخدام مكتبة GetIt أو دالة الحقن لربط النماذج والخدمات والمستودعات بشكل مستقل وديناميكي."
  },
  chk2_1: {
    taskAr: "إنشاء خيوط العمل المخصصة (Isolates)",
    explanationAr: "استدعاء Isolate.spawn لتشغيل عمليات المعالجة الرياضية بعيداً عن خيط واجهة المستخدم لتجنب تجميد الشاشة."
  },
  chk2_2: {
    taskAr: "تأسيس منافذ الاتصال الثنائي",
    explanationAr: "تهيئة ReceivePort و SendPort لإتاحة تدفق البيانات والنتائج المتبادلة بين واجهة المستخدم والخيط المعزول."
  },
  chk3_1: {
    taskAr: "تهيئة قاعدة البيانات وجدول SQLite",
    explanationAr: "صياغة استعلامات تهيئة الجداول وحقول المفاتيح الأساسية وإصدارات قاعدة البيانات عبر مكتبة SQFlite."
  },
  chk3_2: {
    taskAr: "برمجة مرسل المزامنة التلقائية",
    explanationAr: "تطبيق نمط التخزين المؤقت المحلي لإجراء العمليات دون إنترنت ثم رفعها ومزامنتها فور عودة الاتصال."
  },
  chk4_1: {
    taskAr: "تكوين إعدادات واتصال فيربيز",
    explanationAr: "ربط التطبيق بمنصة Firebase للأندرويد والآيفون وضمان نجاح عملية استدعاء Firebase.initializeApp."
  },
  chk4_2: {
    taskAr: "بناء أداة عرض الرسائل StreamBuilder",
    explanationAr: "تطبيق StreamBuilder للاستماع المباشر لقناة دردشة فايرستور وعرض الرسائل فوراً وبشكل متجاوب."
  },
  chk4_3: {
    taskAr: "تطبيق إيصالات القراءة الجماعية (Batch Writes)",
    explanationAr: "برمجة حزمة تعديل العمليات (WriteBatch) لتحديث حالة قراءة الرسائل دفعة واحدة لتقليل عبء استهلاك البيانات."
  },
  chk4_4: {
    taskAr: "هندسة نظام تتبع التواجد والاتصال",
    explanationAr: "الاستماع لدورة حياة التطبيق وتحديث مستند حالة المستخدم بالإنترنت وتوليد نقاط الإضاءة الخضراء للتفاعل الفوري."
  }
};

const FILE_TRANSLATIONS: Record<string, {
  descriptionAr: string;
}> = {
  "news_repository.dart": {
    descriptionAr: "واجهة برمجية تحدد حدود جلب الأخبار، متوافقة مع مبدأ عكس الاعتمادية (Dependency Inversion) لضمان فصل منطق العمل عن التفاصيل التقنية."
  },
  "news_repository_impl.dart": {
    descriptionAr: "التطبيق الفعلي لمستودع الأخبار الذي ينسق بين التخزين المؤقت لقاعدة البيانات المحلية وعميل شبكة الويب سحابياً."
  },
  "news_bloc.dart": {
    descriptionAr: "متحكم يدير الحالات المتفاعلة وعرض واجهة قارئ الأخبار بأسلوب البنية النظيفة، ويفصل تماماً بين الأحداث والاستجابات البصرية."
  },
  "isolate_pool.dart": {
    descriptionAr: "منسق حوض خيوط العمل (Isolate Pool) لتوسيع نطاق تشغيل خوارزميات تصفية وتعديل بكسلات الصور المعقدة في الخلفية دون تعطيل واجهة المستخدم."
  },
  "database_helper.dart": {
    descriptionAr: "مدير قاعدة بيانات SQFlite لمعالجة تهيئة جداول البيانات وحفظ الحالات محلياً على هاتف المستخدم وإدارة إصدارات ترقية الجداول."
  },
  "firestore_service.dart": {
    descriptionAr: "مستودع عالي الكفاءة يتصل بقناة دردشة فايرستور الفورية، ويدير تتبع التواجد، ويحدث حزم إيصالات القراءة المجمعة."
  }
};

export default function ProjectArchitect({ completedChecklists, onChecklistToggle, language }: ProjectArchitectProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectModule>(PROJECT_MODULES[0]);
  const [selectedFile, setSelectedFile] = useState<any | null>(selectedProject.fileTemplates[0]);
  const [copiedFile, setCopiedFile] = useState(false);

  const isAr = language === "ar";

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedFile(true);
    setTimeout(() => setCopiedFile(false), 2000);
  };

  const handleProjectChange = (project: ProjectModule) => {
    setSelectedProject(project);
    setSelectedFile(project.fileTemplates[0] || null);
  };

  // Calculate checklists completion percentage for this project
  const projectChecklistIds = selectedProject.checklists.map((c) => c.id);
  const completedProjectChecks = projectChecklistIds.filter((id) => completedChecklists.includes(id));
  const completionPercent = projectChecklistIds.length
    ? Math.round((completedProjectChecks.length / projectChecklistIds.length) * 100)
    : 0;

  // Resolved project properties
  const resolvedTitle = isAr ? (PROJECT_TRANSLATIONS[selectedProject.id]?.titleAr || selectedProject.title) : selectedProject.title;
  const resolvedDescription = isAr ? (PROJECT_TRANSLATIONS[selectedProject.id]?.descriptionAr || selectedProject.description) : selectedProject.description;
  const resolvedArchitecture = isAr ? (PROJECT_TRANSLATIONS[selectedProject.id]?.architectureTypeAr || selectedProject.architectureType) : selectedProject.architectureType;
  const resolvedJavaContext = isAr ? (PROJECT_TRANSLATIONS[selectedProject.id]?.javaContextAr || selectedProject.javaContext) : selectedProject.javaContext;

  return (
    <div className="max-w-7xl mx-auto px-4 py-2 space-y-6">
      {/* Project Selector bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
        <h3 className="font-display font-bold text-slate-800 dark:text-slate-100 text-lg mb-3 flex items-center gap-2">
          <Code className="w-5 h-5 text-sky-500" />
          {isAr ? "المخططات والموديلات البرمجية المتقدمة" : "Advanced Project Blueprints"}
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {PROJECT_MODULES.map((proj) => {
            const title = isAr ? (PROJECT_TRANSLATIONS[proj.id]?.titleAr || proj.title) : proj.title;
            return (
              <button
                key={proj.id}
                onClick={() => handleProjectChange(proj)}
                className={`py-2 px-4 rounded-xl text-xs md:text-sm font-medium border flex items-center gap-2 transition-all cursor-pointer ${
                  selectedProject.id === proj.id
                    ? "bg-slate-900 border-slate-900 text-white dark:bg-sky-950 dark:border-sky-900 dark:text-sky-100 shadow-sm"
                    : "bg-slate-50 border-slate-100 hover:bg-slate-100 dark:bg-slate-900/40 dark:border-slate-850 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                }`}
              >
                {title}
                <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold shrink-0 ${
                  selectedProject.id === proj.id ? "bg-sky-800 text-sky-200" : "bg-slate-200 dark:bg-slate-800 text-slate-750 dark:text-slate-400"
                }`}>
                  {isAr ? "مستوى خبير" : "CS Senior Level"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Project content split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Project meta, Folder tree, Checklists */}
        <div className="lg:col-span-5 space-y-6">
          {/* Project Details */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4" style={{ textAlign: isAr ? "right" : "left" }}>
            <div>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md shrink-0">
                {resolvedArchitecture}
              </span>
              <h2 className="font-display font-black text-slate-900 dark:text-white text-xl md:text-2xl mt-2.5 leading-tight">
                {resolvedTitle}
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-xs md:text-sm leading-relaxed">
              {resolvedDescription}
            </p>

            <div className="bg-sky-50/50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900 rounded-xl p-4">
              <h4 className="font-display font-bold text-sky-950 dark:text-sky-200 text-xs uppercase tracking-wider mb-2">
                {isAr ? "سياق مطوري جافا و Spring:" : "Java/Spring Developer's Context:"}
              </h4>
              <p className="text-sky-900 dark:text-sky-300 text-xs leading-relaxed font-sans">
                {resolvedJavaContext}
              </p>
            </div>
          </div>

          {/* Interactive Folder Structure */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3" style={{ textAlign: isAr ? "right" : "left" }}>
            <h4 className="font-display font-bold text-slate-800 dark:text-slate-200 text-sm flex items-center gap-2">
              <Folder className="w-4 h-4 text-sky-500 animate-pulse" />
              {isAr ? "شجرة مجلدات المعمارية البرمجية" : "Bespoke Directory Blueprint"}
            </h4>
            <p className="text-slate-500 dark:text-slate-400 text-xs mb-3">
              {isAr 
                ? "اضغط على المجلدات لتوسيع المعمارية، واضغط على الملفات لمعاينة أكواد دارت البرمجية الذكية."
                : "Click folders to navigate the architectural hierarchy. Click file names to inspect their Dart source code."}
            </p>
            <div className="border border-slate-100 dark:border-slate-800 rounded-xl p-3 bg-slate-50/40 dark:bg-slate-950/20 select-none overflow-x-auto">
              <FolderTree
                nodes={selectedProject.folderStructure}
                fileTemplates={selectedProject.fileTemplates}
                onFileSelect={(f) => setSelectedFile(f)}
                selectedFile={selectedFile}
              />
            </div>
          </div>

          {/* Assessment Checklist */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4" style={{ textAlign: isAr ? "right" : "left" }}>
            <div className="flex items-center justify-between">
              <h4 className="font-display font-bold text-slate-800 dark:text-slate-200 text-sm">
                {isAr ? "التقييم الذاتي للمعمار البرمجي" : "Architect's Self-Assessment"}
              </h4>
              <span className="text-xs font-mono font-bold text-sky-600 bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded">
                {completionPercent}% {isAr ? "مكتمل" : "Checked"}
              </span>
            </div>
            
            {/* Progress line indicator */}
            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-sky-500 transition-all duration-500"
                style={{ width: `${completionPercent}%` }}
              />
            </div>

            <div className="space-y-3">
              {selectedProject.checklists.map((check) => {
                const isChecked = completedChecklists.includes(check.id);
                const task = isAr ? (CHECKLIST_TRANSLATIONS[check.id]?.taskAr || check.task) : check.task;
                const explanation = isAr ? (CHECKLIST_TRANSLATIONS[check.id]?.explanationAr || check.explanation) : check.explanation;

                return (
                  <button
                    key={check.id}
                    onClick={() => onChecklistToggle(check.id)}
                    className="w-full text-left flex gap-3 p-3 bg-slate-50 hover:bg-slate-100/70 dark:bg-slate-900/30 dark:hover:bg-slate-850 border border-slate-100 dark:border-slate-800 rounded-xl transition-all items-start group cursor-pointer"
                    style={{ textAlign: isAr ? "right" : "left", flexDirection: isAr ? "row-reverse" : "row" }}
                  >
                    <span className="mt-0.5 shrink-0 text-slate-400 group-hover:text-sky-500 transition-colors">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-sky-500 fill-sky-50 dark:fill-transparent" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </span>
                    <div className="flex-1">
                      <span className={`text-xs md:text-sm font-semibold text-slate-800 dark:text-slate-200 block ${isChecked ? "line-through text-slate-400 dark:text-slate-500" : ""}`}>
                        {task}
                      </span>
                      <p className="text-[11px] text-slate-400 dark:text-slate-400 mt-1 leading-normal">
                        {explanation}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Code Template Viewer */}
        <div className="lg:col-span-7">
          {selectedFile ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-full min-h-[500px]">
              {/* Template Viewer Header */}
              <div className="p-5 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-850 flex items-center justify-between" style={{ flexDirection: isAr ? "row-reverse" : "row" }}>
                <div>
                  <span className="text-[10px] font-bold text-sky-600 bg-sky-50 dark:bg-sky-950/50 border border-sky-100 dark:border-sky-900 px-2 py-0.5 rounded uppercase tracking-wider shrink-0">
                    {isAr ? "مخطط الأكواد دارت" : "Dart Blueprint"}
                  </span>
                  <h3 className="font-display font-black text-slate-900 dark:text-white text-lg mt-1 font-mono leading-tight">
                    {selectedFile.filePath || selectedFile.name}
                  </h3>
                </div>
                <button
                  onClick={() => handleCopyCode(selectedFile.code)}
                  className="px-3.5 py-1.5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-xs text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  {copiedFile ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-sky-500" />
                      {isAr ? "تم النسخ!" : "Copied!"}
                    </>
                  ) : (
                    <>
                      <Clipboard className="w-3.5 h-3.5" />
                      {isAr ? "نسخ الكود" : "Copy Code"}
                    </>
                  )}
                </button>
              </div>

              {/* Description Panel */}
              <div className="px-5 py-3.5 bg-slate-50/50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-850 text-slate-500 dark:text-slate-400 text-xs md:text-sm leading-relaxed" style={{ textAlign: isAr ? "right" : "left" }}>
                <span className="font-bold text-slate-700 dark:text-slate-200 block mb-0.5">{isAr ? "الهدف المعماري برمجياً:" : "Architectural Intent:"}</span>
                {isAr ? (FILE_TRANSLATIONS[selectedFile.name]?.descriptionAr || selectedFile.description) : selectedFile.description}
              </div>

              {/* Code Box */}
              <div className="flex-1 p-0 overflow-hidden font-mono bg-slate-900" dir="ltr">
                <MarkdownRenderer content={"```dart\n" + selectedFile.code + "\n```"} />
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center h-full flex flex-col justify-center items-center">
              <Code className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-2" />
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                {isAr 
                  ? "اختر ملفاً برمجياً من شجرة الملفات لمعاينة الكود المقترح معمارياً."
                  : "Select an architectural file from the directory tree to inspect code logic templates."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* Recursive Folder Node Renderer */
interface FolderTreeProps {
  nodes: any[];
  fileTemplates: any[];
  selectedFile: any | null;
  onFileSelect: (f: any) => void;
  depth?: number;
}

function FolderTree({ nodes, fileTemplates, selectedFile, onFileSelect, depth = 0 }: FolderTreeProps) {
  return (
    <div className="space-y-1">
      {nodes.map((node, idx) => (
        <FolderTreeNode
          key={idx}
          node={node}
          fileTemplates={fileTemplates}
          selectedFile={selectedFile}
          onFileSelect={onFileSelect}
          depth={depth}
        />
      ))}
    </div>
  );
}

interface FolderTreeNodeProps {
  key?: React.Key;
  node: any;
  fileTemplates: any[];
  selectedFile: any;
  onFileSelect: (f: any) => void;
  depth: number;
}

function FolderTreeNode({ node, fileTemplates, selectedFile, onFileSelect, depth }: FolderTreeNodeProps) {
  const [isOpen, setIsOpen] = useState(true);

  const isFolder = node.type === "folder";
  const name = node.name;

  const handleNodeClick = () => {
    if (isFolder) {
      setIsOpen(!isOpen);
    } else {
      const matched = fileTemplates.find(
        (t) => t.filePath.endsWith(name) || t.filePath.includes(name)
      );
      if (matched) {
        onFileSelect(matched);
      } else {
        onFileSelect({
          filePath: name,
          name: name,
          description: node.description,
          code: `// ${node.description}\n// File implementation standard to ${node.name}\n\nvoid main() {\n  print("Exploring ${node.name}...");\n}`
        });
      }
    }
  };

  const isCurrentFileSelected = selectedFile && (selectedFile.filePath.endsWith(name) || selectedFile.filePath === name);

  return (
    <div className="font-mono text-xs">
      <div
        onClick={handleNodeClick}
        className={`flex items-center py-1 px-1.5 rounded transition-colors cursor-pointer ${
          isCurrentFileSelected
            ? "bg-sky-50 text-sky-800 dark:bg-sky-950/60 dark:text-sky-200 font-semibold border-l-2 border-sky-500 pl-1"
            : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-350"
        }`}
        style={{ paddingLeft: `${depth * 12 + 6}px` }}
      >
        <span className="text-slate-400 shrink-0 mr-1 flex items-center justify-center w-4 h-4">
          {isFolder ? (
            isOpen ? <ChevronDown className="w-3 h-3 text-slate-500" /> : <ChevronRight className="w-3 h-3 text-slate-500" />
          ) : (
            <span className="w-3" />
          )}
        </span>

        <span className="shrink-0 mr-1.5">
          {isFolder ? (
            <Folder className="w-3.5 h-3.5 text-sky-500 fill-sky-50" />
          ) : (
            <File className="w-3.5 h-3.5 text-slate-400" />
          )}
        </span>

        <span className="truncate flex-1 text-left" dir="ltr">{name}</span>
        
        {!isFolder && (
          <span className="text-[9px] text-slate-400 max-w-40 truncate font-sans px-1 bg-slate-200/50 dark:bg-slate-800 rounded ml-1 font-normal">
            {node.description}
          </span>
        )}
      </div>

      {isFolder && isOpen && node.children && (
        <FolderTree
          nodes={node.children}
          fileTemplates={fileTemplates}
          selectedFile={selectedFile}
          onFileSelect={onFileSelect}
          depth={depth + 1}
        />
      )}
    </div>
  );
}
