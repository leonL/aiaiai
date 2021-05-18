<script>
import { onMount } from 'svelte';
import { crossfade } from 'svelte/transition';
import Fullstop from './Fullstop.svelte';

export let lineA;
export let lineB;
export let piId;

const aWords = lineA.split(' '),
  bWords = lineB.split(' '),
  oneLine = lineA + ' ' + lineB,
  words = oneLine.split(' ');

let wipeCompleted = false, expansionCompleted = false, writeOn = true, 
  wordIndex = 0, wordEl, wordFontSize = 150, wordColour = 'black', emanationBlockWidth;

$: showFullStop =  !wipeCompleted || !expansionCompleted
$: currentWord = words[wordIndex];
  
const [send, receive] = crossfade({duration: 2500, delay: 100});

function startWriting() {
  writeOn = true;
  let nextWordInterval = setInterval(() => {
    if (wordIndex < words.length - 1) {
      fontSizeFitting(); // this has to wait for a promise 
      wordColour = 'white';
      wordFontSize = 150;
      wordIndex++;
    } else {
      writeOn = false;
      wordIndex++;
      clearInterval(nextWordInterval);
    }
  }, 750);
}; 

function fontSizeFitting() {
  let fontSizeFittingInterval = setInterval(() => {
    if (wordEl.scrollWidth > emanationBlockWidth) {
      wordFontSize--;
    } else {
      wordColour = 'black';
      clearInterval(fontSizeFittingInterval);
    }
  }, 0);
};

</script>

<div class='verse'>
  <div class='number'>
    {#if wipeCompleted}
      <span in:receive={{key: piId}} on:introend={ startWriting }>{piId}</span>
    {/if}
  </div>
  <div class='couplet'>
    <div class='line-a'>
      {#each aWords as word, i}
        <span style="color: {wordIndex > i ? 'black' : 'white'}">{word} </span>
      {/each}
    </div>
    <div class='line-b'>
      {#each bWords as word, i}
        <span style="color: {wordIndex > (i + aWords.length) ? 'black' : 'white'}">{word} </span>
      {/each}
    </div>
  </div>
</div>
<div class='emanation' bind:clientWidth={emanationBlockWidth}>
  {#if showFullStop }
    <Fullstop on:expansionComplete = { () => expansionCompleted = true } 
      on:wipeComplete = { () => wipeCompleted = true } />
    {#if expansionCompleted && !wipeCompleted }
      <span class='piCount' out:send={{key: piId}}>{piId}</span>
    {/if}
  {:else if writeOn} 
    <span class='word' bind:this={wordEl} style="font-size: {`${wordFontSize}px`}; color: {wordColour};">
      {currentWord}
    </span>
  {/if}
</div>

<style>
  .verse {
    margin: 10px 5px;
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
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 100%;
    text-align: center;
    font-family: 'Times New Roman', Times, serif;
    overflow: hidden;
  }
</style>