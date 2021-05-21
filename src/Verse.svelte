<script>
  import { createEventDispatcher } from 'svelte';
  import Couplet from './Couplet.svelte';

  export let verse;

  let totalCouplets = verse.length, totalCoupletsEmenated = 0;

  const dispatch = createEventDispatcher();

  function coupletEmanated(_) {
    if (++totalCoupletsEmenated === totalCouplets) dispatch('verseEmanated', true);
  };


</script>

<div class='verse'>
  {#each verse as couplet, i}
    <Couplet aLine={couplet.a} bLine={couplet.b} piSlice={couplet.piSlice} coupletIndex={i} 
      on:coupletEmenated={ () => coupletEmanated(i) } />
  {/each}
</div>

<style>
  .verse {
    flex-grow: 1;
    display: flex;
		flex-direction: column;
    /* border: 1px solid violet; */
  }
</style>