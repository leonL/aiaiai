<script>
  import { tweened } from 'svelte/motion';
  import { onMount, createEventDispatcher } from 'svelte';
  import { expoOut } from 'svelte/easing';

  const fillPercentStore = tweened(100, {duration: 750}),
      radiusStore = tweened(0.5, {delay: 1500, duration: 3000, easing: expoOut}),
    radiusMax = 1, doubleRadMax = radiusMax * 2, quadrupleRadMax = radiusMax * 4,
    dispatch = createEventDispatcher();

  let doubleR, circumfrence;
  
  $: {
    doubleR = $radiusStore * 2;
    circumfrence = doubleR * Math.PI;
  } 

  onMount(async () => {
    radiusStore.set(radiusMax)
      .then(_ => { 
        dispatch('expansionComplete', true);
        fillPercentStore.set(0)
          .then(_ => dispatch('wipeComplete', true))
      });
	});

</script>

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
  height: 200px;
}
svg {
  width: 200px;
  height: 200px;
}
</style>