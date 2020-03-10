# cli commands

# deno flags
r = --allow-read
n = --allow-net
e = --allow-env
rw = --allow-read --allow-write
rn = --allow-read --allow-net
wn = --allow-write --allow-net
rwn = --allow-read --allow-write --allow-net

init:
	deno ${$(arg)} mod.ts
