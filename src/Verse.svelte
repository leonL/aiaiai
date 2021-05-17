<script>
import { onMount } from 'svelte';
import { crossfade } from 'svelte/transition';

const [send, receive] = crossfade({duration: 300, delay: 500});

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
  }, 500);
};

</script>

<div class='verse'>
  <span class='number'>
    {#if wipeCompleted}
      <span in:receive={{key: piId}} on:introend={ startWriting }>{piId}</span>
    {/if}
  </span>
  <span class='couplet'>
    <div class='line-a'>{progLine.substr(0, progLine.length - 1)}</div>
  </span>
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
    font-family: 'Times New Roman', Times, serif;
    font-size: 1em;
    margin: 0 10px;
    text-align: right;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .number {
    font-family: sans-serif;
    text-align: center;
    flex-grow: 1;
  }
  .couplet {
    text-align: right;
    flex-grow: 1;
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
    font-family: sans-serif;
  }
  .letter {
    font-family: 'Times New Roman', Times, serif;
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
  }
</style>