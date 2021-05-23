<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import CountdownLeader from './CountdownLeader.svelte'; 
  
  export let aLineWords;
  export let aLineConcealedWords;
  export let bLineWords;
  export let bLineConcealedWords;
  export let piSlice;
  export let coupletIndex;
  
  let showPiSlice = false, showCountdown = false, coupletHeight;
  
  const dispatch = createEventDispatcher();

  onMount(() => {
		showCountdown = true;
	});

</script>

<div class='couplet' bind:clientHeight={coupletHeight} >
  <div class='pi-slice'>
    {#if showCountdown}
      <div class='countdown-leader'>
        <CountdownLeader radiusMax={coupletHeight / Math.PI} delayFactor={coupletIndex}
          on:leaderDilated= { () => { showPiSlice = true; } }
          on:leaderWiped= { () => { showCountdown = false; dispatch('countdownStep', true); } } />
      </div>
    {/if}
    {#if showPiSlice}
      {piSlice}
    {/if}
  </div>
  <div class='distich'>
    <div class='line'>
      {#each aLineWords as word, i}
        <span class='word' style="opacity: {aLineConcealedWords.includes(i) ? 0 : 100}">{word} </span>
      {/each}
    </div>
    <div class='line'>
      {#each bLineWords as word, i}
        <span class='word' style="opacity: {bLineConcealedWords.includes(i) ? 0 : 100}">{word} </span>
      {/each}
    </div>
  </div>
</div>

<style>
  .couplet {
    margin: 5px 0;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    text-align: right;
    /* border: 1px dotted green; */
  }

  .pi-slice {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-family: 'Heebo', sans-serif;
    font-size: 3.5vw;
    font-weight: 400;
    width: 5%;
    /* border: 1px solid olivedrab; */
  }
  .countdown-leader {
    position: absolute;
    top: -5px;
    bottom: -5px;
    left: -5px;
    right: -5px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* border: 1px solid orange; */
  }
  .distich {
    flex-grow: 1;
    /* border: 1px dashed red; */
  }
  .word {
    transition: opacity 20s 0s ease-in;
  }
</style>