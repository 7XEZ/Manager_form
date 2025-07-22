import { defineStore } from 'pinia';
import { watch } from 'vue';

export interface LabelItem {
  text: string;
}

export type RecordType = 'LDAP' | 'Локальная';

export interface Account {
  id: number;
  labels: LabelItem[]; // массив объектов { text: string }
  recordType: string;
  login: string;
  password: string | null;
}

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: [] as Account[],
    nextId: 1,
  }),
  actions: {
    addEmpty() {
      this.accounts.push({
        id: this.nextId,
        labels: [],
        recordType: 'LDAP',
        login: '',
        password: null,
      });
      this.nextId++;
    },
    updateAccount(updated: Account) {
      const idx = this.accounts.findIndex(acc => acc.id === updated.id);
      if (idx !== -1) this.accounts[idx] = updated;
    },
    removeAccount(id: number) {
      this.accounts = this.accounts.filter(acc => acc.id !== id);
    },
    loadFromLocalStorage() {
      const data = localStorage.getItem('accounts');
      if (data) {
        const parsed = JSON.parse(data);
        this.accounts = parsed.accounts || [];
        this.nextId = parsed.nextId || 1;
      }
    },
    saveToLocalStorage() {
      localStorage.setItem('accounts', JSON.stringify({
        accounts: this.accounts,
        nextId: this.nextId,
      }));
    }
  },
});

export function subscribeStorePersistence(store: ReturnType<typeof useAccountsStore>) {
  watch(() => store.accounts, () => {
    store.saveToLocalStorage();
  }, { deep: true });
}
