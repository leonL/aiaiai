<script>
	import amIWhatIam from './data/amIWhatIAm.js';
	import Verse from './Verse.svelte';

	export let title;

	let verseCount = amIWhatIam.length;
	let ultimateActiveVerseIndex = 1; 
	
	$: activeVerses = amIWhatIam.slice(0, ultimateActiveVerseIndex);
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<main>
	{#each activeVerses as verse, i}
		<Verse lineA={verse.a} lineB={verse.b} piId={verse.piId} verseIndex={i}
			on:verseComplete = { () => { if (ultimateActiveVerseIndex < verseCount) ultimateActiveVerseIndex++ }} />
	{/each}
</main>

<style>
	main {
		margin: 0;
		position: absolute;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: flex-end;
		flex-direction: column;
		text-align: center;
		font-size: 14px;
		font-family: 'EB Garamond', serif;
	}
</style>