<script>
	import { onMount } from 'svelte';
	import * as animateScroll from 'svelte-scrollto';
	import { createEventDispatcher } from 'svelte';

	import { verseStore } from './stores/stores.js';
	import { piCountdownStore } from './stores/stores.js';
	import Verse from './Verse.svelte';
		
	const dispatch = createEventDispatcher();

	export let title;

	const verses = $verseStore;
	const piDigits = $piCountdownStore;

	onMount(() => {
		animateScroll.scrollToBottom({
			duration: 5000
		});
	});

	function getVerse(verseNumber) {
		let versePool = verses.filter(v => v.piDigit === verseNumber );
		return versePool[0];
	};
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<main>
	<h1>{title}</h1>
	{#each piDigits as digit}
		<Verse lineA={getVerse(digit).a} lineB={getVerse(digit).b} piDigit={getVerse(digit).piDigit} />
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