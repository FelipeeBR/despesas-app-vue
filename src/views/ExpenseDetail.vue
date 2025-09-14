<template>
    <MainNavbar />
    <div class="container">
        <h1>Detalhes da despesa {{ expenseId }}</h1>
        <div v-if="expense">
            <p>Nome: {{ expense.name }}</p>
            <p>Descrição: {{ expense.description }}</p>
            <p>Valor: {{ expense.amount }}</p>
            <p>Data: {{ expense.date }}</p>
        </div>

        <div v-else>
            <p>Carregando...</p>
        </div>
    </div>
</template>

<script>
import MainNavbar from "@/components/MainNavbar.vue";
import { onMounted, ref, toRef } from 'vue';
import { getExpenseId } from '@/services/expense';

export default {
    props: ['id'],
    setup(props) {
        const expenseId = toRef(props, 'id');
        const expense = ref(null);
        onMounted(async () => {
            try {
                const response = await getExpenseId(expenseId.value);
                expense.value = response.data.data;
            } catch (error) {
                console.error('Erro ao buscar despesa:', error);
            }
        });

        return { expenseId, expense };
    },
    components: {
        MainNavbar
    }
};
</script>

<style lang="scss" scoped>
    $background: #efefef;
    $lfs-blue: #006ac6;
    $lfs-yellow: #fab700;
    $lfs-grey: #75787b;
    $primary-color: #3498db;
    $border-color: #ddd;
    $error-color: #e74c3c;
    $transition: all 0.3s ease;

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 1rem;
    }
</style>