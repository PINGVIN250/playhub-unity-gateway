
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
  FormMessage 
} from "@/components/ui/form";
import { useGames } from "@/contexts/GameContext";
import { useNavigate } from "react-router-dom";
import { Upload, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

const uploadFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(50, "Title must be less than 50 characters"),
  description: z.string().min(10, "Description must be at least 10 characters").max(500, "Description must be less than 500 characters"),
  coverImage: z.instanceof(File, { message: "Cover image is required" }),
  gameFile: z.instanceof(File, { message: "Game file is required" }),
  width: z.coerce.number().int().min(300, "Width must be at least 300px").max(1920, "Width must be less than 1920px"),
  height: z.coerce.number().int().min(200, "Height must be at least 200px").max(1080, "Height must be less than 1080px"),
  tags: z.string().transform(val => val.split(",").map(tag => tag.trim()).filter(Boolean))
});

type UploadFormValues = z.infer<typeof uploadFormSchema>;

export function UploadGameForm() {
  const { addGame } = useGames();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  
  const form = useForm<UploadFormValues>({
    resolver: zodResolver(uploadFormSchema),
    defaultValues: {
      title: "",
      description: "",
      width: 960,
      height: 600,
      tags: ""
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

  const handleGameFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("gameFile", file);
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

  const onSubmit = async (data: UploadFormValues) => {
    setIsSubmitting(true);
    try {
      await addGame(
        data.title,
        data.description,
        data.coverImage,
        data.gameFile,
        data.width,
        data.height,
        data.tags
      );
      navigate("/dashboard");
    } catch (error) {
      console.error("Error uploading game:", error);
      toast.error("Failed to upload game. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
                  <FormLabel>Game Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter game title" {...field} />
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your game" 
                      className="resize-none min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="width"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Width (px)</FormLabel>
                    <FormControl>
                      <Input type="number" min={300} max={1920} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height (px)</FormLabel>
                    <FormControl>
                      <Input type="number" min={200} max={1080} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags (comma separated)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="adventure, puzzle, action" 
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
                  <FormLabel>Cover Image</FormLabel>
                  <FormControl>
                    <div className="space-y-3">
                      {coverImagePreview ? (
                        <div className="relative">
                          <img 
                            src={coverImagePreview} 
                            alt="Cover preview" 
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
                            Drag and drop your cover image here, or click to select
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Recommended size: 1280×720 (16:9 ratio)
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
                            Select Image
                          </Button>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gameFile"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Game File (WebGL Build)</FormLabel>
                  <FormControl>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-md p-8 text-center">
                      <Upload className="h-10 w-10 text-muted-foreground/50 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Upload your Unity WebGL build files
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Accepted formats: .zip containing WebGL build
                      </p>
                      <Input
                        id="gameFile"
                        type="file"
                        accept=".zip,.unitypackage"
                        className="hidden"
                        onChange={handleGameFileChange}
                        {...field}
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => document.getElementById("gameFile")?.click()}
                      >
                        Select Game File
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/dashboard")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Upload Game
          </Button>
        </div>
      </form>
    </Form>
  );
}
