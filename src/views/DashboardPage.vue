<template>
  <MainNavbar />
  <div class="container">
    <div class="actions-buttons">
        <button class="btn-primary">Categorias</button>
        <button class="btn-secondary" @click="showModal = true">Nova Despesa</button>
        <ModalComponent v-if="showModal" @close="showModal = false">
            <h2>Nova Despesa</h2>
            <form @submit.prevent="onSubmit">
                <div class="input-group">
                    <input v-model="description.value" :ref="description.ref" type="text" placeholder="Descrição">
                    <p v-if="description.error" class="error">{{ description.error.message }}</p>
                </div>
                <div class="input-group">
                    <label for="category">Categoria</label>
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
                    <input v-model="amount.value" :ref="amount.ref" type="number" placeholder="Valor R$">
                    <p v-if="amount.error" class="error">{{ amount.error.message }}</p>
                </div>
                <div class="input-group">
                    <input v-model="date.value" :ref="date.ref" type="date" placeholder="Data">
                    <p v-if="date.error" class="error">{{ date.error.message }}</p>
                </div>
                <button type="submit">Salvar</button>
                <button @click="showModal = false">Fechar</button>
            </form>
        </ModalComponent>
    </div>

    <div class="table-container">
      <table class="table-latitude">
        <caption>Despesas</caption>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Valor</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
          <tr class="filters">
            <th></th>
            <th><input type="text" placeholder="Filtrar categoria" /></th>
            <th><input type="text" placeholder="Filtrar valor" /></th>
            <th><input type="text" placeholder="Filtrar data" /></th>
            <th>
                <button>Filtrar</button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="expense in expenses" :key="expense.id">
            <th>{{ expense.description }}</th>
            <td>{{ categories.find(cat => cat.id === expense.category_id)?.name || '—' }}</td>
            <td>{{ expense.amount }}</td>
            <td>{{ expense.date }}</td>
            <th>
                <button class="btn-create">Visualizar</button>
                <button class="btn-edit">Editar</button>
                <button class="btn-delete">Excluir</button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import MainNavbar from "@/components/MainNavbar.vue";
import ModalComponent from "@/components/ModalComponent.vue";
import { onMounted, ref } from 'vue'
import { createExpense, getExpenses } from "@/services/expense";
import { getCategories } from "@/services/category";
import { useForm } from 'vue-hooks-form';
import { useToast } from 'vue-toastification';

export default {
    setup() {
        const showModal = ref(false);
        const categories = ref([]);
        const expenses = ref([]);
        const $toast = useToast();
        onMounted(async () => {
            try {
                const response = await getCategories();
                const responseExpenses = await getExpenses();
                categories.value = response.data.items;
                expenses.value = responseExpenses.data.items;
            } catch (error) {
                console.error('Erro ao buscar categorias:', error)
            }
        });

        const { useField, handleSubmit } = useForm({
            defaultValues: {},
        });
        const description = useField('description', {
            rule: { required: true, message: 'A descrição e obrigatorio' },
        });
        const category = useField('category_id', {
            rule: { required: true, message: 'A categoria e obrigatorio', type: 'number' },
        });
        const amount = useField('amount', {
            rule: { required: true, message: 'O valor e obrigatorio', type: 'number' },
        });
        const date = useField('date', {
            rule: { required: true, message: 'A data e obrigatorio' },
        });

        const onSubmit = handleSubmit(async (values) => {
            try {
                showModal.value = false;
                await createExpense(values);
                $toast.success('Despesa criada com sucesso');
            } catch (err) {
                console.log(err);
                $toast.error('Erro ao criar despesa');
            }
        });

        return {
            showModal,
            description,
            category,
            amount,
            date,
            onSubmit,
            categories,
            expenses
        };
    },
    components: {
        MainNavbar,
        ModalComponent,
    }
}

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

    body {
        background-color: $background;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 1rem;
    }

    .actions-buttons {
        display: flex;
        flex-wrap: wrap;
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

        .btn-primary {
            background-color: $lfs-blue;
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

    .table-container {
        overflow-x: auto;
    }

    .table-latitude {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    caption {
        text-transform: uppercase;
        font-weight: bold;
        color: $lfs-yellow;
        text-align: center;
        margin-bottom: 0.5rem;
    }

    thead {
        border-top: 2px solid $lfs-yellow;
        border-bottom: 2px solid $lfs-yellow;

        th {
        text-transform: uppercase;
        text-align: center;
        padding: 0.75rem;
        color: $lfs-blue;
        border: 1px solid #f1f1f1;
        white-space: nowrap;
        }

        .filters th {
        padding: 0.4rem;

        input {
            width: 100%;
            padding: 0.4rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 0.9rem;
        }
        }
    }

    tbody {
        tr {
        border-bottom: 1px solid #f1f1f1;
        color: $lfs-grey;

        td,
        th {
            padding: 0.75rem;
            border: 1px solid #f1f1f1;
            text-align: center;
        }

        th {
            text-align: left;
        }
        }
    }
    }

    @media (max-width: 600px) {
        .actions-buttons {
            flex-direction: column;

            button {
            width: 100%;
            }
        }

        .table-latitude thead th {
            font-size: 0.8rem;
            padding: 0.5rem;
        }

        .table-latitude tbody td,
        .table-latitude tbody th {
            font-size: 0.9rem;
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

    input, select {
        @include input-style;
        width: 100%; 
        box-sizing: border-box;
    }

    .error {
        color: $error-color;
    }

    @mixin button-style {
        padding: 0.6rem 1.2rem;
        border-radius: 6px;
        border: none;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.3s;
        color: white;

        &:hover {
            background-color: darken($lfs-blue, 8%);
        }
    }

    .btn-create {
        @include button-style;
        background-color: $lfs-blue;
        color: white;
    }

    .btn-edit {
        @include button-style;
        background-color: $lfs-yellow;
        color: #333;
    }

    .btn-delete {
        @include button-style;
        background-color: $error-color;
        color: white;
    }
</style>
