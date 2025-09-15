<template>
    <MainNavbar />
    <div class="container">
        <h1>Detalhes da despesa</h1>
        <div v-if="expense">
            <form @submit.prevent="onSubmit">
                <div class="input-group">
                     <textarea id="description" name="description" v-model="description.value"
                        :ref="description.ref" placeholder="Digite a descrição" rows="4"></textarea>
                    <p v-if="description.error" class="error">{{ description.error.message }}</p>
                </div>
                <div class="input-group">
                    <select id="category" v-model="category.value" :ref="category.ref">
                        <option value="" disabled>Selecione uma categoria</option>
                        <option
                        v-for="category in categories"
                        :key="category.id"
                        :value="category.id"
                        >
                        {{ category.name }}
                        </option>
                    </select>
                    <p v-if="category.error" class="error">{{ category.error.message }}</p>
                </div>
                <div class="input-group">
                    <input v-model="amount.value" :ref="amount.ref" type="text" placeholder="Valor R$">
                    <p v-if="amount.error" class="error">{{ amount.error.message }}</p>
                </div>
                <div class="input-group">
                    <input v-model="date.value" :ref="date.ref" type="date" placeholder="Data">
                    <p v-if="date.error" class="error">{{ date.error.message }}</p>
                </div>
                <div class="actions-buttons">
                    <button type="submit" class="btn-secondary">Salvar</button>
                    <button class="btn-delete">Excluir</button>
                </div>
            </form>
        </div>

        <div v-else>
            <p>Carregando...</p>
        </div>
    </div>
</template>

<script>
import MainNavbar from "@/components/MainNavbar.vue";
import { onMounted, ref, toRef, watch } from 'vue';
import { getExpenseId, updateExpense } from '@/services/expense';
import { getCategories } from "@/services/category";
import { useForm } from 'vue-hooks-form';
import { useToast } from 'vue-toastification';
import { useRouter } from "vue-router";

export default {
    props: ['id'],
    setup(props) {
        const expenseId = toRef(props, 'id');
        const expense = ref(null);
        const categories = ref([]);
        const $toast = useToast();
        const router = useRouter();
        onMounted(async () => {
            try {
                const response = await getExpenseId(expenseId.value);
                const responseCategories = await getCategories();
                expense.value = response.data.data;
                categories.value = responseCategories.data.items;
            } catch (error) {
                console.error('Erro ao buscar despesa:', error);
            }
        });

        const { useField, handleSubmit } = useForm({
            defaultValues: {
                description: '',
                category_id: '',
                amount: '',
                date: '',
            },
        });
        const description = useField('description', {
            rule: { required: true, message: 'A descrição e obrigatorio' },
        });
        const category = useField('category_id', {
            rule: { required: true, message: 'A categoria e obrigatorio', type: 'number' },
        });
        const amount = useField('amount', {
            rule: { required: true },
        });
        const date = useField('date', {
            rule: { required: true, message: 'A data e obrigatorio' },
        });

        watch(expense, (newExpense) => {
            if(newExpense) {
                description.value = newExpense.description;
                category.value = newExpense.category_id;
                amount.value = parseFloat(newExpense.amount.replace(/,/g, '.'));
                date.value = newExpense.date;
            }
        });

        const onSubmit = handleSubmit(async (values) => {
            try {
                await updateExpense(expenseId.value, values);
                router.push("/dashboard");
                $toast.success('Despesa atualizada com sucesso');
            } catch (error) {
                console.error('Erro ao atualizar despesa:', error);
                $toast.error('Ocorreu um erro ao atualizar a despesa');
            }
        });

        return { expenseId, expense, description, category, amount, date, onSubmit, categories };
    },
    components: {
        MainNavbar,
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

    .actions-buttons {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 1.5rem;

        button {
            padding: 0.6rem 1.2rem;
            border-radius: 6px;
            border: none;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        .btn-delete {
            background-color: $error-color;
            color: white;

            &:hover {
            background-color: darken($lfs-blue, 8%);
            }
        }

        .btn-secondary {
            background-color: $lfs-yellow;
            color: #333;

            &:hover {
            background-color: darken($lfs-yellow, 8%);
            }
        } 
    }
    @mixin input-style {
        width: 100%;
        padding: 14px 20px;
        margin: auto;
        border: 1px solid $border-color;
        border-radius: 5px;
        font-size: 16px;
        transition: $transition;
        background-color: white;
        
        &:focus {
            outline: none;
            border-color: $primary-color;
            box-shadow: 0 0 0 3px rgba($primary-color, 0.1);
        }
        
        &::placeholder {
            color: #95a5a6;
        }
    }

    .input-group {
        margin-bottom: 20px;
        padding: 0;
    }

    input, select, textarea {
        @include input-style;
        width: 100%; 
        box-sizing: border-box;
    }

    .error {
        color: $error-color;
    }
</style>