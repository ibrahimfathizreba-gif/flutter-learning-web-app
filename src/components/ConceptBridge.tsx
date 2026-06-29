import React, { useState, useEffect } from "react";
import { Search, Sparkles, BookOpen, ArrowRightLeft, Cpu, HelpCircle, Loader, CheckCircle } from "lucide-react";
import { Concept } from "../types";
import { COMPARATIVE_CONCEPTS } from "../data";
import MarkdownRenderer from "./MarkdownRenderer";

interface ConceptBridgeProps {
  completedConcepts: string[];
  onConceptViewed: (id: string) => void;
  language: "en" | "ar";
}

// Arabic translations for the 5 comparative concepts
const CONCEPT_TRANSLATIONS: Record<string, {
  nameAr: string;
  categoryAr: string;
  summaryAr: string;
  javaComparisonAr: string;
  proTipsAr: string;
}> = {
  c1: {
    nameAr: "الواجهات البرمجية الضمنية (Implicit Interfaces)",
    categoryAr: "تطابق OOP",
    summaryAr: "لا تملك دارت كلمة مفتاحية منفصلة للواجهات (interface). بدلاً من ذلك، تحدد كل فئة واجهة ضمنية تحتوي على جميع متغيراتها ودوالها، مما يتيح تطبيقها في فئات أخرى مباشرة.",
    javaComparisonAr: "في جافا، الواجهات هي أنواع منفصلة تماماً تُعلن بكلمة 'interface'. أما في دارت، فكل فئة هي واجهة برمجية بحد ذاتها، مما يلغي تكرار الأكواد والملفات المزدوجة لتسهيل فحص وتجربة الأكواد.",
    proTipsAr: "عند كتابة اختبارات معزولة (Unit Tests)، لا حاجة لإنشاء عشرات الواجهات الوهمية. يمكنك ببساطة تعريف فئة وهمية ترث بنية فئة الإنتاج الأصلية مباشرة، لكن عليك إعادة كتابة جميع الدوال المسجلة بها."
  },
  c2: {
    nameAr: "قوائم التهيئة ومنشئات الكود",
    categoryAr: "تطابق OOP",
    summaryAr: "تتميز منشئات دارت بصياغة مدمجة وقوية: تعيين المعاملات المختصر (this.field)، وقوائم التهيئة التي يتم تنفيذها تماماً قبل بدء تشغيل جسم المنشئ الرئيسي.",
    javaComparisonAr: "في جافا، يجب تعيين قيم جميع الحقول بداخل جسم المنشئ بعد استدعاء المنشئ الأب. أما في دارت، فنستخدم قائمة تهيئة (initializer list) لتهيئة المتغيرات الثابتة بشكل صريح وآمن.",
    proTipsAr: "تعتبر قوائم التهيئة ممتازة لإجراء فحوصات الأمان وتأكيد البيانات (asserts) وتهيئة المتغيرات غير القابلة للتعديل (final) قبل معالجة منشئ الكلاس، مما يضمن أمان وقت الترجمة."
  },
  c3: {
    nameAr: "المخاليط البرمجية (Mixins)",
    categoryAr: "تطابق OOP",
    summaryAr: "تتيح الـ Mixins للفئة إعادة استخدام أجزاء من كود فئة أخرى عبر مستويات هرمية متعددة ومختلفة دون الحاجة لوراثتها بشكل مباشر، مما يحل مشكلة الوراثة المتعددة التقليدية.",
    javaComparisonAr: "تمنع جافا الوراثة المتعددة لتجنب تضارب الدوال وتسمح فقط بتنفيذ واجهات متعددة. أما دارت، فتوفر الـ mixins لتضمين الدوال وحالة المتغيرات معاً في الفئات باستخدام الكلمة 'with'.",
    proTipsAr: "تُستخدم الميكسنس على نطاق واسع في فلاتر لدمج متحكمات الحركة، مثل SingleTickerProviderStateMixin الذي يمد واجهات العرض بالنبضات الرسومية اللازمة لتنشيط الرسوم المتحركة بسلاسة وسرعة."
  },
  c4: {
    nameAr: "أمان القيم الفارغة الصارم (Sound Null Safety)",
    categoryAr: "أساسيات اللغة",
    summaryAr: "تتميز لغة دارت بنظام أمان صارم من القيم الفارغة على مستوى المترجم، مما يضمن عدم إمكانية احتواء أي متغير على قيمة فارغة (null) إلا إذا سمحت بذلك صراحة باستخدام الرمز (?) .",
    javaComparisonAr: "في جافا، يمكن لأي متغير من نوع الكائنات أن يكون فارغاً مما يسبب الأخطاء وقت التشغيل. في دارت، يمنع المترجم هذه المشكلة تماماً بفرض قيود صارمة تتطلب معالجة القيم الفارغة بشكل صريح ومسبق.",
    proTipsAr: "لأن أمان القيم الفارغة في دارت حقيقي وصارم (sound)، يمكن للمترجم تبسيط بايت كود التشغيل متفادياً الفحوصات غير الضرورية وقت التشغيل، مما ينتج عنه تطبيق أسرع بكثير."
  },
  c5: {
    nameAr: "عزل العمليات مقابل الخيوط (Isolates vs Threads)",
    categoryAr: "الأكواد غير المتزامنة",
    summaryAr: "تعمل أكواد دارت في حلقة أحداث أحادية الخيط. ويتم تحقيق التوازي عبر 'Isolates' وهي خيوط عمل مستقلة تماماً لا تشارك الذاكرة، وتتواصل فقط عبر إرسال الرسائل من خلال المنافذ.",
    javaComparisonAr: "تعتمد جافا على الخيوط (Threads) التي تتشارك ذاكرة التطبيق العامة مما يسبب مشاكل تصادم البيانات والجمود البرمجي. أما دارت فتمنع التصادم كلياً بإعطاء كل Isolate ذاكرته المستقلة الخاصة به.",
    proTipsAr: "في فلاتر، 95% من العمليات (الاتصال بالشبكة، تحليل البيانات، بناء الواجهات) تتم في خيط واحد بفضل async/await. استخدم Isolate فقط للعمليات الرياضية الشاقة وتعديل جودة الصور الثقيلة."
  }
};

export default function ConceptBridge({ completedConcepts, onConceptViewed, language }: ConceptBridgeProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConcept, setSelectedConcept] = useState<Concept>(COMPARATIVE_CONCEPTS[0]);

  // Track viewing of concept
  useEffect(() => {
    if (selectedConcept && onConceptViewed) {
      onConceptViewed(selectedConcept.id);
    }
  }, [selectedConcept, onConceptViewed]);
  
  // Custom AI prompt state
  const [customPrompt, setCustomPrompt] = useState("");
  const [aiResult, setAiResult] = useState<any | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [aiError, setAiError] = useState("");

  const isAr = language === "ar";

  const filteredConcepts = COMPARATIVE_CONCEPTS.filter((c) => {
    const term = searchQuery.toLowerCase();
    const name = isAr ? (CONCEPT_TRANSLATIONS[c.id]?.nameAr || c.name) : c.name;
    const summary = isAr ? (CONCEPT_TRANSLATIONS[c.id]?.summaryAr || c.summary) : c.summary;
    const category = isAr ? (CONCEPT_TRANSLATIONS[c.id]?.categoryAr || c.category) : c.category;

    return (
      name.toLowerCase().includes(term) ||
      summary.toLowerCase().includes(term) ||
      category.toLowerCase().includes(term) ||
      c.name.toLowerCase().includes(term) ||
      c.summary.toLowerCase().includes(term) ||
      c.category.toLowerCase().includes(term)
    );
  });

  const handleAiDeepDive = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;

    setLoadingAi(true);
    setAiError("");
    setAiResult(null);

    try {
      const res = await fetch("/api/explain-concept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ concept: customPrompt, language }),
      });

      if (!res.ok) {
        throw new Error(isAr ? "فشل الاتصال بالمستشار الذكي" : "Failed to consult AI Advisor");
      }

      const data = await res.json();
      setAiResult(data);
    } catch (err: any) {
      setAiError(err.message || (isAr ? "حدث خطأ أثناء طلب البيانات من خادم جينوم." : "An error occurred while calling the Gemini API."));
    } finally {
      setLoadingAi(false);
    }
  };

  // Resolve properties according to selected language
  const resolvedName = isAr ? (CONCEPT_TRANSLATIONS[selectedConcept.id]?.nameAr || selectedConcept.name) : selectedConcept.name;
  const resolvedCategory = isAr ? (CONCEPT_TRANSLATIONS[selectedConcept.id]?.categoryAr || selectedConcept.category) : selectedConcept.category;
  const resolvedSummary = isAr ? (CONCEPT_TRANSLATIONS[selectedConcept.id]?.summaryAr || selectedConcept.summary) : selectedConcept.summary;
  const resolvedJavaComparison = isAr ? (CONCEPT_TRANSLATIONS[selectedConcept.id]?.javaComparisonAr || selectedConcept.javaComparison) : selectedConcept.javaComparison;
  const resolvedProTips = isAr ? (CONCEPT_TRANSLATIONS[selectedConcept.id]?.proTipsAr || selectedConcept.proTips) : selectedConcept.proTips;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto px-4 py-2">
      {/* Sidebar: Navigation and search */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-850 p-5 shadow-sm">
          <h3 className="font-display font-bold text-slate-800 dark:text-slate-100 text-lg mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-500" />
            {isAr ? "مخطط مفاهيم البرمجة الكائنية" : "OOP Concept Mapper"}
          </h3>
          
          {/* Search box */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder={isAr ? "ابحث عن مفاهيم (مثل mixin)..." : "Search concepts (e.g. mixin)..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700 dark:text-slate-300 placeholder-slate-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>

          {/* Concept List */}
          <div className="space-y-2 max-h-80 lg:max-h-[420px] overflow-y-auto pr-1">
            {filteredConcepts.map((concept) => {
              const isCompleted = completedConcepts.includes(concept.id);
              const conceptName = isAr ? (CONCEPT_TRANSLATIONS[concept.id]?.nameAr || concept.name) : concept.name;
              const conceptCategory = isAr ? (CONCEPT_TRANSLATIONS[concept.id]?.categoryAr || concept.category) : concept.category;
              const conceptSummary = isAr ? (CONCEPT_TRANSLATIONS[concept.id]?.summaryAr || concept.summary) : concept.summary;

              return (
                <button
                  key={concept.id}
                  onClick={() => {
                    setSelectedConcept(concept);
                    setAiResult(null); // Clear AI deep dive if viewing preset
                  }}
                  className={`w-full text-left p-3.5 rounded-xl transition-all border relative overflow-hidden cursor-pointer ${
                    selectedConcept.id === concept.id && !aiResult
                      ? "bg-slate-900 border-slate-900 text-white dark:bg-sky-950 dark:border-sky-900 dark:text-sky-100 shadow-sm"
                      : "bg-slate-50 border-slate-100 hover:bg-slate-100 dark:bg-slate-900/40 dark:border-slate-800 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:border-slate-200 dark:hover:border-slate-700"
                  }`}
                  style={{ textAlign: isAr ? "right" : "left" }}
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-medium text-sm leading-tight flex items-center gap-1.5">
                      {conceptName}
                      {isCompleted && (
                        <CheckCircle className={`w-3.5 h-3.5 ${
                          selectedConcept.id === concept.id && !aiResult ? "text-sky-400" : "text-sky-600 dark:text-sky-400"
                        }`} />
                      )}
                    </span>
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full shrink-0 ${
                      selectedConcept.id === concept.id && !aiResult
                        ? "bg-slate-800 dark:bg-sky-900 text-sky-400"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    }`}>
                      {conceptCategory}
                    </span>
                  </div>
                  <p className={`text-xs mt-1.5 line-clamp-2 ${
                    selectedConcept.id === concept.id && !aiResult ? "text-slate-300" : "text-slate-500 dark:text-slate-400"
                  }`}>
                    {conceptSummary}
                  </p>
                </button>
              );
            })}

            {filteredConcepts.length === 0 && (
              <p className="text-center text-slate-400 text-xs py-8">
                {isAr ? "لا توجد مفاهيم تطابق معايير البحث." : "No concepts match your search."}
              </p>
            )}
          </div>
        </div>

        {/* AI Custom Consult widget */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl border border-slate-800 p-5 shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            <h4 className="font-display font-bold text-base">
              {isAr ? "مترجم أنماط جافا إلى فلاتر" : "Custom Java-to-Dart Translator"}
            </h4>
          </div>
          <p className="text-xs text-slate-300 mb-4 leading-relaxed">
            {isAr 
              ? "هل تريد ترجمة نمط جافا معين إلى فلاتر؟ (مثال: 'حقن الاعتمادات'، 'اختبارات JUnit'، 'الفئات المجردة'). اسأل المستشار الذكي."
              : "Need to translate a specific Java pattern to Flutter? (e.g., \"Spring Dependency Injection\", \"JUnit to Flutter test\", \"Abstract classes\"). Ask the AI Advisor."}
          </p>
          <form onSubmit={handleAiDeepDive} className="space-y-3">
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder={isAr ? "مثال: مكافئ مستودع Spring @Repository في فلاتر..." : "e.g. Spring @Repository equivalent in Flutter..."}
              rows={3}
              className="w-full p-3 rounded-xl bg-slate-950/80 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/40 text-xs text-slate-100 placeholder-slate-500 resize-none"
            />
            <button
              type="submit"
              disabled={loadingAi || !customPrompt.trim()}
              className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              {loadingAi ? (
                <>
                  <Loader className="w-3.5 h-3.5 animate-spin text-white" />
                  {isAr ? "جاري بناء الجسر المفاهيمي..." : "Generating Bridge..."}
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  {isAr ? "استشر المستشار الذكي" : "Consult AI Advisor"}
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Main Display: Detailed concept comparison */}
      <div className="lg:col-span-8">
        {/* If displaying Custom AI Bridge Result */}
        {aiResult ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden animate-fade-in">
            <div className="p-6 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-850 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-widest bg-sky-50 dark:bg-sky-950 px-2 py-1 rounded-md">
                  {isAr ? "نتيجة الجسر المخصصة للذكاء الاصطناعي" : "AI Custom Bridge Result"}
                </span>
                <h2 className="font-display font-black text-slate-900 dark:text-white text-2xl mt-2">
                  {aiResult.concept}
                </h2>
              </div>
              <button
                onClick={() => setAiResult(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-medium border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1 bg-white dark:bg-slate-900 cursor-pointer"
              >
                {isAr ? "العودة للخيارات الجاهزة" : "Back to Presets"}
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h4 className="font-display font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2 text-sm">
                  <BookOpen className="w-4 h-4 text-slate-500" />
                  {isAr ? "الجسر المفاهيمي" : "Conceptual Bridge"}
                </h4>
                <div className="prose max-w-none text-slate-600 dark:text-slate-300 text-sm">
                  <MarkdownRenderer content={aiResult.explanation} />
                </div>
              </div>

              {/* Code comparison */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <h5 className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500" /> {isAr ? "تطبيق جافا" : "Java Implementation"}
                  </h5>
                  <MarkdownRenderer content={"```java\n" + aiResult.javaCode + "\n```"} />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-sky-500" /> {isAr ? "مكافئ دارت" : "Dart Equivalent"}
                  </h5>
                  <MarkdownRenderer content={"```dart\n" + aiResult.dartCode + "\n```"} />
                </div>
              </div>

              {/* Pro tips */}
              <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-5 border border-slate-100 dark:border-slate-800">
                <h4 className="font-display font-bold text-slate-800 dark:text-slate-200 text-sm mb-2 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-sky-500" />
                  {isAr ? "نصيحة برمجية متقدمة" : "Advanced CS Pro-Tip"}
                </h4>
                <div className="text-slate-600 dark:text-slate-300 text-sm">
                  <MarkdownRenderer content={aiResult.tips} />
                </div>
              </div>
            </div>
          </div>
        ) : aiError ? (
          <div className="bg-rose-50 dark:bg-rose-950/20 rounded-2xl border border-rose-200 dark:border-rose-900 p-6 text-center shadow-sm">
            <HelpCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
            <h3 className="font-display font-bold text-rose-900 dark:text-rose-200 text-lg mb-1">
              {isAr ? "فشل بناء الجسر" : "Bridge Building Failed"}
            </h3>
            <p className="text-sm text-rose-700 dark:text-rose-400 max-w-md mx-auto mb-4">{aiError}</p>
            <button
              onClick={() => setAiError("")}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-xl text-xs cursor-pointer transition-colors"
            >
              {isAr ? "إلغاء" : "Dismiss"}
            </button>
          </div>
        ) : (
          /* Preset concept details */
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-850 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest bg-slate-200/60 dark:bg-slate-800 px-2 py-1 rounded-md">
                  {resolvedCategory}
                </span>
                <h2 className="font-display font-black text-slate-900 dark:text-white text-2xl mt-2 flex items-center gap-2.5">
                  <ArrowRightLeft className="w-6 h-6 text-sky-500" />
                  {resolvedName}
                </h2>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h4 className="font-display font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2 text-sm">
                  <BookOpen className="w-4 h-4 text-slate-500" />
                  {isAr ? "الجسر المفاهيمي" : "Conceptual Bridge"}
                </h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
                  {resolvedSummary}
                </p>
                <div className="mt-3 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-l-2 border-sky-500 pl-4 bg-sky-50/20 dark:bg-sky-950/40 py-2 rounded-r-md">
                  {resolvedJavaComparison}
                </div>
              </div>

              {/* Side by side code */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <h5 className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500" /> {isAr ? "جافا OOP التقليدي" : "Java Classic OOP"}
                  </h5>
                  <MarkdownRenderer content={selectedConcept.javaSnippet} />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-sky-500" /> {isAr ? "أسلوب دارت الذكي" : "Dart Idiom"}
                  </h5>
                  <MarkdownRenderer content={selectedConcept.dartSnippet} />
                </div>
              </div>

              {/* Pro tips */}
              <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-5 border border-slate-100 dark:border-slate-800">
                <h4 className="font-display font-bold text-slate-800 dark:text-slate-200 text-sm mb-2 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-sky-500" />
                  {isAr ? "نصيحة برمجية متقدمة" : "Advanced CS Pro-Tip"}
                </h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {resolvedProTips}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
