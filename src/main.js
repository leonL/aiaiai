import Poem from './Poem.svelte';

const poem = new Poem({
	target: document.body,
	props: {
		title: 'Here I am'
	}
});

export default poem;