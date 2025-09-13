<template>
    <div class="register-container">
        <div>
            <h1 class="title">Crie sua conta</h1>
            <form @submit="onSubmit">
                <div class="input-group">
                    <input v-model="name.value" :ref="name.ref" :class="{ 'error-input': name.error }" type="text" placeholder="Nome" />
                    <p v-if="name.error" class="error">{{ name.error.message }}</p>
                </div>
                <div class="input-group">
                    <input v-model="email.value" :ref="email.ref" :class="{ 'error-input': email.error }" type="email" placeholder="Email" />
                    <p v-if="email.error" class="error">{{ email.error.message }}</p>
                </div>
                <div class="input-group">
                    <input v-model="password.value" :ref="password.ref" :class="{ 'error-input': password.error }" type="password" placeholder="Senha" />
                    <p v-if="password.error" class="error">{{ password.error.message }}</p>
                </div>
                <button type="submit" :disabled="loading" aria-busy="loading">
                    <span v-if="!loading">Registrar</span>
                    <span v-else>Carregando...</span>
                </button>
            </form>
            <p v-if="apiError" class="error api-error">{{ apiError }}</p>
        </div>
        <p class="login-link">
            Já possui uma conta? <router-link to="/login">Login</router-link>
        </p> 
    </div>
</template>

<script>
import api from "../services/api";
import { useRouter } from "vue-router";
import { useForm } from 'vue-hooks-form';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';


export default {
    setup() {
        const router = useRouter();
        const loading = ref(false);
        const apiError = ref(null);
        const $toast = useToast();
        const { useField, handleSubmit } = useForm({
            defaultValues: {},
        });
        const name = useField('name', {
            rule: { required: true, message: 'O nome é obrigatório' },
        })
        const email = useField('email', {
            rule: { required: true, email: true, message: 'O email é obrigatório' },
        });
        const password = useField('password', {
            rule: { 
                required: true,
                min: 6, 
                message: 'A senha deve ter pelo menos 6 caracteres',
            },
        });

        const onSubmit = handleSubmit(async (values) => {
            try {
                loading.value = true;
                const response = await api.post("/user", {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                });
                localStorage.setItem("token", response.data.access_token);
                router.push("/login");
            } catch (err) {
                loading.value = false;
                if(err.status === 422) {
                    apiError.value = "Este email já está em uso. Por favor, utilize outro.";
                }
                $toast.error("Este email já está em uso.", {
                    position: "top-right",
                    closeButton: false
                });
            }
        });
        return { name, email, password, onSubmit, loading, apiError };
    }
};
</script>

<style lang="scss" scoped>

    $primary-color: #3498db;
    $primary-hover: #2980b9;
    $secondary-color: #2ecc71;
    $background-color: #f8f9fa;
    $text-color: #2c3e50;
    $border-color: #ddd;
    $error-color: #e74c3c;
    $box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    $transition: all 0.3s ease;


    @mixin flex-center {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @mixin input-style {
        width: 100%;
        padding: 14px 20px;
        margin: auto;
        border: 2px solid $border-color;
        border-radius: 8px;
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

    @mixin button-style {
        width: 100%;
        padding: 14px 20px;
        background: linear-gradient(135deg, $primary-color, $primary-hover);
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: $transition;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        
        &:hover {
            background: linear-gradient(135deg, $primary-hover, darken($primary-hover, 10%));
            transform: translateY(-2px);
            box-shadow: $box-shadow;
        }
        
        &:active {
            transform: translateY(0);
        }
    }

    .register-container {
        min-height: 100vh;
        @include flex-center;
        background: #f8f9fa;
        padding: 20px;
        flex-direction: column;
    
        > div {
            background: white;
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            width: 100%;
            max-width: 400px;
            backdrop-filter: blur(10px);
        }
    }

    .title {
        text-align: center;
        color: $text-color;
        font-size: 2.5rem;
        font-weight: 500;
        margin-bottom: 2rem;
        background: linear-gradient(135deg, $primary-color, $secondary-color);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    form {
        display: flex;
        flex-direction: column;
        padding: 0;
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


    button {
        @include button-style;
        margin-top: 1rem;
    }


    @media (max-width: 480px) {
        .register-container {
            > div {
            padding: 30px 10px;
            }
        }
        
        .title {
            font-size: 2rem;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
        }

        .register-container > div {
        animation: fadeIn 0.6s ease-out;
    }

    button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none !important;
    }

    .error-message {
        color: $error-color;
        font-size: 13px;
        margin-top: 4px;
    }

    .login-link {
        margin-top: 1rem;
        text-align: center;
    }

    .error {
        color: $error-color;
    }

    .error-input {
        border-color: $error-color !important;
    }

</style>
