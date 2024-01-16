<template>
  <div class="sidebar-wrap">
    <div class="menu">
      <ul>
        <li>Administrator</li>
        <li>
          <router-link to="/admin/products">Product List</router-link>
        </li>
        <li>Analog Function</li>
        <li><router-link to="/customer_order">Orders</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
