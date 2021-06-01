<script>
	import { flip } from 'svelte/animate';
	import amIWhatIam from './data/amIWhatIAm.js';
	import junctionLocales from './data/junctionLocales.js';
	import { haversine_distance } from './helpers.js';

	import Verse from './Verse.svelte';

	export let title;
		
	let activeVerseSpan = 1;
	$: activeVersesInReverse = amIWhatIam.slice(0, activeVerseSpan).reverse();

	let deviceCoordinates = false, nearbyLocaleTable = [];
	navigator.geolocation.getCurrentPosition(pos => {
		deviceCoordinates = pos.coords;
	});

	$: if (deviceCoordinates) {
		nearbyLocaleTable = junctionLocales.map((locale, i) => {
			let metersFromLocale = haversine_distance(deviceCoordinates, locale) * 1000;
			// console.log(`${locale.id}: ${locale.description} is ${metersFromLocale}m away`);
			return { piSliceId: locale.id, nearby: (metersFromLocale <= 30) };
		}); 
	};

</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<main id='aiwia'>
	{#each activeVersesInReverse as verse, i (verse.verseNumber)}
		<div animate:flip={{duration: 1000}}>
			<Verse {verse} on:verseSequenceComplete={ () => activeVerseSpan++ } {nearbyLocaleTable} />
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