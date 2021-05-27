<script>
  import { onMount, createEventDispatcher, tick } from 'svelte';
  import { blur, fade } from 'svelte/transition';
  import CountdownLeader from './CountdownLeader.svelte';
  
  export let aLineLetters;
  export let aLineConcealedLetters;
  export let bLineLetters;
  export let bLineConcealedLetters;
  export let piSlice;
  export let coupletIndex;
  export let iAmCouplet = false;

  let showPiSlice = false, showCountdown = false, showIamText = false,
    showDistich = true, coupletHeight, allLettersRevealed = false;

  $: if (iAmCouplet) {
    showIamText = true;
    showDistich = false; // toggle showDistich in order to trigger blur transition on dom in;
    showDistich = true;
  }

  const dispatch = createEventDispatcher();

  $: if (!allLettersRevealed && (aLineConcealedLetters.length + bLineConcealedLetters.length === 0)) {
    allLettersRevealed = true;
    dispatch('allLettersRevealed', coupletIndex);
  };

  onMount(() => {
		showCountdown = true;
	});

  function minsToMillisecs(mins) {
    const oneMinuteInMilliseconds = 60000;
    let millisecs = mins * oneMinuteInMilliseconds;
    return millisecs;
  };
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
  {#if showDistich}
    <div class='distich' in:blur|local={{duration: minsToMillisecs(1), opacity: 10}}
      on:introend={() => { showIamText = false }}
      on:introstart={() => { dispatch('verseSequenceComplete') }}>
      <div class='line'>
        {#if showIamText}
          <span class='i-am' out:fade|local={{duration: 1000}}>I am </span>
        {/if}
        {#each aLineLetters as letter, i}
          <span class='letter' class:concealed={aLineConcealedLetters.includes(i)}>{letter}</span>
        {/each}
      </div>
      <div class='line'>
        {#each bLineLetters as letter, i}
          <span class='letter' class:concealed={bLineConcealedLetters.includes(i)}>{letter}</span>
        {/each}
      </div>
    </div>
  {/if}
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
    font-size: 4vw;
    /* border: 1px dashed red; */
  }
  .letter {
    opacity: 100;
    transition-property: opacity, font-size;
    transition-duration: 5s;
    transition-timing-function: ease-in;
  }
  .letter.concealed {
    opacity: 0;
    font-size: 1vw;
  }
</style>