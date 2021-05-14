<script>
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { flip } from 'svelte/animate';

  import Fullstop from './Fullstop.svelte';

	export let lineA;
  export let lineB;
  export let piId;

  const aChars = lineA.split(''),
    bChars = lineB.split('');

  let progLineA = "";

  const fullStopRadius = tweened(0, {duration: 10000});

  onMount(async () => {
    fullStopRadius.set(100);
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

<div class='verse' {piId}>
  <div class='couplet'>
    {#if false}
    <div class='line-a'>
      <span class='headless'>{progLineA.substr(0, progLineA.length - 1)}</span>
      <div class='ultimate char'>{progLineA.substr(progLineA.length - 1, 1)}</div>
    </div>
    {/if}
  </div>
  <div class='emanation'>
    <Fullstop />
  </div>
</div>

<style>
  .verse {
    font-family: 'Times New Roman', Times, serif;
    font-size: 1.2em;
  }

  .emanation {
    border: 0px;
  }
  .char {
    font-family: sans-serif;
    font-size: 200px;
    height: 250px;
  }
</style>