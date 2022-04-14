<template>
  <!-- <div class="min-h-screen flex flex-col justify-center items-center pb-16">
    <h1 class="text-black font-extrabold text-8xl my-8 text-center">
      Battleship
    </h1>
    <button
      type="button"
      class="bg-black text-white py-4 w-32 rounded hover:bg-gray-700"
    >
      Play
    </button>
  </div> -->
  <div class="min-h-screen flex flex-col justify-center items-center pb-16">
    <h1 class="text-black font-extrabold text-6xl md:text-8xl my-8">
      Battleship
    </h1>
    <router-link
      to="/sessions"
      type="button"
      class="text-center bg-black text-white font-bold py-4 w-32 rounded-full hover:bg-blue-900 transition"
    >
      Play
    </router-link>
  </div>
</template>