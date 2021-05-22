<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import CountdownLeader from './CountdownLeader.svelte'; 
  
  export let aLine;
  export let bLine;
  export let piSlice;
  export let coupletIndex;
  
  const aLineWords = aLine.split(' '), bLineWords = bLine.split(' '),
    allWords = [...aLineWords, ...bLineWords],
    allWordsCount = allWords.length;
  
  let wordIndex = 0, letterIndex = 0, 
    showPiSlice = false, showCountdown = false,
    coupletHeight;
  
  const dispatch = createEventDispatcher();
  
  $: currentWord = (wordIndex < allWordsCount) ? allWords[wordIndex] : false;
  $: wordLength = currentWord.length;

  onMount(() => {
		showCountdown = true;
	});

  async function emanateWords() {
    while (wordIndex < allWordsCount) {
      await emanateLetters();
      wordIndex++;
    }
    dispatch('coupletEmenated', true);
    return true;
  };

  function emanateLetters() {
    letterIndex = 0;
    
    const emanateLettersPromise = new Promise(resolve => {
      let letterInterval = setInterval(() => {
        if (letterIndex < wordLength) {
          letterIndex++;
        } else {
          clearInterval(letterInterval);
          resolve(true);
        };
      }, 10);
    });
    return emanateLettersPromise;
  };
</script>

<div class='couplet' bind:clientHeight={coupletHeight} >
  <div class='pi-slice'>
    {#if showCountdown}
      <div class='countdown-leader'>
        <CountdownLeader radiusMax={coupletHeight / Math.PI} delayFactor={coupletIndex}
          on:leaderDilated= { () => { showPiSlice = true; } }
          on:leaderWiped= { () => { showCountdown = false; emanateWords(); } } />
      </div>
    {/if}
    {#if showPiSlice}
      {piSlice}
    {/if}
  </div>
  <div class='distich'>
    <div class='line'>
      {#each aLineWords as word, i}
        <span style="color: {wordIndex > i ? 'black' : 'white'}">{word} </span>
      {/each}
    </div>
    <div class='line'>
      {#each bLineWords as word, i}
        <span style="color: {wordIndex >= (i + aLineWords.length) ? 'black' : 'white'}">{word} </span>
      {/each}
    </div>
  </div>
</div>
{#if false}
    <div class='emanation'>
      <span class='letters'>
        {#each currentWord as letter, i}
          <span style="color: {letterIndex > i ? 'black' : 'white'}">{letter}</span>  
        {/each}
      </span>
    </div>
  {/if}

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
  .emanation {
    text-align: center;
    /* border: 1px dotted black; */
  }
  .letters {
    font-size: 15vw;
    /* border: 1px dashed orange; */
  }
</style>