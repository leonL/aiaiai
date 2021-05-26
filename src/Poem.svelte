<script>
	import {flip} from 'svelte/animate';
	import amIWhatIam from './data/amIWhatIAm.js';

	import Verse from './Verse.svelte';

	export let title;
		
	let activeVerseSpan = 1;

	$: activeVersesInReverse = amIWhatIam.slice(0, activeVerseSpan).reverse();
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<main>
	<div class='aiwia'>
		{#each activeVersesInReverse as verse, i (verse.verseNumber)}
			<div animate:flip={{duration: 500}}>
				<Verse {verse} on:verseSequenceComplete={ () => activeVerseSpan++ } />
 			</div>
		{/each}
	</div>
</main>

<style>
	main {
		height: 100%;
		font-family: 'EB Garamond', serif;
		display: flex;
		flex-direction: column;
	}
	.aiwia {
		font-size: 4vw;
		flex-grow: 1;
		display: flex;
		flex-direction: column-reverse;
		height: 100%;
		overflow-y: scroll;
		padding: 0 10px;
	}
</style>