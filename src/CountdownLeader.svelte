<script>
  import { tweened } from 'svelte/motion';
  import { onMount, createEventDispatcher } from 'svelte';

  export let radiusMax;
  export let delayFactor;

  const fillPercent = tweened(100, {duration: 3000, delay: 100}),
    radius = tweened(2, {delay: (2500 * delayFactor), duration: 3000}),
    dispatch = createEventDispatcher();

  let doubleR, circumfrence;
  
  $: {
    doubleR = $radius * 2;
    circumfrence = doubleR * Math.PI;
  } 

  onMount(() => {
    console.log(radiusMax);
    radius.set(radiusMax).then(() => {
      dispatch('leaderDilated', true);
      fillPercent.set(0).then(() => {
        dispatch('leaderWiped', true);
      });
    })
	});

</script>

<svg class='leader' width={radiusMax * 4} height={radiusMax * 4} viewBox="0 0 {radiusMax * 4} {radiusMax * 4}">
  <circle r={$radius} cx={radiusMax * 2} cy={radiusMax * 2} fill="transparent" 
    stroke="black"
    stroke-width={doubleR}
    stroke-dasharray="{$fillPercent * circumfrence/100} {circumfrence}"
    transform="rotate(-90, {radiusMax * 2}, {radiusMax * 2}) translate(0, {radiusMax * 4}) scale(1,-1)"
  />
</svg>