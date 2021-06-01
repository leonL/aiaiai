<script>
  import { tweened } from 'svelte/motion';
  import { onMount, createEventDispatcher } from 'svelte';

  export let radiusMax;
  export let delayFactor;

  const fillPercentTween = tweened(100, {duration: 1000}),
    radiusTween = tweened(2, {delay: (750 * delayFactor), duration: 150}),
    doubleRadiusMax = radiusMax * 2, quadrupleRadiusMax = radiusMax * 4,
    dispatch = createEventDispatcher();

  let doubleR, circumfrence;
  
  $: {
    doubleR = $radiusTween * 2;
    circumfrence = doubleR * Math.PI;
  } 

  onMount(async () => {
    await radiusTween.set(radiusMax)
    dispatch('leaderDilated', true);
    await fillPercentTween.set(0)
    dispatch('leaderWiped', true);
	});

</script>

<svg class='leader' width={quadrupleRadiusMax} height={quadrupleRadiusMax} viewBox="0 0 {quadrupleRadiusMax} {quadrupleRadiusMax}">
  <circle r={$radiusTween} cx={doubleRadiusMax} cy={doubleRadiusMax} fill="transparent" 
    stroke="white"
    stroke-width={doubleR}
    stroke-dasharray="{$fillPercentTween * circumfrence/100} {circumfrence}"
    transform="rotate(-90, {doubleRadiusMax}, {doubleRadiusMax}) translate(0, {quadrupleRadiusMax}) scale(1,-1)"
  />
</svg>