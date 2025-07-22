<template>
  <div class="account-manager-container">
    <div class="header-with-button">
      <h2>Учетные записи</h2>
      <el-button
        type="primary"
        :icon="ElIconPlus" circle
        @click="addAccount"
        title="Добавить запись"
        class="add-account-button"
      />
    </div>

    <el-alert
      title="Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;"
      type="info"
      :closable="false"
      show-icon
      class="info-alert"
    >
      <template #icon>
        <el-icon><QuestionFilled /></el-icon> </template>
    </el-alert>

    <div class="account-items-list">
      <AccountItem
        v-for="acc in accountsStore.accounts"
        :key="acc.id"
        :account="acc"
        @update="updateAccount"
        @remove="removeAccount"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useAccountsStore, subscribeStorePersistence } from '../stores/accounts';
import AccountItem from './Account_item.vue';
// Импорт иконок Element Plus
import { Plus as ElIconPlus, QuestionFilled } from '@element-plus/icons-vue';


const accountsStore = useAccountsStore();

// Подписка на сохранение состояния в localStorage (из вашего accounts.ts)
subscribeStorePersistence(accountsStore);

onMounted(() => {
  accountsStore.loadFromLocalStorage();
});

function addAccount() {
  accountsStore.addEmpty();
}

function updateAccount(account: typeof accountsStore.accounts[0]) {
  accountsStore.updateAccount(account);
}

function removeAccount(id: number) {
  accountsStore.removeAccount(id);
}
</script>

<style scoped>
.account-manager-container {
  padding: 20px; /* Отступ от краев main */
}

.header-with-button {
  display: flex;
  align-items: center;
  gap: 10px; /* Расстояние между заголовком и кнопкой */
  margin-bottom: 20px; /* Отступ под заголовком и кнопкой */
}

h2 {
  margin: 0; /* Убираем стандартные отступы у h2 */
  font-size: 28px; /* Чуть крупнее, чем стандартный h2 */
  font-weight: normal; /* По изображению кажется, что не жирный */
}

.add-account-button {
  /* Возможно, нужно увеличить размер, если стандартный маленький */
  width: 36px;
  height: 36px;
  font-size: 20px;
}

.info-alert {
  margin-bottom: 20px; /* Отступ под подсказкой */
  border-left: 5px solid var(--el-color-info); /* Более выразительная левая граница */
  background-color: var(--el-color-info-light-9); /* Легкий фон */
  color: var(--el-color-info);
}

/* Переопределение стиля иконки в El-Alert для соответствия изображению */
.info-alert :deep(.el-alert__icon) {
    font-size: 20px; /* Размер иконки */
    width: 20px; /* Ширина контейнера иконки */
    margin-right: 8px; /* Отступ справа от иконки */
}

.info-alert :deep(.el-alert__content) {
  font-size: 14px;
}

.account-items-list {
  /* Здесь могут быть дополнительные стили для размещения списка AccountItem,
     например, gap, если они не будут растягиваться */
}
</style>