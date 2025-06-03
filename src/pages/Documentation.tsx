
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
          <div className="w-64 h-64 bg-black rounded-full flex items-center justify-center text-white font-bold text-lg relative">
            Ядро приложения
            <div className="absolute -top-8 -left-8 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
              UI
            </div>
            <div className="absolute -top-8 -right-8 w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-xs font-bold">
              API
            </div>
            <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-xs font-bold">
              DB
            </div>
            <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center text-xs font-bold">
              Auth
            </div>
            <div className="absolute top-1/2 -left-12 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-xs font-bold">
              Utils
            </div>
            <div className="absolute top-1/2 -right-12 w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-xs font-bold">
              Games
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const algorithms = [
    {
      title: "Рисунок 3.1 - Алгоритм инициализации игры",
      steps: ["Начало", "Загрузка конфигурации", "Проверка браузера", "Инициализация Unity", "Загрузка ассетов", "Запуск игры", "Конец"]
    },
    {
      title: "Рисунок 3.2 - Алгоритм аутентификации пользователя",
      steps: ["Начало", "Ввод данных", "Проверка формата", "Отправка на сервер", "Получение токена", "Сохранение сессии", "Перенаправление", "Конец"]
    },
    {
      title: "Рисунок 3.3 - Алгоритм загрузки игры",
      steps: ["Начало", "Выбор файлов", "Валидация файлов", "Создание превью", "Загрузка на сервер", "Обновление БД", "Уведомление", "Конец"]
    },
    {
      title: "Рисунок 3.4 - Алгоритм поиска игр",
      steps: ["Начало", "Ввод запроса", "Формирование фильтров", "Запрос к БД", "Обработка результатов", "Отображение", "Конец"]
    },
    {
      title: "Рисунок 3.5 - Алгоритм оценки игры",
      steps: ["Начало", "Проверка авторизации", "Получение текущей оценки", "Обновление рейтинга", "Сохранение в БД", "Обновление UI", "Конец"]
    },
    {
      title: "Рисунок 3.6 - Алгоритм добавления комментария",
      steps: ["Начало", "Проверка авторизации", "Валидация текста", "Проверка на спам", "Сохранение комментария", "Обновление списка", "Конец"]
    },
    {
      title: "Рисунок 3.7 - Алгоритм модерации контента",
      steps: ["Начало", "Получение жалобы", "Проверка прав модератора", "Анализ контента", "Принятие решения", "Применение действия", "Уведомление", "Конец"]
    },
    {
      title: "Рисунок 3.8 - Алгоритм резервного копирования",
      steps: ["Начало", "Проверка расписания", "Создание снимка БД", "Архивирование файлов", "Загрузка в облако", "Проверка целостности", "Очистка старых копий", "Конец"]
    },
    {
      title: "Рисунок 3.9 - Алгоритм обновления статистики",
      steps: ["Начало", "Сбор метрик", "Агрегация данных", "Расчет показателей", "Обновление кэша", "Генерация отчетов", "Конец"]
    },
    {
      title: "Рисунок 3.10 - Алгоритм восстановления пароля",
      steps: ["Начало", "Ввод email", "Проверка в БД", "Генерация токена", "Отправка письма", "Переход по ссылке", "Смена пароля", "Конец"]
    }
  ];

  const gameClassProperties = [
    {
      name: "Title",
      type: "String",
      access: "Чтение/запись",
      readMethod: "Прямое обращение к внутреннему полю _title",
      writeMethod: "Прямая запись через метод set"
    },
    {
      name: "Description",
      type: "String", 
      access: "Чтение/запись",
      readMethod: "Прямое обращение к внутреннему полю _description",
      writeMethod: "Прямая запись через метод set"
    },
    {
      name: "AuthorId",
      type: "String",
      access: "Чтение/запись",
      readMethod: "Прямое обращение к внутреннему полю _authorId",
      writeMethod: "Прямая запись через метод set"
    },
    {
      name: "CoverImageUrl",
      type: "String",
      access: "Чтение/запись",
      readMethod: "Прямое обращение к внутреннему полю _coverImageUrl",
      writeMethod: "Прямая запись через метод set"
    },
    {
      name: "Category",
      type: "String",
      access: "Чтение/запись",
      readMethod: "Прямое обращение к внутреннему полю _category",
      writeMethod: "Прямая запись через метод set"
    },
    {
      name: "Rating",
      type: "Number",
      access: "Только чтение",
      readMethod: "Вычисление среднего значения из массива оценок",
      writeMethod: "Не предусмотрено"
    }
  ];

  const gameClassEvents = [
    {
      name: "OnGameLoad",
      type: "EventHandler<GameLoadEventArgs>",
      access: "Добавление/удаление",
      addMethod: "Добавление делегата к событию",
      removeMethod: "Удаление делегата из события"
    },
    {
      name: "OnGameStart",
      type: "EventHandler<GameStartEventArgs>",
      access: "Добавление/удаление", 
      addMethod: "Добавление делегата к событию",
      removeMethod: "Удаление делегата из события"
    },
    {
      name: "OnGameEnd",
      type: "EventHandler<GameEndEventArgs>",
      access: "Добавление/удаление",
      addMethod: "Добавление делегата к событию",
      removeMethod: "Удаление делегата из события"
    },
    {
      name: "OnRatingChanged",
      type: "EventHandler<RatingChangedEventArgs>",
      access: "Добавление/удаление",
      addMethod: "Добавление делегата к событию",
      removeMethod: "Удаление делегата из события"
    }
  ];

  return (
    <div className="min-h-screen bg-white print:bg-white">
      <style jsx>{`
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
            Система управления играми
          </h2>
        </div>

        {/* App Structure */}
        <AppStructureSphere />

        {/* Class Properties Table */}
        <ClassPropertiesTable 
          className="Game" 
          properties={gameClassProperties} 
        />

        {/* Class Events Table */}
        <ClassEventsTable 
          className="Game" 
          events={gameClassEvents} 
        />

        {/* Flowcharts */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6 print:text-center">
          БЛОК-СХЕМЫ АЛГОРИТМОВ
        </h2>
        
        <div className="space-y-6">
          {algorithms.map((algorithm, index) => (
            <FlowchartBlock key={index} {...algorithm} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Documentation;
