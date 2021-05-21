<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import Couplet from './Couplet.svelte';
  import * as animateScroll from "svelte-scrollto";

  export let verse;

  let totalCouplets = verse.length, totalCoupletsEmenated = 0;

  const dispatch = createEventDispatcher();

  function coupletEmanated(_) {
    if (++totalCoupletsEmenated === totalCouplets) dispatch('verseEmanated', true);
  };

  onMount(_ => {
    animateScroll.scrollToBottom({duration: 4000});
  });

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