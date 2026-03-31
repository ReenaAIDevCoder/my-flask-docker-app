// Music Player JavaScript
const musicPlayer = {
    currentSongIndex: 0,
    isPlaying: false,
    playlist: [
        {
            title: "hanuman chalisa",
            artist: "Artist 1",
            src: "/static/music/song1.mp3"
        },
        {
            title: "mera shyam aa jata mere",
            artist: "Artist 2",
            src: "/static/music/song2.mp3"
        },
        {
            title: "meri aashiqi",
            artist: "Artist 3",
            src: "/static/music/song3.mp3"
        },
        {
            title: "jaise phool tode honge tumne",
            artist: "Artist 4",
            src: "/static/music/song4.mp3"
        },
        {
            title: "aao mil mohabbat adaa kro",
            artist: "Artist 5",
            src: "/static/music/song5.mp3"
        },
        {
            title: "main sath hu",
            artist: "Artist 6",
            src: "/static/music/song6.mp3"
        },
        {
            title: "aise to sataye na",
            artist: "Artist 7",
            src: "/static/music/song7.mp3"
        },
        {
            title: "Saiyaaraa",
            artist: "Artist 8",
            src: "/static/music/song8.mp3"
        }
        ,{
            title: "vrindavan me raadhe raadhe",
            artist: "Artist 9",
            src: "/static/music/song9.mp3"
        }
        ,{
            title: "O aadi shakti",
            artist: "Artist 10",
            src: "/static/music/song10.mp3"
        }
        ,{
            title: "ayi giri nandini nandit",
            artist: "Artist 11",
            src: "/static/music/song11.mp3"
        }
        ,{
            title: "krishna vashu devay",
            artist: "Artist 12",
            src: "/static/music/song12.mp3"
        }
        ,{
            title: "Namami devi narmade",
            artist: "Artist 13",
            src: "/static/music/song13.mp3"
        }
    ],

    init: function() {
        this.audio = document.createElement('audio');
        this.setupEventListeners();
        this.loadCurrentSong();
        this.updatePlaylist();
        this.setupAutoPlay();
    },

    setupEventListeners: function() {
        // Play/Pause
        document.querySelector('.play-btn').addEventListener('click', () => this.togglePlay());

        // Previous
        document.querySelector('.prev-btn').addEventListener('click', () => this.playPrevious());

        // Next
        document.querySelector('.next-btn').addEventListener('click', () => this.playNext());

        // Progress Bar
        const progressContainer = document.querySelector('.progress-container');
        progressContainer.addEventListener('click', (e) => this.setProgress(e));

        // Volume Control
        const volumeSlider = document.querySelector('.volume-slider');
        volumeSlider.addEventListener('input', (e) => this.setVolume(e));

        // Playlist Click
        const songList = document.querySelector('.song-list');
        songList.addEventListener('click', (e) => this.handlePlaylistClick(e));

        // Audio Events
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('ended', () => this.handleSongEnd());
    },

    loadCurrentSong: function() {
        const currentSong = this.playlist[this.currentSongIndex];
        this.audio.src = currentSong.src;
        this.updateSongInfo(currentSong);
    },

    togglePlay: function() {
        if (this.isPlaying) {
            this.audio.pause();
            document.querySelector('.play-btn').textContent = '▶️';
        } else {
            this.audio.play();
            document.querySelector('.play-btn').textContent = '⏸️';
        }
        this.isPlaying = !this.isPlaying;
    },

    playPrevious: function() {
        this.currentSongIndex = (this.currentSongIndex - 1 + this.playlist.length) % this.playlist.length;
        this.loadCurrentSong();
        this.audio.play();
        this.isPlaying = true;
        document.querySelector('.play-btn').textContent = '⏸️';
    },

    playNext: function() {
        this.currentSongIndex = (this.currentSongIndex + 1) % this.playlist.length;
        this.loadCurrentSong();
        this.audio.play();
        this.isPlaying = true;
        document.querySelector('.play-btn').textContent = '⏸️';
    },

    setProgress: function(e) {
        const progressContainer = document.querySelector('.progress-container');
        const width = progressContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = this.audio.duration;
        this.audio.currentTime = (clickX / width) * duration;
    },

    setVolume: function(e) {
        this.audio.volume = e.target.value;
    },

    updateProgress: function() {
        const progress = (this.audio.currentTime / this.audio.duration) * 100;
        document.querySelector('.progress-bar').style.width = progress + '%';
        
        const minutes = Math.floor(this.audio.currentTime / 60);
        const seconds = Math.floor(this.audio.currentTime % 60);
        document.querySelector('.current-time').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    },

    updateSongInfo: function(song) {
        document.querySelector('.song-title').textContent = song.title;
        document.querySelector('.artist').textContent = song.artist;
        
        // Update playlist current song highlight
        const songItems = document.querySelectorAll('.song-item');
        songItems.forEach((item, index) => {
            if (index === this.currentSongIndex) {
                item.classList.add('current-song');
            } else {
                item.classList.remove('current-song');
            }
        });
    },

    handlePlaylistClick: function(e) {
        if (e.target.classList.contains('song-item')) {
            this.currentSongIndex = Array.from(e.target.parentNode.children).indexOf(e.target);
            this.loadCurrentSong();
            this.audio.play();
            this.isPlaying = true;
            document.querySelector('.play-btn').textContent = '⏸️';
        }
    },

    handleSongEnd: function() {
        if (this.isPlaying) {
            this.playNext();
        }
    },

    updatePlaylist: function() {
        const songList = document.querySelector('.song-list');
        songList.innerHTML = '';
        this.playlist.forEach((song, index) => {
            const li = document.createElement('li');
            li.className = 'song-item';
            li.textContent = `${song.title} - ${song.artist}`;
            songList.appendChild(li);
        });
    },

    setupAutoPlay: function() {
        this.audio.addEventListener('ended', () => {
            if (this.isPlaying) {
                this.playNext();
            }
        });
    }
};

// Initialize the music player when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    musicPlayer.init();
});
