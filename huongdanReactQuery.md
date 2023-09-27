Để các component khác cũng như component cha nhận biết được khi thêm hoặc xoá một game khỏi danh mục yêu thích ở bất kỳ component nào, ta cần sử dụng React Query với một cache chung (queryClient) và sử dụng hàm invalidateQueries để đánh dấu các query đã lưu trong cache cần phải được cập nhật lại.

Dưới đây là một ví dụ về cách triển khai điều này:

1. Cài đặt React Query và Axios:
   npm install react-query axios

2. Trong file \_app.tsx, cung cấp QueryClientProvider với một instance của queryClient cho toàn bộ ứng dụng:

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
return (
<QueryClientProvider client={queryClient}>
<Component {...pageProps} />
</QueryClientProvider>
);
}

export default MyApp;

3. Tạo một file api.ts để setup Axios instance và xác thực header:
   // api.ts
   import axios from 'axios';
   import { useAuth } from 'your-auth-library';

const instance = axios.create({
baseURL: '/api',
});

// Xác thực header
instance.interceptors.request.use((config) => {
const { accessToken } = useAuth();

if (accessToken) {
config.headers.Authorization = `Bearer ${accessToken}`;
}

return config;
});

export default instance;

4. Trong Component cha AllGames, sử dụng React Query để lấy dữ liệu và các mutation:
   import { useQuery, useMutation, useQueryClient } from 'react-query';
   import api from './api';
   import { useRouter } from 'next/router';

const AllGames: React.FC = () => {
const router = useRouter();
const queryClient = useQueryClient();

const { data: games, isLoading } = useQuery('games', async () => {
const { data } = await api.get('/games', { params: { limit: 10, page: 1 } });
return data;
});

const addFavorite = useMutation<{ gameId: number }, void>(async ({ gameId }) => {
await api.post('/favorites', { gameId });
queryClient.invalidateQueries('gameFavorites');
});

const removeFavorite = useMutation<{ gameId: number }, void>(async ({ gameId }) => {
await api.delete('/favorites', { data: { gameId } });
queryClient.invalidateQueries('gameFavorites');
});

const handleAddFavorite = (gameId: number) => {
addFavorite.mutate({ gameId });
};

const handleRemoveFavorite = (gameId: number) => {
removeFavorite.mutate({ gameId });
};

if (isLoading) {
return <div>Loading games...</div>;
}

return (
<div>
{games?.map((game) => {
const isFavorite = game.isFavorite ?? false;

        return (
          <div key={game.id}>
            <span>{game.name}</span>
            {isFavorite ? (
              <button onClick={() => handleRemoveFavorite(game.id)}>Bỏ yêu thích</button>
            ) : (
              <button onClick={() => handleAddFavorite(game.id)}>Yêu thích</button>
            )}
          </div>
        );
      })}
    </div>

);
};

export default AllGames;

4. Trong Component con NewGames và PopularGames, thực hiện tương tự như Component cha AllGames:

import { useQuery, useMutation, useQueryClient } from 'react-query';
import api from './api';
import { useRouter } from 'next/router';

const NewGames: React.FC = () => {
const router = useRouter();
const queryClient = useQueryClient();

const { data: newGames, isLoading } = useQuery('newGames', async () => {
const { data } = await api.get('/games/newest');
return data;
});

const addFavorite = useMutation<{ gameId: number }, void>(async ({ gameId }) => {
await api.post('/favorites', { gameId });
queryClient.invalidateQueries('gameFavorites');
});

const removeFavorite = useMutation<{ gameId: number }, void>(async ({ gameId }) => {
await api.delete('/favorites', { data: { gameId } });
queryClient.invalidateQueries('gameFavorites');
});

const handleAddFavorite = (gameId: number) => {
addFavorite.mutate({ gameId });
};

const handleRemoveFavorite = (gameId: number) => {
removeFavorite.mutate({ gameId });
};

if (isLoading) {
return <div>Loading new games...</div>;
}

return (
<div>
{newGames?.map((game) => {
const isFavorite = game.isFavorite ?? false;

        return (
          <div key={game.id}>
            <span>{game.name}</span>
            {isFavorite ? (
              <button onClick={() => handleRemoveFavorite(game.id)}>Bỏ yêu thích</button>
            ) : (
              <button onClick={() => handleAddFavorite(game.id)}>Yêu thích</button>
            )}
          </div>
        );
      })}
    </div>

);
};

export default NewGames;

5. Trong Component con PopularGames:
   import { useQuery, useMutation, useQueryClient } from 'react-query';
   import api from './api';
   import { useRouter } from 'next/router';

const PopularGames: React.FC = () => {
const router = useRouter();
const queryClient = useQueryClient();

const { data: popularGames, isLoading } = useQuery('popularGames', async () => {
const { data } = await api.get('/games/popular');
return data;
});

const addFavorite = useMutation<{ gameId: number }, void>(async ({ gameId }) => {
await api.post('/favorites', { gameId });
queryClient.invalidateQueries('gameFavorites');
});

const removeFavorite = useMutation<{ gameId: number }, void>(async ({ gameId }) => {
await api.delete('/favorites', { data: { gameId } });
queryClient.invalidateQueries('gameFavorites');
});

const handleAddFavorite = (gameId: number) => {
addFavorite.mutate({ gameId });
};

const handleRemoveFavorite = (gameId: number) => {
removeFavorite.mutate({ gameId });
};

if (isLoading) {
return <div>Loading popular games...</div>;
}

return (
<div>
{popularGames?.map((game) => {
const isFavorite = game.isFavorite ?? false;

        return (
          <div key={game.id}>
            <span>{game.name}</span>
            {isFavorite ? (
              <button onClick={() => handleRemoveFavorite(game.id)}>Bỏ yêu thích</button>
            ) : (
              <button onClick={()
