<template>
  <div class="wp-hero">
    <video class="wp-hero-video" autoplay muted loop>
      <source src="@/assets/wp-connecting-wildlife-bg.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div class="wp-hero-content">
      <h1 class="wp-hero-header">
        Unlimited Wildlife Connection: Join enthusiasts worldwide to share discoveries.
      </h1>
      <p class="wp-hero-description">
        Engage in lively discussion and debate about your wildlife findings, embracing the true
        spirit of nature. Let the world discover the wonders of rare species through your
        contributions.
      </p>
      <button class="wp-hero-button">Start now</button>
    </div>
  </div>
</template>

<style scoped>
.wp-hero {
  position: relative;
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  max-width: 1200px;
  align-items: center;
}

.wp-hero-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.wp-hero-content {
  z-index: 1;
  width: 100%;
}

.wp-hero-header {
  font-size: 2rem;
  margin: 25px 0;
}

.wp-hero-description {
  font-size: 1.25rem;
  margin: 25px 0;
  max-width: 800px;
}

.wp-hero-button {
  padding: 10px 20px;
  font-size: 1.2rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.wp-hero-button:hover {
  background-color: var(--primary-dark);
}
</style>
