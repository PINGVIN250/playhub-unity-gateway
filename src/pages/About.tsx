
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTitle } from "@/components/PageTitle";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      <main className="flex-1 py-24">
        <div className="container mx-auto px-4">
          <PageTitle 
            title="О UnityPlay"
            description="Наша миссия и видение для платформы игр Unity"
          />
          
          <div className="glass-card p-8 mb-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Наша история</h2>
              <p className="text-muted-foreground mb-6">
                UnityPlay был создан с простой миссией: предоставить разработчикам Unity платформу для демонстрации своих игр и связи с игроками по всему миру. Наша команда увлеченных геймеров и разработчиков создала эту платформу для поддержки растущего сообщества независимых создателей игр.
              </p>
              
              <h2 className="text-2xl font-bold mb-4">Почему Unity WebGL?</h2>
              <p className="text-muted-foreground mb-6">
                Опция сборки Unity WebGL позволяет играм работать прямо в браузере без необходимости скачивания или установки чего-либо игроками. Это создает беспрепятственный опыт для игроков и более широкую аудиторию для разработчиков. Мы верим в силу веб-игр, делающих отличный игровой опыт более доступным для каждого.
              </p>
              
              <h2 className="text-2xl font-bold mb-4">Наше видение</h2>
              <p className="text-muted-foreground mb-6">
                Мы представляем будущее, где независимые разработчики игр могут легко делиться своими творениями с миром, получать ценные отзывы и строить сообщества вокруг своих игр. UnityPlay стремится быть мостом, соединяющим талантливых разработчиков с энтузиастами-игроками.
              </p>
              
              <h2 className="text-2xl font-bold mb-4">Для разработчиков</h2>
              <p className="text-muted-foreground mb-6">
                Если вы разработчик Unity, UnityPlay предлагает простой способ загрузить ваши WebGL сборки и поделиться ими с миром. Создайте аккаунт, загрузите вашу игру и начните собирать отзывы от игроков. Наша платформа управляет хостингом и предоставляет вам информацию о том, как игроки взаимодействуют с вашим творением.
              </p>
              
              <h2 className="text-2xl font-bold mb-4">Для игроков</h2>
              <p className="text-muted-foreground mb-6">
                Откройте для себя новые и захватывающие игры от талантливых разработчиков со всего мира. Играйте прямо в вашем браузере без загрузок или установок. Поддерживайте независимых создателей игр, играя в их игры и предоставляя отзывы.
              </p>
              
              <h2 className="text-2xl font-bold mb-4">Присоединяйтесь к нашему сообществу</h2>
              <p className="text-muted-foreground">
                Независимо от того, являетесь ли вы разработчиком, желающим продемонстрировать свои игры, или игроком, стремящимся открыть для себя новые впечатления, мы приглашаем вас присоединиться к сообществу UnityPlay. Вместе мы можем создать яркую платформу, которая прославляет творчество и инновации в разработке игр.
              </p>
            </div>
          </div>
          
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Познакомьтесь с командой</h2>
            <p className="text-muted-foreground mb-12">
              Наша команда состоит из увлеченных геймеров, разработчиков и дизайнеров, которые верят в силу инди-разработки игр.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="h-12 w-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg">Алексей Петров</h3>
                <p className="text-muted-foreground">Основатель и Ведущий разработчик</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="h-12 w-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg">Мария Иванова</h3>
                <p className="text-muted-foreground">UX Дизайнер</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="h-12 w-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg">Дмитрий Смирнов</h3>
                <p className="text-muted-foreground">Менеджер сообщества</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
