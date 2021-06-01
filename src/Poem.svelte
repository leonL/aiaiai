<script>
	import amIWhatIam from './data/amIWhatIAm.js';
	import { setContext } from 'svelte';

	import Verse from './Verse.svelte';

	export let title;
		
	let activeVerseSpan = 1;

	$: activeVersesInReverse = amIWhatIam.slice(0, activeVerseSpan).reverse();

	const geoLocationPromise = new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			pos => { resolve(pos.coords) },
			err => { reject(err) }
		);
	});	

	setContext('deviceCoordinates', geoLocationPromise);

	let iAmAllOverride = false;
	let iAmHereOverride = false;
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<main id='aiwia'>
	{#each activeVersesInReverse as verse, i (verse.verseNumber)}
		<div>
			<Verse {verse} on:verseSequenceComplete={ () => activeVerseSpan++ }
				{iAmAllOverride} {iAmHereOverride} 
				on:iAmAll={() => iAmAllOverride = true} on:iAmHere={() => iAmHereOverride = true} />
		</div>
	{/each}
</main>

<style>
	#aiwia {
		display: flex;
		flex-direction: column-reverse;
		height: 100%;
		font-size: 4vw;
		padding: 0 10px;
		font-family: 'EB Garamond', serif;
		overflow-y: scroll;
	}
</style>