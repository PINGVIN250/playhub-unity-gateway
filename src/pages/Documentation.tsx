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

  const DatabaseEntities = () => (
    <Card className="mb-8 print:shadow-none print:border-2">
      <CardHeader>
        <CardTitle className="text-xl font-bold">2.5 Разработка сущностей базы данных</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm leading-6">
        <p>
          В результате тщательного изучения и анализа раздела "разработка схемы базы данных" была успешно создана 
          схема базы данных, которая является неотъемлемой частью полноценной работы приложения. Для удобства, все сущности, 
          необходимые для правильной функционирования приложения, были компактно представлены в табличной форме. 
          Полный перечень сущностей данной схемы базы данных приведен в таблице 2.3.
        </p>
        
        <div className="mt-6">
          <h4 className="font-semibold mb-4 text-center">Таблица 2.3 – Сущности схемы базы данных</h4>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-400 text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-400 p-2 text-left font-semibold">Имя сущности</th>
                  <th className="border border-gray-400 p-2 text-left font-semibold">Назначение сущности</th>
                  <th className="border border-gray-400 p-2 text-left font-semibold">Типы данных</th>
                  <th className="border border-gray-400 p-2 text-left font-semibold">Подчиняющиеся сущности</th>
                  <th className="border border-gray-400 p-2 text-left font-semibold">Родительские сущности</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-400 p-2 font-medium">games</td>
                  <td className="border border-gray-400 p-2">Содержит данные об играх и их метаинформации</td>
                  <td className="border border-gray-400 p-2">uuid, text, boolean, integer, timestamp</td>
                  <td className="border border-gray-400 p-2">comments, ratings, favorites, game_tags</td>
                  <td className="border border-gray-400 p-2">profiles</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2 font-medium">profiles</td>
                  <td className="border border-gray-400 p-2">Содержит данные о пользователях системы</td>
                  <td className="border border-gray-400 p-2">uuid, text, boolean, timestamp</td>
                  <td className="border border-gray-400 p-2">games, comments, ratings, favorites</td>
                  <td className="border border-gray-400 p-2">-</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2 font-medium">comments</td>
                  <td className="border border-gray-400 p-2">Содержит информацию о комментариях к играм</td>
                  <td className="border border-gray-400 p-2">uuid, text, timestamp</td>
                  <td className="border border-gray-400 p-2">-</td>
                  <td className="border border-gray-400 p-2">games, profiles</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2 font-medium">ratings</td>
                  <td className="border border-gray-400 p-2">Содержит данные о рейтингах игр пользователями</td>
                  <td className="border border-gray-400 p-2">uuid, integer, timestamp</td>
                  <td className="border border-gray-400 p-2">-</td>
                  <td className="border border-gray-400 p-2">games, profiles</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2 font-medium">favorites</td>
                  <td className="border border-gray-400 p-2">Содержит список избранных игр пользователей</td>
                  <td className="border border-gray-400 p-2">uuid, timestamp</td>
                  <td className="border border-gray-400 p-2">-</td>
                  <td className="border border-gray-400 p-2">games, profiles</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2 font-medium">tags</td>
                  <td className="border border-gray-400 p-2">Содержит данные о тегах для категоризации игр</td>
                  <td className="border border-gray-400 p-2">uuid, text</td>
                  <td className="border border-gray-400 p-2">game_tags</td>
                  <td className="border border-gray-400 p-2">-</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2 font-medium">game_tags</td>
                  <td className="border border-gray-400 p-2">Связующая таблица между играми и тегами</td>
                  <td className="border border-gray-400 p-2">uuid</td>
                  <td className="border border-gray-400 p-2">-</td>
                  <td className="border border-gray-400 p-2">games, tags</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-6 space-y-3">
          <h4 className="font-semibold">Ключевые особенности схемы базы данных:</h4>
          
          <div className="pl-4 space-y-2">
            <p><strong>Нормализация:</strong> Схема соответствует третьей нормальной форме (3NF), что обеспечивает минимизацию избыточности данных</p>
            <p><strong>Связи:</strong> Реализованы все необходимые связи один-ко-многим и многие-ко-многим через промежуточные таблицы</p>
            <p><strong>Безопасность:</strong> Все таблицы защищены Row Level Security (RLS) политиками для разграничения доступа</p>
            <p><strong>Производительность:</strong> Созданы индексы для оптимизации запросов по часто используемым полям</p>
            <p><strong>Масштабируемость:</strong> Структура позволяет легко добавлять новые функциональности без изменения существующих таблиц</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const SecuritySystem = () => (
    <Card className="mb-8 print:shadow-none print:border-2">
      <CardHeader>
        <CardTitle className="text-xl font-bold">2.6 Система безопасности</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm leading-6">
        <p>
          Система безопасности платформы демонстрации игр построена на основе многоуровневой архитектуры защиты, 
          обеспечивающей конфиденциальность, целостность и доступность данных пользователей. Основой системы 
          безопасности является Supabase Auth в сочетании с Row Level Security (RLS) PostgreSQL.
        </p>
        
        <div className="space-y-3">
          <h4 className="font-semibold">Основные компоненты системы безопасности:</h4>
          
          <div className="pl-4 space-y-2">
            <p><strong>1. Аутентификация (Authentication):</strong></p>
            <p className="pl-4">
              - JWT (JSON Web Tokens) для управления сессиями пользователей<br/>
              - Безопасное хранение токенов в localStorage с автоматическим обновлением<br/>
              - Поддержка email/password аутентификации с валидацией email адресов<br/>
              - Защита от атак типа CSRF через SameSite cookie политики<br/>
              - Автоматическое истечение сессий и принудительное переподключение
            </p>
            
            <p><strong>2. Авторизация (Authorization):</strong></p>
            <p className="pl-4">
              - Row Level Security (RLS) на уровне базы данных PostgreSQL<br/>
              - Динамические политики доступа, основанные на идентификаторе пользователя<br/>
              - Разграничение прав между обычными пользователями и администраторами<br/>
              - Контроль доступа к файлам через Supabase Storage buckets<br/>
              - Изоляция данных пользователей на уровне строк таблиц
            </p>
            
            <p><strong>3. Защита данных:</strong></p>
            <p className="pl-4">
              - Шифрование всех соединений через HTTPS/TLS 1.3<br/>
              - Хеширование паролей с использованием bcrypt алгоритма<br/>
              - Валидация и санитизация всех пользовательских входных данных<br/>
              - Защита от SQL-инъекций через параметризованные запросы<br/>
              - XSS защита через Content Security Policy (CSP) заголовки
            </p>
            
            <p><strong>4. Мониторинг и аудит:</strong></p>
            <p className="pl-4">
              - Логирование всех критичных операций (вход, загрузка файлов, изменения)<br/>
              - Отслеживание подозрительной активности и автоматические уведомления<br/>
              - Регулярное резервное копирование данных с шифрованием<br/>
              - Мониторинг производительности и доступности системы<br/>
              - Анализ логов безопасности для выявления угроз
            </p>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-semibold">Политики Row Level Security (RLS):</h4>
          
          <div className="pl-4 space-y-2">
            <p><strong>Таблица games:</strong> Пользователи могут просматривать все опубликованные игры, но редактировать только свои собственные</p>
            <p><strong>Таблица profiles:</strong> Пользователи имеют полный доступ только к своему профилю</p>
            <p><strong>Таблица comments:</strong> Пользователи могут создавать комментарии и редактировать только свои</p>
            <p><strong>Таблица ratings:</strong> Пользователи могут создавать и изменять только свои оценки игр</p>
            <p><strong>Таблица favorites:</strong> Доступ только к собственному списку избранного</p>
          </div>
        </div>
        
        <p>
          Данная архитектура безопасности обеспечивает комплексную защиту системы от современных угроз 
          информационной безопасности, соответствует требованиям GDPR и обеспечивает высокий уровень 
          доверия пользователей к платформе.
        </p>
      </CardContent>
    </Card>
  );

  const ApiConnections = () => (
    <Card className="mb-8 print:shadow-none print:border-2">
      <CardHeader>
        <CardTitle className="text-xl font-bold">2.7 API и подключения</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm leading-6">
        <p>
          Система API платформы демонстрации игр построена на основе RESTful архитектуры с использованием 
          автоматически генерируемого API от Supabase. Это обеспечивает стандартизированный, масштабируемый 
          и безопасный доступ к данным приложения.
        </p>
        
        <div className="space-y-3">
          <h4 className="font-semibold">Архитектура API:</h4>
          
          <div className="pl-4 space-y-2">
            <p><strong>Базовый URL:</strong> https://epdikyzqkywtwzsoplio.supabase.co/rest/v1/</p>
            <p><strong>Аутентификация:</strong> Bearer токены (JWT) в заголовке Authorization</p>
            <p><strong>Формат данных:</strong> JSON для всех запросов и ответов</p>
            <p><strong>Методы HTTP:</strong> GET, POST, PATCH, DELETE для CRUD операций</p>
            <p><strong>Версионирование:</strong> Версия API указывается в URL (/rest/v1/)</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-semibold">Основные API эндпоинты:</h4>
          
          <div className="pl-4 space-y-2">
            <p><strong>GET /games</strong> - Получение списка игр с пагинацией и фильтрацией</p>
            <p><strong>POST /games</strong> - Создание новой игры (требует авторизации)</p>
            <p><strong>PATCH /games/{id}</strong> - Обновление информации об игре</p>
            <p><strong>DELETE /games/{id}</strong> - Удаление игры (только автор или администратор)</p>
            <p><strong>GET /profiles/{id}</strong> - Получение профиля пользователя</p>
            <p><strong>POST /comments</strong> - Создание комментария к игре</p>
            <p><strong>POST /ratings</strong> - Добавление или обновление рейтинга игры</p>
            <p><strong>GET /favorites</strong> - Получение списка избранных игр пользователя</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-semibold">Supabase Client SDK:</h4>
          
          <div className="pl-4 space-y-2">
            <p><strong>Конфигурация клиента:</strong></p>
            <div className="bg-gray-100 p-3 rounded text-xs font-mono">
              <pre>{`const supabase = createClient(
  'https://epdikyzqkywtwzsoplio.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storageKey: 'supabase-auth'
    }
  }
);`}</pre>
            </div>
            
            <p><strong>Автоматические возможности:</strong></p>
            <p className="pl-4">
              - Автоматическая аутентификация для всех запросов<br/>
              - Применение RLS политик на стороне сервера<br/>
              - Real-time подписки на изменения данных<br/>
              - Автоматическая валидация типов данных<br/>
              - Кэширование запросов и оптимизация производительности
            </p>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-semibold">Real-time соединения:</h4>
          
          <div className="pl-4 space-y-2">
            <p><strong>WebSocket подключения:</strong> Для получения обновлений в реальном времени</p>
            <p><strong>Каналы подписок:</strong> Отслеживание изменений в таблицах comments, ratings, games</p>
            <p><strong>Автоматическое переподключение:</strong> При потере соединения или сетевых сбоях</p>
            <p><strong>Фильтрация событий:</strong> Подписка только на релевантные изменения данных</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-semibold">Обработка ошибок API:</h4>
          
          <div className="pl-4 space-y-2">
            <p><strong>HTTP коды состояния:</strong> Стандартные коды 200, 201, 400, 401, 403, 404, 500</p>
            <p><strong>Структура ошибок:</strong> JSON объекты с полями error, message, details</p>
            <p><strong>Повторные попытки:</strong> Автоматический retry для временных сбоев</p>
            <p><strong>Пользовательские уведомления:</strong> Дружественные сообщения об ошибках в UI</p>
          </div>
        </div>
        
        <p>
          API система обеспечивает надежное и эффективное взаимодействие между клиентской и серверной частями 
          приложения, гарантируя быструю обработку запросов и высокую доступность сервисов.
        </p>
      </CardContent>
    </Card>
  );

  const ApplicationTesting = () => (
    <Card className="mb-8 print:shadow-none print:border-2">
      <CardHeader>
        <CardTitle className="text-xl font-bold">2.8 Отладка приложения</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm leading-6">
        <p>
          Для тестирования будет применен метод тестирования с использованием тест-кейсов. Он позволяет проверить 
          продукт без необходимости изучать всю документацию. Создание удобного и поддерживаемого тест-кейса, 
          который написан единожды, поможет экономить время и усилия тестировщиков. Тест-кейс представляет собой 
          документ, который описывает набор шагов, определенные условия и параметры, для проверки функциональности 
          или ее части. Перед тестированием тест-кейсы передаются тестировщику, который должен последовательно 
          выполнять каждый пункт и все описанные действия для достижения определенных результатов.
        </p>
        
        <div className="mt-6">
          <h4 className="font-semibold mb-4 text-center">Таблица 2.4. Тест-кейс свойств компонентов</h4>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-400 text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-400 p-2 text-left font-semibold">Название свойства</th>
                  <th className="border border-gray-400 p-2 text-left font-semibold">Управляющее воздействие</th>
                  <th className="border border-gray-400 p-2 text-left font-semibold">Результат воздействия</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-400 p-2 font-medium">theme</td>
                  <td className="border border-gray-400 p-2">Переключить между светлой и темной темой через иконку</td>
                  <td className="border border-gray-400 p-2">Цвет интерфейса изменится согласно выбранной теме, настройка сохранится в localStorage</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2 font-medium">searchQuery</td>
                  <td className="border border-gray-400 p-2">Ввести текст в строку поиска игр</td>
                  <td className="border border-gray-400 p-2">Список игр отфильтруется по введенному тексту в названии и описании</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2 font-medium">gameRating</td>
                  <td className="border border-gray-400 p-2">Выставить оценку игре от 1 до 5 звезд</td>
                  <td className="border border-gray-400 p-2">Рейтинг игры обновится, пересчитается средний балл</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2 font-medium">favoritesList</td>
                  <td className="border border-gray-400 p-2">Добавить/удалить игру из избранного</td>
                  <td className="border border-gray-400 p-2">Игра появится/исчезнет в списке избранного пользователя</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2 font-medium">user</td>
                  <td className="border border-gray-400 p-2">Войти или выйти из аккаунта</td>
                  <td className="border border-gray-400 p-2">Интерфейс переключит состояние пользователя, изменится доступный функционал</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2 font-medium">unityPlayer</td>
                  <td className="border border-gray-400 p-2">Запустить Unity игру в браузере</td>
                  <td className="border border-gray-400 p-2">Игра загрузится и запустится в встроенном плеере, отобразится прогресс загрузки</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2 font-medium">commentSection</td>
                  <td className="border border-gray-400 p-2">Добавить комментарий к игре</td>
                  <td className="border border-gray-400 p-2">Комментарий появится в списке, обновится счетчик комментариев</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="font-semibold mb-4 text-center">Таблица 2.5 – Тест-кейс для методов</h4>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-400 text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-400 p-2 text-left font-semibold">Название метода</th>
                  <th className="border border-gray-400 p-2 text-left font-semibold">Управляющее воздействие</th>
                  <th className="border border-gray-400 p-2 text-left font-semibold">Результат воздействия</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-400 p-2 font-medium">handleGameUpload</td>
                  <td className="border border-gray-400 p-2">Загрузить Unity WebGL файлы через форму</td>
                  <td className="border border-gray-400 p-2">Игра загрузится в систему, создастся запись в БД с метаданными</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2 font-medium">handleRating</td>
                  <td className="border border-gray-400 p-2">Нажать на звездочки для оценки игры</td>
                  <td className="border border-gray-400 p-2">Рейтинг сохранится в БД, обновится средняя оценка игры</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2 font-medium">handleComment</td>
                  <td className="border border-gray-400 p-2">Написать и отправить комментарий</td>
                  <td className="border border-gray-400 p-2">Комментарий сохранится и отобразится в списке комментариев</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2 font-medium">handleAuthClick</td>
                  <td className="border border-gray-400 p-2">Нажать на кнопку входа/регистрации</td>
                  <td className="border border-gray-400 p-2">Откроется форма аутентификации или профиль пользователя</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2 font-medium">handleFavoriteToggle</td>
                  <td className="border border-gray-400 p-2">Нажать на иконку "избранное" у игры</td>
                  <td className="border border-gray-400 p-2">Игра добавится/удалится из избранного, изменится иконка</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2 font-medium">handleThemeToggle</td>
                  <td className="border border-gray-400 p-2">Нажать на переключатель темы</td>
                  <td className="border border-gray-400 p-2">Интерфейс переключится между светлой и темной темой</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2 font-medium">handleSearch</td>
                  <td className="border border-gray-400 p-2">Изменить поисковый запрос в строке поиска</td>
                  <td className="border border-gray-400 p-2">Список игр отфильтруется согласно введенному запросу</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2 font-medium">handleGamePlay</td>
                  <td className="border border-gray-400 p-2">Нажать "Играть" на карточке игры</td>
                  <td className="border border-gray-400 p-2">Откроется страница с Unity плеером, игра начнет загружаться</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-6 space-y-3">
          <h4 className="font-semibold">Дополнительные методы тестирования:</h4>
          
          <div className="pl-4 space-y-2">
            <p><strong>Модульное тестирование:</strong> Тестирование отдельных компонентов React с использованием Jest</p>
            <p><strong>Интеграционное тестирование:</strong> Проверка взаимодействия между компонентами и API</p>
            <p><strong>E2E тестирование:</strong> Полнофункциональные тесты пользовательских сценариев</p>
            <p><strong>Кроссбраузерное тестирование:</strong> Проверка совместимости в Chrome, Firefox, Safari, Edge</p>
            <p><strong>Мобильное тестирование:</strong> Тестирование адаптивного дизайна на различных устройствах</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const InstallationGuide = () => (
    <Card className="mb-8 print:shadow-none print:border-2">
      <CardHeader>
        <CardTitle className="text-xl font-bold">2.9 Инструкция по установке приложения</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm leading-6">
        <p>
          Данная инструкция описывает процесс установки и настройки платформы демонстрации игр на локальной машине 
          разработчика или производственном сервере. Приложение использует современные веб-технологии и требует 
          предварительной установки необходимых зависимостей.
        </p>
        
        <div className="space-y-3">
          <h4 className="font-semibold">Системные требования:</h4>
          
          <div className="pl-4 space-y-2">
            <p><strong>Операционная система:</strong> Windows 10+, macOS 10.15+, Ubuntu 18.04+ или другие Linux дистрибутивы</p>
            <p><strong>Node.js:</strong> Версия 16.0 или выше</p>
            <p><strong>Оперативная память:</strong> Минимум 4 GB, рекомендуется 8 GB</p>
            <p><strong>Свободное место:</strong> 2 GB для установки и зависимостей</p>
            <p><strong>Браузер:</strong> Chrome 90+, Firefox 88+, Safari 14+, Edge 90+</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-semibold">Шаг 1: Установка Node.js и npm</h4>
          
          <div className="pl-4 space-y-2">
            <p>1. Перейдите на официальный сайт Node.js: https://nodejs.org/</p>
            <p>2. Скачайте LTS версию для вашей операционной системы</p>
            <p>3. Запустите установщик и следуйте инструкциям</p>
            <p>4. Проверьте установку командой в терминале:</p>
            <div className="bg-gray-100 p-3 rounded text-xs font-mono">
              <pre>{`node --version
npm --version`}</pre>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-semibold">Шаг 2: Клонирование репозитория</h4>
          
          <div className="pl-4 space-y-2">
            <p>1. Откройте терминал в папке для проектов</p>
            <p>2. Выполните команду клонирования:</p>
            <div className="bg-gray-100 p-3 rounded text-xs font-mono">
              <pre>{`git clone https://github.com/username/games-platform.git
cd games-platform`}</pre>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-semibold">Шаг 3: Установка зависимостей</h4>
          
          <div className="pl-4 space-y-2">
            <p>1. Установите все необходимые пакеты:</p>
            <div className="bg-gray-100 p-3 rounded text-xs font-mono">
              <pre>{`npm install`}</pre>
            </div>
            <p>2. Дождитесь завершения установки (может занять несколько минут)</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-semibold">Шаг 4: Настройка Supabase</h4>
          
          <div className="pl-4 space-y-2">
            <p>1. Зарегистрируйтесь на https://supabase.com</p>
            <p>2. Создайте новый проект</p>
            <p>3. Скопируйте URL проекта и анонимный ключ из Settings → API</p>
            <p>4. Обновите файл src/integrations/supabase/client.ts с вашими данными</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-semibold">Шаг 5: Запуск приложения</h4>
          
          <div className="pl-4 space-y-2">
            <p>1. Запустите сервер разработки:</p>
            <div className="bg-gray-100 p-3 rounded text-xs font-mono">
              <pre>{`npm run dev`}</pre>
            </div>
            <p>2. Откройте браузер и перейдите по адресу: http://localhost:5173</p>
            <p>3. Убедитесь, что приложение загрузилось корректно</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-semibold">Шаг 6: Производственная сборка</h4>
          
          <div className="pl-4 space-y-2">
            <p>Для создания оптимизированной версии для продакшена:</p>
            <div className="bg-gray-100 p-3 rounded text-xs font-mono">
              <pre>{`npm run build
npm run preview`}</pre>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-semibold">Возможные проблемы и решения:</h4>
          
          <div className="pl-4 space-y-2">
            <p><strong>Ошибка "Module not found":</strong> Удалите node_modules и выполните npm install заново</p>
            <p><strong>Проблемы с портом:</strong> Измените порт в vite.config.ts или убейте процесс на порту 5173</p>
            <p><strong>Ошибки Supabase:</strong> Проверьте правильность URL и ключей в конфигурации</p>
            <p><strong>Медленная работа:</strong> Убедитесь, что установлена LTS версия Node.js</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const OperationGuide = () => (
    <Card className="mb-8 print:shadow-none print:border-2">
      <CardHeader>
        <CardTitle className="text-xl font-bold">2.10 Инструкция по эксплуатации приложения</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm leading-6">
        <p>
          Данная инструкция предназначена для конечных пользователей платформы демонстрации игр и описывает 
          основные функции системы, способы навигации и рекомендации по эффективному использованию платформы.
        </p>
        
        <div className="space-y-3">
          <h4 className="font-semibold">Регистрация и вход в систему:</h4>
          
          <div className="pl-4 space-y-2">
            <p><strong>1. Регистрация нового пользователя:</strong></p>
            <p className="pl-4">
              - Нажмите кнопку "Войти" в правом верхнем углу<br/>
              - Выберите "Регистрация" в открывшемся окне<br/>
              - Введите действующий email адрес и надежный пароль<br/>
              - Подтвердите регистрацию через письмо на email<br/>
              - Заполните профиль пользователя (имя, описание)
            </p>
            
            <p><strong>2. Вход в систему:</strong></p>
            <p className="pl-4">
              - Нажмите кнопку "Войти"<br/>
              - Введите email и пароль<br/>
              - Система автоматически запомнит вас для последующих посещений
            </p>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-semibold">Навигация по платформе:</h4>
          
          <div className="pl-4 space-y-2">
            <p><strong>Главная страница:</strong> Отображает рекомендуемые и популярные игры</p>
            <p><strong>Каталог игр:</strong> Полный список всех доступных игр с фильтрацией</p>
            <p><strong>Поиск:</strong> Используйте строку поиска для нахождения конкретных игр</p>
            <p><strong>Избранное:</strong> Ваши любимые игры (доступно после авторизации)</p>
            <p><strong>Профиль:</strong> Управление личной информацией и настройками</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-semibold">Работа с играми:</h4>
          
          <div className="pl-4 space-y-2">
            <p><strong>1. Просмотр информации об игре:</strong></p>
            <p className="pl-4">
              - Нажмите на карточку игры для просмотра деталей<br/>
              - Изучите описание, скриншоты и системные требования<br/>
              - Посмотрите рейтинг и отзывы других пользователей
            </p>
            
            <p><strong>2. Запуск игры:</strong></p>
            <p className="pl-4">
              - Нажмите кнопку "Играть" на странице игры<br/>
              - Дождитесь загрузки Unity WebGL плеера<br/>
              - Используйте полноэкранный режим для лучшего игрового опыта<br/>
              - При проблемах с загрузкой нажмите "Перезагрузить"
            </p>
            
            <p><strong>3. Оценка и комментирование:</strong></p>
            <p className="pl-4">
              - Поставьте оценку от 1 до 5 звезд<br/>
              - Напишите развернутый отзыв о игре<br/>
              - Просматривайте комментарии других пользователей
            </p>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-semibold">Загрузка собственных игр:</h4>
          
          <div className="pl-4 space-y-2">
            <p><strong>1. Подготовка файлов Unity WebGL:</strong></p>
            <p className="pl-4">
              - Соберите проект в Unity с настройками WebGL<br/>
              - Убедитесь, что все файлы (.wasm, .data, .framework.js, .loader.js) присутствуют<br/>
              - Общий размер файлов не должен превышать 100MB
            </p>
            
            <p><strong>2. Процесс загрузки:</strong></p>
            <p className="pl-4">
              - Перейдите в раздел "Загрузить игру" (требует авторизации)<br/>
              - Заполните информацию: название, описание, теги<br/>
              - Выберите файлы Unity WebGL сборки<br/>
              - Загрузите обложку игры (рекомендуется 16:9, до 2MB)<br/>
              - Нажмите "Опубликовать" и дождитесь обработки
            </p>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-semibold">Персонализация:</h4>
          
          <div className="pl-4 space-y-2">
            <p><strong>Темная/светлая тема:</strong> Переключайте через иконку в верхнем меню</p>
            <p><strong>Избранные игры:</strong> Добавляйте игры в избранное нажатием на сердечко</p>
            <p><strong>Профиль:</strong> Обновляйте информацию о себе, загружайте аватар</p>
            <p><strong>Настройки:</strong> Управляйте уведомлениями и приватностью</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-semibold">Рекомендации по использованию:</h4>
          
          <div className="pl-4 space-y-2">
            <p><strong>Производительность:</strong> Используйте современный браузер для лучшей совместимости</p>
            <p><strong>Сеть:</strong> Стабильное интернет-соединение для загрузки игр</p>
            <p><strong>Безопасность:</strong> Не передавайте данные аккаунта третьим лицам</p>
            <p><strong>Сообщество:</strong> Оставляйте конструктивные отзывы и помогайте другим пользователям</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const DatabaseAdminGuide = () => (
    <Card className="mb-8 print:shadow-none print:border-2">
      <CardHeader>
        <CardTitle className="text-xl font-bold">2.11 Инструкция администратора базы данных</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm leading-6">
        <p>
          Данная инструкция предназначена для администраторов базы данных, ответственных за поддержку, 
          мониторинг и администрирование Supabase PostgreSQL базы данных платформы демонстрации игр.
        </p>
        
        <div className="space-y-3">
          <h4 className="font-semibold">Доступ к административной панели Supabase:</h4>
          
          <div className="pl-4 space-y-2">
            <p><strong>1. Вход в панель управления:</strong></p>
            <p className="pl-4">
              - Перейдите по адресу: https://supabase.com/dashboard<br/>
              - Войдите используя учетные данные администратора<br/>
              - Выберите проект платформы игр<br/>
              - Используйте двухфакторную аутентификацию для повышения безопасности
            </p>
            
            <p><strong>2. Навигация по разделам:</strong></p>
            <p className="pl-4">
              - Table Editor: Управление данными в таблицах<br/>
              - SQL Editor: Выполнение SQL запросов<br/>
              - Authentication: Управление пользователями<br/>
              - Storage: Управление файловым хранилищем<br/>
              - Logs: Просмотр логов системы
            </p>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-semibold">Управление структурой базы данных:</h4>
          
          <div className="pl-4 space-y-2">
            <p><strong>1. Создание и изменение таблиц:</strong></p>
            <div className="bg-gray-100 p-3 rounded text-xs font-mono">
              <pre>{`-- Создание новой таблицы
CREATE TABLE new_table (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Включение RLS
ALTER TABLE new_table ENABLE ROW LEVEL SECURITY;`}</pre>
            </div>
            
            <p><strong>2. Управление индексами:</strong></p>
            <div className="bg-gray-100 p-3 rounded text-xs font-mono">
              <pre>{`-- Создание индекса для оптимизации запросов
CREATE INDEX idx_games_title ON games USING gin(to_tsvector('english', title));

-- Проверка использования индексов
EXPLAIN ANALYZE SELECT * FROM games WHERE title ILIKE '%action%';`}</pre>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-semibold">Мониторинг и производительность:</h4>
          
          <div className="pl-4 space-y-2">
            <p><strong>1. Просмотр активных соединений:</strong></p>
            <div className="bg-gray-100 p-3 rounded text-xs font-mono">
              <pre>{`-- Активные подключения
SELECT count(*) FROM pg_stat_activity;

-- Долгие запросы
SELECT query, state, query_start 
FROM pg_stat_activity 
WHERE state = 'active' AND query_start < now() - interval '5 minutes';`}</pre>
            </div>
            
            <p><strong>2. Анализ производительности таблиц:</strong></p>
            <div className="bg-gray-100 p-3 rounded text-xs font-mono">
              <pre>{`-- Размер таблиц
SELECT schemaname, tablename, 
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;`}</pre>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-semibold">Резервное копирование и восстановление:</h4>
          
          <div className="pl-4 space-y-2">
            <p><strong>Автоматические бэкапы Supabase:</strong></p>
            <p className="pl-4">
              - Ежедневные автоматические снимки базы данных<br/>
              - Хранение бэкапов в течение 7 дней (бесплатный план)<br/>
              - Возможность восстановления через панель управления<br/>
              - Экспорт данных в SQL формате для локального хранения
            </p>
            
            <p><strong>Ручное создание бэкапа:</strong></p>
            <div className="bg-gray-100 p-3 rounded text-xs font-mono">
              <pre>{`-- Экспорт структуры и данных
pg_dump -h hostname -U username -d database_name > backup.sql

-- Восстановление из бэкапа
psql -h hostname -U username -d database_name < backup.sql`}</pre>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-semibold">Управление пользователями и безопасностью:</h4>
          
          <div className="pl-4 space-y-2">
            <p><strong>1. Просмотр пользователей:</strong></p>
            <div className="bg-gray-100 p-3 rounded text-xs font-mono">
              <pre>{`-- Статистика пользователей
SELECT 
  COUNT(*) as total_users,
  COUNT(*) FILTER (WHERE created_at > now() - interval '7 days') as new_this_week
FROM auth.users;`}</pre>
            </div>
            
            <p><strong>2. Управление RLS политиками:</strong></p>
            <div className="bg-gray-100 p-3 rounded text-xs font-mono">
              <pre>{`-- Просмотр активных политик
SELECT schemaname, tablename, policyname, permissive, cmd, qual 
FROM pg_policies WHERE schemaname = 'public';

-- Создание новой политики
CREATE POLICY "Users can update own profile" 
ON profiles FOR UPDATE 
USING (auth.uid() = id);`}</pre>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-semibold">Регулярные задачи администрирования:</h4>
          
          <div className="pl-4 space-y-2">
            <p><strong>Ежедневно:</strong></p>
            <p className="pl-4">
              - Проверка логов на ошибки и предупреждения<br/>
              - Мониторинг производительности запросов<br/>
              - Контроль использования дискового пространства
            </p>
            
            <p><strong>Еженедельно:</strong></p>
            <p className="pl-4">
              - Анализ медленных запросов и оптимизация<br/>
              - Проверка состояния индексов<br/>
              - Обновление статистики таблиц командой ANALYZE
            </p>
            
            <p><strong>Ежемесячно:</strong></p>
            <p className="pl-4">
              - Полное резервное копирование<br/>
              - Аудит безопасности и прав доступа<br/>
              - Планирование масштабирования ресурсов
            </p>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-semibold">Устранение типичных проблем:</h4>
          
          <div className="pl-4 space-y-2">
            <p><strong>Медленные запросы:</strong> Создание дополнительных индексов, оптимизация JOIN операций</p>
            <p><strong>Блокировки:</strong> Анализ pg_locks, завершение долгих транзакций</p>
            <p><strong>Превышение лимитов:</strong> Очистка неактуальных данных, архивирование старых записей</p>
            <p><strong>Проблемы RLS:</strong> Проверка политик безопасности, тестирование от имени пользователей</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ServerArchitecture = () => (
    <Card className="mb-8 print:shadow-none print:border-2">
      <CardHeader>
        <CardTitle className="text-xl font-bold">2.12 Архитектура серверной части</CardTitle>
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

        <DatabaseEntities />
        
        <SecuritySystem />
        
        <ApiConnections />
        
        <ApplicationTesting />
        
        <InstallationGuide />
        
        <OperationGuide />
        
        <DatabaseAdminGuide />
        
        <ServerArchitecture />
      </div>
    </div>
  );
};

export default Documentation;
