import Poem from './Poem.svelte';

const poem = new Poem({
	target: document.body,
	props: {
		title: 'am I what I am'
	}
});

export default poem;