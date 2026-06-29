import React, { useState, useEffect } from "react";
import { Play, RotateCcw, AlertCircle, CheckCircle, Award, Terminal, Loader, Sparkles, Trophy } from "lucide-react";
import { Challenge } from "../types";
import { CODE_CHALLENGES } from "../data";
import MarkdownRenderer from "./MarkdownRenderer";

interface CodePlaygroundProps {
  completedChallenges: string[];
  onChallengeCompleted: (id: string, score: number) => void;
  language: "en" | "ar";
}

// Arabic translations for the 3 coding challenges
const CHALLENGE_TRANSLATIONS: Record<string, {
  titleAr: string;
  descriptionAr: string;
  constraintsAr: string;
  javaContrastAr: string;
}> = {
  ch1: {
    titleAr: "اختصار المنشئات والمتغيرات المسماة",
    descriptionAr: "اكتب فئة دارت باسم `Course` تمثل مادة أكاديمية. يجب أن توضح الفئة كيفية استخدام المنشئات المختصرة وأمان القيم الفارغة (null safety) في دارت. يجب أن تحتوي على:\n1. متغيرات نهائية غير فارغة: `String title` و `int code`.\n2. متغير اختياري قابل للفراغ: `String? instructor`.\n3. منشئ افتراضي يحتوي على متغيرات مسماة (named parameters) بحيث تكون `title` و `code` مطلوبة (required)، و `instructor` اختيارياً.\n4. منشئ مسمى باسم `Course.core` يحدد اسم المدرس الافتراضي كـ 'Staff' ويقوم بتحويل عنوان المادة للأحرف الكبيرة (uppercase) في قائمة التهيئة.",
    constraintsAr: "- استخدام متغيرات نهائية (final).\n- تطبيق التعيين المباشر للحقول في المنشئ (`this.title`).\n- تطبيق منشئ مسمى مع قائمة تهيئة (`: instructor = 'Staff'`).\n- تشغيل الكود بدون أخطاء برمجية.",
    javaContrastAr: "في جافا، المتغيرات المسماة غير مدعومة بشكل أصيل (وتطلب نمط البناء Builder Pattern). كما لا تتوفر قوائم التهيئة، ويتم تعيين وتحويل القيم داخل المنشئ بعد إنشائه، وهو ما يقلل وضوح الهيكل البرمجي."
  },
  ch2: {
    titleAr: "مزيج السلوك البرمجي (Mixins)",
    descriptionAr: "يشتكي مطورو جافا غالباً من عدم وجود الوراثة المتعددة. في هذا التحدي، أثبت كيف تحل دارت هذه المشكلة بأناقة وسهولة باستخدام الـ mixins.\nاكتب ميكسن باسم `DatabaseConnection` يحتوي على دالة `void connect()` تطبع 'Database connected'. وميكسن آخر باسم `Logger` يحتوي على دالة `void log(String msg)` تطبع '[LOG]: $msg'.\nثم اكتب فئة `UserSyncService` ترث من الفئة الأساسية `Service` وتدمج كلا الميكسنين باستخدام الكلمة المفتاحية `with`. ونفذ دالة `void executeSync()` بداخلها تقوم بالاتصال بقاعدة البيانات، وتسجيل الملاحظة 'Syncing users...'، ثم الانتهاء.",
    constraintsAr: "- استخدام الكلمة المفتاحية 'mixin'.\n- وراثة UserSyncService من Service ودمجها بـ with.\n- تشغيل الدالة والحصول على النتائج المطابقة.",
    javaContrastAr: "في جافا، يتطلب وراثة وتطبيق سلوك فئات متعددة تكرار كتابة الدوال أو الاستعانة بفئات وسيطة مركبة. بينما تسمح mixins في دارت بمشاركة السلوك والحالة عبر فئات مختلفة بكل سلاسة."
  },
  ch3: {
    titleAr: "تحميل البيانات الآمن غير المتزامن (Futures)",
    descriptionAr: "تعتبر العمليات غير المتزامنة أمراً بالغ الأهمية لتفادي تجمد واجهة مستخدم التطبيقات. وتعتمد دارت على حلقة الأحداث (Event Loop) عبر فئات المستقبل (Future) وتدفق البيانات. قارن ذلك بالخيوط المعقدة في جافا.\nاكتب دالة غير متزامنة باسم `fetchSecureData(String endpoint)` تحاكي جلب البيانات من خادم خارجي. يجب عليها:\n1. طباعة 'Initiating fetch for $endpoint...'.\n2. تأخير التنفيذ غير المتزامن لمدة ثانيتين (باستخدام `Future.delayed`).\n3. التحقق: إذا كان الرابط endpoint يحتوي على كلمة 'secure'، يرجع النص 'DATA: encrypted_payload'.\n4. إذا لم يحتوِ على الكلمة، يرمي خطأ مخصصاً `FormatException` برسالة 'Insecure access prohibited'.\n5. نفذ دالة الاستدعاء `safeFetch()` مستخدماً try-catch لطباعة النتيجة أو معالجة الأخطاء بأمان.",
    constraintsAr: "- استخدام الكلمتين المفتاحيتين 'async' و 'await'.\n- تأخير التنفيذ لمدة ثانيتين (Duration of 2 seconds).\n- رمي خطأ FormatException للروابط غير الآمنة.\n- معالجة الأخطاء باستخدام try-catch.",
    javaContrastAr: "في جافا، نستخدم Threads أو CompletableFuture مما يسبب تعقيداً في الإدارة وتتبع الأخطاء. بينما تجعل الكلمتان async و await التعامل مع العمليات غير المتزامنة في دارت يبدو ككتابة كود متزامن تسلسلي بسيط."
  }
};

export default function CodePlayground({ completedChallenges, onChallengeCompleted, language }: CodePlaygroundProps) {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge>(CODE_CHALLENGES[0]);
  const [userCode, setUserCode] = useState("");
  
  // Grading state
  const [isGrading, setIsGrading] = useState(false);
  const [gradeResult, setGradeResult] = useState<{ passed: boolean; score: number; feedback: string } | null>(null);
  const [error, setError] = useState("");

  const isAr = language === "ar";

  // Update starter code when challenge shifts
  useEffect(() => {
    const saved = localStorage.getItem(`draft_code_${selectedChallenge.id}`);
    setUserCode(saved || selectedChallenge.starterCode);
    setGradeResult(null);
    setError("");
  }, [selectedChallenge]);

  const handleCodeChange = (val: string) => {
    setUserCode(val);
    localStorage.setItem(`draft_code_${selectedChallenge.id}`, val);
  };

  const resetCode = () => {
    const confirmMsg = isAr 
      ? "هل أنت متأكد من رغبتك في إعادة تعيين الكود إلى النموذج الافتراضي؟ ستفقد جميع تعديلاتك الحالية."
      : "Are you sure you want to reset your code to the starter template? Your edits will be lost.";
    if (window.confirm(confirmMsg)) {
      setUserCode(selectedChallenge.starterCode);
      localStorage.removeItem(`draft_code_${selectedChallenge.id}`);
      setGradeResult(null);
      setError("");
    }
  };

  const handleGradeCode = async () => {
    if (!userCode.trim()) return;

    setIsGrading(true);
    setError("");
    setGradeResult(null);

    const title = isAr ? (CHALLENGE_TRANSLATIONS[selectedChallenge.id]?.titleAr || selectedChallenge.title) : selectedChallenge.title;
    const constraints = isAr ? (CHALLENGE_TRANSLATIONS[selectedChallenge.id]?.constraintsAr || selectedChallenge.constraints) : selectedChallenge.constraints;

    try {
      const res = await fetch("/api/grade-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          challengeId: selectedChallenge.id,
          challengeTitle: title,
          challengeConstraints: constraints,
          code: userCode,
          language,
        }),
      });

      if (!res.ok) {
        throw new Error(isAr ? "فشل الاتصال بخادم التقييم البرمجي." : "Failed to contact grading server");
      }

      const data = await res.json();
      setGradeResult(data);
      
      if (data.passed) {
        onChallengeCompleted(selectedChallenge.id, data.score);
      }
    } catch (err: any) {
      setError(err.message || (isAr ? "حدث خطأ أثناء فحص وتقييم الكود برمجياً." : "An issue occurred during compilation evaluation."));
    } finally {
      setIsGrading(false);
    }
  };

  // Resolved dynamic properties
  const resolvedTitle = isAr ? (CHALLENGE_TRANSLATIONS[selectedChallenge.id]?.titleAr || selectedChallenge.title) : selectedChallenge.title;
  const resolvedDescription = isAr ? (CHALLENGE_TRANSLATIONS[selectedChallenge.id]?.descriptionAr || selectedChallenge.description) : selectedChallenge.description;
  const resolvedConstraints = isAr ? (CHALLENGE_TRANSLATIONS[selectedChallenge.id]?.constraintsAr || selectedChallenge.constraints) : selectedChallenge.constraints;
  const resolvedJavaContrast = isAr ? (CHALLENGE_TRANSLATIONS[selectedChallenge.id]?.javaContrastAr || selectedChallenge.javaContrast) : selectedChallenge.javaContrast;

  return (
    <div className="max-w-7xl mx-auto px-4 py-2 space-y-6">
      {/* Upper header block: Choose challenges */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
        <h3 className="font-display font-bold text-slate-800 dark:text-slate-100 text-lg mb-3 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          {isAr ? "تحديات لغة دارت التفاعلية" : "Interactive Dart Challenges"}
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {CODE_CHALLENGES.map((challenge) => {
            const isCompleted = completedChallenges.includes(challenge.id);
            const isSelected = selectedChallenge.id === challenge.id;
            const title = isAr ? (CHALLENGE_TRANSLATIONS[challenge.id]?.titleAr || challenge.title) : challenge.title;
            const diffTranslation = isAr 
              ? (challenge.difficulty === "Beginner" ? "مبتدئ" : challenge.difficulty === "Intermediate" ? "متوسط" : "متقدم")
              : challenge.difficulty;

            return (
              <button
                key={challenge.id}
                onClick={() => setSelectedChallenge(challenge)}
                className={`py-2 px-4 rounded-xl text-xs md:text-sm font-medium border flex items-center gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? "bg-slate-900 border-slate-900 text-white dark:bg-sky-950 dark:border-sky-900 dark:text-sky-100 shadow-sm"
                    : "bg-slate-50 border-slate-100 hover:bg-slate-100 dark:bg-slate-900/40 dark:border-slate-850 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                }`}
              >
                {isCompleted && <CheckCircle className="w-3.5 h-3.5 text-sky-500 fill-sky-50" />}
                {title}
                <span className={`text-[10px] uppercase font-bold tracking-wide px-1.5 py-0.5 rounded shrink-0 ${
                  isSelected ? "bg-slate-800 dark:bg-sky-900 text-sky-400" : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}>
                  {diffTranslation}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary Split: Left columns Description, Right columns Mock IDE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Description & Java Contrast Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4" style={{ textAlign: isAr ? "right" : "left" }}>
            <div>
              <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 tracking-wider uppercase bg-sky-50 dark:bg-sky-950/50 px-2.5 py-1 rounded-full">
                {isAr ? "وصف التحدي البرمجي" : "Challenge Description"}
              </span>
              <h2 className="font-display font-black text-slate-900 dark:text-white text-xl md:text-2xl mt-2.5 leading-tight">
                {resolvedTitle}
              </h2>
            </div>

            <div className="text-slate-600 dark:text-slate-300 text-xs md:text-sm leading-relaxed whitespace-pre-wrap">
              {resolvedDescription}
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
              <h4 className="font-display font-bold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wider mb-2">
                {isAr ? "المتطلبات والقيود البرمجية:" : "Requirements & Constraints:"}
              </h4>
              <p className="text-slate-500 dark:text-slate-400 font-mono text-xs whitespace-pre-wrap leading-relaxed">
                {resolvedConstraints}
              </p>
            </div>
          </div>

          {/* Java OOP Contrast Callout */}
          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-2xl p-5 shadow-sm" style={{ textAlign: isAr ? "right" : "left" }}>
            <h4 className="font-display font-bold text-slate-800 dark:text-slate-200 text-sm mb-2 flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-rose-500" />
              {isAr ? "الانتقال البرمجي من جافا" : "Java Paradigm Transition"}
            </h4>
            <p className="text-slate-600 dark:text-slate-350 text-xs md:text-sm leading-relaxed">
              {resolvedJavaContrast}
            </p>
          </div>
        </div>

        {/* IDE & Evaluator Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl shadow-lg overflow-hidden flex flex-col min-h-[480px]">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 select-none">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-semibold text-slate-200 tracking-wide">
                  editor.dart
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={resetCode}
                  className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                  title={isAr ? "إعادة التعيين للكود الأساسي" : "Reset to Starter Template"}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Code Field */}
            <div className="flex-1 relative flex font-mono text-xs md:text-sm">
              {/* Fake gutter */}
              <div className="w-10 bg-slate-950 border-r border-slate-800 py-4 text-right pr-3 text-slate-600 select-none font-mono">
                {Array.from({ length: Math.max(10, userCode.split("\n").length) }).map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              {/* Actual textarea */}
              <textarea
                value={userCode}
                onChange={(e) => handleCodeChange(e.target.value)}
                spellCheck={false}
                placeholder={isAr ? "// اكتب كود دارت هنا..." : "// Write your Dart implementation here..."}
                className="flex-1 p-4 bg-transparent text-slate-100 focus:outline-none resize-none font-mono leading-relaxed h-[360px] lg:h-[420px]"
                dir="ltr"
              />
            </div>

            {/* Editor Footer: Action controllers */}
            <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-mono">
                {isAr ? "تفعيل أمان Null Safety (دارت 3)" : "Null Safety Enabled (Dart 3.x)"}
              </span>
              <button
                onClick={handleGradeCode}
                disabled={isGrading || !userCode.trim()}
                className="px-5 py-2 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer shadow-sm shadow-sky-500/20"
              >
                {isGrading ? (
                  <>
                    <Loader className="w-3.5 h-3.5 animate-spin text-white" />
                    {isAr ? "جاري تقييم الكود برمجيّاً..." : "Analyzing Code..."}
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-white text-white" />
                    {isAr ? "إرسال للمصحح الذكي" : "Submit to AI Evaluator"}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* AI grading report panel */}
          {error && (
            <div className="bg-rose-50 border border-rose-200 dark:bg-rose-950/20 dark:border-rose-900 rounded-2xl p-4 flex items-center gap-3 text-rose-800 dark:text-rose-350 text-xs md:text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          {gradeResult && (
            <div className={`bg-white dark:bg-slate-900 rounded-2xl border p-6 shadow-md space-y-6 animate-fade-in ${
              gradeResult.passed ? "border-sky-200 dark:border-sky-950" : "border-rose-200 dark:border-rose-950"
            }`} style={{ textAlign: isAr ? "right" : "left" }}>
              {/* Header card metrics */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
                <div className="flex items-center gap-3">
                  {gradeResult.passed ? (
                    <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950/50 flex items-center justify-center border border-sky-100 dark:border-sky-900">
                      <CheckCircle className="w-6 h-6 text-sky-500 fill-sky-50 dark:fill-transparent" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center border border-rose-100 dark:border-rose-900">
                      <AlertCircle className="w-6 h-6 text-rose-500" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-display font-black text-slate-900 dark:text-white text-lg">
                      {isAr ? "تقرير التقييم الذكي" : "Evaluation Report"}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {gradeResult.passed 
                        ? (isAr ? "عمل رائع! لقد اجتزت القيود بنجاح." : "Excellent job! You met the challenge constraints.")
                        : (isAr ? "تحقق من الملاحظات المرفقة لتمرير التحدي." : "Review feedback to correct compilation errors.")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-4 py-2 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {isAr ? "الدرجة:" : "Score:"} {gradeResult.score}/100
                  </span>
                </div>
              </div>

              {/* Feedback Markdown */}
              <div className="prose max-w-none text-slate-600 dark:text-slate-350 text-xs md:text-sm leading-relaxed">
                <MarkdownRenderer content={gradeResult.feedback} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
