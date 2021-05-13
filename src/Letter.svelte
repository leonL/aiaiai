<script>
  import { onMount } from 'svelte';
import Verse from './Verse.svelte';

  export let lineA;
  export let lineB;
  export let piId;

  let concatenatedCouplet = 'y k y k yk y kyk yyk ky' + lineA + " k y ky k yk yk yk ky ky" + lineB,
    verseWords = concatenatedCouplet.split(''),
    currentWordIndex = 0;


  onMount(async () => {
    setInterval(() => {
			currentWordIndex = (currentWordIndex == verseWords.length - 1) ? 0 : (currentWordIndex + 1)
		}, 800);
	});
</script>

<div class='letter' {piId}>
  {verseWords[currentWordIndex]}
</div>

<style>
  .letter {
    border-radius: 50%;
    width: 220px;
    height: 220px;
    margin: 0 auto;
    text-align: center;
    font-size: 200px;
    line-height: 88%;
    font-family: 'Times New Roman', Times, serif;
  }
</style>