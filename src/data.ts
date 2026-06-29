import { Challenge, Concept, ProjectModule, VideoResource, ForumResource } from "./types";

export const CHANNELS_AND_VIDEOS: VideoResource[] = [
  {
    id: "v1",
    title: "Flutter Clean Architecture & TDD (Full Advanced Course)",
    url: "https://www.youtube.com/playlist?list=PLB6Lc7nQ1h4iYGE_khOhaguWy7Anf0ZaD",
    duration: "12 Hours (Playlist)",
    channel: "Reso Coder",
    description: "The gold standard tutorial playlist for advanced architectural design in Flutter. Teaches strict separation of concerns, domain-driven design, repository patterns, data sources, and test-driven development (TDD). Essential for CS seniors.",
    category: "Deep-Dive Architecture"
  },
  {
    id: "v2",
    title: "Dart Isolates & Concurrency In-Depth Guide",
    url: "https://www.youtube.com/watch?v=5AxWC49ZMzs",
    duration: "25 mins",
    channel: "Flutter",
    description: "An official guide by the Flutter team detailing how Dart's single-threaded event loop operates, how Isolates are spawned, how they do not share memory, and how message passing works using Ports. Compares directly to Java thread models.",
    category: "Dart Concurrency"
  },
  {
    id: "v3",
    title: "Riverpod 2.0 Complete Masterclass",
    url: "https://www.youtube.com/watch?v=Zp7LuGgT6S4",
    duration: "1 hour 45 mins",
    channel: "Andrea Bizzotto",
    description: "Deep dive into Riverpod for reactive state management and dependency injection. Learn how to handle async state (AsyncValue), keep your UI thin, and structure production-grade reactive apps without complex boilerplate.",
    category: "State Management"
  },
  {
    id: "v4",
    title: "Flutter in Focus: Sound Null Safety",
    url: "https://www.youtube.com/watch?v=yP5_gAmipfI",
    duration: "12 mins",
    channel: "Google Developers",
    description: "Learn how the Dart compiler guarantees that null safety is sound, preventing NullPointerExceptions at compile time. Contrasts with Java's optional types and runtime checking.",
    category: "Getting Started"
  }
];

export const EXPERT_FORUMS: ForumResource[] = [
  {
    id: "f1",
    name: "Reddit: r/FlutterDev",
    url: "https://www.reddit.com/r/FlutterDev/",
    description: "The primary expert-level Flutter community on Reddit. Discusses advanced compiler optimizations, package comparisons, architecture standards, and showcases real-world projects. High-quality community review and industry insights.",
    platform: "Reddit"
  },
  {
    id: "f2",
    name: "Flutter Official Discord",
    url: "https://discord.gg/flutter",
    description: "Active community of Google Developer Experts (GDEs) and core Flutter engineers. Excellent channels dedicated to #architecture, #dart-internals, #performance-tuning, and #help-advanced.",
    platform: "Discord"
  },
  {
    id: "f3",
    name: "Flutter GitHub Core Repository",
    url: "https://github.com/flutter/flutter",
    description: "The definitive open-source repo of the Flutter SDK. Analyze how widgets are built from the underlying RenderObjects, check pending issues, review source code architecture, or contribute to engine optimizations.",
    platform: "GitHub"
  },
  {
    id: "f4",
    name: "Dart Language Design Specifications",
    url: "https://dart.dev/guides/language/specifications",
    description: "Official language design documentation. Highly recommended for computer science students interested in compiler behaviors, static analysis trees, and runtime execution specifications.",
    platform: "Official Docs"
  },
  {
    id: "f5",
    name: "StackOverflow [flutter] tag",
    url: "https://stackoverflow.com/questions/tagged/flutter",
    description: "A hub of technical QA addressing specific build, serialization, state management, and asset hydration queries. Filter by votes to find deeply technical answers regarding core framework mechanics.",
    platform: "StackOverflow"
  }
];

export const COMPARATIVE_CONCEPTS: Concept[] = [
  {
    id: "c1",
    name: "Implicit Interfaces",
    category: "OOP Mapping",
    summary: "Dart has no separate 'interface' keyword. Instead, every class implicitly defines an interface containing all its instance fields and methods, which can be implemented by other classes.",
    javaComparison: "In Java, interfaces are distinct, separate types declared with 'interface'. To mock a class or provide secondary implementations, you must explicitly declare an interface and implement it. Dart eliminates this dual-file boilerplate. Any class can serve as an interface.",
    javaSnippet: `// Java: Requires explicit declaration
public interface Repository {
    void fetchData();
}

public class NetworkRepository implements Repository {
    @Override
    public void fetchData() {
        System.out.println("Fetching from Web");
    }
}`,
    dartSnippet: `// Dart: Every class is also an interface!
class Repository {
  void fetchData() {
    print("Default implementation");
  }
}

// Implement the class structure without inheritance
class MockRepository implements Repository {
  @override
  void fetchData() {
    print("Mock database fetch");
  }
}`,
    proTips: "When designing unit tests, you do not need to create dozens of dummy interfaces. Simply declare a mockup class that implements your concrete production class. You must override ALL fields and methods defined in the target class when implementing it."
  },
  {
    id: "c2",
    name: "Initializer Lists & Constructors",
    category: "OOP Mapping",
    summary: "Dart constructors feature powerful initialization syntax: 'this.field' shorthand parameter lists, and initializer lists which execute BEFORE the constructor body.",
    javaComparison: "In Java, all field assignments must happen inside the constructor body, after 'super()' is called. If fields are declared 'final', they must be initialized on the declaration line or in the constructor. Dart uses parameter-level assignments and initializer lists to make final initialization highly declarative.",
    javaSnippet: `// Java: Boilerplate assignments
public class User {
    private final String name;
    private final int id;

    public User(String name, int id) {
        this.name = name;
        this.id = id;
    }
}`,
    dartSnippet: `// Dart: Shorthand & Initializer lists
class User {
  final String name;
  final int id;
  final String role;

  // 1. Shorthand: directly assigns parameters to fields
  // 2. Initializer List: runs before body, sets non-parameter fields
  User(this.name, this.id, String type) 
      : role = type.toUpperCase() {
    print("User constructor body");
  }
  
  // Named constructor - common Dart pattern
  User.admin(String name, int id)
      : this(name, id, "ADMIN");
}`,
    proTips: "Initializer lists are perfect for running sanity checks (asserts) and setting up final variables with computed values before the constructor body executes, guaranteeing true compile-time safety."
  },
  {
    id: "c3",
    name: "Mixins (Multiple Code Reuse)",
    category: "OOP Mapping",
    summary: "Mixins allow a class to reuse a body of code from another class in multiple hierarchies without inheriting from it directly, resolving the 'diamond problem' of multiple inheritance.",
    javaComparison: "Java strictly enforces single inheritance ('extends') and implements interfaces. Java 8 introduced default interface methods, but they cannot maintain instance state. Dart 'mixins' let you inject both methods AND state variables into a class hierarchy using the 'with' keyword.",
    javaSnippet: `// Java: Multiple inheritance of state is forbidden.
// Standard solution requires composite helper delegation
public class FlightHelper {
    public void navigateSky() { System.out.println("Flying"); }
}

public class Duck {
    private final FlightHelper flyer = new FlightHelper();
    public void fly() { flyer.navigateSky(); } // Delegation boilerplate
}`,
    dartSnippet: `// Dart: Declaring a mixin
mixin Flyer {
  int altitude = 0;
  
  void fly() {
    altitude += 100;
    print("Flying at $altitude feet");
  }
}

mixin Swimmer {
  void swim() => print("Swimming");
}

// Compose duck with both Flyer and Swimmer properties
class Duck extends Animal with Flyer, Swimmer {}

class Animal {} // Base class`,
    proTips: "Mixins are heavily utilized in Flutter for specialized controller bindings, like 'SingleTickerProviderStateMixin' which injects high-performance animation ticking capabilities directly into custom widget state classes."
  },
  {
    id: "c4",
    name: "Sound Null Safety",
    category: "Language Basics",
    summary: "Dart features strong compile-time Sound Null Safety, guaranteeing that a variable cannot be null unless you explicitly allow it using nullable notation.",
    javaComparison: "In Java, any object reference can be 'null', triggering the dreaded NullPointerException (NPE) at runtime. Although Java introduced 'Optional<T>', it is a wrapper object that adds memory overhead and does not guarantee safety. Dart guarantees at compiler level that non-nullable types will never be null.",
    javaSnippet: `// Java: Subject to NullPointerException at runtime
public class Processor {
    public void process(String data) {
        // Must manually guard against null
        if (data != null) {
            System.out.println(data.length());
        }
    }
}`,
    dartSnippet: `// Dart: Sound Null Safety
void process(String data) {
  // Safe: 'data' is guaranteed to be non-null. compiler enforces it.
  print(data.length);
}

void processNullable(String? data) {
  // Compiler forces you to handle null explicitly
  print(data?.length ?? 0); // Safe navigation & null coalescing
}`,
    proTips: "Because Dart null safety is 'sound', the compiler makes optimizations knowing a variable cannot be null, completely omitting runtime check bytecode instructions and resulting in faster execution."
  },
  {
    id: "c5",
    name: "Isolates vs Threads (Concurrency)",
    category: "Asynchronous Code",
    summary: "Dart code runs in a single-threaded Event Loop. Parallel processing is achieved via 'Isolates' which are independent worker threads that share no memory, communicating solely via Port messages.",
    javaComparison: "Java relies heavily on OS-level threads (or Virtual Threads in Java 21) that share a common heap memory. Concurrency bugs (race conditions, deadlocks) must be managed using synchronization, locks, or volatile blocks. Dart completely avoids shared-memory race conditions by giving each Isolate its own isolated heap. No locks needed!",
    javaSnippet: `// Java: Shared memory concurrency
public class SharedCounter {
    private int count = 0;
    // Requires synchronized keyword to avoid race conditions
    public synchronized void increment() {
        count++;
    }
}`,
    dartSnippet: `// Dart: Spawning a background isolate
import 'dart:isolate';

void heavyComputation(SendPort mainSendPort) {
  // Runs on a separate CPU core, isolated heap memory
  int result = 0;
  for (int i = 0; i < 10000000; i++) result += i;
  
  // Return result via Message Port
  mainSendPort.send(result);
}

void main() async {
  final receivePort = ReceivePort();
  await Isolate.spawn(heavyComputation, receivePort.sendPort);
  
  receivePort.listen((message) {
    print("Received computation result: $message");
    receivePort.close();
  });
}`,
    proTips: "In Flutter, 95% of tasks (networking, JSON parsing, rendering) fit on the single-threaded event loop via async/await. Spawn an Isolate ONLY for heavy CPU tasks like image compression, cryptographic hashing, or large matrix computations."
  }
];

export const CODE_CHALLENGES: Challenge[] = [
  {
    id: "ch1",
    title: "Constructor Shorthand and Named Parameters",
    difficulty: "Beginner",
    category: "OOP Mapping",
    description: "Write a Dart class `Course` representing an academic course. Your class should demonstrate Dart's constructor initializer shorthand and null safety. It must include: \n1. A final `String title` and `int code` (non-nullable).\n2. An optional `String? instructor` (nullable).\n3. A constructor with named parameters, making `title` and `code` required, and `instructor` optional.\n4. A named constructor `Course.core` that defaults `instructor` to 'Staff' and uppercase the `title` using an initializer list.",
    constraints: "- Use final variables.\n- Implement constructor parameter-level field assignment (`this.title`).\n- Implement named constructor using initialization list (`: instructor = 'Staff'`).\n- Code must run cleanly without syntax errors.",
    starterCode: `class Course {
  // TODO: Add final fields title, code, and instructor
  
  // TODO: Write the default constructor with named required parameters
  
  // TODO: Write the Course.core named constructor with initializer list
  
  String getDetails() {
    return "$title ($code) taught by $instructor";
  }
}

void main() {
  final course1 = Course(title: "Mobile Architecture", code: 401, instructor: "Prof. Alan");
  print(course1.getDetails());
  
  final course2 = Course.core("Algorithms", 301);
  print(course2.getDetails());
}`,
    javaContrast: "In Java, named parameters are not natively supported (often requiring the Builder Pattern). Initializer lists also do not exist; field transformations happen in the constructor body after class setup, which is less declarative."
  },
  {
    id: "ch2",
    title: "The Behavior Composer (Mixins)",
    difficulty: "Intermediate",
    category: "OOP Mapping",
    description: "Java developers often complain about the lack of multiple inheritance. In this challenge, demonstrate how to solve code reuse elegantly in Dart using mixins.\nWrite two mixins: `DatabaseConnection` containing a method `void connect()` that prints 'Database connected', and `Logger` containing a method `void log(String msg)` that prints '[LOG]: $msg'.\nThen, write a class `UserSyncService` that inherits from a base class `Service` and applies both `DatabaseConnection` and `Logger` mixins. Implement a method `void executeSync()` inside `UserSyncService` that connects to the database, logs 'Syncing users...', and finishes.",
    constraints: "- Use the 'mixin' keyword for DatabaseConnection and Logger.\n- Inherit UserSyncService from Service and compose it using the 'with' keyword.\n- Complete execution of the executeSync method matching the specified logs.",
    starterCode: `class Service {
  void start() => print("Service started");
}

// TODO: Create DatabaseConnection mixin

// TODO: Create Logger mixin

// TODO: Create UserSyncService extending Service with mixins

void main() {
  final syncService = UserSyncService();
  syncService.start();
  syncService.executeSync();
}`,
    javaContrast: "In Java, implementing two interfaces would require implementing the body of both connections manually, or delegating to separate utility helper classes. Dart mixins permit sharing fully implemented states and logics across separate classes seamlessly."
  },
  {
    id: "ch3",
    title: "The Secure Data Downloader (Futures)",
    difficulty: "Advanced",
    category: "Async & Streams",
    description: "Asynchronous processing is critical to mobile apps to prevent UI freezing. Dart relies on the event loop via `Future` and stream buffers. Contrast this with Java's complex execution threads.\nWrite an asynchronous function `fetchSecureData(String endpoint)` that simulates downloading payload from a server. It must:\n1. Print 'Initiating fetch for $endpoint...'.\n2. Delay execution asynchronously for 2 seconds (using `Future.delayed`).\n3. Perform validation: if `endpoint` contains the word 'secure', return the string 'DATA: encrypted_payload'.\n4. If `endpoint` does not contain 'secure', throw a custom `FormatException` with the message 'Insecure access prohibited'.\n5. Implement a calling function `safeFetch()` using async-try-catch to print the result or catch the error cleanly.",
    constraints: "- Must use 'async' and 'await' keywords.\n- Use Future.delayed with a Duration of 2 seconds.\n- Throw FormatException for insecure endpoints.\n- Handle errors cleanly using try-catch inside safeFetch.",
    starterCode: `import 'dart:async';

// TODO: Implement fetchSecureData returning Future<String>

// TODO: Implement safeFetch calling fetchSecureData and handling errors

void main() async {
  print("Main execution starts (Event loop running)");
  await safeFetch();
  print("Main execution ends");
}`,
    javaContrast: "In Java, this task would involve spawning an Callable/Future on an ExecutorService, handling InterruptedException and ExecutionException, and manually shutting down thread pools to avoid leaks. Dart manages this seamlessly on its primary thread via the event loop."
  }
];

export const PROJECT_MODULES: ProjectModule[] = [
  {
    id: "pm1",
    title: "Clean Architecture News Reader",
    description: "Learn how to build a robust, scalable Flutter application following domain-driven design and strict SOLID principles. This module bridges standard enterprise Java architectures (e.g. Spring Layered Architecture) to the client-side.",
    architectureType: "Clean Architecture (Domain, Data, Presentation)",
    learningOutcomes: [
      "Understand pure domain entities free from framework dependencies",
      "Implement the Repository Pattern to abstract REST API and local SQLite data fetching",
      "Manage UI loading, success, and error states reactively using State Providers (Riverpod)",
      "Structure multi-module folders cleanly for team scalability"
    ],
    javaContext: "Think of this as the mobile equivalent of a Spring Boot service architecture: Domain Entities are your pure Java model POJOs; Use Cases represent your Service Layer (@Service) containing business logic; Repositories act as your Spring JPA repository interfaces; DataSources act as your low-level HttpClient or JDBC connectors; and Presentation Controllers are your Spring REST Controllers. The key difference: State in mobile apps is persistent and reactive, whereas Spring backend routes are stateless per request.",
    folderStructure: [
      {
        name: "lib",
        type: "folder",
        description: "Application root directory",
        children: [
          {
            name: "core",
            type: "folder",
            description: "Shared configurations, custom themes, HTTP networking clients, and error handler types."
          },
          {
            name: "features",
            type: "folder",
            description: "Encapsulated logic sliced by functional business features (Feature-by-Folder pattern).",
            children: [
              {
                name: "news",
                type: "folder",
                description: "The News Article Feature module",
                children: [
                  {
                    name: "domain",
                    type: "folder",
                    description: "Strictly pure Dart: Entities defining data structures, and Use Cases detailing business logic boundaries.",
                    children: [
                      { name: "article.dart", type: "file", description: "Article entity class (no Flutter dependencies)" },
                      { name: "news_repository.dart", type: "file", description: "Repository contract interface" },
                      { name: "get_news_articles.dart", type: "file", description: "Use case orchestrator" }
                    ]
                  },
                  {
                    name: "data",
                    type: "folder",
                    description: "Concrete implementations: Repository orchestrators, database mapping models, and network API connectors.",
                    children: [
                      { name: "article_model.dart", type: "file", description: "JSON serialization extension of the Article entity" },
                      { name: "news_repository_impl.dart", type: "file", description: "Concrete repository managing offline-first data sync" },
                      { name: "news_remote_datasource.dart", type: "file", description: "Http client making web calls" }
                    ]
                  },
                  {
                    name: "presentation",
                    type: "folder",
                    description: "User Interface: Flutter widget trees, state controllers, and reactive state providers.",
                    children: [
                      { name: "news_provider.dart", type: "file", description: "Riverpod state controller emitting loading/data/error states" },
                      { name: "news_list_page.dart", type: "file", description: "Responsive Flutter scaffold displaying news items" }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    fileTemplates: [
      {
        filePath: "lib/features/news/domain/article.dart",
        description: "The pure domain Entity. Completely decoupled from Flutter frameworks to allow pure Dart unit testing.",
        code: `// Pure Dart Domain Entity
class Article {
  final String id;
  final String title;
  final String description;
  final String? urlToImage;
  final DateTime publishedAt;

  Article({
    required this.id,
    required this.title,
    required this.description,
    this.urlToImage,
    required this.publishedAt,
  });
}`
      },
      {
        filePath: "lib/features/news/domain/news_repository.dart",
        description: "The Repository abstract class. It specifies the API contract, adhering to Dependency Inversion (SOLID).",
        code: `import 'article.dart';

// Abstract contract for News Repository
abstract class NewsRepository {
  Future<List<Article>> getLatestNews(String category);
}`
      },
      {
        filePath: "lib/features/news/presentation/news_provider.dart",
        description: "Riverpod state controller. Orchestrates use cases and exposes reactive state states (loading, success, error) to widgets.",
        code: `import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../domain/article.dart';
import '../domain/news_repository.dart';

// State management provider exposing list of Articles asynchronously
final newsArticlesProvider = FutureProvider.autoDispose.family<List<Article>, String>((ref, category) async {
  // Inject repository implementation
  final repository = ref.watch(newsRepositoryProvider);
  
  // Return network/cache fetch Future
  return repository.getLatestNews(category);
});`
      }
    ],
    checklists: [
      {
        id: "chk1_1",
        task: "Decouple domain from packages",
        explanation: "Check that files inside domain/ do not import material.dart, dio, or any JSON parser. They must be pure Dart."
      },
      {
        id: "chk1_2",
        task: "Implement Network to Model Mapping",
        explanation: "Ensure that files in data/ serialize JSON into custom Models, which inherit from or map directly into pure Domain Entities."
      },
      {
        id: "chk1_3",
        task: "Connect Widgets to Providers",
        explanation: "Extend Flutter widgets with ConsumerStatefulWidget or ConsumerWidget to watch State Providers asynchronously without setState."
      }
    ]
  },
  {
    id: "pm2",
    title: "Concurrent Image Filter Engine",
    description: "Build an intensive, non-blocking image filter rendering canvas. Learn how to manage raw pixels, load images into memory, and execute calculations in the background utilizing Dart's Isolate ports.",
    architectureType: "Actor-Model / Isolate Message Passing Architecture",
    learningOutcomes: [
      "De-serialize binary images safely into RGBA pixel buffers in Dart",
      "Spawn Isolates to execute highly algorithmic filters (blur, sepia, invert) on background threads",
      "Implement a robust SendPort / ReceivePort message loop to transfer data across thread boundaries",
      "Measure FPS drops and prevent UI freezing (jank) during heavy calculation loops"
    ],
    javaContext: "In Java, background tasks use Runnable or Thread pools (ExecutorService). Workers modify a shared byte-array image buffer. You must use synchronization or CountDownLatch to wait for filters to complete. In Dart, since thread communication is prohibited, you must copy or 'transfer' byte buffers directly to the Isolate using SendPort, completely preventing deadlock vulnerabilities.",
    folderStructure: [
      {
        name: "lib",
        type: "folder",
        description: "Root",
        children: [
          {
            name: "concurrency",
            type: "folder",
            description: "Isolate managers and processors",
            children: [
              { name: "filter_worker.dart", type: "file", description: "Background isolate script handling calculation loops" },
              { name: "isolate_pool_manager.dart", type: "file", description: "Orchestrator monitoring ReceivePort streams" }
            ]
          },
          {
            name: "presentation",
            type: "folder",
            description: "Visual widgets",
            children: [
              { name: "image_canvas_page.dart", type: "file", description: "Realtime rendering canvas plotting processing progress" }
            ]
          }
        ]
      }
    ],
    fileTemplates: [
      {
        filePath: "lib/concurrency/filter_worker.dart",
        description: "Background worker running on a separate CPU core. It parses pixel data and returns processed matrices.",
        code: `import 'dart:isolate';
import 'dart:typed_data';

// Configuration payload for isolate entry point
class FilterPayload {
  final SendPort replyPort;
  final Uint8List imageBytes;
  final String filterType;

  FilterPayload(this.replyPort, this.imageBytes, this.filterType);
}

// Background entry point (must be top-level or static function)
void filterIsolateEntryPoint(FilterPayload payload) {
  final Uint8List data = payload.imageBytes;
  
  // Perform sepia calculation (RGB conversion)
  for (int i = 0; i < data.length; i += 4) {
    int r = data[i];
    int g = data[i+1];
    int b = data[i+2];
    
    // Apply sepia coefficients
    int tr = (0.393 * r + 0.769 * g + 0.189 * b).toInt().clamp(0, 255);
    int tg = (0.349 * r + 0.686 * g + 0.168 * b).toInt().clamp(0, 255);
    int tb = (0.272 * r + 0.534 * g + 0.131 * b).toInt().clamp(0, 255);
    
    data[i] = tr;
    data[i+1] = tg;
    data[i+2] = tb;
  }
  
  // Return completed buffer back to main thread
  payload.replyPort.send(data);
}`
      }
    ],
    checklists: [
      {
        id: "chk2_1",
        task: "Establish Port Communication Loop",
        explanation: "Verify that parent thread creates a ReceivePort, subscribes to its stream, and hands over its SendPort to the spawned Isolate."
      },
      {
        id: "chk2_2",
        task: "Optimize memory transfer",
        explanation: "Use TransferableTypedData if handling large images (>5MB) to avoid duplicating buffer copies in heap memory."
      }
    ]
  },
  {
    id: "pm3",
    title: "SQL Offline Synchronizer (SQFlite)",
    description: "Design a local database manager modeled after Room (Android) or JPA (Spring). Create persistent database triggers, execute migrations, and build a local-to-cloud synchronization dispatcher.",
    architectureType: "Local Database Cache Pattern (Offline-First)",
    learningOutcomes: [
      "Define SQL tables, indexes, and constraints directly in Dart",
      "Manage database upgrades and schema migrations using transactional scripts",
      "Query SQL records as models and bind them dynamically to UI stream visualizers",
      "Write a synchronization coordinator resolving merge conflicts between SQLite and REST APIs"
    ],
    javaContext: "Think of SQFlite as SQLiteOpenHelper or Room on Android, or SQLite Dialect in Hibernate on server-side. In Java, database operations are blocked and must be wrapped in AsyncTasks, Executors, or thread queries. In Dart, all SQLite transactions return 'Future' values, running in native background databases asynchronously while keeping Dart's thread loop free to render UI smoothly.",
    folderStructure: [
      {
        name: "lib",
        type: "folder",
        description: "Root",
        children: [
          {
            name: "database",
            type: "folder",
            description: "Database configurations",
            children: [
              { name: "app_database.dart", type: "file", description: "Database initializers, schema specifications, and migration triggers" },
              { name: "todo_dao.dart", type: "file", description: "Data Access Object querying, updating, and deleting rows" }
            ]
          }
        ]
      }
    ],
    fileTemplates: [
      {
        filePath: "lib/database/todo_dao.dart",
        description: "Data Access Object executing transactions. Maps database rows to structured Dart object classes.",
        code: `import 'package:sqflite/sqflite.dart';

class LocalTask {
  final int? id;
  final String title;
  final bool isCompleted;

  LocalTask({this.id, required this.title, required this.isCompleted});

  Map<String, dynamic> toMap() => {
    'id': id,
    'title': title,
    'is_completed': isCompleted ? 1 : 0,
  };
}

class TodoDao {
  final Database db;
  TodoDao(this.db);

  Future<void> insertTask(LocalTask task) async {
    await db.insert(
      'tasks',
      task.toMap(),
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  Future<List<LocalTask>> fetchAllTasks() async {
    final List<Map<String, dynamic>> maps = await db.query('tasks');
    return List.generate(maps.length, (i) {
      return LocalTask(
        id: maps[i]['id'],
        title: maps[i]['title'],
        isCompleted: maps[i]['is_completed'] == 1,
      );
    });
  }
}`
      }
    ],
    checklists: [
      {
        id: "chk3_1",
        task: "Model database models with serializations",
        explanation: "Provide simple toMap() and fromMap() parser helpers inside local database objects."
      },
      {
        id: "chk3_2",
        task: "Implement Transaction locks for batch inserts",
        explanation: "Wrap bulk entries inside db.transaction() blocks to prevent multiple SQLite lock exceptions."
      }
    ]
  },
  {
    id: "pm4",
    title: "Real-time Firebase Chat Engine",
    description: "Design and construct a high-performance, real-time messaging application. Connects Flutter's stream reactive widgets with Firebase Authentication and Firestore DB schemas. Features offline capabilities, presence tracking, and message read receipts.",
    architectureType: "Reactive Streams Architecture (StreamBuilder + Repository Pattern)",
    learningOutcomes: [
      "Configure a Flutter project with core Firebase dependencies and local environment options",
      "Model multi-user Firestore documents and write robust, secure database schemas",
      "Bind real-time collection queries to high-fidelity list widgets using Dart Streams and StreamBuilder",
      "Build live user presence indicators and transactional read receipts to handle high load"
    ],
    javaContext: "In Java Enterprise, building real-time messaging typically requires setting up WebSocket servers (e.g. Spring WebSocket with STOMP or Socket.io), managing connection threads, and scaling message brokers like RabbitMQ or Redis. Firebase Firestore replaces this entire backend broker layer with a serverless document socket stream. By subscribing to collections via stream callbacks, Dart handles multi-user socket handshakes and local offline caching automatically.",
    folderStructure: [
      {
        name: "lib",
        type: "folder",
        description: "Application core",
        children: [
          {
            name: "core",
            type: "folder",
            description: "Firebase setup options",
            children: [
              { name: "firebase_options.dart", type: "file", description: "Autogenerated cross-platform options mapping keys" }
            ]
          },
          {
            name: "features",
            type: "folder",
            description: "Chat module group",
            children: [
              {
                name: "chat",
                type: "folder",
                description: "Real-time Chat Feature",
                children: [
                  {
                    name: "domain",
                    type: "folder",
                    description: "Entities and abstract Stream repositories",
                    children: [
                      { name: "message.dart", type: "file", description: "Pure domain Message model" },
                      { name: "chat_repository.dart", type: "file", description: "Repository contract with stream definitions" }
                    ]
                  },
                  {
                    name: "data",
                    type: "folder",
                    description: "Firebase service binders",
                    children: [
                      { name: "message_model.dart", type: "file", description: "Firestore DTO serialization mapping map queries" },
                      { name: "chat_repository_impl.dart", type: "file", description: "Firestore query stream listener and transaction dispatcher" }
                    ]
                  },
                  {
                    name: "presentation",
                    type: "folder",
                    description: "Reactive components",
                    children: [
                      { name: "chat_room_page.dart", type: "file", description: "Live StreamBuilder list mapping message bubbles" },
                      { name: "presence_indicator.dart", type: "file", description: "Stateful layout showing online/offline status" }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    fileTemplates: [
      {
        filePath: "lib/features/chat/domain/message.dart",
        description: "The core Domain Entity for messages, holding message state, timestamps, presence parameters, and receipts.",
        code: `// Domain Entity representing a text or media message
class Message {
  final String id;
  final String senderId;
  final String senderName;
  final String text;
  final DateTime sentAt;
  final bool isRead;
  final List<String> readBy;

  Message({
    required this.id,
    required this.senderId,
    required this.senderName,
    required this.text,
    required this.sentAt,
    required this.isRead,
    required this.readBy,
  });

  // Business logic: check if read by a specific user
  bool hasBeenReadBy(String userId) => readBy.contains(userId);
}`
      },
      {
        filePath: "lib/features/chat/data/chat_repository_impl.dart",
        description: "Firestore-backed Stream repository. Binds real-time collection snapshots to Dart Stream controllers, converting JSON documents into Domain Models, and utilizing batch writes for read receipts.",
        code: `import 'package:cloud_firestore/cloud_firestore.dart';
import '../domain/message.dart';
import '../domain/chat_repository.dart';

class FirebaseChatRepository implements ChatRepository {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  @override
  Stream<List<Message>> watchMessages(String chatRoomId) {
    return _firestore
        .collection('chat_rooms')
        .doc(chatRoomId)
        .collection('messages')
        .orderBy('sentAt', descending: true)
        .snapshots()
        .map((snapshot) {
          return snapshot.docs.map((doc) {
            final data = doc.data();
            return Message(
              id: doc.id,
              senderId: data['senderId'] ?? '',
              senderName: data['senderName'] ?? '',
              text: data['text'] ?? '',
              sentAt: (data['sentAt'] as Timestamp).toDate(),
              isRead: data['isRead'] ?? false,
              readBy: List<String>.from(data['readBy'] ?? []),
            );
          }).toList();
        });
  }

  @override
  Future<void> sendMessage(String chatRoomId, Message message) async {
    await _firestore
        .collection('chat_rooms')
        .doc(chatRoomId)
        .collection('messages')
        .add({
          'senderId': message.senderId,
          'senderName': message.senderName,
          'text': message.text,
          'sentAt': FieldValue.serverTimestamp(),
          'isRead': false,
          'readBy': [message.senderId],
        });
  }

  @override
  Future<void> markMessagesAsRead(String chatRoomId, String currentUserId) async {
    final batch = _firestore.batch();
    
    // Query unread messages sent by others
    final unreadQuery = await _firestore
        .collection('chat_rooms')
        .doc(chatRoomId)
        .collection('messages')
        .where('isRead', isEqualTo: false)
        .get();

    for (var doc in unreadQuery.docs) {
      if (doc.data()['senderId'] != currentUserId) {
        batch.update(doc.reference, {
          'isRead': true,
          'readBy': FieldValue.arrayUnion([currentUserId]),
        });
      }
    }
    
    await batch.commit();
  }
}`
      },
      {
        filePath: "lib/features/chat/presentation/chat_room_page.dart",
        description: "The primary chat view leveraging StreamBuilder. It subscribes asynchronously to message lists, rendering bubbles instantly and triggering batch receipts on enter.",
        code: `import 'package:flutter/material.dart';
import '../domain/message.dart';
import '../data/chat_repository_impl.dart';

class ChatRoomPage extends StatefulWidget {
  final String chatRoomId;
  final String currentUserId;
  final String currentUserName;

  const ChatRoomPage({
    Key? key,
    required this.chatRoomId,
    required this.currentUserId,
    required this.currentUserName,
  }) : super(key: key);

  @override
  State<ChatRoomPage> createState() => _ChatRoomPageState();
}

class _ChatRoomPageState extends State<ChatRoomPage> {
  final FirebaseChatRepository _chatRepository = FirebaseChatRepository();
  final TextEditingController _messageController = TextEditingController();

  @override
  void initState() {
    super.initState();
    // On load, mark all messages as read synchronously
    _chatRepository.markMessagesAsRead(widget.chatRoomId, widget.currentUserId);
  }

  void _sendPayload() {
    if (_messageController.text.trim().isEmpty) return;
    
    final message = Message(
      id: '',
      senderId: widget.currentUserId,
      senderName: widget.currentUserName,
      text: _messageController.text.trim(),
      sentAt: DateTime.now(),
      isRead: false,
      readBy: [widget.currentUserId],
    );

    _chatRepository.sendMessage(widget.chatRoomId, message);
    _messageController.clear();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Reactive Room Stream"),
        actions: [
          // Presence Indicator Dot
          Container(
            margin: const EdgeInsets.only(right: 20),
            width: 10,
            height: 10,
            decoration: const BoxDecoration(
              color: Colors.green,
              shape: BoxShape.circle,
            ),
          )
        ],
      ),
      body: Column(
        children: [
          Expanded(
            child: StreamBuilder<List<Message>>(
              stream: _chatRepository.watchMessages(widget.chatRoomId),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Center(child: CircularProgressIndicator());
                }
                if (!snapshot.hasData || snapshot.data!.isEmpty) {
                  return const Center(child: Text("Start the real-time conversation!"));
                }

                final messages = snapshot.data!;
                return ListView.builder(
                  reverse: true, // Display newest messages at bottom
                  itemCount: messages.length,
                  itemBuilder: (context, index) {
                    final msg = messages[index];
                    final isMe = msg.senderId == widget.currentUserId;
                    return ListTile(
                      title: Align(
                        alignment: isMe ? Alignment.centerRight : Alignment.centerLeft,
                        child: Container(
                          padding: const EdgeInsets.all(10),
                          decoration: BoxDecoration(
                            color: isMe ? Colors.blue : Colors.grey[300],
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Text(
                            msg.text,
                            style: TextStyle(color: isMe ? Colors.white : Colors.black),
                          ),
                        ),
                      ),
                      subtitle: Align(
                        alignment: isMe ? Alignment.centerRight : Alignment.centerLeft,
                        child: Text(
                          "\${msg.senderName} • \${msg.isRead ? 'Read ✓✓' : 'Sent ✓'}",
                          style: const TextStyle(fontSize: 10),
                        ),
                      ),
                    );
                  },
                );
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _messageController,
                    decoration: const InputDecoration(placeholder: "Type message..."),
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.send),
                  onPressed: _sendPayload,
                ),
              ],
            ),
          )
        ],
      ),
    );
  }
}`
      }
    ],
    checklists: [
      {
        id: "chk4_1",
        task: "Configure Firebase Credentials",
        explanation: "Initialize Firebase inside main.dart using Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform) and configure Firestore Rules to enforce authentication on reads and writes."
      },
      {
        id: "chk4_2",
        task: "Construct Message StreamBuilder",
        explanation: "Build a responsive chat list mapping a collection.snapshots() query directly inside StreamBuilder, handling initial connection lag and stream subscription memory disposal."
      },
      {
        id: "chk4_3",
        task: "Implement Transactional Read Receipts",
        explanation: "Incorporate markMessagesAsRead using batched writes (WriteBatch) to update unread message keys synchronously whenever the user focuses the channel viewport, avoiding performance bottleneck drops."
      },
      {
        id: "chk4_4",
        task: "Presence Tracker Architecture",
        explanation: "Set up listener triggers listening to AppLifecycleState (paused/resumed) to synchronously toggling active session variables in the Firestore 'users/{userId}' document on focus changes."
      }
    ]
  }
];
