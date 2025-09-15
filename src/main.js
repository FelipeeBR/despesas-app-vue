import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { BiTrashFill, FaPlusSquare, FaEye, HiSolidFilter, FaListUl, FaPenSquare } from "oh-vue-icons/icons";

addIcons(BiTrashFill, FaPlusSquare, FaEye, HiSolidFilter, FaListUl, FaPenSquare);

const app = createApp(App);

app.use(router);
app.use(Toast);
app.component('v-icon', OhVueIcon);
app.mount("#app");
