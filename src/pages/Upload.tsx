
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTitle } from "@/components/PageTitle";
import { UploadGameForm } from "@/components/UploadGameForm";

const Upload = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Перенаправляем на страницу входа, если пользователь не аутентифицирован
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      <main className="flex-1 py-24">
        <div className="container mx-auto px-4">
          <PageTitle 
            title="Загрузка игры"
            description="Поделитесь своей Unity WebGL игрой с сообществом"
          />
          
          <div className="glass-card p-6 md:p-8">
            <div className="mb-6 p-4 border rounded-md bg-muted/30">
              <h3 className="font-medium mb-2">Важные параметры игры</h3>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Width (px)</strong> и <strong>Height (px)</strong> - это размеры области для отображения вашей Unity WebGL игры в пикселях.
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Эти значения определяют пропорции и размер игрового окна</li>
                <li>Рекомендуемые значения: 960×600 (соотношение 16:10) или 1280×720 (соотношение 16:9)</li>
                <li>От этих параметров зависит как игра будет масштабироваться на различных устройствах</li>
              </ul>
            </div>
            
            <UploadGameForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Upload;
