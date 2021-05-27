<script>
  import { onMount, createEventDispatcher, afterUpdate } from 'svelte';
  import { blur, fade } from 'svelte/transition';
  import CountdownLeader from './CountdownLeader.svelte';
  import { getRandomInt, secsToMillisecs } from './helpers.js';
  const dispatch = createEventDispatcher();
  
  export let aLine;
  export let bLine;
  export let piSlice;
  export let coupletIndex;
  export let iAmCouplet = false;
  export let revealLetters;

  let showCountdown = false, showPiSlice = false, showIamText = false,
    showDistich = true, coupletHeight, lettersTransitionedCount = 0;

  onMount(() => {
		showCountdown = true;
	});

  $: if (revealLetters) revealLettersAtRandom();

  let letters = {a: aLine.split(''), b: bLine.split('')},
    lettersCount = letters.a.length + letters.b.length, 
    aConcealedLetters = Array.from(letters.a, (_, i) => i),  
    bConcealedLetters = Array.from(letters.b, (_, i) => i),
    concealedLetters = {a: aConcealedLetters, b: bConcealedLetters};

  function revealLettersAtRandom() {
    let revealLettersInterval = setInterval(() => {

      let revealLineId = getConcealedLineId();
      
      if (revealLineId) { 
        let id = revealLineId, indexOfLetterId = getRandomInt(concealedLetters[id].length - 1);
        concealedLetters[id].splice(indexOfLetterId, 1);
        concealedLetters = concealedLetters; 
      } else {
        clearInterval(revealLettersInterval);
      };
    }, getRandomInt(400, 200));
  };

  function getConcealedLineId() {
    let concealedLineIds = [], concealedLineId = false;

    if (concealedLetters.a.length > 0) concealedLineIds.push('a');
    if (concealedLetters.b.length > 0) concealedLineIds.push('b');

    if (concealedLineIds.length === 2) {
      concealedLineId = concealedLineIds[getRandomInt(1)];
    } else if (concealedLineIds.length === 1) {
      concealedLineId = concealedLineIds[0];
    };
    return concealedLineId;
  };

  function afterLetterTransition() {
    lettersTransitionedCount++;
    if ((lettersTransitionedCount === lettersCount * 2) && iAmCouplet) {
      showIamText = true;
      showDistich = false; // toggle showDistich in order to trigger blur transition on dom in;
      showDistich = true;
    }
  };
</script>

<div class='couplet' bind:clientHeight={coupletHeight} >
  <div class='pi-slice'>
    {#if showCountdown}
      <div class='countdown-leader'>
        <CountdownLeader radiusMax={coupletHeight / Math.PI} delayFactor={coupletIndex}
          on:leaderDilated= { () => { showPiSlice = true; } }
          on:leaderWiped= { () => { showCountdown = false; dispatch('countdownStep', true) } } />
      </div>
    {/if}
    {#if showPiSlice}
      {piSlice}
    {/if}
  </div>
  {#if showDistich}
    <div class='distich' in:blur|local={{duration: secsToMillisecs(getRandomInt(120, 10)), opacity: 10}}
      on:introend={() => { showIamText = false }}
      on:introstart={() => { dispatch('verseSequenceComplete') }}>
      <div class='line'>
        {#if showIamText}
          <span class='i-am' 
            out:fade|local={{
              delay: secsToMillisecs(getRandomInt(25)), 
              duration: secsToMillisecs(getRandomInt(15, 1)) 
            }}>I am </span>
        {/if}
        {#each letters.a as letter, i}
          <span class:concealed={concealedLetters.a.includes(i)}
            class='letter' on:transitionend={_ => afterLetterTransition()}>{letter}</span>
        {/each}
      </div>
      <div class='line'>
        {#each letters.b as letter, i}
          <span class:concealed={concealedLetters.b.includes(i)}
            class='letter' on:transitionend={_ => afterLetterTransition()}>{letter}</span>
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