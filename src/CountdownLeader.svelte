<script>
  import { tweened } from 'svelte/motion';
  import { onMount, createEventDispatcher } from 'svelte';
  import { backIn } from 'svelte/easing';

  export let radiusMax;
  export let delayFactor;
  
  const  doubleRadMax = radiusMax * 2, quadrupleRadMax = radiusMax * 4,
    dispatch = createEventDispatcher(), 
    radius = tweened(2, {delay: (2500 * delayFactor), duration: 3000, easing: backIn}),
    fillPercent = tweened(100, {duration: 3000});

  let doubleR, circumfrence;
  
  $: {
    doubleR = $radius * 2;
    circumfrence = doubleR * Math.PI;
  } 

  onMount(async () => {
    await radius.set(radiusMax);
    dispatch('leaderDilated', true);
    await fillPercent.set(0);
    dispatch('leaderWiped', true);
	});

</script>

<svg class='leader' width={quadrupleRadMax} height={quadrupleRadMax} viewBox="0 0 {quadrupleRadMax} {quadrupleRadMax}">
  <circle r={$radius} cx={doubleRadMax} cy={doubleRadMax} fill="transparent" 
    stroke="black"
    stroke-width={doubleR}
    stroke-dasharray="{$fillPercent * circumfrence/100} {circumfrence}"
    transform="rotate(-90, {doubleRadMax}, {doubleRadMax}) translate(0, {quadrupleRadMax}) scale(1,-1)"
  />
</svg>