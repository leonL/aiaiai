<script>
  import { tweened } from 'svelte/motion';
  import { onMount, createEventDispatcher } from 'svelte';
  import { expoOut } from 'svelte/easing';

  export let piSlice;
  export let radiusMax;

  let showPiSliceVal = false;

  const fillPercentStore = tweened(100, {duration: 1500}),
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
    showPiSliceVal = true;
    await fillPercentStore.set(0);
    dispatch('countdownComplete', true);
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
{#if showPiSliceVal}
  <div class='pi-slice'>
    {piSlice}
  </div>
{/if}

<style>
  .leader {
    border: 0px solid pink;
  }
  .pi-slice {
    position: absolute;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-family: 'Heebo', sans-serif;
    font-size: 10vw;
    font-weight: 400;
    /* border: 1px solid black; */
  }
</style>