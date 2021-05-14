<script>
  import { tweened } from 'svelte/motion';
  import { onMount } from 'svelte';

  const fillPercentStore = tweened(100, {duration: 2000}),
    radiusStore = tweened(0, {duration: 5000}),
    radiusMax = 5, doubleRadMax = radiusMax * 2, quadrupleRadMax = radiusMax * 4;

  let doubleR, circumfrence;
  
  $: {
    doubleR = $radiusStore * 2;
    circumfrence = doubleR * Math.PI;
  } 

  onMount(async () => {
    radiusStore.set(radiusMax).then(_ => {
      fillPercentStore.set(0);
    });
	});

</script>

<svg width={quadrupleRadMax} height={quadrupleRadMax} viewBox="0 0 {quadrupleRadMax} {quadrupleRadMax}">
  <circle r={$radiusStore} cx={doubleRadMax} cy={doubleRadMax} fill="transparent" 
    stroke="black"
    stroke-width={doubleR}
    stroke-dasharray="{$fillPercentStore * circumfrence/100} {circumfrence}"
    transform="rotate(-90, {doubleRadMax}, {doubleRadMax}) translate(0, {quadrupleRadMax}) scale(1,-1)"
  />
</svg>

<style>
  svg {
    width: 200px;
    height: 200px;
  }
</style>