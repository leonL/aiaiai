<script>
  import { revelationStore } from './stores.js';

  let revelation;
  const unsubscribe = revelationStore.subscribe(value => {
    revelation = value;
  });
</script>

<div class='magnifier'>
  <span class='revelation'>
    { revelation }
  </span>
</div>

<style>
  .magnifier {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .revelation {
    font-size: 40vw;
    text-align: center;
    /* border: 1px solid black;  */
  }
</style>