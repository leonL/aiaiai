<script>
	import amIWhatIam from './data/amIWhatIAm.js';
	import Verse from './Verse.svelte';

	export let title;

	let verseIndex = 1;
	$: activeVerses = amIWhatIam.slice(0, verseIndex);
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<main id='aiwia'>
	{#each activeVerses.reverse() as verse (verse.verseNumber)}
		<Verse {verse} on:verseEmanated={ () => verseIndex++ } />
	{/each}
</main>

<style>
	#aiwia {
		font-size: 4vw;
		font-family: 'EB Garamond', serif;
		display: flex;
		flex-direction: column-reverse;
		height: 100%;
		overflow-y: scroll;
		padding: 0 10px;
	}
</style>