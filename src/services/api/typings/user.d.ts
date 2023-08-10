declare namespace API {
  type CurrentUser = {
    userName?: string;
    avatar?: string;
    notifyCount?: number;
    unreadCount?: number;
    permissions: string[];
    phone?: string;
  };
}
