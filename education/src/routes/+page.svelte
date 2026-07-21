<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>Khun-Sin · 臺灣鯨豚擱淺通報與數據</title>
	<meta name="description" content="發現鯨豚擱淺請撥 118。臺灣鯨豚擱淺通報資訊與官方數據視覺化。" />
</svelte:head>

<!-- Home: action + data. Real sections land in Sprint 1 (#5). -->
<main>
	<h1>Khun-Sin</h1>
	<p>發現鯨豚擱淺，請撥海巡署 24 小時專線 <strong>118</strong>。</p>
	<p><a href={resolve('/learn')}>認識臺灣的鯨豚 →</a></p>
</main>
