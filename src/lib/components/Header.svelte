<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { signOut } from 'firebase/auth';
	import { auth } from '$lib/firebaseConfig';
	import ToggleMode from './ToggleMode.svelte';
	import Logo from './Logo.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';

	async function logOut() {
		await fetch('/', {
			method: 'DELETE'
		});
		await signOut(auth);
		goto('/');
	}
	const user = $page.data?.user;
</script>

<header class="sticky left-0 top-0 flex items-center justify-between bg-background">
	<Logo />
	<div class="flex items-center gap-5">
		<ToggleMode />
		{#if user}
			<Avatar.Root>
				<Avatar.Fallback>...</Avatar.Fallback>
				{#if user.profilePic}
					<Avatar.Image src={user.profilePic} alt="user avatar" />
				{:else}
					<Avatar.Fallback>...</Avatar.Fallback>
				{/if}
			</Avatar.Root>
			<Button on:click={logOut} variant="ghost">Sign out</Button>
		{/if}
	</div>
</header>
