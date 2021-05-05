import Poem from './Poem.svelte';

const poem = new Poem({
	target: document.body,
	props: {
		title: 'i am what i am'
	}
});

export default poem;