# Управление учётными записями

Этот проект представляет собой интерфейс для управления учётными записями пользователей. Он позволяет добавлять, редактировать и удалять записи с логинами и паролями, поддерживает разные типы учётных записей (например, "Локальная" и "LDAP"), а также визуально удобно группирует данные.

## Задача

Создать SPA-приложение с использованием Vue 3, TypeScript и Element Plus, реализующее интерфейс для управления пользовательскими записями с возможностью:

- Ввода одной или нескольких меток;
- Указания типа учётной записи;
- Ввода логина и пароля (с возможностью скрытия/отображения);
- Добавления и удаления записей;
- Автоматического обновления интерфейса при изменении данных.


## Структура проекта

```bash
project-root/
├── index.html                  # Главный HTML-шаблон, используется Vite
├── src/
│   ├── components/
│   │   ├── Account_Item.vue        # Компонент одной записи
│   │   └── Account_Manager.vue     # Основной компонент со списком
│   ├── stores/
│   │   └── accounts.ts             # Pinia-хранилище для списка аккаунтов
│   ├── router/
│   │   └── index.ts                # Vue Router с маршрутом по умолчанию
│   ├── assets/
│   │   └── style.scss              # Глобальные стили
│   ├── types/
│   │   └── index.ts                # Общие типы
│   ├── App.vue                     # Главный шаблон
│   └── main.ts                     # Точка входа приложения
├── tsconfig.json                  # Конфигурация TypeScript
├── vite.config.ts                 # Конфигурация Vite
