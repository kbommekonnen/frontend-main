<template>
  <div class="home-container text-textDarkest">
    <!-- Hero section -->
    <section class="py-10">
      <div class="container mx-auto text-textMedium">
        <h1 class="text-6xl font-bold text-left mb-4 text-textMedium">
          Seamlessly stock, sell, succeed
        </h1>
        <p class="text-lg">
          Golleta Inventory is a leading provider of advanced inventory
          management systems designed to optimize your business operations and
          maximize efficiency. Our comprehensive software solutions are tailored
          to meet the unique needs of businesses across various industries,
          helping them effectively track, control, and manage their inventory.
        </p>
      </div>
    </section>

    <!-- Features section -->
    <section class="py-10">
      <div class="container mx-auto">
        <h2 class="text-3xl font-bold mb-6 text-center">Features</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center gap-8">
          <!-- Feature cards -->
          <feature-card
            v-for="(feature, index) in features"
            :feature="feature"
            :key="index"
          />
        </div>
      </div>
    </section>
    <section class="py-10">
      <h3 class="text-4xl text-center">
        Golleta Inventory is your trusted partner for optimizing inventory
        operations.
      </h3>
    </section>
    <!-- Pricing section -->
    <section id="pricing" class="py-10">
      <div class="container mx-auto">
        <h2 class="text-3xl font-bold mb-6 text-center">Pricing</h2>
        <p class="text-center">Choose a plan that fits your business needs.</p>
        <!-- Pricing cards -->
        <!-- <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          <div class="bg-white shadow-md p-6 rounded-lg">
            <h3 class="text-xl font-bold mb-2">Starter</h3>
            <p>Perfect for small businesses</p>
            <p class="text-2xl mt-4">$29/month</p>
            <button class="bg-blue-500 text-white rounded-full px-6 py-2 mt-6">
              Get Started
            </button>
          </div>
          <div class="bg-white shadow-md p-6 rounded-lg">
            <h3 class="text-xl font-bold mb-2">Business</h3>
            <p>Great for growing businesses</p>
            <p class="text-2xl mt-4">$99/month</p>
            <button class="bg-blue-500 text-white rounded-full px-6 py-2 mt-6">
              Get Started
            </button>
          </div>
          <div class="bg-white shadow-md p-6 rounded-lg">
            <h3 class="text-xl font-bold mb-2">Enterprise</h3>
            <p>Customized solution for large enterprises</p>
            <p class="text
            -2xl mt-4">Contact Us</p>
            <button class="bg-blue-500 text-white rounded-full px-6 py-2 mt-6">
              Contact Sales
            </button>
          </div>
        </div> -->
        <!-- Add more pricing cards as needed -->
      </div>
    </section>
    <!-- <pricing-card/> -->

    <!-- Clients section -->
    <section class="py-0 ">
      <div class="container mx-auto">
        <h2 v-if="false" class="text-3xl font-bold mb-6 text-center">Our Clients</h2>
        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8"
        >
          <!-- Client logos -->
          <!-- <div class="flex items-center justify-center">
            <img src="client1-logo.png" alt="IQ Corner" class="h-12" />
          </div>
          <div class="flex items-center justify-center">
          </div>
          <div class="flex items-center justify-center">
            <img src="client3-logo.png" alt="Friends Restaurant" class="h-12" />
          </div> -->
          <!-- Add more client logos as needed -->
        </div>
      </div>
    </section>

    <!-- Footer section -->
    <FooterVue />
  </div>
</template>

<script setup>
import FooterVue from "../components/Footer.vue"
import FeatureCard from "../components/FeatureCard.vue"
// import PricingCard from "../components/PricingCard.vue"

const features = [
  {
    icon: "",
    title: "Real-time Inventory Tracking",
    detail:
      "Gain complete visibility into your inventory with our state-of-the-art tracking system. Monitor stock levels, locations, and movement in real-time, ensuring accurate inventory control and minimizing stockouts or overstock situations.",
  },
  {
    icon: "",
    title: "Multi-location Support",
    detail:
      "Manage inventory across multiple locations with ease. Our system allows centralized control and coordination of inventory, ensuring efficient stock movement and replenishment.",
  },
  {
    icon: "",
    title: "Reporting and Analytics",
    detail:
      "Access comprehensive reports and analytics to gain valuable insights into your inventory performance. Identify trends, analyze product profitability, and make data-driven decisions for improved business outcomes.",
  },
  {
    icon: "",
    title: "Demand Forecasting",
    detail:
      "Make informed decisions with advanced demand forecasting capabilities.",
  },
  {
    icon: "",
    title: "User-friendly Interface",
    detail:
      "Our intuitive interface makes it easy for your team to navigate and utilize the system effectively, minimizing training time and ensuring quick adoption.",
  },
]
</script>

<style>
/* Custom CSS styles go here */
@media (max-width: 680px) {
    .home-container {
        @apply px-3
    }    
}

@media (max-width: 1024px) {
    .home-container {
       @apply px-12 
    }    
}
@media (min-width: 1024px) {
    .home-container {
        @apply px-32
    }    
}
</style>
