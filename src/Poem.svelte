<script>
	import { verseStore } from './stores.js';
	import Verse from './Verse.svelte';

	export let title;

	const verses = $verseStore;
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<!-- <svelte:window bind:scrollX={scrollX} bind:scrollY={scrollY} /> -->

<main>
	<h1>{title}</h1>
	{#each verses as verse}
		<Verse lineA={verse.a} lineB={verse.b} piDigit={verse.piDigit} />
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