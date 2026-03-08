import React, { useEffect, useState } from 'react';
import './App.css';
import { SearchBar } from './components/SearchBar';
import { UserCard } from './components/UserCard';
import { Pagination } from './components/Pagination';
import type { User } from './types';

const PAGE_SIZE_OPTIONS = [6, 9, 18];
const DEFAULT_PAGE_SIZE = PAGE_SIZE_OPTIONS[0];

interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchUsers() {
      setIsLoading(true);
      setError(null);

      try {
        const skip = page * pageSize;
        const baseUrl = 'https://dummyjson.com';
        const query = searchQuery.trim();

        const endpoint = query
          ? `/users/search?q=${encodeURIComponent(query)}&limit=${pageSize}&skip=${skip}`
          : `/users?limit=${pageSize}&skip=${skip}`;

        const response = await fetch(`${baseUrl}${endpoint}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Не удалось загрузить пользователей.');
        }

        const data: UsersResponse = await response.json();
        setUsers(data.users);
        setTotal(data.total);
      } catch (e) {
        if (e instanceof DOMException && e.name === 'AbortError') {
          return;
        }

        const message = e instanceof Error ? e.message : 'Произошла неизвестная ошибка.';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    void fetchUsers();

    return () => controller.abort();
  }, [page, pageSize, searchQuery]);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setSearchQuery(searchInput);
      setPage(0);
    }, 500);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [searchInput]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const handleFirstPage = () => {
    setPage(0);
  };

  const handlePrevPage = () => {
    setPage((prev: number) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setPage((prev: number) => Math.min(totalPages - 1, prev + 1));
  };

  const handleLastPage = () => {
    setPage(totalPages - 1);
  };

  const handlePageSizeChange = (nextPageSize: number) => {
    setPage(0);
    setPageSize(nextPageSize);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-main">
          <h1 className="app-title">Каталог пользователей</h1>
        </div>

        <SearchBar value={searchInput} onChange={setSearchInput} />
      </header>

      <main className="app-content">
        {isLoading && users.length === 0 ? (
          <div className="status-message">Загрузка пользователей...</div>
        ) : error ? (
          <div className="status-message status-message--error">{error}</div>
        ) : users.length === 0 ? (
          <div className="status-message">Пользователи не найдены.</div>
        ) : (
          <>
            <section className="users-grid">
              {users.map((user: User) => (
                <UserCard key={user.id} user={user} />
              ))}
            </section>

            <Pagination
              page={page}
              totalPages={totalPages}
              total={total}
              pageSize={pageSize}
              pageSizeOptions={PAGE_SIZE_OPTIONS}
              isLoading={isLoading}
              hasResults={users.length > 0}
              onFirst={handleFirstPage}
              onPrev={handlePrevPage}
              onNext={handleNextPage}
              onLast={handleLastPage}
              onPageSizeChange={handlePageSizeChange}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default App;

