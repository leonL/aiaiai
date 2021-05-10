<script>
	import Verse from './Verse.svelte';
	import verseStore from './stores/stores.js';

	export let title;
		
	$: verses = $verseStore;
	let firstVerse = verses[0];

	function addVerseToPoem() {
		verseStore.addVerse();
	}
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<main>
	<h1>{title}</h1>
	<!-- {#each verses as verse} -->
		<Verse lineA={firstVerse.a} lineB={firstVerse.b} number={firstVerse.number} />
	<!-- {/each} -->
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>