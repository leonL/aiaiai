<script>
  import { onMount } from 'svelte';
  import { flip } from 'svelte/animate';

	export let lineA;
  export let lineB;
  export let piId;

  const aChars = lineA.split(''),
    bChars = lineB.split('');

  let progLineA = "";

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

<div class='couplet' {piId}>
  <div class='line-a'>
    <span class='headless'>{progLineA.substr(0, progLineA.length - 1)}</span>
    <div class='ultimate-char'>{progLineA.substr(progLineA.length - 1, 1)}</div>
  </div>
</div>

<style>
  .couplet {
    font-family: 'Times New Roman', Times, serif;
    font-size: 1.2em;
  }
  .ultimate-char {
    font-size: 200px;
    height: 250px;
  }
</style>