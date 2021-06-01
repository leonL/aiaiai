<script>
  import Couplet from './Couplet.svelte';
  import junctionLocales from './data/junctionLocales.js';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let verse;
  
  const coupletCount = 3;
  let emanationIndex = 0;

  function getJunctionLocaleDataById(id) {
    let locale = junctionLocales.find(l => l.id == id ); 
    return locale;
  };

  function afterCoupletRevealed(coupletIndex) {
    if (coupletIndex < coupletCount - 1) {
      emanationIndex = emanationIndex + 1;
    } else {
      dispatch('verseSequenceComplete', 'true');
    };
  };

</script>

<div class='verse'>
  {#each verse.couplets as couplet, i}
    <Couplet aLine={couplet.a} bLine={couplet.b} piSlice={couplet.piSlice} 
      coupletIndex={i} 
      correspondingLocaleData={getJunctionLocaleDataById(verse.verseNumber)}
      emanate={emanationIndex === i}
      on:allLettersRevealed={ (event) => afterCoupletRevealed(event.detail) } />
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