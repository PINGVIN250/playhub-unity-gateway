
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTitle } from "@/components/PageTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Users, Gamepad, Shield, Heart, MessageSquare } from "lucide-react";

const CommunityRules = () => {
  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      <main className="flex-1 py-24">
        <div className="container mx-auto px-4">
          <PageTitle 
            title="Правила сообщества UnityPlay"
            description="Ознакомьтесь с правилами для создания дружелюбной и безопасной среды для всех участников"
          />
          
          <div className="grid gap-6 max-w-4xl mx-auto">
            <Card className="border-red-200 bg-red-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <AlertTriangle className="h-5 w-5" />
                  Важно знать
                </CardTitle>
              </CardHeader>
              <CardContent className="text-red-700">
                <p>
                  Нарушение правил сообщества может привести к предупреждению, временной или постоянной блокировке аккаунта. 
                  Мы стремимся поддерживать дружелюбную и безопасную среду для всех пользователей.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  1. Уважение к другим пользователям
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Относитесь к другим пользователям с уважением и вежливостью</li>
                  <li>• Запрещены оскорбления, угрозы и дискриминация любого рода</li>
                  <li>• Избегайте конфликтов и споров в комментариях</li>
                  <li>• Не публикуйте личную информацию других пользователей</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gamepad className="h-5 w-5 text-green-500" />
                  2. Качество контента и игр
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Загружайте только работающие и протестированные игры</li>
                  <li>• Предоставляйте точные описания и скриншоты ваших игр</li>
                  <li>• Не загружайте копии чужих игр без разрешения автора</li>
                  <li>• Убедитесь, что ваши игры не содержат вредоносного кода</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-500" />
                  3. Запрещенный контент
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-muted-foreground">Строго запрещается размещение контента, содержащего:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Badge variant="destructive" className="justify-start">Насилие и жестокость</Badge>
                    <Badge variant="destructive" className="justify-start">Материалы для взрослых</Badge>
                    <Badge variant="destructive" className="justify-start">Пропаганда ненависти</Badge>
                    <Badge variant="destructive" className="justify-start">Нарушение авторских прав</Badge>
                    <Badge variant="destructive" className="justify-start">Спам и реклама</Badge>
                    <Badge variant="destructive" className="justify-start">Мошенничество</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-orange-500" />
                  4. Правила комментирования
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Оставляйте конструктивные отзывы об играх</li>
                  <li>• Не используйте комментарии для спама или рекламы</li>
                  <li>• Избегайте множественных одинаковых комментариев</li>
                  <li>• Сообщайте о технических проблемах в игре вежливо</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-pink-500" />
                  5. Поддержка сообщества
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Поддерживайте начинающих разработчиков конструктивными отзывами</li>
                  <li>• Делитесь полезными советами и опытом</li>
                  <li>• Помогайте другим пользователям решать технические проблемы</li>
                  <li>• Участвуйте в обсуждениях и событиях сообщества</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50/50">
              <CardHeader>
                <CardTitle className="text-blue-700">Обращение к администрации</CardTitle>
              </CardHeader>
              <CardContent className="text-blue-700">
                <p className="mb-3">
                  Если вы столкнулись с нарушением правил или у вас есть вопросы по модерации:
                </p>
                <ul className="space-y-1">
                  <li>• Используйте функцию "Пожаловаться" в соответствующем контенте</li>
                  <li>• Обратитесь к администраторам через личные сообщения</li>
                  <li>• Не занимайтесь самосудом - дайте модераторам разобраться</li>
                </ul>
              </CardContent>
            </Card>

            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Спасибо за то, что помогаете сделать UnityPlay лучшим местом для разработчиков и игроков!
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Последнее обновление правил: {new Date().toLocaleDateString('ru-RU')}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CommunityRules;
