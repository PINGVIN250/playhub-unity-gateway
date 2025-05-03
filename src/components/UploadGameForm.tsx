
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { useGames } from "@/contexts/GameContext";
import { useNavigate } from "react-router-dom";
import { Upload, X, Loader2, FileUp, File as FileIcon } from "lucide-react";
import { toast } from "sonner";

const uploadFormSchema = z.object({
  title: z.string().min(3, "Название должно содержать минимум 3 символа").max(50, "Название должно содержать не более 50 символов"),
  description: z.string().min(10, "Описание должно содержать минимум 10 символов").max(500, "Описание должно содержать не более 500 символов"),
  coverImage: z.instanceof(File, { message: "Обложка обязательна" }),
  tags: z.string().transform(val => val.split(",").map(tag => tag.trim()).filter(Boolean))
});

type UploadFormValues = z.infer<typeof uploadFormSchema>;

export function UploadGameForm() {
  const { addGame } = useGames();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  const [gameFiles, setGameFiles] = useState<{
    wasm: File | null;
    data: File | null;
    framework: File | null;
    loader: File | null;
    index: File | null;
  }>({
    wasm: null,
    data: null,
    framework: null,
    loader: null,
    index: null
  });
  
  const form = useForm<UploadFormValues>({
    resolver: zodResolver(uploadFormSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: []
    }
  });

  const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("coverImage", file);
      const imageUrl = URL.createObjectURL(file);
      setCoverImagePreview(imageUrl);
    }
  };

  const clearCoverImage = () => {
    form.setValue("coverImage", undefined as any);
    setCoverImagePreview(null);
    const fileInput = document.getElementById("coverImage") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleGameFileChange = (fileType: 'wasm' | 'data' | 'framework' | 'loader' | 'index') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setGameFiles(prev => ({ ...prev, [fileType]: file }));
    }
  };

  const clearGameFile = (fileType: 'wasm' | 'data' | 'framework' | 'loader' | 'index') => {
    setGameFiles(prev => ({ ...prev, [fileType]: null }));
    const fileInput = document.getElementById(`gameFile-${fileType}`) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const onSubmit = async (data: UploadFormValues) => {
    const hasRequiredFiles = gameFiles.wasm && gameFiles.data && gameFiles.framework && gameFiles.loader;
    if (!hasRequiredFiles) {
      toast.error("Пожалуйста, загрузите все необходимые файлы Unity WebGL (как минимум: .wasm, .data, framework.js и loader.js)");
      return;
    }

    setIsSubmitting(true);
    try {
      console.log("Начало загрузки игры с данными:", {
        title: data.title,
        description: data.description,
        coverImage: data.coverImage.name,
        tags: data.tags,
        gameFiles: {
          wasm: gameFiles.wasm?.name,
          data: gameFiles.data?.name,
          framework: gameFiles.framework?.name,
          loader: gameFiles.loader?.name,
          index: gameFiles.index?.name,
        }
      });
      
      await addGame(
        data.title,
        data.description,
        data.coverImage,
        "",
        960, // фиксированное разрешение по умолчанию
        600, // фиксированное разрешение по умолчанию
        data.tags,
        gameFiles
      );
      toast.success("Игра успешно загружена!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Ошибка загрузки игры:", error);
      if (error instanceof Error) {
        toast.error(`Ошибка загрузки: ${error.message}`);
      } else {
        toast.error("Не удалось загрузить игру. Пожалуйста, попробуйте снова.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFileUpload = (fileType: 'wasm' | 'data' | 'framework' | 'loader' | 'index', label: string, extension: string) => {
    const file = gameFiles[fileType];
    const id = `gameFile-${fileType}`;
    
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{label}</p>
          {file && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 px-2"
              onClick={() => clearGameFile(fileType)}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        {file ? (
          <div className="flex items-center gap-2 border rounded px-3 py-2 text-sm">
            <FileIcon className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">{file.name}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Input
              id={id}
              type="file"
              accept={`.${extension}`}
              className="hidden"
              onChange={handleGameFileChange(fileType)}
            />
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              className="w-full"
              onClick={() => document.getElementById(id)?.click()}
            >
              Выбрать {label}
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название игры</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите название игры" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Описание</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Опишите вашу игру" 
                      className="resize-none min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Теги (через запятую)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="приключения, головоломка, экшен" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="coverImage"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Обложка игры</FormLabel>
                  <FormControl>
                    <div className="space-y-3">
                      {coverImagePreview ? (
                        <div className="relative">
                          <img 
                            src={coverImagePreview} 
                            alt="Предварительный просмотр обложки" 
                            className="w-full aspect-video object-cover rounded-md" 
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 rounded-full"
                            onClick={clearCoverImage}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-md p-8 text-center">
                          <Upload className="h-10 w-10 text-muted-foreground/50 mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Перетащите обложку игры сюда или нажмите, чтобы выбрать
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Рекомендуемый размер: 1280×720 (соотношение 16:9)
                          </p>
                          <Input
                            id="coverImage"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleCoverImageChange}
                            {...field}
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            className="mt-4"
                            onClick={() => document.getElementById("coverImage")?.click()}
                          >
                            Выбрать изображение
                          </Button>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Загрузить файлы Unity WebGL</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Загрузите файлы Unity WebGL сборки напрямую. Вам понадобятся как минимум следующие файлы из папки Unity WebGL сборки.
                </p>
              </div>

              <div className="grid gap-3">
                {renderFileUpload('wasm', 'WebAssembly (.wasm)', 'wasm')}
                {renderFileUpload('data', 'Data File (.data)', 'data')}
                {renderFileUpload('framework', 'Framework JS', 'js')}
                {renderFileUpload('loader', 'Loader JS', 'js')}
                {renderFileUpload('index', 'Index HTML (опционально)', 'html')}
              </div>

              <div className="p-4 bg-muted/50 rounded-md mt-2">
                <h3 className="font-medium mb-2 flex items-center">
                  <FileUp className="h-4 w-4 mr-2" />
                  О файлах Unity WebGL
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><strong>Файл .wasm:</strong> Содержит скомпилированный WebAssembly код</li>
                  <li><strong>Файл .data:</strong> Содержит ресурсы и ассеты</li>
                  <li><strong>framework.js:</strong> WebGL фреймворк Unity</li>
                  <li><strong>loader.js:</strong> Загружает и инициализирует контент Unity</li>
                  <li><strong>index.html:</strong> Опционально, содержит HTML обертку</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/dashboard")}
          >
            Отмена
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Загрузить игру
          </Button>
        </div>
      </form>
    </Form>
  );
}
