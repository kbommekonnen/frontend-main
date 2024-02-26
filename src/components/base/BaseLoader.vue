<template>
  <div class="text-primary">
    <div class="base-loader">...</div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
export default {}
</script>

<style>
.base-loader {
  /* -webkit-animation: 4s linear 0s infinite alternate move_eye; */
  animation: 2s linear 0s infinite alternate move_eye;
}
@keyframes move_eye {
  0% {
    transform: rotate(-5deg);
    opacity: 0.3;
    margin-left: 0px;
    margin-top: 0px;
  }
  100% {
    transform: rotate(5deg);
    opacity: 0.8;
    width: 200px;
    height: 200px;
  }
  /* 50% {
		transform: rotate(80deg);
		margin-left: 200px;
		margin-top: 200px;
	}
	100% {
		margin-left: 400px;
		margin-top: 0px;
	} */
}
.spin {
  -webkit-animation: spin 2s infinite linear;
  animation: spin 2s infinite linear;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
