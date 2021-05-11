<script>
	import Verse from './Verse.svelte';
	import {flip} from 'svelte/animate';
	import amIWhatIam from './stores/verses.js';

	export let title;
	
	let verses = [amIWhatIam[0]];

	function addVerse() {
		verses = [...verses, amIWhatIam[verses.length]];
	}

	const options = {duration: 500};
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<main>
	{#each verses as verse, i (i)}
		<div animate:flip={options} class="verse">
			<Verse lineA={verse.a} lineB={verse.b} number={verse.number} />
		</div>
	{/each}
	<button on:click={addVerse}>Add</button>
</main>


<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
		border: 1px solid black;
		position: absolute;
		bottom: 0;
		top: 0;
		display: flex;
		justify-content: flex-end;
		flex-direction: column;
	}
	.verse {
    padding-bottom: 10px;
  }
/* 
	h1 {
		font-size: 4em;
		font-weight: 100;
	} */

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>