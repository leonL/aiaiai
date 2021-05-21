<script>
	import amIWhatIam from './data/amIWhatIAm.js';
	import Couplet from './Couplet.svelte';

	export let title;

	let verseCount = amIWhatIam.length;
	let ultimateActiveVerseIndex = 3; 
	
	$: activeVerses = amIWhatIam.slice(0, ultimateActiveVerseIndex);
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<main id='aiwia'>
	{#each activeVerses as verse, i}
		<Couplet aLine={verse.a} bLine={verse.b} piSlice={verse.piSlice} coupletIndex={i} />
	{/each}
	<!-- {#each activeVerses as verse, i}
		<Verse lineA={verse.a} lineB={verse.b} piId={verse.piId} verseIndex={i}
			on:verseComplete = { () => { if (ultimateActiveVerseIndex < verseCount) ultimateActiveVerseIndex++ }} />
	{/each} -->
</main>

<style>
	main {
		font-size: 4.5vw;
		font-family: 'EB Garamond', serif;
		display: flex;
		flex-direction: column;
		height: 100%;
	}
</style>