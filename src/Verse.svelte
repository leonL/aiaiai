<script>
  import Couplet from './Couplet.svelte';
  import { getRandomInt } from './helpers.js';
  
  export let verse;
  
  const coupletCount = 3;

  let countdown = 0, revealLetters = false,
    iAmCoupletIndex = getRandomInt(coupletCount - 1);
  
  function countdownToLetterReveal(_) {
    if (++countdown === coupletCount) revealLetters = true;
  };

</script>

<div class='verse'>
  {#each verse.couplets as couplet, i}
    <Couplet aLine={couplet.a} bLine={couplet.b} piSlice={couplet.piSlice} 
      coupletIndex={i} iAmCouplet={ iAmCoupletIndex === i } {revealLetters}
      on:countdownStep={ () => countdownToLetterReveal(i) } 
      on:verseSequenceComplete />
  {/each}
</div>

<style>
  .verse {
    position: relative;
    display: flex;
		flex-direction: column;
    margin-bottom: 20px;
    /* border: 1px solid violet; */
  }
</style>