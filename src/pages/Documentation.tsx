
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
              S = {g ∈ G | (title(g) ⊇ query) ∨ (tags(g) ∩ query ≠ ∅)}
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

  const AlgorithmFlowcharts = () => {
    const algorithms = [
      {
        title: "Рисунок 2.5 - Алгоритм инициализации Unity игры",
        steps: [
          "Начало",
          "Проверка поддержки WebGL",
          "Загрузка Unity Loader",
          "Создание Canvas элемента",
          "Инициализация Unity Instance",
          "Загрузка игровых ассетов",
          "Запуск игрового цикла",
          "Конец"
        ]
      },
      {
        title: "Рисунок 2.6 - Алгоритм аутентификации пользователя",
        steps: [
          "Начало",
          "Ввод email и пароля",
          "Валидация формы",
          "Отправка на Supabase Auth",
          "Проверка учетных данных",
          "Получение JWT токена",
          "Сохранение в localStorage",
          "Редирект в личный кабинет",
          "Конец"
        ]
      },
      {
        title: "Рисунок 2.7 - Алгоритм загрузки игры разработчиком",
        steps: [
          "Начало",
          "Проверка авторизации",
          "Выбор Unity файлов",
          "Валидация файлов",
          "Заполнение метаданных",
          "Загрузка в Supabase Storage",
          "Создание записи в БД",
          "Генерация превью",
          "Публикация игры",
          "Конец"
        ]
      },
      {
        title: "Рисунок 2.8 - Алгоритм системы комментариев",
        steps: [
          "Начало",
          "Проверка авторизации",
          "Ввод текста комментария",
          "Валидация контента",
          "Проверка на спам",
          "Сохранение в БД",
          "Обновление списка",
          "Уведомление автора",
          "Конец"
        ]
      },
      {
        title: "Рисунок 2.9 - Алгоритм системы рейтингов",
        steps: [
          "Начало",
          "Проверка авторизации",
          "Выбор оценки (1-5)",
          "Проверка предыдущих оценок",
          "Обновление/создание рейтинга",
          "Пересчет среднего балла",
          "Обновление в БД",
          "Обновление UI",
          "Конец"
        ]
      },
      {
        title: "Рисунок 2.10 - Алгоритм поиска игр",
        steps: [
          "Начало",
          "Ввод поискового запроса",
          "Анализ ключевых слов",
          "Поиск по названию",
          "Поиск по тегам",
          "Фильтрация результатов",
          "Сортировка по релевантности",
          "Отображение результатов",
          "Конец"
        ]
      }
    ];

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

    return (
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6 print:text-center">
          2.4 Алгоритмы основных процессов системы
        </h2>
        
        <div className="space-y-6">
          {algorithms.map((algorithm, index) => (
            <FlowchartBlock key={index} {...algorithm} />
          ))}
        </div>
      </div>
    );
  };

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

        <AlgorithmFlowcharts />
      </div>
    </div>
  );
};

export default Documentation;
