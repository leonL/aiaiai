<script>
	import {flip} from 'svelte/animate';
	import amIWhatIam from './data/amIWhatIAm.js';

	import Verse from './Verse.svelte';
	import Emanation from './Emanation.svelte';

	export let title;
	
	let wordQueue = [];

	let verseIndex = 1;
	$: activeVersesInReverse = amIWhatIam.slice(0, verseIndex).reverse();

	function addWordToQueue(word) {
		wordQueue = [...wordQueue, word];
	};

	function removeWordFromQueue(word) {
		let wordRemoved = wordQueue.shift();
		if (wordRemoved !== word) {
			console.warn(`The word removed from the word queue "${wordRemoved}" is not the expected one "${word}".`)
		};
	} 
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<main>
	<div class='aiwia'>
		{#each activeVersesInReverse as verse (verse.verseNumber)}
			<div animate:flip={{duration: 500}}>
				<Verse {verse} on:verseRevealed={ () => verseIndex++ } on:wordRevealed= { event => addWordToQueue(event.detail) } />
			</div>
		{/each}
	</div>
	<Emanation {wordQueue} on:emanatingTheWord= { (event) => removeWordFromQueue(event.detail) } />
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