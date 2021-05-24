<script>
	import {flip} from 'svelte/animate';
	import amIWhatIam from './data/amIWhatIAm.js';

	import Verse from './Verse.svelte';

	export let title;
		
	let activeVerseSpan = 1;
	$: activeVersesInReverse = amIWhatIam.slice(0, activeVerseSpan).reverse();

	let pronouncement;

	function pronounceCouplet(verseCoupletIndicies) {
		let { verseNumber, iAmCoupletIndex } = verseCoupletIndicies,
			verseIndex = verseNumber - 1,
			couplet = amIWhatIam[verseIndex].couplets[iAmCoupletIndex],
			wordsToPronounce = [...couplet.a.split(' '), ...couplet.b.split(' ')];

		let wordInterval = setInterval(() => {
			if (wordsToPronounce.length > 0) {
				pronouncement = wordsToPronounce.shift();
			} else {
				clearInterval(wordInterval);
				pronouncement = false;
				activeVerseSpan++;
			}
		}, 2000);
	}
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<main>
	<div class='aiwia'>
		{#each activeVersesInReverse as verse, i (verse.verseNumber)}
			<div animate:flip={{duration: 500}}>
				<Verse {verse} on:verseRevealed={ (event) => pronounceCouplet(event.detail) } verseNumber={verse.verseNumber} />
			</div>
		{/each}
	</div>
	<div class='emanation'>
		{#if pronouncement}
			<span class='the-word'>
				{pronouncement}
			</span>
		{/if}
	</div>
</main>

<style>
	main {
		height: 100%;
		font-family: 'EB Garamond', serif;
		display: flex;
		flex-direction: column;
	}

	.emanation {
    width: 100%;
		min-height: 12%;
		display: flex;
		align-items: center;
    justify-content: center;
		background-color: black;
	}
	.the-word {
		color: white;
		font-size: 12vw;
		padding-bottom: 5px;
	}
	.aiwia {
		font-size: 4vw;
		flex-grow: 1;
		display: flex;
		flex-direction: column-reverse;
		height: 100%;
		overflow-y: scroll;
		padding: 0 10px;
	}
</style>