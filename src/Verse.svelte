<script>
  import Couplet from './Couplet.svelte';
  import { getRandomInt } from './helpers.js';
  import junctionLocales from './data/junctionLocales.js';
  
  export let verse;
  export let iAmAllOverride;
  
  const coupletCount = 3;

  let countdown = 0, revealLetters = false,
    iAmCoupletIndex = getRandomInt(coupletCount - 1);
  
  function countdownToLetterReveal(_) {
    if (++countdown === coupletCount) revealLetters = true;
  };

  function getJunctionLocaleDataById(id) {
    let locale = junctionLocales.find(l => l.id == id ); 
    return locale;
  }

</script>

<div class='verse'>
  {#each verse.couplets as couplet, i}
    <Couplet aLine={couplet.a} bLine={couplet.b} piSlice={couplet.piSlice} 
      coupletIndex={i} iAmCouplet={ iAmCoupletIndex === i } {revealLetters}
      correspondingLocaleData={getJunctionLocaleDataById(couplet.piSlice)}
      on:countdownStep={ () => countdownToLetterReveal(i) } 
      on:verseSequenceComplete on:iAmAll {iAmAllOverride} />
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