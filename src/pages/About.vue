<template>
  <Layout>
    <h2>About Page - {{title}}</h2>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, ex deleniti, tempore earum magni voluptates impedit ut voluptatum dignissimos, nam amet. Perferendis explicabo alias fugit facilis repellat fugiat illum ab.</p>
  </Layout>
</template>

<script>
export default {
  data: () => ({
    title: 'My page'
  })
}
</script>

<style scoped>
h2 {
  color: #aaa;
}
</style>