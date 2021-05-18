<script>
import { onMount } from 'svelte';
import { crossfade } from 'svelte/transition';

const [send, receive] = crossfade({duration: 100, delay: 500});

import Fullstop from './Fullstop.svelte';

export let lineA;
export let lineB;
export let piId;

const lines = lineA + " " + lineB,
  chars = lines.split(''); 

let progLine = "", wipeCompleted = false, expansionCompleted = false;

$: showFullStop =  !wipeCompleted || !expansionCompleted; 

function startWriting() {
  let lineProgressInterval = setInterval(() => {
    let lineLength = progLine.length;
    if (lineLength < lines.length) {
      progLine = progLine + chars[progLine.length];
    } else {
      progLine = progLine + ' ';
      clearInterval(lineProgressInterval);
    };
  }, 150);
};

</script>

<div class='verse'>
  <div class='number'>
    {#if wipeCompleted}
      <span in:receive={{key: piId}} on:introend={ startWriting }>{piId}</span>
    {/if}
  </div>
  <div class='couplet'>
    <!-- <div class='line-a'>{progLine.substr(0, progLine.length - 1)}</div> -->
    <div class='line-a'>{lineA}</div>
    <div class='line-b'>{lineB}</div>
  </div>
</div>
<div class='emanation'>
  {#if showFullStop }
    <Fullstop on:expansionComplete = { () => expansionCompleted = true } 
      on:wipeComplete = { () => wipeCompleted = true } />
    {#if expansionCompleted && !wipeCompleted }
      <span class='piCount' out:send={{key: piId}}>{piId}</span>
    {/if}
  {/if}
  <span class='letter'>{progLine.substr(progLine.length - 1, 1)}</span>
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
  .letter {
    font-family: 'Times New Roman', Times, serif;
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
  }
</style>