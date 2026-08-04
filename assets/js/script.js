document.addEventListener('DOMContentLoaded', function() {
  const videoOverlay = document.createElement('div');
  videoOverlay.id = 'video-overlay';
  document.getElementById('video-background').appendChild(videoOverlay);
  var terminalContainer = document.getElementById('terminal');
  var terminalText = document.getElementById('terminal-text');
  var videoBackground = document.getElementById('myVideo');
  var closeButton = document.getElementById('close-button');
  var volumeContainer = document.getElementById('top-left-volume');
  var volumeIcon = document.getElementById('volume-icon');
  var volumeSlider = document.getElementById('volume-slider');

  var terminalTextContent = [
      "User: yanji",
      "IP: Loading...",
      "System: Loading...",
      "Bio Loaded",
      "Press Enter To Continue",
  ];
  var currentIndex = 0;

  videoBackground.pause();

  function typeWriter() {
      var line = currentIndex === 0 ? getAsciiArt() : terminalTextContent[currentIndex - 1];
      var i = 0;

      function typeChar() {
          if (i < line.length) {
              terminalText.textContent += line.charAt(i);
              i++;
              setTimeout(typeChar, currentIndex === 0 ? 10 : 50);
          } else {
              terminalText.textContent += "\n";
              currentIndex++;
              if (currentIndex < terminalTextContent.length + 1) {
                  typeWriter();
              } else {
                  addEventListeners();
              }
          }
      }

      if (currentIndex === 0) {
          terminalText.style.transform = 'scale(5)';
          terminalText.style.opacity = '0';
          terminalText.style.transition = 'transform 1.5s ease-out, opacity 1.5s ease-out';
          void terminalText.offsetWidth;
          
          terminalText.style.transform = 'scale(1)';
          terminalText.style.opacity = '1';
      }

      typeChar();
  }

  function updateVolumeIcon(volumeValue) {
      const volume = Math.max(0, Math.min(1, volumeValue ?? 0));
      let iconClass = 'fa-volume-xmark';

      if (volume >= 0.75) {
          iconClass = 'fa-volume-high';
      } else if (volume >= 0.35) {
          iconClass = 'fa-volume-low';
      } else if (volume > 0) {
          iconClass = 'fa-volume-down';
      }

      if (volumeIcon) {
          volumeIcon.className = `fas ${iconClass}`;
      }
  }

  function syncVolumeControl(volumeValue) {
      const value = Math.max(0, Math.min(100, Math.round(volumeValue * 100)));
      if (volumeSlider) {
          volumeSlider.value = value;
      }
      updateVolumeIcon(value / 100);
  }

  function setAudioVolume(volumeValue) {
      const normalizedValue = Math.max(0, Math.min(1, volumeValue));
      const audio = window.MusicPlayer?.getAudio?.();
      if (audio) {
          audio.volume = normalizedValue;
          audio.muted = normalizedValue === 0;
      }

      const video = document.getElementById('myVideo');
      if (video) {
          video.volume = normalizedValue;
          video.muted = normalizedValue === 0;
      }

      syncVolumeControl(normalizedValue);
  }

  if (volumeSlider) {
      volumeSlider.addEventListener('input', function() {
          setAudioVolume(parseInt(this.value, 10) / 100);
      });
  }

  function handleInput() {
      enterFullscreen();

      terminalContainer.style.display = 'none';
      document.getElementById('myVideo').play();
      const blurredBox = document.getElementById('blurred-box');
      const musicPlayerCard = document.getElementById('music-player-card');
      if (blurredBox) {
          blurredBox.style.display = 'flex';
      }
      if (musicPlayerCard) {
          musicPlayerCard.style.display = 'flex';
      }
      if (volumeContainer) {
          volumeContainer.classList.remove('volume-hidden');
      }
      removeEventListeners();
      document.body.classList.add('video-normal');
      if (window.MusicPlayer) {
          window.MusicPlayer.start();
      }
      setAudioVolume(parseInt(volumeSlider?.value || 50, 10) / 100);
  }

  function addEventListeners() {
      document.addEventListener('keydown', handleKeyPress);
      terminalContainer.addEventListener('click', handleInput);
  }

  function removeEventListeners() {
      document.removeEventListener('keydown', handleKeyPress);
      terminalContainer.removeEventListener('click', handleInput);
  }

  function enterFullscreen() {
    if (!document.fullscreenElement &&
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement &&
        !document.msFullscreenElement) {

      const element = document.documentElement; 

      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }
  }

  function handleKeyPress(event) {
      if (event.key === 'Enter') {
          handleInput();
      }
  }

  closeButton.addEventListener('click', function() {
      handleInput();
  });

  var userAgent = navigator.userAgent;

  function getWindowsVersion() {
      var version = userAgent.match(/Windows NT ([\d.]+)/);
      if (version) {
          version = version[1];
          switch (version) {
              case "5.1": return "Windows XP";
              case "6.0": return "Windows Vista";
              case "6.1": return "Windows 7";
              case "6.2": return "Windows 8";
              case "6.3": return "Windows 8.1";
              case "10.0": return "Windows 10";
              default: return "Windows";
          }
      } else {
          return "Windows";
      }
  }
  
  function getMacOSVersion() {
      var version = userAgent.match(/Mac OS X ([\d_]+)/);
      return version ? "macOS " + version[1].replace(/_/g, '.') : "macOS";
  }
  
  function getAndroidVersion() {
      var version = userAgent.match(/Android ([\d.]+)/);
      return version ? "Android " + version[1] : "Android";
  }
  
  function getiOSVersion() {
      var version = userAgent.match(/OS ([\d_]+)/);
      return version ? "iOS " + version[1].replace(/_/g, '.') : "iOS";
  }

  function getFallbackOperatingSystem() {
      if (userAgent.match(/Windows/)) {
          return getWindowsVersion();
      } else if (userAgent.match(/Macintosh/)) {
          return getMacOSVersion();
      } else if (userAgent.match(/Android/)) {
          return getAndroidVersion();
      } else if (userAgent.match(/Linux/)) {
          return "Linux";
      } else if (userAgent.match(/iPhone|iPad|iPod/)) {
          return getiOSVersion();
      } else {
          return "Unknown";
      }
  }

  async function getModernOperatingSystem() {
      const fallbackOs = getFallbackOperatingSystem();

      if (!navigator.userAgentData) {
          return fallbackOs;
      }

      if (navigator.userAgentData.platform !== "Windows") {
          return fallbackOs;
      }

      try {
          const hints = await navigator.userAgentData.getHighEntropyValues(['platformVersion']);
          
          if (!hints.platformVersion) {
              return fallbackOs;
          }

          const majorVersion = parseInt(hints.platformVersion.split('.')[0], 10);

          if (majorVersion >= 13) {
              return "Windows 11";
          } else {
              return "Windows 10";
          }

      } catch (error) {
          console.error("Error getting platformVersion:", error);
          return fallbackOs;
      }
  }

  const ipPromise = fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => data.ip)
      .catch(error => {
          console.error('Error fetching IP address:', error);
          return "Unable to fetch IP address";
      });

  const osPromise = getModernOperatingSystem();

  Promise.all([ipPromise, osPromise])
      .then(([ipAddress, operatingSystem]) => {
          terminalTextContent[1] = "IP: " + ipAddress;
          terminalTextContent[2] = "System: " + operatingSystem;
          
          typeWriter();
      });


  function centerTerminal() {
      var terminalWidth = terminalContainer.offsetWidth;
      var terminalHeight = terminalContainer.offsetHeight;
      var centerX = (window.innerWidth - terminalWidth) / 2;
      var centerY = (window.innerHeight - terminalHeight) / 2;

      terminalContainer.style.position = 'fixed';
      terminalContainer.style.left = '50%';
      terminalContainer.style.top = '50%';
      terminalContainer.style.transform = 'translate(-50%, -50%)';
      terminalContainer.style.margin = '0';
      terminalContainer.style.maxWidth = '92vw';
  }

  centerTerminal();
  window.addEventListener('resize', centerTerminal);

  terminalText.style.textAlign = 'center';

  function getAsciiArt() {
      return `

  `;
  }

  document.body.classList.remove('video-normal');
  videoOverlay.style.display = 'block';
  setAudioVolume(0.5);
});
