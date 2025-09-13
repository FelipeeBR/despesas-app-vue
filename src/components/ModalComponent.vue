<template>
    <div class="modal-overlay" @click.self="close">
        <div class="modal-content">
            <button class="close-btn" @click="close">×</button>
            <slot />
        </div>
    </div>
</template>

<script setup>
    /* eslint-disable */
    const emit = defineEmits(['close'])

    function close() {
        emit('close')
    }
</script>

<style scoped>
    .modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 50;
    }

    .modal-content {
        background: #fff;
        padding: 2rem;
        border-radius: 12px;
        max-width: 500px;
        width: 90%;
        position: relative;
    }

    .close-btn {
        position: absolute;
        top: 8px;
        right: 12px;
        background: transparent;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
    }
</style>
