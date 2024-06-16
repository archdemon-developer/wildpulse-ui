<template>
  <div class="wp-card">
    <div class="wp-card-header">
      <slot name="header"></slot>
    </div>
    <div class="wp-card-media">
      <slot name="media"></slot>
    </div>
    <div class="wp-card-content">
      <slot name="content"></slot>
    </div>
    <div class="wp-card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.wp-card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: #fff;
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease;
}

.wp-card-header,
.wp-card-footer {
  padding: 16px 24px;
  background-color: #f1f3f4;
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #e0e0e0;
}

.wp-card-header {
  border-bottom: 1px solid #e0e0e0;
}

.wp-card-footer {
  border-top: 1px solid #e0e0e0;
  text-align: right;
  font-size: 0.875rem;
  color: #777;
}

.wp-card-media {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.wp-card-media img {
  max-width: 100%;
  height: auto;
}

.wp-card-content {
  padding: 16px 24px;
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
}
</style>
