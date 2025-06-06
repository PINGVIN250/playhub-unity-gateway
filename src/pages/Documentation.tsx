
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const Documentation = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Документация проекта</h1>
          <p className="text-xl text-muted-foreground">
            Игровой портал - современная платформа для загрузки и игры в браузерные игры
          </p>
        </div>

        {/* Table of Contents */}
        <Card>
          <CardHeader>
            <CardTitle>Содержание</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <a href="#introduction" className="block text-blue-600 hover:underline">1. Введение</a>
                <a href="#technical-overview" className="block text-blue-600 hover:underline">2. Техническое описание</a>
                <a href="#architecture" className="block text-blue-600 hover:underline">3. Архитектура системы</a>
                <a href="#database" className="block text-blue-600 hover:underline">4. База данных</a>
                <a href="#authentication" className="block text-blue-600 hover:underline">5. Система аутентификации</a>
                <a href="#game-management" className="block text-blue-600 hover:underline">6. Управление играми</a>
              </div>
              <div className="space-y-2">
                <a href="#user-interface" className="block text-blue-600 hover:underline">7. Пользовательский интерфейс</a>
                <a href="#api-endpoints" className="block text-blue-600 hover:underline">8. API и интеграции</a>
                <a href="#data-model" className="block text-blue-600 hover:underline">9. Проектирование информационной модели данных</a>
                <a href="#deployment" className="block text-blue-600 hover:underline">10. Развертывание</a>
                <a href="#conclusion" className="block text-blue-600 hover:underline">11. Заключение</a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Introduction */}
        <section id="introduction">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">1.</span>
                Введение
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Игровой портал представляет собой современную веб-платформу, разработанную для 
                публикации, управления и воспроизведения браузерных игр. Платформа предоставляет 
                пользователям возможность загружать собственные игры, играть в игры других 
                разработчиков, а также взаимодействовать с сообществом через систему комментариев 
                и рейтингов.
              </p>
              
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Основные возможности:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Регистрация и аутентификация пользователей</li>
                  <li>Загрузка и публикация игр</li>
                  <li>Каталог игр с фильтрацией и поиском</li>
                  <li>Система рейтингов и избранного</li>
                  <li>Комментарии и отзывы</li>
                  <li>Административная панель</li>
                  <li>Адаптивный дизайн и темная тема</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Technical Overview */}
        <section id="technical-overview">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">2.</span>
                Техническое описание
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Технологический стек</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Frontend</h4>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary">React 18</Badge>
                      <Badge variant="secondary">TypeScript</Badge>
                      <Badge variant="secondary">Vite</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Стилизация</h4>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary">Tailwind CSS</Badge>
                      <Badge variant="secondary">Shadcn/ui</Badge>
                      <Badge variant="secondary">Radix UI</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Backend</h4>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary">Supabase</Badge>
                      <Badge variant="secondary">PostgreSQL</Badge>
                      <Badge variant="secondary">Edge Functions</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Инструменты</h4>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary">React Query</Badge>
                      <Badge variant="secondary">React Router</Badge>
                      <Badge variant="secondary">Zod</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">Архитектурные принципы</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Компонентная архитектура:</strong> Модульная структура с переиспользуемыми компонентами</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Типизация:</strong> Строгая типизация с TypeScript для надежности кода</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Реактивность:</strong> Управление состоянием через React Context и React Query</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Безопасность:</strong> Row Level Security (RLS) и аутентификация через Supabase</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Architecture */}
        <section id="architecture">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">3.</span>
                Архитектура системы
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-6 rounded-lg">
                <div className="text-center space-y-4">
                  <div className="bg-background p-4 rounded border-2 border-primary">
                    <strong>Клиентское приложение (React)</strong>
                    <div className="text-sm mt-1">UI компоненты, роутинг, состояние</div>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="w-px h-8 bg-border"></div>
                  </div>
                  
                  <div className="bg-background p-4 rounded border-2 border-secondary">
                    <strong>Supabase Backend</strong>
                    <div className="text-sm mt-1">API, База данных, Аутентификация</div>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="w-px h-8 bg-border"></div>
                  </div>
                  
                  <div className="bg-background p-4 rounded border-2 border-accent">
                    <strong>PostgreSQL</strong>
                    <div className="text-sm mt-1">Хранение данных, RLS политики</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Структура проекта</h3>
                <div className="bg-muted p-4 rounded font-mono text-sm">
                  <div>src/</div>
                  <div>├── components/          # Переиспользуемые компоненты</div>
                  <div>├── pages/             # Страницы приложения</div>
                  <div>├── contexts/          # React контексты</div>
                  <div>├── hooks/             # Пользовательские хуки</div>
                  <div>├── integrations/      # Интеграция с Supabase</div>
                  <div>├── lib/              # Утилиты и хелперы</div>
                  <div>└── types/            # TypeScript типы</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Database */}
        <section id="database">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">4.</span>
                База данных
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Система использует PostgreSQL через Supabase с реализацией Row Level Security (RLS) 
                для обеспечения безопасности данных на уровне строк.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">Основные таблицы:</h4>
                  <ul className="space-y-1 text-sm">
                    <li><code className="bg-muted px-1 rounded">profiles</code> - профили пользователей</li>
                    <li><code className="bg-muted px-1 rounded">games</code> - информация об играх</li>
                    <li><code className="bg-muted px-1 rounded">ratings</code> - пользовательские рейтинги</li>
                    <li><code className="bg-muted px-1 rounded">comments</code> - комментарии к играм</li>
                    <li><code className="bg-muted px-1 rounded">favorites</code> - избранные игры</li>
                    <li><code className="bg-muted px-1 rounded">tags</code> - теги для категоризации</li>
                    <li><code className="bg-muted px-1 rounded">game_tags</code> - связь игр и тегов</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold">Функции безопасности:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>✓ Row Level Security (RLS)</li>
                    <li>✓ Политики доступа к данным</li>
                    <li>✓ Автоматические триггеры</li>
                    <li>✓ Валидация данных</li>
                    <li>✓ Индексы для производительности</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Authentication */}
        <section id="authentication">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">5.</span>
                Система аутентификации
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Аутентификация реализована через Supabase Auth с поддержкой email/password 
                авторизации и автоматическим созданием профилей пользователей.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Возможности аутентификации:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Регистрация новых пользователей</li>
                    <li>• Авторизация по email и паролю</li>
                    <li>• Восстановление пароля</li>
                    <li>• Подтверждение email</li>
                    <li>• Автоматический логаут</li>
                    <li>• Управление сессиями</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Роли пользователей:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="default">Администратор</Badge>
                      <span className="text-sm">Полный доступ к системе</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Пользователь</Badge>
                      <span className="text-sm">Базовые возможности</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Game Management */}
        <section id="game-management">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">6.</span>
                Управление играми
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Система поддерживает загрузку Unity WebGL игр с автоматической обработкой 
                и настройкой игрового окружения.
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Процесс загрузки игры:</h4>
                  <div className="bg-muted p-4 rounded">
                    <ol className="list-decimal pl-5 space-y-1 text-sm">
                      <li>Пользователь заполняет форму с информацией об игре</li>
                      <li>Загружается файл обложки игры</li>
                      <li>Указываются пути к игровым файлам Unity WebGL</li>
                      <li>Система проверяет корректность данных</li>
                      <li>Игра публикуется в каталоге</li>
                    </ol>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Поддерживаемые форматы:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Unity WebGL</Badge>
                    <Badge variant="outline">.wasm файлы</Badge>
                    <Badge variant="outline">.data файлы</Badge>
                    <Badge variant="outline">.framework.js</Badge>
                    <Badge variant="outline">.loader.js</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* User Interface */}
        <section id="user-interface">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">7.</span>
                Пользовательский интерфейс
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Интерфейс построен на принципах современного UX/UI дизайна с использованием 
                Tailwind CSS и компонентной библиотеки Shadcn/ui.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Ключевые страницы:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Главная страница с рекомендуемыми играми</li>
                    <li>• Каталог игр с фильтрацией</li>
                    <li>• Страница игры с плеером</li>
                    <li>• Профиль пользователя</li>
                    <li>• Панель администратора</li>
                    <li>• Избранные игры</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Особенности дизайна:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Адаптивная верстка для всех устройств</li>
                    <li>• Поддержка темной и светлой темы</li>
                    <li>• Интуитивная навигация</li>
                    <li>• Анимации и переходы</li>
                    <li>• Доступность (a11y)</li>
                    <li>• Быстрая загрузка страниц</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* API Endpoints */}
        <section id="api-endpoints">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">8.</span>
                API и интеграции
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Все взаимодействие с сервером происходит через Supabase REST API и Real-time 
                подписки для обновления данных в реальном времени.
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Основные API операции:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">Игры:</h5>
                      <ul className="text-xs space-y-1 ml-4">
                        <li>• GET /games - получение списка игр</li>
                        <li>• POST /games - создание новой игры</li>
                        <li>• PUT /games/:id - обновление игры</li>
                        <li>• DELETE /games/:id - удаление игры</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">Пользователи:</h5>
                      <ul className="text-xs space-y-1 ml-4">
                        <li>• GET /profiles - получение профилей</li>
                        <li>• PUT /profiles/:id - обновление профиля</li>
                        <li>• POST /auth/signup - регистрация</li>
                        <li>• POST /auth/signin - авторизация</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Real-time функции:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Мгновенное обновление рейтингов</li>
                    <li>• Real-time комментарии</li>
                    <li>• Уведомления о новых играх</li>
                    <li>• Синхронизация состояния между клиентами</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Data Model */}
        <section id="data-model">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">9.</span>
                Проектирование информационной модели данных
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p>
                Информационная модель данных спроектирована с учетом принципов нормализации 
                и обеспечения целостности данных. Модель включает в себя основные сущности 
                игрового портала и их взаимосвязи.
              </p>

              <div>
                <h4 className="font-semibold mb-4">Диаграмма базы данных (Entity-Relationship)</h4>
                <div className="bg-black p-6 rounded-lg overflow-x-auto">
                  <div className="text-white font-mono text-sm min-w-[800px]">
                    <div className="space-y-6">
                      {/* Profiles Table */}
                      <div className="border border-gray-400 p-4 rounded bg-gray-900 inline-block">
                        <div className="text-yellow-400 font-bold mb-2">profiles</div>
                        <div className="space-y-1">
                          <div>🔑 id: UUID (PK)</div>
                          <div>📧 email: TEXT</div>
                          <div>👤 username: TEXT</div>
                          <div>📝 bio: TEXT</div>
                          <div>🔐 is_admin: BOOLEAN</div>
                          <div>👁️ is_public: BOOLEAN</div>
                          <div>🚫 is_banned: BOOLEAN</div>
                          <div>📅 created_at: TIMESTAMP</div>
                          <div>🔄 updated_at: TIMESTAMP</div>
                        </div>
                      </div>

                      {/* Connection Lines */}
                      <div className="text-center text-gray-400">
                        ⬇️ 1:N ⬇️
                      </div>

                      {/* Games Table */}
                      <div className="border border-gray-400 p-4 rounded bg-gray-900 inline-block">
                        <div className="text-green-400 font-bold mb-2">games</div>
                        <div className="space-y-1">
                          <div>🔑 id: UUID (PK)</div>
                          <div>👤 author_id: UUID (FK)</div>
                          <div>📖 title: TEXT</div>
                          <div>📝 description: TEXT</div>
                          <div>🖼️ cover_image_url: TEXT</div>
                          <div>🎮 game_url: TEXT</div>
                          <div>📦 wasm_path: TEXT</div>
                          <div>💾 data_path: TEXT</div>
                          <div>🔧 framework_path: TEXT</div>
                          <div>⚡ loader_path: TEXT</div>
                          <div>📐 width: INTEGER</div>
                          <div>📏 height: INTEGER</div>
                          <div>⭐ featured: BOOLEAN</div>
                          <div>📅 created_at: TIMESTAMP</div>
                          <div>🔄 updated_at: TIMESTAMP</div>
                        </div>
                      </div>

                      <div className="text-center text-gray-400">
                        ⬇️ 1:N ⬇️
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {/* Ratings Table */}
                        <div className="border border-gray-400 p-4 rounded bg-gray-900">
                          <div className="text-blue-400 font-bold mb-2">ratings</div>
                          <div className="space-y-1 text-xs">
                            <div>🔑 id: UUID (PK)</div>
                            <div>👤 user_id: UUID (FK)</div>
                            <div>🎮 game_id: UUID (FK)</div>
                            <div>⭐ score: INTEGER</div>
                            <div>📅 created_at: TIMESTAMP</div>
                          </div>
                        </div>

                        {/* Comments Table */}
                        <div className="border border-gray-400 p-4 rounded bg-gray-900">
                          <div className="text-purple-400 font-bold mb-2">comments</div>
                          <div className="space-y-1 text-xs">
                            <div>🔑 id: UUID (PK)</div>
                            <div>👤 user_id: UUID (FK)</div>
                            <div>🎮 game_id: UUID (FK)</div>
                            <div>💬 content: TEXT</div>
                            <div>📅 created_at: TIMESTAMP</div>
                            <div>🔄 updated_at: TIMESTAMP</div>
                          </div>
                        </div>

                        {/* Favorites Table */}
                        <div className="border border-gray-400 p-4 rounded bg-gray-900">
                          <div className="text-red-400 font-bold mb-2">favorites</div>
                          <div className="space-y-1 text-xs">
                            <div>🔑 id: UUID (PK)</div>
                            <div>👤 user_id: UUID (FK)</div>
                            <div>🎮 game_id: UUID (FK)</div>
                            <div>📅 created_at: TIMESTAMP</div>
                          </div>
                        </div>
                      </div>

                      <div className="text-center text-gray-400">
                        M:N отношения через связующую таблицу
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Tags Table */}
                        <div className="border border-gray-400 p-4 rounded bg-gray-900">
                          <div className="text-orange-400 font-bold mb-2">tags</div>
                          <div className="space-y-1 text-xs">
                            <div>🔑 id: UUID (PK)</div>
                            <div>🏷️ name: TEXT</div>
                          </div>
                        </div>

                        {/* Game Tags Junction */}
                        <div className="border border-gray-400 p-4 rounded bg-gray-900">
                          <div className="text-cyan-400 font-bold mb-2">game_tags</div>
                          <div className="space-y-1 text-xs">
                            <div>🔑 id: UUID (PK)</div>
                            <div>🎮 game_id: UUID (FK)</div>
                            <div>🏷️ tag_id: UUID (FK)</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-center text-gray-400">
                          <div className="text-center">
                            <div>🔗</div>
                            <div className="text-xs">Связующая таблица</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Описание связей:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Один ко многим (1:N):</h5>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• profiles → games (автор игр)</li>
                      <li>• profiles → ratings (рейтинги пользователя)</li>
                      <li>• profiles → comments (комментарии пользователя)</li>
                      <li>• profiles → favorites (избранное пользователя)</li>
                      <li>• games → ratings (рейтинги игры)</li>
                      <li>• games → comments (комментарии к игре)</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Многие ко многим (M:N):</h5>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• games ↔ tags (через game_tags)</li>
                      <li>• profiles ↔ games (через favorites)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Принципы нормализации:</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong>1НФ:</strong> Атомарность значений - каждое поле содержит неделимое значение</li>
                  <li>• <strong>2НФ:</strong> Устранение частичных зависимостей - все неключевые атрибуты зависят от полного первичного ключа</li>
                  <li>• <strong>3НФ:</strong> Устранение транзитивных зависимостей - неключевые атрибуты не зависят друг от друга</li>
                  <li>• <strong>BCNF:</strong> Усиленная третья нормальная форма для обеспечения целостности</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Deployment */}
        <section id="deployment">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">10.</span>
                Развертывание
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Приложение развертывается с использованием современных облачных сервисов, 
                обеспечивающих высокую доступность и масштабируемость.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Frontend (Lovable):</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Автоматическая сборка и деплой</li>
                    <li>• CDN для быстрой загрузки</li>
                    <li>• SSL сертификаты</li>
                    <li>• Кастомные домены</li>
                    <li>• Превью изменений</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Backend (Supabase):</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Управляемая PostgreSQL база</li>
                    <li>• Автоматические бэкапы</li>
                    <li>• Edge Functions по всему миру</li>
                    <li>• Real-time подписки</li>
                    <li>• Мониторинг и логирование</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Переменные окружения:</h4>
                <div className="bg-muted p-3 rounded font-mono text-xs">
                  <div>VITE_SUPABASE_URL=https://your-project.supabase.co</div>
                  <div>VITE_SUPABASE_ANON_KEY=your_anon_key_here</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Conclusion */}
        <section id="conclusion">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">11.</span>
                Заключение
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p>
                По завершению работы над проектом, можно констатировать успешное достижение 
                поставленных целей и задач. Изначальной целью являлось создание современного 
                игрового портала с полным функционалом для пользователей и администраторов. 
                В результате проделанной работы был разработан продукт "Игровой портал" - 
                веб-приложение для публикации и воспроизведения браузерных игр.
              </p>

              <div>
                <h4 className="font-semibold mb-3">Реализованные возможности:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Для пользователей:</h5>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Регистрация и управление профилем</li>
                      <li>• Просмотр каталога игр с фильтрацией</li>
                      <li>• Воспроизведение Unity WebGL игр</li>
                      <li>• Система рейтингов и комментариев</li>
                      <li>• Добавление игр в избранное</li>
                      <li>• Загрузка собственных игр</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Для администраторов:</h5>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Панель управления играми</li>
                      <li>• Модерация контента</li>
                      <li>• Управление пользователями</li>
                      <li>• Аналитика и статистика</li>
                      <li>• Настройка рекомендуемых игр</li>
                      <li>• Система тегов и категорий</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Технические достижения:</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Современный стек технологий:</strong> React 18, TypeScript, Tailwind CSS, Supabase</li>
                  <li>• <strong>Безопасность:</strong> Row Level Security, JWT токены, валидация данных</li>
                  <li>• <strong>Производительность:</strong> Оптимизированная загрузка, кэширование, lazy loading</li>
                  <li>• <strong>UX/UI:</strong> Адаптивный дизайн, темная тема, интуитивная навигация</li>
                  <li>• <strong>Масштабируемость:</strong> Модульная архитектура, компонентный подход</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Перспективы развития:</h4>
                <div className="bg-muted p-4 rounded">
                  <p className="text-sm mb-3">
                    У проекта есть значительные перспективы развития. Можно добавить:
                  </p>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Систему достижений и наград для игроков</li>
                    <li>• Турниры и соревнования между пользователями</li>
                    <li>• Интеграцию с социальными сетями</li>
                    <li>• Мобильное приложение для iOS и Android</li>
                    <li>• Монетизацию через премиум подписки</li>
                    <li>• AI-рекомендации игр на основе предпочтений</li>
                    <li>• Систему уведомлений в реальном времени</li>
                    <li>• Поддержку других игровых движков (Construct, GameMaker)</li>
                    <li>• Интеграцию с игровыми платформами (Steam, itch.io)</li>
                    <li>• Расширенную аналитику для разработчиков игр</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Области применения:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Коммерческое использование:</h5>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Создание игрового портала для стартапа</li>
                      <li>• Корпоративная платформа для обучающих игр</li>
                      <li>• Маркетплейс инди-игр</li>
                      <li>• Образовательная платформа с геймификацией</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Образовательное использование:</h5>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Изучение современных веб-технологий</li>
                      <li>• Освоение архитектурных паттернов React</li>
                      <li>• Практика работы с базами данных</li>
                      <li>• Изучение систем аутентификации и авторизации</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Итог:</strong> Разработанный игровой портал представляет собой полнофункциональное 
                  веб-приложение, готовое к коммерческому использованию. Проект демонстрирует 
                  современные подходы к разработке веб-приложений, обеспечивает высокий уровень 
                  безопасности и производительности, а также предоставляет отличный пользовательский опыт. 
                  Гибкая архитектура позволяет легко расширять функционал и адаптировать платформу 
                  под различные бизнес-требования.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Documentation;
