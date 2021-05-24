<script>
	import {flip} from 'svelte/animate';
	import amIWhatIam from './data/amIWhatIAm.js';

	import Verse from './Verse.svelte';

	export let title;
	
	let theWord;

	let verseIndex = 1;
	$: activeVersesInReverse = amIWhatIam.slice(0, verseIndex).reverse();

	function nextVerse() {
		let verseWords = [];
		amIWhatIam[verseIndex - 1].couplets.forEach(couplet => {
			verseWords = [...verseWords, ...couplet.a.split(' '), ...couplet.b.split(' ')];			
		});

		let wordInterval = setInterval(() => {
			if (verseWords.length > 0) {
				theWord = verseWords.shift();
			} else {
				clearInterval(wordInterval);
				theWord = "";
				verseIndex++;
			}
		}, 2000);
	}
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<main>
	<div class='aiwia'>
		{#each activeVersesInReverse as verse (verse.verseNumber)}
			<div animate:flip={{duration: 500}}>
				<Verse {verse} on:verseRevealed={ () => nextVerse() } />
			</div>
		{/each}
	</div>
	<div class='emanation'>
		{#if theWord}
			<span class='the-word'>
				{theWord}
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