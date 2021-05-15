<script>
  import { onMount } from 'svelte';
  import { crossfade } from 'svelte/transition';

  const [send, receive] = crossfade({duration: 1500, delay: 500});

  import Fullstop from './Fullstop.svelte';

	export let lineA;
  export let lineB;
  export let piId;

  const aChars = lineA.split(''),
    bChars = lineB.split('');

  let progLineA = "", wipeCompleted = false, expansionCompleted = false;

  onMount(async () => {
    let lineProgressInterval = setInterval(() => {
			let lineLength = progLineA.length;
      if (lineLength < lineA.length) {
        progLineA = progLineA + aChars[progLineA.length];
      } else {
        progLineA = progLineA + ' ';
        clearInterval(lineProgressInterval);
      };
		}, 500);
	});
</script>

<div class='verse'>
  {#if wipeCompleted}
  <div class='piCountdown' in:receive={{key: piId}}>{piId}</div>
  {/if}
  <div class='couplet'>
    {#if false}
    <div class='line-a'>
      <span class='headless'>{progLineA.substr(0, progLineA.length - 1)}</span>
      <div class='ultimate char'>{progLineA.substr(progLineA.length - 1, 1)}</div>
    </div>
    {/if}
  </div>
  <div class='emanation'>
    {#if expansionCompleted && !wipeCompleted}
      <span class='char' out:send={{key: piId}}>{piId}</span>
    {/if}
    <Fullstop on:expansionComplete = { () => expansionCompleted = true } 
      on:wipeComplete = { () => wipeCompleted = true } />
  </div>
</div>

<style>
  .verse {
    font-family: 'Times New Roman', Times, serif;
    font-size: 1.2em;
  }

  .emanation {
    height: 200px;
  }
  .char {
    font-family: sans-serif;
    font-size: 200px;
    height: 250px;
    color: black;
  }

  .piCountdown {
    font-family: sans-serif;
  }
</style>