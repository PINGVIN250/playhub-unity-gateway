
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Circle, Square, Diamond } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Documentation = () => {
  const navigate = useNavigate();

  const ClassPropertiesTable = ({ className, properties }: { className: string, properties: any[] }) => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Таблица 2.1 - Свойства класса {className}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Имя свойства</th>
                <th className="border border-gray-300 p-2 text-left">Тип данных</th>
                <th className="border border-gray-300 p-2 text-left">Тип доступа</th>
                <th className="border border-gray-300 p-2 text-left">Метод доступа на чтение</th>
                <th className="border border-gray-300 p-2 text-left">Метод доступа на запись</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((prop, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{prop.name}</td>
                  <td className="border border-gray-300 p-2">{prop.type}</td>
                  <td className="border border-gray-300 p-2">{prop.access}</td>
                  <td className="border border-gray-300 p-2">{prop.readMethod}</td>
                  <td className="border border-gray-300 p-2">{prop.writeMethod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  const ClassEventsTable = ({ className, events }: { className: string, events: any[] }) => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>События класса представлены в таблице 2.2</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Имя события</th>
                <th className="border border-gray-300 p-2 text-left">Тип данных</th>
                <th className="border border-gray-300 p-2 text-left">Тип доступа</th>
                <th className="border border-gray-300 p-2 text-left">Метод доступа на добавление</th>
                <th className="border border-gray-300 p-2 text-left">Метод доступа на удаление</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{event.name}</td>
                  <td className="border border-gray-300 p-2">{event.type}</td>
                  <td className="border border-gray-300 p-2">{event.access}</td>
                  <td className="border border-gray-300 p-2">{event.addMethod}</td>
                  <td className="border border-gray-300 p-2">{event.removeMethod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  const FlowchartBlock = ({ title, steps }: { title: string, steps: string[] }) => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="flex items-center justify-center w-32 h-16 border-2 border-gray-400 rounded bg-white text-center text-sm p-2">
                {step}
              </div>
              {index < steps.length - 1 && (
                <div className="w-0.5 h-6 bg-gray-400"></div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const AppStructureSphere = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Структура приложения</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center min-h-96 relative">
          <div className="w-64 h-64 bg-black rounded-full flex items-center justify-center text-white font-bold text-lg relative">
            Ядро приложения
            <div className="absolute -top-8 -left-8 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-xs">
              UI
            </div>
            <div className="absolute -top-8 -right-8 w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-xs">
              API
            </div>
            <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-xs">
              DB
            </div>
            <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center text-xs">
              Auth
            </div>
            <div className="absolute top-1/2 -left-12 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-xs">
              Utils
            </div>
            <div className="absolute top-1/2 -right-12 w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-xs">
              Games
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const algorithms = [
    {
      title: "Алгоритм инициализации игры",
      steps: ["Начало", "Загрузка конфигурации", "Проверка браузера", "Инициализация Unity", "Загрузка ассетов", "Запуск игры", "Конец"]
    },
    {
      title: "Алгоритм аутентификации пользователя",
      steps: ["Начало", "Ввод данных", "Проверка формата", "Отправка на сервер", "Получение токена", "Сохранение сессии", "Перенаправление", "Конец"]
    },
    {
      title: "Алгоритм загрузки игры",
      steps: ["Начало", "Выбор файлов", "Валидация файлов", "Создание превью", "Загрузка на сервер", "Обновление БД", "Уведомление", "Конец"]
    },
    {
      title: "Алгоритм поиска игр",
      steps: ["Начало", "Ввод запроса", "Формирование фильтров", "Запрос к БД", "Обработка результатов", "Отображение", "Конец"]
    },
    {
      title: "Алгоритм оценки игры",
      steps: ["Начало", "Проверка авторизации", "Получение текущей оценки", "Обновление рейтинга", "Сохранение в БД", "Обновление UI", "Конец"]
    },
    {
      title: "Алгоритм добавления комментария",
      steps: ["Начало", "Проверка авторизации", "Валидация текста", "Проверка на спам", "Сохранение комментария", "Обновление списка", "Конец"]
    },
    {
      title: "Алгоритм модерации контента",
      steps: ["Начало", "Получение жалобы", "Проверка прав модератора", "Анализ контента", "Принятие решения", "Применение действия", "Уведомление", "Конец"]
    },
    {
      title: "Алгоритм резервного копирования",
      steps: ["Начало", "Проверка расписания", "Создание снимка БД", "Архивирование файлов", "Загрузка в облако", "Проверка целостности", "Очистка старых копий", "Конец"]
    },
    {
      title: "Алгоритм обновления статистики",
      steps: ["Начало", "Сбор метрик", "Агрегация данных", "Расчет показателей", "Обновление кэша", "Генерация отчетов", "Конец"]
    },
    {
      title: "Алгоритм восстановления пароля",
      steps: ["Начало", "Ввод email", "Проверка в БД", "Генерация токена", "Отправка письма", "Переход по ссылке", "Смена пароля", "Конец"]
    }
  ];

  const gameClassProperties = [
    {
      name: "Title",
      type: "String",
      access: "Чтение/запись",
      readMethod: "Прямая запись из внутреннего поля _title",
      writeMethod: "Прямая запись внутри метода set"
    },
    {
      name: "Description",
      type: "String",
      access: "Чтение/запись",
      readMethod: "Напрямую из внутреннего поля _description",
      writeMethod: "Прямая запись внутри метода set"
    },
    {
      name: "AuthorId",
      type: "String",
      access: "Чтение/запись",
      readMethod: "Прямая запись из внутреннего поля _authorId",
      writeMethod: "Прямая запись внутри метода set"
    },
    {
      name: "CoverImageUrl",
      type: "String",
      access: "Чтение/запись",
      readMethod: "Напрямую из внутреннего поля _coverImageUrl",
      writeMethod: "Прямая запись внутри метода set"
    }
  ];

  const gameClassEvents = [
    {
      name: "OnGameLoad",
      type: "EventHandler",
      access: "Добавление/удаление",
      addMethod: "Напрямую из внутреннего поля onGameLoad",
      removeMethod: "Напрямую из внутреннего поля"
    },
    {
      name: "OnGameStart",
      type: "EventHandler",
      access: "Добавление/удаление",
      addMethod: "Напрямую из внутреннего поля onGameStart",
      removeMethod: "Напрямую из внутреннего поля"
    },
    {
      name: "OnGameEnd",
      type: "EventHandler",
      access: "Добавление/удаление",
      addMethod: "Напрямую из внутреннего поля onGameEnd",
      removeMethod: "Напрямую из внутреннего поля"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Техническая документация
          </h1>
          <p className="text-gray-600">
            Блок-схемы алгоритмов, структура приложения и спецификации классов
          </p>
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Блок-схемы алгоритмов</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {algorithms.map((algorithm, index) => (
            <FlowchartBlock key={index} {...algorithm} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Documentation;
