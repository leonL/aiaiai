<script>
import { onMount } from 'svelte';
import { crossfade } from 'svelte/transition';

const [send, receive] = crossfade({duration: 300, delay: 500});

import Fullstop from './Fullstop.svelte';

export let lineA;
export let lineB;
export let piId;

const aChars = lineA.split(''),
  bChars = lineB.split('');

let progLineA = "", wipeCompleted = false, expansionCompleted = false, writeOn = false;

function startWriting() {
  writeOn = true;
  let lineProgressInterval = setInterval(() => {
    let lineLength = progLineA.length;
    if (lineLength < lineA.length) {
      progLineA = progLineA + aChars[progLineA.length];
    } else {
      progLineA = progLineA + ' ';
      clearInterval(lineProgressInterval);
    };
  }, 500);
};

</script>

<div class='verse'>
  <div class='number'>
    {#if wipeCompleted}
      <span in:receive={{key: piId}} on:introend={ startWriting }>{piId}</span>
    {/if}
  </div>
  <div class='couplet'>
    <div class='line-a'>{progLineA.substr(0, progLineA.length - 1)}</div>
  </div>
  <div class='emanation'>
    <Fullstop on:expansionComplete = { () => expansionCompleted = true } 
      on:wipeComplete = { () => wipeCompleted = true } />
    {#if expansionCompleted && !wipeCompleted}
      <span class='piCount' out:send={{key: piId}}>{piId}</span>
    {/if}
    <span class='letter'>{progLineA.substr(progLineA.length - 1, 1)}</span>
  </div>
</div>

<style>
  .verse {
    font-family: 'Times New Roman', Times, serif;
    font-size: 1.2em;
    margin: 0 10px;
    text-align: right;
  }
  .number {
    font-family: sans-serif;
  }
  .emanation {
    text-align: left;
    height: 200px;
    font-size: 200px;
    height: 250px;
    color: black;
  }
  .piCount {
    font-family: sans-serif;
  }
</style>