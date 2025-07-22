<template>
  <el-container>
    <el-header style="text-align: center; font-weight: bold; font-size: 24px; padding: 20px;">
      Управление учётными записями
    </el-header>
    <el-main>
      <AccountsManager />
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import AccountsManager from './components/Account_Manager.vue';
</script>
