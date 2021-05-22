<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import Couplet from './Couplet.svelte';

  export let verse;

  let totalCouplets = verse.couplets.length, totalCoupletsEmenated = 0;

  const dispatch = createEventDispatcher();

  function coupletEmanated(i) {
    if (++totalCoupletsEmenated === totalCouplets) dispatch('verseEmanated', true);
  };
</script>

<div class='verse'>
  {#each verse.couplets as couplet, i}
    <Couplet aLine={couplet.a} bLine={couplet.b} piSlice={couplet.piSlice} 
      on:coupletEmenated={ () => coupletEmanated(i) } />
  {/each}
</div>

<style>
  .verse {
    display: flex;
		flex-direction: column;
    margin-bottom: 20px;
    /* border: 1px solid violet; */
  }
</style>