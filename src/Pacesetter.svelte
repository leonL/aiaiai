<script>
  import { tweened } from 'svelte/motion';
  import { onMount } from 'svelte';
  import { quintOut } from 'svelte/easing';

  export let couplet;

  const gradientStopTween = tweened(0, {duration: 3000, easing: quintOut});

  $: allCoupletWords = [...couplet.a.split(' '), ...couplet.b.split(' ')];
  let word = "";

  onMount(async () => {
    while(allCoupletWords.length > 0) {
      word = allCoupletWords.shift();
      await gradientStopTween.set(0.5);
      await gradientStopTween.set(0);
    }
	});
</script>

<div class='pacer' style="--gradient-stop: {$gradientStopTween}">
  <span id='word'>{word}</span>
</div>

<style>

  .pacer {
    position: absolute;
    bottom: 0;
    width: 100%;
		min-height: 30%;
		display: flex;
		align-items: center;
    justify-content: center;
	}

	#word {
		color: rgba(0, 0, 0, var(--gradient-stop));
		font-size: 20vw;
		padding-bottom: 5px;
	}

</style>