<script>
  import { tweened } from 'svelte/motion';
  import { onMount } from 'svelte';

  const fillPercentStore = tweened(100, {duration: 2000}),
    radiusStore = tweened(0.5, {delay: 5000, duration: 3000}),
    radiusMax = 5, doubleRadMax = radiusMax * 2, quadrupleRadMax = radiusMax * 4;

  let doubleR, circumfrence, leaderCountdownComplete = false;
  
  $: {
    doubleR = $radiusStore * 2;
    circumfrence = doubleR * Math.PI;
  } 

  onMount(async () => {
    radiusStore.set(radiusMax)
      .then(_ => { 
        leaderCountdownComplete = true;
        fillPercentStore.set(0);
      });
	});

</script>

{#if leaderCountdownComplete}
<span class='char'>3</span>
{/if}
<div class="fullstop">
  <svg width={quadrupleRadMax} height={quadrupleRadMax} viewBox="0 0 {quadrupleRadMax} {quadrupleRadMax}">
    <circle r={$radiusStore} cx={doubleRadMax} cy={doubleRadMax} fill="transparent" 
      stroke="black"
      stroke-width={doubleR}
      stroke-dasharray="{$fillPercentStore * circumfrence/100} {circumfrence}"
      transform="rotate(-90, {doubleRadMax}, {doubleRadMax}) translate(0, {quadrupleRadMax}) scale(1,-1)"
    />
  </svg>
</div>

<style>
.fullstop {
  position: absolute;
  width: 100%;
  bottom: 0px;
}
svg {
  width: 200px;
  height: 200px;
}
.char {
  font-family: sans-serif;
  font-size: 200px;
  height: 250px;
  color: black;
}

</style>