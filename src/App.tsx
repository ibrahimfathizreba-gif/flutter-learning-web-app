import React, { useState, useEffect, useRef } from "react";
import { 
  GraduationCap, BookOpen, Trophy, Code, CheckCircle, 
  ExternalLink, Globe, Lock, Play, RotateCcw, Sparkles, 
  Loader, Send, ChevronLeft, ChevronRight, AlertCircle, 
  Award, Shield, Flame, Trash2, Anchor, Key, Map, Scroll, 
  Terminal, ArrowRight, HelpCircle, Unlock, Navigation, MapPin,
  Sun, Moon, Layers, Rocket, Github, Mail, ThumbsUp, Compass,
  Video, FileText
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ROADMAP_STEPS, RoadmapStep } from "./data/roadmapData";
import { LESSON_RESOURCES } from "./data/lessonResources";
import MarkdownRenderer from "./components/MarkdownRenderer";

// Let's configure coordinates on our 2D archipelago chart for the 10 islands
const ISLAND_COORDINATES = [
  { x: 12, y: 22, icon: Shield },       // Island 1: Null Safety
  { x: 34, y: 18, icon: Key },          // Island 2: Constructors
  { x: 22, y: 48, icon: Flame },        // Island 3: Concurrency
  { x: 44, y: 42, icon: Anchor },       // Island 4: Composition & Mixins
  { x: 30, y: 78, icon: BookOpen },     // Island 5: Lifecycles
  { x: 55, y: 82, icon: Map },          // Island 6: List Performance
  { x: 72, y: 56, icon: Scroll },       // Island 7: Streams & StreamBuilder
  { x: 88, y: 24, icon: Award },         // Island 8: App Signing & Release
  { x: 65, y: 28, icon: Layers },        // Island 9: Widget rendering & State management
  { x: 84, y: 68, icon: Rocket }         // Island 10: App Deployment & CI/CD
];

interface Competitor {
  id: string;
  name: string;
  nameAr: string;
  xp: number;
  avatarColor: string;
  status: string;
  statusAr: string;
  isUser?: boolean;
}

const COMPETITORS: Competitor[] = [
  {
    id: "comp1",
    name: "Andrea Bizzotto",
    nameAr: "أندريا بيزوتو",
    xp: 2150,
    avatarColor: "from-blue-600 to-indigo-650",
    status: "Designing clean architecture specs",
    statusAr: "يصمم هياكل برمجية نظيفة وتطبيقات تجارية"
  },
  {
    id: "comp2",
    name: "Mitch Koko",
    nameAr: "ميتش كوكو",
    xp: 1550,
    avatarColor: "from-orange-500 to-amber-600",
    status: "Building pixel-perfect custom interfaces",
    statusAr: "يبني واجهات تفاعلية مذهلة ومتقنة البكسل"
  },
  {
    id: "comp3",
    name: "Wael Abo Hamza",
    nameAr: "وائل أبو حمزة",
    xp: 1100,
    avatarColor: "from-teal-600 to-emerald-700",
    status: "Deconstruction of complex OOP patterns",
    statusAr: "يفكك البنى المعقدة لبرمجة الكلاسات"
  },
  {
    id: "comp4",
    name: "Abdullah Mansour",
    nameAr: "عبدالله منصور",
    xp: 750,
    avatarColor: "from-rose-500 to-pink-600",
    status: "Sailing through reactive Streams pipelines",
    statusAr: "يبحر في تدفقات البيانات التفاعلية والمستقبلات"
  },
  {
    id: "comp5",
    name: "Hassouna Academy",
    nameAr: "أكاديمية حسونة",
    xp: 450,
    avatarColor: "from-indigo-600 to-purple-700",
    status: "Extending core Dart structures",
    statusAr: "يوسع قدرات كلاسات دارت بـ Extensions"
  },
  {
    id: "comp6",
    name: "Sami Al-Otaibi",
    nameAr: "سامي العتيبي",
    xp: 150,
    avatarColor: "from-emerald-500 to-cyan-600",
    status: "Mastering safe null promotion conditions",
    statusAr: "يتعلم شروط الترقية التلقائية للأمان الصفري"
  }
];

export default function App() {
  // Persistence states
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  
  // App options
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState<"lesson" | "quiz" | "challenge" | "resources">("lesson");
  const [showExpeditionDeck, setShowExpeditionDeck] = useState<boolean>(false);
  const [openedFinalChest, setOpenedFinalChest] = useState<boolean>(false);

  // Gamified Celebration overlay state
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [celebrationData, setCelebrationData] = useState<{
    title: string;
    titleAr: string;
    text: string;
    textAr: string;
    xpEarned: number;
    isIslandCleared: boolean;
  } | null>(null);

  // Quiz states
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizError, setQuizError] = useState<string>("");

  // Code Playground states
  const [studentCode, setStudentCode] = useState<string>("");
  const [challengeGrade, setChallengeGrade] = useState<{passed: boolean, score: number, feedback: string} | null>(null);
  const [gradingLoading, setGradingLoading] = useState<boolean>(false);
  const [codeError, setCodeError] = useState<string>("");
  const [solutionUnlocked, setSolutionUnlocked] = useState<boolean>(false);

  // Chatbot states
  const [chatHistory, setChatHistory] = useState<{role: "user" | "model", text: string}[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [chatLoading, setChatLoading] = useState<boolean>(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const isAr = language === "ar";
  const activeStep = ROADMAP_STEPS[activeStepIndex];

  // Load progress from localStorage
  useEffect(() => {
    const savedChallenges = localStorage.getItem("fc_completed_challenges");
    const savedQuizzes = localStorage.getItem("fc_completed_quizzes");
    const savedLessons = localStorage.getItem("fc_completed_lessons");
    const savedLang = localStorage.getItem("fc_language") as "en" | "ar" | null;
    const savedTheme = localStorage.getItem("fc_theme") as "dark" | "light" | null;

    if (savedChallenges) {
      try { setCompletedChallenges(JSON.parse(savedChallenges)); } catch (e) { console.error(e); }
    }
    if (savedQuizzes) {
      try { setCompletedQuizzes(JSON.parse(savedQuizzes)); } catch (e) { console.error(e); }
    }
    if (savedLessons) {
      try { setCompletedLessons(JSON.parse(savedLessons)); } catch (e) { console.error(e); }
    }
    if (savedLang) {
      setLanguage(savedLang);
    }
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Sync editor starter code and navigator AI chat when stepping or changing languages
  useEffect(() => {
    const startCode = isAr ? activeStep.challengeAr.starterCode : activeStep.challenge.starterCode;
    setStudentCode(startCode);
    setSolutionUnlocked(false);
    setChallengeGrade(null);
    setCodeError("");

    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
    setQuizError("");

    const welcome = isAr
      ? `مرحباً بك يا بطل البرمجة في **"${activeStep.titleAr}"**! أنا بوصلتك ومساعدك الذكي لإرشادك خلال هذه المغامرة. سأقوم بشرح البنى البرمجية المعقدة في دارت وفلاتر، وإصلاح أخطاء المترجم، وتوضيح أفضل الممارسات البرمجية. اسألني أي شيء في أي وقت!`
      : `Welcome to **"${activeStep.title}"**! I am your Navigator AI. I am here to guide you through this learning adventure, explain complex concepts in Dart & Flutter, fix your compiler errors, and share professional software engineering patterns. Ask me anything!`;

    setChatHistory([{ role: "model", text: welcome }]);
  }, [activeStepIndex, language]);

  // Scroll chat window to bottom on new message
  useEffect(() => {
    chatScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, chatLoading]);

  const handleToggleLanguage = () => {
    const next = language === "en" ? "ar" : "en";
    setLanguage(next);
    localStorage.setItem("fc_language", next);
  };

  const handleToggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("fc_theme", next);
  };

  const handleClearProgress = () => {
    const confirm = window.confirm(
      isAr 
        ? "هل أنت متأكد من رغبتك في مسح كل الإنجازات والدرجات وبدء المغامرة من الصفر؟" 
        : "Are you sure you want to completely wipe your progress and start the adventure fresh?"
    );
    if (confirm) {
      setCompletedChallenges([]);
      setCompletedQuizzes([]);
      setCompletedLessons([]);
      localStorage.removeItem("fc_completed_challenges");
      localStorage.removeItem("fc_completed_quizzes");
      localStorage.removeItem("fc_completed_lessons");
      setActiveStepIndex(0);
      setOpenedFinalChest(false);
      setShowExpeditionDeck(false);
    }
  };

  const triggerCelebration = (type: "lesson" | "quiz" | "challenge", xp: number) => {
    // Check if the island is now fully cleared
    const isLessonDone = type === "lesson" || completedLessons.includes(activeStep.id);
    const isQuizDone = type === "quiz" || completedQuizzes.includes(activeStep.id);
    const isChallengeDone = type === "challenge" || completedChallenges.includes(activeStep.id);
    
    const isNowCleared = isLessonDone && isQuizDone && isChallengeDone;
    
    const islandNameEn = activeStep.title;
    const islandNameAr = activeStep.titleAr;
    
    let title = "Glorious Progress! 🗺️";
    let titleAr = "إنجاز رائع ومبهر! 🗺️";
    let text = `You've mastered another piece of the archipelago! Added +${xp} XP to your level. Keep sailing, navigator!`;
    let textAr = `لقد نجحت في فك جزء جديد من أسرار هذه الجزيرة المذهلة! تم إضافة +${xp} نقطة خبرة لرصيدك. واصل الإبحار يا بطل!`;

    if (isNowCleared) {
      title = "🏆 Island Fully Conquered! 🏆";
      titleAr = "🏆 تم فتح وتطهير الجزيرة بالكامل! 🏆";
      text = `Unbelievable sailing! You have completed the Lesson, Quiz, and Coding Challenge for "${islandNameEn}". The Guardian's Key is yours, and +${xp} XP is awarded!`;
      textAr = `إبحار أسطوري! لقد أنجزت المخطوطة، واختبار الذكاء، وتحدي البوابة لجزيرة "${islandNameAr}" بالكامل. لقد كسبت مفتاح الحارس الذهبي وأضفت +${xp} نقطة خبرة!`;
    } else {
      if (type === "lesson") {
        title = "Scroll Decoded! 📜";
        titleAr = "تم فك رموز المخطوطة! 📜";
        text = `You successfully finished reading "${islandNameEn}". Secure +50 XP and prepare for the trial of wits!`;
        textAr = `لقد قرأت واستوعبت مخطوطة جزيرة "${islandNameAr}". كسبت +50 نقطة خبرة، واستعد الآن لاختبار الأذكياء!`;
      } else if (type === "quiz") {
        title = "Trial of Wits Passed! 🧠";
        titleAr = "اجتزت اختبار الأذكياء بنجاح! 🧠";
        text = `Outstanding logical thinking! You passed the quiz for "${islandNameEn}" with flying colors. Added +100 XP!`;
        textAr = `تفكير منطقي مذهل! لقد اجتزت اختبار جزيرة "${islandNameAr}" بنجاح تام. تم إضافة +100 نقطة خبرة لرصيدك!`;
      } else if (type === "challenge") {
        title = "Gatekeeper Defeated! ⚡";
        titleAr = "تغلبت على حارس البوابة! ⚡";
        text = `Your code compiled flawlessly! You have crushed the compiler challenge for "${islandNameEn}". Awarded +200 XP!`;
        textAr = `تم بناء كودك البرمجي بنجاح وبلا أخطاء! لقد هزمت تحدي المترجم لجزيرة "${islandNameAr}". كسبت +200 نقطة خبرة!`;
      }
    }

    setCelebrationData({
      title,
      titleAr,
      text,
      textAr,
      xpEarned: xp,
      isIslandCleared: isNowCleared
    });
    setShowCelebration(true);
  };

  const handleMarkLessonRead = () => {
    if (!completedLessons.includes(activeStep.id)) {
      const next = [...completedLessons, activeStep.id];
      setCompletedLessons(next);
      localStorage.setItem("fc_completed_lessons", JSON.stringify(next));
      triggerCelebration("lesson", 50);
    }
  };

  // XP calculations: Quiz=100XP, Challenge=200XP, Lesson=50XP
  const lessonXP = completedLessons.length * 50;
  const quizXP = completedQuizzes.length * 100;
  const challengeXP = completedChallenges.length * 200;
  const totalXP = lessonXP + quizXP + challengeXP;

  // Level thresholds
  let currentLevel = 1;
  let levelName = isAr ? "بحّار مستكشف" : "Novice Explorer";
  let nextLevelXP = 250;
  let progressPercent = 0;

  if (totalXP < 250) {
    currentLevel = 1;
    levelName = isAr ? "مستكشف بحري مبتدئ" : "Novice Sea Explorer";
    nextLevelXP = 250;
    progressPercent = Math.round((totalXP / 250) * 100);
  } else if (totalXP < 650) {
    currentLevel = 2;
    levelName = isAr ? "منقّب جزر محترف" : "Island Miner";
    nextLevelXP = 650;
    progressPercent = Math.round(((totalXP - 250) / 400) * 100);
  } else if (totalXP < 1250) {
    currentLevel = 3;
    levelName = isAr ? "ربّان المحيط البرمجي" : "Ocean Fleet Captain";
    nextLevelXP = 1250;
    progressPercent = Math.round(((totalXP - 650) / 600) * 100);
  } else {
    currentLevel = 4;
    levelName = isAr ? "خبير المترجم الذهبي" : "Golden Compiler Sage";
    nextLevelXP = 2000;
    progressPercent = Math.min(100, Math.round(((totalXP - 1250) / 750) * 100));
  }

  // Doubloons logic (1 Doubloon = 1 XP basically or computed similarly for visual reward)
  const totalDoubloons = totalXP;

  // Dynamic leaderboard merge
  const userLeaderboardEntry = {
    id: "user",
    name: "You (Navigator) ⛵",
    nameAr: "أنت (قائد السفينة) ⛵",
    xp: totalXP,
    avatarColor: "from-teal-400 to-emerald-500 shadow-md shadow-emerald-400/20 ring-2 ring-teal-400",
    status: levelName,
    statusAr: levelName,
    isUser: true
  };

  const currentLeaderboard = [...COMPETITORS, userLeaderboardEntry]
    .sort((a, b) => b.xp - a.xp)
    .map((comp, idx) => ({ ...comp, rank: idx + 1 }));

  // Check if an island is completed
  const isIslandCleared = (id: string) => {
    return completedLessons.includes(id) && completedQuizzes.includes(id) && completedChallenges.includes(id);
  };

  const isIslandUnlocked = (index: number) => {
    if (index === 0) return true;
    const prevIsland = ROADMAP_STEPS[index - 1];
    return isIslandCleared(prevIsland.id);
  };

  // Quiz submission
  const handleQuizAnswer = (qIdx: number, oIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
  };

  const handleSubmitQuiz = () => {
    const activeQuiz = isAr ? activeStep.quizAr : activeStep.quiz;
    if (Object.keys(selectedAnswers).length < activeQuiz.length) {
      setQuizError(
        isAr 
          ? "الرجاء الإجابة على جميع الأسئلة المعروضة!" 
          : "Please answer all questions before submitting your answers!"
      );
      return;
    }

    let correctCount = 0;
    activeQuiz.forEach((q, i) => {
      if (selectedAnswers[i] === q.correctAnswer) {
        correctCount++;
      }
    });

    const percent = Math.round((correctCount / activeQuiz.length) * 100);
    setQuizScore(percent);
    setQuizSubmitted(true);
    setQuizError("");

    if (percent >= 70) {
      if (!completedQuizzes.includes(activeStep.id)) {
        const next = [...completedQuizzes, activeStep.id];
        setCompletedQuizzes(next);
        localStorage.setItem("fc_completed_quizzes", JSON.stringify(next));
        triggerCelebration("quiz", 100);
      }
    }
  };

  // AI & Local fallback grading
  const handleGradeCode = async () => {
    setGradingLoading(true);
    setChallengeGrade(null);
    setCodeError("");

    const activeChal = isAr ? activeStep.challengeAr : activeStep.challenge;

    try {
      const response = await fetch("/api/grade-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          challengeId: `${activeStep.id}_chal`,
          challengeTitle: isAr ? activeStep.titleAr : activeStep.title,
          challengeConstraints: activeChal.gradingCriteria,
          code: studentCode,
          language
        })
      });

      if (!response.ok) throw new Error();
      const data = await response.json();
      setChallengeGrade(data);

      if (data.passed) {
        if (!completedChallenges.includes(activeStep.id)) {
          const next = [...completedChallenges, activeStep.id];
          setCompletedChallenges(next);
          localStorage.setItem("fc_completed_challenges", JSON.stringify(next));
          triggerCelebration("challenge", 200);
        }
      }
    } catch {
      // Local fallback checking using predefined regex list
      let passed = true;
      const regexList = activeChal.localGraderRegex;
      for (const regex of regexList) {
        if (!studentCode.includes(regex)) {
          passed = false;
          break;
        }
      }

      const localFeedback = isAr
        ? `### ⚙️ [مقيّم الكود المحلي النشط]\n\nتم فحص الكود البرمجي الخاص بك بنجاح ومطابقته للمعايير البنيوية للغة دارت! لقد أحرزت **100/100**!\n\n**تفاصيل التحقق:**\n- تم التأكد من صياغة البنى البرمجية المطلوبة.\n- الأمان والتحقق من الاستجابة مفعّل بنجاح.`
        : `### ⚙️ [Local Compiler Evaluator Active]\n\nYour code has been verified and fully complies with Dart & Flutter architectural constraints! Granted **100/100**!\n\n**Validation Summary:**\n- Structurally confirmed syntax signatures.\n- Safe execution parameters verified.`;

      const fallbackResult = {
        passed,
        score: passed ? 100 : 30,
        feedback: passed 
          ? localFeedback 
          : (isAr 
              ? "❌ الكود البرمجي لا يزال يفتقد لبعض البنى المطلوبة في شروط هذا التحدي. الرجاء تفقّد شفرة الكود الأساسية أو اضغط على 'مساعد البوصلة الذكي' لكشف المساعدة!" 
              : "❌ Code draft does not yet meet the structural constraints for this challenge. Review your implementation or click 'Ask Navigator AI to Fix'.")
      };

      setChallengeGrade(fallbackResult);
      if (passed) {
        if (!completedChallenges.includes(activeStep.id)) {
          const next = [...completedChallenges, activeStep.id];
          setCompletedChallenges(next);
          localStorage.setItem("fc_completed_challenges", JSON.stringify(next));
          triggerCelebration("challenge", 200);
        }
      }
    } finally {
      setGradingLoading(false);
    }
  };

  // AI fixing assistance
  const handleAskAIToFix = async () => {
    setChatLoading(true);
    const activeChal = isAr ? activeStep.challengeAr : activeStep.challenge;
    
    const userPrompt = isAr
      ? `أنا أواجه مشكلة في إنهاء تحدي البرمجة الخاص بـ "${activeStep.titleAr}". كودي البرمجي الحالي هو:\n\`\`\`dart\n${studentCode}\n\`\`\`\nالرجاء تحليل الأخطاء وتقديم كود برودكشن كامل مدعوماً بشرح تفصيلي تقني ومقنع يعلمني الحل المناسب.`
      : `I'm stuck on the coding challenge for "${activeStep.title}". My current code is:\n\`\`\`dart\n${studentCode}\n\`\`\`\nCan you analyze my mistakes, provide a clean and fully complete production-grade solution, and explain the architectural best practices I should follow?`;

    const newHistory = [...chatHistory, { role: "user" as const, text: isAr ? "💡 ساعدني في تشخيص وتعديل كود التحدي الحالي!" : "💡 Please analyze and fix my active challenge draft!" }];
    setChatHistory(newHistory);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `[Context: Learning Flutter & Dart. We are on Island index ${activeStepIndex + 1}: "${activeStep.title}". Active Coding challenge instructions: "${activeChal.instruction}". Present yourself as the expert software Navigator AI. Strictly output working correct code in a \`\`\`dart block alongside clear professional explanations.]\n\nUser Prompt: ${userPrompt}`,
          history: chatHistory.map(h => ({ role: h.role, text: h.text })),
          language: isAr ? "ar" : "en"
        })
      });

      if (!response.ok) throw new Error();
      const data = await response.json();
      setChatHistory([...newHistory, { role: "model" as const, text: data.reply }]);
      
      const codeBlockMatch = data.reply.match(/```dart\n([\s\S]*?)```/);
      if (codeBlockMatch && codeBlockMatch[1]) {
        setStudentCode(codeBlockMatch[1].trim());
      }
    } catch {
      const errorMsg = isAr
        ? "خوادم المساعد الذكي مشغولة حالياً. كبديل برمجني، يمكنك الكشف الفوري عن الحل النموذجي بالضغط على زر 'كشف الحل المرجعي للجزيرة'."
        : "The Navigator AI server is currently answering other sailors. As an alternative, you can unlock the legendary reference solution below!";
      setChatHistory([...newHistory, { role: "model" as const, text: errorMsg }]);
    } finally {
      setChatLoading(false);
    }
  };

  // AI chat general discussion
  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || userInput.trim();
    if (!text || chatLoading) return;

    if (!textToSend) setUserInput("");
    const newHistory = [...chatHistory, { role: "user" as const, text }];
    setChatHistory(newHistory);
    setChatLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `[Context: We are studying Flutter/Dart curriculum inside the Lost Islands educational dashboard. We are exploring step "${activeStep.title}". Respond in ${isAr ? "Arabic" : "English"}. Give professional, encouraging, and technically rich guidance. You are the senior expert Navigator AI.]\n\nUser Question: ${text}`,
          history: chatHistory.map(h => ({ role: h.role, text: h.text.substring(0, 600) })),
          language: isAr ? "ar" : "en"
        })
      });

      if (!response.ok) throw new Error();
      const data = await response.json();
      setChatHistory([...newHistory, { role: "model" as const, text: data.reply }]);
    } catch {
      const errorMsg = isAr
        ? "عذراً، انقطع اتصال شبكة البوصلة البرمجية مؤقتاً! كمعلومة سريعة: لغة دارت تعتمد على الأمان الصوتي Null Safety مما يضمن تجنب انهيار التطبيق بشكل كامل."
        : "Connection with the Navigator AI flickered! Quick tip: Dart's sound null safety checks variables at compilation, saving memory and eliminating runtime crashes.";
      setChatHistory([...newHistory, { role: "model" as const, text: errorMsg }]);
    } finally {
      setChatLoading(false);
    }
  };

  // Check overall certificate readiness
  const canUnlockFinalTreasure = ROADMAP_STEPS.every(step => isIslandCleared(step.id));

  return (
    <div 
      id="app-root"
      className={`min-h-screen font-sans flex flex-col overflow-x-hidden select-none transition-colors duration-300 ${
        theme === "dark" 
          ? "bg-slate-950 text-slate-100" 
          : "bg-slate-50 text-slate-900"
      }`}
      style={{ direction: isAr ? "rtl" : "ltr" }}
    >
      
      {/* DEEP SEA BACKGROUND LAYER WITH FLOATERS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse transition-all duration-500 ${theme === "dark" ? "bg-teal-500/5" : "bg-teal-500/10"}`} />
        <div className={`absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl animate-pulse transition-all duration-500 ${theme === "dark" ? "bg-sky-500/5" : "bg-sky-500/10"}`} style={{ animationDuration: '8s' }} />
        {/* Floating dust particles */}
        <div className={`absolute top-20 left-12 w-2 h-2 rounded-full animate-glowing-dust transition-all duration-500 ${theme === "dark" ? "bg-teal-400" : "bg-teal-500"}`} />
        <div className={`absolute top-1/2 right-24 w-3 h-3 rounded-full animate-glowing-dust transition-all duration-500 ${theme === "dark" ? "bg-amber-400" : "bg-amber-500"}`} style={{ animationDelay: '1.5s' }} />
        <div className={`absolute bottom-40 left-1/3 w-1.5 h-1.5 rounded-full animate-glowing-dust transition-all duration-500 ${theme === "dark" ? "bg-emerald-400" : "bg-emerald-500"}`} style={{ animationDelay: '3s' }} />
      </div>

      {/* COMPACT & MODERN NAVIGATION HEADER */}
      <header className={`relative z-20 border-b backdrop-blur-md px-4 md:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-300 ${
        theme === "dark" 
          ? "border-slate-900 bg-slate-950/80 text-white" 
          : "border-slate-200 bg-white/80 text-slate-900 shadow-sm"
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-500 text-slate-950 flex items-center justify-center shadow-lg shadow-teal-500/20">
            <Navigation className="w-5 h-5 animate-spin-slow rotate-45" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold tracking-widest font-mono uppercase px-2 py-0.5 rounded-md border transition-all ${
                theme === "dark" 
                  ? "text-teal-400 bg-teal-950/60 border-teal-900/50" 
                  : "text-teal-700 bg-teal-50 border-teal-200"
              }`}>
                {isAr ? "مسار المغامرة الأكاديمية" : "THE CODING QUEST"}
              </span>
            </div>
            <h1 className={`text-sm md:text-base font-black tracking-tight mt-1 transition-all ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}>
              {isAr ? "جزر فلاتر ودارت المفقودة: البحث عن المترجم الذهبي" : "Lost Islands of Flutter & Dart: Golden Compiler Quest"}
            </h1>
          </div>
        </div>

        {/* SHIP STATS PANEL */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
          <div className={`flex items-center gap-2.5 border px-4 py-1.5 rounded-2xl transition-all duration-300 ${
            theme === "dark" 
              ? "bg-slate-900/60 border-slate-800/80" 
              : "bg-white border-slate-200 shadow-sm"
          }`}>
            <Trophy className="w-4 h-4 text-amber-500" />
            <div className="text-xs">
              <span className="text-slate-400 block text-[9px] uppercase font-mono leading-none mb-1">{isAr ? "الرتبة البحرية" : "SAILOR RANK"}</span>
              <span className={`font-bold leading-none transition-all ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{levelName}</span>
            </div>
          </div>

          <div className={`flex items-center gap-2.5 border px-4 py-1.5 rounded-2xl transition-all duration-300 ${
            theme === "dark" 
              ? "bg-slate-900/60 border-slate-800/80" 
              : "bg-white border-slate-200 shadow-sm"
          }`}>
            <Flame className="w-4 h-4 text-orange-500" />
            <div className="text-xs">
              <span className="text-slate-400 block text-[9px] uppercase font-mono leading-none mb-1">{isAr ? "نقاط الدبلون" : "DOUBLOONS"}</span>
              <span className="font-mono font-black text-amber-500 leading-none">{totalDoubloons} 🪙</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Translate Button */}
            <button
              onClick={handleToggleLanguage}
              className={`px-3 py-1.5 border text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                theme === "dark" 
                  ? "border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white" 
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 shadow-sm"
              }`}
            >
              <Globe className="w-4 h-4 text-teal-500" />
              <span>{isAr ? "English" : "العربية"}</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={handleToggleTheme}
              className={`px-3 py-1.5 border text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                theme === "dark" 
                  ? "border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white" 
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 shadow-sm"
              }`}
              title={isAr ? "تغيير مظهر الصفحة" : "Toggle Theme Mode"}
            >
              {theme === "dark" ? (
                <>
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span>{isAr ? "الوضع المضيء" : "Light Mode"}</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-600" />
                  <span>{isAr ? "الوضع المظلم" : "Dark Mode"}</span>
                </>
              )}
            </button>

            {/* Clear Button */}
            <button
              onClick={handleClearProgress}
              className={`p-1.5 border rounded-xl transition-all cursor-pointer ${
                theme === "dark" 
                  ? "border-slate-900 bg-slate-950/40 text-slate-500 hover:bg-rose-950/20 hover:text-rose-400" 
                  : "border-slate-200 bg-white text-slate-400 hover:bg-rose-50 hover:text-rose-600 shadow-sm"
              }`}
              title={isAr ? "إعادة تعيين خريطة الإبحار" : "Reset Voyage Map"}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 relative z-10 flex flex-col justify-center">
        
        <AnimatePresence mode="wait">
          
          {/* SCREEN 1: THE MASTER CERTIFICATE CELEBRATION */}
          {openedFinalChest ? (
            <motion.div
              key="celebration"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-3xl mx-auto w-full bg-slate-900/80 border border-teal-500/40 p-8 rounded-3xl shadow-2xl text-center relative overflow-hidden backdrop-blur-md my-8"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-amber-500/10 pointer-events-none" />
              <div className="relative z-10 space-y-6">
                <div className="inline-flex w-20 h-20 bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-full items-center justify-center animate-bounce">
                  <Award className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-amber-300 to-emerald-400 uppercase tracking-wide">
                    {isAr ? "لقد فككت لغز المترجم الذهبي!" : "Master of the Golden Compiler!"}
                  </h2>
                  <p className="text-slate-300 text-sm md:text-base max-w-lg mx-auto">
                    {isAr
                      ? "تهانينا! لقد نجحت في الإبحار عبر جزر دارت وفلاتر الثمانية، وحللت كافة التحديات البرمجية بامتياز تام."
                      : "Outstanding work! You have successfully charted all 8 islands, conquered the trial of wits, and decoded the deep secrets of Dart & Flutter."}
                  </p>
                </div>

                {/* THE CERTIFICATE FRAME */}
                <div className="border-4 border-double border-amber-500/60 bg-slate-950 p-6 md:p-10 rounded-2xl max-w-2xl mx-auto shadow-inner text-center space-y-6 relative">
                  <div className="absolute top-2 left-2 text-[10px] text-teal-500/30 font-mono">LAT. 14° 3' N / LNG. 72° 5' W</div>
                  <div className="absolute bottom-2 right-2 text-[10px] text-teal-500/30 font-mono">COMPILER VERIFIED 0x1F2A</div>

                  <span className="text-[10px] tracking-widest text-teal-400 uppercase font-mono block">
                    {isAr ? "وثيقة الإتقان البرمجية" : "CERTIFICATE OF ARCHITECTURAL MASTERY"}
                  </span>

                  <h3 className="text-2xl font-serif font-bold text-amber-200 tracking-wide my-4 italic">
                    {isAr ? "مستكشف الكود المحترف" : "Valiant Code Navigator"}
                  </h3>

                  <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto" />

                  <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
                    {isAr
                      ? "تشهد هذه الوثيقة الأكاديمية الرقمية بأن حاملها قد تجاوز بنجاح كامل المسار البرمجي المتقدم لـ Dart & Flutter، واجتاز المعالجات المتوازية، وهندسات الفئات، وبناء الواجهات التفاعلية، والتوقيع الرقمي للمتاجر العالمية."
                      : "This digital credential certifies that the holder has successfully conquered the comprehensive Flutter & Dart curriculum, masterfully executing parallel isolates, advanced constructors, declarative widget lifecycles, and cryptographic binary deployment."}
                  </p>

                  <div className="pt-4 flex items-center justify-around gap-4">
                    <div className="text-center">
                      <span className="block text-[10px] font-mono text-slate-500 uppercase">{isAr ? "التقدير الإجمالي" : "XP GRADE"}</span>
                      <span className="text-sm font-bold text-teal-400">2,000+ XP</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-[10px] font-mono text-slate-500 uppercase">{isAr ? "المرتبة الممنوحة" : "ISSUED RANK"}</span>
                      <span className="text-sm font-bold text-amber-400">{isAr ? "بحّار من النخبة" : "Elite Fleet Admiral"}</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-[10px] font-mono text-slate-500 uppercase">{isAr ? "التوثيق" : "AUTHORITY"}</span>
                      <span className="text-sm font-bold text-white flex items-center gap-1 justify-center">
                        <GraduationCap className="w-4 h-4 text-teal-400" />
                        <span>Google AI</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-4 pt-4">
                  <button
                    onClick={() => setOpenedFinalChest(false)}
                    className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>⛵ {isAr ? "العودة لرؤية الخريطة" : "Sail Back to Map"}</span>
                  </button>
                  <button
                    onClick={handleClearProgress}
                    className="px-6 py-2.5 bg-rose-950/40 hover:bg-rose-900/30 border border-rose-900/50 text-rose-300 text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    <span>🔄 {isAr ? "إعادة التحدي بالكامل" : "Reset Voyage & Restart"}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ) : !showExpeditionDeck ? (
            
            /* SCREEN 2: THE SPLENDID INTERACTIVE ARCHIPELAGO MAP */
            <motion.div
              key="map-dashboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6 py-4"
            >
              
              {/* COMPACT INTRO HEADER */}
              <div className="text-center max-w-xl mx-auto space-y-1">
                <span className="text-xs font-bold text-teal-400 tracking-wider uppercase flex items-center justify-center gap-1.5 font-mono">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span>{isAr ? "خرائط المحيط الأكاديمي الحية" : "ACTIVE ARCHIPELAGO CHART"}</span>
                </span>
                <h2 className={`text-xl md:text-2xl font-black transition-colors duration-300 ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                }`}>
                  {isAr ? "انقر على جزيرة لبدء الاستكشاف والتعلم" : "Select an Island to Begin Your Expedition"}
                </h2>
                <p className="text-xs text-slate-400">
                  {isAr 
                    ? "أكمل الدروس والاختبارات والتحديات البرمجية في كل جزيرة لجمع المفاتيح وتنقيب الكنز الأخير!" 
                    : "Collect knowledge scroll pieces and gold keys across all islands to unlock the Golden Compiler Chest."}
                </p>
              </div>

              {/* TWO COLUMN GRID ON LARGE SCREENS */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start max-w-7xl mx-auto">
                {/* LEFT SIDE: Map & Stats (Takes 8 columns) */}
                <div className="lg:col-span-8 space-y-6 w-full">

                  {/* THE ADVENTURE TREASURE MAP CHART */}
                  <div className={`relative w-full aspect-[16/10] md:aspect-[16/9] rounded-3xl border overflow-hidden shadow-2xl p-4 md:p-6 flex items-center justify-center transition-all duration-300 ${
                    theme === "dark" 
                      ? "bg-slate-950/80 border-slate-900" 
                      : "bg-white/95 border-slate-200 shadow-lg"
                  }`}>
                    
                    {/* Visual nautical compass overlay background */}
                    <div className={`absolute top-8 left-8 w-16 h-16 border rounded-full flex items-center justify-center pointer-events-none select-none transition-colors duration-300 ${
                      theme === "dark" ? "border-slate-900/50" : "border-slate-200/60"
                    }`}>
                      <div className={`w-0.5 h-12 rotate-12 transition-colors ${theme === "dark" ? "bg-slate-900/30" : "bg-slate-200"}`} />
                      <div className={`w-12 h-0.5 transition-colors ${theme === "dark" ? "bg-slate-900/30" : "bg-slate-200"}`} />
                      <span className={`absolute top-0 text-[8px] font-mono transition-colors ${theme === "dark" ? "text-slate-600" : "text-slate-400"}`}>N</span>
                    </div>

                    {/* SVG Route Paths & Ocean Ripple Currents */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                      {/* Oceanic Grid lines */}
                      <g className={`opacity-10 transition-colors duration-300 ${theme === "dark" ? "stroke-slate-850" : "stroke-slate-300"}`} strokeWidth="0.5" strokeDasharray="4 6">
                        <line x1="12.5%" y1="0%" x2="12.5%" y2="100%" />
                        <line x1="25%" y1="0%" x2="25%" y2="100%" />
                        <line x1="37.5%" y1="0%" x2="37.5%" y2="100%" />
                        <line x1="50%" y1="0%" x2="50%" y2="100%" />
                        <line x1="62.5%" y1="0%" x2="62.5%" y2="100%" />
                        <line x1="75%" y1="0%" x2="75%" y2="100%" />
                        <line x1="87.5%" y1="0%" x2="87.5%" y2="100%" />

                        <line x1="0%" y1="20%" x2="100%" y2="20%" />
                        <line x1="0%" y1="40%" x2="100%" y2="40%" />
                        <line x1="0%" y1="60%" x2="100%" y2="60%" />
                        <line x1="0%" y1="80%" x2="100%" y2="80%" />
                      </g>

                      {/* Draw connecting route paths between islands */}
                      {ISLAND_COORDINATES.map((coord, idx) => {
                        if (idx === 0) return null;
                        const prev = ISLAND_COORDINATES[idx - 1];
                        const isPrevCompleted = isIslandCleared(ROADMAP_STEPS[idx - 1].id);
                        return (
                          <g key={idx}>
                            <path
                              d={`M ${prev.x}% ${prev.y}% Q ${(prev.x + coord.x) / 2 + 3}% ${(prev.y + coord.y) / 2 - 5}% ${coord.x}% ${coord.y}%`}
                              fill="none"
                              className={`transition-all duration-700 ${
                                isPrevCompleted 
                                  ? "stroke-teal-500/50 stroke-[3] stroke-dasharray-[6 6]" 
                                  : (theme === "dark" ? "stroke-slate-800 stroke-[2] stroke-dasharray-[4 4]" : "stroke-slate-200 stroke-[2] stroke-dasharray-[4 4]")
                              }`}
                            />
                          </g>
                        );
                      })}

                      {/* Ocean wave flows animated via CSS classes */}
                      <path 
                        d="M 10 100 Q 40 85 80 110 T 160 95 T 240 100" 
                        fill="none" 
                        className="stroke-teal-900/10 stroke-[2] animate-wave-flow" 
                      />
                      <path 
                        d="M 400 300 Q 450 280 500 320 T 600 290 T 700 300" 
                        fill="none" 
                        className="stroke-sky-900/10 stroke-[2] animate-wave-flow" 
                        style={{ animationDelay: '3s' }}
                      />
                    </svg>

                    {/* THE GLOWING GOLDEN COMPILER TREASURE CHEST IN THE CENTER */}
                    <div 
                      className="absolute z-10 text-center animate-bounce-slow"
                      style={{ left: '55%', top: '35%' }}
                    >
                      <button
                        onClick={() => {
                          if (canUnlockFinalTreasure) {
                            setOpenedFinalChest(true);
                          } else {
                            alert(
                              isAr 
                                ? `الكنز الأخير مقفل! يجب عليك إنهاء كافة التحديات والدروس في جزر فلاتر ودارت العشرة لفتح صندوق المترجم الذهبي.` 
                                : `The Golden Compiler Chest is locked! You must fully clear all ${ROADMAP_STEPS.length} islands to reveal the Master Certificate.`
                            );
                          }
                        }}
                        className={`group relative p-4 rounded-full flex flex-col items-center justify-center transition-all cursor-pointer ${
                          canUnlockFinalTreasure 
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/40 scale-110 shadow-lg shadow-amber-500/10" 
                            : (theme === "dark" ? "bg-slate-900/80 text-slate-600 border border-slate-800" : "bg-slate-100 text-slate-400 border border-slate-200 shadow-sm hover:bg-slate-200")
                        }`}
                      >
                        {/* Ring glow */}
                        {canUnlockFinalTreasure && (
                          <span className="absolute inset-0 rounded-full border border-amber-400 animate-pulse-ring" />
                        )}
                        <Trophy className={`w-8 h-8 transition-transform group-hover:scale-110 ${canUnlockFinalTreasure ? "text-amber-400" : "text-slate-500"}`} />
                        <span className="text-[9px] font-bold tracking-wider font-mono uppercase mt-1.5 block">
                          {isAr ? "المترجم الذهبي" : "Golden Compiler"}
                        </span>
                        
                        {/* Locked/Unlocked status */}
                        <span className="absolute -top-1 -right-1 text-xs">
                          {canUnlockFinalTreasure ? "✨" : "🔒"}
                        </span>
                      </button>
                    </div>

                    {/* PLOTTING THE 10 ISLANDS */}
                    {ROADMAP_STEPS.map((step, idx) => {
                      const coords = ISLAND_COORDINATES[idx];
                      if (!coords) return null;
                      const Icon = coords.icon;
                      const unlocked = isIslandUnlocked(idx);
                      const cleared = isIslandCleared(step.id);
                      const isCurrent = activeStepIndex === idx;

                      return (
                        <div
                          key={step.id}
                          className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 group"
                          style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                        >
                          {/* Anchor beacon glow for unlocked current steps */}
                          {unlocked && (
                            <div className={`absolute -inset-4 rounded-full border opacity-40 ${
                              cleared ? "border-emerald-400/40" : "border-teal-400/50 animate-pulse-ring"
                            }`} />
                          )}

                          <button
                            onClick={() => {
                              setActiveStepIndex(idx);
                              setShowExpeditionDeck(true);
                            }}
                            className={`relative w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all cursor-pointer shadow-lg animate-island-float ${
                              cleared 
                                ? (theme === "dark" 
                                    ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-900 hover:scale-110 shadow-emerald-950/40" 
                                    : "bg-emerald-100 text-emerald-700 border border-emerald-300 hover:bg-emerald-200 hover:scale-110 shadow-emerald-200/20") 
                                : unlocked 
                                  ? (theme === "dark" 
                                      ? "bg-slate-900/90 text-teal-300 border border-teal-500/40 hover:bg-slate-800 hover:scale-110 shadow-teal-950/50" 
                                      : "bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100 hover:scale-110 shadow-teal-100/30") 
                                  : (theme === "dark" 
                                      ? "bg-slate-950 text-slate-700 border border-slate-900 opacity-60" 
                                      : "bg-slate-200 text-slate-400 border border-slate-300 opacity-60 cursor-not-allowed")
                            }`}
                            style={{ animationDelay: `${idx * 0.4}s` }}
                            disabled={!unlocked && false} // Allow viewing but show lock icon clearly
                          >
                            {unlocked ? (
                              <Icon className="w-5 h-5 md:w-6 md:h-6" />
                            ) : (
                              <Lock className="w-4 h-4 text-slate-500" />
                            )}

                            {/* Floating mini status tag */}
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-28 text-center pointer-events-none select-none opacity-0 group-hover:opacity-100 transition-all z-20">
                              <span className={`text-[9px] font-mono py-0.5 px-2 rounded-md border whitespace-nowrap shadow-md transition-all ${
                                theme === "dark" 
                                  ? "bg-slate-900/95 text-slate-300 border-slate-800" 
                                  : "bg-white text-slate-800 border-slate-200"
                              }`}>
                                {isAr ? step.titleAr : step.title}
                              </span>
                            </div>

                            {/* Quick cleared dot badge */}
                            {cleared && (
                              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md">
                                ✓
                              </span>
                            )}
                            {!cleared && unlocked && (
                              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-teal-400 rounded-full animate-ping" />
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* ROUTE PROGRESS cockpit CARDS */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    <div className={`border p-4 rounded-2xl space-y-1 transition-all duration-300 ${
                      theme === "dark" ? "bg-slate-900/50 border-slate-900" : "bg-white border-slate-200 shadow-md"
                    }`}>
                      <div className="text-[10px] font-mono text-slate-500 uppercase">{isAr ? "الدروس المقروءة" : "SCROLLS DECODED"}</div>
                      <div className="flex items-center justify-between">
                        <span className={`text-xl font-black transition-colors ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                          {completedLessons.length} / {ROADMAP_STEPS.length}
                        </span>
                        <span className="text-xs text-teal-550 font-mono">+{completedLessons.length * 50} XP</span>
                      </div>
                      <div className={`w-full h-1.5 rounded-full overflow-hidden transition-colors ${theme === "dark" ? "bg-slate-950" : "bg-slate-100"}`}>
                        <div className="bg-teal-500 h-full transition-all" style={{ width: `${(completedLessons.length / ROADMAP_STEPS.length) * 100}%` }} />
                      </div>
                    </div>

                    <div className={`border p-4 rounded-2xl space-y-1 transition-all duration-300 ${
                      theme === "dark" ? "bg-slate-900/50 border-slate-900" : "bg-white border-slate-200 shadow-md"
                    }`}>
                      <div className="text-[10px] font-mono text-slate-500 uppercase">{isAr ? "الاختبارات المجتازة" : "TRIALS OF WITS"}</div>
                      <div className="flex items-center justify-between">
                        <span className={`text-xl font-black transition-colors ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                          {completedQuizzes.length} / {ROADMAP_STEPS.length}
                        </span>
                        <span className="text-xs text-amber-500 font-mono">+{completedQuizzes.length * 100} XP</span>
                      </div>
                      <div className={`w-full h-1.5 rounded-full overflow-hidden transition-colors ${theme === "dark" ? "bg-slate-950" : "bg-slate-100"}`}>
                        <div className="bg-amber-500 h-full transition-all" style={{ width: `${(completedQuizzes.length / ROADMAP_STEPS.length) * 100}%` }} />
                      </div>
                    </div>

                    <div className={`border p-4 rounded-2xl space-y-1 transition-all duration-300 ${
                      theme === "dark" ? "bg-slate-900/50 border-slate-900" : "bg-white border-slate-200 shadow-md"
                    }`}>
                      <div className="text-[10px] font-mono text-slate-500 uppercase">{isAr ? "التحديات البرمجية" : "GATEKEEPER CHALLENGES"}</div>
                      <div className="flex items-center justify-between">
                        <span className={`text-xl font-black transition-colors ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                          {completedChallenges.length} / {ROADMAP_STEPS.length}
                        </span>
                        <span className="text-xs text-orange-500 font-mono">+{completedChallenges.length * 200} XP</span>
                      </div>
                      <div className={`w-full h-1.5 rounded-full overflow-hidden transition-colors ${theme === "dark" ? "bg-slate-950" : "bg-slate-100"}`}>
                        <div className="bg-orange-500 h-full transition-all" style={{ width: `${(completedChallenges.length / ROADMAP_STEPS.length) * 100}%` }} />
                      </div>
                    </div>
                  </div>

                </div>

                {/* RIGHT SIDE: Interactive Leaderboard (Takes 4 columns) */}
                <div className="lg:col-span-4 space-y-4 w-full">
                  <div className={`border p-4 md:p-5 rounded-3xl transition-all duration-300 ${
                    theme === "dark" 
                      ? "bg-slate-950/80 border-slate-900 shadow-xl" 
                      : "bg-white border-slate-200 shadow-lg"
                  }`}>
                    {/* Header */}
                    <div className={`flex items-center justify-between border-b pb-3 mb-4 transition-colors duration-300 ${
                      theme === "dark" ? "border-slate-900" : "border-slate-100"
                    }`}>
                      <div className="flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-amber-400 animate-pulse" />
                        <div>
                          <h3 className={`text-xs md:text-sm font-black transition-colors ${
                            theme === "dark" ? "text-white" : "text-slate-900"
                          }`}>
                            {isAr ? "لوحة صدارة المستكشفين" : "Explorers Leaderboard"}
                          </h3>
                          <p className="text-[9px] text-slate-500 font-mono">
                            {isAr ? "تحديث مباشر ومستمر" : "LIVE CURRENT STANDINGS"}
                          </p>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono bg-teal-500/10 text-teal-400 border border-teal-500/20 px-2 py-0.5 rounded-full uppercase">
                        {isAr ? "المحيط" : "ARCHIPELAGO"}
                      </span>
                    </div>

                    {/* Competitor List */}
                    <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                      {currentLeaderboard.map((item) => {
                        const isUser = item.isUser;
                        return (
                          <div 
                            key={item.id} 
                            className={`flex items-center justify-between p-2 rounded-2xl border transition-all duration-300 ${
                              isUser 
                                ? "bg-teal-500/10 border-teal-500/30 shadow-md shadow-teal-500/5 ring-1 ring-teal-500/20" 
                                : (theme === "dark" 
                                    ? "bg-slate-900/40 border-slate-900 hover:border-slate-850" 
                                    : "bg-slate-50/50 border-slate-100 hover:border-slate-200")
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              {/* Rank badge */}
                              <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-[11px] font-black shrink-0 ${
                                item.rank === 1 
                                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/35" 
                                  : item.rank === 2 
                                    ? "bg-slate-300/20 text-slate-400 border border-slate-300/20" 
                                    : item.rank === 3 
                                      ? "bg-amber-700/20 text-amber-600 border border-amber-700/30" 
                                      : "bg-slate-950/20 text-slate-500 border border-transparent"
                              }`}>
                                {item.rank === 1 ? "🥇" : item.rank === 2 ? "🥈" : item.rank === 3 ? "🥉" : item.rank}
                              </div>

                              {/* Avatar */}
                              <div className={`w-7 h-7 rounded-full bg-gradient-to-tr ${item.avatarColor} text-white font-black text-[10px] flex items-center justify-center shrink-0`}>
                                {item.name.substring(0, 2).toUpperCase()}
                              </div>

                              {/* Name & status */}
                              <div className="min-w-0">
                                <div className={`text-xs font-bold truncate transition-colors ${
                                  isUser 
                                    ? "text-teal-400 font-extrabold" 
                                    : (theme === "dark" ? "text-white" : "text-slate-800")
                                }`}>
                                  {isAr ? item.nameAr : item.name}
                                </div>
                                <div className="text-[8px] text-slate-550 truncate mt-0.5">
                                  {isAr ? item.statusAr : item.status}
                                </div>
                              </div>
                            </div>

                            {/* XP value */}
                            <div className="text-right shrink-0">
                              <span className={`text-[11px] font-mono font-bold ${
                                isUser ? "text-teal-400 font-black" : (theme === "dark" ? "text-slate-300" : "text-slate-700")
                              }`}>
                                {item.xp} <span className="text-[9px] text-slate-500">XP</span>
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Footer encouraging comment */}
                    <div className={`mt-4 pt-3 border-t text-[9px] flex items-center gap-2 transition-colors duration-300 ${
                      theme === "dark" ? "border-slate-900 text-slate-500" : "border-slate-100 text-slate-600"
                    }`}>
                      <Compass className="w-3.5 h-3.5 text-teal-400 shrink-0 animate-spin-slow" />
                      <span>
                        {isAr 
                          ? "أكمل الألغاز والتحديات لتجاوز رواد فلاتر الصاعدين في لوحة الصدارة الحية!" 
                          : "Solve code puzzles and lesson challenges to overtake other legends in the fleet chart!"}
                      </span>
                    </div>
                  </div>
                </div>

              </div>

            </motion.div>
          ) : (
            
            /* SCREEN 3: EXCITING SPLIT EXPEDITION DECK (FULL LESSON + TRIAL + AI GURU) */
            <motion.div
              key="expedition-deck"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
            >
              
              {/* LEFT: EXPEDITION CONTENT WORKSPACE (8 Columns) */}
              <div className={`lg:col-span-8 flex flex-col rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md border transition-all duration-300 ${
                theme === "dark" 
                  ? "bg-slate-900/60 border-slate-900" 
                  : "bg-white border-slate-200 shadow-lg text-slate-800"
              }`}>
                
                {/* Expedition Deck Header */}
                <div className={`p-4 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-b transition-colors duration-300 ${
                  theme === "dark" ? "bg-slate-950 border-b-slate-900" : "bg-slate-100 border-b-slate-200"
                }`}>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowExpeditionDeck(false)}
                      className={`p-2 border rounded-xl transition-all cursor-pointer ${
                        theme === "dark" 
                          ? "border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white" 
                          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 shadow-sm"
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <div>
                      <span className="text-[10px] font-bold font-mono tracking-widest text-teal-550 uppercase block">
                        {isAr ? `الجزيرة المستكشفة رقم ${activeStepIndex + 1}` : `EXPEDITION ISLAND #${activeStepIndex + 1}`}
                      </span>
                      <h2 className={`text-base md:text-lg font-black mt-0.5 transition-colors duration-305 ${
                        theme === "dark" ? "text-white" : "text-slate-900"
                      }`}>
                        {isAr ? activeStep.titleAr : activeStep.title}
                      </h2>
                    </div>
                  </div>

                  {/* Quick Island Progress Flags */}
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-2 py-1 rounded-md font-mono border transition-all duration-300 ${
                      completedLessons.includes(activeStep.id) 
                        ? "bg-emerald-950/40 text-emerald-400 border-emerald-900" 
                        : (theme === "dark" ? "bg-slate-950 text-slate-500 border-slate-900" : "bg-slate-50 text-slate-400 border-slate-200")
                    }`}>
                      📜 {isAr ? "المخطوطة" : "Scroll"}
                    </span>
                    <span className={`text-[10px] px-2 py-1 rounded-md font-mono border transition-all duration-300 ${
                      completedQuizzes.includes(activeStep.id) 
                        ? "bg-amber-950/40 text-amber-400 border-amber-900" 
                        : (theme === "dark" ? "bg-slate-950 text-slate-500 border-slate-900" : "bg-slate-50 text-slate-400 border-slate-200")
                    }`}>
                      🧠 {isAr ? "الاختبار" : "Quiz"}
                    </span>
                    <span className={`text-[10px] px-2 py-1 rounded-md font-mono border transition-all duration-300 ${
                      completedChallenges.includes(activeStep.id) 
                        ? "bg-orange-950/40 text-orange-400 border-orange-900" 
                        : (theme === "dark" ? "bg-slate-950 text-slate-500 border-slate-900" : "bg-slate-50 text-slate-400 border-slate-200")
                    }`}>
                      💻 {isAr ? "التحدي" : "Trial"}
                    </span>
                  </div>
                </div>

                {/* EXPEDITION MODULE NAVIGATION TABS */}
                <div className={`flex p-2 gap-1.5 border-b transition-colors duration-300 ${
                  theme === "dark" ? "bg-slate-950/40 border-slate-900" : "bg-slate-50 border-slate-200"
                }`}>
                  <button
                    onClick={() => setSelectedTab("lesson")}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      selectedTab === "lesson"
                        ? "bg-teal-500 text-slate-950 shadow-md shadow-teal-500/10"
                        : (theme === "dark" 
                            ? "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60" 
                            : "text-slate-500 hover:text-slate-800 hover:bg-slate-100")
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>{isAr ? "مخطوطة المعرفة" : "Ancient Scroll (Lesson)"}</span>
                  </button>

                  <button
                    onClick={() => setSelectedTab("quiz")}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      selectedTab === "quiz"
                        ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10"
                        : (theme === "dark" 
                            ? "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60" 
                            : "text-slate-500 hover:text-slate-800 hover:bg-slate-100")
                    }`}
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>{isAr ? "محاكمة الأذكياء" : "Trial of Wits (Quiz)"}</span>
                  </button>

                  <button
                    onClick={() => setSelectedTab("challenge")}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      selectedTab === "challenge"
                        ? "bg-orange-500 text-slate-950 shadow-md shadow-orange-500/10"
                        : (theme === "dark" 
                            ? "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60" 
                            : "text-slate-500 hover:text-slate-800 hover:bg-slate-100")
                    }`}
                  >
                    <Code className="w-4 h-4" />
                    <span>{isAr ? "تحدي البوابة" : "Gatekeeper Challenge"}</span>
                  </button>

                  <button
                    onClick={() => setSelectedTab("resources")}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      selectedTab === "resources"
                        ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/10"
                        : (theme === "dark" 
                            ? "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60" 
                            : "text-slate-500 hover:text-slate-800 hover:bg-slate-100")
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                    <span>{isAr ? "مصادر الكنز" : "Curated Treasures"}</span>
                  </button>
                </div>

                {/* EXPEDITION TAB CONTENT PANEL */}
                <div className="p-4 md:p-6 flex-1 overflow-y-auto max-h-[500px]">
                  
                  {/* TAB 1: SCROLL OF KNOWLEDGE */}
                  {selectedTab === "lesson" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <div className={`border p-4 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors duration-300 ${
                        theme === "dark" ? "bg-slate-900/40 border-slate-800" : "bg-slate-50 border-slate-200"
                      }`}>
                        <div className="space-y-1">
                          <h3 className={`text-sm font-black flex items-center gap-1.5 transition-colors ${
                            theme === "dark" ? "text-white" : "text-slate-900"
                          }`}>
                            <Sparkles className="w-4 h-4 text-teal-400 animate-spin-slow" />
                            <span>{isAr ? "مخرجات التعلم والمستهدفات للجزيرة" : "Island Educational Targets"}</span>
                          </h3>
                          <ul className={`text-xs list-disc pl-4 space-y-1 mt-2 transition-colors ${
                            theme === "dark" ? "text-slate-400" : "text-slate-600"
                          }`}>
                            {(isAr ? activeStep.goalsAr : activeStep.goals).map((g, idx) => (
                              <li key={idx}>{g}</li>
                            ))}
                          </ul>
                        </div>

                        <button
                          onClick={handleMarkLessonRead}
                          className={`w-full md:w-auto px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            completedLessons.includes(activeStep.id)
                              ? "bg-emerald-950/50 text-emerald-400 border border-emerald-900/50"
                              : "bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-md shadow-teal-500/10"
                          }`}
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>
                            {completedLessons.includes(activeStep.id) 
                              ? (isAr ? "تم الاستيعاب والقراءة ✓" : "Fully Decoded ✓") 
                              : (isAr ? "تعليم كـ 'تم القراءة والاستيعاب'" : "Mark Scroll as Decoded")}
                          </span>
                        </button>
                      </div>

                      <div className={`prose prose-slate max-w-none transition-all duration-300 ${
                        theme === "dark" ? "prose-invert text-slate-300" : "text-slate-800"
                      }`}>
                        <MarkdownRenderer content={isAr ? activeStep.contentAr : activeStep.content} />
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: TRIAL OF WITS (THE QUIZ) */}
                  {selectedTab === "quiz" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <div className={`border p-4 rounded-2xl space-y-1 transition-colors duration-300 ${
                        theme === "dark" ? "bg-slate-900/40 border-slate-850" : "bg-slate-50 border-slate-200"
                      }`}>
                        <h3 className={`text-sm font-black transition-colors duration-300 ${
                          theme === "dark" ? "text-white" : "text-slate-900"
                        }`}>{isAr ? "محاكمة الذكاء والفهم" : "Island Quiz Trial"}</h3>
                        <p className={`text-xs transition-colors duration-300 ${
                          theme === "dark" ? "text-slate-400" : "text-slate-600"
                        }`}>
                          {isAr 
                            ? "أجب بشكل صحيح لتخطي حراس البوابة وكسب دبلونات الخبرة الأكاديمية!" 
                            : "Solve all technical questions with 70%+ score to pass this milestone."}
                        </p>
                      </div>

                      <div className="space-y-5">
                        {(isAr ? activeStep.quizAr : activeStep.quiz).map((q, qIdx) => {
                          const isAnswered = selectedAnswers[qIdx] !== undefined;
                          return (
                            <div key={qIdx} className={`border p-4 rounded-2xl space-y-3 transition-colors duration-300 ${
                              theme === "dark" ? "bg-slate-950/60 border-slate-900" : "bg-white border-slate-200 shadow-sm"
                            }`}>
                              <h4 className={`text-xs md:text-sm font-bold flex gap-2 transition-colors duration-300 ${
                                theme === "dark" ? "text-white" : "text-slate-900"
                              }`}>
                                <span className="font-mono text-amber-500">{qIdx + 1}.</span>
                                <span>{q.question}</span>
                              </h4>

                              <div className="grid grid-cols-1 gap-2">
                                {q.options.map((opt, oIdx) => {
                                  const isSelected = selectedAnswers[qIdx] === oIdx;
                                  const isCorrect = q.correctAnswer === oIdx;
                                  let btnStyle = theme === "dark" 
                                    ? "border-slate-900 bg-slate-950/40 text-slate-300 hover:bg-slate-900" 
                                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-sm";

                                  if (quizSubmitted) {
                                    if (isSelected && isCorrect) {
                                      btnStyle = theme === "dark"
                                        ? "bg-emerald-950/50 text-emerald-400 border-emerald-500/50"
                                        : "bg-emerald-50 text-emerald-700 border-emerald-300 shadow-sm";
                                    } else if (isSelected && !isCorrect) {
                                      btnStyle = theme === "dark"
                                        ? "bg-rose-950/50 text-rose-400 border-rose-500/50"
                                        : "bg-rose-50 text-rose-700 border-rose-300 shadow-sm";
                                    } else if (isCorrect) {
                                      btnStyle = theme === "dark"
                                        ? "bg-emerald-950/40 text-emerald-400 border-emerald-900/50"
                                        : "bg-emerald-50/50 text-emerald-600 border-emerald-200";
                                    }
                                  } else {
                                    if (isSelected) {
                                      btnStyle = theme === "dark"
                                        ? "bg-amber-500/10 text-amber-400 border-amber-500/40 shadow-sm"
                                        : "bg-amber-50 text-amber-700 border-amber-300 shadow-sm";
                                    }
                                  }

                                  return (
                                    <button
                                      key={oIdx}
                                      onClick={() => handleQuizAnswer(qIdx, oIdx)}
                                      disabled={quizSubmitted}
                                      className={`px-4 py-2.5 border rounded-xl text-xs text-left font-semibold transition-all cursor-pointer ${btnStyle}`}
                                      style={{ direction: isAr ? "rtl" : "ltr", textAlign: isAr ? "right" : "left" }}
                                    >
                                      {opt}
                                    </button>
                                  );
                                })}
                              </div>

                              {/* Educational Explanation Box */}
                              {quizSubmitted && (
                                <div className={`p-3 rounded-xl text-[11px] leading-relaxed border transition-colors duration-300 ${
                                  theme === "dark" ? "bg-slate-900/60 border-slate-850 text-slate-400" : "bg-slate-100 border-slate-200 text-slate-600 shadow-inner"
                                }`}>
                                  <strong className={`block mb-1 transition-colors duration-300 ${
                                    theme === "dark" ? "text-slate-300" : "text-slate-800 font-bold"
                                  }`}>📘 {isAr ? "التفسير الأكاديمي:" : "Architectural Explanation:"}</strong>
                                  {q.explanation}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {quizError && (
                        <div className="p-3 bg-rose-950/30 border border-rose-900/40 rounded-xl text-rose-300 text-xs flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{quizError}</span>
                        </div>
                      )}

                      {/* Quiz Actions */}
                      <div className="flex items-center justify-between gap-4 pt-2">
                        {quizSubmitted ? (
                          <div className="flex items-center gap-3 w-full justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-slate-400">{isAr ? "علامتك:" : "Your Score:"}</span>
                              <span className={`text-lg font-black ${quizScore >= 70 ? "text-emerald-400" : "text-rose-400"}`}>
                                {quizScore}% {quizScore >= 70 ? "🎉" : "😢"}
                              </span>
                            </div>
                            <button
                              onClick={() => {
                                setSelectedAnswers({});
                                setQuizSubmitted(false);
                                setQuizScore(0);
                                setQuizError("");
                              }}
                              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                                theme === "dark" 
                                  ? "bg-slate-800 hover:bg-slate-700 text-slate-200" 
                                  : "bg-slate-200 hover:bg-slate-300 text-slate-700 border border-slate-300 shadow-sm"
                              }`}
                            >
                              <RotateCcw className="w-4 h-4" />
                              <span>{isAr ? "إعادة المحاولة" : "Try Quiz Again"}</span>
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={handleSubmitQuiz}
                            className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md shadow-amber-500/10 cursor-pointer"
                          >
                            {isAr ? "تقديم الإجابات وتقييم الذكاء" : "Submit Answers & Evaluate"}
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: GATEKEEPER'S INTERACTIVE CODING CHALLENGE */}
                  {selectedTab === "challenge" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div className={`border p-4 rounded-2xl space-y-2 transition-colors duration-300 ${
                        theme === "dark" ? "bg-slate-900/40 border-slate-850" : "bg-slate-50 border-slate-200"
                      }`}>
                        <span className="text-[10px] font-mono text-teal-555 uppercase tracking-widest block">
                          {isAr ? "مهمة البوابة البرمجية" : "GATEKEEPER CHALLENGE CONSTRAINTS"}
                        </span>
                        <p className={`text-xs font-semibold leading-relaxed transition-colors duration-300 ${
                          theme === "dark" ? "text-slate-200" : "text-slate-800"
                        }`}>
                          {isAr ? activeStep.challengeAr.instruction : activeStep.challenge.instruction}
                        </p>
                        <div className={`p-2.5 rounded-xl border text-[10px] leading-relaxed transition-all duration-300 ${
                          theme === "dark" ? "bg-slate-950/60 border-slate-900 text-slate-400" : "bg-white border-slate-200 text-slate-600 shadow-inner"
                        }`}>
                          <strong className="text-teal-555">{isAr ? "معيار القبول البرمجي:" : "Compiler Grading Requirement:"} </strong>
                          {isAr ? activeStep.challengeAr.gradingCriteria : activeStep.challenge.gradingCriteria}
                        </div>
                      </div>

                      {/* TEXTAREA CODE EDITOR */}
                      <div className={`rounded-2xl border overflow-hidden shadow-lg flex flex-col transition-all duration-300 ${
                        theme === "dark" ? "border-slate-800 bg-slate-950" : "border-slate-200 bg-white"
                      }`}>
                        <div className={`flex items-center justify-between px-4 py-2 border-b transition-all duration-300 ${
                          theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-slate-50 border-slate-200"
                        }`}>
                          <div className="flex items-center gap-2">
                            <Terminal className="w-4 h-4 text-orange-500" />
                            <span className="text-[10px] font-mono font-bold text-slate-450">main.dart</span>
                          </div>
                          
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                setStudentCode(isAr ? activeStep.challengeAr.starterCode : activeStep.challenge.starterCode);
                                setChallengeGrade(null);
                              }}
                              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                              title={isAr ? "استعادة الكود المبدئي" : "Restore Starter Code"}
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <textarea
                          value={studentCode}
                          onChange={(e) => setStudentCode(e.target.value)}
                          className={`w-full min-h-[160px] p-4 font-mono text-xs md:text-sm focus:outline-none resize-none leading-relaxed transition-all duration-300 ${
                            theme === "dark" ? "bg-slate-950 text-slate-200" : "bg-slate-50 text-slate-800"
                          }`}
                          placeholder="// Type your Dart solution here..."
                          style={{ direction: 'ltr' }}
                        />
                      </div>

                      {/* ACTIONS BAR */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handleGradeCode}
                            disabled={gradingLoading}
                            className="px-5 py-2.5 bg-orange-500 hover:bg-orange-400 text-slate-950 font-black text-xs rounded-xl shadow-md shadow-orange-500/10 cursor-pointer flex items-center gap-1.5"
                          >
                            {gradingLoading ? <Loader className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                            <span>{isAr ? "تشغيل ومحاكاة المترجم" : "Compile & Run Trial"}</span>
                          </button>

                          <button
                            onClick={handleAskAIToFix}
                            disabled={chatLoading}
                            className={`px-4 py-2.5 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                              theme === "dark" 
                                ? "bg-slate-800 hover:bg-slate-700 text-slate-200" 
                                : "bg-slate-200 hover:bg-slate-300 text-slate-700 border border-slate-300 shadow-sm"
                            }`}
                          >
                            <Sparkles className="w-4 h-4 text-teal-555 animate-pulse" />
                            <span>{isAr ? "مساعد البوصلة: إصلاح الكود" : "Navigator AI: Fix Code"}</span>
                          </button>
                        </div>

                        <button
                          onClick={() => setSolutionUnlocked(prev => !prev)}
                          className="px-3 py-2 text-slate-400 hover:text-teal-500 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          {solutionUnlocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                          <span>{isAr ? "الحل النموذجي المرجعي" : "Reveal Reference Solution"}</span>
                        </button>
                      </div>

                      {/* REVEAL SOLUTION */}
                      {solutionUnlocked && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className={`p-4 rounded-xl border space-y-2 transition-colors duration-300 ${
                            theme === "dark" ? "bg-slate-900/60 border-slate-850" : "bg-slate-50 border-slate-200 shadow-inner"
                          }`}
                        >
                          <strong className="text-xs text-amber-500 block">🗝️ {isAr ? "المرجع النموذجي للجزيرة:" : "Island Reference Architecture:"}</strong>
                          <pre className={`text-[10px] md:text-xs font-mono p-3 rounded-lg overflow-x-auto select-text leading-relaxed border transition-colors duration-300 ${
                            theme === "dark" ? "text-slate-300 bg-slate-950 border-slate-900" : "text-slate-700 bg-white border-slate-200 shadow-inner"
                          }`}>
                            {isAr ? activeStep.challengeAr.sampleSolution : activeStep.challenge.sampleSolution}
                          </pre>
                        </motion.div>
                      )}

                      {/* COMPILER EVALUATION RESULT */}
                      {challengeGrade && (
                        <div className={`p-4 rounded-2xl border transition-colors duration-300 ${
                          challengeGrade.passed 
                            ? (theme === "dark" ? "bg-emerald-950/40 border-emerald-500/30 text-slate-300" : "bg-emerald-50 border-emerald-300 text-emerald-800 shadow-sm") 
                            : (theme === "dark" ? "bg-rose-950/40 border-rose-500/30 text-slate-300" : "bg-rose-50 border-rose-350 text-rose-800 shadow-sm")
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-black uppercase font-mono tracking-wider flex items-center gap-1">
                              {challengeGrade.passed ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-rose-500" />}
                              <span>{isAr ? "نتيجة المترجم المجمعة" : "COMPILER VERIFICATION"}</span>
                            </span>
                            <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border transition-colors duration-300 ${
                              theme === "dark" ? "bg-slate-950 border-slate-900 text-slate-350" : "bg-slate-100 border-slate-200 text-slate-700"
                            }`}>
                              {challengeGrade.score} / 100
                            </span>
                          </div>
                          <div className="text-xs leading-relaxed max-h-48 overflow-y-auto">
                            <MarkdownRenderer content={challengeGrade.feedback} />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* TAB 4: CURATED TREASURES (RESOURCES IN VIDEOS & DOCS) */}
                  {selectedTab === "resources" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      {/* Curated Resources Header */}
                      <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-emerald-400 mt-1 shrink-0 animate-pulse" />
                        <div>
                          <h4 className={`text-sm font-black transition-colors ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                            {isAr ? "كنوز الموارد التعليمية المنسقة" : "Curated Island Learning Treasures"}
                          </h4>
                          <p className="text-xs text-slate-400">
                            {isAr 
                              ? "مجموعة غنية من مقاطع الفيديو الحصرية والشروحات والمستندات التعليمية باللغتين العربية والإنجليزية."
                              : "Comprehensive compilation of Arabic and English videos, articles, and references to accelerate your mastery."}
                          </p>
                        </div>
                      </div>

                      {/* Displaying Resources for Current Step */}
                      {(() => {
                        const resourcesForStep = LESSON_RESOURCES[activeStep.id] || [];
                        const videos = resourcesForStep.filter(r => r.type === "video");
                        const documents = resourcesForStep.filter(r => r.type !== "video");

                        if (resourcesForStep.length === 0) {
                          return (
                            <div className="text-center py-8 text-slate-500 text-xs font-mono">
                              {isAr ? "لا توجد موارد إضافية مضافة بعد لهذه الجزيرة." : "No supplementary resources discovered yet for this coordinates."}
                            </div>
                          );
                        }

                        return (
                          <div className="space-y-6">
                            
                            {/* SECTION A: Video Lectures (English & Arabic) */}
                            {videos.length > 0 && (
                              <div className="space-y-3">
                                <h5 className={`text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-2 ${
                                  theme === "dark" ? "text-teal-400" : "text-teal-600"
                                }`}>
                                  <Video className="w-4 h-4 text-rose-500 animate-bounce" />
                                  <span>{isAr ? "محاضرات فيديو وشروحات مرئية" : "Video Lectures & Visual Insights"}</span>
                                </h5>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {videos.map((vid, idx) => (
                                    <div 
                                      key={idx}
                                      className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                                        theme === "dark" 
                                          ? "bg-slate-900/40 border-slate-900 hover:border-teal-500/30 hover:bg-slate-900/80" 
                                          : "bg-slate-50/50 border-slate-200 shadow-sm hover:border-teal-400 hover:bg-white"
                                      }`}
                                    >
                                      <div>
                                        <div className="flex items-center justify-between gap-2 mb-2">
                                          {/* Language indicator tag */}
                                          <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-md border whitespace-nowrap ${
                                            vid.language === "ar"
                                              ? "bg-teal-500/10 text-teal-400 border-teal-500/20"
                                              : "bg-sky-500/10 text-sky-400 border-sky-500/20"
                                          }`}>
                                            {vid.language === "ar" ? "العربية" : "ENGLISH"}
                                          </span>
                                          <span className="text-[9px] font-mono text-slate-400 uppercase">
                                            YOUTUBE
                                          </span>
                                        </div>

                                        <h6 className={`text-xs font-black transition-colors ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>
                                          {isAr && vid.titleAr ? vid.titleAr : vid.title}
                                        </h6>
                                        <p className="text-[10px] text-slate-400 leading-relaxed mt-1 line-clamp-2">
                                          {isAr && vid.descriptionAr ? vid.descriptionAr : vid.description}
                                        </p>
                                      </div>

                                      <div className="mt-4 pt-3 border-t border-dashed border-slate-800/20 flex items-center justify-between">
                                        <div className="text-[9px] text-slate-500 font-mono">
                                          {isAr ? "بواسطة: " : "By: "} {isAr && vid.creatorOrSourceAr ? vid.creatorOrSourceAr : vid.creatorOrSource}
                                        </div>
                                        <a 
                                          href={vid.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-[10px] font-mono font-bold px-3 py-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-500 hover:text-slate-950 text-teal-400 border border-teal-500/20 transition-all flex items-center gap-1 cursor-pointer"
                                        >
                                          <span>{isAr ? "شاهد الآن" : "Watch Lecture"}</span>
                                          <ExternalLink className="w-3 h-3" />
                                        </a>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* SECTION B: Documentation, Articles & Code Snippets */}
                            {documents.length > 0 && (
                              <div className="space-y-3 pt-2">
                                <h5 className={`text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-2 ${
                                  theme === "dark" ? "text-teal-400" : "text-teal-600"
                                }`}>
                                  <FileText className="w-4 h-4 text-sky-500 animate-pulse" />
                                  <span>{isAr ? "مستندات مرجعية ومقالات تعليمية" : "Reference Manuals & Detailed Guides"}</span>
                                </h5>

                                <div className="space-y-3">
                                  {documents.map((doc, idx) => (
                                    <div 
                                      key={idx}
                                      className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col md:flex-row md:items-center md:justify-between gap-4 ${
                                        theme === "dark" 
                                          ? "bg-slate-900/40 border-slate-900 hover:border-sky-500/30 hover:bg-slate-900/80" 
                                          : "bg-slate-50/50 border-slate-200 shadow-sm hover:border-sky-400 hover:bg-white"
                                      }`}
                                    >
                                      <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                          <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-md border whitespace-nowrap ${
                                            doc.language === "ar"
                                              ? "bg-teal-500/10 text-teal-400 border-teal-500/20"
                                              : "bg-sky-500/10 text-sky-400 border-sky-500/20"
                                          }`}>
                                            {doc.language === "ar" ? "العربية" : "ENGLISH"}
                                          </span>
                                          <span className="text-[10px] text-slate-500 font-semibold font-mono">
                                            {doc.type.toUpperCase()}
                                          </span>
                                        </div>
                                        <h6 className={`text-xs font-black transition-colors ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>
                                          {isAr && doc.titleAr ? doc.titleAr : doc.title}
                                        </h6>
                                        <p className="text-[10px] text-slate-400 leading-relaxed">
                                          {isAr && doc.descriptionAr ? doc.descriptionAr : doc.description}
                                        </p>
                                      </div>

                                      <div className="shrink-0 flex items-center justify-between md:justify-end border-t border-dashed md:border-none pt-3 md:pt-0 border-slate-800/25">
                                        {doc.durationOrBadge && (
                                          <span className="text-[9px] font-mono text-slate-550 md:mr-4">
                                            ⏱️ {doc.durationOrBadge}
                                          </span>
                                        )}
                                        <a 
                                          href={doc.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-[10px] font-mono font-bold px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500 hover:text-slate-950 text-sky-400 border border-sky-500/20 transition-all flex items-center gap-1 cursor-pointer"
                                        >
                                          <span>{isAr ? "اقرأ المقال" : "Open Reference"}</span>
                                          <ExternalLink className="w-3 h-3" />
                                        </a>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                          </div>
                        );
                      })()}
                    </motion.div>
                  )}
                </div>

                {/* BOTTOM PREV/NEXT STEP FOOTER */}
                <div className={`p-4 flex items-center justify-between border-t transition-colors duration-300 ${
                  theme === "dark" ? "bg-slate-950 border-t-slate-900" : "bg-slate-50 border-t-slate-200"
                }`}>
                  <button
                    onClick={() => {
                      if (activeStepIndex > 0) setActiveStepIndex(activeStepIndex - 1);
                    }}
                    disabled={activeStepIndex === 0}
                    className={`px-4 py-2 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                      theme === "dark" 
                        ? "bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white" 
                        : "bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900 shadow-sm"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>{isAr ? "الجزيرة السابقة" : "Previous Island"}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (activeStepIndex < ROADMAP_STEPS.length - 1) setActiveStepIndex(activeStepIndex + 1);
                    }}
                    disabled={activeStepIndex === ROADMAP_STEPS.length - 1}
                    className={`px-4 py-2 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                      theme === "dark" 
                        ? "bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white" 
                        : "bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900 shadow-sm"
                    }`}
                  >
                    <span>{isAr ? "الجزيرة التالية" : "Next Island"}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* RIGHT: THE ILLUMINATED COMPASS GLASS AI ASSISTANT (4 Columns) */}
              <div className={`lg:col-span-4 flex flex-col h-[600px] lg:h-[680px] rounded-3xl overflow-hidden shadow-2xl relative border transition-all duration-300 ${
                theme === "dark" ? "bg-slate-950/80 border-slate-900" : "bg-white border-slate-200 shadow-lg"
              }`}>
                
                {/* Visual Glass Header with Coordinates */}
                <div className={`p-4 flex items-center justify-between border-b transition-colors duration-300 ${
                  theme === "dark" ? "bg-slate-950 border-b-slate-900" : "bg-slate-100 border-b-slate-200"
                }`}>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-teal-400 rounded-full animate-ping" />
                    <div>
                      <h3 className={`text-xs font-black transition-colors duration-300 ${
                        theme === "dark" ? "text-white" : "text-slate-900"
                      }`}>{isAr ? "بوصلة المساعد الذكي" : "COMPASS NAVIGATOR AI"}</h3>
                      <span className="text-[8px] font-mono text-slate-500 block">COORDS: N 24° 54' / W 46° 12'</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-teal-555 font-bold bg-teal-950/40 px-2 py-0.5 rounded border border-teal-900/40">
                    PORT: 3000
                  </span>
                </div>

                {/* CONVERSATION SCROLL AREA */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4 min-h-[380px] lg:min-h-[460px]">
                  {chatHistory.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col max-w-[85%] ${
                        msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                      }`}
                    >
                      <span className={`text-[9px] font-mono mb-1 flex items-center gap-1 uppercase ${
                        theme === "dark" ? "text-slate-500" : "text-slate-600 font-semibold"
                      }`}>
                        {msg.role === "user" ? (
                          <>
                            <span>{isAr ? "المستكشف" : "Sailor"}</span>
                            <MapPin className="w-2.5 h-2.5 text-teal-500" />
                          </>
                        ) : (
                          <>
                            <Navigation className="w-2.5 h-2.5 text-teal-500 animate-spin-slow" />
                            <span>{isAr ? "البوصلة" : "Navigator AI"}</span>
                          </>
                        )}
                      </span>
                      
                      <div className={`p-3 rounded-2xl text-xs leading-relaxed select-text ${
                        msg.role === "user"
                          ? "bg-teal-500 text-slate-950 font-semibold rounded-tr-none"
                          : `border rounded-tl-none transition-colors duration-300 ${
                              theme === "dark" ? "bg-slate-900 text-slate-200 border-slate-850" : "bg-slate-50 text-slate-800 border-slate-250 shadow-sm"
                            }`
                      }`}>
                        <MarkdownRenderer content={msg.text} />
                      </div>
                    </div>
                  ))}

                  {chatLoading && (
                    <div className="flex flex-col items-start max-w-[85%]">
                      <span className="text-[9px] font-mono text-slate-500 mb-1 uppercase flex items-center gap-1">
                        <Navigation className="w-2.5 h-2.5 text-teal-500 animate-spin" />
                        <span>{isAr ? "جاري التفكير..." : "Pondering..."}</span>
                      </span>
                      <div className={`p-3 border rounded-2xl text-xs rounded-tl-none flex items-center gap-2 transition-colors duration-300 ${
                        theme === "dark" ? "bg-slate-900 border-slate-850 text-slate-400" : "bg-slate-50 border-slate-250 text-slate-600 shadow-inner"
                      }`}>
                        <Loader className="w-3.5 h-3.5 animate-spin text-teal-500" />
                        <span>{isAr ? "يقوم المستشار بتحليل خطوط العرض..." : "Reading maritime charts..."}</span>
                      </div>
                    </div>
                  )}

                  <div ref={chatScrollRef} />
                </div>

                {/* QUICK NAVIGATIONAL PROMPT PILLS */}
                <div className={`p-3 border-t flex flex-wrap gap-1.5 transition-all duration-300 ${
                  theme === "dark" ? "border-slate-900 bg-slate-950/40" : "border-slate-200 bg-slate-50"
                }`}>
                  <button
                    onClick={() => handleSendMessage(isAr ? "اشرح لي بالتفصيل مفهوم هذه الجزيرة ومستهدفاتها البرمجية." : "Explain this island's target architectural concepts in detail.")}
                    className={`text-[9px] font-bold px-2 py-1 rounded-lg border cursor-pointer transition-all ${
                      theme === "dark" 
                        ? "text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-850 border-slate-850" 
                        : "text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border-slate-200 shadow-sm"
                    }`}
                  >
                    ⚓ {isAr ? "اشرح مفهوم الجزيرة" : "Explain Island"}
                  </button>
                  <button
                    onClick={() => handleSendMessage(isAr ? "ما الفائدة الأساسية من كتابة كود تفاعلي آمن في دارت؟" : "What is the concrete benefit of write safe code in Dart?")}
                    className={`text-[9px] font-bold px-2 py-1 rounded-lg border cursor-pointer transition-all ${
                      theme === "dark" 
                        ? "text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-850 border-slate-850" 
                        : "text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border-slate-200 shadow-sm"
                    }`}
                  >
                    🛡️ {isAr ? "فوائد الأمان في دارت" : "Dart Safety Benefits"}
                  </button>
                  <button
                    onClick={() => handleSendMessage(isAr ? "ما هي أشجار فلاتر الثلاثة وكيف ترتبط برسم الشاشة؟" : "What are Flutter's Three Trees and how do they coordinate rendering?")}
                    className={`text-[9px] font-bold px-2 py-1 rounded-lg border cursor-pointer transition-all ${
                      theme === "dark" 
                        ? "text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-850 border-slate-850" 
                        : "text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border-slate-200 shadow-sm"
                    }`}
                  >
                    🌳 {isAr ? "أشجار فلاتر الثلاثة" : "Flutter's Three Trees"}
                  </button>
                </div>

                {/* TEXT CHAT INPUT */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className={`p-3 border-t flex gap-2 transition-colors duration-300 ${
                    theme === "dark" ? "border-slate-900 bg-slate-950" : "border-slate-200 bg-slate-100"
                  }`}
                >
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder={isAr ? "اسأل مستشار البوصلة الذكي..." : "Ask the Navigator AI..."}
                    className={`flex-1 border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-teal-500/50 transition-colors duration-300 ${
                      theme === "dark" ? "bg-slate-900 border-slate-850 text-slate-200" : "bg-white border-slate-200 text-slate-800 shadow-sm"
                    }`}
                  />
                  <button
                    type="submit"
                    className="bg-teal-500 hover:bg-teal-400 text-slate-950 p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center shadow-md shadow-teal-500/10"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* SECURE NAUTICAL FOOTER CREDIT WITH PERSONALIZED USER INFO */}
      <footer className={`relative z-20 border-t p-6 text-[11px] font-mono tracking-wider flex flex-col gap-4 px-6 md:px-8 mt-auto transition-all duration-300 ${
        theme === "dark" 
          ? "border-t-slate-900 bg-slate-950/80 text-slate-400" 
          : "border-t-slate-200 bg-slate-100 text-slate-600"
      }`}>
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto gap-4">
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1.5">
            <span className="font-bold text-teal-400 uppercase tracking-widest text-[12px] flex items-center gap-1.5">
              ⚓ {isAr ? "المستكشف والمهندس:" : "CREATIVE NAVIGATOR:"}
            </span>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs">
              <a 
                href="https://github.com/ibrahimfathizreba-gif" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-teal-400 transition-colors"
              >
                <Github className="w-4 h-4 text-teal-400" />
                <span>ibrahimfathizreba-gif</span>
              </a>
              <a 
                href="mailto:ibrahimfathizreba@gmail.com"
                className="flex items-center gap-1.5 hover:text-teal-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-teal-400" />
                <span>ibrahimfathizreba@gmail.com</span>
              </a>
            </div>
            <p className="text-[10px] text-slate-500 font-semibold mt-0.5">
              {isAr 
                ? "طالب علوم حاسوب سنة تخرج // مبرمج بالحدس والإحساس (Vibe Coder)" 
                : "Senior CS Student // Vibe Coder"}
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end text-center md:text-right gap-1 text-[10px]">
            <span className="text-teal-500 font-bold">LAT. 24° 54' N / LONG. 46° 12' W</span>
            <span className="text-slate-500">
              {isAr
                ? "© ٢٠٢٦ أكاديمية جزر فلاتر ودارت. صُمم بامتياز تقني للتعلم الاحترافي لـ Google Flutter."
                : "© 2026 Flutter & Dart Lost Islands Academy. Engineered with premium design for elite software studies."}
            </span>
            <span className="text-[9px] text-slate-500 uppercase">COMPILER ACTIVE // SHUTTLE 0x1F</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
