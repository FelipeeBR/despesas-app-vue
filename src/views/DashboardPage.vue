<template>
  <MainNavbar />
  <div class="container">
    <div class="actions-buttons">
        <button class="btn-primary">Categorias</button>
        <button class="btn-secondary" @click="showModal = true">Nova Despesa</button>
        <ModalComponent v-if="showModal" @close="showModal = false">
            <h2>Nova Despesa</h2>
            <p>Formulário ou conteúdo do modal vai aqui...</p>
            <button @click="showModal = false">Fechar</button>
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
          </tr>
          <tr class="filters">
            <th></th>
            <th><input type="text" placeholder="Filtrar categoria" /></th>
            <th><input type="text" placeholder="Filtrar valor" /></th>
            <th><input type="text" placeholder="Filtrar data" /></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Fatura</th>
            <td>Cartão</td>
            <td>200.00</td>
            <td>20/09/2025</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import MainNavbar from "@/components/MainNavbar.vue";
import ModalComponent from "@/components/ModalComponent.vue";
import { ref } from 'vue'

const showModal = ref(false)
</script>

<style lang="scss" scoped>
    $background: #efefef;
    $lfs-blue: #006ac6;
    $lfs-yellow: #fab700;
    $lfs-grey: #75787b;
    $primary-color: #3498db;
    $border-color: #ddd;
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

    input {
        @include input-style;
        width: 100%; 
        box-sizing: border-box;
    }
</style>
