class AudioService {
  private sounds: { [key: string]: HTMLAudioElement } = {};
  private isLoaded = false;
  private audioContext: AudioContext | null = null;

  // Simple, royalty-free sound data URLs
  private soundSources = {
    open: 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA', // Short blip
    close: 'data:audio/wav;base64,UklGRiAAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAAAAAODY/v8B/wE=', // Low-pitched click
    click: 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAAAAAEC/vz2/Pg==', // Subtle tick
    start: 'data:audio/wav;base64,UklGRlIAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhWAAAAAAA/v/9//8A/wD//v/+AP8A/wD+/v78/Pz9/f78/v39/f/8/v/9/v3+/v7+/v/9/P/8/v78/P/8/v78//39/P/9/v/9/v7+/vz9//7+/v3+/vz8/v78/P38/vz+/fwA/AD9/P38AP/9/P78AP/9/v/9/v/9/v79/v/+/f/9/v79//3+/v79/v7+/v79/v7+/gD+/gD//v7+/v79/f/+/v7+/v7+/v/+/f/9/f/+/v/9//7+/f7+/v/+/v/9//3//v79//3//v/9//0A', // Power up sound
  };

  private initializeAudioContext() {
    if (!this.audioContext && typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  loadSounds() {
    this.initializeAudioContext();
    if (this.isLoaded) return;
    Object.entries(this.soundSources).forEach(([key, src]) => {
      this.sounds[key] = new Audio(src);
    });
    this.isLoaded = true;
  }

  playSound(soundName: 'open' | 'close' | 'click' | 'start') {
    // User interaction is required to play audio in modern browsers
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    
    const sound = this.sounds[soundName];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(error => console.error(`Audio play failed: ${error}`));
    }
  }
}

export const audioService = new AudioService();
