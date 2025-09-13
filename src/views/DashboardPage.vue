<template>
    <div>
        <h1>Dashboard</h1>
        <p>Seja bem-vindo!</p>
        <button @click="logout">Sair</button>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const logout = async () => {
    localStorage.removeItem("token");
    router.push("/login");
};
</script>
