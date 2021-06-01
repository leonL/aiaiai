<script>
  import Couplet from './Couplet.svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let verse;
  export let nearbyLocaleTable;
  
  let coupletCount = verse.couplets.length;
  let emanationIndex = 0;

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
      coupletIndex={i} emanate={emanationIndex === i} {nearbyLocaleTable}
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