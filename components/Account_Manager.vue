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

import { Plus as ElIconPlus, QuestionFilled } from '@element-plus/icons-vue';


const accountsStore = useAccountsStore();


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
  padding: 20px; 
}

.header-with-button {
  display: flex;
  align-items: center;
  gap: 10px; 
  margin-bottom: 20px; 
}

h2 {
  margin: 0; 
  font-size: 28px; 
  font-weight: normal; 
}

.add-account-button {
 
  width: 36px;
  height: 36px;
  font-size: 20px;
}

.info-alert {
  margin-bottom: 20px; 
  border-left: 5px solid var(--el-color-info);
  background-color: var(--el-color-info-light-9); 
  color: var(--el-color-info);
}


.info-alert :deep(.el-alert__icon) {
    font-size: 20px; 
    width: 20px;
    margin-right: 8px; 
}

.info-alert :deep(.el-alert__content) {
  font-size: 14px;
}

</style>
