import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserData({ id }) {
  // Стан для зберігання даних, стану завантаження та помилок
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Асинхронна функція для отримання даних
  useEffect(() => {
    // Визначаємо асинхронну функцію
    const fetchData = async () => {
      setLoading(true);  // Встановлюємо стан завантаження на true
      setError(null);     // Скидаємо попередні помилки

      try {
        // Виконуємо запит до API за допомогою axios
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        setData(response.data);  // Оновлюємо стан даних
      } catch (err) {
        setError('Сталася помилка при завантаженні даних.');  // Оновлюємо стан помилки
      } finally {
        setLoading(false);  // Завжди скидаємо стан завантаження на false
      }
    };

    fetchData(); // Викликаємо асинхронну функцію
  }, [id]);  // Масив залежностей містить id, тому ефект викликається при зміні id

  // Відображення різних станів
  if (loading) {
    return <div>Завантаження даних...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (data) {
    return (
      <div>
        <h1>Інформація про користувача</h1>
        <p>Ім'я: {data.name}</p>
        <p>Електронна пошта: {data.email}</p>
        <p>Адреса: {data.address.city}</p>
      </div>
    );
  }

  return null;
}

export default UserData;
