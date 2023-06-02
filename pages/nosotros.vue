<template>
  <section>
    <app-slider :slider="images.nosotros.slider" />

    <div class="mt-5">
      <app-message class="text-lg lg:!text-2xl" message="Bio" />
    </div>
    <div class="px-7 pt-6 md:px-24 lg:flex lg:gap-3 lg:my-10">
      <p class="text-xs md:text-base lg:border-r-2">
        Cora Luisa Galavis diseña bolsos de cuero contemporáneos, conocidos en
        toda Venezuela por su luxe appeal y estética urbana. Bajo la marca Cora
        Cuero, Cora Luisa ofrece una vasta colección de diseños reconocidos por
        los intrincados cortes y siluetas, todos hechos a mano. Tanto
        sofisticados como vanguardistas, los bolsos de Cora Luisa son ideales
        para la mujer que es conocida por su estilo chic y elegancia. <br />
        <br />
        Después de graduarse en Arte en el Moore College of Art en Filadelfia, y
        luego en Diseño Gráfico en el Instituto de Diseño Newman en Caracas,
        Cora Luisa consiguió un trabajo como Directora de Arte para una empresa
        de belleza y cosmética en Venezuela. Su pasión empresarial por la
        industria de la moda comenzó como una actividad secundaria. Durante las
        noches y los fines de semana, Cora Luisa abría su taller a amigos para
        venderles cinturones y accesorios. A través de la continua
        experimentación con el arte de trabajar el cuero y sus texturas y
        colores, Cora Luisa se especializó en bandoleras y carteras.
        <br />
        <br />
        Hechos a mano en Venezuela por Cora Luisa, una experta artesana del
        cuero, los bolsos Cora Cuero son conocidos por su funcionalidad y son
        codiciados como piezas únicas y especiales por los venezolanos y ahora
        los miamenses. También en España y Noruega.
      </p>
      <hr class="my-8 lg:hidden" />
      <p class="text-xs md:text-base">
        Cora Luisa Galavis designs contemporary leather handbags, known
        throughout Venezuela for their luxe appeal and urban aesthetic. Under
        the brand name Cora Cuero, Cora Luisa offers a vast collection of
        designs recognized for the intricate cuts and silhouettes, all handmade.
        Both sophisticated and edgy, Cora Luisa’s handbags are ideal for the
        woman who is known for her chic style and elegance.
        <br />
        <br />
        After graduating in Art from the Moore College of Art in Philadelphia,
        and later in Graphic Design from the Instituto de Diseño Newman in
        Caracas, Cora Luisa secured a job as an Art Director for a beauty and
        cosmetics company in Venezuela. Her entrepreneurial passion for the
        fashion industry started as a sideline to her day job. During evenings
        and weekends, Cora Luisa opened her home-based studio to friends selling
        belts and jewelry. As Cora Luisa continued to experiment in
        leathercrafting with textures and colors, she graduated to pocketbooks,
        crossbodies and handbags.

        <br />
        <br />

        Handmade in Venezuela by Cora Luisa, a skilled artisan in
        leathercrafting, Cora Cuero bags are known for their functionality and
        are coveted as one-of-a-kind, limited pieces by Venezuelan and now,
        Miamians. Also in Spain and Norway.
      </p>
    </div>
    <div class="mt-5">
      <app-message
        class="text-lg px-8 py-8 lg:(!text-2xl !px-16 py-10)"
        message='"El producto viene de un animal. Esto debería invitarnos a cuidarlo y llevarlo con orgullo. Es una inversión en una pieza que sabemos vamos a utilizar y mantener por mucho tiempo"'
        half-mode
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import images from '~/data/images.json';
</script>
