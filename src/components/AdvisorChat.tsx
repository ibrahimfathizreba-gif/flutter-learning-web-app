import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, MessageSquare, ArrowRight, Loader, Bot, User, Trash2 } from "lucide-react";
import MarkdownRenderer from "./MarkdownRenderer";

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

interface AdvisorChatProps {
  language: "en" | "ar";
}

const CONVERSATION_STARTERS = [
  {
    label: "Streams vs RxJava",
    labelAr: "التدفقات مقابل RxJava",
    prompt: "Can you explain how Dart Streams compare to RxJava or Java Reactive Streams? Give side-by-side architecture comparisons.",
    promptAr: "هل يمكنك توضيح كيف تختلف تدفقات دارت (Streams) عن RxJava أو التدفقات التفاعلية في جافا؟ يرجى إعطاء مقارنات معمارية تفصيلية."
  },
  {
    label: "Garbage Collection",
    labelAr: "ذاكرة التطبيق والـ GC",
    prompt: "How does Dart's generational Garbage Collector work under the hood compared to JVM (like G1 or ZGC)? Focus on how mobile environments influence collector pause times.",
    promptAr: "كيف يعمل جامع القمامة المتناوب (Generational GC) في دارت تحت غطاء المحرك مقارنة ببيئة JVM (مثل G1 أو ZGC)؟ ركز على الهواتف وتأثيره على الأداء."
  },
  {
    label: "Dependency Injection",
    labelAr: "حقن الاعتمادات (DI)",
    prompt: "I am used to Spring's @Autowired dependency injection. How does Dependency Injection work in Flutter (such as Riverpod or GetIt), and how do we handle mock overrides for testing?",
    promptAr: "أنا معتاد على استخدام @Autowired لحقن الاعتمادات في Spring Boot. كيف يعمل حقن الاعتمادات في فلاتر (مثل Riverpod أو GetIt)، وكيف نتعامل مع الكائنات الوهمية في الاختبارات؟"
  },
  {
    label: "Thread Pools vs Isolates",
    labelAr: "خيوط العمل مقابل Isolates",
    prompt: "In Java, we use thread pools and atomic integers. How does the single-threaded event loop in Dart coordinate complex asynchronous tasks without locks, and what are the exact performance limits?",
    promptAr: "في جافا نستخدم Thread Pools و Atomic Integers. كيف تقوم حلقة الأحداث أحادية الخيط في دارت بتنسيق المهام المعقدة غير المتزامنة دون أقفال، وما هي الحدود الفعلية للأداء؟"
  }
];

export default function AdvisorChat({ language }: AdvisorChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isAr = language === "ar";

  const getWelcomeMessage = () => {
    if (isAr) {
      return "### مرحباً بك يا مهندس البرمجيات! 👋\n\nأنا **المستشار الذكي لعلوم الحاسب وفلاتر**. نظراً لأنك تمتلك أساسيات متينة في **برمجة جافا الشيئية (Java OOP)**، فأنا هنا لمساعدتك على تجاوز الشروحات البسيطة المكررة ومطابقة الأنماط الهندسية المتقدمة مباشرة مع فلاتر.\n\nسواء كنت تريد ربط أنماط جمع القمامة (GC) بدارت، أو مناقشة تركيب قنوات تدفق البيانات غير المتزامنة (Streams)، أو بناء طبقات معمارية نظيفة متوافقة مع SOLID، اسألني! اختر أحد المواضيع بالأسفل أو اكتب سؤالك.";
    }
    return "### Welcome, Architect! 👋\n\nI am your **AI CS Advisor**. Since you are approaching your last year in a Computer Science degree and possess solid foundations in **Java OOP**, I am here to help you skip the basic 'hello world' tutorials and map advanced patterns directly to Flutter.\n\nWhether you want to map JVM garbage collection patterns to Dart, discuss asynchronous stream composition, or build clean SOLID enterprise boundaries, ask me! Choose a prompt below or type your question.";
  };

  // Load message logs from localStorage on load or language switch
  useEffect(() => {
    const saved = localStorage.getItem("advisor_chat_logs");
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      setMessages([
        {
          role: "model",
          text: getWelcomeMessage()
        }
      ]);
    }
  }, [language]);

  const saveChat = (logs: ChatMessage[]) => {
    localStorage.setItem("advisor_chat_logs", JSON.stringify(logs));
  };

  const handleClearChat = () => {
    const confirmMsg = isAr 
      ? "هل أنت متأكد من رغبتك في مسح سجل المحادثة؟" 
      : "Are you sure you want to clear this conversation history?";
    if (window.confirm(confirmMsg)) {
      const resetMsg = isAr
        ? "تم مسح المحادثة. أنا مستعد لأسئلتك البرمجية القادمة!"
        : "Conversation cleared. Ready for your next advanced architectural inquiry!";
      const reset: ChatMessage[] = [
        {
          role: "model",
          text: resetMsg
        }
      ];
      setMessages(reset);
      saveChat(reset);
      setError("");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    const msg = textToSend.trim();
    if (!msg) return;

    setInput("");
    setError("");
    const updatedUserMsg: ChatMessage = { role: "user", text: msg };
    const nextLogs = [...messages, updatedUserMsg];
    setMessages(nextLogs);
    saveChat(nextLogs);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: msg,
          history: nextLogs.slice(0, -1), // Send history minus the last user message we just appended
          language,
        }),
      });

      if (!response.ok) {
        throw new Error(isAr ? "فشل الاتصال بخادم المستشار البرمجي" : "Failed to consult CS Advisor server");
      }

      const data = await response.json();
      const updatedModelMsg: ChatMessage = { role: "model", text: data.reply };
      const finalLogs = [...nextLogs, updatedModelMsg];
      setMessages(finalLogs);
      saveChat(finalLogs);
    } catch (err: any) {
      setError(err.message || (isAr ? "حدث خطأ أثناء الاتصال بالخادم. يرجى المحاولة لاحقاً." : "An issue occurred connecting to Gemini. Please try again."));
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-2 flex flex-col h-[calc(100vh-140px)] min-h-[500px]">
      {/* Advisor panel header */}
      <div className="bg-white dark:bg-slate-900 rounded-t-2xl border border-b-0 border-slate-200 dark:border-slate-800 p-4 shrink-0 flex items-center justify-between shadow-xs" style={{ flexDirection: isAr ? "row-reverse" : "row" }}>
        <div className="flex items-center gap-2.5" style={{ flexDirection: isAr ? "row-reverse" : "row" }}>
          <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-sky-400" />
          </div>
          <div style={{ textAlign: isAr ? "right" : "left" }}>
            <h3 className="font-display font-black text-slate-800 dark:text-white text-sm md:text-base flex items-center gap-1.5 leading-tight" style={{ flexDirection: isAr ? "row-reverse" : "row" }}>
              {isAr ? "مستشار فلاتر الذكي" : "CS Flutter Advisor"}
              <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-350">
                {isAr ? "مستشار ذكي" : "AI Assistant"}
              </span>
            </h3>
            <p className="text-[10px] text-slate-400 dark:text-slate-400">
              {isAr ? "مطابقة أنماط جافا OOP مع حزمة فلاتر البرمجية" : "Bridging Java OOP paradigm models to Flutter SDK"}
            </p>
          </div>
        </div>
        
        <button
          onClick={handleClearChat}
          className="p-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 hover:text-rose-600 rounded-xl transition-all cursor-pointer"
          title={isAr ? "مسح المحادثة" : "Clear Conversation Logs"}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Messages viewport */}
      <div className="flex-1 bg-slate-50 dark:bg-slate-950/40 border-x border-slate-200 dark:border-slate-800 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-4 max-w-3xl ${
              msg.role === "user" 
                ? "ml-auto flex-row-reverse" 
                : "mr-auto"
            }`}
            style={{ flexDirection: msg.role === "user" ? (isAr ? "row" : "row-reverse") : (isAr ? "row-reverse" : "row") }}
          >
            {/* Avatar block */}
            <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center border select-none ${
              msg.role === "user"
                ? "bg-slate-200 border-slate-300 dark:bg-slate-800 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                : "bg-slate-900 border-slate-900 text-white dark:bg-sky-950 dark:border-sky-900"
            }`}>
              {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-sky-400" />}
            </div>

            {/* Message bubble card */}
            <div className={`p-4 rounded-2xl shadow-xs border ${
              msg.role === "user"
                ? "bg-sky-50 border-sky-100 dark:bg-sky-950/40 dark:border-sky-900 text-slate-800 dark:text-slate-200 rounded-tr-xs"
                : "bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-xs"
            }`} style={{ textAlign: isAr ? "right" : "left" }}>
              <MarkdownRenderer content={msg.text} />
            </div>
          </div>
        ))}

        {/* AI Typing loader */}
        {isTyping && (
          <div className="flex gap-4 mr-auto animate-pulse" style={{ flexDirection: isAr ? "row-reverse" : "row" }}>
            <div className="w-8 h-8 rounded-xl shrink-0 flex items-center justify-center bg-slate-900 border border-slate-900 text-white">
              <Loader className="w-4 h-4 animate-spin text-sky-400" />
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <span className="text-xs text-slate-400 dark:text-slate-400">
                {isAr ? "المستشار الذكي يقوم بصياغة الإجابة المعمارية..." : "Advisor is formulating structural response..."}
              </span>
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900 text-rose-800 dark:text-rose-300 rounded-xl text-xs flex gap-2" style={{ textAlign: isAr ? "right" : "left" }}>
            <Bot className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">{isAr ? "فشل اتصال المستشار:" : "Advisor stream timed out: "} </span>
              {error}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer input container */}
      <div className="bg-white dark:bg-slate-900 rounded-b-2xl border border-slate-200 dark:border-slate-800 p-4 shrink-0 space-y-3.5 shadow-xs">
        {/* Presets - display if history is clean or as auxiliary helpers */}
        <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-thin select-none" style={{ flexDirection: isAr ? "row-reverse" : "row" }}>
          {CONVERSATION_STARTERS.map((starter, i) => {
            const label = isAr ? starter.labelAr : starter.label;
            const prompt = isAr ? starter.promptAr : starter.prompt;
            return (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                className="px-3.5 py-1.5 shrink-0 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-850 hover:border-slate-300 rounded-xl text-xs text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white transition-all flex items-center gap-1 cursor-pointer font-medium"
              >
                {label}
                <ArrowRight className={`w-3 h-3 text-slate-400 ${isAr ? "rotate-180" : ""}`} />
              </button>
            );
          })}
        </div>

        {/* Form panel */}
        <form onSubmit={handleFormSubmit} className="flex gap-2.5" style={{ flexDirection: isAr ? "row-reverse" : "row" }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
            placeholder={isAr ? "ناقش أهداف التجميع، منافذ اتصال الـ Isolates، أو قنوات التدفقات..." : "Discuss compilation targets, isolate communication ports, stream buffers..."}
            className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-sky-500 text-slate-800 dark:text-slate-200 rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/10 placeholder-slate-400 dark:placeholder-slate-500"
            style={{ textAlign: isAr ? "right" : "left" }}
          />
          <button
            type="submit"
            disabled={isTyping || !input.trim()}
            className="px-5 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-100 dark:disabled:bg-slate-950 disabled:text-slate-300 dark:disabled:text-slate-700 text-white font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center"
          >
            <Send className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
          </button>
        </form>
      </div>
    </div>
  );
}
