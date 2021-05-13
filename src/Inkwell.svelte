<script>
  import { onMount } from 'svelte';
import Verse from './Verse.svelte';

  export let lineA;
  export let lineB;
  export let piId;

  let concatenatedCouplet = lineA + "......." + lineB,
    verseWords = concatenatedCouplet.split(''),
    currentWordIndex = 0;


  onMount(async () => {
    setInterval(() => {
			currentWordIndex = (currentWordIndex == verseWords.length - 1) ? 0 : (currentWordIndex + 1)
		}, 800);
	});
</script>

<div class='inkwell' {piId}>
  <span class='word'>{verseWords[currentWordIndex]}</span>
</div>

<style>
  .inkwell {
    display: flex;
		justify-content: center;
		align-items: center;
    height: 100%;
  }
  
  .word {
    font-family: 'Times New Roman', Times, serif;
    font-size: 30em;
  }
</style>