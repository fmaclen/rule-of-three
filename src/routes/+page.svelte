<script lang="ts">
	import { appWindow, LogicalSize, LogicalPosition } from '@tauri-apps/api/window';
	import { onMount } from 'svelte';
	import Arrow from '$lib/svg/Arrow.svelte';
	import Trash from '$lib/svg/Trash.svelte';
	import FlipHorizontally from '$lib/svg/FlipHorizontally.svelte';

	let valueA: number | string = '';
	let valueB: number | string = '';
	let valueY: number | string = '';
	let valueX: string = 'X';

	function calculate(): void {
		if (typeof valueA !== 'number' || typeof valueB !== 'number' || typeof valueY !== 'number')
			return;

		if (valueA !== 0 && valueB !== 0 && valueY !== 0) {
			let result: number = (valueY * valueB) / valueA;
			valueX = result.toFixed(2);
		} else {
			valueX = 'X';
		}
	}

	function reverseValues(): void {
		[valueA, valueB] = [valueB, valueA];
		valueY = valueX;
		calculate();
	}

	function resetValues(): void {
		valueA = '';
		valueB = '';
		valueY = '';
		calculate();
	}

	$: if (valueA || valueB || valueY) calculate();

	let windowHeight: number;

	onMount(async () => {
		windowHeight = document.body.scrollHeight
		await appWindow.setSize(new LogicalSize(320, windowHeight));
		await appWindow.setPosition(new LogicalPosition(0, 0));
	});

</script>

<div class="app">
	<div class="arrow-up" />

	<div class="calculator">
		<form class="calculator__form">
			<input
				bind:value={valueA}
				type="number"
				class="calculator__input"
				placeholder="A"
				autofocus
			/>
			<Arrow />
			<input bind:value={valueB} type="number" class="calculator__input" placeholder="B" />
			<input bind:value={valueY} type="number" class="calculator__input" placeholder="Y" />
			<Arrow />
			<input value={valueX} type="text" class="calculator__result" placeholder="X" disabled />
		</form>

		<nav class="calculator__nav">
			<button
				class="calculator__button"
				on:click={reverseValues}
				disabled={!valueA || !valueB || !valueY}
			>
				Reverse <FlipHorizontally />
			</button>

			<button
				class="calculator__button"
				on:click={resetValues}
				disabled={!valueA && !valueB && !valueY}
			>
				Reset <Trash />
			</button>
		</nav>
	</div>

</div>

<style>
	div.calculator {
		display: flex;
		gap: 12px;
		flex-direction: column;
		background-color: #282828;
		border-radius: 6px;
		padding-top: 12px;
	}

	nav.calculator__nav {
		display: flex;
		background-color: rgba(255, 255, 255, 0.05);
		padding: 12px;
		gap: 12px;
		box-sizing: border-box;
	}

	button.calculator__button {
		font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
		background-color: rgba(255, 255, 255, 0.15);
		border: 1px solid rgba(255, 255, 255, 0.25);
		font-size: 12px;
		padding: 6px 32px;
		box-sizing: border-box;
		border-radius: 4px;
		color: #fff;
		outline: none;
		width: 100%;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 8px;
		justify-content: center;
	}

	button.calculator__button:hover {
		background-color: rgba(255, 255, 255, 0.2);
	}

	button.calculator__button:disabled {
		pointer-events: none;
		background-color: transparent;
		color: #888;
		border-color: rgba(255, 255, 255, 0.1);
	}

	button.calculator__button:disabled svg line,
	button.calculator__button:disabled svg polyline {
		stroke: #888;
		fill: #888;
	}

	form.calculator__form {
		display: grid;
		grid-template-columns: 1fr max-content 1fr;
		grid-gap: 8px;
		align-items: center;
		margin: 0 12px;
	}

	input.calculator__input::-webkit-outer-spin-button,
	input.calculator__input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input.calculator__input,
	input.calculator__result {
		font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
		background-color: transparent;
		font-size: 12px;
		border: 1px solid rgba(255, 255, 255, 0.1);
		padding: 6px 8px;
		box-sizing: border-box;
		border-radius: 4px;
		color: #fff;
		outline: none;
		width: 100%;
	}

	input.calculator__input:active,
	input.calculator__input:focus {
		border-color: #135bc5;
	}

	input.calculator__input:hover {
		border-color: rgba(255, 255, 255, 0.2);
	}

	input.calculator__result {
		color: rgba(255, 255, 255, 0.5);
		background-color: rgba(255, 255, 255, 0.1);
		margin: 0;
	}

	div.arrow-up {
		width: 0;
		height: 0;
		border-left: 6px solid transparent;
		border-right: 6px solid transparent;
		border-bottom: 6px solid #282828;
		margin-inline: auto;
	}
</style>
