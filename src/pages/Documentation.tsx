import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Documentation = () => {
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const MathematicalModel = () => (
    <Card className="mb-8 print:shadow-none print:border-2">
      <CardHeader>
        <CardTitle className="text-xl font-bold">2.1 Математическая модель системы управления играми</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm leading-6">
        <p>
          Система демонстрации игр представляет собой веб-платформу для загрузки, хранения и воспроизведения Unity WebGL игр. 
          Основные компоненты системы включают модуль аутентификации пользователей, файловую систему для хранения игровых ассетов, 
          базу данных метаинформации и Unity WebGL плеер для воспроизведения игр.
        </p>
        
        <div className="space-y-3">
          <h4 className="font-semibold">Математическое описание основных процессов:</h4>
          
          <div className="pl-4 space-y-2">
            <p><strong>1. Процесс загрузки игры:</strong></p>
            <p className="pl-4">
              G = f(F<sub>wasm</sub>, F<sub>data</sub>, F<sub>framework</sub>, F<sub>loader</sub>, M)
            </p>
            <p className="pl-4 text-xs">
              где G - готовая к запуску игра, F - файлы компонентов Unity, M - метаданные
            </p>
            
            <p><strong>2. Система рейтингов:</strong></p>
            <p className="pl-4">
              R<sub>avg</sub> = (Σ R<sub>i</sub>) / n, где i ∈ [1, n]
            </p>
            <p className="pl-4 text-xs">
              где R<sub>avg</sub> - средний рейтинг, R<sub>i</sub> - индивидуальная оценка, n - количество оценок
            </p>
            
            <p><strong>3. Алгоритм поиска:</strong></p>
            <p className="pl-4">
              S = {`{g ∈ G | (title(g) ⊇ query) ∨ (tags(g) ∩ query ≠ ∅)}`}
            </p>
            <p className="pl-4 text-xs">
              где S - результат поиска, G - множество всех игр, query - поисковый запрос
            </p>
          </div>
        </div>
        
        <p>
          Основная сложность системы заключается в обеспечении совместимости различных версий Unity WebGL сборок, 
          управлении большими файлами игр (до 100MB+) и обеспечении плавного воспроизведения в веб-браузере. 
          Система должна автоматически определять тип загружаемых файлов и корректно инициализировать Unity движок.
        </p>
      </CardContent>
    </Card>
  );

  const BlackSphereBasic = () => (
    <Card className="mb-8 print:shadow-none print:border-2">
      <CardHeader>
        <CardTitle className="text-lg font-bold">Рисунок 2.1 - Модель «Черная сфера»</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center min-h-64 relative">
          <div className="w-48 h-48 bg-black rounded-full flex items-center justify-center text-white font-bold text-sm relative">
            <div className="text-center">
              Система<br/>демонстрации<br/>игр
            </div>
            
            {/* Input arrows */}
            <div className="absolute -left-32 top-1/2 transform -translate-y-1/2 text-black text-xs">
              <div className="flex items-center">
                <span className="mr-2">Файлы Unity WebGL</span>
                <div className="w-8 h-0.5 bg-black"></div>
                <div className="w-0 h-0 border-l-8 border-l-black border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
              </div>
            </div>
            
            <div className="absolute -left-32 top-1/3 transform -translate-y-1/2 text-black text-xs">
              <div className="flex items-center">
                <span className="mr-2">Пользовательский ввод</span>
                <div className="w-8 h-0.5 bg-black"></div>
                <div className="w-0 h-0 border-l-8 border-l-black border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
              </div>
            </div>
            
            <div className="absolute -left-32 bottom-1/3 transform translate-y-1/2 text-black text-xs">
              <div className="flex items-center">
                <span className="mr-2">Метаданные игр</span>
                <div className="w-8 h-0.5 bg-black"></div>
                <div className="w-0 h-0 border-l-8 border-l-black border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
              </div>
            </div>
            
            {/* Output arrows */}
            <div className="absolute -right-32 top-1/2 transform -translate-y-1/2 text-black text-xs">
              <div className="flex items-center">
                <div className="w-0 h-0 border-r-8 border-r-black border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                <div className="w-8 h-0.5 bg-black"></div>
                <span className="ml-2">Готовая игра</span>
              </div>
            </div>
            
            <div className="absolute -right-32 top-1/3 transform -translate-y-1/2 text-black text-xs">
              <div className="flex items-center">
                <div className="w-0 h-0 border-r-8 border-r-black border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                <div className="w-8 h-0.5 bg-black"></div>
                <span className="ml-2">Интерфейс пользователя</span>
              </div>
            </div>
            
            <div className="absolute -right-32 bottom-1/3 transform translate-y-1/2 text-black text-xs">
              <div className="flex items-center">
                <div className="w-0 h-0 border-r-8 border-r-black border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                <div className="w-8 h-0.5 bg-black"></div>
                <span className="ml-2">Уведомления</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const BlackSphereDetailed = () => (
    <Card className="mb-8 print:shadow-none print:border-2">
      <CardHeader>
        <CardTitle className="text-lg font-bold">Рисунок 2.2 - Черная сфера с параметрами</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center min-h-80 relative">
          <div className="w-56 h-56 bg-black rounded-full flex items-center justify-center text-white font-bold text-sm relative">
            <div className="text-center">
              Система<br/>демонстрации<br/>игр
            </div>
            
            {/* Detailed inputs */}
            <div className="absolute -left-40 top-12 text-black text-xs">
              <div className="flex items-center mb-1">
                <span className="mr-2">game.wasm</span>
                <div className="w-6 h-0.5 bg-black"></div>
                <div className="w-0 h-0 border-l-6 border-l-black border-t-3 border-t-transparent border-b-3 border-b-transparent"></div>
              </div>
            </div>
            
            <div className="absolute -left-40 top-20 text-black text-xs">
              <div className="flex items-center mb-1">
                <span className="mr-2">game.data</span>
                <div className="w-6 h-0.5 bg-black"></div>
                <div className="w-0 h-0 border-l-6 border-l-black border-t-3 border-t-transparent border-b-3 border-b-transparent"></div>
              </div>
            </div>
            
            <div className="absolute -left-40 top-28 text-black text-xs">
              <div className="flex items-center mb-1">
                <span className="mr-2">game.framework.js</span>
                <div className="w-6 h-0.5 bg-black"></div>
                <div className="w-0 h-0 border-l-6 border-l-black border-t-3 border-t-transparent border-b-3 border-b-transparent"></div>
              </div>
            </div>
            
            <div className="absolute -left-40 top-36 text-black text-xs">
              <div className="flex items-center mb-1">
                <span className="mr-2">game.loader.js</span>
                <div className="w-6 h-0.5 bg-black"></div>
                <div className="w-0 h-0 border-l-6 border-l-black border-t-3 border-t-transparent border-b-3 border-b-transparent"></div>
              </div>
            </div>
            
            <div className="absolute -left-40 bottom-20 text-black text-xs">
              <div className="flex items-center mb-1">
                <span className="mr-2">user.actions</span>
                <div className="w-6 h-0.5 bg-black"></div>
                <div className="w-0 h-0 border-l-6 border-l-black border-t-3 border-t-transparent border-b-3 border-b-transparent"></div>
              </div>
            </div>
            
            <div className="absolute -left-40 bottom-12 text-black text-xs">
              <div className="flex items-center mb-1">
                <span className="mr-2">metadata</span>
                <div className="w-6 h-0.5 bg-black"></div>
                <div className="w-0 h-0 border-l-6 border-l-black border-t-3 border-t-transparent border-b-3 border-b-transparent"></div>
              </div>
            </div>
            
            {/* Detailed outputs */}
            <div className="absolute -right-40 top-16 text-black text-xs">
              <div className="flex items-center mb-1">
                <div className="w-0 h-0 border-r-6 border-r-black border-t-3 border-t-transparent border-b-3 border-b-transparent"></div>
                <div className="w-6 h-0.5 bg-black"></div>
                <span className="ml-2">Unity Canvas</span>
              </div>
            </div>
            
            <div className="absolute -right-40 top-24 text-black text-xs">
              <div className="flex items-center mb-1">
                <div className="w-0 h-0 border-r-6 border-r-black border-t-3 border-t-transparent border-b-3 border-b-transparent"></div>
                <div className="w-6 h-0.5 bg-black"></div>
                <span className="ml-2">Game Controls</span>
              </div>
            </div>
            
            <div className="absolute -right-40 top-32 text-black text-xs">
              <div className="flex items-center mb-1">
                <div className="w-0 h-0 border-r-6 border-r-black border-t-3 border-t-transparent border-b-3 border-b-transparent"></div>
                <div className="w-6 h-0.5 bg-black"></div>
                <span className="ml-2">Loading Progress</span>
              </div>
            </div>
            
            <div className="absolute -right-40 bottom-24 text-black text-xs">
              <div className="flex items-center mb-1">
                <div className="w-0 h-0 border-r-6 border-r-black border-t-3 border-t-transparent border-b-3 border-b-transparent"></div>
                <div className="w-6 h-0.5 bg-black"></div>
                <span className="ml-2">Error Messages</span>
              </div>
            </div>
            
            <div className="absolute -right-40 bottom-16 text-black text-xs">
              <div className="flex items-center mb-1">
                <div className="w-0 h-0 border-r-6 border-r-black border-t-3 border-t-transparent border-b-3 border-b-transparent"></div>
                <div className="w-6 h-0.5 bg-black"></div>
                <span className="ml-2">Game State</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const DecompositionFirst = () => (
    <Card className="mb-8 print:shadow-none print:border-2">
      <CardHeader>
        <CardTitle className="text-lg font-bold">Рисунок 2.3 - Декомпозиция первого этапа</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center min-h-96">
          <div className="grid grid-cols-4 gap-8 items-center">
            {/* Inputs */}
            <div className="space-y-4">
              <div className="w-24 h-16 border-2 border-gray-600 rounded bg-blue-100 flex items-center justify-center text-xs font-medium text-center p-1">
                Unity файлы
              </div>
              <div className="w-24 h-16 border-2 border-gray-600 rounded bg-green-100 flex items-center justify-center text-xs font-medium text-center p-1">
                Пользователь-ский ввод
              </div>
              <div className="w-24 h-16 border-2 border-gray-600 rounded bg-yellow-100 flex items-center justify-center text-xs font-medium text-center p-1">
                Метаданные
              </div>
            </div>
            
            {/* Processing modules */}
            <div className="space-y-4">
              <div className="w-24 h-16 border-2 border-gray-800 rounded bg-gray-200 flex items-center justify-center text-xs font-medium text-center p-1">
                Валидация файлов
              </div>
              <div className="w-24 h-16 border-2 border-gray-800 rounded bg-gray-200 flex items-center justify-center text-xs font-medium text-center p-1">
                Обработка событий
              </div>
              <div className="w-24 h-16 border-2 border-gray-800 rounded bg-gray-200 flex items-center justify-center text-xs font-medium text-center p-1">
                Управление состоянием
              </div>
            </div>
            
            {/* Core processing */}
            <div className="flex justify-center">
              <div className="w-32 h-32 bg-black rounded-full flex items-center justify-center text-white font-bold text-xs text-center">
                Unity WebGL<br/>Engine<br/>Integration
              </div>
            </div>
            
            {/* Outputs */}
            <div className="space-y-4">
              <div className="w-24 h-16 border-2 border-gray-600 rounded bg-purple-100 flex items-center justify-center text-xs font-medium text-center p-1">
                Игровой Canvas
              </div>
              <div className="w-24 h-16 border-2 border-gray-600 rounded bg-orange-100 flex items-center justify-center text-xs font-medium text-center p-1">
                UI компоненты
              </div>
              <div className="w-24 h-16 border-2 border-gray-600 rounded bg-red-100 flex items-center justify-center text-xs font-medium text-center p-1">
                Обратная связь
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const DecompositionSecond = () => (
    <Card className="mb-8 print:shadow-none print:border-2 print:break-inside-avoid">
      <CardHeader>
        <CardTitle className="text-lg font-bold">Рисунок 2.4 - Результат второго этапа декомпозиции</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Authentication Layer */}
          <div className="border-2 border-blue-300 rounded-lg p-4 bg-blue-50">
            <h4 className="font-semibold text-center mb-3 text-blue-800">Слой аутентификации</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="w-20 h-12 border border-blue-400 rounded bg-white flex items-center justify-center text-xs text-center p-1">
                Login Form
              </div>
              <div className="w-20 h-12 border border-blue-400 rounded bg-white flex items-center justify-center text-xs text-center p-1">
                JWT Tokens
              </div>
              <div className="w-20 h-12 border border-blue-400 rounded bg-white flex items-center justify-center text-xs text-center p-1">
                User Context
              </div>
            </div>
          </div>
          
          {/* File Management Layer */}
          <div className="border-2 border-green-300 rounded-lg p-4 bg-green-50">
            <h4 className="font-semibold text-center mb-3 text-green-800">Слой управления файлами</h4>
            <div className="grid grid-cols-4 gap-2">
              <div className="w-18 h-12 border border-green-400 rounded bg-white flex items-center justify-center text-xs text-center p-1">
                File Upload
              </div>
              <div className="w-18 h-12 border border-green-400 rounded bg-white flex items-center justify-center text-xs text-center p-1">
                Validation
              </div>
              <div className="w-18 h-12 border border-green-400 rounded bg-white flex items-center justify-center text-xs text-center p-1">
                Storage
              </div>
              <div className="w-18 h-12 border border-green-400 rounded bg-white flex items-center justify-center text-xs text-center p-1">
                Metadata
              </div>
            </div>
          </div>
          
          {/* Unity Integration Layer */}
          <div className="border-2 border-purple-300 rounded-lg p-4 bg-purple-50">
            <h4 className="font-semibold text-center mb-3 text-purple-800">Слой интеграции Unity</h4>
            <div className="grid grid-cols-5 gap-2">
              <div className="w-16 h-12 border border-purple-400 rounded bg-white flex items-center justify-center text-xs text-center p-1">
                Loader Init
              </div>
              <div className="w-16 h-12 border border-purple-400 rounded bg-white flex items-center justify-center text-xs text-center p-1">
                Canvas Create
              </div>
              <div className="w-16 h-12 border border-purple-400 rounded bg-white flex items-center justify-center text-xs text-center p-1">
                Instance Mgmt
              </div>
              <div className="w-16 h-12 border border-purple-400 rounded bg-white flex items-center justify-center text-xs text-center p-1">
                Event Handle
              </div>
              <div className="w-16 h-12 border border-purple-400 rounded bg-white flex items-center justify-center text-xs text-center p-1">
                Cleanup
              </div>
            </div>
          </div>
          
          {/* UI Layer */}
          <div className="border-2 border-orange-300 rounded-lg p-4 bg-orange-50">
            <h4 className="font-semibold text-center mb-3 text-orange-800">Слой пользовательского интерфейса</h4>
            <div className="grid grid-cols-4 gap-2">
              <div className="w-18 h-12 border border-orange-400 rounded bg-white flex items-center justify-center text-xs text-center p-1">
                Game Cards
              </div>
              <div className="w-18 h-12 border border-orange-400 rounded bg-white flex items-center justify-center text-xs text-center p-1">
                Controls
              </div>
              <div className="w-18 h-12 border border-orange-400 rounded bg-white flex items-center justify-center text-xs text-center p-1">
                Feedback
              </div>
              <div className="w-18 h-12 border border-orange-400 rounded bg-white flex items-center justify-center text-xs text-center p-1">
                Navigation
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const GraphicalInterface = () => (
    <Card className="mb-8 print:shadow-none print:border-2">
      <CardHeader>
        <CardTitle className="text-xl font-bold">2.3 Разработка графического интерфейса компонента</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm leading-6">
        <p>
          Графический интерфейс системы демонстрации игр построен на основе современных веб-технологий 
          с использованием React framework и библиотеки компонентов Shadcn/UI. Система использует 
          адаптивный дизайн на базе Tailwind CSS для обеспечения корректного отображения на различных устройствах.
        </p>
        
        <div className="space-y-3">
          <h4 className="font-semibold">Основные компоненты интерфейса:</h4>
          
          <div className="pl-4 space-y-2">
            <p><strong>1. Главная страница (Index):</strong></p>
            <p className="pl-4">
              - Hero-секция с призывом к действию<br/>
              - Блок рекомендуемых игр с анимированным появлением<br/>
              - Информационные карточки о возможностях платформы<br/>
              - Навигационное меню с темной/светлой темой
            </p>
            
            <p><strong>2. Unity Player компонент:</strong></p>
            <p className="pl-4">
              - Canvas для отображения Unity игры<br/>
              - Кнопка запуска игры с loading анимацией<br/>
              - Прогресс-бар загрузки файлов<br/>
              - Кнопки управления: полный экран, перезагрузка<br/>
              - Обработка ошибок с информативными сообщениями
            </p>
            
            <p><strong>3. Сетка игр (GameGrid):</strong></p>
            <p className="pl-4">
              - Адаптивная сетка: 1 колонка (мобильные) → 2-3 колонки (планшеты) → 4 колонки (десктоп)<br/>
              - Карточки игр с hover-эффектами и анимациями масштабирования<br/>
              - Система тегов с цветовой индикацией<br/>
              - Плавные переходы между состояниями
            </p>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-semibold">Технические особенности реализации:</h4>
          
          <div className="pl-4 space-y-2">
            <p><strong>CSS Framework:</strong> Tailwind CSS с кастомными анимациями</p>
            <p><strong>Компонентная библиотека:</strong> Shadcn/UI для консистентного дизайна</p>
            <p><strong>Анимации:</strong> CSS transitions и keyframes для плавных переходов</p>
            <p><strong>Адаптивность:</strong> Mobile-first подход с breakpoints</p>
            <p><strong>Доступность:</strong> ARIA-labels, семантическая разметка, клавиатурная навигация</p>
          </div>
        </div>
        
        <p>
          Интерфейс спроектирован с учетом принципов Material Design и обеспечивает интуитивное 
          взаимодействие пользователя с системой. Все интерактивные элементы имеют визуальную 
          обратную связь, а критичные действия сопровождаются подтверждающими диалогами.
        </p>
      </CardContent>
    </Card>
  );

  const MermaidBlock = ({ title, diagram, description }: { title: string, diagram: string, description: string }) => (
    <Card className="mb-8 print:shadow-none print:border-2 print:break-inside-avoid">
      <CardHeader>
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => copyToClipboard(diagram)}
          className="ml-auto no-print"
        >
          <Copy className="w-4 h-4 mr-2" />
          Копировать код
        </Button>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
          <pre>{diagram}</pre>
        </div>
        <p className="text-sm text-gray-700">{description}</p>
      </CardContent>
    </Card>
  );

  const AlgorithmDevelopment = () => {
    const algorithms = [
      {
        title: "Рисунок 2.5 - Алгоритм инициализации Unity игры",
        diagram: `graph TD
    A[Начало] --> B[Проверка поддержки WebGL]
    B -->|Поддерживается| C[Загрузка Unity Loader]
    B -->|Не поддерживается| Z[Ошибка: WebGL не поддерживается]
    C --> D[Создание Canvas элемента]
    D --> E[Установка размеров Canvas]
    E --> F[Инициализация Unity Instance]
    F -->|Успешно| G[Загрузка игровых ассетов]
    F -->|Ошибка| Y[Обработка ошибки инициализации]
    G --> H[Отображение прогресса загрузки]
    H --> I[Проверка завершения загрузки]
    I -->|Загружено| J[Запуск игрового цикла]
    I -->|В процессе| H
    J --> K[Активация игровых контролов]
    K --> L[Конец]
    Y --> L
    Z --> L`,
        description: "Алгоритм инициализации Unity игры включает проверку совместимости браузера, создание игрового Canvas, загрузку необходимых ресурсов и запуск игрового движка."
      },
      {
        title: "Рисунок 2.6 - Алгоритм аутентификации пользователя",
        diagram: `graph TD
    A[Начало] --> B[Ввод email и пароля]
    B --> C[Валидация формы]
    C -->|Невалидно| D[Отображение ошибок валидации]
    D --> B
    C -->|Валидно| E[Отправка запроса на Supabase Auth]
    E --> F[Проверка учетных данных]
    F -->|Неверные данные| G[Ошибка аутентификации]
    F -->|Корректные данные| H[Получение JWT токена]
    H --> I[Сохранение токена в localStorage]
    I --> J[Обновление состояния пользователя]
    J --> K[Загрузка профиля пользователя]
    K --> L[Редирект в личный кабинет]
    L --> M[Конец]
    G --> N[Отображение ошибки]
    N --> B`,
        description: "Алгоритм аутентификации обеспечивает безопасный вход пользователей через Supabase Auth с валидацией данных и управлением сессиями."
      },
      {
        title: "Рисунок 2.7 - Алгоритм загрузки игры разработчиком",
        diagram: `graph TD
    A[Начало] --> B[Проверка авторизации]
    B -->|Не авторизован| C[Редирект на страницу входа]
    B -->|Авторизован| D[Выбор Unity файлов]
    D --> E[Валидация типов файлов]
    E -->|Невалидные файлы| F[Ошибка: неподдерживаемый формат]
    E -->|Валидные файлы| G[Проверка размера файлов]
    G -->|Превышен лимит| H[Ошибка: файл слишком большой]
    G -->|Размер OK| I[Заполнение метаданных]
    I --> J[Валидация метаданных]
    J -->|Невалидно| K[Ошибка в метаданных]
    J -->|Валидно| L[Загрузка в Supabase Storage]
    L --> M[Создание записи в БД]
    M --> N[Генерация превью игры]
    N --> O[Публикация игры]
    O --> P[Конец]
    C --> P
    F --> P
    H --> P
    K --> P`,
        description: "Алгоритм загрузки игры включает валидацию файлов, проверку прав доступа, сохранение в облачном хранилище и создание метаданных."
      },
      {
        title: "Рисунок 2.8 - Алгоритм системы комментариев",
        diagram: `graph TD
    A[Начало] --> B[Проверка авторизации]
    B -->|Не авторизован| C[Запрос авторизации]
    B -->|Авторизован| D[Ввод текста комментария]
    D --> E[Валидация контента]
    E -->|Пустой текст| F[Ошибка: комментарий не может быть пустым]
    E -->|Слишком длинный| G[Ошибка: превышен лимит символов]
    E -->|Валидно| H[Проверка на спам]
    H -->|Обнаружен спам| I[Блокировка комментария]
    H -->|Не спам| J[Сохранение в БД]
    J --> K[Обновление счетчика комментариев]
    K --> L[Обновление списка комментариев]
    L --> M[Уведомление автора игры]
    M --> N[Конец]
    C --> N
    F --> D
    G --> D
    I --> N`,
        description: "Система комментариев включает проверку авторизации, валидацию контента, защиту от спама и уведомления."
      },
      {
        title: "Рисунок 2.9 - Алгоритм системы рейтингов",
        diagram: `graph TD
    A[Начало] --> B[Проверка авторизации]
    B -->|Не авторизован| C[Запрос авторизации]
    B -->|Авторизован| D[Выбор оценки 1-5 звезд]
    D --> E[Валидация оценки]
    E -->|Невалидная оценка| F[Ошибка: недопустимое значение]
    E -->|Валидная оценка| G[Проверка предыдущих оценок]
    G -->|Есть оценка| H[Обновление существующего рейтинга]
    G -->|Нет оценки| I[Создание нового рейтинга]
    H --> J[Пересчет среднего балла]
    I --> J
    J --> K[Обновление в БД]
    K --> L[Обновление UI с новым рейтингом]
    L --> M[Конец]
    C --> M
    F --> D`,
        description: "Система рейтингов позволяет пользователям оценивать игры по 5-бальной шкале с автоматическим пересчетом среднего балла."
      },
      {
        title: "Рисунок 2.10 - Алгоритм поиска игр",
        diagram: `graph TD
    A[Начало] --> B[Ввод поискового запроса]
    B --> C[Нормализация запроса]
    C --> D[Анализ ключевых слов]
    D --> E[Поиск по названию игры]
    E --> F[Поиск по описанию]
    F --> G[Поиск по тегам]
    G --> H[Объединение результатов]
    H --> I[Удаление дубликатов]
    I --> J[Применение фильтров]
    J --> K[Сортировка по релевантности]
    K --> L[Ограничение количества результатов]
    L --> M[Отображение результатов]
    M --> N[Конец]`,
        description: "Алгоритм поиска реализует полнотекстовый поиск по названиям, описаниям и тегам игр с ранжированием по релевантности."
      },
      {
        title: "Рисунок 2.11 - Алгоритм управления избранным",
        diagram: `graph TD
    A[Начало] --> B[Проверка авторизации]
    B -->|Не авторизован| C[Запрос авторизации]
    B -->|Авторизован| D[Выбор игры]
    D --> E[Проверка статуса в избранном]
    E -->|В избранном| F[Удаление из избранного]
    E -->|Не в избранном| G[Добавление в избранное]
    F --> H[Обновление БД - удаление записи]
    G --> I[Обновление БД - добавление записи]
    H --> J[Обновление UI - снятие выделения]
    I --> K[Обновление UI - выделение]
    J --> L[Обновление счетчика избранного]
    K --> L
    L --> M[Конец]
    C --> M`,
        description: "Система избранного позволяет пользователям сохранять понравившиеся игры для быстрого доступа."
      },
      {
        title: "Рисунок 2.12 - Алгоритм переключения темы",
        diagram: `graph TD
    A[Начало] --> B[Получение текущей темы]
    B --> C[Проверка типа темы]
    C -->|Светлая тема| D[Переключение на темную]
    C -->|Темная тема| E[Переключение на светлую]
    D --> F[Обновление CSS классов]
    E --> F
    F --> G[Сохранение в localStorage]
    G --> H[Обновление контекста темы]
    H --> I[Применение анимации перехода]
    I --> J[Конец]`,
        description: "Система тем обеспечивает переключение между светлой и темной темами с сохранением предпочтений пользователя."
      },
      {
        title: "Рисунок 2.13 - Алгоритм модерации контента",
        diagram: `graph TD
    A[Начало] --> B[Получение нового контента]
    B --> C[Автоматическая проверка]
    C --> D[Анализ текста на токсичность]
    D -->|Токсичный контент| E[Автоматическая блокировка]
    D -->|Чистый контент| F[Проверка спам-фильтрами]
    F -->|Спам обнаружен| G[Отправка на модерацию]
    F -->|Не спам| H[Автоматическое одобрение]
    E --> I[Уведомление автора]
    G --> J[Ручная проверка модератором]
    H --> K[Публикация контента]
    J -->|Одобрено| K
    J -->|Отклонено| I
    I --> L[Конец]
    K --> L`,
        description: "Система модерации автоматически проверяет пользовательский контент на соответствие правилам сообщества."
      },
      {
        title: "Рисунок 2.14 - Алгоритм аналитики и статистики",
        diagram: `graph TD
    A[Начало] --> B[Сбор данных о действиях пользователей]
    B --> C[Фильтрация событий]
    C --> D[Агрегация данных по периодам]
    D --> E[Вычисление метрик]
    E --> F[Расчет популярности игр]
    F --> G[Анализ пользовательской активности]
    G --> H[Генерация отчетов]
    H --> I[Кэширование результатов]
    I --> J[Отображение дашборда]
    J --> K[Конец]`,
        description: "Система аналитики собирает и обрабатывает данные о пользовательском поведении для генерации статистических отчетов."
      }
    ];

    return (
      <div>
        <Card className="mb-8 print:shadow-none print:border-2">
          <CardHeader>
            <CardTitle className="text-xl font-bold">2.4 Разработка алгоритмов компонента</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-6">
            <p>
              В этом разделе рассматривается работа каждого из основных алгоритмов и методов системы демонстрации игр. 
              Каждый алгоритм спроектирован для обеспечения определенной функциональности системы: от базовых операций 
              с играми до административного управления и пользовательского интерфейса.
            </p>
            <p>
              Алгоритмы построены с учетом обработки ошибок, асинхронных операций с базой данных и обеспечения 
              безопасности пользовательских данных. Все блок-схемы представлены в формате Mermaid для удобства 
              анализа и документирования.
            </p>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          {algorithms.map((algorithm, index) => (
            <MermaidBlock key={index} {...algorithm} />
          ))}
        </div>
      </div>
    );
  };

  const ServerArchitecture = () => (
    <Card className="mb-8 print:shadow-none print:border-2">
      <CardHeader>
        <CardTitle className="text-xl font-bold">2.5 Архитектура серверной части</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm leading-6">
        <p>
          Серверная часть системы демонстрации игр построена на основе платформы Supabase, которая предоставляет 
          полноценное backend-решение как сервис (BaaS - Backend as a Service). Архитектура следует принципам 
          serverless computing и микросервисной архитектуры.
        </p>
        
        <div className="space-y-3">
          <h4 className="font-semibold">Основные компоненты серверной части:</h4>
          
          <div className="pl-4 space-y-2">
            <p><strong>База данных PostgreSQL</strong> - основное хранилище данных с поддержкой ACID-транзакций, 
            индексирования и полнотекстового поиска. Содержит таблицы: games, profiles, comments, ratings, 
            favorites, tags, game_tags.</p>
            
            <p><strong>API Gateway</strong> - автоматически генерируемый RESTful API с поддержкой GraphQL, 
            обеспечивающий стандартизированный доступ к данным через HTTP/HTTPS протоколы.</p>
            
            <p><strong>Система аутентификации</strong> - встроенная система управления пользователями с поддержкой 
            JWT токенов, OAuth провайдеров, магических ссылок и двухфакторной аутентификации.</p>
            
            <p><strong>Row Level Security (RLS)</strong> - система безопасности на уровне строк PostgreSQL, 
            обеспечивающая изоляцию данных пользователей и контроль доступа на уровне базы данных.</p>
            
            <p><strong>Supabase Storage</strong> - масштабируемое файловое хранилище на базе AWS S3 для Unity 
            WebGL файлов, изображений и других ассетов с поддержкой CDN и автоматического резервирования.</p>
            
            <p><strong>Real-time подписки</strong> - система событий в реальном времени на основе WebSocket 
            соединений, позволяющая отслеживать изменения в базе данных и обновлять UI без перезагрузки.</p>
            
            <p><strong>Edge Functions</strong> - серверные функции для кастомной логики, обработки вебхуков, 
            интеграции с внешними API и выполнения фоновых задач.</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-semibold">Преимущества выбранной архитектуры:</h4>
          
          <div className="pl-4 space-y-2">
            <p><strong>Масштабируемость:</strong> Автоматическое масштабирование ресурсов в зависимости от нагрузки</p>
            <p><strong>Надежность:</strong> Встроенное резервирование и мониторинг инфраструктуры</p>
            <p><strong>Безопасность:</strong> Шифрование данных, SSL/TLS сертификаты, защита от DDoS атак</p>
            <p><strong>Производительность:</strong> CDN для статических файлов, кэширование запросов, оптимизированные индексы</p>
            <p><strong>Разработка:</strong> Готовые SDK для различных платформ, автоматическая генерация API документации</p>
          </div>
        </div>
        
        <p>
          Данная архитектура обеспечивает высокую производительность, надежность и масштабируемость системы, 
          позволяя сосредоточиться на разработке пользовательского интерфейса и бизнес-логики приложения.
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-white print:bg-white">
      <style>{`
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
      `}</style>
      
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
            Конструкторский раздел
          </h1>
          <p className="text-gray-600">
            Создание сайта для демонстрации игр - техническая документация
          </p>
        </div>

        <div className="print:text-center mb-8">
          <h1 className="text-2xl font-bold mb-4 print:text-3xl">
            КОНСТРУКТОРСКИЙ РАЗДЕЛ
          </h1>
          <h2 className="text-xl font-semibold mb-6 print:text-2xl">
            Создание сайта для демонстрации игр
          </h2>
        </div>

        {/* Mathematical Model */}
        <MathematicalModel />

        {/* Component Structure Development */}
        <Card className="mb-8 print:shadow-none print:border-2">
          <CardHeader>
            <CardTitle className="text-xl font-bold">2.2 Разработка структуры компонента</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-6">
            <p>
              Перед реализацией системы демонстрации игр необходимо представить будущий компонент в виде схемы. 
              Для начального представления используется модель «Черная сфера».
            </p>
            <p>
              «Чёрная сфера» — это сегмент программы или набор алгоритмов, которые выполняют определенные функции, 
              но их внутреннее устройство недоступно пользователю. При этом возможно получить информацию о входных 
              данных и результате выполнения.
            </p>
          </CardContent>
        </Card>

        <BlackSphereBasic />
        
        <Card className="mb-8 print:shadow-none print:border-2">
          <CardContent className="space-y-4 text-sm leading-6 pt-6">
            <p>
              Входными данными являются файлы Unity WebGL сборки (wasm, data, framework, loader), 
              пользовательский ввод (клики, формы, навигация) и метаданные игр (название, описание, теги). 
              Выходными данными будут готовая к воспроизведению игра, пользовательский интерфейс и системные уведомления.
            </p>
          </CardContent>
        </Card>

        <BlackSphereDetailed />
        
        <Card className="mb-8 print:shadow-none print:border-2">
          <CardContent className="space-y-4 text-sm leading-6 pt-6">
            <p>
              Для полного понимания работы системы модели черной сферы недостаточно, поэтому необходимо 
              провести декомпозицию. Декомпозиция – разделение большого и сложного на небольшие простые части.
            </p>
          </CardContent>
        </Card>

        <DecompositionFirst />
        
        <Card className="mb-8 print:shadow-none print:border-2">
          <CardContent className="space-y-4 text-sm leading-6 pt-6">
            <p>
              Unity файлы и метаданные используются при формировании игрового контента, а затем передаются 
              в Unity WebGL Engine для создания игрового экземпляра. После пользовательских действий эти 
              события обрабатываются в системе управления состоянием, координаты и команды проверяются и 
              передаются в игровой движок.
            </p>
            <p>
              Поскольку декомпозиция первого этапа недостаточно детальна для корректного представления работы 
              всей системы, была составлена декомпозиция второго этапа с разделением на функциональные слои.
            </p>
          </CardContent>
        </Card>

        <DecompositionSecond />

        <GraphicalInterface />

        <AlgorithmDevelopment />

        <ServerArchitecture />
      </div>
    </div>
  );
};

export default Documentation;
