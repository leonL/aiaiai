<script>
	import { verseStore } from './stores/stores.js';
	import { onMount } from 'svelte';
	import * as animateScroll from 'svelte-scrollto';

	import Verse from './Verse.svelte';

	export let title;

	const verses = $verseStore;

	let totalScrollHeight;
	let scrollY;
	let windowHeight;
	let percentScrolled;
	
	$: percentScrolled = scrollY / (totalScrollHeight - windowHeight);

	onMount(() => {
		animateScroll.scrollToBottom({
			duration: 10000
		});
	});
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<svelte:window bind:scrollY={scrollY} bind:outerHeight={windowHeight} />

<main bind:clientHeight={totalScrollHeight}>
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