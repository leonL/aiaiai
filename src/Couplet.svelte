<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import CountdownLeader from './CountdownLeader.svelte'; 
  
  
  export let aLine;
  export let bLine;
  export let piSlice;
  export let coupletIndex;
  
  let showCountdown = false, distichHeight;
  
  const aLineWords = aLine.split(' '), bLineWords = bLine.split(' '),
  allWords = [...aLineWords, ...bLineWords],
  allWordsCount = allWords.length;
  
  let wordIndex = 0, letterIndex = 0, showEmanationMagnifier = false;
  
  const dispatch = createEventDispatcher();
  
  $: currentWord = (wordIndex < allWordsCount) ? allWords[wordIndex] : false;
  $: wordLength = currentWord.length;

  onMount(async () => {    
    showCountdown = true;
  });

  async function emanateWords() {
    showEmanationMagnifier = true;
    while (wordIndex < allWordsCount) {
      await emanateLetters();
      wordIndex++;
    }
    showEmanationMagnifier = false;
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
      }, 200);
    });
    return emanateLettersPromise;
  };
</script>

<div class='couplet' {coupletIndex} >
  <div class='distich' bind:clientHeight={distichHeight}>
    {#if showCountdown}
      <div class='countdown-leader'>
        <CountdownLeader radiusMax={distichHeight / 2} piSlice={piSlice} 
          on:countdownComplete= { () => { showCountdown = false; emanateWords(); } } />
      </div>
    {/if}
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
  {#if showEmanationMagnifier}
    <div class='emanation'>
      <span class='letters'>
        {#each currentWord as letter, i}
          <span style="color: {letterIndex > i ? 'black' : 'white'}">{letter}</span>  
        {/each}
      </span>
    </div>
  {/if}
</div>

<style>
  .couplet {
    margin: 5px 5px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: right;
    /* border: 1px dotted green; */
  }
  .distich {
    position: relative;
    /* border: 1px dashed red; */
  }
  .countdown-leader {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    /* border: 1px solid orange; */
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