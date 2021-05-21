<script>
	import amIWhatIam from './data/amIWhatIAm.js';
	import Verse from './Verse.svelte';

	export let title;

	let totalVerses = amIWhatIam.length;
	let verseIndex = 1; 
	
	$: activeVerses = amIWhatIam.slice(0, verseIndex);
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<main id='aiwia'>
	{#each activeVerses as verse, i}
		<Verse {verse} on:verseEmanated={ () => verseIndex++ } />
	{/each}
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