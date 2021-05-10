<script>
	import { onMount } from 'svelte';
	import Verse from './Verse.svelte';
	import verseStore from './stores/stores.js';
	import * as animateScroll from 'svelte-scrollto';

	export let title;
		
	$: verses = $verseStore;

	// onMount(() => {
	// 	animateScroll.scrollToBottom({
	// 		duration: 5000
	// 	});
	// });

	function addVerseToPoem() {
		verseStore.addVerse();
	}
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<main>
	<h1>{title}</h1>
	{#each verses as verse}
		<Verse lineA={verse.a} lineB={verse.b} number={verse.number} on:verseRead={addVerseToPoem} />
	{/each}
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