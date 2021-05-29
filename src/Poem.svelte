<script>
	import { flip } from 'svelte/animate';
	import amIWhatIam from './data/amIWhatIAm.js';
	import { setContext } from 'svelte';

	import Verse from './Verse.svelte';

	export let title;
		
	let activeVerseSpan = 1;

	$: activeVersesInReverse = amIWhatIam.slice(0, activeVerseSpan).reverse();

	const geoLocationPromise = new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(pos => {
			let coordinates = pos.coords;
			resolve(coordinates);
		});
	});	

	setContext('deviceCoordinates', geoLocationPromise);

	let iAmAllOverride = false;
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<main id='aiwia'>
	{#each activeVersesInReverse as verse, i (verse.verseNumber)}
		<div animate:flip={{duration: 500}}>
			<Verse {verse} {iAmAllOverride} on:verseSequenceComplete={ () => activeVerseSpan++ }
				on:iAmAll={() => iAmAllOverride = true} />
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