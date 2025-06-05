
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const Documentation = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Техническая документация</h1>
        <p className="text-lg text-muted-foreground mb-8 text-center">
          Полная техническая документация игрового портала с подробным описанием архитектуры, 
          функциональности и процессов разработки.
        </p>

        {/* Содержание */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Содержание</CardTitle>
          </CardHeader>
          <CardContent>
            <nav className="space-y-2">
              <button onClick={() => scrollToSection('overview')} className="block text-left hover:text-primary transition-colors">
                1. Обзор системы
              </button>
              <button onClick={() => scrollToSection('architecture')} className="block text-left hover:text-primary transition-colors ml-4">
                2.1 Архитектура приложения
              </button>
              <button onClick={() => scrollToSection('frontend')} className="block text-left hover:text-primary transition-colors ml-4">
                2.2 Frontend компоненты
              </button>
              <button onClick={() => scrollToSection('backend')} className="block text-left hover:text-primary transition-colors ml-4">
                2.3 Backend и API
              </button>
              <button onClick={() => scrollToSection('algorithms')} className="block text-left hover:text-primary transition-colors ml-4">
                2.4 Алгоритмы системы
              </button>
              <button onClick={() => scrollToSection('database-entities')} className="block text-left hover:text-primary transition-colors ml-4">
                2.5 Разработка сущностей базы данных
              </button>
              <button onClick={() => scrollToSection('security')} className="block text-left hover:text-primary transition-colors ml-4">
                2.6 Система безопасности
              </button>
              <button onClick={() => scrollToSection('api-connections')} className="block text-left hover:text-primary transition-colors ml-4">
                2.7 API и подключения
              </button>
              <button onClick={() => scrollToSection('testing')} className="block text-left hover:text-primary transition-colors ml-4">
                2.8 Отладка приложения
              </button>
              <button onClick={() => scrollToSection('installation')} className="block text-left hover:text-primary transition-colors ml-4">
                2.9 Инструкция по установке
              </button>
              <button onClick={() => scrollToSection('operation')} className="block text-left hover:text-primary transition-colors ml-4">
                2.10 Инструкция по эксплуатации
              </button>
              <button onClick={() => scrollToSection('admin-guide')} className="block text-left hover:text-primary transition-colors ml-4">
                2.11 Инструкция администратора
              </button>
              <button onClick={() => scrollToSection('server-architecture')} className="block text-left hover:text-primary transition-colors ml-4">
                2.12 Серверная архитектура
              </button>
            </nav>
          </CardContent>
        </Card>

        {/* 1. Обзор системы */}
        <section id="overview" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">1. Обзор системы</h2>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Назначение системы</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Игровой портал представляет собой современную веб-платформу для размещения, 
                демонстрации и управления браузерными играми. Система предоставляет 
                пользователям возможность загружать собственные игры, играть в игры других 
                разработчиков, оставлять отзывы и оценки.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Основные возможности:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Загрузка и публикация игр</li>
                    <li>Система рейтингов и комментариев</li>
                    <li>Административная панель</li>
                    <li>Адаптивный дизайн</li>
                    <li>Темная/светлая тема</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Технологический стек:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">React</Badge>
                    <Badge variant="secondary">TypeScript</Badge>
                    <Badge variant="secondary">Tailwind CSS</Badge>
                    <Badge variant="secondary">Supabase</Badge>
                    <Badge variant="secondary">Vite</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 2.1 Архитектура приложения */}
        <section id="architecture" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">2.1 Архитектура приложения</h2>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Общая архитектура</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-6 rounded-lg mb-4">
                <pre className="text-sm overflow-x-auto">
{`┌─────────────────────────────────────────┐
│             Frontend (React)             │
├─────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────────────┐│
│  │ Components  │  │    Contexts         ││
│  │ - UI        │  │ - Auth              ││
│  │ - Pages     │  │ - Game              ││
│  │ - Forms     │  │ - Rating            ││
│  └─────────────┘  └─────────────────────┘│
├─────────────────────────────────────────┤
│             API Layer                    │
│        (Supabase Client)                │
├─────────────────────────────────────────┤
│            Backend                       │
│         (Supabase)                      │
│  ┌─────────────────────────────────────┐ │
│  │        PostgreSQL Database          │ │
│  └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘`}
                </pre>
              </div>
              <p>
                Приложение построено по принципу клиент-серверной архитектуры с четким 
                разделением на frontend и backend части. Frontend реализован на React с 
                использованием современных практик разработки, backend основан на Supabase 
                с PostgreSQL базой данных.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* 2.2 Frontend компоненты */}
        <section id="frontend" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">2.2 Frontend компоненты</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Основные компоненты</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li><strong>Navbar:</strong> Навигационная панель</li>
                  <li><strong>GameCard:</strong> Карточка игры</li>
                  <li><strong>GameGrid:</strong> Сетка игр</li>
                  <li><strong>UnityPlayer:</strong> Плеер для Unity игр</li>
                  <li><strong>RatingComponent:</strong> Система оценок</li>
                  <li><strong>CommentSection:</strong> Секция комментариев</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Страницы</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li><strong>Index:</strong> Главная страница</li>
                  <li><strong>Games:</strong> Каталог игр</li>
                  <li><strong>GameDetails:</strong> Детали игры</li>
                  <li><strong>Play:</strong> Страница игры</li>
                  <li><strong>Dashboard:</strong> Панель управления</li>
                  <li><strong>Profile:</strong> Профиль пользователя</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Контекстная архитектура</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm">
{`// Пример использования контекста
const GameContext = createContext<GameContextType>({
  games: [],
  loading: false,
  fetchGames: () => {},
  addGame: () => {},
  updateGame: () => {},
  deleteGame: () => {}
});`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 2.3 Backend и API */}
        <section id="backend" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">2.3 Backend и API</h2>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Supabase Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Backend реализован на платформе Supabase, которая предоставляет:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-1">
                <li>PostgreSQL база данных с автоматическими API</li>
                <li>Аутентификация и авторизация пользователей</li>
                <li>Хранилище файлов для игр и изображений</li>
                <li>Real-time подписки на изменения данных</li>
                <li>Row Level Security (RLS) для безопасности</li>
              </ul>
              
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm">
{`// Пример API вызова
const { data: games, error } = await supabase
  .from('games')
  .select(\`
    *,
    profiles:author_id (username),
    ratings (score),
    comments (content, profiles(username))
  \`)
  .eq('featured', true);`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 2.4 Алгоритмы системы */}
        <section id="algorithms" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">2.4 Алгоритмы системы</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Алгоритм 1 */}
            <Card>
              <CardHeader>
                <CardTitle>1. Алгоритм аутентификации</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg text-sm">
                  <pre>
{`graph TD
    A[Начало] --> B[Ввод данных]
    B --> C{Проверка email}
    C -->|Валиден| D[Отправка в Supabase]
    C -->|Невалиден| E[Ошибка валидации]
    D --> F{Проверка пароля}
    F -->|Успех| G[Создание сессии]
    F -->|Ошибка| H[Ошибка входа]
    G --> I[Редирект на главную]
    E --> B
    H --> B
    I --> J[Конец]`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Алгоритм 2 */}
            <Card>
              <CardHeader>
                <CardTitle>2. Алгоритм загрузки игры</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg text-sm">
                  <pre>
{`graph TD
    A[Выбор файлов] --> B[Валидация формата]
    B --> C{ZIP файл?}
    C -->|Да| D[Извлечение файлов]
    C -->|Нет| E[Ошибка формата]
    D --> F[Поиск index.html]
    F --> G{Найден?}
    G -->|Да| H[Загрузка в Storage]
    G -->|Нет| I[Ошибка структуры]
    H --> J[Создание записи в БД]
    J --> K[Уведомление об успехе]`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Алгоритм 3 */}
            <Card>
              <CardHeader>
                <CardTitle>3. Алгоритм расчета рейтинга</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg text-sm">
                  <pre>
{`graph TD
    A[Новая оценка] --> B[Проверка авторизации]
    B --> C{Пользователь авторизован?}
    C -->|Нет| D[Ошибка доступа]
    C -->|Да| E[Проверка существующей оценки]
    E --> F{Оценка существует?}
    F -->|Да| G[Обновление оценки]
    F -->|Нет| H[Создание новой оценки]
    G --> I[Пересчет среднего]
    H --> I
    I --> J[Обновление в БД]`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Алгоритм 4 */}
            <Card>
              <CardHeader>
                <CardTitle>4. Алгоритм поиска игр</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg text-sm">
                  <pre>
{`graph TD
    A[Ввод поискового запроса] --> B[Нормализация текста]
    B --> C[Разбор на токены]
    C --> D[Поиск по названию]
    D --> E[Поиск по описанию]
    E --> F[Объединение результатов]
    F --> G[Сортировка по релевантности]
    G --> H[Применение фильтров]
    H --> I[Пагинация]
    I --> J[Возврат результатов]`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Алгоритм 5 */}
            <Card>
              <CardHeader>
                <CardTitle>5. Алгоритм модерации</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg text-sm">
                  <pre>
{`graph TD
    A[Загрузка контента] --> B[Автоматическая проверка]
    B --> C{Подозрительный контент?}
    C -->|Нет| D[Автоматическое одобрение]
    C -->|Да| E[Отправка на модерацию]
    E --> F[Уведомление модератора]
    F --> G{Решение модератора}
    G -->|Одобрить| H[Публикация]
    G -->|Отклонить| I[Уведомление автора]
    D --> H
    H --> J[Контент опубликован]`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Алгоритм 6 */}
            <Card>
              <CardHeader>
                <CardTitle>6. Алгоритм кэширования</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg text-sm">
                  <pre>
{`graph TD
    A[Запрос данных] --> B[Проверка кэша]
    B --> C{Данные в кэше?}
    C -->|Да| D{Данные актуальны?}
    C -->|Нет| E[Запрос к БД]
    D -->|Да| F[Возврат из кэша]
    D -->|Нет| E
    E --> G[Сохранение в кэш]
    G --> H[Возврат данных]
    F --> I[Конец]
    H --> I`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Алгоритм 7 */}
            <Card>
              <CardHeader>
                <CardTitle>7. Алгоритм уведомлений</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg text-sm">
                  <pre>
{`graph TD
    A[Событие в системе] --> B[Определение типа события]
    B --> C[Поиск подписчиков]
    C --> D{Есть подписчики?}
    D -->|Нет| E[Завершение]
    D -->|Да| F[Формирование уведомления]
    F --> G[Проверка настроек пользователя]
    G --> H{Уведомления включены?}
    H -->|Да| I[Отправка уведомления]
    H -->|Нет| J[Пропуск пользователя]
    I --> K[Логирование]
    J --> L[Следующий пользователь]`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Алгоритм 8 */}
            <Card>
              <CardHeader>
                <CardTitle>8. Алгоритм резервного копирования</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg text-sm">
                  <pre>
{`graph TD
    A[Запуск расписания] --> B[Проверка времени]
    B --> C{Время для бэкапа?}
    C -->|Нет| D[Ожидание]
    C -->|Да| E[Создание снимка БД]
    E --> F[Архивирование файлов]
    F --> G[Загрузка в облако]
    G --> H[Проверка целостности]
    H --> I{Бэкап успешен?}
    I -->|Да| J[Уведомление об успехе]
    I -->|Нет| K[Повторная попытка]
    D --> B
    J --> B`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Алгоритм 9 */}
            <Card>
              <CardHeader>
                <CardTitle>9. Алгоритм аналитики</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg text-sm">
                  <pre>
{`graph TD
    A[Событие пользователя] --> B[Сбор метрик]
    B --> C[Анонимизация данных]
    C --> D[Агрегация по периодам]
    D --> E[Расчет статистики]
    E --> F[Сохранение в аналитическую БД]
    F --> G[Обновление дашборда]
    G --> H[Проверка аномалий]
    H --> I{Аномалии найдены?}
    I -->|Да| J[Уведомление администратора]
    I -->|Нет| K[Завершение]`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Алгоритм 10 */}
            <Card>
              <CardHeader>
                <CardTitle>10. Алгоритм автоматического масштабирования</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg text-sm">
                  <pre>
{`graph TD
    A[Мониторинг нагрузки] --> B[Анализ метрик]
    B --> C{Высокая нагрузка?}
    C -->|Нет| D{Низкая нагрузка?}
    C -->|Да| E[Увеличение ресурсов]
    D -->|Да| F[Уменьшение ресурсов]
    D -->|Нет| G[Продолжение мониторинга]
    E --> H[Проверка лимитов]
    F --> I[Проверка минимумов]
    H --> J[Применение изменений]
    I --> J
    J --> K[Логирование действий]
    G --> A`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 2.5 Разработка сущностей базы данных */}
        <section id="database-entities" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">2.5 Разработка сущностей базы данных</h2>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Описание схемы базы данных</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                В результате тщательного изучения и анализа раздела "разработка схемы базы данных" 
                была успешно создана схема базы данных, которая является неотъемлемой частью 
                полноценной работы приложения. Для удобства, все сущности, необходимые для 
                правильного функционирования приложения, были компактно представлены в табличной форме. 
                Полный перечень сущностей данной схемы базы данных приведен в таблице 2.5.
              </p>
              
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                  <caption className="text-lg font-semibold mb-4">
                    Таблица 2.5 – Сущности схемы базы данных
                  </caption>
                  <thead>
                    <tr className="bg-muted">
                      <th className="border border-gray-300 px-4 py-2 text-left">Имя сущности</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Назначение сущности</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Типы данных</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Подчиненные сущности</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Родительские сущности</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">profiles</td>
                      <td className="border border-gray-300 px-4 py-2">Содержит данные о пользователях системы</td>
                      <td className="border border-gray-300 px-4 py-2">uuid, text, boolean, timestamp</td>
                      <td className="border border-gray-300 px-4 py-2">games, comments, ratings, favorites</td>
                      <td className="border border-gray-300 px-4 py-2">-</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">games</td>
                      <td className="border border-gray-300 px-4 py-2">Содержит информацию об играх</td>
                      <td className="border border-gray-300 px-4 py-2">uuid, text, integer, boolean, timestamp</td>
                      <td className="border border-gray-300 px-4 py-2">comments, ratings, favorites, game_tags</td>
                      <td className="border border-gray-300 px-4 py-2">profiles</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">comments</td>
                      <td className="border border-gray-300 px-4 py-2">Содержит комментарии к играм</td>
                      <td className="border border-gray-300 px-4 py-2">uuid, text, timestamp</td>
                      <td className="border border-gray-300 px-4 py-2">-</td>
                      <td className="border border-gray-300 px-4 py-2">profiles, games</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">ratings</td>
                      <td className="border border-gray-300 px-4 py-2">Содержит оценки игр пользователями</td>
                      <td className="border border-gray-300 px-4 py-2">uuid, integer, timestamp</td>
                      <td className="border border-gray-300 px-4 py-2">-</td>
                      <td className="border border-gray-300 px-4 py-2">profiles, games</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">favorites</td>
                      <td className="border border-gray-300 px-4 py-2">Содержит избранные игры пользователей</td>
                      <td className="border border-gray-300 px-4 py-2">uuid, timestamp</td>
                      <td className="border border-gray-300 px-4 py-2">-</td>
                      <td className="border border-gray-300 px-4 py-2">profiles, games</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">tags</td>
                      <td className="border border-gray-300 px-4 py-2">Содержит теги для категоризации игр</td>
                      <td className="border border-gray-300 px-4 py-2">uuid, text</td>
                      <td className="border border-gray-300 px-4 py-2">game_tags</td>
                      <td className="border border-gray-300 px-4 py-2">-</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">game_tags</td>
                      <td className="border border-gray-300 px-4 py-2">Связывает игры с тегами (многие-ко-многим)</td>
                      <td className="border border-gray-300 px-4 py-2">uuid</td>
                      <td className="border border-gray-300 px-4 py-2">-</td>
                      <td className="border border-gray-300 px-4 py-2">games, tags</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 2.6 Система безопасности */}
        <section id="security" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">2.6 Система безопасности</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Аутентификация и авторизация</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li>
                    <strong>JWT токены:</strong> Используются для безопасной передачи информации 
                    о пользователе между клиентом и сервером
                  </li>
                  <li>
                    <strong>Session управление:</strong> Автоматическое обновление токенов и 
                    управление сессиями через Supabase Auth
                  </li>
                  <li>
                    <strong>Роли пользователей:</strong> Система ролей включает обычных пользователей 
                    и администраторов с различными уровнями доступа
                  </li>
                  <li>
                    <strong>Защита паролей:</strong> Хеширование паролей с использованием 
                    современных алгоритмов шифрования
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Row Level Security (RLS)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3">
                  Все таблицы базы данных защищены политиками RLS, которые обеспечивают:
                </p>
                <ul className="space-y-2">
                  <li>• Доступ к данным только авторизованным пользователям</li>
                  <li>• Возможность редактирования только собственного контента</li>
                  <li>• Административный доступ для модераторов</li>
                  <li>• Защиту от SQL-инъекций на уровне базы данных</li>
                </ul>
                
                <div className="bg-muted p-3 rounded-lg mt-4">
                  <pre className="text-xs">
{`-- Пример RLS политики
CREATE POLICY "Users can view public profiles" 
ON profiles FOR SELECT 
USING (is_public = true OR auth.uid() = id);`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Защита данных</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <strong>Валидация входных данных:</strong> Проверка всех пользовательских 
                    вводов на клиентской и серверной стороне
                  </li>
                  <li>
                    <strong>Санитизация контента:</strong> Очистка пользовательского контента 
                    от потенциально опасных элементов
                  </li>
                  <li>
                    <strong>HTTPS шифрование:</strong> Все данные передаются по защищенному 
                    протоколу HTTPS
                  </li>
                  <li>
                    <strong>Backup и восстановление:</strong> Регулярное резервное копирование 
                    данных с возможностью восстановления
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Мониторинг безопасности</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Логирование всех критических операций</li>
                  <li>• Мониторинг подозрительной активности</li>
                  <li>• Автоматические уведомления о потенциальных угрозах</li>
                  <li>• Регулярные аудиты безопасности</li>
                  <li>• Защита от DDoS атак через Supabase Edge Functions</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 2.7 API и подключения */}
        <section id="api-connections" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">2.7 API и подключения</h2>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Supabase API интеграция</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Приложение использует Supabase как основной backend-сервис, который предоставляет 
                RESTful API и GraphQL интерфейсы для работы с данными. Все API вызовы осуществляются 
                через официальный Supabase JavaScript клиент.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-semibold mb-2">Основные эндпоинты:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• <code>/rest/v1/games</code> - Управление играми</li>
                    <li>• <code>/rest/v1/profiles</code> - Профили пользователей</li>
                    <li>• <code>/rest/v1/comments</code> - Система комментариев</li>
                    <li>• <code>/rest/v1/ratings</code> - Рейтинги и оценки</li>
                    <li>• <code>/storage/v1/object</code> - Файловое хранилище</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Методы аутентификации:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Bearer Token авторизация</li>
                    <li>• API Key для публичных запросов</li>
                    <li>• JWT токены для пользовательских сессий</li>
                    <li>• RLS политики для контроля доступа</li>
                  </ul>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Пример подключения:</h4>
                <pre className="text-sm">
{`import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://your-project.supabase.co'
const supabaseKey = 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true
  }
})`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Real-time подписки</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3">
                  Система поддерживает real-time обновления для:
                </p>
                <ul className="space-y-1 mb-4">
                  <li>• Новые комментарии к играм</li>
                  <li>• Обновления рейтингов</li>
                  <li>• Статус загрузки игр</li>
                  <li>• Уведомления пользователей</li>
                </ul>
                
                <div className="bg-muted p-3 rounded-lg">
                  <pre className="text-xs">
{`// Подписка на изменения
supabase
  .channel('comments')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'comments'
  }, (payload) => {
    console.log('New comment!', payload)
  })
  .subscribe()`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Обработка ошибок API</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3">
                  Система включает комплексную обработку ошибок:
                </p>
                <ul className="space-y-1 mb-4">
                  <li>• Автоматические повторные попытки</li>
                  <li>• Graceful degradation при недоступности API</li>
                  <li>• Пользовательские уведомления об ошибках</li>
                  <li>• Логирование ошибок для отладки</li>
                </ul>
                
                <div className="bg-muted p-3 rounded-lg">
                  <pre className="text-xs">
{`// Обработка ошибок
try {
  const { data, error } = await supabase
    .from('games').select('*')
  
  if (error) throw error
  return data
} catch (error) {
  console.error('API Error:', error)
  toast.error('Ошибка загрузки данных')
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 2.8 Отладка приложения */}
        <section id="testing" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">2.8 Отладка приложения</h2>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Методология тестирования</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Для тестирования применяется метод тестирования с использованием тест-кейсов. 
                Он позволяет проверить продукт без необходимости изучать всю документацию. 
                Создание удобного и поддерживаемого тест-кейса, который написан единожды, 
                помогает экономить время и усилия тестировщиков. Тест-кейс представляет собой 
                документ, который описывает набор шагов, определенные условия и параметры, 
                для проверки функциональности или ее части.
              </p>
              
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full border-collapse border border-gray-300">
                  <caption className="text-lg font-semibold mb-4">
                    Таблица 2.8.1 – Тест-кейс свойств компонентов
                  </caption>
                  <thead>
                    <tr className="bg-muted">
                      <th className="border border-gray-300 px-4 py-2 text-left">Название свойства</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Управляющее воздействие</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Результат воздействия</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">theme</td>
                      <td className="border border-gray-300 px-4 py-2">Переключить между светлой и тёмной темой</td>
                      <td className="border border-gray-300 px-4 py-2">Цвет интерфейса изменится согласно выбранной теме</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">searchQuery</td>
                      <td className="border border-gray-300 px-4 py-2">Ввести текст в строку поиска игр</td>
                      <td className="border border-gray-300 px-4 py-2">Список игр отфильтруется по введённому тексту</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">selectedCategory</td>
                      <td className="border border-gray-300 px-4 py-2">Выбрать определённую категорию игр</td>
                      <td className="border border-gray-300 px-4 py-2">На странице будут выведены только игры этой категории</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">favoriteGames</td>
                      <td className="border border-gray-300 px-4 py-2">Добавить игру в избранное</td>
                      <td className="border border-gray-300 px-4 py-2">Игра появится в списке избранных пользователя</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">userRating</td>
                      <td className="border border-gray-300 px-4 py-2">Поставить оценку игре (1-5 звёзд)</td>
                      <td className="border border-gray-300 px-4 py-2">Средний рейтинг игры пересчитается</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">userProfile</td>
                      <td className="border border-gray-300 px-4 py-2">Войти или выйти из аккаунта</td>
                      <td className="border border-gray-300 px-4 py-2">Интерфейс переключит состояние пользователя</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">gameUpload</td>
                      <td className="border border-gray-300 px-4 py-2">Загрузить ZIP файл с игрой</td>
                      <td className="border border-gray-300 px-4 py-2">Игра будет обработана и опубликована</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                  <caption className="text-lg font-semibold mb-4">
                    Таблица 2.8.2 – Тест-кейс для методов
                  </caption>
                  <thead>
                    <tr className="bg-muted">
                      <th className="border border-gray-300 px-4 py-2 text-left">Название метода</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Управляющее воздействие</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Результат воздействия</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">handleGameUpload</td>
                      <td className="border border-gray-300 px-4 py-2">Выбрать и загрузить файл игры</td>
                      <td className="border border-gray-300 px-4 py-2">Игра появится в каталоге после обработки</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">handleRatingSubmit</td>
                      <td className="border border-gray-300 px-4 py-2">Нажать на звёздочки рейтинга</td>
                      <td className="border border-gray-300 px-4 py-2">Оценка сохранится и отобразится</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">handleCommentSubmit</td>
                      <td className="border border-gray-300 px-4 py-2">Написать и отправить комментарий</td>
                      <td className="border border-gray-300 px-4 py-2">Комментарий появится под игрой</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">handleFavoriteToggle</td>
                      <td className="border border-gray-300 px-4 py-2">Нажать кнопку "Добавить в избранное"</td>
                      <td className="border border-gray-300 px-4 py-2">Игра добавится/удалится из избранного</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">handleAuthLogin</td>
                      <td className="border border-gray-300 px-4 py-2">Ввести логин/пароль и нажать "Войти"</td>
                      <td className="border border-gray-300 px-4 py-2">Пользователь будет авторизован</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">handleThemeToggle</td>
                      <td className="border border-gray-300 px-4 py-2">Нажать на иконку смены темы</td>
                      <td className="border border-gray-300 px-4 py-2">Интерфейс переключит светлую/тёмную тему</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">handleGameSearch</td>
                      <td className="border border-gray-300 px-4 py-2">Ввести поисковый запрос</td>
                      <td className="border border-gray-300 px-4 py-2">Список игр изменится согласно фильтру</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">handleGamePlay</td>
                      <td className="border border-gray-300 px-4 py-2">Нажать кнопку "Играть"</td>
                      <td className="border border-gray-300 px-4 py-2">Откроется страница с игрой</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 2.9 Инструкция по установке */}
        <section id="installation" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">2.9 Инструкция по установке приложения</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Системные требования</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Минимальные требования:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Node.js версии 18.0 или выше</li>
                      <li>• npm версии 8.0 или выше (или yarn/pnpm)</li>
                      <li>• 4 ГБ свободного места на диске</li>
                      <li>• Интернет-соединение для установки зависимостей</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Рекомендуемые требования:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Node.js версии 20.0 или выше</li>
                      <li>• 8 ГБ оперативной памяти</li>
                      <li>• SSD накопитель</li>
                      <li>• Современный браузер (Chrome, Firefox, Safari)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Предварительная настройка</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  <li>
                    <strong>1. Создание Supabase проекта:</strong>
                    <div className="ml-4 text-sm text-muted-foreground">
                      Зарегистрируйтесь на supabase.com и создайте новый проект
                    </div>
                  </li>
                  <li>
                    <strong>2. Настройка базы данных:</strong>
                    <div className="ml-4 text-sm text-muted-foreground">
                      Выполните SQL миграции из папки /database
                    </div>
                  </li>
                  <li>
                    <strong>3. Получение API ключей:</strong>
                    <div className="ml-4 text-sm text-muted-foreground">
                      Скопируйте URL проекта и анонимный ключ из настроек Supabase
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Пошаговая установка</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Шаг 1: Клонирование репозитория</h4>
                  <div className="bg-muted p-3 rounded-lg">
                    <pre className="text-sm">
{`git clone https://github.com/username/game-portal.git
cd game-portal`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Шаг 2: Установка зависимостей</h4>
                  <div className="bg-muted p-3 rounded-lg">
                    <pre className="text-sm">
{`npm install
# или
yarn install`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Шаг 3: Настройка переменных окружения</h4>
                  <div className="space-y-2">
                    <p className="text-sm">Создайте файл <code>.env.local</code> в корне проекта:</p>
                    <div className="bg-muted p-3 rounded-lg">
                      <pre className="text-sm">
{`VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Шаг 4: Запуск в режиме разработки</h4>
                  <div className="bg-muted p-3 rounded-lg">
                    <pre className="text-sm">
{`npm run dev
# или
yarn dev`}
                    </pre>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Приложение будет доступно по адресу http://localhost:5173
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Шаг 5: Сборка для продакшена</h4>
                  <div className="bg-muted p-3 rounded-lg">
                    <pre className="text-sm">
{`npm run build
npm run preview`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 2.10 Инструкция по эксплуатации */}
        <section id="operation" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">2.10 Инструкция по эксплуатации приложения</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Для обычных пользователей</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Регистрация и авторизация:</h4>
                    <ol className="list-decimal list-inside text-sm space-y-1">
                      <li>Нажмите кнопку "Войти" в правом верхнем углу</li>
                      <li>Выберите "Регистрация" если у вас нет аккаунта</li>
                      <li>Заполните все обязательные поля</li>
                      <li>Подтвердите email по ссылке из письма</li>
                    </ol>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Поиск и игра в игры:</h4>
                    <ol className="list-decimal list-inside text-sm space-y-1">
                      <li>Используйте поисковую строку для поиска игр</li>
                      <li>Применяйте фильтры по категориям</li>
                      <li>Нажмите на карточку игры для просмотра деталей</li>
                      <li>Нажмите "Играть" для запуска игры</li>
                    </ol>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Взаимодействие с контентом:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Ставьте оценки играм (1-5 звёзд)</li>
                      <li>Оставляйте комментарии и отзывы</li>
                      <li>Добавляйте игры в избранное</li>
                      <li>Делитесь играми с друзьями</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Для разработчиков игр</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Загрузка игры:</h4>
                    <ol className="list-decimal list-inside text-sm space-y-1">
                      <li>Перейдите в раздел "Загрузить игру"</li>
                      <li>Заполните информацию об игре</li>
                      <li>Загрузите ZIP архив с игрой</li>
                      <li>Дождитесь обработки и публикации</li>
                    </ol>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Требования к файлам:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Формат: ZIP архив</li>
                      <li>Обязательный файл: index.html в корне</li>
                      <li>Максимальный размер: 100 МБ</li>
                      <li>Поддерживаемые технологии: HTML5, Unity WebGL</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Управление играми:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Редактирование описания и метаданных</li>
                      <li>Обновление версий игры</li>
                      <li>Просмотр статистики и аналитики</li>
                      <li>Модерация комментариев</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Устранение неполадок</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Частые проблемы:</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Игра не загружается:</strong>
                      <ul className="list-disc list-inside ml-4 text-muted-foreground">
                        <li>Проверьте интернет-соединение</li>
                        <li>Очистите кэш браузера</li>
                        <li>Попробуйте другой браузер</li>
                      </ul>
                    </div>
                    <div>
                      <strong>Ошибка при загрузке файла:</strong>
                      <ul className="list-disc list-inside ml-4 text-muted-foreground">
                        <li>Проверьте размер файла (&lt;100 МБ)</li>
                        <li>Убедитесь в наличии index.html</li>
                        <li>Проверьте формат архива (ZIP)</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Контакты поддержки:</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Email:</strong> support@gameportal.com</p>
                    <p><strong>Telegram:</strong> @gameportal_support</p>
                    <p><strong>Часы работы:</strong> Пн-Пт 9:00-18:00 (МСК)</p>
                    <p><strong>FAQ:</strong> Раздел "Помощь" на сайте</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 2.11 Инструкция администратора */}
        <section id="admin-guide" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">2.11 Инструкция администратора базы данных</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Административные функции</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Управление пользователями:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Просмотр списка всех пользователей</li>
                      <li>Блокировка/разблокировка аккаунтов</li>
                      <li>Назначение ролей администратора</li>
                      <li>Просмотр статистики активности</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Модерация контента:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Проверка загружаемых игр</li>
                      <li>Удаление неподходящего контента</li>
                      <li>Модерация комментариев</li>
                      <li>Управление жалобами пользователей</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Мониторинг системы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Аналитика и метрики:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Количество активных пользователей</li>
                      <li>Статистика загрузок игр</li>
                      <li>Популярность контента</li>
                      <li>Производительность системы</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Техническое обслуживание:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Резервное копирование данных</li>
                      <li>Мониторинг места на диске</li>
                      <li>Обновление системных компонентов</li>
                      <li>Настройка безопасности</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Работа с базой данных</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Резервное копирование:</h4>
                  <div className="bg-muted p-3 rounded-lg">
                    <pre className="text-sm">
{`# Создание резервной копии
pg_dump -h localhost -U postgres -d gameportal > backup_$(date +%Y%m%d).sql

# Восстановление из резервной копии
psql -h localhost -U postgres -d gameportal < backup_20240605.sql`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Мониторинг производительности:</h4>
                  <div className="bg-muted p-3 rounded-lg">
                    <pre className="text-sm">
{`-- Проверка активных соединений
SELECT count(*) FROM pg_stat_activity;

-- Анализ медленных запросов
SELECT query, mean_exec_time, calls 
FROM pg_stat_statements 
ORDER BY mean_exec_time DESC LIMIT 10;`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Очистка данных:</h4>
                  <div className="bg-muted p-3 rounded-lg">
                    <pre className="text-sm">
{`-- Удаление старых логов (старше 30 дней)
DELETE FROM logs WHERE created_at < NOW() - INTERVAL '30 days';

-- Очистка временных файлов
DELETE FROM temp_uploads WHERE created_at < NOW() - INTERVAL '1 day';`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Безопасность и аудит</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Настройки безопасности:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Регулярная смена паролей администраторов</li>
                    <li>• Настройка firewall и ограничения доступа</li>
                    <li>• Мониторинг подозрительной активности</li>
                    <li>• Обновление системы безопасности</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Журналирование:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Логи входов администраторов</li>
                    <li>• История изменений в базе данных</li>
                    <li>• Отчёты о модерации контента</li>
                    <li>• Аудит безопасности системы</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 2.12 Серверная архитектура */}
        <section id="server-architecture" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">2.12 Серверная архитектура</h2>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Описание серверной архитектуры</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Серверная архитектура игрового портала построена на основе современной облачной 
                платформы Supabase, которая обеспечивает высокую производительность, масштабируемость 
                и надёжность системы. Архитектура следует принципам микросервисов и обеспечивает 
                горизонтальное масштабирование при росте нагрузки.
              </p>
              
              <div className="bg-muted p-6 rounded-lg mb-6">
                <pre className="text-sm overflow-x-auto">
{`                     ┌─────────────────────────────────────┐
                     │            Load Balancer            │
                     │         (Cloudflare CDN)           │
                     └─────────────────┬───────────────────┘
                                       │
                     ┌─────────────────┴───────────────────┐
                     │          Supabase Platform          │
                     ├─────────────────────────────────────┤
                     │  ┌─────────────┐ ┌─────────────────┐│
                     │  │    Auth     │ │   Edge Functions││
                     │  │   Service   │ │   (Serverless)  ││
                     │  └─────────────┘ └─────────────────┘│
                     │  ┌─────────────┐ ┌─────────────────┐│
                     │  │   Storage   │ │    Real-time    ││
                     │  │   (Files)   │ │   Subscriptions ││
                     │  └─────────────┘ └─────────────────┘│
                     │  ┌─────────────────────────────────┐ │
                     │  │        PostgreSQL DB           │ │
                     │  │     (Primary + Replicas)       │ │
                     │  └─────────────────────────────────┘ │
                     └─────────────────────────────────────┘`}
                </pre>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Основные компоненты:</h4>
                  <ul className="space-y-2 text-sm">
                    <li><strong>PostgreSQL Database:</strong> Основная база данных с репликацией</li>
                    <li><strong>Auth Service:</strong> Микросервис аутентификации и авторизации</li>
                    <li><strong>Storage Service:</strong> Файловое хранилище для игр и медиа</li>
                    <li><strong>Edge Functions:</strong> Serverless функции для бизнес-логики</li>
                    <li><strong>Real-time Engine:</strong> WebSocket подключения для real-time обновлений</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Технические характеристики:</h4>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Доступность:</strong> 99.9% uptime SLA</li>
                    <li><strong>Масштабируемость:</strong> Автоматическое горизонтальное масштабирование</li>
                    <li><strong>Репликация:</strong> Multi-region реплики для высокой доступности</li>
                    <li><strong>Backup:</strong> Ежедневные автоматические резервные копии</li>
                    <li><strong>Мониторинг:</strong> 24/7 мониторинг производительности</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Производительность и оптимизация</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Кэширование:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Redis кэш для часто запрашиваемых данных</li>
                      <li>CDN кэширование статических ресурсов</li>
                      <li>Browser кэширование на клиентской стороне</li>
                      <li>Query результаты кэшируются на 5-15 минут</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Оптимизация базы данных:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Индексирование часто используемых полей</li>
                      <li>Партиционирование больших таблиц</li>
                      <li>Connection pooling для эффективного использования соединений</li>
                      <li>Автоматическая оптимизация запросов</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Безопасность и мониторинг</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Защита на уровне сервера:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>WAF (Web Application Firewall) защита</li>
                      <li>DDoS защита через Cloudflare</li>
                      <li>SSL/TLS шифрование всего трафика</li>
                      <li>Rate limiting для предотвращения злоупотреблений</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Мониторинг и алерты:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Real-time мониторинг производительности</li>
                      <li>Автоматические уведомления об ошибках</li>
                      <li>Анализ логов и трендов использования</li>
                      <li>Интеграция с системами оповещения</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-8" />
        
        <div className="text-center text-muted-foreground">
          <p>© 2024 Игровой портал. Техническая документация версия 1.0</p>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
