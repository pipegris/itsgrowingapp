<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <RouterLink to="/" class="navbar-brand">
        <img
          alt="ItsGrowingApp logo"
          class="logo"
          src="@/assets/task-done-flat.png"
          width="48"
          height="48"
        />
        It's Growing App!</RouterLink
      >
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <RouterLink to="/reading" class="nav-link">List</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/reading/add" class="nav-link">New</RouterLink>
        </li>
      </ul>
    </nav>
    <notifications position="bottom right" />

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  name: "app",
};
</script>
