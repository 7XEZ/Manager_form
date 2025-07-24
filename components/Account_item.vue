<template>
  <div class="account-item">
    <el-input
      v-model="form.labelInput"
      placeholder="Метка (через ;)"
      :maxlength="50"
      :class="{ error: form.errors.labelInput }"
      @blur="() => onBlur('labelInput')"
      clearable
      class="label-input"
    />
    <el-select
      v-model="form.recordType"
      placeholder="Тип записи"
      @change="onRecordTypeChange"
      style="width: 130px;"
      class="record-type-select"
    >
      <el-option label="LDAP" value="LDAP" />
      <el-option label="Локальная" value="Локальная" />
    </el-select>
    <el-input
      v-model="form.login"
      placeholder="Логин"
      :maxlength="100"
      :class="{ error: form.errors.login }"
      @blur="() => onBlur('login')"
      clearable
      class="login-input"
    />
    <el-input
      v-if="form.recordType === 'Локальная'"
      v-model="form.password"
      placeholder="Пароль"
      show-password
      :maxlength="100"
      :class="{ error: form.errors.password }"
      @blur="() => onBlur('password')"
      clearable
      class="password-input"
    />
    <el-button
      type="danger"
      :icon="ElIconDelete" circle
      @click="$emit('remove', props.account.id)"
      title="Удалить запись"
      class="delete-button"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch, computed } from 'vue';
import type { Account, LabelItem, RecordType } from '../stores/accounts';

import { Delete as ElIconDelete } from '@element-plus/icons-vue';


const props = defineProps<{ account: Account }>();
const emit = defineEmits<{
  (e: 'update', account: Account): void;
  (e: 'remove', id: number): void;
}>();

const form = reactive({
  labelInput: '',
  recordType: props.account.recordType,
  login: props.account.login,
  password: props.account.password || '',
  errors: {
    login: false,
    password: false,
    labelInput: false,
  },
});

function labelsToString(labels: LabelItem[]) {
  return labels.map(l => l.text).join(';');
}

form.labelInput = labelsToString(props.account.labels);

function parseLabels(input: string): LabelItem[] {
  return input.split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .map(text => ({ text }));
}

function validate() {
  let valid = true;

  form.errors.login = !(form.login && form.login.length <= 100);
  if (form.errors.login) valid = false;

  if (form.recordType === 'Локальная') {
    form.errors.password = !(form.password && form.password.length <= 100);
    if (form.errors.password) valid = false;
  } else {
    form.errors.password = false;
  }

  form.errors.labelInput = form.labelInput.length > 50;
  if (form.errors.labelInput) valid = false;

  return valid;
}

function onBlur(field: 'login' | 'password' | 'labelInput') {
  if (!validate()) return;

  const updatedAccount: Account = {
    id: props.account.id,
    recordType: form.recordType,
    login: form.login,
    password: form.recordType === 'LDAP' ? null : form.password,
    labels: parseLabels(form.labelInput),
  };

  emit('update', updatedAccount);
}

function onRecordTypeChange() {
  if (form.recordType === 'LDAP') {
    form.password = '';
    onBlur('password'); 
  }
  
  onBlur('recordType' as any); 
}


watch(() => props.account, (newVal) => {
  form.labelInput = labelsToString(newVal.labels);
  form.recordType = newVal.recordType;
  form.login = newVal.login;
  form.password = newVal.password || '';
}, { deep: true });

</script>

<style scoped>
.account-item {
  display: flex;
  align-items: center;
  gap: 10px; 
  margin-bottom: 10px; 
  padding: 8px 0;


.label-input,
.record-type-select,
.login-input,
.password-input {
  flex-basis: 150px; 
  flex-grow: 1;
  max-width: 250px; 

/* Специфическая ширина для выпадающего списка */
.record-type-select {
  flex-basis: 120px; /* По изображению он немного уже */
  max-width: 140px;
}

/* Ширина для поля пароля при его отображении */
.password-input {
  flex-basis: 200px; /* Пароль чуть шире */
  max-width: 250px;
}

/* Кнопка удаления */
.delete-button {
  flex-shrink: 0; /* Не сжимать кнопку */
  margin-left: 10px; /* Отступ от предыдущего поля */
  width: 36px; /* Ширина для круглой кнопки */
  height: 36px; /* Высота для круглой кнопки */
}

.error :deep(.el-input__inner),
.error :deep(.el-textarea__inner) {
  border-color: var(--el-color-danger) !important; /* Красная рамка для ошибок */
}

/* Если нужно задать ширину колонок явно, можно использовать flex-basis с конкретными значениями
   для каждого поля, а не просто flex-grow.
   Например:
   .label-input { flex-basis: 250px; }
   .record-type-select { flex-basis: 130px; }
   .login-input { flex-basis: 200px; }
   .password-input { flex-basis: 200px; }
*/
</style>
