<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import Verse from './Verse.svelte';
	import { verseStore, piCountdownStore } from './stores/stores.js';
	import * as animateScroll from 'svelte-scrollto';

	export let title;
		
	const dispatch = createEventDispatcher(), 
		verses = $verseStore, 
		piCountdown = $piCountdownStore;

	onMount(() => {
		animateScroll.scrollToBottom({
			duration: 5000
		});
	});

	function getVerse(verseNumber) {
		let versePool = verses.filter(v => v.number === verseNumber );
		return versePool[0];
	};
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<main>
	<h1>{title}</h1>
	{#each piCountdown.slice(0, 50) as digit}
		<Verse lineA={getVerse(digit).a} lineB={getVerse(digit).b} number={getVerse(digit).number} />
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