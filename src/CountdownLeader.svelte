<script>
  import { tweened } from 'svelte/motion';
  import { onMount, createEventDispatcher } from 'svelte';
  import { backIn } from 'svelte/easing';

  export let radiusMax;
  export let delayFactor;

  const fillPercentStore = tweened(100, {duration: 3000}),
      radiusStore = tweened(2, {delay: (2500 * delayFactor), duration: 3000, easing: backIn}),
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

<svg class='leader' width={radiusMax * 4} height={radiusMax * 4} viewBox="0 0 {radiusMax * 4} {radiusMax * 4}">
  <circle r={$radiusStore} cx={radiusMax * 2} cy={radiusMax * 2} fill="transparent" 
    stroke="black"
    stroke-width={doubleR}
    stroke-dasharray="{$fillPercentStore * circumfrence/100} {circumfrence}"
    transform="rotate(-90, {radiusMax * 2}, {radiusMax * 2}) translate(0, {radiusMax * 4}) scale(1,-1)"
  />
</svg>