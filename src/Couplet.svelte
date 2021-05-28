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

  let showCountdown = false, showPiSlice = false, renderAsLetters = true, coupletHeight;

  onMount(() => {
		showCountdown = true;
	});

  $: if (revealLetters) revealLettersAtRandom();

  let letters = {a: aLine.split(''), b: bLine.split('')}, 
    aConcealedLetters = Array.from(letters.a, (_, i) => i),  
    bConcealedLetters = Array.from(letters.b, (_, i) => i),
    concealedLetters = {a: aConcealedLetters, b: bConcealedLetters},
    revealedLetters = {a: [], b: []};

  function revealLettersAtRandom() {
    let revealLettersInterval = setInterval(() => {

      let revealLineId = getConcealedLineId();
      
      if (revealLineId) { 
        let id = revealLineId, concealedLetterIdIndex = getRandomInt(concealedLetters[id].length - 1),
          concealedLetterId = concealedLetters[id].splice(concealedLetterIdIndex, 1);
        revealedLetters[id] = [...revealedLetters[id], ...concealedLetterId];
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

  const lettersCount = letters.a.length + letters.b.length,
    doubleLettersCount = lettersCount * 2;

  let letterCssTransitionCount = 0,  showIamText = false;

  function onLetterCssTransition() {
    letterCssTransitionCount++;
    if (letterCssTransitionCount >= doubleLettersCount) {
      if (iAmCouplet) showIamText = true;
      renderAsLetters = false;
    }
  };

  function getBlurInOptions() {
    let options = {delay: 0, duration: 0, opacity: 100};
    if (iAmCouplet) options = {duration: secsToMillisecs(getRandomInt(120, 10)), opacity: 10};
    return options; 
  };

  function blurIntroStart() {
    if (iAmCouplet) dispatch('verseSequenceComplete', true);
  };

  function blurIntroEnd() {
    if (iAmCouplet && showIamText) showIamText = false;
  };
</script>

<div class='distich' bind:clientHeight={coupletHeight} >
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
  {#if renderAsLetters}
    <div class='couplet'>
      <div class='line'>
        {#each letters.a as letter, i}
          <span class:revealed={revealedLetters.a.includes(i)}
            class='letter' on:transitionend={_ => onLetterCssTransition()}>{letter}</span>
        {/each}
      </div>
      <div class='line'>
        {#each letters.b as letter, i}
          <span class:revealed={revealedLetters.b.includes(i)}
            class='letter' on:transitionend={_ => onLetterCssTransition()}>{letter}</span>
        {/each}
      </div>
    </div>
  {:else}
    <div class='couplet' in:blur|local={getBlurInOptions()} 
      on:introstart={() => blurIntroStart()} on:introend={() => { blurIntroEnd() }}>
      <div class='line'>
        {#if showIamText}
          <span out:fade|local={{
              delay: secsToMillisecs(getRandomInt(25)), 
              duration: secsToMillisecs(getRandomInt(15, 1)) 
            }} class='i-am'>I am </span>
        {/if}
        {aLine}
      </div>
      <div class='line'>
        {bLine}
      </div>
    </div>
  {/if}
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
  .couplet {
    flex-grow: 1;
    font-size: 4vw;
    /* border: 1px dashed red; */
  }
  .letter { 
    opacity: 0;
    font-size: 1vw;
    transition-property: opacity, font-size;
    transition-duration: 5s;
    transition-timing-function: ease-in; 
  }
  .letter.revealed {
    opacity: 100;
    font-size: 4vw;
  }
</style>