<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { quintOut } from 'svelte/easing';

  export let couplet;

  const opacityTween = tweened(0, {duration: 3000, easing: quintOut}),
    dispatch = createEventDispatcher();

  let word = "";

  onMount(async () => {
    let allCoupletWords = [...couplet.a.split(' '), ...couplet.b.split(' ')];
    while(allCoupletWords.length > 0) {
      word = allCoupletWords.shift();
      await opacityTween.set(0.2);
      await opacityTween.set(0);
    }
    dispatch('iAmCoupletMagnified', true);
	});
</script>

<div class='magnifier' style="--word-opacity: {$opacityTween}">
  <span id='word'>{word}</span>
</div>

<style>

  .magnifier {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
		display: flex;
		align-items: center;
    justify-content: center;
	}

	#word {
		color: rgba(0, 0, 0, var(--word-opacity));
		font-size: 15vw;
	}

</style>