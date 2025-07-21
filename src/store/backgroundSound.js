import {create} from 'zustand'

export const useBGMStore = create((set, get) => ({
	audio: null,
	setAudio: (audio) => set({audio}),
	play:() => {
		const audio = get().audio;
		if(audio){
			audio.play().catch((err) => {
				console.warn("autoplay blocked or failed:", err)
			})
		}
	},
	pause: () => {
		const audio = get().audio;
		if (audio) {
		  audio.pause();
		}
	  },
}))