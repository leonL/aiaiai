<script>
  import { tweened } from 'svelte/motion';
  import { onMount, createEventDispatcher } from 'svelte';
  import { expoOut } from 'svelte/easing';

  export let radiusMax;

  const fillPercentStore = tweened(100, {duration: 3000}),
      radiusStore = tweened(2, {delay: 1500, duration: 3000, easing: expoOut}),
    doubleRadMax = radiusMax * 2, quadrupleRadMax = radiusMax * 4,
    dispatch = createEventDispatcher();

  let doubleR, circumfrence;
  
  $: {
    doubleR = $radiusStore * 2;
    circumfrence = doubleR * Math.PI;
  } 

  onMount(async () => {
    await radiusStore.set(radiusMax);
    dispatch('leaderDilated', true);
    await fillPercentStore.set(0);
    dispatch('leaderWiped', true);
	});

</script>

<svg class='leader' width={quadrupleRadMax} height={quadrupleRadMax} viewBox="0 0 {quadrupleRadMax} {quadrupleRadMax}">
  <circle r={$radiusStore} cx={doubleRadMax} cy={doubleRadMax} fill="transparent" 
    stroke="black"
    stroke-width={doubleR}
    stroke-dasharray="{$fillPercentStore * circumfrence/100} {circumfrence}"
    transform="rotate(-90, {doubleRadMax}, {doubleRadMax}) translate(0, {quadrupleRadMax}) scale(1,-1)"
  />
</svg>

<style>
  .leader {
    border: 0px solid pink;
  }
</style>