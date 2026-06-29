import React from "react";
import { Award, BookOpen, ExternalLink, Video, Compass, Users, Code, HelpCircle, CheckCircle, GraduationCap, Trophy, Zap, Lock, Shield } from "lucide-react";
import { CHANNELS_AND_VIDEOS, EXPERT_FORUMS } from "../data";
import { VideoResource, ForumResource } from "../types";

interface DashboardProps {
  completedChallenges: string[];
  completedChecklists: string[];
  completedConcepts: string[];
  completedQuizzes: string[];
  completedRoadmapSteps: string[];
  setActiveTab: (tab: string) => void;
  language: "en" | "ar";
}

export default function Dashboard({ 
  completedChallenges, 
  completedChecklists, 
  completedConcepts, 
  completedQuizzes = [],
  completedRoadmapSteps = [],
  setActiveTab,
  language
}: DashboardProps) {
  const isAr = language === "ar";
  const isRtl = isAr;

  const challengePercent = Math.round((completedChallenges.length / 3) * 100);
  const checklistPercent = Math.round((completedChecklists.length / 11) * 100);
  const roadmapPercent = Math.round((completedRoadmapSteps.length / 6) * 100);
  
  // Calculate detailed dynamic XP points (including roadmap steps & quizzes!)
  const challengeXP = completedChallenges.length * 150;     // +150 XP per coding challenge
  const checklistXP = completedChecklists.length * 50;       // +50 XP per architecture check
  const conceptXP = completedConcepts.length * 30;           // +30 XP per concept tutorial read
  const quizXP = completedQuizzes.length * 100;               // +100 XP per roadmap quiz
  const roadmapXP = completedRoadmapSteps.length * 100;       // +100 XP per step sandbox challenge
  
  const totalXP = challengeXP + checklistXP + conceptXP + quizXP + roadmapXP;

  // Determine Level and Academic Title
  let currentLevel = 1;
  let levelTitle = isAr ? "مبتدئ دارت" : "Dart Apprentice";
  let xpForNextLevel = 100;
  let progressToNext = 0;

  if (totalXP < 150) {
    currentLevel = 1;
    levelTitle = isAr ? "مبتدئ دارت" : "Dart Apprentice";
    xpForNextLevel = 150;
    progressToNext = Math.round((totalXP / 150) * 100);
  } else if (totalXP < 450) {
    currentLevel = 2;
    levelTitle = isAr ? "جسر البرمجة كائنية التوجه" : "OOP Bridger";
    xpForNextLevel = 450;
    progressToNext = Math.round(((totalXP - 150) / 300) * 100);
  } else if (totalXP < 900) {
    currentLevel = 3;
    levelTitle = isAr ? "مهندس فلاتر" : "Flutter Architect";
    xpForNextLevel = 900;
    progressToNext = Math.round(((totalXP - 450) / 450) * 100);
  } else if (totalXP < 1500) {
    currentLevel = 4;
    levelTitle = isAr ? "مهندس أنظمة متقدم" : "Advanced Systems Engineer";
    xpForNextLevel = 1500;
    progressToNext = Math.round(((totalXP - 900) / 600) * 100);
  } else {
    currentLevel = 5;
    levelTitle = isAr ? "خبير فلاتر معتمد ومطور GDE" : "Flutter Grandmaster & GDE";
    xpForNextLevel = 2500; // soft cap
    progressToNext = Math.min(100, Math.round(((totalXP - 1500) / 1000) * 100));
  }

  // Badges structure with exact evaluation logic mapped to user's real progress
  const badges = [
    {
      id: "badge_oop",
      name: isAr ? "رائد الانتقال من جافا" : "Java-to-Dart Pioneer",
      description: isAr ? "استكشف 3 أو أكثر من الكيانات والمقارنات داخل موديول الجسر." : "Explore 3 or more comparative concept tutorials in the Bridge panel.",
      requirement: isAr ? "قراءة 3 مقارنات برمجية" : "View 3 comparative concepts",
      isEarned: completedConcepts.length >= 3,
      icon: BookOpen,
      color: "from-amber-400 to-orange-500 text-amber-500",
      bgClass: "bg-amber-50/85 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/60 text-amber-800 dark:text-amber-200",
      iconBg: "bg-amber-100 dark:bg-amber-900",
    },
    {
      id: "badge_state",
      name: isAr ? "مبتدئ إدارة الحالة" : "State Management Novice",
      description: isAr ? "حل التحدي الأول أو تحقق من ميزات الـ Riverpod في المشاريع." : "Solve Challenge 1 (Constructor) or verify Riverpod features inside blueprints.",
      requirement: isAr ? "حل التحدي 1 أو إثبات الـ Riverpod" : "Solve Challenge 1 or verify Riverpod",
      isEarned: completedChallenges.includes("ch1") || completedChecklists.includes("chk1_3") || completedRoadmapSteps.includes("step3"),
      icon: Zap,
      color: "from-sky-400 to-indigo-500 text-sky-500",
      bgClass: "bg-sky-50/80 dark:bg-sky-950/30 border-sky-200 dark:border-sky-900/60 text-sky-800 dark:text-sky-200",
      iconBg: "bg-sky-100 dark:bg-sky-900",
    },
    {
      id: "badge_concurrency",
      name: isAr ? "خبير تزامن البيانات" : "Dart Concurrency Expert",
      description: isAr ? "حل تحديات الـ Futures والـ Streams أو ميزات الـ Isolates بالخلفية." : "Solve Challenge 3 (Futures) or verify background Isolate thread communication checks.",
      requirement: isAr ? "حل تحدي 3 أو إعداد الـ Isolates" : "Solve Challenge 3 or check Isolate managers",
      isEarned: completedChallenges.includes("ch3") || completedChecklists.includes("chk2_1") || completedChecklists.includes("chk2_2") || completedRoadmapSteps.includes("step4"),
      icon: Trophy,
      color: "from-purple-400 to-pink-500 text-purple-500",
      bgClass: "bg-purple-50/80 dark:bg-purple-950/30 border-purple-200 dark:border-purple-900/60 text-purple-800 dark:text-purple-200",
      iconBg: "bg-purple-100 dark:bg-purple-900",
    },
    {
      id: "badge_sql",
      name: isAr ? "مهندس قواعد بيانات SQL" : "SQL Database Architect",
      description: isAr ? "أكمل وتحقق من محاكاة قواعد البيانات SQFlite والترقية البرمجية." : "Complete and verify SQFlite Local Database triggers or migrations.",
      requirement: isAr ? "إثبات قواعد بيانات SQFlite" : "Verify SQFlite persistence checks",
      isEarned: completedChecklists.includes("chk3_1") || completedChecklists.includes("chk3_2"),
      icon: Shield,
      color: "from-emerald-400 to-teal-500 text-emerald-500",
      bgClass: "bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-200",
      iconBg: "bg-emerald-100 dark:bg-emerald-900",
    },
    {
      id: "badge_firebase",
      name: isAr ? "خبير المنصات السحابية فيربيز" : "Firebase Master",
      description: isAr ? "تحقق من المصادقة، والاشتراكات الحية للمحادثات، ومؤشرات التواجد." : "Verify authentication setup, stream subscriptions, or presence loops in Chat Engine.",
      requirement: isAr ? "إثبات ميزات الـ Real-time Chat" : "Verify Real-time Chat Engine checklists",
      isEarned: completedChecklists.includes("chk4_1") || completedChecklists.includes("chk4_2") || completedChecklists.includes("chk4_3") || completedRoadmapSteps.includes("step5") || completedQuizzes.includes("step5"),
      icon: Award,
      color: "from-red-400 to-rose-600 text-rose-500",
      bgClass: "bg-rose-50/80 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-200",
      iconBg: "bg-rose-100 dark:bg-rose-900",
    }
  ];

  // Classroom Leaderboard with classmate peers
  const classmates = [
    { name: isAr ? "صوفيا تشين (مرشحة للقب خبير)" : "Sophia Chen (GDE Candidate)", xp: 1450, email: "s.chen@university.edu", rankLabel: "🥇", isUser: false },
    { name: isAr ? "ماركوس فانس (خبير جافا)" : "Marcus Vance (JVM Expert)", xp: 1100, email: "m.vance@university.edu", rankLabel: "🥈", isUser: false },
    { name: isAr ? "إيلينا روستوفا (مطور دارت)" : "Elena Rostova (Dart Dev)", xp: 850, email: "e.rostova@university.edu", rankLabel: "🥉", isUser: false },
    { name: isAr ? "سيدهارث ناير (خبير متزامن)" : "Siddharth Nair (Async Specialist)", xp: 580, email: "s.nair@university.edu", rankLabel: "4", isUser: false },
    { name: isAr ? "ليام كارتر (سنة رابعة حاسوب)" : "Liam Carter (Senior CS)", xp: 300, email: "l.carter@university.edu", rankLabel: "5", isUser: false },
  ];

  const userEntry = {
    name: isAr ? "أنت (مطور الحاسوب المستقبلي)" : "You (ibrahimfathizreba@gmail.com)",
    xp: totalXP,
    email: "ibrahimfathizreba@gmail.com",
    isUser: true,
    rankLabel: "",
  };

  const leaderboard = [...classmates, userEntry]
    .sort((a, b) => b.xp - a.xp)
    .map((entry, index) => {
      let label = "";
      if (index === 0) label = "🥇";
      else if (index === 1) label = "🥈";
      else if (index === 2) label = "🥉";
      else label = (index + 1).toString();

      return {
        ...entry,
        rankLabel: label,
        rankIndex: index + 1,
      };
    });

  // Localized string dictionary
  const dict = {
    badgeHeader: isAr ? "مقصورة المنهج لمهندسي جافا" : "Computer Science Senior Program",
    mainTitle: isAr ? "معسكر تطوير فلاتر لمصممي وهيكليي جافا OOP" : "Flutter DevCamp for Java OOP Architects",
    mainDesc: isAr 
      ? "مرحباً بك في مسار التعلم المسرع لطلاب التخرج. نظراً لخلفيتك العالية في البرمجة الشيئية (Java OOP) وبناء الأنظمة، قمنا بتنظيم هذا المعسكر لتخطي المبادئ والدخول مباشرة في صلب البنية المعمارية المتقدمة لـ Dart و Flutter والربط السحابي فيربيز لإنشاء تطبيق دردشة فوري متكامل ونشره على المتاجر."
      : "Welcome to your graduation-year accelerated curriculum. Since you understand Java OOP, compile-time types, and inheritance, you can skip trivial tutorials. This platform is custom-built to bridge your existing Spring/Android JVM schemas directly to Sound Null Safe Dart and Flutter architecture models.",
    exploreBtn: isAr ? "استكشاف جسر جافا ⇆ دارت" : "Explore Java ⇆ Dart Bridge",
    solveBtn: isAr ? "تحدي الشفرات البرمجية" : "Solve Code Challenges",
    metricsTitle: isAr ? "مقاييس إنجاز المنهج الدراسي" : "Syllabus Verification Metrics",
    realtimeState: isAr ? "مباشر ✓" : "Real-Time State",
    challengesLabel: isAr ? "تحديات البرمجة التفاعلية" : "Interactive Code Challenges",
    challengesSub: isAr ? `${completedChallenges.length} / 3 مكتملة` : `${completedChallenges.length} / 3 solved`,
    challengesDesc: isAr ? "اكسب +150 نقطة XP عن كل تحدي برمجي لدارت وبناء الفئات البرمجية." : "Earn +150 XP per challenge by resolving inheritance, concurrency, and OOP mapper tasks.",
    architectLabel: isAr ? "التحقق من المخططات المتقدمة" : "Architecture Verifications",
    architectSub: isAr ? `${completedChecklists.length} / 11 مكتملة` : `${completedChecklists.length} / 11 validated`,
    architectDesc: isAr ? "اكسب +50 نقطة XP لكل ميزة هيكلية يتم التحقق منها في موديول المشاريع." : "Earn +50 XP per checklist item. Includes Clean Architecture, isolates, SQFlite, and Firebase.",
    roadmapLabel: isAr ? "خريطة طريق الدردشة الفورية" : "Chat App Learn Roadmap",
    roadmapSub: isAr ? `${completedRoadmapSteps.length} / 6 خطوات منجزة` : `${completedRoadmapSteps.length} / 6 steps passed`,
    roadmapDesc: isAr ? "تعلم إعداد المشروع والربط الفوري فيربيز وبناء الواجهات ونشر التطبيق بالمتاجر." : "Learn project setup, Firebase, realtime stream UI, and App store deployment.",
    playlistTitle: isAr ? "قائمة الفيديوهات المعمارية المنسقة" : "Curated Advanced Video Playlists",
    forumsTitle: isAr ? "مجتمعات ومنصات الخبراء البرمجية" : "Expert Communities & Forums",
    academicProgress: isAr ? "المستوى الأكاديمي واللقب الحالي" : "Academic Progress Title",
    xpWallet: isAr ? `رصيد النقاط: ${totalXP} نقطة` : `XP Wallet: ${totalXP} XP`,
    nextTier: isAr ? `المستوى التالي عند: ${xpForNextLevel} نقطة` : `Next Tier at ${xpForNextLevel} XP`,
    toNextTitle: isAr ? "للترقية والمستوى التالي" : "to next title",
    masteryBadges: isAr ? "أوسمة استحقاق المنهج" : "Syllabus Mastery Badges",
    masteryBadgesDesc: isAr ? "تألق واكسب أوسمة برمجية فريدة عند إتمام المهام والاختبارات." : "Master advanced concepts to light up your academic trophy case.",
    unlockedBadge: isAr ? "تم الاكتساب" : "Unlocked",
    lockedBadge: isAr ? "مغلق" : "Locked",
    requiresLabel: isAr ? "المتطلب:" : "Requires:",
    leaderboardTitle: isAr ? "لوحة صدارة طلبة تخصص الحاسوب" : "Classroom Leaderboard",
    leaderboardDesc: isAr ? "ترتيبك الفوري في مجموعتك البرمجية يتحدث بناءً على نقاطك المكتسبة." : "Your rank in the senior CS cohort updates instantly.",
    classSize: isAr ? "حجم الصف: 6 طلاب" : "Class Size: 6",
    leaderboardFoot: isAr ? "أكمل الاختبارات وحل الشيفرات للارتقاء في الصدارة!" : "Solve more challenges or verify architectures to climb ranks!",
    roadmapSectionTitle: isAr ? "انطلق في معسكر الدردشة الفورية!" : "Start Learning Together With AI!",
    roadmapSectionDesc: isAr ? "ابدأ الآن مسار تصميم وبناء تطبيق محادثة فوري (مجموعات، فيربيز، ومؤشر نشاط المستخدمين) ونشره على المتاجر خطوة بخطوة رفقة مستشارك الذكي وبطل المنهج." : "Access our comprehensive step-by-step learning guide with embedded AI assistants, quizzes, and code grading sandboxes.",
    startLearningBtn: isAr ? "افتح خريطة طريق النشر بالمتاجر" : "Launch Store Deployment Roadmap"
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 py-2 space-y-8 ${isRtl ? "text-right" : "text-left"}`} style={{ direction: isRtl ? "rtl" : "ltr" }}>
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-indigo-950 text-white rounded-3xl p-6 md:p-8 border border-slate-800 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute left-1/3 bottom-0 w-60 h-60 bg-indigo-500/10 rounded-full blur-2xl" />

        <div className="max-w-2xl relative z-10 space-y-4">
          <span className="text-[10px] md:text-xs font-bold text-sky-400 tracking-wider bg-sky-950/80 border border-sky-800/40 px-3 py-1 rounded-full uppercase inline-block">
            {dict.badgeHeader}
          </span>
          <h1 className="font-display font-black text-2xl md:text-4xl text-white tracking-tight leading-none">
            {dict.mainTitle}
          </h1>
          <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
            {dict.mainDesc}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setActiveTab("bridge")}
              className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-xs md:text-sm cursor-pointer transition-all hover:scale-[1.02] shadow-md shadow-sky-500/10"
            >
              {dict.exploreBtn}
            </button>
            <button
              onClick={() => setActiveTab("playground")}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs md:text-sm cursor-pointer transition-all border border-slate-700"
            >
              {dict.solveBtn}
            </button>
          </div>
        </div>
      </div>

      {/* ROADMAP ADVERTISEMENT BANNER (Special Arabic Request) */}
      <div className="bg-white dark:bg-slate-900 border-2 border-dashed border-sky-300 dark:border-sky-800/60 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400">
              <Trophy className="w-5 h-5 animate-bounce" />
            </span>
            <h3 className="font-display font-black text-base md:text-lg text-slate-800 dark:text-white">
              {dict.roadmapSectionTitle}
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
            {dict.roadmapSectionDesc}
          </p>
        </div>
        <button
          onClick={() => setActiveTab("roadmap")}
          className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-sky-600 dark:hover:bg-sky-500 font-bold rounded-2xl text-xs md:text-sm transition-all cursor-pointer shadow-md shadow-sky-500/10 shrink-0"
        >
          {dict.startLearningBtn}
        </button>
      </div>

      {/* Main Grid: Split Content on Left, Gamification & Competition on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Academic Syllabus & Materials (7 Columns) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Progress Overview */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-slate-800 dark:text-white text-base md:text-lg flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-sky-500" />
                {dict.metricsTitle}
              </h3>
              <span className="text-xs font-bold text-sky-600 bg-sky-50 dark:bg-sky-950 px-2 py-0.5 rounded-md uppercase font-mono">
                {dict.realtimeState}
              </span>
            </div>

            <div className="space-y-4 pt-2">
              <div className="space-y-2 p-4 bg-slate-50/50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-slate-800/40">
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>{dict.challengesLabel}</span>
                  <span className="font-mono text-sky-600 dark:text-sky-400 font-bold">{dict.challengesSub}</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-500 rounded-full transition-all duration-500" style={{ width: `${challengePercent}%` }} />
                </div>
                <p className="text-[10px] text-slate-400">
                  {dict.challengesDesc}
                </p>
              </div>

              <div className="space-y-2 p-4 bg-slate-50/50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-slate-800/40">
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>{dict.architectLabel}</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{dict.architectSub}</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{ width: `${checklistPercent}%` }} />
                </div>
                <p className="text-[10px] text-slate-400">
                  {dict.architectDesc}
                </p>
              </div>

              <div className="space-y-2 p-4 bg-slate-50/50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-slate-800/40">
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>{dict.roadmapLabel}</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{dict.roadmapSub}</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${roadmapPercent}%` }} />
                </div>
                <p className="text-[10px] text-slate-400">
                  {dict.roadmapDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Curated Playlists */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-sky-500" />
              <h3 className="font-display font-black text-slate-800 dark:text-white text-lg">{dict.playlistTitle}</h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {CHANNELS_AND_VIDEOS.map((video) => (
                <a
                  key={video.id}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-850 hover:border-sky-500/30 p-5 shadow-xs flex gap-4 transition-all hover:shadow-md cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-950 group-hover:bg-sky-50 dark:group-hover:bg-sky-950 text-slate-400 group-hover:text-sky-500 flex items-center justify-center shrink-0 border border-slate-200/50 group-hover:border-sky-100 transition-colors">
                    <Video className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5 flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400">
                        {video.category}
                      </span>
                      <span className="text-xs font-mono text-slate-400 font-medium whitespace-nowrap">
                        {video.duration}
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-slate-800 dark:text-slate-200 text-sm md:text-base group-hover:text-sky-600 transition-colors leading-tight truncate">
                      {video.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans line-clamp-2">
                      {video.description}
                    </p>
                    <span className="text-[10px] font-bold text-slate-400 font-mono block">
                      Channel: {video.channel}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Forums */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-500" />
              <h3 className="font-display font-black text-slate-800 dark:text-white text-lg">{dict.forumsTitle}</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {EXPERT_FORUMS.map((forum) => (
                <a
                  key={forum.id}
                  href={forum.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-850 hover:border-sky-500/30 p-4 shadow-xs flex items-center justify-between gap-4 transition-all hover:shadow-md cursor-pointer group"
                >
                  <div className="space-y-1 min-w-0 text-left">
                    <span className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full inline-block mb-1 ${
                      forum.platform === "Discord"
                        ? "bg-indigo-50 text-indigo-700"
                        : forum.platform === "Reddit"
                        ? "bg-rose-50 text-rose-700"
                        : forum.platform === "GitHub"
                        ? "bg-slate-100 text-slate-800"
                        : "bg-sky-50 text-sky-800"
                    }`}>
                      {forum.platform}
                    </span>
                    <h4 className="font-display font-bold text-slate-800 dark:text-slate-200 text-xs md:text-sm group-hover:text-sky-600 transition-colors leading-tight truncate">
                      {forum.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-normal line-clamp-1 font-sans">
                      {forum.description}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-950 group-hover:bg-sky-50 dark:group-hover:bg-sky-950 text-slate-400 group-hover:text-sky-500 border border-slate-200/40 flex items-center justify-center shrink-0 transition-all">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Gamification, Badges Gallery, Dynamic Leaderboard (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* XP & Level Progression */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-6 border border-slate-800 shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-1 text-left">
                <span className="text-[10px] text-sky-400 font-mono uppercase font-bold tracking-widest">
                  {dict.academicProgress}
                </span>
                <h3 className="font-display font-black text-xl text-white">
                  {levelTitle}
                </h3>
              </div>
              <div className="bg-sky-500/20 text-sky-400 border border-sky-500/30 px-2.5 py-1 rounded-xl text-xs font-mono font-bold flex items-center gap-1 shrink-0">
                <Trophy className="w-3.5 h-3.5" />
                LVL {currentLevel}
              </div>
            </div>

            {/* XP Statistics */}
            <div className="grid grid-cols-3 gap-2 py-3 bg-slate-950/60 rounded-xl border border-slate-800/50 mb-4 text-center font-mono text-xs">
              <div>
                <span className="text-slate-500 block text-[9px] uppercase font-bold">{isAr ? "التحديات" : "Challenges"}</span>
                <span className="text-sky-400 font-bold">+{challengeXP} XP</span>
              </div>
              <div className="border-x border-slate-800/60">
                <span className="text-slate-500 block text-[9px] uppercase font-bold">{isAr ? "المخططات" : "Blueprints"}</span>
                <span className="text-indigo-400 font-bold">+{checklistXP} XP</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[9px] uppercase font-bold">{isAr ? "المرئيات" : "Roadmap"}</span>
                <span className="text-amber-400 font-bold">+{quizXP + roadmapXP} XP</span>
              </div>
            </div>

            <div className="space-y-2 text-left">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">{dict.xpWallet}</span>
                <span className="text-slate-500">{dict.nextTier}</span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden relative border border-slate-900">
                <div className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full transition-all duration-500" style={{ width: `${progressToNext}%` }} />
              </div>
              <span className="text-[10px] text-slate-500 block text-right">
                {progressToNext}% {dict.toNextTitle}
              </span>
            </div>
          </div>

          {/* Badges Gallery */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <div className="text-left">
              <h3 className="font-display font-bold text-slate-800 dark:text-white text-base flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-500" />
                {dict.masteryBadges}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {dict.masteryBadgesDesc}
              </p>
            </div>

            <div className="space-y-3.5">
              {badges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <div 
                    key={badge.id}
                    className={`flex items-center gap-3.5 p-3 rounded-xl border transition-all text-left ${
                      badge.isEarned 
                        ? badge.bgClass + " shadow-xs animate-pulse-slow" 
                        : "bg-slate-50/60 dark:bg-slate-950/20 border-slate-100 dark:border-slate-850/60 text-slate-400"
                    }`}
                  >
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border relative ${
                      badge.isEarned 
                        ? badge.iconBg + " border-current" 
                        : "bg-slate-100 dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                    }`}>
                      {badge.isEarned ? (
                        <>
                          <Icon className="w-5 h-5" />
                          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
                          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full" />
                        </>
                      ) : (
                        <Lock className="w-4 h-4 text-slate-300 dark:text-slate-700" />
                      )}
                    </div>

                    <div className="space-y-0.5 flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className={`text-xs md:text-sm font-bold truncate ${badge.isEarned ? "text-slate-800 dark:text-slate-200" : "text-slate-500"}`}>
                          {badge.name}
                        </h4>
                        {badge.isEarned ? (
                          <span className="text-[9px] font-bold px-2 py-0.5 bg-green-100 text-green-800 rounded-full font-mono uppercase">
                            {dict.unlockedBadge}
                          </span>
                        ) : (
                          <span className="text-[9px] font-semibold px-2 py-0.5 bg-slate-100 dark:bg-slate-950 text-slate-400 rounded-full font-mono uppercase">
                            {dict.lockedBadge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-1 font-sans">
                        {badge.description}
                      </p>
                      <span className="text-[9px] font-medium text-slate-400 font-mono block">
                        {dict.requiresLabel} {badge.requirement}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Classroom Leaderboard */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="text-left">
                <h3 className="font-display font-bold text-slate-800 dark:text-white text-base flex items-center gap-2">
                  <Users className="w-5 h-5 text-sky-500" />
                  {dict.leaderboardTitle}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {dict.leaderboardDesc}
                </p>
              </div>
              <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full font-mono shrink-0">
                {dict.classSize}
              </span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {leaderboard.map((student) => (
                <div 
                  key={student.email}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all text-left ${
                    student.isUser 
                      ? "bg-sky-50/90 dark:bg-sky-950/40 border-sky-300 dark:border-sky-900 text-sky-950 dark:text-sky-200 font-bold shadow-xs relative overflow-hidden" 
                      : "bg-slate-50/40 dark:bg-slate-950/10 border-slate-100 dark:border-slate-850 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {student.isUser && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-sky-500" />
                  )}

                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-6 text-center font-bold text-sm shrink-0">
                      {student.rankLabel}
                    </span>
                    <div className="min-w-0">
                      <span className={`block truncate ${student.isUser ? "text-sky-950 dark:text-sky-200 font-bold" : "text-slate-800 dark:text-slate-300 font-medium"}`}>
                        {student.name}
                      </span>
                      <span className="text-[10px] text-slate-400 block truncate">
                        {student.email}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`font-mono text-xs font-black ${student.isUser ? "text-sky-600 dark:text-sky-400" : "text-slate-700 dark:text-slate-300"}`}>
                      {student.xp} XP
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-[10px] text-center text-slate-400 italic font-sans">
              {dict.leaderboardFoot}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
