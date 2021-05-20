<script>
  import { tick } from 'svelte';
  import Fullstop from './Fullstop.svelte';
  import Letter from './Letter.svelte';

  export let lineA;
  export let lineB;
  export let piId;

  let localCountdownIndex = 3;

  const aWords = lineA.split(' '),
    bWords = lineB.split(' '),
    oneLine = lineA + ' ' + lineB,
    words = oneLine.split(' ');

  const wordFontSizeMax = 100;

  let wipeCompleted = false, expansionCompleted = false, writeOn = true,
    wordIndex = -1, wordFontSize = wordFontSizeMax, emanationBlockWidth, 
    wordEl, wordElMargin = 40, wordColour = 'white';

  $: showFullStop =  !wipeCompleted || !expansionCompleted
  $: currentWord = (wordIndex >= 0) ? words[wordIndex] : "";

  let letterIndex = 0;

  async function startWriting() {
    while (wordIndex < words.length - 1) {
      wordIndex++;
      await tick();
      await setFontSize();
      await emanateWordLetters();
    }
    writeOn = false;
    wordIndex++;
  }; 

  function emanateWordLetters() {
    letterIndex = 0;
    let wordLength = currentWord.length;
    
    const emanateLettersPromise = new Promise(resolve => {
      let letterInterval = setInterval(() => {
        if (letterIndex < wordLength) {
          letterIndex++;
        } else {
          letterIndex = - 1;
          clearInterval(letterInterval);
          resolve(true);
        };
      }, 200);
    });
    return emanateLettersPromise;
  };

  function setFontSize() {  
    wordColour = 'white';
    wordFontSize = wordFontSizeMax;

    const innerWordElWidth = emanationBlockWidth - (wordElMargin * 2);
    
    const sizePromise = new Promise(resolve => {
      let fontSizeFittingInterval = setInterval(() => {
        let scrollWidth = wordEl.scrollWidth;
        if (scrollWidth > innerWordElWidth) {
          wordFontSize--;
        } else {
          wordColour = 'black';
          clearInterval(fontSizeFittingInterval);
          resolve(true);
        }
      }, 0);
    });
    return sizePromise;
  };
</script>

{#if localCountdownIndex % 3 === 0}
  <span class='period'>.</span>
{/if}
<div class='verse'>
  <div class='number'>
    <span style="color: {wipeCompleted ? 'black' : 'white'}">{piId}</span>
  </div>
  <div class='couplet'>
    <div class='line-a'>
      {#each aWords as word, i}
        <span style="color: {wordIndex >= i ? 'black' : 'white'}">{word} </span>
      {/each}
    </div>
    <div class='line-b'>
      {#each bWords as word, i}
        <span style="color: {wordIndex >= (i + aWords.length) ? 'black' : 'white'}">{word} </span>
      {/each}
    </div>
  </div>
</div>
<div class='emanation' bind:clientWidth={emanationBlockWidth}>
  {#if showFullStop }
    <Fullstop on:expansionComplete = { () => expansionCompleted = true } 
      on:wipeComplete = { () => { wipeCompleted = true; startWriting() } } />
    {#if expansionCompleted && !wipeCompleted }
      <span class='piCount'>{piId}</span>
    {/if}
  {:else if writeOn} 
    <div class='word' bind:this={wordEl} style="font-size: {`${wordFontSize}px`}; color: {wordColour}; margin: 0 {wordElMargin}px;">
      {#each currentWord as letter, i}
        <span style="color: {letterIndex >= i ? 'black' : 'white'}">{letter}</span>
      {/each}
    </div>
  {/if}
</div>

<style>
  .verse {
    margin: 0 5px;
    display: flex;
    flex-direction: row;
  }
  .number {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-family: 'Heebo', sans-serif;
    font-size: 14px;
    font-weight: 400;
    padding-left: 5px;
  }

  .period {
    margin: 0 5px;
    text-align: left;
    font-size: 30px;
    padding-left: 5px;
  }
  .couplet {
    font-family: 'EB Garamond', serif;
    font-size: 16px;
    text-align: right;
    flex-grow: 1;
    padding-right: 5px;
  }
  .emanation {
    height: 200px;
    font-size: 200px;
    color: black;
  }
  .piCount {
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    font-family: 'Heebo', sans-serif;
    font-size: 150px;
  }
  .word {
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 100%;
    text-align: center;
    font-family: 'EB Garamond', serif;
    overflow: hidden;
  }
</style>