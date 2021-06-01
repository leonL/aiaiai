<script>
  import { createEventDispatcher } from 'svelte';
  import CountdownLeader from './CountdownLeader.svelte';

  const dispatch = createEventDispatcher();
  
  export let aLine;
  export let bLine;
  export let piSlice;
  export let coupletIndex;
  export let emanate;
  export let nearbyLocaleTable;

  let showLeader = true, showPiSlice = false, coupletHeight;
  $: halfCoupletHeight = Math.round(coupletHeight / 2);
  
  let letters = {a: aLine.split(''), b: bLine.split('')},
  revealedLetterIds = {a: [], b: []};
  
  $: letterCounts = {a: letters.a.length, b: letters.b.length };  
  
  function revealLettersSerially() {
    let lettersInterval = setInterval(() => {
      if (revealedLetterIds.a.length < letterCounts.a ) {
        revealedLetterIds.a = [...revealedLetterIds.a, revealedLetterIds.a.length];
      } else if (revealedLetterIds.b.length < letterCounts.b) {
        revealedLetterIds.b = [...revealedLetterIds.b, revealedLetterIds.b.length];
      } else {
        clearInterval(lettersInterval);
        dispatch('allLettersRevealed', coupletIndex);
      }
    }, 100);
  };

  const hineni = "Here I am";

  let nearbyLocale = false;
  $: if (nearbyLocaleTable.length > 0) {
    let nearbyLocaleData = nearbyLocaleTable.filter(locale => { 
      return locale.piSliceId === piSlice;
    });
    nearbyLocale = nearbyLocaleData[0].nearby;
  };

  $: if (nearbyLocale) {
    letters.a = (hineni + " " + aLine).split('');
  };
</script>

<div class='distich' bind:clientHeight={coupletHeight} >
  <div class='pi-slice'>
    {#if showLeader && halfCoupletHeight && halfCoupletHeight !== 0}
      <div class='countdown-leader'>
        <CountdownLeader radiusMax={halfCoupletHeight} emanate={emanate} 
          on:leaderDilated= { () => { showPiSlice = true; } }
          on:leaderWiped= { () => { showLeader = false; revealLettersSerially() } } />
      </div>
    {/if}
    {#if showPiSlice}
      {piSlice}
    {/if}
  </div>
  <div class='couplet'>
    <div class='line'>
      {#each letters.a as letter, i}
        <span class:revealed={revealedLetterIds.a.includes(i)}
          class='letter'>{letter}</span>
      {/each}
    </div>
    <div class='line'>
      {#each letters.b as letter, i}
        <span class:revealed={revealedLetterIds.b.includes(i)}
          class='letter'>{letter}</span>
      {/each}
    </div>
  </div>
</div>

<style>
  .distich {
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
    font-size: min(75%, 12px);
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
  .couplet {
    flex-grow: 1;
    /* border: 1px dashed red; */
  }
  .letter {
    opacity: 0;
  }

  .revealed {
    opacity: 1;
  }
</style>