
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldAlert, Trash2, UserX } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type User = {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  isBanned?: boolean;
};

type Game = {
  id: string;
  title: string;
  authorId: string;
  authorName: string;
};

type Comment = {
  id: string;
  content: string;
  gameId: string;
  gameTitle: string;
  userId: string;
  username: string;
  createdAt: Date;
};

export const AdminPanel = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Загрузка данных при монтировании компонента
  useEffect(() => {
    const loadData = async () => {
      if (!user?.isAdmin) {
        toast.error("У вас нет прав администратора");
        return;
      }
      
      setIsLoading(true);
      try {
        // Загрузка пользователей
        const { data: usersData, error: usersError } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (usersError) throw usersError;
        
        // Загрузка игр
        const { data: gamesData, error: gamesError } = await supabase
          .from('games')
          .select(`
            *,
            profiles:author_id (username)
          `)
          .order('created_at', { ascending: false });
        
        if (gamesError) throw gamesError;
        
        // Загрузка комментариев
        const { data: commentsData, error: commentsError } = await supabase
          .from('comments')
          .select(`
            *,
            profiles:user_id (username),
            games:game_id (title)
          `)
          .order('created_at', { ascending: false });
        
        if (commentsError) throw commentsError;
        
        // Форматирование данных
        setUsers(usersData.map(u => ({
          id: u.id,
          username: u.username,
          email: u.email || '',
          createdAt: new Date(u.created_at),
          isBanned: u.is_banned || false
        })));
        
        setGames(gamesData.map(g => ({
          id: g.id,
          title: g.title,
          authorId: g.author_id,
          authorName: g.profiles?.username || 'Неизвестный автор'
        })));
        
        setComments(commentsData.map(c => ({
          id: c.id,
          content: c.content,
          gameId: c.game_id,
          gameTitle: c.games?.title || 'Неизвестная игра',
          userId: c.user_id,
          username: c.profiles?.username || 'Неизвестный пользователь',
          createdAt: new Date(c.created_at)
        })));
        
      } catch (error) {
        console.error("Ошибка загрузки данных для админ-панели:", error);
        toast.error("Не удалось загрузить данные");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [user]);
  
  // Функция для бана пользователя
  const banUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_banned: true })
        .eq('id', userId);
      
      if (error) throw error;
      
      toast.success("Пользователь заблокирован");
      
      // Обновляем список пользователей
      setUsers(users.map(u => 
        u.id === userId ? { ...u, isBanned: true } : u
      ));
    } catch (error) {
      console.error("Ошибка при блокировке пользователя:", error);
      toast.error("Не удалось заблокировать пользователя");
    }
  };
  
  // Функция для разбана пользователя
  const unbanUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_banned: false })
        .eq('id', userId);
      
      if (error) throw error;
      
      toast.success("Пользователь разблокирован");
      
      // Обновляем список пользователей
      setUsers(users.map(u => 
        u.id === userId ? { ...u, isBanned: false } : u
      ));
    } catch (error) {
      console.error("Ошибка при разблокировке пользователя:", error);
      toast.error("Не удалось разблокировать пользователя");
    }
  };
  
  // Функция для удаления игры
  const deleteGame = async (gameId: string) => {
    try {
      const { error } = await supabase
        .from('games')
        .delete()
        .eq('id', gameId);
      
      if (error) throw error;
      
      toast.success("Игра удалена");
      
      // Обновляем список игр
      setGames(games.filter(g => g.id !== gameId));
    } catch (error) {
      console.error("Ошибка при удалении игры:", error);
      toast.error("Не удалось удалить игру");
    }
  };
  
  // Функция для удаления комментария
  const deleteComment = async (commentId: string) => {
    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId);
      
      if (error) throw error;
      
      toast.success("Комментарий удален");
      
      // Обновляем список комментариев
      setComments(comments.filter(c => c.id !== commentId));
    } catch (error) {
      console.error("Ошибка при удалении комментария:", error);
      toast.error("Не удалось удалить комментарий");
    }
  };
  
  // Функции фильтрации
  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredGames = games.filter(game => 
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.authorName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredComments = comments.filter(comment => 
    comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comment.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comment.gameTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  if (!user?.isAdmin) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Доступ запрещен</CardTitle>
          <CardDescription>У вас нет прав администратора</CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-red-500" />
            <span>Панель администратора</span>
          </CardTitle>
          <CardDescription>
            Управляйте играми, комментариями и пользователями
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input 
              placeholder="Поиск..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>
          
          <Tabs defaultValue="users" className="space-y-4">
            <TabsList>
              <TabsTrigger value="users">
                Пользователи ({filteredUsers.length})
              </TabsTrigger>
              <TabsTrigger value="games">
                Игры ({filteredGames.length})
              </TabsTrigger>
              <TabsTrigger value="comments">
                Комментарии ({filteredComments.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="users" className="space-y-4">
              {isLoading ? (
                <div className="text-center py-4">Загрузка пользователей...</div>
              ) : filteredUsers.length === 0 ? (
                <div className="text-center py-4">Пользователи не найдены</div>
              ) : (
                <div className="border rounded-md divide-y">
                  {filteredUsers.map((user) => (
                    <div 
                      key={user.id} 
                      className={`p-4 flex items-center justify-between ${user.isBanned ? 'bg-red-50' : ''}`}
                    >
                      <div>
                        <div className="font-medium">
                          {user.username}
                          {user.isBanned && (
                            <span className="ml-2 text-sm text-red-500 font-normal">(Заблокирован)</span>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                      <div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              {user.isBanned ? (
                                <>Разблокировать</>
                              ) : (
                                <>
                                  <UserX className="h-4 w-4 mr-1" />
                                  <span>Заблокировать</span>
                                </>
                              )}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                {user.isBanned ? "Разблокировать пользователя" : "Заблокировать пользователя"}
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                {user.isBanned
                                  ? `Вы уверены, что хотите разблокировать пользователя ${user.username}?`
                                  : `Вы уверены, что хотите заблокировать пользователя ${user.username}? Пользователь не сможет публиковать комментарии или загружать игры.`
                                }
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Отмена</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={() => user.isBanned ? unbanUser(user.id) : banUser(user.id)}
                              >
                                {user.isBanned ? "Разблокировать" : "Заблокировать"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="games" className="space-y-4">
              {isLoading ? (
                <div className="text-center py-4">Загрузка игр...</div>
              ) : filteredGames.length === 0 ? (
                <div className="text-center py-4">Игры не найдены</div>
              ) : (
                <div className="border rounded-md divide-y">
                  {filteredGames.map((game) => (
                    <div key={game.id} className="p-4 flex items-center justify-between">
                      <div>
                        <div className="font-medium">{game.title}</div>
                        <div className="text-sm text-muted-foreground">Автор: {game.authorName}</div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(`/game/${game.id}`, '_blank')}
                        >
                          Просмотр
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="h-4 w-4 mr-1" />
                              <span>Удалить</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Удалить игру</AlertDialogTitle>
                              <AlertDialogDescription>
                                Вы уверены, что хотите удалить игру "{game.title}"? Это действие нельзя отменить.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Отмена</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={() => deleteGame(game.id)}
                              >
                                Удалить
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="comments" className="space-y-4">
              {isLoading ? (
                <div className="text-center py-4">Загрузка комментариев...</div>
              ) : filteredComments.length === 0 ? (
                <div className="text-center py-4">Комментарии не найдены</div>
              ) : (
                <div className="border rounded-md divide-y">
                  {filteredComments.map((comment) => (
                    <div key={comment.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{comment.username}</div>
                          <div className="text-sm text-muted-foreground">
                            К игре: {comment.gameTitle} • {new Date(comment.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="h-4 w-4 mr-1" />
                              <span>Удалить</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Удалить комментарий</AlertDialogTitle>
                              <AlertDialogDescription>
                                Вы уверены, что хотите удалить этот комментарий? Это действие нельзя отменить.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Отмена</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={() => deleteComment(comment.id)}
                              >
                                Удалить
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                      <div className="mt-2 p-3 bg-muted/50 rounded-md">
                        {comment.content}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
