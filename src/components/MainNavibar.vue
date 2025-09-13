<template>
  <div class="navbar">
    <div class="nav-links">
      <router-link to="/dashboard">Home</router-link>
    </div>
    <button @click="logout" class="logout">Sair</button>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "MainNavibar",
  setup() {
    const router = useRouter();
    const logout = () => {
      localStorage.removeItem("token");
      router.push("/login");
    };
    return { logout };
  },
};
</script>

<style lang="scss">
    $background-navbar: #333;
    $text-color: #fff;
    $hover-color: #3498db;
    $error-color: #e74c3c;
    $box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    $transition: all 0.3s ease;

    .navbar {
        background-color: $background-navbar;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 24px;
        box-shadow: $box-shadow;
    }

    .nav-links {
        display: flex;
        gap: 20px;

        a {
            color: $text-color;
            text-decoration: none;
            font-weight: 500;
            transition: $transition;

            &:hover {
            color: $hover-color;
            transform: translateY(-1px);
            }
        }
    }

    .logout {
        background-color: $error-color;
        color: $text-color;
        border: none;
        border-radius: 6px;
        padding: 8px 16px;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        transition: $transition;
        display: inline-block; 
        width: auto;
        flex-shrink: 0;

        &:hover {
            background-color: darken($error-color, 10%);
            transform: translateY(-2px);
            box-shadow: $box-shadow;
        }

        &:active {
            transform: translateY(0);
        }
    }
</style>
