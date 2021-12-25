<script>
  import { tweened } from 'svelte/motion';
  import { createEventDispatcher } from 'svelte';

  export let radiusMax;
  export let emanate = false;

  const fillPercentTween = tweened(100, {duration: 2000}),
    radiusTween = tweened(2, {delay: 750, duration: 2000}),
    dispatch = createEventDispatcher();
    
  let doubleR, circumfrence, doubleRadiusMax, quadrupleRadiusMax;
  
  $: {
    doubleR = $radiusTween * 2;
    circumfrence = doubleR * Math.PI;
    doubleRadiusMax = radiusMax * 2;
    quadrupleRadiusMax = radiusMax * 4;
  } 

  $: if (emanate) {
    emenate();
	};

  async function emenate() {
    await radiusTween.set(radiusMax)
    dispatch('leaderDilated', true);
    await fillPercentTween.set(0)
    dispatch('leaderWiped', true);
  };

</script>

<svg class='leader' width={quadrupleRadiusMax} height={quadrupleRadiusMax} viewBox="0 0 {quadrupleRadiusMax} {quadrupleRadiusMax}">
  <circle r={$radiusTween} cx={doubleRadiusMax} cy={doubleRadiusMax} fill="transparent" 
    stroke="black"
    stroke-width={doubleR}
    stroke-dasharray="{$fillPercentTween * circumfrence/100} {circumfrence}"
    transform="rotate(-90, {doubleRadiusMax}, {doubleRadiusMax}) translate(0, {quadrupleRadiusMax}) scale(1,-1)"
  />
</svg>