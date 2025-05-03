
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
            <UploadGameForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Upload;
