
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Documentation = () => {
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  const ClassPropertiesTable = ({ className, properties }: { className: string, properties: any[] }) => (
    <Card className="mb-8 print:shadow-none print:border-2">
      <CardHeader>
        <CardTitle className="text-lg font-bold">
          Таблица 2.1 - Свойства класса {className}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="border font-bold">Имя свойства</TableHead>
              <TableHead className="border font-bold">Тип данных</TableHead>
              <TableHead className="border font-bold">Тип доступа</TableHead>
              <TableHead className="border font-bold">Метод доступа на чтение</TableHead>
              <TableHead className="border font-bold">Метод доступа на запись</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((prop, index) => (
              <TableRow key={index}>
                <TableCell className="border">{prop.name}</TableCell>
                <TableCell className="border">{prop.type}</TableCell>
                <TableCell className="border">{prop.access}</TableCell>
                <TableCell className="border">{prop.readMethod}</TableCell>
                <TableCell className="border">{prop.writeMethod}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const ClassEventsTable = ({ className, events }: { className: string, events: any[] }) => (
    <Card className="mb-8 print:shadow-none print:border-2">
      <CardHeader>
        <CardTitle className="text-lg font-bold">
          Таблица 2.2 - События класса {className}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="border font-bold">Имя события</TableHead>
              <TableHead className="border font-bold">Тип данных</TableHead>
              <TableHead className="border font-bold">Тип доступа</TableHead>
              <TableHead className="border font-bold">Метод доступа на добавление</TableHead>
              <TableHead className="border font-bold">Метод доступа на удаление</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event, index) => (
              <TableRow key={index}>
                <TableCell className="border">{event.name}</TableCell>
                <TableCell className="border">{event.type}</TableCell>
                <TableCell className="border">{event.access}</TableCell>
                <TableCell className="border">{event.addMethod}</TableCell>
                <TableCell className="border">{event.removeMethod}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const FlowchartBlock = ({ title, steps }: { title: string, steps: string[] }) => (
    <Card className="mb-8 print:shadow-none print:border-2 print:break-inside-avoid">
      <CardHeader>
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-3">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              {index === 0 && (
                <div className="w-24 h-12 border-2 border-black rounded-full flex items-center justify-center text-sm font-semibold bg-white">
                  {step}
                </div>
              )}
              {index > 0 && index < steps.length - 1 && (
                <div className="w-32 h-16 border-2 border-black flex items-center justify-center text-sm font-medium bg-white text-center p-2">
                  {step}
                </div>
              )}
              {index === steps.length - 1 && index > 0 && (
                <div className="w-24 h-12 border-2 border-black rounded-full flex items-center justify-center text-sm font-semibold bg-white">
                  {step}
                </div>
              )}
              {index < steps.length - 1 && (
                <div className="w-0.5 h-6 bg-black"></div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const AppStructureSphere = () => (
    <Card className="mb-8 print:shadow-none print:border-2">
      <CardHeader>
        <CardTitle className="text-lg font-bold">Рисунок 2.1 - Структура приложения</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center min-h-96 relative">
          <div className="w-80 h-80 bg-black rounded-full flex items-center justify-center text-white font-bold text-lg relative">
            <div className="text-center">
              <div>Ядро приложения</div>
              <div className="text-sm mt-2">React + TypeScript</div>
            </div>
            
            {/* Core modules around the sphere */}
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold text-center">
              React Router
            </div>
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-green-600 rounded-full flex items-center justify-center text-xs font-bold text-center">
              Supabase API
            </div>
            <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-xs font-bold text-center">
              PostgreSQL DB
            </div>
            <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-yellow-600 rounded-full flex items-center justify-center text-xs font-bold text-center">
              Auth System
            </div>
            <div className="absolute top-1/2 -left-16 w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-xs font-bold text-center">
              Contexts
            </div>
            <div className="absolute top-1/2 -right-16 w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center text-xs font-bold text-center">
              Unity Games
            </div>
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center text-xs font-bold text-center">
              UI Kit
            </div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-xs font-bold text-center">
              File Storage
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Comprehensive properties from all application components
  const comprehensiveProperties = [
    // User Management Properties
    {
      name: "user.id",
      type: "String (UUID)",
      access: "Только чтение",
      readMethod: "useAuth().user.id",
      writeMethod: "Устанавливается при регистрации"
    },
    {
      name: "user.email",
      type: "String",
      access: "Чтение/запись",
      readMethod: "useAuth().user.email",
      writeMethod: "updateProfile() с валидацией email"
    },
    {
      name: "user.username",
      type: "String",
      access: "Чтение/запись",
      readMethod: "useAuth().user.username",
      writeMethod: "updateProfile() с проверкой уникальности"
    },
    {
      name: "user.isAdmin",
      type: "Boolean",
      access: "Только чтение",
      readMethod: "Проверка роли в profiles таблице",
      writeMethod: "Изменение через SQL или админ-панель"
    },
    {
      name: "user.isBanned",
      type: "Boolean",
      access: "Только чтение",
      readMethod: "Проверка is_banned в profiles",
      writeMethod: "Модерация через админ-интерфейс"
    },
    {
      name: "user.createdAt",
      type: "Date",
      access: "Только чтение",
      readMethod: "Прямое обращение к полю created_at",
      writeMethod: "Автоматически при создании профиля"
    },
    
    // Game Properties
    {
      name: "game.title",
      type: "String",
      access: "Чтение/запись",
      readMethod: "useGames().games[index].title",
      writeMethod: "updateGame(id, {title}) с валидацией"
    },
    {
      name: "game.description",
      type: "String",
      access: "Чтение/запись",
      readMethod: "Прямое обращение к полю description",
      writeMethod: "updateGame() с проверкой длины текста"
    },
    {
      name: "game.coverImage",
      type: "String (URL)",
      access: "Чтение/запись",
      readMethod: "Получение URL из Supabase Storage",
      writeMethod: "Загрузка через FileUpload компонент"
    },
    {
      name: "game.gameUrl",
      type: "String (URL)",
      access: "Только чтение",
      readMethod: "Генерация на основе game.id",
      writeMethod: "Автоматическая генерация при создании"
    },
    {
      name: "game.gameFiles",
      type: "Object",
      access: "Только чтение",
      readMethod: "Получение путей файлов из Storage",
      writeMethod: "Загрузка через UploadGameForm"
    },
    {
      name: "game.tags",
      type: "Array<String>",
      access: "Чтение/запись",
      readMethod: "JOIN с game_tags таблицей",
      writeMethod: "Обновление связей через updateGameTags()"
    },
    {
      name: "game.featured",
      type: "Boolean",
      access: "Чтение/запись",
      readMethod: "Прямое обращение к полю featured",
      writeMethod: "Изменение через админ-панель или API"
    },
    {
      name: "game.width",
      type: "Number",
      access: "Чтение/запись",
      readMethod: "Получение из метаданных игры",
      writeMethod: "Установка при загрузке игры"
    },
    {
      name: "game.height",
      type: "Number",
      access: "Чтение/запись",
      readMethod: "Получение из метаданных игры",
      writeMethod: "Установка при загрузке игры"
    },

    // Comment Properties
    {
      name: "comment.content",
      type: "String",
      access: "Чтение/запись",
      readMethod: "useComments().comments[index].content",
      writeMethod: "addComment() с модерацией контента"
    },
    {
      name: "comment.gameId",
      type: "String (UUID)",
      access: "Только чтение",
      readMethod: "Внешний ключ на games.id",
      writeMethod: "Устанавливается при создании комментария"
    },
    {
      name: "comment.userId",
      type: "String (UUID)",
      access: "Только чтение",
      readMethod: "Связь с auth.users через profiles",
      writeMethod: "Берется из текущей сессии пользователя"
    },
    {
      name: "comment.createdAt",
      type: "Date",
      access: "Только чтение",
      readMethod: "Сортировка по убыванию даты",
      writeMethod: "Автоматически через NOW() в БД"
    },

    // Rating Properties
    {
      name: "rating.score",
      type: "Number (1-5)",
      access: "Чтение/запись",
      readMethod: "useRatings().getUserRating(gameId)",
      writeMethod: "rateGame(gameId, score) с валидацией"
    },
    {
      name: "rating.averageRating",
      type: "Number",
      access: "Только чтение",
      readMethod: "getAverageRating(gameId) - агрегация",
      writeMethod: "Автоматический пересчет при изменении"
    },
    {
      name: "rating.gameId",
      type: "String (UUID)",
      access: "Только чтение",
      readMethod: "Фильтрация рейтингов по игре",
      writeMethod: "Устанавливается при создании рейтинга"
    },

    // UI State Properties
    {
      name: "theme.mode",
      type: "String (light|dark)",
      access: "Чтение/запись",
      readMethod: "useTheme().theme",
      writeMethod: "setTheme() с сохранением в localStorage"
    },
    {
      name: "search.query",
      type: "String",
      access: "Чтение/запись",
      readMethod: "useState hook в SearchComponent",
      writeMethod: "setSearchQuery() с debounce"
    },
    {
      name: "search.filters",
      type: "Object",
      access: "Чтение/запись",
      readMethod: "Получение из URL параметров",
      writeMethod: "updateFilters() с обновлением URL"
    },
    {
      name: "upload.progress",
      type: "Number (0-100)",
      access: "Только чтение",
      readMethod: "Отслеживание через Supabase upload",
      writeMethod: "Обновляется автоматически при загрузке"
    },
    {
      name: "navigation.currentRoute",
      type: "String",
      access: "Только чтение",
      readMethod: "useLocation().pathname",
      writeMethod: "navigate() из react-router-dom"
    }
  ];

  // Comprehensive events from all application components
  const comprehensiveEvents = [
    // Authentication Events
    {
      name: "onUserLogin",
      type: "AuthEvent<LoginData>",
      access: "Подписка/отписка",
      addMethod: "useAuth() context subscription",
      removeMethod: "Автоматическая отписка при unmount"
    },
    {
      name: "onUserLogout",
      type: "AuthEvent<void>",
      access: "Подписка/отписка",
      addMethod: "Слушатель изменения auth.user",
      removeMethod: "useEffect cleanup function"
    },
    {
      name: "onUserRegister",
      type: "AuthEvent<RegisterData>",
      access: "Подписка/отписка",
      addMethod: "Обработка успешной регистрации",
      removeMethod: "Компонент unmount"
    },
    {
      name: "onPasswordReset",
      type: "AuthEvent<ResetData>",
      access: "Подписка/отписка",
      addMethod: "Слушатель email отправки",
      removeMethod: "Таймаут или компонент unmount"
    },

    // Game Events
    {
      name: "onGameLoad",
      type: "GameEvent<Game>",
      access: "Подписка/отписка",
      addMethod: "useGames().loadGame() callback",
      removeMethod: "Завершение загрузки или ошибка"
    },
    {
      name: "onGameStart",
      type: "UnityEvent<GameStartData>",
      access: "Подписка/отписка",
      addMethod: "Unity WebGL instance callback",
      removeMethod: "Game stop или component unmount"
    },
    {
      name: "onGameEnd",
      type: "UnityEvent<GameEndData>",
      access: "Подписка/отписка",
      addMethod: "Unity game completion listener",
      removeMethod: "Автоматически при новой игре"
    },
    {
      name: "onGameUpload",
      type: "UploadEvent<FileData>",
      access: "Подписка/отписка",
      addMethod: "FileUpload progress tracking",
      removeMethod: "Upload complete или cancel"
    },
    {
      name: "onGameUpdate",
      type: "GameEvent<UpdateData>",
      access: "Подписка/отписка",
      addMethod: "useGames().updateGame() listener",
      removeMethod: "Update complete или error"
    },
    {
      name: "onGameDelete",
      type: "GameEvent<DeleteData>",
      access: "Подписка/отписка",
      addMethod: "Delete confirmation listener",
      removeMethod: "Operation complete"
    },

    // Rating & Comments Events
    {
      name: "onRatingSubmit",
      type: "RatingEvent<RatingData>",
      access: "Подписка/отписка",
      addMethod: "useRatings().rateGame() callback",
      removeMethod: "Rating saved или error"
    },
    {
      name: "onRatingChange",
      type: "RatingEvent<ChangeData>",
      access: "Подписка/отписка",
      addMethod: "Rating component onChange",
      removeMethod: "Component unmount"
    },
    {
      name: "onCommentAdd",
      type: "CommentEvent<CommentData>",
      access: "Подписка/отписка",
      addMethod: "useComments().addComment() listener",
      removeMethod: "Comment posted или error"
    },
    {
      name: "onCommentDelete",
      type: "CommentEvent<DeleteData>",
      access: "Подписка/отписка",
      addMethod: "Comment deletion confirmation",
      removeMethod: "Deletion complete"
    },
    {
      name: "onCommentEdit",
      type: "CommentEvent<EditData>",
      access: "Подписка/отписка",
      addMethod: "Edit mode activation",
      removeMethod: "Edit save или cancel"
    },

    // Navigation Events
    {
      name: "onRouteChange",
      type: "NavigationEvent<RouteData>",
      access: "Подписка/отписка",
      addMethod: "useLocation() hook subscription",
      removeMethod: "Component unmount или navigate"
    },
    {
      name: "onPageLoad",
      type: "NavigationEvent<PageData>",
      access: "Подписка/отписка",
      addMethod: "useEffect с dependency array",
      removeMethod: "Page change или unmount"
    },

    // Search & Filter Events
    {
      name: "onSearchQuery",
      type: "SearchEvent<QueryData>",
      access: "Подписка/отписка",
      addMethod: "Input onChange с debounce",
      removeMethod: "Component unmount или clear"
    },
    {
      name: "onFilterChange",
      type: "FilterEvent<FilterData>",
      access: "Подписка/отписка",
      addMethod: "Filter component onChange",
      removeMethod: "Reset filters или unmount"
    },

    // File Upload Events
    {
      name: "onFileSelect",
      type: "FileEvent<FileData>",
      access: "Подписка/отписка",
      addMethod: "File input onChange event",
      removeMethod: "File clear или new selection"
    },
    {
      name: "onUploadProgress",
      type: "ProgressEvent<ProgressData>",
      access: "Подписка/отписка",
      addMethod: "Supabase upload progress callback",
      removeMethod: "Upload complete или error"
    },
    {
      name: "onUploadComplete",
      type: "UploadEvent<CompleteData>",
      access: "Подписка/отписка",
      addMethod: "Successful upload callback",
      removeMethod: "Автоматически после обработки"
    },

    // Theme & UI Events
    {
      name: "onThemeChange",
      type: "ThemeEvent<ThemeData>",
      access: "Подписка/отписка",
      addMethod: "useTheme() context listener",
      removeMethod: "Component unmount"
    },
    {
      name: "onModalOpen",
      type: "UIEvent<ModalData>",
      access: "Подписка/отписка",
      addMethod: "Modal state change listener",
      removeMethod: "Modal close или unmount"
    },
    {
      name: "onToastShow",
      type: "NotificationEvent<ToastData>",
      access: "Подписка/отписка",
      addMethod: "toast() function call",
      removeMethod: "Toast timeout или dismiss"
    }
  ];

  const algorithms = [
    {
      title: "Рисунок 3.1 - Алгоритм инициализации приложения",
      steps: ["Начало", "Проверка сессии", "Загрузка конфигурации", "Инициализация Supabase", "Проверка аутентификации", "Загрузка пользовательских данных", "Рендер интерфейса", "Конец"]
    },
    {
      title: "Рисунок 3.2 - Алгоритм аутентификации пользователя",
      steps: ["Начало", "Ввод email/пароль", "Валидация формы", "Отправка в Supabase Auth", "Проверка блокировки", "Создание сессии", "Обновление контекста", "Перенаправление", "Конец"]
    },
    {
      title: "Рисунок 3.3 - Алгоритм загрузки Unity игры",
      steps: ["Начало", "Выбор файлов игры", "Проверка форматов", "Валидация размеров", "Загрузка в Storage", "Создание записи в БД", "Генерация превью", "Публикация", "Конец"]
    },
    {
      title: "Рисунок 3.4 - Алгоритм поиска и фильтрации игр",
      steps: ["Начало", "Ввод поискового запроса", "Применение фильтров", "Формирование SQL запроса", "Выполнение поиска", "Сортировка результатов", "Отображение списка", "Конец"]
    },
    {
      title: "Рисунок 3.5 - Алгоритм оценки игры пользователем",
      steps: ["Начало", "Проверка авторизации", "Получение текущей оценки", "Валидация нового рейтинга", "Обновление в БД", "Пересчет среднего", "Обновление UI", "Конец"]
    },
    {
      title: "Рисунок 3.6 - Алгоритм добавления комментария",
      steps: ["Начало", "Проверка авторизации", "Ввод текста комментария", "Проверка на спам", "Модерация контента", "Сохранение в БД", "Обновление списка", "Уведомление", "Конец"]
    },
    {
      title: "Рисунок 3.7 - Алгоритм модерации контента",
      steps: ["Начало", "Получение жалобы", "Проверка прав модератора", "Анализ контента", "Классификация нарушения", "Применение санкций", "Уведомление пользователя", "Логирование", "Конец"]
    },
    {
      title: "Рисунок 3.8 - Алгоритм управления файлами",
      steps: ["Начало", "Выбор операции", "Проверка разрешений", "Валидация файлов", "Операция с Storage", "Обновление метаданных", "Очистка временных файлов", "Конец"]
    },
    {
      title: "Рисунок 3.9 - Алгоритм обновления статистики",
      steps: ["Начало", "Сбор событий", "Агрегация данных", "Расчет метрик", "Обновление кэша", "Генерация отчетов", "Отправка уведомлений", "Конец"]
    },
    {
      title: "Рисунок 3.10 - Алгоритм восстановления пароля",
      steps: ["Начало", "Ввод email", "Проверка в БД", "Генерация токена", "Отправка письма", "Переход по ссылке", "Валидация токена", "Смена пароля", "Конец"]
    },
    {
      title: "Рисунок 3.11 - Алгоритм синхронизации данных",
      steps: ["Начало", "Проверка соединения", "Получение изменений", "Разрешение конфликтов", "Применение обновлений", "Валидация целостности", "Уведомление клиентов", "Конец"]
    },
    {
      title: "Рисунок 3.12 - Алгоритм обработки ошибок",
      steps: ["Начало", "Перехват ошибки", "Классификация типа", "Логирование", "Уведомление пользователя", "Попытка восстановления", "Эскалация при необходимости", "Конец"]
    }
  ];

  return (
    <div className="min-h-screen bg-white print:bg-white">
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            .no-print {
              display: none !important;
            }
            .print\\:shadow-none {
              box-shadow: none !important;
            }
            .print\\:border-2 {
              border: 2px solid #000 !important;
            }
            .print\\:break-inside-avoid {
              break-inside: avoid !important;
            }
            body {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            @page {
              margin: 2cm;
              size: A4;
            }
          }
        `
      }} />
      
      <div className="container mx-auto px-4 py-8 print:px-0 print:py-4">
        <div className="mb-6 no-print">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад
          </Button>
          <Button
            onClick={handlePrint}
            className="mb-4 ml-4"
          >
            <Download className="w-4 h-4 mr-2" />
            Экспорт в Word
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Техническая документация
          </h1>
          <p className="text-gray-600">
            Блок-схемы алгоритмов, структура приложения и спецификации классов
          </p>
        </div>

        <div className="print:text-center mb-8">
          <h1 className="text-2xl font-bold mb-4 print:text-3xl">
            ТЕХНИЧЕСКАЯ ДОКУМЕНТАЦИЯ
          </h1>
          <h2 className="text-xl font-semibold mb-6 print:text-2xl">
            Система управления играми на базе React + Supabase
          </h2>
        </div>

        {/* App Structure */}
        <AppStructureSphere />

        {/* Comprehensive Class Properties Table */}
        <ClassPropertiesTable 
          className="Приложения (User, Game, Comment, Rating, UI, Navigation)" 
          properties={comprehensiveProperties} 
        />

        {/* Comprehensive Class Events Table */}
        <ClassEventsTable 
          className="Приложения (Auth, Game, Rating, Comment, Navigation, Upload, UI)" 
          events={comprehensiveEvents} 
        />

        {/* Flowcharts */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6 print:text-center">
          БЛОК-СХЕМЫ АЛГОРИТМОВ СИСТЕМЫ
        </h2>
        
        <div className="space-y-6">
          {algorithms.map((algorithm, index) => (
            <FlowchartBlock key={index} {...algorithm} />
          ))}
        </div>

        <div className="mt-12 print:text-center">
          <h3 className="text-lg font-bold mb-4">
            АРХИТЕКТУРНЫЕ РЕШЕНИЯ
          </h3>
          <div className="text-sm space-y-2">
            <p><strong>Frontend:</strong> React 18 + TypeScript + Vite</p>
            <p><strong>UI Framework:</strong> Tailwind CSS + shadcn/ui</p>
            <p><strong>Backend:</strong> Supabase (PostgreSQL + Auth + Storage)</p>
            <p><strong>State Management:</strong> React Context + React Query</p>
            <p><strong>Routing:</strong> React Router DOM v6</p>
            <p><strong>Game Engine:</strong> Unity WebGL</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
