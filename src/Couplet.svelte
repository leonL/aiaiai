<script>
  import { onMount, createEventDispatcher, tick } from 'svelte';
  import { fade, crossfade, blur } from 'svelte/transition';
  import { bounceInOut } from 'svelte/easing';
  import CountdownLeader from './CountdownLeader.svelte';
  
  export let aLine;
  export let bLine;
  export let aLineLetters;
  export let aLineConcealedLetters;
  export let bLineLetters;
  export let bLineConcealedLetters;
  export let piSlice;
  export let coupletIndex;
  export let iAmCouplet = false;

  let showPiSlice = false, showCountdown = false, coupletHeight, allLettersRevealed = false;

  let aLineWords = aLine.split(' '),
    aWordData = aLineWords.map((w, i) => ({word: w, line: 'a', lineIndex: i})),
    aLineFilteredWordData = aWordData,
    bLineWords = bLine.split(' '),    
    bWordData = bLineWords.map((w, i) => ({word: w, line: 'b', lineIndex: i})),
    bLineFilteredWordData = bWordData,
    allWordData = [...aWordData, ...bWordData],
    allWordsCount = allWordData.length;
    
  let wordOnPrecipice = false, wordDropOn = false, wordOnPrecipiceIndex = 0;
  
  $: fallingWordData = allWordData[wordOnPrecipiceIndex];
  $: fallingWordKey = fallingWordData.line + fallingWordData.lineIndex;

  $: if (wordOnPrecipice) {
    if (fallingWordData.line === 'a') {
      aLineFilteredWordData = aWordData.filter((_, i) => fallingWordData.lineIndex !== i );
      bLineFilteredWordData = bWordData;
    } else {
      bLineFilteredWordData = bWordData.filter((_, i) => fallingWordData.lineIndex !== i );
      aLineFilteredWordData = aWordData;
    } 
  } else {
    aLineFilteredWordData = aWordData;
    bLineFilteredWordData = bWordData;
  }

  let showIamText = false;
  
  const dispatch = createEventDispatcher();
  const [send, receive] = crossfade({duration: 4000 });

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

  function dangleNextWord() {
    if (!wordDropOn) {
      wordDropOn = true;
      dropWord();
    } else if (wordOnPrecipiceIndex < allWordsCount - 1 ) {
      wordOnPrecipiceIndex++;
      dropWord();
    } else { // all words dropped
      showIamText = true;
      dispatch('verseSequenceComplete', true);
    };
  };

  async function dropWord() {
    wordOnPrecipice = true;
    await tick();
    wordOnPrecipice = false;
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
  {#if iAmCouplet}
    {#if wordOnPrecipice}
      <div class='precipice'>
        <span class='falling-word' out:send={{key: fallingWordKey}} on:outroend={() => dangleNextWord()} >
          {fallingWordData.word}
        </span>
      </div>
    {/if}
    <div class='distich' transition:blur={{duration: 1000, opacity: 10}} on:introend={() => dangleNextWord() }>
      <div class='line'>
        {#if showIamText}
          <span id='i-am' transition:fade={{ duration: (minsToMillisecs(5)), easing: bounceInOut}} 
            on:introend={() => showIamText = false}>I am</span>
        {/if}
        {#each aLineFilteredWordData as wordData (wordData.lineIndex)}
          <span class='word' in:receive={{key: `a${wordData.lineIndex}`}}>{wordData.word} </span>
        {/each}
      </div>
      <div class='line'>
        {#each bLineFilteredWordData as wordData (wordData.lineIndex)}
          <span class='word' in:receive={{key: `b${wordData.lineIndex}`}}>{wordData.word} </span>
        {/each}
      </div>
    </div>
  {:else}
    <div class='distich'>
      <div class='line'>
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
  #i-am {
    font-style: italic;
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

  .precipice {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
		display: flex;
		align-items: center;
    justify-content: center;
    overflow: hidden;
    /* border: 1px solid orangered; */
	}
  .falling-word {
		font-size: 1000vw;
    /* border: 1px dotted black; */
	}
</style>