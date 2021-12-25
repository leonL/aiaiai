<script>
	import { flip } from 'svelte/animate';
	import hereIAm from './data/hereIAm.js';
	import junctionLocales from './data/junctionLocales.js';
	import { haversineDistance } from './helpers.js';

	import Magnifier from './Magnifier.svelte'
	import Verse from './Verse.svelte';

	export let title;
		
	let activeVerseSpan = 1;
	$: activeVersesInReverse = hereIAm.slice(0, activeVerseSpan).reverse();

	let mainWidth;

	let deviceCoordinates = false, nearbyLocaleTable = [];
	navigator.geolocation.getCurrentPosition(pos => {
		deviceCoordinates = pos.coords;
	});

	$: if (deviceCoordinates) {
		nearbyLocaleTable = junctionLocales.map((locale, i) => {
			let metersFromLocale = haversineDistance(deviceCoordinates, locale) * 1000;
			// console.log(`${locale.id}: ${locale.description} is ${metersFromLocale}m away`);
			return { piSliceId: locale.id, nearby: (metersFromLocale <= 30) };
		}); 
	};

</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<main id='here-I-am' bind:clientWidth={mainWidth}>
	<Magnifier {mainWidth} />
	{#each activeVersesInReverse as verse, i (verse.verseNumber)}
		<div animate:flip={{duration: 1000}}>
			<Verse {verse} on:verseSequenceComplete={ () => activeVerseSpan++ } {nearbyLocaleTable} />
		</div>
	{/each}
</main>

<style>
	#here-I-am {
		display: flex;
		flex-direction: column-reverse;
		height: 100%;
		font-size: min(4vw, 20px);
		padding: 0 10px;
		font-family: 'EB Garamond', serif;
		overflow-y: scroll;
		max-width: 500px;
		margin-left: auto;
		background-color: white;
	}
</style>